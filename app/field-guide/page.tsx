"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT_FORM, MOMENTS, SKOOL, type MomentKey } from "../data";
import styles from "./field-guide.module.css";

export default function FieldGuide() {
  const [selected, setSelected] = useState<MomentKey | null>(null);
  const practice = selected ? MOMENTS[selected] : null;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Iron Compass home">
          <span className={styles.mark} aria-hidden="true"><i /><b /></span>
          <span><strong>IRON COMPASS</strong><small>Tools for a steadier life at home</small></span>
        </Link>
        <nav><Link href="/">Home</Link><Link href="/library">The work</Link><Link href="/about">About Chris</Link></nav>
        <a className={styles.headerAction} href={SKOOL.group} target="_blank" rel="noreferrer">Start free <span>→</span></a>
      </header>

      <section className={styles.intro}>
        <p className={styles.eyebrow}>THE COMPASS CHECK</p>
        <h1>Name the thing pulling you <em>away.</em></h1>
        <p>Choose the sentence closest to true. You will leave with one practical move for today and a clear place to go next.</p>
      </section>

      <section className={styles.check} aria-labelledby="check-heading">
        <div className={styles.choices}>
          <div className={styles.choiceHeading}>
            <span>01</span>
            <div><p className={styles.eyebrow}>BE HONEST, NOT HARD ON YOURSELF</p><h2 id="check-heading">What needs your attention <em>first?</em></h2></div>
          </div>
          <div className={styles.choiceList}>
            {(Object.keys(MOMENTS) as MomentKey[]).map((key) => {
              const item = MOMENTS[key];
              const isSelected = selected === key;
              return <button className={isSelected ? styles.selected : ""} key={key} type="button" aria-pressed={isSelected} onClick={() => setSelected(key)}>
                <span>{item.number}</span><strong>{item.title}</strong><small>{item.detail}</small><i aria-hidden="true">→</i>
              </button>;
            })}
          </div>
        </div>

        <aside className={styles.result} aria-live="polite">
          {!practice ? <div className={styles.emptyResult}>
            <span className={styles.resultNumber}>02</span>
            <p className={styles.eyebrow}>YOUR NEXT MOVE</p>
            <h2>Start with what is <em>actually true.</em></h2>
            <p>The next move does not need to fix your whole life. It needs to be small enough to do before this day is over.</p>
          </div> : <div className={styles.activeResult}>
            <button className={styles.reset} type="button" onClick={() => setSelected(null)}>Choose another answer <span>×</span></button>
            <span className={styles.resultNumber}>02</span>
            <p className={styles.eyebrow}>YOUR NEXT MOVE</p>
            <h2>{practice.label}</h2>
            <p className={styles.practiceIntro}>{practice.summary}</p>
            <div className={styles.action}>
              <span>{practice.protocol}</span>
              <ol className={styles.steps}>{practice.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            </div>
            <p className={styles.note}>{practice.note}</p>
            <Link className={styles.nextLink} href={practice.nextHref}>{practice.nextLabel} <b>→</b></Link>
            <a className={styles.freeLink} href={SKOOL.group} target="_blank" rel="noreferrer">Or start free in Iron Compass <span>↗</span></a>
          </div>}
        </aside>
      </section>

      <section className={styles.close}>
        <p className={styles.eyebrow}>NO PERFORMANCE REQUIRED</p>
        <h2>A clearer next step is enough to begin.</h2>
        <a href={SKOOL.group} target="_blank" rel="noreferrer">Start free in Iron Compass <span>↗</span></a>
      </section>

      <footer className={styles.footer}><span>© 2026 Iron Compass Institute</span><nav><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">The work</Link><Link href="/about">About Chris</Link><a href={CONTACT_FORM} target="_blank" rel="noreferrer">Contact Chris</a></nav></footer>
    </main>
  );
}
