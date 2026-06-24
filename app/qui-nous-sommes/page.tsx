"use client";
import { useRef, useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import MediaBasketSection from "../components/MediaBasketSection";

const ANTON   = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── DATA ──────────────────────────────────────────────────────────────
const TIMELINE: { year: string; label: string; desc: string; accent: string; photo: string; version?: number }[] = [
  { year: "2016", label: "Lancement du média",                desc: "First Team se crée et se lance dans cette grande aventure avec vous.",                                              accent: "#FE0000", photo: "2016_xtfbef" },
  { year: "2017", label: "Les Premiers First Day Show",        desc: "On lance notre émission phare, Erwan, Thomas, Stephen et Waxx pour parler basket dans un format Talk-Show.",      accent: "#002EFE", photo: "2018_ae9zkw" },
  { year: "2018", label: "50k abonnés",                        desc: "Un premier milestone d'importance atteint avec vous !",                                                            accent: "#FED000", photo: "2017_rygcmk" },
  { year: "2019", label: "Le All-Star Game à L.A.",            desc: "First Team se déplace à Los Angeles pour découvrir son premier All-Star Game sur place.",                          accent: "#FE0000", photo: "2019_vlchbi" },
  { year: "2020", label: "1er changement de logo",             desc: "Nouvelle DA ! First Team arbore ses nouvelles couleurs.",                                                          accent: "#002EFE", photo: "2020_pzmdm3" },
  { year: "2022", label: "NBA Paris Game",                     desc: "Un énorme dispositif pour le retour de la NBA à Paris.",                                                           accent: "#FE0000", photo: "2022_NBA_vk68bp", version: 2 },
  { year: "2022", label: "EuroBasket 2022",                    desc: "Première compétition EDF couverte sur place.",                                                                     accent: "#FED000", photo: "2022_EuroBasket_zbajtg" },
  { year: "2023", label: "Coupe du Monde 2023",                desc: "La découverte des Philippines pour une compétition historique.",                                                   accent: "#002EFE", photo: "2023_Coupedumonde_wwohz9" },
  { year: "2023", label: "Wembanyama sur First Team",          desc: "Pour sa dernière année en France avec les Mets 92, on a suivi et diffusé les matchs de Wemby sur notre chaîne.", accent: "#FE0000", photo: "2023_Mets92_stkubo" },
  { year: "2024", label: "Basketball Africa League",           desc: "Découverte de la BAL à Dakar.",                                                                                    accent: "#FED000", photo: "2024_BAL_qynnnf" },
  { year: "2024", label: "JO de Paris",                        desc: "Une quinzaine historique à Paris avec notre record d'audience.",                                                   accent: "#002EFE", photo: "2024_JO_vlri03" },
  { year: "2025", label: "Coupe du Monde U19 chez First Team", desc: "Diffusion de la compétition phare des jeunes sur nos chaînes.",                                                   accent: "#FE0000", photo: "2025_CDM_U19_ybsjx4" },
];

const FONDATEURS: { num: string; name: string; role: string; detail: string; color: string; photo: string; version?: number }[] = [
  { num: "01.", name: "Thomas Dufant",  role: "Co-Fondateur", detail: "La voix qui structure les débats", color: "#002EFE", photo: "0402_HOME_cwrvbm" },
  { num: "02.", name: "Erwan Abautret", role: "Co-Fondateur", detail: "Le regard éditorial",             color: "#FE0000", photo: "Erwan_ctxyao",    version: 2 },
  { num: "03.", name: "Stephen Brun",   role: "Co-Fondateur", detail: "Le maître du concept",            color: "#FED000", photo: "0403_HOME_yagu4z", version: 2 },
];

const TEAM_CONSULTANTS: { name: string; role: string; photo: string; version?: number }[] = [
  { name: "Théo Haumesser",             role: "Consultant", photo: "Theo_Haumesser_gg8igb" },
  { name: "Thomas Larrouquis",          role: "Consultant", photo: "Thomas_Larrouquis_zerroz", version: 2 },
  { name: "Arthur Sene",                role: "Consultant", photo: "Arthur_yzn7rc" },
];

const TEAM_STAFF: { name: string; role?: string; photo: string; version?: number }[] = [
  { name: "Jeremy Raharifidy--Barbe",   photo: "Jeremy_bjsruo", version: 3 },
  { name: "Tom Ciaravino",              photo: "Tom_um4yoo" },
  { name: "Aymane El Atchia",           photo: "Aymane_bvmcj8" },
  { name: "Léo Tilhet-Coartet Vasquez", photo: "Leo_o5hwxm",    version: 2 },
  { name: "Yanis Giely",                photo: "Yanis_e31tz0",   version: 2 },
];

const PROJECTS = [
  { title: "NBA Classic Games",                  img: "ClassicGames_mf1fan" },
  { title: "JO 2024 à Paris",                    img: "JO_2024_c0omhy" },
  { title: "CDM 2023 aux Philippines",           img: "CDM_2023_mdnnz2" },
  { title: "Victor Wembanyama chez First Team",  img: "Wembanyama_First_Team_tm4zba" },
  { title: "NBA x First Team",                   img: "NBA_First_Team_gxgoxh" },
  { title: "Offense",                            img: "offense_ivq75c" },
];

const KPI = [
  { num: "+500k",  label: "abonnés en cumulé" },
  { num: "10",     label: "ans de passion" },
  { num: "110M+",  label: "vues par saison" },
];

// ── COMPOSANTS ────────────────────────────────────────────────────────

function FounderCard({ member }: { member: { num: string; name: string; role: string; detail: string; color: string; photo: string; version?: number } }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal"
      style={{ background: "#161616", borderRadius: 4, overflow: "hidden", transition: "transform 0.2s ease" }}
      onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ height: 6, background: member.color }} />
      <div style={{ height: 300, overflow: "hidden", position: "relative" as const }}>
        <CldImage src={member.photo} alt={member.name} fill version={member.version} style={{ objectFit: "cover", objectPosition: "top" }} format="auto" quality="auto" />
      </div>
      <div style={{ padding: "24px 28px" }}>
        <h3 style={{ ...ANTON, fontSize: 24, letterSpacing: "0.5px", textTransform: "uppercase" as const, color: "#fff", marginTop: 0, marginBottom: 6 }}>{member.name}</h3>
        <p style={{ ...MANROPE(600), fontSize: 13, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 0 }}>{member.role}</p>
      </div>
    </div>
  );
}

