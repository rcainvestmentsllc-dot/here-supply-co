import { siteUrl } from "../../site-config";
import type { Metadata } from "next";
import { Footer, Header } from "../../components";
import { PlainLink as Link } from "../../plain-link";
import { JsonLd } from "../../structured-data";
import styles from "../article.module.css";
import { SundayBoardSignupForm } from "../../mailerlite-form";

export const metadata: Metadata = {
  title: "Everyone Needs a Third Place (Mine Is a Sauna)",
  description: "A sauna conversation about friendship, belonging, and why both of you need somewhere besides home and work.",
  alternates: { canonical: "/resources/everyone-needs-a-third-place" },
  openGraph: {
    title: "Everyone Needs a Third Place (Mine Is a Sauna)",
    description: "A sauna conversation about friendship, belonging, and the places where people know you.",
    url: "/resources/everyone-needs-a-third-place",
  },
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Everyone Needs a Third Place (Mine Is a Sauna)",
  description: "A sauna conversation about friendship, belonging, and the places where people know you.",
  datePublished: "2026-08-28",
  dateModified: "2026-08-28",
  author: { "@type": "Person", name: "Chris Avera", url: siteUrl("/about") },
  publisher: { "@id": siteUrl("/#organization") },
  mainEntityOfPage: siteUrl("/resources/everyone-needs-a-third-place"),
};

export default function WhyMenNeedAThirdPlace() {
  return <main id="main-content" className={styles.article}>
    <JsonLd data={articleData} />
    <Header />
    <header className={styles.hero}>
      <Link className={styles.crumb} href="/resources">← Resource guide</Link>
      <p className={styles.eyebrow}>A STORY FROM CHRIS</p>
      <h1>Everyone needs a <em>third place.</em> Mine is a sauna.</h1>
      <p className={styles.dek}>Somewhere besides home and work where people know your face, conversation happens without an agenda, and your phone is the least interesting thing in the room.</p>
      <p className={styles.byline}>By Chris Avera · A real moment from the gym and sauna</p>
    </header>
    <section className={styles.layout}>
      <aside className={styles.aside}>
        <span>THE WHOLE IDEA</span>
        <p>Find one place you return to often enough for other people to know you. The place matters less than the returning.</p>
        <Link href="/library#curriculum">Preview the course →</Link>
      </aside>
      <article className={styles.body}>
        <p>I was in the cold plunge with my eyes closed when something touched my hand. I ran through the possibilities, opened my eyes, and found one of the guys giving me a fist bump.</p>
        <p>The same group of us moved to the sauna afterward. Age came up. I said I was 47. One of the younger guys looked at me, surprised, and said he hoped he would be as put together when he reached my age.</p>
        <p>I took it as a compliment. What stayed with me was something else: the plain fact that a few men of different ages were sitting in the same hot room, talking with nowhere else to be for a while.</p>
        <h2>Home, work, and somewhere else</h2>
        <p>Most of us have home and work. I think we also need somewhere else, and so does the person we share a life with.</p>
        <p>Mine is the gym and the sauna. Yours might be a trail, a dock, a church basement, a volunteer crew, or the same garage with the same few friends on Friday. The shape does not matter very much. The fact that you go there does.</p>
        <p>With screens and AI threaded through nearly everything, face to face connection is easy to treat as optional. In the sauna, the people come first and the phone stays in the locker.</p>
        <h2>Do not turn it into another project</h2>
        <p>You do not need to launch a group, build a network, or become the social director. Start smaller. Choose one real place. Go back at roughly the same time. Learn a name. Let familiarity do some of the work.</p>
        <div className={styles.note}>
          <strong>The place is not valuable because it is impressive.</strong>
          <p>It is valuable because you show up often enough to be known, and because someone would notice if you stopped coming.</p>
        </div>
        <p>If you already have a third place, protect it. If you do not, look for one this week. That is the whole point.</p>
      </article>
    </section>
    <section className={styles.capture}>
      <SundayBoardSignupForm source="article_why_men_need_a_third_place" />
    </section>
    <section className={styles.cta}>
      <div><span>ALL THE WAY HERE</span><h2>Keep what work cannot replace.</h2></div>
      <div><p>The Third Place is one of nine short lessons in All the Way Here, a course on how you put the phone down, get home from work, handle pressure, date, parent, and keep friends.</p><Link href="/library#curriculum">See the complete course <b>→</b></Link></div>
    </section>
    <Footer />
  </main>;
}
