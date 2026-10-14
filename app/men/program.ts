/**
 * The men's coaching program: one source for every price, promise, and week
 * that appears on the men's pages. Change a price here and every page follows.
 * Planning doc: "Men's Coaching Program" (Claude Docs), October 13, 2026.
 */

/**
 * Checkout for the men's course. Empty until the MailerLite product exists;
 * the course page shows "opening soon" until then. Paste the checkout URL
 * here, or set NEXT_PUBLIC_MEN_CHECKOUT_URL, and the buy buttons go live.
 */
export const MEN_CHECKOUT = process.env.NEXT_PUBLIC_MEN_CHECKOUT_URL || "";

export const MEN_OFFERS = {
  course: {
    name: "All the Way Here, Men's Edition",
    short: "The course",
    price: 99,
    foundingPrice: 49,
    foundingSeats: 50,
  },
  table: {
    name: "The Weekly Table",
    short: "Weekly group",
    price: 149,
    maxMen: 20,
    startsAt: 6,
    callMinutes: 45,
  },
  intensive: {
    name: "The 90 Day Intensive",
    short: "Twelve weeks one on one",
    price: 2500,
    installments: { count: 3, amount: 900 },
    foundingPrice: 1500,
    foundingSeats: 10,
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
  { week: 1, part: "Start", title: "Intake and the Focus Protocol", body: "A sixty minute first call. Where you are drifting at home, at work, and in yourself. Three goals for ninety days. You start the three day reset." },
  { week: 2, part: "Return", title: "The Sanctuary", body: "A weekly brain dump on paper. Every open loop out of your head and onto one page." },
  { week: 3, part: "Return", title: "Focus Mode", body: "Protect the first block of your day for the work only you can do." },
  { week: 4, part: "Return", title: "The Driveway Pause", body: "Two minutes in the truck before you walk in. Month one review on the call." },
  { week: 5, part: "Lead", title: "The Emotional Thermostat", body: "Pause, return, repair. One trigger tracked at home and one at work." },
  { week: 6, part: "Lead", title: "The Date Night Experiment", body: "Plan one new thing with your partner and carry the logistics. Single: one relationship that matters." },
  { week: 7, part: "Lead", title: "The Floor General", body: "Fifteen minutes a day at your kids' level. No kids at home: someone you mentor." },
  { week: 8, part: "Lead", title: "Leading the room at work", body: "Take the Thermostat into one hard conversation with a team member, a client, or a partner. Midpoint review." },
  { week: 9, part: "Keep", title: "The Third Place", body: "One place where you are not in charge of anything. Go once a week." },
  { week: 10, part: "Keep", title: "The Friendship Script", body: "Invite one man to do something. Shoulder to shoulder." },
  { week: 11, part: "Keep", title: "The Weekly Board", body: "Plan the week on Sunday, with your partner if you have one or on your own if not." },
  { week: 12, part: "Finish", title: "Mission Debrief", body: "Review the ninety days, choose two practices to keep, and decide what comes next." },
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
