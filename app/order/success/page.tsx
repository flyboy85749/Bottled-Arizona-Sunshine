"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import PageHero from "@/components/PageHero";
import Link from "next/link";

interface SessionInfo {
  status: string;
  email: string;
  product: string;
  quantity: string;
  firstName: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [info, setInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "paid") setInfo(data);
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <section className="pt-16 pb-24 px-8 text-center">
        <p className="text-muted text-lg">Verifying your order...</p>
      </section>
    );
  }

  if (!info) {
    return (
      <section className="pt-16 pb-24 px-8 text-center">
        <div className="max-w-[600px] mx-auto">
          <p className="text-[3rem] mb-4">🌵</p>
          <h2 className="font-playfair text-2xl mb-4 text-charcoal">Hmm, something seems off</h2>
          <p className="text-muted mb-8">We couldn&apos;t verify your payment. If you believe this is an error, please contact us.</p>
          <Link href="/order" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sunset-orange text-white rounded-full font-semibold hover:bg-terracotta transition-all">
            Try Again
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-16 pb-24 px-8">
      <div className="max-w-[600px] mx-auto bg-warm-cream rounded-[20px] p-12 border-2 border-desert-sand shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center max-md:px-6 max-md:py-8">
        <p className="text-[4rem] mb-4">☀️</p>
        <h2 className="font-playfair text-3xl mb-4 text-charcoal">
          Your Sunshine is On Its Way{info.firstName ? `, ${info.firstName}` : ""}!
        </h2>
        <p className="text-muted text-lg mb-6">
          We&apos;ve bottled up some extra rays just for you. A confirmation has been sent to <strong>{info.email}</strong>.
        </p>
        <div className="bg-white rounded-xl p-6 border border-desert-sand mb-8 text-left">
          <h4 className="font-playfair text-[1.1rem] mb-2 text-charcoal font-semibold">Order Details</h4>
          <p className="text-muted text-[0.95rem]">
            {info.quantity}x {info.product === "single" ? "Single Bottle" : info.product === "4pack" ? "4-Pack Room Set" : "12-Pack Home Set"}
          </p>
        </div>
        <p className="text-muted text-sm italic mb-8">
          Please allow 3-5 business days for your sunshine to arrive. Results may vary depending on cloud cover in your area.
        </p>
        <Link href="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sunset-orange text-white rounded-full font-semibold hover:bg-terracotta hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(232,115,74,0.3)] transition-all">
          <span>☀️</span> Back to Homepage
        </Link>
      </div>
    </section>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <PageHero
        tagline="Order Confirmed"
        title="Thank"
        titleAccent="You"
        description="Your purchase of premium bottled Arizona sunshine has been confirmed."
      />
      <Suspense>
        <SuccessContent />
      </Suspense>
    </>
  );
}
