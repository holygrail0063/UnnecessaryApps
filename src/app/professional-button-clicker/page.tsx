import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { ProfessionalButtonClicker } from "@/components/apps/ProfessionalButtonClicker";

export const metadata: Metadata = {
  title: "Professional Button Clicker",
  description: "Click a button. Earn completely fake professional titles.",
};

export default function ProfessionalButtonClickerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF8]">
      <AppNavbar />
      <main className="flex-1">
        <ProfessionalButtonClicker />
      </main>
      <AppFooter />
    </div>
  );
}
