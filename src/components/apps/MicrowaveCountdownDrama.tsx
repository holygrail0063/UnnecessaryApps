"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";

type DramaLevel = "snack" | "dinner" | "apocalypse";

type Phase = "idle" | "running" | "paused" | "done";

const DRAMA_OPTIONS: { id: DramaLevel; label: string }[] = [
  { id: "snack", label: "Snack Mode" },
  { id: "dinner", label: "Dinner Stakes" },
  { id: "apocalypse", label: "Leftover Apocalypse" },
];

const MAIN_LINES: Record<DramaLevel, string[]> = {
  snack: [
    "The leftovers have entered the final act.",
    "Steam pressure rising. Emotionally, not scientifically.",
    "The plate is questioning everything.",
    "Rotational suspense detected.",
    "Your food is becoming slightly more interesting.",
    "The microwave hum grows louder in spirit.",
    "The final beep approaches.",
  ],
  dinner: [
    "The leftovers have entered the final act — with stakes.",
    "Steam pressure rising. Emotionally AND rhetorically.",
    "The plate is questioning your entire week.",
    "Rotational suspense detected at cinematic RPM.",
    "Your food is becoming narratively important.",
    "The microwave hum has hired a sound designer.",
    "The final beep approaches like a season finale.",
  ],
  apocalypse: [
    "The leftovers have entered the final act — no survivors (metaphorically).",
    "Steam pressure rising. The kitchen files an HR ticket.",
    "The plate is questioning your entire timeline.",
    "Rotational suspense detected at unhealthy RPM.",
    "Your food is becoming mythologically relevant.",
    "The microwave hum has its own podcast.",
    "The final beep approaches like a plot twist with opinions.",
  ],
};

const SILLY_EVENTS = [
  "Plot twist: cold center detected.",
  "The spoon you forgot is being judged.",
  "The rotating plate demands respect.",
  "Your leftovers remember yesterday.",
];

function clampSecs(s: number) {
  if (Number.isNaN(s)) return 0;
  return Math.min(59, Math.max(0, Math.floor(s)));
}

function clampMins(m: number) {
  if (Number.isNaN(m)) return 0;
  return Math.min(99, Math.max(0, Math.floor(m)));
}

