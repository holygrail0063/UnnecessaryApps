import Link from "next/link";

const linkClass =
  "text-sm text-zinc-600 transition hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 rounded";

export function Footer() {
  return (
    <footer className="bg-[#FAFAF8] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-zinc-900">
              Unnecessary Apps
            </p>
            <p className="mt-2 max-w-sm text-sm text-zinc-600">
              Apps that solve problems you definitely do not have.
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-3"
            aria-label="Footer"
          >
            <Link href="/" className={linkClass}>
              Home
            </Link>
            <a href="#all-apps" className={linkClass}>
              All Apps
            </a>
            <a href="#featured" className={linkClass}>
              Featured
            </a>
            <Link href="/about" className={linkClass}>
              About
            </Link>
            <Link href="/submit" className={linkClass}>
              Submit an Idea
            </Link>
          </nav>
        </div>
        <p className="mt-10 text-center text-xs text-zinc-500 sm:text-left">
          Made with excessive effort for minimal necessity.
        </p>
      </div>
    </footer>
  );
}
