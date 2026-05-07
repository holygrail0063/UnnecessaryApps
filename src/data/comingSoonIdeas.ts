export interface ComingSoonIdea {
  id: string;
  title: string;
  description: string;
  whyUnnecessary: string;
  emoji: string;
}

export const COMING_SOON_IDEAS: ComingSoonIdea[] = [
  {
    id: "tiny-achievements",
    title: "Tiny Achievement Unlocker",
    description:
      "Gives awards for useless actions like hovering, clicking, or blinking near the screen.",
    whyUnnecessary: "Finally, praise for doing almost nothing.",
    emoji: "🏅",
  },
  {
    id: "suspicious-timer",
    title: "Suspiciously Specific Timer",
    description: "Sets timers like 3 minutes and 17 seconds for no reason.",
    whyUnnecessary: "Normal timers were apparently too useful.",
    emoji: "⏱️",
  },
  {
    id: "cursor-okay",
    title: "Is My Cursor Okay?",
    description: "Checks if your cursor is emotionally stable.",
    whyUnnecessary: "It is literally just a cursor.",
    emoji: "🖱️",
  },
  {
    id: "confetti-cannon",
    title: "Pointless Confetti Cannon",
    description: "Launches confetti for tiny wins like moving your mouse.",
    whyUnnecessary: "Celebration inflation.",
    emoji: "🎉",
  },
];
