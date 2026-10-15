"use client";

import { useState } from "react";

type Kind = "men_application" | "men_intake" | "men_checkin";
type State = "idle" | "sending" | "ok" | "invalid" | "error";

const DONE: Record<Kind, { tag: string; title: string; body: string }> = {
  men_application: {
    tag: "RECEIVED",
    title: "Got it. Thank you.",
    body: "I read every one myself. You will get an email from me within two business days with a few times for a free twenty minute call, or an honest note if coaching is not the right fit.",
  },
  men_intake: {
    tag: "INTAKE RECEIVED",
    title: "Thank you. I have it.",
    body: "I will read this before our first call so we can spend the hour on what matters. Start the Focus Protocol on the day you picked.",
  },
  men_checkin: {
    tag: "CHECK IN RECEIVED",
    title: "Thank you. I have it.",
    body: "I will read it before our next call. Keep doing the small version in the meantime.",
  },
};

/** Posts a men's coaching form to /api/coaching and confirms on the page. */
export function MenForm({ kind, bookingUrl = "" }: { kind: Kind; bookingUrl?: string }) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("kind", kind);
    setState("sending");
    try {
      const res = await fetch("/api/coaching", { method: "POST", body: data, headers: { Accept: "application/json" } });
      setState(res.ok ? "ok" : res.status === 400 ? "invalid" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    const done = DONE[kind];
    const book = kind === "men_application" && bookingUrl;
    return (
      <div className="intake-success" role="status">
        <span>{done.tag}</span>
        <h2>{done.title}</h2>
        <p>{book ? "I read every one myself. If you already know you want to talk, grab a time for the free twenty minute call now. If coaching is not the right fit, I will say so before we ever talk." : done.body}</p>
        {book && <a className="intake-book" href={bookingUrl} target="_blank" rel="noreferrer">Pick a time for the call <b>→</b></a>}
      </div>
    );
  }

  const button = kind === "men_application" ? "Send it" : kind === "men_intake" ? "Send my intake" : "Send my check in";

  return (
    <form className="intake-form" onSubmit={onSubmit}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <div className="intake-row">
        <label><span>Your name</span><input name="name" autoComplete="name" required /></label>
        <label><span>Your email</span><input type="email" name="email" autoComplete="email" required /></label>
      </div>

      {kind === "men_application" && <>
        <label><span>Phone, if you would rather I text</span><input type="tel" name="phone" autoComplete="tel" /></label>
        <label><span>What do you lead?</span><small>A business, a team, a crew, a family. Whatever is true.</small><input name="lead" required /></label>
        <label><span>What is costing you the most right now?</span><small>One or two sentences. Concrete beats perfect.</small><textarea name="costing" rows={4} required /></label>
        <label><span>What do you want to be different in ninety days?</span><textarea name="different" rows={3} required /></label>
        <label><span>What are you curious about?</span><select name="interest" required defaultValue="">
          <option value="" disabled>Choose the closest answer</option>
          <option>Not sure yet, that is what the call is for</option>
          <option>The 90 Day Intensive</option>
          <option>Ongoing Coaching</option>
          <option>Just the course for now</option>
        </select></label>
        <label><span>Good days and times for a twenty minute call</span><input name="times" placeholder="Weekday mornings before 8, Friday afternoons" /></label>
        <label><span>How did you hear about this?</span><input name="heard" /></label>
      </>}

      {kind === "men_intake" && <>
        <label><span>What do you do, and what do you lead?</span><textarea name="work" rows={3} required /></label>
        <label><span>Who is at home?</span><small>Partner, kids and their ages, anyone else you take care of.</small><textarea name="home" rows={2} required /></label>
        <label><span>Who matters most to you right now?</span><textarea name="people" rows={2} /></label>
        <label><span>Where are you drifting at home?</span><textarea name="drift_home" rows={3} required /></label>
        <label><span>Where are you drifting at work?</span><textarea name="drift_work" rows={3} required /></label>
        <label><span>Where are you drifting in yourself?</span><small>Health, friendships, faith, rest, the things you used to do.</small><textarea name="drift_self" rows={3} required /></label>
        <label><span>If nothing changes in the next year, what does that cost you?</span><textarea name="cost" rows={3} required /></label>
        <label><span>One goal for ninety days at home</span><input name="goal_home" required /></label>
        <label><span>One goal for ninety days at work</span><input name="goal_work" required /></label>
        <label><span>One goal for ninety days for yourself</span><input name="goal_self" required /></label>
        <label><span>What day will you start the Focus Protocol?</span><input name="focus_start" placeholder="This Saturday" required /></label>
        <label><span>Anything else I should know?</span><small>A hard season, a health issue, something you want to make sure we talk about.</small><textarea name="know" rows={3} /></label>
      </>}

      {kind === "men_checkin" && <>
        <label><span>Which week is this?</span><select name="week" required defaultValue="">
          <option value="" disabled>Choose a week</option>
          {Array.from({ length: 12 }, (_, i) => <option key={i}>{`Intensive week ${i + 1}`}</option>)}
          <option>Ongoing Coaching</option>
        </select></label>
        <label><span>Did you do the practice? Where did it work and where did it fall apart?</span><textarea name="practiced" rows={4} required /></label>
        <label><span>Who got the best of you this week, and who got what was left?</span><textarea name="best_of_you" rows={3} required /></label>
        <label><span>One thing you want to bring to the next call</span><textarea name="bring" rows={3} required /></label>
        <label><span>Anything else?</span><textarea name="anything_else" rows={2} /></label>
      </>}

      {kind !== "men_checkin" && (
        <label className="intake-scope"><input type="checkbox" required /><span>I understand this is coaching on habits, leadership, and relationships going forward. It is not therapy, counseling, medical care, or crisis support.</span></label>
      )}

      <div className="intake-submit">
        <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : button}<b>→</b></button>
        {state === "invalid" && <p role="alert">Please check your name and email, then try again.</p>}
        {state === "error" && <p role="alert">Something went wrong on our end. Please try again in a minute, or email hello@heresupplyco.com.</p>}
        <p>Do not include passwords or payment card information. If you are in crisis, call or text 988.</p>
      </div>
    </form>
  );
}
