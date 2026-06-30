import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LocaleProvider } from "@/components/locale-provider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "VYBE — Events across Lithuania",
  description: "Subscribe for launch news and bonuses. VYBE — events across Lithuania.",
};

export const viewport: Viewport = {
  themeColor: "#07050f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
