"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ShopCategoryId } from "@/data/homepage";

type ShopCategoryContextValue = {
  category: ShopCategoryId;
  setCategory: (c: ShopCategoryId) => void;
};

const ShopCategoryContext = createContext<ShopCategoryContextValue | null>(
  null,
);

export function ShopCategoryProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<ShopCategoryId>("all");
  const value = useMemo(
    () => ({ category, setCategory }),
    [category],
  );
  return (
    <ShopCategoryContext.Provider value={value}>
      {children}
    </ShopCategoryContext.Provider>
  );
}

export function useShopCategory() {
  const ctx = useContext(ShopCategoryContext);
  if (!ctx) {
    throw new Error("useShopCategory must be used within ShopCategoryProvider");
  }
  return ctx;
}
