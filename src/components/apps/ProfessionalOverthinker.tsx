"use client";

import { useEffect, useId, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";
import {
  computeAnxietyMeter,
  generateInterpretations,
  loadOverthinkHistory,
  type OverthinkHistoryEntry,
  type OverthinkTone,
  overthinkToneOptions,
  saveOverthinkHistory,
} from "@/lib/professionalOverthinker";

export function ProfessionalOverthinker() {
  const baseId = useId();
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<OverthinkTone>("fullAnxiety");
  const [results, setResults] = useState<string[]>([]);
  const [seed, setSeed] = useState(1);
  const [anxiety, setAnxiety] = useState(0);
  const [history, setHistory] = useState<OverthinkHistoryEntry[]>([]);
  const [copyFlash, setCopyFlash] = useState("");

  useEffect(() => {
    setHistory(loadOverthinkHistory());
  }, []);

  const runOverthink = () => {
    const t = input.trim();
    if (!t) return;
    const nextSeed = seed + t.length + Date.now();
    setSeed(nextSeed);
    const lines = generateInterpretations(t, tone, nextSeed);
    setResults(lines);
    setAnxiety(computeAnxietyMeter(t.length, tone));
  };

  const clearAll = () => {
    setInput("");
    setResults([]);
    setAnxiety(0);
  };

  const copyAll = async () => {
    if (results.length === 0) return;
    const block = results.map((r, i) => `${i + 1}. ${r}`).join("\n");
    try {
      await navigator.clipboard.writeText(block);
      setCopyFlash("Copied. Your clipboard now shares your chaos.");
      window.setTimeout(() => setCopyFlash(""), 2400);
    } catch {
      setCopyFlash("Clipboard unavailable — try selecting manually.");
    }
  };

  const saveToHistory = () => {
    const t = input.trim();
    if (!t || results.length === 0) return;
    const entry: OverthinkHistoryEntry = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `h-${Date.now()}`,
      at: new Date().toISOString(),
      message: t,
      tone,
      lines: [...results],
    };
    const next = [entry, ...history].slice(0, 12);
    setHistory(next);
    saveOverthinkHistory(next);
    setCopyFlash("Saved to history. Future you will thank/worry.");
    window.setTimeout(() => setCopyFlash(""), 2400);
  };

  return (
    <div className="relative pb-20 pt-2 sm:pb-24">
      <AppDetailHero
        title="Professional Overthinker"
        subtitle="Generates 10 dramatic interpretations of a simple message."
        decorations={
          <>
            <span className="absolute left-[6%] top-[10%] text-3xl motion-safe-float">🌀</span>
            <span className="absolute right-[8%] top-[18%] text-2xl motion-safe-wiggle">💭</span>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border-[3px] border-ink bg-blue-main/30 p-5 shadow-cartoon sm:p-8">
        <CartoonCard variant="cream" hoverLift={false}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display text-xs font-bold uppercase text-text-muted">
                Anxiety meter
              </p>
              <p className="font-display mt-1 text-4xl font-bold tabular-nums text-text-main">
                {results.length ? `${anxiety}%` : "—"}
              </p>
            </div>
            <div className="max-w-xs rounded-2xl border-[3px] border-ink bg-blue-main px-4 py-3 font-display text-xs font-bold text-text-main shadow-cartoon-sm">
              Analysis generated with absolutely no evidence.
            </div>
          </div>
        </CartoonCard>

        <CartoonCard variant="blue" hoverLift={false}>
          <label
            htmlFor={`${baseId}-msg`}
            className="font-display text-sm font-bold text-text-main"
          >
            Your suspiciously simple message
          </label>
          <textarea
            id={`${baseId}-msg`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder='Try: "Okay."'
            className="mt-3 w-full resize-y rounded-[22px] border-[3px] border-ink bg-bg-main px-4 py-3 font-semibold text-text-main shadow-cartoon-sm outline-none placeholder:text-text-muted/55 focus-visible:ring-2 focus-visible:ring-pink-main"
          />

          <fieldset className="mt-6">
            <legend className="font-display text-xs font-bold uppercase text-text-muted">
              Tone
            </legend>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {overthinkToneOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTone(opt.id)}
                  aria-pressed={tone === opt.id}
                  className={`rounded-full border-[3px] border-ink px-4 py-2 font-display text-xs font-bold shadow-cartoon-sm sm:text-sm ${
                    tone === opt.id
                      ? "bg-pink-main text-text-main"
                      : "bg-bg-cream text-text-main hover:bg-pink-soft/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={runOverthink}
              className="btn-cartoon rounded-full border-[3px] border-ink bg-pink-main px-8 py-3 font-display text-base font-bold text-text-main shadow-cartoon"
            >
              Overthink It
            </button>
            <button
              type="button"
              onClick={copyAll}
              disabled={results.length === 0}
              className="rounded-full border-[3px] border-ink bg-bg-cream px-6 py-3 font-display text-sm font-bold text-text-main shadow-cartoon-sm disabled:opacity-40"
            >
              Copy All
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-full border-[3px] border-ink bg-bg-main px-6 py-3 font-display text-sm font-bold text-text-muted shadow-cartoon-sm hover:text-text-main"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={saveToHistory}
              disabled={results.length === 0}
              className="rounded-full border-[3px] border-ink bg-tan px-6 py-3 font-display text-sm font-bold text-text-main shadow-cartoon-sm disabled:opacity-40"
            >
              Save to Overthinking History
            </button>
          </div>
          {copyFlash ? (
            <p className="mt-4 font-display text-sm font-bold text-blue-hover" role="status">
              {copyFlash}
            </p>
          ) : null}
        </CartoonCard>

        </div>

        {results.length > 0 ? (
          <div className="space-y-4">
            <h2 className="font-display text-center text-xl font-bold text-text-main">
              Interpretations (please hydrate responsibly)
            </h2>
            <ol className="space-y-3">
              {results.map((line, i) => (
                <li key={`${i}-${line.slice(0, 12)}`}>
                  <CartoonCard variant="salmon" hoverLift={false} className="!p-4 sm:!p-5">
                    <span className="font-display text-sm font-black text-text-muted/80">
                      {i + 1}.
                    </span>{" "}
                    <span className="font-semibold leading-relaxed text-text-main">{line}</span>
                  </CartoonCard>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <CartoonCard variant="cream" hoverLift={false}>
          <h3 className="font-display text-lg font-bold text-text-main">
            Overthinking history
          </h3>
          <p className="mt-2 text-sm font-semibold text-text-muted">
            Saved sessions stay on this device so your spirals can stay local.
          </p>
          {history.length === 0 ? (
            <p className="mt-4 font-semibold text-text-muted">Nothing archived yet.</p>
          ) : (
            <ul className="mt-5 space-y-4">
              {history.map((h) => (
                <li
                  key={h.id}
                  className="rounded-2xl border-[3px] border-ink bg-bg-main/90 p-4 shadow-cartoon-sm"
                >
                  <p className="font-display text-xs font-bold uppercase text-text-muted">
                    {new Date(h.at).toLocaleString()}
                  </p>
                  <p className="mt-2 font-bold text-text-main">&ldquo;{h.message}&rdquo;</p>
                  <p className="mt-1 text-xs font-semibold text-text-muted">
                    Tone:{" "}
                    {overthinkToneOptions.find((x) => x.id === h.tone)?.label ?? h.tone}
                  </p>
                  <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm font-semibold text-text-muted">
                    {h.lines.slice(0, 3).map((l, idx) => (
                      <li key={idx}>{l}</li>
                    ))}
                  </ol>
                  {h.lines.length > 3 ? (
                    <p className="mt-2 text-xs font-bold text-text-muted">
                      +{h.lines.length - 3} more…
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </CartoonCard>
      </div>
    </div>
  );
}
