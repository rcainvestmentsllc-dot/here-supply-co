import { SUPPORT_EMAIL, supportEmailUrl } from "../../site-config";
import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { FOCUS_MOVES, RESET_TIMELINE, RESET_RELAPSE, RESET_DECLARATION } from "../../course-content";
import { BrandWordmark } from "../../components";

export const metadata: Metadata = {
  title: "Focus Protocol | All the Way Here",
  description: "The three-day Focus Protocol inside All the Way Here.",
  robots: { index: false, follow: false },
};

export default function FocusAccess() {
  return (
    <main id="main-content" className="access-shell">
      <header className="access-header">
        <Link href="/" aria-label="Here Supply Co. home"><BrandWordmark /></Link>
        <span>PRIVATE ACCESS</span>
      </header>
      <section className="access-intro">
        <p className="section-label">ALL THE WAY HERE · FOCUS PROTOCOL</p>
        <h1>Start here.<br /><em>Take back 72 hours.</em></h1>
        <p>Your access is ready. The Focus Protocol is a three-day reset for getting the phone out of the way, then keeping the parts that make real life better. Save this page and work one practical move at a time.</p>
      </section>
      <section className="focus-native-intro">
        <p className="section-label">THE 72-HOUR FOCUS PROTOCOL</p><h2>Control the inputs.<br /><em>Choose the attention.</em></h2><p>This is not a detox, treatment, meditation exercise, or test of discipline. It is a short experiment in environment design: reduce the inputs that pull at you, create enough friction to notice the reflex, and make a different choice in ordinary life.</p>
      </section>
      <figure className="focus-human-story">
        <img src="/assets/course/art/emotional-phone-at-game.jpg" alt="A parent looking at a phone while a child waits on a baseball field" width="1672" height="942" loading="lazy" decoding="async" />
        <figcaption><span>WHY THIS MATTERS</span><p>The goal is not to become anti-technology. It is to stop giving the people in front of us whatever attention is left.</p></figcaption>
      </figure>
      <section className="focus-moves">{FOCUS_MOVES.map((move) => <article key={move.number}><span>{move.number}</span><h2>{move.title}</h2><h3>{move.promise}</h3><p>{move.body}</p><aside><b>MAKE IT FIT</b>{move.exception}</aside></article>)}</section>
      <section className="reset-timeline" aria-labelledby="reset-timeline-heading">
        <div className="reset-timeline-head">
          <p className="section-label">WHAT THE SEVENTY TWO HOURS FEEL LIKE</p>
          <h2 id="reset-timeline-heading">Know the hard part<br /><em>before you reach it.</em></h2>
          <p>Most people quit somewhere in the first day, not because the reset failed but because nobody told them that part was coming. This is what people commonly report. Your own hours will not match exactly, and that is fine. The shape is what matters.</p>
        </div>
        <ol className="reset-timeline-list">
          {RESET_TIMELINE.map((phase) => (
            <li key={phase.window}>
              <span>{phase.window}</span>
              <h3>{phase.title}</h3>
              <p>{phase.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="reset-relapse" aria-labelledby="reset-relapse-heading">
        <div>
          <p className="section-label">{RESET_RELAPSE.window}</p>
          <h2 id="reset-relapse-heading">{RESET_RELAPSE.title}</h2>
          <p>{RESET_RELAPSE.intro}</p>
          <ul className="reset-relapse-lines">
            {RESET_RELAPSE.lines.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
        <aside>
          <p>{RESET_RELAPSE.counter}</p>
          <p className="reset-relapse-together"><b>DOING THIS TOGETHER</b>{RESET_RELAPSE.together}</p>
        </aside>
      </section>

      <section className="reset-declaration">
        <p className="section-label">READ IT OUT LOUD ONCE</p>
        <blockquote>{RESET_DECLARATION}</blockquote>
        <small>Saying it aloud feels slightly ridiculous, which is part of why it sticks.</small>
      </section>

      <section className="focus-relay" aria-labelledby="watch-relay-heading">
        <div><p className="section-label">OPTIONAL SETUP</p><h2 id="watch-relay-heading">Let the watch carry people.<br />Leave the feeds in the drawer.</h2><p>An Apple Watch or similar wearable can act more like a simple relay than a second smartphone. The point is not to buy another device. If you already wear one, use it to stay reachable by the few people who matter while the phone stays physically away.</p></div>
        <ol>
          <li><span>01</span><p><strong>Choose the people.</strong> Allow calls and messages from family, caregivers, and priority contacts.</p></li>
          <li><span>02</span><p><strong>Stop mirroring the feeds.</strong> Turn off social, news, shopping, email, and other watch alerts that recreate the same pull.</p></li>
          <li><span>03</span><p><strong>Put the phone in its home.</strong> Use one drawer, bag, or charging station when you arrive. Check it at chosen times instead of carrying it room to room.</p></li>
          <li><span>04</span><p><strong>Drop the watch if it becomes another feed.</strong> A tool earns its place only when it helps you look up.</p></li>
        </ol>
      </section>
      <section className="focus-look-up" aria-labelledby="look-up-heading">
        <div><p className="section-label">LOOKING DOWN BECAME THE DEFAULT</p><h2 id="look-up-heading">Put attention back into the places where life can happen.</h2><p>When I returned to Clemson, the campus still looked familiar, but the energy felt different from what I remembered. Students crossed paths while looking down. It was not a judgment about them, and the phone had not ruined the campus. Something simply felt lost when eye contact, an unplanned hello, and noticing the person beside you became less likely.</p><p>The answer is not becoming the phone police. Choose a few places where looking up becomes the default again, and model the boundary before asking anyone else to follow it.</p></div>
        <ol>
          <li><span>AT HOME</span><strong>Give the phone one home.</strong><p>Use a drawer, bag, or charging station when you arrive. Protect one repeated moment first.</p></li>
          <li><span>IN MOTION</span><strong>Set it before you move.</strong><p>Set navigation before driving, keep the phone out of hand, and cross streets with your eyes up.</p></li>
          <li><span>AROUND PEOPLE</span><strong>Answer the person first.</strong><p>When someone says your name or looks for your eyes, meet the invitation before returning to a screen.</p></li>
        </ol>
      </section>
      <section className="focus-tracker"><div><p className="section-label">NOTICE, DO NOT GRADE</p><h2>Three questions.<br />Once a day.</h2></div><ol><li>When did I reach without deciding?</li><li>Where was it easier to stay present?</li><li>Which boundary is worth keeping tomorrow?</li></ol></section>
      <section className="lesson-field-note"><span>AFTER 72 HOURS</span><blockquote>Choose which tools return, where they live, and when you use them. Keep the boundaries that gave you more attention. Release the ones that did not fit.</blockquote></section>
      <section className="access-resource access-manual">
        <div><span>02 · KEEP GOING</span><h2>The complete course</h2><p>The Attention Reset opens All the Way Here. Continue into nine visual lessons about attention, pressure, home, relationships, friendship, and the practices that bring them together.</p><Link className="text-link" href="/access/core-4m8r2p">Continue to the course <b>→</b></Link></div>
        <aside className="focus-next-step"><span>NEXT</span><strong>Print the course book, then begin with Return.</strong><small>The three short module introductions inside the course are optional context. The practices and action pages are the course.</small></aside>
      </section>
      <footer className="access-footer"><span>Questions? Email <a href={supportEmailUrl()}>{SUPPORT_EMAIL}</a>. Save this page as your private access link.</span><Link href="/">Here Supply Co.</Link></footer>
    </main>
  );
}
