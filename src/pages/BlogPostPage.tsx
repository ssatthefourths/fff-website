import { useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { blogPosts, getBlogPostBySlug } from '../data/blogPosts';

const CATEGORY_LABELS: Record<string, string> = {
  'new-patterns': 'New Patterns',
  'tips-tutorials': 'Tips & Tutorials',
  competitions: 'Competitions',
  news: 'News',
};

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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogPostPage() {
  const { slug } = useParams();

  const post = useMemo(() => getBlogPostBySlug(slug || ''), [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="bg-[#fffdf3] min-h-screen flex flex-col items-center justify-center px-4">
        <h1
          className="text-[#8b52c5] text-3xl md:text-4xl mb-4"
          style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
        >
          Post not found
        </h1>
        <p
          className="text-[#3f3f3f] mb-8"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        <Link
          to="/blog"
          className="inline-block rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all"
          style={{
            fontFamily: "'Roboto:Regular', sans-serif",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      {/* Back Link (top) */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pt-8">
        <div className="max-w-[800px] mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#8b52c5] hover:underline font-medium"
            style={{
              fontFamily: "'Roboto:Regular', sans-serif",
              fontVariationSettings: "'wdth' 100",
            }}
          >
            &larr; Back to Blog
          </Link>
        </div>
      </section>

      {/* Article */}
      <article className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-8 md:py-12">
        <div className="max-w-[800px] mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryColor(post.category)}`}
            >
              {CATEGORY_LABELS[post.category] || post.category}
            </span>
            <span
              className="text-sm text-[#3f3f3f]/50"
              style={{
                fontFamily: "'Roboto:Regular', sans-serif",
                fontVariationSettings: "'wdth' 100",
              }}
            >
              {formatDate(post.date)}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[#3f3f3f] text-3xl md:text-4xl lg:text-5xl mb-6"
            style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
          >
            {post.title}
          </h1>

          {/* Image Placeholder */}
          <div className="bg-[#f4eefa] h-[300px] md:h-[400px] rounded-[20px] flex items-center justify-center mb-8">
            <span
              className="text-[80px] md:text-[120px] font-bold text-[#8b52c5] opacity-20"
              style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
            >
              {post.title.charAt(0)}
            </span>
          </div>

          {/* Content */}
          <div className="mb-8">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="text-[#3f3f3f] text-base md:text-lg leading-relaxed mb-6"
                style={{
                  fontFamily: "'Roboto:Regular', sans-serif",
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author */}
          <div className="border-t border-[#f4eefa] pt-6 mb-8">
            <p
              className="text-[#3f3f3f]/60 text-sm"
              style={{
                fontFamily: "'Roboto:Regular', sans-serif",
                fontVariationSettings: "'wdth' 100",
              }}
            >
              By <span className="font-bold text-[#3f3f3f]">{post.author || 'Pauline McArthur'}</span>
            </p>
          </div>

          {/* Back Link (bottom) */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#8b52c5] hover:underline font-medium"
            style={{
              fontFamily: "'Roboto:Regular', sans-serif",
              fontVariationSettings: "'wdth' 100",
            }}
          >
            &larr; Back to Blog
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <h2
              className="text-[#8b52c5] text-2xl md:text-3xl mb-8 text-center"
              style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
            >
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  className="bg-white rounded-[20px] shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
                >
                  <div className="bg-[#f4eefa] h-[180px] flex items-center justify-center">
                    <span
                      className="text-[50px] font-bold text-[#8b52c5] opacity-30"
                      style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}
                    >
                      {rp.title.charAt(0)}
                    </span>
                  </div>
                  <div className="p-5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${getCategoryColor(rp.category)}`}
                    >
                      {CATEGORY_LABELS[rp.category] || rp.category}
                    </span>
                    <h4
                      className="font-bold text-[#3f3f3f] mb-1 line-clamp-2"
                      style={{
                        fontFamily: "'Roboto:Regular', sans-serif",
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      {rp.title}
                    </h4>
                    <p
                      className="text-xs text-[#3f3f3f]/50"
                      style={{
                        fontFamily: "'Roboto:Regular', sans-serif",
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      {formatDate(rp.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default BlogPostPage;
