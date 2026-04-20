import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text, primaryKey, index } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('customer'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
});

export const newsletterSubscribers = sqliteTable('newsletter_subscribers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  subscribedAt: text('subscribed_at').default(sql`(datetime('now'))`),
  unsubscribedAt: text('unsubscribed_at'),
  isActive: integer('is_active').default(1),
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  price: integer('price').notNull(),
  description: text('description'),
  shortDescription: text('short_description'),
  category: text('category').notNull(),
  difficulty: text('difficulty', { enum: ['beginner', 'intermediate', 'advanced'] }).default('beginner'),
  imageUrl: text('image_url'),
  isFree: integer('is_free').default(0),
  isNew: integer('is_new').default(0),
  isFeatured: integer('is_featured').default(0),
  downloadUrl: text('download_url'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
}, (t) => ({
  categoryIdx: index('idx_products_category').on(t.category),
  slugIdx: index('idx_products_slug').on(t.slug),
}));

export const productImages = sqliteTable('product_images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  r2Key: text('r2_key').notNull(),
  alt: text('alt'),
  sortOrder: integer('sort_order').default(0),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

export const productFiles = sqliteTable('product_files', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  r2Key: text('r2_key').notNull(),
  filename: text('filename').notNull(),
  sizeBytes: integer('size_bytes'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  sortOrder: integer('sort_order').default(0),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

export const productCategories = sqliteTable('product_categories', {
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
}, (t) => ({
  pk: primaryKey({ columns: [t.productId, t.categoryId] }),
}));

export const discountCodes = sqliteTable('discount_codes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull().unique(),
  type: text('type', { enum: ['percent', 'fixed'] }).notNull(),
  value: integer('value').notNull(),
  minSubtotalCents: integer('min_subtotal_cents').default(0),
  maxUses: integer('max_uses'),
  usesCount: integer('uses_count').default(0),
  expiresAt: text('expires_at'),
  isActive: integer('is_active').default(1),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

export const discountUsages = sqliteTable('discount_usages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  discountCodeId: integer('discount_code_id').notNull().references(() => discountCodes.id),
  orderId: integer('order_id').notNull().references(() => orders.id),
  usedAt: text('used_at').default(sql`(datetime('now'))`),
});

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  total: integer('total').notNull(),
  status: text('status').default('pending'),
  stripePaymentId: text('stripe_payment_id'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  currency: text('currency').default('AUD'),
  subtotalCents: integer('subtotal_cents'),
  discountCents: integer('discount_cents').default(0),
  taxCents: integer('tax_cents').default(0),
  discountCodeId: integer('discount_code_id').references(() => discountCodes.id),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').notNull().references(() => orders.id),
  productId: integer('product_id').notNull().references(() => products.id),
  price: integer('price').notNull(),
  downloadUrl: text('download_url'),
  downloadedAt: text('downloaded_at'),
});

export const downloadGrants = sqliteTable('download_grants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderItemId: integer('order_item_id').notNull().references(() => orderItems.id),
  token: text('token').notNull().unique(),
  expiresAt: text('expires_at').notNull(),
  downloadsCount: integer('downloads_count').default(0),
  maxDownloads: integer('max_downloads').default(10),
  lastDownloadedAt: text('last_downloaded_at'),
});

export const sessions = sqliteTable('sessions', {
  token: text('token').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  expiresAt: text('expires_at').notNull(),
  lastSeenAt: text('last_seen_at'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type DiscountCode = typeof discountCodes.$inferSelect;
export type Session = typeof sessions.$inferSelect;
