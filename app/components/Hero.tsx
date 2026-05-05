import Image from "next/image";
import Link from "next/link";

const FT_FONT = { fontFamily: "JoyrideExt, Arial Black, sans-serif" };
const TM_FONT = { fontFamily: "TouchMe, sans-serif" };

export default function Hero() {
  return (
    <section className="relative min-h-screen flex overflow-hidden bg-black">

      {/* ── Studio background — très faible opacité derrière tout le hero ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/homepage/photo-studio.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.15]"
          priority
        />
        {/* Gradient pour assombrir davantage les bords */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/70" />
      </div>

      {/* ── LEFT — texte ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 lg:px-16 xl:px-20 pt-24 pb-16 w-full lg:w-[58%]">
        {/* Label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-10 h-[3px] bg-ft-yellow" />
          <span className="text-ft-yellow text-[10px] tracking-[5px] uppercase" style={FT_FONT}>
            LE MÉDIA BASKET
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-white uppercase leading-[0.88] mb-8 select-none"
          style={{ ...FT_FONT, fontSize: "clamp(4.5rem, 11vw, 11rem)" }}
        >
          FIRST<br />TEAM
        </h1>

        {/* Tagline */}
        <p className="text-white/50 text-lg lg:text-xl mb-12 whitespace-nowrap" style={TM_FONT}>
          Débats, entretiens exclusifs et analyses NBA — sans filtre.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://youtube.com/@firstteam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-ft-yellow text-black text-base font-black px-8 py-4 hover:bg-ft-yellow-dark transition-colors"
            style={{ ...TM_FONT, fontWeight: 900 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
              <path d="M8 5v14l11-7z" />
            </svg>
            Voir nos vidéos
          </a>
          <Link
            href="/offense"
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-ft-yellow hover:text-ft-yellow text-base px-8 py-4 transition-all"
            style={{ ...TM_FONT, fontWeight: 900 }}
          >
            Offense
          </Link>
        </div>

        {/* Bottom separator line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-ft-border lg:hidden" />
      </div>

      {/* ── RIGHT — photo PNG transparente sur noir ── */}
      <div className="relative z-10 hidden lg:flex items-end justify-center w-[42%] overflow-hidden">
        {/* Cut-out photo — fond transparent, positionné en bas */}
        <div className="relative w-full h-full">
          <Image
            src="/images/homepage/photo-homepage.png"
            alt="First Team"
            fill
            className="object-contain object-bottom"
            priority
          />
          {/* Fondu bas très subtil */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}
