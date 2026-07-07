import type { SupabaseClient } from "@supabase/supabase-js";

export type RecoveryBootstrapResult =
  | { ok: true }
  | { ok: false; reason: "auth" | "invalid" | "pending" };

function clearRecoveryUrl() {
  window.history.replaceState({}, "", "/reset-password");
}

/** Establish a Supabase recovery session from the reset-email link (PKCE, hash, or cookies). */
export async function bootstrapPasswordRecovery(
  supabase: SupabaseClient,
): Promise<RecoveryBootstrapResult> {
  const params = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));

  if (params.get("error") === "auth") {
    return { ok: false, reason: "auth" };
  }

  if (hashParams.get("type") === "recovery") {
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");
    if (accessToken && refreshToken) {
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      if (error) return { ok: false, reason: "invalid" };
      clearRecoveryUrl();
      return { ok: true };
    }
  }

  const code = params.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        clearRecoveryUrl();
        return { ok: true };
      }
      return { ok: false, reason: "invalid" };
    }
    clearRecoveryUrl();
    return { ok: true };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    return { ok: true };
  }

  return { ok: false, reason: "pending" };
}
