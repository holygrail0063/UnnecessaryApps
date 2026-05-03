export type AppStatus = "live" | "coming-soon";

export interface App {
  id: string;
  name: string;
  shortDescription: string;
  status: AppStatus;
  /** Present when status is live */
  route?: `/${string}`;
  /** Featured section order (1–3). Only the three live flagship apps. */
  featuredOrder?: 1 | 2 | 3;
  /** Longer copy for featured cards */
  featuredDescription?: string;
  /** Example line or block for featured cards */
  featuredExample?: string;
  /** Optional extra pill on gallery cards */
  accentBadge?: string;
}

/** Routes that exist today — used for “random app” navigation. */
export const LIVE_APP_ROUTES = [
  "/meeting-buzzword-translator",
  "/professional-button-clicker",
  "/fake-loading-screen-generator",
  "/bread-weather",
  "/one-pixel-museum",
  "/is-it-monday-yet",
  "/microwave-beep-translator",
] as const;

export const apps: App[] = [
  {
    id: "is-it-monday",
    name: "Is It Monday Yet?",
    shortDescription:
      "Checks the calendar so you don’t have to. Spoiler: it’s probably Monday.",
    status: "live",
    route: "/is-it-monday-yet",
    accentBadge: "Probably Useless",
  },
  {
    id: "professional-button-clicker",
    name: "Professional Button Clicker",
    shortDescription: "Counts clicks and rewards fake job titles.",
    status: "live",
    route: "/professional-button-clicker",
    featuredOrder: 2,
    featuredDescription:
      "Click a button. Earn completely fake professional titles.",
    featuredExample:
      "Junior Click Analyst · Senior Button Associate · Director of Click Operations · Chief Button Officer",
  },
  {
    id: "fake-loading-screen",
    name: "Fake Loading Screen Generator",
    shortDescription: "Creates a loading screen that never really finishes.",
    status: "live",
    route: "/fake-loading-screen-generator",
    featuredOrder: 3,
    featuredDescription:
      "Experience the thrill of watching progress bars pretend to work.",
    featuredExample:
      "Optimizing unnecessary dependencies… · Calibrating pointless systems… · Almost there… probably…",
  },
  {
    id: "refresh-email",
    name: "Should I Refresh My Email?",
    shortDescription: 'Says “not yet” every time.',
    status: "coming-soon",
  },
  {
    id: "random-apology",
    name: "Random Apology Generator",
    shortDescription: "Generates overly formal apologies for tiny mistakes.",
    status: "coming-soon",
    accentBadge: "Dangerously Unnecessary",
  },
  {
    id: "cursor-pet-rock",
    name: "Cursor Pet Rock",
    shortDescription: "A rock follows your cursor and silently judges you.",
    status: "coming-soon",
  },
  {
    id: "productivity-destroyer",
    name: "The Productivity Destroyer",
    shortDescription: "Gives you pointless tasks every 30 seconds.",
    status: "coming-soon",
  },
  {
    id: "meeting-buzzword",
    name: "Meeting Buzzword Translator",
    shortDescription: "Converts simple sentences into corporate jargon.",
    status: "live",
    route: "/meeting-buzzword-translator",
    featuredOrder: 1,
    featuredDescription:
      "Turn plain English into glorious corporate nonsense.",
    featuredExample:
      "“Let’s talk tomorrow” becomes “Let’s align asynchronously on next-step synergies.”",
  },
  {
    id: "excuse-generator",
    name: "Excuse Generator 3000",
    shortDescription: "Creates ridiculous excuses for being late.",
    status: "coming-soon",
  },
  {
    id: "hungry-or-bored",
    name: "Am I Hungry or Just Bored?",
    shortDescription:
      "Asks a few questions and then tells you that you are probably bored.",
    status: "coming-soon",
  },
  {
    id: "bubble-wrap",
    name: "Virtual Bubble Wrap",
    shortDescription: "Lets users pop endless bubble wrap.",
    status: "coming-soon",
  },
  {
    id: "unread-simulator",
    name: "Unread Notification Simulator",
    shortDescription: "Shows fake red badges for no useful reason.",
    status: "coming-soon",
  },
  {
    id: "overthinking-machine",
    name: "The Overthinking Machine",
    shortDescription: "Takes a simple thought and makes it dramatically worse.",
    status: "coming-soon",
  },
  {
    id: "microwave-beep-translator",
    name: "Microwave Beep Translator",
    shortDescription: "Finally understand what those beeps actually mean.",
    status: "live",
    route: "/microwave-beep-translator",
  },
  {
    id: "bread-weather",
    name: "Bread Weather",
    shortDescription: "The forecast, but for bread. Crispy, soggy, or philosophical.",
    status: "live",
    route: "/bread-weather",
  },
  {
    id: "one-pixel-museum",
    name: "One Pixel Museum",
    shortDescription: "A dramatic exhibit for a single pixel. Shush while viewing.",
    status: "live",
    route: "/one-pixel-museum",
  },
  {
    id: "tea-coffee-oracle",
    name: "Tea/Coffee Decision Oracle",
    shortDescription: "Decides between tea and coffee using fake science.",
    status: "coming-soon",
  },
  {
    id: "main-character-mode",
    name: "Instant Main Character Mode",
    shortDescription: "Makes ordinary life sound cinematic and dramatic.",
    status: "coming-soon",
    accentBadge: "Probably Useless",
  },
];

export function getFeaturedApps(): App[] {
  return apps
    .filter((a): a is App & { featuredOrder: 1 | 2 | 3 } => a.featuredOrder != null)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function pickRandomLiveRoute(): (typeof LIVE_APP_ROUTES)[number] {
  const i = Math.floor(Math.random() * LIVE_APP_ROUTES.length);
  return LIVE_APP_ROUTES[i];
}
