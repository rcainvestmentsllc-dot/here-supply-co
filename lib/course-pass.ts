/**
 * Password access for All the Way Here.
 *
 * Every course page under /access and every paid download sits behind one
 * course password. Buyers get the password, and a link that unlocks the
 * course in one tap, in the MailerLite confirmation email. Once unlocked, a
 * cookie keeps the course open on that device for a year.
 *
 * Only a hash of the password lives in the code. To change the password:
 *   1. Hash the new one:  printf 'hsc-course:NEWPASSWORD' | shasum -a 256
 *   2. Put the result in COURSE_PASSWORD_HASH below, or set it as the
 *      COURSE_PASSWORD_HASH variable on the Worker to override this default.
 *   3. Update the MailerLite confirmation email and delivery link.
 * Changing the password signs everyone out, because the cookie is derived
 * from the hash.
 *
 * This file runs inside the Worker before the app, so it must not import
 * anything from Next.
 */

const DEFAULT_PASSWORD_HASH = "3847f85c93a10728da34f8e9db0f9cbe03566f9864c69d7451aa74173d3a891f";

export const COURSE_COOKIE = "hsc_course";
export const UNLOCK_PAGE = "/unlock";
export const UNLOCK_ENDPOINT = "/api/course/unlock";
const ONE_YEAR = 60 * 60 * 24 * 365;

/** Downloads anyone may have, with or without the course. */
const FREE_DOWNLOADS = new Set([
  "/downloads/sunday-board-meeting.pdf",
  "/downloads/sunday-board-field-card.pdf",
]);

export function isGatedPath(pathname: string): boolean {
  if (pathname === "/access" || pathname.startsWith("/access/")) return true;
  if (pathname.startsWith("/downloads/")) return !FREE_DOWNLOADS.has(pathname);
  return false;
}

async function sha256Hex(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function passwordHash(env: Record<string, unknown>): string {
  const override = env.COURSE_PASSWORD_HASH;
  return typeof override === "string" && /^[0-9a-f]{64}$/.test(override) ? override : DEFAULT_PASSWORD_HASH;
}

/** Normalize what people type: ignore case and stray spaces. */
export async function passwordMatches(env: Record<string, unknown>, attempt: string): Promise<boolean> {
  const cleaned = attempt.trim().toLowerCase().replace(/\s+/g, "");
  if (!cleaned) return false;
  return (await sha256Hex(`hsc-course:${cleaned}`)) === passwordHash(env);
}

async function cookieToken(env: Record<string, unknown>): Promise<string> {
  return sha256Hex(`hsc-cookie:${passwordHash(env)}`);
}

export async function hasCourseCookie(env: Record<string, unknown>, request: Request): Promise<boolean> {
  const header = request.headers.get("cookie") ?? "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${COURSE_COOKIE}=([0-9a-f]{64})`));
  return Boolean(match) && match![1] === (await cookieToken(env));
}

export async function unlockCookieHeader(env: Record<string, unknown>): Promise<string> {
  return `${COURSE_COOKIE}=${await cookieToken(env)}; Path=/; Max-Age=${ONE_YEAR}; HttpOnly; Secure; SameSite=Lax`;
}

export function safeReturnPath(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return "/access/core-4m8r2p";
  return value;
}

/**
 * Runs in the Worker ahead of the app. Returns a Response when the request is
 * handled here (unlock, redirect to the unlock page), or null to continue.
 */
export async function courseGate(request: Request, env: Record<string, unknown>): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname === UNLOCK_ENDPOINT && request.method === "POST") {
    const form = await request.formData();
    const returnTo = safeReturnPath(form.get("return_to"));
    const attempt = form.get("password");
    if (typeof attempt === "string" && (await passwordMatches(env, attempt))) {
      return new Response(null, {
        status: 303,
        headers: { Location: new URL(returnTo, url.origin).href, "Set-Cookie": await unlockCookieHeader(env) },
      });
    }
    const back = new URL(UNLOCK_PAGE, url.origin);
    back.searchParams.set("return_to", returnTo);
    back.searchParams.set("error", "1");
    return Response.redirect(back.href, 303);
  }

  if (!isGatedPath(url.pathname)) return null;

  // The link in the confirmation email carries the password as ?key=, so a
  // buyer lands straight in the course. Strip it from the address bar.
  const key = url.searchParams.get("key");
  if (key !== null) {
    url.searchParams.delete("key");
    if (await passwordMatches(env, key)) {
      return new Response(null, {
        status: 303,
        headers: { Location: url.pathname + url.search, "Set-Cookie": await unlockCookieHeader(env), "Cache-Control": "no-store" },
      });
    }
  }

  if (await hasCourseCookie(env, request)) return null;

  const unlock = new URL(UNLOCK_PAGE, url.origin);
  unlock.searchParams.set("return_to", url.pathname + url.search);
  return new Response(null, { status: 303, headers: { Location: unlock.pathname + unlock.search, "Cache-Control": "no-store" } });
}
