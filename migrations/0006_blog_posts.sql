-- Blog posts — admin-managed content for /blog and /blog/[slug].
--
-- published_at NULL means the post is a draft (hidden from the public feed).
-- cover_r2_key points at an R2 object under `images/blog/…` uploaded via the
-- admin UI; NULL means the BlogPage renders a letter placeholder like the
-- product cards do.
--
-- Categories are freeform strings for v1 — existing usages ('competitions',
-- 'news', 'tips-tutorials', 'new-patterns') carry over. We can normalise
-- into a blog_categories table later if editorial needs warrant it.

CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_r2_key TEXT,
  author TEXT NOT NULL DEFAULT 'Pauline McArthur',
  category TEXT,
  published_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Seed three starter posts so the /blog page isn't empty on first visit.
INSERT INTO blog_posts (slug, title, excerpt, content, author, category, published_at)
VALUES
  ('easter-sewing-competition-2026-winner',
   'Easter Sewing Competition 2026 Winner',
   'Announcing the winner of this year''s Easter sewing competition — what a talented group of makers!',
   '# Congratulations!

We had a record-breaking number of entries for the 2026 Easter Sewing Competition, and our judges had the impossible task of picking just one winner from so many beautiful creations.

This year''s winning toy came from **Mary Shaw**, whose Easter Bunny was made entirely from upcycled vintage linen and hand-embroidered details. The level of craftsmanship was exceptional.

A huge thank you to everyone who entered — seeing your Funky Friends brought to life by so many hands is the best part of running this competition.

## The prizes

Mary wins:
- 5 free Funky Friends Factory patterns of her choice
- A featured spot in our Maker of the Month wall
- An exclusive printed tag set

Runners-up will receive 2 free patterns each — we''ll be in touch by email!',
   'Pauline McArthur', 'competitions', '2026-04-09T10:00:00.000Z'),

  ('best-wishes-baby-bird-pattern-ideas',
   'Best Wishes — Baby Bird Pattern Ideas',
   'Creative ideas for customising the Baby Bird pattern into a new-baby gift.',
   '# Make a Baby Bird they''ll keep forever

The Baby Bird pattern is one of our most popular starter projects, but with a few small tweaks it becomes a keepsake-quality new-baby gift.

## Fabric choices

Go soft. Brushed cotton, double gauze, and organic cotton knits are all safe for newborns and wash beautifully. Skip anything with loose fibres.

## Stuffing tip

For a baby gift, use washable polyester fibrefill rather than wool roving — the parents will thank you.

## Personalisation ideas

- Embroider the baby''s initials on a felt wing patch
- Include the birth date on a sewn-in tag
- Use fabric from the mum''s old maternity dress for a sentimental touch

Share yours with #funkyfriendsfactory — we love seeing Baby Birds in the wild.',
   'Pauline McArthur', 'tips-tutorials', '2026-03-22T10:00:00.000Z'),

  ('maker-of-the-month-january-2026',
   'Maker of the Month — January 2026',
   'Meet Melissa Cochrane, our January 2026 Maker of the Month.',
   '# January''s Maker: Melissa Cochrane

Melissa lives in country Victoria and has been sewing Funky Friends for nearly ten years. Her entry this month — **Bumble the Bee**, in yellow minky with the cutest black-and-white stripes — absolutely charmed the judges.

> "I make these for my grandkids'' birthdays. They''re always expecting something new!" — Melissa

## What Melissa used

- Yellow minky (main body)
- Black short-pile minky (stripes)
- White fleece (wings)
- Safety eyes (12 mm)

## Get the pattern

Bumble Bee is available in our [shop](/patterns) — great for intermediate sewers who''ve tackled one of the beginner patterns already.

Congratulations, Melissa! Your pattern of choice is winging its way to you.',
   'Pauline McArthur', 'news', '2026-01-15T10:00:00.000Z')
ON CONFLICT(slug) DO NOTHING;
