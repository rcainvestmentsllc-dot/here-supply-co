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

const coreLessonTitles = new Set([
  "The Sanctuary",
  "Hunter vs Farmer",
  "The Airlock Protocol",
  "The Emotional Thermostat",
  "The Date Night Algorithm",
  "The Floor General",
  "The Third Place",
  "The Friendship Script",
  "Mission Debrief",
]);

const workbook = GAMMA_LINKS.find((item) => item.title === "Iron Compass Workbook");

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
      {(["RETURN", "LEAD", "KEEP"] as const).map((movement, movementIndex) => (
        <section className="access-movement" key={movement}>
          <div className="access-movement-heading"><span>0{movementIndex + 1}</span><div><p>{movement}</p><h2>{movementCopy[movement]}</h2></div></div>
          <ol>{GAMMA_LINKS.filter((item) => item.part === movement && coreLessonTitles.has(item.title)).map((item, lessonIndex) => <li key={item.title}><span>{movementIndex + 1}.{lessonIndex + 1}</span><a href={item.url} target="_blank" rel="noreferrer">{item.title}<b>→</b></a></li>)}</ol>
        </section>
      ))}
      <section className="access-resource access-manual">
        <div><span>COMPANION RESOURCE</span><h2>The Core Workbook</h2><p>Use the workbook alongside the lessons to capture what matters and choose the practices you want to keep.</p></div>
        {workbook && <a className="button primary" href={workbook.url} target="_blank" rel="noreferrer">Open the Core Workbook <b>→</b></a>}
      </section>
      <footer className="access-footer"><span>Save this page. It is your private access link.</span><Link href="/">Iron Compass Institute</Link></footer>
    </main>
  );
}
