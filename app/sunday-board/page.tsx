import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../components";
import { FREE_BOARD_PDF } from "../data";
import { SundayBoardSignupForm } from "../mailerlite-form";

export const metadata: Metadata = {
  title: "Sunday Board Meeting | A Weekly Marriage Meeting",
  description: "A free 15-minute weekly marriage meeting guide for husbands and wives. Put the calendar, money, kids, connection, and one shared priority on the same page.",
  alternates: { canonical: "/sunday-board" },
  openGraph: {
    title: "Sunday Board Meeting | A Weekly Marriage Meeting",
    description: "A free 15-minute weekly meeting guide for husbands and wives who want to see the same week.",
    images: [{ url: "/assets/sunday-board-gamma.png", alt: "The Sunday Board Meeting printable guide" }],
  },
  twitter: {
    title: "Sunday Board Meeting | A Weekly Marriage Meeting",
    description: "A free 15-minute weekly meeting guide for husbands and wives who want to see the same week.",
    images: ["/assets/sunday-board-gamma.png"],
  },
};

export default function SundayBoard() {
  return (
    <main id="main-content" className="site">
      <Header />

      <section className="interior-hero sunday-hero">
        <p className="kicker">A 15-MINUTE WEEKLY MEETING FOR YOU AND YOUR WIFE</p>
        <h1>Sit down together.<br /><em>See the same week.</em></h1>
        <p>The Sunday Board Meeting is a simple weekly conversation for husbands and wives who want less last-minute friction and more of life pointed in the same direction.</p>
        <div className="sunday-hero-actions">
          <a className="button primary" href="#get-board">Get the free meeting guide</a>
          <small>Opens immediately · Five short follow-ups</small>
          <Link href="/field-guide">Not sure where to start? Take the Compass Check <span>→</span></Link>
        </div>
      </section>

      <section id="get-board" className="signup-section">
        <div className="signup-copy">
          <p className="section-label">START HERE</p>
          <h2>Get the guide.<br /><em>Use it together this Sunday.</em></h2>
          <p>Enter your email and the printable meeting guide opens immediately. Over the next week, I will send five short notes that help you use it without turning it into another system to manage.</p>
          <ul>
            <li>The printable Sunday Board Meeting guide</li>
            <li>A clear four-part agenda for the conversation</li>
            <li>Five brief, practical follow-ups</li>
            <li>Unsubscribe whenever you want</li>
          </ul>
        </div>
        <SundayBoardSignupForm />
      </section>

      <section id="worksheet" className="worksheet-section">
        <div className="worksheet-copy">
          <p className="section-label">A REAL PLACE TO START</p>
          <h2>Phones away.<br />A notebook between you.</h2>
          <p>Connection first. Then the things that usually stay in both your heads: meals, money, projects, kids, the calendar, time together, and the shared goal that matters this week.</p>
          <p className="free-note">The guide is free because one calmer Sunday conversation can change the shape of a whole week. Use what helps and leave the rest.</p>
          <div className="split-actions">
            <a className="button dark" href="#get-board">Start the meeting <span>↑</span></a>
            <a className="quiet-link" href={FREE_BOARD_PDF} download>Already subscribed? Download the guide <span>↓</span></a>
          </div>
        </div>
        <div className="worksheet-image">
          <img src="/assets/sunday-board-gamma.png" alt="The Sunday Board Meeting printable guide" width="2400" height="3106" loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="board-questions">
        <p className="section-label">FIFTEEN MINUTES. FOUR PARTS.</p>
        <div>
          <article><span>01</span><h3>How are we doing?</h3><p>Start with connection. Tell the truth without trying to solve everything first.</p></article>
          <article><span>02</span><h3>What does the house need?</h3><p>Get meals, kids, money, projects, and scheduling out of both your heads.</p></article>
          <article><span>03</span><h3>What does the week need?</h3><p>Put the commitments and pressure points on the same table.</p></article>
          <article><span>04</span><h3>What do we want to protect?</h3><p>Name one thing for your relationship, family, or time together before the week is full.</p></article>
        </div>
      </section>

      <section className="sunday-next">
        <div>
          <p className="section-label">WHEN THE WEEK IS NOT THE WHOLE PROBLEM</p>
          <h2>The Sunday Board Meeting makes the week visible.<br /><em>Focus brings your attention back to it.</em></h2>
          <p>If your attention keeps leaving the room, Focus Protocol is the next small step: a private 72-hour reset you can use at your own pace.</p>
        </div>
        <Link className="button primary" href="/focus">See Focus Protocol · $29 <span>→</span></Link>
      </section>

      <Footer />
    </main>
  );
}
