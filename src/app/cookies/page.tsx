import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalIntro,
  LegalSection,
  SiteSubpageLayout,
} from "@/components/layouts/SiteSubpageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Tiny browser crumbs, not the fun edible kind.",
};

export default function CookiesPage() {
  return (
    <SiteSubpageLayout
      title="Cookie Policy"
      subtitle="Tiny browser crumbs, not the fun edible kind."
    >
      <LegalIntro>Last updated: May 2026</LegalIntro>

      <p className="mt-6 text-base font-semibold leading-relaxed text-text-muted">
        This Cookie Policy explains how UnnecessaryApps.com may use cookies and similar technologies.
      </p>

      <LegalSection title="1. What cookies are">
        <p>
          Cookies are small files stored on your device by your browser. They help websites remember
          things, measure usage, improve performance, or support basic features.
        </p>
      </LegalSection>

      <LegalSection title="2. How this website may use cookies">
        <p>UnnecessaryApps.com may use cookies for:</p>
        <ul>
          <li>Basic website functionality</li>
          <li>Remembering simple preferences</li>
          <li>Analytics and traffic measurement</li>
          <li>Performance and debugging</li>
          <li>Security and abuse prevention</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Types of cookies we may use">
        <p>
          <strong className="text-text-main">Essential cookies:</strong> These help the website work
          properly. Some parts of the site may not function correctly without them.
        </p>
        <p className="!mt-4">
          <strong className="text-text-main">Preference cookies:</strong> These may remember small
          choices, like settings or display preferences.
        </p>
        <p className="!mt-4">
          <strong className="text-text-main">Analytics cookies:</strong> These help us understand
          which pages and apps are being used, so we can improve the website.
        </p>
        <p className="!mt-4">
          <strong className="text-text-main">Third-party cookies:</strong> Some embedded tools,
          social links, analytics providers, or external services may set their own cookies. Their
          cookies are controlled by their own policies.
        </p>
      </LegalSection>

      <LegalSection title="4. Managing cookies">
        <p>
          You can manage or block cookies through your browser settings. You can also clear cookies
          from your device at any time. Blocking cookies may cause some parts of the website to
          behave differently.
        </p>
      </LegalSection>

      <LegalSection title="5. No cookie-based selling">
        <p>We do not use cookies to sell your personal information.</p>
      </LegalSection>

      <LegalSection title="6. Updates">
        <p>
          We may update this Cookie Policy as the website changes or if new tools are added.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>
          For cookie-related questions, visit the{" "}
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
