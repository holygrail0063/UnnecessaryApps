export type BuzzwordIntensity = "mild" | "peak" | "executive";

const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function clean(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

const mildBodies = [
  (s: string) =>
    `We should revisit sequencing around "${s}" so timelines stay humane and outcomes stay plausible.`,
  (s: string) =>
    `Let me adjust expectations: "${s}" needs a tighter follow-up rhythm without turning it into theater.`,
  (s: string) =>
    `"${s}" is fair—I'll carve bandwidth and make sure stakeholders hear a clean status narrative.`,
  (s: string) =>
    `I'll park "${s}" in the right lane ${pick(["today", "this week"])} so we don't thrash midway.`,
];

const peakBodies = [
  (s: string) =>
    `We’ll realign timelines around "${s}" to uphold quality signals across stakeholder expectations.`,
  (s: string) =>
    `"${s}" deserves a calibrated narrative—we’ll socialize it thoughtfully and protect delivery optics.`,
  (s: string) =>
    `I’ll operationalize accountability on "${s}" so downstream teams inherit minimal ambiguity.`,
  (s: string) =>
    `Let’s tighten the stakeholder surface area on "${s}" while sequencing work against priority lanes.`,
  (s: string) =>
    `We owe cross-functional coherence on "${s}"—I'll drive visibility without turning it into churn.`,
];

const executiveBodies = [
  (s: string) =>
    `We must recalibrate the execution horizon for "${s}" to preserve enterprise-grade delivery integrity across the stakeholder matrix while insulating narrative risk.`,
  (s: string) =>
    `Leadership visibility on "${s}" should converge under a fortified governance posture so value realization stays premium and conversational entropy stays bounded.`,
  (s: string) =>
    `"${s}" requires us to reconcile directional clarity with roadmap gravity—I'll cascade intent while protecting systemic coherence at the governance layer.`,
  (s: string) =>
    `We shall harmonize stakeholder signals pertaining to "${s}" and pressure-test timelines against outcomes that sound important on a slide.`,
];

const mildPrefixes = [
  "",
  "To be transparent",
  "At a high level",
  "Setting context:",
  "Quick alignment:",
];

const peakPrefixes = [
  "",
  "Circling back",
  "Flagging early",
  "For visibility",
  "To drive clarity",
];

const execPrefixes = [
  "",
  "Executive note:",
  "At the portfolio level:",
  "Governance lens:",
];

const suffixMild = [
  "",
  " I'll keep notes tight.",
  " Appreciate the patience.",
  " Let's keep momentum calm.",
];

const suffixPeak = [
  "",
  " Happy to socialize more if useful.",
  " Will keep comms appropriately premium.",
  " Tracking as a narrative thread.",
];

const suffixExec = [
  "",
  " Further calibration may occur indefinitely.",
  " Additional alignment rituals may spontaneously emerge.",
  " Slide-friendly language intentionally preserved.",
];

function wrap(
  intensity: BuzzwordIntensity,
  bodyFn: (s: string) => string,
  raw: string,
) {
  const s = clean(raw.replace(/\.$/, ""));
  let out = bodyFn(s);
  if (intensity === "mild") {
    const p = pick(mildPrefixes);
    if (p) out = `${p}, ${out.charAt(0).toLowerCase()}${out.slice(1)}`;
    out += pick(suffixMild);
  } else if (intensity === "peak") {
    const p = pick(peakPrefixes);
    if (p) out = `${p} — ${out}`;
    out += pick(suffixPeak);
  } else {
    const p = pick(execPrefixes);
    if (p) out = `${p} ${out}`;
    out += pick(suffixExec);
  }
  return clean(out.replace(/\s{2,}/g, " ").replace(/\.\./g, "."));
}

/** Deterministic-ish alternate by incrementing shuffle id */
export function synthesizeBuzzword(
  plain: string,
  intensity: BuzzwordIntensity,
  shuffle: number,
): string {
  const base = clean(plain);
  if (!base) return "";

  if (intensity === "mild") {
    const pool = [...mildBodies];
    const bodyFn = pool[shuffle % pool.length]!;
    return wrap("mild", bodyFn, base);
  }

  if (intensity === "peak") {
    const pool = [...peakBodies];
    const bodyFn = pool[(shuffle + 2) % pool.length]!;
    return wrap("peak", bodyFn, base);
  }

  const pool = [...executiveBodies];
  const primaryFn = pool[(shuffle + 5) % pool.length]!;
  let result = wrap("executive", primaryFn, base);
  if ((shuffle >> 1) % 3 !== 1) {
    const extraFn = pool[(shuffle + 7) % pool.length]!;
    result += ` ${extraFn(clean(base.replace(/\.$/, "")))}`;
    if ((shuffle >> 2) % 2 === 0) {
      result += ` ${pick(peakBodies)(clean(base.replace(/\.$/, "")))}`;
    }
  }
  return clean(result.replace(/\s+/g, " "));
}

export type TranslationMeta = {
  buzzwordDensity: number;
  clarityLost: "Low" | "Moderate" | "Severe" | "Catastrophic";
  meetingsCreated: number;
  meaningPreserved: "Barely" | "Technically" | "Questionable";
};

export function makeTranslationMeta(
  intensity: BuzzwordIntensity,
): TranslationMeta {
  const densityFloor =
    intensity === "mild" ? 65 : intensity === "peak" ? 78 : 87;
  return {
    buzzwordDensity: randomInt(densityFloor, 99),
    clarityLost: pick(
      intensity === "mild"
        ? (["Low", "Moderate", "Moderate", "Moderate"] as const)
        : intensity === "peak"
          ? (["Moderate", "Severe", "Moderate", "Moderate"] as const)
          : (["Severe", "Catastrophic", "Severe", "Moderate"] as const),
    ),
    meetingsCreated: randomInt(1, 7),
    meaningPreserved: pick(["Barely", "Technically", "Questionable"]),
  };
}
