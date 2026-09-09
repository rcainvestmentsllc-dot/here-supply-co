export type MomentKey = "attention" | "arrival" | "pressure" | "week" | "mind" | "distance";

export const FREE_BOARD_PDF = "/downloads/sunday-board-meeting.pdf";

// MailerLite supplies the verified Stripe-powered checkout URLs. Environment
// values may override them without another source change.
export const CHECKOUT = {
  focus: process.env.NEXT_PUBLIC_FOCUS_CHECKOUT_URL || "https://checkout.mailerlite.com/checkout/34346",
  core: process.env.NEXT_PUBLIC_CORE_CHECKOUT_URL || "https://checkout.mailerlite.com/checkout/34347",
} as const;

export const CONTACT_FORM = "/working-session#contact-chris";

type Moment = {
  number: string;
  title: string;
  detail: string;
  label: string;
  protocol: string;
  summary: string;
  steps: string[];
  note: string;
  nextLabel: string;
  nextHref: string;
};

export const MOMENTS: Record<MomentKey, Moment> = {
  attention: {
    number: "01",
    title: "My attention keeps drifting away.",
    detail: "Phone, work, and noise are getting more of me than the people I love.",
    label: "Bring your attention back",
    protocol: "THE 15-MINUTE FLOOR RULE",
    summary: "This is a presence problem, not a phone problem.",
    steps: [
      "Put your phone in another room.",
      "Choose one person. Sit at their level, or turn fully toward them.",
      "For fifteen minutes, follow their conversation or play. Do not steer it, check something, or multitask.",
    ],
    note: "The point is proximity and attention. The Attention Reset inside All the Way Here goes deeper if the reflex keeps winning.",
    nextLabel: "See All the Way Here · $99",
    nextHref: "/library",
  },
  arrival: {
    number: "02",
    title: "I come home, but I do not really arrive.",
    detail: "The day follows me through the door and sets the tone.",
    label: "Use the door as a reset",
    protocol: "THE AIRLOCK PROTOCOL",
    summary: "A clean stopping point can keep the whole workday from walking through the door with you.",
    steps: [
      "Park. Engine off. Phone silent.",
      "Take a two-minute inventory. Name what you are carrying that belongs to tomorrow.",
      "Take three deep breaths, then decide how you want to enter before opening the door.",
    ],
    note: "You do not need to fake a good mood. You do need to stop handing your family the whole weight of the day.",
    nextLabel: "See All the Way Here · $99 founding price",
    nextHref: "/library#core",
  },
  pressure: {
    number: "03",
    title: "Pressure is changing how I react.",
    detail: "I am sharper, quieter, or more distant than I want to be.",
    label: "Lower the temperature before you speak",
    protocol: "THE EMOTIONAL THERMOSTAT",
    summary: "Pressure often shows up in your tone, distance, or speed before you explain what is wrong.",
    steps: [
      "Before your next answer, inhale for four and exhale for six.",
      "If you are still hot, take ten minutes and name the time you will come back.",
      "Return when you said you would, then start with one calm sentence.",
    ],
    note: "A pause is not disappearing if you keep your word and return.",
    nextLabel: "See All the Way Here · $99 founding price",
    nextHref: "/library#core",
  },
  week: {
    number: "04",
    title: "The week keeps getting away from us.",
    detail: "The things that matter get pushed aside by logistics and surprise.",
    label: "Put the week on the table",
    protocol: "THE WEEKLY CHECK-IN",
    summary: "A short weekly check-in keeps the house from being run by surprise.",
    steps: [
      "Set aside fifteen minutes on Sunday with the one-page guide.",
      "Start with one honest appreciation before moving into logistics.",
      "Look at the calendar, name the pressure points, choose one shared priority, and remove one unnecessary thing.",
    ],
    note: "Nothing has to be solved at once. The point is to see the same week.",
    nextLabel: "Get the free weekly guide",
    nextHref: "/sunday-board",
  },
  mind: {
    number: "05",
    title: "My head is too full to be here.",
    detail: "I am trying to carry work, home, and every unfinished thing at once.",
    label: "Get it out of your head",
    protocol: "THE SANCTUARY",
    summary: "Your mind is for processing, not for storing every open loop.",
    steps: [
      "Put paper in front of you, not your phone.",
      "Write every open loop down: work, home, promises, and worries.",
      "Keep going until the list loses its grip. Do not organize it yet.",
    ],
    note: "Use a Sunday night mind sweep when you can. This is a reset, not another system to manage.",
    nextLabel: "See All the Way Here · $99 founding price",
    nextHref: "/library#core",
  },
  distance: {
    number: "06",
    title: "I am carrying too much by myself.",
    detail: "I need a real connection, not another thing to manage.",
    label: "Invite one person into the week",
    protocol: "THE FRIENDSHIP SCRIPT",
    summary: "Real friendship is shared time, low stakes, and repetition.",
    steps: [
      "Pick one person you respect.",
      "Invite them to something shoulder-to-shoulder, with a day and time.",
      "Keep the invitation light. Repeat it next week if it needs to become a rhythm.",
    ],
    note: "Do not wait until isolation feels like an emergency. Invite first.",
    nextLabel: "See All the Way Here · $99 founding price",
    nextHref: "/library#core",
  },
};
