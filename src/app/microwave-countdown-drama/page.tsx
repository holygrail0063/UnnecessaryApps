import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { MicrowaveCountdownDrama } from "@/components/apps/MicrowaveCountdownDrama";

export const metadata: Metadata = {
  title: "Microwave Countdown Drama",
  description:
    "Turns a short timer into a cinematic countdown event. Your leftovers do not need suspense.",
};

export default function MicrowaveCountdownDramaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <MicrowaveCountdownDrama />
      </main>
      <AppFooter />
    </div>
  );
}
