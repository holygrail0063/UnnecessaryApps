import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalIntro,
  LegalSection,
  SiteSubpageLayout,
} from "@/components/layouts/SiteSubpageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "We respect your privacy, even when the apps are pointless.",
};

export default function PrivacyPage() {
  return (
    <SiteSubpageLayout
      title="Privacy Policy"
      subtitle="We respect your privacy, even when the apps are pointless."
    >
      <LegalIntro>Last updated: May 2026</LegalIntro>

      <p className="mt-6 text-base font-semibold leading-relaxed text-text-muted">
        This Privacy Policy explains what information UnnecessaryApps.com may collect, how it may be
        used, and how we try to keep things simple and respectful.
      </p>

      <LegalSection title="1. Information we may collect">
        <p>We may collect limited information when you use the website, such as:</p>
        <ul>
          <li>
            Information you submit through forms, like your name, email address, message, or app
            idea
          </li>
          <li>Newsletter signup information, if you choose to subscribe</li>
          <li>
            Basic technical information, such as browser type, device type, pages visited, and
            approximate usage activity
          </li>
          <li>Cookies or similar technologies, if enabled on the website</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. How we use information">
        <p>We may use the information to:</p>
        <ul>
          <li>Respond to messages or app ideas</li>
          <li>Send updates if you subscribed to the newsletter</li>
          <li>Improve the website and understand what people use</li>
          <li>Fix bugs, prevent abuse, and keep the website working</li>
          <li>Make the website more fun and less accidentally broken</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Newsletter emails">
        <p>
          If you subscribe to emails, we may use your email address to send updates about new
          apps, website changes, or other unnecessary things. You can unsubscribe at any time using
          the unsubscribe option in the email, if available.
        </p>
      </LegalSection>

      <LegalSection title="4. Contact forms">
        <p>
          If you send a message through the Contact page, we may use your provided information only
          to read and respond to your message. Please do not submit passwords, sensitive personal
          details, payment information, or anything you would not want sent through a basic website
          form.
        </p>
      </LegalSection>

      <LegalSection title="5. Analytics">
        <p>
          We may use privacy-respecting analytics tools to understand website traffic and usage.
          Analytics may show things like page views, device type, general location, referral source,
          and browser information. We do not use analytics to personally identify visitors.
        </p>
      </LegalSection>

      <LegalSection title="6. Cookies">
        <p>
          This website may use cookies or similar technologies for basic functionality, analytics,
          preferences, or performance. You can control cookies through your browser settings. For
          more details, visit the{" "}
          <Link
            href="/cookies"
            className="font-bold text-blue-hover underline decoration-2 underline-offset-2"
          >
            Cookie Policy
          </Link>{" "}
          page.
        </p>
      </LegalSection>

      <LegalSection title="7. Sharing information">
        <p>
          We do not sell your personal information. We may share limited information only when
          needed to operate the website, use trusted service providers, comply with legal
          obligations, prevent abuse, or protect the website.
        </p>
      </LegalSection>

      <LegalSection title="8. Data storage">
        <p>
          Information submitted through the website may be stored using website hosting, form, email,
          analytics, or database services. We aim to keep only what is reasonably needed.
        </p>
      </LegalSection>

      <LegalSection title="9. Security">
        <p>
          We take reasonable steps to protect information, but no website can guarantee perfect
          security. Please avoid sending sensitive information through this website.
        </p>
      </LegalSection>

      <LegalSection title="10. Children">
        <p>
          This website is intended for general audiences. If a child submits personal information
          without appropriate permission, a parent or guardian can contact us and request removal.
        </p>
      </LegalSection>

      <LegalSection title="11. Your choices">
        <p>You can:</p>
        <ul>
          <li>Avoid submitting forms</li>
          <li>Unsubscribe from emails</li>
          <li>Disable cookies in your browser</li>
          <li>
            Contact us to request deletion of information you submitted, where possible — see{" "}
            <Link
              href="/contact"
              className="font-bold text-blue-hover underline decoration-2 underline-offset-2"
            >
              Contact
            </Link>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="12. Changes to this policy">
        <p>
          We may update this Privacy Policy as the website changes. The latest version will be
          posted here.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact">
        <p>
          For privacy questions, visit the{" "}
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
