import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header, SundayBoardWordmark, WeeklyGuidePreview } from "../components";
import { FREE_BOARD_PDF } from "../data";
import { SundayBoardSignupForm } from "../mailerlite-form";
import { SundayBoardMeetingVideo } from "./meeting-video";

export const metadata: Metadata = {
  title: "The Sunday Board Meeting | Here Supply Co.",
  description: "The free 15-minute Sunday Board Meeting for two people sharing a life or household. See the same week before the calendar fills itself.",
  alternates: { canonical: "/sunday-board" },
  openGraph: {
    title: "The Sunday Board Meeting | Here Supply Co.",
    description: "A free 15-minute weekly conversation for two people who want to see the same week.",
    images: [{ url: "/assets/chris-founder.jpg", alt: "Chris Avera outdoors by the ocean" }],
  },
  twitter: {
    title: "The Sunday Board Meeting | Here Supply Co.",
    description: "A free 15-minute weekly conversation for two people who want to see the same week.",
    images: ["/assets/chris-founder.jpg"],
  },
};

export default function SundayBoard() {
  return (
    <main id="main-content" className="site">
      <Header />

      <section className="interior-hero sunday-hero">
        <div className="sunday-product-mark"><SundayBoardWordmark /></div>
        <p className="kicker">A FREE 15-MINUTE WEEKLY RESET FOR COUPLES</p>
        <h1>Stop carrying the week alone.<br /><em>Get on the same page.</em></h1>
        <p>When the calendar, kids, work, and household details live in separate heads, small things turn into stress. The Sunday Board gives both of you one place to see what is coming, decide who owns what, and make room for what matters.</p>
        <div className="sunday-hero-actions">
          <a className="button primary" href="#watch-together">Watch us use it</a>
          <small>Free video + one-page guide · No email gate · No account required</small>
          <Link href="/library">Ready for the complete practice? See All the Way Here <span>→</span></Link>
        </div>
      </section>

      <section id="watch-together" className="sunday-film">
        <div className="sunday-film-copy">
          <p className="section-label">THE REAL STORY BEHIND THE PRACTICE</p>
          <h2>Chris and Rhea,<br /><em>at the same table.</em></h2>
          <p>We built a life in Charleston, moved our family to Brevard, and are raising three kids while work, screens, schedules, and ordinary pressure keep asking for more. The Sunday Board Meeting came from needing one simple place to slow down and see the same week together.</p>
          <p>This is not a performance from a perfect couple. It is the two of us talking through a practice we actually use.</p>
          <a className="quiet-link" href="#get-board">Get the one-page guide <span>↓</span></a>
        </div>
        <SundayBoardMeetingVideo />
      </section>

      <section id="get-board" className="signup-section">
        <div className="signup-copy">
          <p className="section-label">THE SUNDAY BOARD MEETING</p>
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
          <p className="free-note">Household leadership is not one person running the family. It is making the week visible, deciding who owns what, and following through together.</p>
          <p>The guide is free because one calmer conversation can change the shape of a whole week. Use what helps and leave the rest.</p>
          <div className="split-actions">
            <a className="button dark" href="#get-board">Start the meeting <span>↑</span></a>
            <a className="quiet-link" href={FREE_BOARD_PDF} download="sunday-board-meeting.pdf">Download another copy <span>↓</span></a>
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
          <h2>The guide makes the week visible.<br /><em>The course helps you live it.</em></h2>
          <p>All the Way Here carries the work into attention, pressure, home, relationships, friendship, and the ordinary parts of life that work and screens can quietly crowd out.</p>
        </div>
        <Link className="button primary" href="/library">See All the Way Here · $99 <span>→</span></Link>
      </section>

      <Footer />
    </main>
  );
}
