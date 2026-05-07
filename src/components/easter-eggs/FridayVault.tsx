"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartoonCard } from "@/components/apps/CartoonCard";
import {
  FRIDAY_PASSPHRASE,
  FRIDAY_VAULT_SESSION_KEY,
  FRIDAY_VAULT_ENTRY_FLASH_KEY,
  THURSDAY_CALENDAR_SESSION_KEY,
  getLocalWeekdayName,
  isLocalThursday,
  isLocalFriday,
} from "@/lib/fridayVault";

/**
 * Public path — fine for a fun easter egg.
 * For stronger protection, serve this video from an authenticated backend route instead of the public folder.
 */
const FRIDAY_VIDEO_SRC = "/easter-eggs/friday.mp4";

type GateState = "loading" | "locked" | "unlocked";

export function FridayVault() {
  const [gate, setGate] = useState<GateState>("loading");
  const [phrase, setPhrase] = useState("");
  const [phraseError, setPhraseError] = useState(false);
  const [entryFlash, setEntryFlash] = useState(false);
  const [isFridayToday, setIsFridayToday] = useState(false);
  const [isThursdayToday, setIsThursdayToday] = useState(false);
  const [thursdayCalendarUnlocked, setThursdayCalendarUnlocked] = useState(false);
  const [traditionComplete, setTraditionComplete] = useState(false);
  const [bigPlayVisible, setBigPlayVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const confettiFiredRef = useRef(false);

  useEffect(() => {
    try {
      const flash = sessionStorage.getItem(FRIDAY_VAULT_ENTRY_FLASH_KEY);
      if (flash === "1") {
        setEntryFlash(true);
        sessionStorage.removeItem(FRIDAY_VAULT_ENTRY_FLASH_KEY);
        const t = window.setTimeout(() => setEntryFlash(false), 2800);
        return () => clearTimeout(t);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      const ok = sessionStorage.getItem(FRIDAY_VAULT_SESSION_KEY) === "1";
      setGate(ok ? "unlocked" : "locked");
    } catch {
      setGate("locked");
    }
  }, []);

  useEffect(() => {
    if (gate !== "unlocked") return;
    const now = new Date();
    const fri = isLocalFriday(now);
    const thu = isLocalThursday(now);
    setIsFridayToday(fri);
    setIsThursdayToday(thu);
    if (thu) {
      try {
        setThursdayCalendarUnlocked(sessionStorage.getItem(THURSDAY_CALENDAR_SESSION_KEY) === "1");
      } catch {
        setThursdayCalendarUnlocked(false);
      }
    } else {
      setThursdayCalendarUnlocked(false);
    }
    setTraditionComplete(false);
    setBigPlayVisible(true);
  }, [gate]);

  const showVideoExperience = useMemo(
    () =>
      gate === "unlocked" &&
      (isFridayToday || (isThursdayToday && thursdayCalendarUnlocked)),
    [gate, isFridayToday, isThursdayToday, thursdayCalendarUnlocked],
  );

  const fireCelebration = useCallback(() => {
    if (confettiFiredRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    confettiFiredRef.current = true;
    void import("canvas-confetti")
      .then(({ default: confetti }) => {
        confetti({ particleCount: 110, spread: 88, origin: { y: 0.65 } });
      })
      .catch(() => {
        /* optional */
      });
  }, []);

  useEffect(() => {
    if (gate === "unlocked" && showVideoExperience) {
      fireCelebration();
    }
  }, [gate, showVideoExperience, fireCelebration]);

  const thursdayViaCalendar =
    showVideoExperience && isThursdayToday && thursdayCalendarUnlocked && !isFridayToday;

  const unlockThursdayCalendar = () => {
    try {
      sessionStorage.setItem(THURSDAY_CALENDAR_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setThursdayCalendarUnlocked(true);
  };

  const showThursdayCalendarFab =
    gate === "unlocked" && isThursdayToday && !isFridayToday && !thursdayCalendarUnlocked;

  const submitPassphrase = (e: FormEvent) => {
    e.preventDefault();
    if (phrase.trim() === FRIDAY_PASSPHRASE) {
      try {
        sessionStorage.setItem(FRIDAY_VAULT_SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setPhraseError(false);
      setGate("unlocked");
    } else {
      setPhraseError(true);
    }
  };

  const playTradition = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    try {
      await v.play();
      setBigPlayVisible(false);
    } catch {
      setBigPlayVisible(true);
    }
  };

  const replay = async () => {
    const v = videoRef.current;
    if (!v) return;
    setTraditionComplete(false);
    v.pause();
    v.currentTime = 0;
    v.muted = false;
    try {
      await v.play();
      setBigPlayVisible(false);
    } catch {
      setBigPlayVisible(true);
    }
  };

  const weekday = getLocalWeekdayName();

  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <Navbar />
      <main className="relative flex-1 pb-16 pt-4 sm:pb-24">
        {entryFlash ? (
          <div
            className="pointer-events-none fixed left-1/2 top-24 z-[100] -translate-x-1/2 rounded-full border-[3px] border-ink bg-pink-main px-5 py-2 font-display text-sm font-bold text-text-main shadow-cartoon motion-safe:animate-bounce sm:text-base"
            role="status"
          >
            Secret nonsense detected…
          </div>
        ) : null}

        <div className="relative mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
          {showThursdayCalendarFab ? (
            <button
              type="button"
              onClick={unlockThursdayCalendar}
              className="absolute right-1 top-2 z-20 flex size-11 items-center justify-center rounded-2xl border-[3px] border-ink bg-bg-cream text-2xl leading-none shadow-cartoon-sm transition-transform hover:-translate-y-0.5 active:translate-y-px motion-safe:active:scale-95 sm:right-3 sm:top-3 sm:size-[3.25rem] sm:text-[1.85rem]"
              aria-label="Thursday calendar — unlock today’s vault"
              title="It’s Thursday"
            >
              <span aria-hidden>📅</span>
            </button>
          ) : null}
          <div className="rounded-[32px] border-[4px] border-ink bg-blue-main/40 px-4 py-10 shadow-cartoon sm:px-8 sm:py-12">
            <h1 className="text-center font-display text-3xl font-black tracking-tight text-text-main sm:text-4xl">
              Friday Vault
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg font-semibold text-text-muted sm:text-xl">
              A highly unnecessary tradition, protected by the calendar.
            </p>
          </div>

          {gate === "loading" ? (
            <p className="mt-12 text-center font-display font-bold text-text-muted">Loading…</p>
          ) : null}

          {gate === "locked" ? (
            <CartoonCard variant="cream" hoverLift={false} className="mx-auto mt-10 max-w-lg">
              <form onSubmit={submitPassphrase} className="space-y-4">
                <label htmlFor="friday-pass" className="block font-display text-sm font-bold text-text-muted">
                  Say the magic words
                </label>
                <input
                  id="friday-pass"
                  type="password"
                  autoComplete="off"
                  value={phrase}
                  onChange={(e) => {
                    setPhrase(e.target.value);
                    setPhraseError(false);
                  }}
                  className="w-full rounded-2xl border-[3px] border-ink bg-bg-main px-4 py-3 font-display text-lg font-bold shadow-cartoon-sm placeholder:text-text-muted/60"
                  placeholder="••••••••"
                />
                {phraseError ? (
                  <p className="font-display text-sm font-bold text-pink-hover">That was not the vibe.</p>
                ) : null}
                <button
                  type="submit"
                  className="btn-cartoon w-full rounded-full border-[3px] border-ink bg-pink-main py-3 font-display text-base font-bold text-text-main shadow-cartoon"
                >
                  Unlock
                </button>
              </form>
            </CartoonCard>
          ) : null}

          {gate === "unlocked" && !showVideoExperience ? (
            <CartoonCard variant="salmon" hoverLift={false} className="mx-auto mt-10">
              <h2 className="text-center font-display text-2xl font-black text-text-main sm:text-3xl">
                Access Denied
              </h2>
              <p className="mt-6 text-center font-display text-lg font-bold leading-relaxed text-text-main">
                This nonsense is legally available only on Fridays.
              </p>
              <p className="mt-4 text-center font-display text-base font-semibold text-text-muted">
                Please return when the calendar has emotionally matured.
              </p>
              <p className="mt-8 text-center font-display text-xl font-black text-text-main">
                Today is: {weekday}
              </p>
              <div className="mt-8 flex justify-center">
                <span
                  className="inline-flex cursor-not-allowed rounded-full border-[3px] border-ink bg-bg-main/80 px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-text-muted opacity-70 shadow-cartoon-sm"
                  aria-disabled
                >
                  Not Friday yet
                </span>
              </div>
            </CartoonCard>
          ) : null}

          {showVideoExperience ? (
            <div className="mt-10 space-y-8">
              <CartoonCard
                variant="cream"
                hoverLift={false}
                className={`relative overflow-hidden ${traditionComplete ? "friday-vault-done-glow" : ""}`}
              >
                {thursdayViaCalendar ? (
                  <p className="mb-6 rounded-2xl border-[3px] border-ink bg-tan px-4 py-2.5 text-center font-display text-xs font-bold leading-snug text-text-main sm:text-sm">
                    Thursday pass — the tiny calendar agreed. Honorary Friday energy unlocked.
                  </p>
                ) : null}
                <h2 className="text-center font-display text-3xl font-black uppercase tracking-tight text-text-main sm:text-4xl">
                  FRIDAY DETECTED
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-center font-display text-lg font-bold text-text-muted">
                  Four years. Zero missed Fridays. Extremely questionable dedication.
                </p>
                <p className="mt-2 text-center font-display text-sm font-bold text-text-main">
                  The tradition continues.
                </p>

                <div className="relative mx-auto mt-8 max-w-2xl">
                  <div className="rounded-[20px] border-[4px] border-ink bg-bg-main p-2 shadow-cartoon">
                    {/*
                     * For stronger protection, serve this video from an authenticated backend route instead of the public folder.
                     */}
                    <video
                      ref={videoRef}
                      className="aspect-video w-full rounded-2xl bg-black object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      onPlay={() => setBigPlayVisible(false)}
                      onEnded={() => setTraditionComplete(true)}
                    >
                      <source src={FRIDAY_VIDEO_SRC} type="video/mp4" />
                    </video>
                    {bigPlayVisible ? (
                      <div className="absolute inset-2 flex flex-col items-center justify-center gap-4 rounded-2xl bg-bg-main/85 backdrop-blur-[2px]">
                        <button
                          type="button"
                          onClick={() => void playTradition()}
                          className="btn-cartoon rounded-full border-[3px] border-ink bg-blue-main px-8 py-4 font-display text-lg font-black uppercase tracking-wide text-text-main shadow-cartoon sm:px-12 sm:text-xl"
                        >
                          Play the tradition
                        </button>
                        <p className="max-w-xs text-center font-display text-xs font-bold text-text-muted">
                          Tap to play with sound — no autoplay shenanigans.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={() => void replay()}
                    className="rounded-full border-[3px] border-ink bg-pink-main px-6 py-3 font-display text-sm font-bold shadow-cartoon-sm"
                  >
                    Replay
                  </button>
                  <Link
                    href="/"
                    className="rounded-full border-[3px] border-ink bg-bg-cream px-6 py-3 font-display text-sm font-bold shadow-cartoon-sm"
                  >
                    Back to home
                  </Link>
                </div>
              </CartoonCard>

              {traditionComplete ? (
                <CartoonCard variant="blue" hoverLift={false} className="friday-vault-done-glow border-[4px]">
                  <p className="text-center font-display text-2xl font-black text-text-main sm:text-3xl">
                    Tradition successfully maintained.
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Calendar Compliance", value: "100%" },
                      { label: "Friday Energy", value: "Dangerous" },
                      { label: "Productivity Remaining", value: "0%" },
                      { label: "Tradition Streak", value: "4+ Years" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="rounded-2xl border-[3px] border-ink bg-bg-cream px-4 py-3 text-center shadow-cartoon-sm"
                      >
                        <p className="font-display text-xs font-bold uppercase tracking-wide text-text-muted">
                          {row.label}
                        </p>
                        <p className="mt-1 font-display text-lg font-black text-text-main">{row.value}</p>
                      </div>
                    ))}
                  </div>
                </CartoonCard>
              ) : null}
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
