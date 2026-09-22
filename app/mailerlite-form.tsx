import styles from "./signup.module.css";

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
export function SundayBoardSignupForm({
  unlocked = false,
  error = false,
  source = "sunday_board",
  next = "/sunday-board",
}: {
  unlocked?: boolean;
  error?: boolean;
  /** Which page earned the lead, so it is possible to see what converts. */
  source?: string;
  next?: string;
}) {
  if (unlocked) {
    return (
      <div className={styles.card} id="get-board">
        <span className={styles.kicker}>Your guide is ready</span>
        <h3 className={styles.title}>Print one copy. Put it between you.</h3>
        <p className={styles.blurb}>
          Fifteen minutes, once a week, on the same page. That is the whole practice.
        </p>
        <a className={styles.download} href={GUIDE_URL} download="sunday-board-meeting.pdf">
          Download the meeting guide <span aria-hidden="true">↓</span>
        </a>
        <p className={styles.note}>
          It is also on its way to your inbox, so you can find it again without hunting.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.card} id="get-board">
      <span className={styles.kicker}>Free · 15-minute meeting guide</span>
      <h3 className={styles.title}>Get the Sunday Board Meeting.</h3>
      <p className={styles.blurb}>
        The one-page guide Chris and Rhea actually use. Tell us where to send it and it opens on
        the next screen.
      </p>

      <form className={styles.form} method="post" action="/api/subscribe">
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="next" value={next} />
        <label className={styles.field}>
          <span>Your email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            aria-invalid={error || undefined}
          />
        </label>
        <button type="submit" className={styles.submit}>
          Send me the guide <span aria-hidden="true">→</span>
        </button>
      </form>

      {error && <p className={styles.error}>That email did not look right. Try it once more.</p>}

      <p className={styles.note}>
        The guide, and occasionally something useful from Chris. No sequence of upsells, and you
        can leave in one click.
      </p>
    </div>
  );
}
