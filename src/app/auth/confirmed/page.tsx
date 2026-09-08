import type { Metadata } from "next";
import { EmailConfirmedScreen } from "@/components/email-confirmed-screen";

export const metadata: Metadata = {
  title: "Email confirmed — VYBE",
  description: "Your VYBE email is confirmed. Sign in in the app.",
};

export default function EmailConfirmedPage() {
  return <EmailConfirmedScreen />;
}
