"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { VideoModal } from "../components/VideoModal";
import { fetchLatestLongVideos, fetchPlaylistVideos, FIRST_TEAM_CHANNEL_ID, OFFENSE_CHANNEL_ID } from "../lib/youtube";
import type { YTVideo } from "../lib/youtube";

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

const VIDEO_COLORS = ["#FE0000", "#002EFE", "#C89000", "#555555", "#6C35FF", "#00A8E8"];

// Playlist ID de la collection "Offense L'Émission" (Bloc 2 de la section Offense)
const OFFENSE_PLAYLIST_ID = "PLCdvn6vN4Y1vr8hamwZP5N9je55DAsH98";

// Playlists par concept — ajouter VLOG / TLIST ici quand disponible
const PLAYLISTS: Record<string, string> = {
  FDS:   "PLZZC1FUiXWQbTGZsilKj10dmuYkuOtd6j", // NBA First Day Show
  LA:    "PLZZC1FUiXWQaSRoyqGi5bbWMEsIHXCtEh", // Libre Antenne NBA
  DT:    "PLZZC1FUiXWQaPFHYVXRAqAkLnEPoAUg95", // Double Team
  NBACG: "PLZZC1FUiXWQYC9Zxjo5PmU5y-SfF4j3JT", // NBA Classic Games
  ITW:   "PLZZC1FUiXWQaPH2xWbcOxw1bHgrm6VRGX", // Les Entretiens
  // VLOG:  "à_ajouter",
  // TLIST: "à_ajouter",
};

// Vignettes statiques en fallback si la playlist n'est pas encore configurée
const CONCEPT_VIGNETTES: Record<string, string[]> = {
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
}> = {
  FDS: {
    title: "First Day Show",
    color: "#002EFE",
    logo: "/images/emission/firstdayshow.png",
    desc: "Chaque matin après les matchs NBA, Thomas et Erwan analysent l'actualité de la nuit. Le format incontournable pour ne jamais rater une info.",
  },
  LA: {
    title: "Libre Antenne",
    color: "#FE0000",
    logo: "/images/emission/libreantenne.png",
    desc: "Le format signature de First Team. Débats sans filtre, opinions tranchées et basketball à l'état pur. Aucun sujet n'est tabou.",
  },
  NBACG: {
    title: "NBA Classic Games",
    color: "#555555",
    logo: "/images/emission/ClassicGames.png",
    desc: "Revivez les plus grands matchs de l'histoire NBA. Commentés, analysés et décortiqués par l'équipe First Team comme si vous y étiez.",
  },
  ITW: {
    title: "Entretiens",
    color: "#C89000",
    logo: "/images/emission/entretien.png",
    desc: "Face-à-face exclusifs avec les plus grandes légendes et acteurs du basketball mondial. Des conversations profondes et sans langue de bois.",
  },
  DT: {
    title: "Double Team",
    color: "#6C35FF",
    logo: "/images/emission/double-team.png",
    desc: "Les duos légendaires du basketball passés à la loupe. Complicités, rivalités et moments de grâce — quand deux joueurs font l'histoire ensemble.",
  },
  VLOG: {
    title: "Vlog",
    color: "#666666",
    logo: "/images/emission/vlog.png",
    desc: "Dans les coulisses de First Team. Déplacements, événements, moments inédits — vivez l'aventure avec nous.",
  },
  TLIST: {
    title: "Tierlist",
    color: "#002EFE",
    logo: "/images/emission/tierlist.png",
    desc: "Qui est vraiment le meilleur ? L'équipe First Team classe, compare et tranche les débats intemporels du basketball.",
  },
};

const KPI = [
  { value: "500K+", label: "Abonnés" },
  { value: "200+",  label: "Épisodes" },
  { value: "50M+",  label: "Vues totales" },
  { value: "N°1",   label: "Podcast basket FR" },
];

