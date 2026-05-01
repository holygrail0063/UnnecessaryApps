"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-6 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      noValidate
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email for pointless updates
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          className="min-h-[52px] w-full flex-1 rounded-2xl border border-ua-border bg-[#FFFDF8]/95 px-4 text-sm font-medium text-ua-text placeholder:text-ua-muted/70 shadow-inner ring-ua-coral focus:border-ua-coral/60 focus:outline-none focus:ring-2 focus:ring-ua-mint/50"
          required={false}
        />
        <button
          type="submit"
          className="min-h-[52px] shrink-0 rounded-2xl bg-ua-coral px-6 text-sm font-bold text-ua-text shadow-[0_8px_24px_-10px_rgba(255,154,162,0.75)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5]"
        >
          Subscribe
        </button>
      </div>
      {done ? (
        <p className="text-sm font-semibold text-ua-text" role="status">
          Thanks! That was entirely optional. We love that for you.
        </p>
      ) : null}
      <p className="text-xs font-medium leading-relaxed text-ua-muted">
        You can unsubscribe when you realize emails are also unnecessary.
      </p>
    </form>
  );
}
