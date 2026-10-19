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
          <li><Link href="/men/course">Carry It Well, the course</Link></li>
          <li><Link href="/men/apply">Book a free call with Chris</Link></li>
          <li><Link href="/men/driveway">The free Driveway Card</Link></li>
          <li><Link href="/unlock">Open the course if you already bought it</Link></li>
        </ul>
      </section>
      <Footer />
    </main>
  );
}
