import { Suspense } from "react";
import type { Metadata } from "next";
import { ConfirmEmailScreen } from "@/components/confirm-email-screen";

export const metadata: Metadata = {
  title: "Confirm email — VYBE",
  description: "Confirm your VYBE account email.",
};

export const dynamic = "force-dynamic";

export default function ConfirmEmailPage() {
  return (
    <Suspense>
      <ConfirmEmailScreen />
    </Suspense>
  );
}
