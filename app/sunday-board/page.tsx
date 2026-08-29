import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header, WeeklyGuidePreview } from "../components";
import { FREE_BOARD_PDF } from "../data";
import { SundayBoardSignupForm } from "../mailerlite-form";

export const metadata: Metadata = {
  title: "Free Weekly Guide | A 15-Minute Home Meeting",
  description: "A free 15-minute weekly guide for husbands and wives. Put the calendar, money, kids, connection, and one shared priority on the same page.",
  alternates: { canonical: "/sunday-board" },
  openGraph: {
    title: "Free Weekly Guide | A 15-Minute Home Meeting",
    description: "A free 15-minute weekly meeting guide for husbands and wives who want to see the same week.",
    images: [{ url: "/assets/chris-founder.jpg", alt: "Chris Avera outdoors by the ocean" }],
  },
  twitter: {
    title: "Free Weekly Guide | A 15-Minute Home Meeting",
    description: "A free 15-minute weekly meeting guide for husbands and wives who want to see the same week.",
    images: ["/assets/chris-founder.jpg"],
  },
};

export default function SundayBoard() {
  return (
    <main id="main-content" className="site">
      <Header />

      <section className="interior-hero sunday-hero">
        <p className="kicker">A 15-MINUTE WEEKLY MEETING FOR YOU AND YOUR WIFE</p>
        <h1>Sit down together.<br /><em>See the same week.</em></h1>
        <p>This free one-page guide gives husbands and wives a simple weekly conversation with less last-minute friction and more of life pointed in the same direction.</p>
        <div className="sunday-hero-actions">
          <a className="button primary" href="#get-board">Get the free meeting guide</a>
          <small>Free PDF · Opens immediately · No account required</small>
          <Link href="/field-guide">Not sure where to start? Take the Compass Check <span>→</span></Link>
        </div>
      </section>

      <section id="get-board" className="signup-section">
        <div className="signup-copy">
          <p className="section-label">START HERE</p>
          <h2>Get the guide.<br /><em>Use it together this week.</em></h2>
          <p>Download the printable meeting guide and use it right away. There is no email gate and no account to create. Just print one copy and sit down together.</p>
          <ul>
            <li>A printable one-page weekly guide</li>
            <li>A clear four-part agenda for the conversation</li>
            <li>Prompts for connection, logistics, and one shared priority</li>
            <li>Free to use, with no account required</li>
          </ul>
        </div>
        <SundayBoardSignupForm />
      </section>

      <section id="worksheet" className="worksheet-section">
        <div className="worksheet-copy">
          <p className="section-label">A REAL PLACE TO START</p>
          <h2>Phones away.<br />A notebook between you.</h2>
          <p>Connection first. Then the things that usually stay in both your heads: meals, money, projects, kids, the calendar, time together, and the shared goal that matters this week.</p>
          <p className="free-note">The guide is free because one calmer conversation can change the shape of a whole week. Use what helps and leave the rest.</p>
          <div className="split-actions">
            <a className="button dark" href="#get-board">Start the meeting <span>↑</span></a>
            <a className="quiet-link" href={FREE_BOARD_PDF} download="see-the-same-week.pdf">Download another copy <span>↓</span></a>
          </div>
        </div>
        <div className="worksheet-image weekly-guide-frame">
          <WeeklyGuidePreview />
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
          <h2>The guide makes the week visible.<br /><em>Focus helps you stay with it.</em></h2>
          <p>If your phone keeps pulling you away from what you meant to do, Focus Protocol is the next small step: a private 72-hour reset you can use at your own pace.</p>
        </div>
        <Link className="button primary" href="/focus">See Focus Protocol · $29 <span>→</span></Link>
      </section>

      <Footer />
    </main>
  );
}
