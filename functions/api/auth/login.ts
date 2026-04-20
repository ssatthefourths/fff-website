import { hashPassword, verifyPassword, createSession, buildSessionCookie } from '../lib/auth';

interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { email, password } = await context.request.json() as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    return Response.json({ error: 'Email and password required' }, { status: 400 });
  }

  try {
    const user = await context.env.DB.prepare(
      'SELECT id, name, email, role, password_hash FROM users WHERE email = ?'
    ).bind(email).first<{ id: number; name: string; email: string; role: string; password_hash: string }>();

    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const { valid, needsRehash } = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (needsRehash) {
      const fresh = await hashPassword(password);
      await context.env.DB.prepare('UPDATE users SET password_hash = ?, updated_at = datetime(\'now\') WHERE id = ?')
        .bind(fresh, user.id).run();
    }

    const token = await createSession(context.env.DB, user.id);

    return Response.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    }, {
      headers: { 'Set-Cookie': buildSessionCookie(token) },
    });
  } catch (err: any) {
    return Response.json({ error: 'Login failed', detail: err.message }, { status: 500 });
  }
};
