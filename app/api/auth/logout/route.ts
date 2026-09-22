import { clearSessionCookieHeader } from "../../../../lib/session";
import { SITE_ORIGIN } from "../../../site-config";

export async function POST() {
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL("/", SITE_ORIGIN).href,
      "Set-Cookie": clearSessionCookieHeader(),
    },
  });
}
