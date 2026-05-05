const FT = { fontFamily: "JoyrideExt, Arial Black, sans-serif" };
const RB = (w: number) => ({ fontFamily: "var(--font-roboto-next), sans-serif", fontWeight: w });

const TRIPS = [
  {
    id: 1, title: "NEW YORK — NBA Experience", sport: "BASKET",
    dates: "15-22 Nov 2026", price: "2 490€", spots: 8, total: 20, status: "available",
    img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1400&h=700&fit=crop",
    desc: "Madison Square Garden, Brooklyn Nets, visite NYC basket.",
    longDesc: "7 jours immersifs au cœur de la capitale mondiale du basketball. On vous emmène dans les coulisses de la NBA avec des expériences inaccessibles au grand public : visite du MSG, accès backstage, rencontres avec des insiders du monde basket. Le tout avec l'équipe First Team à vos côtés.",
    includes: ["Billets pour 3 matchs NBA (MSG, Barclays)", "Hôtel 4★ Manhattan — vue Empire State", "Visite guidée exclusive Madison Square Garden", "Accès backstage & meet-and-greet", "Transferts aéroport inclus", "Repas partagés avec l'équipe FT"],
  },
  {
    id: 2, title: "LOS ANGELES — Lakers & Clippers", sport: "BASKET",
    dates: "2-9 Déc 2026", price: "2 890€", spots: 5, total: 20, status: "available",
    img: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1400&h=700&fit=crop",
    desc: "Crypto.com Arena, Venice Beach, culture basket LA.",
    longDesc: "7 jours sous le soleil de Los Angeles avec l'équipe First Team. Des matchs, des coulisses et une expérience culturelle unique au pays des Lakers.",
    includes: ["Billets Lakers + Clippers", "Hôtel 4★ Downtown LA", "Tour NBA Heritage", "Rencontre exclusive"],
  },
  {
    id: 3, title: "SUPER BOWL LXI — San Francisco", sport: "FOOT US",
    dates: "5-12 Fév 2027", price: "4 990€", spots: 3, total: 15, status: "available",
    img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1400&h=700&fit=crop",
    desc: "L'événement sportif ultime, all-inclusive premium.",
    longDesc: "Le Super Bowl, l'événement sportif le plus regardé de la planète. On vous emmène vivre ça de l'intérieur, avec des places premium et une semaine d'expériences NFL.",
    includes: ["Billet Super Bowl — placement premium", "Expériences NFL Experience Week", "Hôtel 5★ San Francisco", "Package all-inclusive"],
  },
  {
    id: 4, title: "CHICAGO — Bulls Heritage Tour", sport: "BASKET",
    dates: "Oct 2025", price: "—", spots: 0, total: 20, status: "past",
    img: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&h=500&fit=crop",
    desc: "Sur les traces de MJ, United Center, Chicago culture.",
    longDesc: "", includes: [],
  },
  {
    id: 5, title: "BOSTON — MLB & NBA Combo", sport: "BASEBALL",
    dates: "Avr 2025", price: "—", spots: 0, total: 16, status: "past",
    img: "https://images.unsplash.com/photo-1570297065762-30d27a9e1ca0?w=800&h=500&fit=crop",
    desc: "Fenway Park + TD Garden, le combo sportif ultime.",
    longDesc: "", includes: [],
  },
];

