/**
 * Purchase-gated access: magic-link tokens + purchase lookups.
 *
 * Flow:
 *   1. `createLoginToken` — user requests a link for an email that owns a
 *      product. A random opaque token is generated; only its SHA-256 hash
 *      is stored in D1 (so a DB read never exposes a usable token).
 *   2. The raw token goes out in the emailed link (`/api/auth/verify?token=`).
 *   3. `consumeLoginToken` hashes the presented token, looks it up, checks
 *      expiry/reuse, marks it used, and returns the email — single-use.
 */
import type { CloudflareEnv } from "./cloudflare-env";

export const PRODUCTS = {
  focus: { slug: "focus", accessPath: "/access/focus-7f3k9q", label: "The Attention Reset" },
  core: { slug: "core", accessPath: "/access/core-4m8r2p", label: "All the Way Here" },
} as const;

export type ProductKey = keyof typeof PRODUCTS;

export function isProductKey(value: string | null | undefined): value is ProductKey {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(PRODUCTS, value);
}

const LOGIN_TOKEN_TTL_MINUTES = 15;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Does `email` have a recorded purchase of `product`? */
export async function hasPurchase(env: CloudflareEnv, email: string, product: ProductKey): Promise<boolean> {
  const row = await env.DB.prepare("select 1 from purchases where email = ?1 and product = ?2 limit 1")
    .bind(normalizeEmail(email), product)
    .first();
  return row !== null;
}

/**
 * Create a one-time login token for `email`, valid for 15 minutes.
 * Returns the raw token to embed in the emailed link — never store it,
 * only its hash.
 */
export async function createLoginToken(env: CloudflareEnv, email: string): Promise<string> {
  const token = randomToken();
  const tokenHash = await sha256Hex(token);
  const expiresAt = new Date(Date.now() + LOGIN_TOKEN_TTL_MINUTES * 60 * 1000).toISOString();
  await env.DB.prepare(
    "insert into login_tokens (token, email, expires_at) values (?1, ?2, ?3)"
  )
    .bind(tokenHash, normalizeEmail(email), expiresAt)
    .run();
  return token;
}

/** Redeem a login token. Returns the associated email, or `null` if invalid/expired/used. */
export async function consumeLoginToken(env: CloudflareEnv, token: string): Promise<string | null> {
  const tokenHash = await sha256Hex(token);
  const row = await env.DB.prepare(
    "select email, expires_at, used_at from login_tokens where token = ?1"
  )
    .bind(tokenHash)
    .first<{ email: string; expires_at: string; used_at: string | null }>();

  if (!row) return null;
  if (row.used_at) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) return null;

  await env.DB.prepare("update login_tokens set used_at = datetime('now') where token = ?1")
    .bind(tokenHash)
    .run();

  return row.email;
}

/** Record a purchase (called from the MailerLite webhook receiver). */
export async function recordPurchase(
  env: CloudflareEnv,
  email: string,
  product: ProductKey,
  source = "mailerlite_webhook"
): Promise<void> {
  await env.DB.prepare(
    "insert into purchases (email, product, source) values (?1, ?2, ?3) on conflict(email, product) do nothing"
  )
    .bind(normalizeEmail(email), product, source)
    .run();
}
