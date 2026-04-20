import { Fragment, useEffect, useState, type SyntheticEvent } from 'react';

interface BlogPostRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_r2_key: string | null;
  author: string;
  category: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface FormState {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  published: boolean;
}

const CATEGORY_OPTIONS = ['news', 'tips-tutorials', 'competitions', 'new-patterns'];

const EMPTY_FORM: FormState = {
  slug: '', title: '', excerpt: '', content: '', author: 'Pauline McArthur',
  category: 'news', published: false,
};

function slugify(s: string): string {
  return s.toLowerCase().trim()
    .replace(/['"`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);
}

export function BlogTab() {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/blog');
      const data = (await res.json()) as { success?: boolean; posts?: BlogPostRow[]; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      setPosts(data.posts ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowForm(true);
  }

  function openEdit(p: BlogPostRow) {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? '',
      content: p.content,
      author: p.author,
      category: p.category ?? 'news',
      published: p.published_at !== null,
    });
    setFormError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  }

  async function submit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      if (!form.title.trim()) throw new Error('Title is required');
      if (!form.slug.trim()) throw new Error('Slug is required');
      if (!form.content.trim()) throw new Error('Content is required');

      const payload = {
        slug: form.slug.trim(),
        title: form.title.trim(),
        excerpt: form.excerpt.trim() || null,
        content: form.content,
        author: form.author.trim() || 'Pauline McArthur',
        category: form.category || null,
        published: form.published,
      };

      const url = editingId === null ? '/api/admin/blog' : `/api/admin/blog/${editingId}`;
      const method = editingId === null ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      closeForm();
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(p: BlogPostRow) {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/blog/${p.id}`, { method: 'DELETE' });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      await load();
    } catch (err) {
      alert(`Delete failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  async function togglePublish(p: BlogPostRow) {
    try {
      const res = await fetch(`/api/admin/blog/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: p.published_at === null }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      await load();
    } catch (err) {
      alert(`Toggle failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,3.5vw,40px)]">Blog</h1>
        <p className="text-[#3f3f3f]/70 text-[14px] mt-1">
          {loading ? 'Loading…' : `${posts.length} post${posts.length === 1 ? '' : 's'}`}
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={openNew}
          className="px-5 py-2 rounded-[100px] bg-[#8b52c5] text-white font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110 cursor-pointer"
        >
          + New post
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">{error}</div>
      )}

      {showForm && (
        <form onSubmit={submit} className="bg-white rounded-[20px] shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[24px]">
              {editingId === null ? 'New post' : `Edit #${editingId}`}
            </h3>
            <button type="button" onClick={closeForm} className="text-[#3f3f3f]/60 hover:text-[#3f3f3f] text-[14px] cursor-pointer">✕ Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4">
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Title *</span>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    // Auto-slug only on creation and while slug mirrors the auto-slug.
                    slug: editingId === null && (f.slug === '' || f.slug === slugify(f.title)) ? slugify(title) : f.slug,
                  }));
                }}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Slug *</span>
              <input
                type="text"
                required
                pattern="[a-z0-9-]+"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 font-mono text-[14px] focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Author</span>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Category</span>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              >
                {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Excerpt</span>
            <input
              type="text"
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              placeholder="One-line summary shown on the blog list"
            />
          </label>

          <label className="block">
            <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">
              Content * <span className="text-[#3f3f3f]/50 font-normal normal-case">(Markdown — # heading, **bold**, [links](url))</span>
            </span>
            <textarea
              required
              rows={16}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 font-mono text-[14px] focus:outline-none focus:border-[#8b52c5]"
            />
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              className="size-4 accent-[#8b52c5]"
            />
            <span className="text-[14px] font-bold text-[#3f3f3f]">Published</span>
          </label>

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">{formError}</div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-[100px] bg-[#8b52c5] text-white font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'Saving…' : editingId === null ? 'Create post' : 'Save changes'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#f4eefa]">
            <tr>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Title</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Slug</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Category</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Status</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Updated</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && posts.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-[#3f3f3f]/50">No posts yet. Click "+ New post" to write your first.</td></tr>
            )}
            {posts.map((p) => (
              <Fragment key={p.id}>
                <tr className="border-t border-[#f4eefa] hover:bg-[#f4eefa]/30 text-[14px]">
                  <td className="px-4 py-3 font-bold max-w-[280px]">
                    <div className="truncate">{p.title}</div>
                    {p.excerpt && <div className="text-[12px] text-[#3f3f3f]/50 truncate">{p.excerpt}</div>}
                  </td>
                  <td className="px-4 py-3 text-[12px] font-mono text-[#3f3f3f]/70">{p.slug}</td>
                  <td className="px-4 py-3 text-[12px]">{p.category ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[1px] ${p.published_at ? 'bg-[#bbd148] text-[#3f3f3f]' : 'bg-gray-200 text-gray-600'}`}>
                      {p.published_at ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-[#3f3f3f]/70">
                    {p.updated_at ? new Date(p.updated_at).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3 text-[12px]">
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => togglePublish(p)} className="text-[#8b52c5] hover:underline cursor-pointer">
                        {p.published_at ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => openEdit(p)} className="text-[#8b52c5] hover:underline cursor-pointer">Edit</button>
                      <button onClick={() => remove(p)} className="text-red-600 hover:underline cursor-pointer">Delete</button>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlogTab;
