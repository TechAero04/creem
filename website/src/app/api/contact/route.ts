import { NextResponse } from "next/server";
import { addLead } from "@/lib/leads";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_METHODS = ["email", "phone", "whatsapp"] as const;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field: real visitors never see or fill it.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const company = clean(body.company, 160);
  const interest = clean(body.interest, 80) || "General enquiry";
  const message = clean(body.message, 3000);
  const preferred = CONTACT_METHODS.find((m) => m === body.preferredContact) ?? "email";

  if (!name) return NextResponse.json({ error: "Please tell us your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (preferred !== "email" && phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Please add a phone number so we can call or WhatsApp you." }, { status: 400 });
  }

  await addLead({ name, email, phone, company, interest, message, preferredContact: preferred });
  return NextResponse.json({ ok: true });
}
