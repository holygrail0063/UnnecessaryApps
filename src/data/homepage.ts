export type HomepageCategoryId =
  | "all"
  | "productivity"
  | "weird"
  | "chaos"
  | "timewasters";

export type ShowcasePastel =
  | "pink"
  | "mint"
  | "blue"
  | "yellow"
  | "lavender"
  | "peach";

export interface ShowcaseApp {
  id: string;
  title: string;
  description: string;
  tag: string;
  pastel: ShowcasePastel;
  categories: HomepageCategoryId[];
  /** Live app route when clickable */
  href?: string;
}

export const HOMEPAGE_CATEGORIES: {
  id: HomepageCategoryId;
  label: string;
  icon: string;
}[] = [
  { id: "all", label: "All Apps", icon: "✦" },
  { id: "productivity", label: "Productivity-ish", icon: "📎" },
  { id: "weird", label: "Weird Tools", icon: "🌈" },
  { id: "chaos", label: "Daily Chaos", icon: "☂️" },
  { id: "timewasters", label: "Time Wasters", icon: "☁️" },
];

export const SHOWCASE_APPS: ShowcaseApp[] = [
  {
    id: "monday",
    title: "Is It Monday Yet?",
    description:
      "Checks the calendar so you don’t have to. (Spoiler: it’s probably Monday.)",
    tag: "Featured",
    pastel: "pink",
    categories: ["chaos", "timewasters"],
  },
  {
    id: "button-clicker",
    title: "Professional Button Clicker",
    description:
      "Click a button. Feel accomplished. Repeat forever.",
    tag: "Pointless",
    pastel: "mint",
    categories: ["productivity", "timewasters"],
    href: "/professional-button-clicker",
  },
  {
    id: "microwave",
    title: "Microwave Beep Translator",
    description:
      "Finally understand what those beeps actually mean.",
    tag: "Featured",
    pastel: "lavender",
    categories: ["weird", "productivity"],
  },
  {
    id: "excuse",
    title: "Meeting Excuse Generator",
    description:
      "Generate perfect excuses for meetings you don’t want.",
    tag: "Daily Chaos",
    pastel: "blue",
    categories: ["chaos", "productivity"],
  },
  {
    id: "bread-weather",
    title: "Bread Weather",
    description:
      "The forecast, but for bread. Will it be crispy or soggy?",
    tag: "Weird",
    pastel: "yellow",
    categories: ["weird"],
  },
  {
    id: "pixel-museum",
    title: "One Pixel Museum",
    description:
      "A museum dedicated to exactly one pixel. It’s magnificent.",
    tag: "Featured",
    pastel: "peach",
    categories: ["weird", "timewasters"],
  },
];

export interface StatHighlight {
  value: string;
  label: string;
  subtext: string;
  icon: string;
}

export const HOMEPAGE_STATS: StatHighlight[] = [
  {
    value: "42",
    label: "unnecessary apps",
    subtext: "And counting...",
    icon: "🐣",
  },
  {
    value: "100%",
    label: "avoidable",
    subtext: "Use at your own risk.",
    icon: "⚡",
  },
  {
    value: "0",
    label: "real problems solved",
    subtext: "That’s our promise.",
    icon: "🫧",
  },
];

export interface FooterLink {
  label: string;
  href: string;
}

export const FOOTER_EXPLORE_LINKS: FooterLink[] = [
  { label: "All Apps", href: "#featured-apps" },
  { label: "Featured", href: "#featured-apps" },
  { label: "Categories", href: "#category-filter" },
  { label: "Random App", href: "#random-app" },
];

export const FOOTER_COMMUNITY_LINKS: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Submit an Idea", href: "/submit" },
  { label: "Hall of Pointless Fame", href: "/about" },
  { label: "Contact", href: "/submit" },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Terms of Use", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
];
