import { apps } from "@/data/apps";

export type ShopCategoryId =
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
  /** Second line under description (e.g. spoiler line) */
  secondaryDescription?: string;
  tag: string;
  cardBg: CartoonCardBg;
  categories: ShopCategoryId[];
  /** Live app route when clickable */
  href?: string;
  /** Stronger storefront hover (lift + tiny wobble) */
  storefrontCard?: boolean;
  /** Replaces default “Live mini app” footer line when set */
  footerOverride?: string;
  /** Pill CTA on live cards (e.g. Waste time) instead of default “open the silliness” */
  showcaseCta?: string;
}

export const SHOP_CATEGORY_TABS: {
  id: ShopCategoryId;
  label: string;
}[] = [
  { id: "pointless", label: "POINTLESS TOOLS" },
  { id: "games", label: "TINY GAMES" },
  { id: "fake-productivity", label: "FAKE PRODUCTIVITY" },
  { id: "chaos", label: "DAILY CHAOS" },
];

export const SHOWCASE_APPS: ShowcaseApp[] = [
  {
    id: "monday",
    title: "Is It Monday Yet?",
    description: "Checks the calendar so you don’t have to.",
    secondaryDescription: "Spoiler: it’s probably Monday.",
    tag: "FEATURED",
    cardBg: "salmon",
    categories: ["chaos", "games"],
    href: "/is-it-monday-yet",
    storefrontCard: true,
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
    tag: "FEATURED",
    cardBg: "blue",
    categories: ["pointless", "fake-productivity"],
    href: "/microwave-beep-translator",
    storefrontCard: true,
  },
  {
    id: "bubble-wrap-busting",
    title: "Bubble Wrap Busting",
    description: "Pop endless digital bubbles and feel fake productivity.",
    tag: "POINTLESS",
    cardBg: "softPink",
    categories: ["pointless", "games"],
    href: "/bubble-wrap-busting",
    storefrontCard: true,
    footerOverride: "Freshly inflated in our silly kitchen.",
  },
  {
    id: "excuse",
    title: "Meeting Excuse Generator",
    description:
      "Generate perfect excuses for meetings you don’t want.",
    tag: "Daily Chaos",
    cardBg: "salmon",
    categories: ["chaos", "fake-productivity"],
    href: "/meeting-excuse-generator",
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
  {
    id: "trust-issues",
    title: "Button With Trust Issues",
    description: "A button that runs away when you try to click it.",
    secondaryDescription: "Dude, pointless, and somehow personal.",
    tag: "CHAOS",
    cardBg: "blue",
    categories: ["chaos", "pointless"],
    href: "/button-with-trust-issues",
    showcaseCta: "Waste time",
  },
  {
    id: "professional-overthinker",
    title: "Professional Overthinker",
    description: "Generates 10 dramatic interpretations of a simple message.",
    secondaryDescription: "Anxiety did not need automation.",
    tag: "OVERKILL",
    cardBg: "softPink",
    categories: ["chaos", "pointless"],
    href: "/professional-overthinker",
    showcaseCta: "OVERTHINK THIS",
  },
  {
    id: "rock-sweeper",
    title: "Rock Sweeper",
    description:
      "Dig through suspicious dirt tiles to find one emotionally average rock.",
    secondaryDescription: "Archaeology did not need a downgrade.",
    tag: "DIG",
    cardBg: "tan",
    categories: ["games", "pointless"],
    href: "/rock-sweeper",
    showcaseCta: "START DIGGING",
  },
  {
    id: "microwave-countdown-drama",
    title: "Microwave Countdown Drama",
    description: "Turns a short timer into a cinematic countdown event.",
    secondaryDescription: "Your leftovers do not need suspense.",
    tag: "DRAMA",
    cardBg: "salmon",
    categories: ["chaos", "fake-productivity"],
    href: "/microwave-countdown-drama",
    showcaseCta: "START DRAMA",
  },
  {
    id: "fake-loading-simulator",
    title: "Fake Loading Screen Simulator",
    description:
      "Shows a dramatic loading bar that never really finishes.",
    secondaryDescription: "Emotional damage as a service.",
    tag: "FAKE IT",
    cardBg: "cream",
    categories: ["fake-productivity", "chaos"],
    href: "/fake-loading-screen-generator",
    showcaseCta: "Waste time",
  },
];

export interface StatHighlight {
  value: string;
  label: string;
  subtext: string;
  icon: string;
}

const LIVE_APP_COUNT = apps.filter((app) => app.status === "live").length;

export const HOMEPAGE_STATS: StatHighlight[] = [
  {
    value: String(LIVE_APP_COUNT),
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
  { label: "Categories", href: "/#featured-apps" },
  { label: "Random App", href: "/#random-app" },
];

export const FOOTER_COMMUNITY_LINKS: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Submit an Idea", href: "/submit" },
  { label: "Hall of Pointless Fame", href: "/hall-of-pointless-fame" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];
