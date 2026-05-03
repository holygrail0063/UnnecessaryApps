import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { BubbleWrapBusting } from "@/components/apps/BubbleWrapBusting";

export const metadata: Metadata = {
  title: "Bubble Wrap Busting",
  description: "Pop endless digital bubbles and feel fake productivity.",
};

export default function BubbleWrapBustingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar badge="POINTLESS APP" />
      <main className="flex-1">
        <BubbleWrapBusting />
      </main>
      <AppFooter />
    </div>
  );
}
