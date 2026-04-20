import { z } from 'zod';

interface Env {
  DB: D1Database;
}

const patchCategorySchema = z.object({
  slug: z.string().trim().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
  name: z.string().trim().min(1).max(200).optional(),
  description: z.string().max(2000).nullable().optional(),
  sort_order: z.number().int().min(0).max(10_000).optional(),
}).strict();

function parseId(raw: unknown): number | null {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = patchCategorySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const updates = parsed.data;
  const keys = Object.keys(updates);
  if (keys.length === 0) return Response.json({ error: 'No fields to update' }, { status: 400 });

  if (updates.slug) {
    const conflict = await context.env.DB
      .prepare('SELECT id FROM categories WHERE slug = ? AND id != ?')
      .bind(updates.slug, id)
      .first();
    if (conflict) {
      return Response.json({ error: 'Another category already uses that slug' }, { status: 409 });
    }
  }

  const setClauses = keys.map((k) => `${k} = ?`);
  const values = keys.map((k) => (updates as Record<string, unknown>)[k]);

  try {
    const res = await context.env.DB
      .prepare(`UPDATE categories SET ${setClauses.join(', ')} WHERE id = ?`)
      .bind(...values, id)
      .run();

    if (!res.meta.changes) return Response.json({ error: 'Category not found' }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to update category', detail: message }, { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  try {
    const res = await context.env.DB
      .prepare('DELETE FROM categories WHERE id = ?')
      .bind(id)
      .run();
    if (!res.meta.changes) return Response.json({ error: 'Category not found' }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to delete category', detail: message }, { status: 500 });
  }
};
