// GET /api/blog — public feed.
//
// Only returns published posts (published_at IS NOT NULL AND <= now). Optional
// ?category=… filter. Fields returned are list-friendly — full `content` is
// fetched by /api/blog/[slug] on demand so the feed stays small.

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const category = url.searchParams.get('category');
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50', 10) || 50, 100);

  const clauses = ["published_at IS NOT NULL", "published_at <= datetime('now')"];
  const values: unknown[] = [];
  if (category) { clauses.push('category = ?'); values.push(category); }

  try {
    const res = await context.env.DB
      .prepare(
        `SELECT id, slug, title, excerpt, cover_r2_key, author, category, published_at
         FROM blog_posts
         WHERE ${clauses.join(' AND ')}
         ORDER BY published_at DESC, id DESC
         LIMIT ?`,
      )
      .bind(...values, limit)
      .all();
    return Response.json({ success: true, posts: res.results ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to load blog', detail: message }, { status: 500 });
  }
};
