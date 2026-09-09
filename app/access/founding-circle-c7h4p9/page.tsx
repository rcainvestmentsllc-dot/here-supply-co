import { supportEmailUrl } from "../../site-config";
import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { BrandWordmark } from "../../components";

export const metadata: Metadata = {
  title: "All the Way Here Founding Tester Pass",
  description: "Private complimentary access for an invited All the Way Here founding tester.",
  robots: { index: false, follow: false },
};

const feedbackEmail = supportEmailUrl("All the Way Here Founding Feedback");
const debriefEmail = supportEmailUrl("All the Way Here Founding Debrief");

export default function FoundingCirclePass() {
  return (
    <main id="main-content" className="access-shell">
      <header className="access-header">
        <Link href="/" aria-label="Here Supply Co. home"><BrandWordmark /></Link>
        <span>PRIVATE INVITATION</span>
      </header>
      <section className="access-intro">
        <p className="section-label">FOUNDING TESTER PASS</p>
        <h1>Chris invited you.<br /><em>You’re in.</em></h1>
        <p>You have complimentary access to All the Way Here. Chris is looking for honest use and honest criticism, not automatic praise. Start with the Attention Reset or Return, try at least one practice in a real week, and tell him what helped or got in the way.</p>
      </section>
      <section className="access-resource access-manual">
        <div><span>01 · OPEN THE COURSE</span><h2>Return. Lead. Keep.</h2><p>The Attention Reset, nine visual lessons, and the editable workbook, arranged on one private All the Way Here course page. No checkout, community, or Gamma folder to manage.</p></div>
        <Link className="button primary" href="/access/core-4m8r2p">Enter All the Way Here <b>→</b></Link>
      </section>
      <section className="access-resource access-video">
        <div><span>02 · AFTER YOU USE IT</span><h2>Tell Chris the truth.</h2><p>What did you try? What felt useful? What was confusing or unnecessary? Would you recommend it to another person, and why?</p></div>
        <a className="button primary" href={feedbackEmail}>Send private feedback <b>→</b></a>
      </section>
      <section className="access-resource access-manual">
        <div><span>03 · OPTIONAL FOUNDING DEBRIEF</span><h2>Talk it through with Chris.</h2><p>After you try one practice, ask Chris for a private 20-minute conversation. Bring one real problem. He will listen, help you name what is actually happening, and help you choose one practical next step. This is educational application and accountability, not counseling or therapy.</p></div>
        <a className="button primary" href={debriefEmail}>Ask for a founding debrief <b>→</b></a>
      </section>
      <footer className="access-footer"><span>Nothing you share will be published or used as a testimonial without your permission.</span><Link href="/">Here Supply Co.</Link></footer>
    </main>
  );
}
