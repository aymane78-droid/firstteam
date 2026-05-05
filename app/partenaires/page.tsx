"use client";
import Image from "next/image";
import Link from "next/link";

const ANTON   = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

const TOP_SPONSORS = [
  {
    name: "Winamax",
    logo: "/images/partners/logo-winamax.png",
    photo: "/images/à propos/erwan-thomas.jpg",
    years: "2021 — 2023",
    category: "Sponsor principal",
    color: "#FE0000",
    desc: "Winamax a été le partenaire historique de First Team pendant deux saisons NBA complètes. Ce partenariat structurant a permis à l'équipe de financer sa production, d'étoffer ses formats longs et d'asseoir sa place de premier média basket français. Une collaboration naturelle entre deux marques qui parlent au même public.",
  },
  {
    name: "Saily",
    logo: "/images/partners/logo-saily.png",
    photo: "/images/à propos/erwan-firstdayshow.jpg",
    years: "2024 — 2025",
    category: "Partenaire tech",
    color: "#002EFE",
    desc: "Saily a accompagné First Team dans sa phase d'expansion internationale, permettant à l'équipe de couvrir les événements NBA aux États-Unis avec des solutions de connectivité fiables. Un partenariat tech aligné avec les déplacements de l'équipe à Las Vegas, New York et San Francisco.",
  },
  {
    name: "Champion",
    logo: "/images/partners/logo-winamax.png",
    photo: "/images/homepage/photo-studio.png",
    years: "2024",
    category: "Partenariat lifestyle",
    color: "#FED000",
    desc: "La collaboration avec Champion a donné naissance à la première collection capsule First Team — des pièces en édition limitée portant les codes visuels du média basket le plus engagé de France. Une alliance entre culture sportive et streetwear qui a rencontré un succès immédiat auprès de la communauté.",
  },
];

const ALL_PARTNERS = [
  { name: "NordVPN",        logo: "/images/partners/nordvpn-logo.png",       years: "2023 — 2024", color: "#002EFE" },
  { name: "Trade Republic", logo: "/images/partners/traderepublic-logo.png", years: "2024 — 2025", color: "#0A0A0A" },
  { name: "Ramify",         logo: "/images/partners/ramify-logo.png",         years: "2024",        color: "#FE0000" },
  { name: "Bitpanda",       logo: "/images/partners/bitpanda-logo.webp",      years: "2023",        color: "#FED000" },
  { name: "Holly",          logo: "/images/partners/holly-logo.png",          years: "2023",        color: "#002EFE" },
  { name: "Influx",         logo: "/images/partners/influx-logo.jpeg",        years: "2022 — 2023", color: "#0A0A0A" },
  { name: "NBA France",     logo: "/images/partners/NBA_Logo.svg.png",        years: "2022 —",      color: "#FE0000" },
  { name: "FIBA",           logo: "/images/partners/fiba-logo.png",           years: "2023",        color: "#002EFE" },
];

const KPI = [
  { v: "10+",  l: "Sponsors historiques" },
  { v: "4 ans", l: "De partenariats" },
  { v: "50M+", l: "Impressions générées" },
  { v: "500K+", l: "Audience engagée" },
];

