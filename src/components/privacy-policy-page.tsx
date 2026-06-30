"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { getMessages } from "@/lib/i18n";

export function PrivacyPolicyPage() {
  const { locale } = useLocale();
  const t = getMessages(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.back}
      </Link>

      <header>
        <p className="section-label text-accent-pink">{t.appName}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {t.privacyTitle}
        </h1>
        <p className="mt-3 text-sm text-text-muted">{t.privacyLastUpdated}</p>
      </header>

      <div className="mt-10 space-y-10">
        {t.privacySections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-text">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-text-secondary">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
