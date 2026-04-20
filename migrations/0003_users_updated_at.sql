-- The remote users table is missing updated_at — the 0001 migration used
-- CREATE TABLE IF NOT EXISTS, so on a DB that already had an older users
-- table without the column, the migration was a no-op. Add the column and
-- backfill.

-- Note: SQLite doesn't allow non-deterministic defaults like datetime('now')
-- in ALTER TABLE ADD COLUMN. We add the column nullable and set it in
-- application code on every UPDATE.
ALTER TABLE users ADD COLUMN updated_at TEXT;

-- Backfill existing rows so updated_at is never NULL after this.
UPDATE users SET updated_at = COALESCE(created_at, datetime('now')) WHERE updated_at IS NULL;
