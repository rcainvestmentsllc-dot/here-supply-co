import { getEnv } from "./cloudflare-env";
import { getSessionEmail } from "./require-access";
import { redirect } from "next/navigation";

/**
 * Who can see the operations page. Configurable via the ADMIN_EMAILS var
 * (comma separated); falls back to the owner so the page is never locked out
 * of its own account.
 */
export function adminEmails(): string[] {
  const env = getEnv();
  const raw = (env.ADMIN_EMAILS as string | undefined) ?? "chrisavera@gmail.com";
  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin(returnTo = "/admin"): Promise<string> {
  const email = await getSessionEmail();
  if (!email) redirect(`/login?return_to=${encodeURIComponent(returnTo)}&product=core`);
  if (!adminEmails().includes(email.toLowerCase())) redirect("/");
  return email;
}
