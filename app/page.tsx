import Link from "next/link";
import { Footer, Header } from "./components";
import { SKOOL } from "./data";

export default function Home() {
  return <main className="site elevated-home"><Header />
    <section className="elevated-hero">
      <img className="elevated-hero-image" src="/assets/home-hero-doorway.png" alt="A man pausing at the entrance to a warmly lit room" />
      <div className="elevated-hero-overlay" />
      <div className="elevated-hero-content">
        <p className="kicker">PRACTICAL WORK FOR HUSBANDS &amp; FATHERS</p>
        <h1>Be here for<br /><em>your own life.</em></h1>
        <p>Iron Compass gives men clear, useful tools for the moments when work, distraction, and pressure start taking more than they should.</p>
        <div className="hero-buttons">
          <Link className="button primary" href="/field-guide">Start with the free Compass Check <span>→</span></Link>
          <Link className="text-link" href="/sunday-board">See The Sunday Board Meeting <span>→</span></Link>
        </div>
      </div>
      <div className="elevated-hero-note"><span>IRON COMPASS INSTITUTE</span><p>Come back to the room.</p></div>
    </section>

    <section className="entry-band" aria-label="How Iron Compass works">
      <div><span>START FREE</span><p>Compass Check + The Sunday Board Meeting</p></div>
      <div><span>GO DEEPER</span><p>Focus Protocol · $29 one time</p></div>
      <div><span>THE FULL SYSTEM</span><p>Iron Compass Core · $249 one time</p></div>
    </section>

    <section className="real-work">
      <div className="real-work-intro"><p className="section-label">WHAT THIS IS</p><h2>Less advice.<br /><em>More practice.</em></h2></div>
      <div className="real-work-copy"><p>Iron Compass is a private body of work for men who want a more present, steadier life at home. It is not a performance, a paid community to keep up with, or a promise that one course fixes everything.</p><p>It is a set of practical systems for the rooms where life actually gets hard: your attention, your reactions under pressure, and the relationships that can quietly get what is left over.</p><Link className="quiet-link" href="/library">See how the full work is organized <span>→</span></Link></div>
      <div className="real-work-rooms"><article><span>01</span><h3>Attention</h3><p>Notice what keeps pulling you out of the room and make a change that holds.</p></article><article><span>02</span><h3>Pressure</h3><p>Catch the moment before it becomes the tone of the whole house.</p></article><article><span>03</span><h3>Relationship</h3><p>Put the things that matter back on the table before another week disappears.</p></article></div>
    </section>

    <section className="free-showcase">
      <div className="free-showcase-visual"><img src="/assets/sunday-board-gamma.png" alt="The Sunday Board Meeting worksheet" /></div>
      <div className="free-showcase-copy"><p className="section-label">THE FIRST USEFUL THING</p><h2>The Sunday<br />Board <em>Meeting.</em></h2><p>It is a printable fifteen-minute check-in for couples who want a clearer house, a calmer week, and a shared plan before the calendar takes over.</p><p className="free-showcase-detail">Download the printable without an account. The recorded walkthrough Chris and Rhea made together lives in the free Iron Compass room.</p><div className="split-actions"><Link className="button dark" href="/sunday-board">See The Sunday Board Meeting <span>→</span></Link><a className="quiet-link" href={SKOOL.group} target="_blank" rel="noreferrer">Enter the free room <span>↗</span></a></div></div>
    </section>

    <section className="deeper-work">
      <div className="deeper-work-heading"><p className="section-label">WHEN YOU WANT MORE THAN ONE TOOL</p><h2>The work has<br />a <em>clear path.</em></h2><p>Start small. If it helps, the next step is already there. Nothing is hidden and nothing asks you to buy a personality.</p></div>
      <div className="deeper-work-offers">
        <a className="deeper-offer focus-offer-home" href={SKOOL.focus} target="_blank" rel="noreferrer"><div className="offer-image"><img src="/assets/focus-manual-gamma.png" alt="The Focus Protocol Field Manual" /></div><div className="offer-copy"><span>FOCUS PROTOCOL · $29 ONE TIME</span><h3>Get your attention back.</h3><p>A focused 72-hour reset with four practical moves and the Field Manual.</p><b>Explore Focus Protocol <i>→</i></b></div></a>
        <a className="deeper-offer core-offer-home" href={SKOOL.core} target="_blank" rel="noreferrer"><div className="core-offer-mark"><span>IRON COMPASS CORE</span><p>RETURN<br />LEAD<br />KEEP</p></div><div className="offer-copy"><span>THE COMPLETE SYSTEM · $249 ONE TIME</span><h3>Work on the whole life.</h3><p>Twelve guided modules, the Field Manual, workbook, The Sunday Board Meeting, and Mission Debrief.</p><b>Explore Iron Compass Core <i>→</i></b></div></a>
      </div>
    </section>

    <section className="founder-brief">
      <div className="founder-monogram">IC</div>
      <div><p className="section-label">WHY CHRIS MADE THIS</p><h2>“I was present in the technical sense. In every other sense, I was gone.”</h2><p>Iron Compass began as the work Chris Avera made for himself: tools for getting home, putting the phone away, having better Sunday conversations, and bringing a steadier self into the room. He is sharing what has helped him, not pretending to have a perfect life or a one-size-fits-all answer.</p><a className="quiet-link" href="https://chrisavera.substack.com/p/on-my-knees" target="_blank" rel="noreferrer">Read Chris’s personal writing <span>↗</span></a></div>
    </section>

    <section className="elevated-closing"><p className="section-label">START WITH WHAT IS TRUE</p><h2>One better<br /><em>way back.</em></h2><p>Take the Compass Check or use The Sunday Board Meeting. The deeper work is there when you want it.</p><div className="hero-buttons"><Link className="button primary" href="/field-guide">Take the Compass Check <span>→</span></Link><Link className="text-link" href="/library">See the full system <span>→</span></Link></div></section>
    <Footer />
  </main>;
}
