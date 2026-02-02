"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.target as HTMLFormElement;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        tagline="We'd Love to Hear From You"
        title="Get In"
        titleAccent="Touch"
        description="Questions, bulk orders, partnership ideas, or just want to say hello? Drop us a line and we'll get back to you faster than an Arizona sunset."
      />

      {/* Contact Form */}
      <section className="pt-16 pb-24 px-8 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-25 bg-linear-to-b from-warm-cream to-white" />
        <div className="max-w-175 mx-auto bg-warm-cream rounded-[20px] p-12 border-2 border-desert-sand shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative max-md:px-6 max-md:py-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="font-semibold text-[0.9rem] text-charcoal">First Name</label>
                <input type="text" id="firstName" placeholder="Jane" required className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="font-semibold text-[0.9rem] text-charcoal">Last Name</label>
                <input type="text" id="lastName" placeholder="Doe" required className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-[0.9rem] text-charcoal">Email Address</label>
              <input type="email" id="email" placeholder="jane@example.com" required className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="font-semibold text-[0.9rem] text-charcoal">Subject</label>
              <select id="subject" defaultValue="" required className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all">
                <option value="" disabled>What&apos;s this about?</option>
                <option value="general">General Inquiry</option>
                <option value="order">Order Question</option>
                <option value="bulk">Bulk / Corporate Orders</option>
                <option value="wholesale">Wholesale / Retail Partnership</option>
                <option value="press">Press / Media</option>
                <option value="other">Something Else</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-semibold text-[0.9rem] text-charcoal">Message</label>
              <textarea id="message" placeholder="Tell us what's on your mind..." required className="font-dm-sans text-base p-3.5 border-2 border-desert-sand rounded-xl bg-white text-charcoal outline-none focus:border-sunset-orange focus:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all resize-y min-h-25" />
            </div>

            {status === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 text-center font-medium">
                Thank you for reaching out! ☀️ We&apos;ll get back to you within 24 hours.
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-center font-medium">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-sunset-orange text-white rounded-full font-semibold text-[1.05rem] border-none cursor-pointer hover:bg-terracotta hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(232,115,74,0.3)] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {status === "loading" ? "Sending..." : <><span>✉️</span> Send Message</>}
            </button>

            <p className="text-[0.8rem] text-muted text-center italic">
              We typically respond within 24 hours. For urgent order issues, please include your order number.
            </p>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 px-8 bg-warm-cream">
        <div className="text-center max-w-150 mx-auto mb-16">
          <h2 className="font-playfair text-[clamp(2rem,4vw,2.75rem)] mb-4 text-charcoal font-semibold">Other Ways to Reach Us</h2>
          <p className="text-muted text-[1.1rem]">Pick your preferred ray of communication.</p>
        </div>
        <div className="max-w-200 mx-auto grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 max-md:grid-cols-2">
          {[
            { icon: "📧", text: "Email Us at:", link: { href: "mailto:hello@bottledarizonasunshine.com", label: "Hello Sunshine!" } },
            { icon: "📍", text: "Tucson, Arizona" },
            { icon: "🕐", text: "Mon–Fri, 9am–5pm MST" },
            { icon: "☀️", text: "@BottledAZSunshine" },
          ].map((item) => (
            <div key={item.text} className="bg-white p-6 rounded-2xl text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-transparent hover:-translate-y-1 hover:border-golden hover:shadow-[0_15px_40px_rgba(232,115,74,0.1)] transition-all">
              <span className="text-[2rem] block mb-3">{item.icon}</span>
              <p className="text-[0.9rem] font-medium text-charcoal">{item.text}</p>
              {item.link && (
                <a href={item.link.href} className="text-sunset-orange text-[0.9rem] no-underline hover:underline">{item.link.label}</a>
              )}
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to Brighten Your Day?"
        description="Skip the form and go straight to ordering your sunshine."
        buttonText="Place Your Order"
        href="/order"
      />
    </>
  );
}
