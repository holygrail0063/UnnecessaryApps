"use client";

import { useEffect, useRef, useState } from "react";

const CAREER_THRESHOLDS = [
  { min: 0, title: "Unpaid Click Intern" },
  { min: 5, title: "Junior Click Analyst" },
  { min: 15, title: "Button Operations Associate" },
  { min: 30, title: "Senior Click Strategist" },
  { min: 50, title: "Manager of Click Enablement" },
  { min: 100, title: "Director of Click Operations" },
  { min: 200, title: "VP of Button Transformation" },
  { min: 500, title: "Chief Clicking Officer" },
  { min: 1000, title: "Global Head of Unnecessary Engagement" },
] as const;

type CareerTier = (typeof CAREER_THRESHOLDS)[number];

const ACHIEVEMENTS = [
  { id: "first", label: "First Click" },
  { id: "committed", label: "Mildly Committed" },
  { id: "job", label: "This Is Your Job Now" },
  { id: "director", label: "Director Energy" },
  { id: "stop", label: "Please Stop Clicking" },
] as const;

function tierFor(clicks: number): CareerTier {
  let current: CareerTier = CAREER_THRESHOLDS[0]!;
  for (const t of CAREER_THRESHOLDS) {
    if (clicks >= t.min) current = t;
    else break;
  }
  return current;
}

function nextTierThreshold(clicks: number): CareerTier | null {
  const idx = CAREER_THRESHOLDS.findIndex((t) => t.min > clicks);
  if (idx === -1) return null;
  return CAREER_THRESHOLDS[idx]!;
}

function achievementUnlocked(
  id: (typeof ACHIEVEMENTS)[number]["id"],
  clicks: number,
) {
  switch (id) {
    case "first":
      return clicks >= 1;
    case "committed":
      return clicks >= 25;
    case "job":
      return clicks >= 120;
    case "director":
      return clicks >= 100;
    case "stop":
      return clicks >= 500;
    default:
      return false;
  }
}

