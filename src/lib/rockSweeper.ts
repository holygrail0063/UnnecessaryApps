export type DifficultyId = "casual" | "quarry" | "excavation";

export const DIFFICULTY_CONFIG: Record<
  DifficultyId,
  { label: string; grid: number }
> = {
  casual: { label: "Casual Pebble", grid: 4 },
  quarry: { label: "Suspicious Quarry", grid: 6 },
  excavation: { label: "Emotional Excavation", grid: 8 },
};

export const CLUES = [
  "Warm dirt",
  "Pebble energy nearby",
  "Suspicious crunch",
  "Rock vibes detected",
  "Absolutely nothing",
  "Mild geological tension",
  "Soil with commitment issues",
  "You disturbed nothing important",
  "The dirt seems offended",
  "A rock was emotionally nearby",
  "Mineral disappointment detected",
  "This square had potential",
] as const;

export const ROCK_NAMES = [
  "Kevin the Sediment",
  "Gregory the Pebble",
  "Sir Crumblesworth",
  "Linda Limestone",
  "Pebblina Jolie",
  "Rocky Balboa Jr.",
  "Dusty McChunk",
  "Marble Mildred",
  "Emotional Granite",
  "Brenda Boulder",
  "Professor Pebbleton",
  "Steve the Stone",
  "The Honorable Gravel",
  "Anxiety Quartz",
] as const;

export const RARITIES = [
  "Common",
  "Mildly Interesting",
  "Rare-ish",
  "Unnecessarily Shiny",
  "Emotionally Valuable",
  "Found Near a Vibe",
  "Premium Driveway Grade",
] as const;

export const PERSONALITIES = [
  "Refuses to explain itself.",
  "Judges your decisions silently.",
  "Believes it is the main character.",
  "Has strong opinions about soup.",
  "Very loyal, but only to shelves.",
  "Thinks LinkedIn posts are too dramatic.",
  "Stares into the distance professionally.",
  "Has never emotionally recovered from being skipped.",
] as const;

export const EMOTIONAL_VALUES = [
  "$0.00 emotionally",
  "3 imaginary dollars",
  "One unpaid internship",
  "Half a compliment",
  "Worthless, but with confidence",
  "Market value unclear due to vibes",
] as const;

export type LifetimeStats = {
  dirtDisturbed: number;
  rocksFound: number;
  /** Lowest dig count to find the rock per difficulty */
  bestDigs: Record<DifficultyId, number | null>;
};

export type FoundRockEntry = {
  id: string;
  name: string;
  rarity: string;
  personality: string;
  value: string;
  dateFound: string;
  digsUsed: number;
  difficulty: DifficultyId;
};

const STATS_KEY = "unnecessaryApps-rock-sweeper-stats";
const COLLECTION_KEY = "unnecessaryApps-rock-sweeper-collection";

const DEFAULT_STATS: LifetimeStats = {
  dirtDisturbed: 0,
  rocksFound: 0,
  bestDigs: { casual: null, quarry: null, excavation: null },
};

function hash32(seed: number, idx: number): number {
  let h = seed ^ (idx * 374761393);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return h >>> 0;
}

/** Stable clue per game seed + tile index */
export function clueForTile(gameSeed: number, tileIndex: number): string {
  const h = hash32(gameSeed, tileIndex + 90210);
  return CLUES[h % CLUES.length]!;
}

export function randomRockProfile(seed: number) {
  const pick = <T,>(arr: readonly T[], salt: number) =>
    arr[hash32(seed, salt) % arr.length]!;
  return {
    name: pick(ROCK_NAMES, 1),
    rarity: pick(RARITIES, 2),
    personality: pick(PERSONALITIES, 3),
    value: pick(EMOTIONAL_VALUES, 4),
  };
}

/** Funny confidence label from dig efficiency */
export function geologicalConfidenceLabel(digs: number, totalCells: number): string {
  const ratio = digs / Math.max(totalCells, 1);
  if (ratio <= 0.18) return "Suspiciously confident";
  if (ratio <= 0.38) return "Academically questionable";
  if (ratio <= 0.62) return "Certified dirt toucher";
  return "Geology adjacent";
}

export function loadLifetimeStats(): LifetimeStats {
  if (typeof window === "undefined") return { ...DEFAULT_STATS };
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    const p = JSON.parse(raw) as Partial<LifetimeStats>;
    return {
      dirtDisturbed:
        typeof p.dirtDisturbed === "number" ? p.dirtDisturbed : 0,
      rocksFound: typeof p.rocksFound === "number" ? p.rocksFound : 0,
      bestDigs: {
        casual:
          typeof p.bestDigs?.casual === "number" ? p.bestDigs.casual : null,
        quarry:
          typeof p.bestDigs?.quarry === "number" ? p.bestDigs.quarry : null,
        excavation:
          typeof p.bestDigs?.excavation === "number"
            ? p.bestDigs.excavation
            : null,
      },
    };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export function saveLifetimeStats(s: LifetimeStats) {
  try {
    window.localStorage.setItem(STATS_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function loadFoundRocks(): FoundRockEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(COLLECTION_KEY);
    if (!raw) return [];
    const p = JSON.parse(raw) as FoundRockEntry[];
    return Array.isArray(p) ? p.slice(0, 48) : [];
  } catch {
    return [];
  }
}

export function saveFoundRocks(items: FoundRockEntry[]) {
  try {
    window.localStorage.setItem(COLLECTION_KEY, JSON.stringify(items.slice(0, 48)));
  } catch {
    /* ignore */
  }
}
