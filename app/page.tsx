"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { VideoModal } from "./components/VideoModal";
import { fetchLatestVideos, fetchVideosByIds, fetchLatestLongVideos, FIRST_TEAM_CHANNEL_ID, OFFENSE_CHANNEL_ID } from "./lib/youtube";
import type { YTVideo } from "./lib/youtube";

const ANTON   = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });
const AWESOME = (w: number) => ({ fontFamily: "Awesome, Georgia, serif", fontWeight: w });

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useAutoSlide(total: number, interval = 4000) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % total), interval);
    return () => clearInterval(t);
  }, [total, interval]);
  return [idx, setIdx] as const;
}

// ── DATA ──────────────────────────────────────────────────────────────
const PARTNER_LOGOS = [
  { name: "Winamax",        src: "/images/partners/logo-winamax.png" },
  { name: "NBA",            src: "/images/partners/NBA_Logo.svg.png" },
  { name: "NordVPN",        src: "/images/partners/nordvpn-logo.png" },
  { name: "Bitpanda",       src: "/images/partners/bitpanda-logo.webp" },
  { name: "Trade Republic", src: "/images/partners/traderepublic-logo.png" },
  { name: "Ramify",         src: "/images/partners/ramify-logo.png" },
  { name: "Saily",          src: "/images/partners/logo-saily.png" },
  { name: "FIBA",           src: "/images/partners/fiba-logo.png" },
  { name: "Holly",          src: "/images/partners/holly-logo.png" },
  { name: "Influx",         src: "/images/partners/influx-logo.jpeg" },
];

const BIG_SPONSORS = [
  { name: "Winamax",  src: "/images/partners/logo-winamax.png",  desc: "Partenaire officiel — paris sportifs & poker en ligne" },
  { name: "NBA",      src: "/images/partners/NBA_Logo.svg.png",  desc: "Partenaire officiel — la ligue de basketball la plus regardée au monde" },
  { name: "NordVPN",  src: "/images/partners/nordvpn-logo.png",  desc: "Partenaire officiel — sécurité et confidentialité en ligne" },
];

const TEAM = [
  { num: "01.", name: "Erwan Abautret", role: "Co-fondateur", color: "#FE0000", photo: "/images/equipe/erwan.jpg" },
  { num: "02.", name: "Thomas Dufant",  role: "Co-fondateur", color: "#002EFE", photo: "/images/equipe/thomas.jpg" },
  { num: "03.", name: "Stephen Brun",   role: "Co-fondateur", color: "#FED000", photo: "/images/equipe/stephen.png" },
];

const RECENT_VIDEOS = [
  { emission: "Libre Antenne",     color: "#FE0000", thumb: "/images/vignettes-emissions/VIGNETTE - BOSTON.jpg",        href: "https://youtube.com/@firstteam" },
  { emission: "First Day Show",    color: "#002EFE", thumb: "/images/vignettes-emissions/VIGNETTE - CELTICS.jpg",       href: "https://youtube.com/@firstteam" },
  { emission: "Entretiens",        color: "#C89000", thumb: "/images/vignettes-emissions/VIGNETTE - CADE.jpg",          href: "https://youtube.com/@firstteam" },
  { emission: "NBA Classic Games", color: "#555555", thumb: "/images/vignettes-emissions/VIGNETTE - ALL-STAR GAME.jpg", href: "https://youtube.com/@firstteam" },
];

const BUZZED_VIGNETTES = [
  "/images/vignettes-emissions/VIGNETTE - 106 PTS.jpg",
  "/images/vignettes-emissions/VIGNETTE - 76ERS.jpg",
  "/images/vignettes-emissions/VIGNETTE - BULLS.jpg",
];

// IDs fixes des vidéos Wemby (ordre : grande vignette, puis 3 miniatures)
const WEMBY_VIDEO_IDS = ["RHXv9kQ6WQE", "ikNtmOoKNSE", "CziJAOPlLG0", "6fHPGzpxETk"];

// Couleurs alternées pour les vidéos dynamiques "Nos dernières vidéos"
const VIDEO_COLORS = ["#FE0000", "#002EFE", "#C89000", "#555555"];

// 4 photos pour le slider offense (3 visibles, 1 hors champ)
const OFFENSE_PHOTOS = [
  "/images/offense-photos/couvreur.jpg",
  "/images/offense-photos/nadeau.jpg",
  "/images/offense-photos/raymond.jpg",
  "/images/offense-photos/riolo.jpg",
];

const KPI_DATA = [
  { num: "58M+", label: "Vues saison 2023-24" },
  { num: "10",   label: "Ans d'existence" },
  { num: "4",    label: "Partenaires majeurs" },
  { num: "1ER",  label: "Média basket 100% digital FR" },
];

