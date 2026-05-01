import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { FakeLoadingScreenGenerator } from "@/components/apps/FakeLoadingScreenGenerator";

export const metadata: Metadata = {
  title: "Fake Loading Screen Generator",
  description: "Experience the thrill of watching progress bars pretend to work.",
};

export default function FakeLoadingScreenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF8]">
      <AppNavbar />
      <main className="flex-1">
        <FakeLoadingScreenGenerator />
      </main>
      <AppFooter />
    </div>
  );
}
