import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────
const VIDEOS = [
  { id: 1, title: "LA GRANDE PREVIEW NBA 2025-26", category: "Libre Antenne", duration: "1:44:34", date: "12 Avr 2026", views: "124K", thumb: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=225&fit=crop" },
  { id: 2, title: "UNE BONNE SAISON POUR LES SPURS ?", category: "First Day Show", duration: "1:21:11", date: "10 Avr 2026", views: "89K", thumb: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&h=225&fit=crop" },
  { id: 3, title: "R.C. BUFORD — L'ENTRETIEN EXCLUSIF", category: "Entretiens", duration: "19:00", date: "8 Avr 2026", views: "201K", thumb: "https://images.unsplash.com/photo-1504450758481-7338bbe75c8e?w=400&h=225&fit=crop" },
  { id: 4, title: "LE BRAQUAGE DE TYRESE HALIBURTON", category: "NBA Classic Games", duration: "37:10", date: "5 Avr 2026", views: "156K", thumb: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=400&h=225&fit=crop" },
  { id: 5, title: "WEMBY EST-IL DÉJÀ TOP 5 NBA ?", category: "Libre Antenne", duration: "1:02:45", date: "3 Avr 2026", views: "312K", thumb: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=225&fit=crop" },
  { id: 6, title: "DRAFT 2026 : NOS PROJECTIONS", category: "First Day Show", duration: "58:22", date: "1 Avr 2026", views: "98K", thumb: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=400&h=225&fit=crop" },
  { id: 7, title: "LEBRON JAMES — RETOUR SUR UNE CARRIÈRE", category: "NBA Classic Games", duration: "45:30", date: "28 Mar 2026", views: "445K", thumb: "https://images.unsplash.com/photo-1511886929837-354d827aafe2?w=400&h=225&fit=crop" },
  { id: 8, title: "ENTRETIEN AVEC EVAN FOURNIER", category: "Entretiens", duration: "32:15", date: "25 Mar 2026", views: "178K", thumb: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=225&fit=crop" },
];

const CATEGORIES = ["Tous", "Libre Antenne", "First Day Show", "Entretiens", "NBA Classic Games"];

const MERCH = [
  { id: 1, name: "Hoodie FIRST TEAM Classic", price: 59.99, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop", tag: "BEST SELLER" },
  { id: 2, name: "T-shirt FIRST TEAM Logo", price: 34.99, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", tag: "NEW" },
  { id: 3, name: "Casquette FT Snapback", price: 29.99, img: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&h=400&fit=crop", tag: null },
  { id: 4, name: "Mug OFFENSE Edition", price: 14.99, img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop", tag: "OFFENSE" },
  { id: 5, name: "Short Basket FT", price: 39.99, img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop", tag: null },
  { id: 6, name: "Sweat OFFENSE Premium", price: 69.99, img: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=400&h=400&fit=crop", tag: "OFFENSE" },
];

const QUIZ_QUESTIONS = [
  { q: "Qui détient le record de points en un match NBA ?", options: ["Kobe Bryant", "Wilt Chamberlain", "Michael Jordan", "LeBron James"], answer: 1 },
  { q: "Combien de titres NBA ont les Boston Celtics ?", options: ["15", "17", "18", "20"], answer: 2 },
  { q: "Quel joueur est surnommé 'The Greek Freak' ?", options: ["Luka Dončić", "Giannis Antetokounmpo", "Nikola Jokić", "Joel Embiid"], answer: 1 },
  { q: "En quelle année Michael Jordan a-t-il pris sa première retraite ?", options: ["1991", "1993", "1995", "1998"], answer: 1 },
  { q: "Quel joueur français a été drafté en 1er en 2023 ?", options: ["Bilal Coulibaly", "Victor Wembanyama", "Ousmane Dieng", "Killian Hayes"], answer: 1 },
  { q: "Quelle équipe a remporté le plus de titres NBA consécutifs ?", options: ["Chicago Bulls", "Los Angeles Lakers", "Boston Celtics", "Golden State Warriors"], answer: 2 },
  { q: "Qui est le meilleur passeur de l'histoire NBA ?", options: ["Magic Johnson", "John Stockton", "Chris Paul", "Steve Nash"], answer: 1 },
  { q: "En quelle année la NBA a-t-elle été fondée ?", options: ["1936", "1946", "1956", "1966"], answer: 1 },
];

const OFFENSE_EPISODES = [
  { id: 1, title: "LE FOOT FRANÇAIS EST-IL EN CRISE ?", guest: "Jérémy Nadeau", date: "11 Avr 2026", duration: "48:23", desc: "Débat houleux sur l'état du football français avec un invité de marque." },
  { id: 2, title: "WEMBY VA-T-IL DOMINER LA DÉCENNIE ?", guest: "Marc Music", date: "8 Avr 2026", duration: "52:10", desc: "L'ascension fulgurante de Victor Wembanyama passée au crible." },
  { id: 3, title: "LE PSG MÉRITE-T-IL AUTANT DE HAINE ?", guest: "Tonio Life", date: "4 Avr 2026", duration: "41:35", desc: "Un sujet qui divise : le PSG et son image en France." },
  { id: 4, title: "LA LIGUE 1 EST-ELLE VRAIMENT NULLE ?", guest: "Wiloo", date: "1 Avr 2026", duration: "55:02", desc: "Comparaison sans filtre entre la Ligue 1 et les grands championnats européens." },
];

const TRAVELS = [
  { id: 1, title: "NEW YORK — NBA Experience", sport: "Basket", dates: "15-22 Nov 2026", price: "2 490€", spots: 8, total: 20, status: "available", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=500&h=300&fit=crop", desc: "Madison Square Garden, Brooklyn Nets, visite NYC basket." },
  { id: 2, title: "LOS ANGELES — Lakers & Clippers", sport: "Basket", dates: "2-9 Déc 2026", price: "2 890€", spots: 5, total: 20, status: "available", img: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=500&h=300&fit=crop", desc: "Crypto.com Arena, Venice Beach, culture basket LA." },
  { id: 3, title: "SUPER BOWL LXI — San Francisco", sport: "Foot US", dates: "5-12 Fév 2027", price: "4 990€", spots: 3, total: 15, status: "available", img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=500&h=300&fit=crop", desc: "L'événement sportif ultime, all-inclusive premium." },
  { id: 4, title: "CHICAGO — Bulls Heritage Tour", sport: "Basket", dates: "Oct 2025", price: "—", spots: 0, total: 20, status: "past", img: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=500&h=300&fit=crop", desc: "Sur les traces de MJ, United Center, Chicago culture." },
  { id: 5, title: "BOSTON — MLB & NBA Combo", sport: "Baseball", dates: "Avr 2025", price: "—", spots: 0, total: 16, status: "past", img: "https://images.unsplash.com/photo-1570297065762-30d27a9e1ca0?w=500&h=300&fit=crop", desc: "Fenway Park + TD Garden, le combo sportif ultime." },
];

const PARTNERS = ["WINAMAX", "NordVPN", "Saily", "TRADE REPUBLIC", "influx", "HOLY"];

// ─── ICONS ──────────────────────────────────────────────────────────────
const YT = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const IG = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>;
const TW = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Twitch = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>;
const TikTok = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
const Play = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M8 5v14l11-7z"/></svg>;
const Search = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const Menu = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M3 12h18M3 6h18M3 18h18"/></svg>;
const X = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M18 6 6 18M6 6l12 12"/></svg>;
const Plane = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>;
const Check = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>;
const Arrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>;

// ─── STYLES ─────────────────────────────────────────────────────────────
const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

:root {
  --ft-black: #0a0a0a;
  --ft-dark: #111111;
  --ft-card: #1a1a1a;
  --ft-border: #2a2a2a;
  --ft-yellow: #FFD130;
  --ft-yellow-hover: #FFE066;
  --ft-white: #FFFFFF;
  --ft-gray: #888888;
  --ft-light-gray: #CCCCCC;
  --ft-orange: #D4731A;
  --ft-brown: #8B5E3C;
  --ft-cream: #F5E6D3;
  --font-display: 'Oswald', sans-serif;
  --font-body: 'Barlow', sans-serif;
  --font-offense: 'Playfair Display', serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { background: var(--ft-black); color: var(--ft-white); font-family: var(--font-body); }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-up { animation: fadeInUp 0.6s ease forwards; }
.animate-fade { animation: fadeIn 0.5s ease forwards; }
.animate-slide { animation: slideIn 0.5s ease forwards; }
.animate-scale { animation: scaleIn 0.4s ease forwards; }

.delay-1 { animation-delay: 0.1s; opacity: 0; }
.delay-2 { animation-delay: 0.2s; opacity: 0; }
.delay-3 { animation-delay: 0.3s; opacity: 0; }
.delay-4 { animation-delay: 0.4s; opacity: 0; }
.delay-5 { animation-delay: 0.5s; opacity: 0; }

.gold-line {
  height: 2px;
  background: linear-gradient(90deg, var(--ft-yellow), transparent);
}

.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(255, 209, 48, 0.1);
}

.btn-primary {
  background: var(--ft-yellow);
  color: var(--ft-black);
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 12px 28px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-primary:hover {
  background: var(--ft-yellow-hover);
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: var(--ft-white);
  font-family: var(--font-display);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 12px 28px;
  border: 2px solid var(--ft-white);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-outline:hover {
  background: var(--ft-white);
  color: var(--ft-black);
}

.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--ft-yellow);
  margin-bottom: 8px;
}

.heading-xl {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(32px, 5vw, 56px);
  text-transform: uppercase;
  line-height: 1.05;
  letter-spacing: -1px;
}

.heading-lg {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(24px, 3vw, 40px);
  text-transform: uppercase;
  line-height: 1.1;
}

.heading-md {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(18px, 2vw, 28px);
  text-transform: uppercase;
  line-height: 1.15;
}

.offense-page {
  --bg: #1a120a;
  --card-bg: #2a1d12;
  --accent: #D4731A;
  --accent-hover: #E8862D;
  --text: #F5E6D3;
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--ft-dark); }
::-webkit-scrollbar-thumb { background: var(--ft-border); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--ft-yellow); }
`;

// ─── HEADER COMPONENT ──────────────────────────────────────────────────
function Header({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const nav = [
    { key: "home", label: "FIRST TEAM" },
    { key: "contenus", label: "CONTENUS" },
    { key: "merch", label: "MERCH" },
    { key: "quiz", label: "QUIZ" },
    { key: "offense", label: "OFFENSE" },
    { key: "travels", label: "TRAVELS" },
    { key: "about", label: "À PROPOS" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--ft-border)" : "1px solid transparent",
      transition: "all 0.3s ease"
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <div onClick={() => { setPage("home"); window.scrollTo(0,0); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 40, height: 40, background: "var(--ft-yellow)", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ft-black)"
          }}>FT</div>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {nav.map(n => (
            <button key={n.key} onClick={() => { setPage(n.key); setMenuOpen(false); window.scrollTo(0,0); }}
              style={{
                background: "none", border: "none", color: page === n.key ? "var(--ft-yellow)" : "var(--ft-white)",
                fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, letterSpacing: 1.5,
                textTransform: "uppercase", cursor: "pointer", padding: "8px 14px",
                transition: "color 0.2s", position: "relative"
              }}>
              {n.label}
              {page === n.key && <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: "var(--ft-yellow)" }} />}
            </button>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn"
          style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "none" }}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: 64, left: 0, right: 0, background: "rgba(10,10,10,0.98)",
          backdropFilter: "blur(20px)", borderBottom: "1px solid var(--ft-border)", padding: "16px 0"
        }} className="animate-fade">
          {nav.map(n => (
            <button key={n.key} onClick={() => { setPage(n.key); setMenuOpen(false); window.scrollTo(0,0); }}
              style={{
                display: "block", width: "100%", background: "none", border: "none",
                color: page === n.key ? "var(--ft-yellow)" : "var(--ft-white)",
                fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600,
                letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer",
                padding: "14px 32px", textAlign: "left"
              }}>
              {n.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}

// ─── FOOTER COMPONENT ──────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: "var(--ft-dark)", borderTop: "1px solid var(--ft-border)", padding: "60px 24px 30px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: "var(--ft-yellow)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--ft-black)" }}>FT</div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>FIRST TEAM</span>
            </div>
            <p style={{ color: "var(--ft-gray)", fontSize: 14, lineHeight: 1.6 }}>Le média basket français.<br/>Débats, entretiens, émissions.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: 1, marginBottom: 16, color: "var(--ft-yellow)" }}>NAVIGATION</h4>
            {["home","contenus","merch","quiz","offense","travels","about"].map(k => (
              <button key={k} onClick={() => { setPage(k); window.scrollTo(0,0); }}
                style={{ display: "block", background: "none", border: "none", color: "var(--ft-gray)", fontSize: 14, cursor: "pointer", padding: "4px 0", fontFamily: "var(--font-body)", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--ft-white)"}
                onMouseLeave={e => e.target.style.color = "var(--ft-gray)"}>
                {k === "home" ? "Accueil" : k === "about" ? "À propos" : k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: 1, marginBottom: 16, color: "var(--ft-yellow)" }}>RÉSEAUX</h4>
            <div style={{ display: "flex", gap: 12 }}>
              {[YT, IG, TW, TikTok, Twitch].map((Icon, i) => (
                <div key={i} style={{ width: 40, height: 40, borderRadius: 8, background: "var(--ft-card)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s", color: "var(--ft-gray)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--ft-yellow)"; e.currentTarget.style.color = "var(--ft-black)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--ft-card)"; e.currentTarget.style.color = "var(--ft-gray)"; }}>
                  <Icon />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: 1, marginBottom: 16, color: "var(--ft-yellow)" }}>PARTENAIRES</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PARTNERS.map(p => (
                <span key={p} style={{ fontSize: 11, color: "var(--ft-gray)", background: "var(--ft-card)", padding: "4px 10px", borderRadius: 4, fontWeight: 500 }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="gold-line" style={{ marginBottom: 20 }} />
        <p style={{ textAlign: "center", color: "var(--ft-gray)", fontSize: 12 }}>© 2026 First Team — Tous droits réservés</p>
      </div>
    </footer>
  );
}

// ─── VIDEO CARD ─────────────────────────────────────────────────────────
function VideoCard({ video, style = {} }) {
  return (
    <div className="card-hover" style={{
      background: "var(--ft-card)", borderRadius: 12, overflow: "hidden",
      border: "1px solid var(--ft-border)", cursor: "pointer", ...style
    }}>
      <div style={{ position: "relative", paddingBottom: "56.25%", background: "#222" }}>
        <img src={video.thumb} alt={video.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.8)", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600 }}>{video.duration}</div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0)", transition: "background 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.4)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0)"}>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "var(--ft-yellow)", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "var(--font-display)" }}>{video.category}</span>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginTop: 6, lineHeight: 1.25, textTransform: "uppercase" }}>{video.title}</h3>
        <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 12, color: "var(--ft-gray)" }}>
          <span>{video.date}</span>
          <span>{video.views} vues</span>
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const shows = [
    { name: "LIBRE ANTENNE", day: "Chaque Lundi", desc: "Le talk-show basket du lundi soir. Actu NBA, débats, réactions live.", color: "var(--ft-yellow)" },
    { name: "FIRST DAY SHOW", day: "Chaque Jeudi", desc: "Le best-of de la semaine NBA. Classements, highlights, analyses.", color: "#4A9EFF" },
    { name: "NBA CLASSIC GAMES", day: "2× par mois", desc: "Retour sur les matchs mythiques qui ont marqué l'histoire NBA.", color: "#FF4A6E" },
    { name: "ENTRETIENS", day: "Régulier", desc: "Face-à-face exclusifs avec les acteurs du basket français et NBA.", color: "#4AFF8B" },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center",
        background: "linear-gradient(135deg, var(--ft-black) 0%, #1a1400 50%, var(--ft-black) 100%)"
      }}>
        {/* Background Pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "repeating-linear-gradient(45deg, var(--ft-yellow) 0, var(--ft-yellow) 1px, transparent 1px, transparent 40px)",
        }} />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(255,209,48,0.08) 0%, transparent 60%)" }} />

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 24px 80px", width: "100%", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
            <div>
              <div className="section-title animate-fade-up">LE MÉDIA BASKET FRANÇAIS</div>
              <h1 className="heading-xl animate-fade-up delay-1" style={{ marginBottom: 20 }}>
                FIRST TEAM<br />
                <span style={{ color: "var(--ft-yellow)" }}>LE MÉDIA DE TOUS<br />LES BASKETS</span>
              </h1>
              <p className="animate-fade-up delay-2" style={{ fontSize: 17, color: "var(--ft-light-gray)", lineHeight: 1.7, maxWidth: 480, marginBottom: 32 }}>
                Débats, entretiens exclusifs, analyses NBA et bien plus. Rejoins la communauté basket la plus passionnée de France.
              </p>
              <div className="animate-fade-up delay-3" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => { setPage("contenus"); window.scrollTo(0,0); }}>
                  <Play /> Voir nos vidéos
                </button>
                <button className="btn-outline" onClick={() => { setPage("offense"); window.scrollTo(0,0); }}>
                  Découvrir Offense
                </button>
              </div>
              <div className="animate-fade-up delay-4" style={{ display: "flex", gap: 20, marginTop: 40 }}>
                {[
                  { n: "500K+", l: "Abonnés YouTube" },
                  { n: "200+", l: "Épisodes" },
                  { n: "50M+", l: "Vues totales" },
                ].map(s => (
                  <div key={s.l}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--ft-yellow)" }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: "var(--ft-gray)", marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-scale delay-2" style={{ position: "relative" }}>
              <div style={{
                borderRadius: 20, overflow: "hidden", aspectRatio: "4/3",
                boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,209,48,0.1)"
              }}>
                <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=700&h=525&fit=crop" alt="First Team Studio"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* Floating badge */}
              <div style={{
                position: "absolute", bottom: -16, left: -16, background: "var(--ft-yellow)", color: "var(--ft-black)",
                padding: "12px 20px", borderRadius: 12, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14,
                boxShadow: "0 8px 30px rgba(255,209,48,0.3)"
              }}>
                🏀 LIVE CHAQUE SEMAINE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOLD LINE SEPARATOR */}
      <div className="gold-line" />

      {/* LATEST VIDEOS */}
      <section style={{ padding: "80px 24px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <div>
            <div className="section-title">DERNIÈRES SORTIES</div>
            <h2 className="heading-lg">NOS VIDÉOS</h2>
          </div>
          <button className="btn-primary" onClick={() => { setPage("contenus"); window.scrollTo(0,0); }} style={{ fontSize: 12, padding: "10px 20px" }}>
            Tout voir <Arrow />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {VIDEOS.slice(0, 4).map((v, i) => (
            <div key={v.id} className={`animate-fade-up delay-${i + 1}`}>
              <VideoCard video={v} />
            </div>
          ))}
        </div>
      </section>

      {/* SHOWS */}
      <section style={{ padding: "80px 24px", background: "var(--ft-dark)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="section-title" style={{ textAlign: "center" }}>NOS RENDEZ-VOUS</div>
          <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 48 }}>ÉMISSIONS RÉCURRENTES</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
            {shows.map((s, i) => (
              <div key={s.name} className="card-hover" style={{
                background: "var(--ft-card)", border: "1px solid var(--ft-border)", borderRadius: 16,
                padding: 28, position: "relative", overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color }} />
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: s.color, fontWeight: 600, marginBottom: 12, fontFamily: "var(--font-display)", letterSpacing: 1 }}>{s.day}</div>
                <p style={{ fontSize: 14, color: "var(--ft-gray)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFENSE CTA */}
      <section style={{
        padding: "100px 24px", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #1a120a 0%, #2a1d12 50%, #1a120a 100%)"
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "repeating-linear-gradient(-45deg, #D4731A 0, #D4731A 1px, transparent 1px, transparent 60px)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ fontFamily: "var(--font-offense)", fontSize: 14, letterSpacing: 3, color: "#D4731A", marginBottom: 16, textTransform: "uppercase" }}>Le show qui divise</div>
          <h2 style={{ fontFamily: "var(--font-offense)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 72px)", color: "#F5E6D3", marginBottom: 20, lineHeight: 1 }}>Offense</h2>
          <p style={{ fontSize: 17, color: "#BFA88A", lineHeight: 1.7, marginBottom: 32 }}>
            Le rendez-vous bimensuel des grands débats sportifs. Pas que du basket. Du sport, des opinions, de la friction.
          </p>
          <button onClick={() => { setPage("offense"); window.scrollTo(0,0); }}
            style={{ background: "#D4731A", color: "#F5E6D3", fontFamily: "var(--font-offense)", fontWeight: 700, fontSize: 16, padding: "14px 36px", border: "none", cursor: "pointer", letterSpacing: 1, transition: "all 0.3s" }}
            onMouseEnter={e => e.target.style.background = "#E8862D"}
            onMouseLeave={e => e.target.style.background = "#D4731A"}>
            Découvrir Offense →
          </button>
        </div>
      </section>

      {/* PARTNERS */}
      <section style={{ padding: "60px 24px", background: "var(--ft-black)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="section-title" style={{ textAlign: "center" }}>ILS NOUS FONT CONFIANCE</div>
          <h2 className="heading-md" style={{ textAlign: "center", marginBottom: 40 }}>NOS PARTENAIRES</h2>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 32 }}>
            {PARTNERS.map(p => (
              <div key={p} style={{
                background: "var(--ft-card)", border: "1px solid var(--ft-border)", borderRadius: 12,
                padding: "20px 32px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16,
                color: "var(--ft-light-gray)", transition: "all 0.3s", cursor: "default"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--ft-yellow)"; e.currentTarget.style.color = "var(--ft-yellow)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--ft-border)"; e.currentTarget.style.color = "var(--ft-light-gray)"; }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section style={{ padding: "60px 24px", background: "var(--ft-dark)", borderTop: "1px solid var(--ft-border)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div className="section-title">REJOINS-NOUS</div>
          <h2 className="heading-md" style={{ marginBottom: 24 }}>SUR TOUS LES RÉSEAUX</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            {[
              { Icon: YT, label: "YouTube", color: "#FF0000" },
              { Icon: IG, label: "Instagram", color: "#E1306C" },
              { Icon: TW, label: "X / Twitter", color: "#FFF" },
              { Icon: TikTok, label: "TikTok", color: "#FFF" },
              { Icon: Twitch, label: "Twitch", color: "#9146FF" },
            ].map(s => (
              <div key={s.label} style={{
                width: 52, height: 52, borderRadius: 12, background: "var(--ft-card)",
                border: "1px solid var(--ft-border)", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--ft-gray)", transition: "all 0.3s"
              }}
                onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--ft-gray)"; e.currentTarget.style.borderColor = "var(--ft-border)"; }}>
                <s.Icon />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTENUS PAGE ──────────────────────────────────────────────────────
function ContenusPage() {
  const [cat, setCat] = useState("Tous");
  const [search, setSearch] = useState("");

  const filtered = VIDEOS.filter(v => {
    const matchCat = cat === "Tous" || v.category === cat;
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ padding: "60px 24px 40px", background: "var(--ft-dark)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="section-title animate-fade-up">TOUTES NOS VIDÉOS</div>
          <h1 className="heading-xl animate-fade-up delay-1">CONTENUS</h1>
        </div>
      </section>
      <div className="gold-line" />

      {/* Filters */}
      <section style={{ padding: "32px 24px", background: "var(--ft-dark)", borderBottom: "1px solid var(--ft-border)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: "1 1 300px", maxWidth: 400 }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ft-gray)" }}><Search /></div>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher une vidéo..."
                style={{
                  width: "100%", padding: "12px 16px 12px 44px", background: "var(--ft-card)",
                  border: "1px solid var(--ft-border)", borderRadius: 10, color: "var(--ft-white)",
                  fontFamily: "var(--font-body)", fontSize: 14, outline: "none"
                }} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  style={{
                    padding: "8px 18px", borderRadius: 8, border: "1px solid",
                    borderColor: cat === c ? "var(--ft-yellow)" : "var(--ft-border)",
                    background: cat === c ? "var(--ft-yellow)" : "transparent",
                    color: cat === c ? "var(--ft-black)" : "var(--ft-gray)",
                    fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600,
                    letterSpacing: 1, cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase"
                  }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "40px 24px 80px", maxWidth: 1400, margin: "0 auto" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "var(--ft-gray)" }}>
            <p style={{ fontSize: 18 }}>Aucune vidéo trouvée</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {filtered.map((v, i) => (
              <div key={v.id} className={`animate-fade-up delay-${(i % 4) + 1}`}>
                <VideoCard video={v} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ─── MERCH PAGE ─────────────────────────────────────────────────────────
function MerchPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{
        padding: "60px 24px 40px",
        background: "linear-gradient(180deg, var(--ft-dark) 0%, var(--ft-black) 100%)"
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="section-title animate-fade-up">REPRÉSENTE LA TEAM</div>
          <h1 className="heading-xl animate-fade-up delay-1">BOUTIQUE</h1>
          <p className="animate-fade-up delay-2" style={{ color: "var(--ft-gray)", fontSize: 16, marginTop: 12, maxWidth: 500 }}>
            Hoodies, t-shirts, casquettes... Le style First Team, de la rue au parquet.
          </p>
        </div>
      </section>
      <div className="gold-line" />

      <section style={{ padding: "48px 24px 80px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
          {MERCH.map((item, i) => (
            <div key={item.id} className={`card-hover animate-fade-up delay-${(i % 4) + 1}`}
              onClick={() => setSelected(item)}
              style={{
                background: "var(--ft-card)", borderRadius: 16, overflow: "hidden",
                border: "1px solid var(--ft-border)", cursor: "pointer"
              }}>
              <div style={{ position: "relative", aspectRatio: "1/1", background: "#1e1e1e" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {item.tag && (
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    background: item.tag === "OFFENSE" ? "#D4731A" : "var(--ft-yellow)",
                    color: "var(--ft-black)", padding: "4px 12px", borderRadius: 6,
                    fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, letterSpacing: 1
                  }}>{item.tag}</div>
                )}
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, textTransform: "uppercase", marginBottom: 8 }}>{item.name}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--ft-yellow)" }}>{item.price}€</span>
                  <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 12 }}>ACHETER</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24
        }}>
          <div onClick={e => e.stopPropagation()} className="animate-scale" style={{
            background: "var(--ft-dark)", borderRadius: 20, maxWidth: 600, width: "100%",
            border: "1px solid var(--ft-border)", overflow: "hidden"
          }}>
            <div style={{ aspectRatio: "1/0.8", overflow: "hidden" }}>
              <img src={selected.img} alt={selected.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: 32 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, textTransform: "uppercase", marginBottom: 8 }}>{selected.name}</h2>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--ft-yellow)", marginBottom: 20 }}>{selected.price}€</div>
              <p style={{ color: "var(--ft-gray)", lineHeight: 1.6, marginBottom: 24 }}>Article exclusif First Team. Qualité premium, coupe ajustée. Disponible en tailles S à XXL.</p>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>AJOUTER AU PANIER</button>
                <button onClick={() => setSelected(null)} className="btn-outline" style={{ padding: "12px 20px" }}>FERMER</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── QUIZ PAGE ──────────────────────────────────────────────────────────
function QuizPage() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [finished, setFinished] = useState(false);
  const questions = QUIZ_QUESTIONS;

  const handleAnswer = (idx) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === questions[current].answer) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent(c => c + 1);
        setAnswered(null);
      }
    }, 1200);
  };

  const restart = () => {
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
  };

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "60px 24px 40px", background: "var(--ft-dark)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="section-title animate-fade-up">TESTE TES CONNAISSANCES</div>
          <h1 className="heading-xl animate-fade-up delay-1">QUIZ <span style={{ color: "var(--ft-yellow)" }}>NBA</span></h1>
        </div>
      </section>
      <div className="gold-line" />

      <section style={{ padding: "60px 24px 100px", maxWidth: 700, margin: "0 auto" }}>
        {!started ? (
          <div className="animate-fade-up" style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🏀</div>
            <h2 className="heading-lg" style={{ marginBottom: 16 }}>QUIZ DU JOUR</h2>
            <p style={{ color: "var(--ft-gray)", fontSize: 16, lineHeight: 1.6, marginBottom: 32, maxWidth: 400, margin: "0 auto 32px" }}>
              {questions.length} questions sur l'histoire et l'actualité NBA. Es-tu un vrai fan ?
            </p>
            <button className="btn-primary" onClick={() => setStarted(true)} style={{ fontSize: 16, padding: "16px 40px" }}>
              COMMENCER LE QUIZ
            </button>
          </div>
        ) : finished ? (
          <div className="animate-scale" style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>{score >= 6 ? "🏆" : score >= 4 ? "👏" : "😅"}</div>
            <h2 className="heading-lg" style={{ marginBottom: 12 }}>
              {score >= 6 ? "MVP !" : score >= 4 ? "PAS MAL !" : "ROOKIE..."}
            </h2>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 700, color: "var(--ft-yellow)", marginBottom: 8 }}>
              {score}/{questions.length}
            </div>
            <p style={{ color: "var(--ft-gray)", marginBottom: 32 }}>bonnes réponses</p>
            <button className="btn-primary" onClick={restart} style={{ fontSize: 14 }}>REJOUER</button>
          </div>
        ) : (
          <div className="animate-fade" key={current}>
            {/* Progress */}
            <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: i < current ? "var(--ft-yellow)" : i === current ? "rgba(255,209,48,0.4)" : "var(--ft-border)"
                }} />
              ))}
            </div>

            <div style={{ fontSize: 13, color: "var(--ft-yellow)", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>
              QUESTION {current + 1}/{questions.length}
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, textTransform: "uppercase", marginBottom: 32, lineHeight: 1.2 }}>
              {questions[current].q}
            </h2>

            <div style={{ display: "grid", gap: 12 }}>
              {questions[current].options.map((opt, idx) => {
                let bg = "var(--ft-card)";
                let border = "var(--ft-border)";
                let color = "var(--ft-white)";
                if (answered !== null) {
                  if (idx === questions[current].answer) { bg = "rgba(74, 255, 139, 0.15)"; border = "#4AFF8B"; color = "#4AFF8B"; }
                  else if (idx === answered) { bg = "rgba(255, 74, 110, 0.15)"; border = "#FF4A6E"; color = "#FF4A6E"; }
                }

                return (
                  <button key={idx} onClick={() => handleAnswer(idx)} style={{
                    display: "flex", alignItems: "center", gap: 16, width: "100%",
                    padding: "18px 24px", borderRadius: 12, background: bg,
                    border: `2px solid ${border}`, color, cursor: answered !== null ? "default" : "pointer",
                    fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 500, textAlign: "left",
                    transition: "all 0.3s"
                  }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                      background: answered !== null && idx === questions[current].answer ? "#4AFF8B" : "var(--ft-border)",
                      color: answered !== null && idx === questions[current].answer ? "var(--ft-black)" : "var(--ft-white)",
                      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, flexShrink: 0
                    }}>
                      {answered !== null && idx === questions[current].answer ? <Check /> : String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 24, textAlign: "center", color: "var(--ft-gray)", fontSize: 14 }}>
              Score : <span style={{ color: "var(--ft-yellow)", fontWeight: 700 }}>{score}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// ─── OFFENSE PAGE ───────────────────────────────────────────────────────
function OffensePage() {
  const [take, setTake] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="offense-page" style={{ paddingTop: 80, background: "#1a120a", color: "#F5E6D3" }}>
      {/* Hero */}
      <section style={{
        minHeight: "70vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #1a120a 0%, #2a1d12 40%, #1a120a 100%)"
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg, #D4731A 0, #D4731A 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, #D4731A 0, #D4731A 1px, transparent 1px, transparent 80px)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(212,115,26,0.1) 0%, transparent 60%)" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 2, textAlign: "center" }}>
          <div className="animate-fade-up" style={{ fontFamily: "var(--font-offense)", fontSize: 14, letterSpacing: 4, color: "#D4731A", marginBottom: 20, textTransform: "uppercase" }}>Le rendez-vous bimensuel</div>
          <h1 className="animate-fade-up delay-1" style={{
            fontFamily: "var(--font-offense)", fontWeight: 900, fontSize: "clamp(56px, 10vw, 120px)",
            lineHeight: 0.9, marginBottom: 24,
            background: "linear-gradient(180deg, #F5E6D3 0%, #D4731A 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Offense</h1>
          <p className="animate-fade-up delay-2" style={{ fontFamily: "var(--font-offense)", fontSize: 20, color: "#BFA88A", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6, fontStyle: "italic" }}>
            Les grands débats du sport français. Des opinions tranchées, des invités qui comptent, zéro langue de bois.
          </p>
          <div className="animate-fade-up delay-3" style={{ display: "flex", gap: 24, justifyContent: "center", fontSize: 14, color: "#8B7355" }}>
            <span>🏀 Basket</span><span>⚽ Football</span><span>🏈 Foot US</span><span>🥊 Tous les sports</span>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-offense)", fontSize: 13, letterSpacing: 3, color: "#D4731A", marginBottom: 8, textTransform: "uppercase" }}>Derniers épisodes</div>
        <h2 style={{ fontFamily: "var(--font-offense)", fontWeight: 700, fontSize: 36, marginBottom: 40, color: "#F5E6D3" }}>Retrouvez chaque épisode</h2>
        <div style={{ display: "grid", gap: 20 }}>
          {OFFENSE_EPISODES.map((ep, i) => (
            <div key={ep.id} className={`card-hover animate-fade-up delay-${i + 1}`} style={{
              display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center",
              background: "#2a1d12", border: "1px solid #3d2a18", borderRadius: 16, padding: 28,
              cursor: "pointer"
            }}>
              <div>
                <span style={{ fontSize: 11, color: "#D4731A", fontFamily: "var(--font-offense)", letterSpacing: 2, textTransform: "uppercase" }}>Épisode {ep.id} — {ep.date}</span>
                <h3 style={{ fontFamily: "var(--font-offense)", fontWeight: 700, fontSize: 22, marginTop: 6, marginBottom: 6, color: "#F5E6D3" }}>{ep.title}</h3>
                <p style={{ fontSize: 14, color: "#8B7355", lineHeight: 1.5 }}>{ep.desc}</p>
                <div style={{ marginTop: 10, fontSize: 13, color: "#D4731A" }}>Avec <strong>{ep.guest}</strong> · {ep.duration}</div>
              </div>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(212,115,26,0.2)", border: "2px solid #D4731A", display: "flex", alignItems: "center", justifyContent: "center", color: "#D4731A", flexShrink: 0 }}>
                <Play />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submit Take */}
      <section style={{ padding: "80px 24px", background: "#2a1d12" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-offense)", fontSize: 13, letterSpacing: 3, color: "#D4731A", marginBottom: 8, textTransform: "uppercase" }}>Participe au débat</div>
          <h2 style={{ fontFamily: "var(--font-offense)", fontWeight: 700, fontSize: 32, marginBottom: 12, color: "#F5E6D3" }}>Propose ta take</h2>
          <p style={{ color: "#8B7355", marginBottom: 32, fontSize: 15, lineHeight: 1.6 }}>
            Tu as une opinion brûlante sur le sport ? Un sujet qui mérite débat ? Envoie-la nous. Les meilleures takes seront débattues en live.
          </p>
          {submitted ? (
            <div className="animate-scale" style={{ padding: 40, background: "rgba(212,115,26,0.1)", borderRadius: 16, border: "1px solid #D4731A" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔥</div>
              <p style={{ fontFamily: "var(--font-offense)", fontSize: 20, color: "#D4731A" }}>Take envoyée !</p>
            </div>
          ) : (
            <div>
              <textarea value={take} onChange={e => setTake(e.target.value)}
                placeholder="Ex: Wembanyama sera meilleur que LeBron d'ici 5 ans..."
                style={{
                  width: "100%", minHeight: 120, padding: 20, borderRadius: 12,
                  background: "#1a120a", border: "1px solid #3d2a18", color: "#F5E6D3",
                  fontFamily: "var(--font-body)", fontSize: 15, resize: "vertical", outline: "none"
                }} />
              <button onClick={() => { if (take.trim()) setSubmitted(true); }}
                style={{
                  marginTop: 16, background: "#D4731A", color: "#F5E6D3",
                  fontFamily: "var(--font-offense)", fontWeight: 700, fontSize: 15,
                  padding: "14px 36px", border: "none", cursor: "pointer",
                  transition: "all 0.3s", letterSpacing: 1, opacity: take.trim() ? 1 : 0.5
                }}>
                ENVOYER MA TAKE →
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ─────────────────────────────────────────────────────────
function AboutPage() {
  const team = [
    { name: "Thomas (Diezel Washington)", role: "Co-fondateur & Présentateur", desc: "La voix et l'énergie de First Team. Passionné de NBA depuis toujours." },
    { name: "Erwan (Vin Denzel)", role: "Co-fondateur & Présentateur", desc: "L'analyste, le stratège. Chaque stat a une histoire à raconter." },
    { name: "Équipe Production", role: "Réalisation & Montage", desc: "L'équipe derrière la caméra qui donne vie à chaque épisode." },
    { name: "Équipe Éditoriale", role: "Rédaction & Réseaux", desc: "Contenus, réseaux sociaux, communauté. Toujours connectés." },
  ];

  const stats = [
    { n: "500K+", l: "Abonnés YouTube" },
    { n: "200+", l: "Vidéos publiées" },
    { n: "50M+", l: "Vues totales" },
    { n: "150K+", l: "Communauté Instagram" },
    { n: "3", l: "Émissions récurrentes" },
    { n: "2020", l: "Année de création" },
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "60px 24px 40px", background: "var(--ft-dark)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="section-title animate-fade-up">QUI SOMMES-NOUS</div>
          <h1 className="heading-xl animate-fade-up delay-1">À PROPOS</h1>
        </div>
      </section>
      <div className="gold-line" />

      {/* Mission */}
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div className="animate-fade-up">
          <h2 className="heading-lg" style={{ marginBottom: 24 }}>NOTRE <span style={{ color: "var(--ft-yellow)" }}>MISSION</span></h2>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--ft-light-gray)" }}>
            First Team est né d'une conviction simple : le basket mérite un média à la hauteur de sa passion en France.
            Depuis 2020, nous créons des contenus authentiques, ambitieux et accessibles pour toute la communauté basketball francophone.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--ft-light-gray)", marginTop: 16 }}>
            Entretiens exclusifs, débats enflammés, analyses pointues, shows récurrents — First Team, c'est le rendez-vous incontournable
            des fans de basket. Et avec Offense, on repousse les frontières au-delà du parquet.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "60px 24px", background: "var(--ft-dark)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 24 }}>
            {stats.map(s => (
              <div key={s.l} style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, color: "var(--ft-yellow)" }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "var(--ft-gray)", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 24px", maxWidth: 1400, margin: "0 auto" }}>
        <div className="section-title" style={{ textAlign: "center" }}>L'ÉQUIPE</div>
        <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 48 }}>LES VISAGES DE <span style={{ color: "var(--ft-yellow)" }}>FIRST TEAM</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {team.map((m, i) => (
            <div key={m.name} className={`card-hover animate-fade-up delay-${i + 1}`} style={{
              background: "var(--ft-card)", border: "1px solid var(--ft-border)", borderRadius: 16, padding: 28
            }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg, var(--ft-yellow), #FF8C00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 16 }}>
                {i === 0 ? "🎙️" : i === 1 ? "📊" : i === 2 ? "🎬" : "✍️"}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, textTransform: "uppercase", marginBottom: 4 }}>{m.name}</h3>
              <div style={{ fontSize: 13, color: "var(--ft-yellow)", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>{m.role}</div>
              <p style={{ fontSize: 14, color: "var(--ft-gray)", lineHeight: 1.6 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section style={{ padding: "60px 24px 80px", background: "var(--ft-dark)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="section-title" style={{ textAlign: "center" }}>ILS NOUS ACCOMPAGNENT</div>
          <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 40 }}>PARTENAIRES</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20 }}>
            {PARTNERS.map(p => (
              <div key={p} className="card-hover" style={{
                background: "var(--ft-card)", border: "1px solid var(--ft-border)", borderRadius: 12,
                padding: "28px 20px", textAlign: "center", fontFamily: "var(--font-display)",
                fontWeight: 700, fontSize: 18, color: "var(--ft-light-gray)"
              }}>{p}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── TRAVELS PAGE ───────────────────────────────────────────────────────
function TravelsPage() {
  const [filter, setFilter] = useState("all");
  const sports = [
    { key: "all", label: "Tous", icon: "🌍" },
    { key: "Basket", label: "Basket", icon: "🏀" },
    { key: "Foot US", label: "Foot US", icon: "🏈" },
    { key: "Baseball", label: "Baseball", icon: "⚾" },
    { key: "Hockey", label: "Hockey", icon: "🏒" },
  ];

  const advantages = [
    { icon: "✈️", title: "Tout inclus", desc: "Vols, hôtels, billets de match, activités — on s'occupe de tout." },
    { icon: "🎙️", title: "Avec la Team", desc: "Thomas et Erwan voyagent avec vous. Ambiance garantie." },
    { icon: "🏟️", title: "Accès premium", desc: "Places VIP, coulisses, rencontres exclusives avec des joueurs." },
    { icon: "📸", title: "Souvenirs filmés", desc: "Chaque voyage est documenté par notre équipe vidéo." },
  ];

  const available = TRAVELS.filter(t => t.status === "available" && (filter === "all" || t.sport === filter));
  const past = TRAVELS.filter(t => t.status === "past");

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{
        padding: "80px 24px 60px", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, var(--ft-dark) 0%, #1a1400 50%, var(--ft-dark) 100%)"
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "repeating-linear-gradient(135deg, var(--ft-yellow) 0, var(--ft-yellow) 1px, transparent 1px, transparent 60px)" }} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div className="section-title animate-fade-up">VIVEZ LE SPORT US</div>
          <h1 className="heading-xl animate-fade-up delay-1">FIRST TEAM <span style={{ color: "var(--ft-yellow)" }}>TRAVELS</span></h1>
          <p className="animate-fade-up delay-2" style={{ fontSize: 17, color: "var(--ft-light-gray)", maxWidth: 600, marginTop: 16, lineHeight: 1.7 }}>
            Partez vivre le sport américain avec First Team. Des voyages uniques, en groupe, avec Thomas et Erwan.
          </p>
        </div>
      </section>
      <div className="gold-line" />

      {/* Advantages */}
      <section style={{ padding: "60px 24px", background: "var(--ft-dark)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {advantages.map(a => (
              <div key={a.title} className="card-hover" style={{
                background: "var(--ft-card)", border: "1px solid var(--ft-border)", borderRadius: 16, padding: 28
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{a.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, textTransform: "uppercase", marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ft-gray)", lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sport Filter */}
      <section style={{ padding: "40px 24px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="section-title">VOYAGES DISPONIBLES</div>
          <h2 className="heading-lg" style={{ marginBottom: 24 }}>RÉSERVEZ <span style={{ color: "var(--ft-yellow)" }}>MAINTENANT</span></h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            {sports.map(s => (
              <button key={s.key} onClick={() => setFilter(s.key)}
                style={{
                  padding: "10px 20px", borderRadius: 10, border: "1px solid",
                  borderColor: filter === s.key ? "var(--ft-yellow)" : "var(--ft-border)",
                  background: filter === s.key ? "var(--ft-yellow)" : "transparent",
                  color: filter === s.key ? "var(--ft-black)" : "var(--ft-gray)",
                  fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8
                }}>
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Available */}
      <section style={{ padding: "0 24px 60px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {available.map((t, i) => (
            <div key={t.id} className={`card-hover animate-fade-up delay-${i + 1}`} style={{
              background: "var(--ft-card)", border: "1px solid var(--ft-border)", borderRadius: 16, overflow: "hidden"
            }}>
              <div style={{ position: "relative", aspectRatio: "5/3" }}>
                <img src={t.img} alt={t.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 12, left: 12, background: "var(--ft-yellow)", color: "var(--ft-black)", padding: "4px 12px", borderRadius: 6, fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700 }}>
                  {t.spots} PLACES RESTANTES
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--ft-yellow)", fontFamily: "var(--font-display)", letterSpacing: 2, marginBottom: 4 }}>{t.sport.toUpperCase()} · {t.dates}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, textTransform: "uppercase", marginBottom: 8 }}>{t.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ft-gray)", lineHeight: 1.5, marginBottom: 16 }}>{t.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--ft-yellow)" }}>{t.price}</span>
                  <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 12 }}>
                    <Plane /> RÉSERVER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {available.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "var(--ft-gray)" }}>
            <p style={{ fontSize: 16 }}>Aucun voyage disponible dans cette catégorie pour le moment.</p>
          </div>
        )}
      </section>

      {/* Past */}
      <section style={{ padding: "60px 24px 80px", background: "var(--ft-dark)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="section-title">VOYAGES PASSÉS</div>
          <h2 className="heading-lg" style={{ marginBottom: 32 }}>ILS L'ONT <span style={{ color: "var(--ft-yellow)" }}>VÉCU</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {past.map(t => (
              <div key={t.id} className="card-hover" style={{
                background: "var(--ft-card)", border: "1px solid var(--ft-border)", borderRadius: 16, overflow: "hidden", opacity: 0.85
              }}>
                <div style={{ position: "relative", aspectRatio: "5/3" }}>
                  <img src={t.img} alt={t.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%)" }} />
                  <div style={{ position: "absolute", top: 12, left: 12, background: "var(--ft-border)", color: "var(--ft-light-gray)", padding: "4px 12px", borderRadius: 6, fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700 }}>
                    COMPLET — {t.dates}
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, textTransform: "uppercase", marginBottom: 6 }}>{t.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--ft-gray)", lineHeight: 1.5 }}>{t.desc}</p>
                  <div style={{ marginTop: 12, fontSize: 12, color: "var(--ft-gray)" }}>{t.total} participants · {t.sport}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "contenus": return <ContenusPage />;
      case "merch": return <MerchPage />;
      case "quiz": return <QuizPage />;
      case "offense": return <OffensePage />;
      case "about": return <AboutPage />;
      case "travels": return <TravelsPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{globalCSS}</style>
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
        }
      `}</style>
      <Header page={page} setPage={setPage} />
      <main style={{ minHeight: "100vh" }}>
        {renderPage()}
      </main>
      <Footer setPage={setPage} />
    </>
  );
}
