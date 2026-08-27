import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { GAMMA_LINKS } from "../../data";

export const metadata: Metadata = {
  title: "Focus Protocol Access | Iron Compass",
  description: "Private access to the Focus Protocol.",
  robots: { index: false, follow: false },
};

const manual = GAMMA_LINKS.find((item) => item.title === "Focus Protocol Field Manual");

export default function FocusAccess() {
  return (
    <main id="main-content" className="access-shell">
      <header className="access-header">
        <Link href="/" aria-label="Iron Compass home">IRON COMPASS</Link>
        <span>PRIVATE ACCESS</span>
      </header>
      <section className="access-intro">
        <p className="section-label">FOCUS PROTOCOL</p>
        <h1>Get your attention<br /><em>back in the room.</em></h1>
        <p>This is a 72-hour reset. Open the visual Field Manual and work one practical move at a time.</p>
      </section>
      <section className="access-resource access-manual">
        <div><span>01 · START HERE</span><h2>The Focus Protocol Field Manual</h2><p>A browser-based visual presentation with four practical moves, organized so you can stop reading and start using them.</p></div>
        {manual && <a className="button primary" href={manual.url} target="_blank" rel="noreferrer">Open the visual Field Manual <b>→</b></a>}
      </section>
      <section className="access-resource access-video">
        <div><span>02 · WHEN YOU ARE READY</span><h2>The next step</h2><p>Use Focus first. When you are ready to work on the larger system around attention, pressure, home, and relationships, this short bridge introduces Iron Compass Core.</p><Link className="text-link" href="/library">See the full Core curriculum <b>→</b></Link></div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Add captions only after an exact transcript is verified. */}
        <video controls playsInline preload="metadata" poster="/assets/core-bridge-poster.jpg" aria-label="Iron Compass Core bridge video"><source src="/assets/core-bridge-sales.mp4" type="video/mp4" />Your browser does not support this video.</video>
      </section>
      <footer className="access-footer"><span>Save this page. It is your private access link.</span><Link href="/">Iron Compass Institute</Link></footer>
    </main>
  );
}
