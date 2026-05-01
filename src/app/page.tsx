import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HomeFeaturedSection } from "@/components/HomeFeaturedSection";
import { HomeViewAllCta } from "@/components/HomeViewAllCta";
import { StatsStrip } from "@/components/StatsStrip";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HomeFeaturedSection />
        <HomeViewAllCta />
        <StatsStrip />
      </main>
      <Footer />
    </>
  );
}
