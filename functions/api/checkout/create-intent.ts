// POST /api/checkout/create-intent
//
// Builds a Stripe PaymentIntent for the current cart.
//
// Flow:
//   1. Validate the incoming cart against the products table — we recompute
//      the total server-side so a client can't spoof prices.
//   2. Create a `pending` order + order_items in D1 so the order has an id
//      for the whole flow (the webhook later looks it up by
//      stripe_payment_intent_id and flips the status to `paid`).
//   3. Create a Stripe PaymentIntent for the server-side total (AUD cents).
//      Attach the order id as metadata so the webhook can find it without
//      relying on DB lookups.
//   4. Store the PaymentIntent id on the order and return the client_secret
//      for the frontend's Stripe Payment Element.

import { z } from 'zod';
import { getStripe } from '../lib/stripe';
import { getSessionUser, getSessionCookie } from '../lib/auth';

interface Env {
  DB: D1Database;
  STRIPE_SECRET_KEY?: string;
}

const bodySchema = z.object({
  customer_name: z.string().trim().min(1).max(200),
  customer_email: z.string().trim().email().max(200),
  items: z.array(z.object({
    product_id: z.number().int().positive(),
  })).min(1).max(50),
});

interface ProductPriceRow {
  id: number;
  name: string;
  price: number;
  is_free: number;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (!context.env.STRIPE_SECRET_KEY) {
    return Response.json({ error: 'Payments not configured (STRIPE_SECRET_KEY missing)' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const { customer_name, customer_email, items } = parsed.data;

  // Re-fetch authoritative prices from the DB. The client cart is NEVER the
  // source of truth for how much we charge.
  const placeholders = items.map(() => '?').join(',');
  const productIds = items.map((i) => i.product_id);
  const productRows = await context.env.DB
    .prepare(`SELECT id, name, price, is_free FROM products WHERE id IN (${placeholders})`)
    .bind(...productIds)
    .all<ProductPriceRow>();

  const byId = new Map((productRows.results ?? []).map((p) => [p.id, p]));
  const missing = productIds.filter((id) => !byId.has(id));
  if (missing.length > 0) {
    return Response.json({ error: `Unknown product id(s): ${missing.join(', ')}` }, { status: 400 });
  }

  // Free items contribute 0 to the total but still create an order row so
  // we can issue download grants later.
  const lineItems = productIds.map((id) => {
    const row = byId.get(id)!;
    const unitCents = row.is_free ? 0 : Math.round(Number(row.price) * 100);
    return { product_id: row.id, name: row.name, unit_cents: unitCents };
  });
  const totalCents = lineItems.reduce((sum, li) => sum + li.unit_cents, 0);
  const totalDollars = totalCents / 100;

  // Optional: link the order to the logged-in user, otherwise it's a guest
  // order keyed purely by email.
  const sessionUser = await getSessionUser(context.env.DB, getSessionCookie(context.request));
  const userId = sessionUser?.id ?? null;

  // ─── Create pending order + items atomically ──────────────────────
  const orderInsert = await context.env.DB
    .prepare(
      `INSERT INTO orders (user_id, customer_name, customer_email, total, status,
         subtotal_cents, currency)
       VALUES (?, ?, ?, ?, 'pending', ?, 'AUD')`,
    )
    .bind(userId, customer_name, customer_email, totalDollars, totalCents)
    .run();
  const orderId = Number(orderInsert.meta.last_row_id);

  const itemStmt = context.env.DB.prepare(
    'INSERT INTO order_items (order_id, product_id, price) VALUES (?, ?, ?)',
  );
  await context.env.DB.batch(
    lineItems.map((li) => itemStmt.bind(orderId, li.product_id, li.unit_cents / 100)),
  );

  // ─── Short-circuit: free order, no Stripe needed ──────────────────
  if (totalCents === 0) {
    await context.env.DB
      .prepare(`UPDATE orders SET status = 'paid' WHERE id = ?`)
      .bind(orderId)
      .run();
    return Response.json({ success: true, orderId, freeOrder: true });
  }

  // ─── Create PaymentIntent ─────────────────────────────────────────
  const stripe = getStripe(context.env.STRIPE_SECRET_KEY);
  let intent;
  try {
    intent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'aud',
      receipt_email: customer_email,
      // automatic_payment_methods lets the Payment Element decide what to
      // show (card, Link, Apple/Google Pay). Configure allowed methods in
      // the Stripe dashboard.
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: String(orderId),
        customerEmail: customer_email,
      },
    });
  } catch (err) {
    // Roll the pending order back to cancelled so we don't leak it.
    await context.env.DB
      .prepare(`UPDATE orders SET status = 'cancelled' WHERE id = ?`)
      .bind(orderId)
      .run();
    const message = err instanceof Error ? err.message : 'Stripe error';
    return Response.json({ error: 'Failed to create payment intent', detail: message }, { status: 502 });
  }

  await context.env.DB
    .prepare(`UPDATE orders SET stripe_payment_intent_id = ? WHERE id = ?`)
    .bind(intent.id, orderId)
    .run();

  return Response.json({
    success: true,
    orderId,
    clientSecret: intent.client_secret,
    amountCents: totalCents,
    currency: 'AUD',
  });
};
