"use client";
import Image from "next/image";

const AW = { fontFamily: "Awesome, Georgia, serif" };
const FT = { fontFamily: "JoyrideExt, Arial Black, sans-serif" };
const ORANGE = "#FF5021";

const EPISODES = [
  { id: 1, num: "001", title: "LE FOOT FRANÇAIS EST-IL EN CRISE ?",    guest: "Jérémy Nadeau", date: "11 Avr 2026", duration: "48:23", desc: "Débat houleux sur l'état du football français avec un invité de marque.",            thumb: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=240&h=135&fit=crop" },
  { id: 2, num: "002", title: "WEMBY VA-T-IL DOMINER LA DÉCENNIE ?",    guest: "Marc Music",    date: "8 Avr 2026",  duration: "52:10", desc: "L'ascension fulgurante de Victor Wembanyama passée au crible.",                   thumb: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=240&h=135&fit=crop" },
  { id: 3, num: "003", title: "LE PSG MÉRITE-T-IL AUTANT DE HAINE ?",   guest: "Tonio Life",    date: "4 Avr 2026",  duration: "41:35", desc: "Un sujet qui divise : le PSG et son image en France.",                            thumb: "https://images.unsplash.com/photo-1504450758481-7338bbe75c8e?w=240&h=135&fit=crop" },
  { id: 4, num: "004", title: "LA LIGUE 1 EST-ELLE VRAIMENT NULLE ?",   guest: "Wiloo",         date: "1 Avr 2026",  duration: "55:02", desc: "Comparaison sans filtre entre la Ligue 1 et les grands championnats européens.", thumb: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=240&h=135&fit=crop" },
  { id: 5, num: "005", title: "LES ARBITRES TUENT-ILS LE JEU ?",        guest: "Karim Debouz",  date: "28 Mar 2026", duration: "39:45", desc: "La polémique qui secoue le basket mondial : les arbitres sont-ils à la hauteur ?", thumb: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=240&h=135&fit=crop" },
  { id: 6, num: "006", title: "PEUT-ON ENCORE CROIRE AUX KNICKS ?",     guest: "Théo Sorel",    date: "25 Mar 2026", duration: "46:18", desc: "New York, la ville du basketball. Mais les Knicks méritent-ils l'hype ?",          thumb: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=240&h=135&fit=crop" },
];

const PLATFORMS = [
  { name: "Spotify", href: "#" },
  { name: "Apple Podcasts", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "Deezer", href: "#" },
];

const GUESTS = [
  "SDM", "Grégoire Margotton", "Raymond Domenech", "Ton Pote Gillian",
  "Daniel Riolo", "Yann Couvreur", "Edgar Yves", "Jérémy Nadeau",
];

const TEAM_OFFENSE = [
  { name: "Tom Ciaravino",    role: "Présentateur",  detail: "Expert en accents" },
  { name: "Thomas Dufant",    role: "Consultant",    detail: "Gourmand & Fan de l'Ile de la Tentation" },
  { name: "Erwan Abautret",   role: "Consultant",    detail: "Marseillais-Stéphanois-Brestois qui a failli devenir pro" },
  { name: "Héloise Khan",     role: "Consultant",    detail: "Change de coupe à chaque émission" },
  { name: "Mehdi Maizi",      role: "Consultant",    detail: "Trouve Denzel Washington surcôté" },
  { name: "Stephen Brun",     role: "Consultant",    detail: "Met les Petits Mouchoirs au-dessus du Parrain" },
  { name: "Ngiraan Fall",     role: "Producteur",    detail: "A perdu la CAN, 3 mois après l'avoir gagné" },
  { name: "Aymane El Atchia", role: "Voix Off",      detail: "A gagné la CAN, 3 mois après l'avoir perdu" },
  { name: "Guillaume Clédat", role: "Monteur",       detail: "Le crack tout simplement" },
];

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="w-full aspect-square flex items-center justify-center" style={{ background: "#1a0e09" }}>
      <span style={{ ...FT, color: ORANGE, fontSize: "1.8rem" }}>{initials}</span>
    </div>
  );
}

export default function OffensePage() {
  return (
    <main className="pt-16 min-h-screen" style={{ background: "#0d0906" }}>

      {/* Hero — image pleine */}
      <section className="relative w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
        <Image src="/images/offense/offense-thumbnail.png" alt="Offense" fill className="object-cover" priority />

        {/* Encadré "FIRST TEAM PRÉSENTE" */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 text-center px-10 py-8" style={{ borderColor: ORANGE, background: "rgba(13,9,6,0.75)" }}>
          <p className="text-[9px] tracking-[5px] uppercase mb-3" style={{ ...FT, color: ORANGE }}>FIRST TEAM PRÉSENTE</p>
          <div className="relative w-64 h-16 mx-auto">
            <Image src="/images/logo/logo-offense-blanc.png" alt="Offense" fill className="object-contain" />
          </div>
        </div>

        {/* Platform links bottom */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
          {PLATFORMS.map((p) => (
            <a key={p.name} href={p.href} className="text-[10px] tracking-[2px] uppercase px-5 py-2.5 transition-all" style={{ ...AW, color: "rgba(255,255,255,0.6)", border: `1px solid rgba(255,80,33,0.4)`, background: "rgba(13,9,6,0.7)" }}>
              {p.name}
            </a>
          ))}
        </div>
      </section>

      {/* CTA prises de position */}
      <section className="border-y" style={{ borderColor: "#2a1a10", background: "#150d08" }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[4px] uppercase mb-3" style={{ ...FT, color: ORANGE }}>PARTICIPEZ</p>
            <h2 className="text-white leading-tight" style={{ ...AW, fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              Donnez-nous vos meilleures<br /><em style={{ color: ORANGE }}>takes & débats sur le sport</em>
            </h2>
          </div>
          <a href="mailto:offense@firstteam.fr" className="shrink-0 text-black text-[12px] tracking-[2px] uppercase px-10 py-4 hover:opacity-90 transition-opacity" style={{ ...FT, background: ORANGE }}>
            ENVOYER MA PRISE DE POSITION →
          </a>
        </div>
      </section>

      {/* Épisodes */}
      <section>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-10 h-[3px]" style={{ background: ORANGE }} />
            <p className="text-[10px] tracking-[4px] uppercase" style={{ ...FT, color: ORANGE }}>ÉPISODES</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#2a1a10" }}>
            {EPISODES.map((ep) => (
              <div key={ep.id} className="group flex items-center gap-5 py-5 cursor-pointer -mx-3 px-3 transition-colors" style={{ ["--hover-bg" as string]: "#1a0e09" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1a0e09")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Vignette */}
                <div className="relative w-28 h-16 shrink-0 overflow-hidden">
                  <img src={ep.thumb} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 flex items-center justify-center" style={{ background: ORANGE }}>
                      <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3 ml-0.5"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
                <span className="text-2xl shrink-0 w-10 text-right hidden sm:block" style={{ ...FT, color: "#3a2010" }}>{ep.num}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm lg:text-base leading-tight mb-1 transition-colors" style={{ ...AW, color: "white" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                  >{ep.title}</h3>
                  <p className="text-xs line-clamp-1" style={{ ...AW, color: "#666" }}>{ep.desc}</p>
                </div>
                <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px]" style={{ ...AW, color: "#888" }}>{ep.date}</span>
                  <span className="text-[10px]" style={{ ...AW, color: ORANGE }}>{ep.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invités passés */}
      <section className="border-t" style={{ borderColor: "#2a1a10", background: "#150d08" }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-14">
          <div className="flex items-center gap-3 mb-10">
            <span className="block w-10 h-[3px]" style={{ background: ORANGE }} />
            <p className="text-[10px] tracking-[4px] uppercase" style={{ ...FT, color: ORANGE }}>ILS SONT PASSÉS SUR OFFENSE</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {GUESTS.map((guest) => (
              <span key={guest} className="border px-5 py-3 text-sm" style={{ ...AW, color: "rgba(255,255,255,0.8)", borderColor: "#3a2010" }}>
                {guest}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* L'équipe Offense */}
      <section className="border-t" style={{ borderColor: "#2a1a10" }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-14">
          <div className="flex items-center gap-3 mb-10">
            <span className="block w-10 h-[3px]" style={{ background: ORANGE }} />
            <p className="text-[10px] tracking-[4px] uppercase" style={{ ...FT, color: ORANGE }}>L'ÉQUIPE OFFENSE</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {TEAM_OFFENSE.map((member) => (
              <div key={member.name}>
                <Avatar name={member.name} />
                <div className="mt-3">
                  <p className="text-xs uppercase leading-tight mb-0.5" style={{ ...FT, color: "white", fontSize: "10px" }}>{member.name}</p>
                  <p className="text-[10px] mb-1" style={{ ...AW, color: ORANGE }}>{member.role}</p>
                  <p className="text-[9px] italic leading-snug" style={{ ...AW, color: "#666" }}>{member.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section style={{ background: ORANGE }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16 text-center">
          <p className="text-black/50 text-[10px] tracking-[4px] uppercase mb-4" style={FT}>NE RATEZ RIEN</p>
          <h2 className="text-black leading-none mb-8" style={{ ...AW, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Abonnez-vous à Offense
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {PLATFORMS.map((p) => (
              <a key={p.name} href={p.href} className="bg-black text-white text-[11px] tracking-[2px] uppercase px-8 py-4 hover:bg-white hover:text-black transition-colors" style={FT}>
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
