"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
const TIMELINE = [
  { year: "2016", label: "Les débuts",         desc: "Premières vidéos basket publiées, passion pure sans structure.",          accent: "#FE0000", photo: "/images/basket/studio-media.jpg" },
  { year: "2017", label: "Premier studio",     desc: "Installation d'un setup fixe, débuts des émissions régulières.",          accent: "#002EFE", photo: "/images/homepage/photo-studio.png" },
  { year: "2018", label: "10K abonnés",        desc: "Cap symbolique franchi, la communauté prend forme.",                      accent: "#FED000", photo: "/images/à propos/team-ft.jpg" },
  { year: "2019", label: "Couverture NBA",     desc: "Premiers déplacements aux États-Unis pour couvrir la NBA.",               accent: "#FE0000", photo: "/images/à propos/erwan-thomas-batum.jpg" },
  { year: "2020", label: "Création officielle",desc: "First Team devient une structure médiatique professionnelle.",            accent: "#002EFE", photo: "/images/à propos/erwan-thomas.jpg" },
  { year: "2021", label: "100K YouTube",       desc: "Premier grand cap symbolique franchi sur la chaîne.",                    accent: "#FED000", photo: "/images/à propos/erwan-firstdayshow.jpg" },
  { year: "2022", label: "Partenariat NBA FR", desc: "First Team devient partenaire officiel NBA France.",                      accent: "#FE0000", photo: "/images/à propos/lnb-dazn-club.jpg" },
  { year: "2023", label: "Mondial Berlin",     desc: "Envoyés spéciaux en Allemagne pour la Coupe du Monde FIBA.",             accent: "#002EFE", photo: "/images/à propos/nbahouse-carmeloanthony.jpg" },
  { year: "2024", label: "JO Paris + 500K",   desc: "Présents aux JO & 500K abonnés — premier média basket FR à franchir le cap.", accent: "#FED000", photo: "/images/à propos/thomas-tony-parker.jpg" },
  { year: "2025", label: "Lancement Offense",  desc: "Nouvelle émission sport & culture avec SDM, Riolo & invités.",           accent: "#FE0000", photo: "/images/offense/offense-thumbnail.png" },
];

const FONDATEURS = [
  { num: "01.", name: "Thomas Dufant",  role: "Co-Fondateur", detail: "La voix qui structure les débats", color: "#002EFE", photo: "/images/equipe/thomas.jpg" },
  { num: "02.", name: "Erwan Abautret", role: "Co-Fondateur", detail: "Le regard éditorial",             color: "#FE0000", photo: "/images/equipe/erwan.jpg" },
  { num: "03.", name: "Stephen Brun",   role: "Co-Fondateur", detail: "Le maître du concept",            color: "#FED000", photo: "/images/equipe/stephen.png" },
];

const CONSULTANTS = [
  { name: "Jeremy Raharifidy", role: "Consultant",  detail: "Expert tactique",  photo: "/images/à propos/erwan-thomas.jpg" },
  { name: "Léo Tilhet",        role: "Consultant",  detail: "Culture basket",   photo: "/images/à propos/lnb-dazn-club.jpg" },
  { name: "Yanis Gieli",       role: "Consultant",  detail: "Stats & data",     photo: "/images/basket/player-portrait.jpg" },
  { name: "Chris Roche",       role: "Consultant",  detail: "International",    photo: "/images/basket/studio-media.jpg" },
  { name: "Thomas Larrouquis", role: "Reporter",    detail: "Terrain & live",   photo: "/images/à propos/thomas-larrouquis-firstdayshow.jpg" },
  { name: "Tom Ciaravino",     role: "Animateur",   detail: "Offense — Host",   photo: "/images/vignettes/edgar-yves.jpg" },
];

