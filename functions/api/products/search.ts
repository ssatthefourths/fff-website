interface Env {
  DB: D1Database;
}

// Full-text search using the products_fts virtual table (migration 0002).
// Appends * to each term so partial matches work ("tedd" → "teddy").
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const q = url.searchParams.get('q')?.trim();
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '20', 10) || 20, 100);

  if (!q || q.length < 2) {
    return Response.json({ success: true, results: [], query: q ?? '' });
  }

  // FTS5 treats " * : ( ) as operators — strip them before tokenising.
  const sanitised = q.replace(/["*:()]/g, ' ').trim();
  if (!sanitised) {
    return Response.json({ success: true, results: [], query: q });
  }

  const ftsQuery = sanitised
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => `${t}*`)
    .join(' ');

  try {
    const res = await context.env.DB
      .prepare(
        `SELECT p.id, p.name, p.slug, p.price, p.short_description, p.category, p.difficulty,
                p.image_url, p.is_free, p.is_new, p.is_featured
         FROM products_fts fts
         JOIN products p ON p.id = fts.rowid
         WHERE products_fts MATCH ?
         ORDER BY rank
         LIMIT ?`,
      )
      .bind(ftsQuery, limit)
      .all();

    return Response.json({
      success: true,
      query: q,
      results: res.results ?? [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Search failed', detail: message }, { status: 500 });
  }
};
