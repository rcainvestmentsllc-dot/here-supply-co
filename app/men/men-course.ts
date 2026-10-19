/**
 * All the Way Here, Men's Edition.
 *
 * Its own course, written for one man doing the work: The Solo, then nine
 * lessons in three parts (See it, Carry it, Build it). Each lesson starts from
 * something men actually say out loud and goes as deep as the couples course:
 * the moment, what is really going on, the principle, a four step practice, a
 * hard week version, home and work, an honest alternative, why it helps,
 * words to use, what to watch for, the assignment, a reflection, the coaching
 * question, a note from Chris, a printable sheet, and the research behind it.
 *
 * The couples course in ../course-content.ts is a different product with
 * different material. The only things shared are the Focus Protocol moves and
 * timeline, which this course offers as a tool inside Lesson 2. Progress is
 * saved under a "men:" prefix so the two editions never mix in one browser.
 */
import { FOCUS_MOVES, RESET_TIMELINE } from "../course-content";

/** Where the men's course lives. Its own password protects everything under ROOT. */
export const MEN_COURSE = {
  name: "All the Way Here",
  edition: "Men's Edition",
  root: "/access/men-r7k2v9",
  focus: "/access/men-r7k2v9/focus",
  progressPrefix: "men:",
  book: "/downloads/men/all-the-way-here-mens-edition.pdf",
  fieldCard: "/downloads/men/sheets/field-card.pdf",
} as const;

export const menLessonHref = (slug: string) => `${MEN_COURSE.root}/lesson/${slug}`;
const sheetFile = (slug: string) => `/downloads/men/sheets/${slug}.pdf`;
const photo = (name: string) => `/assets/men/course/${name}.jpg`;

export type MenPartKey = "START" | "SEE" | "CARRY" | "BUILD";

export const MEN_MOVEMENTS = [
  {
    key: "START" as const,
    number: "00",
    name: "Before you start",
    line: "Half a day alone, so you can hear yourself before you change anything.",
    still: photo("part-start"),
    stillAlt: "A man standing on a rock above a wide mountain valley",
  },
  {
    key: "SEE" as const,
    number: "01",
    name: "See it",
    line: "Be honest about where you are: your life, your evenings, your temper.",
    still: photo("part-see"),
    stillAlt: "A hand writing in a notebook in low light",
  },
  {
    key: "CARRY" as const,
    number: "02",
    name: "Carry it",
    line: "Handle the load: what is yours, how much is enough, and the body that carries it.",
    still: photo("part-carry"),
    stillAlt: "Four men with packs walking across an old railroad bridge",
  },
  {
    key: "BUILD" as const,
    number: "03",
    name: "Build it",
    line: "Build what lasts after you: your friends, what you inherited, and what you pass on.",
    still: photo("part-build"),
    stillAlt: "A father and his child walking toward a lake at sunset",
  },
] as const;

export type Evidence = { label: string; note: string; href: string };
export type Sheet = {
  /** The PDF's file name without .pdf, under /downloads/men/sheets/. */
  slug: string;
  name: string;
  /** What is on the page, in one line. */
  holds: string;
  livesAt: string;
  file: string;
};
export type Step = { title: string; body: string };
export type Photo = { src: string; alt: string; position?: string; caption?: string };

export type MenLesson = {
  slug: string;
  movement: Exclude<MenPartKey, "START">;
  number: string;
  /** What men actually say. The lesson exists to answer it. */
  says: string;
  title: string;
  subtitle: string;
  /** One line for cards and the course page. */
  summary: string;
  photo: Photo;
  detail: Photo;
  moment: string;
  really: string;
  principle: string;
  practice: { name: string; intro: string; steps: Step[] };
  hardWeek: string;
  atHome: string;
  atWork: string;
  ifNot: string;
  whyItHelps: string;
  words: string[];
  watchFor: string;
  /** Where coaching stops and a doctor or counselor starts. */
  straightWord?: string;
  /** A tool from elsewhere in the course that fits this lesson. */
  tool?: { label: string; title: string; body: string; href: string; cta: string };
  thisWeek: string;
  reflect: string;
  coachQuestion: string;
  fromChris: string;
  sheet: Sheet;
  evidence: Evidence[];
};

const IMPLEMENTATION: Evidence = {
  label: "Implementation intentions",
  note: "Research on planning a specific action for a specific time and place suggests it helps people follow through on goals.",
  href: "https://pubmed.ncbi.nlm.nih.gov/18096108/",
};

