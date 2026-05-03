"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";
import { playPopSound } from "@/lib/playPopSound";

const BUBBLE_COUNT = 40;

const FUN_MESSAGES = [
  "Click a bubble. We believe in you.",
  "A strong start. Completely unnecessary.",
  "You are now several bubbles closer to enlightenment.",
  "This is technically interaction design.",
  "Your stress has been professionally pretended away.",
  "The bubbles never stood a chance.",
  "You have achieved peak pointless productivity.",
  "That pop was louder in your head. Still counts.",
  "Somewhere, a UX researcher is nodding solemnly.",
];

const PRODUCTIVITY_LABELS = [
  "Extremely convincing",
  "Professionally meaningless",
  "Almost work",
  "Suspiciously satisfying",
  "Board-meeting ready",
] as const;

function funMessageFor(popped: number): string {
  if (popped <= 0) return FUN_MESSAGES[0]!;
  const idx = Math.min(FUN_MESSAGES.length - 1, 1 + Math.floor(popped / 5));
  return FUN_MESSAGES[idx]!;
}

function productivityFor(popped: number): string {
  return PRODUCTIVITY_LABELS[popped % PRODUCTIVITY_LABELS.length]!;
}

function stressPercent(popped: number): number {
  return Math.min(99, popped * 2 + ((popped * 3) % 11));
}

