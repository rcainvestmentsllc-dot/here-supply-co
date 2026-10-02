import { redirect } from "next/navigation";

/**
 * The course used to send one time login links. It now opens with the button
 * in the purchase email or the course password, so anyone who lands here (an
 * old bookmark, an old email) goes to the password page instead.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>;
}) {
  const { return_to } = await searchParams;
  const safe = typeof return_to === "string" && return_to.startsWith("/") && !return_to.startsWith("//") ? return_to : "";
  redirect(safe ? `/unlock?return_to=${encodeURIComponent(safe)}` : "/unlock");
}
