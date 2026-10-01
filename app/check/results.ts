/**
 * The "Where are you drifting?" check.
 *
 * Five quick questions. Each answer points at one pressure point. The most
 * chosen pressure point becomes the result, and the result routes to one free
 * starting point plus the matching lesson inside All the Way Here. This is the
 * old Iron Compass idea (name the drift, prescribe the practice) in a form a
 * stranger can finish in a minute.
 */

export type PressureKey = "phone" | "loops" | "work" | "temper" | "couple" | "kids" | "self";

export type Question = {
  prompt: string;
  options: { label: string; key: PressureKey | null }[];
};

export const QUESTIONS: Question[] = [
  {
    prompt: "When the evening finally slows down, where does your attention go?",
    options: [
      { label: "To my phone, usually before I notice", key: "phone" },
      { label: "To everything I still have to do", key: "loops" },
      { label: "Back to work, replaying the day", key: "work" },
      { label: "To whatever the kids need next", key: "kids" },
    ],
  },
  {
    prompt: "If the person you share life with answered honestly, what would they say is hardest about you lately?",
    options: [
      { label: "You are here, but not really here", key: "phone" },
      { label: "You are short with us over small things", key: "temper" },
      { label: "We never get time that is just ours", key: "couple" },
      { label: "You have nothing left that is just yours", key: "self" },
    ],
  },
  {
    prompt: "The first ten minutes after getting home usually look like this:",
    options: [
      { label: "Still finishing a call or an email", key: "work" },
      { label: "Checking my phone on the couch", key: "phone" },
      { label: "Running logistics: dinner, schedules, bills", key: "loops" },
      { label: "Snapping at something that should not matter", key: "temper" },
    ],
  },
  {
    prompt: "When did the two of you last have a real conversation that was not about logistics?",
    options: [
      { label: "This week", key: null },
      { label: "A few weeks ago", key: "couple" },
      { label: "Honestly, I cannot remember", key: "couple" },
      { label: "We talk, but my head is somewhere else", key: "loops" },
    ],
  },
  {
    prompt: "Which of these lands a little too close to home?",
    options: [
      { label: "“Watch this!” and I look up a second too late", key: "kids" },
      { label: "Someone asks what I do for fun and I list old hobbies", key: "self" },
      { label: "“Can we talk later?” keeps meaning never", key: "couple" },
      { label: "I am exhausted and I did nothing that mattered", key: "work" },
    ],
  },
];

/** Order breaks ties: the more foundational pressure point wins. */
export const PRESSURE_ORDER: PressureKey[] = ["phone", "loops", "work", "temper", "couple", "kids", "self"];

export type ResultCopy = {
  name: string;
  read: string;
  lessonSlug: string | null;
  free: { label: string; href: string };
};

export const RESULTS: Record<PressureKey, ResultCopy> = {
  phone: {
    name: "The reflex",
    read: "Your attention keeps leaving the room through your pocket. That is conditioning, built by very smart people on purpose, and conditioning can be retrained. Start there before you try to fix anything else.",
    lessonSlug: null,
    free: { label: "How to stop checking your phone at home", href: "/resources/how-to-stop-checking-your-phone-at-home" },
  },
  loops: {
    name: "The full head",
    read: "You are carrying the whole week in your head, so even quiet time feels busy. The fix is getting it out of your head and onto paper, then sharing the parts that belong to both of you.",
    lessonSlug: "the-sanctuary",
    free: { label: "The free Sunday Board Meeting guide", href: "/sunday-board#get-board" },
  },
  work: {
    name: "The day that follows you home",
    read: "Work is walking through the front door with you, and the people inside are getting what is left. You need a clean line between the two, and it can take two minutes in the driveway.",
    lessonSlug: "the-airlock-protocol",
    free: { label: "How to leave work at work", href: "/resources/leave-work-at-work" },
  },
  temper: {
    name: "The short fuse",
    read: "Pressure is choosing your tone before you do, and the whole house adjusts to it. The goal is a pause you can actually use, and a way back when you miss.",
    lessonSlug: "the-emotional-thermostat",
    free: { label: "The free Sunday Board Meeting guide", href: "/sunday-board#get-board" },
  },
  couple: {
    name: "Two separate heads",
    read: "You are running a household together and quietly drifting apart inside it. Nothing is wrong, exactly. You just need protected time that is about the two of you, on purpose, every week.",
    lessonSlug: "the-date-night-experiment",
    free: { label: "The weekly marriage meeting", href: "/resources/weekly-marriage-meeting" },
  },
  kids: {
    name: "The missed invitation",
    read: "Your kids keep asking for your eyes, and the phone keeps answering first. A few phone free minutes at their level, following their lead, changes more than you would expect.",
    lessonSlug: "the-floor-general",
    free: { label: "How to be more present with your kids", href: "/resources/how-to-be-more-present-with-your-kids" },
  },
  self: {
    name: "Useful to everyone but yourself",
    read: "Work and home have taken every hour, and the person you were outside both is fading. Getting a little of that back is what keeps you steady for everyone else.",
    lessonSlug: "the-third-place",
    free: { label: "Why you need a third place", href: "/resources/why-men-need-a-third-place" },
  },
};
