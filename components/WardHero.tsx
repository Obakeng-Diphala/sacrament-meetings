import Image from "next/image";

export default function WardHero() {
    return (
        <section className="relative h-48 w-full overflow-hidden">
            <Image
                src="/hero.webp"
                alt="Mother and daughter smiling while playing outside"
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-bold text-white drop-shadow-md">
                    Bountiful 8th Ward
                </p>
            </div>
        </section>
    );  
}