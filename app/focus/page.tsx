import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
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
    description: "Four practical moves for bringing your attention back to real life and the people you love.",
    images: [{ url: "/assets/focus-protocol-poster.jpg", alt: "Chris Avera introducing Focus Protocol" }],
  },
  twitter: {
    title: "Focus Protocol | A 72-Hour Attention Reset",
    description: "Four practical moves for bringing your attention back to real life and the people you love.",
    images: ["/assets/focus-protocol-poster.jpg"],
  },
};

const focusCheckoutReady = Boolean(CHECKOUT.focus);

const focusProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Focus Protocol",
  description: "A private 72-hour attention reset delivered as a browser-based visual guide built around four practical moves.",
  image: "https://ironcompassinstitute.com/assets/focus-protocol-poster.jpg",
  brand: { "@type": "Brand", name: "Iron Compass" },
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
          <h1>Get your attention<br /><em>back.</em></h1>
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
          <div className={styles.manualCover} aria-label="Preview of the Focus Protocol visual guide">
            <header><span>72-HOUR GUIDE</span><b>FOCUS</b></header>
            <div><small>FOCUS PROTOCOL</small><strong>GET YOUR<br />ATTENTION<br />BACK.</strong><p>Four practical moves for returning to real life.</p></div>
            <footer><span>NOTICE</span><span>CHOOSE</span><span>RETURN</span></footer>
          </div>
          <span>THE ACTUAL VISUAL SYSTEM · DELIVERED IN YOUR BROWSER</span>
        </div>
      </section>

      <section className={styles.problem}>
        <p className="section-label">THE PROBLEM IS NOT JUST THE PHONE</p>
        <div>
          <h2>You can be home<br />and still be <em>somewhere else.</em></h2>
          <p>Work, notifications, feeds, and the reflex to check one more thing can follow you home. Focus does not ask you to reject technology or rebuild your life. It gives you four concrete moves to interrupt that reflex and choose what gets your attention.</p>
          <p className={styles.drivingNote}><strong>The reflex does not know when the stakes have changed.</strong> The same downward glance that steals a moment on the couch can follow us to a red light or a moving car. This is not about scolding people. It is about taking back the decision of where your eyes and attention go.</p>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div>
          <p className="section-label">WATCH BEFORE YOU BUY</p>
          <h2>See the reset.<br />Then decide if it <em>fits.</em></h2>
          <p>Chris explains why the checking reflex is so hard to notice and what the next 72 hours are designed to change. The paid product is the visual guide with the four moves below.</p>
        </div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Add captions only after an exact transcript is verified. */}
        <video controls playsInline preload="metadata" poster="/assets/focus-protocol-poster.jpg" aria-label="Focus Protocol overview video">
          <source src="/assets/focus-protocol-sales.mp4" type="video/mp4" />
          Your browser does not support this video.
        </video>
      </section>

      <section className={styles.inside} id="inside">
        <div className={styles.insideHeading}>
          <p className="section-label">INSIDE THE 72-HOUR RESET</p>
          <h2>Four moves.<br /><em>No filler.</em></h2>
        </div>
        <div className={styles.insideGrid}>
          <article><span>01</span><h3>Remove the Color</h3><p>Switch the phone to grayscale so feeds and icons lose some of their pull.</p></article>
          <article><span>02</span><h3>Delete Extraction Apps</h3><p>Remove the apps built to turn every spare second into scrolling.</p></article>
          <article><span>03</span><h3>Silence Everything</h3><p>Keep only VIP calls and texts so platforms stop choosing your next interruption.</p></article>
          <article><span>04</span><h3>Install the Vault</h3><p>Put the phone in a drawer from your chosen Vault time until the kids are asleep.</p></article>
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
          <li>The people you love can tell when only part of you is there.</li>
        </ul>
      </section>

      <section className={styles.purchase} id="purchase">
        <div>
          <p className="section-label">FOCUS PROTOCOL</p>
          <h2>One private reset.<br /><em>$29 once.</em></h2>
          <p>You will receive immediate private access to the browser-based visual guide containing all four practical moves.</p>
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
          <details><summary>How is it delivered?</summary><p>After checkout, you are sent directly to an unlisted page with the browser-based visual guide. Save that link. There is no course account or app to manage.</p></details>
          <details><summary>Is this a subscription?</summary><p>No. Focus Protocol is a one-time purchase with immediate private access.</p></details>
          <details><summary>What if it is not right for me?</summary><p>Request a refund within 14 calendar days of purchase through the <a href={CONTACT_FORM}>contact form</a>.</p></details>
        </div>
      </section>

      <section className={styles.quietClose}>
        <p>Not ready to buy?</p>
        <h2>Put the week on the table first.</h2>
        <Link href="/sunday-board#get-board">Get the free weekly guide <span>→</span></Link>
      </section>
      <Footer />
    </main>
  );
}
