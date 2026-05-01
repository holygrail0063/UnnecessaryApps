import type { ReactNode } from "react";
import Link from "next/link";
import {
  FOOTER_COMMUNITY_LINKS,
  FOOTER_EXPLORE_LINKS,
  FOOTER_LEGAL_LINKS,
} from "@/data/homepage";
import { NewsletterForm } from "@/components/NewsletterForm";
import { RandomAppButton } from "@/components/RandomAppButton";

function LogoMarkTiny() {
  return (
    <svg width="44" height="44" viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="18" fill="#EDE7FF" stroke="#DDD3EE" strokeWidth="1.5" />
      <circle cx="14" cy="17" r="5" fill="#FFE8A3" opacity="0.92" />
      <circle cx="26" cy="21" r="7" fill="#FF9AA2" opacity="0.9" />
      <ellipse cx="20" cy="29" rx="10" ry="6" fill="#B8F2D8" opacity="0.85" />
    </svg>
  );
}

function SocialSvg({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ua-border bg-white/75 text-ua-text shadow-[var(--shadow-ua-soft-sm)] transition hover:-translate-y-0.5 hover:border-ua-coral/55 hover:bg-ua-yellow/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5]"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-ua-border/60 bg-[#F1EDFF]/95 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <LogoMarkTiny />
              <span className="text-xl font-extrabold text-ua-text">UnnecessaryApps</span>
            </div>
            <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-ua-muted">
              Collecting the internet’s most delightfully useless apps so you don’t have to.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <SocialSvg label="Twitter / X" href="https://twitter.com">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialSvg>
              <SocialSvg label="Instagram" href="https://instagram.com">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.2" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
                </svg>
              </SocialSvg>
              <SocialSvg label="TikTok" href="https://tiktok.com">
                <svg width="16" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.589 9.079a5.45 5.45 0 01-3.31-1.13V15.3a6.7 6.7 0 11-6.67-6.7v3.16a3.53 3.53 0 103.53 3.54V2h3.45a5.45 5.45 0 003.01 5.08z" />
                </svg>
              </SocialSvg>
              <SocialSvg label="Discord" href="https://discord.com">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.105 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.876 19.876 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                </svg>
              </SocialSvg>
            </div>
          </div>

          <div className="rounded-[28px] border border-ua-border/70 bg-[#FFFDF8]/90 p-6 shadow-[var(--shadow-ua-soft-sm)] sm:p-8">
            <h2 className="text-lg font-extrabold text-ua-text">
              Get pointless updates
            </h2>
            <p className="mt-1 text-sm font-medium text-ua-muted">
              No spam. Just unnecessary apps.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-ua-border/50 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-ua-muted">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm font-semibold text-ua-text">
              {FOOTER_EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  {l.label === "Random App" ? (
                    <span id="random-app" className="inline-block scroll-mt-36">
                      <RandomAppButton
                        className="text-left underline decoration-ua-coral/50 decoration-2 underline-offset-2 transition hover:text-ua-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5]"
                        label="Open a random live app"
                      >
                        Random App
                      </RandomAppButton>
                    </span>
                  ) : (
                    <Link
                      href={l.href}
                      className="transition hover:text-ua-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5]"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-ua-muted">
              Community
            </h3>
            <ul className="mt-4 space-y-2 text-sm font-semibold text-ua-text">
              {FOOTER_COMMUNITY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="transition hover:text-ua-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-ua-muted">
              Legal
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ua-text">
              {FOOTER_LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="transition hover:text-ua-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-dashed border-ua-border/60 pt-8 text-xs font-semibold text-ua-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>© {year} UnnecessaryApps.com</p>
          <p className="text-ua-text/80">Made with ☁ and way too much free time</p>
          <span className="inline-flex self-start rounded-full border border-ua-border bg-ua-mint/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ua-text sm:self-auto">
            Pointless, but cute.
          </span>
        </div>
      </div>
    </footer>
  );
}
