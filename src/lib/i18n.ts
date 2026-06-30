import type { Locale } from "./types";

const messages = {
  en: {
    appName: "VYBE",
    tagline: "Discover events in Lithuania",
    back: "Back",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    privacyTitle: "Privacy Policy",
    privacyLastUpdated: "Last updated: 30 June 2026",
    landingEyebrow: "Coming soon across Lithuania",
    landingHeadline: "Every event. Every city. One vibe.",
    landingSubheadline:
      "VYBE is your map-first guide to concerts, festivals, sports, and nightlife — from Vilnius to Palanga, with AI to help you decide.",
    landingNewsletterTitle: "Get our newsletter",
    landingNewsletterSubtitle: "Be first to know when VYBE launches across Lithuania.",
    landingNewsletterBonus:
      "Subscribe now and unlock launch bonuses — early access perks and rewards reserved for our first subscribers.",
    landingNewsletterCta: "Subscribe",
    landingNewsletterSuccess:
      "You're in! Watch your inbox for launch news — your bonuses are reserved.",
    landingNewsletterAlready:
      "You're already subscribed — your launch bonuses are waiting for you.",
    landingNewsletterError: "Something went wrong. Please try again.",
    landingFeaturesTitle: "Built for going out",
    landingFeatures: [
      {
        title: "Map-first discovery",
        desc: "See what's happening near you on a live map — filter by city, category, and date.",
      },
      {
        title: "Personalized picks",
        desc: "Like events you enjoy and get a For You feed tuned to your taste.",
      },
      {
        title: "VYBE AI",
        desc: "Ask what's on tonight in Kaunas or find family events this weekend.",
      },
      {
        title: "Real tickets, real venues",
        desc: "Thousands of events from bilietai.lt and more — with direct buy links.",
      },
    ],
    landingCitiesEyebrow: "All of Lithuania",
    landingCitiesTitle: "Not just Vilnius",
    landingCitiesDesc:
      "Browse events in Kaunas, Klaipėda, Šiauliai, Palanga, and more — with precise pins on the map.",
    privacySections: [
      {
        heading: "Who we are",
        paragraphs: [
          "VYBE is an event discovery app for Lithuania. This page collects newsletter signups before our public launch.",
        ],
      },
      {
        heading: "Data we collect",
        paragraphs: [
          "Newsletter signups: we store the email address and optional name you submit on this site.",
          "Technical data: we use browser local storage for your language preference. Our hosting provider may log standard request metadata (IP address, browser type, timestamps) for security.",
        ],
      },
      {
        heading: "How we use your data",
        paragraphs: [
          "We use your email to send launch news and newsletter updates. We do not sell your personal data.",
        ],
      },
      {
        heading: "Third-party services",
        paragraphs: [
          "We use Supabase (database) and Vercel (hosting) to operate this site.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Depending on applicable law, you may have the right to access, correct, or delete your personal data. We will provide a contact channel for these requests before the app launches publicly.",
          "You may lodge a complaint with your local data protection authority. In Lithuania, this is the State Data Protection Inspectorate (VDAI).",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "We may update this policy from time to time. The revised version will be posted on this page with an updated date.",
        ],
      },
    ],
  },
  lt: {
    appName: "VYBE",
    tagline: "Atrask renginius Lietuvoje",
    back: "Atgal",
    namePlaceholder: "Tavo vardas",
    emailPlaceholder: "tu@pavyzdys.lt",
    privacyTitle: "Privatumo politika",
    privacyLastUpdated: "Atnaujinta: 2026 m. birželio 30 d.",
    landingEyebrow: "Netrukus visoje Lietuvoje",
    landingHeadline: "Visi renginiai. Visi miestai. Vienas vibe.",
    landingSubheadline:
      "VYBE — žemėlapinis renginių gidas koncertams, festivaliams, sportui ir naktiniam gyvenimui. Nuo Vilniaus iki Palangos, su DI pagalba.",
    landingNewsletterTitle: "Gauk naujienlaiškį",
    landingNewsletterSubtitle: "Sužinok pirmas, kai VYBE startuos visoje Lietuvoje.",
    landingNewsletterBonus:
      "Prenumeruok dabar ir gauk paleidimo bonusus — ankstyvos prieigos privalumus ir apdovanojimus pirmiesiems prenumeratoriams.",
    landingNewsletterCta: "Prenumeruoti",
    landingNewsletterSuccess:
      "Esi sąraše! Stebėk el. paštą dėl paleidimo naujienų — bonusai jau rezervuoti.",
    landingNewsletterAlready:
      "Jau prenumeruoji — tavo paleidimo bonusai tavęs laukia.",
    landingNewsletterError: "Kažkas nepavyko. Bandyk dar kartą.",
    landingFeaturesTitle: "Sukurta išeiti vakarop",
    landingFeatures: [
      {
        title: "Renginiai žemėlapyje",
        desc: "Matyk, kas vyksta šalia tavęs — filtruok pagal miestą, kategoriją ir datą.",
      },
      {
        title: "Asmeniniai pasiūlymai",
        desc: "Pažymėk patikusius renginius ir gauk Tau skirtą feedą.",
      },
      {
        title: "VYBE DI",
        desc: "Paklausk, kas vyksta šį vakarą Kaune arba rask šeimos renginius.",
      },
      {
        title: "Tikri bilietai, tikros vietos",
        desc: "Tūkstančiai renginių iš bilietai.lt ir kitų — su tiesioginėmis nuorodomis.",
      },
    ],
    landingCitiesEyebrow: "Visa Lietuva",
    landingCitiesTitle: "Ne tik Vilnius",
    landingCitiesDesc:
      "Naršyk renginius Kaune, Klaipėdoje, Šiauliuose, Palangoje ir kitur — su tiksliomis žymomis žemėlapyje.",
    privacySections: [
      {
        heading: "Kas mes esame",
        paragraphs: [
          "VYBE — renginių atradimo programėlė Lietuvoje. Ši svetainė renka naujienlaiškio prenumeratas prieš viešą paleidimą.",
        ],
      },
      {
        heading: "Kokius duomenis renkame",
        paragraphs: [
          "Naujienlaiškis: saugome el. pašto adresą ir neprivalomą vardą, kurį pateikiate šioje svetainėje.",
          "Techniniai duomenys: naršyklės local storage naudojame kalbos nustatymui. Hostingas gali registruoti standartinius užklausų metaduomenis (IP, naršyklė, laikas) saugumui.",
        ],
      },
      {
        heading: "Kaip naudojame duomenis",
        paragraphs: [
          "El. paštą naudojame paleidimo naujienoms ir naujienlaiškiui. Jūsų asmens duomenų neparduodame.",
        ],
      },
      {
        heading: "Trečiųjų šalių paslaugos",
        paragraphs: ["Naudojame Supabase (duomenų bazė) ir Vercel (hostingas) šiai svetainei."],
      },
      {
        heading: "Jūsų teisės",
        paragraphs: [
          "Pagal taikomus įstatymus galite turėti teisę susipažinti su duomenimis, juos ištaisyti arba ištrinti. Prieš viešą paleidimą pateiksime kontaktą tokioms užklausoms.",
          "Galite pateikti skundą duomenų apsaugos institucijai. Lietuvoje tai Valstybinė duomenų apsaugos inspekcija (VDAI).",
        ],
      },
      {
        heading: "Pakeitimai",
        paragraphs: [
          "Politiką galime atnaujinti. Nauja versija bus skelbiama šiame puslapyje su atnaujinta data.",
        ],
      },
    ],
  },
} as const;

export type Messages = (typeof messages)[Locale];

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
