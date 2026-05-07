/** Passphrase gate for the Friday Vault easter egg (not security—just vibes). */
export const FRIDAY_PASSPHRASE = "fridayhai";

export const FRIDAY_VAULT_SESSION_KEY = "unnecessaryApps-friday-vault-unlocked";

export const FRIDAY_VAULT_ENTRY_FLASH_KEY = "unnecessaryApps-friday-vault-entry-flash";

/** Friday is day index 5 (Sunday = 0 … Saturday = 6). */
export function isLocalFriday(date = new Date()): boolean {
  return date.getDay() === 5;
}

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function getLocalWeekdayName(date = new Date()): string {
  return WEEKDAYS[date.getDay()] ?? "Unknown";
}
