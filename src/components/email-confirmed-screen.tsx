"use client";

import { useLocale } from "@/components/locale-provider";

export function EmailConfirmedScreen() {
  const { locale } = useLocale();
  const lt = locale === "lt";

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-text">
          {lt ? "El. paštas patvirtintas" : "Email confirmed"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          {lt
            ? "Dabar atidaryk VYBE programėlę ir prisijunk tuo pačiu el. paštu."
            : "Now open the VYBE app and sign in with the same email."}
        </p>
      </div>
    </div>
  );
}
