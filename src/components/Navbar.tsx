"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef } from "react";

function LogoMark() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="12"
        fill="#FFF8EA"
        stroke="#171717"
        strokeWidth="3"
      />
      <circle cx="18" cy="20" r="6" fill="#F9A3A8" stroke="#171717" strokeWidth="2" />
      <circle cx="32" cy="26" r="8" fill="#27B5E8" stroke="#171717" strokeWidth="2" />
      <path
        d="M12 38c4-6 10-8 20-8"
        stroke="#171717"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = useCallback(() => {
    menuRef.current?.removeAttribute("open");
  }, []);

  const linkBase =
    "inline-flex min-h-[40px] items-center justify-center rounded-full border-[3px] border-transparent px-3 py-2 font-display text-sm font-bold text-text-main transition hover:border-ink hover:bg-pink-soft/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-4";

  const hashLinkClass = `${linkBase} hover:shadow-cartoon-sm`;

  return (
    <header className="sticky top-0 z-50 border-b-[4px] border-ink bg-pink-main">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-2 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:gap-3"
        >
          <LogoMark />
          <span className="truncate font-display text-lg font-bold tracking-tight text-text-main sm:text-xl md:text-2xl">
            UnnecessaryApps
          </span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2"
          aria-label="Primary"
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`${linkBase} ${
              pathname === "/"
                ? "border-ink bg-bg-cream shadow-cartoon-sm"
                : ""
            }`}
          >
            Home
          </Link>
          <a href="/#featured-apps" className={hashLinkClass}>
            Apps
          </a>
          <a href="/#featured-apps" className={hashLinkClass}>
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
          <details ref={menuRef} className="relative lg:hidden">
            <summary className="list-none cursor-pointer rounded-full border-[3px] border-ink bg-bg-cream px-3 py-2 font-display text-sm font-bold text-text-main shadow-cartoon-sm [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 z-[60] mt-2 w-[min(100vw-2rem,17rem)] rounded-2xl border-[3px] border-ink bg-bg-cream p-2 shadow-cartoon">
              <ul className="flex flex-col gap-1 font-display font-bold">
                <li>
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="block rounded-xl px-3 py-2 text-text-main hover:bg-pink-soft"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="/#featured-apps"
                    onClick={closeMenu}
                    className="block rounded-xl px-3 py-2 hover:bg-pink-soft"
                  >
                    Apps
                  </a>
                </li>
                <li>
                  <a
                    href="/#featured-apps"
                    onClick={closeMenu}
                    className="block rounded-xl px-3 py-2 hover:bg-pink-soft"
                  >
                    Featured
                  </a>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="block rounded-xl px-3 py-2 hover:bg-pink-soft"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/submit"
                    onClick={closeMenu}
                    className="block rounded-xl px-3 py-2 hover:bg-pink-soft"
                  >
                    Submit Idea
                  </Link>
                </li>
              </ul>
            </div>
          </details>

          <a
            href="/#featured-apps"
            onClick={closeMenu}
            className="btn-cartoon inline-flex min-h-[44px] items-center justify-center rounded-full border-[3px] border-ink bg-bg-cream px-4 font-display text-xs font-bold text-text-main shadow-cartoon-sm hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:min-h-[48px] sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">Explore</span>
            <span className="hidden sm:inline">Explore Apps</span>
          </a>
        </div>
      </div>
    </header>
  );
}