const ABOUT_SLIDES = [
  "/images/à propos/team-ft.jpg",
  "/images/homepage/photo-studio.png",
  "/images/à propos/erwan-firstdayshow.jpg",
  "/images/à propos/erwan-thomas-batum.jpg",
  "/images/à propos/thomas-tony-parker.jpg",
];

const NAV_LINKS = [
  { label: "Accueil",       href: "/" },
  { label: "Nos Contenus",  href: "/contenus" },
  { label: "L'équipe",      href: "/qui-nous-sommes" },
  { label: "Sponsors",      href: "/partenaires" },
];

const CATEGORIES = [
  { label: "Contenus",    href: "/contenus",        photo: "/images/differentes-pages/contenus.jpg" },
  { label: "L'équipe",    href: "/qui-nous-sommes", photo: "/images/differentes-pages/equipe.jpg" },
  { label: "Merch",       href: "/shop",             photo: "/images/differentes-pages/merchandising.jpg" },
  { label: "Travel",      href: "#",                photo: "/images/differentes-pages/travel.jpg" },
  { label: "Partenaires", href: "/partenaires",     photo: "/images/differentes-pages/partenaires.jpg" },
];

// ── 1. VIDEO HERO ────────────────────────────────────────────────────
function VideoHero() {
  const [open, setOpen] = useState(false);

  const scrollToNext = () => {
    document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden", background: "#000" }}>
      {/* Vidéo autoplay — preload="auto" pour démarrer immédiatement */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      >
        <source src="/videos/video-intro.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)", zIndex: 1 }} />

      {/* Nav */}
      <div className="r-video-nav" style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 36px" }}>
        <Link href="/" style={{ display: "block", position: "relative", width: 140, height: 44, flexShrink: 0 }}>
          <Image src="/images/logo/first-team.png" alt="First Team" fill style={{ objectFit: "contain", objectPosition: "left" }} />
        </Link>
        <button onClick={() => setOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#fff" }} aria-label="Menu">
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ width: 28, height: 28 }}>
            <path d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </button>
      </div>

      {/* Bottom */}
      <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <h1 style={{ ...ANTON, fontSize: "clamp(15px, 2.1vw, 23px)", lineHeight: 1, letterSpacing: 6, textTransform: "uppercase", color: "rgba(255,255,255,0.88)", margin: 0 }}>
          FIRST TEAM
        </h1>
        <button onClick={scrollToNext} aria-label="Défiler"
          style={{ background: "none", border: "1.5px solid rgba(255,255,255,0.5)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", padding: 0, flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20, animation: "bounce 1.5s infinite" }}>
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </div>

      {/* Fullscreen menu */}
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "#0A0A0A", zIndex: 200, display: "flex", flexDirection: "column", padding: "28px 36px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 60 }}>
            <Link href="/" onClick={() => setOpen(false)} style={{ display: "block", position: "relative", width: 140, height: 44 }}>
              <Image src="/images/logo/first-team.png" alt="First Team" fill style={{ objectFit: "contain", objectPosition: "left", filter: "brightness(0) invert(1)" }} />
            </Link>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#fff" }} aria-label="Fermer">
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ width: 28, height: 28 }}>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)}
                style={{ ...ANTON, fontSize: "clamp(2.5rem, 8vw, 5rem)", color: "#fff", textDecoration: "none", letterSpacing: 2, lineHeight: 1.1, transition: "color 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FED000"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FE0000" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FED000" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#002EFE" }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}

// ── 2. HERO TYPO — photo fixe (1ère photo "à propos") ────────────────
function Hero() {
  return (
    <section id="hero-section" style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Photo fixe — pas de slider pour éviter tout glitch */}
      <img
        src="/images/à propos/team-ft.jpg"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />
      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.92) 100%)", zIndex: 1 }} />

      {/* Badges */}
      <div style={{ position: "absolute", top: 96, left: 36, display: "flex", gap: 8, zIndex: 2 }}>
        <span style={{ ...MANROPE(800), background: "#FED000", color: "#0A0A0A", fontSize: 10, padding: "4px 12px", borderRadius: 999, letterSpacing: 0.5, textTransform: "uppercase" as const }}>NBA · LNB · Europe</span>
        <span style={{ ...MANROPE(700), background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 10, padding: "4px 12px", borderRadius: 999, letterSpacing: 0.5, textTransform: "uppercase" as const, backdropFilter: "blur(6px)" }}>Since 2014</span>
      </div>

      {/* Main text at bottom */}
      <div style={{ position: "absolute", bottom: 72, left: 36, right: 36, zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 60, flexWrap: "wrap" as const }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ ...ANTON, fontSize: "clamp(52px, 8vw, 120px)", lineHeight: 0.9, textTransform: "uppercase" as const, color: "#fff", letterSpacing: "-1px", textShadow: "0 4px 40px rgba(0,0,0,0.4)", marginBottom: 36 }}>
              <span style={{ color: "#FE0000" }}>First Team</span> :<br />le média de<br />tous les <span style={{ color: "#FE0000" }}>baskets.</span>
            </h1>
            <div className="r-hero-cta-bar" style={{ display: "flex", gap: 14, flexWrap: "wrap" as const }}>
              <Link href="/contenus" className="pill-btn pill-btn-red">Voir nos contenus →</Link>
              <Link href="/partenaires" className="pill-btn pill-btn-outline-white">Devenir partenaire</Link>
            </div>
          </div>
          <div className="r-hide-mobile" style={{ flexShrink: 0, maxWidth: 220, paddingBottom: 4, borderLeft: "2px solid #FE0000", paddingLeft: 20 }}>
            <p style={{ ...MANROPE(700), fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.9)" }}>
              First Team est un média basket créé par des passionnés, pour des passionnés.
            </p>
            <p style={{ ...MANROPE(500), fontSize: 11, lineHeight: 1.6, color: "rgba(255,255,255,0.45)", marginTop: 8 }}>NBA · Basket français · Europe</p>
          </div>
        </div>
      </div>

      {/* Tricolor strip */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", height: 5, zIndex: 3 }}>
        <div style={{ flex: 1, background: "#FE0000" }} />
        <div style={{ flex: 1, background: "#FED000" }} />
        <div style={{ flex: 1, background: "#002EFE" }} />
        <div style={{ flex: 1, background: "#0A0A0A" }} />
      </div>
    </section>
  );
}

