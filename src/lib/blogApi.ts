// Thin client for the /api/blog endpoints. Only normalises the nullables
// the SPA doesn't want to care about; the DB shape otherwise matches what
// the pages render directly.

export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_r2_key: string | null;
  author: string;
  category: string | null;
  published_at: string | null;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
}

export async function fetchBlogPosts(opts: { category?: string; signal?: AbortSignal } = {}): Promise<BlogPostSummary[]> {
  const params = new URLSearchParams();
  if (opts.category) params.set('category', opts.category);
  const qs = params.toString();
  const res = await fetch(`/api/blog${qs ? `?${qs}` : ''}`, { signal: opts.signal });
  if (!res.ok) throw new Error(`Failed to load blog (HTTP ${res.status})`);
  const data = (await res.json()) as { success?: boolean; posts?: BlogPostSummary[] };
  return data.posts ?? [];
}

export async function fetchBlogPostBySlug(slug: string, signal?: AbortSignal): Promise<BlogPostDetail | null> {
  const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`, { signal });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load post (HTTP ${res.status})`);
  const data = (await res.json()) as { success?: boolean; post?: BlogPostDetail };
  return data.post ?? null;
}
