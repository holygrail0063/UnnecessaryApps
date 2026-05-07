import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { ProfessionalOverthinker } from "@/components/apps/ProfessionalOverthinker";

export const metadata: Metadata = {
  title: "Professional Overthinker",
  description:
    "Generates 10 dramatic interpretations of a simple message — anxiety did not need automation.",
};

export default function ProfessionalOverthinkerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <ProfessionalOverthinker />
      </main>
      <AppFooter />
    </div>
  );
}
