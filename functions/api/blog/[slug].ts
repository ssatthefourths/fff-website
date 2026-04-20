// GET /api/blog/[slug] — public post detail. 404 on draft/unpublished.

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const slugParam = context.params.slug;
  const slug = typeof slugParam === 'string' ? slugParam : '';
  if (!slug) return Response.json({ error: 'Invalid slug' }, { status: 400 });

  try {
    const post = await context.env.DB
      .prepare(
        `SELECT id, slug, title, excerpt, content, cover_r2_key, author, category, published_at
         FROM blog_posts
         WHERE slug = ? AND published_at IS NOT NULL AND published_at <= datetime('now')`,
      )
      .bind(slug)
      .first();
    if (!post) return Response.json({ error: 'Post not found' }, { status: 404 });
    return Response.json({ success: true, post });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to load post', detail: message }, { status: 500 });
  }
};
