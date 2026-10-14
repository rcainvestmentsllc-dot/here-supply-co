import { getEnv } from "../../../../lib/cloudflare-env";
import { inboxTokenOk } from "../../../../lib/coaching";

/**
 * The daily coaching task reads new applications and check ins here.
 * GET returns unhandled rows. POST {"ids":[...]} marks them handled.
 * Without the right ?t= token this route does not exist.
 */
const notFound = () => new Response("Not found", { status: 404 });

const esc = (s: unknown) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const LABELS: Record<string, string> = {
  together: "Who", where: "Where they are", different: "Want different in 30 days", tried: "Already tried", times: "Call times",
  week: "Week", practiced: "Practiced", in_the_way: "Got in the way", question: "Question", anything_else: "Anything else",
  phone: "Phone", lead: "What he leads", costing: "Costing him the most", interest: "Interested in", heard: "Heard about it from",
  work: "Work", home: "Home", people: "People who matter most", drift_home: "Drifting at home", drift_work: "Drifting at work",
  drift_self: "Drifting in himself", cost: "Cost if nothing changes", goal_home: "90 day goal, home", goal_work: "90 day goal, work",
  goal_self: "90 day goal, himself", focus_start: "Focus Protocol start", know: "Anything to know", best_of_you: "Who got the best of him", bring: "Bring to next call",
};

const KIND_TAG: Record<string, string> = {
  application: "Application", checkin: "Check in",
  men_application: "Men · Call request", men_intake: "Men · Intake", men_checkin: "Men · Check in",
};

function subjectFor(kind: string, p: Record<string, string>): string {
  if (kind === "application") return "Thirty Days With Chris";
  if (kind === "men_application") return "Your free call";
  if (kind === "men_intake") return "Before our first call";
  return `Re: your ${p.week || "weekly"} check in`;
}

/** A readable page for Chris: every application and check in, newest first, with a reply button. */
async function htmlView() {
  const { results } = await getEnv()
    .DB.prepare("select id, kind, name, email, payload, created_at, handled_at from coaching_messages order by created_at desc limit 200")
    .all<{ id: number; kind: string; name: string; email: string; payload: string; created_at: string; handled_at: string | null }>();
  const cards = (results ?? []).map((r) => {
    const p = JSON.parse(r.payload) as Record<string, string>;
    const rows = Object.entries(p).filter(([, v]) => v).map(([k, v]) => `<dt>${esc(LABELS[k] ?? k)}</dt><dd>${esc(v).replace(/\n/g, "<br>")}</dd>`).join("");
    const subject = subjectFor(r.kind, p);
    const mail = `mailto:${encodeURIComponent(r.email)}?subject=${encodeURIComponent(subject)}`;
    return `<article><header><span class="${esc(r.kind)}">${esc(KIND_TAG[r.kind] ?? r.kind)}</span><b>${esc(r.name)}</b> &lt;${esc(r.email)}&gt;<time>${esc(r.created_at)} UTC</time></header><dl>${rows}</dl><a href="${mail}">Reply to ${esc(r.name.split(" ")[0])}</a></article>`;
  }).join("") || "<p>No applications or check ins yet.</p>";
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Coaching inbox</title><style>
body{margin:0;background:#f2ece1;color:#0b2530;font:16px/1.5 Georgia,serif}main{max-width:760px;margin:0 auto;padding:28px 16px 60px}h1{font-size:28px;margin:0 0 4px}p.sub{color:#4a5f66;margin:0 0 24px}
article{background:#fff;border-radius:8px;padding:18px 20px;margin:0 0 16px;border-left:4px solid #2a6573}header{display:flex;flex-wrap:wrap;gap:8px;align-items:baseline;margin-bottom:10px}
header span{font:700 11px Arial;letter-spacing:.12em;text-transform:uppercase;color:#fff;background:#2a6573;padding:3px 8px;border-radius:3px}header span.application,header span.men_application{background:#9a4632}header span.men_intake{background:#14313c}header span.men_checkin{background:#7a6a3a}
time{margin-left:auto;color:#4a5f66;font:13px Arial}dt{font:700 12px Arial;color:#4a5f66;margin-top:10px}dd{margin:2px 0 0}a{display:inline-block;margin-top:14px;background:#9a4632;color:#fff;text-decoration:none;padding:10px 16px;border-radius:4px;font:700 14px Arial}
</style></head><body><main><h1>Coaching inbox</h1><p class="sub">Thirty Days With Chris and the men\'s program: call requests, intakes, and check ins, newest first. Reply within 48 hours. The playbook has the reply template.</p>${cards}</main></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!(await inboxTokenOk(url.searchParams.get("t")))) return notFound();
  if (url.searchParams.get("view") === "page") return htmlView();
  const { results } = await getEnv()
    .DB.prepare("select id, kind, name, email, payload, created_at from coaching_messages where handled_at is null order by created_at limit 50")
    .all<{ id: number; kind: string; name: string; email: string; payload: string; created_at: string }>();
  const items = (results ?? []).map((r) => ({ ...r, payload: JSON.parse(r.payload) }));
  return Response.json({ items }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!(await inboxTokenOk(new URL(request.url).searchParams.get("t")))) return notFound();
  const body = (await request.json().catch(() => ({}))) as { ids?: unknown };
  const ids = Array.isArray(body.ids) ? body.ids.map(Number).filter((n) => Number.isInteger(n) && n > 0).slice(0, 50) : [];
  if (!ids.length) return Response.json({ marked: 0 });
  const marks = `(${ids.map(() => "?").join(",")})`;
  const res = await getEnv()
    .DB.prepare(`update coaching_messages set handled_at = datetime('now') where id in ${marks}`)
    .bind(...ids)
    .run();
  return Response.json({ marked: res.meta?.changes ?? ids.length }, { headers: { "Cache-Control": "no-store" } });
}
