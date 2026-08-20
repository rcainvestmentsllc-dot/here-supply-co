"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer, Header } from "../components";
import { MOMENTS, type MomentKey } from "../data";

export default function FieldGuide() {
  const [selected, setSelected] = useState<MomentKey | null>(null);
  const practice = selected ? MOMENTS[selected] : null;
  return <main className="site"><Header />
    <section className="interior-hero"><p className="kicker">THE COMPASS CHECK</p><h1>What is pulling you<br /><em>away right now?</em></h1><p>Pick the sentence closest to the truth. Leave with one practice you can use today.</p></section>
    <section className="check-layout"><div className="check-options">{(Object.keys(MOMENTS) as MomentKey[]).map((key) => { const item = MOMENTS[key]; return <button className={selected === key ? "selected" : ""} key={key} type="button" onClick={() => setSelected(key)}><span>{item.number}</span><strong>{item.title}</strong><small>{item.detail}</small><i>→</i></button>; })}</div>
      <aside className="answer-panel" aria-live="polite">{!practice ? <div className="answer-empty"><p>Choose the moment you are in.</p><span>The next move should be small enough to do today.</span></div> : <div><p className="section-label">{practice.label}</p><h2>{practice.title}</h2><p className="answer-detail">{practice.detail}</p><div className="do-now"><span>DO THIS NOW</span><p>{practice.action}</p></div><p className="answer-note">{practice.note}</p><div className="next-step"><span>YOUR NEXT STEP</span><Link href={practice.nextHref}>{practice.nextLabel} <b>→</b></Link></div></div>}</aside></section>
    <Footer />
  </main>;
}
