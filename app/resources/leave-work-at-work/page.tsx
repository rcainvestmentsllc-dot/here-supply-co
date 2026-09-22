import { siteUrl } from "../../site-config";
import type { Metadata } from "next";
import { Footer, Header } from "../../components";
import { PlainLink as Link } from "../../plain-link";
import { JsonLd } from "../../structured-data";
import styles from "../article.module.css";
import { SundayBoardSignupForm } from "../../mailerlite-form";

export const metadata: Metadata = {
  title: "How to Leave Work at Work Before You Walk In the Door",
  description: "A short work-to-home transition for putting down the mental spillover before you enter the room with your family.",
  alternates: { canonical: "/resources/leave-work-at-work" },
  openGraph: { title: "How to Leave Work at Work Before You Walk In the Door", description: "A short work-to-home transition you can use today.", url: "/resources/leave-work-at-work" },
};

const articleData = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "How to Leave Work at Work Before You Walk In the Door",
  description: "A short work-to-home transition you can use today.",
  datePublished: "2026-08-28", dateModified: "2026-08-28",
  author: { "@type": "Person", name: "Chris Avera", url: siteUrl("/about") },
  publisher: { "@id": siteUrl("/#organization") },
  mainEntityOfPage: siteUrl("/resources/leave-work-at-work"),
};

export default function LeaveWorkAtWork() {
  return <main id="main-content" className={styles.article}>
    <JsonLd data={articleData} />
    <Header />
    <header className={styles.hero}>
      <Link className={styles.crumb} href="/resources">← Resource guide</Link>
      <p className={styles.eyebrow}>THE WORK-TO-HOME TRANSITION</p>
      <h1>Leave the workday somewhere other than <em>your front room.</em></h1>
      <p className={styles.dek}>You may not be able to finish every problem before you come home. You can decide how you carry those problems through the door.</p>
      <p className={styles.byline}>By Chris Avera · From the All the Way Here Airlock practice</p>
    </header>
    <section className={styles.layout}>
      <aside className={styles.aside}><span>THREE MINUTES</span><p>Park safely. Name what is still open. Slow down. Choose how you want to enter. Then give the first ten seconds at home your full attention.</p><Link href="/library#curriculum">See all nine Core practices →</Link></aside>
      <article className={styles.body}>
        <p>I built this practice because I knew the feeling of being physically home while part of me was still replaying a job, an email, or the problem I had not solved.</p>
        <p>The goal is not to pretend work does not matter. The goal is to create a line between the part of the day that has ended and the room you are about to enter.</p>
        <h2>The parked-car version</h2>
        <div className={styles.steps}>
          <section className={styles.step}><span>01</span><div><h3>Stop before you switch roles</h3><p>Park, set the brake, and turn the engine off. The exercise begins only after the vehicle is safely stopped. Put the phone down.</p></div></section>
          <section className={styles.step}><span>02</span><div><h3>Name what is still open</h3><p>Write or say the unfinished items plainly. Decide the next action and when you will return to it. Your mind does not need to keep rehearsing a problem that now has a place.</p></div></section>
          <section className={styles.step}><span>03</span><div><h3>Let your body arrive</h3><p>Take several slow breaths. Notice your hands, jaw, shoulders, and the pace of your thoughts. You are not trying to become perfectly calm. You are noticing what you are about to bring inside.</p></div></section>
          <section className={styles.step}><span>04</span><div><h3>Choose the entrance</h3><p>Ask one question: `Who do I want to be for the first ten seconds?` Put the phone away, make eye contact, and give a real greeting before you do anything else.</p></div></section>
        </div>
        <h2>If you do not drive home</h2>
        <p>The doorway matters more than the car. A remote worker can close the laptop, write the next work action, walk around the block, and re-enter the house. A commuter can use the final transit stop. A person who walks can pause at the corner. The practice needs a boundary, not a vehicle.</p>
        <div className={styles.note}><strong>A transition is not a promise that you will never bring pressure home.</strong><p>Some days will come through the door with you. On those days, say so honestly, ask for a few minutes if you need them, give a return time, and reconnect. Repair is part of the practice.</p></div>
        <p>Use this for a week and notice the entrance, not a perfect outcome. Did you look up? Did you greet the people in the room? Did unfinished work stop choosing the first moment for you?</p>
      </article>
    </section>
    <section className={styles.capture}>
      <SundayBoardSignupForm source="article_leave_work_at_work" />
    </section>
    <section className={styles.cta}><div><span>ALL THE WAY HERE</span><h2>One practice inside a larger path.</h2></div><div><p>The Airlock is one of nine practical lessons for returning, leading a hard moment, and keeping the parts of life work cannot replace.</p><Link href="/library#curriculum">See the complete course <b>→</b></Link></div></section>
    <Footer />
  </main>;
}
