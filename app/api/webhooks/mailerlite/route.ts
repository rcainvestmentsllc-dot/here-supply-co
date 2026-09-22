/**
 * MailerLite webhook receiver.
 *
 * MailerLite has no dedicated "purchase completed" event, so this listens
 * for `subscriber.added_to_group` on the two buyer groups (the checkout
 * flow needs to add a buyer to the matching group on purchase — that part
 * is configured in MailerLite, not here) and records a row in the D1
 * `purchases` table when it fires.
 *
 * GROUP_TO_PRODUCT below is a placeholder — it needs the real MailerLite
 * group IDs for "Focus Buyers" and "All the Way Here Buyers" filled in
 * before this does anything. Until then it 200s (so MailerLite doesn't
 * retry/disable the webhook) but logs and records nothing.
 */
import { getEnv } from "../../../../lib/cloudflare-env";
import { recordPurchase, type ProductKey } from "../../../../lib/auth";

const GROUP_TO_PRODUCT: Record<string, ProductKey> = {
  // "<mailerlite-group-id>": "focus",
  // "<mailerlite-group-id>": "core",
};

interface MailerLiteWebhookPayload {
  type?: string;
  subscriber?: { email?: string };
  group?: { id?: string; name?: string };
}

export async function POST(request: Request) {
  const env = getEnv();
  let payload: MailerLiteWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (payload.type !== "subscriber.added_to_group") {
    return Response.json({ ok: true, ignored: payload.type ?? "unknown" });
  }

  const email = payload.subscriber?.email;
  const groupId = payload.group?.id;
  if (!email || !groupId) {
    return Response.json({ ok: true, ignored: "missing email or group id" });
  }

  const product = GROUP_TO_PRODUCT[groupId];
  if (!product) {
    console.warn(
      `[here-supply-co] mailerlite webhook: group ${groupId} (${payload.group?.name ?? "unnamed"}) ` +
        `has no product mapping in GROUP_TO_PRODUCT — not recording a purchase for ${email}.`
    );
    return Response.json({ ok: true, ignored: "unmapped group" });
  }

  await recordPurchase(env, email, product, "mailerlite_webhook");
  return Response.json({ ok: true, email, product });
}
