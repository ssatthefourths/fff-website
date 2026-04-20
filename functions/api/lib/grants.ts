// Download-grant helpers.
//
// A grant is a bearer token that authorises exactly one (order_item, file)
// pair for download up to N times before expiry. The webhook creates grants
// when an order flips to paid; the download endpoint (`/api/download/[token]`)
// consumes them.
//
// The migration 0004 unique index on (order_item_id, product_file_id) makes
// this idempotent at the DB level: webhook retries that hit INSERT OR IGNORE
// won't create duplicates.

const GRANT_TTL_DAYS = 30;
const DEFAULT_MAX_DOWNLOADS = 10;

interface OrderItemRow {
  id: number;
  product_id: number;
}

interface ProductFileRow {
  id: number;
}

export function generateDownloadToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Issue download grants for every order_item in the given paid order.
 *
 * One grant per (order_item, first available product_file). If a product has
 * no files attached yet, the order_item is silently skipped — the admin can
 * still upload later, and we could backfill grants via an admin action.
 *
 * Safe to call multiple times; duplicates are caught by the unique index.
 */
export async function createGrantsForOrder(db: D1Database, orderId: number): Promise<number> {
  const itemsRes = await db
    .prepare('SELECT id, product_id FROM order_items WHERE order_id = ?')
    .bind(orderId)
    .all<OrderItemRow>();

  const items = itemsRes.results ?? [];
  if (items.length === 0) return 0;

  const expiresAt = new Date(Date.now() + GRANT_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();
  let created = 0;

  for (const item of items) {
    const file = await db
      .prepare('SELECT id FROM product_files WHERE product_id = ? ORDER BY created_at ASC, id ASC LIMIT 1')
      .bind(item.product_id)
      .first<ProductFileRow>();
    if (!file) continue;

    const token = generateDownloadToken();
    const res = await db
      .prepare(
        `INSERT OR IGNORE INTO download_grants
           (order_item_id, product_file_id, token, expires_at, max_downloads)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .bind(item.id, file.id, token, expiresAt, DEFAULT_MAX_DOWNLOADS)
      .run();
    if (res.meta.changes > 0) created++;
  }

  return created;
}
