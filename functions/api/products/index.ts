interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const category = url.searchParams.get('category');
  const search = url.searchParams.get('q');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');

  try {
    let query = 'SELECT * FROM products WHERE 1=1';
    const bindings: any[] = [];

    if (category) {
      query += ' AND category = ?';
      bindings.push(category);
    }

    if (search) {
      query += ' AND (name LIKE ? OR short_description LIKE ?)';
      bindings.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    bindings.push(limit, offset);

    const result = await context.env.DB.prepare(query).bind(...bindings).all();

    return Response.json({
      success: true,
      products: result.results,
      meta: { total: result.results.length, limit, offset },
    });
  } catch (err: any) {
    return Response.json({ error: 'Failed to fetch products', detail: err.message }, { status: 500 });
  }
};
