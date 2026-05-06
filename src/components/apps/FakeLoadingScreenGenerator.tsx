"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";

const STATUS_LINES = [
  "Convincing pixels to cooperate...",
  "Downloading more patience...",
  "Asking the server nicely...",
  "Reticulating unnecessary splines...",
  "Almost there. Emotionally, not technically.",
  "Negotiating with the progress bar...",
  "Preparing to prepare...",
] as const;

const SETBACK_LINES = [
  "Oops, the vibes changed.",
  "Progress got shy.",
  "A tiny bug filed a complaint.",
] as const;

type DramaLevel = "mild" | "annoying" | "corporate";

const DRAMA_PRESETS: Record<
  DramaLevel,
  { label: string; tickMs: number; setbackChance: number; msgEveryMs: number; step: number }
> = {
  mild: {
    label: "Mild",
    tickMs: 720,
    setbackChance: 0.065,
    msgEveryMs: 3600,
    step: 1.8,
  },
  annoying: {
    label: "Annoying",
    tickMs: 480,
    setbackChance: 0.13,
    msgEveryMs: 2400,
    step: 3.1,
  },
  corporate: {
    label: "Corporate Software",
    tickMs: 310,
    setbackChance: 0.2,
    msgEveryMs: 1650,
    step: 4.6,
  },
};

