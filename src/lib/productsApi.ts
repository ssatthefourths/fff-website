// Thin client for the /api/products endpoints.
//
// Maps the D1 row shape (snake_case, integer booleans) into the existing
// `Pattern` type used everywhere else in the frontend (camelCase, real
// booleans). Components can keep rendering `Pattern` as they always have —
// the adapter hides the schema mismatch.
//
// Callers that need the DB id (e.g. cart → create-intent product_id) do
// parseInt(p.id); the id is serialised as a string to stay compatible with
// the legacy static-data shape.

import type { Pattern } from '../data/products';

export interface DbProductRow {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string | null;
  short_description: string | null;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | null;
  image_url: string | null;
  is_free: number | boolean;
  is_new: number | boolean;
  is_featured: number | boolean;
}

function toPattern(row: DbProductRow): Pattern {
  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    price: Number(row.price ?? 0),
    description: row.description ?? '',
    shortDescription: row.short_description ?? '',
    image: row.image_url ?? '/api/placeholder/400/400',
    category: row.category,
    difficulty: row.difficulty ?? 'beginner',
    isFree: !!row.is_free,
    isNew: !!row.is_new,
    isFeatured: !!row.is_featured,
    tags: [],
  };
}

export interface FetchProductsOptions {
  category?: string;
  limit?: number;
  offset?: number;
  signal?: AbortSignal;
}

export async function fetchProducts(opts: FetchProductsOptions = {}): Promise<Pattern[]> {
  const params = new URLSearchParams();
  if (opts.category) params.set('category', opts.category);
  if (opts.limit !== undefined) params.set('limit', String(opts.limit));
  if (opts.offset !== undefined) params.set('offset', String(opts.offset));
  const qs = params.toString();
  const res = await fetch(`/api/products${qs ? `?${qs}` : ''}`, { signal: opts.signal });
  if (!res.ok) throw new Error(`Failed to load products (HTTP ${res.status})`);
  const data = (await res.json()) as { success?: boolean; products?: DbProductRow[] };
  return (data.products ?? []).map(toPattern);
}

export async function searchProducts(query: string, signal?: AbortSignal): Promise<Pattern[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];
  const res = await fetch(`/api/products/search?q=${encodeURIComponent(trimmed)}`, { signal });
  if (!res.ok) throw new Error(`Search failed (HTTP ${res.status})`);
  const data = (await res.json()) as { success?: boolean; results?: DbProductRow[] };
  return (data.results ?? []).map(toPattern);
}

export interface ProductDetailResponse {
  product: Pattern & {
    images: { id: number; r2_key: string; alt: string | null; sort_order: number }[];
    categories: { id: number; slug: string; name: string }[];
  };
}

export async function fetchProductBySlug(slug: string, signal?: AbortSignal): Promise<ProductDetailResponse['product'] | null> {
  const res = await fetch(`/api/products/${encodeURIComponent(slug)}`, { signal });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load product (HTTP ${res.status})`);
  const data = (await res.json()) as { success?: boolean; product?: DbProductRow & { images?: ProductDetailResponse['product']['images']; categories?: ProductDetailResponse['product']['categories'] } };
  if (!data.product) return null;
  const base = toPattern(data.product);
  return {
    ...base,
    images: data.product.images ?? [],
    categories: data.product.categories ?? [],
  };
}
