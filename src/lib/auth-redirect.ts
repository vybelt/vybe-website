export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.vybe.lt";

/** Always use production domain in password-reset emails. */
export const PRODUCTION_SITE_URL = "https://www.vybe.lt";

export function getPasswordResetUrl(): string {
  return `${PRODUCTION_SITE_URL}/reset-password`;
}

export function getOAuthCallbackUrl(): string {
  return `${SITE_URL}/auth/callback`;
}
