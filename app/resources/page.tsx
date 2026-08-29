import type { Metadata } from "next";
import { Footer, Header } from "../components";
import { JsonLd } from "../structured-data";
import styles from "./resources.module.css";

export const metadata: Metadata = {
  title: "Resources for Fathers, Marriage, Attention, and Mental Health",
  description: "A clear starting guide to Iron Compass tools, established family and mental health resources, and research on digital distraction and attention.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources | Iron Compass",
    description: "Practical starting points for fathers, marriage, attention, and qualified outside support.",
    url: "/resources",
  },
};

const pageData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Iron Compass Resource Guide",
  description: "Practical starting points for fathers, marriage, attention, and qualified outside support.",
  url: "https://ironcompassinstitute.com/resources",
  isPartOf: { "@id": "https://ironcompassinstitute.com/#website" },
};

const internalPaths = [
  {
    number: "01",
    need: "My wife and I need to get on the same page.",
    answer: "Use the free 15-minute weekly guide.",
    href: "/sunday-board#get-board",
    action: "Get the meeting guide",
  },
  {
    number: "02",
    need: "My attention keeps drifting away.",
    answer: "Use the 72-hour Focus Protocol.",
    href: "/focus",
    action: "See Focus Protocol",
  },
  {
    number: "03",
    need: "Work, pressure, and home need a steadier system.",
    answer: "See the full Iron Compass Core curriculum.",
    href: "/library#curriculum",
    action: "See Iron Compass Core",
  },
];

const outsideResources = [
  {
    label: "MARRIAGE AND FAMILY THERAPY",
    title: "Find a licensed marriage and family therapist",
    copy: "AAMFT explains the role of marriage and family therapists and provides a place to look for qualified support.",
    href: "https://www.aamft.org/AAMFT/web/About-Marriage---Family-Therapy/Find-A-Therapist.aspx",
    source: "American Association for Marriage and Family Therapy",
  },
  {
    label: "MENTAL HEALTH AND SUBSTANCE USE",
    title: "Find treatment and local services",
    copy: "SAMHSA provides confidential treatment locators for mental health and substance use services in the United States.",
    href: "https://www.samhsa.gov/find-help/locators",
    source: "U.S. Substance Abuse and Mental Health Services Administration",
  },
  {
    label: "FATHERHOOD",
    title: "Find research and programs for fathers",
    copy: "The National Responsible Fatherhood Clearinghouse brings together resources, research, and programs that support fathers and families.",
    href: "https://www.fatherhood.gov/",
    source: "U.S. Department of Health and Human Services",
  },
];

const research = [
  {
    title: "Smartphones and Cognition: A Review of Research",
    copy: "A peer-reviewed review of the evidence around smartphone habits, attention, memory, and everyday cognitive functioning.",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5403814/",
  },
  {
    title: "Does the Brain Drain Effect Really Exist?",
    copy: "A meta-analysis examining whether smartphone use and even a phone’s presence can affect memory, attention, and cognitive performance.",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10525686/",
  },
];

const fieldNotes = [
  {
    label: "PHONE HABITS",
    title: "How to stop checking your phone at home",
    copy: "A practical setup for changing the environment and the reflex before asking willpower to do all the work.",
    href: "/resources/how-to-stop-checking-your-phone-at-home",
  },
  {
    label: "FATHERHOOD",
    title: "How to be more present with your kids after work",
    copy: "A five- to fifteen-minute practice for joining your child’s world without bringing the whole workday with you.",
    href: "/resources/how-to-be-more-present-with-your-kids",
  },
  {
    label: "FRIENDSHIP",
    title: "Every man needs a third place",
    copy: "A real sauna conversation, and why home and work are not the only places a man needs in his life.",
    href: "/resources/why-men-need-a-third-place",
  },
  {
    label: "MARRIAGE",
    title: "A 15-minute weekly marriage meeting agenda",
    copy: "A simple way to make the week visible without turning Sunday into a boardroom or an argument.",
    href: "/resources/weekly-marriage-meeting",
  },
  {
    label: "WORK TO HOME",
    title: "How to leave work at work before you walk in the door",
    copy: "A short transition for putting down the mental spillover and giving the entrance your attention.",
    href: "/resources/leave-work-at-work",
  },
  {
    label: "SAFE DRIVING",
    title: "Put the phone away before the car moves",
    copy: "A practical setup for navigation, important contacts, and the downward glance behind the wheel.",
    href: "/resources/phone-away-before-driving",
  },
];

