import Link from "next/link";
import { HeroCollage } from "@/components/HeroCollage";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg-main px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-12">
      {/* doodles */}
      <span
        className="pointer-events-none absolute left-[8%] top-[12%] font-display text-3xl motion-safe-wiggle text-text-main"
        aria-hidden
      >
        ★
      </span>
      <svg
        className="pointer-events-none absolute right-[12%] top-[18%] h-14 w-14 text-text-main opacity-80 motion-safe-float"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 40 Q28 8 48 40"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span
        className="pointer-events-none absolute bottom-[20%] left-[6%] text-2xl motion-safe-orbit"
        aria-hidden
      >
        →
      </span>

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-bg-cream px-4 py-2 font-display text-xs font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm">
            ☁ 100% Pointless · 200% Fun
          </span>
          <h1 className="font-display mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-text-main sm:text-5xl lg:text-[3rem] lg:leading-[1.05]">
            Beautifully Useless Apps,{" "}
            <span className="relative inline-block">
              All in One Place
              <svg
                className="pointer-events-none absolute -bottom-2 left-0 w-full text-blue-main"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 8 Q50 2 100 8 T196 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-text-muted sm:text-xl">
            Discover absurdly fun tools nobody asked for but everyone secretly enjoys.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="/#featured-apps"
              className="btn-cartoon inline-flex min-h-[54px] items-center justify-center rounded-full border-[3px] border-ink bg-pink-main px-8 py-3 font-display text-base font-bold text-text-main shadow-cartoon hover:bg-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Browse Featured
            </a>
            <Link
              href="/submit"
              className="btn-cartoon inline-flex min-h-[54px] items-center justify-center rounded-full border-[3px] border-ink bg-bg-cream px-8 py-3 font-display text-base font-bold text-text-main shadow-cartoon hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Submit an Idea
            </Link>
          </div>
          <p className="mt-8 font-semibold text-text-muted">
            <span className="inline-flex flex-wrap items-center gap-2 rounded-2xl border-[3px] border-ink bg-bg-cream px-4 py-3 font-display text-sm font-bold text-text-main shadow-cartoon-sm">
              <span aria-hidden className="text-lg">
                ✨
              </span>
              Loved by 12,847 people who had better things to do.
            </span>
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <HeroCollage />
        </div>
      </div>
    </section>
  );
}
