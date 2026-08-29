import type { Metadata } from "next";
import { Footer, Header } from "../components";
import { JsonLd } from "../structured-data";
import { WorkingSessionForm } from "./working-session-form";

export const metadata: Metadata = {
  title: "Work With Chris | Application Session",
  description: "Request help applying an Iron Compass practice to one real problem, or contact Chris about a purchase, workshop, or partnership.",
  alternates: { canonical: "/working-session" },
  openGraph: {
    title: "Work With Chris | Iron Compass",
    description: "One real problem, one focused application session, and one practical written plan.",
    url: "/working-session",
  },
};

const serviceData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Iron Compass Application Session",
  description: "A private educational implementation session for applying Iron Compass practices to one current problem.",
  provider: { "@type": "Person", name: "Chris Avera", url: "https://ironcompassinstitute.com/about" },
  areaServed: "United States",
  serviceType: "Educational implementation session",
};

export default function WorkingSessionPage() {
  return <main id="main-content" className="working-page">
    <JsonLd data={serviceData} />
    <Header />
    <section className="working-hero">
      <div><p className="section-label">WORK WITH CHRIS</p><h1>Learn it.<br /><em>Then make it real.</em></h1></div>
      <div><p>Sometimes a tool is enough. Sometimes the hard part is using it when work is loud, the phone is close, or an old pattern takes over.</p><p>An Application Session is a focused conversation for putting one Iron Compass practice to work in one current situation. It is practical accountability, not a promise to fix your life and not therapy dressed up as coaching.</p></div>
    </section>

    <section className="working-shape">
      <div><p className="section-label">THE SHAPE OF THE WORK</p><h2>Clear enough to be useful.<br />Small enough to be <em>honest.</em></h2></div>
      <ol>
        <li><span>01</span><div><h3>Send the real moment</h3><p>Use the intake below to describe one recent situation, what keeps repeating, and what a useful next step would look like.</p></div></li>
        <li><span>02</span><div><h3>Chris reviews the fit</h3><p>If a free resource or course is the better answer, you will be pointed there. A session is offered only when a focused conversation is likely to help.</p></div></li>
        <li><span>03</span><div><h3>Apply the work for 60 minutes</h3><p>Name the pattern, choose one or two practices, and make them fit the constraints of your actual life.</p></div></li>
        <li><span>04</span><div><h3>Leave with one written plan</h3><p>You receive a short summary of the decision, practice, and next action. No long package or open-ended dependency.</p></div></li>
      </ol>
    </section>

    <section className="working-fit">
      <article><span>A GOOD FIT</span><h2>Practical application.</h2><ul><li>Attention and phone habits</li><li>Work-to-home transition</li><li>Pressure and personal responsibility</li><li>Using the weekly guide, Focus, or Core</li><li>Accountability for one specific decision</li></ul></article>
      <article><span>OUTSIDE THE SCOPE</span><h2>Problems that need different help.</h2><ul><li>Crisis or safety concerns</li><li>Diagnosis or mental-health treatment</li><li>Marriage counseling or mediation</li><li>Medical, legal, or financial advice</li><li>A promise of broad personal transformation</li></ul></article>
    </section>

    <section className="working-offer">
      <div><p className="section-label">BETA FORMAT</p><h2>Sixty minutes.<br /><em>$150.</em></h2><p>The fee applies only if Chris reviews the request, believes the format fits, and invites you to book. Submitting the form does not commit you to purchase.</p></div>
      <aside><strong>Included</strong><span>Private video conversation</span><span>One current problem</span><span>One-page written implementation plan</span><span>No subscription or package</span></aside>
    </section>

    <section id="intake" className="working-intake">
      <div><p className="section-label">START WITH THE MOMENT</p><h2>Tell Chris what is actually <em>happening.</em></h2><p>This is also the right place for a product question, access problem, refund request, workshop, or partnership inquiry. Choose the closest reason and the form will route the context clearly.</p></div>
      <WorkingSessionForm />
    </section>
    <Footer />
  </main>;
}
