"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";
import {
  type DifficultyId,
  type FoundRockEntry,
  type LifetimeStats,
  DIFFICULTY_CONFIG,
  clueForTile,
  geologicalConfidenceLabel,
  loadFoundRocks,
  loadLifetimeStats,
  randomRockProfile,
  saveFoundRocks,
  saveLifetimeStats,
} from "@/lib/rockSweeper";

export type CellState =
  | "covered"
  | { type: "clue"; text: string }
  | { type: "rock" };

function makeEmptyGrid(size: number): CellState[] {
  return Array.from({ length: size * size }, () => "covered" as const);
}

function newGameState(diff: DifficultyId) {
  const g = DIFFICULTY_CONFIG[diff].grid;
  const n = g * g;
  return {
    difficulty: diff,
    gameSeed: Date.now() ^ Math.floor(Math.random() * 0xfffffff),
    rockIndex: Math.floor(Math.random() * n),
    cells: makeEmptyGrid(g) as CellState[],
  };
}

/** Fixed first paint for SSR + hydration (random board applied in useEffect). */
function deterministicPlaceholder(diff: DifficultyId = "quarry") {
  const g = DIFFICULTY_CONFIG[diff].grid;
  const n = g * g;
  return {
    difficulty: diff,
    gameSeed: 20260206,
    rockIndex: Math.min(7, n - 1),
    cells: makeEmptyGrid(g) as CellState[],
  };
}

const INIT = deterministicPlaceholder("quarry");

