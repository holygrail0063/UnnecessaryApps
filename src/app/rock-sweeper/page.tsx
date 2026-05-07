import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { RockSweeper } from "@/components/apps/RockSweeper";

export const metadata: Metadata = {
  title: "Rock Sweeper",
  description:
    "Dig through suspicious dirt tiles to find one emotionally average rock. Archaeology did not need a downgrade.",
};

export default function RockSweeperPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <RockSweeper />
      </main>
      <AppFooter />
    </div>
  );
}
