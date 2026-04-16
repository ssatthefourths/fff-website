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

    // Create simple session token
    const token = crypto.randomUUID();

    return Response.json({
      success: true,
      user: { id: result.meta.last_row_id, name, email },
      token,
    }, {
      headers: {
        'Set-Cookie': `fff_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
      },
    });
  } catch (err: any) {
    return Response.json({ error: 'Registration failed', detail: err.message }, { status: 500 });
  }
};
