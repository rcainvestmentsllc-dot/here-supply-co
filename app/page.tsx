import Link from "next/link";
import { CONTACT_FORM, SKOOL } from "./data";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Iron Compass home">
          <span className={styles.mark} aria-hidden="true"><i /><b /></span>
          <span><strong>IRON COMPASS</strong><small>Tools for a steadier life at home</small></span>
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#the-path">The path</a>
          <Link href="/library">The work</Link>
          <Link href="/about">About Chris</Link>
        </nav>
        <a className={styles.headerAction} href={SKOOL.group} target="_blank" rel="noreferrer">Start free <span>→</span></a>
      </header>
      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <Link href="/field-guide">Compass Check</Link>
        <Link href="/sunday-board">Sunday Board Meeting</Link>
        <Link href="/library">The work</Link>
        <Link href="/about">About Chris</Link>
      </nav>

      <section className={styles.hero}>
        <img className={styles.heroImage} src="/assets/home-hero-doorway.png" alt="A man pausing at the entrance to a warmly lit room" />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>PRACTICAL WORK FOR HUSBANDS &amp; FATHERS</p>
          <h1>Make more room for <em>what matters.</em></h1>
          <p className={styles.lead}>Iron Compass gives you useful tools for the moments when work, distraction, and pressure are taking more than they should.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={SKOOL.group} target="_blank" rel="noreferrer">Start free in Iron Compass <span>→</span></a>
            <Link className={styles.quietLightLink} href="/field-guide">Or take the Compass Check <span>→</span></Link>
          </div>
        </div>
        <p className={styles.heroNote}>No subscription. Start with one useful thing.</p>
      </section>

      <section className={styles.introduction} id="how-it-works">
        <p className={styles.eyebrow}>A SIMPLE IDEA</p>
        <div>
          <h2>Good intentions need a place to <em>land.</em></h2>
          <p>Iron Compass is a private library of practical tools for men who want more of themselves available at home. Create a free account, start with one useful thing, and go deeper only when it earns a place in your life.</p>
        </div>
      </section>

      <section className={styles.startSection}>
        <div className={styles.startArtwork}>
          <img src="/assets/sunday-board-gamma.png" alt="The Sunday Board Meeting worksheet" />
        </div>
        <div className={styles.startCopy}>
          <p className={styles.eyebrow}>START HERE · FREE</p>
          <h2>The Sunday Board <em>Meeting.</em></h2>
          <p>A printable fifteen-minute check-in for couples who want to get on the same page before the week starts running them.</p>
          <p className={styles.smallPrint}>Your free Iron Compass account includes the printable and Chris and Rhea’s short walkthrough. Use it at the table. Come back next Sunday.</p>
          <div className={styles.buttonRow}>
            <a className={styles.primaryButton} href={SKOOL.group} target="_blank" rel="noreferrer">Create your free account <span>→</span></a>
            <Link className={styles.quietDarkLink} href="/field-guide">Need a quick reset? Take the Compass Check <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.pathSection} id="the-path">
        <div className={styles.pathHeading}>
          <p className={styles.eyebrow}>IF ONE TOOL HELPS</p>
          <h2>There is a clear next <em>step.</em></h2>
          <p>Go deeper only when the work earns it. Both programs are one-time purchases and live in a private library.</p>
        </div>
        <div className={styles.pathCards}>
          <article className={styles.focusCard}>
            <span>01 · $29 ONE TIME</span>
            <h3>Focus<br />Protocol</h3>
            <p>For the man whose attention keeps leaving the room. A short, practical reset for getting your phone and your focus back under your direction.</p>
            <details className={styles.videoReveal}>
              <summary className={styles.focusVideoSummary}><img src="/assets/focus-manual-gamma.png" alt="The Focus Protocol Field Manual" /><span>WATCH THE FOCUS OVERVIEW · 03:28</span><b>Play video <i>→</i></b></summary>
              <video controls playsInline preload="none" poster="/assets/home-hero-doorway.png"><source src="/assets/focus-protocol-sales.mp4" type="video/mp4" />Your browser does not support this video.</video>
            </details>
            <a href={SKOOL.group} target="_blank" rel="noreferrer">See Focus inside Iron Compass <b>↗</b></a>
          </article>
          <article className={styles.coreCard}>
            <span>02 · $249 ONE TIME</span>
            <h3>Iron Compass<br />Core</h3>
            <p>Focus Protocol gets your attention back. Core is where you build the rest of the system: pressure, home, marriage, family connection, friendship, and the practices that hold them together.</p>
            <details className={styles.videoReveal}>
              <summary className={styles.coreVideoSummary}><strong>WHAT COMES NEXT<br /><em>AFTER FOCUS</em></strong><span>AN INTRODUCTION TO IRON COMPASS CORE · 01:22</span><b>Play video <i>→</i></b></summary>
              <video controls playsInline preload="none" poster="/assets/home-hero-doorway.png"><source src="/assets/core-bridge-sales.mp4" type="video/mp4" />Your browser does not support this video.</video>
            </details>
            <a href={SKOOL.group} target="_blank" rel="noreferrer">See Core inside Iron Compass <b>↗</b></a>
          </article>
        </div>
      </section>

      <section className={styles.closing}>
        <p className={styles.eyebrow}>START WITH WHAT IS IN FRONT OF YOU</p>
        <h2>One useful way<br />to come <em>back.</em></h2>
        <p>Start free with the Sunday Board Meeting. The deeper work is there when you want it.</p>
        <a className={styles.primaryButton} href={SKOOL.group} target="_blank" rel="noreferrer">Start free in Iron Compass <span>→</span></a>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 Iron Compass Institute</span>
        <nav><Link href="/field-guide">Compass Check</Link><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">The work</Link><Link href="/about">About Chris</Link><a href={CONTACT_FORM} target="_blank" rel="noreferrer">Contact Chris</a></nav>
      </footer>
    </main>
  );
}
