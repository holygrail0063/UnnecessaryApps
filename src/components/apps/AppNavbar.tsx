import Link from "next/link";

export function AppNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-[#FAFAF8]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="truncate text-sm font-semibold tracking-tight text-zinc-900 transition hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:text-base"
          >
            Unnecessary Apps
          </Link>
          <span className="hidden shrink-0 rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-800 sm:inline sm:text-[11px]">
            Featured App
          </span>
        </div>
        <Link
          href="/"
          className="inline-flex shrink-0 items-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:px-4 sm:text-sm"
        >
          Back to Home
        </Link>
      </div>
      <div className="border-t border-zinc-100 bg-violet-50/50 px-4 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-violet-800 sm:hidden">
        Featured App
      </div>
    </header>
  );
}
