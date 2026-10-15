import { MEN_OFFERS, usd } from "./program";

/**
 * Coaching terms for the men's program, in plain language. One source for
 * /men/coaching, /policies#coaching, and the coaching agreement in the
 * toolkit. Modeled on common coaching agreement terms: 24 hour rescheduling,
 * fees for delivered sessions owed, prorated refunds when the coach ends early,
 * and confidentiality with the legal exceptions spelled out.
 */
const { intensive, ongoing } = MEN_OFFERS;
const installmentTotal = intensive.installments.amount * intensive.installments.count;

export const COACHING_TERMS: { title: string; body: string }[] = [
  {
    title: "The free call",
    body: "Twenty minutes, no cost, no obligation. If coaching is not the right fit, I will say so and point you to something that is.",
  },
  {
    title: "Paying",
    body: `${intensive.name} is ${usd(intensive.price)} paid in full before the intake call, or ${intensive.installments.count} monthly payments of ${usd(intensive.installments.amount)} (${usd(installmentTotal)} total) with the first one before the intake. The founding price of ${usd(intensive.foundingPrice)} is paid in full. ${ongoing.name} is billed monthly at ${usd(ongoing.price)}, or ${usd(ongoing.yearPrice)} for a year paid up front. If a payment is more than seven days late, calls pause until it is caught up.`,
  },
  {
    title: "First call guarantee",
    body: "If after the intake call you decide this is not for you, tell me within 48 hours and I will refund everything you paid. No questions, no hard feelings.",
  },
  {
    title: "Moving a call",
    body: "Give me at least 24 hours’ notice and we will find another time, usually the same week. A call missed or moved with less than 24 hours’ notice counts as used. If you are late, the call still ends on time. If I ever need to move a call, you get the same notice and the call is made up.",
  },
  {
    title: "How long you have",
    body: "The twelve Intensive calls are used within sixteen weeks of the intake. That leaves room for a vacation, a sick kid, or a hard week at work without losing anything.",
  },
  {
    title: "Stopping early",
    body: `Either of us can end coaching with written notice by email. After the first call guarantee, payments already made are not refunded, and any installments not yet due are canceled. ${ongoing.name} starts with a ${ongoing.minimumMonths} month first agreement, then continues month to month and stops with thirty days’ notice. A year paid up front is refundable only within the first thirty days. If I end coaching early for any reason, you get a prorated refund for every week or month you paid for and did not receive.`,
  },
  {
    title: "Between calls",
    body: "Send a text, email, or voice memo on weekdays and I reply within one business day. Weekends and holidays are for both of our families.",
  },
  {
    title: "Confidentiality",
    body: "What you tell me stays between us, and calls are not recorded unless you ask. I never use your name or story without your written permission. The exceptions are the ones the law sets: a serious risk of harm to you or someone else, the abuse of a child or a vulnerable adult, or a court order.",
  },
  {
    title: "What coaching is",
    body: "Coaching is about habits, leadership, and relationships going forward. It is not therapy, counseling, medical care, legal or financial advice, or crisis support. You make your own decisions and own the results. If you are in crisis, call or text 988.",
  },
];