const SOCIAL_LINKS = [
  { label: "YouTube",   sub: "500K abonnés",          color: "#FE0000", href: "https://youtube.com/@firstteam",          icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { label: "Twitch",    sub: "Lives NBA",              color: "#002EFE", href: "https://twitch.tv",                       icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg> },
  { label: "Instagram", sub: "@firstteam101",          color: "#0A0A0A", href: "https://www.instagram.com/firstteam101/", icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { label: "TikTok",    sub: "Les clips qui claquent",  color: "#FED000", href: "https://tiktok.com",                   icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
  { label: "Podcast",   sub: "Apple & Spotify",         color: "#FE0000", href: "https://youtube.com/@firstteam",        icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c2.071 0 3.75 1.679 3.75 3.75S14.071 12 12 12s-3.75-1.679-3.75-3.75S9.929 4.5 12 4.5zm0 15.75a9.714 9.714 0 0 1-7.5-3.54c.426-2.468 4.095-3.96 7.5-3.96s7.074 1.492 7.5 3.96a9.714 9.714 0 0 1-7.5 3.54z"/></svg> },
];

// ── PAGE ──────────────────────────────────────────────────────────────
export default function ContenusPage() {
  const [tab, setTab] = useState<string>("FDS");
  const active = CONCEPTS[tab];

  // Section "Nos dernières vidéos" — 6 long videos First Team
  const [latestVideos, setLatestVideos] = useState<YTVideo[] | null>(null);
  const [formatsModalId, setFormatsModalId] = useState<string | null>(null);

  // Section "Nos concepts" — playlist par onglet
  const [conceptVideos, setConceptVideos] = useState<YTVideo[] | null>(null);
  const [conceptModalId, setConceptModalId] = useState<string | null>(null);

  // Offense Bloc 1 — 1 seule dernière vidéo de la chaîne Offense
  const [latestOffenseVideo, setLatestOffenseVideo] = useState<YTVideo | null>(null);
  const [offenseVideoModalId, setOffenseVideoModalId] = useState<string | null>(null);

  // Offense Bloc 2 — slider playlist "Offense L'Émission"
  const [offensePlaylistVideos, setOffensePlaylistVideos] = useState<YTVideo[]>([]);
  const [offensePlaylistModalId, setOffensePlaylistModalId] = useState<string | null>(null);
  const offenseSliderRef = useRef<HTMLDivElement>(null);
  const [isOffenseDragging, setIsOffenseDragging] = useState(false);
  const offenseStartX = useRef(0);
  const offenseScrollLeft = useRef(0);

  // ── Fetches ──────────────────────────────────────────────────────────

  useEffect(() => {
    fetchLatestLongVideos(FIRST_TEAM_CHANNEL_ID, 6)
      .then(setLatestVideos)
      .catch(() => {});
  }, []);

  // Recharge la playlist quand on change d'onglet concept
  useEffect(() => {
    const playlistId = PLAYLISTS[tab];
    if (!playlistId) { setConceptVideos(null); return; }
    setConceptVideos(null);
    fetchPlaylistVideos(playlistId, 10)
      .then(setConceptVideos)
      .catch(() => { setConceptVideos(null); });
  }, [tab]);

  useEffect(() => {
    fetchLatestLongVideos(OFFENSE_CHANNEL_ID, 1)
      .then(videos => { if (videos.length > 0) setLatestOffenseVideo(videos[0]); })
      .catch(() => {});
    fetchPlaylistVideos(OFFENSE_PLAYLIST_ID, 10)
      .then(setOffensePlaylistVideos)
      .catch(() => {});
  }, []);

  // ── Drag slider Offense (Bloc 2) ──────────────────────────────────────

  const onOffenseMouseDown = (e: React.MouseEvent) => {
    if (!offenseSliderRef.current) return;
    setIsOffenseDragging(true);
    offenseStartX.current = e.pageX - offenseSliderRef.current.getBoundingClientRect().left;
    offenseScrollLeft.current = offenseSliderRef.current.scrollLeft;
  };
  const onOffenseMouseMove = (e: React.MouseEvent) => {
    if (!isOffenseDragging || !offenseSliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - offenseSliderRef.current.getBoundingClientRect().left;
    offenseSliderRef.current.scrollLeft = offenseScrollLeft.current - (x - offenseStartX.current);
  };
  const onOffenseMouseUp = () => setIsOffenseDragging(false);
  const onOffenseTouchStart = (e: React.TouchEvent) => {
    if (!offenseSliderRef.current) return;
    setIsOffenseDragging(true);
    offenseStartX.current = e.touches[0].pageX - offenseSliderRef.current.getBoundingClientRect().left;
    offenseScrollLeft.current = offenseSliderRef.current.scrollLeft;
  };
  const onOffenseTouchMove = (e: React.TouchEvent) => {
    if (!isOffenseDragging || !offenseSliderRef.current) return;
    const x = e.touches[0].pageX - offenseSliderRef.current.getBoundingClientRect().left;
    offenseSliderRef.current.scrollLeft = offenseScrollLeft.current - (x - offenseStartX.current);
  };

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <main style={{ background: "#0A0A0A", color: "#fff" }}>

      {/* ── HEADER HERO ── */}
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
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", height: 4, zIndex: 3 }}>
          <div style={{ flex: 1, background: "#FE0000" }} /><div style={{ flex: 1, background: "#FED000" }} /><div style={{ flex: 1, background: "#002EFE" }} />
        </div>
      </section>

      {/* ── PLANNING SEMAINE ── */}
      <section style={{ background: "#fff", padding: "80px 40px", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <img
            src="/images/page-contenus/planning-semaine.png"
            alt="Planning de la semaine First Team"
            style={{ width: "100%", display: "block", borderRadius: 8, boxShadow: "0 0 40px 10px rgba(254,0,0,0.12), 0 0 80px 20px rgba(254,0,0,0.06)" }}
          />
        </div>
      </section>

      {/* ── NOS FORMATS — 6 dernières vidéos longues First Team ── */}
      <section style={{ background: "#0A0A0A", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>NOS FORMATS</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap" as const, gap: 16 }}>
            <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-0.5px" }}>
              Nos dernières vidéos.
            </h2>
            <a href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-outline-white">Tout voir sur YouTube →</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {(latestVideos ?? Array(6).fill(null)).map((v: YTVideo | null, i: number) => {
              const glow = VIDEO_COLORS[i % VIDEO_COLORS.length];
              if (!v) return (
                <div key={i} style={{ background: "#111", borderRadius: 10, overflow: "hidden", aspectRatio: "16/9", opacity: 0.25 }} />
              );
              return (
                <a key={i}
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank" rel="noopener noreferrer"
                  onClick={e => { e.preventDefault(); setFormatsModalId(v.id); }}
                  style={{ textDecoration: "none", display: "block", background: "#111", borderRadius: 10, overflow: "hidden", boxShadow: `0 0 28px 6px ${glow}40, 0 0 56px 10px ${glow}18`, transition: "box-shadow 0.3s ease, transform 0.2s ease" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-5px)"; el.style.boxShadow = `0 0 40px 10px ${glow}65, 0 0 80px 18px ${glow}28`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = `0 0 28px 6px ${glow}40, 0 0 56px 10px ${glow}18`; }}
                >
                  <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                    <img src={v.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: glow, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "12px 16px 14px" }}>
                    <p style={{ ...MANROPE(700), fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.4, margin: 0 }}>{v.title}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        {formatsModalId && <VideoModal videoId={formatsModalId} onClose={() => setFormatsModalId(null)} />}
      </section>

      {/* ── NOS CONCEPTS ── */}
      <section id="concepts" style={{ background: "#fff", padding: "100px 40px", borderTop: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 16 }}>EN DÉTAIL</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase" as const, color: "#0A0A0A", letterSpacing: "-0.5px", marginBottom: 48 }}>Nos concepts.</h2>

          {/* Onglets */}
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #ddd", marginBottom: 0, overflowX: "auto" as const }}>
            {Object.keys(CONCEPTS).map((key) => {
              const concept = CONCEPTS[key];
              return (
                <button key={key} onClick={() => setTab(key)} style={{
                  all: "unset", cursor: "pointer",
                  padding: "14px 24px",
                  ...MANROPE(tab === key ? 800 : 500),
                  fontSize: 12, letterSpacing: 1.5,
                  textTransform: "uppercase" as const,
                  color: tab === key ? "#0A0A0A" : "rgba(0,0,0,0.35)",
                  borderBottom: tab === key ? `2px solid ${concept.color}` : "2px solid transparent",
                  marginBottom: -1,
                  whiteSpace: "nowrap" as const,
                  transition: "color 0.2s ease",
                }}>
                  {concept.title}
                </button>
              );
            })}
          </div>

          {/* Concept actif */}
          <div style={{ background: "#0d0d0d", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>

            {/* En-tête concept */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                <Image src={active.logo} alt={active.title} fill style={{ objectFit: "cover" }} />
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

            {/* Slider épisodes — playlist dynamique ou vignettes statiques */}
            <div style={{ padding: "28px 32px 32px", borderTop: "1px solid #1a1a1a" }}>
              <p style={{ ...MANROPE(700), fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Derniers épisodes</p>

              {PLAYLISTS[tab] && conceptVideos ? (
                /* Vidéos dynamiques de la playlist */
                <div style={{ display: "flex", gap: 12, overflowX: "auto" as const, scrollbarWidth: "none" as const, paddingBottom: 4 }}>
                  {conceptVideos.map((v, i) => (
                    <a key={i}
                      href={`https://www.youtube.com/watch?v=${v.id}`}
                      target="_blank" rel="noopener noreferrer"
                      onClick={e => { e.preventDefault(); setConceptModalId(v.id); }}
                      style={{ flexShrink: 0, width: "calc(33.33% - 8px)", display: "block", textDecoration: "none", borderRadius: 6, overflow: "hidden" }}
                    >
                      <div style={{ position: "relative", aspectRatio: "16/9" }}>
                        <img src={v.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: active.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      </div>
                      <div style={{ paddingTop: 6 }}>
                        <p style={{ ...MANROPE(600), fontSize: 10, color: "rgba(255,255,255,0.7)", lineHeight: 1.3, margin: 0 }}>{v.title}</p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : PLAYLISTS[tab] ? (
                /* Chargement en cours */
                <p style={{ ...MANROPE(500), fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Chargement…</p>
              ) : (
                /* Fallback statique pour VLOG / TLIST (pas encore de playlist) */
                <div style={{ display: "flex", gap: 12, overflowX: "auto" as const, scrollbarWidth: "none" as const, paddingBottom: 4 }}>
                  {(CONCEPT_VIGNETTES[tab] ?? []).map((src, i) => (
                    <a key={i} href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer"
                      style={{ flexShrink: 0, flex: "1 0 calc(33.33% - 8px)", display: "block", textDecoration: "none", borderRadius: 6, overflow: "hidden", position: "relative" as const, aspectRatio: "16/9" }}
                    >
                      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)" }} />
                    </a>
                  ))}
                  {(CONCEPT_VIGNETTES[tab] ?? []).length === 0 && (
                    <p style={{ ...MANROPE(500), fontSize: 12, color: "rgba(255,255,255,0.3)", padding: "8px 0" }}>Bientôt disponible</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {conceptModalId && <VideoModal videoId={conceptModalId} onClose={() => setConceptModalId(null)} />}
      </section>

      {/* ── KPI BAND ── */}
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

      {/* ── RÉSEAUX SOCIAUX ── */}
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

      {/* ══════════════════════════════════════════════════════════════════
          OFFENSE — 3 BLOCS
          ══════════════════════════════════════════════════════════════════ */}
      <section id="offense" style={{ overflow: "hidden", background: "#0A0A0A" }}>

        {/* ── BLOC 1 — fond orange : texte gauche + 1 grande vidéo droite ── */}
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
              <a href="https://www.youtube.com/@offense" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, ...MANROPE(700), fontSize: 14, background: "#EDDBC5", color: "#DB5224", padding: "12px 24px", borderRadius: 999, textDecoration: "none", transition: "transform 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
              >
                Découvrir Offense →
              </a>
            </div>

            {/* Dernière vidéo Offense — 1 grande vignette */}
            <a
              href={latestOffenseVideo ? `https://www.youtube.com/watch?v=${latestOffenseVideo.id}` : "https://www.youtube.com/@offense"}
              target="_blank" rel="noopener noreferrer"
              onClick={latestOffenseVideo ? e => { e.preventDefault(); setOffenseVideoModalId(latestOffenseVideo.id); } : undefined}
              style={{ display: "block", position: "relative", borderRadius: 8, overflow: "hidden", textDecoration: "none", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
            >
              <img
                src={latestOffenseVideo?.thumbnail || "/images/vignettes/edgar-yves.jpg"}
                alt={latestOffenseVideo?.title || "Offense — dernière vidéo"}
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}
              />
              <div
                style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease" }}
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

        {/* ── BLOC 2 — fond noir : slider playlist "Offense L'Émission" ── */}
        <div style={{ background: "#0A0A0A", padding: "56px 60px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(219,82,36,0.8)", marginBottom: 12 }}>OFFENSE L'ÉMISSION</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap" as const, gap: 12 }}>
              <h3 style={{ ...ANTON, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-0.5px" }}>
                Tous les épisodes
              </h3>
              <a href={`https://www.youtube.com/playlist?list=${OFFENSE_PLAYLIST_ID}`} target="_blank" rel="noopener noreferrer"
                style={{ ...MANROPE(700), fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 2 }}
              >
                Voir la playlist →
              </a>
            </div>

            {/* Slider drag horizontal */}
            <div
              ref={offenseSliderRef}
              style={{ display: "flex", gap: 14, overflowX: "auto" as const, scrollbarWidth: "none" as const, cursor: isOffenseDragging ? "grabbing" : "grab", userSelect: "none" as const, paddingBottom: 4 }}
              onMouseDown={onOffenseMouseDown}
              onMouseMove={onOffenseMouseMove}
              onMouseUp={onOffenseMouseUp}
              onMouseLeave={onOffenseMouseUp}
              onTouchStart={onOffenseTouchStart}
              onTouchMove={onOffenseTouchMove}
              onTouchEnd={onOffenseMouseUp}
            >
              {offensePlaylistVideos.length > 0 ? offensePlaylistVideos.map((v, i) => (
                <a key={i}
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank" rel="noopener noreferrer"
                  onClick={e => { e.preventDefault(); setOffensePlaylistModalId(v.id); }}
                  style={{ flexShrink: 0, width: "calc(25% - 11px)", display: "block", textDecoration: "none", borderRadius: 8, overflow: "hidden" }}
                  draggable={false}
                >
                  <div style={{ position: "relative", aspectRatio: "16/9" }}>
                    <img src={v.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} draggable={false} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.22)"}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#DB5224", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <p style={{ ...MANROPE(600), fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.35, margin: 0 }}>{v.title}</p>
                  </div>
                </a>
              )) : (
                /* Skeleton pendant le chargement */
                [0, 1, 2, 3].map(i => (
                  <div key={i} style={{ flexShrink: 0, width: "calc(25% - 11px)", borderRadius: 8, overflow: "hidden", aspectRatio: "16/9", background: "#1a1a1a" }} />
                ))
              )}
            </div>
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          </div>
        </div>

        {/* ── BLOC 3 — fond noir : "Avec des invités de marque" + photos ── */}
        <div style={{ background: "#0A0A0A", padding: "0 60px 60px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontFamily: "Awesome, Georgia, serif", fontWeight: 700, fontStyle: "italic", fontSize: 22, color: "rgba(255,255,255,0.85)", marginBottom: 24 }}>
              Avec des invités de marque
            </p>
            <div style={{ display: "flex", gap: 8, overflowX: "auto" as const, scrollbarWidth: "none" as const, paddingBottom: 4 }}>
              {OFFENSE_PHOTOS.map((src, i) => (
                <div key={i} style={{ flexShrink: 0, width: "calc(28% - 6px)" }}>
                  <img src={src} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", borderRadius: 4 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "#0A0A0A", padding: "0 60px 80px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "flex-end" }}>
            <a href="https://www.youtube.com/@offense" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, ...MANROPE(700), fontSize: 14, background: "#DB5224", color: "#fff", padding: "13px 24px", borderRadius: 999, textDecoration: "none", transition: "transform 0.15s ease" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Voir tous les épisodes →
            </a>
          </div>
        </div>

        {offenseVideoModalId && <VideoModal videoId={offenseVideoModalId} onClose={() => setOffenseVideoModalId(null)} />}
        {offensePlaylistModalId && <VideoModal videoId={offensePlaylistModalId} onClose={() => setOffensePlaylistModalId(null)} />}
      </section>

    </main>
  );
}
