"use client";

import Link from "next/link";
import { COMING_SOON_IDEAS } from "@/data/comingSoonIdeas";

export function HomeComingSoonSection() {
  return (
    <section
      id="coming-soon"
      className="scroll-mt-28 border-t-[4px] border-ink bg-blue-main px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      aria-labelledby="coming-soon-heading"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center lg:mb-12">
          <h2
            id="coming-soon-heading"
            className="font-display text-2xl font-bold leading-tight text-text-main sm:text-3xl lg:text-[2rem]"
          >
            Coming Soon to Waste Your Time
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-display text-base font-bold text-bg-cream/95 sm:text-lg">
            Freshly approved by absolutely no productivity expert.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMING_SOON_IDEAS.map((idea) => (
            <ComingSoonCard key={idea.id} idea={idea} />
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:mt-14">
          <Link
            href="/contact"
            className="btn-cartoon inline-flex min-h-[54px] items-center justify-center rounded-full border-[3px] border-ink bg-pink-main px-8 py-3 font-display text-base font-bold text-text-main shadow-cartoon transition hover:bg-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Suggest an Even Worse App
          </Link>
        </div>
      </div>
    </section>
  );
}

function ComingSoonCard({ idea }: { idea: (typeof COMING_SOON_IDEAS)[number] }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[24px] border-[4px] border-ink bg-bg-cream p-5 shadow-cartoon transition duration-200 motion-safe:hover:-translate-x-1 motion-safe:hover:-translate-y-1 motion-safe:hover:-rotate-[0.65deg] motion-safe:hover:shadow-cartoon-hover sm:p-6">
      <span
        className="pointer-events-none absolute -right-1 -top-2 z-10 rotate-[8deg] rounded-full border-[3px] border-ink bg-pink-main px-2.5 py-1 font-display text-[10px] font-black uppercase tracking-wide text-text-main shadow-cartoon-sm sm:text-[11px]"
        aria-hidden
      >
        COMING SOON
      </span>

      <div className="mb-4 flex items-start justify-between gap-3 pr-14">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border-[3px] border-ink bg-bg-main text-3xl shadow-cartoon-sm">
          <span aria-hidden>{idea.emoji}</span>
        </div>
      </div>

      <h3 className="font-display text-lg font-bold leading-snug text-text-main sm:text-xl">
        {idea.title}
      </h3>
      <p className="mt-3 flex-1 text-sm font-semibold leading-relaxed text-text-muted">
        {idea.description}
      </p>
      <p className="mt-4 rounded-xl border-[2px] border-dashed border-ink/30 bg-pink-soft/50 px-3 py-2 font-display text-xs font-bold italic leading-snug text-text-main">
        Why it&apos;s unnecessary: {idea.whyUnnecessary}
      </p>

      <div className="mt-5">
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-full border-[3px] border-ink bg-bg-main/90 px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-text-muted shadow-cartoon-sm transition group-hover:border-ink group-hover:bg-tan/80 group-hover:text-text-main"
        >
          <span className="group-hover:hidden">Not Ready Yet</span>
          <span className="hidden group-hover:inline">Still Pointless</span>
        </button>
      </div>
    </article>
  );
}
