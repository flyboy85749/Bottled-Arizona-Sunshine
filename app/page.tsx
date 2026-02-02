import Image from "next/image";
import Link from "next/link";
import WarningCard from "@/components/WarningCard";
import CTASection from "@/components/CTASection";

const features = [
  { icon: "🌅", title: "Golden Hour Rays", desc: "Late afternoon sunshine harvested at the perfect moment when the Arizona sky turns to liquid gold." },
  { icon: "🏜️", title: "Desert Calm", desc: "Infused with the peaceful energy of wide open spaces, quiet horizons, and endless blue skies." },
  { icon: "🌵", title: "Sonoran Spirit", desc: "A whisper of dry breeze and the resilient joy of the desert — because even cacti bloom." },
  { icon: "✨", title: "Joy Particles", desc: "Microscopic bits of pure happiness, naturally occurring in Arizona air since the beginning of time." },
  { icon: "🌡️", title: "Warmth on Demand", desc: "Fills up to 10 sq. ft. of cloudy soul-space with genuine, penetrating warmth." },
  { icon: "💧", title: "Repurposed Hydration™", desc: "A few drops of mystery moisture — because even Arizona air gets thirsty sometimes." },
];

const nutritionRows = [
  { label: "Vitamin D", value: "200%" },
  { label: "Mood Elevation", value: "150%" },
  { label: "Serotonin Boost", value: "120%" },
  { label: "Motivation Activation", value: "95%" },
  { label: "Warmth Penetration", value: "100%" },
  { label: "Optimism Increase", value: "180%" },
  { label: "Tangible Hope", value: "1 Full Dose" },
];

