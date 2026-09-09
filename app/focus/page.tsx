import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header } from "../components";
import styles from "./focus.module.css";

export const metadata: Metadata = {
  title: "The Attention Reset Is Now Inside All the Way Here",
  description: "The strongest Focus practices are now included inside the complete Here Supply Co. course, All the Way Here.",
  alternates: { canonical: "/library" },
  robots: { index: false, follow: true },
};

export default function FocusBridge() {
  return <main id="main-content" className="site">
    <Header />
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className="kicker">ONE COURSE, NOT ANOTHER DECISION</p>
        <h1>Focus is now part of<br /><em>the complete practice.</em></h1>
        <p>The attention reset has not disappeared. Its strongest four moves now open All the Way Here, so you do not have to choose between a small product and the full course.</p>
        <div className="hero-buttons">
          <Link className="button primary" href="/library">See All the Way Here · $99 <span>→</span></Link>
          <Link className="text-link" href="/sunday-board#get-board">Start with the free guide <span>→</span></Link>
        </div>
      </div>
      <div className={styles.heroVisual}>
        <figure>
          <img src="/assets/products/focus-protocol-art.jpg" alt="A phone and everyday objects left behind while a person returns to the ocean" width="1672" height="942" />
          <figcaption><b>THE ATTENTION RESET</b><span>NOTICE THE REFLEX · MAKE ONE CLEAR CHOICE · RETURN TO REAL LIFE</span></figcaption>
        </figure>
      </div>
    </section>
    <section className={styles.problem}>
      <p className="section-label">WHAT CHANGED</p>
      <div><h2>Less friction.<br /><em>More value.</em></h2><p>Instead of selling the 72-hour reset separately, Here Supply Co. includes it with the full Return, Lead, Keep course and editable workbook. One free practice leads to one complete paid experience.</p></div>
    </section>
    <Footer />
  </main>;
}
