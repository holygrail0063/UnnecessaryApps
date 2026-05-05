"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";
import {
  meetingExcuses,
  MEETING_EXCUSE_CATEGORY_KEYS,
  type MeetingExcuseCategoryKey,
} from "@/data/meetingExcuses";
import {
  copyToClipboard,
  generateEmailVersion,
  getRandomExcuse,
  getRandomExcuseFromCategories,
  incrementDailyCounter,
  readDailyCounter,
  type WorkLocation,
} from "@/lib/meetingExcuseGenerator";

const LOADING_MESSAGES = [
  "Checking calendar guilt...",
  "Aligning stakeholder excuses...",
  "Generating believable nonsense...",
  "Optimizing meeting avoidance strategy...",
  "Consulting the tiny meeting goblin...",
  "Reviewing fake bandwidth constraints...",
  "Reheating yesterday’s priorities...",
  "Opening seventeen tabs for no reason...",
  "Preparing a respectful escape route...",
  "Measuring emotional availability...",
] as const;

const PANIC_CATEGORIES: MeetingExcuseCategoryKey[] = [
  "managerSafe",
  "politeProfessional",
];
const CHAOS_CATEGORIES: MeetingExcuseCategoryKey[] = [
  "maximumNonsense",
  "overdramatic",
  "operationalChaos",
];

const PLACEHOLDER =
  "Your excuse will appear here, wearing a tiny tie.";

type GenerateMode = "normal" | "panic" | "chaos";

function randomDelayMs() {
  return 500 + Math.floor(Math.random() * 400);
}

function pickLoadingLine() {
  return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]!;
}

