/**
 * Site pause (Chris, Oct 7 2026). While SITE_PAUSED is true every public page
 * shows one short "back soon" note with a 503 so search engines treat it as
 * temporary. Course access, the Pinterest feeds, and the private API routes
 * keep working. Set SITE_PAUSED to false and push to bring the site back.
 */
export const SITE_PAUSED = true;

const OPEN_PREFIXES = ["/access", "/downloads/", "/unlock", "/login", "/welcome", "/rss", "/_next/", "/assets/"];
const OPEN_API = ["/api/course", "/api/auth", "/api/progress", "/api/webhooks", "/api/admin", "/api/coaching/inbox"];

export function pausedResponse(hostname: string, pathname: string): Response | null {
  // Only the live domain pauses, so local builds and tests still see the full site.
  if (!SITE_PAUSED || hostname !== "heresupplyco.com") return null;
  if (OPEN_PREFIXES.some((p) => pathname === p.replace(/\/$/, "") || pathname.startsWith(p))) return null;
  if (OPEN_API.some((p) => pathname === p || pathname.startsWith(p + "/"))) return null;
  if (pathname === "/robots.txt") {
    return new Response("User-agent: *\nDisallow:\n", { headers: { "Content-Type": "text/plain" } });
  }
  if (pathname.startsWith("/api/")) {
    return Response.json({ ok: false, error: "paused" }, { status: 503, headers: { "Retry-After": "604800" } });
  }
  return new Response(PAGE, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "604800",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

const PAGE = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Here Supply Co. | Back soon</title>
<link rel="icon" href="/favicon.svg">
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f2ece1;color:#0b2530;font:400 18px/1.6 Georgia,serif;padding:24px;box-sizing:border-box}
main{max-width:520px}
img{height:56px;margin-bottom:32px}
h1{font-size:34px;line-height:1.15;margin:0 0 18px;font-weight:400}
p{margin:0 0 14px;color:#36515a}
small{display:block;margin-top:28px;font:400 14px/1.5 Arial,sans-serif;color:#5b6f75}
small a{color:#2a6573}
</style></head>
<body><main>
<img src="/assets/brand/here-supply-co-logo-v2.png" alt="Here Supply Co.">
<h1>We're taking a short break.</h1>
<p>I want to live this out at home before I ask anyone else to. The site will be back when I've done that.</p>
<small>Already bought the course? Your private course link still works.</small>
</main></body></html>`;
