import type { Metadata } from "next";
import { CORE_LESSONS } from "../../../course-content";
import { PlainLink as Link } from "../../../plain-link";
import { PrintWorkbookButton } from "../../course-progress";

export const metadata: Metadata = {
  title: "Iron Compass Core Workbook",
  robots: { index: false, follow: false },
};

export default function CoreWorkbook() {
  return <main id="main-content" className="workbook-shell">
    <header className="access-header"><Link href="/access/core-4m8r2p">← CORE LIBRARY</Link><span>PRIVATE WORKBOOK</span></header>
    <section className="workbook-intro"><p className="section-label">IRON COMPASS CORE</p><h1>The Workbook</h1><p>One page per lesson. Use the pages that meet a real problem. Leave the rest until you need them.</p><PrintWorkbookButton /></section>
    <section className="workbook-pages">{CORE_LESSONS.map((lesson) => <article key={lesson.slug} className="workbook-page"><header><span>{lesson.number} · {lesson.movement}</span><h2>{lesson.title}</h2><p>{lesson.subtitle}</p></header><div><h3>The question</h3><p>{lesson.reflection}</p><i /><i /><i /></div><div><h3>The practice I will try</h3><p>{lesson.action}</p><i /><i /></div><footer><span className="workbook-label">WHEN</span><span /><span className="workbook-label">WHERE</span><span /><span className="workbook-label">MINIMUM VERSION</span><span /></footer></article>)}</section>
    <section className="workbook-integration"><p className="section-label">THIRTY-DAY INTEGRATION</p><h2>Choose two. Keep them small.</h2><p>One Return practice:</p><i /><p>One Lead or Keep practice:</p><i /><p>At the end of thirty days, what changed and what did not fit?</p><i /><i /></section>
  </main>;
}
