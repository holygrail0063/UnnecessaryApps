"use client";

import { useCallback, useMemo, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function daysUntilNextMonday(d: Date): number {
  const day = d.getDay();
  if (day === 0) return 1;
  if (day === 1) return 0;
  return 8 - day;
}

/** Calendar date of the upcoming Monday (if today is Monday, returns next week’s Monday). */
function getNextMondayDate(from: Date): Date {
  const out = new Date(from);
  const n = daysUntilNextMonday(from);
  out.setHours(12, 0, 0, 0);
  out.setDate(out.getDate() + (n === 0 ? 7 : n));
  return out;
}

function mondayProximityScore(dayIndex: number): number {
  const scores = [88, 100, 12, 22, 34, 48, 72];
  return scores[dayIndex] ?? 0;
}

function workweekThreat(dayIndex: number): string {
  if (dayIndex === 1) return "Critical — meetings may appear without warning.";
  if (dayIndex === 5) return "Elevated — weekend bait detected.";
  if (dayIndex === 0 || dayIndex === 6) return "Guarded — temporary ceasefire.";
  return "Moderate — spreadsheets circling.";
}

export function IsItMondayYet() {
  const [tick, setTick] = useState(0);
  const [whenMsg, setWhenMsg] = useState<string | null>(null);
  const [nudge, setNudge] = useState(false);

  const now = useMemo(() => new Date(), [tick]);
  const dayIndex = now.getDay();
  const isMonday = dayIndex === 1;
  const weekday = WEEKDAYS[dayIndex]!;
  const until = daysUntilNextMonday(now);
  const nextMon = getNextMondayDate(now);
  const proximity = mondayProximityScore(dayIndex);
  const threat = workweekThreat(dayIndex);

  const checkAgain = useCallback(() => {
    setTick((t) => t + 1);
    setNudge(true);
    window.setTimeout(() => setNudge(false), 450);
    setWhenMsg(null);
  }, []);

  const whenMonday = useCallback(() => {
    setTick((t) => t + 1);
    if (isMonday) {
      setWhenMsg(
        `You’re standing inside a Monday. The next one is ${nextMon.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}.`,
      );
    } else {
      setWhenMsg(
        `The next Monday lands on ${nextMon.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}.`,
      );
    }
  }, [isMonday, nextMon]);

  const recommendation = isMonday
    ? "Proceed with cautious professionalism."
    : "Enjoy your temporary freedom.";

  const forecastToday = isMonday ? "Yes — it’s Monday." : "No — but respectfully chaotic.";
  const forecastTomorrow = (() => {
    const t = new Date(now);
    t.setDate(t.getDate() + 1);
    return t.getDay() === 1 ? "Monday-shaped." : "Still not Monday.";
  })();

  const motivation = 40 + (proximity % 40);
  const inbox = 22 + ((dayIndex * 7) % 60);
  const weekendRx = 55 + ((until * 11) % 35);
  const spreadsheet = 90 - (dayIndex * 9);

  return (
    <div className="relative pb-8 pt-2 sm:pb-12">
      <AppDetailHero
        title="Is It Monday Yet?"
        subtitle="A highly advanced calendar verification system that answers the only question that really matters."
        tertiary="Because checking the actual calendar sounds exhausting."
        decorations={
          <>
            <span className="absolute left-[6%] top-[10%] font-display text-xl text-text-main motion-safe-wiggle">
              ✨
            </span>
            <span className="absolute right-[8%] top-[8%] text-2xl motion-safe-float">📅</span>
            <svg
              className="absolute bottom-[18%] left-[10%] h-10 w-24 text-pink-main"
              viewBox="0 0 96 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 12 Q24 4 48 10 T92 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute bottom-[30%] right-[12%] font-display text-lg text-text-main">
              →
            </span>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-[28px] border-[3px] border-ink bg-pink-soft p-8 shadow-cartoon transition-transform duration-300 sm:p-10 ${
            nudge ? "-translate-y-1 scale-[1.01] shadow-cartoon-hover" : ""
          }`}
        >
          <span className="font-display text-xs font-bold uppercase tracking-wide text-text-muted">
            Today’s official status
          </span>
          <p className="font-display mt-4 text-3xl font-bold leading-tight text-text-main sm:text-4xl">
            {isMonday
              ? "Yes. It is Monday."
              : "No. But emotionally, maybe."}
          </p>
          <p className="mt-6 font-display text-xl font-bold text-text-main">
            Today is {weekday}
          </p>
          <p className="mt-3 font-semibold text-text-muted">
            Certified by the Department of Obvious Answers · Calendar confidence: 100%
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl border-[3px] border-ink bg-bg-cream p-5 shadow-cartoon-sm sm:grid-cols-2">
            <div>
              <p className="font-display text-[11px] font-bold uppercase text-text-muted">
                Days until Monday
              </p>
              <p className="font-display mt-1 text-2xl font-bold tabular-nums text-text-main">
                {until === 0 ? "0 (you’re here)" : until}
              </p>
            </div>
            <div>
              <p className="font-display text-[11px] font-bold uppercase text-text-muted">
                Monday proximity score
              </p>
              <p className="font-display mt-1 text-2xl font-bold tabular-nums text-blue-hover">
                {proximity}%
              </p>
            </div>
            <div>
              <p className="font-display text-[11px] font-bold uppercase text-text-muted">
                Workweek threat level
              </p>
              <p className="mt-1 font-display text-sm font-bold text-text-main">{threat}</p>
            </div>
            <div>
              <p className="font-display text-[11px] font-bold uppercase text-text-muted">
                Analyst note
              </p>
              <p className="mt-1 text-sm font-semibold text-text-muted">
                Our analysts reviewed the timeline and confirmed the week is behaving normally.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={checkAgain}
              className="btn-cartoon flex-1 rounded-full border-[3px] border-ink bg-pink-main px-8 py-4 font-display text-base font-bold text-text-main shadow-cartoon hover:bg-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:flex-none"
            >
              Check Again Anyway
            </button>
            <button
              type="button"
              onClick={whenMonday}
              className="btn-cartoon flex-1 rounded-full border-[3px] border-ink bg-bg-cream px-8 py-4 font-display text-base font-bold text-text-main shadow-cartoon hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:flex-none"
            >
              When Is Monday?
            </button>
          </div>
          {whenMsg ? (
            <p
              role="status"
              className="mt-6 rounded-2xl border-[3px] border-ink bg-tan/90 px-4 py-3 font-semibold text-text-main shadow-cartoon-sm"
            >
              {whenMsg}
            </p>
          ) : null}
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <CartoonCard variant="cream">
            <div className="flex items-start gap-2">
              <span className="text-xl" aria-hidden>
                📡
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-text-main">Monday forecast</h2>
                <ul className="mt-4 space-y-2 font-semibold text-text-muted">
                  <li>
                    <span className="font-display font-bold text-text-main">Today:</span>{" "}
                    {forecastToday}
                  </li>
                  <li>
                    <span className="font-display font-bold text-text-main">Tomorrow:</span>{" "}
                    {forecastTomorrow}
                  </li>
                  <li>
                    <span className="font-display font-bold text-text-main">Next big event:</span>{" "}
                    Monday approaching with intent.
                  </li>
                </ul>
              </div>
            </div>
          </CartoonCard>

          <CartoonCard variant="tan">
            <div className="flex items-start gap-2">
              <span className="text-xl" aria-hidden>
                📎
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-text-main">
                  Fake workplace readiness
                </h2>
                <dl className="mt-4 space-y-3 font-semibold">
                  <div className="flex justify-between gap-2 border-b-[3px] border-dashed border-ink/15 pb-2 text-text-muted">
                    <dt>Motivation level</dt>
                    <dd className="font-display font-bold text-text-main">{motivation}%</dd>
                  </div>
                  <div className="flex justify-between gap-2 border-b-[3px] border-dashed border-ink/15 pb-2 text-text-muted">
                    <dt>Inbox anxiety</dt>
                    <dd className="font-display font-bold text-text-main">{inbox}%</dd>
                  </div>
                  <div className="flex justify-between gap-2 border-b-[3px] border-dashed border-ink/15 pb-2 text-text-muted">
                    <dt>Weekend recovery</dt>
                    <dd className="font-display font-bold text-text-main">{weekendRx}%</dd>
                  </div>
                  <div className="flex justify-between gap-2 text-text-muted">
                    <dt>Spreadsheet avoidance</dt>
                    <dd className="font-display font-bold text-text-main">{spreadsheet}%</dd>
                  </div>
                </dl>
              </div>
            </div>
          </CartoonCard>

          <CartoonCard variant="pink">
            <div className="flex items-start gap-2">
              <span className="text-xl" aria-hidden>
                ✅
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-text-main">
                  Official recommendation
                </h2>
                <p className="mt-4 font-semibold leading-relaxed text-text-muted">{recommendation}</p>
              </div>
            </div>
          </CartoonCard>
        </section>
      </div>

      <section
        aria-labelledby="monday-cta-heading"
        className="relative mt-14 box-border w-screen max-w-[100vw] border-y-[4px] border-ink bg-[#27B5E8] py-16 [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)] sm:py-[72px]"
      >
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <h2
            id="monday-cta-heading"
            className="font-display text-lg font-bold leading-snug text-text-main sm:text-xl"
          >
            Still unsure? Try checking again in 3 seconds.
          </h2>
          <button
            type="button"
            onClick={checkAgain}
            className="btn-cartoon mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full border-[3px] border-ink bg-[#FFF8EA] px-8 py-3 font-display text-base font-bold text-text-main shadow-cartoon hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Reconfirm Monday Status
          </button>
          <p className="mt-6 font-display font-semibold text-text-main/95">
            Pointless tools for very important feelings.
          </p>
        </div>
      </section>
    </div>
  );
}
