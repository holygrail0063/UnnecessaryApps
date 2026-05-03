"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { playMicrowaveBeep } from "@/lib/playMicrowaveBeep";

const TRANSLATIONS = [
  "Your soup is hot, but your life choices are questionable.",
  "I have completed my tiny metal concert.",
  "Please remove the food before I start screaming again.",
  "Your leftovers are ready and emotionally available.",
  "The potato has reached its final form.",
  "This beep means nothing. I just wanted attention.",
  "Your food is warm-ish. Manage expectations.",
  "I have done everything I can with this frozen burrito.",
  "The plate is rotating. Your ambition is not.",
  "Beep. That was texture. Beep. That was judgment.",
  "I’m done heating. You’re done pretending this was a meal prep.",
] as const;

const SNACK_LEVELS = [
  "Low",
  "Medium",
  "Medium-high",
  "High",
  "Critical snack scenario",
] as const;

const MOODS = [
  "Dramatic",
  "Passive-aggressive",
  "Sleepy but sincere",
  "Hungry for validation",
  "Judging your Tupperware",
] as const;

function pickTranslation(exclude?: string): string {
  const pool = TRANSLATIONS.filter((t) => t !== exclude);
  const list = pool.length ? pool : [...TRANSLATIONS];
  return list[Math.floor(Math.random() * list.length)]!;
}

function randomMetrics(seed: number) {
  const confidence = 85 + (seed % 15);
  const snack = SNACK_LEVELS[seed % SNACK_LEVELS.length]!;
  const mood = MOODS[(seed >> 3) % MOODS.length]!;
  return { confidence, snack, mood };
}

