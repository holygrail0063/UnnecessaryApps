"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";
import {
  loadRocks,
  randomRock,
  rarestInCollection,
  saveRocks,
  type CollectedRock,
} from "@/lib/digitalRockCollection";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "A mysterious Tuesday";
  }
}

export function DigitalRockCollection() {
  const baseId = useId();
  const [rocks, setRocks] = useState<CollectedRock[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRocks(loadRocks());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveRocks(rocks);
  }, [rocks, mounted]);

  const findRock = () => {
    const base = randomRock(rocks.length + Date.now());
    const item: CollectedRock = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `r-${Date.now()}`,
      ...base,
      favorite: false,
    };
    setRocks((prev) => [item, ...prev]);
  };

  const toggleFavorite = (id: string) => {
    setRocks((prev) =>
      prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r)),
    );
  };

  const release = (id: string) => {
    setRocks((prev) => prev.filter((r) => r.id !== id));
  };

  const clearAll = () => setRocks([]);

  const favorites = useMemo(() => rocks.filter((r) => r.favorite).length, [rocks]);
  const rarest = useMemo(() => rarestInCollection(rocks), [rocks]);

  return (
    <div className="relative pb-20 pt-2 sm:pb-24">
      <AppDetailHero
        title="Digital Rock Collection"
        subtitle="Collect fake rocks with fake names and fake personalities."
        decorations={
          <>
            <span className="absolute right-[6%] top-[8%] text-3xl motion-safe-float">🪨</span>
            <span className="absolute left-[8%] top-[22%] text-2xl motion-safe-wiggle">🏛️</span>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <CartoonCard variant="cream" hoverLift={false} className="!p-4 text-center">
            <p className="font-display text-xs font-bold uppercase text-text-muted">Total rocks</p>
            <p className="font-display mt-2 text-3xl font-bold tabular-nums">{rocks.length}</p>
          </CartoonCard>
          <CartoonCard variant="salmon" hoverLift={false} className="!p-4 text-center">
            <p className="font-display text-xs font-bold uppercase text-text-main">Favorites</p>
            <p className="font-display mt-2 text-3xl font-bold tabular-nums">{favorites}</p>
          </CartoonCard>
          <CartoonCard variant="blue" hoverLift={false} className="!p-4 text-center">
            <p className="font-display text-xs font-bold uppercase text-text-main">
              Rarest found
            </p>
            <p className="mt-2 font-display text-sm font-bold leading-snug text-text-main">
              {rarest ?? "—"}
            </p>
          </CartoonCard>
          <CartoonCard variant="tan" hoverLift={false} className="!p-4 text-center">
            <p className="font-display text-xs font-bold uppercase text-text-main">
              Collection worth
            </p>
            <p className="font-display mt-2 text-lg font-bold text-text-main">
              $0.00 emotionally
            </p>
          </CartoonCard>
        </div>

        <CartoonCard variant="pink" hoverLift={false} className="text-center">
          <button
            id={`${baseId}-find`}
            type="button"
            onClick={findRock}
            className="btn-cartoon inline-flex min-h-[52px] items-center justify-center rounded-full border-[3px] border-ink bg-blue-main px-10 py-3 font-display text-lg font-bold text-text-main shadow-cartoon"
          >
            Find a Rock
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={rocks.length === 0}
            className="mt-4 block w-full rounded-full border-[3px] border-ink bg-bg-main py-2.5 font-display text-sm font-bold text-text-muted hover:bg-pink-soft/40 hover:text-text-main disabled:opacity-40 sm:mx-auto sm:inline-block sm:w-auto sm:px-8"
          >
            Clear Collection
          </button>
        </CartoonCard>

        {rocks.length === 0 ? (
          <CartoonCard variant="cream" hoverLift={false}>
            <p className="text-center font-display text-lg font-bold text-text-main">
              No rocks yet. Nature is waiting to disappoint you digitally.
            </p>
          </CartoonCard>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {rocks.map((rock) => (
              <li key={rock.id}>
                <article className="flex h-full flex-col rounded-[22px] border-[3px] border-ink bg-bg-cream p-5 shadow-cartoon">
                  <div className="flex items-start justify-between gap-2 border-b-[3px] border-dashed border-ink/25 pb-3">
                    <span className="font-display text-[10px] font-black uppercase tracking-wider text-text-muted">
                      Specimen
                    </span>
                    <span className="text-2xl" aria-hidden>
                      🪨
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-text-main">{rock.name}</h3>
                  <p className="mt-2 font-display text-sm font-bold text-blue-hover">{rock.type}</p>
                  <p className="mt-3 inline-flex w-fit rounded-full border-[2px] border-ink bg-pink-soft px-3 py-1 font-display text-xs font-black uppercase text-text-main">
                    {rock.rarity}
                  </p>
                  <p className="mt-4 text-sm font-semibold italic leading-relaxed text-text-muted">
                    Personality: {rock.personality}
                  </p>
                  <p className="mt-3 rounded-xl border-[2px] border-ink/20 bg-bg-main p-3 text-sm font-semibold text-text-main">
                    <span className="font-display text-xs font-bold uppercase text-text-muted">
                      Unnecessary fact:{" "}
                    </span>
                    {rock.fact}
                  </p>
                  <p className="mt-4 font-display text-xs font-bold text-text-muted">
                    Collected {formatDate(rock.collectedAt)}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(rock.id)}
                      className={`rounded-full border-[3px] border-ink px-4 py-2 font-display text-xs font-bold shadow-cartoon-sm ${
                        rock.favorite
                          ? "bg-pink-main text-text-main"
                          : "bg-bg-main text-text-main hover:bg-tan/60"
                      }`}
                    >
                      {rock.favorite ? "★ Favorited" : "Favorite"}
                    </button>
                    <button
                      type="button"
                      onClick={() => release(rock.id)}
                      className="rounded-full border-[3px] border-ink bg-bg-main px-4 py-2 font-display text-xs font-bold text-text-muted shadow-cartoon-sm hover:bg-pink-soft/50 hover:text-text-main"
                    >
                      Release Into Nature
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
