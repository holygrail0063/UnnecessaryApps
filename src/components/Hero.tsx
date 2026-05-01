import Link from "next/link";
import { HeroCollage } from "@/components/HeroCollage";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-2 sm:px-6 lg:px-8 lg:pb-16 lg:pt-4">
      {/* soft blobs */}
      <div
        className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-ua-mint/35 blur-3xl motion-safe-orbit"
        style={{ animationDelay: "0s" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-ua-blue/30 blur-3xl motion-safe-float"
        style={{ animationDelay: "400ms" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-8 right-1/4 h-48 w-48 rounded-full bg-ua-lavender/50 blur-2xl motion-safe-sparkle opacity-80"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-ua-border bg-ua-yellow/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-ua-text shadow-[var(--shadow-ua-soft-sm)]">
            ☁ 100% Pointless. 200% Fun.
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ua-text sm:text-5xl lg:text-[3.3rem] lg:leading-[1.06]">
            Beautifully Useless Apps,{" "}
            <span className="bg-gradient-to-r from-[#FF9AA2] via-[#A7D8FF] to-[#B8F2D8] bg-clip-text text-transparent">
              All in One Place
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-ua-muted sm:text-xl">
            Discover absurdly fun tools nobody asked for but everyone secretly enjoys.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#featured-apps"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-ua-coral px-8 py-3 text-[15px] font-bold text-ua-text shadow-[0_10px_34px_-12px_rgba(255,154,162,0.9)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_42px_-14px_rgba(255,214,201,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5]"
            >
              Browse Featured
            </a>
            <Link
              href="/submit"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-ua-border bg-ua-mint/55 px-8 py-3 text-[15px] font-bold text-ua-text shadow-[var(--shadow-ua-soft-sm)] transition hover:-translate-y-0.5 hover:bg-ua-mint/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A6B85]"
            >
              Submit an Idea
            </Link>
          </div>
          <p className="mt-8 text-sm font-medium text-ua-muted">
            <span className="inline-flex flex-wrap items-center gap-2 rounded-2xl bg-ua-bg-secondary/70 px-4 py-3 text-ua-text shadow-[var(--shadow-ua-soft-sm)]">
              <span aria-hidden className="text-lg">
                💫
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
