import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";

const bodySchema = z.object({
  email: z.string().trim().email().max(320),
  name: z.string().trim().min(1).max(120).optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { email, name } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error("[pre-register] missing env:", { url: Boolean(url), key: Boolean(key) });
    return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  }

  const db = supabaseAdmin();

  const { data: existing, error: lookupError } = await db
    .from("waitlist")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (lookupError) {
    console.error("[pre-register] lookup:", lookupError.message);
    return NextResponse.json({ error: "Could not save signup" }, { status: 500 });
  }

  if (existing) {
    return NextResponse.json({ ok: true, alreadyRegistered: true });
  }

  const { error: insertError } = await db.from("waitlist").insert({
    email: normalizedEmail,
    name: name ?? null,
    source: "website",
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ ok: true, alreadyRegistered: true });
    }
    console.error("[pre-register] insert:", insertError.message);
    return NextResponse.json({ error: "Could not save signup" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, alreadyRegistered: false });
}
