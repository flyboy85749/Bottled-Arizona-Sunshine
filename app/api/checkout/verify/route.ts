import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendOrderConfirmation, sendOrderNotification } from "@/lib/email";

// Track sessions that already triggered emails (single-server is fine for Hostinger)
const emailedSessions = new Set<string>();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Send emails only once per session
    if (session.payment_status === "paid" && !emailedSessions.has(sessionId)) {
      emailedSessions.add(sessionId);
      const customer = {
        email: session.customer_email || "",
        firstName: session.metadata?.firstName || "",
      };
      const product = session.metadata?.product || "";
      const quantity = Number(session.metadata?.quantity) || 1;
      const total = session.metadata?.total || "";

      if (customer.email) {
        Promise.all([
          sendOrderConfirmation(customer, product, quantity, total),
          sendOrderNotification(customer, product, quantity, total, "Stripe"),
        ]).catch((err) => console.error("Email send error:", err));
      }
    }

    return NextResponse.json({
      status: session.payment_status,
      email: session.customer_email,
      product: session.metadata?.product,
      quantity: session.metadata?.quantity,
      firstName: session.metadata?.firstName,
    });
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }
}
