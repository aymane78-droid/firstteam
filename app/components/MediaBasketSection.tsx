"use client";
import { useRef, useEffect } from "react";
import { CldImage } from "next-cloudinary";
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
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function MediaBasketSection() {
  const ref = useReveal();
  return (
    <section style={{ position: "relative" as const, padding: "120px 40px", background: "#fff", overflow: "hidden" }}>
      {/* Dotted grid */}
      <div style={{
        position: "absolute" as const, inset: 0,
        backgroundImage: "radial-gradient(rgba(10,10,10,0.08) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)",
        pointerEvents: "none" as const, zIndex: 0,
      }} />
      {/* Ghost FT */}
      <div style={{
        position: "absolute" as const, top: -40, right: -20,
        ...ANTON, fontSize: 520, color: "rgba(10,10,10,0.035)",
        lineHeight: 1, userSelect: "none" as const, pointerEvents: "none" as const, zIndex: 0,
      }}>FT</div>

      <div ref={ref} className="reveal" style={{ maxWidth: 1200, margin: "0 auto", position: "relative" as const, zIndex: 1 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
          <p style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", margin: 0 }}>À PROPOS</p>
          <div style={{ flex: 1, height: 1, background: "rgba(10,10,10,0.12)" }} />
        </div>

        {/* Title */}
        <h2 style={{ ...ANTON, fontSize: "clamp(48px, 6vw, 88px)", lineHeight: 0.92, textTransform: "uppercase" as const, letterSpacing: "-1px", margin: "0 0 40px", display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: "0.15em", color: "#0A0A0A" }}>
          <span>Média</span>
          <span style={{ position: "relative" as const, display: "inline-block" }}>
            <span style={{ position: "absolute" as const, inset: "-4px -8px", background: "#FED000", transform: "skew(-6deg)", zIndex: 0, borderRadius: 2 }} />
            <span style={{ position: "relative" as const, zIndex: 1 }}>100%</span>
          </span>
          <span>
            Basket.
            <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: "50%", background: "#FE0000", marginLeft: 6, verticalAlign: "middle", transform: "translateY(-4px)" }} />
          </span>
        </h2>

        {/* Tricolor divider */}
        <div style={{ display: "flex", gap: 6, marginBottom: 56 }}>
          <div style={{ width: 40, height: 6, borderRadius: 999, background: "#FE0000" }} />
          <div style={{ width: 40, height: 6, borderRadius: 999, background: "#FED000" }} />
          <div style={{ width: 40, height: 6, borderRadius: 999, background: "#002EFE" }} />
        </div>

        {/* Body grid */}
        <div className="r-grid-about" style={{ gap: 88, alignItems: "start" }}>
          {/* Left: lead text + pillars */}
          <div>
            <p style={{ ...MANROPE(400), fontSize: 18, lineHeight: 1.75, color: "#0A0A0A", marginBottom: 48 }}>
              Fondé par d&apos;anciens basketteurs,{" "}
              <span style={{ background: "linear-gradient(transparent 62%, #FED000 62%, #FED000 92%, transparent 92%)" }}>
                First Team est le premier média basket 100% indépendant en France
              </span>
              {" "}— on décrypte, on débat, on kiffe le jeu.
            </p>
            {[
              { num: "01", color: "#FE0000", title: "Indépendance", body: "Aucun actionnaire extérieur. Nos opinions n'appartiennent qu'à nous." },
              { num: "02", color: "#FED000", title: "Profondeur", body: "Analyses tactiques, entretiens longs, contexte historique — pas de titres racoleurs." },
              { num: "03", color: "#002EFE", title: "Communauté", body: "Construits avec notre audience, pour notre audience. Vous êtes First Team." },
            ].map((p) => (
              <div key={p.num} style={{ borderTop: "1px solid rgba(10,10,10,0.1)", paddingTop: 20, paddingBottom: 20, display: "grid", gridTemplateColumns: "48px 1fr", gap: 20, alignItems: "start" }}>
                <span style={{ ...ANTON, fontSize: 22, color: p.color, lineHeight: 1 }}>{p.num}</span>
                <div>
                  <p style={{ ...ANTON, fontSize: 22, color: "#0A0A0A", lineHeight: 1, marginBottom: 8, textTransform: "uppercase" as const }}>{p.title}</p>
                  <p style={{ ...MANROPE(400), fontSize: 14, lineHeight: 1.65, color: "rgba(10,10,10,0.6)", margin: 0 }}>{p.body}</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 36 }}>
              <Link href="/qui-nous-sommes" className="pill-btn pill-btn-black">Qui sommes-nous →</Link>
            </div>
          </div>

          {/* Right: visual composition */}
          <div className="r-hide-mobile" style={{ position: "relative" as const, minHeight: 640 }}>
            {/* Fond jaune décalé */}
            <div style={{ position: "absolute" as const, top: 18, left: 18, width: "92%", height: "82%", background: "#FED000", borderRadius: 4, zIndex: 0 }} />
            {/* Photo + liseré tricolore */}
            <div style={{ position: "absolute" as const, top: 0, left: 0, width: "92%", height: "82%", borderRadius: 4, overflow: "hidden", zIndex: 1 }}>
              <CldImage
                src="SectionA%CC%80Propos_nathyt"
                alt="First Team"
                fill
                style={{ objectFit: "cover" as const }}
                format="auto"
                quality="auto"
              />
              <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, height: 6, display: "flex", zIndex: 2 }}>
                <div style={{ flex: 1, background: "#FE0000" }} />
                <div style={{ flex: 1, background: "#FED000" }} />
                <div style={{ flex: 1, background: "#002EFE" }} />
              </div>
            </div>
            {/* Quote card */}
            <div style={{
              position: "absolute" as const, bottom: 0, right: 0, width: "52%",
              background: "#0A0A0A", borderRadius: 4, padding: "24px 20px", zIndex: 2,
            }}>
              <span style={{ ...ANTON, fontSize: 48, color: "#FED000", lineHeight: 0.8, display: "block", marginBottom: 8 }}>"</span>
              <p style={{ ...MANROPE(400), fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.75)", margin: 0, fontStyle: "italic" }}>
                Le Média de Tous les Baskets
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
