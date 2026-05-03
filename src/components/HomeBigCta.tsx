import Link from "next/link";

export function HomeBigCta() {
  return (
    <section className="relative overflow-hidden border-y-[3px] border-ink bg-pink-main px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold text-text-main sm:text-4xl">
          Ready to waste time beautifully?
        </h2>
        <p className="mt-4 text-lg font-semibold text-text-muted">
          Explore useless tools that somehow feel important.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/#featured-apps"
            className="btn-cartoon inline-flex min-h-[56px] min-w-[200px] items-center justify-center rounded-full border-[3px] border-ink bg-bg-cream px-8 font-display text-lg font-bold text-text-main shadow-cartoon hover:bg-pink-soft"
          >
            Browse Apps
          </a>
          <Link
            href="/submit"
            className="btn-cartoon inline-flex min-h-[56px] min-w-[200px] items-center justify-center rounded-full border-[3px] border-ink bg-blue-main px-8 font-display text-lg font-bold text-text-main shadow-cartoon hover:bg-blue-hover"
          >
            Submit Your Idea
          </Link>
        </div>
      </div>
    </section>
  );
}