export function MicrowaveBeepTranslator() {
  const initialRef = useRef<string | null>(null);
  if (initialRef.current === null) {
    initialRef.current = pickTranslation();
  }
  const firstTranslation = initialRef.current;

  const [translation, setTranslation] = useState(firstTranslation);
  const [beeps, setBeeps] = useState(0);
  const [history, setHistory] = useState<string[]>(() => [firstTranslation!]);
  const [flash, setFlash] = useState(false);
  const [seed, setSeed] = useState(1);
  const [emergencyBusy, setEmergencyBusy] = useState(false);
  const [statusLine, setStatusLine] = useState<string | null>(null);

  const metrics = useMemo(() => randomMetrics(seed), [seed]);

  const runTranslation = useCallback((opts?: { silent?: boolean }) => {
    if (!opts?.silent) {
      try {
        playMicrowaveBeep();
      } catch (error) {
        console.warn("Beep sound could not play:", error);
      }
    }
    setStatusLine(null);
    setTranslation((prev) => {
      const next = pickTranslation(prev);
      setHistory((h) => [next, ...h.filter((x) => x !== next)].slice(0, 3));
      return next;
    });
    setBeeps((n) => n + 1);
    setSeed((s) => s + 997);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 380);
  }, []);

  const onTranslateBeep = useCallback(() => {
    runTranslation();
  }, [runTranslation]);

  const onEmergencyReBeep = useCallback(() => {
    try {
      playMicrowaveBeep();
    } catch (error) {
      console.warn("Beep sound could not play:", error);
    }
    setEmergencyBusy(true);
    setStatusLine("Recalculating microwave emotions…");
    window.setTimeout(() => {
      runTranslation({ silent: true });
      setEmergencyBusy(false);
    }, 650);
  }, [runTranslation]);

  return (
    <div className="relative pb-8 pt-2 sm:pb-12">
      <AppDetailHero
        title="Microwave Beep Translator"
        subtitle="Finally understand what those beeps actually mean."
        tertiary="Because your leftovers have been trying to communicate for years."
        decorations={
          <>
            <span className="absolute left-[5%] top-[8%] text-lg motion-safe-wiggle" aria-hidden>
              ♪
            </span>
            <span className="absolute right-[7%] top-[6%] text-2xl motion-safe-float" aria-hidden>
              🎵
            </span>
            <span className="absolute left-[12%] top-[35%] font-display text-xl text-text-main" aria-hidden>
              ♫
            </span>
            <span className="absolute right-[14%] top-[28%] text-xl" aria-hidden>
              ⏲️
            </span>
            <svg
              className="absolute bottom-[22%] left-[8%] h-8 w-16 text-pink-main"
              viewBox="0 0 64 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 16 Q16 6 32 12 T60 10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path d="M52 6 L58 10 L52 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="absolute bottom-[18%] right-[10%] font-display text-sm text-text-main" aria-hidden>
              ✨
            </span>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
        <article
          className={`relative overflow-hidden rounded-[28px] border-[3px] border-ink bg-blue-main p-8 shadow-cartoon-hover transition-transform duration-300 sm:p-10 ${
            flash ? "scale-[1.02]" : ""
          }`}
        >
          <p className="font-display text-xs font-bold uppercase tracking-wide text-text-main/90">
            Live beep interpretation
          </p>
          <p
            className="font-display mt-6 min-h-[5rem] text-xl font-bold leading-snug text-text-main sm:min-h-[5.5rem] sm:text-2xl"
            key={translation}
          >
            {translation}
          </p>

          <p className="mt-6 font-display text-sm font-bold text-text-main/85">
            Beeps translated:{" "}
            <span className="tabular-nums text-text-main">{beeps}</span>
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border-[3px] border-ink bg-bg-cream px-3 py-2 font-display text-[11px] font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm">
              Beep confidence: {metrics.confidence}%
            </span>
            <span className="inline-flex rounded-full border-[3px] border-ink bg-pink-soft px-3 py-2 font-display text-[11px] font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm">
              Snack urgency: {metrics.snack}
            </span>
            <span className="inline-flex rounded-full border-[3px] border-ink bg-tan px-3 py-2 font-display text-[11px] font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm">
              Appliance mood: {metrics.mood}
            </span>
          </div>

          {statusLine ? (
            <p
              role="status"
              className="mt-6 rounded-2xl border-[3px] border-ink bg-bg-cream px-4 py-3 font-display text-sm font-bold text-text-main shadow-cartoon-sm"
            >
              {statusLine}
            </p>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={onTranslateBeep}
              disabled={emergencyBusy}
              className="btn-cartoon flex-1 rounded-full border-[3px] border-ink bg-pink-main px-8 py-4 font-display text-base font-bold text-text-main shadow-cartoon hover:bg-pink-hover disabled:pointer-events-none disabled:opacity-60 sm:flex-none"
            >
              <span className="block">Translate Beep</span>
              <span className="mt-1 block font-display text-[10px] font-bold uppercase tracking-wide text-text-main/90">
                NO APPLIANCE CERTIFICATION REQUIRED
              </span>
            </button>
            <button
              type="button"
              onClick={onEmergencyReBeep}
              disabled={emergencyBusy}
              className="btn-cartoon flex-1 rounded-full border-[3px] border-ink bg-bg-cream px-8 py-4 font-display text-base font-bold text-text-main shadow-cartoon hover:bg-pink-soft disabled:pointer-events-none disabled:opacity-60 sm:flex-none"
            >
              Emergency Re-Beep
            </button>
          </div>
        </article>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-[24px] border-[3px] border-ink bg-bg-cream p-6 shadow-cartoon transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-cartoon-hover sm:p-7">
            <h2 className="font-display text-lg font-bold text-text-main">Common beep dialects</h2>
            <ul className="mt-4 space-y-3 font-semibold text-text-muted">
              <li>
                <span className="font-display font-bold text-text-main">Single beep:</span> polite reminder
              </li>
              <li>
                <span className="font-display font-bold text-text-main">Triple beep:</span> tiny emergency
              </li>
              <li>
                <span className="font-display font-bold text-text-main">Endless beep:</span> microwave has
                chosen violence
              </li>
            </ul>
          </div>

          <div className="rounded-[24px] border-[3px] border-ink bg-pink-soft p-6 shadow-cartoon transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-cartoon-hover sm:p-7">
            <h2 className="font-display text-lg font-bold text-text-main">Recent translations</h2>
            <ul className="mt-4 space-y-3 text-sm font-semibold leading-snug text-text-muted">
              {history.length ? (
                history.map((line, i) => (
                  <li key={`${line}-${i}`} className="border-b-[3px] border-dashed border-ink/15 pb-2 last:border-0">
                    “{line}”
                  </li>
                ))
              ) : (
                <li>Your beep memoir will appear here.</li>
              )}
            </ul>
          </div>

          <div className="rounded-[24px] border-[3px] border-ink bg-tan p-6 shadow-cartoon transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-cartoon-hover sm:p-7">
            <h2 className="font-display text-lg font-bold text-text-main">Official appliance note</h2>
            <p className="mt-4 font-semibold leading-relaxed text-text-muted">
              Do not argue with the microwave. It has more buttons than you.
            </p>
          </div>
        </section>
      </div>

      <section
        aria-labelledby="microwave-cta-heading"
        className="relative mt-14 box-border w-screen max-w-[100vw] border-y-[4px] border-ink bg-[#27B5E8] py-16 [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)] sm:py-[72px]"
      >
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <h2
            id="microwave-cta-heading"
            className="font-display text-lg font-bold leading-snug text-text-main sm:text-xl"
          >
            Still hearing beeps?
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-semibold text-text-main/95">
            Translate another one before your leftovers lose confidence.
          </p>
          <button
            type="button"
            onClick={onTranslateBeep}
            disabled={emergencyBusy}
            className="btn-cartoon mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full border-[3px] border-ink bg-[#FFF8EA] px-8 py-3 font-display text-base font-bold text-text-main shadow-cartoon hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-60"
          >
            Translate Another Beep
          </button>
        </div>
      </section>
    </div>
  );
}