/** Before Lesson 1. Its own page, its own sheet. */
export const MEN_SOLO = {
  slug: "the-solo",
  movement: "START" as const,
  number: "0",
  title: "The Solo",
  subtitle: "Half a day alone, before you change anything.",
  summary: "Get away from everything for half a day, with a notebook and three questions.",
  photo: { src: photo("solo"), alt: "A man sitting alone on a rock above misty mountain ridges at sunrise", position: "50% 45%", caption: "Nobody needs anything from you for a few hours. That is the point." },
  detail: { src: photo("solo-detail"), alt: "Bare feet in the bow of a canoe on a mountain lake", position: "50% 50%" },
  intro: [
    "Before you change anything, get away from everything for half a day. Pick a place outside where nobody needs you: a trail, a river, a bench with a long view. Leave the phone in the truck. Bring a notebook, a pen, water, and something to eat.",
    "Outward Bound courses have a tradition called the solo: a stretch of time alone in the backcountry, from a few hours to a few days, with no phone and nobody asking anything of you. Students rest, write and watch, and it is often where the real thinking happens. Most men have not been truly alone with their own thoughts in years.",
  ],
  questions: [
    "What am I tired of pretending is fine?",
    "Who gets the best of me right now, and who gets what is left?",
    "If nothing changes, what does my life look like in five years?",
  ],
  questionsIntro: "Spend the first hour just walking or sitting. Do not try to fix anything. When your head quiets down, answer three questions on paper.",
  questionsAfter: "Write until you have said the true thing, even if it is one sentence. Bring the notebook to Lesson 1.",
  smallest: "Two hours, a parking lot with a view, phone in the glovebox, the same three questions.",
  cannotGetAway: "If you cannot get away at all, that is your first answer.",
  bring: [
    "A notebook you will keep for the whole course",
    "Two pens",
    "Water and food",
    "A layer for the weather",
    "A watch, if you want to keep time",
  ],
  bringNote: "The phone stays locked in the truck. If you need to be reachable for a real emergency, tell one person where you will be and when you will be back.",
  hours: [
    { title: "The first hour", body: "Walk or sit and let your head run. It will be loud at first, with the jobs, the bills and the messages you are missing. That is normal and it settles." },
    { title: "The second hour", body: "Answer the three questions. Write until you have said the true thing." },
    { title: "The last hour", body: "Write one page to yourself about what you want the next ninety days to look like, then sit with it." },
  ],
  after: "Read the page once more that night. Tell one person one thing you wrote, if you are willing. Then start Lesson 1 within the week while the Solo is still fresh.",
  words: "I am taking Saturday morning to get my head straight. I will be back by 1, and I will be better company when I get home.",
  fromChris: "After Clemson I led twenty and thirty day canoe trips for Outward Bound, and I watched people change when they finally had quiet and something real in front of them. Most grown men never give themselves that. Give yourself one morning.",
  sheet: { slug: "the-solo", name: "The Solo", holds: "The three questions, a ninety day page, and a packing list.", livesAt: "The front of your notebook", file: sheetFile("the-solo") },
} as const;

