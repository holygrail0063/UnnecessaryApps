/** Tone presets for dramatic reinterpretations */

export type OverthinkTone =
  | "mildSpiral"
  | "fullAnxiety"
  | "corporatePassiveAggressive"
  | "romanticDisaster"
  | "groupChatDetective";

export const overthinkToneOptions: {
  id: OverthinkTone;
  label: string;
}[] = [
  { id: "mildSpiral", label: "Mild Spiral" },
  { id: "fullAnxiety", label: "Full Anxiety" },
  { id: "corporatePassiveAggressive", label: "Corporate Passive Aggressive" },
  { id: "romanticDisaster", label: "Romantic Disaster" },
  { id: "groupChatDetective", label: "Group Chat Detective" },
];

const STORAGE_HISTORY = "unnecessaryApps-overthink-history";

export type OverthinkHistoryEntry = {
  id: string;
  at: string;
  message: string;
  tone: OverthinkTone;
  lines: string[];
};

function escapeForQuote(s: string) {
  return s.trim() || "(silence)";
}

/** Deterministic-ish shuffle using seed */
function pick<T>(arr: readonly T[], seed: number, i: number): T {
  const idx = Math.abs((seed * 73 + i * 31) % arr.length);
  return arr[idx]!;
}

export function generateInterpretations(
  rawMessage: string,
  tone: OverthinkTone,
  seed: number,
): string[] {
  const msg = escapeForQuote(rawMessage);
  const out: string[] = [];

  const mild = [
    () =>
      `They said "${msg}" — technically words happened.`,
    () =>
      `"${msg}" reads neutral until you realize neutrality is also a choice.`,
    () =>
      `Could "${msg}" mean everything is fine? Sure. Could it mean the opposite? Also yes.`,
    () =>
      `Short message energy: "${msg}" — like closing a door gently but firmly.`,
    () =>
      `If "${msg}" were a weather forecast, it would be "partly cloudy with judgment."`,
    () =>
      `"${msg}" is giving main-character restraint.`,
    () =>
      `You saw "${msg}" and your brain immediately drafted three alternate timelines.`,
    () =>
      `"${msg}" is doing the bare minimum, loudly.`,
    () =>
      `Not enough punctuation to trust "${msg}" emotionally.`,
    () =>
      `"${msg}" is either chill or a silent scream — you'll workshop it at 2am.`,
  ];

  const anxiety = [
    () =>
      `"${msg}" — one syllable away from either relief or regret.`,
    () =>
      `Why "${msg}" now? Why not yesterday? Why not never?`,
    () =>
      `"${msg}" implies calm but your nervous system filed an objection.`,
    () =>
      `Every pixel of "${msg}" is scanning you back.`,
    () =>
      `"${msg}" is basically a jump scare in lowercase.`,
    () =>
      `What if "${msg}" wasn't meant for you? What if it was worse — meant for everyone?`,
    () =>
      `"${msg}" arrived faster than your coping mechanisms.`,
    () =>
      `Brain note: "${msg}" might be fine. Heart note: absolutely not.`,
    () =>
      `"${msg}" could be innocent. Your spiral disagrees.`,
    () =>
      `If "${msg}" were a sound, it would be an ominous fridge hum.`,
  ];

  const corporate = [
    () =>
      `"${msg}" — we'll circle back after reviewing stakeholder optics.`,
    () =>
      `Acknowledged: "${msg}". Next steps: ambiguous alignment.`,
    () =>
      `"${msg}" reads as constructive feedback hidden inside vibes.`,
    () =>
      `Thanks for "${msg}" — we'll socialize this offline until morale improves.`,
    () =>
      `"${msg}" has been logged as "fine for now" which means forever.`,
    () =>
      `Please advise if "${msg}" requires executive sponsorship.`,
    () =>
      `"${msg}" may trigger a retro unless blocked by bandwidth.`,
    () =>
      `Strong ping with "${msg}" — expecting asynchronous synergy.`,
    () =>
      `"${msg}" has entered the pipeline between sarcasm and agenda.`,
    () =>
      `We'll parallel-path "${msg}" into something nobody wants.`,
  ];

  const romantic = [
    () =>
      `"${msg}" — either chill love or the calm before a poetic storm.`,
    () =>
      `They sent "${msg}" and your heart started drafting vows.`,
    () =>
      `"${msg}" is suspiciously calm for someone who owns your notifications.`,
    () =>
      `Romantically, "${msg}" is either "I'm okay" or "notice me without noticing."`,
    () =>
      `Every "${msg}" is a tiny lighthouse unless it's not.`,
    () =>
      `"${msg}" hits different after you've imagined five futures.`,
    () =>
      `Could "${msg}" be tenderness disguised as punctuation? Absolutely.`,
    () =>
      `"${msg}" is basically holding eye contact via text.`,
    () =>
      `You replay "${msg}" until it becomes a soundtrack.`,
    () =>
      `"${msg}" — soft launch feelings.`,
  ];

  const detective = [
    () =>
      `"${msg}" — screenshot behavior detected.`,
    () =>
      `Context missing after "${msg}". Crowdsourced theories forming.`,
    () =>
      `Someone replied "${msg}" then went inactive for 9 minutes. Suspicious.`,
    () =>
      `"${msg}" reads differently if you zoom into delivery receipts.`,
    () =>
      `Theory A: "${msg}" is fine. Theory B: everyone's pretending.`,
    () =>
      `Group consensus on "${msg}" has achieved confused emoji.`,
    () =>
      `"${msg}" could mean lunch — could mean loyalty.`,
    () =>
      `Forwarded "${msg}" with zero context like a documentary villain.`,
    () =>
      `Pinned "${msg}" mentally next to every cancelled plan.`,
    () =>
      `"${msg}" is Exhibit A in the trial of vibes.`,
  ];

  const sets: Record<OverthinkTone, (() => string)[]> = {
    mildSpiral: mild,
    fullAnxiety: anxiety,
    corporatePassiveAggressive: corporate,
    romanticDisaster: romantic,
    groupChatDetective: detective,
  };

  const templates = sets[tone];
  for (let i = 0; i < 10; i++) {
    const fn = pick(templates, seed, i);
    out.push(fn());
  }

  return out;
}

/** Rough anxiety score 0–100 (length + tone, deterministic) */
export function computeAnxietyMeter(
  messageLength: number,
  tone: OverthinkTone,
): number {
  const len = Math.min(messageLength, 280);
  let score = 22 + len * 0.26;
  const toneBoost: Record<OverthinkTone, number> = {
    mildSpiral: 6,
    fullAnxiety: 32,
    corporatePassiveAggressive: 16,
    romanticDisaster: 20,
    groupChatDetective: 18,
  };
  score += toneBoost[tone];
  return Math.min(100, Math.round(score));
}

export function loadOverthinkHistory(): OverthinkHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_HISTORY);
    if (!raw) return [];
    const p = JSON.parse(raw) as OverthinkHistoryEntry[];
    return Array.isArray(p) ? p.slice(0, 12) : [];
  } catch {
    return [];
  }
}

export function saveOverthinkHistory(entries: OverthinkHistoryEntry[]) {
  try {
    window.localStorage.setItem(STORAGE_HISTORY, JSON.stringify(entries.slice(0, 12)));
  } catch {
    /* ignore */
  }
}
