"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { BrandLogoHeader } from "@/components/BrandLogo";

const NAV_ACTIVE =
  "border-ink bg-bg-cream shadow-cartoon-sm hover:bg-bg-cream hover:border-ink";

export function Navbar() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
  }, [pathname]);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const closeMenu = useCallback(() => {
    menuRef.current?.removeAttribute("open");
  }, []);

  /** Going “Home” while already on `/` should clear `#featured-apps` and scroll to top. */
  const handleHomeNav = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      closeMenu();
      if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
        e.preventDefault();
        window.history.replaceState(null, "", "/");
        setHash("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [closeMenu, pathname],
  );

  const linkBase =
    "inline-flex min-h-[40px] items-center justify-center rounded-full border-[3px] border-transparent px-3 py-2 font-display text-sm font-bold text-text-main transition hover:border-ink hover:bg-pink-soft/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-4";

  const appsAnchorClass = `${linkBase} hover:shadow-cartoon-sm ${pathname === "/" && hash === "#featured-apps" ? NAV_ACTIVE : ""}`;

  const homeClass =
    pathname === "/" && hash !== "#featured-apps"
      ? `${linkBase} ${NAV_ACTIVE}`
      : linkBase;

  const aboutClass =
    pathname === "/about" ? `${linkBase} ${NAV_ACTIVE}` : linkBase;

  const submitClass =
    pathname === "/submit" ? `${linkBase} ${NAV_ACTIVE}` : linkBase;

  const mobileItem =
    "block rounded-xl px-3 py-2 transition hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  const mobileHome =
    pathname === "/" && hash !== "#featured-apps"
      ? `${mobileItem} border-[3px] border-ink bg-bg-cream shadow-cartoon-sm`
      : mobileItem;

  const mobileApps =
    pathname === "/" && hash === "#featured-apps"
      ? `${mobileItem} border-[3px] border-ink bg-bg-cream shadow-cartoon-sm`
      : mobileItem;

  const mobileAbout =
    pathname === "/about"
      ? `${mobileItem} border-[3px] border-ink bg-bg-cream shadow-cartoon-sm`
      : mobileItem;

  const mobileSubmit =
    pathname === "/submit"
      ? `${mobileItem} border-[3px] border-ink bg-bg-cream shadow-cartoon-sm`
      : mobileItem;

  return (
    <header className="sticky top-0 z-50 border-b-[4px] border-ink bg-pink-main">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <BrandLogoHeader onNavigate={handleHomeNav} />

        <nav
          className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2"
          aria-label="Primary"
        >
          <Link
            href="/"
            onClick={handleHomeNav}
            aria-current={pathname === "/" && hash !== "#featured-apps" ? "page" : undefined}
            className={homeClass}
          >
            Home
          </Link>
          <a
            href="/#featured-apps"
            aria-current={pathname === "/" && hash === "#featured-apps" ? "page" : undefined}
            className={appsAnchorClass}
          >
            Apps
          </a>
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            className={aboutClass}
          >
            About
          </Link>
          <Link
            href="/submit"
            aria-current={pathname === "/submit" ? "page" : undefined}
            className={submitClass}
          >
            Submit Idea
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <details ref={menuRef} className="relative lg:hidden">
            <summary className="list-none cursor-pointer rounded-full border-[3px] border-ink bg-bg-cream px-3 py-2 font-display text-sm font-bold text-text-main shadow-cartoon-sm [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 z-[60] mt-2 w-[min(100vw-2rem,17rem)] rounded-2xl border-[3px] border-ink bg-bg-cream p-2 shadow-cartoon">
              <ul className="flex flex-col gap-1 font-display font-bold text-text-main">
                <li>
                  <Link href="/" onClick={handleHomeNav} className={mobileHome}>
                    Home
                  </Link>
                </li>
                <li>
                  <a href="/#featured-apps" onClick={closeMenu} className={mobileApps}>
                    Apps
                  </a>
                </li>
                <li>
                  <Link href="/about" onClick={closeMenu} className={mobileAbout}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/submit" onClick={closeMenu} className={mobileSubmit}>
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
