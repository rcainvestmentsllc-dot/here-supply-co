"use client";

import { useMemo, useState } from "react";

type Drift = "attention" | "arrival" | "heat" | "alone";

const DRIFT_OPTIONS: Array<{ id: Drift; number: string; title: string; body: string }> = [
  {
    id: "attention",
    number: "01",
    title: "My attention keeps leaving",
    body: "I am beside my family, but my phone, work, or noise has the better part of me.",
  },
  {
    id: "arrival",
    number: "02",
    title: "I do not arrive well",
    body: "The day follows me through the door. I am there, but I am not available.",
  },
  {
    id: "heat",
    number: "03",
    title: "I get hot or shut down",
    body: "When pressure rises, I become sharp, distant, defensive, or hard to reach.",
  },
  {
    id: "alone",
    number: "04",
    title: "I am carrying it alone",
    body: "I have people around me, but no place where I am actually known or steady.",
  },
];

const MOMENTS = ["The first hour after work", "Dinner and bedtime", "Late at night", "The weekend"];
const WINDOWS = ["Tonight", "The next time I walk in", "The next hard conversation", "This Sunday"];

const PLANS: Record<Drift, { name: string; direction: string; firstMove: string; guardrail: string; fieldNote: string }> = {
  attention: {
    name: "The Focus Protocol",
    direction: "Your presence needs a protected first hour, not more willpower.",
    firstMove: "Put the phone on charge outside the room where your family is. Give the next 20 minutes to one person, with no second screen.",
    guardrail: "Do not make this a lifetime promise. Protect the next window only.",
    fieldNote: "Presence is a practice of returning, not a performance of being perfect.",
  },
  arrival: {
    name: "The Airlock",
    direction: "Do not let work enter the house in your body before you do.",
    firstMove: "Before opening the door, pause for three slow breaths. Decide the first person you will greet and the first question you will ask.",
    guardrail: "Do not use the doorway to unload your day. Arrive first. Debrief later if it is needed.",
    fieldNote: "The transition is small, but it changes which version of you enters the room.",
  },
  heat: {
    name: "The Emotional Thermostat",
    direction: "Regulation comes before the conversation you hope to have.",
    firstMove: "Name your temperature before you answer: low, rising, or hot. If you are hot, take ten minutes and say when you will come back.",
    guardrail: "A pause is not avoidance when you name it and return to the conversation.",
    fieldNote: "You do not have to win the moment to lead it well.",
  },
  alone: {
    name: "The Third Place",
    direction: "You need one steady relationship outside work and home.",
    firstMove: "Text one man you respect: “I have been carrying too much alone. Want to take a walk or grab coffee this week?”",
    guardrail: "Pick one person. Do not turn finding connection into another project you never start.",
    fieldNote: "A capable man can still need a place to be honest and known.",
  },
};

function ChoiceButton({ selected, children, onClick }: { selected: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button className={`choice ${selected ? "selected" : ""}`} type="button" onClick={onClick}>
      <span className="choice-mark" aria-hidden="true">{selected ? "✓" : ""}</span>
      <span>{children}</span>
    </button>
  );
}

