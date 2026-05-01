import { HOMEPAGE_STATS } from "@/data/homepage";

export function StatsStrip() {
  return (
    <section
      className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="stats-heading" className="sr-only">
          Highlights
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {HOMEPAGE_STATS.map((s) => (
            <article
              key={s.label}
              className="rounded-[28px] border border-ua-border/70 bg-gradient-to-br from-[#F1EDFF]/90 via-[#FFFDF8]/80 to-[#EAF6FF]/70 p-6 text-center shadow-[var(--shadow-ua-soft-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-ua-float)] sm:p-8"
            >
              <span className="text-4xl" aria-hidden>
                {s.icon}
              </span>
              <p className="mt-4 font-mono text-4xl font-extrabold tabular-nums text-ua-text sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-3 text-[15px] font-bold uppercase tracking-wide text-ua-muted">
                {s.label}
              </p>
              <p className="mt-2 text-sm font-medium text-ua-text/90">{s.subtext}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
