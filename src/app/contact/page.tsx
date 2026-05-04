import type { Metadata } from "next";
import { SiteSubpageLayout } from "@/components/layouts/SiteSubpageLayout";
import { ContactPageForm } from "@/components/ContactPageForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a message, app idea, complaint, compliment, or unnecessary prophecy.",
};

/*
  Optional “Find us” social row (paste above closing </SiteSubpageLayout> when you have URLs).
  Discord intentionally omitted.

  <section className="mt-14 rounded-[22px] border-[4px] border-ink bg-bg-main/50 p-6 shadow-cartoon sm:p-8">
    <h2 className="font-display text-xl font-bold text-text-main sm:text-2xl">
      Find us where time goes missing
    </h2>
    <div className="mt-6 flex flex-wrap gap-3">
      <a href="YOUR_X_URL" ...>X</a>
      <a href="YOUR_INSTAGRAM_URL" ...>IG</a>
      <a href="YOUR_TIKTOK_URL" ...>TikTok</a>
    </div>
  </section>
*/

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
    </SiteSubpageLayout>
  );
}
