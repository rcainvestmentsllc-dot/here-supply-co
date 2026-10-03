import { PlainLink as Link } from "./plain-link";
import type { Metadata } from "next";
import { BrandWordmark, Footer, WeeklyGuidePreview } from "./components";
import { CHECKOUT } from "./data";
import { HeroClip } from "./hero-clip";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Here Supply Co. | Resources for Couples to Stay Connected",
  description: "Simple tools, online and on paper, for couples who want more connection, a clearer week, and less life lived in separate heads.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Here Supply Co. | Resources for Couples to Stay Connected",
    description: "Simple tools, online and on paper, for couples who want more connection, a clearer week, and less life lived in separate heads.",
    url: "/",
    siteName: "Here Supply Co.",
    type: "website",
    images: [{ url: "/assets/course/photo/movement-lead-v1.jpg", width: 1672, height: 941, alt: "A couple talking at the kitchen table over coffee, a phone face down beside them" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Here Supply Co. | Resources for Couples to Stay Connected",
    description: "Simple tools, online and on paper, for couples who want more connection, a clearer week, and less life lived in separate heads.",
    images: ["/assets/course/photo/movement-lead-v1.jpg"],
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
          <Link href="/sunday-board">Start here</Link>
          <Link href="/library">The course</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/about">About Chris</Link>
        </nav>
        <a className={styles.headerAction} href="#offer">Get the course <span>→</span></a>
      </header>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <Link href="/sunday-board">Start here</Link>
        <Link href="/library">The course</Link>
        <Link href="/resources">Resources</Link>
        <Link href="/about">About</Link>
      </nav>

      {/* Hero. Text on the left, a quiet loop of Chris and Rhea from the real
          Sunday Board video on the right. On a phone the clip sits above. */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}><i aria-hidden="true" />For two people who keep missing each other</p>
            <h1>Get back to the person <em>across the table.</em></h1>
            <p className={styles.lead}>Simple tools, online and on paper, for couples who want more connection, a clearer week, and less life lived in separate heads. Kids or no kids.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/sunday-board#get-board">Start free</Link>
              <Link className={styles.quietLightLink} href="/library">See the $99 course</Link>
            </div>
            <p className={styles.heroAssurance}>Free weekly guide · Printable tools · Made by Chris and Rhea</p>
            <Link className={styles.checkLink} href="/check">Not sure where to start? <b>Take the one minute check →</b></Link>
          </div>
          <HeroClip />
        </div>
      </section>
      <div className={styles.heroFooter} aria-label="The Here Supply Co. approach">
        <span><b>01 · Notice</b>Name the drift before you try to fix anything else.</span>
        <span><b>02 · Reset</b>Four small moves for three days, with no renegotiating.</span>
        <span><b>03 · Show up</b>Bring a steadier self through the door every night.</span>
      </div>
      <section className={styles.systemIntro} id="resources">
        <p className={styles.eyebrow}>WHAT WE MAKE</p>
        <div>
          <h2>Resources that help couples <em>come back.</em></h2>
          <p>Here Supply Co. makes simple tools that help couples notice the drift, talk about the week they are actually having, and find their way back to each other. Start with the free Sunday Board. Go deeper only if it helps.</p>
          <div className={styles.systemLinks}><Link href="/about">Meet Chris and Rhea <span>→</span></Link><Link href="/library">Explore the full course <span>→</span></Link></div>
        </div>
      </section>
      <section className={styles.resourceSystem} aria-label="The Here Supply Co. resource system">
        <article><span>FREE</span><h2>Sunday Board</h2><p>A fifteen minute weekly conversation and a one sheet guide to have it with.</p><Link href="/sunday-board">Start free <b>→</b></Link></article>
        <article><span>$99 COURSE</span><h2>All the Way Here</h2><p>A three day reset, then nine short lessons, one practice each, for the places attention and connection slip at home.</p><Link href="/library">See the course <b>→</b></Link></article>
        <article><span>INCLUDED WITH THE COURSE</span><h2>The course book</h2><p>The whole course in one 25 page book with room to write, so you can print it and mark it up together.</p><Link href="/library#curriculum">See what is inside <b>→</b></Link></article>
        <article><span>INCLUDED WITH THE COURSE</span><h2>Resource Pack</h2><p>Twelve one page sheets plus three family tools, made to live on the table, the desk, the fridge, and in the glovebox.</p><Link href="/library#kit">See the pack <b>→</b></Link></article>
      </section>
      <section className={styles.startSection} id="start">
        <div className={styles.startArtwork}>
          <WeeklyGuidePreview />
          <span>FREE PRACTICE</span>
        </div>
        <div className={styles.startCopy}>
          <p className={styles.eyebrow}>START WITH A REAL CONVERSATION</p>
          <h2>The Sunday Board <em>Meeting.</em></h2>
          <p>A printable fifteen minute weekly conversation for two people sharing a life. You start with how you are both doing, then put the calendar, money, kids, and one shared priority on the same page.</p>
          <dl>
            <div><dt>What it helps with</dt><dd>Connection, the calendar, money, kids, time together, and one shared win.</dd></div>
            <div><dt>What you get</dt><dd>The printable guide and a five minute video of Chris and Rhea doing one. No account needed.</dd></div>
          </dl>
          <div className={styles.buttonRow}>
            <Link className={styles.primaryButton} href="/sunday-board">Watch Chris and Rhea + get the guide <span>→</span></Link>
            <Link className={styles.quietDarkLink} href="#offer">Or see the course <span>→</span></Link>
          </div>
        </div>
      </section>
      <section className={styles.workSection} id="offer">
        <div className={styles.workHeader}>
          <p className={styles.eyebrow}>THE COURSE</p>
          <h2>Come back to what is<br /><em>already here.</em></h2>
          <p>All the Way Here opens with the Focus Protocol, three days of getting the phone out of the way. Then nine lessons on how you get home from work, handle pressure, date, parent, and keep friends.</p>
        </div>

        <div className={styles.offerGrid}>
          <article className={styles.coreOffer}>
            <div className={styles.offerTopline}><span>HERE SUPPLY CO.</span><b>$99 FOUNDING PRICE</b></div>
            <h3>All the Way<br /><em>Here.</em></h3>
            <p>Nine short lessons, each built around one thing you do this week.</p>
            <div className={styles.deliveryNote}><span>WHAT YOU GET</span><p>The 72 hour Focus Protocol, nine short online lessons, a 25 page course book to print, and the Resource Pack. Start where it hurts most and keep what helps.</p></div>
            <p className={styles.offerAssurance}>$99 one time · yours to keep · 14 day refund window</p>
            <a className={styles.buyButton} href={CHECKOUT.core}>Get All the Way Here <b>$99</b></a>
            <p className={styles.afterPay}>
              After you pay, your receipt email has a button that opens the course and a password for any other device. Bookmark the course once it opens.
            </p>
            <p className={styles.afterPay}>Not ready? <Link href="/sunday-board#get-board">Start with the free Sunday Board guide</Link>.</p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
