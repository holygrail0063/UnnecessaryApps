import Link from "next/link";
import { TimeWastedWidget } from "@/components/TimeWastedWidget";

export function Hero() {
  return (
    <section className="relative overflow-x-hidden overflow-y-visible bg-bg-main px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-12">
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-bg-cream px-4 py-2 font-display text-xs font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm">
            ☁ 100% Pointless · 200% Fun
          </span>
          <h1 className="font-display mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-text-main sm:text-5xl lg:text-[3rem] lg:leading-[1.05]">
            Beautifully Useless Apps, All in One Place
          </h1>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-text-muted sm:text-xl">
            Discover absurdly fun tools nobody asked for but everyone secretly enjoys.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/submit"
              className="btn-cartoon inline-flex min-h-[54px] w-fit items-center justify-center rounded-full border-[3px] border-ink bg-bg-cream px-8 py-3 font-display text-base font-bold text-text-main shadow-cartoon hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Submit an Idea
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <TimeWastedWidget />
        </div>
      </div>
    </section>
  );
}
