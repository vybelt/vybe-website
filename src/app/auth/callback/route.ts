import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

function getSafeRedirectPath(next: string | null): string {
  if (!next) return "/";
  if (!next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

/** Expo Go (`exp://`) or the native app scheme — never http(s) open redirects. */
function isSafeAppRedirect(raw: string): boolean {
  const value = raw.trim();
  if (value.startsWith("exp://") || value.startsWith("vybe://")) return true;
  try {
    const protocol = new URL(value).protocol;
    return protocol === "exp:" || protocol === "vybe:";
  } catch {
    return false;
  }
}

function bounceToApp(appRedirect: string, searchParams: URLSearchParams): NextResponse {
  const separator = appRedirect.includes("?") ? "&" : "?";
  const forwarded = new URLSearchParams();
  for (const key of ["code", "error", "error_code", "error_description"]) {
    const value = searchParams.get(key);
    if (value) forwarded.set(key, value);
  }
  const qs = forwarded.toString();
  const location = qs ? `${appRedirect}${separator}${qs}` : appRedirect;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${location.replace(/"/g, "")}"><title>Opening VYBE</title></head><body><p>Opening VYBE…</p><script>location.replace(${JSON.stringify(location)});</script></body></html>`;
  return new NextResponse(html, {
    status: 302,
    headers: {
      Location: location,
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function closeWindowPage(): NextResponse {
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>VYBE</title></head><body><p>Return to the VYBE app to finish signing in.</p></body></html>`;
  return new NextResponse(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const appRedirect = searchParams.get("app_redirect");

  if (appRedirect && isSafeAppRedirect(appRedirect)) {
    return bounceToApp(appRedirect, searchParams);
  }

  // Google from Expo: do not exchange PKCE or dump users on /reset-password.
  if (code && !next) {
    return closeWindowPage();
  }

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          },
        },
      },
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${getSafeRedirectPath(next)}`);
    }
  }

  return NextResponse.redirect(`${origin}/reset-password?error=auth`);
}