export default function Resources() {
  return (
    <main id="main-content" className={styles.resources}>
      <JsonLd data={pageData} />
      <Header />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>IRON COMPASS RESOURCE GUIDE</p>
        <h1>Use the right kind<br />of help for the <em>real problem.</em></h1>
        <p>This page gives you a clear place to begin inside Iron Compass, then points beyond Iron Compass when a qualified professional, established organization, or crisis resource is the better next step.</p>
      </section>

      <section className={styles.start} aria-labelledby="start-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>START HERE</p>
          <h2 id="start-heading">What are you<br />looking for <em>today?</em></h2>
          <p>Choose the sentence that sounds most like your actual situation. You do not need to study the whole site first.</p>
        </div>
        <div className={styles.pathList}>
          {internalPaths.map((path) => (
            <a key={path.number} href={path.href}>
              <span>{path.number}</span>
              <div><strong>{path.need}</strong><small>{path.answer}</small></div>
              <b>{path.action} →</b>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.fieldNotes} aria-labelledby="field-notes-heading">
        <div className={styles.fieldNotesIntro}>
          <p className={styles.eyebrow}>STORIES AND PRACTICES</p>
          <h2 id="field-notes-heading">Use one practice<br />before you read <em>ten ideas.</em></h2>
          <p>These are complete starting points, not search-engine filler. Each one names a real moment and gives you something concrete to try.</p>
          <a className={styles.substackLink} href="https://chrisavera.substack.com" target="_blank" rel="me noreferrer">Read Chris on Substack <span>↗</span></a>
        </div>
        <div className={styles.fieldGrid}>
          {fieldNotes.map((note, index) => (
            <a key={note.href} href={note.href}>
              <span>{String(index + 1).padStart(2, "0")} · {note.label}</span>
              <h3>{note.title}</h3>
              <p>{note.copy}</p>
              <b>Read the story →</b>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.outside} aria-labelledby="outside-heading">
        <div className={styles.outsideHeading}>
          <p className={styles.eyebrow}>WHEN YOU NEED MORE THAN A PRACTICE</p>
          <h2 id="outside-heading">Established places<br />to <em>start.</em></h2>
          <p>These organizations are independent of Iron Compass. They are listed because they provide professional, public, or government-backed ways to find support.</p>
        </div>
        <div className={styles.outsideGrid}>
          {outsideResources.map((resource) => (
            <article key={resource.title}>
              <span>{resource.label}</span>
              <h3>{resource.title}</h3>
              <p>{resource.copy}</p>
              <small>{resource.source}</small>
              <a href={resource.href} target="_blank" rel="noreferrer">Visit the official resource <b>↗</b></a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.research} aria-labelledby="research-heading">
        <div>
          <p className={styles.eyebrow}>READ THE RESEARCH</p>
          <h2 id="research-heading">Ground the conversation<br />in what we <em>actually know.</em></h2>
          <p>The evidence around phones and attention is real but not simplistic. These open-access reviews are useful starting points, and they are more honest than a dramatic claim pulled from a feed.</p>
        </div>
        <div className={styles.researchList}>
          {research.map((item) => (
            <a key={item.title} href={item.href} target="_blank" rel="noreferrer">
              <strong>{item.title}</strong>
              <span>{item.copy}</span>
              <b>Read at the National Library of Medicine ↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.urgent} aria-labelledby="urgent-heading">
        <div>
          <p className={styles.eyebrow}>IF THE SITUATION IS URGENT</p>
          <h2 id="urgent-heading">Do not try to solve a crisis with a worksheet.</h2>
        </div>
        <div className={styles.urgentLinks}>
          <a href="https://988lifeline.org/get-help/" target="_blank" rel="noreferrer"><strong>Emotional distress or suicidal crisis</strong><span>Call or text 988 in the United States. The 988 Lifeline is free and confidential. ↗</span></a>
          <a href="https://www.thehotline.org/get-help/" target="_blank" rel="noreferrer"><strong>Relationship abuse or safety concerns</strong><span>Contact the National Domestic Violence Hotline or find local support. ↗</span></a>
        </div>
      </section>

      <section className={styles.disclosure}>
        <p><strong>Plain disclosure:</strong> Iron Compass is an independent educational project created by Chris Avera. It is not therapy, medical care, crisis care, a licensed clinical service, or an accredited program. Listing an outside resource does not imply affiliation, endorsement, or partnership.</p>
      </section>

      <Footer />
    </main>
  );
}
