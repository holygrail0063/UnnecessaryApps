"use client";

import { useEffect, useRef, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";

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

const CONFETTI_COLORS = ["#F9A3A8", "#27B5E8", "#FFC1C5", "#E8BD82", "#FFF8EA"];

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
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]"
      aria-hidden
    >
      {Array.from({ length: 26 }).map((_, i) => (
        <span
          key={i}
          className="confetti-chip absolute h-2.5 w-2.5 rounded-sm opacity-90"
          style={{
            left: `${(i * 29) % 100}%`,
            top: `-10px`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            animationDelay: `${(i % 11) * 40}ms`,
          }}
        />
      ))}
    </div>
  ) : null;

  return (
    <div className="relative overflow-hidden pb-16 pt-2 sm:pb-20 lg:pb-24">
      <AppDetailHero
        title="Advance your career one meaningless click at a time."
        subtitle="Click the button, earn fake promotions, and experience the thrill of professional growth without contributing anything measurable."
        decorations={
          <>
            <span className="absolute left-[4%] top-[8%] font-display text-2xl text-text-main motion-safe-wiggle">
              ★
            </span>
            <span className="absolute right-[8%] top-[18%] text-3xl motion-safe-float">☁</span>
            <svg
              className="absolute bottom-[12%] left-[10%] h-12 w-12 text-blue-main opacity-90 motion-safe-float"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden
            >
              <path
                d="M8 36 Q24 10 40 36"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
        <article
          className={`relative overflow-hidden rounded-[28px] border-[3px] border-ink bg-bg-cream p-8 shadow-cartoon transition sm:p-10 ${
            promoBurst ? "ring-[3px] ring-pink-soft ring-offset-2 ring-offset-bg-main" : ""
          }`}
        >
          {confetti}
          <div className="relative">
            <p className="font-display text-xs font-bold uppercase tracking-wide text-text-muted">
              Current fake title
            </p>
            <p className="font-display mt-3 text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
              {current.title}
            </p>
            <p className="mt-6 font-display text-5xl font-bold tabular-nums tracking-tight text-text-main sm:text-6xl">
              {clicks.toLocaleString("en-US")}
            </p>
            <p className="mt-2 font-display text-xs font-bold uppercase tracking-wide text-text-muted">
              clicks (not KPIs — yet)
            </p>

            <div className="mt-8">
              {nextTier ? (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 font-display text-xs font-bold uppercase tracking-wide text-text-muted">
                    <span>Progress to promotion</span>
                    <span>
                      Next promotion at {nextTier.min.toLocaleString("en-US")} clicks
                    </span>
                  </div>
                  <div className="mt-3 h-4 overflow-hidden rounded-full border-[3px] border-ink bg-bg-main shadow-cartoon-sm">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-main to-blue-main transition-all duration-500"
                      style={{ width: `${Math.round(progressBetweenTiers * 100)}%` }}
                    />
                  </div>
                  <p className="mt-3 font-semibold text-text-muted">
                    Next milestone:{" "}
                    <span className="font-display font-bold text-text-main">{nextTier!.title}</span>
                  </p>
                </div>
              ) : (
                <p className="font-display font-bold text-blue-hover">
                  Prestige unlocked. Humanity slightly concerned.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClickGrowth}
              className="btn-cartoon mt-10 inline-flex min-h-[56px] w-full cursor-pointer flex-col items-center justify-center rounded-full border-[3px] border-ink bg-pink-main px-8 py-4 font-display text-lg font-bold leading-tight text-text-main shadow-cartoon hover:bg-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-auto"
            >
              <span>Click for Career Growth</span>
              <span className="mt-1 block font-display text-[11px] font-bold uppercase tracking-wide text-text-main/85">
                NO OKRS REQUIRED BEYOND VIBES
              </span>
            </button>

            <p className="mt-10 font-display text-xl font-bold text-text-main">
              Estimated Fake Salary:{" "}
              <span className="tabular-nums text-blue-hover">
                $
                {clicks === 0
                  ? "0"
                  : `${formatMoney(salary)} in imaginary compensation`}
              </span>
            </p>
          </div>
        </article>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <CartoonCard variant="cream">
            <div className="flex items-start gap-3">
              <span className="font-display text-2xl" aria-hidden>
                📊
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-text-main">Operational stats</h2>
                <p className="mt-1 text-sm font-semibold text-text-muted">
                  Numbers your leadership deck wishes it had.
                </p>
              </div>
            </div>
            <dl className="mt-6 space-y-3 text-sm font-semibold">
              <div className="flex justify-between gap-3 border-b-[3px] border-dashed border-ink/15 pb-3 text-text-muted">
                <dt>Clicks Per Minute</dt>
                <dd className="tabular-nums font-display font-bold text-text-main">{cpm}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b-[3px] border-dashed border-ink/15 pb-3 text-text-muted">
                <dt>Career Growth Index</dt>
                <dd className="font-display font-bold text-text-main">{cgi}%</dd>
              </div>
              <div className="flex justify-between gap-3 border-b-[3px] border-dashed border-ink/15 pb-3 text-text-muted">
                <dt>Corporate Value Created</dt>
                <dd className="font-display font-bold text-text-main">$0</dd>
              </div>
              <div className="flex justify-between gap-3 border-b-[3px] border-dashed border-ink/15 pb-3 text-text-muted">
                <dt>Button ROI</dt>
                <dd className="font-display font-bold text-text-main">
                  {roiOptions[clicks % roiOptions.length]}
                </dd>
              </div>
              <div className="flex justify-between gap-3 border-b-[3px] border-dashed border-ink/15 pb-3 text-text-muted">
                <dt>Promotion Velocity</dt>
                <dd className="font-display font-bold text-text-main">
                  {promotionVelocityLabel}
                </dd>
              </div>
              <div className="flex justify-between gap-3 text-text-muted">
                <dt>Leadership Potential</dt>
                <dd className="font-display font-bold text-text-main">Somehow increasing</dd>
              </div>
            </dl>
          </CartoonCard>

          <CartoonCard variant="pink">
            <div className="flex items-start gap-3">
              <span className="font-display text-2xl" aria-hidden>
                🏅
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-text-main">Achievement badges</h2>
                <p className="mt-1 text-sm font-semibold text-text-muted">
                  Collect them all. Regret nothing.
                </p>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ACHIEVEMENTS.map((a) => {
                const on = achievementUnlocked(a.id, clicks);
                return (
                  <li key={a.id}>
                    <span
                      className={`inline-flex rounded-full border-[3px] px-3 py-1.5 font-display text-xs font-bold ${
                        on
                          ? "border-ink bg-bg-cream text-text-main shadow-cartoon-sm"
                          : "border-ink/20 bg-bg-main/80 text-text-muted line-through decoration-text-muted/40"
                      }`}
                    >
                      {a.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onResetAsk}
                className="rounded-full border-[3px] border-ink bg-pink-main px-4 py-2 font-display text-xs font-bold text-text-main shadow-cartoon-sm transition hover:bg-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Reset Career
              </button>
              <button
                type="button"
                onClick={onLinkedIn}
                className="rounded-full border-[3px] border-ink bg-blue-main px-4 py-2 font-display text-xs font-bold text-text-main shadow-cartoon-sm transition hover:bg-blue-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Add to LinkedIn
              </button>
              <button
                type="button"
                onClick={() => setCertificateOpen(true)}
                className="rounded-full border-[3px] border-ink bg-tan px-4 py-2 font-display text-xs font-bold text-text-main shadow-cartoon-sm transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Generate Certificate
              </button>
            </div>
            {linkedinNote ? (
              <p
                role="status"
                className="mt-4 rounded-2xl border-[3px] border-ink bg-bg-cream px-4 py-3 font-display text-xs font-bold text-text-main shadow-cartoon-sm"
              >
                {linkedinNote}
              </p>
            ) : null}
          </CartoonCard>
        </section>
      </div>

      {certificateOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-main/55 px-4 py-10">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-heading"
            className="relative w-full max-w-lg rounded-[28px] border-[3px] border-ink bg-bg-cream p-8 shadow-cartoon-hover sm:p-10"
          >
            <button
              type="button"
              aria-label="Close certificate"
              onClick={() => setCertificateOpen(false)}
              className="absolute right-4 top-4 rounded-full border-[3px] border-ink bg-pink-soft px-3 py-1.5 font-display text-xs font-bold text-text-main shadow-cartoon-sm hover:bg-pink-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Close
            </button>
            <p
              id="cert-heading"
              className="text-center font-display text-xl font-bold italic text-text-main md:text-2xl"
            >
              Certificate of Unnecessary Excellence
            </p>
            <div className="mt-8 border-y-[3px] border-dashed border-ink/25 py-6 text-center text-sm font-semibold leading-relaxed text-text-muted">
              <p>This certifies that the bearer has achieved the title:</p>
              <p className="mt-4 font-display text-2xl font-bold tracking-tight text-text-main">
                {current.title}
              </p>
              <p className="mt-6">
                For outstanding contributions to button-based professional development.
              </p>
            </div>
            <p className="mt-6 text-center font-display text-[11px] font-bold tabular-nums text-text-muted">
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
