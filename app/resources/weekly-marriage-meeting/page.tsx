import type { Metadata } from "next";
import { Footer, Header } from "../../components";
import { PlainLink as Link } from "../../plain-link";
import { JsonLd } from "../../structured-data";
import styles from "../article.module.css";

export const metadata: Metadata = {
  title: "A 15-Minute Weekly Marriage Meeting Agenda",
  description: "A simple weekly marriage meeting agenda for getting the calendar, kids, money, connection, and one shared priority onto the same page.",
  alternates: { canonical: "/resources/weekly-marriage-meeting" },
  openGraph: { title: "A 15-Minute Weekly Marriage Meeting Agenda", description: "A practical agenda you and your wife can finish in fifteen minutes.", url: "/resources/weekly-marriage-meeting" },
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "A 15-Minute Weekly Marriage Meeting Agenda",
  description: "A practical agenda you and your wife can finish in fifteen minutes.",
  datePublished: "2026-08-28",
  dateModified: "2026-08-28",
  author: { "@type": "Person", name: "Chris Avera", url: "https://ironcompassinstitute.com/about" },
  publisher: { "@id": "https://ironcompassinstitute.com/#organization" },
  mainEntityOfPage: "https://ironcompassinstitute.com/resources/weekly-marriage-meeting",
};

export default function WeeklyMarriageMeeting() {
  return <main id="main-content" className={styles.article}>
    <JsonLd data={articleData} />
    <Header />
    <header className={styles.hero}>
      <Link className={styles.crumb} href="/resources">← Resource guide</Link>
      <p className={styles.eyebrow}>A PRACTICAL WEEKLY AGENDA</p>
      <h1>A marriage meeting you can actually finish in <em>15 minutes.</em></h1>
      <p className={styles.dek}>Get the week out of two separate heads without turning Sunday into a boardroom, an argument, or another task system.</p>
      <p className={styles.byline}>By Chris Avera · Husband, father, and small-business owner</p>
    </header>
    <section className={styles.layout}>
      <aside className={styles.aside}><span>THE SHORT VERSION</span><p>Phones away. One notebook. Fifteen minutes. Start with something good, make the week visible, and choose one thing to protect together.</p><Link href="/sunday-board#get-board">Get the printable guide →</Link></aside>
      <article className={styles.body}>
        <p>A weekly marriage meeting does not need business language, a spreadsheet, or a performance score. It needs a small container where both people can see what the next seven days are asking of them.</p>
        <p>My wife and I do not need another system to manage. We need a place to put the things that otherwise live in separate heads until they turn into last-minute friction.</p>
        <h2>The fifteen-minute agenda</h2>
        <div className={styles.steps}>
          <section className={styles.step}><span>01</span><div><h3>Start with one good thing</h3><p>Take two minutes. Each person names one thing they appreciated about the other person or one bright spot from the week. This changes the opening from evaluation to connection.</p></div></section>
          <section className={styles.step}><span>02</span><div><h3>Ask how you are doing</h3><p>Take three minutes. Each person answers without interruption. If you use a one-to-ten number, do not argue with the score. Ask what might move it one point.</p></div></section>
          <section className={styles.step}><span>03</span><div><h3>Put the house and week on the table</h3><p>Take six minutes. Cover the calendar, kids, meals, money, projects, and the pressure points that could surprise either of you. Decide what can be removed, not only what must be added.</p></div></section>
          <section className={styles.step}><span>04</span><div><h3>Choose one thing to protect</h3><p>Take four minutes. Name one shared priority for the relationship, family, or week. Put a real time beside it before the calendar fills itself.</p></div></section>
        </div>
        <h2>Ground rules that keep it human</h2>
        <ul className={styles.rules}>
          <li>Use a timer. A short meeting is easier to repeat.</li>
          <li>Let one person finish before the other responds.</li>
          <li>Do not solve a serious relationship issue under a fifteen-minute deadline.</li>
          <li>Park one unresolved item and choose a better time to return to it.</li>
          <li>Make affection or intimacy questions optional, not a weekly performance review.</li>
          <li>End with one clear decision, not a longer list.</li>
        </ul>
        <div className={styles.note}><strong>This is a planning and connection practice, not counseling.</strong><p>If a conversation feels unsafe, coercive, or impossible to have without escalation, use qualified support instead of forcing the agenda.</p></div>
        <p>The point is not to run your marriage like a company. The point is to see the same week while there is still time to shape it together.</p>
      </article>
    </section>
    <section className={styles.cta}><div><span>THE SUNDAY BOARD MEETING</span><h2>Put the guide between you.</h2></div><div><p>Get the free printable version of this agenda, then use it together this Sunday.</p><Link href="/sunday-board#get-board">Get the free meeting guide <b>→</b></Link></div></section>
    <Footer />
  </main>;
}
