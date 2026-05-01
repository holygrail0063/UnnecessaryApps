"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  getMessagesFor,
  loadingTypeLabels,
  PANIC_ALERT_LINES,
  randomLogLines,
  type LoadingFlavor,
} from "@/lib/fakeLoadingMessages";

function nowStamp() {
  const d = new Date();
  return d.toLocaleTimeString("en-US", { hour12: false });
}

function panicLine() {
  return PANIC_ALERT_LINES[
    Math.floor(Math.random() * PANIC_ALERT_LINES.length)
  ]!;
}

export function FakeLoadingScreenGenerator() {
  const [flavor, setFlavor] = useState<LoadingFlavor>("corporate");
  const [panic, setPanic] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dramaticShift, setDramaticShift] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [fateTaken, setFateTaken] = useState(false);

  const messages = useMemo(
    () => getMessagesFor(flavor, panic),
    [flavor, panic],
  );

  const displayLine = useMemo(() => {
    if (!messages.length) return "";
    const idx =
      ((messageIndex % messages.length) + messages.length) % messages.length;
    return messages[idx] ?? "";
  }, [messages, messageIndex]);

  const animationLocked =
    !running || fateTaken || Math.round(progress) >= 99;

  useEffect(() => {
    if (animationLocked) return undefined;

    let alive = true;
    const jitter =
      panic ? 180 + (dramaticShift % 520) : dramaticShift % 740;

    const tick = window.setInterval(() => {
      if (!alive) return;

      setProgress((p) => {
        if (p >= 99) return 99;
        let bump = 0;
        if (p < 58)
          bump = Math.random() < 0.92 ? Math.floor(Math.random() * 6) + 3 : 0;
        else if (p < 82)
          bump = Math.random() < 0.88 ? Math.floor(Math.random() * 4) + 1 : 0;
        else if (p < 97)
          bump =
            panic && Math.random() < 0.38
              ? Math.floor(Math.random() * 3) + 1
              : Math.random() < 0.35
                ? 1
                : 0;
        else {
          bump = panic
            ? Math.random() < 0.25
              ? Math.random() < 0.5
                ? -1
                : 1
              : 0
            : Math.random() < 0.2
              ? 1
              : 0;
        }

        if (panic && Math.random() < 0.16) bump += Math.floor(Math.random() * 10);

        let next = p + bump;

        while (panic && next > p && Math.random() < 0.1)
          next -= Math.floor(Math.random() * 4);

        next = Math.max(0, Math.min(next, 99));
        return Math.round(next);
      });
    }, 540 + jitter);

    return () => {
      alive = false;
      clearInterval(tick);
    };
  }, [animationLocked, panic, dramaticShift]);

  useEffect(() => {
    if (animationLocked) return undefined;

    let alive = true;
    const lineIntervalMs =
      panic ? Math.max(1100 - dramaticShift * 12, 450) : 2700 + dramaticShift * 90;

    const id = window.setInterval(() => {
      if (!alive) return;
      setMessageIndex((i) =>
        panic ? i + Math.floor(Math.random() * 2) + 1 : i + 1,
      );
    }, lineIntervalMs);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [animationLocked, panic, dramaticShift]);

  useEffect(() => {
    if (animationLocked) return undefined;

    let alive = true;
    const interval = window.setInterval(() => {
      if (!alive) return;
      const snippet = randomLogLines(8, panic);
      const idx = Math.min(
        snippet.length - 1,
        Math.floor(Math.random() * snippet.length),
      );
      const line = snippet[Math.max(0, idx)] ?? snippet[0];
      if (!line) return;
      const safe =
        panic && Math.random() < 0.25
          ? `${line}${Math.random() < 0.4 ? ` — ${panicLine()}` : ""}`
          : line;
      setLogs((prev) =>
        [...prev, `[${nowStamp()}] ${safe}`].slice(-18),
      );
    }, 1700 + (dramaticShift % 700));

    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [animationLocked, panic, dramaticShift]);

  const resetAll = () => {
    setRunning(false);
    setProgress(0);
    setLogs([]);
    setFateTaken(false);
    setDramaticShift(0);
    setMessageIndex(0);
  };

  const begin = () => {
    resetAll();
    setRunning(true);
    setLogs([
      `[${nowStamp()}] Initialized unnecessary process`,
      `[${nowStamp()}] Loaded ${loadingTypeLabels[flavor]} module`,
      `[${nowStamp()}] Found 0 useful tasks`,
    ]);
  };

  const moreDrama = () => setDramaticShift((x) => x + 2);

  const acceptFate = () => setFateTaken(true);

  const pct = Math.min(Math.round(progress), 99);
  const atStuckGate = running && pct >= 99 && !fateTaken;

  const panicLabelId = useId();

  const flavorEntries = (
    Object.entries(loadingTypeLabels) as [LoadingFlavor, string][]
  ).map(([id, label]) => ({ id, label }));

  return (
    <div className="border-b border-zinc-200/60 bg-[#FAFAF8] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Generate a loading screen that accomplishes absolutely nothing.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
          Perfect for moments when you want to look busy, delay decisions, or emotionally
          prepare for a progress bar that refuses to finish.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-3xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50/70 p-6 shadow-xl shadow-zinc-900/[0.08] transition hover:-translate-y-0.5 hover:shadow-2xl sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-zinc-100 pb-5">
            <p className="text-sm font-semibold text-zinc-800">Loading controls</p>
            <div className="flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-[11px] font-semibold text-violet-900">
              <span id={`${panicLabelId}-caption`}>Panic Mode</span>
              <button
                id={panicLabelId}
                type="button"
                role="switch"
                aria-labelledby={`${panicLabelId}-caption`}
                aria-checked={panic}
                onClick={() => setPanic((v) => !v)}
                className={`relative h-7 w-[46px] shrink-0 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${panic ? "bg-violet-600" : "bg-zinc-200"}`}
              >
                <span
                  className={`pointer-events-none absolute top-[4px] h-[21px] w-[21px] rounded-full bg-white shadow transition-all ${panic ? "left-[24px]" : "left-[3px]"}`}
                />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {flavorEntries.map((t) => {
              const on = flavor === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFlavor(t.id)}
                  aria-pressed={on}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:text-[13px] ${
                    on
                      ? "border-violet-300 bg-white text-zinc-900 shadow-md shadow-violet-500/15"
                      : "border-transparent bg-[#fafafa]/80 text-zinc-600 hover:bg-white"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="relative mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-[#fafafa]/80 px-5 py-6 text-left shadow-inner">
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                  System Status: pretending
                </span>
                <span className="rounded-full border border-rose-100 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-rose-700">
                  {panic ? "Alignment unstable (artistic)" : "Stakeholders calm enough"}
                </span>
              </div>

              <p className="mt-6 min-h-[3rem] whitespace-pre-wrap text-lg font-semibold leading-snug text-zinc-800">
                {displayLine}
              </p>

              <div className="mt-5">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                  <span>Progress</span>
                  <span aria-live="polite">{pct}%</span>
                </div>
                <div className="relative mt-2 h-5 overflow-hidden rounded-full bg-white ring-1 ring-zinc-200">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400 transition-[width] duration-[650ms]`}
                    style={{ width: `${pct}%` }}
                  />
                  {panic ? (
                    <div className="pointer-events-none absolute inset-0 animate-pulse rounded-full opacity-[0.48] shadow-[inset_0_-4px_rgba(244,114,182,0.45)] mix-blend-multiply"></div>
                  ) : null}
                </div>
              </div>

              {running && pct >= 99 && !fateTaken ? (
                <p className="mt-6 text-lg font-semibold text-amber-800">
                  Almost there… probably.
                </p>
              ) : null}
              {running && fateTaken ? (
                <p className="mt-6 text-lg font-semibold text-emerald-800">
                  The loading screen has accepted you as its permanent user.
                </p>
              ) : null}

              {!running ? (
                <p className="mt-8 text-xs text-zinc-500">
                  Whenever you crave futility — start below.
                </p>
              ) : null}
            </div>
          </div>

          <dl className="mt-8 grid gap-4 rounded-2xl border border-zinc-100 bg-white p-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <Stat accent label="System Status" value="Pretending" />
            <Stat label="Time Remaining" value="Calculating forever" />
            <Stat label="Productivity Impact" value="Negative" />
            <Stat
              label="Stakeholder Confidence"
              value={panic ? "Fragile choreography" : "Artificially high"}
            />
          </dl>

          <div className="mt-8 rounded-2xl border border-dashed border-zinc-100 bg-black/[0.02] px-4 py-3 font-mono text-[11px] leading-relaxed text-zinc-600">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              Fake operational log
            </p>
            <div aria-live="polite" role="log" className="max-h-48 space-y-1 overflow-y-auto pr-2">
              {logs.length === 0 ? (
                <p className="text-zinc-400">Quiet… too quiet.</p>
              ) : (
                logs.map((l, idx) => <p key={`${l}-${idx}`}>{l}</p>)
              )}
            </div>
          </div>

          <ActionRow
            running={running}
            fateTaken={fateTaken}
            atStuckGate={!!atStuckGate}
            onStart={begin}
            onAcceptFate={acceptFate}
            onReset={resetAll}
            onDrama={moreDrama}
          />
        </article>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        accent
          ? "border-violet-200 bg-gradient-to-br from-white to-violet-50/50"
          : "border-zinc-100 bg-[#fafafa]/80"
      }`}
    >
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">{label}</dt>
      <dd className="mt-1 font-semibold text-zinc-900">{value}</dd>
    </div>
  );
}

function ActionRow({
  running,
  fateTaken,
  atStuckGate,
  onStart,
  onAcceptFate,
  onReset,
  onDrama,
}: {
  running: boolean;
  fateTaken: boolean;
  atStuckGate: boolean;
  onStart: () => void;
  onAcceptFate: () => void;
  onReset: () => void;
  onDrama: () => void;
}) {
  if (!running) {
    return (
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex rounded-full bg-zinc-900 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          onClick={onStart}
        >
          Start Fake Loading
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-600 shadow-sm transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
        >
          Reset
        </button>
      </div>
    );
  }

  if (fateTaken) {
    return (
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          onClick={onReset}
        >
          Restart futility loop
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        aria-disabled={!atStuckGate}
        disabled={!atStuckGate}
        className={`inline-flex rounded-full border px-6 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
          atStuckGate
            ? "border-amber-200 bg-white text-amber-900 shadow-sm hover:border-amber-300"
            : "cursor-not-allowed border-zinc-100 bg-zinc-50 text-zinc-400"
        }`}
        onClick={() => atStuckGate && onAcceptFate()}
      >
        Accept Your Fate
      </button>
      <button
        type="button"
        onClick={onDrama}
        className="rounded-full border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
      >
        Make It More Dramatic
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full px-5 py-2.5 text-sm font-semibold text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
      >
        Reset
      </button>
    </div>
  );
}
