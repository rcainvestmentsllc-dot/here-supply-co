import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../components";
import { CHECKOUT, CONTACT_FORM } from "../data";
import { JsonLd } from "../structured-data";
import styles from "./focus.module.css";

export const metadata: Metadata = {
  title: "Focus Protocol | A 72-Hour Attention Reset",
  description: "A private 72-hour reset for husbands and fathers who want to break the phone-checking reflex and bring their attention back home. $29 one time.",
  alternates: { canonical: "/focus" },
  openGraph: {
    title: "Focus Protocol | A 72-Hour Attention Reset",
    description: "Four practical moves for bringing your attention back to the people and rooms that matter.",
    images: [{ url: "/assets/focus-manual-gamma.png", alt: "Focus Protocol presentation by Iron Compass" }],
  },
  twitter: {
    title: "Focus Protocol | A 72-Hour Attention Reset",
    description: "Four practical moves for bringing your attention back to the people and rooms that matter.",
    images: ["/assets/focus-manual-gamma.png"],
  },
};

const focusCheckoutReady = Boolean(CHECKOUT.focus);

const focusProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Focus Protocol",
  description: "A private 72-hour attention reset with a brief introduction and a browser-based visual Field Manual built around four practical moves.",
  image: "https://ironcompassinstitute.com/assets/focus-manual-gamma.png",
  brand: { "@type": "Brand", name: "Iron Compass Institute" },
  category: "Digital educational product",
  ...(focusCheckoutReady ? {
    offers: {
      "@type": "Offer",
      url: CHECKOUT.focus,
      priceCurrency: "USD",
      price: "29.00",
    },
  } : {}),
};

export default function FocusProtocol() {
  return (
    <main id="main-content" className="site">
      <JsonLd data={focusProduct} />
      <Header />
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className="kicker">FOCUS PROTOCOL · $29 ONE TIME</p>
          <h1>Get your attention<br /><em>back in the room.</em></h1>
          <p>A practical 72-hour reset for the man who is physically home but keeps finding his attention somewhere else.</p>
          <div className="hero-buttons">
            {focusCheckoutReady
              ? <a className="button primary" href={CHECKOUT.focus}>Get Focus Protocol · $29 <span>→</span></a>
              : <Link className="button primary" href="/sunday-board#get-board">Start free while checkout opens <span>→</span></Link>}
            <a className="text-link" href="#inside">See what is inside <span>↓</span></a>
          </div>
          <small>{focusCheckoutReady ? "Immediate private access · No subscription · 14-day refund window" : "The paid checkout is not open yet. The free meeting guide is available now."}</small>
        </div>
        <div className={styles.heroVisual}>
          <img src="/assets/focus-manual-gamma.png" alt="Focus Protocol presentation" width="2400" height="1260" fetchPriority="high" decoding="async" />
          <span>3-MINUTE INTRO · BROWSER-BASED VISUAL FIELD MANUAL</span>
        </div>
      </section>

      <section className={styles.problem}>
        <p className="section-label">THE PROBLEM IS NOT JUST THE PHONE</p>
        <div>
          <h2>You can be home<br />and still be <em>somewhere else.</em></h2>
          <p>Work, notifications, feeds, and the reflex to check one more thing can follow you through the door. Focus does not ask you to reject technology or rebuild your life. It gives you four concrete moves to interrupt that reflex and practice being where your feet are.</p>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div>
          <p className="section-label">WATCH THE OVERVIEW</p>
          <h2>A short introduction.<br />Then <em>do the work.</em></h2>
          <p>This is not a long course or a lecture library. Watch the brief introduction, open the browser-based visual Field Manual, and take one move into the next 72 hours.</p>
        </div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Add captions only after an exact transcript is verified. */}
        <video controls playsInline preload="metadata" poster="/assets/focus-manual-gamma.png" aria-label="Focus Protocol overview video">
          <source src="/assets/focus-protocol-sales.mp4" type="video/mp4" />
          Your browser does not support this video.
        </video>
      </section>

      <section className={styles.inside} id="inside">
        <div className={styles.insideHeading}>
          <p className="section-label">WHAT YOU ACTUALLY GET</p>
          <h2>Small enough to use.<br /><em>Clear enough to finish.</em></h2>
        </div>
        <div className={styles.insideGrid}>
          <article><span>01</span><h3>A 3-minute introduction</h3><p>Chris explains the problem, the reset, and how to use the next 72 hours.</p></article>
          <article><span>02</span><h3>A browser-based visual Field Manual</h3><p>The main material is a guided presentation you open in your browser. It is not a separate downloadable PDF.</p></article>
          <article><span>03</span><h3>Four practical moves</h3><p>Remove the color, delete extraction apps, silence everything, and install the Vault.</p></article>
        </div>
      </section>

      <section className={styles.fit}>
        <div>
          <p className="section-label">A GOOD PLACE TO START IF</p>
          <h2>You know distraction is taking<br /><em>more than it should.</em></h2>
        </div>
        <ul>
          <li>You keep reaching for your phone without deciding to.</li>
          <li>You arrive home with part of your mind still at work.</li>
          <li>The people you love are getting your body in the room but not your full attention.</li>
        </ul>
      </section>

      <section className={styles.purchase} id="purchase">
        <div>
          <p className="section-label">FOCUS PROTOCOL</p>
          <h2>One private reset.<br /><em>$29 once.</em></h2>
          <p>You will receive immediate access to the brief introduction and the browser-based visual Field Manual, including all four practical moves.</p>
          <ul><li>Immediate access</li><li>Work at your own pace</li><li>14-day refund window</li></ul>
        </div>
        <div className={styles.purchaseAction}>
          {focusCheckoutReady ? <>
            <strong>$29 <small>one time</small></strong>
            <a className="button primary" href={CHECKOUT.focus}>Get Focus Protocol <span>→</span></a>
            <p>If it is not a useful fit, request a refund within 14 days of purchase. <Link href="/policies#refund">Read the policy.</Link></p>
          </> : <>
            <strong>Checkout is being connected.</strong>
            <Link className="button primary" href="/sunday-board#get-board">Start with the free meeting guide <span>→</span></Link>
            <p>Focus will remain a $29 one-time purchase with a 14-day refund window when checkout opens.</p>
          </>}
        </div>
      </section>

      <section className={styles.faq}>
        <p className="section-label">PLAIN ANSWERS</p>
        <div>
          <details><summary>How is it delivered?</summary><p>After checkout, you are sent directly to an unlisted page with the three-minute introduction and the browser-based visual Field Manual. Save that link.</p></details>
          <details><summary>Is this a subscription?</summary><p>No. Focus Protocol is a one-time purchase with immediate private access.</p></details>
          <details><summary>What if it is not right for me?</summary><p>Request a refund within 14 calendar days of purchase through the <a href={CONTACT_FORM} target="_blank" rel="noreferrer">contact form</a>.</p></details>
        </div>
      </section>

      <section className={styles.quietClose}>
        <p>Not ready to buy?</p>
        <h2>Put the week on the table first.</h2>
        <Link href="/sunday-board#get-board">Start the Sunday Board Meeting <span>→</span></Link>
      </section>
      <Footer />
    </main>
  );
}
