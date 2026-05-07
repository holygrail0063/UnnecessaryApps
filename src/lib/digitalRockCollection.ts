export type RockRarity =
  | "Common"
  | "Mildly Interesting"
  | "Rare-ish"
  | "Unnecessarily Shiny"
  | "Emotionally Valuable"
  | "Found Near a Vibe";

const RARITY_RANK: Record<RockRarity, number> = {
  Common: 1,
  "Mildly Interesting": 2,
  "Rare-ish": 3,
  "Unnecessarily Shiny": 4,
  "Emotionally Valuable": 5,
  "Found Near a Vibe": 6,
};

export function rarityTier(r: RockRarity): number {
  return RARITY_RANK[r] ?? 0;
}

export const ROCK_NAMES = [
  "Gregory the Pebble",
  "Sir Crumblesworth",
  "Linda Limestone",
  "Pebblina Jolie",
  "Rocky Balboa Jr.",
  "Dusty McChunk",
  "Marble Mildred",
  "Kevin the Sediment",
  "Emotional Granite",
  "Brenda Boulder",
  "Professor Cobble",
  "Chip Flintstone",
  "Shardonna",
  "Gravel Gary",
  "Obsidian Oprah",
] as const;

export const ROCK_TYPES = [
  "Suspicious Pebble",
  "Office Granite",
  "Budget Marble",
  "Introvert Limestone",
  "Slightly Famous Sandstone",
  "Emotionally Unavailable Basalt",
  "Decorative Regret",
  "Premium Driveway Rock",
] as const;

export const ROCK_RARITIES: RockRarity[] = [
  "Common",
  "Mildly Interesting",
  "Rare-ish",
  "Unnecessarily Shiny",
  "Emotionally Valuable",
  "Found Near a Vibe",
];

export const ROCK_PERSONALITIES = [
  "Judges your decisions silently.",
  "Believes it is the main character.",
  "Has strong opinions about soup.",
  "Refuses to be skipped.",
  "Thinks LinkedIn posts are too dramatic.",
  "Very loyal, but only to shelves.",
  "Secretly writes moody poetry.",
  "Once applied for a museum internship.",
  "Feels smoother than your excuses.",
] as const;

export const ROCK_FACTS = [
  "Once looked at a leaf and felt superior.",
  "Has never paid rent.",
  "Was almost selected for a garden.",
  "Claims to be naturally gluten-free.",
  "Has been sitting professionally for years.",
  "Voted “most likely to be stepped on” in school.",
  "Knows your Wi-Fi password emotionally.",
  "Has never seen the ocean and doesn’t care.",
] as const;

export type CollectedRock = {
  id: string;
  name: string;
  type: string;
  rarity: RockRarity;
  personality: string;
  fact: string;
  collectedAt: string;
  favorite: boolean;
};

const STORAGE = "unnecessaryApps-digital-rocks";

export function randomRock(seed: number): Omit<CollectedRock, "id" | "favorite"> {
  const pick = <T,>(arr: readonly T[], i: number) =>
    arr[Math.abs((seed * 17 + i * 41) % arr.length)]!;
  const s = seed + Date.now();
  return {
    name: pick(ROCK_NAMES, s),
    type: pick(ROCK_TYPES, s + 1),
    rarity: pick(ROCK_RARITIES, s + 2),
    personality: pick(ROCK_PERSONALITIES, s + 3),
    fact: pick(ROCK_FACTS, s + 4),
    collectedAt: new Date().toISOString(),
  };
}

export function loadRocks(): CollectedRock[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE);
    if (!raw) return [];
    const p = JSON.parse(raw) as CollectedRock[];
    return Array.isArray(p) ? p : [];
  } catch {
    return [];
  }
}

export function saveRocks(rocks: CollectedRock[]) {
  try {
    window.localStorage.setItem(STORAGE, JSON.stringify(rocks));
  } catch {
    /* ignore */
  }
}

export function rarestInCollection(rocks: CollectedRock[]): RockRarity | null {
  if (rocks.length === 0) return null;
  let best = rocks[0]!.rarity;
  let tier = rarityTier(best);
  for (const r of rocks) {
    const t = rarityTier(r.rarity);
    if (t > tier) {
      tier = t;
      best = r.rarity;
    }
  }
  return best;
}
