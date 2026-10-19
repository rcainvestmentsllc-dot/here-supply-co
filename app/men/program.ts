/**
 * The men's coaching program: one source for every price, promise, and week
 * that appears on the men's pages. Change a price here and every page follows.
 * Planning doc: "Men's Coaching Program" (Claude Docs), October 13, 2026.
 */

/**
 * Checkout for the men's course, Carry It Well: a MailerLite product on Stripe
 * at one flat price. Buyers land in the Men's Edition Buyers group (the group
 * keeps its original name), which starts the weekly buyer track. Set
 * NEXT_PUBLIC_MEN_CHECKOUT_URL to override; an empty value shows "opening soon".
 */
export const MEN_CHECKOUT = process.env.NEXT_PUBLIC_MEN_CHECKOUT_URL || "https://checkout.mailerlite.com/checkout/36730";

/**
 * The free call booking page (a Google Calendar appointment schedule).
 * Empty until Chris creates it. Once set, the apply form offers "Pick a
 * time now" right after a man sends it, and the pages say so.
 */
export const BOOKING_URL = process.env.NEXT_PUBLIC_MEN_BOOKING_URL || "";

export const MEN_OFFERS = {
  course: {
    name: "Carry It Well",
    short: "The course",
    line: "Nine weeks for men who carry a lot",
    price: 49,
  },
  /** Group coaching. Off for now: Chris starts one on one. Flip open to show it again. */
  table: {
    open: false,
    name: "The Weekly Table",
    short: "Weekly group",
    price: 149,
    maxMen: 12,
    startsAt: 6,
    callMinutes: 45,
  },
  intensive: {
    name: "The 90 Day Intensive",
    short: "Twelve weeks one on one",
    price: 2500,
    installments: { count: 3, amount: 900 },
    callMinutes: 45,
    intakeMinutes: 60,
  },
  ongoing: {
    name: "Ongoing Coaching",
    short: "One on one, month to month",
    price: 500,
    yearPrice: 5400,
    minimumMonths: 6,
    callsPerMonth: 2,
    callMinutes: 30,
  },
} as const;

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** The 90 Day Intensive, week by week. The lessons are the men's course. */
export const INTENSIVE_WEEKS = [
  { week: 1, part: "Start", title: "Intake and The Solo", body: "A sixty minute first call: where things stand at home, at work, and in you. Three goals for ninety days. That week you take half a day alone with a notebook." },
  { week: 2, part: "See it", title: "The Honest Map", body: "Score seven areas of your life, circle the one you avoid, and make one move on it with a day and a time." },
  { week: 3, part: "See it", title: "The Drift", body: "Seven nights of logging what you reach for and what you felt right before. Then a 9 PM plan set up in advance." },
  { week: 4, part: "See it", title: "Short Fuse", body: "Your three warning signs, a sixty second reset, and a repair every time you miss. Month one review on the call." },
  { week: 5, part: "Carry it", title: "Choose Your Battles", body: "Everything you carry in three columns: mine to fight, mine to hand off, not mine at all. Then one hard conversation." },
  { week: 6, part: "Carry it", title: "Enough", body: "Enough money, enough hours, enough yes, written down. One hard edge for thirty days, told to the people it affects." },
  { week: 7, part: "Carry it", title: "Fuel", body: "Sleep, a simple training week, ten quiet minutes a day with the Waking Up course, heat if you have a sauna, and one hard thing on the calendar." },
  { week: 8, part: "Carry it", title: "Leading at work", body: "Take one practice into the business: the conversation you have avoided with a team member, a client, or a partner. Midpoint review." },
  { week: 9, part: "Build it", title: "Your Council", body: "Name two or three men, invite one specifically, and put the second time on the calendar before the first one happens." },
  { week: 10, part: "Build it", title: "The Inheritance", body: "The playbook you got from your father, marked keep, change or stop, and one new version practiced out loud." },
  { week: 11, part: "Build it", title: "What You Pass On", body: "Your creed on one page, a challenge with each kid, and one real skill taught this month." },
  { week: 12, part: "Finish", title: "Keep the two", body: "Review the ninety days, choose two practices to keep, and decide what comes next." },
] as const;

/** When coaching is the wrong tool. Shown on the coaching and apply pages. */
export const REFER_OUT = [
  "Depression, anxiety, or panic that is affecting daily life",
  "Thoughts of suicide or self harm. Call or text 988 any time.",
  "Drinking, drugs, or another addiction driving the problems",
  "Abuse at home, by you or toward you",
  "A marriage that needs a couples counselor more than a coach",
] as const;

/** The header button on every men's page. */
export const MEN_HEADER_ACTION = { href: "/men/apply", label: "Book a free call" } as const;
