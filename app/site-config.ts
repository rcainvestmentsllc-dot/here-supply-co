// Keep the verified address until the replacement domain and mailbox are ready.
// Set these public values before building the version used for the migration.
const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://ironcompassinstitute.com";
const parsedOrigin = new URL(configuredOrigin);

if (
  parsedOrigin.protocol !== "https:" ||
  parsedOrigin.username || parsedOrigin.password ||
  parsedOrigin.pathname !== "/" || parsedOrigin.search || parsedOrigin.hash
) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path, query, or credentials.");
}

export const SITE_ORIGIN = parsedOrigin.origin;
export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "chris@ironcompassinstitute.com";

if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(SUPPORT_EMAIL)) {
  throw new Error("NEXT_PUBLIC_SUPPORT_EMAIL must be a valid mailbox address.");
}

export function siteUrl(path = "/") {
  const result = new URL(path, `${SITE_ORIGIN}/`);
  if (result.origin !== SITE_ORIGIN) throw new Error("Site links must stay on the configured origin.");
  return result.href;
}

export function supportEmailUrl(subject?: string) {
  return `mailto:${SUPPORT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
