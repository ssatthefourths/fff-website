interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const result = await context.env.DB.prepare(
      'SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC LIMIT 100'
    ).all();
    return Response.json({ success: true, subscribers: result.results });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
