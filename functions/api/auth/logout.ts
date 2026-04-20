import { getSessionCookie, deleteSession, buildClearSessionCookie } from '../lib/auth';

interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const token = getSessionCookie(context.request);
  if (token) {
    await deleteSession(context.env.DB, token);
  }
  return Response.json({ success: true }, {
    headers: { 'Set-Cookie': buildClearSessionCookie() },
  });
};
