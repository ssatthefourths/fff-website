interface Env {
  DB: D1Database;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
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
    const password_hash = await hashPassword(password);
    const user = await context.env.DB.prepare(
      'SELECT id, name, email, role FROM users WHERE email = ? AND password_hash = ?'
    ).bind(email, password_hash).first();

    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = crypto.randomUUID();

    return Response.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    }, {
      headers: {
        'Set-Cookie': `fff_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
      },
    });
  } catch (err: any) {
    return Response.json({ error: 'Login failed', detail: err.message }, { status: 500 });
  }
};
