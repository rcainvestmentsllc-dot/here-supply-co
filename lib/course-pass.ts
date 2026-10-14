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

/**
 * The men's edition has its own password and its own cookie, so the two
 * courses can be sold separately. Everything under MEN_ROOT and every file
 * under /downloads/men/ needs the men's cookie. The shared sheets in
 * /downloads open for a buyer of either course.
 * To change it: printf 'hsc-men:NEWPASSWORD' | shasum -a 256, then put the
 * result in DEFAULT_MEN_HASH or the MEN_PASSWORD_HASH Worker variable.
 */
const DEFAULT_MEN_HASH = "947680a9d258ad5330910968758555bcd67fa58cadb5e3f90c2f27c2b6065754";
export const MEN_COOKIE = "hsc_men";
export const MEN_ROOT = "/access/men-r7k2v9";
const MEN_DOWNLOADS = "/downloads/men/";
export const UNLOCK_PAGE = "/unlock";
export const UNLOCK_ENDPOINT = "/api/course/unlock";
const ONE_YEAR = 60 * 60 * 24 * 365;

/** Downloads anyone may have, with or without the course. */
const FREE_DOWNLOADS = new Set([
  "/downloads/sunday-board-meeting.pdf",
]);

/**
 * Files and pages retired or renamed in October 2026. Old links in emails,
 * bookmarks, or saved pages land on what replaced them instead of a 404.
 */
const RETIRED_DOWNLOADS: Record<string, string> = {
  "/downloads/attention-reset.pdf": "/downloads/focus-protocol.pdf",
  "/downloads/the-here-week.pdf": "/downloads/sunday-board-meeting.pdf",
  "/downloads/sunday-board-field-card.pdf": "/downloads/sunday-board-meeting.pdf",
  "/downloads/here-supply-resource-pack.zip": "/downloads/here-supply-resource-pack.pdf",
  "/downloads/all-the-way-here-workbook.pdf": "/downloads/all-the-way-here-print-edition.pdf",
  // Renamed pages: the article was always for both partners.
  "/resources/why-men-need-a-third-place": "/resources/everyone-needs-a-third-place",
};

type Edition = "couples" | "men";

function isMenPath(pathname: string): boolean {
  return pathname === MEN_ROOT || pathname.startsWith(MEN_ROOT + "/") || pathname.startsWith(MEN_DOWNLOADS);
}

function isSharedDownload(pathname: string): boolean {
  return pathname.startsWith("/downloads/") && !pathname.startsWith(MEN_DOWNLOADS);
}

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

function menHash(env: Record<string, unknown>): string {
  const override = env.MEN_PASSWORD_HASH;
  return typeof override === "string" && /^[0-9a-f]{64}$/.test(override) ? override : DEFAULT_MEN_HASH;
}

const clean = (attempt: string) => attempt.trim().toLowerCase().replace(/\s+/g, "");

/** Normalize what people type: ignore case and stray spaces. */
export async function passwordMatches(env: Record<string, unknown>, attempt: string): Promise<boolean> {
  const cleaned = clean(attempt);
  if (!cleaned) return false;
  return (await sha256Hex(`hsc-course:${cleaned}`)) === passwordHash(env);
}

/** Which course a password opens, if any. */
async function editionFor(env: Record<string, unknown>, attempt: string): Promise<Edition | null> {
  if (await passwordMatches(env, attempt)) return "couples";
  const cleaned = clean(attempt);
  if (cleaned && (await sha256Hex(`hsc-men:${cleaned}`)) === menHash(env)) return "men";
  return null;
}

async function menCookieToken(env: Record<string, unknown>): Promise<string> {
  return sha256Hex(`hsc-men-cookie:${menHash(env)}`);
}

async function hasMenCookie(env: Record<string, unknown>, request: Request): Promise<boolean> {
  const header = request.headers.get("cookie") ?? "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${MEN_COOKIE}=([0-9a-f]{64})`));
  return Boolean(match) && match![1] === (await menCookieToken(env));
}

async function cookieFor(env: Record<string, unknown>, edition: Edition): Promise<string> {
  if (edition === "couples") return unlockCookieHeader(env);
  return `${MEN_COOKIE}=${await menCookieToken(env)}; Path=/; Max-Age=${ONE_YEAR}; HttpOnly; Secure; SameSite=Lax`;
}

/** Does this request hold a cookie that opens this path? */
async function allowed(env: Record<string, unknown>, request: Request, pathname: string): Promise<boolean> {
  if (isMenPath(pathname)) return hasMenCookie(env, request);
  if (isSharedDownload(pathname)) return (await hasCourseCookie(env, request)) || (await hasMenCookie(env, request));
  return hasCourseCookie(env, request);
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

  const replacement = RETIRED_DOWNLOADS[url.pathname];
  if (replacement) {
    return new Response(null, { status: 301, headers: { Location: replacement + url.search } });
  }

  if (url.pathname === UNLOCK_ENDPOINT && request.method === "POST") {
    const form = await request.formData();
    const returnTo = safeReturnPath(form.get("return_to"));
    const attempt = form.get("password");
    const edition = typeof attempt === "string" ? await editionFor(env, attempt) : null;
    if (edition) {
      // A men's password with no men's destination lands on the men's course home.
      const target = edition === "men" && !isMenPath(returnTo) ? MEN_ROOT : returnTo;
      return new Response(null, {
        status: 303,
        headers: { Location: new URL(target, url.origin).href, "Set-Cookie": await cookieFor(env, edition) },
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
    const edition = await editionFor(env, key);
    if (edition) {
      return new Response(null, {
        status: 303,
        headers: { Location: url.pathname + url.search, "Set-Cookie": await cookieFor(env, edition), "Cache-Control": "no-store" },
      });
    }
  }

  if (await allowed(env, request, url.pathname)) return null;

  const unlock = new URL(UNLOCK_PAGE, url.origin);
  unlock.searchParams.set("return_to", url.pathname + url.search);
  return new Response(null, { status: 303, headers: { Location: unlock.pathname + unlock.search, "Cache-Control": "no-store" } });
}
