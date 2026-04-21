import { z } from 'zod';

interface Env {
  DB: D1Database;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

const createSchema = z.object({
  name: z.string().trim().min(1).max(200),
  pattern_name: z.string().trim().min(1).max(200),
  month: z.enum(MONTHS),
  year: z.number().int().min(2000).max(2100),
  is_winner: z.boolean().optional(),
  sort_order: z.number().int().min(0).max(1000).optional(),
});

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const res = await context.env.DB
      .prepare(
        `SELECT id, name, pattern_name, photo_r2_key, month, year, is_winner, sort_order, created_at
         FROM makers
         ORDER BY year DESC, sort_order, id`,
      )
      .all();
    return Response.json({ success: true, makers: res.results ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to list makers', detail: message }, { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: unknown;
  try { body = await context.request.json(); }
  catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const m = parsed.data;

  try {
    const conflict = await context.env.DB
      .prepare('SELECT id FROM makers WHERE name = ? AND month = ? AND year = ?')
      .bind(m.name, m.month, m.year)
      .first();
    if (conflict) {
      return Response.json({ error: 'A maker with this name already exists for that month/year' }, { status: 409 });
    }

    const result = await context.env.DB
      .prepare(
        `INSERT INTO makers (name, pattern_name, month, year, is_winner, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .bind(m.name, m.pattern_name, m.month, m.year, m.is_winner ? 1 : 0, m.sort_order ?? 0)
      .run();
    return Response.json({ success: true, id: Number(result.meta.last_row_id) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to create maker', detail: message }, { status: 500 });
  }
};
