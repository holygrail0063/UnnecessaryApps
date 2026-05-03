export function HomeViewAllCta() {
  return (
    <div className="bg-bg-main px-4 py-10 text-center sm:px-6 lg:px-8">
      <a
        href="/#featured-apps"
        className="btn-cartoon inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-bg-cream px-8 py-3.5 font-display text-lg font-bold text-text-main shadow-cartoon hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        View All Apps
        <span aria-hidden className="text-xl">
          →
        </span>
      </a>
      <p className="mx-auto mt-4 max-w-md font-semibold text-text-muted">
        Same silly inventory — just scrolls nicer with an arrow.
      </p>
    </div>
  );
}
