import { Navbar } from "@/components/Navbar";
import { CategoryShopBar } from "@/components/CategoryShopBar";
import { Hero } from "@/components/Hero";
import { HomeFeaturedSection } from "@/components/HomeFeaturedSection";
import { HomeViewAllCta } from "@/components/HomeViewAllCta";
import { StatsStrip } from "@/components/StatsStrip";
import { HomeBigCta } from "@/components/HomeBigCta";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <CategoryShopBar />
      <main className="flex-1">
        <Hero />
        <HomeFeaturedSection />
        <HomeViewAllCta />
        <StatsStrip />
        <HomeBigCta />
      </main>
      <Footer />
    </>
  );
}
