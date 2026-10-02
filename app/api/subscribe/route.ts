import { getEnv } from "../../../lib/cloudflare-env";
import { recordSubscriber, EMAIL_RE } from "../../../lib/subscribe";

/**
 * Email signup for the Sunday Board welcome series.
 *
 * The address goes to D1 first (ours whatever happens), then to the MailerLite
 * embedded form "Here Supply Co. | Sunday Board Signup", which adds it to the
 * Sunday Board group and starts the four email welcome automation. The form
 * endpoint needs no API key.
 *
 * MailerLite refuses requests coming from Cloudflare Workers (403), so the
 * signup component posts to the MailerLite form straight from the visitor's
 * browser (the endpoint allows any origin) and then calls this route with
 * ml=done just to keep the D1 copy. A plain form post with no JavaScript still
 * lands here and gets a server side attempt.
 */
const ML_FORM =
  "https://assets.mailerlite.com/jsonp/2381566/forms/196874718498785144/subscribe";

let lastUpstream = "";

async function sendToMailerLite(email: string): Promise<boolean> {
  try {
    const body = new URLSearchParams({
      "fields[email]": email,
      "ml-submit": "1",
      anticsrf: "true",
    });
    const res = await fetch(ML_FORM, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Origin: "https://heresupplyco.com",
        Referer: "https://heresupplyco.com/sunday-board",
        "User-Agent": "Mozilla/5.0 (compatible; HereSupplyCo/1.0; +https://heresupplyco.com)",
      },
      body,
    });
    const text = await res.text();
    let ok = res.ok;
    try {
      const data = JSON.parse(text) as { success?: boolean };
      if (typeof data.success === "boolean") ok = data.success;
    } catch {
      /* not JSON; fall back to status */
    }
    lastUpstream = `${res.status} ${text.slice(0, 80)}`;
    if (!ok) console.warn(`[here-supply-co] MailerLite form rejected (${res.status}): ${text.slice(0, 200)}`);
    return ok;
  } catch (error) {
    lastUpstream = `threw ${String(error).slice(0, 80)}`;
    console.warn("[here-supply-co] MailerLite form threw:", error);
    return false;
  }
}

export async function POST(request: Request) {
  const env = getEnv();
  const origin = new URL(request.url).origin;
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");
  const form = await request.formData();

  const emailRaw = form.get("email");
  const sourceRaw = form.get("source");
  const nextRaw = form.get("next");
  const trap = form.get("company");
  const mlDone = form.get("ml") === "done";

  const email = typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";
  const source = typeof sourceRaw === "string" && sourceRaw ? sourceRaw.slice(0, 40) : "sunday_board";
  const next =
    typeof nextRaw === "string" && nextRaw.startsWith("/") && !nextRaw.startsWith("//")
      ? nextRaw
      : "/sunday-board";

  const reply = (status: "ok" | "invalid" | "error") => {
    if (wantsJson) {
      return Response.json({ status }, { status: status === "invalid" ? 400 : status === "error" ? 502 : 200 });
    }
    const back = new URL(next, origin);
    back.searchParams.set("signup", status);
    back.hash = "signup";
    return Response.redirect(back.href, 303);
  };

  // Bots fill the hidden field. Tell them it worked and do nothing.
  if (typeof trap === "string" && trap.trim()) return reply("ok");
  if (!EMAIL_RE.test(email) || email.length > 254) return reply("invalid");

  try {
    await recordSubscriber(env, email, source);
  } catch (error) {
    console.error("[here-supply-co] subscriber write failed:", error);
  }

  if (mlDone) return reply("ok");
  const sent = await sendToMailerLite(email);
  if (!sent) console.warn(`[here-supply-co] server side MailerLite failed: ${lastUpstream}`);
  return reply(sent ? "ok" : "error");
}