const PROJECTS = [
  { title: "NBA Classic Games",   desc: "Grands classiques NBA commentés par First Team.",    img: "/images/emission/ClassicGames.png" },
  { title: "JO Paris 2024",       desc: "Coverage complet des épreuves basketball.",          img: "/images/à propos/erwan-firstdayshow.jpg" },
  { title: "Mondial Berlin 2023", desc: "Envoyés spéciaux pour la Coupe du Monde FIBA.",      img: "/images/à propos/nbahouse-carmeloanthony.jpg" },
  { title: "Wemby x First Team",  desc: "Suivi exclusif de Victor Wembanyama en NBA.",        img: "/images/vignettes/itw-wemby.png" },
  { title: "Partenariat NBA FR",  desc: "First Team — partenaire officiel NBA France.",       img: "/images/à propos/erwan-thomas-batum.jpg" },
  { title: "Offense",             desc: "Nouvelle émission sport & culture lancée en 2025.",  img: "/images/offense/offense-thumbnail.png" },
];

const KPI = [
  { num: "500K+", label: "Abonnés YouTube" },
  { num: "10",    label: "Ans de passion" },
  { num: "58M+",  label: "Vues totales" },
  { num: "N°1",   label: "Média basket FR" },
];

// ── COMPOSANTS ────────────────────────────────────────────────────────

