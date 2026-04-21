import { z } from 'zod';

interface Env {
  DB: D1Database;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

const patchSchema = z.object({
  name: z.string().trim().min(1).max(200).optional(),
  pattern_name: z.string().trim().min(1).max(200).optional(),
  month: z.enum(MONTHS).optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  is_winner: z.boolean().optional(),
  sort_order: z.number().int().min(0).max(1000).optional(),
}).strict();

function parseId(raw: unknown): number | null {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  const maker = await context.env.DB
    .prepare('SELECT * FROM makers WHERE id = ?')
    .bind(id)
    .first();
  if (!maker) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ success: true, maker });
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  let body: unknown;
  try { body = await context.request.json(); }
  catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const updates = parsed.data;
  const keys = Object.keys(updates);
  if (keys.length === 0) return Response.json({ error: 'No fields to update' }, { status: 400 });

  const setClauses: string[] = [];
  const values: unknown[] = [];
  for (const key of keys) {
    const v = (updates as Record<string, unknown>)[key];
    setClauses.push(`${key} = ?`);
    values.push(typeof v === 'boolean' ? (v ? 1 : 0) : v);
  }
  setClauses.push(`updated_at = datetime('now')`);

  try {
    const res = await context.env.DB
      .prepare(`UPDATE makers SET ${setClauses.join(', ')} WHERE id = ?`)
      .bind(...values, id)
      .run();
    if (!res.meta.changes) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to update maker', detail: message }, { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  const row = await context.env.DB
    .prepare('SELECT photo_r2_key FROM makers WHERE id = ?')
    .bind(id)
    .first<{ photo_r2_key: string | null }>();
  if (!row) return Response.json({ error: 'Not found' }, { status: 404 });

  // We can't reliably delete the R2 object here without the R2 binding on
  // this route — the photo upload/delete route handles R2 cleanup. On hard
  // delete of the row, orphan bytes may remain; negligible scale.
  await context.env.DB.prepare('DELETE FROM makers WHERE id = ?').bind(id).run();
  return Response.json({ success: true });
};
