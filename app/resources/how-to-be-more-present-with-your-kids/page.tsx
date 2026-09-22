import { siteUrl } from "../../site-config";
import type { Metadata } from "next";
import { Footer, Header } from "../../components";
import { PlainLink as Link } from "../../plain-link";
import { JsonLd } from "../../structured-data";
import styles from "../article.module.css";
import { SundayBoardSignupForm } from "../../mailerlite-form";

export const metadata: Metadata = {
  title: "How to Be More Present With Your Kids After Work",
  description: "A small, realistic practice for parents who are home with their kids but still carrying work, pressure, or a divided attention.",
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
  description: "A small, realistic practice for parents who want to bring more attention home.",
  datePublished: "2026-08-28",
  dateModified: "2026-09-02",
  author: { "@type": "Person", name: "Chris Avera", url: siteUrl("/about") },
  publisher: { "@id": siteUrl("/#organization") },
  mainEntityOfPage: siteUrl("/resources/how-to-be-more-present-with-your-kids"),
};

export default function PresentWithKids() {
  return <main id="main-content" className={styles.article}>
    <JsonLd data={articleData} />
    <Header />
    <header className={styles.hero}>
      <Link className={styles.crumb} href="/resources">← Resource guide</Link>
      <p className={styles.eyebrow}>PARENTHOOD AFTER WORK</p>
      <h1>You do not need a perfect evening. Give them <em>one undivided window.</em></h1>
      <p className={styles.dek}>Being home is not always the same as arriving. Start with five to fifteen minutes in your child’s world, without a phone and without turning the moment into another assignment.</p>
      <p className={styles.byline}>By Chris Avera · From the All the Way Here Floor General practice</p>
    </header>

    <section className={styles.layout}>
      <aside className={styles.aside}>
        <span>FIVE TO FIFTEEN MINUTES</span>
        <p>Put the phone away, join your child at their level, let them lead, and end with a clean promise about when you can return.</p>
        <Link href="/library#curriculum">See the full parenthood and family path →</Link>
      </aside>
      <article className={styles.body}>
        <p>I know what it is like to be physically present while my attention is somewhere else. Sometimes the distance is a phone. Sometimes it is work, pressure, or the mental list that never seems to close.</p>
        <p>A child often asks for connection through a look, a question, or a quick, Watch this. They look for our eyes before they look for a perfect answer. When they look up and find us looking down, the screen can feel more important even when that is not what we mean.</p>
        <p>The answer is not guilt and it is not pretending every night will become meaningful family time. Choose one small window that your child can actually feel.</p>

        <h2>Eyes first, then the child-led window</h2>
        <div className={styles.steps}>
          <section className={styles.step}><span>01</span><div><h3>Answer with your eyes</h3><p>When they call your name or ask you to look, set the phone down and meet their eyes. If you cannot stop yet, say exactly when you can and keep that promise.</p></div></section>
          <section className={styles.step}><span>02</span><div><h3>Join their level</h3><p>Sit on the floor, beside them, across the table, in the driveway, or in the passenger seat. The point is closeness that works for both people, not a particular pose.</p></div></section>
          <section className={styles.step}><span>03</span><div><h3>Put the phone in its home</h3><p>Use another room, a drawer, or one visible charging place for the whole window. Allow priority contacts when needed, then let everything else wait.</p></div></section>
          <section className={styles.step}><span>04</span><div><h3>Let them lead</h3><p>Ask what they want to do or talk about. Resist improving the game, teaching a lesson, correcting the story, or steering toward your preferred activity.</p></div></section>
          <section className={styles.step}><span>05</span><div><h3>End cleanly</h3><p>Give a short warning before the time ends. Say what you enjoyed and, if you promise another time, make the promise specific enough to keep.</p></div></section>
        </div>

        <h2>For an older child</h2>
        <p>Presence may look less like play and more like doing something shoulder to shoulder. Drive, cook, fish, walk, fix something, lift, or sit nearby without turning every silence into an interview. An invitation works better than an interrogation. Ask one useful question: Do you want me to listen, help you think, or help you act?</p>

        <div className={styles.note}><strong>Five real minutes can be better than an hour of divided attention.</strong><p>The short window is not a limit on how much time your child deserves. It is a beginning you can keep on a crowded day.</p></div>

        <h2>If you miss it</h2>
        <p>Do not make guilt the main event. Name what happened, put the phone down, and return. Children do not need a parent who performs perfect presence. They need one who notices when they are gone and practices coming back.</p>
        <p className={styles.source}>Research context: a <a href="https://pubmed.ncbi.nlm.nih.gov/39377734/" target="_blank" rel="noreferrer">family mealtime study</a> linked adult phone use with less verbal interaction, and a <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8048888/" target="_blank" rel="noreferrer">scoping review</a> found a mixed but meaningful body of research on parent smartphone use and responsiveness. These findings do not mean one glance harms a relationship. They support making repeated family moments easier to protect.</p>
      </article>
    </section>

    <section className={styles.capture}>

      <SundayBoardSignupForm source="article_how_to_be_more_present_with_your_kids" />

    </section>

    <section className={styles.cta}><div><span>ALL THE WAY HERE</span><h2>Parenthood belongs inside the complete practice.</h2></div><div><p>The Floor General is one of nine lessons for attention, pressure, relationships, parenthood, friendship, and the parts of life work cannot replace.</p><Link href="/library#curriculum">See the complete course <b>→</b></Link></div></section>
    <Footer />
  </main>;
}
