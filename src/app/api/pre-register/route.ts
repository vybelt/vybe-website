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

  try {
    const db = supabaseAdmin();

    const { data: existing } = await db
      .from("waitlist")
      .select("id")
      .ilike("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ ok: true, alreadyRegistered: true });
    }

    const { error } = await db.from("waitlist").insert({
      email: normalizedEmail,
      name: name ?? null,
      source: "website",
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, alreadyRegistered: true });
      }
      console.error("[pre-register]", error.message);
      return NextResponse.json({ error: "Could not save signup" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, alreadyRegistered: false });
  } catch (err) {
    console.error("[pre-register]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
