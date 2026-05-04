import type { ReactNode } from "react";
import Link from "next/link";
import type { FooterLink as FooterLinkType } from "@/data/homepage";
import {
  FOOTER_COMMUNITY_LINKS,
  FOOTER_EXPLORE_LINKS,
  FOOTER_LEGAL_LINKS,
} from "@/data/homepage";
import { BrandLogoFooter } from "@/components/BrandLogo";
import { NewsletterForm } from "@/components/NewsletterForm";
import { RandomAppButton } from "@/components/RandomAppButton";

function FooterRouteLink({ href, label }: FooterLinkType) {
  const cls =
    "text-text-main hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={cls}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {label}
    </a>
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
      className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-ink bg-bg-cream text-text-main shadow-cartoon-sm transition hover:-translate-y-0.5 hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-[4px] border-ink bg-blue-main px-4 py-16 text-text-main sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <BrandLogoFooter />
            <p className="mt-4 max-w-md font-semibold leading-relaxed text-text-main/95">
              Collecting the internet’s most delightfully useless apps so you don’t have to.
            </p>
            {/*
              Social icons — uncomment and replace href when ready. Discord intentionally removed.

              <div className="mt-6 flex flex-wrap gap-3">
                <SocialSvg label="Twitter / X" href="YOUR_X_URL">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </SocialSvg>
                <SocialSvg label="Instagram" href="YOUR_INSTAGRAM_URL">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.2" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
                  </svg>
                </SocialSvg>
                <SocialSvg label="TikTok" href="YOUR_TIKTOK_URL">
                  <svg width="16" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M19.589 9.079a5.45 5.45 0 01-3.31-1.13V15.3a6.7 6.7 0 11-6.67-6.7v3.16a3.53 3.53 0 103.53 3.54V2h3.45a5.45 5.45 0 003.01 5.08z" />
                  </svg>
                </SocialSvg>
              </div>
            */}
          </div>

          <div className="rounded-[24px] border-[3px] border-ink bg-bg-cream p-6 shadow-cartoon sm:p-8">
            <h2 className="font-display text-xl font-bold">Get pointless updates</h2>
            <p className="mt-1 font-semibold text-text-muted">
              No spam. Just unnecessary apps.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t-[3px] border-ink/30 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:border-r-[3px] lg:border-ink/25 lg:pr-8">
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-text-main/90">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 font-display font-bold">
              {FOOTER_EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  {l.label === "Random App" ? (
                    <span id="random-app" className="inline-block scroll-mt-36">
                      <RandomAppButton
                        className="text-left font-display font-bold text-text-main underline decoration-2 underline-offset-2 transition hover:text-bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                        label="Open a random live app"
                      >
                        Random App
                      </RandomAppButton>
                    </span>
                  ) : (
                    <FooterRouteLink {...l} />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:border-r-[3px] lg:border-ink/25 lg:pr-8">
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-text-main/90">
              Community
            </h3>
            <ul className="mt-4 space-y-2 font-display font-bold">
              {FOOTER_COMMUNITY_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterRouteLink {...l} />
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-text-main/90">
              Legal
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 font-display font-bold">
              {FOOTER_LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterRouteLink {...l} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t-[3px] border-ink/35 pt-8 text-sm font-bold text-text-main sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>© {year} UnnecessaryApps.com</p>
          <p>Made with ❤️ and way too much free time.</p>
          <span className="inline-flex self-start rounded-full border-[3px] border-ink bg-pink-soft px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-wide sm:self-auto">
            Still pointless.
          </span>
        </div>
      </div>
    </footer>
  );
}
