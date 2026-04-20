import { z } from 'zod';

interface Env {
  DB: D1Database;
}

const difficultyEnum = z.enum(['beginner', 'intermediate', 'advanced']);

const createProductSchema = z.object({
  name: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(200).regex(/^[a-z0-9-]+$/, 'slug must be lowercase kebab-case'),
  price: z.number().nonnegative().max(100_000),
  description: z.string().max(10_000).nullable().optional(),
  short_description: z.string().max(500).nullable().optional(),
  category: z.string().min(1).max(100),
  difficulty: difficultyEnum.optional(),
  image_url: z.string().url().max(1000).nullable().optional(),
  is_free: z.boolean().optional(),
  is_new: z.boolean().optional(),
  is_featured: z.boolean().optional(),
});

// GET /api/admin/products — list all products (including drafts in future).
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '100', 10) || 100, 500);
  const offset = Math.max(parseInt(url.searchParams.get('offset') ?? '0', 10) || 0, 0);

  try {
    const res = await context.env.DB
      .prepare('SELECT * FROM products ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?')
      .bind(limit, offset)
      .all();

    return Response.json({
      success: true,
      products: res.results ?? [],
      meta: { limit, offset, count: res.results?.length ?? 0 },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to list products', detail: message }, { status: 500 });
  }
};

// POST /api/admin/products — create a product.
export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = createProductSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const p = parsed.data;

  try {
    const existing = await context.env.DB
      .prepare('SELECT id FROM products WHERE slug = ?')
      .bind(p.slug)
      .first();
    if (existing) {
      return Response.json({ error: 'A product with this slug already exists' }, { status: 409 });
    }

    const result = await context.env.DB
      .prepare(
        `INSERT INTO products (
           name, slug, price, description, short_description, category,
           difficulty, image_url, is_free, is_new, is_featured
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        p.name,
        p.slug,
        p.price,
        p.description ?? null,
        p.short_description ?? null,
        p.category,
        p.difficulty ?? 'beginner',
        p.image_url ?? null,
        p.is_free ? 1 : 0,
        p.is_new ? 1 : 0,
        p.is_featured ? 1 : 0,
      )
      .run();

    const id = Number(result.meta.last_row_id);
    return Response.json({ success: true, id }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to create product', detail: message }, { status: 500 });
  }
};
