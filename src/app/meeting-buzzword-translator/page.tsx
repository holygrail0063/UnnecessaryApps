import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { MeetingBuzzwordTranslator } from "@/components/apps/MeetingBuzzwordTranslator";

export const metadata: Metadata = {
  title: "Meeting Buzzword Translator",
  description: "Turn plain English into glorious corporate nonsense.",
};

export default function MeetingBuzzwordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF8]">
      <AppNavbar />
      <main className="flex-1">
        <MeetingBuzzwordTranslator />
      </main>
      <AppFooter />
    </div>
  );
}
