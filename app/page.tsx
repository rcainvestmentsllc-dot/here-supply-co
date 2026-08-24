import Link from "next/link";
import { CONTACT_FORM, SKOOL } from "./data";
import styles from "./home.module.css";

const movements = [
  {
    number: "01",
    title: "Attention",
    line: "Bring your attention back under your direction.",
    detail: "Make space to think clearly, finish the work in front of you, and come through the door without handing the day to the people you love.",
  },
  {
    number: "02",
    title: "Regulation",
    line: "Bring a steadier self into the room.",
    detail: "Pressure is real. The work is learning to pause, return, and lead a hard moment without letting it take over the house.",
  },
  {
    number: "03",
    title: "Identity",
    line: "Build a life that can hold what matters.",
    detail: "Protect time, friendship, marriage, family rhythms, and the parts of life that keep a good man from slowly disappearing into work.",
  },
];

export default function Home() {
  return (
    <main className={styles.home}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Iron Compass home">
          <span className={styles.mark} aria-hidden="true"><i /><b /></span>
          <span><strong>IRON COMPASS</strong><small>Practical work for the rooms that matter</small></span>
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#system">The system</a>
          <a href="#start">Start here</a>
          <a href="#work">The work</a>
          <Link href="/about">About Chris</Link>
        </nav>
        <a className={styles.headerAction} href={SKOOL.group} target="_blank" rel="noreferrer">Start free <span>→</span></a>
      </header>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <a href="#system">The system</a>
        <a href="#start">Start here</a>
        <a href="#work">The work</a>
        <Link href="/about">About Chris</Link>
      </nav>

      <section className={styles.hero}>
        <img className={styles.heroImage} src="/assets/home-hero-doorway.png" alt="A man pausing before entering a warmly lit room" />
        <div className={styles.heroShade} />
        <div className={styles.heroRule} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>IRON COMPASS INSTITUTE</p>
          <h1>Be here for<br /><em>your own life.</em></h1>
          <p className={styles.lead}>A practical system for husbands and fathers who want their attention, their pressure, and the way they lead at home to point in the same direction.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={SKOOL.group} target="_blank" rel="noreferrer">Start free in Iron Compass <span>→</span></a>
            <Link className={styles.quietLightLink} href="/field-guide">Take the Compass Check <span>→</span></Link>
          </div>
        </div>
        <div className={styles.heroFooter}><span>ONE MAN. ONE SYSTEM. EVERY ROOM.</span><span>Attention · Regulation · Identity</span></div>
      </section>

      <section className={styles.systemIntro} id="system">
        <p className={styles.eyebrow}>THE PROBLEM IS NOT ONE ROOM</p>
        <div>
          <h2>Your life does not need another <em>hack.</em></h2>
          <p>It needs a way to work when your mind is full, the day has followed you home, or the people closest to you are getting whatever is left. Iron Compass gives the problem a name, the practice a place, and the rest of the work a direction.</p>
        </div>
      </section>

      <section className={styles.movementSection}>
        <div className={styles.movementHeader}>
          <p className={styles.eyebrow}>THE IRON COMPASS SYSTEM</p>
          <h2>Three movements.<br />One <em>way back.</em></h2>
          <p>The work moves from what has your attention, to how you carry pressure, to the life you are building around the people you love.</p>
        </div>
        <div className={styles.movementGrid}>
          {movements.map((movement) => (
            <article key={movement.title} className={styles.movementCard}>
              <span>{movement.number}</span>
              <h3>{movement.title}</h3>
              <strong>{movement.line}</strong>
              <p>{movement.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.startSection} id="start">
        <div className={styles.startArtwork}>
          <img src="/assets/sunday-board-gamma.png" alt="The Sunday Board Meeting weekly check-in" />
          <span>FREE PRACTICE</span>
        </div>
        <div className={styles.startCopy}>
          <p className={styles.eyebrow}>START WITH A REAL CONVERSATION</p>
          <h2>The Sunday Board <em>Meeting.</em></h2>
          <p>A printable fifteen-minute weekly check-in for couples who want to see the same week before it starts running them.</p>
          <dl>
            <div><dt>What it helps with</dt><dd>Connection, logistics, money, time together, and one shared win.</dd></div>
            <div><dt>What you get</dt><dd>The printable, plus a short walkthrough with Chris and Rhea inside the free Iron Compass library.</dd></div>
          </dl>
          <div className={styles.buttonRow}>
            <a className={styles.primaryButton} href={SKOOL.group} target="_blank" rel="noreferrer">Get the free Sunday Board Meeting <span>→</span></a>
            <Link className={styles.quietDarkLink} href="/field-guide">Not sure where to start? Take the Compass Check <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.workSection} id="work">
        <div className={styles.workHeader}>
          <p className={styles.eyebrow}>WHEN YOU WANT TO GO DEEPER</p>
          <h2>Two places to do the <em>work.</em></h2>
          <p>Both are one-time purchases inside the private Iron Compass library. You start with a free account, see the work, and choose the depth that fits the problem in front of you.</p>
        </div>

        <div className={styles.offerGrid}>
          <article className={styles.focusOffer}>
            <div className={styles.offerTopline}><span>FOCUS PROTOCOL</span><b>$29 ONE TIME</b></div>
            <h3>Get your attention<br />back in the <em>room.</em></h3>
            <p>Focus Protocol is a guided 72-hour reset for the man who knows distraction is taking more than it should. It is not a lecture. It is four practical moves and a visual field manual you can use immediately.</p>
            <div className={styles.deliveryNote}><span>DELIVERED INSIDE</span><p>One short introduction video, four practical moves, and the Focus Protocol Field Manual.</p></div>
            <details className={styles.videoReveal}>
              <summary className={styles.focusVideoSummary}>
                <img src="/assets/focus-manual-gamma.png" alt="Focus Protocol Field Manual cover" />
                <span>WATCH THE FOCUS OVERVIEW · 03:28</span><b>Play video <i>→</i></b>
              </summary>
              <video controls playsInline preload="none" poster="/assets/focus-manual-gamma.png"><source src="/assets/focus-protocol-sales.mp4" type="video/mp4" />Your browser does not support this video.</video>
            </details>
            <a href={SKOOL.group} target="_blank" rel="noreferrer">See Focus Protocol inside Iron Compass <b>↗</b></a>
          </article>

          <article className={styles.coreOffer}>
            <div className={styles.offerTopline}><span>IRON COMPASS CORE</span><b>$249 ONE TIME</b></div>
            <h3>Build the whole<br /><em>system.</em></h3>
            <p>Core brings the full work together: attention, pressure, home, marriage, family connection, friendship, and the practices that keep a good life from slipping away.</p>
            <div className={styles.deliveryNote}><span>DELIVERED INSIDE</span><p>Short module introductions, visual teaching decks, specific practices, and the Core Workbook as a companion resource.</p></div>
            <details className={styles.videoReveal}>
              <summary className={styles.coreVideoSummary}>
                <img src="/assets/core-bridge-poster.png" alt="Iron Compass Core video preview" />
                <span>WATCH THE CORE OVERVIEW · 01:22</span><b>Play video <i>→</i></b>
              </summary>
              <video controls playsInline preload="none" poster="/assets/core-bridge-poster.png"><source src="/assets/core-bridge-sales.mp4" type="video/mp4" />Your browser does not support this video.</video>
            </details>
            <a href={SKOOL.group} target="_blank" rel="noreferrer">See Iron Compass Core inside Iron Compass <b>↗</b></a>
          </article>
        </div>
      </section>

      <section className={styles.methodSection}>
        <p className={styles.eyebrow}>HOW THE TEACHING WORKS</p>
        <div>
          <h2>Watch the room.<br />Work the <em>practice.</em></h2>
          <p>The teaching is built to be used, not collected. A short video puts the work in context. A visual lesson makes it plain. Then there is one practice to carry into an ordinary day.</p>
        </div>
        <ul>
          <li><span>01</span>Short introductions that explain the room you are working on.</li>
          <li><span>02</span>Clear visual teaching decks instead of a long lecture library.</li>
          <li><span>03</span>Practical exercises that belong in real life, not on a shelf.</li>
        </ul>
      </section>

      <section className={styles.founderSection}>
        <div className={styles.founderMark}>CA</div>
        <div>
          <p className={styles.eyebrow}>FROM CHRIS</p>
          <h2>I made this for the part of life you cannot get <em>back.</em></h2>
          <p>I am not standing outside of this work. I am a husband and father who knows what it is like to be physically present while my attention is somewhere else. Iron Compass came out of my own effort to come back, stay in the room, and take better care of the people I love.</p>
          <Link className={styles.quietDarkLink} href="/about">Read Chris’s story <span>→</span></Link>
        </div>
      </section>

      <section className={styles.closing}>
        <p className={styles.eyebrow}>START WHERE LIFE IS ASKING FOR YOU</p>
        <h2>One useful way<br />to come <em>back.</em></h2>
        <p>Start free with the Sunday Board Meeting or the Compass Check. The deeper work is there when you want it.</p>
        <div><a className={styles.primaryButton} href={SKOOL.group} target="_blank" rel="noreferrer">Start free in Iron Compass <span>→</span></a><a href={CONTACT_FORM} target="_blank" rel="noreferrer">Private work with Chris <span>↗</span></a></div>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 Iron Compass Institute</span>
        <nav><a href="#system">The system</a><Link href="/field-guide">Compass Check</Link><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">The work</Link><Link href="/about">About Chris</Link><a href={CONTACT_FORM} target="_blank" rel="noreferrer">Contact Chris</a></nav>
      </footer>
    </main>
  );
}
