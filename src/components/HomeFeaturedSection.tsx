"use client";

import Link from "next/link";
import {
  SHOWCASE_APPS,
  type CartoonCardBg,
  type ShowcaseApp,
} from "@/data/homepage";

const CARD_SHELL: Record<CartoonCardBg, string> = {
  cream: "bg-bg-cream",
  softPink: "bg-pink-soft",
  salmon: "bg-pink-main",
  blue: "bg-blue-main",
  tan: "bg-tan",
};

export function HomeFeaturedSection() {
  return (
    <section
      id="featured-apps"
      className="scroll-mt-28 bg-bg-main px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      aria-label="Featured apps"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display mb-2 text-center text-2xl font-bold text-text-main sm:text-3xl">
          Today’s silly specials
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-center font-semibold text-text-muted">
          The full collection in one place. Thick borders included at no extra charge.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWCASE_APPS.map((app) => (
            <ShowcaseCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({ app }: { app: ShowcaseApp }) {
  const shell = CARD_SHELL[app.cardBg];
  const storefront = app.storefrontCard === true;
  const inner = (
    <article
      className={`flex h-full flex-col rounded-[24px] border-[3px] border-ink p-6 shadow-cartoon transition duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-cartoon-hover ${shell} ${
        storefront ? "group-hover:-rotate-[0.35deg]" : ""
      }`}
    >
      <div className="mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border-[3px] border-ink bg-bg-cream text-4xl shadow-cartoon-sm">
        {appIcon(app.id)}
      </div>
      <h3 className="font-display text-xl font-bold text-text-main">{app.title}</h3>
      <div className="mt-3 flex-1 space-y-2 text-sm font-semibold leading-relaxed text-text-muted">
        <p>{app.description}</p>
        {app.secondaryDescription ? <p>{app.secondaryDescription}</p> : null}
      </div>
      <div className="mt-5">
        <span className="inline-flex rounded-full border-[3px] border-ink bg-bg-cream px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm">
          {app.tag}
        </span>
      </div>
      {app.href ? (
        app.footerOverride ? (
          <p className="mt-3 text-xs font-bold text-text-muted">{app.footerOverride}</p>
        ) : (
          <p className="mt-3 text-xs font-bold text-text-muted">
            Live mini app —{" "}
            <span className="text-blue-hover underline decoration-2">open the silliness</span>
          </p>
        )
      ) : (
        <p className="mt-3 text-xs font-bold text-text-muted">Brewing soon in our silly kitchen.</p>
      )}
    </article>
  );

  if (app.href) {
    return (
      <Link
        href={app.href}
        className={`group block rounded-[24px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${storefront ? "motion-safe:transition-transform" : ""}`}
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
    microwave: "⏲️",
    excuse: "🫠",
    "bread-weather": "🍞",
    "pixel-museum": "🖼️",
    "bubble-wrap-busting": "🫧",
  };
  return map[id] ?? "✨";
}
