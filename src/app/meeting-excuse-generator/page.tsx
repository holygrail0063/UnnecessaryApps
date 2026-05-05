import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { MeetingExcuseGenerator } from "@/components/apps/MeetingExcuseGenerator";

export const metadata: Metadata = {
  title: "Meeting Excuse Generator",
  description:
    "Generate workplace-safe, silly excuses for meetings you do not want — async alignment optional.",
};

export default function MeetingExcuseGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <MeetingExcuseGenerator />
      </main>
      <AppFooter />
    </div>
  );
}
