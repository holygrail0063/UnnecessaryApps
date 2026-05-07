import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { DigitalRockCollection } from "@/components/apps/DigitalRockCollection";

export const metadata: Metadata = {
  title: "Digital Rock Collection",
  description:
    "Collect fake rocks with fake names and fake personalities. Nature, but worse.",
};

export default function DigitalRockCollectionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <DigitalRockCollection />
      </main>
      <AppFooter />
    </div>
  );
}
