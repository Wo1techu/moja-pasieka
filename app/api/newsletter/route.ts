import { NextResponse } from "next/server";

/* ============================================================
   POST /api/newsletter
   Zapis adresu e-mail do newslettera.
   Na ten moment tylko walidacja i potwierdzenie (stub).
   TODO: integracja z MailerLite / Brevo + double opt-in (RODO).
   ============================================================ */

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const { email } = (body ?? {}) as { email?: string };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Podaj poprawny adres e-mail." }, { status: 400 });
  }

  // TODO: dopisz subskrybenta u dostawcy newslettera i wyślij e-mail potwierdzający.
  console.log(`[newsletter] nowy zapis: ${email}`);

  return NextResponse.json({ ok: true });
}
