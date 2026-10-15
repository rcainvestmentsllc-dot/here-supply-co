/**
 * All the Way Here, Men's Edition.
 *
 * Same three movements and nine practices as the couples course, rewritten for
 * one man doing the work. Every lesson carries a home example and a work
 * example, because the men this is for lead something in both places: a
 * family, a team, a company. The couples course in ../course-content.ts is
 * untouched and stays the couples path.
 *
 * The images, sheets, and evidence notes are shared with the couples edition.
 * Lesson slugs match the couples slugs so the shared sheets line up, and
 * progress is saved under a "men:" prefix so the two editions never mix.
 */
import { LESSON_GUIDES, FOCUS_MOVES, RESET_TIMELINE, type CourseStep, type LessonGuide, type MovementKey } from "../course-content";

/** Where the men's course lives. Its own password protects everything under ROOT. */
export const MEN_COURSE = {
  name: "All the Way Here",
  edition: "Men's Edition",
  root: "/access/men-r7k2v9",
  focus: "/access/men-r7k2v9/focus",
  progressPrefix: "men:",
} as const;

export const menLessonHref = (slug: string) => `${MEN_COURSE.root}/lesson/${slug}`;

export const MEN_MOVEMENTS = [
  {
    key: "RETURN" as const,
    number: "01",
    name: "Return",
    line: "Get your attention back before you try to lead anyone.",
    stillImage: "/assets/course/photo/movement-return-v1.jpg",
    stillAlt: "A man setting his phone down on a table by the door before walking into the house",
  },
  {
    key: "LEAD" as const,
    number: "02",
    name: "Lead",
    line: "Bring a steadier man into every room: home, work, and the hard conversations.",
    stillImage: "/assets/course/photo/movement-lead-v1.jpg",
    stillAlt: "A man listening closely at the kitchen table",
  },
  {
    key: "KEEP" as const,
    number: "03",
    name: "Keep",
    line: "Protect the friendships, places, and rhythms that keep you from running on empty.",
    stillImage: "/assets/course/photo/movement-keep-v4.jpg",
    stillAlt: "A father and daughter walking home from the ocean, talking",
  },
] as const;

export type MenLesson = {
  slug: string;
  movement: MovementKey;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  artImage: string;
  artAlt: string;
  artCaption: string;
  previewPosition: string;
  scene: string;
  problem: string;
  principle: string;
  practice: string;
  practiceIntro: string;
  steps: CourseStep[];
  adaptation: string;
  /** What this looks like at home, with a wife, a partner, kids, or a co parent. */
  atHome: string;
  /** The same practice at work, with a team, a client, or a business. */
  atWork: string;
  /** One lesson assumes kids, one assumes a partner. This is the honest alternative. */
  ifNot?: { label: string; body: string };
  kit: { sheet: string; sheetName: string; livesAt: string };
  encouragement: string;
  action: string;
  reflection: string;
  /** The question Chris asks about this lesson on a coaching call. */
  coachQuestion: string;
  fieldNote: string;
  guide: LessonGuide;
};

const evidence = (slug: string) => LESSON_GUIDES[slug].evidence;
const why = (slug: string) => LESSON_GUIDES[slug].whyItHelps;

