import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { BreadWeather } from "@/components/apps/BreadWeather";

export const metadata: Metadata = {
  title: "Bread Weather",
  description: "The forecast, but for bread. Will it be crispy or soggy?",
};

export default function BreadWeatherPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <BreadWeather />
      </main>
      <AppFooter />
    </div>
  );
}
