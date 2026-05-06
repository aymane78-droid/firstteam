"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ANTON   = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });
const AWESOME = (w: number) => ({ fontFamily: "Awesome, Georgia, serif", fontWeight: w });

// ── DATA ──────────────────────────────────────────────────────────────
const OFFENSE_PHOTOS = [
  "/images/offense-photos/couvreur.jpg",
  "/images/offense-photos/nadeau.jpg",
  "/images/offense-photos/raymond.jpg",
  "/images/offense-photos/riolo.jpg",
];

const OFFENSE_EPISODES = [
  { title: "Épisode 13 — Erwan Abautret", guest: "Erwan Abautret", date: "10 Avr 2025", duration: "38:12", thumb: "/images/vignettes/VIGNETTE_EP013_VDEF.jpg" },
  { title: "Épisode 05 — Les secrets du game", guest: "Tom Ciaravino", date: "25 Mar 2025", duration: "41:05", thumb: "/images/vignettes/VIGNETTE_OFFENSE_EP05.jpg" },
  { title: "Riolo — Ce que le foot n'ose pas dire", guest: "Daniel Riolo", date: "8 Mar 2025", duration: "44:30", thumb: "/images/vignettes/VIGNETTE_RIOLO.jpg" },
];

const CATEGORIES = [
  { id: "FDS",    label: "First Day Show",    color: "#002EFE", logo: "/images/emission/firstdayshow.png",  thumb: "/images/vignettes-emissions/vignettes-firstdayshow/VIGNETTE_FDS256.jpg", desc: "Le rendez-vous du lendemain. Thomas et Erwan décortiquent l'actu NBA en temps réel." },
  { id: "LA",     label: "Libre Antenne",     color: "#FE0000", logo: "/images/emission/libreantenne.png",  thumb: "/images/vignettes-emissions/VIGNETTE - BOSTON.jpg",                       desc: "Le format signature — débats sans filtre, opinions tranchées et basketball à l'état pur." },
  { id: "NBACG",  label: "NBA Classic Games", color: "#555555", logo: "/images/emission/ClassicGames.png",  thumb: "/images/vignettes-emissions/VIGNETTE - 65 matchs.jpg",                    desc: "Revivez les plus grands matchs de l'histoire NBA commentés par l'équipe First Team." },
  { id: "ITW",    label: "Entretiens",        color: "#C89000", logo: "/images/emission/entretien.png",     thumb: "/images/vignettes-emissions/VIGNETTE - RAYNAUD GOOD.jpg",                 desc: "Face-à-face exclusifs avec les plus grandes légendes et acteurs du basketball mondial." },
  { id: "VLOG",   label: "Vlog",              color: "#666666", logo: "/images/emission/vlog.png",          thumb: "/images/vignettes-emissions/VIGNETTE - CLEVELAD.jpg",                     desc: "Dans les coulisses de First Team — déplacements, événements, moments inédits." },
  { id: "TLIST",  label: "Tierlist",          color: "#002EFE", logo: "/images/emission/tierlist.png",      thumb: "/images/vignettes-emissions/VIGNETTE - BULLS.jpg",                        desc: "Qui est vraiment le meilleur ? L'équipe classe, compare et tranche les débats intemporels." },
];

