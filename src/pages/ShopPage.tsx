import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { type Pattern, patterns } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';

const ITEMS_PER_PAGE = 15;

function getDifficultyBadge(difficulty: Pattern['difficulty']) {
  const styles: Record<string, string> = {
    beginner: 'bg-[#bbd148] text-[#3f3f3f]',
    intermediate: 'bg-yellow-400 text-[#3f3f3f]',
    advanced: 'bg-red-400 text-white',
  };
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

function ProductCard({ pattern }: { pattern: Pattern }) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(pattern.id);

  return (
    <div className="bg-white rounded-[20px] shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="bg-[#f4eefa] h-[250px] flex items-center justify-center">
        <span
          className="text-[80px] font-bold text-[#8b52c5] opacity-40"
          style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
        >
          {pattern.name.charAt(0)}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3
          className="text-lg font-bold text-[#3f3f3f] mb-1"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          {pattern.name}
        </h3>
        <p
          className="text-sm text-[#3f3f3f]/70 mb-3 line-clamp-2"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          {pattern.shortDescription}
        </p>

        <div className="flex items-center gap-2 mb-3">
          {getDifficultyBadge(pattern.difficulty)}
        </div>

        <div className="mb-4">
          {pattern.isFree ? (
            <span className="inline-block bg-[#bbd148] text-[#3f3f3f] px-3 py-1 rounded-full text-sm font-bold uppercase">
              Free
            </span>
          ) : (
            <span className="text-xl font-bold text-[#8b52c5]">
              ${pattern.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {inCart ? (
            <button
              disabled
              className="w-full rounded-[100px] uppercase tracking-[2.7px] font-bold text-[14px] px-[20px] py-[14px] bg-[#3f3f3f]/10 text-[#3f3f3f] cursor-default"
              style={{
                fontFamily: "'Roboto:Regular', sans-serif",
                fontVariationSettings: "'wdth' 100",
              }}
            >
              In Cart &#10003;
            </button>
          ) : (
            <button
              onClick={() => addItem(pattern)}
              className="w-full rounded-[100px] uppercase tracking-[2.7px] font-bold text-[14px] px-[20px] py-[14px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all cursor-pointer"
              style={{
                fontFamily: "'Roboto:Regular', sans-serif",
                fontVariationSettings: "'wdth' 100",
              }}
            >
              Add to Cart
            </button>
          )}

          <Link
            to={`/patterns/${pattern.category}/${pattern.slug}`}
            className="w-full text-center rounded-[100px] uppercase tracking-[2.7px] font-bold text-[14px] px-[20px] py-[14px] border border-[#8b52c5] text-[#8b52c5] hover:bg-[#8b52c5] hover:text-white transition-all"
            style={{
              fontFamily: "'Roboto:Regular', sans-serif",
              fontVariationSettings: "'wdth' 100",
            }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('q') || '';
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredPatterns = useMemo(() => {
    let result = patterns;
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const visiblePatterns = filteredPatterns.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPatterns.length;

  function handleCategoryChange(slug: string) {
    setVisibleCount(ITEMS_PER_PAGE);
    if (slug === '') {
      setSearchParams(searchQuery ? { q: searchQuery } : {});
    } else {
      setSearchParams(searchQuery ? { category: slug, q: searchQuery } : { category: slug });
    }
  }

  function handleSearch(value: string) {
    setVisibleCount(ITEMS_PER_PAGE);
    const params: Record<string, string> = {};
    if (activeCategory) params.category = activeCategory;
    if (value.trim()) params.q = value;
    setSearchParams(params);
  }

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      {/* Hero */}
      <section className="text-center px-4 sm:px-6 md:px-12 lg:px-[80px] pt-12 md:pt-16 lg:pt-20 pb-6">
        <h1
          className="text-[#8b52c5] text-4xl md:text-5xl lg:text-6xl mb-4"
          style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
        >
          Shop Sewing Patterns
        </h1>
        <p
          className="text-[#3f3f3f] text-lg md:text-xl max-w-[700px] mx-auto"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Choose from over 120 fun, easy-to-follow sewing patterns!
        </p>
        {/* Search */}
        <div className="max-w-[500px] mx-auto mt-6 relative">
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-white border-2 border-[#8b52c5]/30 rounded-[100px] px-6 py-3 text-[#3f3f3f] text-[16px] focus:outline-none focus:border-[#8b52c5] transition-colors"
            style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}
          />
          {searchQuery && (
            <button onClick={() => handleSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b52c5] text-xl cursor-pointer hover:text-[#3f3f3f]">×</button>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-4">
        <div className="max-w-[1400px] mx-auto overflow-x-auto">
          <div className="flex gap-3 pb-2 min-w-max">
            <button
              onClick={() => handleCategoryChange('')}
              className={`rounded-[100px] px-6 py-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === ''
                  ? 'bg-[#8b52c5] text-white'
                  : 'border border-[#8b52c5] text-[#8b52c5] hover:bg-[#8b52c5]/10'
              }`}
              style={{
                fontFamily: "'Roboto:Regular', sans-serif",
                fontVariationSettings: "'wdth' 100",
              }}
            >
              All Patterns
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`rounded-[100px] px-6 py-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.slug
                    ? 'bg-[#8b52c5] text-white'
                    : 'border border-[#8b52c5] text-[#8b52c5] hover:bg-[#8b52c5]/10'
                }`}
                style={{
                  fontFamily: "'Roboto:Regular', sans-serif",
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Count */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-4">
        <div className="max-w-[1400px] mx-auto">
          <p
            className="text-[#3f3f3f]/60 text-sm"
            style={{
              fontFamily: "'Roboto:Regular', sans-serif",
              fontVariationSettings: "'wdth' 100",
            }}
          >
            Showing {visiblePatterns.length} of {filteredPatterns.length} patterns
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePatterns.map((pattern) => (
              <ProductCard key={pattern.id} pattern={pattern} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#8b52c5] text-white hover:brightness-110 transition-all cursor-pointer"
                style={{
                  fontFamily: "'Roboto:Regular', sans-serif",
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ShopPage;
