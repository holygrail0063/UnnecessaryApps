"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  SHOWCASE_APPS,
  type CartoonCardBg,
  type ShopCategoryId,
  type ShowcaseApp,
} from "@/data/homepage";
import { useShopCategory } from "@/components/shop/ShopCategoryContext";

const CARD_SHELL: Record<CartoonCardBg, string> = {
  cream: "bg-bg-cream",
  softPink: "bg-pink-soft",
  salmon: "bg-pink-main",
  blue: "bg-blue-main",
  tan: "bg-tan",
};

function filterApps(category: ShopCategoryId): ShowcaseApp[] {
  if (category === "all") return SHOWCASE_APPS;
  return SHOWCASE_APPS.filter((a) => a.categories.includes(category));
}

export function HomeFeaturedSection() {
  const { category } = useShopCategory();
  const visible = useMemo(() => filterApps(category), [category]);

  return (
    <section
      className="scroll-mt-24 bg-bg-main px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      aria-label="Featured apps"
    >
      <div className="mx-auto max-w-6xl">
        <div
          id="featured-apps"
          className="scroll-mt-24"
        >
          <h2 className="font-display mb-2 text-center text-2xl font-bold text-text-main sm:text-3xl">
            Today’s silly specials
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center font-semibold text-text-muted">
            Tap a category up top, then pick your poison. Thick borders included at no extra charge.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((app) => (
              <ShowcaseCard key={app.id} app={app} />
            ))}
          </div>
          {visible.length === 0 ? (
            <p className="mt-10 text-center font-display font-bold text-text-muted">
              Nothing in this aisle — try another tab, legend.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({ app }: { app: ShowcaseApp }) {
  const shell = CARD_SHELL[app.cardBg];
  const inner = (
    <article
      className={`flex h-full flex-col rounded-[24px] border-[3px] border-ink p-6 shadow-cartoon transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-cartoon-hover ${shell}`}
    >
      <div className="mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border-[3px] border-ink bg-bg-cream text-4xl shadow-cartoon-sm">
        {appIcon(app.id)}
      </div>
      <h3 className="font-display text-xl font-bold text-text-main">{app.title}</h3>
      <p className="mt-3 flex-1 text-sm font-semibold leading-relaxed text-text-muted">
        {app.description}
      </p>
      <div className="mt-5">
        <span className="inline-flex rounded-full border-[3px] border-ink bg-bg-cream px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm">
          {app.tag}
        </span>
      </div>
      {app.href ? (
        <p className="mt-3 text-xs font-bold text-text-muted">
          Live mini app —{" "}
          <span className="text-blue-hover underline decoration-2">open the silliness</span>
        </p>
      ) : (
        <p className="mt-3 text-xs font-bold text-text-muted">Brewing soon in our silly kitchen.</p>
      )}
    </article>
  );

  if (app.href) {
    return (
      <Link
        href={app.href}
        className="group block rounded-[24px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
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
