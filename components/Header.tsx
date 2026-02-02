import Link from "next/link";
import SunLogo from "./SunLogo";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 px-8 py-5 flex justify-between items-center z-100 bg-gradient-to-b from-warm-cream/95 to-warm-cream/0">
      <div className="font-playfair text-2xl font-bold text-terracotta flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-inherit no-underline">
          <SunLogo />
          Bottled Arizona Sunshine
        </Link>
      </div>
      <nav className="hidden md:flex items-center">
        <Link href="/" className="ml-8 text-charcoal no-underline font-medium text-[0.95rem] hover:text-sunset-orange transition-colors">Home</Link>
        <Link href="/#benefits" className="ml-8 text-charcoal no-underline font-medium text-[0.95rem] hover:text-sunset-orange transition-colors">Benefits</Link>
        <Link href="/#features" className="ml-8 text-charcoal no-underline font-medium text-[0.95rem] hover:text-sunset-orange transition-colors">How It Works</Link>
        <Link href="/#recommended" className="ml-8 text-charcoal no-underline font-medium text-[0.95rem] hover:text-sunset-orange transition-colors">Who It&apos;s For</Link>
        <Link href="/pricing" className="ml-8 text-charcoal no-underline font-medium text-[0.95rem] hover:text-sunset-orange transition-colors">Pricing</Link>
        <Link href="/contact" className="ml-8 text-charcoal no-underline font-medium text-[0.95rem] hover:text-sunset-orange transition-colors">Contact Us</Link>
        <Link href="/order" className="ml-8 inline-flex items-center gap-2 px-7 py-3.5 bg-sunset-orange text-white no-underline rounded-full font-semibold text-[0.95rem] hover:bg-terracotta hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(232,115,74,0.3)] transition-all">Order Now</Link>
      </nav>
    </header>
  );
}
