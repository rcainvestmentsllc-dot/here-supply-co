import { getEnv } from "../../../lib/cloudflare-env";
import { getSessionEmail } from "../../../lib/require-access";
import { hasPurchase } from "../../../lib/auth";
import { markLessonComplete, markLessonIncomplete } from "../../../lib/progress";
import { CORE_LESSONS } from "../../course-content";

const VALID_SLUGS = new Set(CORE_LESSONS.map((lesson) => lesson.slug));

export async function POST(request: Request) {
  const env = getEnv();
  const email = await getSessionEmail();
  if (!email) return new Response("Not signed in", { status: 401 });

  if (!(await hasPurchase(env, email, "core"))) {
    return new Response("No access", { status: 403 });
  }

  const origin = new URL(request.url).origin;
  const form = await request.formData();
  const slugRaw = form.get("lesson");
  const stateRaw = form.get("state");
  const returnToRaw = form.get("return_to");

  const slug = typeof slugRaw === "string" ? slugRaw : "";
  if (!VALID_SLUGS.has(slug)) return new Response("Unknown lesson", { status: 400 });

  if (stateRaw === "complete") {
    await markLessonComplete(env, email, slug);
  } else {
    await markLessonIncomplete(env, email, slug);
  }

  // Plain form posts (no JS) get redirected back where they came from.
  const returnTo =
    typeof returnToRaw === "string" && returnToRaw.startsWith("/") && !returnToRaw.startsWith("//")
      ? returnToRaw
      : "/access/core-4m8r2p";

  return new Response(null, {
    status: 303,
    headers: { Location: new URL(returnTo, origin).href },
  });
}
