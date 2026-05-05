const FT = { fontFamily: "JoyrideExt, Arial Black, sans-serif" };
const RB = (w: number) => ({ fontFamily: "var(--font-roboto-next), sans-serif", fontWeight: w });

const PHOTOS = [
  { src: "/images/à propos/erwan-thomas.jpg", label: "Erwan & Thomas" },
  { src: "/images/à propos/itw-wembanyama.jpg", label: "Interview Wembanyama" },
  { src: "/images/à propos/thomas-tony-parker.jpg", label: "Thomas × Tony Parker" },
  { src: "/images/à propos/nbahouse-carmeloanthony.jpg", label: "NBA House × Carmelo" },
  { src: "/images/à propos/erwan-firstdayshow.jpg", label: "First Day Show" },
  { src: "/images/à propos/thomas-larrouquis-firstdayshow.jpg", label: "First Day Show Studio" },
  { src: "/images/à propos/erwan-thomas-batum.jpg", label: "Erwan, Thomas & Batum" },
  { src: "/images/à propos/lnb-dazn-club.jpg", label: "LNB × DAZN Club" },
];

const TEAM = [
  { name: "Erwan Abautret",           role: "Co-Fondateur" },
  { name: "Thomas Dufant",            role: "Co-Fondateur" },
  { name: "Stephen Brun",             role: "Co-Fondateur & Consultant" },
  { name: "Tom Ciaravino",            role: "Chef d'édition" },
  { name: "Jeremy Raharifidy-Barbe",  role: "Chef de projet" },
  { name: "Léo Tilhet-Coartet",       role: "Réalisateur" },
  { name: "Aymane El Atchia",         role: "Content Editor" },
  { name: "Yanis Gieli",              role: "Monteur" },
  { name: "Chris Roche",              role: "Happiness Manager" },
  { name: "Thomas Larrouquis",        role: "Consultant" },
  { name: "Arthur Sene",              role: "Consultant" },
  { name: "Théo Haumesser",           role: "Consultant" },
];

const PROJECTS = [
  {
    title: "NBA Classic Games",
    subtitle: "Le cinéma du basket",
    desc: "Revivez les plus grands matchs de l'histoire NBA, commentés et analysés par l'équipe First Team. Des soirées qui ont redéfini le basketball.",
    photos: ["/images/à propos/erwan-thomas.jpg"],
    year: "2022–2026",
  },
  {
    title: "DAZN Club — LNB",
    subtitle: "Le late-night show de la Pro A",
    desc: "Émission hebdomadaire dédiée à la Betclic Élite, en partenariat avec DAZN. Débats, analyses et invités pour couvrir la meilleure ligue d'Europe.",
    photos: ["/images/à propos/lnb-dazn-club.jpg"],
    year: "2023–2024",
  },
  {
    title: "En direct avec Wemby",
    subtitle: "San Antonio, je t'aime",
    desc: "Les matchs de Victor Wembanyama en direct depuis la NBA, commentés et streamés pour toute la communauté First Team.",
    photos: ["/images/à propos/itw-wembanyama.jpg"],
    year: "2023–2024",
  },
  {
    title: "JO Paris 2024",
    subtitle: "L'or ou rien",
    desc: "La couverture complète des Jeux Olympiques de basket à Paris. Sur place pour vivre l'histoire avec l'équipe de France.",
    photos: ["/images/à propos/erwan-thomas-batum.jpg"],
    year: "Été 2024",
  },
  {
    title: "Mondial FIBA Berlin",
    subtitle: "Berlin Calling",
    desc: "Sur place avec l'équipe de France au Championnat du Monde 2023. Coulisses, réactions et analyses depuis les halls de Mercedes-Benz Arena.",
    photos: ["/images/à propos/erwan-firstdayshow.jpg"],
    year: "2023",
  },
  {
    title: "Coupe du Monde U17",
    subtitle: "La relève arrive",
    desc: "En Suisse pour couvrir le Championnat du Monde U17. Premier témoin des futures stars du basketball français.",
    photos: ["/images/à propos/thomas-tony-parker.jpg"],
    year: "2024",
  },
  {
    title: "Matchs commentés LNB",
    subtitle: "Voix des parquets",
    desc: "La voix officielle de matchs de Betclic Élite. Un micro, deux commentateurs, des soirées basket inoubliables.",
    photos: ["/images/à propos/thomas-larrouquis-firstdayshow.jpg"],
    year: "2022–2025",
  },
];

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="w-full aspect-square bg-ft-card border border-ft-border flex items-center justify-center">
      <span className="text-ft-yellow text-2xl" style={FT}>{initials}</span>
    </div>
  );
}

