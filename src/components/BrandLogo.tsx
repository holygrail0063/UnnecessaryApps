"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

/**
 * Brand marks load from `/public` via plain `<img>` so they always render
 * (no image optimizer pipeline). Decorative imgs — parent links have aria-label.
 */
export function BrandLogoHeader({
  onNavigate,
}: {
  onNavigate?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="Unnecessary Apps home"
      className="group flex min-w-0 shrink-0 items-center rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:scale-[1.04] motion-safe:active:scale-[0.98]"
    >
      <span className="relative block h-9 w-9 shrink-0 overflow-hidden lg:hidden">
        <img
          src="/logo-icon.png"
          alt=""
          width={512}
          height={512}
          decoding="async"
          fetchPriority="high"
          loading="eager"
          className="h-full w-full object-contain object-left"
          aria-hidden
        />
      </span>
      <span
        className="relative hidden h-10 shrink-0 overflow-hidden lg:block"
        style={{ width: "min(260px, min(42vw, 400px))" }}
      >
        <img
          src="/logo-wide.png"
          alt=""
          width={400}
          height={96}
          decoding="async"
          fetchPriority="high"
          loading="eager"
          className="h-10 w-full object-contain object-left"
          aria-hidden
        />
      </span>
    </Link>
  );
}

export function BrandLogoFooter() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:scale-[1.03]"
      aria-label="Unnecessary Apps home"
    >
      <span className="relative block h-12 w-12 shrink-0 overflow-hidden">
        <img
          src="/logo-icon.png"
          alt=""
          width={512}
          height={512}
          decoding="async"
          loading="lazy"
          className="h-full w-full object-contain"
          aria-hidden
        />
      </span>
      <span className="font-display text-2xl font-bold">UnnecessaryApps</span>
    </Link>
  );
}

export function BrandLogoAppNav() {
  return (
    <Link
      href="/"
      className="group flex min-w-0 max-w-[55%] items-center gap-2 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.03] sm:max-w-none"
      aria-label="Unnecessary Apps home"
    >
      <span className="relative block h-8 w-8 shrink-0 overflow-hidden sm:h-9 sm:w-9">
        <img
          src="/logo-icon.png"
          alt=""
          width={512}
          height={512}
          decoding="async"
          fetchPriority="high"
          loading="eager"
          className="h-full w-full object-contain"
          aria-hidden
        />
      </span>
      <span className="truncate font-display text-sm font-bold tracking-tight text-text-main transition group-hover:text-text-muted sm:text-base">
        UnnecessaryApps
      </span>
    </Link>
  );
}
