import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";

export const metadata: Metadata = {
  title: "Iron Compass Founding Tester Pass",
  description: "Private complimentary access for an invited Iron Compass founding tester.",
  robots: { index: false, follow: false },
};

const feedbackEmail = "mailto:chris@ironcompassinstitute.com?subject=Iron%20Compass%20Founding%20Feedback";

export default function FoundingCirclePass() {
  return (
    <main id="main-content" className="access-shell">
      <header className="access-header">
        <Link href="/" aria-label="Iron Compass home">IRON COMPASS</Link>
        <span>PRIVATE INVITATION</span>
      </header>
      <section className="access-intro">
        <p className="section-label">FOUNDING TESTER PASS</p>
        <h1>Chris invited you.<br /><em>You’re in.</em></h1>
        <p>You have complimentary access to Iron Compass Core. Chris is looking for honest use and honest criticism, not automatic praise. Start with Return, try at least one practice in a real week, and tell him what helped or got in the way.</p>
      </section>
      <section className="access-resource access-manual">
        <div><span>01 · OPEN THE COURSE</span><h2>Return. Lead. Keep.</h2><p>Nine visual lessons and the Core Workbook, arranged on one private Iron Compass course page. No checkout, account, community, or Gamma folder to manage.</p></div>
        <Link className="button primary" href="/access/core-4m8r2p">Enter Iron Compass Core <b>→</b></Link>
      </section>
      <section className="access-resource access-video">
        <div><span>02 · AFTER YOU USE IT</span><h2>Tell Chris the truth.</h2><p>What did you try? What felt useful? What was confusing or unnecessary? Would you recommend it to another husband or father, and why?</p></div>
        <a className="button primary" href={feedbackEmail}>Send private feedback <b>→</b></a>
      </section>
      <footer className="access-footer"><span>Nothing you share will be published or used as a testimonial without your permission.</span><Link href="/">Iron Compass</Link></footer>
    </main>
  );
}
