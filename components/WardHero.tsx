import Image from "next/image";

export default function WardHero() {
  return (
    <section className="relative h-64 w-full overflow-hidden md:h-80">
      <Image
        src="/hero.webp"
        alt="A mother and child outdoors"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      <div className="absolute inset-0 bg-black/35" aria-hidden="true">
        <div className="relative z-10 flex h-full items-center justify-center">
          <p className="text-2xl font-bold text-white drop-shadow-md">
            Bountiful 8th Ward
          </p>
        </div>
      </div>
    </section>
  );
}
