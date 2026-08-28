export type MovementKey = "RETURN" | "LEAD" | "KEEP";

export type CourseStep = {
  title: string;
  body: string;
};

export type CoreLesson = {
  slug: string;
  movement: MovementKey;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  problem: string;
  principle: string;
  practice: string;
  practiceIntro: string;
  steps: CourseStep[];
  adaptation: string;
  action: string;
  reflection: string;
  fieldNote: string;
};

export type LessonGuide = {
  whyItHelps: string;
  wordsToUse: string;
  watchFor: string;
  fieldAssignment: string;
  evidence: { label: string; href: string; note: string }[];
};

export const COURSE_LENSES = [
  {
    number: "01",
    title: "Choose",
    body: "Notice what is pulling you and decide what deserves your attention before habit decides for you.",
  },
  {
    number: "02",
    title: "Enter",
    body: "Picture the room and the man you want to bring into it, then make the next move specific.",
  },
  {
    number: "03",
    title: "Protect",
    body: "Put important work and relationships ahead of whatever is loudest, newest, or easiest to check.",
  },
  {
    number: "04",
    title: "Listen",
    body: "Understand the person and the moment before reaching for a fix, defense, lecture, or performance.",
  },
  {
    number: "05",
    title: "Renew",
    body: "Keep the practices, people, faith, movement, and places that let you return with something real to give.",
  },
] as const;

export const CORE_MOVEMENTS = [
  {
    key: "RETURN" as const,
    number: "01",
    name: "Return",
    line: "Get your attention and presence back before you try to fix anything else.",
    image: "/assets/course/module-return-poster.jpg",
    alt: "Chris Avera introducing the Return module",
    previewImage: "/assets/course/preview-return.png",
    previewAlt: "The Sanctuary lesson cover inside the Return module",
    video: "/assets/course/module-return.mp4",
    duration: "01:00",
  },
  {
    key: "LEAD" as const,
    number: "02",
    name: "Lead",
    line: "Bring a steadier man into the rooms that need you most.",
    image: "/assets/course/module-lead-poster.jpg",
    alt: "Chris Avera introducing the Lead module",
    previewImage: "/assets/course/preview-lead.png",
    previewAlt: "The Emotional Thermostat lesson cover inside the Lead module",
    video: "/assets/course/module-lead.mp4",
    duration: "01:05",
  },
  {
    key: "KEEP" as const,
    number: "03",
    name: "Keep",
    line: "Protect the relationships and rhythms that keep a good life intact.",
    image: "/assets/course/module-keep-poster.jpg",
    alt: "Chris Avera introducing the Keep module",
    previewImage: "/assets/course/preview-keep.png",
    previewAlt: "The Third Place lesson cover inside the Keep module",
    video: "/assets/course/module-keep.mp4",
    duration: "01:06",
  },
] as const;

