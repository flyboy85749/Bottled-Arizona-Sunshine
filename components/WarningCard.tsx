interface WarningCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export default function WarningCard({ icon, title, children }: WarningCardProps) {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-[700px] mx-auto bg-gradient-to-br from-[#fff9e6] to-[#fff3d4] rounded-[20px] p-10 flex gap-6 items-start border-2 border-golden max-md:flex-col max-md:text-center max-md:items-center">
        <span className="text-[2.5rem] shrink-0">{icon}</span>
        <div>
          <h3 className="font-playfair text-terracotta mb-2 text-[1.25rem] font-semibold">{title}</h3>
          <p className="text-muted text-[0.95rem]">{children}</p>
        </div>
      </div>
    </section>
  );
}
