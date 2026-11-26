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

/** Teaser de la collection 10 ans, en boucle, au-dessus du hero (sous la barre de navigation fixe). */
export function TeaserVideo() {
  return (
    <section style={{ background: "#0A0A0A", paddingTop: 72 }}>
      <video
        src="/media/shop/merch10/teaser.mp4"
        poster="/media/shop/merch10/teaser-poster.jpg"
        autoPlay muted loop playsInline preload="auto"
        aria-label="Teaser de la collection First Team 10 ans"
        style={{ display: "block", width: "100%", aspectRatio: "16 / 9", maxHeight: "calc(100svh - 72px)", objectFit: "cover", background: "#0A0A0A" }}
      />
    </section>
  );
}

export function AnnouncementBar() {
  const items = ["LIVRAISON OFFERTE DÈS 100€", "★", "DROP DES 10 ANS DE FIRST TEAM", "★", "MADE IN FRANCE", "★"];
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
      <img src="/media/shop/herro.jpg" alt="Vestiaire First Team — Summer Edition 26" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
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
      <div ref={ref} className="reveal shop-pres-wrap" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", minHeight: 560 }}>
        <div className="shop-pres-photo" style={{ position: "relative", minHeight: 560, overflow: "hidden" }}>
          <img src="/media/shop/merch10/presentation.jpg" alt="La collection First Team 10 ans" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%)" }} />
          <div style={{ position: "absolute", top: 28, left: 28 }}>
            <span style={{ ...ANTON, fontSize: 11, color: "rgba(255,255,255,0.85)", letterSpacing: 2.5, textTransform: "uppercase" }}>CAPSULE 10 ANS</span>
          </div>
        </div>
        <div className="shop-pres-text" style={{ padding: "72px 60px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#FE0000", position: "relative" }}>
          <div style={{ position: "absolute", top: 24, right: 24, ...ANTON, fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 2 }}>LE VESTIAIRE FIRST TEAM</div>
          <h2 style={{ ...ANTON, fontSize: "clamp(48px, 6vw, 96px)", lineHeight: 0.86, textTransform: "uppercase", letterSpacing: -2, color: "#fff", marginBottom: 12 }}>
            Le basket<br />se porte.
          </h2>
          <div style={{ height: 8 }} />
          <p style={{ ...MANROPE(400), fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.85)", maxWidth: 440, marginBottom: 32 }}>
            On aura attendu dix ans, mais la voilà : notre première collection 100 % First Team. Pas de grande marque derrière, juste notre logo, notre histoire et dix ans de basket entre potes. Le tout sur des pièces de qualité, faites pour durer.
          </p>
          <a href="#produits" className="pill-btn pill-btn-black">Découvrir le Vestiaire →</a>
        </div>
      </div>
    </section>
  );
}

// Collection 10 ans : r = largeur / hauteur de la photo (portrait 0.8, paysage 1.25 à 1.5)
const DEROULANT_SLIDES = [
  { src: "/media/shop/merch10/slide-05.jpg", r: 1.5 },
  { src: "/media/shop/merch10/slide-17.jpg", r: 0.8 },
  { src: "/media/shop/merch10/slide-14.jpg", r: 1.25 },
  { src: "/media/shop/merch10/slide-04.jpg", r: 0.8 },
  { src: "/media/shop/merch10/slide-30.jpg", r: 1.5 },
  { src: "/media/shop/merch10/slide-18.jpg", r: 0.8 },
  { src: "/media/shop/merch10/slide-08.jpg", r: 1.5 },
  { src: "/media/shop/merch10/slide-12.jpg", r: 0.8 },
  { src: "/media/shop/merch10/slide-28.jpg", r: 1.25 },
  { src: "/media/shop/merch10/slide-22.jpg", r: 0.8 },
  { src: "/media/shop/merch10/slide-25.jpg", r: 1.5 },
  { src: "/media/shop/merch10/slide-36.jpg", r: 0.8 },
].map((s, i) => ({ ...s, alt: `Collection First Team 10 ans, look ${i + 1}` }));
const SLIDE_HEIGHT = 340;
const SLIDE_GAP = 10;

