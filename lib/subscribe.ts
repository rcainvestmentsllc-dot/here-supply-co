/**
 * Email capture.
 *
 * The address is written to D1 first and synced to MailerLite second, on
 * purpose: the previous "signup form" was a bare download link with no list
 * behind it, so every visitor the site earned was spent once. Owning the row
 * means a lead survives a missing API key, a renamed group, or a MailerLite
 * outage, and can be exported later.
 */
import type { CloudflareEnv } from "./cloudflare-env";

export const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function recordSubscriber(
  env: CloudflareEnv,
  email: string,
  source = "sunday_board"
): Promise<void> {
  await env.DB.prepare(
    "insert into subscribers (email, source) values (?1, ?2) " +
      "on conflict(email) do nothing"
  )
    .bind(normalizeEmail(email), source)
    .run();
}

/**
 * Best-effort push to MailerLite. Never throws into the request path: if the
 * key is absent or the call fails, the address is already safe in D1 and the
 * visitor still gets what they came for.
 */
export async function syncToMailerLite(
  env: CloudflareEnv,
  email: string,
  groupId?: string
): Promise<boolean> {
  const key = env.MAILERLITE_API_KEY as string | undefined;
  if (!key) return false;

  try {
    const body: Record<string, unknown> = { email: normalizeEmail(email) };
    if (groupId) body.groups = [groupId];

    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.warn(`[here-supply-co] MailerLite sync failed (${response.status}) for ${email}`);
      return false;
    }

    await env.DB.prepare("update subscribers set synced_at = datetime('now') where email = ?1")
      .bind(normalizeEmail(email))
      .run();
    return true;
  } catch (error) {
    console.warn("[here-supply-co] MailerLite sync threw:", error);
    return false;
  }
}
