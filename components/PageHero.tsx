interface PageHeroProps {
  tagline: string;
  title: string;
  titleAccent: string;
  description: string;
}

export default function PageHero({ tagline, title, titleAccent, description }: PageHeroProps) {
  return (
    <section className="pt-40 pb-16 px-8 text-center relative overflow-hidden">
      {/* Background gradient blob */}
      <div className="absolute top-0 -right-[10%] w-[70%] h-full bg-gradient-to-br from-golden via-sunset-orange to-terracotta rounded-bl-[40%] opacity-15 animate-pulse-bg" />
      {/* Sun glow */}
      <div className="absolute top-[15%] right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,var(--color-golden)_0%,transparent_70%)] rounded-full animate-glow max-md:w-[200px] max-md:h-[200px] max-md:top-[5%] max-md:right-[5%]" />
      <div className="max-w-[600px] mx-auto relative z-1 animate-fade-in-up">
        <p className="text-[0.95rem] uppercase tracking-[3px] text-sunset-orange mb-4 font-semibold">{tagline}</p>
        <h1 className="font-playfair text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] mb-6 text-charcoal font-semibold">
          {title} <span className="text-sunset-orange">{titleAccent}</span>
        </h1>
        <p className="text-[1.15rem] text-hero-desc mx-auto max-w-[480px]">{description}</p>
      </div>
    </section>
  );
}
