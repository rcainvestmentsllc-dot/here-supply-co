"use client";

import { useState } from "react";

type State = "idle" | "sending" | "ok" | "invalid" | "error";

/** Posts an application or a weekly check in to /api/coaching and confirms on the page. */
export function CoachingForm({ kind }: { kind: "application" | "checkin" }) {
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
    return <div className="intake-success" role="status">
      <span>{kind === "application" ? "APPLICATION RECEIVED" : "CHECK IN RECEIVED"}</span>
      <h2>{kind === "application" ? "Got it. Thank you." : "Thank you. I have it."}</h2>
      <p>{kind === "application"
        ? "I read every application myself. You will hear from me within two days, from hello@heresupplyco.com, either with a time for the first call or an honest note if this is not the right fit."
        : "I will read it and write back within 48 hours. Keep doing the small version in the meantime."}</p>
    </div>;
  }

  return <form className="intake-form" onSubmit={onSubmit} noValidate={false}>
    <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
    <div className="intake-row">
      <label><span>Your name</span><input name="name" autoComplete="name" required /></label>
      <label><span>Your email</span><input type="email" name="email" autoComplete="email" required /></label>
    </div>

    {kind === "application" ? <>
      <fieldset><legend>Who is doing this?</legend>
        <label><input type="radio" name="together" value="Both of us" required /> <span>Both of us</span></label>
        <label><input type="radio" name="together" value="Just me for now" /> <span>Just me for now</span></label>
      </fieldset>
      <label><span>Where are you with Here Supply Co.?</span><select name="where" required defaultValue="">
        <option value="" disabled>Choose the closest answer</option>
        <option>We use the Sunday Board</option>
        <option>We are inside All the Way Here</option>
        <option>We finished All the Way Here</option>
        <option>Not started yet</option>
      </select></label>
      <label><span>What do you want to be different in thirty days?</span><small>One or two sentences. Concrete beats perfect.</small><textarea name="different" rows={4} required /></label>
      <label><span>What have you already tried?</span><textarea name="tried" rows={3} /></label>
      <label><span>Good days and times for a thirty minute video call</span><input name="times" placeholder="Weeknights after 8, Saturday mornings" /></label>
      <label className="intake-scope"><input type="checkbox" required /><span>I understand this is coaching on practical habits, not therapy, marriage counseling, medical care, or crisis support.</span></label>
    </> : <>
      <label><span>Which week is this?</span><select name="week" required defaultValue="">
        <option value="" disabled>Choose a week</option>
        <option>Week 1</option><option>Week 2</option><option>Week 3</option><option>Week 4</option><option>Final check in</option>
      </select></label>
      <label><span>What did you practice this week?</span><small>Which practice, how many times, and the smallest version you actually did.</small><textarea name="practiced" rows={4} required /></label>
      <label><span>What got in the way?</span><textarea name="in_the_way" rows={3} required /></label>
      <label><span>One question for me</span><textarea name="question" rows={3} required /></label>
      <label><span>Anything else I should know?</span><textarea name="anything_else" rows={2} /></label>
    </>}

    <div className="intake-submit">
      <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : kind === "application" ? "Apply" : "Send my check in"}<b>→</b></button>
      {state === "invalid" && <p role="alert">Please check your name and email, then try again.</p>}
      {state === "error" && <p role="alert">Something went wrong on our end. Please try again in a minute, or email hello@heresupplyco.com.</p>}
      <p>Do not include passwords or payment card information.</p>
    </div>
  </form>;
}