export default function Home() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [drift, setDrift] = useState<Drift | null>(null);
  const [moment, setMoment] = useState("");
  const [window, setWindow] = useState("");
  const [copied, setCopied] = useState(false);
  const plan = useMemo(() => (drift ? PLANS[drift] : null), [drift]);

  const reset = () => {
    setStage(0);
    setDrift(null);
    setMoment("");
    setWindow("");
    setCopied(false);
  };

  const copyPlan = async () => {
    if (!plan) return;
    const message = `My Iron Compass check\n\nThe moment I want to lead differently: ${moment}.\nMy next window: ${window}.\n\nInstall: ${plan.name}\n${plan.firstMove}\n\nGuardrail: ${plan.guardrail}`;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={reset}>
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span>IRON COMPASS</span>
        </a>
        <span className="nav-note">A better next moment.</span>
      </nav>

      {stage === 0 && (
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">FOR FATHERS WHO ARE DONE BEING HALF HERE</p>
            <h1>Be the man your family can <em>feel.</em></h1>
            <p className="lede">Not a diagnosis. Not a lecture. A three-minute check that gives you one clear move for the moment that matters next.</p>
            <button className="button primary" type="button" onClick={() => setStage(1)}>Take the Compass Check <span aria-hidden="true">→</span></button>
            <p className="microcopy">Private by design. Nothing is collected or saved.</p>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit-line orbit-outer" />
            <div className="orbit-line orbit-inner" />
            <div className="compass-core"><span>N</span><strong>HERE</strong><span>S</span></div>
            <p>ONE MAN<br />ONE SYSTEM<br />EVERY ROOM</p>
          </div>
          <div className="proof-strip"><span>01 &nbsp; Attention</span><span>02 &nbsp; Regulation</span><span>03 &nbsp; Identity</span></div>
        </section>
      )}

      {stage > 0 && stage < 4 && (
        <section className="check-shell" aria-labelledby="check-title">
          <div className="check-header">
            <button className="back" type="button" onClick={() => setStage((stage - 1) as 0 | 1 | 2 | 3)}>← Back</button>
            <div className="progress" aria-label={`Step ${stage} of 3`}>{[1, 2, 3].map((number) => <span className={number <= stage ? "active" : ""} key={number} />)}</div>
            <span className="step-count">0{stage} / 03</span>
          </div>

          {stage === 1 && (
            <div className="question-stage">
              <p className="eyebrow">THE HONEST START</p>
              <h2 id="check-title">Where are you most likely to leave the room?</h2>
              <p className="supporting">Choose the one that feels most true this week. You can work on the rest later.</p>
              <div className="drift-grid">
                {DRIFT_OPTIONS.map((option) => (
                  <button className={`drift-card ${drift === option.id ? "selected" : ""}`} type="button" key={option.id} onClick={() => setDrift(option.id)}>
                    <span className="card-number">{option.number}</span><strong>{option.title}</strong><span>{option.body}</span>
                  </button>
                ))}
              </div>
              <button className="button primary next" type="button" disabled={!drift} onClick={() => setStage(2)}>Continue <span aria-hidden="true">→</span></button>
            </div>
          )}

          {stage === 2 && (
            <div className="question-stage compact">
              <p className="eyebrow">MAKE IT REAL</p>
              <h2 id="check-title">When does this usually show up?</h2>
              <p className="supporting">The specific moment matters more than a general intention.</p>
              <div className="choice-list">{MOMENTS.map((item) => <ChoiceButton key={item} selected={moment === item} onClick={() => setMoment(item)}>{item}</ChoiceButton>)}</div>
              <button className="button primary next" type="button" disabled={!moment} onClick={() => setStage(3)}>Continue <span aria-hidden="true">→</span></button>
            </div>
          )}

          {stage === 3 && (
            <div className="question-stage compact">
              <p className="eyebrow">CLAIM A WINDOW</p>
              <h2 id="check-title">When will you make the next rep?</h2>
              <p className="supporting">This is not a promise to become a different man overnight. It is a choice about one window.</p>
              <div className="choice-list">{WINDOWS.map((item) => <ChoiceButton key={item} selected={window === item} onClick={() => setWindow(item)}>{item}</ChoiceButton>)}</div>
              <button className="button primary next" type="button" disabled={!window} onClick={() => setStage(4)}>Show my next move <span aria-hidden="true">→</span></button>
            </div>
          )}
        </section>
      )}

      {stage === 4 && plan && (
        <section className="result-shell" aria-labelledby="result-title">
          <div className="result-topline"><span>YOUR NEXT COMPASS POINT</span><button className="text-button" type="button" onClick={reset}>Start again</button></div>
          <div className="result-main">
            <p className="eyebrow">{window.toUpperCase()}</p>
            <h2 id="result-title">{plan.name}</h2>
            <p className="result-direction">{plan.direction}</p>
            <div className="plan-grid">
              <article><span className="plan-label">YOUR FIRST MOVE</span><p>{plan.firstMove}</p></article>
              <article><span className="plan-label">THE GUARDRAIL</span><p>{plan.guardrail}</p></article>
            </div>
            <blockquote>“{plan.fieldNote}”</blockquote>
            <div className="action-row">
              <button className="button primary" type="button" onClick={copyPlan}>{copied ? "Copied to your notes" : "Copy my plan"}</button>
              <a className="button secondary" href="https://www.skool.com/the-iron-compass-6783">Explore Iron Compass <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <p className="result-footnote">Your next moment: <strong>{moment}</strong>. You do not need a bigger plan than that today.</p>
        </section>
      )}

      <footer><span>IRON COMPASS</span><span>For practical support and habit-building. It is not therapy, crisis support, or medical care.</span></footer>
    </main>
  );
}
