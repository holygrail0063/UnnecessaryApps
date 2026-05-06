"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";

export type DeadTab = {
  id: string;
  title: string;
  url?: string;
  reason?: string;
  buriedAt: string;
  epitaph: string;
};

type GraveyardStorage = {
  tabs: DeadTab[];
  resurrectedTotal: number;
};

const STORAGE_KEY = "unnecessaryApps-tab-graveyard";

const EPITAPHS = [
  "Opened with ambition. Closed by reality.",
  "Gone before it was ever read.",
  "Too many tabs, not enough character development.",
  "It lived in the browser for 47 emotional business days.",
  "Promised to read later. Later never came.",
  "Here lies a headline that deserved better.",
  "Collapsed under the weight of open ambition.",
  "Forever in the backlog of the soul.",
  "It meant well. The browser knows the truth.",
] as const;

const DEFAULT_TABS: DeadTab[] = [
  {
    id: "seed-1",
    title: "10 Habits of Unnecessary People",
    url: "",
    reason: "Productivity astrology",
    buriedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    epitaph: EPITAPHS[1]!,
  },
  {
    id: "seed-2",
    title: "Q3 Alignment Slides Final FINAL v9",
    url: "",
    reason: "Leadership theater",
    buriedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    epitaph: EPITAPHS[4]!,
  },
  {
    id: "seed-3",
    title: "Very Normal Documentation",
    reason: "Promised I’d read it Monday",
    buriedAt: new Date().toISOString(),
    epitaph: EPITAPHS[0]!,
  },
];

function randomEpitaph() {
  return EPITAPHS[Math.floor(Math.random() * EPITAPHS.length)]!;
}

function loadAll(): GraveyardStorage {
  if (typeof window === "undefined") {
    return { tabs: DEFAULT_TABS, resurrectedTotal: 0 };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { tabs: DEFAULT_TABS, resurrectedTotal: 0 };
    const p = JSON.parse(raw) as Partial<GraveyardStorage>;
    const tabs = Array.isArray(p.tabs) && p.tabs.length ? p.tabs : DEFAULT_TABS;
    const resurrectedTotal =
      typeof p.resurrectedTotal === "number" ? p.resurrectedTotal : 0;
    return { tabs, resurrectedTotal };
  } catch {
    return { tabs: DEFAULT_TABS, resurrectedTotal: 0 };
  }
}

function saveAll(data: GraveyardStorage) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function formatBuried(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "A while ago";
  }
}

