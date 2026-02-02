import { NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, subject, message } = await req.json();

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await sendContactFormEmail(`${firstName} ${lastName}`, email, subject, message);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