export function MicrowaveCountdownDrama() {
  const groupId = useId();
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(45);
  const [drama, setDrama] = useState<DramaLevel>("dinner");
  const [phase, setPhase] = useState<Phase>("idle");
  const [remaining, setRemaining] = useState(0);
  const [total, setTotal] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [silly, setSilly] = useState<string | null>(null);
  const [beep, setBeep] = useState(false);

  /** Browser timer ids — explicit `number` avoids NodeJS.Timeout vs DOM mismatch in TS. */
  const tickRef = useRef<number | null>(null);
  const msgRef = useRef<number | null>(null);
  const sillyRef = useRef<number | null>(null);
  const activeRef = useRef(false);

  const lines = MAIN_LINES[drama];

  const rotateMs =
    drama === "snack" ? 5200 : drama === "dinner" ? 3800 : 2600;

  const clearTimers = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    if (msgRef.current) clearInterval(msgRef.current);
    if (sillyRef.current) clearTimeout(sillyRef.current);
    tickRef.current = null;
    msgRef.current = null;
    sillyRef.current = null;
  }, []);

  /** Only rotation + silly — do not clear countdown tick (used after beginTick). */
  const clearMsgSilly = useCallback(() => {
    if (msgRef.current) clearInterval(msgRef.current);
    if (sillyRef.current) clearTimeout(sillyRef.current);
    msgRef.current = null;
    sillyRef.current = null;
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const scheduleSillyChain = useCallback(() => {
    const delay =
      drama === "snack"
        ? 14000 + Math.random() * 9000
        : drama === "dinner"
          ? 9000 + Math.random() * 7000
          : 5000 + Math.random() * 5000;
    sillyRef.current = window.setTimeout(() => {
      if (!activeRef.current) return;
      if (Math.random() < 0.72) {
        setSilly(SILLY_EVENTS[Math.floor(Math.random() * SILLY_EVENTS.length)]!);
        window.setTimeout(() => setSilly(null), 4200);
      }
      scheduleSillyChain();
    }, delay);
  }, [drama]);

  const startIntervalsForRun = useCallback(() => {
    clearMsgSilly();
    msgRef.current = window.setInterval(() => {
      setLineIdx((i) => (i + 1) % lines.length);
    }, rotateMs);
    scheduleSillyChain();
  }, [clearMsgSilly, lines.length, rotateMs, scheduleSillyChain]);

  const beginTick = useCallback(() => {
    tickRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) return 0;
        return r - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (remaining !== 0 || phase !== "running") return undefined;
    activeRef.current = false;
    clearTimers();
    setPhase("done");
    setBeep(true);
    const id = window.setTimeout(() => setBeep(false), 2800);
    return () => clearTimeout(id);
  }, [remaining, phase, clearTimers]);

  const startDrama = () => {
    activeRef.current = true;
    clearTimers();
    let t = clampMins(mins) * 60 + clampSecs(secs);
    if (t < 1) t = 1;
    setTotal(t);
    setRemaining(t);
    setPhase("running");
    setLineIdx(0);
    setSilly(null);
    setBeep(false);
    beginTick();
    startIntervalsForRun();
  };

  const pause = () => {
    if (phase !== "running") return;
    activeRef.current = false;
    clearTimers();
    setPhase("paused");
  };

  const resume = () => {
    if (phase !== "paused" || remaining < 1) return;
    activeRef.current = true;
    setPhase("running");
    beginTick();
    startIntervalsForRun();
  };

  const reset = () => {
    activeRef.current = false;
    clearTimers();
    setPhase("idle");
    setRemaining(0);
    setTotal(0);
    setSilly(null);
    setBeep(false);
  };

  const display = useMemo(() => {
    const r = remaining;
    const mm = Math.floor(r / 60);
    const ss = r % 60;
    return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  }, [remaining]);

  const pct =
    total > 0 ? Math.min(100, Math.round(((total - remaining) / total) * 100)) : 0;

  const currentLine = lines[lineIdx % lines.length]!;

  const editing = phase === "idle" || phase === "done";

  const dramaClass =
    drama === "snack"
      ? "microwave-energy-snack"
      : drama === "dinner"
        ? "microwave-energy-dinner"
        : "microwave-energy-apocalypse";

  return (
    <div
      className={`relative pb-20 pt-2 sm:pb-24 ${
        phase === "running" || phase === "paused"
          ? "rounded-[32px] bg-blue-main/35 px-1 sm:px-2"
          : ""
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 rounded-t-[28px] bg-gradient-to-b from-blue-main/40 to-transparent ${phase === "running" || phase === "paused" ? dramaClass : ""}`}
        aria-hidden
      />

      <AppDetailHero
        title="Microwave Countdown Drama"
        subtitle="Turns a short timer into a cinematic countdown event."
        decorations={
          <>
            <span className="absolute right-[5%] top-[6%] text-3xl motion-safe-wiggle">🍿</span>
            <span className="absolute left-[7%] top-[18%] text-2xl motion-safe-float">🍜</span>
          </>
        }
      />

      <div className="relative mx-auto mt-10 max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <CartoonCard variant="cream" hoverLift={false}>
          <p
            id={`${groupId}-drama-label`}
            className="font-display text-center text-sm font-bold uppercase tracking-wide text-text-muted"
          >
            Drama level
          </p>
          <div
            className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center"
            role="radiogroup"
            aria-labelledby={`${groupId}-drama-label`}
          >
            {DRAMA_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={drama === opt.id}
                disabled={phase === "running"}
                onClick={() => setDrama(opt.id)}
                className={`rounded-full border-[3px] border-ink px-5 py-2.5 font-display text-sm font-bold shadow-cartoon-sm disabled:opacity-50 ${
                  drama === opt.id
                    ? "bg-pink-main text-text-main"
                    : "bg-bg-main text-text-main hover:bg-pink-soft/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </CartoonCard>

        <CartoonCard
          variant="salmon"
          hoverLift={false}
          className={`relative overflow-hidden ${beep ? "microwave-beep-active ring-4 ring-pink-main" : ""}`}
        >
          {phase === "running" || phase === "paused" ? (
            <>
              <p
                className="text-center font-display text-7xl font-black tabular-nums tracking-tight text-text-main sm:text-8xl"
                aria-live="polite"
              >
                {display}
              </p>
              <div
                className="relative mx-auto mt-8 h-8 max-w-xl overflow-hidden rounded-full border-[3px] border-ink bg-bg-main shadow-[inset_2px_2px_0_rgba(0,0,0,0.08)]"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-main via-pink-main to-tan transition-[width] duration-700 ease-linear"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="mt-8 space-y-4">
                <CartoonCard variant="cream" hoverLift={false} className="!p-4">
                  <p className="text-center font-display text-lg font-bold leading-snug text-text-main sm:text-xl">
                    {currentLine}
                  </p>
                </CartoonCard>
                {silly ? (
                  <CartoonCard variant="pink" hoverLift={false} className="!p-4">
                    <p className="text-center font-display text-base font-bold text-text-main">
                      Breaking: {silly}
                    </p>
                  </CartoonCard>
                ) : null}
                {drama === "apocalypse" && phase === "running" ? (
                  <p className="text-center font-display text-xs font-bold uppercase text-text-muted">
                    High drama alerts enabled — emotional subtitles loading…
                  </p>
                ) : null}
              </div>
            </>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-display text-xs font-bold uppercase text-text-muted">
                  Minutes
                </label>
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={mins}
                  onChange={(e) => setMins(clampMins(Number(e.target.value)))}
                  className="mt-2 w-full rounded-2xl border-[3px] border-ink bg-bg-main px-4 py-3 font-display text-2xl font-bold shadow-cartoon-sm"
                />
              </div>
              <div>
                <label className="font-display text-xs font-bold uppercase text-text-muted">
                  Seconds
                </label>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={secs}
                  onChange={(e) => setSecs(clampSecs(Number(e.target.value)))}
                  className="mt-2 w-full rounded-2xl border-[3px] border-ink bg-bg-main px-4 py-3 font-display text-2xl font-bold shadow-cartoon-sm"
                />
              </div>
            </div>
          )}
        </CartoonCard>

        <div className="flex flex-wrap justify-center gap-3">
          {(phase === "idle" || phase === "done") && (
            <button
              type="button"
              onClick={startDrama}
              className="btn-cartoon rounded-full border-[3px] border-ink bg-blue-main px-8 py-3 font-display text-base font-bold text-text-main shadow-cartoon"
            >
              Start Drama
            </button>
          )}
          {phase === "running" && (
            <button
              type="button"
              onClick={pause}
              className="rounded-full border-[3px] border-ink bg-bg-cream px-6 py-3 font-display text-sm font-bold shadow-cartoon-sm"
            >
              Pause
            </button>
          )}
          {phase === "paused" && (
            <button
              type="button"
              onClick={resume}
              className="rounded-full border-[3px] border-ink bg-pink-main px-6 py-3 font-display text-sm font-bold shadow-cartoon-sm"
            >
              Resume
            </button>
          )}
          {(phase === "running" || phase === "paused" || phase === "done") && (
            <button
              type="button"
              onClick={reset}
              className="rounded-full border-[3px] border-ink bg-bg-main px-6 py-3 font-display text-sm font-bold text-text-muted hover:text-text-main"
            >
              Reset
            </button>
          )}
        </div>

        {phase === "done" ? (
          <CartoonCard variant="blue" hoverLift={false}>
            <p className="font-display text-center text-xl font-bold text-text-main sm:text-2xl">
              It is done. Your food has survived the cinematic universe.
            </p>
            <p className="mt-6 text-center font-display text-lg font-bold italic text-bg-cream">
              Critics are calling it: warm enough.
            </p>
          </CartoonCard>
        ) : null}
      </div>
    </div>
  );
}
