import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PlaceholderAppPage } from "@/components/PlaceholderAppPage";

export const metadata: Metadata = {
  title: "Professional Button Clicker",
  description: "Click a button. Earn completely fake professional titles.",
};

export default function ProfessionalButtonClickerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 border-t border-zinc-200/60 bg-[#FAFAF8]">
        <PlaceholderAppPage
          title="Professional Button Clicker"
          description="Soon you’ll rack up titles that look serious on a résumé and absurd in real life."
        />
      </main>
      <Footer />
    </>
  );
}
