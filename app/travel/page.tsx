"use client";
import { useState, useEffect, useRef } from "react";
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
    desc: "Une nuit de rêve au Madison Square Garden face aux New York Knicks. Accès premium, cocktail de bienvenue et ambiance exceptionnelle.",
    matches: "New York Knicks vs Boston Celtics",
    price: "2 490 €",
  },
  {
    city: "Los Angeles",
    label: "Los Angeles",
    subtitle: "Crypto.com Arena",
    img: "https://picsum.photos/seed/la-travel/800/600",
    date: "Fév. 2025",
    desc: "La capitale du showbiz et des Lakers — vivez l'expérience LA avec les meilleures places au Crypto.com Arena.",
    matches: "Los Angeles Lakers vs Golden State Warriors",
    price: "2 890 €",
  },
  {
    city: "Las Vegas",
    label: "Las Vegas",
    subtitle: "T-Mobile Arena",
    img: "https://picsum.photos/seed/lv-travel/800/600",
    date: "Mars 2025",
    desc: "Le NBA In-Season Tournament en plein cœur de Las Vegas. Show total garanti, du début à la fin.",
    matches: "NBA In-Season Tournament Final",
    price: "3 190 €",
  },
  {
    city: "San Antonio",
    label: "San Antonio",
    subtitle: "Frost Bank Center",
    img: "https://picsum.photos/seed/sa-travel/800/600",
    date: "Avr. 2025",
    desc: "Aller voir Wembanyama jouer à San Antonio — l'expérience ultime pour tout fan de basket.",
    matches: "San Antonio Spurs vs Oklahoma City Thunder",
    price: "1 990 €",
  },
];

const KEY_POINTS = [
  { title: "Matchs NBA en live",    desc: "Places premium aux meilleures rencontres de la saison.",           color: "#FE0000" },
  { title: "Tout inclus",           desc: "Vol, hôtel, transports et activités organisés pour toi.",          color: "#ffffff" },
  { title: "Coulisses exclusives",  desc: "Accès backstage, rencontres et expériences uniques.",              color: "#002EFE" },
  { title: "Communauté First Team", desc: "Voyage avec les passionnés de basket qui pensent comme toi.",     color: "#FED000" },
];

function TripCard({ trip }: { trip: typeof TRIPS[0] }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setFilled(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "#111", borderRadius: 14, overflow: "hidden", cursor: "not-allowed", opacity: 0.85 }}>
      {/* Photo */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
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

      {/* Detail panel */}
      <div ref={barRef} style={{ padding: "24px 32px 32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ ...MANROPE(400), fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 20 }}>{trip.desc}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 20, marginBottom: 24, alignItems: "start" }}>
          <div>
            <span style={{ ...MANROPE(700), fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 4 }}>Match</span>
            <span style={{ ...MANROPE(600), fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.4, display: "block" }}>{trip.matches}</span>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <span style={{ ...MANROPE(700), fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 4 }}>Prix</span>
            <span style={{ ...ANTON, fontSize: 22, color: "#FED000", display: "block" }}>{trip.price}</span>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <span style={{ ...MANROPE(700), fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 4 }}>Date</span>
            <span style={{ ...MANROPE(600), fontSize: 12, color: "rgba(255,255,255,0.7)", display: "block" }}>{trip.date}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ ...MANROPE(800), fontSize: 11, color: "#FE0000", textTransform: "uppercase" as const, letterSpacing: 1 }}>60/60 — COMPLET</span>
            <span style={{ ...MANROPE(600), fontSize: 11, color: "rgba(255,255,255,0.35)" }}>100%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 999, height: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "#FE0000", borderRadius: 999, width: filled ? "100%" : "0%", transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

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
            <Link href="/" className="pill-btn pill-btn-outline-white">Retour à l&apos;accueil</Link>
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

      {/* ── MASSIVE TEXT BANNER ── */}
      <section style={{ background: "#111", padding: "80px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 style={{ ...ANTON, fontSize: "clamp(1.8rem, 6vw, 5rem)", lineHeight: 1.05, textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-1px", margin: 0, maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}>
          De nouveaux voyages<br />First Team dès la<br />saison prochaine
        </h2>
      </section>

      {/* ── XXL TITLE + KEY CARDS ── */}
      <section style={{ padding: "100px 48px", background: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* Left — XXL title */}
          <div>
            <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 6vw, 6rem)", color: "#fff", textTransform: "uppercase" as const, lineHeight: 0.9, letterSpacing: "-1px", marginBottom: 32 }}>
              Vis le basket<br />
              <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.25)", color: "transparent" }}>en vrai.</span>
            </h2>
            <p style={{ ...MANROPE(400), fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 440 }}>
              Des voyages pensés par des passionnés de basket, pour des passionnés de basket. Chaque destination, chaque match, chaque moment — tout est sélectionné pour que tu vives une expérience inoubliable.
            </p>
          </div>

          {/* Right — 2×2 square cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {KEY_POINTS.map((kp, i) => (
              <div key={i} style={{
                aspectRatio: "1/1",
                padding: "28px",
                border: `2px solid ${kp.color === "#ffffff" ? "rgba(255,255,255,0.28)" : kp.color}`,
                borderRadius: 4,
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "flex-end",
              }}>
                <h3 style={{ ...ANTON, fontSize: 18, color: "#fff", textTransform: "uppercase" as const, lineHeight: 1.1, marginBottom: 8 }}>{kp.title}</h3>
                <p style={{ ...MANROPE(400), fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: 0 }}>{kp.desc}</p>
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
            {TRIPS.map((trip, i) => <TripCard key={i} trip={trip} />)}
          </div>

          {/* Coming soon CTA */}
          <div style={{ marginTop: 56, padding: "48px 40px", background: "#111", borderRadius: 14, textAlign: "center" as const, border: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FED000", marginBottom: 12 }}>PROCHAINE ÉDITION</p>
            <h3 style={{ ...ANTON, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#fff", textTransform: "uppercase" as const, marginBottom: 16 }}>Bientôt annoncée.</h3>
            <p style={{ ...MANROPE(400), fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 32 }}>Suis-nous sur les réseaux pour ne pas manquer l&apos;annonce du prochain voyage.</p>
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