export function MeetingExcuseGenerator() {
  const baseId = useId();
  const excuseId = `${baseId}-excuse`;
  const [workLocation, setWorkLocation] = useState<WorkLocation>("wfh");
  const [category, setCategory] =
    useState<MeetingExcuseCategoryKey>("corporateNonsense");
  const [excuse, setExcuse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingLine, setLoadingLine] = useState("");
  const [copyFlash, setCopyFlash] = useState("");
  const [meetingsToday, setMeetingsToday] = useState(0);
  const [cardPop, setCardPop] = useState(0);
  const lastExcuse = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMeetingsToday(readDailyCounter());
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const runGeneration = useCallback(
    (mode: GenerateMode) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setLoadingLine(pickLoadingLine());
      setLoading(true);

      const delay = randomDelayMs();
      timeoutRef.current = setTimeout(() => {
        let text: string;
        if (mode === "panic") {
          const r = getRandomExcuseFromCategories(
            PANIC_CATEGORIES,
            workLocation,
            lastExcuse.current,
          );
          setCategory(r.categoryKey);
          text = r.text;
        } else if (mode === "chaos") {
          const r = getRandomExcuseFromCategories(
            CHAOS_CATEGORIES,
            workLocation,
            lastExcuse.current,
          );
          setCategory(r.categoryKey);
          text = r.text;
        } else {
          text = getRandomExcuse(
            category,
            workLocation,
            lastExcuse.current,
          );
        }
        lastExcuse.current = text;
        setExcuse(text);
        setCardPop((k) => k + 1);
        setMeetingsToday(incrementDailyCounter());
        setLoading(false);
        timeoutRef.current = null;
      }, delay);
    },
    [category, workLocation],
  );

  const onCopyExcuse = async () => {
    if (!excuse) return;
    const ok = await copyToClipboard(excuse);
    setCopyFlash(
      ok ? "Copied without shame" : "Clipboard said no. Try again?",
    );
    window.setTimeout(() => setCopyFlash(""), 2200);
  };

  const onCopyEmail = async () => {
    if (!excuse) return;
    const ok = await copyToClipboard(generateEmailVersion(excuse));
    setCopyFlash(
      ok ? "Email version copied (no judgment)" : "Clipboard needs a moment.",
    );
    window.setTimeout(() => setCopyFlash(""), 2200);
  };

  const onRestore = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCategory("managerSafe");
    setExcuse(null);
    lastExcuse.current = null;
    setLoading(false);
  };

  return (
    <div className="relative pb-20 pt-2 sm:pb-24">
      <p
        className="mx-auto mb-6 max-w-3xl px-4 text-center font-display text-sm font-bold text-text-main sm:px-6"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-pink-main px-4 py-2 shadow-cartoon-sm">
          <span aria-hidden>🧾</span>
          Meetings avoided today:{" "}
          <span className="tabular-nums text-text-main">{meetingsToday}</span>
        </span>
      </p>

      <AppDetailHero
        title={
          <span className="flex flex-col items-center gap-4 sm:gap-5">
            <span
              className="flex h-20 w-20 items-center justify-center rounded-[22px] border-[3px] border-ink bg-bg-cream text-5xl shadow-cartoon"
              aria-hidden
            >
              🫠
            </span>
            <span>Meeting Excuse Generator</span>
          </span>
        }
        subtitle="Generate professional-sounding nonsense for meetings you absolutely do not want."
        decorations={
          <>
            <span className="absolute right-[4%] top-[2%] text-2xl motion-safe-float sm:text-3xl">
              📅
            </span>
            <span className="absolute left-[6%] top-[18%] text-xl motion-safe-wiggle sm:text-2xl">
              ☕
            </span>
            <span className="absolute bottom-[8%] right-[10%] text-2xl sm:text-3xl">
              💻
            </span>
          </>
        }
      />

      <div className="mx-auto mt-10 max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <CartoonCard variant="salmon" hoverLift={false}>
          <fieldset>
            <legend className="font-display text-base font-bold text-text-main sm:text-lg">
              Where are you pretending to be productive today?
            </legend>
            <div
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4"
              role="group"
              aria-label="Work location"
            >
              {(
                [
                  { id: "wfh" as const, label: "Working From Home" },
                  { id: "office" as const, label: "In Office" },
                ] as const
              ).map((opt) => {
                const selected = workLocation === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setWorkLocation(opt.id)}
                    className={`meeting-btn-bounce flex-1 rounded-2xl border-[3px] border-ink px-4 py-3.5 text-center font-display text-sm font-bold shadow-cartoon-sm transition sm:py-4 sm:text-base ${
                      selected
                        ? "bg-blue-main text-text-main"
                        : "bg-bg-cream text-text-main hover:bg-pink-soft/80"
                    }`}
                    aria-pressed={selected}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </CartoonCard>

        <CartoonCard variant="cream" hoverLift={false}>
          <p className="font-display text-base font-bold text-text-main">
            Pick your excuse flavor
          </p>
          <div
            className="mt-4 grid grid-cols-1 gap-2.5 min-[390px]:grid-cols-2 md:grid-cols-3"
            role="group"
            aria-label="Excuse category"
          >
            {MEETING_EXCUSE_CATEGORY_KEYS.map((key) => {
              const label = meetingExcuses[key].label;
              const selected = category === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={`meeting-btn-bounce rounded-full border-[3px] border-ink px-3 py-2.5 text-center font-display text-xs font-bold leading-snug shadow-cartoon-sm transition sm:text-sm ${
                    selected
                      ? "bg-pink-main text-text-main"
                      : "bg-bg-main text-text-main hover:bg-pink-soft/60"
                  }`}
                  aria-pressed={selected}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </CartoonCard>

        <div className="relative">
          <span
            className="pointer-events-none absolute -left-2 top-1/4 text-xl opacity-80 motion-safe-float sm:-left-4 sm:text-2xl"
            aria-hidden
          >
            📝
          </span>
          <span
            className="pointer-events-none absolute -right-1 bottom-1/4 text-lg opacity-75 motion-safe-orbit sm:-right-3 sm:text-xl"
            aria-hidden
          >
            ⚠️
          </span>
          <span
            className="pointer-events-none absolute left-[8%] -bottom-2 text-lg motion-safe-wiggle sm:text-xl"
            aria-hidden
          >
            📌
          </span>

          <CartoonCard variant="pink" hoverLift={false} className="relative z-10">
            <p className="font-display text-xs font-bold uppercase tracking-wide text-text-muted">
              Your escape hatch
            </p>
            <div
              id={excuseId}
              className="mt-4 min-h-[6rem] rounded-2xl border-[3px] border-dashed border-ink/35 bg-bg-main/90 p-5 shadow-cartoon-sm sm:min-h-[7.5rem] sm:p-6"
              aria-live="polite"
            >
              {loading ? (
                <p className="font-display text-lg font-bold text-text-muted sm:text-xl">
                  {loadingLine}
                </p>
              ) : (
                <p
                  key={cardPop}
                  className={`font-display text-lg font-bold leading-relaxed text-text-main sm:text-xl ${excuse ? "meeting-excuse-pop" : ""}`}
                >
                  {excuse ?? PLACEHOLDER}
                </p>
              )}
            </div>

            {copyFlash ? (
              <p
                className="mt-3 text-center font-display text-sm font-bold text-blue-hover"
                role="status"
              >
                {copyFlash}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <button
                type="button"
                disabled={loading}
                onClick={() => runGeneration("normal")}
                className="btn-cartoon meeting-btn-bounce rounded-full border-[3px] border-ink bg-blue-main px-5 py-3 font-display text-sm font-bold text-text-main shadow-cartoon disabled:opacity-60 sm:min-w-[160px]"
              >
                Generate Excuse
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => runGeneration("panic")}
                className="btn-cartoon meeting-btn-bounce rounded-full border-[3px] border-ink bg-bg-cream px-5 py-3 font-display text-sm font-bold text-text-main shadow-cartoon disabled:opacity-60 sm:min-w-[140px]"
              >
                Panic Mode
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => runGeneration("chaos")}
                className="btn-cartoon meeting-btn-bounce rounded-full border-[3px] border-ink bg-pink-main px-5 py-3 font-display text-sm font-bold text-text-main shadow-cartoon disabled:opacity-60 sm:min-w-[140px]"
              >
                Chaos Mode
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t-[3px] border-ink/15 pt-6 sm:flex-row sm:flex-wrap sm:justify-center">
              <button
                type="button"
                onClick={onCopyExcuse}
                disabled={!excuse || loading}
                className="rounded-full border-[3px] border-ink bg-tan px-4 py-2.5 font-display text-sm font-bold text-text-main shadow-cartoon-sm transition hover:bg-tan/90 disabled:opacity-50 sm:px-5"
              >
                Copy Excuse
              </button>
              <button
                type="button"
                onClick={onCopyEmail}
                disabled={!excuse || loading}
                className="rounded-full border-[3px] border-ink bg-bg-cream px-4 py-2.5 font-display text-sm font-bold text-text-main shadow-cartoon-sm transition hover:bg-pink-soft/50 disabled:opacity-50 sm:px-5"
              >
                Copy Email Version
              </button>
              <button
                type="button"
                onClick={onRestore}
                className="rounded-full border-[3px] border-ink bg-bg-main px-4 py-2.5 font-display text-sm font-bold text-text-main shadow-cartoon-sm transition hover:bg-bg-cream disabled:opacity-50 sm:px-5"
              >
                Restore Professionalism
              </button>
            </div>
          </CartoonCard>
        </div>

        <p className="text-center font-display text-xs font-bold text-text-muted">
          Fake corporate escape machine — keep it silly, keep it harmless.
        </p>
      </div>
    </div>
  );
}
