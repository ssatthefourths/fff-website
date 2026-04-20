// POST /api/discounts/apply
//
// Public endpoint — the checkout UI calls it to preview a discount before
// the customer enters payment details. The reply is advisory; the authoritative
// application happens server-side during create-intent, so a malicious client
// can't fake a bigger discount by editing the preview response.
//
// Body: { code: string, subtotal_cents: number }
// 200 ok:    { success: true, code, type, value, discount_cents, reason: null }
// 200 nope:  { success: false, reason, message } — still HTTP 200 so the SPA
//            can render the message without an error toast.

import { z } from 'zod';
import { loadDiscountCode, validateAndCalculate, isDiscountFailure } from '../lib/discounts';

interface Env {
  DB: D1Database;
}

const bodySchema = z.object({
  code: z.string().trim().min(1).max(50),
  subtotal_cents: z.number().int().nonnegative().max(10_000_000),
});

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }
  const { code: rawCode, subtotal_cents } = parsed.data;

  const row = await loadDiscountCode(context.env.DB, rawCode);
  if (!row) {
    return Response.json({ success: false, reason: 'not_found', message: "We couldn't find that code." });
  }

  const result = validateAndCalculate(row, subtotal_cents);
  if (isDiscountFailure(result)) {
    return Response.json({ success: false, reason: result.reason, message: result.message });
  }

  return Response.json({
    success: true,
    code: result.code.code,
    type: result.code.type,
    value: result.code.value,
    discount_cents: result.discount_cents,
  });
};
