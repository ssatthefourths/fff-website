// Create-or-promote an admin user in the remote D1 database.
//
// Usage:
//   npm run admin:create
//
// Prompts for email, name, and password (or auto-generates one).
// Hashes the password with PBKDF2-SHA256 matching functions/api/lib/auth.ts,
// then upserts the row via `wrangler d1 execute` with role='admin'.
//
// Idempotent — if the email already exists, its password is replaced and
// role is set to 'admin'.

import { webcrypto as crypto } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Must match PBKDF2_ITERATIONS / PBKDF2_SALT_BYTES / PBKDF2_HASH_BYTES in
// functions/api/lib/auth.ts exactly. Changing those without also updating
// this file will produce hashes that verifyPassword() cannot validate.
const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_SALT_BYTES = 16;
const PBKDF2_HASH_BYTES = 32;

function toHex(buf) {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(PBKDF2_SALT_BYTES));
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key,
    PBKDF2_HASH_BYTES * 8,
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toHex(salt.buffer)}$${toHex(hash)}`;
}

// Ambiguity-free alphabet (no 0/O/1/l/I) for auto-generated passwords.
function generatePassword(length = 20) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes).map((b) => alphabet[b % alphabet.length]).join('');
}

function escapeSqlString(s) {
  return s.replace(/'/g, "''");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function main() {
  const rl = createInterface({ input, output });

  const email = (await rl.question('Admin email: ')).trim().toLowerCase();
  if (!isValidEmail(email)) {
    rl.close();
    console.error(`\n✗ "${email}" is not a valid email.`);
    process.exit(1);
  }

  const name = (await rl.question('Admin display name: ')).trim();
  if (!name) {
    rl.close();
    console.error('\n✗ Name cannot be empty.');
    process.exit(1);
  }

  const pwInput = (await rl.question('Password (press Enter to auto-generate): ')).trim();
  rl.close();

  const generated = pwInput === '';
  const password = generated ? generatePassword() : pwInput;

  if (!generated && password.length < 8) {
    console.error('\n✗ Password must be at least 8 characters.');
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  // UPSERT via ON CONFLICT so this script is idempotent — re-running with the
  // same email rotates the password and re-asserts role='admin'.
  const sql =
    `INSERT INTO users (email, name, password_hash, role)\n` +
    `VALUES ('${escapeSqlString(email)}', '${escapeSqlString(name)}', '${passwordHash}', 'admin')\n` +
    `ON CONFLICT(email) DO UPDATE SET\n` +
    `  name = excluded.name,\n` +
    `  password_hash = excluded.password_hash,\n` +
    `  role = 'admin',\n` +
    `  updated_at = datetime('now');`;

  // Write SQL to a temp file and pass via --file. Avoids shell escaping.
  const tmpDir = mkdtempSync(join(tmpdir(), 'fff-admin-'));
  const sqlPath = join(tmpDir, 'create-admin.sql');
  writeFileSync(sqlPath, sql, 'utf8');

  console.log('\nRunning wrangler d1 execute against remote fff-database...\n');

  const result = spawnSync(
    'npx',
    ['wrangler', 'd1', 'execute', 'fff-database', '--remote', '--file', sqlPath, '--yes'],
    { stdio: 'inherit', shell: process.platform === 'win32' },
  );

  rmSync(tmpDir, { recursive: true, force: true });

  if (result.status !== 0) {
    console.error('\n✗ wrangler command failed. See output above.');
    process.exit(result.status ?? 1);
  }

  console.log('\n' + '─'.repeat(60));
  console.log('✓ Admin user ready');
  console.log('─'.repeat(60));
  console.log(`  Email:    ${email}`);
  console.log(`  Name:     ${name}`);
  console.log(`  Role:     admin`);
  if (generated) {
    console.log(`  Password: ${password}`);
    console.log('\n  ⚠  This password is shown ONLY here. Save it in your password manager now.');
    console.log('     Re-running this script rotates the password.');
  } else {
    console.log(`  Password: <the one you entered>`);
  }
  console.log('');
  console.log('Log in at: https://fff-website.pages.dev/login');
  console.log('');
}

main().catch((err) => {
  console.error('\n✗ Error:', err.message);
  process.exit(1);
});