export const CORE_LESSONS: CoreLesson[] = [
  {
    slug: "the-sanctuary",
    movement: "RETURN",
    number: "1.1",
    title: "The Sanctuary",
    subtitle: "Get the open loops out of your head.",
    summary: "A fifteen-minute weekly mind sweep that gives unfinished thoughts somewhere to land.",
    problem: "Your body can be home while your mind is still carrying the estimate, the bill, the promise, the text, and the conversation you have been avoiding. The mind is useful for noticing and deciding. It is a poor place to store every unfinished thing.",
    principle: "The goal is not an empty mind or a perfect list. It is to stop using your attention as a reminder system so you can choose what needs action, discussion, or release.",
    practice: "A fifteen-minute weekly mind sweep",
    practiceIntro: "Use paper, not your phone. Write until the page feels honest, then give the important items one next move.",
    steps: [
      { title: "Make four spaces", body: "Label them Work, Home, Money and admin, and Me. Let an item appear in more than one place if that is how life actually feels." },
      { title: "Empty the loops", body: "Write every task, promise, worry, idea, and avoided conversation. Do not organize while you write. When the list slows down, wait one minute and ask what you are still trying not to forget." },
      { title: "Mark the next move", body: "Use D for Do, C for Choose, T for Talk, and R for Release. You do not need a full plan for every item." },
      { title: "Circle no more than three", body: "Choose the few items that deserve attention this week. Bring only the shared items into the Sunday Board Meeting." },
    ],
    adaptation: "If fifteen minutes is unrealistic, use five. Miss a week without turning it into a failure. A useful ritual is one you can return to without shame.",
    action: "Tonight, put one sheet of paper in front of you and circle the single item that would make you more present tomorrow.",
    reflection: "What am I carrying in my head that belongs on paper, on a calendar, or in a conversation?",
    fieldNote: "I built this because I was tired of being physically home while part of my attention was still somewhere else. The page does not make me a different person. It helps me come back to the room I am already in.",
  },
  {
    slug: "hunt-before-you-farm",
    movement: "RETURN",
    number: "1.2",
    title: "Hunter vs. Farmer",
    subtitle: "Hunt before the maintenance work takes the day.",
    summary: "A realistic way to protect focused creation without pretending email, admin, and upkeep do not matter.",
    problem: "Maintenance work is necessary, visible, and endless. It can fill a whole day while the one thing that would actually move your work forward remains untouched. The unfinished target then follows you home.",
    principle: "Hunter work creates, decides, or solves. Farmer work maintains, answers, and tends. Both matter. The order is the practice: protect one meaningful target, then tend the field.",
    practice: "One protected target",
    practiceIntro: "Choose the target before reactive work begins, then give it a block that fits your actual day.",
    steps: [
      { title: "Choose it the night before", body: "Write one sentence: Tomorrow matters if I finish ____. Make it concrete enough that you will know when it is done." },
      { title: "Choose a real block", body: "Use 25, 50, or 90 minutes based on the work and the life around it. A protected half hour beats an imaginary perfect morning." },
      { title: "Close the obvious gates", body: "Silence notifications, close email and messages, and put the phone out of reach unless the work genuinely requires it." },
      { title: "Farm on purpose", body: "When the block ends, decide what maintenance matters now. Do not let the inbox make that decision for you." },
    ],
    adaptation: "If your job is inherently reactive, protect the smallest block you can keep or choose one decision that must happen before the shift ends.",
    action: "Before bed, write tomorrow's one target and the exact time you will begin it.",
    reflection: "Which maintenance tasks make me feel productive while keeping me from the work that matters?",
    fieldNote: "This is not about becoming a productivity machine. It is about finishing the right work so less of it rides home with me.",
  },
  {
    slug: "the-airlock-protocol",
    movement: "RETURN",
    number: "1.3",
    title: "The Airlock Protocol",
    subtitle: "Use the trip home as a deliberate transition.",
    summary: "A short parked-car reset that keeps the entire workday from walking through the door with you.",
    problem: "A commute can become an extension of work. Calls, messages, and mental rehearsals keep the body moving toward home while the nervous system stays at the office. The first people you see then meet the residue of the day.",
    principle: "You do not have to fake a good mood. You can notice what you are carrying, choose what belongs tomorrow, and decide how you want to enter before the door opens.",
    practice: "The parked-car transition",
    practiceIntro: "Safety comes first. Set navigation before moving, keep the phone out of hand while driving, and do the exercise only after you are parked with the engine off.",
    steps: [
      { title: "Park and stop", body: "Engine off. Phone silent and out of your hand. Give yourself two minutes before opening the door." },
      { title: "Name what followed you", body: "Say or write the unfinished work, frustration, or worry that is still active. Decide what belongs to tomorrow." },
      { title: "Slow the exit", body: "Take three slow breaths with a longer exhale. You are not erasing the day. You are marking a change of room and responsibility." },
      { title: "Choose the entrance", body: "Put the phone away. Make eye contact. Offer a real greeting. Let the first ten seconds say that you have arrived." },
    ],
    adaptation: "Remote worker: close the laptop, step outside, and return through a different door. Transit or walking: use a landmark near home as the transition point.",
    action: "Before your next drive, set navigation and put the phone where you cannot reach it. Do the Airlock only after the car is fully parked.",
    reflection: "What part of my workday most often walks through the door with me?",
    fieldNote: "The Airlock is one of the first practices I built for myself. I needed a small space between being responsible for work and being available at home.",
  },
  {
    slug: "the-emotional-thermostat",
    movement: "LEAD",
    number: "2.1",
    title: "The Emotional Thermostat",
    subtitle: "Pause before pressure chooses your response.",
    summary: "A three-part practice for pausing, returning when promised, and repairing when you miss.",
    problem: "Pressure can make a man louder, colder, or absent. The people around him notice the change before they understand the reason. Pretending to be calm does not help, but neither does handing the whole room an unfiltered reaction.",
    principle: "You influence the temperature of a room without controlling everyone in it. The work is not perfect calm. It is noticing earlier, taking a clean pause, and repairing honestly after a miss.",
    practice: "Pause, return, repair",
    practiceIntro: "Use the shortest response that keeps a hard moment from becoming a larger one.",
    steps: [
      { title: "Pause before the answer", body: "Take one slow breath. If you can respond respectfully, do it. If not, say that you need a short break." },
      { title: "Name the return time", body: "A pause is not disappearing when you say when you will come back and keep your word. Choose a specific time, even if it is ten minutes away." },
      { title: "Return with one calm sentence", body: "Start with what is true and useful. Do not open with a defense, a lecture, or a list of everything the other person did wrong." },
      { title: "Repair the miss", body: "If you were sharp or shut down, name it without an excuse. Apologize for your part and ask what would help reconnect." },
    ],
    adaptation: "If a conversation is unsafe, escalating, or beyond what a short pause can hold, step away and seek appropriate outside support. This practice is not a substitute for therapy or crisis help.",
    action: "Write the sentence you can use next time: I am too worked up to answer well. I will come back at ____.",
    reflection: "When pressure rises, do I get louder, quieter, more controlling, or more distant?",
    fieldNote: "I do not always catch the moment in time. Repair matters because the goal is not looking composed. The goal is taking responsibility and coming back.",
  },
  {
    slug: "the-date-night-experiment",
    movement: "LEAD",
    number: "2.2",
    title: "The Date Night Algorithm",
    subtitle: "Create a little curiosity together.",
    summary: "A shared experiment using novelty, activity, and protected attention without making connection feel like a performance.",
    problem: "A date can become another logistical task or a familiar routine where both people are still half inside work and phones. The activity is not the problem. Divided attention and unspoken expectations are.",
    principle: "Novelty plus shared activity is an experiment, not an algorithm. The point is to notice something together, make a choice together, and give the time a real boundary.",
    practice: "Choose, protect, notice",
    practiceIntro: "Plan one experience that fits your money, energy, mobility, childcare, and actual life.",
    steps: [
      { title: "Choose together", body: "Each person offers two ideas. Pick one that feels possible, not impressive. A walk somewhere new can work as well as an expensive night out." },
      { title: "Protect the attention", body: "Identify priority contacts, then keep phones out of sight unless they are needed. Agree on the boundary instead of surprising each other with it." },
      { title: "Do something alongside each other", body: "Cook a new meal, visit a new place, take a class, build something, play a game, or explore a part of town you usually pass." },
      { title: "Notice, do not grade", body: "Ask what felt easy, interesting, or worth doing again. The night does not have to prove anything about the marriage." },
    ],
    adaptation: "Use an at-home, free, low-cost, sensory-friendly, or mobility-friendly version. Twenty intentional minutes can count when a full evening cannot.",
    action: "At the next Sunday Board Meeting, each of you brings two possible dates and chooses one real time.",
    reflection: "What kind of shared activity makes conversation feel easier for us?",
    fieldNote: "The useful part is not manufacturing a perfect date. It is getting out of autopilot long enough to experience something together.",
  },
  {
    slug: "the-floor-general",
    movement: "LEAD",
    number: "2.3",
    title: "The Floor General",
    subtitle: "Join your child's world without taking it over.",
    summary: "Five to fifteen phone-free minutes at their level, following their interest and cues.",
    problem: "Parents can spend a whole evening near their children while attention remains divided. Even well-meant play can become another adult-led agenda where the child is managed instead of met.",
    principle: "The parent creates the safe conditions. The child leads the play or conversation. The floor is a metaphor for joining their world, not a requirement to sit in one position.",
    practice: "Five to fifteen minutes, child led",
    practiceIntro: "Put the phone away, get physically or emotionally near, and follow instead of directing.",
    steps: [
      { title: "Enter their level", body: "Sit on the floor, beside them, across the table, or in the passenger seat. Choose the position that works for both bodies and sensory needs." },
      { title: "Let them choose", body: "Ask what they want to do or talk about. Resist improving the game, teaching a lesson, or steering toward your preferred activity." },
      { title: "Follow the cues", body: "Physical play is opt-in, easy to stop, and safe. Conversation with an older child may work better shoulder to shoulder than face to face." },
      { title: "End cleanly", body: "Give a brief warning when time is almost up. Say what you enjoyed and when you can return." },
    ],
    adaptation: "Use five minutes on a crowded day. For teens, drive, cook, fix, fish, walk, or work beside them without turning every silence into an interview.",
    action: "Choose one child, one phone-free window, and one activity they are allowed to lead today.",
    reflection: "When I enter my child's world, how quickly do I start directing it?",
    fieldNote: "I called it Floor General, but the lesson is mostly about giving up command. I set the conditions. They show me where connection is possible.",
  },
  {
    slug: "the-third-place",
    movement: "KEEP",
    number: "3.1",
    title: "The Third Place",
    subtitle: "Keep one part of life from becoming only work and home duty.",
    summary: "A recurring place or activity that restores interest, identity, friendship, or play outside work and household roles.",
    problem: "A man can become useful in every room and still feel absent from his own life. Work and home both matter, but neither should have to carry every part of identity, play, friendship, and renewal.",
    principle: "Sociologist Ray Oldenburg used third place for social spaces outside home and work. Iron Compass borrows that idea more broadly: a recurring place or activity where you can show up without performing your main roles.",
    practice: "Choose one recurring place",
    practiceIntro: "It should restore more than it distracts and fit fairly into the life you share with other people.",
    steps: [
      { title: "Name what restores you", body: "Think beyond a generic men's-life checklist. It might be a trail, church, a workshop, fishing water, kettlebells, volunteering, a rec league, a breakfast table, or time making something." },
      { title: "Choose the smallest real version", body: "Start with a recurring thirty-minute block if that is what fits. A place becomes meaningful through return, not through dramatic amounts of time." },
      { title: "Coordinate at home", body: "Protect restorative time for both spouses. Put it on the shared calendar and account for childcare, money, and the rest each person needs." },
      { title: "Notice what it produces", body: "Ask whether you return more alive and available or merely numbed and avoidant. Adjust honestly." },
    ],
    adaptation: "Some seasons require a smaller or closer version. Some problems require workload changes, sleep, medical care, therapy, or other support. A hobby is not a cure for burnout.",
    action: "Choose one place or activity you want to return to twice this month and coordinate the first time.",
    reflection: "Where do I feel like a whole person rather than only a worker, husband, or father?",
    fieldNote: "Mountain biking, fishing, kettlebells, and riding are not credentials. They are places where I remember I am a person before I return to the people who need me.",
  },
  {
    slug: "the-friendship-script",
    movement: "KEEP",
    number: "3.2",
    title: "The Friendship Script",
    subtitle: "Invite first, and make the invitation easy to answer.",
    summary: "A low-pressure way to turn respect or shared interest into repeated time and actual friendship.",
    problem: "Many adult friendships remain vague. Two men may like and respect each other for years without either one naming a time, an activity, or the next invitation. Waiting for friendship to happen keeps it theoretical.",
    principle: "Friendship usually grows through specific invitations, shared activity, low stakes, and repetition. One or two dependable relationships can matter more than a large network.",
    practice: "The specific invitation",
    practiceIntro: "Choose a man, an activity, and a time. Keep the first invitation simple enough that a no does not become a verdict on the relationship.",
    steps: [
      { title: "Pick one person", body: "Choose someone you respect or already enjoy being around. You do not need to decide whether he will become a close friend." },
      { title: "Make it concrete", body: "Try: I am riding Saturday at eight. Want to come? Or: I am grabbing coffee after the kids' game. Join me?" },
      { title: "Repeat without chasing", body: "Schedules are real. Invite again later if the first answer is no or uncertain. Respect a pattern of disinterest without turning it into a personal failure." },
      { title: "Let honesty grow later", body: "Start shoulder to shoulder. When trust exists, ask a real question and answer one honestly yourself." },
    ],
    adaptation: "If geography or health limits activity, use a recurring call, online game, project check-in, or breakfast. Repetition matters more than the setting.",
    action: "Send one specific, low-pressure invitation before the day ends.",
    reflection: "Who do I keep hoping will invite me, and what stops me from inviting him first?",
    fieldNote: "I do not need a giant men's network. I need a few people I can actually call, and that begins with being willing to make a real invitation.",
  },
  {
    slug: "mission-debrief",
    movement: "KEEP",
    number: "3.3",
    title: "Mission Debrief",
    subtitle: "Keep the practices that actually helped.",
    summary: "A simple review of the full system that turns nine lessons into two practices for the next thirty days.",
    problem: "A course can become another pile of information. Finishing every page does not matter if none of the practices survive an ordinary week.",
    principle: "The point of Iron Compass is return, not completion. Choose the few practices that met a real problem, use them long enough to learn, and release the rest for now.",
    practice: "Two practices for thirty days",
    practiceIntro: "Review the nine practices, choose two, and make each one specific enough to use.",
    steps: [
      { title: "Name the real problem", body: "What is costing you the most right now: unfinished mental load, reactive work, poor transitions, pressure, distance at home, or isolation?" },
      { title: "Choose two practices", body: "Pick one that helps you Return and one that helps you Lead or Keep. More is not automatically better." },
      { title: "Define the minimum", body: "Write when, where, and how small the practice can become on a hard week without disappearing." },
      { title: "Review without a scorecard", body: "After thirty days, ask what changed, what did not fit, and what you want to continue. Do not turn family life into a compliance dashboard." },
    ],
    adaptation: "If a practice creates conflict, shame, or more management than value, stop and redesign it. Use professional help when the problem is beyond the scope of educational material.",
    action: "Open the workbook and circle the two practices you will use for the next thirty days.",
    reflection: "Which two practices would make the biggest difference in the life I am already living?",
    fieldNote: "This is not a graduation. It is a chance to keep the few things that helped me come back and leave the rest until I need it.",
  },
];

