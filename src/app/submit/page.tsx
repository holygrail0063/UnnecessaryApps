import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Submit an Idea",
  description: "Suggest the next unnecessary app.",
};

export default function SubmitPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 border-t border-zinc-200/60 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
            Submit an Idea
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            A submission flow would be useful. That is exactly why it is not here
            yet. For now, this page exists so the nav feels honest — and so you
            know we are serious about unserious things.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            When ideas open up, this is where they will land.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
