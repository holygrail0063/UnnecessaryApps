import Link from "next/link";
import { RandomAppButton } from "@/components/RandomAppButton";

const navLinkClass =
  "text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 rounded-md px-1";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-[#FAFAF8]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[#FAFAF8]/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2 font-semibold tracking-tight text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 rounded-md"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 text-xs font-bold text-white shadow-sm shadow-violet-500/25">
            UA
          </span>
          <span className="truncate sm:inline">Unnecessary Apps</span>
        </Link>

        <nav
          className="hidden items-center gap-5 lg:flex lg:gap-7"
          aria-label="Primary"
        >
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <a href="#featured" className={navLinkClass}>
            Featured
          </a>
          <a href="#all-apps" className={navLinkClass}>
            All Apps
          </a>
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
          <Link href="/submit" className={navLinkClass}>
            Submit an Idea
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <details className="relative lg:hidden">
            <summary className="list-none cursor-pointer rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-50 [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl">
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    href="/"
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="#featured"
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    Featured
                  </a>
                </li>
                <li>
                  <a
                    href="#all-apps"
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    All Apps
                  </a>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/submit"
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    Submit an Idea
                  </Link>
                </li>
              </ul>
            </div>
          </details>

          <RandomAppButton
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-zinc-900 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-zinc-900/10 transition hover:bg-zinc-800 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:px-4 sm:text-sm"
            label="Try a random live app"
          >
            <span className="hidden sm:inline">Try Random App</span>
            <span className="sm:hidden">Random</span>
          </RandomAppButton>
        </div>
      </div>
    </header>
  );
}