export const MEN_LESSONS: MenLesson[] = [
  {
    slug: "the-sanctuary",
    movement: "RETURN",
    number: "1.1",
    title: "The Sanctuary",
    subtitle: "Get the open loops out of your head.",
    summary: "A fifteen minute weekly mind sweep so the business, the house, and the promises stop living in your head.",
    artImage: "/assets/course/photo/lesson-1-1-sanctuary-v1.jpg",
    previewPosition: "45% center",
    artAlt: "A man writing at a kitchen table near the ocean at dawn",
    artCaption: "Give the unfinished things somewhere to land, then get back to the morning in front of you.",
    scene: "It is 10:40 and the house is finally quiet. You are lying there running the job that slipped, the invoice nobody paid, the thing you told your son you would fix this weekend, and the call you have been putting off for three weeks. None of it is getting done tonight. All of it is getting your attention anyway.",
    problem: "A man who leads something carries a lot of open loops: promises to clients, to a team, to his wife, to his kids, to himself. Your head is a good place to make decisions and a terrible place to store them. Every loop you keep up there takes a little attention away from whoever is standing in front of you.",
    principle: "Stop using your attention as a filing cabinet. Get it on paper, decide the next move on the few things that matter, and let the rest wait somewhere you can find it.",
    practice: "A fifteen minute weekly mind sweep",
    practiceIntro: "Use paper, not your phone. Write until the page feels honest, then give the important items one next move.",
    steps: [
      { title: "Make four spaces", body: "Label them Work, Home, Money and admin, and Me. If something belongs in two places, write it in both." },
      { title: "Empty the loops", body: "Write every task, promise, worry, idea, and conversation you have been avoiding. Do not organize while you write. When it slows down, wait a full minute and ask what you are still trying not to forget." },
      { title: "Mark the next move", body: "D for Do, C for Choose, T for Talk, R for Release. You do not need a full plan for every item, just the next move." },
      { title: "Circle three", body: "Pick no more than three items that deserve real attention this week. Everything else is out of your head and on the page, which is the point." },
    ],
    adaptation: "If fifteen minutes is unrealistic, do five. Miss a week without making it a referendum on your discipline. A practice you can come back to beats one you abandon.",
    atHome: "Take the items that touch home to whoever shares the load with you, your wife, a partner, or a co parent. Saying out loud that you have the gutters and the car registration this week does more than you would think. Half the friction in a house is two people each assuming the other one has it.",
    atWork: "Run the same sweep on the business every Friday afternoon. Most owners find the item they have been avoiding is the one that would change the most. Put that one at the top of Monday.",
    kit: { sheet: "1.1", sheetName: "The Brain Dump", livesAt: "The desk, or wherever you actually sit down" },
    encouragement: "Once it is on paper, your head can let go of it.",
    action: "Tonight, put one sheet of paper in front of you and circle the one item that would make you more present tomorrow.",
    reflection: "What am I carrying in my head that belongs on paper, on a calendar, or in a conversation?",
    coachQuestion: "Which loop have you carried the longest, and what is the one next move on it?",
    fieldNote: "I have run a business for twenty years and the loops never stop coming. The page does not make them stop. It keeps them from following me into every room.",
    guide: {
      whyItHelps: why("the-sanctuary"),
      wordsToUse: "I have a lot still running in my head. Give me ten minutes to get it on paper, and then I am all yours.",
      watchFor: "Do not turn the sweep into a giant life inventory or one more system to maintain. The page is a place to set things down. Keep it simple enough that you will do it again next week.",
      fieldAssignment: "Run one honest mind sweep this week, work and home on the same page. Circle three items and notice what changes when you walk in the door.",
      evidence: evidence("the-sanctuary"),
    },
  },
  {
    slug: "hunt-before-you-farm",
    movement: "RETURN",
    number: "1.2",
    title: "Focus Mode",
    subtitle: "Do the work that moves things before the inbox takes the day.",
    summary: "Protect one block for the work only you can do, then open the gates.",
    artImage: "/assets/course/art/lesson-1-2-hunter-farmer.jpg",
    previewPosition: "50% center",
    artAlt: "A man working alone at a workbench in a mountain workshop, one project in front of him",
    artCaption: "One clear target and one protected block. Then the maintenance can start.",
    scene: "You get to the office or the truck at seven with a plan. By 7:04 you have answered three texts, opened your email, and put out a small fire somebody else started. At 4:45 you look up. You were busy all day, and the bid, the hire, the hard decision, the thing that would actually move the business, is still sitting there. Now it rides home with you.",
    problem: "Reactive work feels like leadership because it is visible and it never ends. A man who spends every day responding lets other people set his agenda, and the work only he can do keeps sliding to tomorrow.",
    principle: "Some work moves things forward and some keeps things running. Both matter. Do the first kind first, while you are fresh, then open the gates.",
    practice: "One protected target",
    practiceIntro: "Choose the target before reactive work begins, then give it a block that fits the day you actually have.",
    steps: [
      { title: "Choose it the night before", body: "Write one sentence: Tomorrow matters if I finish ____. Make it concrete enough that you will know when it is done." },
      { title: "Pick a block that fits", body: "Twenty five, fifty, or ninety minutes, depending on the work and the life around it. A protected half hour beats a perfect morning you never get." },
      { title: "Close the gates", body: "Notifications off, email and messages closed, phone out of reach unless the work truly needs it." },
      { title: "Then tend the rest", body: "When the block ends, decide what maintenance matters now. Make that your call, not the inbox's." },
    ],
    adaptation: "If your work is reactive by nature, protect the smallest block you can keep, or name one decision that has to happen before the day ends.",
    atHome: "Finishing the right work at work is what keeps it from coming home. The man who got the important thing done is a lot easier to be around at dinner than the man still chewing on it.",
    atWork: "Tell your team when your block is. A leader who disappears without warning reads as unavailable. A leader who says he is heads down until 9:30 and then theirs teaches everyone that focused work is how things get built.",
    kit: { sheet: "1.2", sheetName: "Tomorrow Matters If", livesAt: "The desk, written the night before" },
    encouragement: "One protected hour beats a perfect morning you never get.",
    action: "Before bed, write tomorrow's one target and the exact time you will start it.",
    reflection: "Which busy work makes me feel productive while keeping me from the work only I can do?",
    coachQuestion: "What is the one piece of work only you can do, and when will you protect time for it this week?",
    fieldNote: "When I protect the first block of my day, I make better decisions and bring less of the business home. When I do not, my family gets the leftovers.",
    guide: {
      whyItHelps: why("hunt-before-you-farm"),
      wordsToUse: "I am heads down until ____ on one thing. After that I am all yours.",
      watchFor: "Focused work is not permission to be unreachable or rigid. Protect a block that fits your job and your family, and tell the people who need to know.",
      fieldAssignment: "Choose tomorrow's target tonight. Protect one block, then write down what broke into it instead of blaming yourself.",
      evidence: evidence("hunt-before-you-farm"),
    },
  },
  {
    slug: "the-airlock-protocol",
    movement: "RETURN",
    number: "1.3",
    title: "The Driveway Pause",
    subtitle: "Use the last two minutes before the door on purpose.",
    summary: "A short reset in the parked truck so the whole workday does not walk in with you.",
    artImage: "/assets/course/art/lesson-1-3-airlock.jpg",
    previewPosition: "40% center",
    artAlt: "A man standing by his truck in the driveway at dusk, looking at the lit house",
    artCaption: "The workday can stop at the driveway. Decide how you walk in before you open the door.",
    scene: "You pull into the driveway still on the last call. Your jaw is tight and you are rehearsing what you should have said. Inside, your kid has been waiting all afternoon to show you something. The first ten seconds through that door are going to belong to the workday or to them.",
    problem: "A commute turns into an extension of work. Calls, texts, and replaying the day keep your body moving toward home while your head stays on the job. The first people you see get whatever the day left in you.",
    principle: "You do not have to fake a good mood. Notice what you are carrying, decide what belongs to tomorrow, and choose how you walk in before the door opens.",
    practice: "The parked truck reset",
    practiceIntro: "Safety first. Set navigation before you move, keep the phone out of your hand while driving, and do this only once you are parked with the engine off.",
    steps: [
      { title: "Park and stop", body: "Engine off. Phone silent and out of your hand. Give yourself two minutes before you open the door." },
      { title: "Name what followed you", body: "Say or write the unfinished work, the frustration, or the worry that is still running. Decide what belongs to tomorrow." },
      { title: "Slow the exit", body: "Three slow breaths with a longer breath out. Let it mark the line between work and home." },
      { title: "Choose the entrance", body: "Phone away. Eye contact. Say hello like you mean it. Let the first ten seconds say you are here." },
    ],
    adaptation: "Work from home: close the laptop, step outside, and come back in through a different door. Walk or ride transit: use a landmark near home as your line.",
    atHome: "Tell whoever is inside what this is, once. Two minutes in the truck can look like avoidance. Saying that if you sit out there a minute you are not hiding, you are arriving, clears it up.",
    atWork: "The same reset works before a hard meeting, a sales call, or walking onto a job site after bad news. Two minutes, name what you are carrying, choose how you walk in.",
    kit: { sheet: "1.3", sheetName: "The Driveway Card", livesAt: "The glovebox, because that is where the two minutes happen" },
    encouragement: "The day still happened. You get to decide how you carry it in.",
    action: "Before your next drive, set navigation and put the phone where you cannot reach it. Do the pause only after the truck is fully parked.",
    reflection: "What part of my workday most often walks through the door with me?",
    coachQuestion: "What followed you through the door most often this week, and what did the people inside get?",
    fieldNote: "This is one of the first practices I built for myself. I needed a gap between being responsible for a business and being a husband and a dad. The truck turned out to be the right place for it.",
    guide: {
      whyItHelps: why("the-airlock-protocol"),
      wordsToUse: "Rough day. Give me ten minutes to land and I will come find you at ____. I want to hear about yours.",
      watchFor: "The pause happens only after the truck is parked. It is not a reason to ignore the people inside or disappear without saying when you will be back.",
      fieldAssignment: "Use the parked truck reset three times this week. Keep it under three minutes and judge it only by how you walk in.",
      evidence: evidence("the-airlock-protocol"),
    },
  },
  {
    slug: "the-emotional-thermostat",
    movement: "LEAD",
    number: "2.1",
    title: "The Emotional Thermostat",
    subtitle: "Pause before pressure picks your response.",
    summary: "Pause, come back when you said you would, and repair it when you miss.",
    artImage: "/assets/course/photo/lesson-2-1-thermostat-v1.jpg",
    previewPosition: "30% center",
    artAlt: "A man pausing with his hands on the kitchen counter before he answers, his wife and son nearby",
    artCaption: "A breath buys you room for a better answer.",
    scene: "Your daughter asks a simple question at the wrong moment and your answer comes out sharper than you meant. Or it is a guy on your team who missed the same thing twice. Either way, everyone in the room heard the edge before anyone knew what kind of day you had, and now the room is arranging itself around your mood.",
    problem: "Pressure makes a man louder, colder, or gone. The people who depend on you feel the change before they understand it, at home and at work. Swallowing it does not help, and neither does handing them the raw version.",
    principle: "Whoever leads the room sets its temperature, whether he means to or not. You will not stay calm every time. The work is noticing sooner, taking a clean pause, and owning it when you miss.",
    practice: "Pause, return, repair",
    practiceIntro: "Use the shortest move that keeps a hard moment from turning into a bigger one.",
    steps: [
      { title: "Pause before the answer", body: "Change your body before you try to change your mind. Stand up, step outside or into another room, and take three breaths with a longer breath out. Sixty seconds. If you can answer with respect after that, do it. If not, say you need a few minutes." },
      { title: "Name the return time", body: "Say when you will come back, then keep your word. That is what keeps a pause from feeling like walking out." },
      { title: "Come back with one calm sentence", body: "Start with what is true and useful. Not a defense, not a lecture, not a list of what they did wrong." },
      { title: "Repair the miss", body: "If you were sharp or shut down, name it without an excuse. Own your part and ask what would help." },
    ],
    adaptation: "If a conversation is unsafe, keeps escalating, or is bigger than a short pause can hold, step away and get real outside help. This practice is not a substitute for counseling or crisis support.",
    atHome: "Agree on the pause before you need it, when nothing is wrong. Tell your wife or your kids that if you say you need ten minutes, you are coming back, and you will tell them when. Then come back.",
    atWork: "The same move works with a team: tell them you want to give this a better answer than the one you have right now, and you will pick it up at two. Leaders who pause before they speak get trusted with harder conversations.",
    kit: { sheet: "2.1", sheetName: "Pause, Return, Repair", livesAt: "The nightstand, or the desk drawer at work" },
    encouragement: "Take the pause, then come back when you said you would.",
    action: "Write the sentence you will use next time: I am too worked up to answer well. I will come back at ____.",
    reflection: "When pressure rises, do I get louder, quieter, more controlling, or more distant?",
    coachQuestion: "Where did pressure choose your response this week, and what would repair look like?",
    fieldNote: "I do not always catch it in time. That is why repair matters to me. Looking composed was never the point. Owning it and coming back is.",
    guide: {
      whyItHelps: why("the-emotional-thermostat"),
      wordsToUse: "I am too worked up to answer this well. I need ten minutes. I will be back at ____, and I will be back.",
      watchFor: "A pause with no return time feels like abandonment or control, at home and at work. This is never a substitute for safety planning, counseling, or crisis support.",
      fieldAssignment: "Write your pause sentence and your repair sentence. Use the first at the earliest sign of heat, once at home and once at work this week.",
      evidence: evidence("the-emotional-thermostat"),
    },
  },
  {
    slug: "the-date-night-experiment",
    movement: "LEAD",
    number: "2.2",
    title: "The Date Night Experiment",
    subtitle: "Plan something new, and leave the phones in the truck.",
    summary: "Take the lead on one new shared experience with your partner, phones out of reach, no grading.",
    artImage: "/assets/course/photo/lesson-2-2-date-night-v6.jpg",
    previewPosition: "50% center",
    artAlt: "A couple walking and talking on a quiet coastal path after dinner with no phones in sight",
    artCaption: "Connection does not need a grand gesture. It needs curiosity and your full attention.",
    scene: "You finally get a night out and spend the first twenty minutes deciding where to go. At dinner both phones keep showing up next to the plates. Nothing is wrong. It just feels like another item on the calendar instead of a chance to actually see each other.",
    problem: "Most men plan their work better than their marriage. Dates turn into the same restaurant and the same conversation about the kids and the schedule, with half your attention still on the phone. The routine is not the problem. Divided attention and nobody taking the lead is.",
    principle: "Do something new, do it side by side, and keep the phones out of it. Take the lead on the planning without taking over the night.",
    practice: "Choose, protect, notice",
    practiceIntro: "Plan one experience that fits your money, your energy, the babysitter, and the life you actually have.",
    steps: [
      { title: "Bring two ideas", body: "Each of you brings two. Pick one that feels possible, not impressive. A walk somewhere new counts as much as a big night out." },
      { title: "Handle the logistics", body: "Sitter, reservation, time, gas in the truck. That is the part that kills most dates before they happen. Carry it." },
      { title: "Phones out of reach", body: "Silenced and in the glovebox before you sit down. Allow priority contacts if the kids are with a sitter, and agree that either of you can check only for a real reason." },
      { title: "Notice, do not grade", body: "Afterward ask what was interesting and what you would do again. The night does not have to prove anything about your marriage." },
    ],
    adaptation: "Use an at home, free, or low cost version. Twenty intentional minutes on the back porch can count when a full evening cannot.",
    atHome: "Taking the lead on a date is not about being in charge. It is about lifting a load. When she does not have to plan, book, and remind, she gets to just show up, which is usually the whole gift.",
    atWork: "Novelty and shared activity work on a team too. A morning on a job site together, a volunteer day, or lunch somewhere new does more for a crew than another meeting about culture.",
    ifNot: {
      label: "IF YOU ARE NOT WITH SOMEONE RIGHT NOW",
      body: "Take the same practice to one relationship that matters to you: one of your kids, your brother, your dad, an old friend. Plan something new, put the phones away, do it side by side, and ask afterward what you would do again. The skill is the same. Only the person changes.",
    },
    kit: { sheet: "2.2", sheetName: "The Date Night Card", livesAt: "The wallet, so the idea survives the week" },
    encouragement: "Curiosity is the part that wore off. It comes back with use.",
    action: "Pick a date in the next fourteen days, bring two ideas, and handle every piece of the logistics yourself.",
    reflection: "When was the last time I planned something new for the two of us, start to finish?",
    coachQuestion: "When did you last plan something new for her, start to finish, and what got in the way since?",
    fieldNote: "Forget the perfect date. What helps is getting out of autopilot long enough to notice the person across from you.",
    guide: {
      whyItHelps: why("the-date-night-experiment"),
      wordsToUse: "I want to take you somewhere new in the next two weeks. Give me two ideas, I will bring two, and I will handle the rest.",
      watchFor: "Do not use a date as a test of the marriage, force excitement, or spring rules on her. Choose the activity and the phone boundary together.",
      fieldAssignment: "Plan one modest shared experience in the next fourteen days. Handle the logistics. End with one question: what part should we do again?",
      evidence: evidence("the-date-night-experiment"),
    },
  },
  {
    slug: "the-floor-general",
    movement: "LEAD",
    number: "2.3",
    title: "The Floor General",
    subtitle: "Get to their level and let them lead.",
    summary: "Five to fifteen phone free minutes at your kid's level, following instead of directing.",
    artImage: "/assets/course/photo/lesson-2-3-floor-general-v1.jpg",
    previewPosition: "57% center",
    artAlt: "A father and his kids building a blanket fort together in the family room",
    artCaption: "Set the safe conditions, then let them show you where connection is possible.",
    scene: "Your kid says your name, or Dad, watch this. They look for your eyes before they look for an answer. If the phone gets the first response, that little invitation closes before either of you notices.",
    problem: "A man can spend a whole evening near his kids and not really be with them. A downward glance tells a kid the screen got there first, even when that is not what you mean. And even when you do play, it is easy to take it over: fix the game, teach the lesson, run the show.",
    principle: "You set the safe conditions. They lead. The floor just means getting to their level and following for a while, which is the opposite of how most of us lead all day.",
    practice: "Eyes first, then follow",
    practiceIntro: "Answer the bid before anything else. Phone away, get close, and follow instead of directing.",
    steps: [
      { title: "Give them your eyes first", body: "Set the phone down, look at them, and answer. If you truly cannot stop, say exactly when you can and keep that promise." },
      { title: "Get to their level", body: "The floor, beside them on the couch, across the table, or the passenger seat. Whatever puts you in their world." },
      { title: "Let them choose", body: "Ask what they want to do or talk about. Resist improving the game, teaching a lesson, or steering toward what you would rather do." },
      { title: "End cleanly", body: "Give a heads up when time is almost up. Tell them what you liked and when you can do it again." },
    ],
    adaptation: "Five minutes counts on a crowded day. With teenagers, drive, cook, fix, fish, or work beside them, and let silence be fine instead of turning it into an interview.",
    atHome: "Cover for each other. Fifteen minutes on the floor only happens if somebody else is holding the rest of the evening. Trade it back the next night.",
    atWork: "Leaders need this too. Fifteen minutes with a newer person on your team where they set the agenda and you listen, without fixing anything, tells them more about how you see them than any review will.",
    ifNot: {
      label: "IF THERE ARE NO KIDS AT HOME",
      body: "Point it at someone you lead or mentor: a younger guy at work, a nephew, a kid on a team you coach. Same rules. Eyes first, let them lead, do not take over. Most of the men who mattered to you growing up did exactly this.",
    },
    kit: { sheet: "2.3", sheetName: "Floor Time", livesAt: "The kid's room" },
    encouragement: "Eye level is the whole technique. The rest is staying there.",
    action: "The next time one of your kids says your name, set the phone down, look at them, and answer before you go back to anything else.",
    reflection: "When I step into my kid's world, how fast do I start running it?",
    coachQuestion: "When your kids reached for you this week, what got your eyes first?",
    fieldNote: "I called it Floor General, but most of it is giving up command. I set the conditions. They show me where connection is possible.",
    guide: {
      whyItHelps: why("the-floor-general"),
      wordsToUse: "You have me. My phone is away. Show me.",
      watchFor: "This does not mean being endlessly available. If you cannot stop, look at them, name a specific time, and keep it.",
      fieldAssignment: "Use one ten minute Eyes First window this week. Answer the invitation, put the phone away, and follow without teaching, fixing, or interviewing.",
      evidence: evidence("the-floor-general"),
    },
  },
  {
    slug: "the-third-place",
    movement: "KEEP",
    number: "3.1",
    title: "The Third Place",
    subtitle: "Have one place where you are not the boss, the provider, or the fixer.",
    summary: "A recurring place or activity outside work and home where you get to be a man doing something he likes.",
    artImage: "/assets/course/photo/lesson-3-1-third-place-v3.jpg",
    previewPosition: "48% center",
    artAlt: "Three friends talking after a ride beside a pickup with two mountain bikes in the back",
    artCaption: "Keep a place where you can make, move, laugh, and come home more alive.",
    scene: "Someone asks what you do for fun and you start listing things you used to do. The bike needs air, the fishing gear has not moved since spring, and the buddy you meant to call is still a name in your phone. You are useful to everyone and getting harder for yourself to recognize.",
    problem: "A lot of men end up with two rooms: work and home. Both matter, and neither was built to carry your whole identity, your friendships, and your rest. When those two are all you have, burnout is just high friction with no buffer.",
    principle: "The sociologist Ray Oldenburg called it the third place, somewhere outside home and work. Here it means a place or activity you keep returning to where nobody needs you to be in charge. You are just a man doing something he likes.",
    practice: "Choose one place to return to",
    practiceIntro: "It should restore more than it distracts, and it has to be fair to the people you share a life with.",
    steps: [
      { title: "Name what restores you", body: "A trail, the water, a workshop, the gym, church, a rec league, a breakfast table, a project with your hands. Not what you think you should like. What actually gives you something back." },
      { title: "Start with the smallest real version", body: "A standing thirty minutes is fine. A place becomes yours by returning to it, not by big blocks of time." },
      { title: "Clear it at home", body: "Put it on the shared calendar, count childcare and money honestly, and protect her time to recharge as seriously as yours." },
      { title: "Notice what comes home", body: "Ask whether you come back more alive and available, or just numb and avoiding things. Adjust honestly." },
    ],
    adaptation: "Some seasons need a smaller version closer to home. Some problems need sleep, a lighter workload, medical care, or counseling. A hobby will not cure burnout.",
    atHome: "Do not let it become your escape and her extra shift. Equal time, agreed out loud, childcare counted honestly. A third place that costs your wife her Saturday is not restoring anybody.",
    atWork: "Business owners lose this one first, because the business is always open. A standing Tuesday ride or a Saturday morning on the water is how you keep from becoming only the job.",
    kit: { sheet: "3.1", sheetName: "The Third Place", livesAt: "The bag you already carry" },
    encouragement: "You are allowed to be a person outside of who needs you.",
    action: "Pick one place or activity to go back to twice this month, and clear the first time at home today.",
    reflection: "Where do I feel like myself instead of only a boss, a husband, or a dad?",
    coachQuestion: "Where do you feel like yourself, and when did you last go?",
    fieldNote: "Mountain biking, fishing, kettlebells, a ride on a forest road. They are not credentials. They are where I remember I am a person before I go back to the people who need me.",
    guide: {
      whyItHelps: why("the-third-place"),
      wordsToUse: "I want to protect this because I come home better. I want to protect something for you too. Can we put both on the calendar?",
      watchFor: "A third place will not fix burnout, and it should never be a one sided escape from the work at home. Make it fair and watch what kind of man comes home.",
      fieldAssignment: "Go back to one place or activity twice this month. After each time, ask whether you came home more alive, more available, or just numb.",
      evidence: evidence("the-third-place"),
    },
  },
  {
    slug: "the-friendship-script",
    movement: "KEEP",
    number: "3.2",
    title: "The Friendship Script",
    subtitle: "Invite first, and make it easy to say yes.",
    summary: "A low pressure way to turn a guy you respect into a friend you actually see.",
    artImage: "/assets/course/art/lesson-3-2-friendship.jpg",
    previewPosition: "50% center",
    artAlt: "Two men sitting on a dock with fishing rods and coffee at the edge of a mountain lake",
    artCaption: "Friendship grows from specific invitations and ordinary time, shared more than once.",
    scene: "You have known him for three years. You see him at the gym, at church, at the kids' games. Every time, one of you says you should get together. Neither of you is saying no. It is just waiting for somebody to name a day.",
    problem: "A lot of men's friendships fade quietly after thirty. Nobody decided that. Work and family filled the calendar and nobody made the invitation. Waiting for friendship to happen keeps it theoretical.",
    principle: "Men tend to build friendship shoulder to shoulder: a shared activity, low stakes, and repetition. One or two men you can call matter more than a big network. Somebody has to invite first. Let it be you.",
    practice: "The specific invitation",
    practiceIntro: "One man, one activity, one time. Keep it simple enough that a no does not feel like a verdict.",
    steps: [
      { title: "Pick one man", body: "Someone you respect or already like being around. You do not have to decide whether he will be a close friend." },
      { title: "Make it concrete", body: "I am riding Saturday at eight, want to come? Or: I am grabbing breakfast after the game, join me?" },
      { title: "Ask again without chasing", body: "Schedules are real. Ask again another week if the first answer is no. Respect a pattern of no without taking it personally." },
      { title: "Let it go deeper later", body: "Start side by side. When there is trust, ask a real question and answer one honestly yourself." },
    ],
    adaptation: "If distance or health limits what you can do, use a standing call, a project check in, or breakfast once a month. Repetition matters more than the setting.",
    atHome: "Your marriage was never meant to be your only close relationship. A wife who is also your only friend is carrying a job she did not sign up for. Friends make you a better husband.",
    atWork: "The same script works with a peer you respect: another owner, a mentor, someone a few years ahead of you. A specific breakfast invitation is how most of the best business relationships start.",
    kit: { sheet: "3.2", sheetName: "The Friendship Script", livesAt: "The wallet" },
    encouragement: "Invite first. The worst answer is a no you will survive.",
    action: "Send one specific, low pressure invitation before the day is over.",
    reflection: "Who have I been waiting on to invite me, and what stops me from going first?",
    coachQuestion: "Who have you been waiting on, and what stops you from asking him first?",
    fieldNote: "I do not need a big network. I need a few men I can call, and that starts with me being willing to ask.",
    guide: {
      whyItHelps: why("the-friendship-script"),
      wordsToUse: "I am riding Saturday at eight. Want to come? No pressure if your week is packed.",
      watchFor: "Be specific without pushing. Invite clearly, take the answer, and let trust build at its own speed.",
      fieldAssignment: "Send one concrete invitation today. If it is a no, ask once more another week before you decide what it means.",
      evidence: evidence("the-friendship-script"),
    },
  },
  {
    slug: "mission-debrief",
    movement: "KEEP",
    number: "3.3",
    title: "Mission Debrief",
    subtitle: "Keep the two practices that helped.",
    summary: "A short review that turns everything you tried into two practices for the next thirty days.",
    artImage: "/assets/course/photo/lesson-3-3-mission-debrief-v1.jpg",
    previewPosition: "58% center",
    artAlt: "A man writing in a notebook on a porch while his family gathers inside",
    artCaption: "The course ends when an idea becomes something you do in an ordinary week.",
    scene: "You are on the last lesson and real life is already back. This is where a course usually becomes one more file you finished. Instead of collecting nine ideas, you pick the two that deserve to live past this screen.",
    problem: "A course turns into a pile of information fast. Finishing every page does not matter if none of it survives a normal week.",
    principle: "This was always about coming back, not finishing. Pick the few practices that met a real problem, use them long enough to learn something, and let the rest wait.",
    practice: "Two practices for thirty days",
    practiceIntro: "Look back at the Focus Protocol and the eight practices and choose two. Make each one specific enough to use.",
    steps: [
      { title: "Name the real problem", body: "What is costing you the most right now: the noise in your head, reactive days, bringing work home, your temper, distance at home, or being alone?" },
      { title: "Choose two", body: "One that helps you Return and one that helps you Lead or Keep. More is not better." },
      { title: "Set the minimum", body: "Write when, where, and how small each practice can get on a bad week without disappearing." },
      { title: "Review without a scorecard", body: "In thirty days, ask what changed, what did not fit, and what you want to keep. Do not turn your home into a compliance report." },
    ],
    adaptation: "If a practice creates conflict, shame, or more management than value, stop and redesign it. Get professional help when the problem is bigger than a course.",
    atHome: "Tell someone at home which two you picked. Not so they can grade you. So they can notice.",
    atWork: "Make one of your two show up at work as well: the pause before a hard meeting, a protected first block, or a clean pause in a tense conversation.",
    kit: { sheet: "3.3", sheetName: "The Thirty Day Page", livesAt: "The desk, or the table at home" },
    encouragement: "Two practices you keep beat nine you admired.",
    action: "Write your two practices on the Thirty Day Page and put it somewhere you will see it every morning.",
    reflection: "Which two practices would change the most in the life I am already living?",
    coachQuestion: "Which two are you keeping, and who is going to ask you about them at day fifteen?",
    fieldNote: "Keep the two things that helped. The rest will be here when you need it. If you want someone asking you about them at day fifteen, that is what coaching is for.",
    guide: {
      whyItHelps: why("mission-debrief"),
      wordsToUse: "When ____ happens, I will ____. On a bad week, the smallest version is ____.",
      watchFor: "Do not keep every practice because you paid for the course. Pick the two that meet a real problem and let the rest wait.",
      fieldAssignment: "Choose two practices for thirty days. Give each one a situation, a response, and a minimum. Review what happened without grading your character.",
      evidence: evidence("mission-debrief"),
    },
  },
];

