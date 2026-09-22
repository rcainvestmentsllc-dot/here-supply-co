/**
 * MailerLite webhook receiver — the link between paying and getting in.
 *
 * MailerLite has no dedicated purchase event, so a buyer is recognised by the
 * group they land in after checkout. The earlier version matched on group ID,
 * which meant it did nothing at all until someone pasted the right IDs in;
 * this matches on group NAME instead, so it works against the groups that
 * already exist ("Here Supply Co. | All the Way Here Buyers", "Iron Compass |
 * Focus Buyers") without any configuration step that can be forgotten.
 *
 * Everything that arrives is logged to `webhook_log` whether or not it
 * matched. When a customer says "I paid and I cannot get in", that table is
 * the evidence trail.
 */
import { getEnv } from "../../../../lib/cloudflare-env";
import { recordPurchase, type ProductKey } from "../../../../lib/auth";
import type { CloudflareEnv } from "../../../../lib/cloudflare-env";

/** Group-name fragments, checked in order. First match wins. */
const NAME_RULES: Array<{ match: RegExp; product: ProductKey }> = [
  { match: /all\s*the\s*way\s*here|core|complete\s*course/i, product: "core" },
  { match: /focus|attention\s*reset/i, product: "focus" },
];

const PURCHASE_EVENTS = new Set([
  "subscriber.added_to_group",
  "subscriber.automation_triggered",
  "subscriber.automation_completed",
]);

function productFromGroupName(name: string | undefined): ProductKey | null {
  if (!name) return null;
  for (const rule of NAME_RULES) {
    if (rule.match.test(name)) return rule.product;
  }
  return null;
}

interface Payload {
  type?: string;
  events?: Array<Record<string, unknown>>;
  data?: Record<string, unknown>;
  subscriber?: { email?: string };
  group?: { id?: string; name?: string };
  account_id?: unknown;
}

/** MailerLite has shipped both a flat shape and a batched `events[]` shape. */
function normalize(payload: Payload): Array<{ type?: string; email?: string; group?: string }> {
  const items = Array.isArray(payload.events) && payload.events.length
    ? (payload.events as unknown as Payload[])
    : [payload];

  return items.map((item) => {
    const data = (item.data ?? item) as Payload;
    return {
      type: item.type ?? payload.type,
      email: data.subscriber?.email,
      group: data.group?.name,
    };
  });
}

async function log(
  env: CloudflareEnv,
  event: string | undefined,
  email: string | undefined,
  product: string | null,
  payload: unknown
) {
  try {
    await env.DB.prepare(
      "insert into webhook_log (event, email, matched_product, payload) values (?1, ?2, ?3, ?4)"
    )
      .bind(event ?? null, email ?? null, product, JSON.stringify(payload).slice(0, 8000))
      .run();
  } catch (error) {
    console.error("[here-supply-co] webhook log failed:", error);
  }
}

export async function POST(request: Request) {
  const env = getEnv();

  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const results: Array<{ email?: string; product?: string; status: string }> = [];

  for (const item of normalize(payload)) {
    const product = productFromGroupName(item.group);

    if (!item.email) {
      await log(env, item.type, undefined, null, payload);
      results.push({ status: "no email in payload" });
      continue;
    }

    if (item.type && !PURCHASE_EVENTS.has(item.type)) {
      await log(env, item.type, item.email, null, payload);
      results.push({ email: item.email, status: `ignored event ${item.type}` });
      continue;
    }

    if (!product) {
      await log(env, item.type, item.email, null, payload);
      console.warn(
        `[here-supply-co] webhook: group "${item.group ?? "(none)"}" did not match a product ` +
          `for ${item.email}. Grant access by hand if this was a purchase.`
      );
      results.push({ email: item.email, status: `unmatched group: ${item.group ?? "none"}` });
      continue;
    }

    await recordPurchase(env, item.email, product, "mailerlite_webhook");
    await log(env, item.type, item.email, product, payload);
    console.log(`[here-supply-co] access granted: ${item.email} -> ${product}`);
    results.push({ email: item.email, product, status: "access granted" });
  }

  // Always 200: a non-2xx makes MailerLite retry and eventually disable the
  // webhook, and everything is logged either way.
  return Response.json({ ok: true, results });
}
