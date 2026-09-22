import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Wordmark } from "../brand/wordmark";
import { SUPPORT_EMAIL, supportEmailUrl } from "../site-config";
import styles from "./welcome.module.css";

export const metadata: Metadata = {
  title: "You're in | All the Way Here",
  description: "Your All the Way Here purchase is complete. Sign in to open the course.",
  robots: { index: false, follow: false },
};

/**
 * Post-checkout landing. MailerLite's checkout should redirect here so the
 * buyer is never dropped on a generic receipt with no idea what happens next.
 *
 * Deliberately does two things at once: tells them what they bought, and
 * gives them the sign-in field right here rather than making them hunt for
 * /login.
 */
export default function WelcomePage() {
  return (
    <main id="main-content" className={styles.shell}>
      <header className={styles.head}>
        <Link href="/" aria-label="Here Supply Co. home">
          <Wordmark size="sm" onDark />
        </Link>
      </header>

      <section className={styles.panel}>
        <p className={styles.eyebrow}>Payment complete</p>
        <h1 className={styles.title}>You&rsquo;re in.</h1>
        <p className={styles.lede}>
          All the Way Here is yours — the Attention Reset, nine lessons, the workbook, and the
          field card. One thing left: sign in so the course knows it is you.
        </p>

        <form className={styles.form} method="post" action="/api/auth/request-link">
          <input type="hidden" name="product" value="core" />
          <input type="hidden" name="return_to" value="/access/core-4m8r2p" />
          <label className={styles.field}>
            <span>The email you paid with</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <button type="submit" className={styles.submit}>
            Send my sign-in link <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className={styles.note}>
          We&rsquo;ll email a one-time link. No password to invent or remember.
        </p>
      </section>

      <section className={styles.steps}>
        <h2 className={styles.stepsTitle}>What happens next</h2>
        <ol>
          <li>
            <b>Sign in above.</b>
            <span>Use the same address you paid with, so your purchase matches.</span>
          </li>
          <li>
            <b>Start with the Attention Reset.</b>
            <span>Three days, four small moves, before you ask anyone else to change anything.</span>
          </li>
          <li>
            <b>Then one lesson at a time.</b>
            <span>
              Nine lessons, one practice each, into an ordinary week. Your progress is saved to your
              account, so it follows you between your phone and your laptop.
            </span>
          </li>
        </ol>
      </section>

      <p className={styles.help}>
        Paid but cannot get in? Email{" "}
        <a href={supportEmailUrl("All the Way Here access")}>{SUPPORT_EMAIL}</a> and Chris will open
        it by hand. You will not be left stuck.
      </p>
    </main>
  );
}
