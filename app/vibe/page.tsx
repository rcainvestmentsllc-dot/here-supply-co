import type { Metadata } from "next";
import "./vibe.css";

export const metadata: Metadata = {
  title: "Vibe comparison | Here Supply Co.",
  robots: { index: false, follow: false },
};

const HERO = "/assets/brand/sunday-board-hero-v1.jpg";
const SECOND = "/assets/course/photo/lesson-1-3-driveway-v1.jpg";

/**
 * Side-by-side of the same page in two identities. Copy, structure and
 * photography are identical in both so the only variable being judged is
 * the vibe: mark treatment, colour temperature, type and restraint.
 *
 * Preview only. Delete once a direction is chosen.
 */
export default function VibePage() {
  return (
    <div className="vibe-root">
      <input type="radio" name="vv" id="vv-a" defaultChecked />
      <input type="radio" name="vv" id="vv-b" />

      <div className="vibe-switch">
        <label htmlFor="vv-a">A · As it stands</label>
        <label htmlFor="vv-b">B · Salt &amp; discipline</label>
      </div>

      <div className="panes">
        {/* ─────────────── A ─────────────── */}
        <div className="pane pane-a">
          <p className="pane-note">
            Same copy. Same photo. Current mark, current saturation, current type.
          </p>
          <div className="a-wrap">
            <header className="a-head">
              <img src="/assets/brand/here-supply-co-logo-v2.svg" alt="Here Supply Co." />
              <nav className="a-nav">
                <a href="#a">Start here</a>
                <a href="#a">The full course</a>
                <a href="#a">About Chris</a>
              </nav>
              <a className="a-cta" href="#a">
                Start free →
              </a>
            </header>

            <section className="a-hero">
              <div>
                <p className="a-kicker">When your phone is taking more than it gives</p>
                <h1>
                  Your phone is a tool.
                  <br />
                  <em>You are not.</em>
                </h1>
                <p>
                  Here Supply Co. makes practical tools for people who are tired of being
                  physically present while their attention is somewhere else.
                </p>
                <div className="a-actions">
                  <a className="a-cta" href="#a">
                    Start the free Sunday Board Meeting
                  </a>
                  <a href="#a">See the full practice →</a>
                </div>
                <p className="a-fine">
                  Free 15-minute guide · Built by a real family · Opens immediately
                </p>
              </div>
              <figure className="a-shot">
                <img src={HERO} alt="A couple talking at a table" />
                <figcaption>
                  <b>THE RETURN</b>
                  <span>The phone is not the point. Presence is.</span>
                </figcaption>
              </figure>
            </section>

            <div className="a-strip">
              <div>
                <b>NOTICE</b> the drift
              </div>
              <div>
                <b>RESET</b> your attention
              </div>
              <div>
                <b>SHOW UP</b> for real life
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────── B ─────────────── */}
        <div className="pane pane-b">
          <p className="pane-note">
            Same copy. Same photo. Wordmark leads, wave demoted to a mark, colder grade,
            mono field-manual labels, serif for the human line.
          </p>
          <div className="b-wrap">
            <header className="b-head">
              <a className="b-lock" href="#b">
                <img src="/assets/brand/mark-ink.svg" alt="" />
                <i className="b-lockRule" />
                <span className="b-lockText">
                  <strong>Here Supply Co.</strong>
                  <small>Made in North Carolina</small>
                </span>
              </a>
              <nav className="b-nav">
                <a href="#b">Start here</a>
                <a href="#b">The course</a>
                <a href="#b">About Chris</a>
              </nav>
              <a className="b-cta" href="#b">
                Start free
              </a>
            </header>

            <section className="b-hero">
              <img src={HERO} alt="A couple talking at a table" />
              <div className="b-heroInner">
                <p className="b-rule">
                  <i />
                  01 — The drift
                </p>
                <h1>
                  Your phone is a tool. <span>You are not.</span>
                </h1>
                <p className="b-heroSub">
                  Practical tools for people tired of being physically present while their
                  attention is somewhere else.
                </p>
                <div className="b-heroActions">
                  <a className="b-btn" href="#b">
                    Start free
                  </a>
                  <a className="b-btnQuiet" href="#b">
                    See the full practice
                  </a>
                </div>
              </div>
            </section>

            <div className="b-spec">
              <div>
                <b>01 · Notice</b>
                <span>Name the drift before you try to fix anything else.</span>
              </div>
              <div>
                <b>02 · Reset</b>
                <span>Four small moves. Three days. No renegotiation.</span>
              </div>
              <div>
                <b>03 · Show up</b>
                <span>Bring a steadier self through the door every night.</span>
              </div>
            </div>

            <section className="b-body">
              <div>
                <p className="b-label">The airlock</p>
                <h2>Work should not follow you through the door.</h2>
                <p>
                  Two minutes in the driveway. Engine off. Phone down. Name what you are
                  carrying, then decide who needs you inside. The seal only works if you
                  maintain it.
                </p>
              </div>
              <figure className="b-figure">
                <img src={SECOND} alt="A driveway pause before going inside" />
                <figcaption>
                  <b>1.3 · Return</b>
                  <span>
                    The vehicle is the decompression chamber. Work is the ocean. Home is the
                    vessel.
                  </span>
                </figcaption>
              </figure>
            </section>


            <section className="b-identity">
              <p className="b-label">The mark, working</p>
              <h2 className="b-identityTitle">One wave. Four jobs.</h2>
              <div className="b-identityGrid">
                <figure className="b-idCell">
                  <div className="b-idStage">
                    <span className="b-lock">
                      <img src="/assets/brand/mark-ink.svg" alt="" />
                      <i className="b-lockRule" />
                      <span className="b-lockText">
                        <strong>Here Supply Co.</strong>
                        <small>Made in North Carolina</small>
                      </span>
                    </span>
                  </div>
                  <figcaption>Primary · on paper</figcaption>
                </figure>

                <figure className="b-idCell">
                  <div className="b-idStage b-idStageDark">
                    <span className="b-lock">
                      <img src="/assets/brand/mark-cream.svg" alt="" />
                      <i className="b-lockRule" />
                      <span className="b-lockText">
                        <strong>Here Supply Co.</strong>
                        <small>Made in North Carolina</small>
                      </span>
                    </span>
                  </div>
                  <figcaption>Reversed · on deep ground</figcaption>
                </figure>

                <figure className="b-idCell">
                  <div className="b-idStage">
                    <span className="b-badge">
                      <img src="/assets/brand/mark-ink.svg" alt="" />
                      <strong>Here Supply Co.</strong>
                      <small>Est. North Carolina</small>
                    </span>
                  </div>
                  <figcaption>Badge · printables and covers</figcaption>
                </figure>

                <figure className="b-idCell">
                  <div className="b-idStage">
                    <span className="b-markRow">
                      <img src="/assets/brand/mark-ink.svg" alt="" />
                      <img src="/assets/brand/mark-tide.svg" alt="" />
                    </span>
                  </div>
                  <figcaption>Ink + brass, or with the water kept teal</figcaption>
                </figure>
              </div>
            </section>
            <footer className="b-foot">
              <span className="b-lock">
                <img src="/assets/brand/mark-cream.svg" alt="" />
                <i className="b-lockRule" />
                <span className="b-lockText">
                  <strong>Here Supply Co.</strong>
                  <small>Est. North Carolina</small>
                </span>
              </span>
              <small>© 2026 Here Supply Co.</small>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
