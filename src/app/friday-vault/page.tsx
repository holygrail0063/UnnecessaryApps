import type { Metadata } from "next";
import { FridayVault } from "@/components/easter-eggs/FridayVault";

export const metadata: Metadata = {
  title: "Friday Vault",
  description: "A highly unnecessary tradition, protected by the calendar.",
  robots: { index: false, follow: false },
};

export default function FridayVaultPage() {
  return <FridayVault />;
}
