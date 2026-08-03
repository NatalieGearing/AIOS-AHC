import { NextResponse } from "next/server";

// PLACEHOLDER submission handler — see outputs/website/README.md.
// This currently just logs the enquiry server-side. Before going live,
// wire this up to a real destination (e.g. an email service like Resend,
// a form backend like Formspree, or a CRM webhook) using
// EMAIL/ENQUIRY env vars from .env.example.
export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, propertyType, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // eslint-disable-next-line no-console
  console.log("New enquiry received:", {
    name,
    email,
    phone,
    propertyType,
    message,
  });

  return NextResponse.json({ ok: true });
}