function ConsultantCard({ member }: { member: { name: string; role?: string; photo: string; version?: number } }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal"
      onMouseEnter={e => { const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLElement; if (img) { img.style.transform = "scale(1.06)"; img.style.filter = "grayscale(0%)"; } }}
      onMouseLeave={e => { const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLElement; if (img) { img.style.transform = "scale(1)"; img.style.filter = "grayscale(40%)"; } }}
    >
      <div style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: 4, marginBottom: 12, background: "#1a1a1a", position: "relative" as const }}>
        <CldImage src={member.photo} alt={member.name} fill version={member.version} style={{ objectFit: "cover", objectPosition: "top", filter: "grayscale(40%)", transition: "transform 0.4s ease, filter 0.3s ease" }} format="auto" quality="auto" />
      </div>
      <p style={{ ...ANTON, fontSize: 14, color: "#0A0A0A", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 4 }}>{member.name}</p>
      {member.role && <p style={{ ...MANROPE(600), fontSize: 11, color: "#FE0000", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>{member.role}</p>}
    </div>
  );
}

export default function QuiNousSommesPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredTimeline, setHoveredTimeline] = useState<number | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    timelineRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };
  const onMouseUp = () => setIsDragging(false);
  const onTouchStart = (e: React.TouchEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !timelineRef.current) return;
    const x = e.touches[0].pageX - timelineRef.current.offsetLeft;
    timelineRef.current.scrollLeft = scrollLeft - (x - startX);
  };

  return (
    <main style={{ background: "#0A0A0A", color: "#fff" }}>

      {/* HERO HEADER */}
      <section style={{ position: "relative", minHeight: 520, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <CldImage src="HEADER_htiwl1" alt="" fill version={3} style={{ objectFit: "cover", zIndex: 0 }} format="auto" quality="auto" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.9) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "120px 40px 70px" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>FIRST TEAM</p>
          <h1 style={{ ...ANTON, fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.88, textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-1px", marginBottom: 32 }}>
            L'équipe<br /><span style={{ color: "#FE0000" }}>First Team.</span>
          </h1>
          <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
            Fondé en 2016 par des passionnés de basketball, First Team est devenu le premier média basket 100% numérique en France. Une équipe, une passion, un objectif : parler basket comme personne.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <a href="mailto:contact@firstteam.fr" className="pill-btn pill-btn-red">Nous contacter →</a>
            <Link href="/partenaires" className="pill-btn pill-btn-outline-white">Nos partenaires</Link>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", height: 4, zIndex: 3 }}>
          <div style={{ flex: 1, background: "#FE0000" }} /><div style={{ flex: 1, background: "#FED000" }} /><div style={{ flex: 1, background: "#002EFE" }} />
        </div>
      </section>

      <MediaBasketSection />

      {/* TRICOLOR STRIP — haut KPI */}
      <div style={{ display: "flex", height: 4 }}>
        <div style={{ flex: 1, background: "#FE0000" }} />
        <div style={{ flex: 1, background: "#FED000" }} />
        <div style={{ flex: 1, background: "#002EFE" }} />
      </div>

      {/* KPI */}
      <section style={{ padding: "80px 40px", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, maxWidth: 1200, margin: "0 auto" }}>
          {KPI.map((k, i) => (
            <div key={i} style={{ borderRight: i < 2 ? "1px solid rgba(10,10,10,0.1)" : "none", padding: "20px 40px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
              <span style={{ ...ANTON, fontSize: "clamp(40px, 5vw, 72px)", color: "#0A0A0A", lineHeight: 1, letterSpacing: "-1px" }}>{k.num}</span>
              <span style={{ ...MANROPE(500), fontSize: 12, color: "rgba(10,10,10,0.45)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>{k.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TRICOLOR STRIP — bas KPI */}
      <div style={{ display: "flex", height: 4 }}>
        <div style={{ flex: 1, background: "#FE0000" }} />
        <div style={{ flex: 1, background: "#FED000" }} />
        <div style={{ flex: 1, background: "#002EFE" }} />
      </div>

      {/* FRISE HISTORIQUE */}
      <section style={{ background: "#111", padding: "100px 0", borderTop: "none" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 40, paddingLeft: 40, paddingRight: 40 }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>NOTRE PARCOURS</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16, marginBottom: 48 }}>
            <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-0.5px" }}>
              Frise historique.
            </h2>
            <p style={{ ...MANROPE(500), fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" as const }}>← Glisser pour explorer →</p>
          </div>
        </div>
        <div
          ref={timelineRef}
          style={{ overflowX: "auto", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", paddingBottom: 40, scrollbarWidth: "none" as const }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
        >
          <div style={{ position: "relative" as const, paddingLeft: 40, paddingRight: 40 }} >
            {/* Timeline line */}
            <div style={{ position: "absolute" as const, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.08)", top: 56 }} />
            <div style={{ display: "flex", alignItems: "flex-start", width: "max-content" }}>
              {TIMELINE.map((item, i) => {
                const isHov = hoveredTimeline === i;
                return (
                  <div key={i}
                    style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", flexShrink: 0, width: 280 }}
                    onMouseEnter={() => setHoveredTimeline(i)}
                    onMouseLeave={() => setHoveredTimeline(null)}
                  >
                    {/* Photo — apparaît au hover */}
                    <div style={{ overflow: "hidden", borderRadius: 4, marginBottom: 8, width: "calc(100% - 16px)", maxHeight: isHov ? 130 : 0, opacity: isHov ? 1 : 0, transition: "max-height 0.35s ease, opacity 0.25s ease" }}>
                      <CldImage src={item.photo} alt="" width={264} height={148} version={item.version} style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} format="auto" quality="auto" />
                    </div>
                    <p style={{ ...ANTON, fontSize: isHov ? 52 : 40, color: isHov ? item.accent : "#fff", lineHeight: 1, marginBottom: 10, transition: "font-size 0.2s ease, color 0.2s ease" }}>{item.year}</p>
                    <div style={{ position: "relative" as const, zIndex: 10, width: 14, height: 14, borderRadius: "50%", marginBottom: 20, flexShrink: 0, background: item.accent, boxShadow: `0 0 0 4px #111, 0 0 0 6px ${item.accent}`, transform: isHov ? "scale(1.4)" : "scale(1)", transition: "transform 0.2s ease" }} />
                    <div style={{ background: isHov ? "#222" : "#1a1a1a", padding: "16px 18px", marginLeft: 8, marginRight: 8, width: "calc(100% - 16px)", borderTop: `3px solid ${item.accent}`, borderRadius: "0 0 4px 4px", transition: "background 0.2s ease" }}>
                      <p style={{ ...MANROPE(700), fontSize: isHov ? 13 : 11, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 6, transition: "font-size 0.2s ease" }}>{item.label}</p>
                      <p style={{ ...MANROPE(400), fontSize: isHov ? 12 : 11, color: isHov ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.4)", lineHeight: 1.5, transition: "font-size 0.2s ease, color 0.2s ease" }}>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* NOS PROJETS */}
      <section style={{ background: "#fff", padding: "100px 40px", borderTop: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#0A0A0A", letterSpacing: "-0.5px", marginBottom: 56 }}>
            Nos projets<br />majeurs.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {PROJECTS.map((p, i) => (
              <div key={i} style={{ position: "relative" as const, overflow: "hidden", borderRadius: 4, aspectRatio: "16/10" }}
                onMouseEnter={e => { const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLElement; if (img) img.style.transform = "scale(1.06)"; }}
                onMouseLeave={e => { const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLElement; if (img) img.style.transform = "scale(1)"; }}
              >
                <CldImage src={p.img} alt={p.title} fill style={{ objectFit: "cover", transition: "transform 0.5s ease" }} format="auto" quality="auto" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px" }}>
                  <p style={{ ...ANTON, fontSize: 15, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 0.5, margin: 0 }}>{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LE ROSTER — fondateurs */}
      <section style={{ padding: "100px 40px", position: "relative", overflow: "hidden" }}>
        <img src="/images/basket/player-run.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.9)", zIndex: 1 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>LES FONDATEURS</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-0.5px", marginBottom: 56 }}>
            Le <span style={{ color: "#FED000" }}>roster.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {FONDATEURS.map((m, i) => <FounderCard key={i} member={m} />)}
          </div>
        </div>
      </section>

      {/* L'ÉQUIPE — consultants & staff */}
      <section style={{ background: "#fff", padding: "100px 40px", borderTop: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#0A0A0A", letterSpacing: "-0.5px", marginBottom: 56 }}>
            L&apos;ÉQUIPE FIRST TEAM
          </h2>

          {/* Consultants */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <span style={{ ...MANROPE(700), fontSize: 10, letterSpacing: 3, color: "rgba(0,0,0,0.35)", textTransform: "uppercase" as const }}>Consultants</span>
            <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 64 }}>
            {TEAM_CONSULTANTS.map((m, i) => <ConsultantCard key={i} member={m} />)}
          </div>

          {/* Staff */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <span style={{ ...MANROPE(700), fontSize: 10, letterSpacing: 3, color: "rgba(0,0,0,0.35)", textTransform: "uppercase" as const }}>Staff</span>
            <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {TEAM_STAFF.map((m, i) => <ConsultantCard key={i} member={m} />)}
          </div>
        </div>
      </section>

      {/* CTA CONTACT */}
      <section style={{ background: "#0A0A0A", padding: "100px 40px", textAlign: "center" as const, borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FED000", marginBottom: 20 }}>ON SE PARLE ?</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.92, textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-1px", marginBottom: 28 }}>
            Travaillons<br />ensemble.
          </h2>
          <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginBottom: 40 }}>
            CONTACTEZ-NOUS POUR CONSTRUIRE UNE COLLABORATION SUR-MESURE
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
            <a href="mailto:contact@firstteam.fr" className="pill-btn pill-btn-yellow">Nous contacter →</a>
            <Link href="/partenaires" className="pill-btn pill-btn-outline-white">Voir nos partenaires</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
