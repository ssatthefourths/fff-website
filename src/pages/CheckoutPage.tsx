import { useState } from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';

export function CheckoutPage() {
  const { items, total, itemCount, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [submittedEmail, setSubmittedEmail] = useState('');

  async function handlePlaceOrder(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (!customerName.trim() || !email.trim()) return;
    try {
      await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          customer_email: email.trim(),
          items: items.map(p => ({ product_id: parseInt(p.id), name: p.name, price: p.price })),
        }),
      });
    } catch {
      // API might not be available — still show success for demo
    }
    setPurchasedItems(items.map((item) => item.name));
    setSubmittedEmail(email);
    setIsSuccess(true);
    clearCart();
  }

  if (isSuccess) {
    return (
      <div className="bg-[#fffdf3] min-h-screen">
        <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20">
          <div className="max-w-[600px] mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#bbd148] rounded-full flex items-center justify-center">
              <span className="text-white text-4xl">&#10003;</span>
            </div>

            <h1
              className="text-[#8b52c5] text-3xl md:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
            >
              Thank You!
            </h1>

            <p
              className="text-[#3f3f3f] text-lg mb-6"
              style={{
                fontFamily: "'Roboto:Regular', sans-serif",
                fontVariationSettings: "'wdth' 100",
              }}
            >
              Your order has been placed! Download links will be sent to{' '}
              <strong>{submittedEmail}</strong>.
            </p>

            <div className="bg-white rounded-[20px] shadow-md p-6 mb-8 text-left">
              <h3
                className="font-bold text-[#3f3f3f] mb-4"
                style={{
                  fontFamily: "'Roboto:Regular', sans-serif",
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                Your Patterns
              </h3>
              <ul className="space-y-2">
                {purchasedItems.map((pName, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[#3f3f3f]"
                    style={{
                      fontFamily: "'Roboto:Regular', sans-serif",
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    <span className="text-[#bbd148]">&#10003;</span>
                    <span>{pName}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/patterns"
              className="inline-block rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all"
              style={{
                fontFamily: "'Roboto:Regular', sans-serif",
                fontVariationSettings: "'wdth' 100",
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="bg-[#fffdf3] min-h-screen flex flex-col items-center justify-center px-4">
        <h1
          className="text-[#8b52c5] text-3xl md:text-4xl mb-4"
          style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
        >
          Nothing to checkout
        </h1>
        <p
          className="text-[#3f3f3f] mb-8"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Your cart is empty. Add some patterns first!
        </p>
        <Link
          to="/patterns"
          className="inline-block rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto">
          <h1
            className="text-[#8b52c5] text-3xl md:text-4xl lg:text-5xl mb-8"
            style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
          >
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handlePlaceOrder}>
                {/* Customer Info */}
                <div className="bg-white rounded-[20px] shadow-md p-6 mb-6">
                  <h2
                    className="text-xl font-bold text-[#3f3f3f] mb-6"
                    style={{
                      fontFamily: "'Roboto:Regular', sans-serif",
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Customer Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#3f3f3f] mb-1"
                        style={{
                          fontFamily: "'Roboto:Regular', sans-serif",
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-[12px] border border-[#3f3f3f]/20 text-[#3f3f3f] focus:outline-none focus:border-[#8b52c5] focus:ring-2 focus:ring-[#8b52c5]/20 transition-all"
                        style={{
                          fontFamily: "'Roboto:Regular', sans-serif",
                          fontVariationSettings: "'wdth' 100",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#3f3f3f] mb-1"
                        style={{
                          fontFamily: "'Roboto:Regular', sans-serif",
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-[12px] border border-[#3f3f3f]/20 text-[#3f3f3f] focus:outline-none focus:border-[#8b52c5] focus:ring-2 focus:ring-[#8b52c5]/20 transition-all"
                        style={{
                          fontFamily: "'Roboto:Regular', sans-serif",
                          fontVariationSettings: "'wdth' 100",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Banner */}
                <div className="bg-yellow-100 border border-yellow-300 rounded-[20px] p-6 mb-6">
                  <p
                    className="text-[#3f3f3f] text-center font-medium"
                    style={{
                      fontFamily: "'Roboto:Regular', sans-serif",
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    &#128679; Payment processing coming soon! This is a demo checkout.
                  </p>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="w-full rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all cursor-pointer"
                  style={{
                    fontFamily: "'Roboto:Regular', sans-serif",
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Right — Order Summary */}
            <div>
              <div className="bg-white rounded-[20px] shadow-md p-6 sticky top-8">
                <h3
                  className="text-lg font-bold text-[#3f3f3f] mb-4"
                  style={{
                    fontFamily: "'Roboto:Regular', sans-serif",
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  Order Summary
                </h3>

                <p
                  className="text-[#3f3f3f]/60 text-sm mb-4"
                  style={{
                    fontFamily: "'Roboto:Regular', sans-serif",
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>

                <hr className="border-[#f4eefa] mb-4" />

                <ul className="space-y-3 mb-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center text-sm text-[#3f3f3f]"
                      style={{
                        fontFamily: "'Roboto:Regular', sans-serif",
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      <span className="truncate mr-2">{item.name}</span>
                      <span className="font-bold whitespace-nowrap">
                        {item.isFree ? 'FREE' : `$${item.price.toFixed(2)}`}
                      </span>
                    </li>
                  ))}
                </ul>

                <hr className="border-[#f4eefa] mb-4" />

                <div
                  className="flex justify-between items-center text-xl font-bold text-[#3f3f3f]"
                  style={{
                    fontFamily: "'Roboto:Regular', sans-serif",
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  <span>Total</span>
                  <span className="text-[#8b52c5]">${total.toFixed(2)}</span>
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
