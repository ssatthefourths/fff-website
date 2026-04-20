import { z } from 'zod';

interface Env {
  DB: D1Database;
}

const createSchema = z.object({
  code: z.string().trim().min(1).max(50).regex(/^[A-Z0-9_-]+$/i, 'letters/digits/underscore/hyphen only').transform((v) => v.toUpperCase()),
  type: z.enum(['percent', 'fixed']),
  value: z.number().int().positive(),
  min_subtotal_cents: z.number().int().nonnegative().optional(),
  max_uses: z.number().int().positive().nullable().optional(),
  expires_at: z.string().datetime().nullable().optional(),
  is_active: z.boolean().optional(),
}).refine((d) => d.type !== 'percent' || d.value <= 100, {
  message: 'Percent value must be 0–100',
  path: ['value'],
});

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const res = await context.env.DB
      .prepare('SELECT * FROM discount_codes ORDER BY created_at DESC, id DESC')
      .all();
    return Response.json({ success: true, codes: res.results ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to list discount codes', detail: message }, { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const c = parsed.data;

  try {
    const existing = await context.env.DB
      .prepare('SELECT id FROM discount_codes WHERE code = ?')
      .bind(c.code)
      .first();
    if (existing) return Response.json({ error: 'Code already exists' }, { status: 409 });

    const result = await context.env.DB
      .prepare(
        `INSERT INTO discount_codes
           (code, type, value, min_subtotal_cents, max_uses, expires_at, is_active)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        c.code,
        c.type,
        c.value,
        c.min_subtotal_cents ?? 0,
        c.max_uses ?? null,
        c.expires_at ?? null,
        c.is_active === false ? 0 : 1,
      )
      .run();
    return Response.json({ success: true, id: Number(result.meta.last_row_id) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to create discount code', detail: message }, { status: 500 });
  }
};
