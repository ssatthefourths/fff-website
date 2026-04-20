import { getSessionCookie, getSessionUser } from '../lib/auth';

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const token = getSessionCookie(context.request);
  const user = await getSessionUser(context.env.DB, token);
  if (!user) {
    return Response.json({ user: null }, { status: 200 });
  }
  return Response.json({ user });
};
