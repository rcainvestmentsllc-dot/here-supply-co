import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Wordmark } from "../brand/wordmark";
import { SUPPORT_EMAIL, supportEmailUrl } from "../site-config";
import styles from "./welcome.module.css";

export const metadata: Metadata = {
  title: "You're in | All the Way Here",
  description: "Your All the Way Here purchase is complete. Your confirmation email has the course link and password.",
  robots: { index: false, follow: false },
};

/**
 * Post-checkout landing. If MailerLite's checkout redirects here, the buyer
 * learns exactly where their course link and password are. The password is
 * never shown on this page, because anyone can open it.
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
          All the Way Here is yours: the Focus Protocol, nine lessons, the course book, and the Resource Pack.
          Your confirmation email is on its way with two things: a button that opens the course, and your course
          password for any other phone or computer.
        </p>
        <p className={styles.note}>
          It comes from Chris Avera with the subject &ldquo;Your All the Way Here course is ready.&rdquo; If it is not
          there in a few minutes, check spam and promotions.
        </p>
      </section>

      <section className={styles.steps}>
        <h2 className={styles.stepsTitle}>What happens next</h2>
        <ol>
          <li>
            <b>Open the email and tap the button.</b>
            <span>The course opens and this device remembers it. Use the password on any other device.</span>
          </li>
          <li>
            <b>Start with the Focus Protocol.</b>
            <span>Three days, four small moves, before either of you asks the other to change anything.</span>
          </li>
          <li>
            <b>Print the course book while it runs.</b>
            <span>
              Then on day four, open Return and take one lesson at a time, one practice each, into a
              normal week.
            </span>
          </li>
          <li>
            <b>Watch for a short email from Chris each week.</b>
            <span>
              For nine weeks, one note with that week&rsquo;s practice and one question for your Sunday Board.
              Reply to any of them and it comes straight to Chris.
            </span>
          </li>
        </ol>
      </section>

      <p className={styles.help}>
        Paid but cannot get in? Email{" "}
        <a href={supportEmailUrl("All the Way Here access")}>{SUPPORT_EMAIL}</a> and Chris will send
        your access by hand. You will not be left stuck.
      </p>
    </main>
  );
}