export function BubbleWrapBusting() {
  const [popped, setPopped] = useState<boolean[]>(() =>
    Array.from({ length: BUBBLE_COUNT }, () => false),
  );
  const [burstIndex, setBurstIndex] = useState<number | null>(null);
  const burstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const poppedRef = useRef(popped);
  poppedRef.current = popped;

  const poppedCount = useMemo(() => popped.filter(Boolean).length, [popped]);
  const remaining = BUBBLE_COUNT - poppedCount;
  const completionPct = Math.round((poppedCount / BUBBLE_COUNT) * 100);

  const clearBurstTimer = () => {
    if (burstTimer.current) {
      clearTimeout(burstTimer.current);
      burstTimer.current = null;
    }
  };

  const flashBurst = useCallback((index: number) => {
    clearBurstTimer();
    setBurstIndex(index);
    burstTimer.current = setTimeout(() => {
      setBurstIndex(null);
      burstTimer.current = null;
    }, 320);
  }, []);

  const popBubble = useCallback(
    (index: number) => {
      if (poppedRef.current[index]) return;
      try {
        playPopSound();
      } catch (error) {
        console.warn("Pop sound could not play:", error);
      }
      flashBurst(index);
      setPopped((prev) => {
        if (prev[index]) return prev;
        const next = [...prev];
        next[index] = true;
        return next;
      });
    },
    [flashBurst],
  );

  const refill = useCallback(() => {
    setPopped(Array.from({ length: BUBBLE_COUNT }, () => false));
    setBurstIndex(null);
  }, []);

  const popAll = useCallback(() => {
    const indices: number[] = [];
    popped.forEach((isPopped, i) => {
      if (!isPopped) indices.push(i);
    });
    if (indices.length === 0) return;

    const lastPopAt = (indices.length - 1) * 20;

    indices.forEach((idx, n) => {
      window.setTimeout(() => {
        setPopped((prev) => {
          if (prev[idx]) return prev;
          try {
            playPopSound({ gain: 0.075 });
          } catch (error) {
            console.warn("Pop sound could not play:", error);
          }
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      }, n * 20);
    });

    window.setTimeout(() => {
      void (async () => {
        try {
          const { default: confetti } = await import("canvas-confetti");
          confetti({
            particleCount: 115,
            spread: 82,
            origin: { x: 0.5, y: 0.52 },
            scalar: 1,
            ticks: 220,
            colors: ["#F9A3A8", "#27B5E8", "#FFF8EA", "#E8BD82", "#FFC1C5", "#171717"],
          });
        } catch {
          /* confetti optional */
        }
      })();
    }, lastPopAt + 90);
  }, [popped]);

  const badge = (id: string, label: string, unlocked: boolean) => (
    <span
      key={id}
      className={`inline-flex rounded-full border-[3px] px-3 py-1.5 font-display text-xs font-bold ${
        unlocked
          ? "border-ink bg-bg-cream text-text-main shadow-cartoon-sm"
          : "border-ink/25 bg-bg-main/70 text-text-muted line-through decoration-text-muted/40"
      }`}
    >
      {label}
    </span>
  );

  return (
    <div className="relative pb-8 pt-2 sm:pb-12">
      <AppDetailHero
        title="Bubble Wrap Busting"
        subtitle="Pop endless digital bubbles and pretend you’re managing stress professionally."
        tertiary="Warning: may cause absolutely no measurable improvement."
        decorations={
          <>
            <span className="absolute left-[6%] top-[10%] text-xl motion-safe-wiggle" aria-hidden>
              ✨
            </span>
            <span className="absolute right-[8%] top-[8%] font-display text-sm font-bold text-pink-main" aria-hidden>
              POP!
            </span>
            <span className="absolute left-[10%] top-[40%] text-2xl opacity-80 motion-safe-float" aria-hidden>
              🫧
            </span>
            <span className="absolute right-[12%] top-[35%] font-display text-lg text-text-main" aria-hidden>
              →
            </span>
            <svg
              className="absolute bottom-[20%] left-[8%] h-10 w-20 text-blue-main"
              viewBox="0 0 80 20"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 14 Q20 4 40 12 T76 10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-[28px] border-[3px] border-ink bg-pink-soft p-6 shadow-cartoon-hover sm:p-8 lg:p-10">
          <p className="font-display text-xs font-bold uppercase tracking-wide text-text-muted">
            Official bubble zone
          </p>
          <p className="mt-2 font-semibold text-text-muted">
            Click bubbles. That’s the whole app.
          </p>

          <div
            className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-2.5 lg:grid-cols-8 lg:gap-3"
            role="group"
            aria-label="Bubble wrap grid"
          >
            {popped.map((isPopped, index) => (
              <button
                key={index}
                type="button"
                aria-pressed={isPopped}
                aria-label={isPopped ? `Bubble ${index + 1}, popped` : `Bubble ${index + 1}, unpopped`}
                onClick={() => !isPopped && popBubble(index)}
                disabled={isPopped}
                className={`relative aspect-square min-h-[44px] rounded-full border-[3px] border-ink font-display text-[10px] font-bold uppercase transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-default ${
                  isPopped
                    ? "bg-tan text-text-main/80 shadow-cartoon-sm brightness-[0.98]"
                    : "btn-cartoon cursor-pointer bg-blue-main text-text-main shadow-cartoon hover:scale-105 hover:bg-blue-hover active:scale-100"
                }`}
              >
                {!isPopped ? (
                  <span
                    className="pointer-events-none absolute inset-[14%] rounded-full bg-white/35"
                    aria-hidden
                  />
                ) : (
                  <span className="pointer-events-none" aria-hidden>
                    ✓
                  </span>
                )}
                {burstIndex === index ? (
                  <span
                    className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[11px] font-black text-text-main motion-safe-wiggle"
                    aria-hidden
                  >
                    POP!
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <p className="mt-6 text-center font-display text-sm font-bold text-text-main">
            {funMessageFor(poppedCount)}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <button
              type="button"
              onClick={refill}
              className="btn-cartoon rounded-full border-[3px] border-ink bg-bg-cream px-6 py-3 font-display text-sm font-bold text-text-main shadow-cartoon hover:bg-pink-soft sm:min-w-[200px]"
            >
              Refill Bubble Wrap
            </button>
            <button
              type="button"
              onClick={popAll}
              className="btn-cartoon rounded-full border-[3px] border-ink bg-blue-main px-6 py-3 font-display text-sm font-bold text-text-main shadow-cartoon hover:bg-blue-hover sm:min-w-[200px]"
            >
              Pop All
            </button>
          </div>
        </article>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <CartoonCard variant="cream">
            <h2 className="font-display text-lg font-bold text-text-main">Bubbles popped</h2>
            <p className="mt-3 font-display text-4xl font-bold tabular-nums text-text-main">{poppedCount}</p>
            <p className="mt-2 text-sm font-semibold text-text-muted">Session total on this sheet.</p>
          </CartoonCard>
          <CartoonCard variant="pink">
            <h2 className="font-display text-lg font-bold text-text-main">Fake stress reduced</h2>
            <p className="mt-3 font-display text-4xl font-bold tabular-nums text-blue-hover">
              {stressPercent(poppedCount)}%
            </p>
            <p className="mt-2 text-sm font-semibold text-text-muted">
              Certified by nobody. Trusted by you anyway.
            </p>
          </CartoonCard>
          <CartoonCard variant="tan">
            <h2 className="font-display text-lg font-bold text-text-main">Productivity illusion</h2>
            <p className="mt-3 font-display text-xl font-bold text-text-main">
              {productivityFor(poppedCount)}
            </p>
            <p className="mt-2 text-sm font-semibold text-text-muted">Rotates with every questionable life choice.</p>
          </CartoonCard>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <CartoonCard variant="blue">
            <h2 className="font-display text-lg font-bold text-text-main">Bubble report</h2>
            <ul className="mt-4 space-y-2 font-semibold text-text-muted">
              <li>
                <span className="font-display font-bold text-text-main">Remaining bubbles:</span> {remaining}
              </li>
              <li>
                <span className="font-display font-bold text-text-main">Popped bubbles:</span> {poppedCount}
              </li>
              <li>
                <span className="font-display font-bold text-text-main">Pop completion:</span> {completionPct}%
              </li>
            </ul>
          </CartoonCard>
          <CartoonCard variant="cream">
            <h2 className="font-display text-lg font-bold text-text-main">Workplace justification</h2>
            <p className="mt-4 font-semibold leading-relaxed text-text-muted">
              Tell your manager this was tactile productivity research.
            </p>
          </CartoonCard>
          <CartoonCard variant="pink">
            <h2 className="font-display text-lg font-bold text-text-main">Bubble badges</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {badge("first", "First Pop", poppedCount >= 1)}
              {badge("serial", "Serial Popper", poppedCount >= 12)}
              {badge("mgr", "Bubble Manager", poppedCount >= 28)}
              {badge("cfo", "Chief Pop Officer", poppedCount >= BUBBLE_COUNT)}
            </div>
          </CartoonCard>
        </section>
      </div>

      <section
        aria-labelledby="bubble-cta-heading"
        className="relative mt-14 box-border w-screen max-w-[100vw] border-y-[4px] border-ink bg-[#27B5E8] py-16 [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)] sm:py-[72px]"
      >
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <h2
            id="bubble-cta-heading"
            className="font-display text-lg font-bold leading-snug text-text-main sm:text-xl"
          >
            Need more bubbles?
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-semibold text-text-main/95">
            Refill the sheet and continue your deeply important work.
          </p>
          <button
            type="button"
            onClick={refill}
            className="btn-cartoon mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full border-[3px] border-ink bg-[#FFF8EA] px-8 py-3 font-display text-base font-bold text-text-main shadow-cartoon hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Refill Bubble Wrap
          </button>
        </div>
      </section>
    </div>
  );
}
