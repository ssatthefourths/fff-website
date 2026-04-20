-- Same class of bug as migration 0003 (users.updated_at). The original
-- 0001 CREATE TABLE IF NOT EXISTS meant a pre-existing products table
-- skipped the new column. Add it nullable (SQLite forbids non-deterministic
-- defaults on ALTER ADD COLUMN) and backfill from created_at.
ALTER TABLE products ADD COLUMN updated_at TEXT;
UPDATE products SET updated_at = COALESCE(created_at, datetime('now')) WHERE updated_at IS NULL;
