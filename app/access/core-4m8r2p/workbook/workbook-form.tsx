"use client";

import { useEffect, useRef, useState } from "react";
import { CORE_LESSONS } from "../../../course-content";

const STORAGE_KEY = "all-the-way-here-workbook-v1";
const LEGACY_STORAGE_KEYS = ["life-at-hand-workbook-v1", "iron-compass-core-workbook-v1"];
type Answers = Record<string, string>;

function key(slug: string, field: string) {
  return `${slug}:${field}`;
}

export function InteractiveWorkbook() {
  const [answers, setAnswers] = useState<Answers>({});
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const current = window.localStorage.getItem(STORAGE_KEY);
        const legacy = LEGACY_STORAGE_KEYS.map((storageKey) => window.localStorage.getItem(storageKey)).find(Boolean);
        const existing = current || legacy;
        if (existing) {
          setAnswers(JSON.parse(existing) as Answers);
          if (!current && legacy) window.localStorage.setItem(STORAGE_KEY, legacy);
        }
      } catch {
        // The workbook remains fully usable and printable if private storage is unavailable.
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function update(field: string, value: string) {
    setAnswers((current) => {
      const next = { ...current, [field]: value };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setSaved(true);
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => setSaved(false), 1800);
      } catch {
        setSaved(false);
      }
      return next;
    });
  }

  return <>
    <section className="workbook-intro">
      <p className="section-label">HERE SUPPLY CO. · ALL THE WAY HERE</p>
      <h1>The Workbook</h1>
      <p>Print or save these clean white pages before you begin, or keep the workbook open in another tab and type as you go. Complete the page for a lesson after you try its practice in real life. Your typed answers stay on this device.</p>
      <div className="workbook-actions"><button className="button primary" type="button" onClick={() => window.print()}>Print or save as PDF <span>→</span></button><small aria-live="polite">{saved ? "Saved on this device" : "Answers save automatically"}</small></div>
      <div className="workbook-art-strip" aria-label="Artwork from the nine Core lessons">{CORE_LESSONS.map((lesson) => <img key={lesson.slug} src={lesson.artImage} alt="" width="1672" height="942" />)}</div>
    </section>
    <section className="workbook-pages workbook-reset-page">
      <article className="workbook-page workbook-page-reset" id="attention-reset">
        <div className="workbook-page-brand" aria-hidden="true"><strong className="workbook-brand-mark"><img className="workbook-brand-logo" src="/assets/brand/here-supply-co-logo-inverse-v2.svg" width="1874" height="547" alt="" /><img className="workbook-brand-logo-print" src="/assets/brand/here-supply-co-logo-v2.svg" width="1874" height="547" alt="" /></strong><span>BEFORE LESSON ONE · THREE DAYS</span><b>03</b></div>
        <header><span>THE ATTENTION RESET</span><h2>Recover one moment first.</h2><p>Use the four moves in the private Attention Reset, then choose one repeated part of the day where your phone will stop deciding for you.</p></header>
        <aside className="workbook-suggestions"><strong>FOUR SMALL MOVES</strong><span>Remove the color.</span><span>Control the feeds.</span><span>Silence the machine.</span><span>Give the phone a home.</span></aside>
        <label><h3>The moment I want back</h3><p>Dinner, the drive, bedtime, the first ten minutes home, focused work, or another repeated moment.</p><textarea rows={3} value={answers["reset:moment"] || ""} onChange={(event) => update("reset:moment", event.target.value)} /></label>
        <label><h3>What I noticed during three days</h3><p>When did you reach without deciding? Where was it easier to look up? Which boundary is worth keeping?</p><textarea rows={5} value={answers["reset:noticed"] || ""} onChange={(event) => update("reset:noticed", event.target.value)} /></label>
        <footer>
          <label><span className="workbook-label">PHONE HOME</span><input value={answers["reset:home"] || ""} onChange={(event) => update("reset:home", event.target.value)} /></label>
          <label><span className="workbook-label">PHONE-AWAY WINDOW</span><input value={answers["reset:window"] || ""} onChange={(event) => update("reset:window", event.target.value)} /></label>
          <label><span className="workbook-label">ESSENTIAL EXCEPTION</span><input value={answers["reset:exception"] || ""} onChange={(event) => update("reset:exception", event.target.value)} /></label>
        </footer>
      </article>
    </section>
    <section className="workbook-pages">{CORE_LESSONS.map((lesson) => <article key={lesson.slug} id={lesson.slug} className={`workbook-page workbook-page-${lesson.movement.toLowerCase()}`}>
      <div className="workbook-page-brand" aria-hidden="true"><strong className="workbook-brand-mark"><img className="workbook-brand-logo" src="/assets/brand/here-supply-co-logo-inverse-v2.svg" width="1874" height="547" alt="" /><img className="workbook-brand-logo-print" src="/assets/brand/here-supply-co-logo-v2.svg" width="1874" height="547" alt="" /></strong><span>RETURN · LEAD · KEEP</span><b>{lesson.number}</b></div>
      <header><span>{lesson.number} · {lesson.movement} · ACTION PAGE</span><h2>{lesson.title}</h2><p>{lesson.subtitle}</p></header>
      <label><h3>The question</h3><p>{lesson.reflection}</p><textarea rows={5} value={answers[key(lesson.slug, "reflection")] || ""} onChange={(event) => update(key(lesson.slug, "reflection"), event.target.value)} aria-label={`${lesson.title}: your reflection`} /></label>
      <label><h3>The practice I will try</h3><p>{lesson.action}</p><textarea rows={4} value={answers[key(lesson.slug, "practice")] || ""} onChange={(event) => update(key(lesson.slug, "practice"), event.target.value)} aria-label={`${lesson.title}: the practice you will try`} /></label>
      <footer>
        <label><span className="workbook-label">WHEN</span><input value={answers[key(lesson.slug, "when")] || ""} onChange={(event) => update(key(lesson.slug, "when"), event.target.value)} /></label>
        <label><span className="workbook-label">WHERE</span><input value={answers[key(lesson.slug, "where")] || ""} onChange={(event) => update(key(lesson.slug, "where"), event.target.value)} /></label>
        <label><span className="workbook-label">MINIMUM VERSION</span><input value={answers[key(lesson.slug, "minimum")] || ""} onChange={(event) => update(key(lesson.slug, "minimum"), event.target.value)} /></label>
      </footer>
    </article>)}</section>
    <section className="workbook-toolkit-intro" id="family-toolkit">
      <p className="section-label">FAMILY TOOLKIT · OPTIONAL</p><h2>Three ways to bring the work home.</h2>
      <p>Use these only when they meet a real family problem. They are not extra lessons and they are not a scorecard for children. The free Sunday Board Meeting remains its own weekly planning sheet.</p>
      <a href="/sunday-board">Open the free Sunday Board Meeting →</a>
    </section>
    <section className="workbook-pages workbook-toolkit-pages">
      <article className="workbook-page workbook-page-tool" id="family-screen-reset">
        <div className="workbook-page-brand" aria-hidden="true"><strong className="workbook-brand-mark"><img className="workbook-brand-logo" src="/assets/brand/here-supply-co-logo-inverse-v2.svg" width="1874" height="547" alt="" /><img className="workbook-brand-logo-print" src="/assets/brand/here-supply-co-logo-v2.svg" width="1874" height="547" alt="" /></strong><span>FAMILY TOOLS</span><b>13</b></div>
        <header><span>FAMILY TOOL 01</span><h2>The Family Screen Reset</h2><p>Choose one part of family life to recover together. Start with adult modeling, shared choices, and a three-day experiment rather than punishment.</p></header>
        <aside className="workbook-suggestions"><strong>START WITH ONE</strong><span>Eyes first when someone speaks.</span><span>Give the phones one visible home.</span><span>Adults model the boundary first.</span></aside>
        <label><h3>The moment we want back</h3><p>Choose one: dinner, the ride to school, bedtime, a game, Saturday morning, or another repeated moment.</p><textarea rows={3} value={answers["toolkit:screen:moment"] || ""} onChange={(event) => update("toolkit:screen:moment", event.target.value)} /></label>
        <label><h3>What is pulling our attention now?</h3><p>Name the pattern without blaming one person.</p><textarea rows={3} value={answers["toolkit:screen:pattern"] || ""} onChange={(event) => update("toolkit:screen:pattern", event.target.value)} /></label>
        <label><h3>Our three-day experiment</h3><p>Where will devices live, when does the boundary begin and end, and what essential work, health, accessibility, or caregiving exceptions do we need?</p><textarea rows={5} value={answers["toolkit:screen:experiment"] || ""} onChange={(event) => update("toolkit:screen:experiment", event.target.value)} /></label>
        <footer>
          <label><span className="workbook-label">ADULTS WILL MODEL</span><input value={answers["toolkit:screen:adults"] || ""} onChange={(event) => update("toolkit:screen:adults", event.target.value)} /></label>
          <label><span className="workbook-label">KIDS HELP CHOOSE</span><input value={answers["toolkit:screen:kids"] || ""} onChange={(event) => update("toolkit:screen:kids", event.target.value)} /></label>
          <label><span className="workbook-label">START DATE</span><input value={answers["toolkit:screen:start"] || ""} onChange={(event) => update("toolkit:screen:start", event.target.value)} /></label>
        </footer>
      </article>
      <article className="workbook-page workbook-page-tool" id="weekly-tradition-builder">
        <div className="workbook-page-brand" aria-hidden="true"><strong className="workbook-brand-mark"><img className="workbook-brand-logo" src="/assets/brand/here-supply-co-logo-inverse-v2.svg" width="1874" height="547" alt="" /><img className="workbook-brand-logo-print" src="/assets/brand/here-supply-co-logo-v2.svg" width="1874" height="547" alt="" /></strong><span>FAMILY TOOLS</span><b>14</b></div>
        <header><span>FAMILY TOOL 02</span><h2>The Weekly Tradition Builder</h2><p>Build one small thing your family can look forward to and repeat. A tradition becomes meaningful through return, not size or expense.</p></header>
        <label><h3>What do we want this time to protect?</h3><p>Connection, play, faith, rest, food, movement, service, creativity, or something else.</p><textarea rows={3} value={answers["toolkit:tradition:purpose"] || ""} onChange={(event) => update("toolkit:tradition:purpose", event.target.value)} /></label>
        <label><h3>The smallest repeatable version</h3><p>Name the activity, day, time, place, and the version that still works during a hard week.</p><textarea rows={5} value={answers["toolkit:tradition:plan"] || ""} onChange={(event) => update("toolkit:tradition:plan", event.target.value)} /></label>
        <label><h3>How will everyone have a voice?</h3><p>Decide what adults organize, what children or other family members choose, and how the idea can change with age, energy, and season.</p><textarea rows={4} value={answers["toolkit:tradition:voice"] || ""} onChange={(event) => update("toolkit:tradition:voice", event.target.value)} /></label>
        <footer>
          <label><span className="workbook-label">PHONE PLAN</span><input value={answers["toolkit:tradition:phones"] || ""} onChange={(event) => update("toolkit:tradition:phones", event.target.value)} /></label>
          <label><span className="workbook-label">FIRST DATE</span><input value={answers["toolkit:tradition:first"] || ""} onChange={(event) => update("toolkit:tradition:first", event.target.value)} /></label>
          <label><span className="workbook-label">TRY IT FOR</span><input value={answers["toolkit:tradition:repeat"] || ""} onChange={(event) => update("toolkit:tradition:repeat", event.target.value)} /></label>
        </footer>
      </article>
      <article className="workbook-page workbook-page-tool" id="teen-check-in">
        <div className="workbook-page-brand" aria-hidden="true"><strong className="workbook-brand-mark"><img className="workbook-brand-logo" src="/assets/brand/here-supply-co-logo-inverse-v2.svg" width="1874" height="547" alt="" /><img className="workbook-brand-logo-print" src="/assets/brand/here-supply-co-logo-v2.svg" width="1874" height="547" alt="" /></strong><span>FAMILY TOOLS</span><b>15</b></div>
        <header><span>FAMILY TOOL 03</span><h2>The Side-by-Side Teen Check-In</h2><p>Make room for a real conversation without cornering your teenager, interrogating them, or turning the first answer into a lecture.</p></header>
        <aside className="workbook-suggestions"><strong>BEGIN BESIDE THEM</strong><span>Drive, walk, make food, fix something, or sit somewhere neutral.</span><span>The adult puts the phone away first.</span><span>Ask whether they want listening, help thinking, or help acting.</span></aside>
        <label><h3>One invitation that does not feel like a meeting</h3><p>Try: Want to ride with me? Want to get something to eat? Can you help me with this?</p><textarea rows={3} value={answers["toolkit:teen:invitation"] || ""} onChange={(event) => update("toolkit:teen:invitation", event.target.value)} /></label>
        <label><h3>Four questions worth keeping</h3><p>What is taking up most of your headspace? What are adults missing about your world? Do you want me to listen, help you think, or help you act? What would make this week a little easier?</p><textarea rows={5} value={answers["toolkit:teen:questions"] || ""} onChange={(event) => update("toolkit:teen:questions", event.target.value)} /></label>
        <label><h3>One next step we agreed on</h3><p>Write only what was actually agreed. Do not add a hidden assignment after the conversation ends.</p><textarea rows={3} value={answers["toolkit:teen:next"] || ""} onChange={(event) => update("toolkit:teen:next", event.target.value)} /></label>
        <footer>
          <label><span className="workbook-label">PHONE PLAN</span><input value={answers["toolkit:teen:phones"] || ""} onChange={(event) => update("toolkit:teen:phones", event.target.value)} /></label>
          <label><span className="workbook-label">CHECK BACK</span><input value={answers["toolkit:teen:return"] || ""} onChange={(event) => update("toolkit:teen:return", event.target.value)} /></label>
          <label><span className="workbook-label">ADULT WILL FOLLOW THROUGH</span><input value={answers["toolkit:teen:promise"] || ""} onChange={(event) => update("toolkit:teen:promise", event.target.value)} /></label>
        </footer>
      </article>
    </section>
    <section className="workbook-integration" id="thirty-day-plan">
      <div className="workbook-page-brand" aria-hidden="true"><strong className="workbook-brand-mark"><img className="workbook-brand-logo" src="/assets/brand/here-supply-co-logo-inverse-v2.svg" width="1874" height="547" alt="" /><img className="workbook-brand-logo-print" src="/assets/brand/here-supply-co-logo-v2.svg" width="1874" height="547" alt="" /></strong><span>THIRTY-DAY PLAN</span><b>16</b></div>
      <p className="section-label">THIRTY-DAY INTEGRATION</p><h2>Choose two. Keep them small.</h2>
      <label><p>One Return practice:</p><textarea rows={3} value={answers["integration:return"] || ""} onChange={(event) => update("integration:return", event.target.value)} /></label>
      <label><p>One Lead or Keep practice:</p><textarea rows={3} value={answers["integration:lead-keep"] || ""} onChange={(event) => update("integration:lead-keep", event.target.value)} /></label>
      <label><p>At the end of thirty days, what changed and what did not fit?</p><textarea rows={5} value={answers["integration:review"] || ""} onChange={(event) => update("integration:review", event.target.value)} /></label>
    </section>
  </>;
}
