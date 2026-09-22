import { clearSessionCookieHeader } from "../../../../lib/session";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL("/", origin).href,
      "Set-Cookie": clearSessionCookieHeader(),
    },
  });
}
