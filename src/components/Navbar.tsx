"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LogoMark() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <circle cx="20" cy="20" r="18" fill="#EDE7FF" stroke="#DDD3EE" strokeWidth="1.5" />
      <circle cx="14" cy="17" r="5" fill="#FFE8A3" opacity="0.92" />
      <circle cx="26" cy="21" r="7" fill="#FF9AA2" opacity="0.9" />
      <ellipse cx="20" cy="29" rx="10" ry="6" fill="#B8F2D8" opacity="0.85" />
      <circle cx="12" cy="26" r="3" fill="#A7D8FF" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();

  const linkBase =
    "rounded-full px-4 py-2 text-sm font-semibold text-ua-muted transition-colors hover:bg-ua-bg-secondary hover:text-ua-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5]";

  return (
    <header className="sticky top-0 z-50 px-4 pb-3 pt-4 sm:px-6 lg:px-8">
      <div
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[28px] border border-ua-border/70 bg-[#FFFDF8]/92 px-4 py-2 shadow-[var(--shadow-ua-soft-sm)] backdrop-blur-md md:gap-6 md:px-6 md:py-3"
      >
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5]"
        >
          <LogoMark />
          <span className="truncate font-bold tracking-tight text-ua-text md:text-lg">
            UnnecessaryApps
          </span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 whitespace-nowrap md:flex lg:gap-2"
          aria-label="Primary"
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`${linkBase} ${
              pathname === "/" ? "bg-ua-yellow/70 text-ua-text shadow-sm" : ""
            }`}
          >
            Home
          </Link>
          <a href="#featured-apps" className={linkBase}>
            Apps
          </a>
          <a href="#featured-apps" className={linkBase}>
            Featured
          </a>
          <Link href="/about" className={linkBase}>
            About
          </Link>
          <Link href="/submit" className={linkBase}>
            Submit Idea
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded-full border border-ua-border bg-ua-lavender/50 px-3 py-2 text-sm font-semibold text-ua-text shadow-[var(--shadow-ua-soft-sm)] [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 z-[60] mt-2 w-[min(100vw-2rem,16rem)] rounded-2xl border border-ua-border bg-[#FFFDF8] p-3 shadow-[var(--shadow-ua-float)]">
              <ul className="flex flex-col gap-1">
                <li>
                  <Link href="/" className="block rounded-xl px-3 py-2 font-medium text-ua-text hover:bg-ua-mint/30">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#featured-apps" className="block rounded-xl px-3 py-2 font-medium text-ua-text hover:bg-ua-blue/30">
                    Apps
                  </a>
                </li>
                <li>
                  <a href="#featured-apps" className="block rounded-xl px-3 py-2 font-medium text-ua-text hover:bg-ua-yellow/50">
                    Featured
                  </a>
                </li>
                <li>
                  <Link href="/about" className="block rounded-xl px-3 py-2 font-medium text-ua-text hover:bg-ua-lavender/70">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="block rounded-xl px-3 py-2 font-medium text-ua-text hover:bg-ua-mint/35">
                    Submit Idea
                  </Link>
                </li>
              </ul>
            </div>
          </details>

          <Link
            href="#featured-apps"
            className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-ua-coral px-4 py-2.5 text-xs font-bold tracking-wide text-ua-text shadow-[0_6px_22px_-6px_rgba(255,154,162,0.75)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(255,154,162,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5] sm:min-h-[46px] sm:px-6 sm:text-[13px]"
          >
            <span className="sm:hidden">Explore</span>
            <span className="hidden sm:inline">Explore Apps</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
