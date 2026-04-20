import { getAdminUser } from '../lib/auth';

interface Env {
  DB: D1Database;
  ENVIRONMENT?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // (a) Cloudflare Access header — present when CF Access fronts the route
  if (context.request.headers.get('Cf-Access-Authenticated-User-Email')) {
    return context.next();
  }
  // (b) Session-based admin fallback — logged-in user with role='admin'
  const admin = await getAdminUser(context.env.DB, context.request);
  if (admin) return context.next();
  // Local dev bypass
  if (context.env.ENVIRONMENT === 'development') return context.next();
  return Response.json({ error: 'Admin access required' }, { status: 403 });
};