function normalizeUrl(raw: string): string | undefined {
  const t = raw.trim();
  if (!t) return undefined;
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

export function TabGraveyard() {
  const baseId = useId();
  const [tabs, setTabs] = useState<DeadTab[]>([]);
  const [resurrectedTotal, setResurrectedTotal] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const { tabs: t, resurrectedTotal: r } = loadAll();
    setTabs(t);
    setResurrectedTotal(r);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveAll({ tabs, resurrectedTotal });
  }, [tabs, resurrectedTotal, mounted]);

  const haunting = useMemo(
    () => tabs.filter((x) => x.url && x.url.trim() !== "").length,
    [tabs],
  );

  const bury = () => {
    const tit = title.trim();
    if (!tit) return;
    const u = normalizeUrl(url);
    const tab: DeadTab = {
      id: typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `tab-${Date.now()}`,
      title: tit,
      url: u,
      reason: reason.trim() || undefined,
      buriedAt: new Date().toISOString(),
      epitaph: randomEpitaph(),
    };
    setTabs((prev) => [tab, ...prev]);
    setTitle("");
    setUrl("");
    setReason("");
  };

  const resurrect = (id: string) => {
    setTabs((prev) => prev.filter((t) => t.id !== id));
    setResurrectedTotal((x) => x + 1);
  };

  const clearAll = () => {
    setTabs([]);
  };

  const openHaunted = (u: string | undefined) => {
    const n = normalizeUrl(u ?? "");
    if (n) window.open(n, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative pb-20 pt-2 sm:pb-24">
      <AppDetailHero
        title="Tab Graveyard"
        subtitle="A fake cemetery for tabs you definitely planned to read."
        decorations={
          <>
            <span className="absolute left-[5%] top-[8%] text-3xl motion-safe-float">🪦</span>
            <span className="absolute right-[8%] top-[18%] text-2xl motion-safe-wiggle">👻</span>
            <span className="absolute bottom-[12%] left-[12%] text-xl">🌙</span>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <CartoonCard variant="cream" hoverLift={false} className="!p-4 text-center">
            <p className="font-display text-xs font-bold uppercase text-text-muted">Total buried</p>
            <p className="font-display mt-2 text-3xl font-bold tabular-nums text-text-main">
              {tabs.length}
            </p>
          </CartoonCard>
          <CartoonCard variant="salmon" hoverLift={false} className="!p-4 text-center">
            <p className="font-display text-xs font-bold uppercase text-text-main/90">
              Haunting the browser
            </p>
            <p className="mt-1 text-xs font-semibold text-text-muted">
              (tabs with a link)
            </p>
            <p className="font-display mt-2 text-3xl font-bold tabular-nums text-text-main">
              {haunting}
            </p>
          </CartoonCard>
          <CartoonCard variant="blue" hoverLift={false} className="!p-4 text-center">
            <p className="font-display text-xs font-bold uppercase text-text-main/95">
              Resurrected
            </p>
            <p className="font-display mt-2 text-3xl font-bold tabular-nums text-text-main">
              {resurrectedTotal}
            </p>
          </CartoonCard>
        </div>

        <CartoonCard variant="pink" hoverLift={false}>
          <p className="font-display text-center text-base font-bold text-text-main">
            Bury another tab
          </p>
          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor={`${baseId}-title`}
                className="font-display text-xs font-bold uppercase text-text-muted"
              >
                Tab title
              </label>
              <input
                id={`${baseId}-title`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-2xl border-[3px] border-ink bg-bg-main px-4 py-3 font-semibold text-text-main shadow-cartoon-sm outline-none placeholder:text-text-muted/60 focus-visible:ring-2 focus-visible:ring-blue-main"
                placeholder="That article you absolutely needed"
              />
            </div>
            <div>
              <label
                htmlFor={`${baseId}-url`}
                className="font-display text-xs font-bold uppercase text-text-muted"
              >
                Optional URL (may haunt you later)
              </label>
              <input
                id={`${baseId}-url`}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-2 w-full rounded-2xl border-[3px] border-ink bg-bg-main px-4 py-3 font-semibold text-text-main shadow-cartoon-sm outline-none placeholder:text-text-muted/60 focus-visible:ring-2 focus-visible:ring-blue-main"
                placeholder="example.com/shame"
              />
            </div>
            <div>
              <label
                htmlFor={`${baseId}-reason`}
                className="font-display text-xs font-bold uppercase text-text-muted"
              >
                Optional reason / category
              </label>
              <input
                id={`${baseId}-reason`}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-2 w-full rounded-2xl border-[3px] border-ink bg-bg-main px-4 py-3 font-semibold text-text-main shadow-cartoon-sm outline-none placeholder:text-text-muted/60 focus-visible:ring-2 focus-visible:ring-blue-main"
                placeholder="Read later · Panic bookmark · Lore"
              />
            </div>
            <button
              type="button"
              onClick={bury}
              className="btn-cartoon w-full rounded-full border-[3px] border-ink bg-blue-main py-3 font-display text-base font-bold text-text-main shadow-cartoon sm:w-auto sm:px-10"
            >
              Bury Tab
            </button>
          </div>
        </CartoonCard>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-xl font-bold text-text-main">
            Resting in peace (sort of)
          </h2>
          <button
            type="button"
            onClick={clearAll}
            disabled={tabs.length === 0}
            className="rounded-full border-[3px] border-ink bg-bg-cream px-5 py-2 font-display text-sm font-bold text-text-main shadow-cartoon-sm transition hover:bg-pink-soft/50 disabled:opacity-40"
          >
            Clear Graveyard
          </button>
        </div>

        {tabs.length === 0 ? (
          <CartoonCard variant="cream" hoverLift={false}>
            <p className="text-center font-semibold text-text-muted">
              Empty graveyard. The browser tabs are still alive. For now.
            </p>
          </CartoonCard>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <article className="flex h-full flex-col rounded-[22px] border-[3px] border-ink bg-bg-cream p-5 shadow-cartoon transition hover:shadow-cartoon-hover">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span className="font-display text-xs font-black uppercase tracking-wide text-text-muted">
                      R.I.P.
                    </span>
                    <span className="text-xl" aria-hidden>
                      🪦
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug text-text-main">
                    {tab.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold italic leading-relaxed text-text-muted border-l-[3px] border-pink-main pl-3">
                    “{tab.epitaph}”
                  </p>
                  <p className="mt-4 font-display text-xs font-bold uppercase text-text-muted">
                    Buried {formatBuried(tab.buriedAt)}
                  </p>
                  {tab.reason ? (
                    <p className="mt-2 rounded-xl border-[2px] border-ink/20 bg-pink-soft/45 px-3 py-2 font-display text-xs font-bold text-text-main">
                      {tab.reason}
                    </p>
                  ) : null}
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    <button
                      type="button"
                      onClick={() => resurrect(tab.id)}
                      className="rounded-full border-[3px] border-ink bg-pink-main px-4 py-2 font-display text-xs font-bold text-text-main shadow-cartoon-sm hover:bg-pink-hover"
                    >
                      Resurrect
                    </button>
                    {tab.url ? (
                      <button
                        type="button"
                        onClick={() => openHaunted(tab.url)}
                        className="rounded-full border-[3px] border-ink bg-bg-main px-4 py-2 font-display text-xs font-bold text-text-main shadow-cartoon-sm hover:bg-blue-main/30"
                      >
                        Open haunted link
                      </button>
                    ) : null}
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
