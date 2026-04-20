// Discount-code validation + calculation.
//
// Used in two places:
//   1. POST /api/discounts/apply — pre-checkout preview so the UI can show
//      "−$2.50" in the cart summary before the customer pays.
//   2. POST /api/checkout/create-intent — final authoritative pass when the
//      PaymentIntent is being created. The apply preview is NEVER trusted;
//      we re-validate with the current DB state here.
//
// Discount counters (uses_count + discount_usages row) are written only on
// payment_intent.succeeded in the webhook, not during apply. This is the
// correct UX+integrity trade-off: an abandoned cart doesn't burn a use.

export interface DiscountCodeRow {
  id: number;
  code: string;
  type: 'percent' | 'fixed';
  value: number;                  // percent 0–100 or cents (for 'fixed')
  min_subtotal_cents: number | null;
  max_uses: number | null;
  uses_count: number;
  expires_at: string | null;
  is_active: number;
}

export interface DiscountResult {
  ok: true;
  code: DiscountCodeRow;
  discount_cents: number;
}

export interface DiscountFailure {
  ok: false;
  reason: 'not_found' | 'inactive' | 'expired' | 'used_up' | 'below_minimum';
  message: string;
}

// Explicit type guard — our tsconfig runs with strict: false, which suppresses
// TypeScript's automatic narrowing of `!result.ok` on discriminated unions.
// Consumers should use this predicate instead of checking `.ok` directly.
export function isDiscountFailure(r: DiscountResult | DiscountFailure): r is DiscountFailure {
  return r.ok === false;
}

export async function loadDiscountCode(db: D1Database, raw: string): Promise<DiscountCodeRow | null> {
  const code = raw.trim().toUpperCase();
  if (!/^[A-Z0-9_-]{1,50}$/.test(code)) return null;
  return db
    .prepare('SELECT * FROM discount_codes WHERE code = ?')
    .bind(code)
    .first<DiscountCodeRow>();
}

export function validateAndCalculate(code: DiscountCodeRow, subtotalCents: number): DiscountResult | DiscountFailure {
  if (!code.is_active) {
    return { ok: false, reason: 'inactive', message: 'This code is no longer active.' };
  }
  if (code.expires_at && new Date(code.expires_at).getTime() < Date.now()) {
    return { ok: false, reason: 'expired', message: 'This code has expired.' };
  }
  if (code.max_uses !== null && code.uses_count >= code.max_uses) {
    return { ok: false, reason: 'used_up', message: 'This code has been fully redeemed.' };
  }
  const min = code.min_subtotal_cents ?? 0;
  if (subtotalCents < min) {
    const minDollars = (min / 100).toFixed(2);
    return {
      ok: false,
      reason: 'below_minimum',
      message: `Minimum order of $${minDollars} required for this code.`,
    };
  }

  let discount_cents: number;
  if (code.type === 'percent') {
    // Round down to the cent — never discount more than the subtotal.
    discount_cents = Math.min(Math.floor((subtotalCents * code.value) / 100), subtotalCents);
  } else {
    // 'fixed' value is stored in cents. Cap at subtotal so we don't credit back.
    discount_cents = Math.min(code.value, subtotalCents);
  }
  return { ok: true, code, discount_cents };
}
