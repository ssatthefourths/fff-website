import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Stripe redirects back here after confirmPayment. The URL includes:
//   ?payment_intent=pi_…
//   &payment_intent_client_secret=…
//   &redirect_status=succeeded|processing|requires_payment_method|…
//   &order=<our order id>  (we add this ourselves via confirmParams.return_url)
//
// Webhook is the source of truth — the DB order flips to `paid` + grants are
// issued inside the webhook. We poll /api/orders/me for a short window so
// the page can show download links as soon as they're available (typically
// a second or two after the redirect).

type Status = 'succeeded' | 'processing' | 'failed' | 'unknown';

interface OrderItem {
  id: number;
  product_name: string | null;
  download: { url: string } | null;
}
interface Order {
  id: number;
  status: string;
  items: OrderItem[];
}

function statusFromParam(raw: string | null): Status {
  if (raw === 'succeeded') return 'succeeded';
  if (raw === 'processing') return 'processing';
  if (raw === 'requires_payment_method' || raw === 'requires_action') return 'failed';
  return 'unknown';
}

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 10; // ~20s total

export function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const [status] = useState<Status>(() => statusFromParam(params.get('redirect_status')));
  const orderIdParam = params.get('order');
  const orderId = orderIdParam ? Number(orderIdParam) : null;

  const [order, setOrder] = useState<Order | null>(null);
  const [polling, setPolling] = useState(false);
  const attemptRef = useRef(0);

  useEffect(() => {
    if (status === 'succeeded' || status === 'processing') {
      clearCart();
    }
  }, [status, clearCart]);

  // Poll /api/orders/me until the webhook has fired for this order, or we
  // give up. Guest users (no session) can't use this — they'll see the
  // generic success message and have to check their email (Phase 4b).
  useEffect(() => {
    if (!user || !orderId || status !== 'succeeded') return;
    let cancelled = false;
    setPolling(true);

    async function tick() {
      attemptRef.current += 1;
      try {
        const res = await fetch('/api/orders/me', { credentials: 'include' });
        const data = (await res.json()) as { orders?: Order[] };
        if (cancelled) return;
        const found = data.orders?.find((o) => o.id === orderId);
        if (found && found.status === 'paid') {
          setOrder(found);
          setPolling(false);
          return;
        }
      } catch {
        /* keep retrying */
      }
      if (attemptRef.current < POLL_MAX_ATTEMPTS && !cancelled) {
        setTimeout(() => { if (!cancelled) void tick(); }, POLL_INTERVAL_MS);
      } else {
        setPolling(false);
      }
    }

    void tick();
    return () => { cancelled = true; };
  }, [user, orderId, status]);

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20">
        <div className="max-w-[640px] mx-auto text-center">
          {status === 'succeeded' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 bg-[#bbd148] rounded-full flex items-center justify-center">
                <span className="text-white text-4xl">✓</span>
              </div>
              <h1 className="text-[#8b52c5] text-3xl md:text-4xl lg:text-5xl mb-4" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
                Thank you!
              </h1>
              <p className="text-[#3f3f3f] text-lg mb-2" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
                Your payment was successful.
              </p>
              {orderId && (
                <p className="text-[#3f3f3f]/60 text-sm mb-6">Order #{orderId}</p>
              )}

              {/* Download panel — only logged-in buyers; guests rely on email (Phase 4b) */}
              {user && order && order.items.some((it) => it.download) && (
                <div className="bg-white rounded-[20px] shadow-md p-6 mb-8 text-left">
                  <h3 className="font-bold text-[#8b52c5] text-[16px] mb-3">Your downloads</h3>
                  <ul className="space-y-2">
                    {order.items.map((it) => (
                      <li key={it.id} className="flex items-center justify-between gap-3">
                        <span className="text-[14px] font-bold truncate">
                          {it.product_name ?? `Item #${it.id}`}
                        </span>
                        {it.download ? (
                          <a
                            href={it.download.url}
                            className="shrink-0 px-4 py-2 rounded-[100px] bg-[#8b52c5] text-white text-[12px] font-bold uppercase tracking-[1.5px] hover:brightness-110"
                          >
                            Download
                          </a>
                        ) : (
                          <span className="shrink-0 text-[12px] text-[#3f3f3f]/50">Preparing…</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {user && polling && (
                <p className="text-[#3f3f3f]/70 text-[14px] mb-6">Preparing your downloads…</p>
              )}

              {!user && (
                <p className="text-[#3f3f3f] text-[14px] mb-8" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
                  Download links will arrive by email shortly.
                </p>
              )}

              {user && (
                <Link
                  to="/account"
                  className="inline-block mr-3 rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#8b52c5] text-white hover:brightness-110 transition-all"
                  style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}
                >
                  View in account
                </Link>
              )}
            </>
          )}

          {status === 'processing' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 bg-yellow-300 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl">…</span>
              </div>
              <h1 className="text-[#8b52c5] text-3xl md:text-4xl lg:text-5xl mb-4" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
                Payment processing
              </h1>
              <p className="text-[#3f3f3f] text-lg mb-8">
                Your payment is still processing. We'll email you once it confirms — no need to reload.
              </p>
            </>
          )}

          {(status === 'failed' || status === 'unknown') && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 bg-red-400 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl">!</span>
              </div>
              <h1 className="text-[#8b52c5] text-3xl md:text-4xl lg:text-5xl mb-4" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
                Payment didn't go through
              </h1>
              <p className="text-[#3f3f3f] text-lg mb-8">
                Please try again or use a different card.
              </p>
              <Link
                to="/checkout"
                className="inline-block rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#8b52c5] text-white hover:brightness-110 transition-all mr-3"
              >
                Try again
              </Link>
            </>
          )}

          <Link
            to="/patterns"
            className="inline-block rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all"
            style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}
          >
            Continue shopping
          </Link>
        </div>
      </section>
    </div>
  );
}

export default CheckoutSuccessPage;
