"use client";

import { useEffect, useState } from "react";

type MailerLite = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

declare global {
  interface Window {
    ml?: MailerLite;
  }
}

const ACCOUNT_ID = "2381566";
const FORM_ID = "B8mkye";

export function SundayBoardSignupForm() {
  const [formStatus, setFormStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    const embed = document.querySelector<HTMLDivElement>(`.ml-embedded[data-form="${FORM_ID}"]`);
    const fallbackTimer = window.setTimeout(() => setFormStatus("unavailable"), 6000);

    const customizeForm = () => {
      if (!embed) return;

      const heading = embed.querySelector("h4");
      const description = embed.querySelector(".ml-form-embedContent p");
      const submit = embed.querySelector<HTMLButtonElement>('button[type="submit"]');
      const email = embed.querySelector<HTMLInputElement>('input[type="email"]');

      if (heading && heading.textContent !== "Start the Sunday Board Meeting") {
        heading.textContent = "Start the Sunday Board Meeting";
      }

      if (description && description.textContent !== "Enter your email and I’ll send the printable meeting guide.") {
        description.textContent = "Enter your email and I’ll send the printable meeting guide.";
      }

      if (submit && submit.textContent !== "Send me the meeting guide") {
        submit.textContent = "Send me the meeting guide";
      }

      if (submit && !submit.dataset.ironCompassStyled) {
        submit.dataset.ironCompassStyled = "true";
        submit.style.setProperty("background-color", "#a6533b", "important");
        submit.style.setProperty("color", "#ffffff", "important");
        submit.style.setProperty("min-height", "52px", "important");
        submit.style.setProperty("border-radius", "2px", "important");
        submit.addEventListener("mouseenter", () => submit.style.setProperty("background-color", "#91452f", "important"));
        submit.addEventListener("mouseleave", () => submit.style.setProperty("background-color", "#a6533b", "important"));
      }

      if (email) {
        email.id = "sunday-board-email";
        email.autocomplete = "email";
        email.setAttribute("aria-label", "Email address");

        if (!embed.querySelector('label[for="sunday-board-email"]')) {
          const label = document.createElement("label");
          label.htmlFor = "sunday-board-email";
          label.className = "signup-label";
          label.textContent = "Email address";
          label.style.setProperty("display", "block", "important");
          label.style.setProperty("margin", "0 0 8px", "important");
          label.style.setProperty("color", "#f8f4eb", "important");
          label.style.setProperty("font-size", "12px", "important");
          label.style.setProperty("font-weight", "700", "important");
          email.parentElement?.insertBefore(label, email);
        }
      }

      if (heading && description && submit && email) {
        window.clearTimeout(fallbackTimer);
        setFormStatus("ready");
        observer.disconnect();
      }
    };

    const observer = new MutationObserver(customizeForm);
    if (embed) observer.observe(embed, { childList: true, subtree: true });

    if (!window.ml) {
      const ml = ((...args: unknown[]) => {
        (ml.q ??= []).push(args);
      }) as MailerLite;

      ml.q = [];
      window.ml = ml;
    }

    window.ml("account", ACCOUNT_ID);

    if (!document.querySelector("script[data-mailerlite-universal]")) {
      const script = document.createElement("script");
      script.src = "https://assets.mailerlite.com/js/universal.js";
      script.async = true;
      script.dataset.mailerliteUniversal = "true";
      document.head.appendChild(script);
    }

    customizeForm();

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="signup-card">
      <div className="signup-card-intro">
        <span>FREE 15-MINUTE MEETING GUIDE</span>
        <h3>Where should I send it?</h3>
        <p>Enter your email below. The guide opens immediately, and I will send five short notes to help you use it.</p>
      </div>
      <div className="ml-embedded" data-form={FORM_ID} />
      {formStatus === "loading" && <p className="signup-loading" aria-live="polite">Loading the secure email form…</p>}
      {formStatus === "unavailable" && <p className="signup-fallback">
        <span>The form is taking too long.</span>
        <a href="/downloads/sunday-board-meeting.pdf" download>Download the guide directly</a>
      </p>}
      <noscript><p className="signup-fallback"><span>The email form needs JavaScript.</span><a href="/downloads/sunday-board-meeting.pdf" download>Download the guide directly</a></p></noscript>
    </div>
  );
}
