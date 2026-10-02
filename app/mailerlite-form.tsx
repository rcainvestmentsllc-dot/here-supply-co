import styles from "./signup.module.css";
import { EmailSignup } from "./email-signup";

const GUIDE_URL = "/downloads/sunday-board-meeting.pdf";

/**
 * The free-guide signup.
 *
 * This used to be a bare download link with no list behind it, which meant
 * every visitor the site earned was spent once and there was no path from the
 * free guide to the course. The address is now captured before the download.
 *
 * The exchange is kept honest: one field, the guide arrives on the next
 * screen, and what the email is for is stated plainly.
 */
export function SundayBoardSignupForm() {
  return (
    <div className={styles.card} id="get-board">
      <span className={styles.kicker}>Free · 15 minute meeting guide</span>
      <h3 className={styles.title}>Print one copy. Put it between you.</h3>
      <p className={styles.blurb}>
        The one page guide Chris and Rhea use. Free to download, nothing to sign up for.
      </p>
      <a className={styles.download} href={GUIDE_URL} download="sunday-board-meeting.pdf">
        Download the meeting guide <span aria-hidden="true">↓</span>
      </a>
      <p className={styles.note}>
        Set a timer for fifteen minutes, put both phones in another room, and work through the page together.
      </p>
      <EmailSignup source="sunday_board" next="/sunday-board" />
    </div>
  );
}
