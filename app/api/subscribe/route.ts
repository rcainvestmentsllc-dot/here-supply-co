import { getEnv } from "../../../lib/cloudflare-env";
import { recordSubscriber, syncToMailerLite, EMAIL_RE } from "../../../lib/subscribe";

/**
 * Free-guide signup. Plain form post so it works without JavaScript.
 * Redirects to the guide page with the download unlocked.
 */
export async function POST(request: Request) {
  const env = getEnv();
  const origin = new URL(request.url).origin;
  const form = await request.formData();

  const emailRaw = form.get("email");
  const sourceRaw = form.get("source");
  const nextRaw = form.get("next");

  const email = typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";
  const source = typeof sourceRaw === "string" && sourceRaw ? sourceRaw.slice(0, 40) : "sunday_board";
  const next =
    typeof nextRaw === "string" && nextRaw.startsWith("/") && !nextRaw.startsWith("//")
      ? nextRaw
      : "/sunday-board";

  if (!EMAIL_RE.test(email)) {
    const back = new URL(next, origin);
    back.hash = "get-board";
    back.searchParams.set("err", "1");
    return Response.redirect(back.href, 303);
  }

  // D1 first — the lead is ours whatever MailerLite does.
  try {
    await recordSubscriber(env, email, source);
  } catch (error) {
    console.error("[here-supply-co] subscriber write failed:", error);
  }

  // Then best-effort sync; failure must not cost the visitor their download.
  await syncToMailerLite(env, email, env.MAILERLITE_FREE_GROUP_ID as string | undefined);

  const done = new URL(next, origin);
  done.searchParams.set("ok", "1");
  done.hash = "get-board";
  return Response.redirect(done.href, 303);
}
