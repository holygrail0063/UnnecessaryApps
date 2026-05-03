export type ShopCategoryId =
  | "all"
  | "pointless"
  | "games"
  | "fake-productivity"
  | "chaos";

/** Card shell colors for cartoon rotation */
export type CartoonCardBg = "cream" | "softPink" | "salmon" | "blue" | "tan";

export interface ShowcaseApp {
  id: string;
  title: string;
  description: string;
  tag: string;
  cardBg: CartoonCardBg;
  categories: ShopCategoryId[];
  /** Live app route when clickable */
  href?: string;
}

export const SHOP_CATEGORY_TABS: {
  id: ShopCategoryId;
  label: string;
}[] = [
  { id: "all", label: "ALL APPS" },
  { id: "pointless", label: "POINTLESS TOOLS" },
  { id: "games", label: "TINY GAMES" },
  { id: "fake-productivity", label: "FAKE PRODUCTIVITY" },
  { id: "chaos", label: "DAILY CHAOS" },
];

export const SHOWCASE_APPS: ShowcaseApp[] = [
  {
    id: "monday",
    title: "Is It Monday Yet?",
    description:
      "Checks the calendar so you don’t have to. Spoiler: it’s probably Monday.",
    tag: "Featured",
    cardBg: "softPink",
    categories: ["chaos", "games"],
  },
  {
    id: "button-clicker",
    title: "Professional Button Clicker",
    description:
      "Click a button. Feel accomplished. Repeat forever.",
    tag: "Pointless",
    cardBg: "cream",
    categories: ["pointless", "fake-productivity"],
    href: "/professional-button-clicker",
  },
  {
    id: "microwave",
    title: "Microwave Beep Translator",
    description:
      "Finally understand what those beeps actually mean.",
    tag: "Featured",
    cardBg: "blue",
    categories: ["pointless", "fake-productivity"],
  },
  {
    id: "excuse",
    title: "Meeting Excuse Generator",
    description:
      "Generate perfect excuses for meetings you don’t want.",
    tag: "Daily Chaos",
    cardBg: "salmon",
    categories: ["chaos", "fake-productivity"],
  },
  {
    id: "bread-weather",
    title: "Bread Weather",
    description:
      "The forecast, but for bread. Will it be crispy or soggy?",
    tag: "Weird",
    cardBg: "tan",
    categories: ["pointless", "games"],
    href: "/bread-weather",
  },
  {
    id: "pixel-museum",
    title: "One Pixel Museum",
    description:
      "A museum dedicated to exactly one pixel. It’s magnificent.",
    tag: "Featured",
    cardBg: "cream",
    categories: ["games", "pointless"],
    href: "/one-pixel-museum",
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
  { label: "All Apps", href: "/#featured-apps" },
  { label: "Categories", href: "/#category-strip" },
  { label: "Random App", href: "/#random-app" },
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
