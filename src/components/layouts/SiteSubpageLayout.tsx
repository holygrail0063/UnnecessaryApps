import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type SiteSubpageLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  /** Wider inner column for grid layouts */
  wide?: boolean;
};

export function SiteSubpageLayout({
  title,
  subtitle,
  children,
  wide,
}: SiteSubpageLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-blue-main px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div
          className={`mx-auto ${wide ? "max-w-5xl lg:max-w-6xl" : "max-w-3xl lg:max-w-4xl"}`}
        >
          <article className="rounded-[28px] border-[4px] border-ink bg-bg-cream p-6 shadow-cartoon sm:p-8 lg:p-10">
            <header className="border-b-[3px] border-ink/15 pb-6">
              <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-text-main sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 font-display text-lg font-bold leading-snug text-text-muted sm:text-xl">
                {subtitle}
              </p>
            </header>
            <div className="pt-8">{children}</div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalIntro({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border-[3px] border-ink/20 bg-bg-main/60 px-4 py-3 font-display text-sm font-bold text-text-muted">
      {children}
    </p>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-28 first:mt-8">
      <h2 className="font-display text-xl font-bold text-text-main sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base font-semibold leading-relaxed text-text-muted [&_a]:font-bold [&_a]:text-blue-hover [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