export const LESSON_GUIDES: Record<string, LessonGuide> = {
  "the-sanctuary": {
    whyItHelps: "An unfinished task can keep part of your attention attached to the room you just left. Writing the open loop down and naming a next move gives it somewhere more reliable to live than your working memory.",
    wordsToUse: "I have a lot still running in my head. I am going to put it on paper for ten minutes so I can be here with you.",
    watchFor: "Do not turn the mind sweep into a giant life inventory or another system to maintain. The page is a landing place, not a command center.",
    fieldAssignment: "Run one honest mind sweep this week. Circle no more than three items and notice whether you re-enter the room with more attention available.",
    evidence: [
      { label: "Attention residue", href: "https://www.sciencedirect.com/science/article/pii/S0749597809000399", note: "Leroy's experiments found that attention can remain attached to an unfinished task after switching." },
    ],
  },
  "hunt-before-you-farm": {
    whyItHelps: "Reactive work supplies endless visible wins. Choosing one meaningful target before opening the gates reduces switching and makes the important work easier to recognize and finish.",
    wordsToUse: "Before I open email, the one thing that matters is ____. I will give it ____ minutes.",
    watchFor: "Focused work is not an excuse to become unavailable or inflexible. Protect a real block, not a fantasy schedule that ignores your job and family.",
    fieldAssignment: "Choose tomorrow's target tonight. Protect one block, then write down what actually interrupted it instead of blaming yourself.",
    evidence: [
      { label: "Task switching and residue", href: "https://www.sciencedirect.com/science/article/pii/S0749597809000399", note: "The research supports reducing unnecessary switches. It does not prescribe one perfect work routine." },
    ],
  },
  "the-airlock-protocol": {
    whyItHelps: "Psychological detachment from work is associated with less exhaustion, better well-being, and better recovery. A deliberate transition creates a repeatable cue that work has ended for now.",
    wordsToUse: "I had a hard day and I need ten minutes to land. I will come find you at ____, and I want to hear about your day.",
    watchFor: "The Airlock happens only after the car is parked. It is not a reason to ignore a spouse, avoid a conversation, or disappear without a return time.",
    fieldAssignment: "Use the parked-car transition three times. Keep it under three minutes and judge it only by the way you enter the house.",
    evidence: [
      { label: "Detachment from work", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5233687/", note: "A meta-analysis of 86 publications linked detachment with several recovery and well-being outcomes." },
    ],
  },
  "the-emotional-thermostat": {
    whyItHelps: "A pause creates distance between the first surge and the next action. The usefulness comes from returning when promised and repairing your part, not from looking calm or winning the exchange.",
    wordsToUse: "I am too worked up to answer well. I need ten minutes. I will come back at ____, and I will come back.",
    watchFor: "A pause without a return time can feel like abandonment or control. This practice is never a substitute for safety planning, therapy, or crisis support.",
    fieldAssignment: "Write your pause sentence and your repair sentence. Use the first at the earliest sign of escalation, not after the room is already on fire.",
    evidence: [
      { label: "Emotion regulation overview", href: "https://pubmed.ncbi.nlm.nih.gov/31961170/", note: "Emotion regulation is flexible and context dependent. Iron Compass turns that broad principle into a small communication practice." },
    ],
  },
  "the-date-night-experiment": {
    whyItHelps: "Shared novelty can interrupt autopilot and create new material for attention and conversation. The point is not spending more. It is doing something together with protected attention.",
    wordsToUse: "Let us each bring two ideas. We will choose one that fits this season and keep the phones out of sight unless we need them.",
    watchFor: "Do not use a date as a test of the marriage, force excitement, or surprise your spouse with rules. Choose the activity and the phone boundary together.",
    fieldAssignment: "Plan one modest shared experience in the next fourteen days and end with one question: what part should we do again?",
    evidence: [
      { label: "Shared novel activities", href: "https://pubmed.ncbi.nlm.nih.gov/10707334/", note: "In surveys and experiments, shared novel activities were associated with short-term increases in experienced relationship quality." },
    ],
  },
  "the-floor-general": {
    whyItHelps: "Father-child play is not one single technique, and the evidence varies by age and kind of play. The durable move here is undivided, responsive time in which the child has room to lead.",
    wordsToUse: "You pick. I have ten minutes, my phone is away, and I am with you.",
    watchFor: "Child-led does not mean unsafe or boundary-free. Follow the child's interest while the parent still protects bodies, consent, time, and the room.",
    fieldAssignment: "Give one child ten phone-free minutes at their level. Do not teach, improve, or interview. Write down what you noticed afterward.",
    evidence: [
      { label: "Father-child play review", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8153002/", note: "A systematic review found a varied but meaningful body of research connecting father-child play with child outcomes." },
    ],
  },
  "the-third-place": {
    whyItHelps: "A recurring place or activity can support identity, friendship, movement, play, and recovery outside the two roles that consume most adult life. It works only when it restores more than it helps you avoid.",
    wordsToUse: "I want to protect this because I come back better. I also want to make equal room for what restores you. Can we put both on the calendar?",
    watchFor: "A third place is not a cure for burnout and not a one-sided escape from family labor. Coordinate it fairly and notice what kind of man returns home.",
    fieldAssignment: "Choose one place or activity and return twice this month. After each time, ask whether you came home more alive, more available, or merely numb.",
    evidence: [
      { label: "Social relationships and health", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2910600/", note: "A large meta-analysis found strong associations between social relationships and survival. It does not prove that any one hobby or place causes health gains." },
    ],
  },
  "the-friendship-script": {
    whyItHelps: "Adult friendship rarely becomes dependable through vague good intentions. A specific invitation lowers the social guesswork and repetition gives a relationship a chance to become real.",
    wordsToUse: "I am riding Saturday at eight. Want to come? No pressure if this week is packed.",
    watchFor: "Specific does not mean persistent pressure. Invite clearly, accept the answer, and let trust grow at the speed of the actual relationship.",
    fieldAssignment: "Send one concrete, low-pressure invitation today. If the answer is no, make one more invitation another week before deciding what it means.",
    evidence: [
      { label: "Social connection meta-analysis", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2910600/", note: "The evidence supports taking social connection seriously. This script is an Iron Compass application, not a clinically tested intervention." },
    ],
  },
  "mission-debrief": {
    whyItHelps: "A course changes nothing by being completed. Specific plans connect a recognizable situation with a chosen response, making the next action easier to retrieve when real life arrives.",
    wordsToUse: "When ____ happens, I will ____. On a hard week, the smallest version is ____.",
    watchFor: "Do not keep nine practices because you paid for nine lessons. Choose the two that meet a real problem and let the others wait.",
    fieldAssignment: "Choose two practices for thirty days. Give each a situation, a response, and a minimum version. Review what happened without grading your character.",
    evidence: [
      { label: "Implementation intentions", href: "https://pubmed.ncbi.nlm.nih.gov/18096108/", note: "Research on if-then planning suggests that linking a cue to a response can support goal pursuit." },
    ],
  },
};

export const FOCUS_MOVES = [
  {
    number: "01",
    title: "Remove the color",
    promise: "Make the phone less visually demanding.",
    body: "Switch the display to grayscale for the 72-hour experiment. Color is not the whole problem, but removing it creates a useful interruption between the impulse and the tap.",
    exception: "Turn color back on when it is genuinely needed for work, maps, photos, health, or accessibility.",
  },
  {
    number: "02",
    title: "Remove the extraction apps",
    promise: "Create friction around the feeds that take the most.",
    body: "Delete or sign out of the few apps you open without deciding. Keep essential tools. The experiment is about noticing the reflex, not proving that you can live without a smartphone.",
    exception: "Use a browser or scheduled desktop window if an app is required for work or caregiving.",
  },
  {
    number: "03",
    title: "Silence the machine",
    promise: "Let people reach you without letting every platform interrupt you.",
    body: "Turn off nonessential notifications. Keep priority calls, texts, medical alerts, authentication, and anything a caregiver truly needs.",
    exception: "Set navigation before the car moves and keep the phone out of your hand while driving. A notification is never worth a downward glance on the road.",
  },
  {
    number: "04",
    title: "Choose a Vault window",
    promise: "Give one important part of the day a physical phone boundary.",
    body: "Choose a repeatable window when the phone lives in a drawer, bag, or charging station. Make it meaningful and realistic for your household rather than copying someone else's schedule.",
    exception: "Tell the people who may need you how to reach you. Shorten the window when work, health, or caregiving requires it.",
  },
] as const;

export const getCoreLesson = (slug: string) => CORE_LESSONS.find((lesson) => lesson.slug === slug);

export const getMovement = (key: MovementKey) => CORE_MOVEMENTS.find((movement) => movement.key === key);
