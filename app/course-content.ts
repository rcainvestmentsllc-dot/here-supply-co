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
  artImage: string;
  artAlt: string;
  previewPosition: string;
  artCaption: string;
  problemImage?: string;
  problemAlt?: string;
  problemCaption?: string;
  detailImage: string;
  detailAlt: string;
  detailCaption: string;
  scene: string;
  problem: string;
  principle: string;
  practice: string;
  practiceIntro: string;
  steps: CourseStep[];
  adaptation: string;
  /**
   * Only The Floor General assumes children. Eight of the nine lessons work
   * for a couple with none, so rather than water this one down it states the
   * assumption and gives the same practice pointed at each other.
   */
  withoutKids?: { note: string; body: string };
  /**
   * The through-line of the whole course: every lesson is the instructions for
   * one sheet of the Field Kit, and every sheet has a physical place it lives.
   * A practice you have to remember competes with the phone. A practice sitting
   * on the fridge or in the glovebox does not.
   */
  kit: {
    /** Field Kit sheet number. */
    sheet: string;
    /** Its name on the sheet. */
    sheetName: string;
    /** Where it physically lives, because that is what makes it get used. */
    livesAt: string;
  };
  /**
   * What the two of you do with it. The lessons were written to one person,
   * which quietly made the course a self-improvement product and left the
   * other half of the couple as the audience for someone else's homework.
   */
  together: string;
  /** One quiet line. Encouragement, never a slogan. */
  encouragement: string;
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
    body: "Picture the moment and the person you want to be in it, then make the next move specific.",
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
    stillImage: "/assets/course/photo/movement-return-v1.jpg",
    stillAlt: "A man placing his phone down before joining his family at home",
    image: "/assets/course/module-return-poster.jpg",
    alt: "Chris Avera introducing the Return module",
    previewImage: "/assets/course/preview-return.png",
    previewAlt: "The Sanctuary lesson cover inside the Return module",
    video: "/assets/course/module-return-final-v2.mp4",
    captions: "/assets/course/module-return-final.vtt",
    duration: "00:40",
  },
  {
    key: "LEAD" as const,
    number: "02",
    name: "Lead",
    line: "Bring a steadier self to the people and places that need you most.",
    stillImage: "/assets/course/photo/movement-lead-v1.jpg",
    stillAlt: "A husband listening closely while his wife speaks at the kitchen table",
    image: "/assets/course/module-lead-poster.jpg",
    alt: "Chris Avera introducing the Lead module",
    previewImage: "/assets/course/preview-lead.png",
    previewAlt: "The Emotional Thermostat lesson cover inside the Lead module",
    video: "/assets/course/module-lead-final.mp4",
    captions: "/assets/course/module-lead-final.vtt",
    duration: "00:37",
  },
  {
    key: "KEEP" as const,
    number: "03",
    name: "Keep",
    line: "Protect the relationships and rhythms that keep a good life intact.",
    stillImage: "/assets/course/photo/movement-keep-v4.jpg",
    stillAlt: "A father and daughter walking home from the ocean while talking together",
    image: "/assets/course/module-keep-poster.jpg",
    alt: "Chris Avera introducing the Keep module",
    previewImage: "/assets/course/preview-keep.png",
    previewAlt: "The Third Place lesson cover inside the Keep module",
    video: "/assets/course/module-keep-final-v2.mp4",
    captions: "/assets/course/module-keep-final.vtt",
    duration: "00:30",
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
    artImage: "/assets/course/photo/lesson-1-1-sanctuary-v1.jpg",
    previewPosition: "45% center",
    artAlt: "A man writing at a kitchen table near the ocean at dawn",
    artCaption: "Give the unfinished things somewhere to land, then return to the morning in front of you.",
    detailImage: "/assets/course/art/detail-1-1-sanctuary.jpg",
    detailAlt: "A handwritten mind sweep beside coffee, keys, and a facedown phone",
    detailCaption: "The page holds the unfinished things so your attention does not have to.",
    scene: "The house is finally quiet, but your head is not. You remember the estimate while brushing your teeth, the school form when the lights go out, and the conversation you have been avoiding at 2:13 in the morning. Nothing is happening, yet your attention is still working overtime.",
    problem: "Your body can be home while your mind is still carrying the estimate, the bill, the promise, the text, and the conversation you have been avoiding. The mind is useful for noticing and deciding. It is a poor place to store every unfinished thing.",
    principle: "The goal is not an empty mind or a perfect list. It is to stop using your attention as a reminder system so you can choose what needs action, discussion, or release.",
    practice: "A fifteen-minute weekly mind sweep",
    practiceIntro: "Use paper, not your phone. Write until the page feels honest, then give the important items one next move.",
    steps: [
      { title: "Make four spaces", body: "Label them Work, Home, Money and admin, and Me. Let an item appear in more than one place if that is how life actually feels." },
      { title: "Empty the loops", body: "Write every task, promise, worry, idea, and avoided conversation. Do not organize while you write. When the list slows down, wait one minute and ask what you are still trying not to forget." },
      { title: "Mark the next move", body: "Use D for Do, C for Choose, T for Talk, and R for Release. You do not need a full plan for every item." },
      { title: "Circle no more than three", body: "Choose the few items that deserve attention this week. Bring only the shared items into the weekly conversation." },
    ],
    adaptation: "If fifteen minutes is unrealistic, use five. Miss a week without turning it into a failure. A useful ritual is one you can return to without shame.",
    kit: { sheet: "04", sheetName: "The Brain Dump", livesAt: "The desk, or wherever you actually sit down" },
    together: "Do the sweep separately, then trade only the items that touch both of you. Everything else stays yours. The point is not to audit each other's list, it is to stop two people silently carrying the same four things and each assuming the other forgot.",
    encouragement: "A quiet mind is not a tidy one. It is one that trusts the paper.",
    action: "Tonight, put one sheet of paper in front of you and circle the single item that would make you more present tomorrow.",
    reflection: "What am I carrying in my head that belongs on paper, on a calendar, or in a conversation?",
    fieldNote: "I built this because I was tired of being physically home while part of my attention was still somewhere else. The page does not make me a different person. It helps me come back to the life already in front of me.",
  },
  {
    slug: "hunt-before-you-farm",
    movement: "RETURN",
    number: "1.2",
    title: "Focus Mode",
    subtitle: "Protect the work that changes something before maintenance takes the day.",
    summary: "A realistic way to protect focused creation without pretending email, admin, and upkeep do not matter.",
    artImage: "/assets/course/photo/lesson-1-2-focus-v3.jpg",
    previewPosition: "50% center",
    artAlt: "A woman concentrating on a paper project plan at a coastal studio table while her closed laptop and phone remain out of reach",
    artCaption: "Protect the work that changes something before the small work fills the day.",
    detailImage: "/assets/course/art/detail-1-2-hunter-farmer.jpg",
    detailAlt: "A single notebook and workpiece on a sturdy workshop bench",
    detailCaption: "One clear target. One protected block. Then the maintenance can begin.",
    scene: "You answer messages, clear two small fires, tidy the inbox, and look up at 4:47. You were busy all day. The proposal, decision, call, or piece of work that would have changed something is still untouched, and now it is riding home with you.",
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
    kit: { sheet: "05", sheetName: "Tomorrow Matters If", livesAt: "The desk, written the night before" },
    together: "Tell each other the one sentence. Not to be held accountable, but so that when one of you is unreachable for ninety minutes the other knows it was chosen rather than taken.",
    encouragement: "One protected hour beats a perfect morning you never get.",
    action: "Before bed, write tomorrow's one target and the exact time you will begin it.",
    reflection: "Which maintenance tasks make me feel productive while keeping me from the work that matters?",
    fieldNote: "This is not about becoming a productivity machine. It is about finishing the right work so less of it rides home with me.",
  },
  {
    slug: "the-airlock-protocol",
    movement: "RETURN",
    number: "1.3",
    title: "The Driveway Pause",
    subtitle: "Use the trip home as a deliberate transition.",
    summary: "A short parked-car reset that keeps the entire workday from walking through the door with you.",
    artImage: "/assets/course/photo/lesson-1-3-driveway-v1.jpg",
    previewPosition: "52% center",
    artAlt: "A woman pausing in a parked car before entering a warm home",
    artCaption: "The workday can stop at the driveway. Choose how you enter before you open the door.",
    detailImage: "/assets/course/art/detail-1-3-airlock.jpg",
    detailAlt: "Work boots, keys, and a facedown phone outside an open warm home",
    detailCaption: "A small threshold can become a deliberate change from work to home.",
    scene: "You pull into the driveway still replaying the last call. One more notification lights the screen. Inside, somebody has been waiting to tell you something ordinary and important. The first ten seconds can belong to the workday, or they can mark your arrival home.",
    problem: "A commute can become an extension of work. Calls, messages, and mental rehearsals keep the body moving toward home while the nervous system stays at the office. The first people you see then meet the residue of the day.",
    principle: "You do not have to fake a good mood. You can notice what you are carrying, choose what belongs tomorrow, and decide how you want to enter before the door opens.",
    practice: "The parked-car transition",
    practiceIntro: "Safety comes first. Set navigation before moving, keep the phone out of hand while driving, and do the exercise only after you are parked with the engine off.",
    steps: [
      { title: "Park and stop", body: "Engine off. Phone silent and out of your hand. Give yourself two minutes before opening the door." },
      { title: "Name what followed you", body: "Say or write the unfinished work, frustration, or worry that is still active. Decide what belongs to tomorrow." },
      { title: "Slow the exit", body: "Take three slow breaths with a longer exhale. You are not erasing the day. You are marking a change of role and responsibility." },
      { title: "Choose the entrance", body: "Put the phone away. Make eye contact. Offer a real greeting. Let the first ten seconds say that you have arrived." },
    ],
    adaptation: "Remote worker: close the laptop, step outside, and return through a different door. Transit or walking: use a landmark near home as the transition point.",
    kit: { sheet: "03", sheetName: "The Driveway Card", livesAt: "The glovebox, because that is where the two minutes happen" },
    together: "Whoever is inside gets to know this is happening, otherwise two minutes in a parked car reads as avoidance. Say it once: if I sit out there a minute, I am not hiding, I am arriving.",
    encouragement: "You are not erasing the day. You are deciding how to carry it in.",
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
    artImage: "/assets/course/photo/lesson-2-1-thermostat-v1.jpg",
    previewPosition: "32% center",
    artAlt: "A parent pausing in a warm family kitchen before responding",
    artCaption: "Steadiness is not pretending to be calm. It is making room for a better next response.",
    detailImage: "/assets/course/art/detail-2-1-thermostat.jpg",
    detailAlt: "A glass of water and a short handwritten return note on a kitchen counter",
    detailCaption: "A clean pause includes a promise to return, and then keeping it.",
    scene: "The question is small, but it reaches you at the wrong moment. Your answer comes out sharper than you meant it to. Everyone hears the edge before anyone knows what kind of day you had, and the whole evening begins organizing itself around that tone.",
    problem: "Pressure can make a person louder, colder, or absent. The people around them notice the change before they understand the reason. Pretending to be calm does not help, but neither does handing everyone else an unfiltered reaction.",
    principle: "Your emotional state affects the people around you even when you are not trying to lead. The work is not perfect calm. It is noticing earlier, taking a clean pause, and repairing honestly after a miss.",
    practice: "Pause, return, repair",
    practiceIntro: "Use the shortest response that keeps a hard moment from becoming a larger one.",
    steps: [
      { title: "Pause before the answer", body: "Take one slow breath. If you can respond respectfully, do it. If not, say that you need a short break." },
      { title: "Name the return time", body: "A pause is not disappearing when you say when you will come back and keep your word. Choose a specific time, even if it is ten minutes away." },
      { title: "Return with one calm sentence", body: "Start with what is true and useful. Do not open with a defense, a lecture, or a list of everything the other person did wrong." },
      { title: "Repair the miss", body: "If you were sharp or shut down, name it without an excuse. Apologize for your part and ask what would help reconnect." },
    ],
    adaptation: "If a conversation is unsafe, escalating, or beyond what a short pause can hold, step away and seek appropriate outside support. This practice is not a substitute for therapy or crisis help.",
    kit: { sheet: "06", sheetName: "Pause, Return, Repair", livesAt: "The nightstand" },
    together: "Agree on the pause before you need it, when nothing is wrong. A break called mid argument by someone who never mentioned it sounds like walking out. A break you both named last Tuesday sounds like the plan working.",
    encouragement: "A pause is not distance. It is the shortest route back.",
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
    artImage: "/assets/course/photo/lesson-2-2-date-night-v6.jpg",
    previewPosition: "50% center",
    artAlt: "A couple walking and talking together on a quiet coastal path after dinner with no phones in sight",
    artCaption: "Connection does not need a grand gesture. It needs curiosity and protected attention.",
    detailImage: "/assets/course/art/detail-2-2-date-night.jpg",
    detailAlt: "Two simple meals and place settings at a seaside counter with phones put away",
    detailCaption: "The place can be ordinary when the phones are away and the attention is real.",
    scene: "You finally get time together and spend the first twenty minutes deciding where to go. At dinner, both phones keep appearing beside the plates. Nothing is wrong, exactly. The night just feels like another familiar task instead of a chance to notice each other again.",
    problem: "A date can become another logistical task or a familiar routine where both people are still half inside work and phones. The activity is not the problem. Divided attention and unspoken expectations are.",
    principle: "Novelty plus shared activity is an experiment, not an algorithm. The point is to notice something together, make a choice together, and give the time a real boundary.",
    practice: "Choose, protect, notice",
    practiceIntro: "Plan one experience that fits your money, energy, mobility, childcare, and actual life.",
    steps: [
      { title: "Choose together", body: "Each person offers two ideas. Pick one that feels possible, not impressive. A walk somewhere new can work as well as an expensive night out." },
      { title: "Put the phones away", body: "Silence them and place them out of sight before you sit down. Allow priority contacts if needed, then agree that either person can check only for a real reason." },
      { title: "Do something alongside each other", body: "Cook a new meal, visit a new place, take a class, build something, play a game, or explore a part of town you usually pass." },
      { title: "Notice, do not grade", body: "Ask what felt easy, interesting, or worth doing again. The night does not have to prove anything about the marriage." },
    ],
    adaptation: "Use an at-home, free, low-cost, sensory-friendly, or mobility-friendly version. Twenty intentional minutes can count when a full evening cannot.",
    kit: { sheet: "07", sheetName: "The Date Night Card", livesAt: "The wallet, so the idea survives the week" },
    together: "Two ideas each, pick one, phones in the glovebox before you sit down. Afterwards ask what was interesting, not whether it worked. A night that has to prove something about the marriage stops being a night out.",
    encouragement: "Curiosity is the part that wore off. It comes back with use.",
    action: "At the next weekly check-in, each of you brings two possible dates, chooses one real time, and agrees where the silenced phones will stay.",
    reflection: "What kind of shared activity makes conversation feel easier for us?",
    fieldNote: "The useful part is not manufacturing a perfect date. It is getting out of autopilot long enough to experience something together.",
  },
  {
    slug: "the-floor-general",
    movement: "LEAD",
    number: "2.3",
    title: "The Floor General",
    subtitle: "Join their world without taking it over.",
    summary: "Five to fifteen phone-free minutes at their level, following their interest and cues.",
    artImage: "/assets/course/photo/lesson-2-3-floor-general-v1.jpg",
    previewPosition: "57% center",
    artAlt: "A father and children building a blanket fort together in a family room",
    artCaption: "Set the safe conditions, then let your child show you where connection is possible.",
    problemImage: "/assets/course/photo/emotional-phone-at-game-v1.jpg",
    problemAlt: "A parent looks at a phone while a child waits for his attention on a baseball field",
    problemCaption: "The cost is not the phone. It is the moment that keeps happening without us.",
    detailImage: "/assets/course/art/detail-2-3-floor-general.jpg",
    detailAlt: "A lived-in blanket fort with books, blocks, and a phone left outside",
    detailCaption: "Enter their world without improving it, teaching it, or taking command.",
    scene: "Your child says your name, asks a question, or calls, Watch this. They look for your eyes before they look for an answer. If the phone gets the first response, the small invitation can close before either of you realizes what happened.",
    problem: "Parents can spend a whole evening near their children while attention remains divided. A repeated downward glance can make the screen feel like it arrived first, even when that is not what the parent means. Even well-meant play can become another adult-led agenda where the child is managed instead of met.",
    principle: "The parent creates the safe conditions. The child leads the play or conversation. The floor is a metaphor for joining their world, not a requirement to sit in one position.",
    practice: "Eyes first, then follow",
    practiceIntro: "Answer the bid for connection before you do anything else. Put the phone away, get physically or emotionally near, and follow instead of directing.",
    steps: [
      { title: "Give them your eyes first", body: "Set the phone down, make eye contact, and answer the invitation. If you cannot stop yet, say exactly when you can and keep that promise." },
      { title: "Enter their level", body: "Sit on the floor, beside them, across the table, or in the passenger seat. Choose the position that works for both bodies and sensory needs." },
      { title: "Let them choose", body: "Ask what they want to do or talk about. Resist improving the game, teaching a lesson, or steering toward your preferred activity." },
      { title: "End cleanly", body: "Follow their cues, keep physical play safe and easy to stop, then give a brief warning when time is almost up. Say what you enjoyed and when you can return." },
    ],
    adaptation: "Use five minutes on a crowded day. For teens, drive, cook, fix, fish, walk, or work beside them without turning every silence into an interview.",
    withoutKids: {
      note: "This is the one lesson that assumes children in the house.",
      body: "If there are none, the practice does not change, only who it points at. Your partner makes bids for attention the same way a child does, just quieter and easier to miss: a story about their day, something read aloud, a hand on your shoulder on the way past. Answer the bid before you do anything else. Put the phone in another room rather than face down. Let them pick the subject and resist improving it, solving it, or turning it into logistics. Fifteen minutes where they lead and you follow. The thing a child does loudly, an adult does once and then stops asking.",
    },
    kit: { sheet: "08", sheetName: "Floor Time", livesAt: "The kid's room, or the nightstand if there are none" },
    together: "Cover for each other. Fifteen minutes on the floor only happens if someone else is holding the rest of the evening, and it should trade back the next night.",
    encouragement: "Eye level is the whole technique. The rest is just staying there.",
    action: "The next time your child calls your name or says, Watch this, set the phone down, meet their eyes, and answer before you return to anything else.",
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
    artImage: "/assets/course/photo/lesson-3-1-third-place-v3.jpg",
    previewPosition: "48% center",
    artAlt: "Three friends talking after a ride beside a pickup with two complete mountain bikes secured in the background",
    artCaption: "Keep a place where you can make, move, laugh, and return home more alive.",
    detailImage: "/assets/course/art/detail-3-1-third-place.jpg",
    detailAlt: "Four mugs and work gloves around a solid shared workshop table",
    detailCaption: "Friendship often starts beside useful work, not across from a formal conversation.",
    scene: "Someone asks what you do for fun and you begin listing things you used to do. The bike needs air, the fishing gear has not moved, and the friend you meant to call is still a name in your phone. You are useful to everyone and quietly becoming unfamiliar to yourself.",
    problem: "A person can become useful to everyone and still feel absent from their own life. Work and home both matter, but neither should have to carry every part of identity, play, friendship, and renewal.",
    principle: "Sociologist Ray Oldenburg used third place for social spaces outside home and work. All the Way Here uses that idea more broadly: a recurring place or activity where you can show up without performing your main roles.",
    practice: "Choose one recurring place",
    practiceIntro: "It should restore more than it distracts and fit fairly into the life you share with other people.",
    steps: [
      { title: "Name what restores you", body: "Think beyond a generic self-care checklist. It might be a trail, church, a workshop, fishing water, kettlebells, volunteering, a rec league, a breakfast table, or time making something." },
      { title: "Choose the smallest real version", body: "Start with a recurring thirty-minute block if that is what fits. A place becomes meaningful through return, not through dramatic amounts of time." },
      { title: "Coordinate at home", body: "Protect restorative time for both spouses. Put it on the shared calendar and account for childcare, money, and the rest each person needs." },
      { title: "Notice what it produces", body: "Ask whether you return more alive and available or merely numbed and avoidant. Adjust honestly." },
    ],
    adaptation: "Some seasons require a smaller or closer version. Some problems require workload changes, sleep, medical care, therapy, or other support. A hobby is not a cure for burnout.",
    kit: { sheet: "09", sheetName: "The Third Place", livesAt: "The bag you already carry" },
    together: "Put both on the calendar in the same conversation or this becomes one person's hobby and the other person's resentment. Equal time, agreed out loud, childcare counted honestly.",
    encouragement: "You are allowed to be a person outside of who needs you.",
    action: "Choose one place or activity you want to return to twice this month and coordinate the first time.",
    reflection: "Where do I feel like a whole person rather than only a worker, partner, or parent?",
    fieldNote: "Mountain biking, fishing, kettlebells, and riding are not credentials. They are places where I remember I am a person before I return to the people who need me.",
  },
  {
    slug: "the-friendship-script",
    movement: "KEEP",
    number: "3.2",
    title: "The Friendship Script",
    subtitle: "Invite first, and make the invitation easy to answer.",
    summary: "A low-pressure way to turn respect or shared interest into repeated time and actual friendship.",
    artImage: "/assets/course/photo/lesson-3-2-friendship-v1.jpg",
    previewPosition: "50% center",
    artAlt: "Two women sharing coffee and conversation on a pickup tailgate near a coastal trail",
    artCaption: "Friendship grows through specific invitations and ordinary time shared more than once.",
    detailImage: "/assets/course/art/detail-3-2-friendship.jpg",
    detailAlt: "Two fishing rods and two camp mugs at the edge of a quiet lake",
    detailCaption: "Make the invitation specific enough that another person can actually say yes.",
    scene: "You have known this person for three years. You talk at the game, the gym, church, or school pickup and always say you should get together. Neither of you is rejecting the other. The friendship is simply waiting for someone to name a day and a time.",
    problem: "Many adult friendships remain vague. Two people may like and respect each other for years without either one naming a time, an activity, or the next invitation. Waiting for friendship to happen keeps it theoretical.",
    principle: "Friendship usually grows through specific invitations, shared activity, low stakes, and repetition. One or two dependable relationships can matter more than a large network.",
    practice: "The specific invitation",
    practiceIntro: "Choose a person, an activity, and a time. Keep the first invitation simple enough that a no does not become a verdict on the relationship.",
    steps: [
      { title: "Pick one person", body: "Choose someone you respect or already enjoy being around. You do not need to decide whether they will become a close friend." },
      { title: "Make it concrete", body: "Try: I am riding Saturday at eight. Want to come? Or: I am grabbing coffee after the kids' game. Join me?" },
      { title: "Repeat without chasing", body: "Schedules are real. Invite again later if the first answer is no or uncertain. Respect a pattern of disinterest without turning it into a personal failure." },
      { title: "Let honesty grow later", body: "Start shoulder to shoulder. When trust exists, ask a real question and answer one honestly yourself." },
    ],
    adaptation: "If geography or health limits activity, use a recurring call, online game, project check-in, or breakfast. Repetition matters more than the setting.",
    kit: { sheet: "10", sheetName: "The Friendship Script", livesAt: "The wallet" },
    together: "Protect each other's friendships the way you protect your own. A marriage asked to be the only relationship either of you has will buckle under a job neither of you gave it.",
    encouragement: "Invite first. The worst answer is a no you survive.",
    action: "Send one specific, low-pressure invitation before the day ends.",
    reflection: "Who do I keep hoping will invite me, and what stops me from inviting them first?",
    fieldNote: "I do not need a giant network. I need a few people I can actually call, and that begins with being willing to make a real invitation.",
  },
  {
    slug: "mission-debrief",
    movement: "KEEP",
    number: "3.3",
    title: "Mission Debrief",
    subtitle: "Keep the practices that actually helped.",
    summary: "A simple review of the full system that turns nine lessons into two practices for the next thirty days.",
    artImage: "/assets/course/photo/lesson-3-3-mission-debrief-v1.jpg",
    previewPosition: "58% center",
    artAlt: "A man journaling on a porch while his family gathers inside a warm home",
    artCaption: "The course ends when an idea becomes a practice you can keep in ordinary life.",
    detailImage: "/assets/course/art/detail-3-3-mission-debrief.jpg",
    detailAlt: "A marked-up workbook, family photograph, and worn boots on a porch",
    detailCaption: "Keep what changed something. Release what did not. Choose the next week on purpose.",
    scene: "The final lesson is open, the notes look good, and real life is already interrupting. This is the point where a course usually becomes another completed file. Instead of collecting nine ideas, you choose the two that deserve to live past this screen.",
    problem: "A course can become another pile of information. Finishing every page does not matter if none of the practices survive an ordinary week.",
    principle: "The point of All the Way Here is return, not completion. Choose the few practices that met a real problem, use them long enough to learn, and release the rest for now.",
    practice: "Two practices for thirty days",
    practiceIntro: "Review the nine practices, choose two, and make each one specific enough to use.",
    steps: [
      { title: "Name the real problem", body: "What is costing you the most right now: unfinished mental load, reactive work, poor transitions, pressure, distance at home, or isolation?" },
      { title: "Choose two practices", body: "Pick one that helps you Return and one that helps you Lead or Keep. More is not automatically better." },
      { title: "Define the minimum", body: "Write when, where, and how small the practice can become on a hard week without disappearing." },
      { title: "Review without a scorecard", body: "After thirty days, ask what changed, what did not fit, and what you want to continue. Do not turn family life into a compliance dashboard." },
    ],
    adaptation: "If a practice creates conflict, shame, or more management than value, stop and redesign it. Use professional help when the problem is beyond the scope of educational material.",
    kit: { sheet: "11", sheetName: "The Thirty Day Page", livesAt: "The table, next to the board sheet" },
    together: "Choose two practices between you, not nine. Write them where you both see them. In thirty days the question is what actually happened, not whether either of you was good.",
    encouragement: "Two practices you keep beat nine you admired.",
    action: "Open the workbook and circle the two practices you will use for the next thirty days.",
    reflection: "Which two practices would make the biggest difference in the life I am already living?",
    fieldNote: "This is not a graduation. It is a chance to keep the few things that helped me come back and leave the rest until I need it.",
  },
];

