"use client";
import { useState, useEffect, useRef } from "react";

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
      <img src="/images/page-shop/photo-accueil.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
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
          <img src="/images/page-shop/lifestyle/lifestyle-dressed-1.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
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

// TODO: remplacer par les photos du shooting First Team × Champion (à venir)
const LIFESTYLE_SLIDES = [
  "https://picsum.photos/seed/ls1/800/640", "https://picsum.photos/seed/ls2/800/640",
  "https://picsum.photos/seed/ls3/800/640", "https://picsum.photos/seed/ls4/800/640",
  "https://picsum.photos/seed/ls5/800/640", "https://picsum.photos/seed/ls6/800/640",
  "https://picsum.photos/seed/ls7/800/640", "https://picsum.photos/seed/ls8/800/640",
];

function usePerView(): number {
  const [perView, setPerView] = useState(4);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
}

export function PhotoSlider() {
  const perView = usePerView();
  const n = LIFESTYLE_SLIDES.length;
  const maxCurrent = Math.max(0, n - perView);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);

  useEffect(() => { setCurrent(c => Math.min(c, maxCurrent)); }, [maxCurrent]);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setCurrent(c => c >= maxCurrent ? 0 : c + 1), 4500);
    return () => clearTimeout(t);
  }, [current, paused, maxCurrent]);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxCurrent, c + 1));

  return (
    <section style={{ background: "#0A0A0A", padding: "40px 0 52px" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          className="photo-slider-track"
          style={{ display: "flex", transform: `translateX(-${current * 100 / n}%)`, transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)" }}
          onMouseDown={e => { mouseStartX.current = e.clientX; }}
          onMouseUp={e => { if (mouseStartX.current === null) return; const dx = mouseStartX.current - e.clientX; if (Math.abs(dx) > 40) dx > 0 ? next() : prev(); mouseStartX.current = null; }}
          onMouseLeave={() => { mouseStartX.current = null; }}
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={e => { if (touchStartX.current === null) return; const dx = touchStartX.current - e.changedTouches[0].clientX; if (Math.abs(dx) > 50) dx > 0 ? next() : prev(); touchStartX.current = null; }}
        >
          {LIFESTYLE_SLIDES.map((src, i) => (
            <div key={i} style={{ flex: `0 0 calc(100% / ${perView})`, aspectRatio: "5/4", padding: "0 5px", boxSizing: "border-box" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 3 }} />
            </div>
          ))}
        </div>
        {current > 0 && <button onClick={prev} aria-label="Précédent" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 2, background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", width: 48, height: 48, borderRadius: "50%", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>←</button>}
        {current < maxCurrent && <button onClick={next} aria-label="Suivant" style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 2, background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", width: 48, height: 48, borderRadius: "50%", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>→</button>}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 18 }}>
        {Array.from({ length: maxCurrent + 1 }).map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Position ${i + 1}`} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 999, padding: 0, border: "none", cursor: "pointer", background: i === current ? "#fff" : "rgba(255,255,255,0.3)", transition: "all 0.3s ease" }} />
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "260px 200px", gap: 14 }}>
          <div style={{ gridColumn: "1 / 2", gridRow: "1 / 3", position: "relative", background: "#FED000", overflow: "hidden" }}>
            {/* TODO: remplacer par les photos du shooting First Team × Champion (à venir) */}
          <img src="/images/page-shop/lifestyle/lifestyle-urban-1.jpg" alt="" style={{ position: "absolute", inset: 14, width: "calc(100% - 28px)", height: "calc(100% - 28px)", objectFit: "cover" }} />
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            {/* TODO: remplacer par les photos du shooting First Team × Champion (à venir) */}
            <img src="/images/page-shop/lifestyle/studio-1.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ background: "#FE0000", padding: 18, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ ...ANTON, fontSize: 40, color: "#fff", letterSpacing: -1, lineHeight: 0.9 }}>ÉDITION</span>
            <span style={{ ...MANROPE(700), fontSize: 11, color: "rgba(255,255,255,0.8)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>LIMITÉE</span>
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
