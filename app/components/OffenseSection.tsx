import Image from "next/image";
import Link from "next/link";

const FT_FONT = { fontFamily: "JoyrideExt, Arial Black, sans-serif" };

export default function OffenseSection() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="block w-1 h-5 bg-ft-yellow" />
        <p className="text-white text-[10px] tracking-[4px] uppercase" style={FT_FONT}>
          OFFENSE
        </p>
      </div>

      <Link href="/offense" className="group relative overflow-hidden flex-1 block min-h-0">
        <div className="relative w-full h-full min-h-[220px]">
          <Image
            src="/images/offense/offense-thumbnail.png"
            alt="Offense — Le podcast First Team"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-ft-yellow text-[8px] tracking-[3px] uppercase mb-1" style={FT_FONT}>
              FIRST TEAM PRÉSENTE
            </p>
            <h3 className="text-white leading-none mb-1.5" style={{ fontFamily: "Awesome, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              Offense
            </h3>
            <p className="text-white/50 text-[10px] mb-3 r-reg">avec Jérémy Nadeau</p>
            <span className="inline-flex items-center gap-2 bg-ft-yellow text-black text-[9px] tracking-[2px] uppercase px-3 py-1.5" style={FT_FONT}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M8 5v14l11-7z" /></svg>
              ÉCOUTER
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