export function RockSweeper() {
  const groupId = useId();
  const [difficulty, setDifficulty] = useState<DifficultyId>(INIT.difficulty);
  const [gameSeed, setGameSeed] = useState(INIT.gameSeed);
  const [rockIndex, setRockIndex] = useState(INIT.rockIndex);
  const [cells, setCells] = useState<CellState[]>(INIT.cells);
  const [gameWon, setGameWon] = useState(false);
  const [currentDigs, setCurrentDigs] = useState(0);
  const [lifetime, setLifetime] = useState<LifetimeStats>(() => ({
    dirtDisturbed: 0,
    rocksFound: 0,
    bestDigs: { casual: null, quarry: null, excavation: null },
  }));
  const [collection, setCollection] = useState<FoundRockEntry[]>([]);
  const [winShake, setWinShake] = useState(false);
  const [geoLabel, setGeoLabel] = useState<string>("Dig to estimate");
  const [winResult, setWinResult] = useState<{
    profile: ReturnType<typeof randomRockProfile>;
    confidence: string;
  } | null>(null);

  useEffect(() => {
    setLifetime(loadLifetimeStats());
    setCollection(loadFoundRocks());
    const live = newGameState("quarry");
    setDifficulty(live.difficulty);
    setGameSeed(live.gameSeed);
    setRockIndex(live.rockIndex);
    setCells(live.cells);
  }, []);

  const grid = DIFFICULTY_CONFIG[difficulty].grid;
  const totalCells = grid * grid;

  const startNewSite = useCallback(
    (diff?: DifficultyId) => {
      const next = newGameState(diff ?? difficulty);
      setDifficulty(next.difficulty);
      setGameSeed(next.gameSeed);
      setRockIndex(next.rockIndex);
      setCells(next.cells);
      setGameWon(false);
      setCurrentDigs(0);
      setGeoLabel("Dig to estimate");
      setWinResult(null);
    },
    [difficulty],
  );

  const onDifficultyChange = (d: DifficultyId) => {
    startNewSite(d);
  };

  const onDig = (idx: number) => {
    if (gameWon) return;
    const cell = cells[idx];
    if (cell !== "covered") return;

    const nextDigs = currentDigs + 1;
    setCurrentDigs(nextDigs);
    setGeoLabel(geologicalConfidenceLabel(nextDigs, totalCells));

    if (idx === rockIndex) {
      const profile = randomRockProfile(gameSeed + idx * 997 + nextDigs);
      const confidence = geologicalConfidenceLabel(nextDigs, totalCells);

      setLifetime((prev) => {
        const nextBest = { ...prev.bestDigs };
        const p = nextBest[difficulty];
        if (p == null || nextDigs < p) nextBest[difficulty] = nextDigs;
        const next: LifetimeStats = {
          ...prev,
          dirtDisturbed: prev.dirtDisturbed + 1,
          rocksFound: prev.rocksFound + 1,
          bestDigs: nextBest,
        };
        saveLifetimeStats(next);
        return next;
      });

      const entry: FoundRockEntry = {
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `rock-${Date.now()}`,
        name: profile.name,
        rarity: profile.rarity,
        personality: profile.personality,
        value: profile.value,
        dateFound: new Date().toISOString(),
        digsUsed: nextDigs,
        difficulty,
      };
      setCollection((prev) => {
        const merged = [entry, ...prev].slice(0, 48);
        saveFoundRocks(merged);
        return merged;
      });

      setCells((prev) => {
        const copy = [...prev];
        copy[idx] = { type: "rock" };
        return copy;
      });
      setGameWon(true);
      setWinResult({ profile, confidence });
      setGeoLabel(confidence);
      setWinShake(true);
      window.setTimeout(() => setWinShake(false), 900);
      return;
    }

    setLifetime((prev) => {
      const next = { ...prev, dirtDisturbed: prev.dirtDisturbed + 1 };
      saveLifetimeStats(next);
      return next;
    });

    const text = clueForTile(gameSeed, idx);
    setCells((prev) => {
      const copy = [...prev];
      copy[idx] = { type: "clue", text };
      return copy;
    });
  };

  const resetStats = () => {
    const fresh: LifetimeStats = {
      dirtDisturbed: 0,
      rocksFound: 0,
      bestDigs: { casual: null, quarry: null, excavation: null },
    };
    setLifetime(fresh);
    saveLifetimeStats(fresh);
  };

  const clearCollection = () => {
    setCollection([]);
    saveFoundRocks([]);
  };

  const removeRock = (id: string) => {
    setCollection((prev) => {
      const next = prev.filter((r) => r.id !== id);
      saveFoundRocks(next);
      return next;
    });
  };

  const bestLine = useMemo(() => {
    return (["casual", "quarry", "excavation"] as DifficultyId[])
      .map((id) => {
        const b = lifetime.bestDigs[id];
        const short = DIFFICULTY_CONFIG[id].label.split(" ")[0];
        return `${short}: ${b == null ? "—" : `${b}`}`;
      })
      .join(" · ");
  }, [lifetime.bestDigs]);

  return (
    <div className="relative pb-20 pt-2 sm:pb-24">
      <AppDetailHero
        title="Rock Sweeper"
        subtitle="Dig through suspicious dirt tiles to find one emotionally average rock."
        decorations={
          <>
            <span className="absolute right-[6%] top-[8%] text-3xl motion-safe-float">
              ⛏️
            </span>
            <span className="absolute left-[7%] top-[18%] text-2xl motion-safe-wiggle">🪨</span>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border-[3px] border-ink bg-blue-main/35 p-5 shadow-cartoon sm:p-8">
          <CartoonCard variant="cream" hoverLift={false}>
            <p
              id={`${groupId}-diff`}
              className="font-display text-center text-sm font-bold uppercase tracking-wide text-text-muted"
            >
              Difficulty
            </p>
            <div
              className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center"
              role="radiogroup"
              aria-labelledby={`${groupId}-diff`}
            >
              {(Object.keys(DIFFICULTY_CONFIG) as DifficultyId[]).map((id) => {
                const cfg = DIFFICULTY_CONFIG[id];
                const on = difficulty === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => onDifficultyChange(id)}
                    className={`rounded-full border-[3px] border-ink px-4 py-2.5 font-display text-xs font-bold shadow-cartoon-sm sm:text-sm ${
                      on
                        ? "bg-pink-main text-text-main"
                        : "bg-bg-main text-text-main hover:bg-pink-soft/50"
                    }`}
                  >
                    {cfg.label}{" "}
                    <span className="font-semibold opacity-80">
                      ({cfg.grid}×{cfg.grid})
                    </span>
                  </button>
                );
              })}
            </div>
          </CartoonCard>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <StatPill label="Current digs" value={String(currentDigs)} />
            <StatPill label="Rocks found" value={String(lifetime.rocksFound)} />
            <StatPill
              label="Dirt disturbed"
              value={String(lifetime.dirtDisturbed)}
            />
            <StatPill
              label="Best score (lowest digs / mode)"
              value={bestLine}
              className="sm:col-span-2 lg:col-span-3"
            />
            <StatPill label="Geological confidence" value={geoLabel} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => startNewSite()}
              className="btn-cartoon rounded-full border-[3px] border-ink bg-pink-main px-6 py-2.5 font-display text-sm font-bold text-text-main shadow-cartoon"
            >
              New Dig Site
            </button>
            <button
              type="button"
              onClick={resetStats}
              className="rounded-full border-[3px] border-ink bg-bg-cream px-6 py-2.5 font-display text-sm font-bold text-text-main shadow-cartoon-sm hover:bg-pink-soft/50"
            >
              Reset Stats
            </button>
            <button
              type="button"
              onClick={clearCollection}
              disabled={collection.length === 0}
              className="rounded-full border-[3px] border-ink bg-bg-main px-6 py-2.5 font-display text-sm font-bold text-text-muted hover:text-text-main disabled:opacity-40"
            >
              Clear Collection
            </button>
          </div>
        </div>

        <div
          className={`mx-auto max-w-3xl ${winShake ? "rock-sweeper-shake" : ""}`}
        >
          <div
            className="grid gap-2 sm:gap-3"
            style={{
              gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))`,
            }}
          >
            {cells.map((cell, idx) => (
              <button
                key={`${idx}`}
                type="button"
                disabled={gameWon}
                onClick={() => onDig(idx)}
                className={`rock-sweeper-tile flex aspect-square min-h-[44px] items-center justify-center rounded-2xl border-[3px] border-ink p-1 text-center font-display text-[10px] font-bold leading-tight shadow-cartoon-sm transition sm:text-xs ${
                  cell === "covered"
                    ? "bg-[#c4a574] hover:bg-[#d4b584] disabled:opacity-70"
                    : "rock-sweeper-tile-reveal bg-bg-cream ring-1 ring-ink/10"
                } ${
                  typeof cell === "object" && cell.type === "rock"
                    ? "!bg-pink-main text-lg sm:text-2xl"
                    : ""
                }`}
              >
                {cell === "covered" ? (
                  <span aria-hidden className="select-none">
                    ▓
                  </span>
                ) : typeof cell === "object" && cell.type === "clue" ? (
                  <span>{cell.text}</span>
                ) : (
                  <span aria-hidden>🪨</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {gameWon && winResult ? (
          <CartoonCard
            variant="salmon"
            hoverLift={false}
            className="rock-sweeper-win-bounce border-[4px]"
          >
            <p className="font-display text-center text-2xl font-black text-text-main sm:text-3xl">
              You found {winResult.profile.name}
            </p>
            <dl className="mt-6 space-y-3 font-semibold text-text-main">
              <div className="flex flex-wrap justify-between gap-2 border-b-[2px] border-ink/15 pb-2">
                <dt className="font-display text-xs font-bold uppercase text-text-muted">
                  Rarity
                </dt>
                <dd>{winResult.profile.rarity}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2 border-b-[2px] border-ink/15 pb-2">
                <dt className="font-display text-xs font-bold uppercase text-text-muted">
                  Personality
                </dt>
                <dd className="max-w-md text-right">{winResult.profile.personality}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2 border-b-[2px] border-ink/15 pb-2">
                <dt className="font-display text-xs font-bold uppercase text-text-muted">
                  Value
                </dt>
                <dd>{winResult.profile.value}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="font-display text-xs font-bold uppercase text-text-muted">
                  Digs used
                </dt>
                <dd className="tabular-nums">{currentDigs}</dd>
              </div>
            </dl>
            <p className="mt-5 text-center font-display text-sm font-bold text-text-muted">
              {winResult.confidence}
            </p>
          </CartoonCard>
        ) : null}

        <CartoonCard variant="cream" hoverLift={false}>
          <h3 className="font-display text-xl font-bold text-text-main">
            Found rocks
          </h3>
          <p className="mt-2 text-sm font-semibold text-text-muted">
            Your emotional geology backlog (stored on this device).
          </p>
          {collection.length === 0 ? (
            <p className="mt-6 font-display font-bold text-text-muted">
              Nothing catalogued yet. Disturb some dirt first.
            </p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {collection.map((r) => (
                <li
                  key={r.id}
                  className="rounded-[20px] border-[3px] border-ink bg-bg-main p-4 shadow-cartoon-sm"
                >
                  <p className="font-display text-lg font-bold text-text-main">{r.name}</p>
                  <p className="mt-2 text-sm font-bold text-blue-hover">{r.rarity}</p>
                  <p className="mt-2 text-sm font-semibold text-text-muted">
                    {r.personality}
                  </p>
                  <p className="mt-2 font-display text-xs font-bold text-text-main">
                    Value: {r.value}
                  </p>
                  <p className="mt-2 font-display text-xs text-text-muted">
                    {new Date(r.dateFound).toLocaleString()} · {r.digsUsed} digs ·{" "}
                    {DIFFICULTY_CONFIG[r.difficulty].label}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeRock(r.id)}
                    className="mt-4 rounded-full border-[2px] border-ink bg-pink-soft/60 px-4 py-1.5 font-display text-xs font-bold hover:bg-pink-main"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </CartoonCard>
      </div>
    </div>
  );
}

function StatPill({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border-[3px] border-ink bg-pink-soft/80 px-3 py-3 text-center shadow-cartoon-sm ${className}`}
    >
      <p className="font-display text-[10px] font-black uppercase leading-tight text-text-muted sm:text-xs">
        {label}
      </p>
      <p className="mt-1 font-display text-xs font-bold leading-snug text-text-main sm:text-sm">
        {value}
      </p>
    </div>
  );
}
