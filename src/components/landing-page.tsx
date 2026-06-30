"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift, MapPin, MessageCircle, Sparkles, Ticket } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { getMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FEATURE_ICONS = [MapPin, Sparkles, MessageCircle, Ticket] as const;

export function LandingPage() {
  const { locale, setLocale } = useLocale();
  const t = getMessages(locale);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setAlreadyRegistered(false);

    try {
      const res = await fetch("/api/pre-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; alreadyRegistered?: boolean };

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setAlreadyRegistered(Boolean(data.alreadyRegistered));
      setStatus("success");
      setEmail("");
      setName("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/onboarding-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07050f]/30 via-[#07050f]/85 to-[#07050f]" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-pink">{t.appName}</p>
        <div className="flex rounded-full border border-border bg-surface/80 p-0.5 text-xs font-semibold backdrop-blur-xl">
          {(["en", "lt"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              className={cn(
                "rounded-full px-3 py-1.5 uppercase transition",
                locale === code
                  ? "bg-accent-strong/25 text-text"
                  : "text-text-muted hover:text-text-secondary",
              )}
            >
              {code}
            </button>
          ))}
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8 sm:pt-10">
        <section className="mx-auto max-w-3xl text-center animate-fade-up">
          <p className="section-label text-accent-pink">{t.landingEyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            {t.landingHeadline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {t.landingSubheadline}
          </p>

          <div className="mx-auto mt-10 max-w-xl text-left">
            <form onSubmit={onSubmit}>
              <div className="glass-panel rounded-[1.75rem] p-5 sm:p-6">
                <p className="text-sm font-semibold text-text">{t.landingNewsletterTitle}</p>
                <p className="mt-1 text-sm text-text-muted">{t.landingNewsletterSubtitle}</p>

                <div className="mt-4 flex gap-3 rounded-2xl border border-accent-pink/25 bg-accent-pink/10 px-4 py-3">
                  <Gift className="mt-0.5 h-5 w-5 shrink-0 text-accent-pink" />
                  <p className="text-sm leading-relaxed text-text-secondary">{t.landingNewsletterBonus}</p>
                </div>

                <div className="mt-5 space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="search-bar w-full text-text outline-none"
                    autoComplete="name"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t.emailPlaceholder}
                    className="search-bar w-full text-text outline-none"
                    autoComplete="email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary mt-4 w-full py-4 disabled:opacity-60"
                >
                  {status === "loading" ? "…" : t.landingNewsletterCta}
                </button>

                {status === "success" && (
                  <p className="mt-3 text-center text-sm text-accent-pink">
                    {alreadyRegistered ? t.landingNewsletterAlready : t.landingNewsletterSuccess}
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-center text-sm text-red-400">{t.landingNewsletterError}</p>
                )}
              </div>
            </form>
          </div>
        </section>

        <section className="mt-20 sm:mt-28">
          <h2 className="text-center text-2xl font-bold text-text sm:text-3xl">{t.landingFeaturesTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.landingFeatures.map((feature, index) => {
              const Icon = FEATURE_ICONS[index] ?? Sparkles;
              return (
                <div key={feature.title} className="glass-card p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-strong/15 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-text">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20 sm:mt-28">
          <div className="glass-card overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[240px] lg:min-h-[320px]">
                <Image
                  src="/onboarding-bg.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#160c26]/90 lg:bg-gradient-to-l lg:from-[#160c26] lg:to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <p className="section-label">{t.landingCitiesEyebrow}</p>
                <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl">{t.landingCitiesTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
                  {t.landingCitiesDesc}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/60 px-5 py-8 text-center text-sm text-text-muted sm:px-8">
        <p>
          © {new Date().getFullYear()} {t.appName} · {t.tagline}
        </p>
        <div className="mt-3">
          <Link href="/privacy" className="hover:text-text-secondary">
            {t.privacyTitle}
          </Link>
        </div>
      </footer>
    </div>
  );
}
