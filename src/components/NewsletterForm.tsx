"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    if (!email) {
      setError("Enter an email so we know where to send the pointless updates.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not subscribe right now. Try again?");
        return;
      }
      setDone(true);
      form.reset();
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mt-6 space-y-4">
        <p className="font-display text-sm font-bold text-text-main" role="status">
          Nice. Another inbox gently haunted.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="font-display text-sm font-bold text-blue-hover underline decoration-2 underline-offset-2 hover:text-text-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Subscribe a different email
        </button>
        <p className="text-xs font-semibold leading-relaxed text-text-main/85">
          You can unsubscribe when you realize emails are also unnecessary.
        </p>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-3" onSubmit={handleSubmit} noValidate>
      {error ? (
        <p
          className="rounded-xl border-[3px] border-ink bg-pink-main/50 px-4 py-3 font-display text-sm font-bold text-text-main"
          role="alert"
        >
          {error}
        </p>
      ) : null}
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
          required
          disabled={loading}
          className="min-h-[52px] w-full flex-1 rounded-2xl border-[3px] border-ink bg-bg-cream px-4 font-semibold text-text-main placeholder:text-text-muted/70 shadow-cartoon-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-blue-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-cartoon min-h-[52px] shrink-0 rounded-2xl border-[3px] border-ink bg-pink-main px-6 font-display text-sm font-bold text-text-main shadow-cartoon hover:bg-pink-hover disabled:opacity-60"
        >
          {loading ? "Sending…" : "Subscribe"}
        </button>
      </div>
      <p className="text-xs font-semibold leading-relaxed text-text-main/85">
        You can unsubscribe when you realize emails are also unnecessary.
      </p>
    </form>
  );
}
