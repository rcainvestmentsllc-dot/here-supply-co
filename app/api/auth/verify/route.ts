import { getEnv } from "../../../../lib/cloudflare-env";
import { consumeLoginToken } from "../../../../lib/auth";
import { createSessionCookieValue, sessionCookieHeader } from "../../../../lib/session";

function safeReturnTo(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/library";
  return value;
}

export async function GET(request: Request) {
  const env = getEnv();
  const url = new URL(request.url);
  const origin = url.origin;
  const token = url.searchParams.get("token");
  const returnTo = safeReturnTo(url.searchParams.get("return_to"));

  if (!token) {
    return Response.redirect(new URL("/login?error=expired", origin).href, 303);
  }

  const email = await consumeLoginToken(env, token);
  if (!email) {
    return Response.redirect(new URL("/login?error=expired", origin).href, 303);
  }

  const cookieValue = await createSessionCookieValue(env, email);

  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL(returnTo, origin).href,
      "Set-Cookie": sessionCookieHeader(cookieValue),
    },
  });
}
