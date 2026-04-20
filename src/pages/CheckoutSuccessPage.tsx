import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useCart } from '../context/CartContext';

// Stripe redirects back here after confirmPayment. The URL includes:
//   ?payment_intent=pi_…
//   &payment_intent_client_secret=…
//   &redirect_status=succeeded|processing|requires_payment_method|…
//   &order=<our order id>  (we add this ourselves via confirmParams.return_url)
//
// Webhook is the source of truth — the DB order won't be 'paid' until the
// webhook fires. The redirect_status param here lets us show the user a
// reasonable message while the webhook catches up.

type Status = 'succeeded' | 'processing' | 'failed' | 'unknown';

function statusFromParam(raw: string | null): Status {
  if (raw === 'succeeded') return 'succeeded';
  if (raw === 'processing') return 'processing';
  if (raw === 'requires_payment_method' || raw === 'requires_action') return 'failed';
  return 'unknown';
}

export function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const { clearCart } = useCart();
  const [status] = useState<Status>(() => statusFromParam(params.get('redirect_status')));
  const orderId = params.get('order');

  useEffect(() => {
    if (status === 'succeeded' || status === 'processing') {
      clearCart();
    }
  }, [status, clearCart]);

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
              <p className="text-[#3f3f3f] text-[14px] mb-8" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
                Your download links will arrive by email shortly.
              </p>
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
