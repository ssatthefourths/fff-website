// POST /api/checkout/webhook
//
// Stripe calls this after a payment event (success, failure, refund, etc.).
// We:
//   1. Read the raw body — `constructEventAsync` needs the original bytes to
//      verify the signature, so we MUST NOT JSON-parse before it.
//   2. Verify the stripe-signature header against STRIPE_WEBHOOK_SECRET.
//      If verification fails, return 400 and Stripe will retry.
//   3. Dispatch on event.type. Everything we update is idempotent so retries
//      are safe.
//
// Register this URL + copy the signing secret in Stripe dashboard →
// Developers → Webhooks. Events to listen for (minimum):
//   - payment_intent.succeeded
//   - payment_intent.payment_failed
//   - charge.refunded

import { getStripe, getCryptoProvider } from '../lib/stripe';

interface Env {
  DB: D1Database;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (!context.env.STRIPE_SECRET_KEY || !context.env.STRIPE_WEBHOOK_SECRET) {
    return new Response('Webhook not configured', { status: 503 });
  }

  const signature = context.request.headers.get('stripe-signature');
  if (!signature) return new Response('Missing stripe-signature', { status: 400 });

  const rawBody = await context.request.text();

  const stripe = getStripe(context.env.STRIPE_SECRET_KEY);
  const crypto = getCryptoProvider();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      context.env.STRIPE_WEBHOOK_SECRET,
      undefined,
      crypto,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Signature verification failed';
    // Return 400 so Stripe retries; do NOT leak specifics to caller.
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const intent = event.data.object;
        const orderId = Number(intent.metadata?.orderId ?? 0);
        if (!orderId) break;

        // Idempotent update — only flip pending→paid once; if retried, the
        // WHERE status = 'pending' guard no-ops.
        await context.env.DB
          .prepare(
            `UPDATE orders
             SET status = 'paid',
                 stripe_payment_id = ?
             WHERE id = ? AND (status = 'pending' OR status IS NULL)`,
          )
          .bind(intent.id, orderId)
          .run();
        break;
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object;
        const orderId = Number(intent.metadata?.orderId ?? 0);
        if (!orderId) break;
        await context.env.DB
          .prepare(
            `UPDATE orders SET status = 'failed'
             WHERE id = ? AND status = 'pending'`,
          )
          .bind(orderId)
          .run();
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        const intentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
        if (!intentId) break;
        await context.env.DB
          .prepare(
            `UPDATE orders SET status = 'refunded'
             WHERE stripe_payment_intent_id = ?`,
          )
          .bind(intentId)
          .run();
        break;
      }

      default:
        // Unhandled events are fine — acknowledge so Stripe doesn't retry.
        break;
    }
  } catch (err) {
    // Swallow → return 500 so Stripe retries. Stderr logs in the Worker
    // dashboard still show the error.
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(`Handler error: ${message}`, { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
