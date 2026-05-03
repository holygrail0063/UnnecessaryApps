"use client";

import { useCallback, useMemo, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";

const CONDITIONS = [
  "Crispy",
  "Soggy",
  "Slightly Chewy",
  "Toast-Recommended",
  "Mysteriously Yeasty",
  "Butter-Optimal",
] as const;

const ADVISORIES = [
  "Carry an umbrella. Your baguette might get dramatic.",
  "High crumb turbulence near lunch o’clock.",
  "Ciabatta corridor showing mild attitude.",
  "Sourdough behaving suspiciously confident.",
  "Pumpernickel holding steady. Nobody asked.",
];

const REGIONAL = [
  "West Coast: artisan air pressure rising.",
  "Midwest: polite crusts, aggressive chew.",
  "Northeast: bagels asserting dominance.",
  "South: biscuits filing a friendly complaint.",
];

const BREAD_PICKS = [
  "A humble slice of toast. Classic.",
  "Croissant if you’re feeling European today.",
  "English muffin — peak breakfast vulnerability.",
  "Whatever’s left on the counter. You’re brave.",
];

function rollStat(seed: number, max: number) {
  return ((seed * 7919 + 42) % max) + 1;
}

export function BreadWeather() {
  const [seed, setSeed] = useState(() => Date.now());
  const forecast = CONDITIONS[seed % CONDITIONS.length]!;
  const advisory = ADVISORIES[seed % ADVISORIES.length]!;
  const regional = REGIONAL[seed % REGIONAL.length]!;
  const bestPick = BREAD_PICKS[seed % BREAD_PICKS.length]!;

  const stats = useMemo(
    () => ({
      baguetteHumidity: rollStat(seed, 94) + 6,
      toastability: rollStat(seed + 1, 85) + 10,
      butterRetention: rollStat(seed + 2, 72) + 18,
      croissantRisk: ["Low", "Medium", "Elevated", "Concerning"][
        seed % 4
      ] as string,
    }),
    [seed],
  );

  const generate = useCallback(() => {
    setSeed(Date.now() + Math.floor(Math.random() * 99999));
  }, []);

  return (
    <div className="relative pb-16 pt-2 sm:pb-20">
      <AppDetailHero
        title="Bread Weather"
        subtitle="Because your loaf deserves meteorological accuracy."
        decorations={
          <>
            <span className="absolute right-[6%] top-[6%] text-3xl motion-safe-float">🍞</span>
            <span className="absolute left-[8%] top-[20%] text-2xl motion-safe-wiggle">☀</span>
            <span className="absolute bottom-[20%] right-[12%] font-display text-xl text-text-main">
              →
            </span>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <CartoonCard variant="cream">
          <p className="font-display text-xs font-bold uppercase tracking-wide text-text-muted">
            Current bread forecast
          </p>
          <p className="font-display mt-3 text-4xl font-bold text-text-main sm:text-5xl">{forecast}</p>
          <p className="mt-4 font-semibold text-text-muted">
            Scientifically selected using vibes, crumbs, and zero meteorology degrees.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-[3px] border-ink bg-tan/90 p-4 shadow-cartoon-sm">
              <p className="font-display text-xs font-bold uppercase text-text-main">
                Humidity for baguettes
              </p>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums text-text-main">
                {stats.baguetteHumidity}%
              </p>
            </div>
            <div className="rounded-2xl border-[3px] border-ink bg-pink-soft p-4 shadow-cartoon-sm">
              <p className="font-display text-xs font-bold uppercase text-text-main">
                Toastability Index
              </p>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums text-text-main">
                {stats.toastability}
              </p>
            </div>
            <div className="rounded-2xl border-[3px] border-ink bg-blue-main p-4 shadow-cartoon-sm">
              <p className="font-display text-xs font-bold uppercase text-text-main">
                Butter Retention Score
              </p>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums text-text-main">
                {stats.butterRetention}
              </p>
            </div>
            <div className="rounded-2xl border-[3px] border-ink bg-bg-main p-4 shadow-cartoon-sm">
              <p className="font-display text-xs font-bold uppercase text-text-main">
                Croissant Risk Level
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-text-main">
                {stats.croissantRisk}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={generate}
            className="btn-cartoon mt-10 w-full rounded-full border-[3px] border-ink bg-pink-main px-8 py-4 font-display text-lg font-bold text-text-main shadow-cartoon hover:bg-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-auto"
          >
            Generate Forecast
          </button>
          <p className="mt-3 font-display text-[11px] font-bold uppercase tracking-wide text-text-muted">
            NO RADAR · JUST RYE ATTITUDE
          </p>
        </CartoonCard>

        <div className="grid gap-6 md:grid-cols-3">
          <CartoonCard variant="tan" className="md:col-span-1">
            <h2 className="font-display text-lg font-bold text-text-main">Today’s Bread Advisory</h2>
            <p className="mt-3 font-semibold leading-relaxed text-text-muted">{advisory}</p>
          </CartoonCard>
          <CartoonCard variant="pink">
            <h2 className="font-display text-lg font-bold text-text-main">Regional Crumb Conditions</h2>
            <p className="mt-3 font-semibold leading-relaxed text-text-muted">{regional}</p>
          </CartoonCard>
          <CartoonCard variant="blue">
            <h2 className="font-display text-lg font-bold text-text-main">Best bread choice today</h2>
            <p className="mt-3 font-semibold leading-relaxed text-text-muted">{bestPick}</p>
          </CartoonCard>
        </div>
      </div>
    </div>
  );
}
