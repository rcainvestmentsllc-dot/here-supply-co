/**
 * Stateless, HMAC-signed session cookies.
 *
 * No session table: the cookie itself carries `email.expiresAt`, signed with
 * a server-side secret (`env.SESSION_SECRET`, a Wrangler secret — see
 * README note in `requireSessionSecret` below). Verifying just means
 * recomputing the signature and checking the expiry, so it works from any
 * Worker isolate with no database round trip.
 */
import type { CloudflareEnv } from "./cloudflare-env";

export const SESSION_COOKIE_NAME = "hsc_session";
const SESSION_TTL_SECONDS = 90 * 24 * 60 * 60; // 90 days

function requireSessionSecret(env: CloudflareEnv): string {
  const secret = env.SESSION_SECRET;
  if (typeof secret !== "string" || secret.length < 16) {
    throw new Error(
      "[here-supply-co] SESSION_SECRET is not configured. Set it with:\n" +
        "  npx wrangler secret put SESSION_SECRET\n" +
        "(use a long random value — e.g. `openssl rand -base64 32`)."
    );
  }
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/** Build a signed session cookie value for `email`. */
export async function createSessionCookieValue(env: CloudflareEnv, email: string): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${email}.${expiresAt}`;
  const key = await hmacKey(requireSessionSecret(env));
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${toBase64Url(new TextEncoder().encode(payload))}.${toBase64Url(new Uint8Array(signature))}`;
}

/** Verify a session cookie value, returning the email or `null`. */
export async function verifySessionCookieValue(env: CloudflareEnv, cookieValue: string): Promise<string | null> {
  const parts = cookieValue.split(".");
  if (parts.length !== 2) return null;
  const [payloadPart, sigPart] = parts;

  let payload: string;
  try {
    payload = new TextDecoder().decode(fromBase64Url(payloadPart));
  } catch {
    return null;
  }

  const key = await hmacKey(requireSessionSecret(env));
  let signatureValid: boolean;
  try {
    signatureValid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sigPart) as BufferSource,
      new TextEncoder().encode(payload)
    );
  } catch {
    return null;
  }
  if (!signatureValid) return null;

  const separatorIndex = payload.lastIndexOf(".");
  if (separatorIndex === -1) return null;
  const email = payload.slice(0, separatorIndex);
  const expiresAt = Number(payload.slice(separatorIndex + 1));
  if (!Number.isFinite(expiresAt) || Date.now() / 1000 > expiresAt) return null;

  return email;
}

export function sessionCookieHeader(value: string): string {
  return `${SESSION_COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookieHeader(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
