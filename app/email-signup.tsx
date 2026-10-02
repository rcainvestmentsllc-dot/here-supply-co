"use client";

import { useState } from "react";
import styles from "./signup.module.css";

type State = "idle" | "sending" | "ok" | "invalid" | "error";

/**
 * Optional email signup. The free guide never sits behind this; it is for
 * people who want the guide in their inbox plus the short welcome series.
 */
export function EmailSignup({
  source,
  next,
  title = "Want it in your inbox?",
  blurb = "I'll email you the guide, then three short notes over the next week on making the meeting stick. No spam, and you can unsubscribe anytime.",
}: {
  source: string;
  next: string;
  title?: string;
  blurb?: string;
}) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = (await res.json().catch(() => ({}))) as { status?: State };
      setState(json.status === "ok" || json.status === "invalid" ? json.status : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className={styles.inline} id="signup" role="status">
        <p className={styles.inlineTitle}>You're on the list.</p>
        <p className={styles.note}>The guide is on its way. If it isn't in your inbox in a few minutes, check promotions or spam.</p>
      </div>
    );
  }

  return (
    <div className={styles.inline} id="signup">
      <p className={styles.inlineTitle}>{title}</p>
      <p className={styles.note}>{blurb}</p>
      <form className={styles.form} action="/api/subscribe" method="post" onSubmit={onSubmit}>
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="next" value={next} />
        <div className={styles.trap} aria-hidden="true">
          <label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={state === "invalid" ? true : undefined}
          />
        </label>
        <button className={styles.submit} type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending" : "Send it to me"}
        </button>
      </form>
      {state === "invalid" && <p className={styles.error}>That email doesn't look right. Try it once more.</p>}
      {state === "error" && (
        <p className={styles.error}>
          Something went wrong on our end. Try again in a minute, or email <a href="mailto:hello@heresupplyco.com">hello@heresupplyco.com</a>.
        </p>
      )}
    </div>
  );
}
