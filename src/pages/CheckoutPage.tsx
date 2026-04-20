import { useEffect, useMemo, useState, type SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { loadStripe, type Stripe as StripeJs } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Cache the loadStripe Promise once per publishable key. @stripe/stripe-js
// requires the same Promise instance across re-renders or <Elements /> warns.
const stripeCache = new Map<string, Promise<StripeJs | null>>();
function stripeFor(key: string): Promise<StripeJs | null> {
  const hit = stripeCache.get(key);
  if (hit) return hit;
  const p = loadStripe(key);
  stripeCache.set(key, p);
  return p;
}

interface CreateIntentResponse {
  success?: boolean;
  orderId?: number;
  clientSecret?: string | null;
  freeOrder?: boolean;
  error?: string;
}

interface PublicConfigResponse {
  stripePublishableKey?: string | null;
}

function CheckoutInner({ clientSecret, orderId }: { clientSecret: string; orderId: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    // Build the return URL that Stripe redirects to once card confirmation
    // finishes (including 3D Secure challenges). The success page reads the
    // ?payment_intent=… query param to render confirmation.
    const returnUrl = `${window.location.origin}/checkout/success?order=${orderId}`;

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    });

    // stripe.confirmPayment only returns control here for *immediate* client-
    // side errors (invalid card details, etc.). On success it redirects
    // before resolving.
    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed');
      setSubmitting(false);
      return;
    }
    // If we got here with no error and no redirect, clear the cart optimistically.
    clearCart();
  }

  // clientSecret is stable per mount; suppress the unused-variable warning
  // by referencing it (the <Elements> parent passes it in too).
  void clientSecret;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: 'accordion' }} />
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || !elements || submitting}
        className="w-full rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}
      >
        {submitting ? 'Processing…' : 'Pay now'}
      </button>
    </form>
  );
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, itemCount } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [stage, setStage] = useState<'details' | 'payment'>('details');
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Discount code state. The `applied` object is the server's acknowledgement
  // that the code is valid for the current subtotal — we don't trust client-
  // computed discounts anywhere (create-intent re-validates authoritatively).
  const [discountInput, setDiscountInput] = useState('');
  const [applied, setApplied] = useState<{ code: string; discount_cents: number } | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [applyingCode, setApplyingCode] = useState(false);

  const subtotalCents = Math.round(total * 100);
  const discountCents = applied?.discount_cents ?? 0;
  const grandTotalCents = Math.max(0, subtotalCents - discountCents);

  // Prefill from auth if logged in.
  useEffect(() => {
    if (user) {
      setCustomerName((n) => n || user.name);
      setCustomerEmail((e) => e || user.email);
    }
  }, [user]);

  // Fetch the publishable key from /api/config/public (see backend comment).
  useEffect(() => {
    fetch('/api/config/public')
      .then((r) => r.json() as Promise<PublicConfigResponse>)
      .then((data) => setPublishableKey(data.stripePublishableKey ?? null))
      .catch(() => setPublishableKey(null));
  }, []);

  async function startPayment(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          customer_name: customerName.trim(),
          customer_email: customerEmail.trim(),
          items: items.map((p) => ({ product_id: parseInt(p.id, 10) })),
          ...(applied ? { discount_code: applied.code } : {}),
        }),
      });
      const data = (await res.json()) as CreateIntentResponse;
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      if (data.freeOrder && data.orderId) {
        // All items were free → order is already paid, skip Stripe entirely.
        navigate(`/checkout/success?order=${data.orderId}`, { replace: true });
        return;
      }
      if (!data.clientSecret || !data.orderId) {
        throw new Error('Missing client secret');
      }
      setClientSecret(data.clientSecret);
      setOrderId(data.orderId);
      setStage('payment');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start checkout');
    } finally {
      setCreating(false);
    }
  }

  const stripePromise = useMemo(
    () => (publishableKey ? stripeFor(publishableKey) : null),
    [publishableKey],
  );

  async function applyDiscount() {
    const code = discountInput.trim();
    if (!code) return;
    setApplyingCode(true);
    setDiscountError(null);
    try {
      const res = await fetch('/api/discounts/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal_cents: subtotalCents }),
      });
      const data = (await res.json()) as {
        success?: boolean;
        code?: string;
        discount_cents?: number;
        message?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      if (!data.success) {
        setApplied(null);
        setDiscountError(data.message ?? 'That code did not work.');
        return;
      }
      setApplied({ code: data.code ?? code.toUpperCase(), discount_cents: data.discount_cents ?? 0 });
      setDiscountInput('');
    } catch (err) {
      setDiscountError(err instanceof Error ? err.message : 'Unable to apply code');
    } finally {
      setApplyingCode(false);
    }
  }

  function clearDiscount() {
    setApplied(null);
    setDiscountError(null);
  }

  // ── Empty cart ──────────────────────────────────────────────────
  if (itemCount === 0) {
    return (
      <div className="bg-[#fffdf3] min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-[#8b52c5] text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>Nothing to checkout</h1>
        <p className="text-[#3f3f3f] mb-8" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
          Your cart is empty. Add some patterns first!
        </p>
        <Link
          to="/patterns"
          className="inline-block rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all"
          style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-[#8b52c5] text-3xl md:text-4xl lg:text-5xl mb-8" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {stage === 'details' && (
                <form onSubmit={startPayment}>
                  <div className="bg-white rounded-[20px] shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-[#3f3f3f] mb-6" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
                      Customer information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#3f3f3f] mb-1">Full name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-[12px] border border-[#3f3f3f]/20 text-[#3f3f3f] focus:outline-none focus:border-[#8b52c5] focus:ring-2 focus:ring-[#8b52c5]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#3f3f3f] mb-1">Email address</label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-[12px] border border-[#3f3f3f]/20 text-[#3f3f3f] focus:outline-none focus:border-[#8b52c5] focus:ring-2 focus:ring-[#8b52c5]/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[20px] shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-[#3f3f3f] mb-4" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
                      Discount code
                    </h2>
                    {applied ? (
                      <div className="flex items-center justify-between bg-[#f4eefa] border border-[#8b52c5]/30 rounded-[12px] px-4 py-3">
                        <div>
                          <p className="font-mono font-bold text-[#8b52c5]">{applied.code}</p>
                          <p className="text-[12px] text-[#3f3f3f]/60 mt-0.5">
                            −${(applied.discount_cents / 100).toFixed(2)} applied
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={clearDiscount}
                          className="text-[12px] text-[#8b52c5] hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={discountInput}
                            onChange={(e) => { setDiscountInput(e.target.value); setDiscountError(null); }}
                            onKeyDown={(e) => {
                              // Allow submit via Enter without bubbling to the outer form.
                              if (e.key === 'Enter') { e.preventDefault(); void applyDiscount(); }
                            }}
                            placeholder="e.g. WELCOME10"
                            className="flex-1 px-4 py-3 rounded-[12px] border border-[#3f3f3f]/20 text-[#3f3f3f] font-mono uppercase focus:outline-none focus:border-[#8b52c5] focus:ring-2 focus:ring-[#8b52c5]/20 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => { void applyDiscount(); }}
                            disabled={applyingCode || !discountInput.trim()}
                            className="px-5 py-3 rounded-[12px] bg-[#8b52c5] text-white font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110 disabled:opacity-50 cursor-pointer"
                          >
                            {applyingCode ? 'Checking…' : 'Apply'}
                          </button>
                        </div>
                        {discountError && (
                          <p className="mt-2 text-[13px] text-red-700">{discountError}</p>
                        )}
                      </>
                    )}
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px] mb-4">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={creating}
                    className="w-full rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#8b52c5] text-white hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
                    style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}
                  >
                    {creating ? 'Preparing payment…' : 'Continue to payment'}
                  </button>
                </form>
              )}

              {stage === 'payment' && clientSecret && publishableKey && stripePromise && orderId !== null && (
                <div className="bg-white rounded-[20px] shadow-md p-6">
                  <h2 className="text-xl font-bold text-[#3f3f3f] mb-6" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
                    Payment
                  </h2>
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'flat',
                        variables: {
                          colorPrimary: '#8b52c5',
                          colorText: '#3f3f3f',
                          borderRadius: '12px',
                          fontFamily: "Roboto, system-ui, sans-serif",
                        },
                      },
                    }}
                  >
                    <CheckoutInner clientSecret={clientSecret} orderId={orderId} />
                  </Elements>
                  <p className="text-[12px] text-[#3f3f3f]/50 mt-4 text-center">
                    Test card: <code>4242 4242 4242 4242</code> • any future date • any CVC
                  </p>
                </div>
              )}

              {stage === 'payment' && !publishableKey && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-[12px] px-4 py-3 text-[14px] text-yellow-900">
                  Stripe publishable key not configured — admin needs to set <code>STRIPE_PUBLISHABLE_KEY</code>.
                </div>
              )}
            </div>

            {/* Order summary — always shown */}
            <div>
              <div className="bg-white rounded-[20px] shadow-md p-6 sticky top-8">
                <h3 className="text-lg font-bold text-[#3f3f3f] mb-4" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
                  Order summary
                </h3>
                <p className="text-[#3f3f3f]/60 text-sm mb-4">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>
                <hr className="border-[#f4eefa] mb-4" />
                <ul className="space-y-3 mb-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center text-sm text-[#3f3f3f]">
                      <span className="truncate mr-2">{item.name}</span>
                      <span className="font-bold whitespace-nowrap">
                        {item.isFree ? 'FREE' : `$${item.price.toFixed(2)}`}
                      </span>
                    </li>
                  ))}
                </ul>
                <hr className="border-[#f4eefa] mb-4" />
                {applied && (
                  <>
                    <div className="flex justify-between items-center text-sm text-[#3f3f3f] mb-2">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-[#8b52c5] mb-3">
                      <span>Discount <span className="font-mono text-[11px] bg-[#f4eefa] px-1.5 py-0.5 rounded ml-1">{applied.code}</span></span>
                      <span className="font-bold">−${(applied.discount_cents / 100).toFixed(2)}</span>
                    </div>
                    <hr className="border-[#f4eefa] mb-3" />
                  </>
                )}
                <div className="flex justify-between items-center text-xl font-bold text-[#3f3f3f]">
                  <span>Total</span>
                  <span className="text-[#8b52c5]">${(grandTotalCents / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CheckoutPage;
