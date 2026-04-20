import { z } from 'zod';

interface Env {
  DB: D1Database;
}

const createSchema = z.object({
  slug: z.string().trim().min(1).max(200).regex(/^[a-z0-9-]+$/, 'lowercase kebab-case only'),
  title: z.string().trim().min(1).max(300),
  excerpt: z.string().max(1000).nullable().optional(),
  content: z.string().min(1).max(100_000),
  cover_r2_key: z.string().max(500).nullable().optional(),
  author: z.string().trim().min(1).max(200).optional(),
  category: z.string().trim().min(1).max(100).nullable().optional(),
  published: z.boolean().optional(), // true → set published_at to now; false → NULL
});

// GET /api/admin/blog — list all posts including drafts.
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const res = await context.env.DB
      .prepare(
        `SELECT id, slug, title, excerpt, cover_r2_key, author, category,
                published_at, created_at, updated_at
         FROM blog_posts
         ORDER BY COALESCE(published_at, created_at) DESC, id DESC`,
      )
      .all();
    return Response.json({ success: true, posts: res.results ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to list posts', detail: message }, { status: 500 });
  }
};

// POST /api/admin/blog — create.
export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: unknown;
  try { body = await context.request.json(); }
  catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const p = parsed.data;

  try {
    const existing = await context.env.DB
      .prepare('SELECT id FROM blog_posts WHERE slug = ?')
      .bind(p.slug)
      .first();
    if (existing) return Response.json({ error: 'Slug already in use' }, { status: 409 });

    const result = await context.env.DB
      .prepare(
        `INSERT INTO blog_posts
           (slug, title, excerpt, content, cover_r2_key, author, category, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        p.slug,
        p.title,
        p.excerpt ?? null,
        p.content,
        p.cover_r2_key ?? null,
        p.author ?? 'Pauline McArthur',
        p.category ?? null,
        p.published ? new Date().toISOString() : null,
      )
      .run();
    return Response.json({ success: true, id: Number(result.meta.last_row_id) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to create post', detail: message }, { status: 500 });
  }
};