// ── 3. WEEKLY BANNER ──────────────────────────────────────────────────
function WeeklyBanner() {
  return (
    <section style={{ background: "#fff", padding: "22px 40px" }}>
      <p style={{ ...ANTON, fontSize: "clamp(14px, calc((100vw - 80px) / 43), 30px)", color: "#0A0A0A", margin: 0, textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, letterSpacing: "0.5px" }}>
        Des émissions sur l'actualité basket chaque semaine, tout au long de l'année
      </p>
    </section>
  );
}

// ── 3b. LOGO MARQUEE ──────────────────────────────────────────────────
function LogoMarquee() {
  const doubled = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
  return (
    <section style={{ background: "#fff", borderBottom: "1px solid #eee", overflow: "hidden" }}>
      <div style={{ display: "flex", height: 4 }}>
        <div style={{ flex: 1, background: "#FE0000" }} />
        <div style={{ flex: 1, background: "#FED000" }} />
        <div style={{ flex: 1, background: "#002EFE" }} />
      </div>
      <div style={{ padding: "44px 0" }}>
      <div className="marquee-wrap-design">
        <div className="marquee-track-design" style={{ display: "flex", alignItems: "center", gap: 128 }}>
          {doubled.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 128, flexShrink: 0 }}>
              <div style={{ position: "relative", height: 56, width: 160, flexShrink: 0 }}>
                <Image src={p.src} alt={p.name} fill className="object-contain" />
              </div>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FE0000", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

// ── 4. CATEGORY PANELS ────────────────────────────────────────────────
function CategoryPanels() {
  return (
    <section style={{ height: "80vh", minHeight: 500, display: "flex", background: "#0A0A0A" }}>
      {CATEGORIES.map((c, i) => (
        <Link key={i} href={c.href} className="format-panel">
          <div className="panel-bg">
            <Image src={c.photo} alt={c.label} fill
              sizes="(max-width: 768px) 50vw, 20vw"
              style={{ objectFit: "cover" }}
              priority={i === 0}
            />
          </div>
          <div className="panel-overlay" />
          <div className="panel-plus">+</div>
          <div className="panel-label">{c.label}</div>
          <div className="panel-content">
            <div className="panel-text">
              <div style={{ width: 28, height: 3, background: "#FE0000", marginBottom: 12 }} />
              <h3 style={{ ...ANTON, fontSize: 36, color: "#fff", textTransform: "uppercase" as const, letterSpacing: "0.5px", lineHeight: 0.95, marginBottom: 16 }}>{c.label}</h3>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, ...MANROPE(700), fontSize: 12, color: "#fff", border: "1px solid rgba(255,255,255,0.4)", padding: "8px 18px", borderRadius: 999 }}>Voir →</span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}

// ── 5. OFFENSE BANNER (redesign) ──────────────────────────────────────
function OffenseBanner() {
  const ref = useReveal();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [latestOffense, setLatestOffense] = useState<YTVideo | null>(null);
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestVideos(OFFENSE_CHANNEL_ID, 1)
      .then(videos => { if (videos.length > 0) setLatestOffense(videos[0]); })
      .catch(() => {});
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.getBoundingClientRect().left);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.getBoundingClientRect().left;
    sliderRef.current.scrollLeft = scrollLeft - (x - startX);
  };
  const onMouseUp = () => setIsDragging(false);
  const onTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.getBoundingClientRect().left);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.getBoundingClientRect().left;
    sliderRef.current.scrollLeft = scrollLeft - (x - startX);
  };

  const offenseThumb = latestOffense?.thumbnail || "/images/vignettes/edgar-yves.jpg";

  return (
    <section style={{ overflow: "hidden", position: "relative", minHeight: 720 }}>
      <img src="/images/offense/fond.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(219,82,36,0.80) 0%, rgba(219,82,36,0.80) 38%, rgba(219,82,36,0.55) 52%, rgba(219,82,36,0.14) 68%, rgba(219,82,36,0) 80%)", zIndex: 1 }} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: "#EDDBC5", zIndex: 2 }} />

      <div ref={ref} className="reveal" style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 40px 120px 20px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "start", position: "relative", zIndex: 2 }}>
        {/* Left */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24, background: "#EDDBC5", padding: "6px 16px", borderRadius: 2 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#DB5224" }} />
            <span style={{ ...MANROPE(800), fontSize: 11, color: "#DB5224", letterSpacing: 2, textTransform: "uppercase" as const }}>NOTRE DERNIER GROS PROJET</span>
          </div>
          <div style={{ marginBottom: 20, position: "relative", height: 104, width: 312 }}>
            <img src="/images/logo/offense.png" alt="Offense" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "left", filter: "brightness(0) invert(1)" }} />
          </div>
          <p style={{ ...AWESOME(700), fontSize: 22, marginBottom: 28, lineHeight: 1.4, fontStyle: "italic", color: "#EDDBC5" }}>
            Ce qu'on n'ose jamais demander sur le sport, Offense y répond !
          </p>
          <p style={{ ...MANROPE(400), fontSize: 15, lineHeight: 1.8, marginBottom: 36, maxWidth: 440, color: "rgba(255,255,255,0.85)" }}>
            Aux commandes, Tom Ciaravino avec des visages bien connus de First Team — Thomas, Erwan, Stephen Brun ou Mehdi Maizi — et des invités de prestige. Portraits, long formats, immersions : le basket comme tu ne l'as jamais vu. Un épisode tous les quinze jours, une conversation qui dure.
          </p>
          <a href="https://www.youtube.com/@offense" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, ...MANROPE(700), fontSize: 15, background: "#EDDBC5", color: "#DB5224", padding: "14px 28px", borderRadius: 999, textDecoration: "none", transition: "transform 0.15s ease" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
          >
            Découvrir Offense →
          </a>
        </div>

        {/* Right — vignette dynamique + slider drag */}
        <div className="r-hide-mobile" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Dernière vidéo Offense — dynamique */}
          <a
            href={latestOffense ? `https://www.youtube.com/watch?v=${latestOffense.id}` : "https://youtube.com/@offense"}
            target="_blank" rel="noopener noreferrer"
            onClick={latestOffense ? (e) => { e.preventDefault(); setModalVideoId(latestOffense.id); } : undefined}
            style={{ display: "block", position: "relative", borderRadius: 4, overflow: "hidden", textDecoration: "none", boxShadow: "0 0 14px 3px rgba(237,219,197,0.18), 0 0 28px 6px rgba(237,219,197,0.08)" }}
          >
            <img src={offenseThumb} alt={latestOffense?.title || "Offense — dernière vidéo"} style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "16/9" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.10)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.22)"}
            >
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#EDDBC5", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(237,219,197,0.25)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#DB5224"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </a>

          {/* Slider drag — photos backstage statiques */}
          <div style={{ position: "relative", borderRadius: 4, border: "1.5px solid rgba(237,219,197,0.25)", overflow: "hidden" }}>
            <div
              ref={sliderRef}
              style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none", cursor: isDragging ? "grabbing" : "grab", userSelect: "none" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onMouseUp}
            >
              {OFFENSE_PHOTOS.map((src, i) => (
                <div key={i} style={{ flexShrink: 0, width: "calc(30% - 4px)" }}>
                  <img src={src} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", pointerEvents: "none", userSelect: "none" }} draggable={false} />
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 40, background: "linear-gradient(to right, transparent, rgba(10,10,10,0.7))", pointerEvents: "none" }} />
          </div>
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        </div>
      </div>

      {modalVideoId && <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />}
    </section>
  );
}

