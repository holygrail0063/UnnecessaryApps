import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalIntro,
  LegalSection,
  SiteSubpageLayout,
} from "@/components/layouts/SiteSubpageLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The boring rules for a very unnecessary website.",
};

export default function TermsPage() {
  return (
    <SiteSubpageLayout
      title="Terms of Use"
      subtitle="The boring rules for a very unnecessary website."
    >
      <LegalIntro>Last updated: May 2026</LegalIntro>

      <p className="mt-6 text-base font-semibold leading-relaxed text-text-muted">
        Welcome to UnnecessaryApps.com. By using this website, you agree to these Terms of Use. If
        you do not agree with these terms, please do not use the website.
      </p>

      <LegalSection title="1. What this website is">
        <p>
          UnnecessaryApps.com is a collection of small, playful, experimental, and mostly useless
          web apps built for fun. The apps are meant for entertainment, creativity, and harmless
          internet time-wasting.
        </p>
      </LegalSection>

      <LegalSection title="2. No serious advice">
        <p>
          Nothing on this website should be treated as professional, financial, legal, medical,
          immigration, technical, or life advice. The apps may be silly, inaccurate, random,
          dramatic, or intentionally pointless.
        </p>
      </LegalSection>

      <LegalSection title="3. Use at your own risk">
        <p>
          You agree to use the website responsibly. We do our best to keep things working, but we do
          not guarantee that every app will be accurate, available, bug-free, or useful.
        </p>
      </LegalSection>

      <LegalSection title="4. User submissions">
        <p>
          If you submit an app idea, message, feedback, or any other content, you confirm that you
          have the right to share it. You also allow UnnecessaryApps.com to use, display, modify, or
          build on your submission without payment or obligation.
        </p>
      </LegalSection>

      <LegalSection title="5. Do not misuse the website">
        <p>You agree not to:</p>
        <ul>
          <li>Break, hack, overload, or interfere with the website</li>
          <li>Use the website for spam, scams, abuse, or illegal activity</li>
          <li>Upload harmful code or malicious content</li>
          <li>Copy the website branding or content in a misleading way</li>
          <li>Pretend to be associated with UnnecessaryApps.com without permission</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Intellectual property">
        <p>
          The UnnecessaryApps.com name, logo, visual style, app concepts, page designs, copy, and
          original content belong to UnnecessaryApps.com unless otherwise stated. You may not reuse
          them commercially without permission.
        </p>
      </LegalSection>

      <LegalSection title="7. Third-party links">
        <p>
          This website may link to social media pages, external websites, tools, or services. We
          are not responsible for third-party websites, content, policies, or anything weird they
          do.
        </p>
      </LegalSection>

      <LegalSection title="8. Availability">
        <p>
          We may update, remove, rename, redesign, break, fix, or discontinue any app or page at
          any time. Sometimes on purpose. Sometimes because something went wrong.
        </p>
      </LegalSection>

      <LegalSection title="9. Limitation of liability">
        <p>
          To the fullest extent allowed by law, UnnecessaryApps.com is not responsible for damages,
          losses, bugs, errors, wasted time, emotional attachment to useless buttons, or any
          consequences from using the website.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to these terms">
        <p>
          We may update these Terms of Use from time to time. The latest version will be posted on
          this page with the updated date.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact">
        <p>
          For questions about these terms, visit the{" "}
          <Link
            href="/contact"
            className="font-bold text-blue-hover underline decoration-2 underline-offset-2"
          >
            Contact
          </Link>{" "}
          page.
        </p>
      </LegalSection>
    </SiteSubpageLayout>
  );
}
