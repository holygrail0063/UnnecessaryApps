import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { MicrowaveBeepTranslator } from "@/components/apps/MicrowaveBeepTranslator";

export const metadata: Metadata = {
  title: "Microwave Beep Translator",
  description: "Finally understand what those beeps actually mean.",
};

export default function MicrowaveBeepTranslatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <MicrowaveBeepTranslator />
      </main>
      <AppFooter />
    </div>
  );
}
