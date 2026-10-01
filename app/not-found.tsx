import type { Metadata } from "next";
import { PlainLink as Link } from "./plain-link";
import { Footer, Header } from "./components";

export const metadata: Metadata = {
  title: "Page not found | Here Supply Co.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="site">
      <Header />
      <section className="not-found">
        <h1>That page is not here.</h1>
        <p>The link may be old, or the address may have a typo. These are the places most people are looking for.</p>
        <ul>
          <li><Link href="/sunday-board">The free Sunday Board Meeting guide</Link></li>
          <li><Link href="/library">All the Way Here, the course</Link></li>
          <li><Link href="/check">The one minute drifting check</Link></li>
          <li><Link href="/unlock">Open the course if you already bought it</Link></li>
        </ul>
      </section>
      <Footer />
    </main>
  );
}
