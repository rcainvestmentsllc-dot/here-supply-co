export type MomentKey = "attention" | "arrival" | "pressure" | "distance";

// These are the live delivery paths in Skool. Keeping them in one place avoids
// a sales page that promises a checkout that does not actually exist.
export const SKOOL = {
  group: "https://www.skool.com/the-iron-compass-6783",
  sundayBoard: "https://www.skool.com/the-iron-compass-6783/classroom/702bd08d?md=3cd04153bebd486681c565948b0f88ae",
  focus: "https://www.skool.com/the-iron-compass-6783/classroom/ef426510",
  core: "https://www.skool.com/the-iron-compass-6783/classroom/8bb9f923",
} as const;

export const MOMENTS: Record<MomentKey, { number: string; title: string; detail: string; label: string; action: string; note: string; nextLabel: string; nextHref: string }> = {
  attention: { number: "01", title: "My attention keeps leaving the room.", detail: "Phone, work, and noise are getting more of me than the people I love.", label: "The Focus Protocol", action: "For the next twenty minutes, put your phone on charge outside the room. Let someone else choose the topic.", note: "If you reach for it, simply return. No self-lecture needed.", nextLabel: "Go deeper with Focus Protocol · $29", nextHref: "/library#focus" },
  arrival: { number: "02", title: "I come home, but I do not really arrive.", detail: "The day follows me through the door and sets the tone.", label: "The Airlock", action: "Before you open the door, take three slow breaths. Decide who you will greet first and the first question you will ask.", note: "Do not unload the whole day in the doorway.", nextLabel: "See the complete Core system · $249", nextHref: "/library#core" },
  pressure: { number: "03", title: "Pressure is changing how I react.", detail: "I am sharper, quieter, or more distant than I want to be.", label: "The Emotional Thermostat", action: "Name your temperature: low, rising, or hot. If it is hot, take ten minutes and say exactly when you will come back.", note: "A named pause is not disappearing. It is taking responsibility for the moment.", nextLabel: "See the complete Core system · $249", nextHref: "/library#core" },
  distance: { number: "04", title: "I am carrying too much by myself.", detail: "I need a real connection, not another thing to manage.", label: "The Third Place", action: "Text one man you respect: “I have been carrying too much alone. Want to take a walk or grab coffee this week?”", note: "Choose one person. Keep it simple. Actually send it.", nextLabel: "See the complete Core system · $249", nextHref: "/library#core" },
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
