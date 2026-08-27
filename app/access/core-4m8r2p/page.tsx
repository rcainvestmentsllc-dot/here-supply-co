import type { Metadata } from "next";
import Link from "next/link";
import { GAMMA_LINKS } from "../../data";

export const metadata: Metadata = {
  title: "Iron Compass Core Access",
  description: "Private access to Iron Compass Core.",
  robots: { index: false, follow: false },
};

const movementCopy = {
  RETURN: "Bring your attention back under your direction.",
  LEAD: "Bring a steadier self into the room.",
  KEEP: "Protect the relationships and rhythms that keep a good life intact.",
} as const;

export default function CoreAccess() {
  return (
    <main id="main-content" className="access-shell">
      <header className="access-header">
        <Link href="/" aria-label="Iron Compass home">IRON COMPASS</Link>
        <span>PRIVATE ACCESS</span>
      </header>
      <section className="access-intro">
        <p className="section-label">IRON COMPASS CORE</p>
        <h1>Return. Lead.<br /><em>Keep.</em></h1>
        <p>Core is a private, self-paced body of work. Start with Return, take one lesson at a time, and use the practice before moving on.</p>
      </section>
      <section className="access-resource access-video">
        <div><span>START HERE</span><h2>The whole system</h2><p>Watch this brief orientation before opening the first movement.</p></div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Add captions only after an exact transcript is verified. */}
        <video controls playsInline preload="metadata" poster="/assets/core-bridge-poster.jpg" aria-label="Iron Compass Core orientation video"><source src="/assets/core-bridge-sales.mp4" type="video/mp4" />Your browser does not support this video.</video>
      </section>
      {(["RETURN", "LEAD", "KEEP"] as const).map((movement, movementIndex) => (
        <section className="access-movement" key={movement}>
          <div className="access-movement-heading"><span>0{movementIndex + 1}</span><div><p>{movement}</p><h2>{movementCopy[movement]}</h2></div></div>
          <ol>{GAMMA_LINKS.filter((item) => item.part === movement).map((item, lessonIndex) => <li key={item.title}><span>{movementIndex + 1}.{lessonIndex + 1}</span><a href={item.url} target="_blank" rel="noreferrer">{item.title}<b>→</b></a></li>)}</ol>
        </section>
      ))}
      <footer className="access-footer"><span>Save this page. It is your private access link.</span><Link href="/">Iron Compass Institute</Link></footer>
    </main>
  );
}
