"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PageHero from "@/components/PageHero";
import WarningCard from "@/components/WarningCard";

const prices: Record<string, { label: string; price: number; freeShipping: boolean }> = {
  single: { label: "Single Bottle", price: 12.95, freeShipping: false },
  "4pack": { label: "4-Pack Room Set", price: 29.95, freeShipping: true },
  "12pack": { label: "12-Pack Home Set", price: 79.95, freeShipping: true },
};
const shippingCost = 5.95;

function OrderForm() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const preselect = searchParams.get("product");
    if (preselect && prices[preselect]) {
      setProduct(preselect);
    }
  }, [searchParams]);

  const item = product ? prices[product] : null;
  const subtotal = item ? item.price * quantity : 0;
  const shipping = item ? (item.freeShipping ? 0 : shippingCost * quantity) : 0;
  const total = subtotal + shipping;

  function isFormValid() {
    return product && firstName && lastName && email && address && city && state && zip;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (paymentMethod !== "stripe") return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          quantity,
          customer: { firstName, lastName, email, address, city, state, zip, phone, notes },
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Something went wrong");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout");
      setLoading(false);
    }
  }

  return (
    <section className="pt-16 pb-24 px-8 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-warm-cream to-white" />
      <div className="max-w-[700px] mx-auto bg-warm-cream rounded-[20px] p-12 border-2 border-desert-sand shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative max-md:px-6 max-md:py-8">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="product" className="font-semibold text-[0.9rem] text-charcoal">Select Your Sunshine</label>
            <select id="product" value={product} onChange={(e) => setProduct(e.target.value)} required className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all">
              <option value="" disabled>Choose a package...</option>
              <option value="single">Single Bottle — $12.95</option>
              <option value="4pack">4-Pack Room Set — $29.95</option>
              <option value="12pack">12-Pack Home Set — $79.95</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="quantity" className="font-semibold text-[0.9rem] text-charcoal">Quantity</label>
            <select id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all">
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="font-semibold text-[0.9rem] text-charcoal">First Name</label>
              <input type="text" id="firstName" placeholder="Jane" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="font-semibold text-[0.9rem] text-charcoal">Last Name</label>
              <input type="text" id="lastName" placeholder="Doe" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-[0.9rem] text-charcoal">Email Address</label>
            <input type="email" id="email" placeholder="jane@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="font-semibold text-[0.9rem] text-charcoal">Shipping Address</label>
            <input type="text" id="address" placeholder="123 Sunny Lane" required value={address} onChange={(e) => setAddress(e.target.value)} className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="font-semibold text-[0.9rem] text-charcoal">City</label>
              <input type="text" id="city" placeholder="Seattle" required value={city} onChange={(e) => setCity(e.target.value)} className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="state" className="font-semibold text-[0.9rem] text-charcoal">State</label>
              <input type="text" id="state" placeholder="WA" required value={state} onChange={(e) => setState(e.target.value)} className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className="flex flex-col gap-2">
              <label htmlFor="zip" className="font-semibold text-[0.9rem] text-charcoal">Zip Code</label>
              <input type="text" id="zip" placeholder="98101" required value={zip} onChange={(e) => setZip(e.target.value)} className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-semibold text-[0.9rem] text-charcoal">Phone (optional)</label>
              <input type="tel" id="phone" placeholder="(555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="font-semibold text-[0.9rem] text-charcoal">Gift Message or Special Instructions</label>
            <textarea id="notes" placeholder="Add a personal message or any special requests..." value={notes} onChange={(e) => setNotes(e.target.value)} className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all resize-y min-h-[100px]" />
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-6 border border-desert-sand">
            <h4 className="font-playfair text-[1.1rem] mb-4 text-charcoal font-semibold">Order Summary</h4>
            <div className="flex justify-between py-2 text-[0.95rem] text-muted">
              <span>{item ? `${item.label}${quantity > 1 ? ` × ${quantity}` : ""}` : "Select a package above"}</span>
              <span>{item ? `$${subtotal.toFixed(2)}` : "—"}</span>
            </div>
            <div className="flex justify-between py-2 text-[0.95rem] text-muted">
              <span>Shipping</span>
              <span>{item ? (shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`) : "—"}</span>
            </div>
            <div className="flex justify-between pt-4 mt-2 border-t-2 border-desert-sand font-bold text-[1.1rem] text-charcoal">
              <span>Total</span>
              <span>{item ? `$${total.toFixed(2)}` : "—"}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[0.9rem] text-charcoal">Payment Method</span>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "stripe"
                    ? "border-sunset-orange bg-white shadow-[0_0_0_3px_rgba(232,115,74,0.15)]"
                    : "border-desert-sand bg-white hover:border-sunset-orange/50"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                  className="accent-sunset-orange"
                />
                <span className="text-[0.95rem] text-charcoal font-medium">Credit Card</span>
              </label>
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "paypal"
                    ? "border-sunset-orange bg-white shadow-[0_0_0_3px_rgba(232,115,74,0.15)]"
                    : "border-desert-sand bg-white hover:border-sunset-orange/50"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="accent-sunset-orange"
                />
                <span className="text-[0.95rem] text-charcoal font-medium">PayPal</span>
              </label>
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl">{error}</p>
          )}

          {paymentMethod === "stripe" ? (
            <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-sunset-orange text-white rounded-full font-semibold text-[1.05rem] border-none cursor-pointer hover:bg-terracotta hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(232,115,74,0.3)] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
              <span>☀️</span> {loading ? "Redirecting to Payment..." : "Complete Order"}
            </button>
          ) : (
            <div className={!isFormValid() ? "opacity-50 pointer-events-none" : ""}>
              {!isFormValid() && (
                <p className="text-sm text-muted text-center mb-2">Please fill out all required fields above.</p>
              )}
              <PayPalButtons
                style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                disabled={!isFormValid()}
                createOrder={async () => {
                  setError("");
                  const res = await fetch("/api/paypal/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      product,
                      quantity,
                      customer: { firstName, lastName, email, address, city, state, zip, phone, notes },
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok || !data.id) {
                    setError(data.error || "Failed to create PayPal order");
                    throw new Error(data.error || "Failed to create PayPal order");
                  }
                  return data.id;
                }}
                onApprove={async (data) => {
                  const res = await fetch("/api/paypal/capture", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderID: data.orderID }),
                  });
                  const result = await res.json();
                  if (!res.ok || result.status !== "COMPLETED") {
                    setError("Payment could not be completed. Please try again.");
                    return;
                  }
                  window.location.href = "/order/success?paypal=1";
                }}
                onError={() => {
                  setError("Something went wrong with PayPal. Please try again.");
                }}
              />
            </div>
          )}

          <p className="text-[0.8rem] text-muted text-center italic">
            We&apos;ll send a confirmation email with tracking info once your sunshine ships. Payment details will be collected securely on the next step.
          </p>
        </form>
      </div>
    </section>
  );
}

export default function OrderPage() {
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}>
      <PageHero
        tagline="Almost There"
        title="Place Your"
        titleAccent="Order"
        description="Fill out the form below and we'll ship a little piece of Arizona straight to your doorstep."
      />
      <Suspense>
        <OrderForm />
      </Suspense>
      <WarningCard icon="⚠️" title="Caution: Side Effects May Include">
        Excessive exposure may cause spontaneous smiling, increased energy, sudden creativity, wanderlust, and an overwhelming desire to move west. Not suitable for vampires. Shake gently — rays may settle.
      </WarningCard>
    </PayPalScriptProvider>
  );
}
