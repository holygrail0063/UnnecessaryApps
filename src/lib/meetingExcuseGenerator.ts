import {
  meetingExcuses,
  type ExcuseContext,
  type MeetingExcuseCategoryKey,
} from "@/data/meetingExcuses";

/** Calendar day key for resetting the daily counter */
export type WorkLocation = "wfh" | "office";

const STORAGE_KEY = "unnecessaryApps-meeting-excuses-daily";

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function matchesContext(ctx: ExcuseContext, loc: WorkLocation): boolean {
  if (ctx === "both") return true;
  return ctx === loc;
}

/** Excuses in a category that fit the selected work location */
export function getAvailableExcuses(
  categoryKey: MeetingExcuseCategoryKey,
  workLocation: WorkLocation,
) {
  const cat = meetingExcuses[categoryKey];
  return cat.excuses.filter((e) => matchesContext(e.context, workLocation));
}

/** Random excuse text; avoids repeating `lastText` when possible */
export function getRandomExcuse(
  categoryKey: MeetingExcuseCategoryKey,
  workLocation: WorkLocation,
  lastText: string | null,
): string {
  const pool = getAvailableExcuses(categoryKey, workLocation);
  if (pool.length === 0) {
    return "No excuses match this combo — try flipping your work location!";
  }
  if (pool.length === 1) return pool[0]!.text;

  let pick = pool[Math.floor(Math.random() * pool.length)]!;
  let guard = 0;
  while (lastText && pick.text === lastText && guard < 24) {
    pick = pool[Math.floor(Math.random() * pool.length)]!;
    guard += 1;
  }
  return pick.text;
}

/** Pick random category key from a list, then random excuse */
export function getRandomExcuseFromCategories(
  keys: MeetingExcuseCategoryKey[],
  workLocation: WorkLocation,
  lastText: string | null,
): { text: string; categoryKey: MeetingExcuseCategoryKey } {
  const key = keys[Math.floor(Math.random() * keys.length)]!;
  const text = getRandomExcuse(key, workLocation, lastText);
  return { text, categoryKey: key };
}

export function generateEmailVersion(excuse: string): string {
  return `Hi, I may not be able to join this meeting live because ${excuse}. I'll catch up from the notes and follow up if anything needs my input.`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Returns updated count for today after increment */
export function incrementDailyCounter(): number {
  if (typeof window === "undefined") return 0;

  const today = todayKey();
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return 1;
  }

  let count = 1;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { date?: string; count?: number };
      if (parsed.date === today && typeof parsed.count === "number") {
        count = parsed.count + 1;
      }
    } catch {
      count = 1;
    }
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: today, count }),
    );
  } catch {
    /* ignore */
  }
  return count;
}

/** Current count for today (no increment) */
export function readDailyCounter(): number {
  if (typeof window === "undefined") return 0;

  const today = todayKey();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { date?: string; count?: number };
    if (parsed.date !== today) return 0;
    return typeof parsed.count === "number" ? parsed.count : 0;
  } catch {
    return 0;
  }
}
