import { useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { type Pattern, patterns, getPatternBySlug } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';

function getDifficultyBadge(difficulty: Pattern['difficulty']) {
  const styles: Record<string, string> = {
    beginner: 'bg-[#bbd148] text-[#3f3f3f]',
    intermediate: 'bg-yellow-400 text-[#3f3f3f]',
    advanced: 'bg-red-400 text-white',
  };
  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

function RelatedCard({ pattern }: { pattern: Pattern }) {
  return (
    <Link
      to={`/patterns/${pattern.category}/${pattern.slug}`}
      className="bg-white rounded-[20px] shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
    >
      <div className="bg-[#f4eefa] h-[200px] flex items-center justify-center">
        <span
          className="text-[60px] font-bold text-[#8b52c5] opacity-40"
          style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
        >
          {pattern.name.charAt(0)}
        </span>
      </div>
      <div className="p-4">
        <h4
          className="font-bold text-[#3f3f3f] mb-1"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          {pattern.name}
        </h4>
        <p className="text-[#8b52c5] font-bold">
          {pattern.isFree ? 'FREE' : `$${pattern.price.toFixed(2)}`}
        </p>
      </div>
    </Link>
  );
}

export function ProductPage() {
  const { slug } = useParams();
  const { addItem, isInCart } = useCart();

  const pattern = useMemo(() => getPatternBySlug(slug || ''), [slug]);

  const categoryObj = useMemo(
    () => (pattern ? categories.find((c) => c.slug === pattern.category) : undefined),
    [pattern],
  );

  const relatedPatterns = useMemo(() => {
    if (!pattern) return [];
    return patterns
      .filter((p) => p.category === pattern.category && p.id !== pattern.id)
      .slice(0, 4);
  }, [pattern]);

  if (!pattern) {
    return (
      <div className="bg-[#fffdf3] min-h-screen flex flex-col items-center justify-center px-4">
        <h1
          className="text-[#8b52c5] text-3xl md:text-4xl mb-4"
          style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
        >
          Pattern not found
        </h1>
        <p
          className="text-[#3f3f3f] mb-8"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Sorry, we couldn't find the pattern you're looking for.
        </p>
        <Link
          to="/patterns"
          className="rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const inCart = isInCart(pattern.id);

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      {/* Breadcrumb */}
      <nav className="px-4 sm:px-6 md:px-12 lg:px-[80px] pt-8 pb-4">
        <div className="max-w-[1400px] mx-auto">
          <ol
            className="flex flex-wrap items-center gap-2 text-sm text-[#3f3f3f]/60"
            style={{
              fontFamily: "'Roboto:Regular', sans-serif",
              fontVariationSettings: "'wdth' 100",
            }}
          >
            <li>
              <Link to="/" className="hover:text-[#8b52c5] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/patterns" className="hover:text-[#8b52c5] transition-colors">
                Patterns
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to={`/patterns?category=${pattern.category}`}
                className="hover:text-[#8b52c5] transition-colors"
              >
                {categoryObj?.name || pattern.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#3f3f3f] font-medium">{pattern.name}</li>
          </ol>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left — Image */}
            <div className="bg-[#f4eefa] rounded-[20px] aspect-square flex items-center justify-center">
              <span
                className="text-[120px] md:text-[160px] font-bold text-[#8b52c5] opacity-30"
                style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
              >
                {pattern.name.charAt(0)}
              </span>
            </div>

            {/* Right — Info */}
            <div className="flex flex-col">
              <h1
                className="text-[#3f3f3f] text-3xl md:text-4xl lg:text-5xl mb-4"
                style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
              >
                {pattern.name}
              </h1>

              <div className="mb-4">
                {pattern.isFree ? (
                  <span className="inline-block bg-[#bbd148] text-[#3f3f3f] px-4 py-1.5 rounded-full text-lg font-bold uppercase">
                    Free
                  </span>
                ) : (
                  <span className="text-3xl font-bold text-[#8b52c5]">
                    ${pattern.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mb-6">{getDifficultyBadge(pattern.difficulty)}</div>

              <div className="mb-8">
                {pattern.description.split('\n').map((para, i) => (
                  <p
                    key={i}
                    className="text-[#3f3f3f] text-base md:text-lg leading-relaxed mb-4"
                    style={{
                      fontFamily: "'Roboto:Regular', sans-serif",
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Add to Cart / In Cart */}
              <div className="mb-8">
                {inCart ? (
                  <Link
                    to="/cart"
                    className="block w-full text-center rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#3f3f3f]/10 text-[#3f3f3f] hover:bg-[#3f3f3f]/20 transition-all"
                    style={{
                      fontFamily: "'Roboto:Regular', sans-serif",
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Already in Cart — View Cart
                  </Link>
                ) : (
                  <button
                    onClick={() => addItem(pattern)}
                    className="w-full rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all cursor-pointer"
                    style={{
                      fontFamily: "'Roboto:Regular', sans-serif",
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              {/* Features */}
              <div className="bg-[#f4eefa] rounded-[20px] p-6">
                <h3
                  className="font-bold text-[#3f3f3f] text-lg mb-4"
                  style={{
                    fontFamily: "'Roboto:Regular', sans-serif",
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  What&apos;s Included
                </h3>
                <ul className="space-y-3">
                  {pattern.features?.length
                    ? pattern.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[#3f3f3f]"
                          style={{
                            fontFamily: "'Roboto:Regular', sans-serif",
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          <span className="text-[#bbd148] text-lg mt-0.5">&#10003;</span>
                          <span>{feature}</span>
                        </li>
                      ))
                    : (
                        <>
                          <li
                            className="flex items-start gap-3 text-[#3f3f3f]"
                            style={{
                              fontFamily: "'Roboto:Regular', sans-serif",
                              fontVariationSettings: "'wdth' 100",
                            }}
                          >
                            <span className="text-[#bbd148] text-lg mt-0.5">&#10003;</span>
                            <span>Instant PDF Download</span>
                          </li>
                          <li
                            className="flex items-start gap-3 text-[#3f3f3f]"
                            style={{
                              fontFamily: "'Roboto:Regular', sans-serif",
                              fontVariationSettings: "'wdth' 100",
                            }}
                          >
                            <span className="text-[#bbd148] text-lg mt-0.5">&#10003;</span>
                            <span>Step-by-step photo instructions</span>
                          </li>
                          <li
                            className="flex items-start gap-3 text-[#3f3f3f]"
                            style={{
                              fontFamily: "'Roboto:Regular', sans-serif",
                              fontVariationSettings: "'wdth' 100",
                            }}
                          >
                            <span className="text-[#bbd148] text-lg mt-0.5">&#10003;</span>
                            <span>Full-size pattern pieces</span>
                          </li>
                          <li
                            className="flex items-start gap-3 text-[#3f3f3f]"
                            style={{
                              fontFamily: "'Roboto:Regular', sans-serif",
                              fontVariationSettings: "'wdth' 100",
                            }}
                          >
                            <span className="text-[#bbd148] text-lg mt-0.5">&#10003;</span>
                            <span>Suitable for {pattern.difficulty} sewists</span>
                          </li>
                        </>
                      )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Patterns */}
      {relatedPatterns.length > 0 && (
        <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <h2
              className="text-[#8b52c5] text-2xl md:text-3xl mb-8 text-center"
              style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
            >
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedPatterns.map((rp) => (
                <RelatedCard key={rp.id} pattern={rp} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductPage;