// ── 6. INTERVIEW WEMBANYAMA — fond blanc + glow rouge ────────────────
function BuzzedVideo() {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);
  const [wembyVideos, setWembyVideos] = useState<(YTVideo | null)[]>([null, null, null, null]);
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);

  useEffect(() => {
    fetchVideosByIds(WEMBY_VIDEO_IDS)
      .then(setWembyVideos)
      .catch(() => {});
  }, []);

  const mainThumb = wembyVideos[0]?.thumbnail || "/images/vignettes/itw-wemby.png";

  return (
    <section style={{ padding: "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ maxWidth: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap" as const, gap: 16 }}>
            <div ref={ref} className="reveal">
              <p style={{ ...MANROPE(800), fontSize: 12, letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 10, color: "rgba(0,0,0,0.35)" }}>SI VOUS L'AVIEZ RATÉ</p>
              <h2 style={{ ...ANTON, fontSize: "clamp(32px, 4vw, 56px)", textTransform: "uppercase" as const, letterSpacing: "-0.5px", lineHeight: 1, color: "#FED000", marginBottom: 8 }}>
                <span style={{ color: "#0A0A0A" }}>INTERVIEW</span><br />Victor Wembanyama
              </h2>
              <p style={{ ...MANROPE(400), fontSize: 14, color: "rgba(0,0,0,0.5)", maxWidth: 480 }}>
                Retour sur la saison exceptionnelle du prodige des Spurs — technique, vision du jeu, objectifs NBA : une conversation sans langue de bois.
              </p>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ ...MANROPE(700), fontSize: 13, color: "rgba(0,0,0,0.35)" }}>1.2M vues · 48K likes</span>
              <a href={`https://www.youtube.com/watch?v=${WEMBY_VIDEO_IDS[0]}`} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-red" style={{ fontSize: 13, padding: "10px 20px" }}>Voir sur YouTube →</a>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, alignItems: "stretch" }}>
          {/* Grande vignette */}
          <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 0 36px 10px rgba(254,0,0,0.18), 0 0 72px 20px rgba(254,0,0,0.08)", position: "relative", aspectRatio: "16/9" }}>
            <a
              href={`https://www.youtube.com/watch?v=${WEMBY_VIDEO_IDS[0]}`}
              target="_blank" rel="noopener noreferrer"
              onClick={e => { e.preventDefault(); setModalVideoId(WEMBY_VIDEO_IDS[0]); }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{ position: "absolute", inset: 0, display: "block", cursor: "pointer", textDecoration: "none" }}
            >
              <img src={mainThumb} alt="Interview Wembanyama"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", objectPosition: "center top" }} />
              <div style={{ position: "absolute" as const, inset: 0, background: hovered ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.35)", transition: "background 0.2s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: hovered ? "#FE0000" : "rgba(254,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", transform: hovered ? "scale(1.1)" : "scale(1)", transition: "all 0.2s ease", boxShadow: hovered ? "0 0 0 16px rgba(254,0,0,0.15)" : "none" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </a>
          </div>

          {/* Colonne droite — 3 miniatures */}
          <div className="r-hide-mobile" style={{ display: "flex", flexDirection: "column" as const, gap: 8, alignItems: "flex-start" }}>
            {[0, 1, 2].map(i => {
              const videoId = WEMBY_VIDEO_IDS[i + 1];
              const thumb = wembyVideos[i + 1]?.thumbnail || BUZZED_VIGNETTES[i];
              return (
                <a key={i}
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank" rel="noopener noreferrer"
                  onClick={e => { e.preventDefault(); setModalVideoId(videoId); }}
                  style={{ display: "block", flex: "1 1 0", aspectRatio: "16/9", minHeight: 0, borderRadius: 6, overflow: "hidden", position: "relative" as const, textDecoration: "none" }}
                >
                  <img src={thumb} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                  />
                  <div style={{ position: "absolute" as const, inset: 0, background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.18)"}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FE0000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {modalVideoId && <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />}
    </section>
  );
}

// ── 7. NOS DERNIÈRES VIDÉOS ───────────────────────────────────────────
function RecentVideos() {
  const titleRef = useReveal();
  const [dynamicVideos, setDynamicVideos] = useState<YTVideo[] | null>(null);
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestLongVideos(FIRST_TEAM_CHANNEL_ID, 4)
      .then(setDynamicVideos)
      .catch(() => {});
  }, []);

  return (
    <section className="r-sec-xl" style={{ padding: "120px 40px", background: "#0A0A0A", borderTop: "1px solid #1a1a1a" }}>
      <div className="r-hub-inner" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={titleRef} className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap" as const, gap: 20 }}>
          <div>
            <p style={{ ...MANROPE(800), fontSize: 12, letterSpacing: 2, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 12 }}>NOS CONTENUS</p>
            <h2 style={{ ...ANTON, fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, textTransform: "uppercase" as const, letterSpacing: "-0.5px", color: "#fff" }}>Nos dernières<br />vidéos.</h2>
          </div>
          <Link href="/contenus" className="pill-btn pill-btn-outline-white">Tout voir →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28, marginBottom: 48 }}>
          {dynamicVideos
            ? dynamicVideos.map((v, i) => {
                const glow = VIDEO_COLORS[i % 4];
                return (
                  <a key={i}
                    href={`https://www.youtube.com/watch?v=${v.id}`}
                    target="_blank" rel="noopener noreferrer"
                    onClick={e => { e.preventDefault(); setModalVideoId(v.id); }}
                    style={{ textDecoration: "none", display: "block", background: "#111", borderRadius: 10, overflow: "hidden", boxShadow: `0 0 28px 6px ${glow}45, 0 0 56px 10px ${glow}18`, transition: "box-shadow 0.3s ease, transform 0.2s ease" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-5px)"; el.style.boxShadow = `0 0 40px 10px ${glow}65, 0 0 80px 18px ${glow}28`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = `0 0 28px 6px ${glow}45, 0 0 56px 10px ${glow}18`; }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                      <img src={v.thumbnail} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: glow, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "12px 16px 14px", background: "#111" }}>
                      <p style={{ ...MANROPE(700), fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.4, margin: 0 }}>{v.title}</p>
                    </div>
                  </a>
                );
              })
            : RECENT_VIDEOS.map((v, i) => {
                const glow = v.color;
                return (
                  <a key={i} href={v.href} target="_blank" rel="noopener noreferrer"
                    style={{ textDecoration: "none", display: "block", background: "#111", borderRadius: 10, overflow: "hidden", boxShadow: `0 0 28px 6px ${glow}45, 0 0 56px 10px ${glow}18`, transition: "box-shadow 0.3s ease, transform 0.2s ease" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-5px)"; el.style.boxShadow = `0 0 40px 10px ${glow}65, 0 0 80px 18px ${glow}28`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = `0 0 28px 6px ${glow}45, 0 0 56px 10px ${glow}18`; }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                      <img src={v.thumb} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#111" }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: glow, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
        </div>

        {/* Social strip */}
        <div style={{ marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap" as const }}>
          {[
            { label: "YouTube",   sub: "Plusieurs émissions basket chaque semaine", color: "#FE0000", href: "https://youtube.com/@firstteam",              icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
            { label: "Twitch",    sub: "La Libre Antenne NBA tous les lundis soirs", color: "#002EFE", href: "https://twitch.tv",                           icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg> },
            { label: "Instagram", sub: "Les news et du contenu tous les jours", color: "#0A0A0A", href: "https://www.instagram.com/firstteam101/",     icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
            { label: "TikTok",    sub: "Des extraits d'émissions et d'ITW tous les jours", color: "#FED000", href: "https://tiktok.com",                          icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ background: s.color, color: s.color === "#FED000" ? "#0A0A0A" : "#fff", display: "flex", flexDirection: "column" as const, alignItems: "flex-start", borderRadius: 12, padding: "18px 24px", flex: "1 1 180px", textDecoration: "none", transition: "transform 0.15s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ marginBottom: 8 }}>{s.icon}</div>
              <span style={{ ...ANTON, fontSize: 18, letterSpacing: 0.5, marginBottom: 4 }}>{s.label}</span>
              <span style={{ ...MANROPE(600), fontSize: 12, opacity: 0.8 }}>{s.sub}</span>
            </a>
          ))}
        </div>
      </div>
      {modalVideoId && <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />}
    </section>
  );
}

// ── 8. KPI BAND ───────────────────────────────────────────────────────
function KpiBand() {
  const refs = [useReveal(), useReveal(), useReveal(), useReveal()];
  return (
    <>
      <div style={{ display: "flex", height: 5 }}>
        <div style={{ flex: 1, background: "#FE0000" }} />
        <div style={{ flex: 1, background: "#FED000" }} />
        <div style={{ flex: 1, background: "#002EFE" }} />
      </div>
      <section className="r-sec-md" style={{ position: "relative", padding: "80px 40px", overflow: "hidden" }}>
        <img src="/images/basket/ball-closeup.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.93)", zIndex: 1 }} />
        <div className="r-grid-kpi" style={{ gap: 0, maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          {KPI_DATA.map((k, i) => (
            <div key={i} ref={refs[i]} className="reveal r-kpi-item" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none", padding: "20px 40px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
              <span style={{ ...ANTON, fontSize: "clamp(48px, 6vw, 88px)", color: "#fff", lineHeight: 1, letterSpacing: "-1px", display: "block" }}>{k.num}</span>
              <span style={{ ...MANROPE(500), fontSize: 13, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" as const, letterSpacing: 0.5, display: "block" }}>{k.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ── 9. 10 ANS DE PASSION ──────────────────────────────────────────────
function AboutSection() {
  const ref = useReveal();
  const [slide, setSlide] = useAutoSlide(ABOUT_SLIDES.length);
  return (
    <section className="r-sec-xl" style={{ padding: "120px 40px", background: "#fff" }}>
      <div className="r-grid-about" style={{ gap: 80, alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} className="reveal">
          <p style={{ ...MANROPE(800), fontSize: 12, letterSpacing: 2, textTransform: "uppercase" as const, color: "#FE0000", marginBottom: 20 }}>À PROPOS</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(36px, 4.5vw, 62px)", lineHeight: 0.92, textTransform: "uppercase" as const, letterSpacing: "-0.5px", marginBottom: 32 }}>
            10 ans de passion<br />et d'expertise.
          </h2>
          <p style={{ ...MANROPE(400), fontSize: 17, lineHeight: 1.75, color: "#333", maxWidth: 480, marginBottom: 24 }}>
            Fondé par d'anciens basketteurs — Erwan Abautret, Thomas Dufant, Stephen Brun — First Team est le premier média basket 100% numérique en France. On décrypte, on débat, on kiffe.
          </p>
          <p style={{ ...MANROPE(700), fontSize: 16, color: "#0A0A0A", marginBottom: 36, fontStyle: "italic" }}>
            "On parle basket comme entre potes, parce qu'on vient du terrain."
          </p>
          <Link href="/qui-nous-sommes" className="pill-btn pill-btn-black">Qui sommes-nous →</Link>
        </div>
        <div className="r-hide-mobile" style={{ position: "relative" as const }}>
          <div style={{ position: "absolute" as const, top: -20, right: -20, width: "100%", height: "100%", background: "#FED000", borderRadius: 4, zIndex: 0 }} />
          <div style={{ position: "relative" as const, zIndex: 1, borderRadius: 4, overflow: "hidden", aspectRatio: "4/3" }}>
            {ABOUT_SLIDES.map((src, i) => (
              <img key={i} src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === slide ? 1 : 0, transition: "opacity 0.8s ease" }} />
            ))}
            <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6, zIndex: 5 }}>
              {ABOUT_SLIDES.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 20 : 7, height: 7, borderRadius: 999, background: i === slide ? "#FE0000" : "rgba(255,255,255,0.7)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 10. LE ROSTER ─────────────────────────────────────────────────────
function TeamSection() {
  const titleRef = useReveal();
  return (
    <section className="r-sec-xl" style={{ padding: "120px 40px", position: "relative", overflow: "hidden" }}>
      <img src="/images/basket/player-run.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.88)", zIndex: 1 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div ref={titleRef} className="reveal" style={{ marginBottom: 64 }}>
          <p style={{ ...MANROPE(800), fontSize: 12, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>L'ÉQUIPE</p>
          <h2 style={{ ...ANTON, fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.92, textTransform: "uppercase" as const, letterSpacing: "-0.5px", color: "#fff" }}>
            Le <span style={{ color: "#FED000" }}>roster.</span>
          </h2>
        </div>
        <div className="r-grid-team" style={{ gap: 20 }}>
          {TEAM.map((m, i) => <TeamCard key={i} member={m} />)}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: typeof TEAM[0] }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ background: "#161616", borderRadius: 4, overflow: "hidden", transition: "transform 0.2s ease", cursor: "pointer" }}
      onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ height: 6, background: member.color }} />
      <div style={{ height: 280, overflow: "hidden" }}>
        <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
      </div>
      <div style={{ padding: "24px 28px" }}>
        <span style={{ ...ANTON, fontSize: 13, color: member.color, letterSpacing: 1 }}>{member.num}</span>
        <h3 style={{ ...ANTON, fontSize: 26, letterSpacing: "0.5px", textTransform: "uppercase" as const, color: "#fff", marginTop: 4, marginBottom: 6 }}>{member.name}</h3>
        <p style={{ ...MANROPE(600), fontSize: 13, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>{member.role}</p>
      </div>
    </div>
  );
}

// ── 11. SPONSORS ──────────────────────────────────────────────────────
function SponsorsSection() {
  const ref = useReveal();
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className="r-sec-lg" style={{ padding: "100px 40px", background: "#002EFE" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ marginBottom: 56 }}>
          <p style={{ ...MANROPE(800), fontSize: 12, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>PARTENAIRES & SPONSORS</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 24 }}>
            <h2 style={{ ...ANTON, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 0.92, textTransform: "uppercase" as const, letterSpacing: "-0.5px", color: "#fff" }}>
              Ils nous font<br />confiance.
            </h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
              <Link href="/partenaires" className="pill-btn pill-btn-yellow">Voir nos sponsors →</Link>
              <a href="https://influxcrew.com/" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-white">Découvrir Influx →</a>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {BIG_SPONSORS.map((sp, i) => (
            <Link key={i} href="/partenaires"
              style={{ textDecoration: "none", display: "block", background: "#fff", borderRadius: 12, overflow: "hidden", transition: "transform 0.22s ease, box-shadow 0.22s ease", transform: hovered === i ? "translateY(-6px)" : "translateY(0)", boxShadow: hovered === i ? "0 16px 40px rgba(0,0,0,0.22)" : "none" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "52px 40px" }}>
                <div style={{ position: "relative", width: "100%", height: 72 }}>
                  <Image src={sp.src} alt={sp.name} fill style={{ objectFit: "contain" }} />
                </div>
              </div>
              <div style={{ padding: "0 32px 28px", overflow: "hidden", maxHeight: hovered === i ? 80 : 0, opacity: hovered === i ? 1 : 0, transition: "max-height 0.3s ease, opacity 0.3s ease" }}>
                <p style={{ ...MANROPE(600), fontSize: 13, color: "#333", lineHeight: 1.5, margin: 0 }}>{sp.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 12. MAISON FIRST TEAM & TRAVELS ───────────────────────────────────
function MerchSection() {
  return (
    <section className="r-sec-xl" style={{ padding: "120px 40px", background: "#0A0A0A" }}>
      <div className="r-grid-merch" style={{ maxWidth: 1200, margin: "0 auto", gap: 40 }}>
        <Link href="/shop" style={{ display: "block", background: "#0A0A0A", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none", transition: "transform 0.2s ease, border-color 0.2s ease" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.borderColor = "rgba(254,208,0,0.4)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.borderColor = "rgba(255,255,255,0.1)"; }}
        >
          <img src="/images/differentes-pages/merchandising.png" alt="Maison First Team" style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "center top", display: "block" }} />
          <div style={{ padding: "32px 36px 36px" }}>
            <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, color: "#FED000", display: "block", marginBottom: 12 }}>BOUTIQUE</span>
            <h3 style={{ ...ANTON, fontSize: 36, textTransform: "uppercase" as const, color: "#fff", marginBottom: 16, lineHeight: 0.95 }}>Maison<br />First Team.</h3>
            <p style={{ ...MANROPE(400), fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 24, lineHeight: 1.6 }}>T-shirts, hoodies, casquettes — pour porter les couleurs de la culture basket française.</p>
            <span className="pill-btn pill-btn-yellow">Découvrir la boutique →</span>
          </div>
        </Link>
        <div style={{ background: "#0A0A0A", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
          <img src="/images/homepage/new-york.jpg" alt="First Team Travels — New York" style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "center center", display: "block" }} />
          <div style={{ padding: "32px 36px 36px" }}>
            <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, color: "#FE0000", display: "block", marginBottom: 12 }}>VOYAGES</span>
            <h3 style={{ ...ANTON, fontSize: 36, textTransform: "uppercase" as const, color: "#fff", marginBottom: 16, lineHeight: 0.95 }}>First Team<br />Travels.</h3>
            <p style={{ ...MANROPE(400), fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 24, lineHeight: 1.6 }}>Las Vegas, Paris, Madrid — les meilleurs matchs, avec la communauté First Team à tes côtés.</p>
            <span className="pill-btn pill-btn-red" style={{ cursor: "not-allowed", opacity: 0.6 }}>Bientôt disponible</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main>
      <VideoHero />
      <Hero />
      <WeeklyBanner />
      <CategoryPanels />
      <OffenseBanner />
      <BuzzedVideo />
      <RecentVideos />
      <KpiBand />
      <AboutSection />
      <LogoMarquee />
      <TeamSection />
      <SponsorsSection />
      <MerchSection />
    </main>
  );
}