export const MEN_LESSONS: MenLesson[] = [
  {
    slug: "the-honest-map",
    movement: "SEE",
    number: "1",
    says: "I don't know what I want anymore.",
    title: "The Honest Map",
    subtitle: "See how your life actually stands before you try to fix it.",
    summary: "Score seven parts of your life honestly, circle the one you avoid, and make one move on it this week.",
    photo: { src: photo("honest-map"), alt: "A man on the couch writing in a notebook", position: "50% 40%", caption: "You cannot steer by a feeling. Put a number on it." },
    detail: { src: photo("honest-map-detail"), alt: "An open journal, a pencil and a pair of glasses on a table", position: "50% 50%" },
    moment: "It is Sunday night. The kids are down, the dishwasher is running, and you are staring at the TV without watching it. Nothing is wrong exactly. The business is fine, the house is fine, the family is fine. But there is a restlessness you cannot name, and the week ahead looks exactly like the last fifty.",
    really: "You built the life you said you wanted, then got too busy running it to ask whether it still fits. When everything feels a little off, nothing gets fixed, because there is no single thing to fix. The fog stays fog until you break it into pieces small enough to look at.",
    principle: "You cannot steer by a feeling. Put an honest number on each part of your life, and the next move usually becomes obvious.",
    practice: {
      name: "A seven area honest map",
      intro: "Use the notebook from your Solo. This takes about thirty minutes, and it only works if you score yourself the way you would if nobody would ever see the page.",
      steps: [
        { title: "Score seven areas", body: "Give each a number from 1 to 10: work, money, body, marriage or closest relationship, kids, faith or meaning, and friends. Do it fast. Your first number is usually the true one." },
        { title: "Write the why", body: "Next to each score, write one sentence on why it is that number and not one higher. Specific beats fair: “I have not had a real conversation with my daughter in a month” beats “could be better.”" },
        { title: "Circle the one you avoid", body: "There is one area you did not want to score. You already know which one it is. Circle it, even if it is not the lowest." },
        { title: "Make one move", body: "Write one action on the circled area for the next seven days, with a day and a time. Make it small enough that you will actually do it." },
      ],
    },
    hardWeek: "Score the seven areas in your head on the drive home. Pick the lowest one and do one thing about it before Friday. You can do the full page next week.",
    atHome: "Tell your wife, or the person closest to you, which area you circled and what your move is. You do not need to explain the whole map. Saying the move out loud to someone who will notice makes you more likely to do it.",
    atWork: "Run the same scoring on your business or your role: revenue, your people, your own time, and whether you still like it. The area you avoid at work is often the one quietly pulling down the scores at home.",
    ifNot: "If you are single or divorced, score the closest relationship you have, whether that is with your kids, a brother or a friend. If you do not have kids, score the people you are responsible for, like a team or a younger man you look out for.",
    whyItHelps: "Vague dissatisfaction is hard to act on. Breaking it into areas turns one heavy feeling into a few concrete problems, and a small plan with a set time and place makes it more likely you will follow through.",
    words: ["I scored my life this weekend. The one I have been avoiding is ____. This week I am going to ____."],
    watchFor: "Treat the page as a map of where to start. A low number tells you where the work is, and nothing more. Do not try to fix all seven at once. One move on one area is the whole assignment.",
    thisWeek: "Fill out the map, make your one move, and come back to the page next Sunday to see whether the circled number moved.",
    reflect: "Which number did I round up, and why?",
    coachQuestion: "Which number did you round up, and what would it take to move it by one?",
    fromChris: "Every man I know rounds at least one number up. The one you rounded is usually the one worth your attention first.",
    sheet: { slug: "honest-map", name: "The Honest Map", holds: "The seven areas, a line for each why, and a box for this week's move.", livesAt: "The notebook from your Solo", file: sheetFile("honest-map") },
    evidence: [
      { ...IMPLEMENTATION, note: "Research on planning a specific action for a specific time and place suggests it can help people follow through on goals. The seven area map itself has not been clinically tested." },
    ],
  },
  {
    slug: "the-drift",
    movement: "SEE",
    number: "2",
    says: "I'm on my phone or a drink every night and I don't like it.",
    title: "The Drift",
    subtitle: "Find out what you reach for at night, and what you are reaching away from.",
    summary: "Seven nights of noticing what you reach for and why, then one better plan set up before 9 PM.",
    photo: { src: photo("drift"), alt: "Over the shoulder of a man on the couch, scrolling his phone", position: "50% 50%", caption: "The drift is the same small reach every night until it becomes the shape of your evening." },
    detail: { src: photo("drift-detail"), alt: "Hands holding a phone in a dark room", position: "50% 50%" },
    moment: "The kids are down by 8:30. You sit down “for a minute” with the phone and a beer. At 10:45 you look up, three beers in, thumb still moving, and you could not tell anyone a single thing you read. You go to bed tired and a little disgusted with yourself, and tomorrow night looks the same.",
    really: "By evening you are spent, and the easiest thing in reach is whatever turns the volume down. I lived a version of this for about twelve years: in the house but not really there, usually behind a screen. The drift comes from the same small reach every night until it becomes the shape of your evening, and the people in the next room learn to stop asking for you.",
    principle: "You cannot quit a reach you do not understand. Notice what you are feeling right before you reach, then set up something better before you need it.",
    practice: {
      name: "The 9 PM plan",
      intro: "One week of noticing, then one change you set up in advance.",
      steps: [
        { title: "Keep a reach log for seven nights", body: "Each night, write what you reached for, roughly how long, and what you felt right before, whether tired, bored, angry, lonely or wired. Change nothing yet." },
        { title: "Find the pattern", body: "At the end of the week, circle the feeling that shows up most. That feeling is the real problem, and the phone or the drink is your fix for it." },
        { title: "Build the replacement", body: "Pick one thing that answers that feeling better. Tired calls for an earlier bedtime. Lonely calls for a call to a friend or time with your wife. Wired calls for a walk, the garage or a book. Set it up before dinner so it is waiting for you." },
        { title: "Move the fix out of reach", body: "The phone charges in the kitchen at 9. The beer waits until Friday. Make the drift take more effort than the plan." },
      ],
    },
    hardWeek: "Do only one thing: the phone sleeps outside your bedroom every night this week.",
    atHome: "Tell your wife, or whoever you live with, what you are trying, and ask them to point it out with a look instead of a speech when they see you drift. Then spend the first twenty minutes you win back with them.",
    atWork: "The same reach happens at 2 PM between meetings, when a hard task gets uncomfortable. Notice when you open the phone with no reason. It is the same muscle, and catching it at work makes it easier to catch at night.",
    ifNot: "If you live alone, the drift costs you sleep, friends and the things you used to make with your hands. Point the plan at one of those.",
    whyItHelps: "Research suggests that even having your own phone within reach can draw down your attention when you are not using it. Naming the feeling behind the reach gives you a better fix to choose, and moving the phone or the drink out of easy reach makes the old habit take effort.",
    words: ["I have been disappearing into my phone at night. I am putting it in the kitchen at 9 this week. If you see me drift, just give me a look."],
    watchFor: "Do not swap one numbing habit for another, like trading the phone for more TV. Do not make this a public crusade at home. Change quietly and let the people around you notice.",
    straightWord: "If you have tried to cut back on drinking and could not, or you drink to get through the day, that is bigger than a habit and it deserves real help from a doctor or counselor. Coaching is the wrong tool for that, and I will tell you so.",
    tool: {
      label: "If the phone is your reach",
      title: "Run the Focus Protocol",
      body: "Four moves for seventy two hours: grayscale, delete the apps that pull you in, silence everything but the people who matter, and a drawer for the phone in the evening. It pairs well with week two of the reach log.",
      href: MEN_COURSE.focus,
      cta: "Open the Focus Protocol",
    },
    thisWeek: "Keep the reach log for seven nights. On night eight, set up your replacement and move the fix out of reach.",
    reflect: "What am I trying not to feel at 9 PM?",
    coachQuestion: "What are you trying not to feel at 9 PM, and what would actually help with it?",
    fromChris: "I lost about twelve years to the drift, a few minutes at a time. None of those nights felt like a big deal on its own. Added up, they were.",
    sheet: { slug: "reach-log", name: "The Reach Log", holds: "A seven night tracker with the feeling column and your 9 PM plan.", livesAt: "The kitchen counter, next to where the phone charges", file: sheetFile("reach-log") },
    evidence: [
      { label: "Brain Drain (Ward and colleagues, 2017)", note: "In two experiments, having one's own smartphone nearby reduced available working memory, even when it was not in use.", href: "https://www.journals.uchicago.edu/doi/10.1086/691462" },
      { label: "Rethinking Drinking (NIAAA)", note: "The National Institutes of Health guide to drinking levels and signs of a problem, with free tools.", href: "https://www.rethinkingdrinking.niaaa.nih.gov/" },
    ],
  },
  {
    slug: "short-fuse",
    movement: "SEE",
    number: "3",
    says: "I snap at the people I love most.",
    title: "Short Fuse",
    subtitle: "Catch the anger in your body before it reaches your mouth.",
    summary: "Learn your three warning signs, take sixty seconds, come back calm, and repair every time you miss.",
    photo: { src: photo("short-fuse"), alt: "A man sitting in a dark room by a window, jaw set", position: "50% 35%", caption: "You get about a second between the surge and the words. Use it." },
    detail: { src: photo("short-fuse-detail"), alt: "An empty porch with a mountain view", position: "50% 50%" },
    moment: "You held it together all day: the client who moved the goalposts, the crew that showed up late, the bank that called twice. You were patient with every one of them. Then you walk in the door, trip over your son's cleats in the hall, and go off. He freezes. Your wife gives you the look. Ten minutes later you feel terrible, and you do not say so.",
    really: "The anger at home usually starts somewhere else. You absorb pressure all day that you cannot show at work, and it comes out where it feels safe, which is on the people who love you most. The cleats were only the last straw. The fix starts earlier, in your body, before the words come out.",
    principle: "You get about a second between the surge and the words. Learn to feel it coming, use that second, and when you miss, go back and repair it.",
    practice: {
      name: "Catch, reset, return, repair",
      intro: "Four moves you can use in any room. The last one matters most.",
      steps: [
        { title: "Catch", body: "Learn your three warning signs. For most men it is some mix of a tight jaw, a hot face, a clipped voice, a clenched fist, or a quiet that everyone in the house knows. Write yours down." },
        { title: "Reset", body: "When you feel one, take sixty seconds. Stand up, step outside or into another room, and take three slow breaths with the breath out longer than the breath in." },
        { title: "Return", body: "Come back within the time you said and start with one calm sentence. If you need longer, say so and name when you will come back." },
        { title: "Repair", body: "When you miss, and you will, go back within the hour. Say what you did, say you were wrong, and stop there with no excuse attached. Kids learn more from a father who repairs than from one who never slips." },
      ],
    },
    hardWeek: "One reset a day, at the moment you walk in the door from work.",
    atHome: "Tell the people you live with that you are working on this and what your reset looks like. Then when you step out of the room, they know you are trying instead of leaving.",
    atWork: "Use the same reset before you answer the email that made you angry or walk into the hard meeting. The whole room feels how you walk in, and so does your crew.",
    ifNot: "If you live alone, the fuse usually shows up on the road, on the phone with your ex, or with the people who work for you. Same practice, different room.",
    whyItHelps: "Emotion regulation research suggests that small, flexible strategies used early work better than trying to hold it in once you are already hot. Slow breathing with a longer breath out has been linked with signs of a calmer nervous system, though that research is still early.",
    words: [
      "I am too wound up to answer well. Give me ten minutes. I will come back.",
      "I snapped at you. That was wrong. I am sorry.",
    ],
    watchFor: "A pause without a return time can feel like punishment to the people waiting. Always say when you will be back, and come back. A repair that ends with “but you” is no repair at all.",
    straightWord: "If your anger has ever scared the people you live with, or turned physical, get help from a licensed counselor now. That is beyond what coaching does, and it is the strongest thing you can do for your family.",
    tool: {
      label: "Free, for the drive home",
      title: "The Driveway Card",
      body: "Two minutes in the truck before you walk in: stop, name what followed you home, breathe, choose who you want to be for the first ten seconds inside. It catches the fuse before the cleats do.",
      href: "/downloads/driveway-card.pdf",
      cta: "Print the Driveway Card",
    },
    thisWeek: "Write your three warning signs and your two sentences. Use the reset at least once a day and the repair every time you need it.",
    reflect: "What was I carrying in the hour before I snapped?",
    coachQuestion: "What were you carrying in the hour before you snapped, and where did you pick it up?",
    fromChris: "The repair is the part most of us skip. I would rather my kids watch me get it wrong and come back than never see me come back at all.",
    sheet: { slug: "short-fuse", name: "The Short Fuse Card", holds: "Your three warning signs, the sixty second reset, and your pause and repair sentences.", livesAt: "Your wallet", file: sheetFile("short-fuse") },
    evidence: [
      { label: "Emotion regulation overview", note: "Regulation is flexible and depends on context. Strategies used early tend to work better than suppression once emotion is running high.", href: "https://pubmed.ncbi.nlm.nih.gov/31961170/" },
      { label: "Slow breathing review (Zaccaro and colleagues, 2018)", note: "Slow breathing was associated with markers of calm and better wellbeing in healthy adults, across fifteen small studies.", href: "https://www.frontiersin.org/articles/10.3389/fnhum.2018.00353/full" },
    ],
  },
  {
    slug: "choose-your-battles",
    movement: "CARRY",
    number: "4",
    says: "Everything is on me.",
    title: "Choose Your Battles",
    subtitle: "Decide which fights are yours, which ones you hand off, and which ones you drop.",
    summary: "Sort everything you carry into three columns, make two hand offs, and have the conversation you have been avoiding.",
    photo: { src: photo("battles"), alt: "A man leaning over a table, writing beside his laptop and phone", position: "50% 30%", caption: "Carrying everything feels like strength. Over time it makes you slower and angrier." },
    detail: { src: photo("battles-detail"), alt: "A man sitting in a window, looking out over the city", position: "50% 50%" },
    moment: "Payroll is Friday and a big client is thirty days late. The roof needs work before winter. Your mom has a doctor's appointment you said you would drive her to. Your daughter is struggling in math and nobody has called the teacher. You are lying awake running all of it, and your wife has no idea how much of it is sitting on your chest.",
    really: "Some of what you carry is yours. Some of it you picked up because nobody else did, and some of it you kept because carrying it felt easier than having the conversation. Every man in an epic story has to decide which battles are his, which he walks away from, and which ones he asks for help with. Carrying everything feels like strength, and over time it makes you slower and angrier than the man people need.",
    principle: "A leader chooses his battles on purpose. Carry what is yours, hand off what belongs to someone else, and put down what was never yours.",
    practice: {
      name: "Three columns and one conversation",
      intro: "About thirty minutes with a pen, then one conversation this week.",
      steps: [
        { title: "Unload it", body: "Write down everything you are carrying right now: work, money, house, family, health, people. Keep going until the page feels honest." },
        { title: "Sort it", body: "Put each item in one of three columns: Mine to fight, Mine to hand off, and Not mine at all." },
        { title: "Move it", body: "For each hand off, write who takes it and when you will ask. For each item that is not yours, decide what you will say, or simply stop picking it up." },
        { title: "Have one hard conversation", body: "Pick the conversation you have been avoiding the longest. Decide when and where you will have it this week. Say the true thing in as few words as you can, then stop talking and listen." },
      ],
    },
    hardWeek: "Move one item out of the first column. That is enough.",
    atHome: "Tell your wife, or the person closest to you, one thing you have been carrying alone. You do not need a solution, only to say it out loud. Ask what she is carrying alone too.",
    atWork: "Hand off one thing you have been doing because “it is faster if I do it myself.” Accept that it will be done a little worse for a while. That is the price of a team that can carry weight without you.",
    ifNot: "If you do not have a partner or a team, look at who could share the load: a brother, a friend, a hired hand, a bookkeeper. Paying for help can be the cheapest thing you buy all year.",
    whyItHelps: "Sorting a heavy load into what you own and what you do not turns one crushing feeling into decisions you can actually make. Deciding exactly when and where you will have a hard conversation makes it more likely you will have it.",
    words: [
      "I have been carrying ____ on my own and I need help with it.",
      "This is yours now. Here is what good looks like. Come to me if you get stuck.",
    ],
    watchFor: "Handing off is different from dumping. Give people what they need to succeed. Do not use “not mine” as a way to dodge something that really is your responsibility.",
    thisWeek: "Fill the three columns, make two hand offs, and have the one conversation.",
    reflect: "What am I carrying because it is mine, and what am I carrying because I am afraid of the conversation?",
    coachQuestion: "What are you carrying because it is yours, and what are you carrying because you are afraid of the conversation?",
    fromChris: "Picking everything up feels like leadership. Putting something down on purpose is a decision too, and it is usually the harder and better one.",
    sheet: { slug: "three-columns", name: "Three Columns", holds: "Mine to fight, Mine to hand off, Not mine at all, and a line for this week's hard conversation.", livesAt: "Your desk", file: sheetFile("three-columns") },
    evidence: [
      { ...IMPLEMENTATION, note: "Research suggests that deciding exactly when and where you will act on a goal helps people follow through. The three column sort itself has not been clinically tested." },
    ],
  },
  {
    slug: "enough",
    movement: "CARRY",
    number: "5",
    says: "Work owns me.",
    title: "Enough",
    subtitle: "Define enough money, enough hours and enough yes, so the business stops setting the terms.",
    summary: "Write three numbers, set one hard edge for thirty days, and tell the people it affects.",
    photo: { src: photo("enough"), alt: "A young player alone on a soccer field, in black and white", position: "50% 40%", caption: "Enough is a number you choose. Until you choose it, work chooses for you." },
    detail: { src: photo("enough-detail"), alt: "A man checking his phone at the table with his laptop open", position: "50% 50%" },
    moment: "You are on the sideline at your daughter's game and your phone buzzes. A client needs “one quick thing.” You step away to handle it, and when you look up the game is over and she is walking toward you asking if you saw her goal. You did not. Sunday night already feels like Monday morning, and you cannot remember the last full day you did not check email.",
    really: "You started the business, or took the job, to give your family a good life. Somewhere along the way it started running you. Work expands to fill whatever room you give it, and a man who never defines enough will never reach it. Most men know they should work less. Very few have written down the numbers that would let them.",
    principle: "Enough is a number you choose. Write it down, set one hard edge, and protect it like a client.",
    practice: {
      name: "Three numbers and one edge",
      intro: "Write the numbers once, then keep one edge every day for thirty days.",
      steps: [
        { title: "Enough money", body: "Write what your household actually needs each month, plus what you want to save, and nothing else. Compare it to what you made last year." },
        { title: "Enough hours", body: "Write the most you will work in a normal week, counting the evenings and weekends you pretend do not count. Then track this week's real hours against it." },
        { title: "Enough yes", body: "Write how many new commitments you will take on this month, and one thing you will turn down to protect them." },
        { title: "One hard edge for thirty days", body: "Pick one: no work after 7 PM, no phone at dinner, or Saturday mornings belong to the family. Tell your clients or your team what the new edge is, so you are not keeping it secretly." },
      ],
    },
    hardWeek: "One evening this week with the phone in another room from dinner to bedtime.",
    atHome: "Tell your family the edge you picked and let them hold you to it. Kids are excellent enforcers, and they will remember that you kept it.",
    atWork: "Look at last month and find the one client, project or habit that cost the most time for the least return. Decide this week whether to raise the price, change the terms or let it go.",
    ifNot: "If you work for someone else, you may not control your hours, but you usually control the edges: when you check email, whether the phone comes to dinner, and how many extra projects you volunteer for.",
    whyItHelps: "Research on detachment from work links being able to mentally switch off after hours with less exhaustion and better recovery. A written number gives you something to measure against, and a clear edge makes switching off a decision you make once instead of every night.",
    words: [
      "I am off after 7. I will get to this first thing tomorrow.",
      "From dinner to bedtime the phone stays in the kitchen. Call me on it if I slip.",
    ],
    watchFor: "Real emergencies happen. An edge with an honest exception for true emergencies will last longer than a perfect rule you break by Wednesday. Do not let “emergency” quietly come to mean everything.",
    thisWeek: "Write the three numbers, pick your edge, tell the people it affects, and keep it every day.",
    reflect: "What number would I have to see before I believed I could slow down?",
    coachQuestion: "What number would you have to see before you believed you could slow down, and is it real or is it fear?",
    fromChris: "I have run a business for twenty years, and the work never runs out on its own. The edge has to come from me, because the clients will never draw it for me.",
    sheet: { slug: "enough", name: "Enough", holds: "Your three numbers, your hard edge, and thirty boxes to tick each day you keep it.", livesAt: "The fridge", file: sheetFile("enough") },
    evidence: [
      { label: "Detachment from work (meta analysis)", note: "A meta analysis of 86 publications linked mentally switching off from work with several recovery and wellbeing outcomes.", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5233687/" },
    ],
  },
  {
    slug: "fuel",
    movement: "CARRY",
    number: "6",
    says: "I'm running on fumes.",
    title: "Fuel",
    subtitle: "Sleep, move and do one hard thing on purpose, because steadiness gets built in the body first.",
    summary: "Seven hours of sleep, real movement, time outside, and one hard thing on the calendar.",
    photo: { src: photo("fuel"), alt: "A mountain biker riding a narrow trail through tall grass", position: "50% 62%", caption: "A man who does hard things on purpose has more room for the hard things he did not choose." },
    detail: { src: photo("fuel-detail"), alt: "A rider carrying his bike up a rocky hill, in black and white", position: "50% 50%" },
    moment: "The alarm goes off at 5:40 after six hours of bad sleep. Your back is stiff, your coffee is your breakfast, and by 3 PM you are fading. You tell yourself you will get back in shape when work slows down. It has not slowed down in years, and the last time you did something physically hard on purpose, your kids were in diapers.",
    really: "When your body is empty, patience is the first thing to go, and the people at home feel it before you do. A man who sleeps, moves and does hard things on purpose has more room for pressure, because his body has practiced handling strain on his own terms. When I need to reset, I lift kettlebells, ride a mountain bike trail or go fishing.",
    principle: "Fuel the man before you ask more of him. Sleep, movement and voluntary challenge are part of the job.",
    practice: {
      name: "Sleep, move, one hard thing",
      intro: "Four parts. Start with the one you are worst at.",
      steps: [
        { title: "Sleep", body: "Pick a lights out time that gives you seven hours, and keep it five nights this week. Phone out of the bedroom." },
        { title: "Move", body: "Thirty minutes that raise your heart rate, five days this week, plus two days of strength work, even if it is pushups and a kettlebell in the garage." },
        { title: "Get outside", body: "At least one of those sessions on a trail, a river or anywhere green, without the phone." },
        { title: "Schedule one hard thing", body: "Put one voluntary challenge on the calendar in the next month: a long ride, a summit you have never climbed, a race you have to train for. Tell someone, so backing out costs you something." },
      ],
    },
    hardWeek: "Lights out on time three nights, and one walk outside without the phone.",
    atHome: "Bring a kid along for the hard thing, or for the training. They will remember the morning you climbed something together longer than anything you buy them.",
    atWork: "Take one phone call a day walking instead of sitting. Block your training time on the calendar the same way you would block a client.",
    ifNot: "If injury or health limits what you can do, the principle still holds. Pick the hardest thing your doctor says is safe and do it on purpose.",
    whyItHelps: "Sleep scientists recommend that adults get at least seven hours a night, and federal guidelines call for 150 to 300 minutes of moderate activity a week plus strength work twice a week. One study found that a ninety minute walk in nature reduced rumination, the loop of replaying what went wrong, while a city walk did not.",
    words: [
      "I am going to bed at 10:30 this week. Hold me to it.",
      "I signed up for ____ in March. Want to train for it with me?",
    ],
    watchFor: "Do not let this turn into another thing to be perfect at. Missing a day is part of it. And do not train so hard you have nothing left for the people at home.",
    straightWord: "If you have health problems or have not exercised in a long time, check with your doctor before starting anything hard.",
    thisWeek: "Set the lights out time, get five movement sessions and two strength sessions in, and put one hard thing on the calendar.",
    reflect: "When did I last do something hard that nobody made me do?",
    coachQuestion: "When did you last do something hard that nobody made you do, and what did it give you?",
    fromChris: "The kettlebell, the trail and the river are how I reset. When I let them slide for too long, patience is the first thing to go.",
    sheet: { slug: "fuel", name: "The Fuel Card", holds: "Your lights out time, a weekly grid for sleep, movement and strength, and the date of your hard thing.", livesAt: "The bathroom mirror", file: sheetFile("fuel") },
    evidence: [
      { label: "Sleep recommendation (CDC)", note: "Citing the American Academy of Sleep Medicine and Sleep Research Society: adults 18 to 60 should sleep at least seven hours a night.", href: "https://www.cdc.gov/mmwr/volumes/65/wr/mm6508a5.htm" },
      { label: "Physical Activity Guidelines (Harvard T.H. Chan School of Public Health)", note: "150 to 300 minutes of moderate activity a week and strength work at least two days.", href: "https://nutritionsource.hsph.harvard.edu/2018/11/13/new-physical-activity-guidelines-for-americans/" },
      { label: "Nature walks and rumination (Bratman and colleagues, 2015)", note: "A ninety minute nature walk reduced self reported rumination compared with an urban walk.", href: "https://natureandhealth.uw.edu/publications/nature-experience-reduces-rumination-and-subgenual-prefrontal-cortex-activation" },
    ],
  },
  {
    slug: "your-council",
    movement: "BUILD",
    number: "7",
    says: "I don't have one friend I could call at 2 AM.",
    title: "Your Council",
    subtitle: "Two or three men who know the real story and will tell you the truth.",
    summary: "Name two or three men, invite one specifically, repeat it, and tell one true thing.",
    photo: { src: photo("council"), alt: "Two men sitting side by side on a bench in the woods", position: "50% 50%", caption: "Men build friendship side by side, again and again." },
    detail: { src: photo("council-detail"), alt: "A group of men sitting around a fire ring in the desert", position: "50% 50%" },
    moment: "You run into an old buddy at the hardware store. You both say “we need to get together,” mean it, and know it will not happen. Driving home you try to name one man you could call tonight if your marriage cracked or the business went under. You think for a long time.",
    really: "You know a lot of guys: clients, neighbors, dads from practice, men at church. Very few of them know what is actually going on with you. Men rarely lose friends on purpose. Work and kids fill the calendar, nobody makes the first call, and the friendships quietly fade. If you are married, your wife may have become your only close relationship, and that is a lot to ask of one person.",
    principle: "Every man needs a council: a few men who know the real story and are allowed to tell him the truth. You build one by showing up, side by side, again and again.",
    practice: {
      name: "Name, invite, repeat, tell",
      intro: "A few minutes this week, then a standing habit.",
      steps: [
        { title: "Name them", body: "Write down every man you respect. Circle two or three who would tell you the truth and who you would trust with yours." },
        { title: "Invite one, specifically", body: "Text one of them this week with a day, a time and an easy out: “I'm riding Saturday at 7, want to come? No worries if not.” Men bond best side by side, so pick something you do together: a ride, a fishing morning, breakfast before work, a project in his garage." },
        { title: "Repeat it", body: "Put the same thing on the calendar again for next month. Friendship gets built through repetition." },
        { title: "Tell one true thing", body: "Somewhere around the third time, say one honest sentence about what is going on with you. Then ask him the same." },
      ],
    },
    hardWeek: "One text to one man, with a day and a time in it.",
    atHome: "Protect your wife's friendships the same way you protect your own. Trade off mornings so both of you get time with your people. Friends make you a better husband, and hers make her a happier wife.",
    atWork: "Find one peer outside your company who runs a business or carries a role like yours, and have lunch once a month to trade notes honestly. Business owners are often the loneliest men in the room.",
    ifNot: "If you have moved and know nobody, start where men already gather around something: a men's group at church, a running or cycling club, a volunteer crew, a Rotary breakfast. Go three times before deciding.",
    whyItHelps: "A large meta analysis found strong associations between social relationships and survival, comparable to other well known health risks. That research does not prove that one breakfast changes your health, but it is a strong reason to take friendship as seriously as your blood pressure.",
    words: [
      "I'm riding Saturday at 7, want to come? No worries if not.",
      "Honestly, things have been rough at home and I have not told anyone. How are you really doing?",
    ],
    watchFor: "Do not wait until you need someone to start. The council has to exist before the 2 AM call. And do not judge a friendship by the first outing. Men warm up slowly.",
    thisWeek: "Name your two or three, send one invitation, and put the second one on the calendar before the first one happens.",
    reflect: "Who knows what is actually going on with me right now?",
    coachQuestion: "Who knows what is actually going on with you right now, and if the answer is nobody, who should?",
    fromChris: "I do not need a big network. I need a few men I can call, and that starts with me being willing to ask first.",
    sheet: { slug: "council-card", name: "The Council Card", holds: "The names of your two or three men, the invitation script, and a line for the next date.", livesAt: "Your wallet", file: sheetFile("council-card") },
    evidence: [
      { label: "Social relationships and mortality risk (Holt Lunstad and colleagues, 2010)", note: "A meta analysis of 148 studies found strong associations between social relationships and survival. It does not prove that any single friendship causes a health gain.", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2910600/" },
    ],
  },
  {
    slug: "the-inheritance",
    movement: "BUILD",
    number: "8",
    says: "I'm turning into my dad.",
    title: "The Inheritance",
    subtitle: "Choose on purpose what you keep from your father and what stops with you.",
    summary: "Write the playbook you inherited, mark each line keep, change or stop, and practice one new version out loud.",
    photo: { src: photo("inheritance"), alt: "An older man walking hand in hand with a small child", position: "50% 45%", caption: "What you inherited is a starting point. You get to choose what you pass on." },
    detail: { src: photo("inheritance-detail"), alt: "Hands sorting through old black and white family photographs", position: "50% 50%" },
    moment: "Your son spills milk across the table and before you can think, your father's voice comes out of your mouth: the same words, the same tone, the same sigh. You see your son's face do exactly what yours used to do. Later that night you sit in the truck in the driveway thinking, when did I become him?",
    really: "Every man runs on a playbook he picked up from his father, from the man who raised him, or from the hole where one should have been. Most of it runs without your noticing: how you handle money, anger, work, love, and asking for help. Some of it is the best of you. Some of it you would rather your kids never learn. You do not need to judge your father to look at it honestly. The point is to choose.",
    principle: "What you inherited is a starting point. Keep the good on purpose, change what needs changing, and let the rest stop with you.",
    practice: {
      name: "Keep, change, stop",
      intro: "One page, written honestly, then one new version practiced out loud.",
      steps: [
        { title: "Write the playbook", body: "On the left side of a page, write what your father taught you about being a man, in his own words if you can remember them. Cover work, money, anger, love, asking for help, and how a man treats his wife and kids." },
        { title: "Mark each line", body: "Next to each one write Keep, Change or Stop." },
        { title: "Write the new version", body: "For each Change or Stop, write the version you want your kids to inherit, in one sentence." },
        { title: "Practice one", body: "Pick the line that matters most to your kids right now and practice the new version this week, out loud, at least once." },
      ],
    },
    hardWeek: "One line on the page, marked Keep, Change or Stop, with the new version written out.",
    atHome: "Tell one of your kids something good your father taught you. They should know where the good parts came from, and it gives you a way to talk about family without making it heavy.",
    atWork: "A lot of fathers taught their sons how to run a crew or a company, for better or worse. Find one leadership habit that came straight from him and decide if it still serves the people you lead.",
    ifNot: "If your father was absent, write what his absence taught you, and who filled in, whether a grandfather, a coach or nobody. If you do not have kids, the people you lead and mentor inherit your playbook too.",
    whyItHelps: "A 2025 review of 24 datasets found that parenting carries over from one generation to the next only weakly. In plain words, you are far from destined to repeat your father. Writing the playbook down drags the automatic parts into the light where you can choose.",
    words: [
      "My dad taught me ____. I want you to have that too.",
      "That one stops with me.",
    ],
    watchFor: "This lesson is about what you do from here forward, so leave settling scores and digging through every old hurt for another place. And remember he probably inherited his playbook too.",
    straightWord: "For some men this lesson brings up hard things from childhood. If it does, a licensed counselor is the right person to walk through that with you. Coaching works on what you do from here forward.",
    thisWeek: "Write the playbook, mark every line, and practice one new version out loud at least once.",
    reflect: "What is one thing my father did that I am still doing, and do I want my kids to do it too?",
    coachQuestion: "What is one thing your father did that you are still doing, and do you want your son or daughter to do it too?",
    fromChris: "None of us picked the playbook we started with. We do get to pick what we hand on, and that choice gets made in small moments like the milk on the table.",
    sheet: { slug: "keep-change-stop", name: "Keep, Change, Stop", holds: "The playbook column, the three marks, and the new versions.", livesAt: "The back of your Solo notebook", file: sheetFile("keep-change-stop") },
    evidence: [
      { label: "Intergenerational stability in parenting (Psychological Bulletin, 2025)", note: "A multilevel meta analysis of 408 effect sizes from 24 datasets found only weak transmission of parenting across two generations (r = .12).", href: "https://ifp.nyu.edu/2025/journal-article-abstracts/bul0000494/" },
    ],
  },
  {
    slug: "what-you-pass-on",
    movement: "BUILD",
    number: "9",
    says: "My kids are growing up and I'm missing it.",
    title: "What You Pass On",
    subtitle: "Decide what you are building, take your kids into real challenges, and put it on one page.",
    summary: "Write your creed, plan one challenge with each kid, teach one real skill, and tell them who they are.",
    photo: { src: photo("pass-on"), alt: "A father and his young daughter walking a forest trail", position: "50% 50%", caption: "Your kids inherit how you live far more than what you say." },
    detail: { src: photo("pass-on-detail"), alt: "A father and his kid walking into the surf, in silhouette", position: "50% 50%" },
    moment: "You are looking for something in the garage and find your son's first bike, the one with training wheels. He is fourteen now and taller than his mother. You try to remember the last real conversation you had with him that was not about grades or chores, and you cannot. You do the math on how many summers are left before he leaves.",
    really: "You have been providing for your kids, and that matters. But kids also need a father who takes them into the world: who teaches them to do hard things, lets them see how he handles a problem, and tells them who they are. You will not get those years back, and the good news is that a few deliberate moments and a clear idea of what you want to pass on are enough to start.",
    principle: "Your kids inherit how you live far more than what you say. Decide what you want to pass on, then take them into it.",
    practice: {
      name: "The creed and the challenge",
      intro: "One page to write, then a month of doing something hard together.",
      steps: [
        { title: "Write your creed", body: "One page, in plain words: who you are, what you are building, how you treat people, and how you want your kids to remember you. Read it once a week, Sunday night." },
        { title: "Plan one challenge with each kid", body: "Something a little hard that you do together over a month: a summit, a fishing trip they plan, a project in the shop, learning to change a tire, a race. Let them carry part of the load." },
        { title: "Teach one real skill", body: "Pick something you know that they will need, like how to shake a hand and look a man in the eye, how to handle money, how to fix something, how to apologize. Teach it this month." },
        { title: "Tell them who they are", body: "Once this week, tell each kid one specific thing you see in them that you are proud of. Say it plainly and do not attach advice to it." },
      ],
    },
    hardWeek: "One drive or one walk with one kid, phone in your pocket on silent, and one question about their life that is not about school.",
    atHome: "Share your creed with your wife or co parent and ask what she would add. The kids get one family, and the two of you passing on the same things counts for a lot.",
    atWork: "The younger men on your crew or team are watching you too. Pick one and teach him something real this month: how you price a job, how you handle an angry client, how you run a meeting.",
    ifNot: "If you do not have kids, or they are grown, aim this at a nephew, a younger man at work, a kid on a team you coach, or your grown kids, who still need to hear who they are.",
    whyItHelps: "A review of research on play between fathers and children found a varied but meaningful body of evidence connecting it with child outcomes. A study of family mealtimes linked adult phone use with less talking at the table. Small, focused moments are where kids actually get their father.",
    words: [
      "I want to do something hard with you this fall. You pick it.",
      "I noticed how you handled ____. That took guts. I am proud of you.",
    ],
    watchFor: "Do not make the challenge your dream instead of theirs. Let them pick, let them struggle a little, and resist the urge to take over. And do not save the proud words for big achievements. They need to hear them on ordinary days.",
    thisWeek: "Write a first draft of your creed, plan one challenge with each kid, and tell each one what you see in them.",
    reflect: "What do I want my kids to say about me when I am gone?",
    coachQuestion: "What do you want your kids to say about you when you are gone, and what did you do this week that they would put in that sentence?",
    fromChris: "I have three kids. The creed keeps me honest about what I am actually handing them, especially on the weeks when work wants all of me.",
    sheet: { slug: "my-creed", name: "My Creed", holds: "Space for your creed, your challenge with each kid, and the skill you are teaching this month.", livesAt: "Somewhere you will see it on Sunday nights", file: sheetFile("my-creed") },
    evidence: [
      { label: "Father and child play (systematic review)", note: "A varied but meaningful body of research connects play between fathers and children with child outcomes.", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8153002/" },
      { label: "Phones during family routines", note: "A family mealtime study linked adult phone use with less verbal interaction. It does not prove that one glance harms a relationship.", href: "https://pubmed.ncbi.nlm.nih.gov/39377734/" },
    ],
  },
];

/** The Solo and the nine lessons, in course order, for the rail and progress. */
export const MEN_STEPS = [
  { slug: MEN_SOLO.slug, movement: MEN_SOLO.movement, number: MEN_SOLO.number, title: MEN_SOLO.title },
  ...MEN_LESSONS.map(({ slug, movement, number, title }) => ({ slug, movement, number, title })),
];

export const getMenLesson = (slug: string) => MEN_LESSONS.find((lesson) => lesson.slug === slug);
export const getMenMovement = (key: MenPartKey) => MEN_MOVEMENTS.find((m) => m.key === key);

/** Every printable in the course, in order. */
export const MEN_SHEETS: Sheet[] = [MEN_SOLO.sheet, ...MEN_LESSONS.map((lesson) => lesson.sheet)];

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

/** The printables on the course home. Each lesson page has its own sheet too. */
export const MEN_PRINT_FILES = [
  {
    label: "Write in it",
    title: "The men's course book",
    note: "The Solo and all nine lessons on paper, every section, with room to write after each one.",
    href: MEN_COURSE.book,
  },
  {
    label: "Start here",
    title: "The Solo sheet",
    note: "The three questions, the ninety day page, and what to bring. It goes in the front of your notebook.",
    href: MEN_SOLO.sheet.file,
  },
  {
    label: "Keep it in sight",
    title: "The field card",
    note: "All nine practices on one page for the fridge, the desk, or the truck.",
    href: MEN_COURSE.fieldCard,
  },
  {
    label: "Lesson 2 tool",
    title: "The Focus Protocol sheet",
    note: "The four moves and the three day timeline on one page, if the phone is your reach.",
    href: "/downloads/focus-protocol.pdf",
  },
] as const;
