import { Fragment } from "react";
import { SHOP_CATEGORY_TABS } from "@/data/homepage";

/** Decorative category labels only — not interactive. */
export function CategoryShopBar() {
  return (
    <div
      id="category-strip"
      className="scroll-mt-24 border-y-[3px] border-ink bg-pink-main"
    >
      <div className="mx-auto max-w-6xl px-2 py-3 sm:px-4 sm:py-4">
        <p className="sr-only">
          Category labels are decorative — browse all apps below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-display text-[11px] font-bold uppercase tracking-wide text-text-main sm:gap-x-4 sm:text-xs md:text-sm">
          {SHOP_CATEGORY_TABS.map((tab, i) => (
            <Fragment key={tab.id}>
              {i > 0 ? (
                <span
                  className="select-none text-text-main/35"
                  aria-hidden
                >
                  ·
                </span>
              ) : null}
              <span className="whitespace-nowrap">{tab.label}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
