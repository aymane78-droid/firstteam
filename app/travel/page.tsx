"use client";
import Link from "next/link";

const ANTON   = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

const TRIPS = [
  {
    city: "New York",
    label: "New York City",
    subtitle: "Madison Square Garden",
    img: "/images/homepage/new-york.jpg",
    date: "Janv. 2025",
  },
  {
    city: "Los Angeles",
    label: "Los Angeles",
    subtitle: "Crypto.com Arena",
    img: "https://picsum.photos/seed/la-travel/800/600",
    date: "Fév. 2025",
  },
  {
    city: "Las Vegas",
    label: "Las Vegas",
    subtitle: "T-Mobile Arena",
    img: "https://picsum.photos/seed/lv-travel/800/600",
    date: "Mars 2025",
  },
  {
    city: "San Antonio",
    label: "San Antonio",
    subtitle: "Frost Bank Center",
    img: "https://picsum.photos/seed/sa-travel/800/600",
    date: "Avr. 2025",
  },
];

const KEY_POINTS = [
  { icon: "🏀", title: "Matchs NBA en live", desc: "Places premium aux meilleures rencontres de la saison." },
  { icon: "✈️", title: "Tout inclus",         desc: "Vol, hôtel, transports et activités organisés pour toi." },
  { icon: "🎙️", title: "Coulisses exclusives", desc: "Accès backstage, rencontres et expériences uniques." },
  { icon: "🤝", title: "Communauté First Team", desc: "Voyage avec les passionnés de basket qui pensent comme toi." },
];

export default function TravelPage() {
  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: 600, overflow: "hidden" }}>
        <img
          src="/images/differentes-pages/travel.jpg"
          alt="First Team Travels"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, rgba(10,10,10,0.92) 100%)" }} />

        {/* Tricolor bar top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, display: "flex", zIndex: 2 }}>
          <div style={{ flex: 1, background: "#FE0000" }} />
          <div style={{ flex: 1, background: "#FED000" }} />
          <div style={{ flex: 1, background: "#002EFE" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 72px" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 4, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 20 }}>FIRST TEAM TRAVELS</p>
          <h1 style={{ ...ANTON, fontSize: "clamp(3rem, 8vw, 7rem)", color: "#fff", textTransform: "uppercase" as const, lineHeight: 0.9, letterSpacing: "-1px", marginBottom: 32, maxWidth: 900 }}>
            Le basket<br />en live,<br />ensemble.
          </h1>
          <p style={{ ...MANROPE(400), fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 40, maxWidth: 560 }}>
            Voyages organisés pour vivre les plus grands matchs NBA depuis les meilleures places. New York, Los Angeles, Las Vegas — avec la communauté First Team.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <a href="#voyages" className="pill-btn pill-btn-red">Voir les voyages →</a>
            <Link href="/" className="pill-btn pill-btn-outline-white">Retour à l'accueil</Link>
          </div>
        </div>
      </section>

      {/* ── TEXT BAND ── */}
      <section style={{ background: "#111", padding: "0 48px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", height: 72, gap: 48 }}>
          {["New York", "Los Angeles", "Las Vegas", "San Antonio", "New York", "Los Angeles", "Las Vegas", "San Antonio"].map((city, i) => (
            <span key={i} style={{ ...MANROPE(700), fontSize: 13, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" as const }}>
              {city} <span style={{ color: "#FE0000", marginLeft: 12 }}>✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── XXL TITLE BAND ── */}
      <section style={{ padding: "100px 48px", background: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 8vw, 7rem)", color: "#fff", textTransform: "uppercase" as const, lineHeight: 0.9, letterSpacing: "-1px", marginBottom: 48 }}>
            Vis le basket<br />
            <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.25)", color: "transparent" }}>autrement.</span>
          </h2>
          <p style={{ ...MANROPE(400), fontSize: 18, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 680 }}>
            Des voyages pensés par des passionnés de basket, pour des passionnés de basket. Chaque destination, chaque match, chaque moment — tout est sélectionné pour que tu vives une expérience inoubliable.
          </p>
        </div>
      </section>

      {/* ── 4 KEY POINTS ── */}
      <section style={{ padding: "80px 48px", background: "#111" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {KEY_POINTS.map((kp, i) => (
              <div key={i} style={{ padding: "36px 32px", borderLeft: `3px solid ${["#FE0000", "#FED000", "#002EFE", "#FE0000"][i]}`, background: "#0d0d0d", borderRadius: "0 10px 10px 0" }}>
                <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{kp.icon}</span>
                <h3 style={{ ...ANTON, fontSize: 22, color: "#fff", textTransform: "uppercase" as const, marginBottom: 10, lineHeight: 1.1 }}>{kp.title}</h3>
                <p style={{ ...MANROPE(400), fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>{kp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 VOYAGES SOLD-OUT ── */}
      <section id="voyages" style={{ padding: "100px 48px", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>NOS ÉDITIONS</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", textTransform: "uppercase" as const, letterSpacing: "-0.5px", marginBottom: 56 }}>
            Voyages passés.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {TRIPS.map((trip, i) => (
              <div key={i} style={{ position: "relative", borderRadius: 14, overflow: "hidden", aspectRatio: "4/3" }}>
                <img
                  src={trip.img}
                  alt={trip.city}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.05) 100%)" }} />

                {/* Sold-out badge */}
                <div style={{ position: "absolute", top: 20, right: 20, background: "#FE0000", padding: "6px 14px", borderRadius: 999, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ ...MANROPE(800), fontSize: 10, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 1 }}>SOLD OUT</span>
                </div>

                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px" }}>
                  <span style={{ ...MANROPE(600), fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase" as const, display: "block", marginBottom: 6 }}>{trip.date}</span>
                  <h3 style={{ ...ANTON, fontSize: 32, color: "#fff", textTransform: "uppercase" as const, lineHeight: 1, marginBottom: 6 }}>{trip.label}</h3>
                  <p style={{ ...MANROPE(500), fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}>{trip.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Coming soon CTA */}
          <div style={{ marginTop: 56, padding: "48px 40px", background: "#111", borderRadius: 14, textAlign: "center" as const, border: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FED000", marginBottom: 12 }}>PROCHAINE ÉDITION</p>
            <h3 style={{ ...ANTON, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#fff", textTransform: "uppercase" as const, marginBottom: 16 }}>Bientôt annoncée.</h3>
            <p style={{ ...MANROPE(400), fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 32 }}>Suis-nous sur les réseaux pour ne pas manquer l'annonce du prochain voyage.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" as const, flexWrap: "wrap" as const }}>
              <a href="https://www.instagram.com/firstteam101/" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-white">Instagram →</a>
              <a href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-red">YouTube →</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
