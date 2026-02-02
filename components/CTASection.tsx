import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function CTASection({ title, description, buttonText, href }: CTASectionProps) {
  return (
    <section className="py-24 px-8 bg-warm-cream text-center">
      <h2 className="font-playfair text-[clamp(2rem,4vw,2.75rem)] mb-4 font-semibold">{title}</h2>
      <p className="text-muted text-[1.1rem] mb-8 max-w-[500px] mx-auto">{description}</p>
      <Link href={href} className="inline-flex items-center gap-2 px-7 py-3.5 bg-sunset-orange text-white no-underline rounded-full font-semibold text-[0.95rem] hover:bg-terracotta hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(232,115,74,0.3)] transition-all">
        <span>☀️</span> {buttonText}
      </Link>
    </section>
  );
}