export function PhotoSlider() {
  const doubled = [...DEROULANT_SLIDES, ...DEROULANT_SLIDES];
  const trackWidth = DEROULANT_SLIDES.reduce((w, s) => w + Math.round(SLIDE_HEIGHT * s.r) + SLIDE_GAP, 0);
  return (
    <section style={{ background: "#0A0A0A", padding: "40px 0 52px", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          gap: SLIDE_GAP,
          width: trackWidth * 2,
          animation: `marquee-photos 90s linear infinite`,
        }}
      >
        {doubled.map((s, i) => (
          <div key={i} style={{ flex: `0 0 ${Math.round(SLIDE_HEIGHT * s.r)}px`, height: SLIDE_HEIGHT }}>
            <img src={s.src} alt={i < DEROULANT_SLIDES.length ? s.alt : ""} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 3 }} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function InfoBand() {
  return (
    <section style={{ background: "#FED000", borderTop: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A" }}>
      <div style={{ padding: "28px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <span style={{ fontSize: 24, flexShrink: 0 }}>📦</span>
        <span style={{ ...MANROPE(800), fontSize: "clamp(1rem, 1.6vw, 1.2rem)", color: "#0A0A0A", letterSpacing: 0.3, whiteSpace: "nowrap" }}>Livraison offerte à partir de 100€</span>
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
    <section className="shop-studio-section" style={{ background: "#F2EEE6", padding: "120px 40px" }}>
      <div ref={ref} className="reveal shop-studio-wrap" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#FE0000", display: "block", marginBottom: 16 }}>· ARCHIVE · SUMMER DROP 26</span>
          <h2 style={{ ...AWESOME(400), fontStyle: "italic", fontSize: "clamp(40px, 5vw, 80px)", lineHeight: 0.95, letterSpacing: -1.5, color: "#0A0A0A", marginBottom: 28 }}>
            Champion ×<br />First Team.
          </h2>
          <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.75, color: "rgba(0,0,0,0.65)", marginBottom: 18, maxWidth: 440 }}>
            Champion, c&apos;est la marque qu&apos;on voyait sur le dos de Jordan, de Pippen, des Seattle Sonics de Payton. Le C cousu sur les jerseys NBA pendant 10 ans, ceux qu&apos;on regardait gamins en se disant qu&apos;on aurait bien aimé en avoir un.
          </p>
          <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.75, color: "rgba(0,0,0,0.65)", marginBottom: 18, maxWidth: 440 }}>
            Aujourd&apos;hui Champion est de retour. Coton bio, coupes propres, qualité premium, ce côté vintage qui rappelle les vestiaires des années 90 mais qui se porte très bien de nos jours. Bref, ça nous parle, et c&apos;était une évidence de s&apos;associer avec cette marque iconique.
          </p>
          <p style={{ ...MANROPE(700), fontSize: 14, color: "#0A0A0A", marginBottom: 36, fontStyle: "italic" }}>
            &ldquo;On parle basket entre potes depuis 10 ans. Avec Champion, on a juste voulu essayer d&apos;être bien sapés et permettre à la communauté d&apos;en faire autant.&rdquo;
          </p>
        </div>
        <div className="studio-fin-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {/* GRAND : la 32 en paysage, en haut sur toute la largeur */}
          <div className="studio-fin-cell-large" style={{ gridColumn: "1 / 3", gridRow: 1, overflow: "hidden", aspectRatio: "3 / 2" }}>
            <img src="/media/shop/merch10/fin-32.jpg" alt="La First Team en collection 10 ans" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          {/* dos du t-shirt, dans la rue */}
          <div className="studio-fin-cell-medium" style={{ gridColumn: 1, gridRow: 2, overflow: "hidden", aspectRatio: "4 / 5" }}>
            <img src="/media/shop/merch10/fin-34.jpg" alt="Le dos du t-shirt First Team 10 ans, dans la rue" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          {/* dos du t-shirt */}
          <div className="studio-fin-cell-small" style={{ gridColumn: 2, gridRow: 2, overflow: "hidden", position: "relative", aspectRatio: "4 / 5" }}>
            <img src="/media/shop/merch10/fin-21.jpg" alt="Le dos du t-shirt First Team 10 ans" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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

