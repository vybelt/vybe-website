"use client";

import { useEffect } from "react";

function isSafeAppRedirect(raw: string): boolean {
  const value = raw.trim();
  return value.startsWith("exp://") || value.startsWith("vybe://");
}

/** If Google dumped a mobile OAuth return onto the waitlist, hop into the app. */
export function MobileAuthBounce() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appRedirect = params.get("app_redirect");
    if (!appRedirect || !isSafeAppRedirect(appRedirect)) return;

    const forwarded = new URLSearchParams();
    for (const key of ["code", "error", "error_code", "error_description"]) {
      const value = params.get(key);
      if (value) forwarded.set(key, value);
    }
    const qs = forwarded.toString();
    const separator = appRedirect.includes("?") ? "&" : "?";
    window.location.replace(qs ? `${appRedirect}${separator}${qs}` : appRedirect);
  }, []);

  return null;
}
