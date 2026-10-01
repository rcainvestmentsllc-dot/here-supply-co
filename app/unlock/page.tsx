import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { BrandWordmark } from "../components";
import { SUPPORT_EMAIL, supportEmailUrl } from "../site-config";
import styles from "./unlock.module.css";

export const metadata: Metadata = {
  title: "Open your course | All the Way Here",
  description: "Enter your course password to open All the Way Here.",
  robots: { index: false, follow: false },
};

function safeReturn(value: string | undefined): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/access/core-4m8r2p";
}

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string; error?: string }>;
}) {
  const params = await searchParams;
  const returnTo = safeReturn(params.return_to);
  const failed = params.error === "1";

  return (
    <main id="main-content" className={styles.shell}>
      <header className={styles.head}>
        <Link href="/" aria-label="Here Supply Co. home"><BrandWordmark onDark /></Link>
      </header>

      <section className={styles.panel} aria-labelledby="unlock-title">
        <h1 id="unlock-title" className={styles.title}>Open All the Way Here</h1>
        <p className={styles.lede}>
          Enter the course password from your confirmation email. This device will remember it, so you only do this once.
        </p>

        <form className={styles.form} method="post" action="/api/course/unlock">
          <input type="hidden" name="return_to" value={returnTo} />
          <label className={styles.field}>
            <span>Course password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              autoCapitalize="none"
              spellCheck={false}
              required
              aria-invalid={failed || undefined}
              aria-describedby={failed ? "unlock-error" : undefined}
              autoFocus
            />
          </label>
          {failed && (
            <p id="unlock-error" className={styles.error} role="alert">
              That password does not match. Check the confirmation email from your purchase and try again.
            </p>
          )}
          <button type="submit" className={styles.submit}>Open the course</button>
        </form>

        <div className={styles.help}>
          <p>
            <b>Bought the course but cannot find the email?</b> Search your inbox for &ldquo;All the Way Here,&rdquo; including spam
            and promotions. Still missing? Write to <a href={supportEmailUrl("All the Way Here password")}>{SUPPORT_EMAIL}</a> and Chris
            will send it to you.
          </p>
          <p>
            <b>Have not bought it yet?</b> <Link href="/library">See what is inside All the Way Here</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