export default function AProposPage() {
  return (
    <main className="pt-16 min-h-screen bg-black">
      {/* Header */}
      <div className="bg-ft-yellow">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
          <p className="text-black/50 text-[10px] tracking-[4px] uppercase mb-3" style={FT}>À PROPOS</p>
          <h1 className="text-black uppercase leading-none" style={{ ...FT, fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            L'ÉQUIPE<br />FIRST TEAM
          </h1>
        </div>
      </div>

      {/* Notre histoire + photo team */}
      <section className="border-b border-ft-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-10 h-[3px] bg-ft-yellow" />
                <p className="text-ft-yellow text-[10px] tracking-[4px] uppercase" style={FT}>NOTRE HISTOIRE</p>
              </div>
              <h2 className="text-white uppercase leading-tight mb-8" style={{ ...FT, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                LE MÉDIA DE TOUS<br />LES BASKETS
              </h2>
              <div className="space-y-4 text-ft-light text-base leading-relaxed" style={RB(400)}>
                <p>First Team est né en 2020 d'une conviction simple : le basket français méritait un média sérieux, passionné et sans compromis. Un espace où les vrais fans pourraient se retrouver.</p>
                <p>Depuis, on a construit une communauté de centaines de milliers de passionnés, interviewé les plus grandes légendes du basket, et lancé Offense — le podcast qui challenge les idées reçues sur le sport.</p>
                <p>On ne fait pas du contenu. On fait du basket.</p>
              </div>
            </div>
            <div className="overflow-hidden">
              <img src="/images/à propos/team-ft.jpg" alt="L'équipe First Team" className="w-full h-80 lg:h-96 object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      {/* L'ÉQUIPE */}
      <section className="border-b border-ft-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-center gap-3 mb-12">
            <span className="block w-10 h-[3px] bg-ft-yellow" />
            <p className="text-ft-yellow text-[10px] tracking-[4px] uppercase" style={FT}>L'ÉQUIPE</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {TEAM.map((member) => (
              <div key={member.name} className="group">
                <Avatar name={member.name} />
                <div className="mt-3">
                  <p className="text-white text-xs uppercase leading-tight mb-0.5" style={{ ...FT, fontSize: "11px" }}>{member.name}</p>
                  <p className="text-ft-muted text-[10px]" style={RB(400)}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETS PASSÉS */}
      <section className="border-b border-ft-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-center gap-3 mb-12">
            <span className="block w-10 h-[3px] bg-ft-yellow" />
            <p className="text-ft-yellow text-[10px] tracking-[4px] uppercase" style={FT}>PROJETS & ÉMISSIONS</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PROJECTS.map((project) => (
              <div key={project.title} className="group border border-ft-border hover:border-ft-yellow transition-colors overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <img src={project.photos[0]} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute top-3 right-3 text-ft-yellow text-[9px] border border-ft-yellow px-2 py-0.5" style={FT}>{project.year}</span>
                </div>
                <div className="p-6">
                  <p className="text-ft-yellow text-[9px] tracking-[3px] uppercase mb-1" style={FT}>{project.subtitle}</p>
                  <h3 className="text-white uppercase mb-3" style={{ ...FT, fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}>{project.title}</h3>
                  <p className="text-ft-muted text-sm leading-relaxed" style={RB(400)}>{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="border-b border-ft-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-center gap-3 mb-10">
            <span className="block w-10 h-[3px] bg-ft-yellow" />
            <p className="text-ft-yellow text-[10px] tracking-[4px] uppercase" style={FT}>EN COULISSES</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {PHOTOS.map((photo, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden">
                <img src={photo.src} alt={photo.label} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-[9px] tracking-[2px] uppercase" style={FT}>{photo.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-ft-yellow">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "500K+", label: "Abonnés" },
              { value: "2020",  label: "Depuis" },
              { value: "200+",  label: "Épisodes Offense" },
              { value: "N°1",   label: "Média basket FR" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-black leading-none mb-1" style={{ ...FT, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>{s.value}</p>
                <p className="text-black/50 text-[9px] tracking-[2px] uppercase" style={FT}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
