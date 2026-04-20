import { z } from 'zod';

interface Env {
  DB: D1Database;
}

const patchSchema = z.object({
  slug: z.string().trim().min(1).max(200).regex(/^[a-z0-9-]+$/).optional(),
  title: z.string().trim().min(1).max(300).optional(),
  excerpt: z.string().max(1000).nullable().optional(),
  content: z.string().min(1).max(100_000).optional(),
  cover_r2_key: z.string().max(500).nullable().optional(),
  author: z.string().trim().min(1).max(200).optional(),
  category: z.string().trim().min(1).max(100).nullable().optional(),
  // For PATCH, `published` is a tri-state:
  //   true  → set published_at to now
  //   false → clear (draft)
  //   undef → don't touch
  published: z.boolean().optional(),
}).strict();

function parseId(raw: unknown): number | null {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  try {
    const post = await context.env.DB
      .prepare('SELECT * FROM blog_posts WHERE id = ?')
      .bind(id)
      .first();
    if (!post) return Response.json({ error: 'Post not found' }, { status: 404 });
    return Response.json({ success: true, post });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to fetch post', detail: message }, { status: 500 });
  }
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

  if (updates.slug) {
    const conflict = await context.env.DB
      .prepare('SELECT id FROM blog_posts WHERE slug = ? AND id != ?')
      .bind(updates.slug, id)
      .first();
    if (conflict) return Response.json({ error: 'Another post already uses that slug' }, { status: 409 });
  }

  const setClauses: string[] = [];
  const values: unknown[] = [];
  for (const key of keys) {
    if (key === 'published') {
      // Translate boolean to published_at column.
      setClauses.push('published_at = ?');
      values.push(updates.published ? new Date().toISOString() : null);
    } else {
      setClauses.push(`${key} = ?`);
      values.push((updates as Record<string, unknown>)[key]);
    }
  }
  setClauses.push(`updated_at = datetime('now')`);

  try {
    const res = await context.env.DB
      .prepare(`UPDATE blog_posts SET ${setClauses.join(', ')} WHERE id = ?`)
      .bind(...values, id)
      .run();
    if (!res.meta.changes) return Response.json({ error: 'Post not found' }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to update post', detail: message }, { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  try {
    const res = await context.env.DB
      .prepare('DELETE FROM blog_posts WHERE id = ?')
      .bind(id)
      .run();
    if (!res.meta.changes) return Response.json({ error: 'Post not found' }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to delete post', detail: message }, { status: 500 });
  }
};
