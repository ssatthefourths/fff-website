import { Fragment, useEffect, useState, type SyntheticEvent } from 'react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string | null;
  short_description: string | null;
  category: string;
  difficulty: string | null;
  image_url: string | null;
  is_free: number;
  is_new: number;
  is_featured: number;
  created_at: string | null;
}

interface ProductImage {
  id: number;
  r2_key: string;
  alt: string | null;
  sort_order: number;
}

interface ProductFile {
  id: number;
  r2_key: string;
  filename: string;
  size_bytes: number | null;
}

interface FormState {
  name: string;
  slug: string;
  price: string; // string while editing, parsed on submit
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  short_description: string;
  description: string;
  is_free: boolean;
  is_new: boolean;
  is_featured: boolean;
}

const EMPTY_FORM: FormState = {
  name: '',
  slug: '',
  price: '',
  category: '',
  difficulty: 'beginner',
  short_description: '',
  description: '',
  is_free: false,
  is_new: false,
  is_featured: false,
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

function formatBytes(n: number | null | undefined): string {
  if (!n) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [mediaForProduct, setMediaForProduct] = useState<number | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [files, setFiles] = useState<ProductFile[]>([]);
  const [uploading, setUploading] = useState<'image' | 'file' | null>(null);

  async function loadProducts() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json() as { success?: boolean; products?: Product[]; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      setProducts(data.products ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadProducts(); }, []);

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      slug: p.slug,
      price: String(p.price ?? ''),
      category: p.category,
      difficulty: (p.difficulty as FormState['difficulty']) ?? 'beginner',
      short_description: p.short_description ?? '',
      description: p.description ?? '',
      is_free: !!p.is_free,
      is_new: !!p.is_new,
      is_featured: !!p.is_featured,
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

  async function submitForm(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      const priceNum = Number(form.price);
      if (!Number.isFinite(priceNum) || priceNum < 0) throw new Error('Price must be a non-negative number');
      if (!form.name.trim()) throw new Error('Name is required');
      if (!form.slug.trim()) throw new Error('Slug is required');
      if (!form.category.trim()) throw new Error('Category is required');

      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        price: priceNum,
        category: form.category.trim(),
        difficulty: form.difficulty,
        short_description: form.short_description.trim() || null,
        description: form.description.trim() || null,
        is_free: form.is_free,
        is_new: form.is_new,
        is_featured: form.is_featured,
      };

      const url = editingId === null ? '/api/admin/products' : `/api/admin/products/${editingId}`;
      const method = editingId === null ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json() as { success?: boolean; error?: string; id?: number };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);

      closeForm();
      await loadProducts();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteProduct(id: number) {
    if (!confirm('Delete this product? All images and files are also removed. This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      if (mediaForProduct === id) setMediaForProduct(null);
      await loadProducts();
    } catch (err) {
      alert(`Delete failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  async function openMedia(productId: number) {
    setMediaForProduct(productId);
    setImages([]);
    setFiles([]);
    try {
      const [imgRes, fileRes] = await Promise.all([
        fetch(`/api/products/${products.find(p => p.id === productId)?.slug}`),
        fetch(`/api/admin/products/${productId}/files`),
      ]);
      const imgData = await imgRes.json() as { product?: { images?: ProductImage[] } };
      const fileData = await fileRes.json() as { files?: ProductFile[] };
      setImages(imgData.product?.images ?? []);
      setFiles(fileData.files ?? []);
    } catch {
      /* non-fatal */
    }
  }

  async function uploadImage(productId: number, file: File) {
    setUploading('image');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`/api/admin/products/${productId}/images`, { method: 'POST', body: fd });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      await openMedia(productId);
    } catch (err) {
      alert(`Upload failed: ${err instanceof Error ? err.message : err}`);
    } finally {
      setUploading(null);
    }
  }

  async function uploadFile(productId: number, file: File) {
    setUploading('file');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`/api/admin/products/${productId}/files`, { method: 'POST', body: fd });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      await openMedia(productId);
    } catch (err) {
      alert(`Upload failed: ${err instanceof Error ? err.message : err}`);
    } finally {
      setUploading(null);
    }
  }

  async function deleteImage(productId: number, imageId: number) {
    if (!confirm('Delete this image?')) return;
    const res = await fetch(`/api/admin/products/${productId}/images?image=${imageId}`, { method: 'DELETE' });
    if (res.ok) await openMedia(productId);
  }

  async function deleteFile(productId: number, fileId: number) {
    if (!confirm('Delete this file?')) return;
    const res = await fetch(`/api/admin/products/${productId}/files?file=${fileId}`, { method: 'DELETE' });
    if (res.ok) await openMedia(productId);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-[#3f3f3f]/70 text-[14px]">
          {loading ? 'Loading…' : `${products.length} product${products.length === 1 ? '' : 's'}`}
        </p>
        <button
          onClick={openNew}
          className="px-5 py-2 rounded-[100px] bg-[#8b52c5] text-white font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110 cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={submitForm} className="bg-white rounded-[20px] shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[24px]">
              {editingId === null ? 'New product' : `Edit #${editingId}`}
            </h3>
            <button type="button" onClick={closeForm} className="text-[#3f3f3f]/60 hover:text-[#3f3f3f] text-[14px] cursor-pointer">
              ✕ Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Name *</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm((f) => ({
                    ...f,
                    name,
                    // Auto-fill slug only when creating and slug hasn't been hand-edited.
                    slug: editingId === null && (f.slug === '' || f.slug === slugify(f.name)) ? slugify(name) : f.slug,
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
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5] font-mono text-[14px]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Price (AUD) *</span>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Category *</span>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Difficulty</span>
              <select
                value={form.difficulty}
                onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value as FormState['difficulty'] }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Short description</span>
            <input
              type="text"
              value={form.short_description}
              onChange={(e) => setForm((f) => ({ ...f, short_description: e.target.value }))}
              className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
            />
          </label>

          <label className="block">
            <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Description</span>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
            />
          </label>

          <div className="flex flex-wrap gap-6">
            {(['is_free', 'is_new', 'is_featured'] as const).map((key) => (
              <label key={key} className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))}
                  className="size-4 accent-[#8b52c5]"
                />
                <span className="text-[14px] font-bold text-[#3f3f3f] capitalize">{key.replace('is_', '')}</span>
              </label>
            ))}
          </div>

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">
              {formError}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-[100px] bg-[#8b52c5] text-white font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Saving…' : editingId === null ? 'Create' : 'Save changes'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#f4eefa]">
            <tr>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">ID</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Name</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Slug</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Price</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Category</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Flags</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && products.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#3f3f3f]/50">No products yet. Click "Add Product" to create your first.</td></tr>
            )}
            {products.map((p) => (
              <Fragment key={p.id}>
                <tr className="border-t border-[#f4eefa] hover:bg-[#f4eefa]/30">
                  <td className="px-4 py-3 text-[14px]">#{p.id}</td>
                  <td className="px-4 py-3 text-[14px] font-bold">{p.name}</td>
                  <td className="px-4 py-3 text-[12px] font-mono text-[#3f3f3f]/70">{p.slug}</td>
                  <td className="px-4 py-3 text-[14px]">${Number(p.price ?? 0).toFixed(2)}</td>
                  <td className="px-4 py-3 text-[14px]">{p.category}</td>
                  <td className="px-4 py-3 text-[11px]">
                    <span className="inline-flex gap-1">
                      {p.is_free ? <span className="bg-[#bbd148] px-2 py-0.5 rounded-full">free</span> : null}
                      {p.is_new ? <span className="bg-[#f4eefa] text-[#8b52c5] px-2 py-0.5 rounded-full">new</span> : null}
                      {p.is_featured ? <span className="bg-[#f6d75a] px-2 py-0.5 rounded-full">featured</span> : null}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px]">
                    <div className="flex gap-2">
                      <button onClick={() => openMedia(p.id)} className="text-[#8b52c5] hover:underline cursor-pointer">Media</button>
                      <button onClick={() => openEdit(p)} className="text-[#8b52c5] hover:underline cursor-pointer">Edit</button>
                      <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:underline cursor-pointer">Delete</button>
                    </div>
                  </td>
                </tr>
                {mediaForProduct === p.id && (
                  <tr className="border-t border-[#f4eefa] bg-[#f4eefa]/20">
                    <td colSpan={7} className="px-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-[#8b52c5] text-[14px] mb-2">Images</h4>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {images.length === 0 && <p className="text-[#3f3f3f]/50 text-[13px]">No images.</p>}
                            {images.map((img) => (
                              <div key={img.id} className="relative group">
                                <img src={`/r2/${img.r2_key}`} alt={img.alt ?? ''} className="h-20 w-20 object-cover rounded-[8px] border border-[#8b52c5]/30" />
                                <button
                                  onClick={() => deleteImage(p.id, img.id)}
                                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full size-5 flex items-center justify-center text-[11px] opacity-0 group-hover:opacity-100 transition-opacity"
                                >×</button>
                              </div>
                            ))}
                          </div>
                          <label className="inline-block cursor-pointer">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              className="hidden"
                              onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadImage(p.id, f); e.target.value = ''; }}
                            />
                            <span className="inline-block px-4 py-2 rounded-[100px] bg-white border-2 border-[#8b52c5] text-[#8b52c5] font-bold text-[12px] uppercase tracking-[1px] hover:bg-[#8b52c5]/10">
                              {uploading === 'image' ? 'Uploading…' : '+ Upload image'}
                            </span>
                          </label>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#8b52c5] text-[14px] mb-2">PDF files</h4>
                          <div className="space-y-1 mb-3">
                            {files.length === 0 && <p className="text-[#3f3f3f]/50 text-[13px]">No files.</p>}
                            {files.map((f) => (
                              <div key={f.id} className="flex items-center justify-between bg-white rounded-[8px] border border-[#8b52c5]/30 px-3 py-2 text-[13px]">
                                <span className="truncate mr-2">{f.filename} <span className="text-[#3f3f3f]/50">({formatBytes(f.size_bytes)})</span></span>
                                <button onClick={() => deleteFile(p.id, f.id)} className="text-red-600 hover:underline text-[12px] cursor-pointer shrink-0">Delete</button>
                              </div>
                            ))}
                          </div>
                          <label className="inline-block cursor-pointer">
                            <input
                              type="file"
                              accept="application/pdf"
                              className="hidden"
                              onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadFile(p.id, f); e.target.value = ''; }}
                            />
                            <span className="inline-block px-4 py-2 rounded-[100px] bg-white border-2 border-[#8b52c5] text-[#8b52c5] font-bold text-[12px] uppercase tracking-[1px] hover:bg-[#8b52c5]/10">
                              {uploading === 'file' ? 'Uploading…' : '+ Upload PDF'}
                            </span>
                          </label>
                        </div>
                      </div>
                      <button onClick={() => setMediaForProduct(null)} className="mt-4 text-[#3f3f3f]/60 hover:text-[#3f3f3f] text-[12px] cursor-pointer">
                        ✕ Close media panel
                      </button>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsTab;