export default function PartenairesPage() {
  return (
    <main style={{ background: "#0A0A0A", color: "#fff" }}>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: 480, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img src="/images/à propos/erwan-thomas.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.88) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "100px 40px 60px" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>FIRST TEAM</p>
          <h1 style={{ ...ANTON, fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.88, textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-1px", marginBottom: 28 }}>
            Nos<br /><span style={{ color: "#FE0000" }}>sponsors.</span>
          </h1>
          <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: 500, marginBottom: 32 }}>
            500K abonnés, 50M de vues, une communauté passionnée et engagée. Travaillez avec le premier média basket français.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <a href="mailto:contact@firstteam.fr" className="pill-btn pill-btn-red">Devenir sponsor →</a>
            <Link href="/qui-nous-sommes" className="pill-btn pill-btn-outline-white">Qui sommes-nous ?</Link>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", height: 4, zIndex: 3 }}>
          <div style={{ flex: 1, background: "#FE0000" }} /><div style={{ flex: 1, background: "#FED000" }} /><div style={{ flex: 1, background: "#002EFE" }} />
        </div>
      </section>

      {/* KPI BAND */}
      <section style={{ position: "relative", padding: "80px 40px", overflow: "hidden" }}>
        <img src="/images/basket/fans-arena.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.93)", zIndex: 1 }} />
        <div style={{ display: "flex", height: 4, position: "absolute", top: 0, left: 0, right: 0, zIndex: 3 }}>
          <div style={{ flex: 1, background: "#FE0000" }} /><div style={{ flex: 1, background: "#FED000" }} /><div style={{ flex: 1, background: "#002EFE" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          {KPI.map((k, i) => (
            <div key={i} style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none", padding: "20px 40px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
              <span style={{ ...ANTON, fontSize: "clamp(40px, 5vw, 72px)", color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>{k.v}</span>
              <span style={{ ...MANROPE(500), fontSize: 12, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>{k.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TOP SPONSORS — fond sombre, alternance photo/texte, glow coloré */}
      <section style={{ background: "#0A0A0A", padding: "100px 40px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>PARTENARIATS PREMIUM</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-0.5px", marginBottom: 64 }}>
            Nos sponsors<br />principaux.
          </h2>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: 24 }}>
            {TOP_SPONSORS.map((s, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={s.name} style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  background: "#111", borderRadius: 12, overflow: "hidden",
                  boxShadow: `0 0 32px 8px ${s.color}30, 0 0 64px 16px ${s.color}14`,
                  transition: "box-shadow 0.3s ease",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 48px 12px ${s.color}50, 0 0 96px 24px ${s.color}22`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px 8px ${s.color}30, 0 0 64px 16px ${s.color}14`}
                >
                  {/* Photo */}
                  <div style={{ position: "relative" as const, aspectRatio: "16/10", overflow: "hidden", order: isEven ? 1 : 2 }}>
                    <Image src={s.photo} alt={s.name} fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)" }} />
                    <div style={{ position: "absolute", top: 16, left: 16, background: s.color, color: s.color === "#FED000" ? "#0A0A0A" : "#fff", ...MANROPE(700), fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 2 }}>
                      {s.years}
                    </div>
                  </div>

                  {/* Text */}
                  <div style={{
                    padding: "52px 56px",
                    display: "flex",
                    flexDirection: "column" as const,
                    justifyContent: "center",
                    order: isEven ? 2 : 1,
                    borderLeft: isEven ? `4px solid ${s.color}` : "none",
                    borderRight: !isEven ? `4px solid ${s.color}` : "none",
                  }}>
                    <div style={{ position: "relative" as const, height: 48, width: 160, marginBottom: 20 }}>
                      <Image src={s.logo} alt={s.name} fill style={{ objectFit: "contain", objectPosition: "left", filter: "brightness(0) invert(1)" }} />
                    </div>
                    <p style={{ ...MANROPE(800), fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: s.color, marginBottom: 8 }}>{s.category}</p>
                    <h3 style={{ ...ANTON, fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", textTransform: "uppercase" as const, color: "#fff", marginBottom: 20 }}>{s.name}</h3>
                    <p style={{ ...MANROPE(400), fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOUS LES PARTENAIRES — fond sombre, grille logos */}
      <section style={{ background: "#111", padding: "100px 40px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>TOUTES NOS MARQUES</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-0.5px", marginBottom: 64 }}>
            Ils ont fait<br />confiance.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "#2a2a2a" }}>
            {ALL_PARTNERS.map((p, i) => (
              <div
                key={p.name}
                style={{ background: "#111", padding: "40px 32px", display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 16, transition: "background 0.25s ease", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0A0A0A")}
                onMouseLeave={e => (e.currentTarget.style.background = "#111")}
              >
                <div style={{ position: "relative" as const, height: 56, width: 160 }}>
                  <Image src={p.logo} alt={p.name} fill style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </div>
                <div style={{ textAlign: "center" as const }}>
                  <p style={{ ...ANTON, fontSize: 14, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 4 }}>{p.name}</p>
                  <p style={{ ...MANROPE(500), fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 1, textTransform: "uppercase" as const }}>{p.years}</p>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color === "#0A0A0A" ? "#888" : p.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0A0A0A", padding: "100px 40px", textAlign: "center" as const, borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FED000", marginBottom: 20 }}>VOUS AUSSI</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.92, textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-1px", marginBottom: 24 }}>
            Travaillons<br />ensemble.
          </h2>
          <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginBottom: 40 }}>
            500K abonnés, 50M de vues, une communauté engagée. Contactez-nous pour construire une collaboration sur mesure.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
            <a href="mailto:contact@firstteam.fr" className="pill-btn pill-btn-red">Nous contacter →</a>
            <a href="https://influxcrew.com/" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-outline-white">Découvrir Influx →</a>
          </div>
        </div>
      </section>

    </main>
  );
}
