// GET /api/download/[token]
//
// Public endpoint (no auth header) — the token IS the authorisation. It was
// issued by the webhook only after a payment_intent.succeeded event, so
// holding a valid token proves the order was paid at least once.
//
// Phase 4 gate: check existence + expiry + remaining uses, increment the
// download counter, and stream the PDF straight from private R2. No signed
// S3 URL, no redirect — the bytes go through our Worker so we can log every
// hit and (Phase 4c) rate-limit per-IP.
//
// Out of scope for 4a:
//   - pdf-lib watermarking (Phase 4b)
//   - Turnstile / IP rate limits (Phase 4c)

interface Env {
  DB: D1Database;
  R2: R2Bucket;
}

interface GrantRow {
  grant_id: number;
  token: string;
  expires_at: string;
  downloads_count: number;
  max_downloads: number;
  product_file_id: number | null;
  r2_key: string | null;
  filename: string | null;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const tokenParam = context.params.token;
  const token = typeof tokenParam === 'string' ? tokenParam : '';
  // Token format: 32 hex chars (see functions/api/lib/grants.ts). Reject
  // anything else early so we don't even hit D1 for random garbage.
  if (!/^[a-f0-9]{32}$/.test(token)) {
    return new Response('Not Found', { status: 404 });
  }

  const grant = await context.env.DB
    .prepare(
      `SELECT
         dg.id AS grant_id,
         dg.token,
         dg.expires_at,
         dg.downloads_count,
         dg.max_downloads,
         dg.product_file_id,
         pf.r2_key,
         pf.filename
       FROM download_grants dg
       LEFT JOIN product_files pf ON pf.id = dg.product_file_id
       WHERE dg.token = ?`,
    )
    .bind(token)
    .first<GrantRow>();

  if (!grant) return new Response('Not Found', { status: 404 });

  if (new Date(grant.expires_at).getTime() < Date.now()) {
    return new Response('Download link has expired', { status: 410 });
  }
  if (grant.downloads_count >= grant.max_downloads) {
    return new Response('Download limit reached', { status: 403 });
  }
  if (!grant.r2_key || !grant.filename) {
    return new Response('File not attached', { status: 404 });
  }

  const object = await context.env.R2.get(grant.r2_key);
  if (!object) {
    // File was deleted from R2 but the grant row remained — log and 404.
    return new Response('File missing', { status: 404 });
  }

  // Bump counter. Fire-and-forget-ish; if the update fails we still serve
  // the file but the count drifts. Acceptable for now.
  await context.env.DB
    .prepare(
      `UPDATE download_grants
       SET downloads_count = downloads_count + 1,
           last_downloaded_at = datetime('now')
       WHERE id = ?`,
    )
    .bind(grant.grant_id)
    .run();

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('Content-Type', 'application/pdf');
  headers.set(
    'Content-Disposition',
    `attachment; filename="${grant.filename.replace(/"/g, '')}"`,
  );
  headers.set('Cache-Control', 'private, no-store');

  return new Response(object.body, { headers });
};
