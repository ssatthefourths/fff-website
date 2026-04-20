import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { Pattern } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';
import { fetchProducts, searchProducts } from '../lib/productsApi';

const ITEMS_PER_PAGE = 15;
const SEARCH_DEBOUNCE_MS = 250;

function getDifficultyBadge(difficulty: Pattern['difficulty']) {
  const styles: Record<string, string> = {
    beginner: 'bg-[#bbd148] text-[#3f3f3f]',
    intermediate: 'bg-yellow-400 text-[#3f3f3f]',
    advanced: 'bg-red-400 text-white',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}

function ProductCard({ pattern }: { pattern: Pattern }) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(pattern.id);

  return (
    <div className="bg-white rounded-[20px] shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="bg-[#f4eefa] h-[250px] flex items-center justify-center overflow-hidden">
        {pattern.image && pattern.image.startsWith('/r2/') ? (
          <img src={pattern.image} alt={pattern.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[80px] font-bold text-[#8b52c5] opacity-40" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
            {pattern.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#3f3f3f] mb-1" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
          {pattern.name}
        </h3>
        <p className="text-sm text-[#3f3f3f]/70 mb-3 line-clamp-2" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
          {pattern.shortDescription}
        </p>

        <div className="flex items-center gap-2 mb-3">{getDifficultyBadge(pattern.difficulty)}</div>

        <div className="mb-4">
          {pattern.isFree ? (
            <span className="inline-block bg-[#bbd148] text-[#3f3f3f] px-3 py-1 rounded-full text-sm font-bold uppercase">Free</span>
          ) : (
            <span className="text-xl font-bold text-[#8b52c5]">${pattern.price.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {inCart ? (
            <button disabled className="w-full rounded-[100px] uppercase tracking-[2.7px] font-bold text-[14px] px-[20px] py-[14px] bg-[#3f3f3f]/10 text-[#3f3f3f] cursor-default" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
              In Cart ✓
            </button>
          ) : (
            <button onClick={() => addItem(pattern)} className="w-full rounded-[100px] uppercase tracking-[2.7px] font-bold text-[14px] px-[20px] py-[14px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all cursor-pointer" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
              Add to Cart
            </button>
          )}
          <Link to={`/patterns/${pattern.category}/${pattern.slug}`} className="w-full text-center rounded-[100px] uppercase tracking-[2.7px] font-bold text-[14px] px-[20px] py-[14px] border border-[#8b52c5] text-[#8b52c5] hover:bg-[#8b52c5] hover:text-white transition-all" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';
  const urlQuery = searchParams.get('q') ?? '';

  const [searchInput, setSearchInput] = useState(urlQuery);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search input into the URL, which drives the fetch.
  useEffect(() => {
    if (searchInput === urlQuery) return;
    const id = setTimeout(() => {
      const params: Record<string, string> = {};
      if (activeCategory) params.category = activeCategory;
      if (searchInput.trim()) params.q = searchInput.trim();
      setSearchParams(params);
      setVisibleCount(ITEMS_PER_PAGE);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [searchInput, urlQuery, activeCategory, setSearchParams]);

  // Fetch whenever category or search URL-param changes.
  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    const promise = urlQuery.trim().length >= 2
      ? searchProducts(urlQuery, ac.signal)
      : fetchProducts({ category: activeCategory || undefined, limit: 200, signal: ac.signal });

    promise
      .then((results) => { setPatterns(results); })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load patterns');
      })
      .finally(() => { setLoading(false); });

    return () => ac.abort();
  }, [activeCategory, urlQuery]);

  // If a search is active, the search endpoint ignores category — so hide
  // the category filter UI to avoid implying it's still active.
  const searching = urlQuery.trim().length >= 2;
  const visiblePatterns = patterns.slice(0, visibleCount);
  const hasMore = visibleCount < patterns.length;

  function handleCategoryChange(slug: string) {
    setVisibleCount(ITEMS_PER_PAGE);
    const params: Record<string, string> = {};
    if (slug) params.category = slug;
    if (urlQuery) params.q = urlQuery;
    setSearchParams(params);
  }

  function clearSearch() {
    setSearchInput('');
    setVisibleCount(ITEMS_PER_PAGE);
    const params: Record<string, string> = {};
    if (activeCategory) params.category = activeCategory;
    setSearchParams(params);
  }

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      {/* Hero */}
      <section className="text-center px-4 sm:px-6 md:px-12 lg:px-[80px] pt-12 md:pt-16 lg:pt-20 pb-6">
        <h1 className="text-[#8b52c5] text-4xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
          Shop Sewing Patterns
        </h1>
        <p className="text-[#3f3f3f] text-lg md:text-xl max-w-[700px] mx-auto" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
          Choose from over 120 fun, easy-to-follow sewing patterns!
        </p>
        <div className="max-w-[500px] mx-auto mt-6 relative">
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-white border-2 border-[#8b52c5]/30 rounded-[100px] px-6 py-3 text-[#3f3f3f] text-[16px] focus:outline-none focus:border-[#8b52c5] transition-colors"
            style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}
          />
          {searchInput && (
            <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b52c5] text-xl cursor-pointer hover:text-[#3f3f3f]">×</button>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      {!searching && (
        <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-4">
          <div className="max-w-[1400px] mx-auto overflow-x-auto">
            <div className="flex gap-3 pb-2 min-w-max">
              <button
                onClick={() => handleCategoryChange('')}
                className={`rounded-[100px] px-6 py-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === '' ? 'bg-[#8b52c5] text-white' : 'border border-[#8b52c5] text-[#8b52c5] hover:bg-[#8b52c5]/10'
                }`}
                style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}
              >
                All Patterns
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`rounded-[100px] px-6 py-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.slug ? 'bg-[#8b52c5] text-white' : 'border border-[#8b52c5] text-[#8b52c5] hover:bg-[#8b52c5]/10'
                  }`}
                  style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Count / status */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-4">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[#3f3f3f]/60 text-sm" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
            {loading
              ? 'Loading…'
              : searching
                ? `${patterns.length} result${patterns.length === 1 ? '' : 's'} for "${urlQuery}"`
                : `Showing ${visiblePatterns.length} of ${patterns.length} patterns`}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-[1400px] mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px] mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-16">
              <div className="animate-spin h-10 w-10 border-4 border-[#8b52c5] border-t-transparent rounded-full" />
            </div>
          )}

          {!loading && patterns.length === 0 && (
            <div className="bg-white rounded-[20px] shadow-md p-12 text-center">
              <p className="text-[#8b52c5] text-2xl mb-2" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
                {searching ? 'No matches' : 'No patterns yet'}
              </p>
              <p className="text-[#3f3f3f]/70 text-[16px]" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
                {searching
                  ? 'Try a different search or clear the filter.'
                  : 'New patterns are being added — check back soon!'}
              </p>
            </div>
          )}

          {!loading && patterns.length > 0 && (
            <>
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
                    style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default ShopPage;
