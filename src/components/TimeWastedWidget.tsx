"use client";

import { useEffect, useMemo, useState } from "react";

const MESSAGES = [
  "You could be doing laundry.",
  "Your tabs are judging you.",
  "This counts as research.",
  "Productivity left the chat.",
  "Congratulations, nothing happened.",
  "Still here? Respect.",
  "Your time has been successfully misplaced.",
  "This is basically self-care.",
  "Your manager would have questions.",
] as const;

function formatHMS(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => n.toString().padStart(2, "0")).join(":");
}

export function TimeWastedWidget() {
  const [elapsed, setElapsed] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [showPlusOne, setShowPlusOne] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setElapsed((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setShowPlusOne(true);
      window.setTimeout(() => setShowPlusOne(false), 950);
    }, 13000);
    return () => window.clearInterval(id);
  }, []);

  const timerText = useMemo(() => formatHMS(elapsed), [elapsed]);
  const message = MESSAGES[msgIndex]!;

  return (
    <div className="mx-auto w-full" aria-labelledby="time-wasted-title">
      <div className="time-wasted-shell">
        <span className="live-waste-badge font-display font-bold uppercase tracking-wide text-text-main">
          Live waste tracking
        </span>

        {/* floating doodles — pinned to shell, behind pink card */}
        <span
          className="pointer-events-none absolute left-[6%] top-[12%] z-0 text-lg text-text-main motion-safe-float"
          aria-hidden
        >
          🕐
        </span>
        <span
          className="pointer-events-none absolute right-[8%] top-[14%] z-0 text-base text-text-main motion-safe-orbit"
          aria-hidden
        >
          ✨
        </span>
        <span
          className="pointer-events-none absolute bottom-[16%] left-[7%] z-0 font-display text-sm font-bold text-blue-main motion-safe-wiggle"
          aria-hidden
        >
          zzz
        </span>
        <span
          className="pointer-events-none absolute bottom-[20%] right-[10%] z-0 text-lg text-text-main motion-safe-float"
          style={{ animationDelay: "0.8s" }}
          aria-hidden
        >
          ★
        </span>
        <svg
          className="pointer-events-none absolute right-[6%] top-[40%] z-0 h-10 w-14 text-pink-main motion-safe-orbit"
          viewBox="0 0 56 40"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 28 Q18 8 36 20 T52 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <span
          className="pointer-events-none absolute left-[10%] top-[44%] z-0 font-display text-xs font-bold text-text-main"
          aria-hidden
        >
          →
        </span>

        <div className="time-wasted-card flex flex-col">
          <div className="text-center font-display text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Official counter
          </div>
          <h3
            id="time-wasted-title"
            className="mt-1 text-center font-display text-lg font-bold text-text-main sm:text-xl"
          >
            Official Time Wasted
          </h3>

          <div className="mx-auto mt-4 w-full max-w-[240px] rounded-2xl border-[3px] border-ink bg-bg-cream px-4 py-4 text-center shadow-cartoon-sm sm:max-w-[280px] sm:py-5">
            <div
              className="font-display text-[clamp(1.5rem,5vw,2.25rem)] font-bold tabular-nums leading-none tracking-tight text-text-main sm:text-4xl"
              role="timer"
              aria-live="off"
              aria-label={`Elapsed time ${timerText}`}
            >
              {timerText}
            </div>
            <p className="mt-2 font-display text-xs font-bold uppercase tracking-wide text-text-muted">
              time proudly wasted here
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="time-wasted-badge inline-flex rounded-full border-[3px] border-ink bg-tan px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm sm:text-[11px]">
              Productivity: declining
            </span>
            <span
              className="time-wasted-badge inline-flex rounded-full border-[3px] border-ink bg-blue-main px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm sm:text-[11px]"
              style={{ animationDelay: "0.45s" }}
            >
              Pointlessness: rising
            </span>
          </div>

          <div className="mt-5">
            <div className="flex flex-wrap items-end justify-between gap-2 font-display text-[10px] font-bold uppercase tracking-wide text-text-muted">
              <span>Unnecessary progress</span>
              <span className="normal-case">looping forever</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full border-[3px] border-ink bg-bg-cream">
              <div className="time-wasted-progress-fill h-full w-full rounded-full bg-blue-main" />
            </div>
          </div>

          <p
            className="mt-4 min-h-[2.75rem] text-center font-display text-sm font-bold leading-snug text-text-main sm:min-h-[3rem] sm:text-base"
            key={msgIndex}
          >
            {message}
          </p>

          <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
            <span className="time-wasted-dot h-2 w-2 rounded-full border-2 border-ink bg-pink-main" />
            <span className="time-wasted-dot h-2 w-2 rounded-full border-2 border-ink bg-blue-main" />
            <span className="time-wasted-dot h-2 w-2 rounded-full border-2 border-ink bg-tan" />
          </div>

          {showPlusOne ? (
            <span
              className="pointer-events-none absolute right-[10%] top-[42%] z-20 rounded-full border-[3px] border-ink bg-bg-cream px-2 py-1 font-display text-[10px] font-black uppercase text-text-main shadow-cartoon-sm motion-safe-float sm:right-[12%] sm:top-[48%]"
              aria-hidden
            >
              +1 wasted sec
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
