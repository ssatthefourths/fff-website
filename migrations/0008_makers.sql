-- Phase 8: Makers table + seed from src/data/makers.ts.
-- photo_r2_key is NULL on seeded rows; admin uploads images via
-- POST /api/admin/makers/[id]/photo → R2 images/makers/{id}/…
-- Re-running is safe: ON CONFLICT(name, month, year) DO UPDATE refreshes
-- pattern_name + sort_order + winner flag without duplicating.

CREATE TABLE IF NOT EXISTS makers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  pattern_name TEXT NOT NULL,
  photo_r2_key TEXT,
  month TEXT NOT NULL,            -- 'January' … 'December'
  year INTEGER NOT NULL,
  is_winner INTEGER DEFAULT 0,    -- flagged as highlighted entry for the month
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE (name, month, year)
);
CREATE INDEX IF NOT EXISTS idx_makers_year_month ON makers(year, month);

INSERT INTO makers (name, pattern_name, month, year, sort_order, is_winner) VALUES
  ('Melissa Cochrane',     'Bumble the Bee',          'January',   2026, 0, 1),
  ('Mary Shaw',            'Harmony Highland Cow',    'February',  2026, 1, 1),
  ('Maggie Durham',        'Harmony Highland Cow',    'March',     2026, 2, 1),
  ('Janet O''Neil-Conlon', 'Horsey Horse Unicorn',    'April',     2026, 3, 1),
  ('Linda Patterson',      'Raff the Giraffe',        'May',       2025, 0, 1),
  ('Susan Chen',           'Fifi Fox',                'June',      2025, 1, 1),
  ('Karen Whitfield',      'Dizzy Dolphin',           'July',      2025, 2, 1),
  ('Debbie Foster',        'Ellie Elephant',          'August',    2025, 3, 1),
  ('Patricia Murphy',      'Larry Lion',              'September', 2025, 0, 1),
  ('Wendy Brooks',         'Pablo Puppy',             'October',   2025, 1, 1),
  ('Rachel Adams',         'Calipso Clownfish',       'November',  2025, 2, 1),
  ('Teresa Walsh',         'Sitting Cat',             'December',  2025, 3, 1)
ON CONFLICT (name, month, year) DO UPDATE SET
  pattern_name = excluded.pattern_name,
  sort_order = excluded.sort_order,
  is_winner = excluded.is_winner,
  updated_at = datetime('now');
