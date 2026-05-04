import type { Metadata } from "next";
import Link from "next/link";
import { SiteSubpageLayout } from "@/components/layouts/SiteSubpageLayout";

export const metadata: Metadata = {
  title: "Hall of Pointless Fame",
  description: "A prestigious wall for people who wasted time beautifully.",
};

const LEADERBOARD = [
  { rank: 1, name: "Sir Clicks-a-Lot", points: "9,999 pointless points" },
  { rank: 2, name: "Bubble Goblin", points: "7,420 pointless points" },
  { rank: 3, name: "Monday Checker", points: "6,001 pointless points" },
  { rank: 4, name: "The Unsubscriber", points: "4,444 pointless points" },
  { rank: 5, name: "Captain Useless", points: "3,333 pointless points" },
] as const;

const CARDS = [
  {
    title: "Most Dedicated Button Clicker",
    body: "For the brave soul who clicked a button like rent was due.",
    bg: "bg-pink-soft",
  },
  {
    title: "Bubble Wrap Legend",
    body: "For users who popped digital bubbles with concerning focus.",
    bg: "bg-tan/90",
  },
  {
    title: "Random App Explorer",
    body: "For anyone who trusted the Random App button more than their own life choices.",
    bg: "bg-blue-main/90",
  },
] as const;

export default function HallOfPointlessFamePage() {
  return (
    <SiteSubpageLayout
      wide
      title="Hall of Pointless Fame"
      subtitle="A prestigious wall for people who wasted time beautifully."
    >
      <p className="rounded-2xl border-[3px] border-ink bg-bg-main/70 px-5 py-4 font-display text-lg font-bold leading-snug text-text-main shadow-cartoon-sm">
        Welcome to the Hall of Pointless Fame, where absolutely unnecessary achievements receive the
        dramatic recognition they never asked for.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <div
            key={c.title}
            className={`flex flex-col rounded-[22px] border-[3px] border-ink ${c.bg} p-5 shadow-cartoon-sm`}
          >
            <h2 className="font-display text-lg font-bold text-text-main">{c.title}</h2>
            <p className="mt-3 flex-1 font-semibold leading-relaxed text-text-main/95">{c.body}</p>
          </div>
        ))}
      </div>

      <section className="mt-12 rounded-[22px] border-[4px] border-ink bg-bg-main/60 p-6 shadow-cartoon sm:p-8">
        <h2 className="font-display text-2xl font-bold text-text-main">Current Pointless Legends</h2>
        <ol className="mt-6 space-y-3">
          {LEADERBOARD.map((row) => (
            <li
              key={row.rank}
              className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border-[3px] border-ink/80 bg-bg-cream px-4 py-3 font-display font-bold shadow-cartoon-sm"
            >
              <span className="text-text-muted">
                #{row.rank}:{" "}
                <span className="text-lg text-text-main">{row.name}</span>
              </span>
              <span className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                {row.points}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-6 font-display text-sm font-bold italic text-text-muted">
          Real leaderboard support coming soon, probably after we stop building more unnecessary
          things.
        </p>
      </section>

      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <Link
          href="/contact"
          className="btn-cartoon inline-flex min-h-[52px] items-center justify-center rounded-full border-[3px] border-ink bg-pink-main px-8 py-3 font-display text-base font-bold text-text-main shadow-cartoon transition hover:bg-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Submit Your Pointless Achievement
        </Link>
      </div>
    </SiteSubpageLayout>
  );
}
