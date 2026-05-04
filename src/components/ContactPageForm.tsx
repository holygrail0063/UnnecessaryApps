"use client";

import { useId, useState } from "react";
import Link from "next/link";

const MESSAGE_TYPES = [
  "General Message",
  "App Idea",
  "Bug Report",
  "Pointless Praise",
  "Mild Complaint",
] as const;

export function ContactPageForm() {
  const formId = useId();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-2xl border-[3px] border-ink bg-pink-soft px-5 py-6 text-center shadow-cartoon-sm"
      >
        <p className="font-display text-lg font-bold text-text-main">
          Message received. Our imaginary department is reviewing it immediately.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-cartoon mt-6 inline-flex rounded-full border-[3px] border-ink bg-bg-cream px-5 py-2.5 font-display text-sm font-bold text-text-main shadow-cartoon-sm hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Send another pointless message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[22px] border-[4px] border-ink bg-bg-main/80 p-5 shadow-cartoon-sm sm:p-6"
    >
      <div>
        <label
          htmlFor={`${formId}-name`}
          className="font-display text-sm font-bold uppercase tracking-wide text-text-main"
        >
          Name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-2 w-full rounded-xl border-[3px] border-ink bg-bg-cream px-4 py-3 font-semibold text-text-main shadow-cartoon-sm outline-none transition placeholder:text-text-muted/60 focus-visible:ring-2 focus-visible:ring-ink"
          placeholder="Your name (or secret alias)"
        />
      </div>
      <div>
        <label
          htmlFor={`${formId}-email`}
          className="font-display text-sm font-bold uppercase tracking-wide text-text-main"
        >
          Email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-xl border-[3px] border-ink bg-bg-cream px-4 py-3 font-semibold text-text-main shadow-cartoon-sm outline-none transition placeholder:text-text-muted/60 focus-visible:ring-2 focus-visible:ring-ink"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor={`${formId}-type`}
          className="font-display text-sm font-bold uppercase tracking-wide text-text-main"
        >
          Message type
        </label>
        <select
          id={`${formId}-type`}
          name="type"
          required
          className="mt-2 w-full rounded-xl border-[3px] border-ink bg-bg-cream px-4 py-3 font-semibold text-text-main shadow-cartoon-sm outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          {MESSAGE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor={`${formId}-message`}
          className="font-display text-sm font-bold uppercase tracking-wide text-text-main"
        >
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y rounded-xl border-[3px] border-ink bg-bg-cream px-4 py-3 font-semibold text-text-main shadow-cartoon-sm outline-none transition placeholder:text-text-muted/60 focus-visible:ring-2 focus-visible:ring-ink"
          placeholder="Type something brilliantly unnecessary…"
        />
      </div>
      <button
        type="submit"
        className="btn-cartoon w-full rounded-full border-[3px] border-ink bg-pink-main px-6 py-3.5 font-display text-base font-bold text-text-main shadow-cartoon transition hover:bg-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-auto"
      >
        Send Pointless Message
      </button>
      <p className="font-display text-xs font-bold text-text-muted">
        This form is frontend-only for now — nothing is stored on a server. It’s mostly vibes and
        immediate emotional closure.
      </p>
      <p className="font-display text-sm font-semibold text-text-muted">
        Prefer legalese? See{" "}
        <Link
          href="/privacy"
          className="font-bold text-blue-hover underline decoration-2 underline-offset-2"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
