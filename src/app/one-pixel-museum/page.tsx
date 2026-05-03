import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { OnePixelMuseum } from "@/components/apps/OnePixelMuseum";

export const metadata: Metadata = {
  title: "One Pixel Museum",
  description: "A museum dedicated to exactly one pixel. It’s magnificent.",
};

export default function OnePixelMuseumPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <OnePixelMuseum />
      </main>
      <AppFooter />
    </div>
  );
}
