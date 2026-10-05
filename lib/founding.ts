/**
 * The founding price.
 *
 * The first FOUNDING_LIMIT couples pay FOUNDING_PRICE; after that the course is
 * FULL_PRICE. The checkout itself is a MailerLite product priced at FULL_PRICE
 * with a fixed discount, so ending the founding price means turning that
 * discount off in MailerLite and setting FOUNDING_OPEN to false here.
 *
 * Spots are counted from real purchases: the MailerLite webhook records every
 * buyer in D1 (see app/api/webhooks/mailerlite/route.ts).
 */
import type { CloudflareEnv } from "./cloudflare-env";

export const FOUNDING_OPEN = true;
export const FOUNDING_PRICE = 49;
export const FULL_PRICE = 99;
export const FOUNDING_LIMIT = 50;

/** What the course costs today. */
export const PRICE_NOW = FOUNDING_OPEN ? FOUNDING_PRICE : FULL_PRICE;

export async function foundingSpotsLeft(env: CloudflareEnv): Promise<number | null> {
  try {
    const row = await env.DB.prepare(
      "select count(*) as n from purchases where product = 'core' and source = 'mailerlite_webhook'"
    ).first<{ n: number }>();
    const sold = Number(row?.n ?? 0);
    return Math.max(0, FOUNDING_LIMIT - sold);
  } catch {
    return null;
  }
}

/**
 * The MailerLite webhook URL carries a secret token (?t=...). Only its hash is
 * kept here, the same way the course password is handled, so the repository
 * never holds the token itself.
 */
const WEBHOOK_TOKEN_HASH = "ac1015602959493bdc481cc37bee955470a7ac8819a8a8593c1e40dcd0f0921a";

export async function webhookTokenOk(token: string | null): Promise<boolean> {
  if (!token) return false;
  const bytes = new TextEncoder().encode(`hsc-webhook:${token}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex === WEBHOOK_TOKEN_HASH;
}
