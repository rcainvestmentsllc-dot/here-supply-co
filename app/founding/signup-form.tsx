import styles from "./founding.module.css";

/**
 * Posts to the same /api/subscribe endpoint the free guide uses, tagged
 * source=founding so the list can be read as a founding-group queue rather
 * than mixed into general subscribers.
 */
export function FoundingSignupForm({
  joined = false,
  error = false,
}: {
  joined?: boolean;
  error?: boolean;
}) {
  if (joined) {
    return (
      <div className={styles.card}>
        <span className={styles.cardKicker}>You are on the list</span>
        <h2 className={styles.cardTitle}>Chris will email you himself.</h2>
        <p className={styles.cardBlurb}>
          Not today necessarily, because he reads these one at a time and writes back properly. When
          it lands, reply to it and tell him whether there are kids in the house. It changes which
          lesson to start with.
        </p>
        <p className={styles.cardNote}>
          In the meantime the Sunday Board Meeting guide is free and you can use it this week.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <span className={styles.cardKicker}>Twenty couples · No charge · No card</span>
      <h2 className={styles.cardTitle}>Put your name in.</h2>
      <p className={styles.cardBlurb}>
        One field. Chris reads every one of these himself and writes back, so give him the address
        you actually check.
      </p>

      <form className={styles.form} method="post" action="/api/subscribe">
        <input type="hidden" name="source" value="founding_group" />
        <input type="hidden" name="next" value="/founding" />
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
          Count us in <span aria-hidden="true">&rarr;</span>
        </button>
      </form>

      {error && <p className={styles.error}>That email did not look right. Try it once more.</p>}

      <p className={styles.cardNote}>
        No charge now and no charge later. If the group fills before he gets to you, he will say so
        plainly rather than leaving you wondering.
      </p>
    </div>
  );
}