export default function TravelsPage() {
  const [featured, ...rest] = TRIPS.filter((t) => t.status === "available");
  const past = TRIPS.filter((t) => t.status === "past");

  return (
    <main className="pt-16 min-h-screen bg-black">
      {/* Header */}
      <div className="bg-ft-yellow">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
          <p className="text-black/50 text-[10px] tracking-[4px] uppercase mb-3" style={FT}>VOYAGES SPORTIFS</p>
          <h1 className="text-black uppercase leading-none mb-3" style={{ ...FT, fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            FT TRAVELS
          </h1>
          <p className="text-black/60 text-sm max-w-md" style={RB(400)}>Vivez le sport américain de l'intérieur. Des expériences uniques réservées à la communauté First Team.</p>
        </div>
      </div>

      {/* Featured trip — full width hero */}
      <section className="border-b border-ft-border">
        <div className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
          <img src={featured.img} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

          <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 py-16 flex flex-col justify-end min-h-[70vh]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-ft-yellow text-black text-[9px] tracking-[2px] uppercase px-3 py-1" style={FT}>{featured.sport}</span>
                <span className="text-ft-yellow text-[9px] border border-ft-yellow px-3 py-1" style={FT}>COUP DE CŒUR FT</span>
              </div>
              <h2 className="text-white uppercase leading-none mb-4" style={{ ...FT, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>{featured.title}</h2>
              <p className="text-white/70 text-base mb-6 leading-relaxed" style={RB(400)}>{featured.longDesc}</p>

              {/* Includes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {featured.includes.map((inc) => (
                  <div key={inc} className="flex items-center gap-2 text-sm text-ft-light" style={RB(400)}>
                    <span className="text-ft-yellow text-xs">✓</span>{inc}
                  </div>
                ))}
              </div>

              {/* Meta + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div>
                  <p className="text-ft-muted text-[9px] tracking-[2px] uppercase mb-1" style={FT}>{featured.dates}</p>
                  <div className="flex items-center gap-4">
                    <p className="text-ft-yellow text-3xl" style={FT}>{featured.price}</p>
                    <div>
                      <p className="text-ft-muted text-[9px]" style={FT}>{featured.spots}/{featured.total} places</p>
                      <div className="w-24 h-1.5 bg-ft-border mt-1">
                        <div className="h-full bg-ft-yellow" style={{ width: `${((featured.total - featured.spots) / featured.total) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-ft-yellow text-black text-[12px] tracking-[2px] uppercase px-10 py-4 hover:bg-ft-yellow-dark transition-colors" style={FT}>
                  RÉSERVER MA PLACE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other trips */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="block w-10 h-[3px] bg-ft-yellow" />
          <p className="text-ft-yellow text-[10px] tracking-[4px] uppercase" style={FT}>AUTRES VOYAGES</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {rest.map((trip) => {
            const pct = Math.round(((trip.total - trip.spots) / trip.total) * 100);
            return (
              <div key={trip.id} className="group border border-ft-border hover:border-ft-yellow transition-colors overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <img src={trip.img} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute top-3 right-3 bg-ft-yellow text-black text-[9px] px-2.5 py-1" style={FT}>{trip.sport}</span>
                  <p className="absolute bottom-3 left-4 text-ft-light text-[10px]" style={RB(400)}>{trip.dates}</p>
                </div>
                <div className="p-5">
                  <h3 className="text-white text-sm uppercase mb-2" style={FT}>{trip.title}</h3>
                  <p className="text-ft-muted text-xs mb-4" style={RB(400)}>{trip.desc}</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-[9px] mb-1.5">
                      <span className="text-ft-muted" style={FT}>PLACES RESTANTES</span>
                      <span className="text-ft-yellow" style={FT}>{trip.spots}/{trip.total}</span>
                    </div>
                    <div className="h-1.5 bg-ft-border"><div className="h-full bg-ft-yellow" style={{ width: `${pct}%` }} /></div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-ft-border">
                    <p className="text-ft-yellow text-lg" style={FT}>{trip.price}</p>
                    <button className="bg-ft-yellow text-black text-[10px] tracking-[2px] uppercase px-5 py-2.5 hover:bg-ft-yellow-dark transition-colors" style={FT}>RÉSERVER</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Past trips */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-10 h-[3px] bg-ft-border" />
          <p className="text-ft-muted text-[10px] tracking-[4px] uppercase" style={FT}>ÉDITIONS PASSÉES</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {past.map((trip) => (
            <div key={trip.id} className="flex gap-4 border border-ft-border p-4 opacity-50">
              <img src={trip.img} alt={trip.title} className="w-24 h-20 object-cover grayscale shrink-0" />
              <div>
                <span className="text-ft-muted text-[8px] tracking-[2px] uppercase" style={FT}>{trip.dates} · COMPLET</span>
                <h4 className="text-white/60 text-xs uppercase mt-1 leading-tight" style={FT}>{trip.title}</h4>
                <p className="text-ft-muted text-[10px] mt-1" style={RB(400)}>{trip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <section className="bg-ft-yellow">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-black uppercase leading-tight mb-2" style={{ ...FT, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>NE RATEZ PAS<br />LE PROCHAIN TRIP</h2>
            <p className="text-black/60 max-w-md" style={RB(400)}>Inscrivez-vous pour être alerté en avant-première des nouvelles destinations.</p>
          </div>
          <div className="flex w-full lg:w-auto max-w-sm shrink-0">
            <input type="email" placeholder="votre@email.fr" className="flex-1 bg-black text-white placeholder:text-white/30 text-sm px-5 py-4 outline-none border-0 min-w-0" />
            <button className="bg-black text-ft-yellow text-[10px] tracking-[2px] uppercase px-6 py-4 hover:bg-white hover:text-black transition-colors shrink-0" style={FT}>OK →</button>
          </div>
        </div>
      </section>
    </main>
  );
}
