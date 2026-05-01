"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  HOMEPAGE_CATEGORIES,
  SHOWCASE_APPS,
  type HomepageCategoryId,
  type ShowcaseApp,
  type ShowcasePastel,
} from "@/data/homepage";

const PASTEL_SURFACE: Record<ShowcasePastel, string> = {
  pink: "border-[#FFD0DC]/60 bg-gradient-to-br from-[#FFE5EC]/95 to-[#FFF0F5]/90",
  mint: "border-[#A8E8D0]/55 bg-gradient-to-br from-[#DDF8EA]/95 to-[#E8FBF3]/85",
  blue: "border-[#B8DFFB]/55 bg-gradient-to-br from-[#D7EEFF]/95 to-[#EAF6FF]/88",
  yellow: "border-[#FFE39A]/55 bg-gradient-to-br from-[#FFF4CC]/95 to-[#FFF8DE]/85",
  lavender: "border-[#D4CAF5]/55 bg-gradient-to-br from-[#EDE7FF]/95 to-[#F5F1FF]/88",
  peach: "border-[#FFCDB2]/55 bg-gradient-to-br from-[#FFE8DD]/95 to-[#FFF2EB]/85",
};

function filterApps(category: HomepageCategoryId): ShowcaseApp[] {
  if (category === "all") return SHOWCASE_APPS;
  return SHOWCASE_APPS.filter((a) => a.categories.includes(category));
}

export function HomeFeaturedSection() {
  const [active, setActive] = useState<HomepageCategoryId>("all");
  const visible = useMemo(() => filterApps(active), [active]);

  return (
    <section
      id="category-filter"
      className="scroll-mt-28 px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      aria-labelledby="filter-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-ua-border/60 bg-[#FFFDF8]/80 p-6 shadow-[var(--shadow-ua-soft-sm)] sm:p-8">
          <h2 id="filter-heading" className="sr-only">
            Filter apps by category
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {HOMEPAGE_CATEGORIES.map((c) => {
              const on = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(c.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5] ${
                    on
                      ? "border-ua-text/20 bg-ua-text text-[#FFFDF8] shadow-[var(--shadow-ua-soft-sm)]"
                      : "border-ua-border bg-ua-lavender/40 text-ua-text hover:-translate-y-0.5 hover:border-ua-coral/40 hover:bg-ua-mint/35"
                  }`}
                >
                  <span aria-hidden className="text-base leading-none">
                    {c.icon}
                  </span>
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="featured-apps"
          className="scroll-mt-28 mt-12"
          aria-label="Featured apps"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((app) => (
              <ShowcaseCard key={app.id} app={app} />
            ))}
          </div>
          {visible.length === 0 ? (
            <p className="mt-8 text-center text-ua-muted">
              Nothing here yet — try another chip, you curious legend.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({ app }: { app: ShowcaseApp }) {
  const surface = PASTEL_SURFACE[app.pastel];
  const inner = (
    <article
      className={`flex h-full flex-col rounded-[24px] border p-6 shadow-[var(--shadow-ua-soft-sm)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-ua-float)] ${surface}`}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/70 text-3xl shadow-[var(--shadow-ua-soft-sm)]">
        {appIcon(app.id)}
      </div>
      <h3 className="text-xl font-extrabold tracking-tight text-ua-text">
        {app.title}
      </h3>
      <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-ua-muted">
        {app.description}
      </p>
      <div className="mt-6">
        <span className="inline-flex rounded-full border border-ua-border/60 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ua-text">
          {app.tag}
        </span>
      </div>
      {app.href ? (
        <p className="mt-3 text-xs font-semibold text-ua-muted">
          Tap to open —{' '}
          <span className="text-ua-coral underline decoration-[#FFB7C5]/80">live mini app</span>
        </p>
      ) : (
        <p className="mt-3 text-xs font-semibold text-ua-muted opacity-85">
          Coming imaginatively soon ✦
        </p>
      )}
    </article>
  );

  if (app.href) {
    return (
      <Link
        href={app.href}
        className="group block rounded-[24px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB7C5]"
      >
        {inner}
      </Link>
    );
  }

  return <div className="rounded-[24px]">{inner}</div>;
}

function appIcon(id: ShowcaseApp["id"]) {
  const map: Record<string, string> = {
    monday: "📅",
    "button-clicker": "🖱️",
    microwave: "🎵",
    excuse: "🫠",
    "bread-weather": "🍞",
    "pixel-museum": "🖼️",
  };
  return map[id] ?? "✨";
}
