import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header, SundayBoardWordmark, WeeklyGuidePreview } from "../components";
import { FREE_BOARD_PDF } from "../data";
import { SundayBoardSignupForm } from "../mailerlite-form";
import { SundayBoardMeetingVideo } from "./meeting-video";

export const metadata: Metadata = {
  title: "The Sunday Board Meeting | Here Supply Co.",
  description: "The free fifteen minute Sunday Board Meeting for two people sharing a life. A printable guide and a short video of Chris and Rhea using it.",
  alternates: { canonical: "/sunday-board" },
  openGraph: {
    title: "The Sunday Board Meeting | Here Supply Co.",
    description: "A free fifteen minute weekly conversation for two people who want to see the same week.",
    images: [{ url: "/assets/chris-founder-sunset.jpg", alt: "Chris Avera outdoors by the ocean" }],
  },
  twitter: {
    title: "The Sunday Board Meeting | Here Supply Co.",
    description: "A free fifteen minute weekly conversation for two people who want to see the same week.",
    images: ["/assets/chris-founder-sunset.jpg"],
  },
};

export default function SundayBoard() {
  return (
    <main id="main-content" className="site">
      <Header />

      <section className="interior-hero sunday-hero">
        <div className="sunday-product-mark"><SundayBoardWordmark /></div>
        <p className="kicker">A FREE FIFTEEN MINUTE WEEKLY CONVERSATION FOR COUPLES</p>
        <h1>Stop carrying the week alone.<br /><em>Get on the same page.</em></h1>
        <p>When the calendar, kids, work, and household details live in separate heads, small things turn into stress. The Sunday Board gives both of you one place to see what is coming, decide who owns what, and make room for what matters.</p>
        <div className="sunday-hero-actions">
          <a className="button primary" href="#watch-together">Watch us use it</a>
          <small>Free video and one page guide · No signup needed</small>
          <Link href="/library">Want more than the week? See All the Way Here <span>→</span></Link>
        </div>
      </section>

      <section id="watch-together" className="sunday-film">
        <div className="sunday-film-copy">
          <p className="section-label">THE REAL STORY BEHIND THE PRACTICE</p>
          <h2>Chris and Rhea,<br /><em>at the same table.</em></h2>
          <p>We built a life in Charleston, moved our family to Brevard, and are raising three kids while work, screens, schedules, and ordinary pressure keep asking for more. The Sunday Board Meeting came from needing one simple place to slow down and see the same week together.</p>
          <p>We are not a perfect couple and this is not a performance. It is the two of us talking through something we use most Sundays.</p>
          <a className="quiet-link" href="#get-board">Get the one page guide <span>↓</span></a>
        </div>
        <SundayBoardMeetingVideo />
      </section>

      <section id="get-board" className="signup-section">
        <div className="signup-copy">
          <p className="section-label">THE SUNDAY BOARD MEETING</p>
          <h2>Get the guide.<br /><em>Use it together this week.</em></h2>
          <p>Download the printable guide and use it this week. Print one copy and sit down together. If you want it by email, there is a spot for that too.</p>
          <ul>
            <li>A printable one page weekly guide</li>
            <li>A clear four part agenda for the conversation</li>
            <li>Prompts for connection, logistics, and one shared priority</li>
            <li>Free, with no account required</li>
          </ul>
        </div>
        <SundayBoardSignupForm />
      </section>

      <section id="worksheet" className="worksheet-section">
        <div className="worksheet-copy">
          <p className="section-label">A REAL PLACE TO START</p>
          <h2>Phones away.<br />A notebook between you.</h2>
          <p>Connection first. Then the things that usually stay in both your heads: meals, money, projects, kids, the calendar, time together, and the shared goal that matters this week.</p>
          <p className="free-note">The point is that both of you can see the week, split it up, and follow through.</p>
          <p>The guide is free because one calmer conversation can change the shape of a whole week. Use what helps and leave the rest.</p>
          <div className="split-actions">
            <a className="button dark" href={FREE_BOARD_PDF} download="sunday-board-meeting.pdf">Download the guide <span>↓</span></a>
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
          <article><span>02</span><h3>What does the week need?</h3><p>Put the commitments and pressure points on the same table.</p></article>
          <article><span>03</span><h3>What does the house need?</h3><p>Get meals, kids, money, and who owns what out of both your heads.</p></article>
          <article><span>04</span><h3>What do we want to protect?</h3><p>Name one thing for your relationship, family, or time together before the week is full.</p></article>
        </div>
      </section>

      <section className="sunday-next">
        <div>
          <p className="section-label">WHEN THE WEEK IS NOT THE WHOLE PROBLEM</p>
          <h2>The guide makes the week visible.<br /><em>The course helps you live it.</em></h2>
          <p>All the Way Here picks up where the guide stops: how you put the phone down, get home from work, handle pressure, date, parent, and keep friends.</p>
        </div>
        <Link className="button primary" href="/library">See All the Way Here · $99 <span>→</span></Link>
      </section>

      <Footer />
    </main>
  );
}
