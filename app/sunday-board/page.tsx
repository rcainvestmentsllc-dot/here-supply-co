import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../components";
import { SKOOL } from "../data";

export const metadata: Metadata = {
  title: "The Sunday Board Meeting | Iron Compass",
  description: "A free printable weekly check-in for couples who want a clearer house, a calmer week, and a shared plan.",
  openGraph: { title: "The Sunday Board Meeting | Iron Compass", description: "A free printable weekly check-in for couples who want a clearer house and a calmer week.", images: [{ url: "/assets/sunday-board-gamma.png", alt: "The Sunday Board Meeting worksheet" }] },
  twitter: { title: "The Sunday Board Meeting | Iron Compass", description: "A free printable weekly check-in for couples who want a clearer house and a calmer week.", images: ["/assets/sunday-board-gamma.png"] },
};

export default function SundayBoard() {
  return <main className="site"><Header />
    <section className="interior-hero sunday-hero"><p className="kicker">THE FREE SUNDAY BOARD MEETING</p><h1>Put the week<br /><em>on the table.</em></h1><p>A printable weekly check-in for couples who want a clearer house, a calmer week, and fifteen honest minutes together.</p><div className="hero-buttons compact-hero-actions"><a className="button primary" href="/downloads/sunday-board-meeting.pdf" download>Download the printable <span>↓</span></a><a className="text-link" href={SKOOL.sundayBoard} target="_blank" rel="noreferrer">See the free video walkthrough <span>↗</span></a></div><small className="hero-detail">No account is needed for the printable. Chris and Rhea’s short recorded walkthrough is free inside Iron Compass.</small></section>
    <section id="worksheet" className="worksheet-section"><div className="worksheet-copy"><p className="section-label">A REAL PLACE TO START</p><h2>Phones away.<br />A notebook between you.</h2><p>Connection first. Then the things that usually stay in both your heads: meals, money, projects, kids, the calendar, time together, and the shared goal that matters this week.</p><p className="free-note">This one is free because a better Sunday night can change a whole week. Download the printable now. The short walkthrough Chris and Rhea recorded together is also free inside Iron Compass.</p><div className="split-actions"><a className="button dark" href="/downloads/sunday-board-meeting.pdf" download>Download the printable <span>↓</span></a><Link className="quiet-link" href="/field-guide">Take the Compass Check <span>→</span></Link></div></div><div className="worksheet-image"><img src="/assets/sunday-board-gamma.png" alt="The full Sunday Board Meeting worksheet" /></div></section>
    <section className="board-questions"><p className="section-label">FIFTEEN MINUTES. FOUR PARTS.</p><div><article><span>01</span><h3>How are we doing?</h3><p>Start with connection. Tell the truth without trying to solve everything first.</p></article><article><span>02</span><h3>What does the house need?</h3><p>Get meals, kids, money, projects, and scheduling out of both your heads.</p></article><article><span>03</span><h3>What does the week need?</h3><p>Put the commitments and pressure points on the same table.</p></article><article><span>04</span><h3>What do we want to protect?</h3><p>Name one thing for your relationship, family, or time together before the week is full.</p></article></div></section>
    <section className="sunday-next"><div><p className="section-label">WHEN YOU WANT MORE THAN ONE TOOL</p><h2>The Sunday Board Meeting gives you<br /><em>the weekly room.</em></h2><p>Iron Compass Core gives you the broader system for attention, pressure, marriage, fatherhood, friendship, and the life you are trying to hold together.</p></div><Link className="button primary" href="/library#curriculum">See everything inside Core <span>→</span></Link></section>
    <Footer />
  </main>;
}
