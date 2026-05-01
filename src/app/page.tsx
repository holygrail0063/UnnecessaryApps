import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedApps } from "@/components/FeaturedApps";
import { AppGallery } from "@/components/AppGallery";
import { WhyExists } from "@/components/WhyExists";
import { RandomAppCTA } from "@/components/RandomAppCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedApps />
        <AppGallery />
        <WhyExists />
        <RandomAppCTA />
      </main>
      <Footer />
    </>
  );
}
