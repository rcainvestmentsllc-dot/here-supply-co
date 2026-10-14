import { getEnv } from "../../../lib/cloudflare-env";
import { EMAIL_RE } from "../../../lib/subscribe";
import { FIELDS, isCoachingKind, recordCoachingMessage } from "../../../lib/coaching";

/** Coaching forms: Thirty Days With Chris (/coaching) and the men's program (/men/apply, /men/intake, /men/check-in). */
export async function POST(request: Request) {
  const form = await request.formData();
  const kindRaw = String(form.get("kind") || "");
  const kind = isCoachingKind(kindRaw) ? kindRaw : null;
  const trap = form.get("company");
  const name = String(form.get("name") || "").trim().slice(0, 120);
  const email = String(form.get("email") || "").trim().toLowerCase();

  if (typeof trap === "string" && trap.trim()) return Response.json({ status: "ok" });
  if (!kind || !name || !EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ status: "invalid" }, { status: 400 });
  }
  const payload: Record<string, string> = {};
  for (const key of FIELDS[kind]) payload[key] = String(form.get(key) || "").trim().slice(0, 4000);

  try {
    await recordCoachingMessage(getEnv(), kind, name, email, payload);
  } catch (error) {
    console.error("[here-supply-co] coaching write failed:", error);
    return Response.json({ status: "error" }, { status: 502 });
  }
  return Response.json({ status: "ok" });
}
