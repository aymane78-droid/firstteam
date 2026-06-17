"use client";
import { useEffect, useRef } from "react";

const ANTON: React.CSSProperties = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number): React.CSSProperties => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });
const AWESOME = (w: number): React.CSSProperties => ({ fontFamily: "Awesome, Georgia, serif", fontWeight: w });

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } }),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function AnnouncementBar() {
  const items = ["LIVRAISON OFFERTE DÈS 100€", "★", "DROP DES 10 ANS DE FIRST TEAM", "★", "EN COLLABORATION AVEC CHAMPION", "★", "MADE IN FRANCE", "★"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", padding: "10px 0" }}>
      <div style={{ display: "flex", gap: 48, animation: "marquee-design 50s linear infinite", whiteSpace: "nowrap" }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 2, color: t === "★" ? "#FE0000" : "rgba(255,255,255,0.8)" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useReveal();
  return (
    <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <img src="https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/herro" alt="Vestiaire First Team — Summer Edition 26" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.82) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, display: "flex", zIndex: 5 }}>
        <div style={{ flex: 1, background: "#FE0000" }} />
        <div style={{ flex: 1, background: "#FED000" }} />
        <div style={{ flex: 1, background: "#002EFE" }} />
      </div>
      <div style={{ position: "absolute", top: 56, left: 40, zIndex: 3, display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ ...ANTON, fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: 3, textTransform: "uppercase" }}>FT / SHOP</span>
      </div>
      <div ref={ref} className="reveal" style={{ position: "relative", zIndex: 2, width: "100%", padding: "0 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 44, height: 2, background: "#FE0000" }} />
          <span style={{ ...MANROPE(800), fontSize: 11, color: "rgba(255,255,255,0.75)", letterSpacing: 3, textTransform: "uppercase" }}>SAISON 2026</span>
        </div>
        <h1 style={{ ...ANTON, fontSize: "clamp(72px, 11vw, 160px)", lineHeight: 0.84, color: "#fff", textTransform: "uppercase", letterSpacing: "-3px", marginBottom: 24 }}>
          Le Vestiaire<br /><span style={{ color: "#FED000" }}>First Team.</span>
        </h1>
        <p style={{ ...MANROPE(400), fontSize: 18, color: "rgba(255,255,255,0.72)", marginBottom: 36, maxWidth: 520, lineHeight: 1.6 }}>On parle basket, on le porte aussi.</p>
        <a href="#produits" className="pill-btn pill-btn-red">Découvrir le Vestiaire First Team →</a>
      </div>
    </section>
  );
}


export function PresentationSection() {
  const ref = useReveal();
  return (
    <section style={{ background: "#0A0A0A", overflow: "hidden" }}>
      <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", minHeight: 560 }}>
        <div style={{ position: "relative", minHeight: 560, overflow: "hidden" }}>
          <img src="https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/Sous-le-herro" alt="Collection First Team × Champion" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
          <div style={{ position: "absolute", top: 28, left: 28 }}>
            <span style={{ ...ANTON, fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2.5, textTransform: "uppercase" }}>CAPSULE SUMMER EDITION 26</span>
          </div>
        </div>
        <div style={{ padding: "72px 60px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#FE0000", position: "relative" }}>
          <div style={{ position: "absolute", top: 24, right: 24, ...ANTON, fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 2 }}>LE VESTIAIRE FIRST TEAM</div>
          <h2 style={{ ...ANTON, fontSize: "clamp(48px, 6vw, 96px)", lineHeight: 0.86, textTransform: "uppercase", letterSpacing: -2, color: "#fff", marginBottom: 12 }}>
            Le basket<br />se porte.
          </h2>
          <p style={{ ...MANROPE(700), fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 20, letterSpacing: 0.5 }}>First Team × Champion</p>
          <p style={{ ...MANROPE(400), fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.85)", maxWidth: 440, marginBottom: 32 }}>
            Une collab entre une bande de potes passionnés de basket et une marque qui a habillé les vestiaires NBA pendant des années.
          </p>
          <a href="#produits" className="pill-btn pill-btn-black">Découvrir le Vestiaire →</a>
        </div>
      </div>
    </section>
  );
}

const DEROULANT_SLIDES = [
  { src: "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant1", alt: "First Team × Champion — look 1" },
  { src: "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant2", alt: "First Team × Champion — look 2" },
  { src: "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant3", alt: "First Team × Champion — look 3" },
  { src: "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant4", alt: "First Team × Champion — look 4" },
  { src: "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant5", alt: "First Team × Champion — look 5" },
  { src: "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant6", alt: "First Team × Champion — look 6" },
  { src: "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant7", alt: "First Team × Champion — look 7" },
];
const SLIDE_WIDTH = 320;
const SLIDE_GAP = 10;

export function PhotoSlider() {
  const doubled = [...DEROULANT_SLIDES, ...DEROULANT_SLIDES];
  const trackWidth = DEROULANT_SLIDES.length * (SLIDE_WIDTH + SLIDE_GAP);
  return (
    <section style={{ background: "#0A0A0A", padding: "40px 0 52px", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          gap: SLIDE_GAP,
          width: trackWidth * 2,
          animation: `marquee-photos 60s linear infinite`,
        }}
      >
        {doubled.map((s, i) => (
          <div key={i} style={{ flex: `0 0 ${SLIDE_WIDTH}px`, aspectRatio: "5/4" }}>
            <img src={s.src} alt={s.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 3 }} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function InfoBand() {
  const items = [
    { icon: "📦", label: "Livraison offerte à partir de 100€" },
    { icon: "🌿", label: "Coton bio" },
    { icon: "★",  label: "Qualité supérieure" },
  ];
  return (
    <section style={{ background: "#FED000", borderTop: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A" }}>
      <div className="shop-info-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
        {items.map((it, i) => (
          <div key={i} className="shop-info-item" style={{ padding: "28px 20px", display: "flex", alignItems: "center", gap: 12, borderRight: i < 2 ? "1px solid rgba(0,0,0,0.12)" : "none" }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{it.icon}</span>
            <span style={{ ...MANROPE(800), fontSize: "clamp(0.75rem, 1.1vw, 0.875rem)", color: "#0A0A0A", letterSpacing: 0.3, whiteSpace: "nowrap" }}>{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BigMarquee() {
  const items = ["INSPIRÉ DES STATES. PORTÉ EN FRANCE.", "★", "INSPIRÉ DES STATES. PORTÉ EN FRANCE.", "★", "INSPIRÉ DES STATES. PORTÉ EN FRANCE.", "★"];
  const doubled = [...items, ...items];
  return (
    <section style={{ background: "#0A0A0A", padding: "22px 0", overflow: "hidden", borderTop: "1px solid #1a1a1a" }}>
      <div style={{ display: "flex", gap: 64, animation: "marquee-design 36s linear infinite", whiteSpace: "nowrap" }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ ...ANTON, fontSize: 36, color: t.startsWith("★") ? "#FED000" : "rgba(255,255,255,0.18)", letterSpacing: -0.5, textTransform: "uppercase" }}>{t}</span>
        ))}
      </div>
    </section>
  );
}

export function StudioSection() {
  const ref = useReveal();
  return (
    <section style={{ background: "#F2EEE6", padding: "120px 40px" }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#FE0000", display: "block", marginBottom: 16 }}>· LA COLLAB</span>
          <h2 style={{ ...AWESOME(400), fontStyle: "italic", fontSize: "clamp(40px, 5vw, 80px)", lineHeight: 0.95, letterSpacing: -1.5, color: "#0A0A0A", marginBottom: 28 }}>
            Champion ×<br />First Team.
          </h2>
          <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.75, color: "rgba(0,0,0,0.65)", marginBottom: 18, maxWidth: 440 }}>
            Champion, c&apos;est la marque qu&apos;on voyait sur le dos de Jordan, de Pippen, des Seattle Sonics de Payton. Le C cousu sur les jerseys NBA pendant 10 ans, ceux qu&apos;on regardait gamins en se disant qu&apos;on aurait bien aimé en avoir un.
          </p>
          <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.75, color: "rgba(0,0,0,0.65)", marginBottom: 18, maxWidth: 440 }}>
            Aujourd&apos;hui Champion est de retour. Coton bio, coupes propres, qualité premium, ce côté vintage qui rappelle les vestiaires des années 90 mais qui se porte très bien en 2026. Bref, ça nous parle, et c&apos;était une évidence de s&apos;associer avec cette marque iconique.
          </p>
          <p style={{ ...MANROPE(700), fontSize: 14, color: "#0A0A0A", marginBottom: 36, fontStyle: "italic" }}>
            &ldquo;On parle basket entre potes depuis 10 ans. Avec Champion, on a juste voulu essayer d&apos;être bien sapés et permettre à la communauté d&apos;en faire autant.&rdquo;
          </p>
          <a href="#" className="pill-btn pill-btn-black">La collab Champion →</a>
        </div>
        <div className="studio-fin-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gridTemplateRows: "2fr 1fr", gap: 8, aspectRatio: "1 / 1" }}>
          {/* fin1 — GRAND : gauche, pleine hauteur */}
          <div className="studio-fin-cell-large" style={{ gridColumn: 1, gridRow: "1 / 3", overflow: "hidden" }}>
            <img src="https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/Sectionfin1" alt="First Team × Champion — editorial 1" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          {/* fin3 — MOYEN : haut droite */}
          <div className="studio-fin-cell-medium" style={{ gridColumn: 2, gridRow: 1, overflow: "hidden" }}>
            <img src="https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/Sectionfin3" alt="First Team × Champion — editorial 3" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          {/* fin2 — PETIT : bas droite */}
          <div className="studio-fin-cell-small" style={{ gridColumn: 2, gridRow: 2, overflow: "hidden", position: "relative" }}>
            <img src="https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/Sectionfin2" alt="First Team × Champion — editorial 2" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", bottom: 10, left: 10, background: "#FE0000", padding: "8px 12px", display: "flex", flexDirection: "column" }}>
              <span style={{ ...ANTON, fontSize: 22, color: "#fff", letterSpacing: -1, lineHeight: 0.9 }}>ÉDITION</span>
              <span style={{ ...MANROPE(700), fontSize: 9, color: "rgba(255,255,255,0.85)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 3 }}>LIMITÉE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section style={{ background: "#FED000", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#0A0A0A", display: "block", marginBottom: 12, opacity: 0.55 }}>· Drop alert</span>
          <h2 style={{ ...ANTON, fontSize: "clamp(36px, 4.5vw, 68px)", textTransform: "uppercase", letterSpacing: -1, lineHeight: 0.92, color: "#0A0A0A" }}>
            Sois prévenu<br />du prochain drop.
          </h2>
          <p style={{ ...MANROPE(400), fontSize: 14, color: "rgba(0,0,0,0.55)", marginTop: 16, maxWidth: 400 }}>Une fois par mois, pas plus. Promis.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 8, background: "#fff", padding: 6, borderRadius: 999, border: "2px solid #0A0A0A" }}>
            <input
              type="email"
              placeholder="ton.email@equipe.com"
              style={{ flex: 1, padding: "12px 16px", border: "none", outline: "none", fontFamily: "var(--font-manrope), Manrope, sans-serif", fontSize: 14, background: "transparent", color: "#0A0A0A" }}
            />
            <button type="submit" className="pill-btn pill-btn-black" style={{ fontSize: 12, padding: "12px 22px" }}>S&apos;inscrire →</button>
          </div>
          <span style={{ ...MANROPE(400), fontSize: 11, color: "rgba(0,0,0,0.5)", paddingLeft: 16 }}>Pas de spam. Désabonnement en 1 clic.</span>
        </form>
      </div>
    </section>
  );
}