export const getMenLesson = (slug: string) => MEN_LESSONS.find((lesson) => lesson.slug === slug);
export const getMenMovement = (key: MovementKey) => MEN_MOVEMENTS.find((m) => m.key === key);

/** The Focus Protocol moves and timeline are the same for everyone. */
/** The couples text names the Sunday Board here; the men's edition protects the first hour home instead. */
export const MEN_FOCUS_MOVES = FOCUS_MOVES.map((move) => ({
  ...move,
  body: move.body.replace("or the Sunday Board Meeting", "or the first hour after you walk in"),
}));
export const MEN_RESET_TIMELINE = RESET_TIMELINE;

export const MEN_RESET_RELAPSE = {
  window: "Days 4 to 7",
  title: "The window where it comes back",
  intro: "The seventy two hours end and your head starts negotiating. It sounds reasonable, it sounds like you, and it shows up almost word for word.",
  lines: [
    "I proved I can handle it.",
    "Just one app. Not the bad ones.",
    "Ten minutes is not the same thing.",
    "It was a crazy week. This was not a fair test.",
  ],
  counter: "Every one of those is the habit asking for its old conditions back. Hold the setup for fourteen days before you change anything. If an app comes back and the reaching starts again, run the seventy two hours one more time.",
  tellSomeone: "Tell one person which sentence you expect to hear from yourself: your wife, a buddy, the guy you lift with. Naming it ahead of time makes it a lot harder to believe later.",
} as const;

export const MEN_RESET_DECLARATION =
  "I do not trade presence for distraction. My attention belongs to the people who count on me. My phone is a tool. I am not.";

/** Shared printables. The lesson sheets are the same files the couples course uses. */
export const MEN_PRINT_FILES = [
  {
    label: "Write in it",
    title: "The men's course book",
    note: "The Focus Protocol and all nine lessons on paper, with a home and a work example in each and room to write.",
    href: "/downloads/men/all-the-way-here-mens-edition.pdf",
  },
  {
    label: "Days one to three",
    title: "The Focus Protocol sheet",
    note: "The four moves and the three day timeline on one page. Tape it inside a cabinet or keep it on the desk.",
    href: "/downloads/focus-protocol.pdf",
  },
  {
    label: "Keep it on you",
    title: "The field card",
    note: "All nine practices on one small card for the wallet or the visor. Each lesson page has its own sheet too.",
    href: "/downloads/all-the-way-here-field-card.pdf",
  },
] as const;
