import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-8 bg-charcoal text-white/70 text-center">
      <p className="text-[0.9rem]">
        &copy; 2026 Arizona Bottled Sunshine. Hand-captured with love in the Sonoran Desert.
      </p>
      <p className="mt-2 text-[0.8rem]">
        A product that proves even sunshine can be shared.{" "}
        <Link href="/contact" className="text-golden no-underline">Contact Us</Link>
      </p>
    </footer>
  );
}
