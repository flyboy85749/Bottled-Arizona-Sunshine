"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SunLogo from "./SunLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/#features", label: "How It Works" },
  { href: "/#recommended", label: "Who It\u2019s For" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 px-8 py-5 flex justify-between items-center z-100 bg-gradient-to-b from-warm-cream/95 to-warm-cream/0">
      <div className="font-playfair text-2xl font-bold text-terracotta flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-inherit no-underline">
          <SunLogo />
          Bottled Arizona Sunshine
        </Link>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="ml-8 text-charcoal no-underline font-medium text-[0.95rem] hover:text-sunset-orange transition-colors">
            {link.label}
          </Link>
        ))}
        <Link href="/order" className="ml-8 inline-flex items-center gap-2 px-7 py-3.5 bg-sunset-orange text-white no-underline rounded-full font-semibold text-[0.95rem] hover:bg-terracotta hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(232,115,74,0.3)] transition-all">
          Order Now
        </Link>
      </nav>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 bg-transparent border-none cursor-pointer z-110"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className={`block w-6 h-0.5 bg-charcoal rounded-full transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block w-6 h-0.5 bg-charcoal rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-charcoal rounded-full transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 bg-warm-cream z-100 flex flex-col items-center justify-center gap-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-charcoal no-underline font-playfair text-2xl font-semibold hover:text-sunset-orange transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/order"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center gap-2 px-10 py-4 bg-sunset-orange text-white no-underline rounded-full font-semibold text-lg hover:bg-terracotta transition-all"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}
