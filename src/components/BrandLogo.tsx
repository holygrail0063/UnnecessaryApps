"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useRef, type MouseEvent } from "react";
import type { StaticImageData } from "next/image";
import logo from "@/assets/brand/logo.png";
import { FRIDAY_VAULT_ENTRY_FLASH_KEY } from "@/lib/fridayVault";

/**
 * Single brand mark from `src/assets/brand/logo.png` (copy of `public/logo.png`).
 */
function BrandImg({
  data,
  className,
  priority,
}: {
  data: StaticImageData;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={data.src}
      width={data.width}
      height={data.height}
      alt=""
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      className={className}
      aria-hidden
    />
  );
}

const FRIDAY_EGG_WINDOW_MS = 4000;
const FRIDAY_EGG_CLICKS = 5;

export function BrandLogoHeader({
  onNavigate,
}: {
  onNavigate?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const eggWindowStartRef = useRef<number | null>(null);
  const eggClickCountRef = useRef(0);

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      const now = Date.now();
      if (eggWindowStartRef.current === null || now - eggWindowStartRef.current > FRIDAY_EGG_WINDOW_MS) {
        eggWindowStartRef.current = now;
        eggClickCountRef.current = 1;
      } else {
        eggClickCountRef.current += 1;
      }
      if (eggClickCountRef.current >= FRIDAY_EGG_CLICKS) {
        e.preventDefault();
        eggWindowStartRef.current = null;
        eggClickCountRef.current = 0;
        try {
          sessionStorage.setItem(FRIDAY_VAULT_ENTRY_FLASH_KEY, "1");
        } catch {
          /* ignore */
        }
        router.push("/friday-vault");
        return;
      }
    }
    onNavigate?.(e);
  };

  return (
    <Link
      href="/"
      onClick={handleLogoClick}
      aria-label="Unnecessary Apps home"
      className="group flex min-w-0 shrink-0 items-center gap-2 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:scale-[1.04] motion-safe:active:scale-[0.98] sm:gap-3"
    >
      <span className="relative flex h-12 max-h-12 w-auto max-w-[min(380px,82vw)] shrink-0 items-center sm:h-14 sm:max-h-14">
        <BrandImg
          data={logo}
          priority
          className="max-h-12 w-auto max-w-full object-contain object-left sm:max-h-14"
        />
      </span>
      <span className="truncate font-display text-base font-bold lowercase tracking-tight text-text-main sm:text-lg md:text-xl">
        unnecessary apps
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
      <span className="relative block h-20 w-20 shrink-0 overflow-hidden sm:h-24 sm:w-24">
        <BrandImg
          data={logo}
          className="h-full w-full object-contain"
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
      <span className="relative block h-8 w-auto max-h-9 max-w-[min(200px,45vw)] shrink-0 overflow-hidden sm:h-10 sm:max-h-10 sm:max-w-[min(240px,50vw)]">
        <BrandImg
          data={logo}
          priority
          className="h-full w-full object-contain object-left"
        />
      </span>
      <span className="truncate font-display text-sm font-bold tracking-tight text-text-main transition group-hover:text-text-muted sm:text-base">
        UnnecessaryApps
      </span>
    </Link>
  );
}
