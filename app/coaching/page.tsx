import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header } from "../components";
import { COACHING } from "../../lib/coaching";
import { CoachingForm } from "./coaching-form";

export const metadata: Metadata = {
  title: "Thirty Days With Chris | Here Supply Co.",
  description: "One month of one on one email coaching for couples using the Sunday Board and All the Way Here. A thirty minute call, a weekly check in, and a real reply within 48 hours.",
  alternates: { canonical: "/coaching" },
};

export default function CoachingPage() {
  return <main id="main-content" className="working-page">
    <Header />
    <section className="working-hero">
      <div><p className="section-label">THIRTY DAYS WITH CHRIS</p><h1>Someone in your corner<br />for a <em>month.</em></h1></div>
      <div>
        <p>The course gives you the practices. This is for the part after that, when knowing what to do is not the problem and doing it on a Tuesday night is.</p>
        <p>One month of one on one coaching by email, with one video call to start. I keep it to a few people at a time so I can answer well.</p>
        <a className="button primary" href="#apply">Apply <span>→</span></a>
      </div>
    </section>

    <section className="working-shape">
      <div><p className="section-label">WHAT YOU GET</p><h2>Small, steady, and<br /><em>actually read.</em></h2></div>
      <ol>
        <li><span>01</span><div><h3>A thirty minute call to start</h3><p>We pick the one or two practices that matter most for the two of you, and the smallest version you can keep on a bad week.</p></div></li>
        <li><span>02</span><div><h3>A weekly check in</h3><p>Once a week you fill out a short form: what you practiced, what got in the way, and one question. It takes about five minutes.</p></div></li>
        <li><span>03</span><div><h3>A real reply within {COACHING.replyHours} hours</h3><p>I read it and write back myself. Specific, honest, and short enough to use that week.</p></div></li>
        <li><span>04</span><div><h3>A closing note</h3><p>At the end of the month I send you what held, what to keep, and what to try next, so the progress does not end with the coaching.</p></div></li>
      </ol>
    </section>

    <section className="working-fit">
      <article><span>A GOOD FIT</span><h2>This is for you if</h2><ul>
        <li>You use the Sunday Board or All the Way Here and want help making it stick.</li>
        <li>You know what you want to change and keep losing it by Wednesday.</li>
        <li>You want someone to ask whether you did the thing, kindly and honestly.</li>
        <li>One of you is ready even if the other is not there yet.</li>
      </ul></article>
      <article><span>NOT THE RIGHT FIT</span><h2>Please look elsewhere if</h2><ul>
        <li>You need therapy, marriage counseling, or medical care.</li>
        <li>Anyone in the house is unsafe. Please contact local emergency services or a crisis line.</li>
        <li>You want a quick fix for a partner who is not part of the decision.</li>
      </ul></article>
    </section>

    <section className="working-offer">
      <div><p className="section-label">THE PRICE</p><h2>${COACHING.price} for<br />thirty days.</h2><p>The first {COACHING.foundingSeats} people pay ${COACHING.foundingPrice} in exchange for honest feedback I can use to make this better, and quote on the site only with your permission. If it is not a fit, I will say so before you pay anything.</p></div>
      <aside><strong>How it starts</strong>
        <span>1. Apply below. It takes about three minutes.</span>
        <span>2. I reply within two days with a time for the first call, or an honest note if this is not the right fit.</span>
        <span>3. You pay through a secure link I send, and we start with the call.</span>
      </aside>
    </section>

    <section className="working-intake" id="apply"><div><p className="section-label">APPLY</p><h2>Tell me where<br />you <em>are.</em></h2><p>No long story needed. A sentence or two about what you want to be different is plenty.</p><p>Already a client? <Link href="/coaching/check-in">Send this week&rsquo;s check in</Link>.</p></div><CoachingForm kind="application" /></section>
    <Footer />
  </main>;
}