export const LESSON_GUIDES: Record<string, LessonGuide> = {
  "the-sanctuary": {
    whyItHelps: "An unfinished task can keep part of your attention attached to the workday you just left. Writing the open loop down and naming a next move gives it somewhere more reliable to live than your working memory.",
    wordsToUse: "I have a lot still running in my head. I am going to put it on paper for ten minutes so I can be here with you.",
    watchFor: "Do not turn the mind sweep into a giant life inventory or another system to maintain. The page is a landing place, not a command center.",
    fieldAssignment: "Run one honest mind sweep this week. Circle no more than three items and notice whether you return to your family with more attention available.",
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
    fieldAssignment: "Write your pause sentence and your repair sentence. Use the first at the earliest sign of escalation, not after everyone is already upset.",
    evidence: [
      { label: "Emotion regulation overview", href: "https://pubmed.ncbi.nlm.nih.gov/31961170/", note: "Emotion regulation is flexible and context dependent. All the Way Here turns that broad principle into a small communication practice." },
    ],
  },
  "the-date-night-experiment": {
    whyItHelps: "Shared novelty can interrupt autopilot and create new material for attention and conversation. The point is not spending more. It is doing something together with protected attention.",
    wordsToUse: "Let us each bring two ideas. We will choose one that fits this season, silence the phones, and put them out of sight before we sit down.",
    watchFor: "Do not use a date as a test of the marriage, force excitement, or surprise your spouse with rules. Choose the activity and the phone boundary together.",
    fieldAssignment: "Plan one modest shared experience in the next fourteen days and end with one question: what part should we do again?",
    evidence: [
      { label: "Shared novel activities", href: "https://pubmed.ncbi.nlm.nih.gov/10707334/", note: "In surveys and experiments, shared novel activities were associated with short-term increases in experienced relationship quality." },
    ],
  },
  "the-floor-general": {
    whyItHelps: "Children often ask for connection through a look, a question, or a small invitation to watch. The durable move here is to answer that bid with your eyes, then give a short stretch of undivided, responsive time in which the child has room to lead.",
    wordsToUse: "You have me. My phone is away. Show me.",
    watchFor: "This does not require perfect availability. If you cannot stop, make eye contact, name a specific return time, and keep it. Child-led still includes safety, consent, time, and household boundaries.",
    fieldAssignment: "Use one ten-minute Eyes First window this week. Answer the invitation, put the phone away, and follow without teaching, improving, or interviewing.",
    evidence: [
      { label: "Father-child play review", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8153002/", note: "A systematic review found a varied but meaningful body of research connecting father-child play with child outcomes." },
      { label: "Phones during family routines", href: "https://pubmed.ncbi.nlm.nih.gov/39377734/", note: "A family mealtime study linked adult phone use with less verbal interaction. It does not prove that one glance harms a relationship." },
    ],
  },
  "the-third-place": {
    whyItHelps: "A recurring place or activity can support identity, friendship, movement, play, and recovery outside the two roles that consume most adult life. It works only when it restores more than it helps you avoid.",
    wordsToUse: "I want to protect this because I come back better. I also want to make equal room for what restores you. Can we put both on the calendar?",
    watchFor: "A third place is not a cure for burnout and not a one-sided escape from family labor. Coordinate it fairly and notice what kind of person returns home.",
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
      { label: "Social connection meta-analysis", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2910600/", note: "The evidence supports taking social connection seriously. This script is an All the Way Here application, not a clinically tested intervention." },
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
    title: "Control the feeds",
    promise: "Choose which inputs reach you during the reset.",
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
    title: "Give the phone a home",
    promise: "Protect one repeated moment instead of policing the whole day.",
    body: "Try a clear arrival rule: when you get home, the phone goes to one drawer, bag, or charging station instead of following you from room to room. If all evening is unrealistic, protect dinner, bedtime, a game, or the Sunday Board Meeting. Adults model the boundary first.",
    exception: "Allow priority contacts and tell people how to reach you. Shorten or move the window when work, health, accessibility, or caregiving requires it.",
  },
] as const;

/**
 * What the seventy two hours actually feel like.
 *
 * This was the strongest part of the original Focus Protocol and it got lost
 * when that product was folded into the course. It matters because the reset
 * fails at hour twelve, when it feels pointless, and a person who was told in
 * advance that hour twelve would feel pointless reads the feeling as the plan
 * working rather than as proof they cannot do it.
 *
 * Framed as what people commonly report, not as a measured result, because
 * there is no study behind it.
 */
export const RESET_TIMELINE = [
  {
    window: "Hours 0 to 6",
    title: "The phantom reach",
    body: "Your hand goes to the pocket with no thought behind it. You will catch yourself unlocking a phone you had no reason to unlock. Nothing is wrong. You are simply meeting a habit you have never had to look at directly.",
  },
  {
    window: "Hours 6 to 18",
    title: "The boredom",
    body: "This is the hard part and it is the part most people quit in. Small gaps in the day that used to be filled are suddenly empty, and empty feels worse than it should. The urge to check will be strong and it will feel reasonable. It passes.",
  },
  {
    window: "Hours 18 to 36",
    title: "The settle",
    body: "The noise drops. Most people notice they are reaching less, that a task holds them longer, and that falling asleep gets easier. You are not calmer because you fixed yourself. There is just less arriving.",
  },
  {
    window: "Hours 36 to 72",
    title: "The room gets bigger",
    body: "Conversations run longer. You hear the second half of what someone says instead of the first half. The reflex is still there and it is quieter. This is the part worth keeping.",
  },
] as const;

/**
 * Days four to seven, when the reset is over and the negotiating starts. The
 * specific sentences matter: a person who recognizes the thought as predicted
 * hears it as a script instead of a conclusion.
 */
export const RESET_RELAPSE = {
  window: "Days 4 to 7",
  title: "The window where it comes back",
  intro: "The seventy two hours end and your mind makes its case. It is persuasive, it sounds like you, and it shows up almost word for word.",
  lines: [
    "I have proven I can handle it now.",
    "Just one app. Not the bad ones.",
    "Ten minutes is not the same thing.",
    "It was a busy week. This is not a normal test.",
  ],
  counter: "None of those are decisions. They are the habit asking for its old conditions back. Hold the arrangement for fourteen days before you change anything, and if an app comes back and the reaching starts again, run the seventy two hours once more. You are not starting over. You are collecting information.",
  together: "If you are doing this with someone, say out loud which sentence you expect to hear from yourself. Naming it in advance makes it much harder to believe later, and it gives the other person something specific to ask about instead of policing you.",
} as const;

/** The line the site's headline came from. */
export const RESET_DECLARATION =
  "I do not trade presence for distraction. My attention belongs to the people I share my life with. My phone is a tool. I am not.";

export const getCoreLesson = (slug: string) => CORE_LESSONS.find((lesson) => lesson.slug === slug);

export const getMovement = (key: MovementKey) => CORE_MOVEMENTS.find((movement) => movement.key === key);
