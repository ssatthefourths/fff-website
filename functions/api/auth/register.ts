import { hashPassword, createSession, buildSessionCookie } from '../lib/auth';

interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { name, email, password } = await context.request.json() as {
    name: string;
    email: string;
    password: string;
  };

  if (!name || !email || !password || password.length < 6) {
    return Response.json({ error: 'Name, email, and password (min 6 chars) required' }, { status: 400 });
  }

  try {
    const existing = await context.env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
    if (existing) {
      return Response.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const password_hash = await hashPassword(password);
    const result = await context.env.DB.prepare(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'
    ).bind(name, email, password_hash).run();

    const userId = Number(result.meta.last_row_id);
    const token = await createSession(context.env.DB, userId);

    return Response.json({
      success: true,
      user: { id: userId, name, email },
      token,
    }, {
      headers: { 'Set-Cookie': buildSessionCookie(token) },
    });
  } catch (err: any) {
    return Response.json({ error: 'Registration failed', detail: err.message }, { status: 500 });
  }
};
