import { siteUrl } from "../../site-config";
import type { Metadata } from "next";
import { Footer, Header } from "../../components";
import { PlainLink as Link } from "../../plain-link";
import { JsonLd } from "../../structured-data";
import styles from "../article.module.css";

export const metadata: Metadata = {
  title: "How to Stop Checking Your Phone at Home",
  description: "A practical setup for anyone who keeps reaching for a phone at home, even when they want to be present with the people around them.",
  alternates: { canonical: "/resources/how-to-stop-checking-your-phone-at-home" },
  openGraph: {
    title: "How to Stop Checking Your Phone at Home",
    description: "Change the room and the reflex before asking willpower to do all the work.",
    url: "/resources/how-to-stop-checking-your-phone-at-home",
  },
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Stop Checking Your Phone at Home",
  description: "A practical setup for reducing automatic phone checking at home.",
  datePublished: "2026-08-28",
  dateModified: "2026-08-28",
  author: { "@type": "Person", name: "Chris Avera", url: siteUrl("/about") },
  publisher: { "@id": siteUrl("/#organization") },
  mainEntityOfPage: siteUrl("/resources/how-to-stop-checking-your-phone-at-home"),
};

export default function StopCheckingPhoneAtHome() {
  return <main id="main-content" className={styles.article}>
    <JsonLd data={articleData} />
    <Header />
    <header className={styles.hero}>
      <Link className={styles.crumb} href="/resources">← Resource guide</Link>
      <p className={styles.eyebrow}>PHONE HABITS AT HOME</p>
      <h1>Stop asking willpower to beat a phone that is <em>within reach.</em></h1>
      <p className={styles.dek}>If your hand keeps finding the phone before you have decided to use it, change the room and the reflex first. You do not need a dramatic detox to begin.</p>
      <p className={styles.byline}>By Chris Avera · From the All the Way Here Attention Reset</p>
    </header>

    <section className={styles.layout}>
      <aside className={styles.aside}>
        <span>TRY IT TONIGHT</span>
        <p>Choose one landing place for the phone, protect the people who must be able to reach you, and use one short phone-free window at home.</p>
        <Link href="/library#core">See the Attention Reset inside the course →</Link>
      </aside>
      <article className={styles.body}>
        <p>I do not think most people need another lecture about screen time. We already know when the phone is getting too much of us. The harder part is the small automatic reach that happens before a conscious decision.</p>
        <p>The practical answer is to add a little distance and make the next right action easier. Research on smartphone-use interventions suggests that a group of small environmental changes can reduce use more reliably than one dramatic rule by itself.</p>

        <h2>Build one phone landing place</h2>
        <div className={styles.steps}>
          <section className={styles.step}><span>01</span><div><h3>Choose the place before the urge</h3><p>Pick one shelf, drawer, charging point, or basket outside the room where you most want to be present. The phone needs a home that is not your hand or pocket.</p></div></section>
          <section className={styles.step}><span>02</span><div><h3>Protect the people who need you</h3><p>Allow calls from favorites, repeated callers, or the contacts who may genuinely need an immediate answer. A useful boundary should not create a new worry.</p></div></section>
          <section className={styles.step}><span>03</span><div><h3>Remove the loudest invitations</h3><p>Turn off nonessential notifications. Move the apps that create the most automatic checking off the first screen, sign out, or delete them for a short experiment.</p></div></section>
          <section className={styles.step}><span>04</span><div><h3>Protect one real window</h3><p>Start with dinner, bedtime, the first twenty minutes after arriving home, or one conversation with your partner. Make the window visible and small enough to repeat.</p></div></section>
        </div>

        <h2>Use a rule you can actually remember</h2>
        <p>Write one sentence in this form: <strong>When I enter the room for dinner, I will put my phone on the hallway charger until we are finished.</strong> The exact room and time matter. A vague promise to “use the phone less” leaves the decision open every time the urge appears.</p>

        <div className={styles.note}><strong>The goal is not to become anti-technology.</strong><p>Use the phone when it is the right tool. The practice is to stop letting its location, color, alerts, and easy access make every decision for you.</p></div>

        <h2>Run the experiment for 72 hours</h2>
        <p>Notice the reaches, not just the total minutes. What was happening just before you checked? Boredom, uncertainty, a difficult pause, unfinished work, or simple habit? That is useful information. Change one part of the setup and try again.</p>

        <p className={styles.source}>Research starting point: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9112639/" target="_blank" rel="noreferrer">a randomized controlled trial of practical strategies for reducing smartphone use</a>. The study tested multiple strategies together, so no single tactic should be treated as a magic answer.</p>
      </article>
    </section>

    <section className={styles.cta}><div><span>INSIDE ALL THE WAY HERE</span><h2>Turn one good idea into a short, usable reset.</h2></div><div><p>The Attention Reset guides you through four practical changes over three days, then helps you decide which ones belong in your real life.</p><Link href="/library">See the complete course <b>→</b></Link></div></section>
    <Footer />
  </main>;
}
