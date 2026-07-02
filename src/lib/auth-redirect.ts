export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.vybe.lt";

export function getPasswordResetUrl(): string {
  return `${SITE_URL}/reset-password`;
}

export function getOAuthCallbackUrl(): string {
  return `${SITE_URL}/auth/callback`;
}
