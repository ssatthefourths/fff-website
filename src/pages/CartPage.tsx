import { Link } from 'react-router';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { items, total, itemCount, removeItem } = useCart();

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto">
          <h1
            className="text-[#8b52c5] text-3xl md:text-4xl lg:text-5xl mb-8"
            style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
          >
            Your Cart
          </h1>

          {itemCount === 0 ? (
            /* ── Empty State ─────────────────────────── */
            <div className="text-center py-16">
              <p className="text-6xl mb-6">😢</p>
              <h2
                className="text-2xl md:text-3xl text-[#3f3f3f] font-bold mb-4"
                style={{
                  fontFamily: "'Roboto:Regular', sans-serif",
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                Your cart is empty!
              </h2>
              <p
                className="text-[#3f3f3f]/70 mb-8 text-lg"
                style={{
                  fontFamily: "'Roboto:Regular', sans-serif",
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                Browse our patterns and find your next project!
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
          ) : (
            /* ── Cart Items ──────────────────────────── */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left — Item List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
                  {items.map((item, index) => (
                    <div key={item.id}>
                      {index > 0 && <hr className="border-[#f4eefa]" />}
                      <div className="flex items-center gap-4 p-6">
                        {/* Image placeholder */}
                        <div className="w-[70px] h-[70px] flex-shrink-0 bg-[#f4eefa] rounded-[12px] flex items-center justify-center">
                          <span
                            className="text-2xl font-bold text-[#8b52c5] opacity-40"
                            style={{
                              fontFamily: "'Bingo Action Comic:Regular', sans-serif",
                            }}
                          >
                            {item.name.charAt(0)}
                          </span>
                        </div>

                        {/* Name */}
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/patterns/${item.category}/${item.slug}`}
                            className="font-bold text-[#3f3f3f] hover:text-[#8b52c5] transition-colors block truncate"
                            style={{
                              fontFamily: "'Roboto:Regular', sans-serif",
                              fontVariationSettings: "'wdth' 100",
                            }}
                          >
                            {item.name}
                          </Link>
                        </div>

                        {/* Price */}
                        <div
                          className="font-bold text-[#8b52c5] whitespace-nowrap"
                          style={{
                            fontFamily: "'Roboto:Regular', sans-serif",
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          {item.isFree ? 'FREE' : `$${item.price.toFixed(2)}`}
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-[#3f3f3f]/40 hover:text-red-500 transition-colors cursor-pointer text-xl font-bold"
                          aria-label={`Remove ${item.name}`}
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Below items — totals (mobile) */}
                <div className="lg:hidden mt-6">
                  <div className="bg-white rounded-[20px] shadow-md p-6">
                    <div
                      className="flex justify-between items-center mb-2 text-[#3f3f3f]"
                      style={{
                        fontFamily: "'Roboto:Regular', sans-serif",
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      <span>Subtotal</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                    <div
                      className="flex justify-between items-center mb-6 text-[#3f3f3f] text-xl font-bold"
                      style={{
                        fontFamily: "'Roboto:Regular', sans-serif",
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      <span>Total</span>
                      <span className="text-[#8b52c5]">${total.toFixed(2)}</span>
                    </div>

                    <Link
                      to="/checkout"
                      className="block w-full text-center rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all"
                      style={{
                        fontFamily: "'Roboto:Regular', sans-serif",
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Proceed to Checkout
                    </Link>

                    <Link
                      to="/patterns"
                      className="block text-center mt-4 text-[#8b52c5] hover:underline font-medium"
                      style={{
                        fontFamily: "'Roboto:Regular', sans-serif",
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right — Summary Card (desktop) */}
              <div className="hidden lg:block">
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

                  <div
                    className="flex justify-between items-center mb-2 text-[#3f3f3f]"
                    style={{
                      fontFamily: "'Roboto:Regular', sans-serif",
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    <span>Subtotal</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>

                  <div
                    className="flex justify-between items-center mb-6 text-xl font-bold text-[#3f3f3f]"
                    style={{
                      fontFamily: "'Roboto:Regular', sans-serif",
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    <span>Total</span>
                    <span className="text-[#8b52c5]">${total.toFixed(2)}</span>
                  </div>

                  <Link
                    to="/checkout"
                    className="block w-full text-center rounded-[100px] uppercase tracking-[2.7px] font-bold text-[16px] px-[30px] py-[18px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all"
                    style={{
                      fontFamily: "'Roboto:Regular', sans-serif",
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    to="/patterns"
                    className="block text-center mt-4 text-[#8b52c5] hover:underline font-medium text-sm"
                    style={{
                      fontFamily: "'Roboto:Regular', sans-serif",
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CartPage;
