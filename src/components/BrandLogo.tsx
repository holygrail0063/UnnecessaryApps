"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

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
      <span className="relative block lg:hidden">
        <Image
          src="/logo-icon.png"
          alt=""
          width={512}
          height={512}
          aria-hidden
          className="h-9 w-9 object-contain object-left"
          sizes="36px"
          priority
        />
      </span>
      <span className="relative hidden lg:block">
        <Image
          src="/logo-wide.png"
          alt=""
          width={400}
          height={96}
          aria-hidden
          className="h-10 w-auto max-h-10 max-w-[min(260px,48vw)] object-contain object-left"
          sizes="(max-width: 1023px) 0px, 260px"
          priority
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
      <Image
        src="/logo-icon.png"
        alt=""
        width={512}
        height={512}
        aria-hidden
        className="h-12 w-12 object-contain"
        sizes="48px"
      />
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
      <Image
        src="/logo-icon.png"
        alt=""
        width={512}
        height={512}
        aria-hidden
        className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
        sizes="36px"
      />
      <span className="truncate font-display text-sm font-bold tracking-tight text-text-main transition group-hover:text-text-muted sm:text-base">
        UnnecessaryApps
      </span>
    </Link>
  );
}
