"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";

const STORAGE_KEY = "unnecessaryApps-button-trust-issues";

const BUTTON_LINES = [
  "Don’t touch me",
  "Absolutely not",
  "I saw that",
  "Too close",
  "Try again, maybe",
  "Respect my boundaries",
] as const;

type Stored = { attempts: number; successes: number };

function loadStored(): Stored {
  if (typeof window === "undefined") return { attempts: 0, successes: 0 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { attempts: 0, successes: 0 };
    const p = JSON.parse(raw) as Partial<Stored>;
    return {
      attempts: typeof p.attempts === "number" ? p.attempts : 0,
      successes: typeof p.successes === "number" ? p.successes : 0,
    };
  } catch {
    return { attempts: 0, successes: 0 };
  }
}

function saveStored(s: Stored) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

function randomLine() {
  return BUTTON_LINES[Math.floor(Math.random() * BUTTON_LINES.length)]!;
}

function trustLevel(attempts: number, successes: number): number {
  if (successes === 0 && attempts === 0) return 0;
  const base = Math.min(100, successes * 28 + attempts * 1.2);
  const doubt = Math.max(0, attempts - successes * 2) * 1.5;
  return Math.max(0, Math.min(100, Math.round(base - doubt)));
}

/** Success probability rises after enough near-misses / attempts */
function successChance(totalDodges: number, successes: number): number {
  return Math.min(0.45, 0.035 + totalDodges * 0.02 + successes * 0.055);
}

export function ButtonWithTrustIssues() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 42, y: 45 });
  const [label, setLabel] = useState<string>(() => randomLine());
  const [attempts, setAttempts] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const [dodges, setDodges] = useState(0);
  const [lastWin, setLastWin] = useState(false);
  const dodgeCooldown = useRef(false);

  useEffect(() => {
    const s = loadStored();
    setAttempts(s.attempts);
    setSuccesses(s.successes);
  }, []);

  useEffect(() => {
    saveStored({ attempts, successes });
  }, [attempts, successes]);

  const teleport = useCallback(() => {
    setPos({
      x: 8 + Math.random() * 78,
      y: 10 + Math.random() * 72,
    });
    setLabel(randomLine());
  }, []);

  /** When cursor is within `px` of button center, dodge */
  const maybeDodgeFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const arena = arenaRef.current;
      const btn = btnRef.current;
      if (!arena || !btn || dodgeCooldown.current) return;

      const ar = arena.getBoundingClientRect();
      const br = btn.getBoundingClientRect();
      const cx = br.left + br.width / 2;
      const cy = br.top + br.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      const threshold = Math.min(140, Math.max(72, ar.width * 0.22));

      if (dist < threshold) {
        dodgeCooldown.current = true;
        window.setTimeout(() => {
          dodgeCooldown.current = false;
        }, 140);
        setDodges((d) => d + 1);
        setAttempts((a) => a + 1);
        teleport();
      }
    },
    [teleport],
  );

  const onArenaMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    maybeDodgeFromPointer(e.clientX, e.clientY);
  };

  const onArenaTouch: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const t = e.touches[0];
    if (t) maybeDodgeFromPointer(t.clientX, t.clientY);
  };

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const roll = Math.random();
    const p = successChance(dodges, successes);
    if (roll < p) {
      setSuccesses((s) => s + 1);
      setAttempts((a) => a + 1);
      setLastWin(true);
      setLabel("Fine. I trust you now. A little.");
      window.setTimeout(() => {
        setLastWin(false);
        setLabel(randomLine());
        teleport();
      }, 4200);
    } else {
      setAttempts((a) => a + 1);
      setDodges((d) => d + 1);
      teleport();
    }
  };

  const resetSession = () => {
    setDodges(0);
    teleport();
    setLastWin(false);
    setLabel(randomLine());
  };

  const resetAllStats = () => {
    setAttempts(0);
    setSuccesses(0);
    setDodges(0);
    saveStored({ attempts: 0, successes: 0 });
    teleport();
    setLastWin(false);
  };

  const tl = trustLevel(attempts, successes);

  return (
    <div className="relative pb-20 pt-2 sm:pb-24">
      <AppDetailHero
        title="Button With Trust Issues"
        subtitle="A button that runs away when you try to click it."
        decorations={
          <>
            <span className="absolute left-[8%] top-[10%] text-2xl motion-safe-wiggle">🖱️</span>
            <span className="absolute right-[6%] top-[14%] text-3xl motion-safe-float">💨</span>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <CartoonCard variant="cream" hoverLift={false} className="!p-4 text-center sm:!p-5">
            <p className="font-display text-xs font-bold uppercase text-text-muted">Attempts</p>
            <p className="font-display mt-2 text-3xl font-bold tabular-nums text-text-main">
              {attempts}
            </p>
          </CartoonCard>
          <CartoonCard variant="salmon" hoverLift={false} className="!p-4 text-center sm:!p-5">
            <p className="font-display text-xs font-bold uppercase text-text-muted">
              Successful clicks
            </p>
            <p className="font-display mt-2 text-3xl font-bold tabular-nums text-text-main">
              {successes}
            </p>
          </CartoonCard>
          <CartoonCard variant="blue" hoverLift={false} className="!p-4 text-center sm:!p-5">
            <p className="font-display text-xs font-bold uppercase text-text-main/90">
              Trust level
            </p>
            <p className="font-display mt-2 text-3xl font-bold tabular-nums text-text-main">
              {tl}%
            </p>
          </CartoonCard>
        </div>

        <CartoonCard variant="pink" hoverLift={false} className="relative overflow-hidden">
          <p className="font-display text-center text-sm font-bold text-text-muted">
            Hover nearby on desktop — it’s sensitive. On mobile, it sprints on touch.
          </p>
          <div
            ref={arenaRef}
            role="application"
            aria-label="Play area for the evasive button"
            className="relative mt-6 min-h-[300px] overflow-hidden rounded-[22px] border-[3px] border-dashed border-ink/40 bg-bg-main/90 sm:min-h-[380px]"
            onMouseMove={onArenaMove}
            onTouchMove={onArenaTouch}
          >
            <button
              ref={btnRef}
              type="button"
              onClick={handleButtonClick}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={`btn-cartoon absolute max-w-[min(240px,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-pink-main px-5 py-3 font-display text-sm font-bold text-text-main shadow-cartoon transition-[left,top] duration-150 ease-out hover:bg-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-base ${lastWin ? "ring-4 ring-blue-main/80" : ""}`}
            >
              {label}
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={resetSession}
              className="btn-cartoon rounded-full border-[3px] border-ink bg-bg-cream px-6 py-2.5 font-display text-sm font-bold text-text-main shadow-cartoon-sm"
            >
              Reset round
            </button>
            <button
              type="button"
              onClick={resetAllStats}
              className="rounded-full border-[3px] border-ink bg-bg-main px-6 py-2.5 font-display text-sm font-bold text-text-muted shadow-cartoon-sm hover:bg-pink-soft/40 hover:text-text-main"
            >
              Reset all stats
            </button>
          </div>
        </CartoonCard>
      </div>
    </div>
  );
}
