import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { TabGraveyard } from "@/components/apps/TabGraveyard";

export const metadata: Metadata = {
  title: "Tab Graveyard",
  description: "A fake cemetery for tabs you definitely planned to read.",
};

export default function TabGraveyardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <TabGraveyard />
      </main>
      <AppFooter />
    </div>
  );
}
