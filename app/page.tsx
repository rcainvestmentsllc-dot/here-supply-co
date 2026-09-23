import { PlainLink as Link } from "./plain-link";
import type { Metadata } from "next";
import { BrandWordmark, Footer, WeeklyGuidePreview } from "./components";
import { CHECKOUT } from "./data";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Here Supply Co. | Resources for Couples to Stay Connected",
  description: "Practical online and printable resources for couples who want more connection, a clearer week, and less life lived in separate heads.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Here Supply Co. | Resources for Couples to Stay Connected",
    description: "Practical online and printable resources for couples who want more connection, a clearer week, and less life lived in separate heads.",
    url: "/",
    siteName: "Here Supply Co.",
    type: "website",
    images: [{ url: "/assets/brand/sunday-board-hero-v1.jpg", width: 1586, height: 992, alt: "A man giving his full attention to a conversation at a coastal home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Here Supply Co. | Resources for Couples to Stay Connected",
    description: "Practical online and printable resources for couples who want more connection, a clearer week, and less life lived in separate heads.",
    images: ["/assets/brand/sunday-board-hero-v1.jpg"],
  },
};

export default function Home() {
  return (
    <main id="main-content" className={styles.home}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Here Supply Co. home">
          <BrandWordmark size="sm" />
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#start">Start here</a>
          <a href="#resources">Resources</a>
          <a href="#offer">The course</a>
          <Link href="/about">About Chris</Link>
        </nav>
        <a className={styles.headerAction} href="#offer">Get the course <span>→</span></a>
      </header>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <a href="#start">Start here</a>
          <a href="#resources">Resources</a>
          <a href="#offer">The course</a>
        <Link href="/about">About</Link>
      </nav>

      {/* Full-bleed hero. The photograph states the problem rather than
          selling a reward: a father on his phone while his daughter waits
          to be watched. */}
      <section className={styles.hero}>
        <img
          className={styles.heroPhoto}
          src="/assets/course/photo/emotional-phone-at-game-v1.jpg"
          alt="A father looking at his phone while his daughter, in uniform, waits for him to watch"
          width="1586"
          height="992"
          fetchPriority="high"
          decoding="async"
        />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}><i aria-hidden="true" />For two people who keep missing each other</p>
            <h1>Your phone is a tool. <em>You are not.</em></h1>
            <p className={styles.lead}>Practical online and printable resources for couples who want more connection, a clearer week, and less life lived in separate heads. Kids or no kids. One of you can start.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/sunday-board#get-board">Start free</Link>
              <Link className={styles.quietLightLink} href="/library">See the full practice</Link>
            </div>
            <p className={styles.heroAssurance}>Free shared weekly guide · Print-first tools · Built by a real couple</p>
          </div>
        </div>
      </section>
      <div className={styles.heroFooter} aria-label="The Here Supply Co. approach">
        <span><b>01 · Notice</b>Name the drift before you try to fix anything else.</span>
        <span><b>02 · Reset</b>Four small moves. Three days. No renegotiation.</span>
        <span><b>03 · Show up</b>Bring a steadier self through the door every night.</span>
      </div>
      <section className={styles.systemIntro} id="resources">
        <p className={styles.eyebrow}>ONE PRACTICAL RESOURCE SYSTEM</p>
        <div>
          <h2>Resources that help couples <em>come back.</em></h2>
          <p>Here Supply Co. has one job: give couples simple tools for noticing the drift, talking about the real week, and returning to each other. Start with the Sunday Board. Go deeper only when it helps.</p>
          <div className={styles.systemLinks}><Link href="/about">Meet Chris and Rhea <span>→</span></Link><Link href="/library">Explore the full course <span>→</span></Link></div>
        </div>
      </section>
      <section className={styles.resourceSystem} aria-label="The Here Supply Co. resource system">
        <article><span>01 · START TOGETHER</span><h2>Sunday Board</h2><p>The free shared conversation and one-page board for getting the week out of two separate heads.</p><Link href="/sunday-board">Start free <b>→</b></Link></article>
        <article><span>02 · LEARN ONLINE</span><h2>All the Way Here</h2><p>Short videos and nine focused lessons for the real places attention and connection get lost.</p><Link href="/library">See the course <b>→</b></Link></article>
        <article><span>03 · WORK OFFLINE</span><h2>The course book</h2><p>A complete print-first book that gathers the course and writing space in one place, so you can mark it up and return to it.</p><Link href="/library#workbook">See what is inside <b>→</b></Link></article>
        <article><span>04 · KEEP CLOSE</span><h2>Resource Pack</h2><p>The Field Card, The Here Week, Sunday Board, and other separate printables for the table, desk, wallet, and glovebox.</p><Link href="/library#kit">See the pack <b>→</b></Link></article>
      </section>
      <section className={styles.startSection} id="start">
        <div className={styles.startArtwork}>
          <WeeklyGuidePreview />
          <span>FREE PRACTICE</span>
        </div>
        <div className={styles.startCopy}>
          <p className={styles.eyebrow}>START WITH A REAL CONVERSATION</p>
          <h2>The Sunday Board <em>Meeting.</em></h2>
          <p>A printable fifteen-minute weekly conversation for two people sharing a life or household, so the calendar, money, kids, connection, and one shared priority are no longer living in two separate heads.</p>
          <dl>
            <div><dt>What it helps with</dt><dd>Connection, the calendar, money, kids, time together, and one shared win.</dd></div>
            <div><dt>What you get</dt><dd>The printable meeting guide. Download it, print one copy, and use it whenever the week starts filling itself. No account and no new system to manage.</dd></div>
          </dl>
          <div className={styles.buttonRow}>
            <Link className={styles.primaryButton} href="/sunday-board">Watch Chris and Rhea + get the guide <span>→</span></Link>
            <Link className={styles.quietDarkLink} href="#offer">Or see the complete course <span>→</span></Link>
          </div>
        </div>
      </section>
      <section className={styles.workSection} id="offer">
        <div className={styles.workHeader}>
          <p className={styles.eyebrow}>ONE COMPLETE COURSE</p>
          <h2>Come back to what is<br /><em>already here.</em></h2>
          <p>All the Way Here opens with the Focus Protocol, three days of getting the phone out of the way, then moves through nine lessons across Return, Lead and Keep. One of you can start it alone. It works better with both.</p>
        </div>

        <div className={styles.offerGrid}>
          <article className={styles.coreOffer}>
            <div className={styles.offerTopline}><span>HERE SUPPLY CO.</span><b>$99 FOUNDING EDITION</b></div>
            <h3>The complete<br /><em>practice.</em></h3>
            <p>Nine grounded lessons for attention, pressure, homecoming, partnership, friendship, and the parts of life that quietly slip away when no one is looking.</p>
            <div className={styles.deliveryNote}><span>WHAT YOU GET</span><p>The 72-hour Focus Protocol, nine short online lessons, the complete print-first course book, and a separate Resource Pack. Start with one pressure point. Keep what holds up.</p></div>
            <p className={styles.offerAssurance}>$99 one time · yours to keep · 14-day refund window</p>
            <a className={styles.buyButton} href={CHECKOUT.core}>Get All the Way Here <b>$99</b></a>
            <p className={styles.afterPay}>
              After you pay, the confirmation page and your receipt email give you the course
              link. Save it or bookmark it so you can return whenever you need it.
            </p>
          </article>
        </div>
      </section>
      <section className={styles.closing}>
        <p className={styles.eyebrow}>START WHERE LIFE IS ASKING FOR YOU</p>
        <h2>One useful way<br />to come <em>back.</em></h2>
        <p>The online course, one-page Field Card, complete print-first course book, and Resource Pack. One payment, yours to keep, with 14 days to change your mind.</p>
        <div><a className={styles.primaryButton} href={CHECKOUT.core}>Get All the Way Here · $99 <span>→</span></a><Link href="/sunday-board#get-board">Or start with the free guide <span>→</span></Link></div>
        <p className={styles.foundingNote}>The first Founding Circle is being invited personally. Start with the free Sunday Board Meeting today.</p>
      </section>
      <Footer />
    </main>
  );
}
