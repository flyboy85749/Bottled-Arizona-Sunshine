import { NextResponse } from "next/server";
import { Client, Environment, OrdersController, CheckoutPaymentIntent } from "@paypal/paypal-server-sdk";

const prices: Record<string, { label: string; price: number; freeShipping: boolean }> = {
  single: { label: "Single Bottle (16.9 oz)", price: 12.95, freeShipping: false },
  "4pack": { label: "4-Pack Room Set", price: 29.95, freeShipping: true },
  "12pack": { label: "12-Pack Home Set", price: 79.95, freeShipping: true },
};
const shippingCost = 5.95;

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
    const { product, quantity, customer } = await req.json();

    const item = prices[product];
    if (!item || !quantity || quantity < 1 || quantity > 5) {
      return NextResponse.json({ error: "Invalid product or quantity" }, { status: 400 });
    }

    const subtotal = item.price * quantity;
    const shipping = item.freeShipping ? 0 : shippingCost * quantity;
    const total = subtotal + shipping;

    const client = getClient();
    const ordersController = new OrdersController(client);

    const { result } = await ordersController.createOrder({
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              currencyCode: "USD",
              value: total.toFixed(2),
              breakdown: {
                itemTotal: { currencyCode: "USD", value: subtotal.toFixed(2) },
                shipping: { currencyCode: "USD", value: shipping.toFixed(2) },
              },
            },
            items: [
              {
                name: item.label,
                unitAmount: { currencyCode: "USD", value: item.price.toFixed(2) },
                quantity: String(quantity),
              },
            ],
            customId: JSON.stringify({
              product,
              quantity,
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
            }),
          },
        ],
      },
    });

    return NextResponse.json({ id: result.id });
  } catch (err) {
    console.error("PayPal create error:", err);
    return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 });
  }
}
