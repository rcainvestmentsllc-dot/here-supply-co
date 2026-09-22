import { getEnv } from "../../../../lib/cloudflare-env";
import { requireAdmin } from "../../../../lib/admin";
import { recordPurchase, isProductKey } from "../../../../lib/auth";
import { EMAIL_RE } from "../../../../lib/subscribe";

/** Grant or revoke course access by hand. The safety net under the webhook. */
export async function POST(request: Request) {
  await requireAdmin();
  const env = getEnv();
  const origin = new URL(request.url).origin;
  const form = await request.formData();

  const emailRaw = form.get("email");
  const productRaw = form.get("product");
  const actionRaw = form.get("action");

  const email = typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";
  const product = typeof productRaw === "string" && isProductKey(productRaw) ? productRaw : null;
  const revoking = actionRaw === "revoke";

  const back = new URL("/admin", origin);

  if (!EMAIL_RE.test(email) || !product) {
    back.searchParams.set("msg", "Enter a valid email and choose a product.");
    return Response.redirect(back.href, 303);
  }

  if (revoking) {
    await env.DB.prepare("delete from purchases where email = ?1 and product = ?2")
      .bind(email, product)
      .run();
    back.searchParams.set("msg", `Removed ${product} access for ${email}.`);
  } else {
    await recordPurchase(env, email, product, "manual_grant");
    back.searchParams.set("msg", `Granted ${product} access to ${email}. They can now sign in.`);
  }

  return Response.redirect(back.href, 303);
}
