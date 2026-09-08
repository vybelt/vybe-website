"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { EmailOtpType } from "@supabase/supabase-js";
import { useLocale } from "@/components/locale-provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const OTP_TYPES = new Set<EmailOtpType>([
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
]);

function otpType(raw: string | null): EmailOtpType {
  if (raw && OTP_TYPES.has(raw as EmailOtpType)) return raw as EmailOtpType;
  return "signup";
}

function readHashTokens(): { accessToken: string; refreshToken: string } | null {
  if (typeof window === "undefined") return null;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const accessToken = hash.get("access_token") ?? "";
  const refreshToken = hash.get("refresh_token") ?? "";
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

export function ConfirmEmailScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const lt = locale === "lt";
  const tokenHash = searchParams.get("token_hash") ?? "";
  const code = searchParams.get("code") ?? "";
  const type = otpType(searchParams.get("type"));
  const [hashTokens, setHashTokens] = useState<{ accessToken: string; refreshToken: string } | null>(
    null,
  );

  useEffect(() => {
    setHashTokens(readHashTokens());
  }, []);

  const copy = useMemo(
    () =>
      lt
        ? {
            title: "Patvirtink el. paštą",
            body: "Bakstelėk, kad užbaigtum registraciją.",
            button: "Patvirtinti",
            working: "Tvirtinama…",
            missing: "Nuoroda neteisinga. Užsisakyk naują patvirtinimo laišką programėlėje.",
            invalid:
              "Nuoroda nebegalioja. Bandyk prisijungti programėlėje — adresas galėjo būti jau patvirtintas.",
          }
        : {
            title: "Confirm your email",
            body: "Tap below to finish creating your account.",
            button: "Confirm email",
            working: "Confirming…",
            missing: "This confirmation link is missing. Request a new one from the app.",
            invalid:
              "This link is no longer valid. Try signing in — the address may already be confirmed.",
          },
    [lt],
  );

  const canConfirm = Boolean(tokenHash || code || hashTokens);
  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");
  const [error, setError] = useState("");

  async function confirm() {
    if (status === "working") return;
    setStatus("working");
    setError("");

    const supabase = createSupabaseBrowserClient();

    try {
      if (hashTokens) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: hashTokens.accessToken,
          refresh_token: hashTokens.refreshToken,
        });
        if (sessionError) throw sessionError;
      } else if (tokenHash) {
        let result = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
        if (result.error && type !== "email") {
          result = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "email" });
        }
        if (result.error) throw result.error;
      } else if (code) {
        const result = await supabase.auth.exchangeCodeForSession(code);
        if (result.error) throw result.error;
      } else {
        setStatus("error");
        setError(copy.missing);
        return;
      }

      router.replace("/auth/confirmed");
    } catch {
      setStatus("error");
      setError(copy.invalid);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-text">{copy.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">{copy.body}</p>
        {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

        <button
          type="button"
          onClick={() => void confirm()}
          disabled={status === "working" || !canConfirm}
          className="btn-primary mt-8 h-12 w-full disabled:opacity-60"
        >
          {status === "working" ? copy.working : copy.button}
        </button>
      </div>
    </div>
  );
}
