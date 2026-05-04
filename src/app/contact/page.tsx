import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteSubpageLayout } from "@/components/layouts/SiteSubpageLayout";
import { ContactPageForm } from "@/components/ContactPageForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a message, app idea, complaint, compliment, or unnecessary prophecy.",
};

function SocialBtn({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-12 min-w-[3rem] flex-1 items-center justify-center rounded-full border-[3px] border-ink bg-bg-cream font-display text-xs font-bold uppercase tracking-wide text-text-main shadow-cartoon-sm transition hover:-translate-y-0.5 hover:bg-pink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:flex-none sm:px-5"
    >
      {children}
    </a>
  );
}

export default function ContactPage() {
  return (
    <SiteSubpageLayout
      wide
      title="Contact"
      subtitle="Send a message, app idea, complaint, compliment, or unnecessary prophecy."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:items-start">
        <div className="rounded-[22px] border-[3px] border-ink bg-bg-main/70 p-5 shadow-cartoon-sm sm:p-6">
          <p className="font-display text-lg font-bold leading-snug text-text-main">
            Got an app idea so useless it might be perfect? Send it in. The worse it sounds, the more
            we probably need it.
          </p>
        </div>
        <ContactPageForm />
      </div>

      <section className="mt-14 rounded-[22px] border-[4px] border-ink bg-bg-main/50 p-6 shadow-cartoon sm:p-8">
        <h2 className="font-display text-xl font-bold text-text-main sm:text-2xl">
          Find us where time goes missing
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <SocialBtn label="X (Twitter)" href="https://twitter.com">
            X
          </SocialBtn>
          <SocialBtn label="Instagram" href="https://instagram.com">
            IG
          </SocialBtn>
          <SocialBtn label="TikTok" href="https://tiktok.com">
            TikTok
          </SocialBtn>
          <SocialBtn label="Discord" href="https://discord.com">
            Discord
          </SocialBtn>
        </div>
        <p className="mt-4 font-display text-sm font-semibold text-text-muted">
          Placeholder links — swap for your real profiles when ready.
        </p>
      </section>
    </SiteSubpageLayout>
  );
}
