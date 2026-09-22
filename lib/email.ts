/**
 * Transactional email sending for magic links.
 *
 * MailerLite (the marketing platform already in use for this site) has no
 * transactional-send API — it's broadcast/campaign-only, and its own docs
 * say the group-automation workaround "does not support true transactional
 * messaging like password resets" (which a magic login link is). Sending
 * this one email needs a real transactional provider.
 *
 * This is wired for MailerSend (MailerLite's sister product, same brand,
 * separate account + API key) as the default, but swapping in SendGrid,
 * Resend, etc. only means rewriting the body of `sendMagicLinkEmail` — the
 * call site (`app/api/auth/request-link/route.ts`) doesn't change.
 *
 * Until `MAILERSEND_API_KEY` (or `MAILERSEND_FROM_EMAIL`) is set as a
 * Wrangler secret, this logs the link instead of sending it, so the rest of
 * the login flow can be tested end-to-end without a provider yet.
 */
import type { CloudflareEnv } from "./cloudflare-env";

/** Can this deployment actually deliver a magic link right now? */
export function isEmailConfigured(env: CloudflareEnv): boolean {
  return Boolean(env.MAILERSEND_API_KEY && env.MAILERSEND_FROM_EMAIL);
}

export async function sendMagicLinkEmail(env: CloudflareEnv, email: string, link: string): Promise<void> {
  const apiKey = env.MAILERSEND_API_KEY;
  const fromEmail = env.MAILERSEND_FROM_EMAIL as string | undefined;

  if (!apiKey || !fromEmail) {
    console.warn(
      `[here-supply-co] No transactional email provider configured — not sending. ` +
        `Magic link for ${email}: ${link}`
    );
    return;
  }

  const response = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: fromEmail, name: "Here Supply Co." },
      to: [{ email }],
      subject: "Your Here Supply Co. login link",
      text: `Here's your one-time login link. It expires in 15 minutes and works once.\n\n${link}\n\nIf you didn't request this, you can ignore this email.`,
      html: `<p>Here's your one-time login link. It expires in 15 minutes and works once.</p><p><a href="${link}">${link}</a></p><p>If you didn't request this, you can ignore this email.</p>`,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`[here-supply-co] MailerSend send failed (${response.status}): ${body}`);
  }
}
