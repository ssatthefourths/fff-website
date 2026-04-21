// GET /api/makers — public list for the homepage MakerOfTheMonth section.
//
// Query params:
//   year  — number, optional
//   month — 'January'…'December', optional
//
// If neither is supplied, returns the most recent (year, month) that has
// any rows — which is what the homepage renders by default. This way
// adding a new month in the admin automatically becomes the headline
// without a deploy.

interface Env {
  DB: D1Database;
}

interface MakerRow {
  id: number;
  name: string;
  pattern_name: string;
  photo_r2_key: string | null;
  month: string;
  year: number;
  is_winner: number;
  sort_order: number;
}

interface LatestRow {
  year: number;
  month: string;
}

// Month index for ORDER BY since SQLite doesn't have a month-name sort.
const MONTH_ORDER = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTH_CASE = MONTH_ORDER.map((m, i) => `WHEN '${m}' THEN ${i + 1}`).join(' ');

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  let year: number | null = null;
  let month: string | null = null;

  const yearParam = url.searchParams.get('year');
  if (yearParam) {
    const n = parseInt(yearParam, 10);
    if (Number.isFinite(n) && n >= 2000 && n <= 2100) year = n;
  }
  const monthParam = url.searchParams.get('month');
  if (monthParam && MONTH_ORDER.includes(monthParam)) month = monthParam;

  try {
    // If the caller didn't pin a specific period, find the most recent
    // (year, month) that actually has rows.
    if (year === null || month === null) {
      const latest = await context.env.DB
        .prepare(
          `SELECT year, month FROM makers
           ORDER BY year DESC, CASE month ${MONTH_CASE} END DESC
           LIMIT 1`,
        )
        .first<LatestRow>();
      if (!latest) {
        return Response.json({ success: true, makers: [], year: null, month: null });
      }
      year = latest.year;
      month = latest.month;
    }

    const res = await context.env.DB
      .prepare(
        `SELECT id, name, pattern_name, photo_r2_key, month, year, is_winner, sort_order
         FROM makers
         WHERE year = ? AND month = ?
         ORDER BY sort_order, id`,
      )
      .bind(year, month)
      .all<MakerRow>();

    const makers = (res.results ?? []).map((m) => ({
      id: m.id,
      name: m.name,
      pattern_name: m.pattern_name,
      month: m.month,
      year: m.year,
      is_winner: !!m.is_winner,
      sort_order: m.sort_order,
      photo_url: m.photo_r2_key ? `/r2/${m.photo_r2_key}` : null,
    }));

    return Response.json({ success: true, year, month, makers });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Failed to load makers', detail: message }, { status: 500 });
  }
};
