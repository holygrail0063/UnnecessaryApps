import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { IsItMondayYet } from "@/components/apps/IsItMondayYet";

export const metadata: Metadata = {
  title: "Is It Monday Yet?",
  description:
    "Checks the calendar so you don’t have to. Spoiler: it’s probably Monday.",
};

export default function IsItMondayYetPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <IsItMondayYet />
      </main>
      <AppFooter />
    </div>
  );
}
