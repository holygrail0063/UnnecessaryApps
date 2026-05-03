"use client";

import { SHOP_CATEGORY_TABS } from "@/data/homepage";
import { useShopCategory } from "@/components/shop/ShopCategoryContext";

export function CategoryShopBar() {
  const { category, setCategory } = useShopCategory();

  return (
    <div
      id="category-strip"
      className="scroll-mt-24 border-y-[3px] border-ink bg-pink-main"
    >
      <div className="mx-auto max-w-6xl px-2 py-3 sm:px-4 sm:py-4">
        <p className="sr-only">Browse by silly category</p>
        <div className="flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:gap-2 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {SHOP_CATEGORY_TABS.map((tab) => {
            const active = category === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(tab.id)}
                className={`shrink-0 whitespace-nowrap px-4 py-3 font-display text-[11px] font-bold uppercase tracking-wide text-text-main transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-ink sm:px-5 sm:text-xs md:text-sm ${
                  active
                    ? "underline decoration-[3px] decoration-text-main underline-offset-[10px] decoration-wavy"
                    : "rounded-xl hover:bg-pink-soft/90 active:bg-pink-hover/80"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
