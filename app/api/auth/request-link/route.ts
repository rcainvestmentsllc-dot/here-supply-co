import { getEnv } from "../../../../lib/cloudflare-env";
import { hasPurchase, createLoginToken, isProductKey } from "../../../../lib/auth";
import { sendMagicLinkEmail } from "../../../../lib/email";

function safeReturnTo(value: FormDataEntryValue | null | undefined): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return "/library";
  return value;
}

export async function POST(request: Request) {
  const env = getEnv();
  const origin = new URL(request.url).origin;
  const form = await request.formData();

  const emailRaw = form.get("email");
  const productRaw = form.get("product");
  const returnTo = safeReturnTo(form.get("return_to"));

  const email = typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";
  const product = typeof productRaw === "string" && isProductKey(productRaw) ? productRaw : null;

  const redirectUrl = new URL("/login", origin);
  if (product) redirectUrl.searchParams.set("product", product);
  redirectUrl.searchParams.set("return_to", returnTo);

  const isValidEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email);
  if (!isValidEmail || !product) {
    redirectUrl.searchParams.set("error", "no_access");
    return Response.redirect(redirectUrl.href, 303);
  }

  // Always show the same "check your email" state whether or not the
  // address actually has access — don't let this endpoint be used to
  // probe which emails have purchased.
  try {
    const owns = await hasPurchase(env, email, product);
    if (owns) {
      const token = await createLoginToken(env, email);
      const verifyUrl = new URL("/api/auth/verify", origin);
      verifyUrl.searchParams.set("token", token);
      verifyUrl.searchParams.set("return_to", returnTo);
      await sendMagicLinkEmail(env, email, verifyUrl.href);
    }
  } catch (error) {
    console.error("[here-supply-co] request-link failed:", error);
  }

  redirectUrl.searchParams.set("sent", "1");
  return Response.redirect(redirectUrl.href, 303);
}
