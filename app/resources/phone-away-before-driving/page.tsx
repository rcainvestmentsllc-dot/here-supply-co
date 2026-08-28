import type { Metadata } from "next";
import { Footer, Header } from "../../components";
import { PlainLink as Link } from "../../plain-link";
import { JsonLd } from "../../structured-data";
import styles from "../article.module.css";

export const metadata: Metadata = {
  title: "Put the Phone Away Before the Car Moves",
  description: "A practical distracted-driving setup for handling navigation, important contacts, and the downward glance before the vehicle moves.",
  alternates: { canonical: "/resources/phone-away-before-driving" },
  openGraph: { title: "Put the Phone Away Before the Car Moves", description: "The same automatic glance has different stakes behind the wheel.", url: "/resources/phone-away-before-driving" },
};

const articleData = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Put the Phone Away Before the Car Moves",
  description: "The same automatic glance has different stakes behind the wheel.",
  datePublished: "2026-08-28", dateModified: "2026-08-28",
  author: { "@type": "Person", name: "Chris Avera", url: "https://ironcompassinstitute.com/about" },
  publisher: { "@id": "https://ironcompassinstitute.com/#organization" },
  mainEntityOfPage: "https://ironcompassinstitute.com/resources/phone-away-before-driving",
};

export default function PhoneAwayBeforeDriving() {
  return <main id="main-content" className={styles.article}>
    <JsonLd data={articleData} />
    <Header />
    <header className={styles.hero}>
      <Link className={styles.crumb} href="/resources">← Resource guide</Link>
      <p className={styles.eyebrow}>THE DOWNWARD GLANCE</p>
      <h1>Put the phone away before the <em>car moves.</em></h1>
      <p className={styles.dek}>The reflex that pulls your eyes toward a notification on the couch does not know that the stakes changed when you got behind the wheel.</p>
      <p className={styles.byline}>By Chris Avera · Safety facts from the National Highway Traffic Safety Administration</p>
    </header>
    <section className={styles.layout}>
      <aside className={styles.aside}><span>BEFORE MOVING</span><p>Set navigation. Choose audio. Allow the people who may truly need you. Put the phone out of hand. If something needs a response, pull over safely.</p><a href="https://www.nhtsa.gov/risky-driving/distracted-driving" target="_blank" rel="noreferrer">Read NHTSA&apos;s guidance ↗</a></aside>
      <article className={styles.body}>
        <p>I keep noticing drivers looking down. Not only at a red light, but while the car is moving. It is one of the clearest examples of a larger problem: the glance happens before the decision.</p>
        <p>This does not need a dramatic diagnosis or a lecture. It needs a setup that happens before the vehicle moves.</p>
        <h2>The facts are serious enough</h2>
        <p>The National Highway Traffic Safety Administration reports that crashes involving distracted drivers killed <strong>3,208 people</strong> and injured <strong>315,167 people</strong> in 2024. NHTSA also notes that reading or sending a text can take a driver&apos;s eyes off the road for five seconds. At 55 miles per hour, that is roughly the length of a football field.</p>
        <p>Those numbers should not be used to frighten someone into buying a course. They should be enough to make the rule simple.</p>
        <h2>Set the drive up first</h2>
        <div className={styles.steps}>
          <section className={styles.step}><span>01</span><div><h3>Set navigation while parked</h3><p>Enter the destination, review the route, and choose the audio before the car moves.</p></div></section>
          <section className={styles.step}><span>02</span><div><h3>Keep the right people reachable</h3><p>Use the phone&apos;s driving or focus settings to allow the contacts who may genuinely need you. The goal is not to make emergencies impossible. It is to stop every platform from becoming an emergency.</p></div></section>
          <section className={styles.step}><span>03</span><div><h3>Put it out of hand</h3><p>Place the phone where a glance cannot become a reach. Do this before releasing the brake, not after the first notification.</p></div></section>
          <section className={styles.step}><span>04</span><div><h3>Pull over for a real response</h3><p>If a message, map change, or call needs active handling, stop in a safe place. A red light is still part of the drive.</p></div></section>
        </div>
        <div className={styles.note}><strong>Driving gets full attention.</strong><p>The parked-car Airlock practice begins only after the vehicle is safely parked and the engine is off. No reflection exercise belongs in a moving car.</p></div>
        <p>The useful question is not whether you are a disciplined person. It is whether you made the important decision while the car was still standing still.</p>
        <p className={styles.source}>Source: <a href="https://www.nhtsa.gov/risky-driving/distracted-driving" target="_blank" rel="noreferrer">National Highway Traffic Safety Administration, Distracted Driving</a>. The page reports national 2024 crash data and explains visual, manual, and cognitive distraction.</p>
      </article>
    </section>
    <section className={styles.cta}><div><span>FOCUS PROTOCOL</span><h2>Change the setup before you test your willpower.</h2></div><div><p>Focus Protocol is a private seventy-two-hour experiment for noticing where automatic attention has taken over and changing the environment around it.</p><Link href="/focus">See Focus Protocol · $29 <b>→</b></Link></div></section>
    <Footer />
  </main>;
}
