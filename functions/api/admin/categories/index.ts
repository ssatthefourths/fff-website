import { z } from 'zod';

interface Env {
  DB: D1Database;
}

const createCategorySchema = z.object({
  slug: z.string().trim().min(1).max(100).regex(/^[a-z0-9-]+$/, 'slug must be lowercase kebab-case'),
  name: z.string().trim().min(1).max(200),
  description: z.string().max(2000).nullable().optional(),
  sort_order: z.number().int().min(0).max(10_000).optional(),
});

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const res = await context.env.DB
      .prepare('SELECT * FROM categories ORDER BY sort_order, name')
      .all();
    return Response.json({ success: true, categories: res.results ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to list categories', detail: message }, { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = createCategorySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const c = parsed.data;

  try {
    const existing = await context.env.DB
      .prepare('SELECT id FROM categories WHERE slug = ?')
      .bind(c.slug)
      .first();
    if (existing) {
      return Response.json({ error: 'A category with this slug already exists' }, { status: 409 });
    }

    const result = await context.env.DB
      .prepare('INSERT INTO categories (slug, name, description, sort_order) VALUES (?, ?, ?, ?)')
      .bind(c.slug, c.name, c.description ?? null, c.sort_order ?? 0)
      .run();

    return Response.json({ success: true, id: Number(result.meta.last_row_id) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to create category', detail: message }, { status: 500 });
  }
};
