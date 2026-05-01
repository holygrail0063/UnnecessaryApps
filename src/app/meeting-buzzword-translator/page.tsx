import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PlaceholderAppPage } from "@/components/PlaceholderAppPage";

export const metadata: Metadata = {
  title: "Meeting Buzzword Translator",
  description: "Turn plain English into glorious corporate nonsense.",
};

export default function MeetingBuzzwordPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 border-t border-zinc-200/60 bg-[#FAFAF8]">
        <PlaceholderAppPage
          title="Meeting Buzzword Translator"
          description="This app will translate your sensible sentences into boardroom poetry. The build is intentionally still unnecessary."
        />
      </main>
      <Footer />
    </>
  );
}
