import type { Metadata } from "next";
import { Footer, Header } from "../../components";
import { PlainLink as Link } from "../../plain-link";
import { JsonLd } from "../../structured-data";
import styles from "../article.module.css";

export const metadata: Metadata = {
  title: "How to Be More Present With Your Kids After Work",
  description: "A small, realistic practice for fathers who are home with their kids but still carrying work, pressure, or a divided attention.",
  alternates: { canonical: "/resources/how-to-be-more-present-with-your-kids" },
  openGraph: {
    title: "How to Be More Present With Your Kids After Work",
    description: "Five to fifteen minutes of child-led, phone-free attention that can fit an ordinary evening.",
    url: "/resources/how-to-be-more-present-with-your-kids",
  },
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Be More Present With Your Kids After Work",
  description: "A small, realistic practice for fathers who want to bring more attention home.",
  datePublished: "2026-08-28",
  dateModified: "2026-08-28",
  author: { "@type": "Person", name: "Chris Avera", url: "https://ironcompassinstitute.com/about" },
  publisher: { "@id": "https://ironcompassinstitute.com/#organization" },
  mainEntityOfPage: "https://ironcompassinstitute.com/resources/how-to-be-more-present-with-your-kids",
};

export default function PresentWithKids() {
  return <main id="main-content" className={styles.article}>
    <JsonLd data={articleData} />
    <Header />
    <header className={styles.hero}>
      <Link className={styles.crumb} href="/resources">← Resource guide</Link>
      <p className={styles.eyebrow}>FATHERHOOD AFTER WORK</p>
      <h1>You do not need a perfect evening. Give them <em>one undivided window.</em></h1>
      <p className={styles.dek}>Being home is not always the same as arriving. Start with five to fifteen minutes in your child’s world, without a phone and without turning the moment into another assignment.</p>
      <p className={styles.byline}>By Chris Avera · From the Iron Compass Floor General practice</p>
    </header>

    <section className={styles.layout}>
      <aside className={styles.aside}>
        <span>FIVE TO FIFTEEN MINUTES</span>
        <p>Put the phone away, join your child at their level, let them lead, and end with a clean promise about when you can return.</p>
        <Link href="/library#curriculum">See the full fatherhood and family path →</Link>
      </aside>
      <article className={styles.body}>
        <p>I know what it is like to be physically present while my attention is somewhere else. Sometimes the distance is a phone. Sometimes it is work, pressure, or the mental list that never seems to close.</p>
        <p>The answer is not pretending every night will become meaningful family time. Choose one small window that your child can actually feel.</p>

        <h2>The child-led window</h2>
        <div className={styles.steps}>
          <section className={styles.step}><span>01</span><div><h3>Make the phone unavailable</h3><p>Put it in another room or on its landing place. If you must remain reachable, allow the important contacts and keep everything else quiet.</p></div></section>
          <section className={styles.step}><span>02</span><div><h3>Join their level</h3><p>Sit on the floor, beside them, across the table, in the driveway, or in the passenger seat. The point is closeness that works for both people, not a particular pose.</p></div></section>
          <section className={styles.step}><span>03</span><div><h3>Let them lead</h3><p>Ask what they want to do or talk about. Resist improving the game, teaching a lesson, correcting the story, or steering toward your preferred activity.</p></div></section>
          <section className={styles.step}><span>04</span><div><h3>End cleanly</h3><p>Give a short warning before the time ends. Say what you enjoyed and, if you promise another time, make the promise specific enough to keep.</p></div></section>
        </div>

        <h2>For an older child</h2>
        <p>Presence may look less like play and more like doing something shoulder to shoulder. Drive, cook, fish, walk, fix something, lift, or sit nearby without turning every silence into an interview. An invitation works better than an interrogation.</p>

        <div className={styles.note}><strong>Five real minutes can be better than an hour of divided attention.</strong><p>The short window is not a limit on how much time your child deserves. It is a beginning you can keep on a crowded day.</p></div>

        <h2>If you miss it</h2>
        <p>Do not make guilt the main event. Name what happened, put the phone down, and return. Children do not need a father who performs perfect presence. They need one who notices when he is gone and practices coming back.</p>
      </article>
    </section>

    <section className={styles.cta}><div><span>IRON COMPASS CORE</span><h2>Fatherhood is one room inside the complete practice.</h2></div><div><p>The Floor General is one of nine lessons for attention, pressure, marriage, fatherhood, friendship, and the parts of life work cannot replace.</p><Link href="/library#curriculum">See the complete Core curriculum <b>→</b></Link></div></section>
    <Footer />
  </main>;
}
