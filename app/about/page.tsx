import Link from "next/link";
import { CONTACT_FORM, SKOOL } from "../data";
import styles from "./about.module.css";

export default function AboutChris() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Iron Compass home">
          <span className={styles.mark} aria-hidden="true"><i /><b /></span>
          <span><strong>IRON COMPASS</strong><small>Practical work for the rooms that matter</small></span>
        </Link>
        <nav><Link href="/field-guide">Compass Check</Link><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">The Work</Link></nav>
        <a className={styles.headerAction} href={SKOOL.group} target="_blank" rel="noreferrer">Start free <span>→</span></a>
      </header>

      <section className={styles.hero}>
        <img src="/assets/home-hero-doorway.png" alt="A warmly lit room beyond an open doorway" />
        <div />
        <div className={styles.heroContent}>
          <p>ABOUT CHRIS AVERA</p>
          <h1>Husband.<br />Father.<br /><em>Still coming back.</em></h1>
        </div>
      </section>

      <section className={styles.story}>
        <p className={styles.eyebrow}>THE SHORT VERSION</p>
        <div>
          <p className={styles.lead}>I’m Chris. Husband to Rhea. Father to Isabella, Austin, and Zoe. I run my own companies from a small mountain town in North Carolina.</p>
          <p>For about twelve years, I drifted. I was in the house but not really there, always half a thought somewhere else, usually behind a screen. I found my way back to my family and back to my faith, and this is the work I am sharing: coming back, staying present, and being the man my people actually need in the room.</p>
        </div>
      </section>

      <section className={styles.notes}>
        <p className={styles.sectionNumber}>01</p>
        <div>
          <p className={styles.eyebrow}>WHAT I BELIEVE</p>
          <h2>You do not need a different life.<br />You need to be more <em>inside</em> the one you have.</h2>
          <p className={styles.beliefIntro}>The work has to survive a real week: pressure, people, unfinished things, and a house that needs you. So it stays practical. One clear move. Then another.</p>
          <div className={styles.beliefList}>
            <article><span>01</span><h3>Presence is a practice.</h3><p>You can build it in small moments, even when you do not feel fully ready.</p></article>
            <article><span>02</span><h3>The room feels what you bring into it.</h3><p>A calmer arrival, a pause before reacting, or fifteen undistracted minutes can change more than a speech.</p></article>
            <article><span>03</span><h3>Useful beats impressive.</h3><p>If a tool cannot live in an ordinary Tuesday, it does not belong in the system.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.fromChris}>
        <p className={styles.eyebrow}>FROM CHRIS</p>
        <div>
          <h2>I made this for the part of life you cannot get <em>back.</em></h2>
          <p>I am not standing outside of this work. I am a husband and father who knows what it is like to be physically present while my attention is somewhere else. Iron Compass came out of my own effort to come back, stay in the room, and take better care of the people I love.</p>
          <p>Some of it began as writing about faith, family, and the quiet work of returning. The useful parts became named practices you can actually try. Nothing here asks you to become a project. It asks you to notice what matters and show up for it.</p>
          <span className={styles.signature}>Chris</span>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 Iron Compass Institute</span><nav><Link href="/">Home</Link><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">The work</Link><a href={CONTACT_FORM} target="_blank" rel="noreferrer">Contact Chris</a></nav></footer>
    </main>
  );
}
