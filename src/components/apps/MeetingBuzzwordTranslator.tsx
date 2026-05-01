"use client";

import { useCallback, useId, useRef, useState } from "react";
import {
  type BuzzwordIntensity,
  synthesizeBuzzword,
  makeTranslationMeta,
  type TranslationMeta,
} from "@/lib/meetingBuzzwordTranslator";

const EXAMPLE_CHIPS = [
  "I forgot to send the email.",
  "Can we meet tomorrow?",
  "This is not working.",
  "I need more time.",
  "I have no idea.",
  "Let’s talk later.",
  "We are behind schedule.",
  "I made a mistake.",
] as const;

const INTENSITY_SEGMENTS: { id: BuzzwordIntensity; label: string }[] = [
  { id: "mild", label: "Mildly Corporate" },
  { id: "peak", label: "Peak LinkedIn" },
  { id: "executive", label: "Executive Nonsense" },
];

export function MeetingBuzzwordTranslator() {
  const ids = useId();
  const [input, setInput] = useState("");
  const [intensity, setIntensity] = useState<BuzzwordIntensity>("peak");
  const [output, setOutput] = useState("");
  const [meta, setMeta] = useState<TranslationMeta | null>(null);
  const [error, setError] = useState("");
  const [copyNote, setCopyNote] = useState("");
  const shuffleRef = useRef(1);

  const runTranslate = useCallback(
    (text: string, mode: "fresh" | "reroll") => {
      const t = text.trim();
      if (!t) {
        setError(
          "Please enter a sentence first. Even nonsense needs source material.",
        );
        setOutput("");
        setMeta(null);
        return;
      }
      setError("");
      shuffleRef.current +=
        mode === "reroll"
          ? Math.floor(Math.random() * 90) + 3
          : Math.floor(Math.random() * 50) + 1;
      const sh = shuffleRef.current;
      setOutput(synthesizeBuzzword(text, intensity, sh));
      setMeta(makeTranslationMeta(intensity));
    },
    [intensity],
  );

  const onSynergize = () => {
    runTranslate(input, "fresh");
  };

  const onAnother = () => {
    runTranslate(input, "reroll");
  };

  const onClear = () => {
    setInput("");
    setOutput("");
    setMeta(null);
    setError("");
    setCopyNote("");
  };

  const onCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopyNote("Copied to clipboard. Unfortunately.");
    window.setTimeout(() => setCopyNote(""), 2600);
  };

  const onChip = (chip: string) => {
    setInput(chip);
    setError("");
    shuffleRef.current += chip.length + 19;
    runTranslate(chip, "fresh");
  };

  return (
    <div className="border-b border-zinc-200/60 bg-[#FAFAF8] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Turn normal sentences into corporate nonsense.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
          Paste a normal thought, update, excuse, or message. We’ll turn it into
          something that sounds like it came from a 47-slide strategy deck.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-lg shadow-zinc-900/[0.06] transition hover:shadow-xl sm:p-8">
          <fieldset className="text-left">
            <legend className="sr-only">Buzzword intensity</legend>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Buzzword intensity
            </p>
            <div
              role="radiogroup"
              aria-label="Buzzword intensity"
              className="mt-3 flex flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-zinc-200 sm:bg-[#FAFAF8] sm:p-1"
            >
              {INTENSITY_SEGMENTS.map((seg) => {
                const active = intensity === seg.id;
                return (
                  <button
                    key={seg.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setIntensity(seg.id)}
                    className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                      active
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "bg-white text-zinc-700 shadow-sm hover:bg-zinc-50 sm:bg-transparent sm:shadow-none"
                    }`}
                  >
                    {seg.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 text-left">
            <label
              htmlFor={`${ids}-in`}
              className="block text-sm font-semibold text-zinc-800"
            >
              Plain English
            </label>
            <textarea
              id={`${ids}-in`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              placeholder="Example: I need more time to finish this."
              className="mt-2 w-full resize-y rounded-2xl border border-zinc-200 bg-[#FAFAF8]/60 px-4 py-3 text-sm leading-relaxed text-zinc-900 shadow-inner placeholder:text-zinc-400 focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/40"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {EXAMPLE_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-left text-xs font-medium text-violet-900 transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:text-[13px]"
                onClick={() => onChip(chip)}
              >
                {chip.replace(/\.$/, "")}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onSynergize}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              Synergize My Sentence
            </button>
            <button
              type="button"
              onClick={onAnother}
              disabled={!input.trim()}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              Generate Another Version
            </button>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center justify-center rounded-full border border-transparent px-3 py-2 text-sm font-semibold text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              Clear
            </button>
          </div>

          {error ? (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-8 border-t border-dashed border-zinc-200 pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-800">
                  Corporate Translation
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Copy with confidence. Accountability not included.
                </p>
              </div>
              <button
                type="button"
                onClick={onCopy}
                disabled={!output}
                className="inline-flex self-start rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:self-auto"
              >
                Copy
              </button>
            </div>

            <div
              aria-live="polite"
              className="mt-4 min-h-[120px] rounded-2xl border border-zinc-200 bg-[#FAFAF8] px-4 py-4 text-left text-sm leading-relaxed text-zinc-700"
            >
              {output ? (
                output
              ) : (
                <span className="text-zinc-400">
                  Your buzzword masterpiece will appear here.
                </span>
              )}
            </div>

            {copyNote ? (
              <p className="mt-2 text-sm text-violet-700">{copyNote}</p>
            ) : null}

            {meta ? (
              <dl className="mt-6 grid gap-3 rounded-2xl border border-zinc-100 bg-white px-4 py-4 text-left text-xs text-zinc-600 sm:grid-cols-2">
                <div className="flex justify-between gap-2 sm:flex-col">
                  <dt className="font-semibold text-zinc-500">
                    Buzzword Density
                  </dt>
                  <dd className="font-medium text-zinc-900">{meta.buzzwordDensity}%</dd>
                </div>
                <div className="flex justify-between gap-2 sm:flex-col">
                  <dt className="font-semibold text-zinc-500">Clarity Lost</dt>
                  <dd className="font-medium text-zinc-900">{meta.clarityLost}</dd>
                </div>
                <div className="flex justify-between gap-2 sm:flex-col">
                  <dt className="font-semibold text-zinc-500">
                    Meetings Created
                  </dt>
                  <dd className="font-medium text-zinc-900">{meta.meetingsCreated}</dd>
                </div>
                <div className="flex justify-between gap-2 sm:flex-col">
                  <dt className="font-semibold text-zinc-500">
                    Actual Meaning Preserved
                  </dt>
                  <dd className="font-medium text-zinc-900">{meta.meaningPreserved}</dd>
                </div>
              </dl>
            ) : null}
          </div>
        </div>

        <section className="mt-12 rounded-2xl border border-zinc-200 bg-white px-6 py-8 shadow-md shadow-zinc-900/[0.04] transition hover:-translate-y-0.5 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-zinc-900">
            How does this unnecessary technology work?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            We take your normal sentence, remove most of the clarity, add strategic
            alignment, sprinkle in stakeholder visibility, and return something your
            manager might accidentally approve.
          </p>
          <ol className="mt-6 space-y-3 text-sm font-medium text-zinc-700">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[11px] font-bold text-white">
                1
              </span>
              You type something normal.
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[11px] font-bold text-white">
                2
              </span>
              We aggressively synergize it.
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[11px] font-bold text-white">
                3
              </span>
              You sound promoted.
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
}
