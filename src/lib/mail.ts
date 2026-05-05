import { Resend } from "resend";

const SITE_OWNER_EMAIL = process.env.CONTACT_TO_EMAIL ?? "akashkamble0063@gmail.com";

/** Default Resend test sender; replace with EMAIL_FROM after domain verification. */
const DEFAULT_FROM = "UnnecessaryApps <onboarding@resend.dev>";

export function getMailClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export function getOwnerEmail(): string {
  return SITE_OWNER_EMAIL.trim();
}

export function getFromAddress(): string {
  return (process.env.EMAIL_FROM ?? DEFAULT_FROM).trim();
}

export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}
