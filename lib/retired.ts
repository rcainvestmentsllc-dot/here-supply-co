/**
 * Pages retired when the site went men first (October 2026): one site, one
 * course for sale (Carry It Well), one coaching path. Old links and search
 * results land on the page that replaced them. The couples course itself
 * stays open to anyone with its password; only its sales page is retired.
 */
export const RETIRED: Record<string, string> = {
  "/men": "/",
  "/library": "/men/course",
  "/coaching": "/men/coaching",
  "/founding": "/",
  "/check": "/",
  "/about": "/men/about",
  "/focus": "/men/course",
};

export function retiredRedirect(url: URL): Response | null {
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;
  const to = RETIRED[path];
  if (!to) return null;
  const next = new URL(to, url);
  next.search = url.search;
  return Response.redirect(next.href, 301);
}
