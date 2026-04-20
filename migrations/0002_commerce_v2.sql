-- Commerce v2 schema additions
-- Extends the initial schema with media, categories, discounts, enhanced orders,
-- download grants, and full-text search. All additions are backward-compatible:
-- existing products.image_url / products.download_url columns remain.

-- ─── Product media ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  r2_key TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);

CREATE TABLE IF NOT EXISTS product_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  r2_key TEXT NOT NULL,
  filename TEXT NOT NULL,
  size_bytes INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_product_files_product ON product_files(product_id);

-- ─── Categories ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS product_categories (
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- ─── Discounts ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS discount_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percent', 'fixed')),
  value INTEGER NOT NULL,
  min_subtotal_cents INTEGER DEFAULT 0,
  max_uses INTEGER,
  uses_count INTEGER DEFAULT 0,
  expires_at TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_discount_codes_code ON discount_codes(code);

CREATE TABLE IF NOT EXISTS discount_usages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  discount_code_id INTEGER NOT NULL REFERENCES discount_codes(id),
  order_id INTEGER NOT NULL REFERENCES orders(id),
  used_at TEXT DEFAULT (datetime('now'))
);

-- ─── Order enhancements ───────────────────────────────────────────────────────
-- D1 does not support ADD COLUMN IF NOT EXISTS, so each column is added
-- unconditionally. If this migration is re-run, those will error harmlessly
-- under "duplicate column" — wrap in application-layer idempotency if needed.
ALTER TABLE orders ADD COLUMN currency TEXT DEFAULT 'AUD';
ALTER TABLE orders ADD COLUMN subtotal_cents INTEGER;
ALTER TABLE orders ADD COLUMN discount_cents INTEGER DEFAULT 0;
ALTER TABLE orders ADD COLUMN tax_cents INTEGER DEFAULT 0;
ALTER TABLE orders ADD COLUMN discount_code_id INTEGER REFERENCES discount_codes(id);
ALTER TABLE orders ADD COLUMN stripe_payment_intent_id TEXT;

-- ─── Download grants ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS download_grants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_item_id INTEGER NOT NULL REFERENCES order_items(id),
  token TEXT UNIQUE NOT NULL,
  expires_at TEXT NOT NULL,
  downloads_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 10,
  last_downloaded_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_download_grants_token ON download_grants(token);
CREATE INDEX IF NOT EXISTS idx_download_grants_order_item ON download_grants(order_item_id);

-- ─── Sessions (server-side session store) ─────────────────────────────────────
-- Keyed by the opaque token set in the fff_session cookie. Deleted on logout
-- or expiry. No PII beyond user_id.
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL,
  last_seen_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- ─── Full-text search ─────────────────────────────────────────────────────────
CREATE VIRTUAL TABLE IF NOT EXISTS products_fts USING fts5(
  name, description, short_description,
  content='products',
  content_rowid='id'
);

CREATE TRIGGER IF NOT EXISTS products_fts_insert AFTER INSERT ON products BEGIN
  INSERT INTO products_fts(rowid, name, description, short_description)
  VALUES (new.id, new.name, new.description, new.short_description);
END;

CREATE TRIGGER IF NOT EXISTS products_fts_delete AFTER DELETE ON products BEGIN
  INSERT INTO products_fts(products_fts, rowid, name, description, short_description)
  VALUES ('delete', old.id, old.name, old.description, old.short_description);
END;

CREATE TRIGGER IF NOT EXISTS products_fts_update AFTER UPDATE ON products BEGIN
  INSERT INTO products_fts(products_fts, rowid, name, description, short_description)
  VALUES ('delete', old.id, old.name, old.description, old.short_description);
  INSERT INTO products_fts(rowid, name, description, short_description)
  VALUES (new.id, new.name, new.description, new.short_description);
END;

-- Backfill FTS with existing products
INSERT INTO products_fts(rowid, name, description, short_description)
SELECT id, name, description, short_description FROM products;