function fakeSalary(clicks: number) {
  if (clicks === 0) return 0;
  const jitter = ((clicks * 73 + 891) % 9000) - 4500;
  const base = 87000 + clicks * 180 + jitter;
  return Math.max(base, clicks * 9);
}

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function ProfessionalButtonClicker() {
  const [clicks, setClicks] = useState(0);
  const [timestamps, setTimestamps] = useState<number[]>([]);
  const [linkedinNote, setLinkedinNote] = useState("");
  const [certificateOpen, setCertificateOpen] = useState(false);
  const prevTitleRef = useRef<string>(tierFor(0).title);
  const [promoBurst, setPromoBurst] = useState(false);

  const current = tierFor(clicks);
  const nextTier = nextTierThreshold(clicks);
  const denominator = nextTier ? nextTier.min - current.min : 1;
  const progressBetweenTiers = Math.min(
    1,
    Math.max(
      0,
      denominator > 0 ? (clicks - current.min) / denominator : nextTier === null ? 1 : 0,
    ),
  );

  const salary = fakeSalary(clicks);

  useEffect(() => {
    if (clicks === 0) {
      prevTitleRef.current = CAREER_THRESHOLDS[0]!.title;
      return undefined;
    }
    const prev = prevTitleRef.current;
    const latest = tierFor(clicks).title;
    if (latest !== prev) {
      prevTitleRef.current = latest;
      setPromoBurst(true);
      const timer = window.setTimeout(() => setPromoBurst(false), 1100);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [clicks]);

  const recordStamp = () => {
    const now = Date.now();
    setTimestamps((ts) => [...ts.slice(-420), now]);
  };

  const onClickGrowth = () => {
    recordStamp();
    setClicks((n) => n + 1);
  };

  const onResetAsk = () => {
    const ok = window.confirm(
      "Reset your fake career back to unpaid intern vibes? Progress is imaginary, but the emotional damage still feels oddly real.",
    );
    if (ok) {
      setClicks(0);
      setTimestamps([]);
      prevTitleRef.current = tierFor(0).title;
    }
  };

  const nowTs = timestamps.length ? timestamps[timestamps.length - 1]! : 0;
  const recent = timestamps.filter((t) => nowTs && nowTs - t <= 60000).length;

  const cpm = clicks === 0 ? 0 : recent;
  const cgi =
    clicks === 0
      ? 0
      : Math.round(
          clicks * (1 + Math.cos(clicks / 40)) * ((timestamps.length % 7) + 3),
        ) % 100;
  const promotionVelocityLabel =
    nextTier === null
      ? "Maxed out"
      : nextTier!.min - clicks <= 12
        ? "Surprisingly alarming"
        : nextTier!.min - clicks <= 50
          ? "Professional"
          : "Mediocre";

  const roiOptions = ["Questionable", "Arguably negative", "Undefined", "Elevated"];

  const onLinkedIn = () => {
    setLinkedinNote("Please do not actually add this to LinkedIn.");
    window.setTimeout(() => setLinkedinNote(""), 3200);
  };

  const confetti = promoBurst ? (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      aria-hidden
    >
      {Array.from({ length: 26 }).map((_, i) => (
        <span
          key={i}
          className="confetti-chip absolute h-2 w-2 rounded-sm opacity-75"
          style={{
            left: `${(i * 29) % 100}%`,
            top: `-10px`,
            background:
              i % 3 === 0
                ? "linear-gradient(to right, #8b5cf6, #22d3ee)"
                : "#fbbf24",
            animationDelay: `${(i % 11) * 40}ms`,
          }}
        />
      ))}
    </div>
  ) : null;

  return (
    <div className="relative overflow-hidden border-b border-zinc-200/60 bg-[#FAFAF8] py-12 sm:py-16 lg:py-20">

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Advance your career one meaningless click at a time.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
          Click the button, earn fake promotions, and experience the thrill of professional
          growth without contributing anything measurable.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
        <article
          className={`relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-xl shadow-zinc-900/[0.07] transition hover:-translate-y-0.5 hover:shadow-2xl ${
            promoBurst ? "ring-2 ring-violet-200" : ""
          }`}
        >
          {confetti}
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Current fake title
            </p>
            <p className="mt-2 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent transition sm:text-4xl">
              {current.title}
            </p>
            <p className="mt-6 font-mono text-5xl font-semibold tracking-tight text-zinc-900 tabular-nums sm:text-6xl">
              {clicks.toLocaleString("en-US")}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
              clicks (not KPIs — yet)
            </p>

            <div className="mt-6">
              {nextTier ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-600">
                    <span>Progress to promotion</span>
                    <span>
                      Next promotion at {nextTier.min.toLocaleString("en-US")} clicks
                    </span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-inner transition-all duration-500"
                      style={{ width: `${Math.round(progressBetweenTiers * 100)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">
                    Next milestone:{" "}
                    <span className="font-semibold text-zinc-700">{nextTier!.title}</span>
                  </p>
                </div>
              ) : (
                <p className="text-sm font-semibold text-emerald-700">
                  Prestige unlocked. Humanity slightly concerned.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClickGrowth}
              className="mt-8 inline-flex min-h-[56px] min-w-[200px] w-full cursor-pointer flex-col justify-center rounded-2xl bg-zinc-900 px-8 py-4 text-lg font-semibold leading-tight text-white shadow-xl shadow-zinc-900/20 transition hover:-translate-y-0.5 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:translate-y-0 sm:inline-flex sm:w-auto"
            >
              <span>Click for Career Growth</span>
              <span className="mt-1 block text-[11px] font-normal uppercase tracking-wide text-white/65">
                No OKRs required beyond vibes
              </span>
            </button>

            <p className="mt-8 text-lg font-semibold text-zinc-800">
              Estimated Fake Salary:{" "}
              <span className="tabular-nums text-violet-700">
                $
                {clicks === 0
                  ? "0"
                  : `${formatMoney(salary)} in imaginary compensation`}
              </span>
            </p>
          </div>
        </article>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="text-lg font-semibold text-zinc-900">Operational stats</h2>
            <dl className="mt-5 space-y-3 text-sm text-zinc-600">
              <div className="flex justify-between gap-3 border-b border-dashed border-zinc-100 pb-2">
                <dt>Clicks Per Minute</dt>
                <dd className="font-semibold tabular-nums text-zinc-900">{cpm}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-dashed border-zinc-100 pb-2">
                <dt>Career Growth Index</dt>
                <dd className="font-semibold text-zinc-900">{cgi}%</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-dashed border-zinc-100 pb-2">
                <dt>Corporate Value Created</dt>
                <dd className="font-semibold text-zinc-900">$0</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-dashed border-zinc-100 pb-2">
                <dt>Button ROI</dt>
                <dd className="font-semibold text-zinc-900">
                  {roiOptions[clicks % roiOptions.length]}
                </dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-dashed border-zinc-100 pb-2">
                <dt>Promotion Velocity</dt>
                <dd className="font-semibold text-zinc-900">
                  {promotionVelocityLabel}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Leadership Potential</dt>
                <dd className="font-semibold text-zinc-900">Somehow increasing</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="text-lg font-semibold text-zinc-900">Achievement badges</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {ACHIEVEMENTS.map((a) => {
                const on = achievementUnlocked(a.id, clicks);
                return (
                  <li key={a.id}>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                        on
                          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                          : "cursor-default border-zinc-200 bg-zinc-50 text-zinc-400 line-through decoration-zinc-300"
                      }`}
                    >
                      {a.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onResetAsk}
                className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold text-red-800 transition hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              >
                Reset Career
              </button>
              <button
                type="button"
                onClick={onLinkedIn}
                className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-900 transition hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              >
                Add to LinkedIn
              </button>
              <button
                type="button"
                onClick={() => setCertificateOpen(true)}
                className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-900 transition hover:bg-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              >
                Generate Certificate
              </button>
            </div>
            {linkedinNote ? (
              <p role="status" className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900 ring-1 ring-amber-200">
                {linkedinNote}
              </p>
            ) : null}
          </div>
        </section>
      </div>

      {certificateOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 px-4 py-10 backdrop-blur-[2px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`cert-heading`}
            className="relative w-full max-w-lg rounded-2xl border border-amber-200 bg-gradient-to-b from-[#fefce8] to-white p-8 shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close certificate"
              onClick={() => setCertificateOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-zinc-200 bg-white px-2 py-1 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              Close
            </button>
            <p id="cert-heading" className="text-center font-serif text-xl font-semibold italic text-zinc-900 md:text-2xl">
              Certificate of Unnecessary Excellence
            </p>
            <div className="mt-8 border-y border-double border-zinc-200 py-6 text-center text-sm leading-relaxed text-zinc-700">
              <p>This certifies that the bearer has achieved the title:</p>
              <p className="mt-4 text-xl font-semibold tracking-tight text-zinc-900">
                {current.title}
              </p>
              <p className="mt-6 text-zinc-600">
                For outstanding contributions to button-based professional development.
              </p>
            </div>
            <p className="mt-6 text-center font-mono text-[11px] text-zinc-400">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
