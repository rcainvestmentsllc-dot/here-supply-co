import { Footer, Header } from "../components";
import styles from "./about.module.css";

export default function AboutChris() {
  return (
    <main id="main-content" className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <img src="/assets/chris-founder.jpg" alt="Chris Avera outdoors" width="600" height="800" fetchPriority="high" />
        <div />
        <div className={styles.heroContent}>
          <p>ABOUT CHRIS AVERA</p>
          <h1>Husband.<br />Father.<br /><em>Still coming back.</em></h1>
        </div>
      </section>

      <section className={styles.story}>
        <p className={styles.eyebrow}>THE SHORT VERSION</p>
        <div>
          <p className={styles.lead}>I’m Chris. Husband to Rhea, father of three, and a small-business owner in Brevard, North Carolina.</p>
          <p>Rhea and I built a life together in Charleston, then moved our family to the mountains of Western North Carolina. We are raising three kids in Brevard now, trying to make a good home while work, phones, schedules, faith, and the normal pressure of family life keep changing around us.</p>
          <p>After graduating from Clemson University, I worked as an Outward Bound field instructor on 20- and 30-day canoe trips in the Southeast. I watched young people grow when they were given a real challenge, clear expectations, room to make decisions, and someone who stayed steady beside them. That taught me that change has to be lived, not just explained.</p>
          <p>Later, real estate and building Listings in Motion put me close to people making important decisions under pressure. I learned that good leadership is often practical: listen carefully, make the next step clear, and help people move without adding more noise. Those experiences shape this work as much as any idea does.</p>
          <p>For about twelve years, I drifted. I was in the house but not really there, always half a thought somewhere else, usually behind a screen. I found my way back to my family and back to my faith, and this is the work I am sharing: coming back, staying present, and becoming someone the people around me can count on.</p>
          <p>Here Supply Co. starts with a simple idea: leadership is not only what happens at work. It is also what you do with your attention, pressure, and presence in the rest of your life.</p>
          <p>I do not have a clinical title to lend this work, and I am not going to invent one. My responsibility is to show you what is inside, be honest about its limits, and make every practice useful in an ordinary week.</p>
          <p className={styles.personalNote}>When I am not working, I am usually lifting kettlebells, riding a mountain-bike trail, fishing, or taking my Trail 125 somewhere the road gets smaller.</p>
        </div>
      </section>

      <section className={styles.sharedStory} aria-labelledby="shared-story-title">
        <figure>
          <img src="/assets/video/chris-rhea-at-home-enhanced.png" alt="Chris and Rhea sitting together at home" width="1672" height="941" loading="lazy" decoding="async" />
          <figcaption>CHRIS + RHEA · AT HOME</figcaption>
        </figure>
        <div>
          <p className={styles.eyebrow}>A PRACTICE BUILT INSIDE A REAL MARRIAGE</p>
          <h2 id="shared-story-title">We did not need a perfect system.<br />We needed to <em>sit down together.</em></h2>
          <p>Rhea has her own side of this story. She helped me see what divided attention feels like from the other side and what actually makes a shared week easier. The Sunday Board Meeting is one small practice that grew from that real work between us.</p>
        </div>
      </section>

      <section className={styles.notes}>
        <p className={styles.sectionNumber}>01</p>
        <div>
          <p className={styles.eyebrow}>WHAT I BELIEVE</p>
          <h2>You do not need a different life.<br />You need to be more <em>inside</em> the one you have.</h2>
          <p className={styles.beliefIntro}>The work has to survive a real week: pressure, people, unfinished things, and a house that needs you. So it stays practical. One clear move. Then another.</p>
          <div className={styles.beliefList}>
            <article><span>01</span><h3>Presence is a practice.</h3><p>You can build it in small moments, even when you do not feel fully ready.</p></article>
            <article><span>02</span><h3>The people around you feel how you arrive.</h3><p>A calmer entrance, a pause before reacting, or fifteen undistracted minutes can change more than a speech.</p></article>
            <article><span>03</span><h3>Useful beats impressive.</h3><p>If a tool cannot live in an ordinary Tuesday, it does not belong in the system.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.fromChris} id="from-chris">
        <div className={styles.fromChrisInner}>
          <p className={styles.eyebrow}>A NOTE FROM CHRIS</p>
          <div className={styles.letter}>
          <h2>I made this for the part of life you cannot get <em>back.</em></h2>
            <div className={styles.letterBody}>
              <p>I am not standing outside of this work. I am a husband and father who knows what it is like to be physically present while my attention is somewhere else. Rhea has lived the other side of that story, and her perspective matters here. Here Supply Co. grew from our real effort to come back to each other, stay present, and take better care of the life we are building.</p>
              <p>Some of it began as writing about faith, family, and the quiet work of returning. The useful parts became named practices you can actually try. Nothing here asks you to become a project. It asks you to notice what matters and show up for it.</p>
              <p>This is practical educational work, not therapy, medical care, or a claim that I have life solved. If the work cannot be explained plainly or used honestly, it does not belong here.</p>
              <span className={styles.signature}>Chris</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
