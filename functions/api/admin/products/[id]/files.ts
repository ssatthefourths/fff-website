// POST /api/admin/products/:id/files — upload a product file (pattern PDF).
// Accepts multipart/form-data with:
//   file: the PDF blob (required, <=50MB, application/pdf)
// Uploads to R2 under `files/products/{productId}/{key}.pdf` (PRIVATE — served
// only through the signed download endpoint once Phase 4 is live).
// Inserts a row into product_files.

interface Env {
  DB: D1Database;
  R2: R2Bucket;
}

const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50 MB

function parseId(raw: unknown): number | null {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

function randomHex(bytes = 8): string {
  const buf = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(buf).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function sanitiseFilename(name: string): string {
  // Keep alnum, dot, dash, underscore; replace anything else with '_'.
  // Trim length to something sane.
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const productId = parseId(context.params.id);
  if (productId === null) return Response.json({ error: 'Invalid product id' }, { status: 400 });

  const product = await context.env.DB
    .prepare('SELECT id FROM products WHERE id = ?')
    .bind(productId)
    .first();
  if (!product) return Response.json({ error: 'Product not found' }, { status: 404 });

  let form: FormData;
  try {
    form = await context.request.formData();
  } catch {
    return Response.json({ error: 'Expected multipart/form-data' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return Response.json({ error: 'Missing `file` field' }, { status: 400 });
  }
  if (file.type !== 'application/pdf') {
    return Response.json({ error: `Only PDFs allowed; got ${file.type || 'unknown'}` }, { status: 415 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return Response.json({ error: `File too large (${file.size} bytes). Max ${MAX_FILE_BYTES}.` }, { status: 413 });
  }

  const displayName = sanitiseFilename(file.name || `pattern-${productId}.pdf`);
  const r2Key = `files/products/${productId}/${Date.now()}-${randomHex()}.pdf`;

  try {
    await context.env.R2.put(r2Key, file.stream(), {
      httpMetadata: { contentType: 'application/pdf' },
      customMetadata: { productId: String(productId), originalName: displayName },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'R2 upload failed', detail: message }, { status: 500 });
  }

  try {
    const inserted = await context.env.DB
      .prepare('INSERT INTO product_files (product_id, r2_key, filename, size_bytes) VALUES (?, ?, ?, ?)')
      .bind(productId, r2Key, displayName, file.size)
      .run();

    return Response.json(
      {
        success: true,
        id: Number(inserted.meta.last_row_id),
        r2_key: r2Key,
        filename: displayName,
        size_bytes: file.size,
      },
      { status: 201 },
    );
  } catch (err) {
    await context.env.R2.delete(r2Key).catch(() => {});
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'DB insert failed; R2 object rolled back', detail: message }, { status: 500 });
  }
};

// DELETE /api/admin/products/:id/files?file=:fileId
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const productId = parseId(context.params.id);
  if (productId === null) return Response.json({ error: 'Invalid product id' }, { status: 400 });

  const url = new URL(context.request.url);
  const fileId = parseId(url.searchParams.get('file'));
  if (fileId === null) return Response.json({ error: 'Missing ?file=:id' }, { status: 400 });

  const row = await context.env.DB
    .prepare('SELECT id, r2_key FROM product_files WHERE id = ? AND product_id = ?')
    .bind(fileId, productId)
    .first<{ id: number; r2_key: string }>();
  if (!row) return Response.json({ error: 'File not found' }, { status: 404 });

  try {
    await context.env.R2.delete(row.r2_key);
  } catch {
    /* non-fatal */
  }
  await context.env.DB.prepare('DELETE FROM product_files WHERE id = ?').bind(fileId).run();
  return Response.json({ success: true });
};

// GET /api/admin/products/:id/files — list files for this product (admin-only).
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const productId = parseId(context.params.id);
  if (productId === null) return Response.json({ error: 'Invalid product id' }, { status: 400 });

  const res = await context.env.DB
    .prepare('SELECT id, r2_key, filename, size_bytes, created_at FROM product_files WHERE product_id = ? ORDER BY created_at DESC, id DESC')
    .bind(productId)
    .all();

  return Response.json({ success: true, files: res.results ?? [] });
};
