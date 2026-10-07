import { getEnv } from "../../../../lib/cloudflare-env";
import { inboxTokenOk } from "../../../../lib/coaching";

/**
 * The daily coaching task reads new applications and check ins here.
 * GET returns unhandled rows. POST {"ids":[...]} marks them handled.
 * Without the right ?t= token this route does not exist.
 */
const notFound = () => new Response("Not found", { status: 404 });

export async function GET(request: Request) {
  if (!(await inboxTokenOk(new URL(request.url).searchParams.get("t")))) return notFound();
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
