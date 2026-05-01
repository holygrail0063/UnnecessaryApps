import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PlaceholderAppPage } from "@/components/PlaceholderAppPage";

export const metadata: Metadata = {
  title: "Fake Loading Screen Generator",
  description: "Experience the thrill of watching progress bars pretend to work.",
};

export default function FakeLoadingScreenPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 border-t border-zinc-200/60 bg-[#FAFAF8]">
        <PlaceholderAppPage
          title="Fake Loading Screen Generator"
          description="A loading screen that commits to the bit. Implementation loading… eventually."
        />
      </main>
      <Footer />
    </>
  );
}
