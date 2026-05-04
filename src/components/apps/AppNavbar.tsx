import Link from "next/link";
import { BrandLogoAppNav } from "@/components/BrandLogo";

type AppNavbarProps = {
  /** Small pill beside the logo, e.g. FEATURED APP */
  badge?: string;
};

export function AppNavbar({ badge = "FEATURED APP" }: AppNavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b-[4px] border-ink bg-pink-main">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <BrandLogoAppNav />
          <span className="hidden shrink-0 rounded-full border-[3px] border-ink bg-bg-cream px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm sm:inline sm:text-[11px]">
            {badge}
          </span>
        </div>
        <Link
          href="/"
          className="btn-cartoon inline-flex shrink-0 items-center rounded-full border-[3px] border-ink bg-bg-cream px-3 py-2 font-display text-xs font-bold text-text-main shadow-cartoon-sm hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-4 sm:text-sm"
        >
          Back to Home
        </Link>
      </div>
      <div className="border-t-[3px] border-ink/10 bg-pink-soft/40 px-4 py-2 text-center sm:hidden">
        <span className="inline-flex rounded-full border-[3px] border-ink bg-bg-cream px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm">
          {badge}
        </span>
      </div>
    </header>
  );
}
