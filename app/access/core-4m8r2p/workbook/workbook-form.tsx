"use client";

import { useEffect, useRef, useState } from "react";
import { CORE_LESSONS } from "../../../course-content";

const STORAGE_KEY = "iron-compass-core-workbook-v1";
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
        const existing = window.localStorage.getItem(STORAGE_KEY);
        if (existing) setAnswers(JSON.parse(existing) as Answers);
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
      <p className="section-label">IRON COMPASS CORE</p>
      <h1>The Workbook</h1>
      <p>Type here and your answers stay on this device, or print the clean white pages and write by hand. Use only the lessons that meet a real problem.</p>
      <div className="workbook-actions"><button className="button primary" type="button" onClick={() => window.print()}>Print or save as PDF <span>→</span></button><small aria-live="polite">{saved ? "Saved on this device" : "Answers save automatically"}</small></div>
      <div className="workbook-art-strip" aria-label="Artwork from the nine Core lessons">{CORE_LESSONS.map((lesson) => <img key={lesson.slug} src={lesson.artImage} alt="" width="1672" height="942" />)}</div>
    </section>
    <section className="workbook-pages">{CORE_LESSONS.map((lesson) => <article key={lesson.slug} className="workbook-page">
      <header><span>{lesson.number} · {lesson.movement}</span><h2>{lesson.title}</h2><p>{lesson.subtitle}</p></header>
      <label><h3>The question</h3><p>{lesson.reflection}</p><textarea rows={5} value={answers[key(lesson.slug, "reflection")] || ""} onChange={(event) => update(key(lesson.slug, "reflection"), event.target.value)} aria-label={`${lesson.title}: your reflection`} /></label>
      <label><h3>The practice I will try</h3><p>{lesson.action}</p><textarea rows={4} value={answers[key(lesson.slug, "practice")] || ""} onChange={(event) => update(key(lesson.slug, "practice"), event.target.value)} aria-label={`${lesson.title}: the practice you will try`} /></label>
      <footer>
        <label><span className="workbook-label">WHEN</span><input value={answers[key(lesson.slug, "when")] || ""} onChange={(event) => update(key(lesson.slug, "when"), event.target.value)} /></label>
        <label><span className="workbook-label">WHERE</span><input value={answers[key(lesson.slug, "where")] || ""} onChange={(event) => update(key(lesson.slug, "where"), event.target.value)} /></label>
        <label><span className="workbook-label">MINIMUM VERSION</span><input value={answers[key(lesson.slug, "minimum")] || ""} onChange={(event) => update(key(lesson.slug, "minimum"), event.target.value)} /></label>
      </footer>
    </article>)}</section>
    <section className="workbook-integration">
      <p className="section-label">THIRTY-DAY INTEGRATION</p><h2>Choose two. Keep them small.</h2>
      <label><p>One Return practice:</p><textarea rows={3} value={answers["integration:return"] || ""} onChange={(event) => update("integration:return", event.target.value)} /></label>
      <label><p>One Lead or Keep practice:</p><textarea rows={3} value={answers["integration:lead-keep"] || ""} onChange={(event) => update("integration:lead-keep", event.target.value)} /></label>
      <label><p>At the end of thirty days, what changed and what did not fit?</p><textarea rows={5} value={answers["integration:review"] || ""} onChange={(event) => update("integration:review", event.target.value)} /></label>
    </section>
  </>;
}