const CONCEPT_VIGNETTES: Record<string, string[]> = {
  FDS: [
    "/images/vignettes-emissions/vignettes-firstdayshow/VIGNETTE_FDS256.jpg",
    "/images/vignettes-emissions/vignettes-firstdayshow/VIGNETTE_FDS255.jpg",
    "/images/vignettes-emissions/vignettes-firstdayshow/VIGNETTE_FDS254.jpg",
    "/images/vignettes-emissions/vignettes-firstdayshow/VIGNETTE_FDS253.jpg",
  ],
  LA: [
    "/images/vignettes-emissions/VIGNETTE - BOSTON.jpg",
    "/images/vignettes-emissions/VIGNETTE - CELTICS.jpg",
    "/images/vignettes-emissions/VIGNETTE - ALL-STAR GAME.jpg",
  ],
  NBACG: [
    "/images/vignettes-emissions/VIGNETTE - 65 matchs.jpg",
    "/images/vignettes-emissions/VIGNETTE - 106 PTS.jpg",
    "/images/vignettes-emissions/VIGNETTE - CADE.jpg",
  ],
  ITW: [
    "/images/vignettes-emissions/VIGNETTE - RAYNAUD GOOD.jpg",
    "/images/vignettes-emissions/VIGNETTE_TEST_07.jpg",
    "/images/vignettes-emissions/VIGNETTE - ASG.jpg",
  ],
  VLOG: [
    "/images/vignettes-emissions/VIGNETTE - CLEVELAD.jpg",
    "/images/vignettes-emissions/VIGNETTE - CLIPPERS.jpg",
  ],
  TLIST: [
    "/images/vignettes-emissions/VIGNETTE - BULLS.jpg",
    "/images/vignettes-emissions/VIGNETTE - 76ERS.jpg",
  ],
};

const CONCEPTS: Record<string, {
  title: string; color: string; logo: string; desc: string;
  videos: { title: string; date: string; duration: string }[];
}> = {
  FDS: {
    title: "First Day Show",
    color: "#002EFE",
    logo: "/images/emission/firstdayshow.png",
    desc: "Chaque matin après les matchs NBA, Thomas et Erwan analysent l'actualité de la nuit. Le format incontournable pour ne jamais rater une info.",
    videos: [
      { title: "UNE BONNE SAISON POUR LES SPURS ?", date: "10 Avr", duration: "1:21:11" },
      { title: "DRAFT 2026 : NOS PROJECTIONS",       date: "1 Avr",  duration: "58:22" },
      { title: "LA FOLIE LAKERS CE SOIR",            date: "12 Mar", duration: "44:18" },
      { title: "REACTION FINALS GAME 7",             date: "5 Mar",  duration: "52:00" },
    ],
  },
  LA: {
    title: "Libre Antenne",
    color: "#FE0000",
    logo: "/images/emission/libreantenne.png",
    desc: "Le format signature de First Team. Débats sans filtre, opinions tranchées et basketball à l'état pur. Aucun sujet n'est tabou.",
    videos: [
      { title: "LA GRANDE PREVIEW NBA 2025-26",     date: "12 Avr", duration: "1:44:34" },
      { title: "WEMBY EST-IL DÉJÀ TOP 5 NBA ?",     date: "3 Avr",  duration: "1:02:45" },
      { title: "LES CELTICS PEUVENT-ILS RÉPÉTER ?", date: "22 Mar", duration: "1:15:00" },
    ],
  },
  NBACG: {
    title: "NBA Classic Games",
    color: "#555555",
    logo: "/images/emission/ClassicGames.png",
    desc: "Revivez les plus grands matchs de l'histoire NBA. Commentés, analysés et décortiqués par l'équipe First Team comme si vous y étiez.",
    videos: [
      { title: "LE BRAQUAGE DE TYRESE HALIBURTON",       date: "5 Avr",  duration: "37:10" },
      { title: "LEBRON JAMES — RETOUR SUR UNE CARRIÈRE", date: "28 Mar", duration: "45:30" },
      { title: "PREMIERE GAME DE WEMBANYAMA EN NBA",     date: "15 Mar", duration: "1:05:22" },
    ],
  },
  ITW: {
    title: "Entretiens",
    color: "#C89000",
    logo: "/images/emission/entretien.png",
    desc: "Face-à-face exclusifs avec les plus grandes légendes et acteurs du basketball mondial. Des conversations profondes et sans langue de bois.",
    videos: [
      { title: "R.C. BUFORD — L'ENTRETIEN EXCLUSIF", date: "8 Avr",  duration: "19:00" },
      { title: "ENTRETIEN AVEC EVAN FOURNIER",       date: "25 Mar", duration: "32:15" },
      { title: "NIKOLA JOKIĆ — LE GÉNIE DES BALKANS",date: "19 Mar", duration: "28:40" },
    ],
  },
  VLOG: {
    title: "Vlog",
    color: "#666666",
    logo: "/images/emission/vlog.png",
    desc: "Dans les coulisses de First Team. Déplacements, événements, moments inédits — vivez l'aventure avec nous.",
    videos: [
      { title: "ON ÉTAIT À LA SUMMER LEAGUE", date: "2 Avr",  duration: "18:30" },
      { title: "BACKSTAGE ALL-STAR WEEKEND",  date: "15 Fév", duration: "22:10" },
    ],
  },
  TLIST: {
    title: "Tierlist",
    color: "#002EFE",
    logo: "/images/emission/tierlist.png",
    desc: "Qui est vraiment le meilleur ? L'équipe First Team classe, compare et tranche les débats intemporels du basketball.",
    videos: [
      { title: "TOP 10 MENEURS ALL-TIME : NOTRE TIERLIST", date: "8 Mar", duration: "52:10" },
      { title: "TIERLIST DES DYNASTIES NBA",               date: "1 Mar", duration: "1:08:33" },
    ],
  },
};

