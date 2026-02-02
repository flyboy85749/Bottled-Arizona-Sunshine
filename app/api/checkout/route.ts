import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const products: Record<string, { name: string; priceInCents: number; freeShipping: boolean }> = {
  single: { name: "Bottled Arizona Sunshine — Single Bottle (16.9 oz)", priceInCents: 1295, freeShipping: false },
  "4pack": { name: "Bottled Arizona Sunshine — 4-Pack Room Set", priceInCents: 2995, freeShipping: true },
  "12pack": { name: "Bottled Arizona Sunshine — 12-Pack Home Set", priceInCents: 7995, freeShipping: true },
};

const shippingCentsPerUnit = 595;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, quantity, customer } = body;

    const item = products[product];
    if (!item) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const qty = Math.max(1, Math.min(5, Number(quantity) || 1));

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.priceInCents,
        },
        quantity: qty,
      },
    ];

    if (!item.freeShipping) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping" },
          unit_amount: shippingCentsPerUnit,
        },
        quantity: qty,
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: customer.email,
      metadata: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        phone: customer.phone || "",
        notes: customer.notes || "",
        product,
        quantity: String(qty),
      },
      success_url: `${baseUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/order`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
