import { requireAdmin } from '../lib/auth';

interface Env {
  DB: D1Database;
  ENVIRONMENT?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const guardResponse = requireAdmin(context.request, { ENVIRONMENT: context.env.ENVIRONMENT });
  if (guardResponse) return guardResponse;
  return context.next();
};
