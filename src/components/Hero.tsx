import Link from "next/link";
import { RandomAppButton } from "@/components/RandomAppButton";

const floatCards: { label: string; position: string; rotate: string; delayMs: number }[] = [
  {
    label: "Zero practical value",
    position: "left-[4%] top-[6%]",
    rotate: "rotate-[-3deg]",
    delayMs: 0,
  },
  {
    label: "Mildly addictive",
    position: "right-[8%] top-[12%]",
    rotate: "rotate-[2deg]",
    delayMs: 200,
  },
  {
    label: "Probably not needed",
    position: "left-[12%] top-[38%]",
    rotate: "rotate-[1deg]",
    delayMs: 400,
  },
  {
    label: "Built anyway",
    position: "right-[4%] top-[44%]",
    rotate: "rotate-[-2deg]",
    delayMs: 600,
  },
  {
    label: "Unreasonably polished",
    position: "left-[2%] bottom-[10%]",
    rotate: "rotate-[3deg]",
    delayMs: 150,
  },
  {
    label: "A complete waste of good engineering",
    position: "right-[6%] bottom-[6%]",
    rotate: "rotate-[-1deg]",
    delayMs: 350,
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/60 bg-[#FAFAF8]">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-violet-200/50 via-fuchsia-100/40 to-amber-100/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-gradient-to-tr from-sky-200/40 to-violet-100/30 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm">
            Productivity’s worst enemy.
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Beautifully built.
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
              Completely pointless.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
            A curated collection of tiny, unnecessary web apps that are weirdly
            fun, oddly polished, and absolutely not essential.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <RandomAppButton
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-semibold text-white shadow-lg shadow-zinc-900/15 transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              label="Try a random live app"
            >
              Try a Random App
            </RandomAppButton>
            <Link
              href="#all-apps"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-semibold text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              Browse All Apps
            </Link>
          </div>
        </div>

        <div
          className="relative mx-auto aspect-[4/3] w-full max-w-md lg:mx-0 lg:max-w-none"
          aria-hidden
        >
          {floatCards.map(({ label, position, rotate, delayMs }) => (
            <div
              key={label}
              className={`hero-float absolute max-w-[220px] ${position}`}
              style={{ animationDelay: `${delayMs}ms` }}
            >
              <div
                className={`rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-sm font-medium text-zinc-700 shadow-lg shadow-zinc-900/5 backdrop-blur-sm transition duration-300 hover:scale-[1.02] ${rotate}`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