function randomEta(): string {
  const m = Math.floor(Math.random() * 8) + 1;
  const s = Math.floor(Math.random() * 59);
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

export function FakeLoadingScreenGenerator() {
  const dramaGroupId = useId();
  const [drama, setDrama] = useState<DramaLevel>("annoying");
  const [running, setRunning] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [setbackMsg, setSetbackMsg] = useState<string | null>(null);
  const [eta, setEta] = useState("—");
  const capRef = useRef(98);
  const tickRef = useRef<number | null>(null);
  const msgTickRef = useRef<number | null>(null);
  const etaRef = useRef<number | null>(null);

  const displayPct = Math.min(99, Math.floor(progress));

  const p = DRAMA_PRESETS[drama];

  const clearTimers = useCallback(() => {
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (msgTickRef.current) window.clearInterval(msgTickRef.current);
    if (etaRef.current) window.clearInterval(etaRef.current);
    tickRef.current = null;
    msgTickRef.current = null;
    etaRef.current = null;
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const startLoading = () => {
    clearTimers();
    setGaveUp(false);
    setProgress(0);
    setLineIdx(Math.floor(Math.random() * STATUS_LINES.length));
    setSetbackMsg(null);
    setEta(randomEta());
    capRef.current = 97 + Math.floor(Math.random() * 3);
    setRunning(true);
  };

  const reset = () => {
    clearTimers();
    setRunning(false);
    setGaveUp(false);
    setProgress(0);
    setSetbackMsg(null);
    setEta("—");
  };

  const giveUp = () => {
    clearTimers();
    setRunning(false);
    setGaveUp(true);
    setSetbackMsg(null);
  };

  useEffect(() => {
    if (!running || gaveUp) return undefined;

    tickRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const cap = capRef.current;
        if (prev >= cap - 0.01) return cap;

        const cfg = DRAMA_PRESETS[drama];
        if (Math.random() < cfg.setbackChance) {
          const drop = 1.5 + Math.random() * 6;
          setSetbackMsg(SETBACK_LINES[Math.floor(Math.random() * SETBACK_LINES.length)]!);
          window.setTimeout(() => setSetbackMsg(null), 2200);
          return Math.max(0, prev - drop);
        }

        const jitter = Math.random() * cfg.step;
        let next = prev + jitter * (0.65 + Math.random() * 0.45);
        if (next > cap) next = cap;
        if (next > cap - 0.35 && Math.random() < 0.5) {
          next = cap - 0.15 - Math.random() * 0.5;
        }
        return next;
      });
    }, p.tickMs);

    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [running, gaveUp, drama, p.tickMs]);

  useEffect(() => {
    if (!running || gaveUp) return undefined;
    const cfg = DRAMA_PRESETS[drama];
    msgTickRef.current = window.setInterval(() => {
      setLineIdx((i) => (i + 1) % STATUS_LINES.length);
    }, cfg.msgEveryMs);
    return () => {
      if (msgTickRef.current) window.clearInterval(msgTickRef.current);
    };
  }, [running, gaveUp, drama]);

  useEffect(() => {
    if (!running || gaveUp) return undefined;
    etaRef.current = window.setInterval(() => setEta(randomEta()), 2100);
    return () => {
      if (etaRef.current) window.clearInterval(etaRef.current);
    };
  }, [running, gaveUp]);

  const statusLine = useMemo(
    () => STATUS_LINES[lineIdx % STATUS_LINES.length]!,
    [lineIdx],
  );

  return (
    <div className="relative pb-20 pt-2 sm:pb-24">
      <AppDetailHero
        title="Fake Loading Screen Simulator"
        subtitle="A loading bar with no ambition to complete."
        decorations={
          <>
            <span className="absolute right-[5%] top-[6%] text-3xl motion-safe-wiggle">⏳</span>
            <span className="absolute left-[8%] top-[20%] text-2xl motion-safe-float">📊</span>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <CartoonCard variant="cream" hoverLift={false}>
          <p
            id={`${dramaGroupId}-label`}
            className="font-display text-center text-sm font-bold uppercase tracking-wide text-text-muted"
          >
            Drama level
          </p>
          <div
            className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center"
            role="radiogroup"
            aria-labelledby={`${dramaGroupId}-label`}
          >
            {(Object.keys(DRAMA_PRESETS) as DramaLevel[]).map((key) => {
              const on = drama === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  disabled={running}
                  onClick={() => setDrama(key)}
                  className={`meeting-btn-bounce rounded-full border-[3px] border-ink px-5 py-2.5 font-display text-sm font-bold shadow-cartoon-sm transition disabled:opacity-50 ${
                    on
                      ? "bg-blue-main text-text-main"
                      : "bg-bg-main text-text-main hover:bg-pink-soft/60"
                  }`}
                >
                  {DRAMA_PRESETS[key].label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-center text-xs font-semibold text-text-muted">
            Higher drama = faster mood swings and more emotional setbacks.
          </p>
        </CartoonCard>

        <CartoonCard variant="salmon" hoverLift={false} className="relative overflow-hidden">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p
              className="min-h-[3rem] flex-1 font-display text-lg font-bold leading-snug text-text-main sm:text-xl"
              aria-live="polite"
            >
              {gaveUp
                ? "You stopped the charade. Respect."
                : setbackMsg ?? statusLine}
            </p>
            <span className="font-display text-sm font-bold tabular-nums text-text-main">
              {displayPct}%
            </span>
          </div>

          <div
            className="relative mt-5 h-10 overflow-hidden rounded-full border-[3px] border-ink bg-bg-main shadow-[inset_2px_2px_0_rgba(0,0,0,0.06)]"
            role="progressbar"
            aria-valuenow={displayPct}
            aria-valuemin={0}
            aria-valuemax={99}
            aria-label="Fake loading progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-main via-pink-main to-tan transition-[width] duration-500 ease-out"
              style={{ width: `${Math.min(100, displayPct)}%` }}
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-between gap-4 font-display text-sm font-bold text-text-main">
            <span>Fake ETA: {eta}</span>
            <span className="text-text-muted">Cap: never 100%</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startLoading}
              disabled={running && !gaveUp}
              className="btn-cartoon rounded-full border-[3px] border-ink bg-blue-main px-6 py-3 font-display text-sm font-bold text-text-main shadow-cartoon disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start Loading
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-full border-[3px] border-ink bg-bg-cream px-6 py-3 font-display text-sm font-bold text-text-main shadow-cartoon-sm hover:bg-pink-soft/50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={giveUp}
              disabled={!running || gaveUp}
              className="rounded-full border-[3px] border-ink bg-bg-main px-6 py-3 font-display text-sm font-bold text-text-main shadow-cartoon-sm hover:bg-tan/80 disabled:opacity-40"
            >
              Give Up
            </button>
          </div>
        </CartoonCard>

        {gaveUp ? (
          <CartoonCard variant="blue" hoverLift={false}>
            <p className="font-display text-center text-xl font-bold text-text-main sm:text-2xl">
              Loading complete: emotionally, yes. Technically, no.
            </p>
            <p className="mt-4 text-center font-semibold text-text-muted">
              You did the healthy thing and walked away from fake progress.
            </p>
          </CartoonCard>
        ) : null}
      </div>
    </div>
  );
}
