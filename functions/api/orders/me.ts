// GET /api/orders/me
//
// Logged-in customer's order history. Paid orders include per-item download
// links (token embedded) so the account page can render ready-to-click
// Download buttons without a second round-trip.
//
// Guest orders (no user_id) aren't visible here — they rely on email-based
// recovery flows planned for Phase 5+.

import { getSessionCookie, getSessionUser } from '../lib/auth';

interface Env {
  DB: D1Database;
}

interface OrderRow {
  id: number;
  customer_name: string;
  customer_email: string;
  total: number;
  status: string;
  currency: string | null;
  created_at: string | null;
}

interface OrderItemRow {
  order_id: number;
  item_id: number;
  product_id: number;
  price: number;
  product_name: string | null;
  product_slug: string | null;
  grant_token: string | null;
  grant_expires_at: string | null;
  grant_downloads_count: number | null;
  grant_max_downloads: number | null;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const user = await getSessionUser(context.env.DB, getSessionCookie(context.request));
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const ordersRes = await context.env.DB
    .prepare(
      `SELECT id, customer_name, customer_email, total, status, currency, created_at
       FROM orders
       WHERE user_id = ?
       ORDER BY created_at DESC, id DESC`,
    )
    .bind(user.id)
    .all<OrderRow>();

  const orders = ordersRes.results ?? [];
  if (orders.length === 0) {
    return Response.json({ success: true, orders: [] });
  }

  const orderIds = orders.map((o) => o.id);
  const placeholders = orderIds.map(() => '?').join(',');

  const itemsRes = await context.env.DB
    .prepare(
      `SELECT
         oi.order_id,
         oi.id AS item_id,
         oi.product_id,
         oi.price,
         p.name  AS product_name,
         p.slug  AS product_slug,
         dg.token           AS grant_token,
         dg.expires_at      AS grant_expires_at,
         dg.downloads_count AS grant_downloads_count,
         dg.max_downloads   AS grant_max_downloads
       FROM order_items oi
       LEFT JOIN products p ON p.id = oi.product_id
       LEFT JOIN download_grants dg ON dg.order_item_id = oi.id
       WHERE oi.order_id IN (${placeholders})
       ORDER BY oi.order_id, oi.id`,
    )
    .bind(...orderIds)
    .all<OrderItemRow>();

  const itemsByOrder = new Map<number, OrderItemRow[]>();
  for (const row of itemsRes.results ?? []) {
    const arr = itemsByOrder.get(row.order_id) ?? [];
    arr.push(row);
    itemsByOrder.set(row.order_id, arr);
  }

  const payload = orders.map((o) => ({
    id: o.id,
    total: Number(o.total ?? 0),
    status: o.status,
    currency: o.currency ?? 'AUD',
    created_at: o.created_at,
    items: (itemsByOrder.get(o.id) ?? []).map((it) => ({
      id: it.item_id,
      product_id: it.product_id,
      product_name: it.product_name,
      product_slug: it.product_slug,
      price: Number(it.price ?? 0),
      download: it.grant_token
        ? {
            url: `/api/download/${it.grant_token}`,
            expires_at: it.grant_expires_at,
            downloads_used: it.grant_downloads_count ?? 0,
            max_downloads: it.grant_max_downloads ?? 0,
          }
        : null,
    })),
  }));

  return Response.json({ success: true, orders: payload });
};
