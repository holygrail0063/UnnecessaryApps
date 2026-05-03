import { HOMEPAGE_STATS } from "@/data/homepage";

export function StatsStrip() {
  return (
    <section
      className="border-y-[3px] border-ink bg-pink-soft/50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="stats-heading" className="sr-only">
          Shop stats
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {HOMEPAGE_STATS.map((s) => (
            <article
              key={s.label}
              className="rounded-[24px] border-[3px] border-ink bg-bg-cream p-6 text-center shadow-cartoon transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-cartoon-hover sm:p-8"
            >
              <span className="text-4xl" aria-hidden>
                {s.icon}
              </span>
              <p className="font-display mt-4 text-4xl font-bold tabular-nums text-text-main sm:text-5xl">
                {s.value}
              </p>
              <p className="font-display mt-2 text-sm font-bold uppercase tracking-wide text-text-muted">
                {s.label}
              </p>
              <p className="mt-2 font-semibold text-text-main">{s.subtext}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
