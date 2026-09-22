/**
 * Server-side access gate for purchase-only pages.
 *
 * Call `requireProductAccess("core", "/access/core-4m8r2p")` at the top of a
 * gated Server Component. It reads the session cookie, verifies it, checks
 * the purchases table, and redirects to `/login` (preserving where the
 * visitor was headed) if either check fails. Returns the verified email
 * when access is granted.
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getEnv } from "./cloudflare-env";
import { verifySessionCookieValue, SESSION_COOKIE_NAME } from "./session";
import { hasPurchase, type ProductKey } from "./auth";

export async function getSessionEmail(): Promise<string | null> {
  const env = getEnv();
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!cookieValue) return null;
  return verifySessionCookieValue(env, cookieValue);
}

/**
 * Gate a page behind ownership of ANY of `products` (e.g. the Attention
 * Reset is both its own $37 product and step 2 of the $397 core course, so
 * either purchase should unlock it). `redirectProduct` picks which product
 * key pre-fills the login form when the visitor has to log in.
 */
export async function requireAnyProductAccess(
  products: readonly ProductKey[],
  returnTo: string,
  redirectProduct: ProductKey = products[0]
): Promise<string> {
  const env = getEnv();
  const email = await getSessionEmail();

  if (!email) {
    redirect(`/login?product=${redirectProduct}&return_to=${encodeURIComponent(returnTo)}`);
  }

  for (const product of products) {
    if (await hasPurchase(env, email, product)) return email;
  }

  redirect(`/login?product=${redirectProduct}&return_to=${encodeURIComponent(returnTo)}&error=no_access`);
}

export async function requireProductAccess(product: ProductKey, returnTo: string): Promise<string> {
  return requireAnyProductAccess([product], returnTo, product);
}
