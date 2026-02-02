import { NextResponse } from "next/server";
import { Client, Environment, OrdersController } from "@paypal/paypal-server-sdk";

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

    return NextResponse.json({
      status: result.status,
      email: meta.email || "",
      firstName: meta.firstName || "",
      product: meta.product || "",
      quantity: meta.quantity || 1,
    });
  } catch (err) {
    console.error("PayPal capture error:", err);
    return NextResponse.json({ error: "Failed to capture PayPal payment" }, { status: 500 });
  }
}
