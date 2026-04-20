import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { fetchBlogPostBySlug, fetchBlogPosts, type BlogPostDetail, type BlogPostSummary } from '../lib/blogApi';

const CATEGORY_LABELS: Record<string, string> = {
  'new-patterns': 'New Patterns',
  'tips-tutorials': 'Tips & Tutorials',
  competitions: 'Competitions',
  news: 'News',
};

function getCategoryColor(category: string | null): string {
  switch (category) {
    case 'new-patterns': return 'bg-[#8b52c5] text-white';
    case 'tips-tutorials': return 'bg-[#bbd148] text-[#3f3f3f]';
    case 'competitions': return 'bg-orange-400 text-white';
    case 'news': return 'bg-blue-400 text-white';
    default: return 'bg-[#3f3f3f]/20 text-[#3f3f3f]';
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Minimal Markdown → React renderer. Handles the subset we use in seeded
// posts: headings (#, ##, ###), bold (**text**), italic (*text*),
// [link](url), and blockquotes (> ). Full Markdown would bring a library;
// this stays under 50 lines and covers editorial needs for v1.
function renderMarkdown(src: string): React.ReactNode[] {
  const blocks = src.split(/\n\n+/);
  return blocks.map((block, bi) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('### ')) {
      return <h3 key={bi} className="text-[#3f3f3f] text-xl md:text-2xl font-bold mt-6 mb-3" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>{renderInline(trimmed.slice(4))}</h3>;
    }
    if (trimmed.startsWith('## ')) {
      return <h2 key={bi} className="text-[#8b52c5] text-2xl md:text-3xl font-bold mt-8 mb-4" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>{renderInline(trimmed.slice(3))}</h2>;
    }
    if (trimmed.startsWith('# ')) {
      return <h1 key={bi} className="text-[#8b52c5] text-3xl md:text-4xl font-bold mt-8 mb-4" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>{renderInline(trimmed.slice(2))}</h1>;
    }
    if (trimmed.startsWith('> ')) {
      return <blockquote key={bi} className="border-l-4 border-[#8b52c5] pl-4 italic text-[#3f3f3f]/80 my-6" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>{renderInline(trimmed.slice(2))}</blockquote>;
    }
    if (/^[-*] /.test(trimmed)) {
      const items = trimmed.split('\n').map((l) => l.replace(/^[-*]\s+/, ''));
      return (
        <ul key={bi} className="list-disc pl-6 mb-6 space-y-2 text-[#3f3f3f] text-base md:text-lg" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
          {items.map((it, i) => <li key={i}>{renderInline(it)}</li>)}
        </ul>
      );
    }
    return (
      <p key={bi} className="text-[#3f3f3f] text-base md:text-lg leading-relaxed mb-6" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
        {renderInline(trimmed)}
      </p>
    );
  });
}

function renderInline(text: string): React.ReactNode[] {
  // Order matters: escape markdown tokens by splitting on the most specific
  // patterns first (links → bold → italic).
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) parts.push(...applyBoldItalic(text.slice(last, m.index), () => key++));
    parts.push(<a key={key++} href={m[2]} className="text-[#8b52c5] underline hover:opacity-80">{m[1]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(...applyBoldItalic(text.slice(last), () => key++));
  return parts;
}

function applyBoldItalic(text: string, nextKey: () => number): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  // Bold first (**...**).
  const boldRe = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = boldRe.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<strong key={nextKey()} className="font-bold">{m[1]}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [related, setRelated] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const ac = new AbortController();
    setLoading(true);
    fetchBlogPostBySlug(slug, ac.signal)
      .then((p) => { setPost(p); return p; })
      .then((p) => {
        if (!p || !p.category) return [] as BlogPostSummary[];
        return fetchBlogPosts({ category: p.category, signal: ac.signal });
      })
      .then((list) => setRelated(list.filter((r) => r.slug !== slug).slice(0, 3)))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setPost(null);
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#fffdf3] min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-[#8b52c5] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#fffdf3] min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-[#8b52c5] text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
          Post not found
        </h1>
        <p className="text-[#3f3f3f] mb-8" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        <Link to="/blog" className="inline-block rounded-[100px] uppercase tracking-[2.7px] font-bold text-[18px] px-[40px] py-[20px] bg-[#bbd148] text-[#3f3f3f] hover:brightness-105 transition-all" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pt-8">
        <div className="max-w-[800px] mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#8b52c5] hover:underline font-medium" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
            ← Back to Blog
          </Link>
        </div>
      </section>

      <article className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-8 md:py-12">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryColor(post.category)}`}>
              {post.category ? (CATEGORY_LABELS[post.category] ?? post.category) : 'Post'}
            </span>
            <span className="text-sm text-[#3f3f3f]/50" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
              {formatDate(post.published_at)}
            </span>
          </div>

          <h1 className="text-[#3f3f3f] text-3xl md:text-4xl lg:text-5xl mb-6" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
            {post.title}
          </h1>

          <div className="bg-[#f4eefa] h-[300px] md:h-[400px] rounded-[20px] flex items-center justify-center mb-8 overflow-hidden">
            {post.cover_r2_key ? (
              <img src={`/r2/${post.cover_r2_key}`} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[80px] md:text-[120px] font-bold text-[#8b52c5] opacity-20" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
                {post.title.charAt(0)}
              </span>
            )}
          </div>

          <div className="mb-8">{renderMarkdown(post.content)}</div>

          <div className="border-t border-[#f4eefa] pt-6 mb-8">
            <p className="text-[#3f3f3f]/60 text-sm" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
              By <span className="font-bold text-[#3f3f3f]">{post.author}</span>
            </p>
          </div>

          <Link to="/blog" className="inline-flex items-center gap-2 text-[#8b52c5] hover:underline font-medium" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
            ← Back to Blog
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[#8b52c5] text-2xl md:text-3xl mb-8 text-center" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
              {related.map((rp) => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="bg-white rounded-[20px] shadow-md overflow-hidden hover:shadow-lg transition-shadow block">
                  <div className="bg-[#f4eefa] h-[180px] flex items-center justify-center overflow-hidden">
                    {rp.cover_r2_key ? (
                      <img src={`/r2/${rp.cover_r2_key}`} alt={rp.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[50px] font-bold text-[#8b52c5] opacity-30" style={{ fontFamily: "'Bingo Action Comic:Regular', sans-serif" }}>
                        {rp.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${getCategoryColor(rp.category)}`}>
                      {rp.category ? (CATEGORY_LABELS[rp.category] ?? rp.category) : 'Post'}
                    </span>
                    <h4 className="font-bold text-[#3f3f3f] mb-1 line-clamp-2" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
                      {rp.title}
                    </h4>
                    <p className="text-xs text-[#3f3f3f]/50" style={{ fontFamily: "'Roboto:Regular', sans-serif", fontVariationSettings: "'wdth' 100" }}>
                      {formatDate(rp.published_at)}
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
