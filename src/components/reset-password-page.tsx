"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { getMessages } from "@/lib/i18n";
import { bootstrapPasswordRecovery } from "@/lib/recovery-session";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ResetPasswordPage() {
  const { locale } = useLocale();
  const t = getMessages(locale);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const supabase = createSupabaseBrowserClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (!active) return;
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
        window.history.replaceState({}, "", "/reset-password");
      }
    });

    void (async () => {
      const result = await bootstrapPasswordRecovery(supabase);
      if (!active) return;

      if (result.ok) {
        setReady(true);
        return;
      }

      if (result.reason === "auth" || result.reason === "invalid") {
        setError(t.resetLinkInvalid);
      }
    })();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [t.resetLinkInvalid]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (password.length < 6) {
      setError(t.authError);
      return;
    }
    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message || t.authError);
        return;
      }
      setInfo(t.passwordUpdated);
    } catch {
      setError(t.authError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-lg px-5 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" /> {t.back}
      </Link>

      <div className="glass-card animate-fade-up p-6">
        <h1 className="text-2xl font-bold text-text">{t.resetPasswordTitle}</h1>
        <p className="mt-2 text-sm text-text-muted">{t.resetPasswordSubtitle}</p>

        {!ready ? (
          <div className="mt-8 space-y-3">
            {error ? (
              <p className="text-sm text-red-400">{error}</p>
            ) : (
              <p className="text-sm text-text-muted">{t.resetPasswordWaiting}</p>
            )}
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="section-label mb-2 block">{t.newPasswordLabel}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="input-field"
                placeholder={t.passwordPlaceholder}
              />
            </div>
            <div>
              <label className="section-label mb-2 block">{t.confirmPasswordLabel}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="input-field"
                placeholder={t.passwordPlaceholder}
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            {info && <p className="text-sm text-accent-pink">{info}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 disabled:opacity-50">
              {loading ? "…" : t.updatePassword}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
