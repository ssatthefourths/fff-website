// POST /api/admin/makers/[id]/photo — upload / replace maker photo.
// Same contract as /api/admin/products/[id]/images:
//   - multipart/form-data with `file`
//   - jpeg/png/webp/gif, <=10 MB
//   - stores under `images/makers/{id}/{ts}-{hex}.{ext}`
//   - updates makers.photo_r2_key and deletes any previous R2 object
// DELETE — clears photo_r2_key + deletes the R2 object.

interface Env {
  DB: D1Database;
  R2: R2Bucket;
}

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
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
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid maker id' }, { status: 400 });

  const existing = await context.env.DB
    .prepare('SELECT id, photo_r2_key FROM makers WHERE id = ?')
    .bind(id)
    .first<{ id: number; photo_r2_key: string | null }>();
  if (!existing) return Response.json({ error: 'Maker not found' }, { status: 404 });

  let form: FormData;
  try { form = await context.request.formData(); }
  catch { return Response.json({ error: 'Expected multipart/form-data' }, { status: 400 }); }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return Response.json({ error: 'Missing `file` field' }, { status: 400 });
  }
  const ext = ACCEPTED_MIME[file.type];
  if (!ext) return Response.json({ error: `Unsupported image type: ${file.type}` }, { status: 415 });
  if (file.size > MAX_IMAGE_BYTES) {
    return Response.json({ error: `File too large (${file.size} bytes). Max ${MAX_IMAGE_BYTES}.` }, { status: 413 });
  }

  const r2Key = `images/makers/${id}/${Date.now()}-${randomHex()}.${ext}`;
  try {
    await context.env.R2.put(r2Key, file.stream(), {
      httpMetadata: { contentType: file.type },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'R2 upload failed', detail: message }, { status: 500 });
  }

  try {
    await context.env.DB
      .prepare(`UPDATE makers SET photo_r2_key = ?, updated_at = datetime('now') WHERE id = ?`)
      .bind(r2Key, id)
      .run();
  } catch (err) {
    await context.env.R2.delete(r2Key).catch(() => {});
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'DB update failed; R2 object rolled back', detail: message }, { status: 500 });
  }

  // Clean up the previous photo if there was one.
  if (existing.photo_r2_key && existing.photo_r2_key !== r2Key) {
    await context.env.R2.delete(existing.photo_r2_key).catch(() => {});
  }

  return Response.json({ success: true, r2_key: r2Key, url: `/r2/${r2Key}` }, { status: 201 });
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid maker id' }, { status: 400 });

  const existing = await context.env.DB
    .prepare('SELECT id, photo_r2_key FROM makers WHERE id = ?')
    .bind(id)
    .first<{ id: number; photo_r2_key: string | null }>();
  if (!existing) return Response.json({ error: 'Maker not found' }, { status: 404 });

  if (existing.photo_r2_key) {
    await context.env.R2.delete(existing.photo_r2_key).catch(() => {});
  }
  await context.env.DB
    .prepare(`UPDATE makers SET photo_r2_key = NULL, updated_at = datetime('now') WHERE id = ?`)
    .bind(id)
    .run();
  return Response.json({ success: true });
};
