import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "Why Unnecessary Apps exists.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 border-t border-zinc-200/60 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
            About
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            Unnecessary Apps is a home for small, polished experiments that do not
            need to exist — built like a product launch, delivered like a joke
            you cannot quite explain to your manager.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600">
            If you expected a roadmap, OKRs, or “impact,” you are in the wrong
            neighborhood. If you wanted something strangely satisfying for sixty
            seconds, you are in the right one.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex rounded-full border border-zinc-200 bg-[#FAFAF8] px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
