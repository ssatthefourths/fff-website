import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { type BlogPost, blogPosts } from '../data/blogPosts';

const BLOG_CATEGORIES = [
  { slug: '', label: 'All' },
  { slug: 'new-patterns', label: 'New Patterns' },
  { slug: 'tips-tutorials', label: 'Tips & Tutorials' },
  { slug: 'competitions', label: 'Competitions' },
  { slug: 'news', label: 'News' },
];

function getCategoryColor(category: string): string {
  switch (category) {
    case 'new-patterns':
      return 'bg-[#8b52c5] text-white';
    case 'tips-tutorials':
      return 'bg-[#bbd148] text-[#3f3f3f]';
    case 'competitions':
      return 'bg-orange-400 text-white';
    case 'news':
      return 'bg-blue-400 text-white';
    default:
      return 'bg-[#3f3f3f]/20 text-[#3f3f3f]';
  }
}

function getCategoryLabel(category: string): string {
  const found = BLOG_CATEGORIES.find((c) => c.slug === category);
  return found ? found.label : category;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="bg-white rounded-[20px] shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
    >
      <div className="bg-[#f4eefa] h-[200px] flex items-center justify-center">
        <span
          className="text-[60px] font-bold text-[#8b52c5] opacity-30"
          style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
        >
          {post.title.charAt(0)}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryColor(post.category)}`}
          >
            {getCategoryLabel(post.category)}
          </span>
          <span
            className="text-xs text-[#3f3f3f]/50"
            style={{
              fontFamily: "'Roboto:Regular', sans-serif",
              fontVariationSettings: "'wdth' 100",
            }}
          >
            {formatDate(post.date)}
          </span>
        </div>

        <h3
          className="font-bold text-[#3f3f3f] text-lg mb-2 line-clamp-2"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          {post.title}
        </h3>

        <p
          className="text-sm text-[#3f3f3f]/70 mb-4 line-clamp-2"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          {post.excerpt}
        </p>

        <span
          className="text-[#8b52c5] font-bold text-sm hover:underline"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Read More &rarr;
        </span>
      </div>
    </Link>
  );
}

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('');

  const filteredPosts = useMemo(() => {
    if (!activeCategory) return blogPosts;
    return blogPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      {/* Hero */}
      <section className="text-center px-4 sm:px-6 md:px-12 lg:px-[80px] pt-12 md:pt-16 lg:pt-20 pb-6">
        <h1
          className="text-[#8b52c5] text-4xl md:text-5xl lg:text-6xl mb-4"
          style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
        >
          Our Blog
        </h1>
      </section>

      {/* Category Filters */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-8">
        <div className="max-w-[1400px] mx-auto overflow-x-auto">
          <div className="flex gap-3 pb-2 min-w-max justify-center">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
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
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-[1400px] mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p
                className="text-[#3f3f3f]/60 text-lg"
                style={{
                  fontFamily: "'Roboto:Regular', sans-serif",
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                No posts found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
