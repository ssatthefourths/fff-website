// Auth + session helpers for Pages Functions.
// Passwords: PBKDF2-SHA256, 100k iterations, 16-byte salt, 32-byte hash.
// Stored as: pbkdf2$<iterations>$<saltHex>$<hashHex>
// Legacy SHA-256 hex hashes (64 chars, no $) are still accepted on login; on
// successful legacy login the caller should rehash + update the row.

const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_SALT_BYTES = 16;
const PBKDF2_HASH_BYTES = 32;

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function fromHex(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(PBKDF2_SALT_BYTES));
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toHex(salt.buffer)}$${toHex(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<{ valid: boolean; needsRehash: boolean }> {
  // Legacy SHA-256 hex (64 chars, no `$`): accept for backward compatibility
  if (!stored.includes('$')) {
    const encoder = new TextEncoder();
    const digest = await crypto.subtle.digest('SHA-256', encoder.encode(password));
    const valid = timingSafeEqual(toHex(digest), stored);
    return { valid, needsRehash: valid };
  }
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return { valid: false, needsRehash: false };
  const iterations = parseInt(parts[1], 10);
  const salt = fromHex(parts[2]);
  const expected = parts[3];
  const hash = await pbkdf2(password, salt, iterations);
  return { valid: timingSafeEqual(toHex(hash), expected), needsRehash: false };
}

async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  return crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations, hash: 'SHA-256' },
    key,
    PBKDF2_HASH_BYTES * 8
  );
}

// ─── Sessions ─────────────────────────────────────────────────────────────────
const SESSION_COOKIE = 'fff_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface Env {
  DB: D1Database;
}

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export function generateSessionToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return toHex(bytes.buffer);
}

export async function createSession(db: D1Database, userId: number): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();
  await db.prepare(
    'INSERT INTO sessions (token, user_id, expires_at, last_seen_at) VALUES (?, ?, ?, datetime(\'now\'))'
  ).bind(token, userId, expiresAt).run();
  return token;
}

export async function getSessionUser(db: D1Database, token: string | null): Promise<SessionUser | null> {
  if (!token) return null;
  const row = await db.prepare(
    `SELECT u.id, u.email, u.name, u.role, s.expires_at
     FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token = ?`
  ).bind(token).first<{ id: number; email: string; name: string; role: string; expires_at: string }>();
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    return null;
  }
  // Update last_seen_at fire-and-forget
  await db.prepare('UPDATE sessions SET last_seen_at = datetime(\'now\') WHERE token = ?').bind(token).run();
  return { id: row.id, email: row.email, name: row.name, role: row.role };
}

export async function deleteSession(db: D1Database, token: string): Promise<void> {
  await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
}

export function getSessionCookie(request: Request): string | null {
  const cookie = request.headers.get('Cookie');
  if (!cookie) return null;
  const match = cookie.match(/fff_session=([^;]+)/);
  return match ? match[1] : null;
}

export function buildSessionCookie(token: string): string {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function buildClearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

// ─── Admin auth guard ─────────────────────────────────────────────────────────
// Two auth paths for admin routes:
//   (a) Cloudflare Access header Cf-Access-Authenticated-User-Email — when CF
//       Access is configured in the dashboard, the header is present for any
//       request that passed Access's email-verification flow.
//   (b) Session-based: the fff_session cookie resolves to a user with
//       role = 'admin' in the users table.
// Either is sufficient. Use (a) for hardened production; (b) works out of the
// box without dashboard config.
export async function getAdminUser(db: D1Database, request: Request): Promise<SessionUser | null> {
  const token = getSessionCookie(request);
  const user = await getSessionUser(db, token);
  return user && user.role === 'admin' ? user : null;
}

export function getAdminEmail(request: Request): string | null {
  return request.headers.get('Cf-Access-Authenticated-User-Email');
}
