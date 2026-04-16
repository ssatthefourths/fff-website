interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { name, email } = await context.request.json() as { name: string; email: string };

  if (!name || !email || !email.includes('@')) {
    return Response.json({ error: 'Name and valid email are required' }, { status: 400 });
  }

  try {
    await context.env.DB.prepare(
      'INSERT INTO newsletter_subscribers (name, email) VALUES (?, ?) ON CONFLICT(email) DO UPDATE SET name = ?, is_active = 1'
    ).bind(name, email, name).run();

    return Response.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err: any) {
    return Response.json({ error: 'Failed to subscribe', detail: err.message }, { status: 500 });
  }
};