const KPI = [
  { value: "500K+", label: "Abonnés" },
  { value: "200+",  label: "Épisodes" },
  { value: "50M+",  label: "Vues totales" },
  { value: "N°1",   label: "Podcast basket FR" },
];

const SOCIAL_LINKS = [
  { label: "YouTube",   sub: "500K abonnés",        color: "#FE0000", href: "https://youtube.com/@firstteam",          icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { label: "Twitch",    sub: "Lives NBA",            color: "#002EFE", href: "https://twitch.tv",                       icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg> },
  { label: "Instagram", sub: "@firstteam101",        color: "#0A0A0A", href: "https://www.instagram.com/firstteam101/", icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { label: "TikTok",    sub: "Les clips qui claquent", color: "#FED000", href: "https://tiktok.com",                   icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
  { label: "Podcast",   sub: "Apple & Spotify",       color: "#FE0000", href: "https://youtube.com/@firstteam",        icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c2.071 0 3.75 1.679 3.75 3.75S14.071 12 12 12s-3.75-1.679-3.75-3.75S9.929 4.5 12 4.5zm0 15.75a9.714 9.714 0 0 1-7.5-3.54c.426-2.468 4.095-3.96 7.5-3.96s7.074 1.492 7.5 3.96a9.714 9.714 0 0 1-7.5 3.54z"/></svg> },
];

// ── COMPOSANTS ────────────────────────────────────────────────────────

export default function ContenusPage() {
  const [tab, setTab] = useState<string>("FDS");
  const [hoveredConceptIdx, setHoveredConceptIdx] = useState<number | null>(null);
  const active = CONCEPTS[tab];

  return (
    <main style={{ background: "#0A0A0A", color: "#fff" }}>

      {/* HEADER HERO */}
      <section style={{ position: "relative", minHeight: 420, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img src="/images/à propos/erwan-firstdayshow.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "100px 40px 60px" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>FIRST TEAM</p>
          <h1 style={{ ...ANTON, fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.88, textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-1px", marginBottom: 32 }}>
            Nos<br />contenus.
          </h1>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <a href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-red">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube →
            </a>
            <a href="#concepts" className="pill-btn pill-btn-outline-white">Nos concepts</a>
          </div>
        </div>
        {/* Tricolor strip */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", height: 4, zIndex: 3 }}>
          <div style={{ flex: 1, background: "#FE0000" }} /><div style={{ flex: 1, background: "#FED000" }} /><div style={{ flex: 1, background: "#002EFE" }} />
        </div>
      </section>

      {/* PLANNING SEMAINE — image directe */}
      <section style={{ background: "#fff", padding: "80px 40px", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <img
            src="/images/page-contenus/planning-semaine.png"
            alt="Planning de la semaine First Team"
            style={{ width: "100%", display: "block", borderRadius: 8, boxShadow: "0 0 40px 10px rgba(254,0,0,0.12), 0 0 80px 20px rgba(254,0,0,0.06)" }}
          />
        </div>
      </section>

      {/* NOS FORMATS — style "Nos dernières vidéos" de la homepage */}
      <section style={{ background: "#0A0A0A", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>NOS FORMATS</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap" as const, gap: 16 }}>
            <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-0.5px" }}>
              Nos dernières vidéos.
            </h2>
            <a href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-outline-white">Tout voir sur YouTube →</a>
          </div>

          {/* Grille glow — même DA que homepage "Nos dernières vidéos" */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setTab(cat.id); document.getElementById("concepts")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  all: "unset", cursor: "pointer", display: "block",
                  background: "#111", borderRadius: 10, overflow: "hidden",
                  boxShadow: `0 0 28px 6px ${cat.color}40, 0 0 56px 10px ${cat.color}18`,
                  transition: "box-shadow 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-5px)"; el.style.boxShadow = `0 0 40px 10px ${cat.color}65, 0 0 80px 18px ${cat.color}28`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = `0 0 28px 6px ${cat.color}40, 0 0 56px 10px ${cat.color}18`; }}
              >
                <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                  <img src={cat.thumb} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)" }} />
                  <span style={{ position: "absolute", top: 10, left: 10, background: cat.color, color: cat.color === "#C89000" || cat.color === "#FED000" ? "#0a0a0a" : "#fff", ...MANROPE(800), fontSize: 9, padding: "3px 8px", borderRadius: 999, letterSpacing: 0.5, textTransform: "uppercase" as const }}>{cat.id}</span>
                </div>
                <div style={{ padding: "14px 18px 18px" }}>
                  <p style={{ ...ANTON, fontSize: 18, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 6 }}>{cat.label}</p>
                  <p style={{ ...MANROPE(400), fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{cat.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* NOS CONCEPTS — sélecteur + contenu */}
      <section id="concepts" style={{ background: "#fff", padding: "100px 40px", borderTop: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>EN DÉTAIL</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#0A0A0A", letterSpacing: "-0.5px", marginBottom: 48 }}>Nos concepts.</h2>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #ddd", marginBottom: 0, overflowX: "auto" }}>
            {Object.keys(CONCEPTS).map((key) => {
              const cat = CATEGORIES.find(c => c.id === key);
              return (
                <button key={key} onClick={() => setTab(key)} style={{
                  all: "unset", cursor: "pointer",
                  padding: "14px 24px",
                  ...MANROPE(tab === key ? 800 : 500),
                  fontSize: 12, letterSpacing: 1.5,
                  textTransform: "uppercase" as const,
                  color: tab === key ? "#0A0A0A" : "rgba(0,0,0,0.35)",
                  borderBottom: tab === key ? `2px solid ${cat?.color || "#FE0000"}` : "2px solid transparent",
                  marginBottom: -1,
                  whiteSpace: "nowrap" as const,
                  transition: "color 0.2s ease",
                }}>
                  {CONCEPTS[key].title}
                </button>
              );
            })}
          </div>

          {/* Concept actif */}
          <div style={{ background: "#0d0d0d", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
            {/* Header concept */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                <Image src={active.logo} alt={active.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
              </div>
              <div style={{ padding: "40px 48px", display: "flex", flexDirection: "column" as const, justifyContent: "center", borderLeft: `4px solid ${active.color}` }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: active.color, padding: "4px 12px", borderRadius: 999, marginBottom: 20, alignSelf: "flex-start" as const }}>
                  <span style={{ ...MANROPE(800), fontSize: 10, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 1 }}>{active.title}</span>
                </div>
                <p style={{ ...MANROPE(400), fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 28 }}>{active.desc}</p>
                <a href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, ...MANROPE(700), fontSize: 14, background: active.color, color: active.color === "#C89000" ? "#0A0A0A" : "#fff", padding: "12px 24px", borderRadius: 999, textDecoration: "none", alignSelf: "flex-start" as const, transition: "transform 0.15s ease" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  Voir sur YouTube →
                </a>
              </div>
            </div>

            {/* Vignettes épisodes récents — 3 seulement, centre agrandi au hover */}
            <div style={{ padding: "28px 32px 32px", borderTop: "1px solid #1a1a1a" }}>
              <p style={{ ...MANROPE(700), fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Derniers épisodes</p>
              <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none" as const, paddingBottom: 4 }}>
                {(CONCEPT_VIGNETTES[tab] || []).slice(0, 3).map((src, i) => (
                  <a key={i} href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredConceptIdx(i)}
                    onMouseLeave={() => setHoveredConceptIdx(null)}
                    style={{ display: "block", flex: "1 0 calc(33.33% - 8px)", borderRadius: 6, overflow: "hidden", aspectRatio: "16/9", position: "relative" as const, textDecoration: "none", transform: hoveredConceptIdx === i && i === 1 ? "scale(1.06)" : "scale(1)", transition: "transform 0.3s ease", zIndex: hoveredConceptIdx === i && i === 1 ? 2 : 1 }}
                  >
                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute" as const, inset: 0, background: "rgba(0,0,0,0.12)" }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI BAND */}
      <section style={{ position: "relative", padding: "80px 40px", overflow: "hidden" }}>
        <img src="/images/basket/ball-closeup.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.93)", zIndex: 1 }} />
        <div style={{ display: "flex", height: 4, position: "absolute", top: 0, left: 0, right: 0, zIndex: 3 }}>
          <div style={{ flex: 1, background: "#FE0000" }} /><div style={{ flex: 1, background: "#FED000" }} /><div style={{ flex: 1, background: "#002EFE" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          {KPI.map((k, i) => (
            <div key={i} style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none", padding: "20px 40px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
              <span style={{ ...ANTON, fontSize: "clamp(40px, 5vw, 72px)", color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>{k.value}</span>
              <span style={{ ...MANROPE(500), fontSize: 12, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>{k.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BANDEAU RÉSEAUX SOCIAUX */}
      <section style={{ background: "#111", padding: "80px 40px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>NOUS SUIVRE</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-0.5px", marginBottom: 48 }}>
            First Team partout.
          </h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const }}>
            {SOCIAL_LINKS.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ flex: "1 1 160px", background: s.color, color: s.color === "#FED000" ? "#0A0A0A" : "#fff", display: "flex", flexDirection: "column" as const, alignItems: "flex-start", borderRadius: 12, padding: "24px 28px", textDecoration: "none", transition: "transform 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div style={{ marginBottom: 12 }}>{s.icon}</div>
                <span style={{ ...ANTON, fontSize: 20, letterSpacing: 0.5, marginBottom: 4 }}>{s.label}</span>
                <span style={{ ...MANROPE(500), fontSize: 12, opacity: 0.75 }}>{s.sub}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* OFFENSE */}
      <section id="offense" style={{ overflow: "hidden", background: "#0A0A0A" }}>

        {/* Bandeau descriptif — fond #DB5224 : texte gauche + Edgar-Yves 16:9 droite */}
        <div style={{ background: "#DB5224" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            {/* Texte */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24, background: "rgba(255,255,255,0.18)", padding: "6px 16px", borderRadius: 2 }}>
                <span style={{ ...MANROPE(800), fontSize: 11, color: "#fff", letterSpacing: 2, textTransform: "uppercase" as const }}>NOTRE CHAÎNE SECONDAIRE</span>
              </div>
              <div style={{ marginBottom: 20, position: "relative", height: 86, width: 260 }}>
                <img src="/images/logo/offense.png" alt="Offense" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "left", filter: "brightness(0) invert(1)" }} />
              </div>
              <p style={{ ...AWESOME(700), fontSize: 18, marginBottom: 16, lineHeight: 1.5, fontStyle: "italic", color: "rgba(255,255,255,0.9)" }}>
                Ce qu'on n'ose jamais demander sur le sport, Offense y répond !
              </p>
              <p style={{ ...MANROPE(400), fontSize: 14, lineHeight: 1.8, marginBottom: 28, color: "rgba(255,255,255,0.82)" }}>
                Aux commandes, Tom Ciaravino avec des visages bien connus de First Team — Thomas, Erwan, Stephen Brun ou Mehdi Maizi — et des invités de prestige. Portraits, long formats, immersions.
              </p>
              <a href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, ...MANROPE(700), fontSize: 14, background: "#EDDBC5", color: "#DB5224", padding: "12px 24px", borderRadius: 999, textDecoration: "none", transition: "transform 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
              >
                Découvrir Offense →
              </a>
            </div>
            {/* Edgar-Yves — 16:9 gros */}
            <a href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", position: "relative", borderRadius: 8, overflow: "hidden", textDecoration: "none", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
            >
              <img src="/images/vignettes/edgar-yves.jpg" alt="Edgar & Yves — Offense" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.08)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.22)"}
              >
                <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#EDDBC5", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 10px rgba(237,219,197,0.2)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#DB5224"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Section sombre — même layout que BuzzedVideo : Edgar-Yves (2/3) + 3 vignettes empilées (1/3) */}
        <div style={{ background: "#0A0A0A", padding: "60px 60px 28px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontFamily: "Awesome, Georgia, serif", fontWeight: 700, fontStyle: "italic", fontSize: 22, color: "rgba(255,255,255,0.85)", marginBottom: 28 }}>Des invités de marque</p>

            {/* Edgar-Yves (2/3) + 3 miniatures empilées (1/3), hauteur parfaitement alignée */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, alignItems: "stretch", marginBottom: 24 }}>
              {/* Edgar-Yves — grande vignette 16:9, définit la hauteur */}
              <a href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer"
                style={{ display: "block", position: "relative" as const, aspectRatio: "16/9", borderRadius: 8, overflow: "hidden", textDecoration: "none" }}
              >
                <img src="/images/vignettes/edgar-yves.jpg" alt="Edgar & Yves — Offense" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                />
                <div style={{ position: "absolute" as const, inset: 0, background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.22)"}
                >
                  <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#EDDBC5", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 10px rgba(237,219,197,0.15)" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#DB5224"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </a>

              {/* 3 miniatures empilées — remplissent exactement la hauteur d'Edgar-Yves */}
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                {[
                  "/images/vignettes/VIGNETTE_OFFENSE_EP05.jpg",
                  "/images/vignettes/VIGNETTE_RIOLO.jpg",
                  "/images/offense/offense-thumbnail.png",
                ].map((src, i) => (
                  <a key={i} href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer"
                    style={{ display: "block", flex: "1 1 0", position: "relative" as const, borderRadius: 6, overflow: "hidden", textDecoration: "none", minHeight: 0 }}
                  >
                    <img src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                    />
                    <div style={{ position: "absolute" as const, inset: 0, background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.22)"}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#DB5224", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Photos offense slidables */}
            <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" as const, paddingBottom: 4 }}>
              {OFFENSE_PHOTOS.map((src, i) => (
                <div key={i} style={{ flexShrink: 0, width: "calc(28% - 6px)" }}>
                  <img src={src} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", borderRadius: 4 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "#0A0A0A", padding: "20px 60px 80px", display: "flex", justifyContent: "flex-end", maxWidth: 1200, margin: "0 auto" }}>
          <a href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, ...MANROPE(700), fontSize: 14, background: "#DB5224", color: "#fff", padding: "13px 24px", borderRadius: 999, textDecoration: "none", transition: "transform 0.15s ease" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Voir tous les épisodes →
          </a>
        </div>
      </section>

    </main>
  );
}
