"use client";
import Image from "next/image";
import Link from "next/link";

const ANTON   = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

const TOP_SPONSORS = [
  {
    name: "NBA",
    logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782297115/nbaa_enmvoq.png",
    photo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782291215/NBA_ihu1qw.jpg?v=2",
    photoAlt: "Partenariat NBA × First Team",
    photoScale: 1.35,
    years: "NBA House Paris 2025",
    category: "Partenaire institutionnel",
    color: "#FE0000",
    desc: "Aux côtés de la NBA, First Team accompagne le développement de la ligue en France grâce à une couverture régulière de ses événements majeurs, en France comme à l'international. À travers ses contenus, ses émissions et ses activations digitales, First Team contribue à rapprocher la NBA de sa communauté francophone.",
  },
  {
    name: "FIBA",
    logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782297317/fibaa_dnaxuu.png",
    photo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782291348/FIBA_fiozdi.jpg?v=2",
    photoAlt: "Partenariat FIBA × First Team",
    photoScale: 1.35,
    years: "FIBA House JO 2024",
    category: "Partenaire institutionnel",
    color: "#002EFE",
    desc: "First Team collabore avec la FIBA autour de la couverture des compétitions internationales, en mettant notamment en avant les parcours des équipes de France masculines et féminines. Entre accès terrain, diffusions de matchs, contenus éditoriaux et relais sur les réseaux sociaux, First Team accompagne la promotion du basketball mondial auprès de ses audiences.",
  },
  {
    name: "Winamax",
    logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790595/Winamax2022_logoCompact_RVB_gbfuy3.png",
    photo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782291221/WINAMAX_g0kxzf.png?v=2",
    photoAlt: "Partenariat Winamax × First Team",
    years: "Clutch en live 2025",
    category: "Sponsor principal",
    color: "#FED000",
    desc: "Winamax accompagne First Team depuis 2021, en soutenant nos formats phares et notre développement éditorial. Un partenariat fort avec une marque qui partage notre passion du sport, du débat et des grands rendez-vous basket.",
  },
];

const ALL_PARTNERS = [
  { name: "Nike",           logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782294020/nike-logo-complete-1_xrkh5w.png",          years: "", color: "#0A0A0A" },
  { name: "Adidas",         logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782294022/Adidas_Logo.svg_v4cyzb.png",               years: "", color: "#0A0A0A" },
  { name: "PUMA",           logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782294103/Puma-logo_wjefeb.png",                     years: "", color: "#0A0A0A" },
  { name: "Winamax",        logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790595/Winamax2022_logoCompact_RVB_gbfuy3.png",   years: "", color: "#FED000" },
  { name: "2K",             logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782297122/2k_mteq0s.png",                            years: "", color: "#FE0000", noFilter: true },
  { name: "FIBA",           logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782297317/fibaa_dnaxuu.png",                         years: "", color: "#002EFE", noFilter: true },
  { name: "NordVPN",        logo: "/images/partners/nordvpn-logo.png",                                                                       years: "", color: "#002EFE" },
  { name: "FitnessPark",    logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782294196/fitnesspark_nkpoks.png",                   years: "", color: "#FE0000" },
  { name: "Trade Republic", logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782294202/Trade_Republic_logo_2021.svg_sdx3kf.png",  years: "", color: "#0A0A0A" },
  { name: "Airbnb",         logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782294024/Airbnb-Logo-scaled_o65blz.png",            years: "", color: "#FE0000" },
  { name: "Allianz",        logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782294298/Allianz.svg_mawuoz.png",                   years: "", color: "#002EFE" },
  { name: "DAZN",           logo: "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782294295/dazn_p7wcid.png",                          years: "", color: "#0A0A0A" }, // TODO: vérifier fond transparent (si fond blanc dans le fichier, logo invisible)
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
        <img src="https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790224/catalogue_partenaire_vggjmq.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.88) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "100px 40px 60px" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>FIRST TEAM</p>
          <h1 style={{ ...ANTON, fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.88, textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-1px", marginBottom: 28 }}>
            Nos<br /><span style={{ color: "#FE0000" }}>partenaires.</span>
          </h1>
          <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: 500, marginBottom: 32 }}>
            +500K abonnés, +50M de vues et une communauté qui vit basket au quotidien. Faites entrer votre marque dans le jeu avec le premier média basket français.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <a href="mailto:firstteam@influxcrew.com?subject=Contact%20depuis%20le%20site%20First%20Team" className="pill-btn pill-btn-red">Nous contacter</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", height: 4, zIndex: 3 }}>
          <div style={{ flex: 1, background: "#FE0000" }} /><div style={{ flex: 1, background: "#FED000" }} /><div style={{ flex: 1, background: "#002EFE" }} />
        </div>
      </section>

      {/* TOP SPONSORS — fond sombre, alternance photo/texte, glow coloré */}
      <section style={{ background: "#0A0A0A", padding: "100px 40px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>PARTENARIATS PREMIUM</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-0.5px", marginBottom: 64 }}>
            Nos partenaires<br />principaux.
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.photo} alt={s.photoAlt} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: s.photoScale ? `scale(${s.photoScale})` : undefined }} />
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
                    <div style={{ display: "inline-flex", alignItems: "center", marginBottom: 20 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.logo} alt={s.name} style={{ height: 40, maxWidth: 140, width: "auto", objectFit: "contain", display: "block", filter: s.name === "Winamax" ? "brightness(0) invert(1)" : undefined }} />
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
            Ils nous ont fait<br />confiance.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "#2a2a2a" }}>
            {ALL_PARTNERS.map((p, i) => (
              <div
                key={p.name}
                style={{ background: "#111", padding: "40px 32px", display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 16, transition: "background 0.25s ease" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0A0A0A")}
                onMouseLeave={e => (e.currentTarget.style.background = "#111")}
              >
                <div style={{ height: 56, width: 160, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" as const }}>
                  {p.logo
                    ? <Image src={p.logo} alt={p.name} fill style={{ objectFit: "contain", filter: p.noFilter ? undefined : "brightness(0) invert(1)" }} />
                    : <span style={{ ...MANROPE(700), fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: 1, textTransform: "uppercase" as const }}>Logo à venir</span>
                  }
                </div>
                <div style={{ textAlign: "center" as const }}>
                  <p style={{ ...ANTON, fontSize: 14, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 4 }}>{p.name}</p>
                  {p.years && <p style={{ ...MANROPE(500), fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 1, textTransform: "uppercase" as const }}>{p.years}</p>}
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
            CONTACTEZ-NOUS POUR CONSTRUIRE UNE COLLABORATION SUR-MESURE
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
