import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WarningCard from "@/components/WarningCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Pricing | Arizona Bottled Sunshine",
};

const tiers = [
  {
    icon: "☀️",
    name: "Single Bottle",
    subtitle: "A Personal Ray of Sunshine",
    price: "$12.95",
    priceNote: null,
    featured: false,
    rows: [
      ["Size", "16.9 oz"],
      ["Coverage", "~10 sq. ft."],
      ["Vitamin D", "200% DV"],
      ["Mood Boost", "150%"],
      ["Best For", "Desks & nightstands"],
    ],
    href: "/order?product=single",
    btnText: "Order Single",
    outline: true,
  },
  {
    icon: "🌅",
    name: "4-Pack Room Set",
    subtitle: "The Room Glow Collection",
    price: "$29.95",
    priceNote: "Save $21.85",
    featured: true,
    rows: [
      ["Bottles", "4 × 16.9 oz"],
      ["Coverage", "~40 sq. ft."],
      ["Vitamin D", "800% DV"],
      ["Mood Boost", "600%"],
      ["Best For", "Living rooms & offices"],
    ],
    href: "/order?product=4pack",
    btnText: "Order 4-Pack",
    outline: false,
  },
  {
    icon: "🏜️",
    name: "12-Pack Home Set",
    subtitle: "The Whole House Sunlift",
    price: "$79.95",
    priceNote: "Save $75.45",
    featured: false,
    rows: [
      ["Bottles", "12 × 16.9 oz"],
      ["Coverage", "~120 sq. ft."],
      ["Vitamin D", "2400% DV"],
      ["Mood Boost", "1800%"],
      ["Best For", "Entire homes & gifts"],
    ],
    href: "/order?product=12pack",
    btnText: "Order 12-Pack",
    outline: true,
  },
];

const extras = [
  { icon: "📜", text: "Certificate of Authentic Sunlight" },
  { icon: "🌵", text: "Inspirational desert quote card" },
  { icon: "📦", text: "Desert-tone gift-ready packaging" },
  { icon: "🚚", text: "Free shipping on 4-packs and above" },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        tagline="Choose Your Sunshine"
        title="Pricing &"
        titleAccent="Packages"
        description="Whether you need a single ray of hope or enough sunshine to fill your whole house, we've got you covered."
      />

      {/* Pricing Cards */}
      <section className="pt-16 pb-24 px-8 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-25 bg-linear-to-b from-warm-cream to-white" />
        <div className="max-w-275 mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 relative max-md:grid-cols-1 max-md:max-w-100">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-warm-cream rounded-[20px] p-10 border-2 shadow-[0_10px_40px_rgba(0,0,0,0.04)] flex flex-col items-center text-center relative hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(232,115,74,0.12)] hover:border-golden transition-all ${
                tier.featured
                  ? "border-sunset-orange bg-linear-to-b from-[#fff9f0] to-warm-cream shadow-[0_20px_60px_rgba(232,115,74,0.15)]"
                  : "border-desert-sand"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sunset-orange text-white px-5 py-1.5 rounded-full text-[0.8rem] font-semibold uppercase tracking-[1px] whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="text-[2.5rem] mb-4">{tier.icon}</div>
              <h3 className="font-playfair text-2xl mb-1 text-charcoal font-semibold">
                {tier.name}
              </h3>
              <p className="text-[0.9rem] text-muted mb-6">{tier.subtitle}</p>
              <div className="mb-6">
                <span className="font-playfair text-[2.75rem] font-bold text-charcoal">
                  {tier.price}
                </span>
                {tier.priceNote && (
                  <span className="block text-[0.85rem] text-sage font-semibold mt-1">
                    {tier.priceNote}
                  </span>
                )}
              </div>
              <div className="w-full mb-8 border-t-2 border-desert-sand">
                {tier.rows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between py-3 border-b border-desert-sand text-[0.95rem]"
                  >
                    <span className="font-medium text-muted">{label}</span>
                    <span className="font-semibold text-charcoal">{value}</span>
                  </div>
                ))}
              </div>
              <Link
                href={tier.href}
                className={`mt-auto w-full text-center inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[0.95rem] no-underline transition-all hover:-translate-y-0.5 ${
                  tier.outline
                    ? "bg-transparent border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white hover:shadow-[0_10px_30px_rgba(45,41,38,0.2)]"
                    : "bg-sunset-orange text-white hover:bg-terracotta hover:shadow-[0_10px_30px_rgba(232,115,74,0.3)]"
                }`}
              >
                {tier.btnText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Extras */}
      <section className="py-24 px-8 bg-warm-cream">
        <div className="text-center max-w-150 mx-auto mb-16">
          <h2 className="font-playfair text-[clamp(2rem,4vw,2.75rem)] mb-4 text-charcoal font-semibold">
            Every Bottle Includes
          </h2>
          <p className="text-muted text-[1.1rem]">
            No hidden fees. No surprise clouds. Just pure sunshine.
          </p>
        </div>
        <div className="max-w-200 mx-auto grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 max-md:grid-cols-2">
          {extras.map((e) => (
            <div
              key={e.text}
              className="bg-white p-6 rounded-2xl text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-transparent hover:-translate-y-1 hover:border-golden hover:shadow-[0_15px_40px_rgba(232,115,74,0.1)] transition-all"
            >
              <span className="text-[2rem] block mb-3">{e.icon}</span>
              <p className="text-[0.9rem] font-medium text-charcoal">
                {e.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bulk callout */}
      <WarningCard icon="💡" title="Bulk & Corporate Orders">
        Need sunshine for your whole team? We offer custom bulk pricing for
        corporate gifts, wellness programs, and subscription boxes.{" "}
        <a
          href="mailto:hello@bottledarizonasunshine.com"
          className="text-sunset-orange underline"
        >
          Contact us
        </a>{" "}
        for a custom quote.
      </WarningCard>

      <CTASection
        title="Ready to Brighten Your Day?"
        description="Choose your package and let the Arizona sunshine do the rest."
        buttonText="Place Your Order"
        href="/order"
      />
    </>
  );
}
