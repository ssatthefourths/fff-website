interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const orders = await context.env.DB.prepare(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT 100'
    ).all();

    return Response.json({ success: true, orders: orders.results });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
