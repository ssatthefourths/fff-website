interface Env {
  DB: D1Database;
}

interface ProductRow {
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
  updated_at: string | null;
}

interface ProductImageRow {
  id: number;
  r2_key: string;
  alt: string | null;
  sort_order: number;
}

interface ProductCategoryRow {
  id: number;
  slug: string;
  name: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const slug = context.params.slug;
  if (typeof slug !== 'string') {
    return Response.json({ error: 'Invalid slug' }, { status: 400 });
  }

  try {
    const product = await context.env.DB
      .prepare('SELECT * FROM products WHERE slug = ?')
      .bind(slug)
      .first<ProductRow>();

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    const [imagesRes, categoriesRes] = await Promise.all([
      context.env.DB
        .prepare('SELECT id, r2_key, alt, sort_order FROM product_images WHERE product_id = ? ORDER BY sort_order, id')
        .bind(product.id)
        .all<ProductImageRow>(),
      context.env.DB
        .prepare(
          'SELECT c.id, c.slug, c.name FROM categories c ' +
          'JOIN product_categories pc ON pc.category_id = c.id ' +
          'WHERE pc.product_id = ? ORDER BY c.sort_order, c.name',
        )
        .bind(product.id)
        .all<ProductCategoryRow>(),
    ]);

    return Response.json({
      success: true,
      product: {
        ...product,
        is_free: !!product.is_free,
        is_new: !!product.is_new,
        is_featured: !!product.is_featured,
        images: imagesRes.results ?? [],
        categories: categoriesRes.results ?? [],
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to fetch product', detail: message }, { status: 500 });
  }
};
