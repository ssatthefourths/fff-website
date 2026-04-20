import { z } from 'zod';

interface Env {
  DB: D1Database;
}

const difficultyEnum = z.enum(['beginner', 'intermediate', 'advanced']);

// PATCH body: every field optional; only supplied keys are updated.
const patchProductSchema = z.object({
  name: z.string().trim().min(1).max(200).optional(),
  slug: z.string().trim().min(1).max(200).regex(/^[a-z0-9-]+$/).optional(),
  price: z.number().nonnegative().max(100_000).optional(),
  description: z.string().max(10_000).nullable().optional(),
  short_description: z.string().max(500).nullable().optional(),
  category: z.string().min(1).max(100).optional(),
  difficulty: difficultyEnum.optional(),
  image_url: z.string().url().max(1000).nullable().optional(),
  is_free: z.boolean().optional(),
  is_new: z.boolean().optional(),
  is_featured: z.boolean().optional(),
}).strict();

function parseId(raw: unknown): number | null {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  try {
    const product = await context.env.DB
      .prepare('SELECT * FROM products WHERE id = ?')
      .bind(id)
      .first();
    if (!product) return Response.json({ error: 'Product not found' }, { status: 404 });
    return Response.json({ success: true, product });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to fetch product', detail: message }, { status: 500 });
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = patchProductSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const updates = parsed.data;
  const keys = Object.keys(updates);
  if (keys.length === 0) {
    return Response.json({ error: 'No fields to update' }, { status: 400 });
  }

  // Map JS booleans to D1 integer columns.
  const setClauses: string[] = [];
  const values: unknown[] = [];
  for (const key of keys) {
    const value = (updates as Record<string, unknown>)[key];
    setClauses.push(`${key} = ?`);
    if (typeof value === 'boolean') values.push(value ? 1 : 0);
    else values.push(value);
  }
  setClauses.push(`updated_at = datetime('now')`);

  // If slug is changing, ensure it stays unique.
  if (updates.slug) {
    const conflict = await context.env.DB
      .prepare('SELECT id FROM products WHERE slug = ? AND id != ?')
      .bind(updates.slug, id)
      .first();
    if (conflict) {
      return Response.json({ error: 'Another product already uses that slug' }, { status: 409 });
    }
  }

  try {
    const res = await context.env.DB
      .prepare(`UPDATE products SET ${setClauses.join(', ')} WHERE id = ?`)
      .bind(...values, id)
      .run();

    if (!res.meta.changes) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to update product', detail: message }, { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  try {
    const res = await context.env.DB
      .prepare('DELETE FROM products WHERE id = ?')
      .bind(id)
      .run();

    if (!res.meta.changes) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to delete product', detail: message }, { status: 500 });
  }
};