const recommended = [
  { icon: "🌧️", text: "Cloudy cities like Seattle & Portland" },
  { icon: "❄️", text: "Long winters & gloomy moods" },
  { icon: "🏢", text: "Windowless offices & cubicles" },
  { icon: "😔", text: "Seasonal affective doom" },
  { icon: "🌱", text: "Making houseplants jealous" },
  { icon: "💭", text: "Anyone needing desert magic" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-32 pb-16 px-8 relative overflow-hidden">
        <div className="absolute top-0 -right-[10%] w-[70%] h-full bg-gradient-to-br from-golden via-sunset-orange to-terracotta rounded-bl-[40%] opacity-15 animate-pulse-bg" />
        <div className="absolute top-[15%] right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,var(--color-golden)_0%,transparent_70%)] rounded-full animate-glow max-md:w-[200px] max-md:h-[200px] max-md:top-[5%] max-md:right-[5%]" />
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-1">
          <div className="animate-fade-in-up max-md:order-2 max-md:text-center">
            <p className="text-[0.95rem] uppercase tracking-[3px] text-sunset-orange mb-4 font-semibold">Hand-captured in the Sonoran Desert</p>
            <h1 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] mb-6 text-charcoal font-semibold">
              A Little Joy.<br /><span className="text-sunset-orange">A Lot of Sun.</span>
            </h1>
            <p className="text-[1.15rem] text-hero-desc mb-8 max-w-[480px] max-md:mx-auto">
              Captured fresh from Arizona skies, our bottles deliver 100% pure desert sunshine to brighten your cloudiest days. Because everyone deserves a little golden hour.
            </p>
            <div className="flex gap-4 flex-wrap max-md:justify-center">
              <Link href="/order" className="inline-flex items-center gap-2 px-7 py-3.5 bg-sunset-orange text-white no-underline rounded-full font-semibold text-[0.95rem] hover:bg-terracotta hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(232,115,74,0.3)] transition-all">
                <span>☀️</span> Order Your Sunshine
              </Link>
              <Link href="#benefits" className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border-2 border-charcoal text-charcoal no-underline rounded-full font-semibold text-[0.95rem] hover:bg-charcoal hover:text-white hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(45,41,38,0.2)] transition-all">
                See the Benefits
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center animate-fade-in-up-delay max-md:order-1">
            <Image
              src="/product-mockup.png"
              alt="Arizona Bottled Sunshine - Single bottle and 4-Pack Room Set"
              width={520}
              height={520}
              className="max-w-full w-[520px] h-auto rounded-2xl drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-transform max-md:w-full max-md:max-w-[400px]"
              priority
            />
          </div>
        </div>
      </section>

      {/* Benefits / Nutrition */}
      <section id="benefits" className="py-24 px-8 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-warm-cream to-white" />
        <div className="text-center max-w-[600px] mx-auto mb-16 relative">
          <h2 className="font-playfair text-[clamp(2rem,4vw,2.75rem)] mb-4 text-charcoal font-semibold">Nutrition Facts</h2>
          <p className="text-muted text-[1.1rem]">100% Pure Bottled Arizona Sunshine — Everything your soul ordered.</p>
        </div>
        <div className="max-w-[500px] mx-auto bg-warm-cream rounded-[20px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border-2 border-desert-sand">
          <div className="text-center pb-6 border-b-[3px] border-charcoal mb-6">
            <h3 className="font-playfair text-2xl mb-1 font-semibold">☀️ Sunshine Supplement</h3>
            <p className="text-[0.85rem] text-muted">Serving Size: 1 Bottle (covers ~10 sq. ft.)</p>
          </div>
          {nutritionRows.map((row) => (
            <div key={row.label} className="flex justify-between py-3 border-b border-desert-sand last:border-b-0">
              <span className="font-medium">{row.label}</span>
              <span className="font-semibold text-sunset-orange">{row.value}</span>
            </div>
          ))}
          <p className="mt-6 pt-4 border-t-[3px] border-charcoal text-[0.8rem] text-muted italic">
            *Traces of water may remain due to original bottle use — a reminder that even in Arizona&apos;s dryness, there&apos;s still some moisture in the air.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-8 bg-warm-cream">
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <h2 className="font-playfair text-[clamp(2rem,4vw,2.75rem)] mb-4 text-charcoal font-semibold">Desert Magic, Delivered</h2>
          <p className="text-muted text-[1.1rem]">What&apos;s really inside every bottle of Arizona sunshine.</p>
        </div>
        <div className="max-w-[1100px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white p-10 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-transparent hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(232,115,74,0.12)] hover:border-golden transition-all">
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-golden to-sunset-orange rounded-2xl flex items-center justify-center mb-6 text-[1.75rem]">{f.icon}</div>
              <h3 className="font-playfair text-[1.25rem] mb-3 text-charcoal font-semibold">{f.title}</h3>
              <p className="text-muted text-[0.95rem]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section id="recommended" className="py-24 px-8 bg-gradient-to-br from-deep-sky to-[#1d4a5c] text-white relative overflow-hidden">
        <div className="absolute -top-1/2 -right-[20%] w-[600px] h-[600px] bg-[radial-gradient(circle,var(--color-golden)_0%,transparent_60%)] opacity-10" />
        <div className="text-center max-w-[600px] mx-auto mb-16 relative">
          <h2 className="font-playfair text-[clamp(2rem,4vw,2.75rem)] mb-4 text-white font-semibold">Recommended For</h2>
          <p className="text-white/80 text-[1.1rem]">Bringing desert magic to those who need it most.</p>
        </div>
        <div className="max-w-[800px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 relative z-1">
          {recommended.map((r) => (
            <div key={r.text} className="bg-white/10 backdrop-blur-[10px] p-6 rounded-2xl flex items-center gap-4 border border-white/10 hover:bg-white/15 hover:translate-x-2 transition-all">
              <span className="text-2xl">{r.icon}</span>
              <p className="text-[0.95rem] font-medium">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Warning */}
      <WarningCard icon="⚠️" title="Caution: Side Effects May Include">
        Excessive exposure may cause spontaneous smiling, increased energy, sudden creativity, wanderlust, and an overwhelming desire to move west. Not suitable for vampires. Shake gently — rays may settle.
      </WarningCard>

      {/* CTA */}
      <CTASection
        title="Ready to Brighten Your Day?"
        description="Join thousands of sunshine seekers who've discovered the joy of Arizona in a bottle."
        buttonText="Order Your Sunshine"
        href="/order"
      />
    </>
  );
}
