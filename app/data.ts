export type MomentKey = "attention" | "arrival" | "pressure" | "week" | "mind" | "distance";

export const FREE_BOARD_PDF = "/downloads/sunday-board-meeting.pdf";

// MailerLite supplies the Stripe-powered checkout URLs. Keep these empty until
// the real, public URLs have been verified. Production environment values can
// turn checkout on without another source change.
export const CHECKOUT = {
  focus: process.env.NEXT_PUBLIC_FOCUS_CHECKOUT_URL || "",
  core: process.env.NEXT_PUBLIC_CORE_CHECKOUT_URL || "",
} as const;

export const CONTACT_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSfw1xxS3wh6KoQHNQiNIVfIZ2Sz3aS42LoJCIxjOVb2qCEp4A/viewform";

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
    title: "My attention keeps leaving the room.",
    detail: "Phone, work, and noise are getting more of me than the people I love.",
    label: "Put your attention back in the room",
    protocol: "THE 15-MINUTE FLOOR RULE",
    summary: "This is a presence problem, not a phone problem.",
    steps: [
      "Put your phone in another room.",
      "Choose one person. Sit at their level, or turn fully toward them.",
      "For fifteen minutes, follow their conversation or play. Do not steer it, check something, or multitask.",
    ],
    note: "The point is proximity and attention. Focus Protocol is the deeper reset if the reflex keeps winning.",
    nextLabel: "See Focus Protocol · $29",
    nextHref: "/focus",
  },
  arrival: {
    number: "02",
    title: "I come home, but I do not really arrive.",
    detail: "The day follows me through the door and sets the tone.",
    label: "Use the door as a reset",
    protocol: "THE AIRLOCK PROTOCOL",
    summary: "Your vehicle can be a decompression chamber instead of a place to keep working.",
    steps: [
      "Park. Engine off. Phone silent.",
      "Take a two-minute inventory. Name what you are carrying that belongs to tomorrow.",
      "Take three deep breaths, then decide how you want to enter before opening the door.",
    ],
    note: "You do not need to fake a good mood. You do need to stop handing the whole day to the room.",
    nextLabel: "See how Iron Compass Core works · $249",
    nextHref: "/library#core",
  },
  pressure: {
    number: "03",
    title: "Pressure is changing how I react.",
    detail: "I am sharper, quieter, or more distant than I want to be.",
    label: "Lower the temperature before you speak",
    protocol: "THE EMOTIONAL THERMOSTAT",
    summary: "The people around you feel your nervous system before they hear your explanation.",
    steps: [
      "Before your next answer, inhale for four and exhale for six.",
      "If you are still hot, take ten minutes and name the time you will come back.",
      "Return when you said you would, then start with one calm sentence.",
    ],
    note: "A pause is not disappearing if you keep your word and return.",
    nextLabel: "See how Iron Compass Core works · $249",
    nextHref: "/library#core",
  },
  week: {
    number: "04",
    title: "The week keeps getting away from us.",
    detail: "The things that matter get pushed aside by logistics and surprise.",
    label: "Put the week on the table",
    protocol: "THE SUNDAY BOARD MEETING",
    summary: "A short weekly check-in keeps the house from being run by surprise.",
    steps: [
      "Set aside fifteen minutes on Sunday with a notebook or the Board.",
      "Rate connection, communication, and intimacy from one to ten.",
      "Look at the week ahead, then decide needs, money, time together, and one shared win.",
    ],
    note: "Nothing has to be solved at once. The point is to see the same week.",
    nextLabel: "Start the Sunday Board Meeting",
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
    nextLabel: "See how Iron Compass Core works · $249",
    nextHref: "/library#core",
  },
  distance: {
    number: "06",
    title: "I am carrying too much by myself.",
    detail: "I need a real connection, not another thing to manage.",
    label: "Invite one man into the week",
    protocol: "THE FRIENDSHIP SCRIPT",
    summary: "Real friendship is shared time, low stakes, and repetition.",
    steps: [
      "Pick one man you respect.",
      "Invite him to something shoulder-to-shoulder, with a day and time.",
      "Keep the invitation light. Repeat it next week if it needs to become a rhythm.",
    ],
    note: "Do not wait until isolation feels like an emergency. Invite first.",
    nextLabel: "See how Iron Compass Core works · $249",
    nextHref: "/library#core",
  },
};

export const GAMMA_LINKS = [
  { part: "RETURN", title: "Focus Protocol Field Manual", url: "https://gamma.app/docs/THE-FOCUS-PROTOCOL-FIELD-MANUAL-1e8xnpevr7y2f86", image: "/assets/focus-manual-gamma.png" },
  { part: "RETURN", title: "The Sanctuary", url: "https://gamma.app/docs/Lesson-11-The-Sanctuary-ks4wbqez3b0384f" },
  { part: "RETURN", title: "Hunter vs Farmer", url: "https://gamma.app/docs/Lesson-12-Hunter-vs-Farmer-zktck875plpgjbi" },
  { part: "RETURN", title: "The Airlock Protocol", url: "https://gamma.app/docs/The-Airlock-Protocol-j0hhl3j5cf3l76m", image: "/assets/airlock-gamma.png" },
  { part: "LEAD", title: "The Emotional Thermostat", url: "https://gamma.app/docs/Lesson-21-The-Emotional-Thermostat-grrn6z038pqeeh3", image: "/assets/thermostat-gamma.png" },
  { part: "LEAD", title: "The Date Night Algorithm", url: "https://gamma.app/docs/Lesson-22-The-Date-Night-Algorithm-nibyrgknicz50ca" },
  { part: "LEAD", title: "The Floor General", url: "https://gamma.app/docs/Lesson-23-The-Floor-General-qzl1knac91dwqcr" },
  { part: "LEAD", title: "The Sunday Board Meeting", url: "https://gamma.app/docs/The-Sunday-Board-Meeting-zroxal5otuy6ea7", image: "/assets/sunday-board-gamma.png" },
  { part: "KEEP", title: "The Third Place", url: "https://gamma.app/docs/Lesson-31-The-Third-Place-tcrnns3z62pfh6x", image: "/assets/third-place-gamma.png" },
  { part: "KEEP", title: "The Friendship Script", url: "https://gamma.app/docs/Lesson-32-The-Friendship-Script-vw56yj43hxkrk2e" },
  { part: "KEEP", title: "Mission Debrief", url: "https://gamma.app/docs/Mission-Debrief-zwlmy52mct3verq" },
  { part: "KEEP", title: "Iron Compass Workbook", url: "https://gamma.app/docs/IRON-COMPASS-Workbook-0yrg0ombyum4l4g" },
];
