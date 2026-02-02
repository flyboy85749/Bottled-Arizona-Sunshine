import { NextResponse } from "next/server";
import { Client, Environment, OrdersController } from "@paypal/paypal-server-sdk";
import { sendOrderConfirmation, sendOrderNotification } from "@/lib/email";

function getClient() {
  return new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
      oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
    },
    environment: Environment.Sandbox,
  });
}

export async function POST(req: Request) {
  try {
    const { orderID } = await req.json();

    if (!orderID) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    const client = getClient();
    const ordersController = new OrdersController(client);

    const { result } = await ordersController.captureOrder({ id: orderID });

    const customId = result.purchaseUnits?.[0]?.customId;
    const meta = customId ? JSON.parse(customId) : {};

    const customer = { email: meta.email || "", firstName: meta.firstName || "" };
    const product = meta.product || "";
    const quantity = meta.quantity || 1;
    const total = meta.total || "";

    // Fire-and-forget email sending
    if (customer.email) {
      Promise.all([
        sendOrderConfirmation(customer, product, quantity, total),
        sendOrderNotification(customer, product, quantity, total, "PayPal"),
      ]).catch((err) => console.error("Email send error:", err));
    }

    return NextResponse.json({
      status: result.status,
      email: customer.email,
      firstName: customer.firstName,
      product,
      quantity,
    });
  } catch (err) {
    console.error("PayPal capture error:", err);
    return NextResponse.json({ error: "Failed to capture PayPal payment" }, { status: 500 });
  }
}
