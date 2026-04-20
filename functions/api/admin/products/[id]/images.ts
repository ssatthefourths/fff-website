// POST /api/admin/products/:id/images — upload a product image.
// Accepts multipart/form-data with fields:
//   file: the image blob (required, <=10MB, image/jpeg|png|webp|gif)
//   alt:  optional alt text
// Uploads the image to R2 under `images/products/{productId}/{key}.{ext}`
// and inserts a row into product_images.

interface Env {
  DB: D1Database;
  R2: R2Bucket;
}

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB

const ACCEPTED_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

function parseId(raw: unknown): number | null {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

function randomHex(bytes = 8): string {
  const buf = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(buf).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const productId = parseId(context.params.id);
  if (productId === null) return Response.json({ error: 'Invalid product id' }, { status: 400 });

  // Ensure product exists before we burn an R2 upload.
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

  const ext = ACCEPTED_MIME[file.type];
  if (!ext) {
    return Response.json(
      { error: `Unsupported image type: ${file.type || 'unknown'}. Allowed: ${Object.keys(ACCEPTED_MIME).join(', ')}` },
      { status: 415 },
    );
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return Response.json({ error: `File too large (${file.size} bytes). Max ${MAX_IMAGE_BYTES}.` }, { status: 413 });
  }

  const alt = (() => {
    const v = form.get('alt');
    return typeof v === 'string' ? v.slice(0, 500) : null;
  })();

  const r2Key = `images/products/${productId}/${Date.now()}-${randomHex()}.${ext}`;

  try {
    await context.env.R2.put(r2Key, file.stream(), {
      httpMetadata: { contentType: file.type },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'R2 upload failed', detail: message }, { status: 500 });
  }

  try {
    // Place the new image at the end of the sort order for this product.
    const sortRow = await context.env.DB
      .prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM product_images WHERE product_id = ?')
      .bind(productId)
      .first<{ next: number }>();
    const sortOrder = sortRow?.next ?? 0;

    const inserted = await context.env.DB
      .prepare('INSERT INTO product_images (product_id, r2_key, alt, sort_order) VALUES (?, ?, ?, ?)')
      .bind(productId, r2Key, alt, sortOrder)
      .run();

    return Response.json(
      {
        success: true,
        id: Number(inserted.meta.last_row_id),
        r2_key: r2Key,
        url: `/r2/${r2Key}`,
        alt,
        sort_order: sortOrder,
      },
      { status: 201 },
    );
  } catch (err) {
    // Roll back the R2 object so we don't leak orphaned bytes.
    await context.env.R2.delete(r2Key).catch(() => {});
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'DB insert failed; R2 object rolled back', detail: message }, { status: 500 });
  }
};

// DELETE /api/admin/products/:id/images?image=:imageId
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const productId = parseId(context.params.id);
  if (productId === null) return Response.json({ error: 'Invalid product id' }, { status: 400 });

  const url = new URL(context.request.url);
  const imageId = parseId(url.searchParams.get('image'));
  if (imageId === null) return Response.json({ error: 'Missing ?image=:id' }, { status: 400 });

  const row = await context.env.DB
    .prepare('SELECT id, r2_key FROM product_images WHERE id = ? AND product_id = ?')
    .bind(imageId, productId)
    .first<{ id: number; r2_key: string }>();
  if (!row) return Response.json({ error: 'Image not found' }, { status: 404 });

  try {
    await context.env.R2.delete(row.r2_key);
  } catch {
    /* non-fatal — the row is deleted below either way */
  }
  await context.env.DB.prepare('DELETE FROM product_images WHERE id = ?').bind(imageId).run();
  return Response.json({ success: true });
};
