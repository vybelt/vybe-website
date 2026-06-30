import type { Metadata } from "next";
import { PrivacyPolicyPage } from "@/components/privacy-policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy — VYBE",
  description: "How VYBE handles newsletter signup data.",
};

export default function PrivacyPage() {
  return <PrivacyPolicyPage />;
}
