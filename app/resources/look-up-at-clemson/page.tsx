import { siteUrl } from "../../site-config";
import type { Metadata } from "next";
import { Footer, Header } from "../../components";
import { PlainLink as Link } from "../../plain-link";
import { JsonLd } from "../../structured-data";
import styles from "../article.module.css";

export const metadata: Metadata = {
  title: "What Felt Different When I Returned to Clemson",
  description: "A personal story about looking down, missed openings for connection, and three small ways to make looking up the default again.",
  alternates: { canonical: "/resources/look-up-at-clemson" },
  openGraph: {
    title: "What Felt Different When I Returned to Clemson",
    description: "The campus looked familiar, but the energy did not. A story and three practical ways to look up again.",
    url: "/resources/look-up-at-clemson",
  },
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Felt Different When I Returned to Clemson",
  description: "A personal story about eye contact, ordinary openings, and making looking up a practice.",
  datePublished: "2026-09-02",
  dateModified: "2026-09-02",
  author: { "@type": "Person", name: "Chris Avera", url: siteUrl("/about") },
  publisher: { "@id": siteUrl("/#organization") },
  mainEntityOfPage: siteUrl("/resources/look-up-at-clemson"),
};

export default function LookUpAtClemson() {
  return <main id="main-content" className={styles.article}>
    <JsonLd data={articleData} />
    <Header />
    <header className={styles.hero}>
      <Link className={styles.crumb} href="/resources">← Resource guide</Link>
      <p className={styles.eyebrow}>LOOKING DOWN BECAME THE DEFAULT</p>
      <h1>The campus looked familiar.<br />The energy <em>did not.</em></h1>
      <p className={styles.dek}>This is not a complaint about students or a claim that phones ruined a campus. It is about the ordinary openings that disappear when nobody looks up.</p>
      <p className={styles.byline}>By Chris Avera · A personal Here Supply Co. field note</p>
    </header>

    <section className={styles.layout}>
      <aside className={styles.aside}>
        <span>TRY ONE WALK</span>
        <p>Keep the phone in your pocket for one familiar stretch. Look at the place, meet one person&apos;s eyes, and leave room for one ordinary hello.</p>
        <Link href="/access/focus-7f3k9q">Open the Attention Reset →</Link>
      </aside>
      <article className={styles.body}>
        <p>When I went back to Clemson, I felt the difference before I had words for it. The campus looked familiar, but the energy did not. So many students were walking with their heads down, absorbed in their phones. There was less eye contact, less awareness of the people passing by, and fewer small openings for a hello.</p>
        <p>I thought about how many friendships, conversations, and relationships begin in those ordinary moments. I could not know what the campus felt like to the students living there now, but something seemed missing from the place I remembered. Everyone was connected to something, yet the campus somehow felt less connected.</p>

        <h2>The phone is useful. The default is the problem.</h2>
        <p>A phone can help a student navigate, call home, meet up with a friend, finish work, or find support. The problem is not carrying one. It is when every unclaimed second disappears into it before a choice is made.</p>
        <p>Somewhere inside those unclaimed seconds are the first hello to a friend, the person who becomes a collaborator, and sometimes the relationship that changes a life. None of that can be guaranteed by putting a phone away. Looking up simply makes the opening possible.</p>

        <h2>Three ways to look up again</h2>
        <div className={styles.steps}>
          <section className={styles.step}><span>01</span><div><h3>Walk one stretch without the phone in hand</h3><p>Choose the path from the parking lot, one block, or the walk between two buildings. Keep directions available when needed, then put the screen away.</p></div></section>
          <section className={styles.step}><span>02</span><div><h3>Eyes first. Make one ordinary opening.</h3><p>Meet someone&apos;s eyes. Say hello. Ask the person beside you a real, low-pressure question. Connection usually begins more plainly than we imagine.</p></div></section>
          <section className={styles.step}><span>03</span><div><h3>Use the phone to make the plan</h3><p>Text the invitation, choose the place, and set the time. Then let the actual conversation happen without the feed sitting between you.</p></div></section>
        </div>

        <div className={styles.note}><strong>This is not about becoming anti-technology.</strong><p>It is about making sure a tool helps you reach a person instead of quietly replacing the chance to meet one.</p></div>
      </article>
    </section>

    <section className={styles.cta}><div><span>THE ATTENTION RESET</span><h2>Change the default before you test your discipline.</h2></div><div><p>Grayscale, quieter feeds, a physical phone home, and three days of noticing give you a practical place to begin.</p><Link href="/library">See the complete course <b>→</b></Link></div></section>
    <Footer />
  </main>;
}
