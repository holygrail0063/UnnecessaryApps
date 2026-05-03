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
          placeholder="you@email.com"
          autoComplete="email"
          className="min-h-[52px] w-full flex-1 rounded-2xl border-[3px] border-ink bg-bg-cream px-4 font-semibold text-text-main placeholder:text-text-muted/70 shadow-cartoon-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-blue-accent"
          required={false}
        />
        <button
          type="submit"
          className="btn-cartoon min-h-[52px] shrink-0 rounded-2xl border-[3px] border-ink bg-pink-main px-6 font-display text-sm font-bold text-text-main shadow-cartoon hover:bg-pink-hover"
        >
          Subscribe
        </button>
      </div>
      {done ? (
        <p className="font-display text-sm font-bold text-text-main" role="status">
          Nice. Another inbox gently haunted.
        </p>
      ) : null}
      <p className="text-xs font-semibold leading-relaxed text-text-main/85">
        You can unsubscribe when you realize emails are also unnecessary.
      </p>
    </form>
  );
}
