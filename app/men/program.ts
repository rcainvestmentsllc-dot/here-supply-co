/**
 * The men's coaching program: one source for every price, promise, and week
 * that appears on the men's pages. Change a price here and every page follows.
 * Planning doc: "Men's Coaching Program" (Claude Docs), October 13, 2026.
 */

/**
 * Checkout for the men's course: the MailerLite product "All the Way Here,
 * Men's Edition" (Stripe, founding price applied there). Buyers land in the
 * Men's Edition Buyers group, which starts the weekly buyer track. Set
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
    name: "All the Way Here, Men's Edition",
    short: "The course",
    price: 99,
    foundingPrice: 49,
    foundingSeats: 50,
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
  { week: 6, part: "Lead", title: "The Date Night Experiment", body: "Plan one new thing with your partner and carry the logistics. If you are single, take it to one relationship that matters." },
  { week: 7, part: "Lead", title: "The Floor General", body: "Five to fifteen minutes a day at your kids' level, or with someone you mentor if there are no kids at home." },
  { week: 8, part: "Lead", title: "Leading the room at work", body: "Take the Thermostat into one hard conversation with a team member, a client, or a partner. Midpoint review." },
  { week: 9, part: "Keep", title: "The Third Place", body: "One place where you are not in charge of anything. Go back twice this month." },
  { week: 10, part: "Keep", title: "The Friendship Script", body: "Invite one man to do something side by side." },
  { week: 11, part: "Keep", title: "Your weekly plan", body: "Fifteen minutes on Sunday: the week ahead at home and at work, and the one thing you will protect." },
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
