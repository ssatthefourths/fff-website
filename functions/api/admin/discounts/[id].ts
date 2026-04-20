import { z } from 'zod';

interface Env {
  DB: D1Database;
}

const patchSchema = z.object({
  code: z.string().trim().min(1).max(50).regex(/^[A-Z0-9_-]+$/i).transform((v) => v.toUpperCase()).optional(),
  type: z.enum(['percent', 'fixed']).optional(),
  value: z.number().int().positive().optional(),
  min_subtotal_cents: z.number().int().nonnegative().optional(),
  max_uses: z.number().int().positive().nullable().optional(),
  expires_at: z.string().datetime().nullable().optional(),
  is_active: z.boolean().optional(),
}).strict();

function parseId(raw: unknown): number | null {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  let body: unknown;
  try { body = await context.request.json(); }
  catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const updates = parsed.data;
  const keys = Object.keys(updates);
  if (keys.length === 0) return Response.json({ error: 'No fields to update' }, { status: 400 });

  // Guard percent ≤ 100 when type or value is being changed.
  if ((updates.type === 'percent' || typeof updates.value === 'number')) {
    const existing = await context.env.DB
      .prepare('SELECT type, value FROM discount_codes WHERE id = ?')
      .bind(id)
      .first<{ type: string; value: number }>();
    if (!existing) return Response.json({ error: 'Not found' }, { status: 404 });
    const finalType = updates.type ?? existing.type;
    const finalValue = updates.value ?? existing.value;
    if (finalType === 'percent' && finalValue > 100) {
      return Response.json({ error: 'Percent value must be 0–100' }, { status: 400 });
    }
  }

  if (updates.code) {
    const conflict = await context.env.DB
      .prepare('SELECT id FROM discount_codes WHERE code = ? AND id != ?')
      .bind(updates.code, id)
      .first();
    if (conflict) return Response.json({ error: 'Another code already uses that value' }, { status: 409 });
  }

  const setClauses: string[] = [];
  const values: unknown[] = [];
  for (const key of keys) {
    const v = (updates as Record<string, unknown>)[key];
    setClauses.push(`${key} = ?`);
    if (typeof v === 'boolean') values.push(v ? 1 : 0);
    else values.push(v);
  }

  try {
    const res = await context.env.DB
      .prepare(`UPDATE discount_codes SET ${setClauses.join(', ')} WHERE id = ?`)
      .bind(...values, id)
      .run();
    if (!res.meta.changes) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to update discount code', detail: message }, { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const id = parseId(context.params.id);
  if (id === null) return Response.json({ error: 'Invalid id' }, { status: 400 });

  // Protect referential integrity — if this code has been used, soft-delete
  // via is_active=0 rather than hard-delete. discount_usages rows keep the
  // FK pointing at a still-existing row for audit.
  const usage = await context.env.DB
    .prepare('SELECT COUNT(*) as c FROM discount_usages WHERE discount_code_id = ?')
    .bind(id)
    .first<{ c: number }>();

  if (usage && usage.c > 0) {
    await context.env.DB
      .prepare(`UPDATE discount_codes SET is_active = 0 WHERE id = ?`)
      .bind(id)
      .run();
    return Response.json({ success: true, softDeleted: true });
  }

  const res = await context.env.DB
    .prepare('DELETE FROM discount_codes WHERE id = ?')
    .bind(id)
    .run();
  if (!res.meta.changes) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ success: true });
};