function FounderCard({ member }: { member: typeof FONDATEURS[0] }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal"
      style={{ background: "#161616", borderRadius: 4, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s ease" }}
      onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ height: 6, background: member.color }} />
      <div style={{ height: 300, overflow: "hidden" }}>
        <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
      </div>
      <div style={{ padding: "24px 28px" }}>
        <span style={{ ...ANTON, fontSize: 13, color: member.color, letterSpacing: 1 }}>{member.num}</span>
        <h3 style={{ ...ANTON, fontSize: 24, letterSpacing: "0.5px", textTransform: "uppercase" as const, color: "#fff", marginTop: 4, marginBottom: 6 }}>{member.name}</h3>
        <p style={{ ...MANROPE(600), fontSize: 13, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 4 }}>{member.role}</p>
        <p style={{ ...MANROPE(400), fontSize: 12, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>{member.detail}</p>
      </div>
    </div>
  );
}

function ConsultantCard({ member }: { member: typeof CONSULTANTS[0] }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ cursor: "pointer" }}
      onMouseEnter={e => { const img = (e.currentTarget as HTMLElement).querySelector("img"); if (img) img.style.transform = "scale(1.06)"; }}
      onMouseLeave={e => { const img = (e.currentTarget as HTMLElement).querySelector("img"); if (img) img.style.transform = "scale(1)"; }}
    >
      <div style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: 4, marginBottom: 12, background: "#1a1a1a" }}>
        <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", filter: "grayscale(40%)", transition: "transform 0.4s ease, filter 0.3s ease" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = "grayscale(0%)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = "grayscale(40%)"}
        />
      </div>
      <p style={{ ...ANTON, fontSize: 14, color: "#0A0A0A", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 2 }}>{member.name}</p>
      <p style={{ ...MANROPE(600), fontSize: 11, color: "#FE0000", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 2 }}>{member.role}</p>
      <p style={{ ...MANROPE(400), fontSize: 11, color: "rgba(0,0,0,0.4)", fontStyle: "italic" }}>{member.detail}</p>
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
        <img src="/images/à propos/team-ft.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
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
            <Link href="/partenaires" className="pill-btn pill-btn-outline-white">Devenir partenaire</Link>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", height: 4, zIndex: 3 }}>
          <div style={{ flex: 1, background: "#FE0000" }} /><div style={{ flex: 1, background: "#FED000" }} /><div style={{ flex: 1, background: "#002EFE" }} />
        </div>
      </section>

      {/* INTRO 2 COLONNES */}
      <section style={{ padding: "100px 40px", background: "#fff", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#002EFE", marginBottom: 20 }}>NOTRE MISSION</p>
            <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 0.92, textTransform: "uppercase" as const, color: "#0A0A0A", letterSpacing: "-0.5px", marginBottom: 28 }}>
              Média 100%<br />basket.
            </h2>
            <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.75, color: "rgba(0,0,0,0.65)", marginBottom: 20 }}>
              First Team est le premier média basket français entièrement indépendant. Depuis 2020, nous couvrons la NBA, la Ligue Nationale de Basket et le basketball international avec passion et sans compromis.
            </p>
            <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.75, color: "rgba(0,0,0,0.65)", marginBottom: 36 }}>
              Débats sans filtre, entretiens exclusifs avec les plus grandes stars, analyses tactiques poussées — First Team, c'est le basket comme vous l'aimez.
            </p>
            <a href="mailto:contact@firstteam.fr" className="pill-btn pill-btn-yellow">Nous écrire →</a>
          </div>
          <div style={{ position: "relative" as const }}>
            <div style={{ position: "absolute" as const, top: -16, right: -16, width: "100%", height: "100%", background: "#FED000", borderRadius: 4, zIndex: 0 }} />
            <div style={{ position: "relative" as const, zIndex: 1, borderRadius: 4, overflow: "hidden", aspectRatio: "4/3" }}>
              <img src="/images/à propos/erwan-thomas-batum.jpg" alt="First Team" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* KPI */}
      <section style={{ position: "relative", padding: "80px 40px", overflow: "hidden" }}>
        <img src="/images/basket/fans-arena.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.93)", zIndex: 1 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          {KPI.map((k, i) => (
            <div key={i} style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none", padding: "20px 40px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
              <span style={{ ...ANTON, fontSize: "clamp(40px, 5vw, 72px)", color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>{k.num}</span>
              <span style={{ ...MANROPE(500), fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>{k.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TRICOLOR STRIP */}
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
                    style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", flexShrink: 0, width: 280, cursor: "pointer" }}
                    onMouseEnter={() => setHoveredTimeline(i)}
                    onMouseLeave={() => setHoveredTimeline(null)}
                  >
                    {/* Photo — apparaît au hover */}
                    <div style={{ overflow: "hidden", borderRadius: 4, marginBottom: 8, width: "calc(100% - 16px)", maxHeight: isHov ? 130 : 0, opacity: isHov ? 1 : 0, transition: "max-height 0.35s ease, opacity 0.25s ease" }}>
                      <img src={item.photo} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
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
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>CE QU'ON A FAIT</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#0A0A0A", letterSpacing: "-0.5px", marginBottom: 56 }}>
            Nos projets<br />historiques.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {PROJECTS.map((p, i) => (
              <div key={i} style={{ position: "relative" as const, overflow: "hidden", borderRadius: 4, aspectRatio: "16/10", cursor: "pointer" }}
                onMouseEnter={e => { const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLElement; if (img) img.style.transform = "scale(1.06)"; }}
                onMouseLeave={e => { const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLElement; if (img) img.style.transform = "scale(1)"; }}
              >
                <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px" }}>
                  <p style={{ ...ANTON, fontSize: 15, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 4 }}>{p.title}</p>
                  <p style={{ ...MANROPE(400), fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>{p.desc}</p>
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

      {/* L'ÉQUIPE — consultants & collaborateurs */}
      <section style={{ background: "#fff", padding: "100px 40px", borderTop: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>LES VISAGES</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#0A0A0A", letterSpacing: "-0.5px", marginBottom: 56 }}>
            Consultants &<br />collaborateurs.
          </h2>

          {/* Separator */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <span style={{ ...MANROPE(700), fontSize: 10, letterSpacing: 3, color: "rgba(0,0,0,0.35)", textTransform: "uppercase" as const }}>Consultants & staff</span>
            <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {CONSULTANTS.map((m, i) => <ConsultantCard key={i} member={m} />)}
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
            Partenariats, brand deals, productions, événements — discutons de votre projet.
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
