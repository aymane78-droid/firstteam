"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const ANTON   = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });
const AWESOME = (w: number) => ({ fontFamily: "Awesome, Georgia, serif", fontWeight: w });

const PRODUCTS = [
  { id: 1, name: "T-Shirt First Team — Blanc",   cat: "T-Shirts",     price: 35, img: "/images/page-shop/tshirt-a-face.png", hoverImg: "/images/page-shop/tshirt-a-dos.png", isNew: true,  sizes: ["S","M","L","XL"] },
  { id: 3, name: "T-Shirt Capsule — Coloris 1",  cat: "T-Shirts",     price: 39, img: "/images/page-shop/tshirt-b-face.png", hoverImg: "/images/page-shop/tshirt-b-dos.png", isNew: false, sizes: ["S","M","L","XL"] },
  { id: 5, name: "Bob First Team — Naturel",     cat: "Accessoires",  price: 28, img: "/images/page-shop/bob-a.png",         hoverImg: null,                                  isNew: true,  sizes: ["Unique"] },
  { id: 6, name: "Bob First Team — Noir",        cat: "Accessoires",  price: 28, img: "/images/page-shop/bob-b.png",         hoverImg: null,                                  isNew: false, sizes: ["Unique"] },
  { id: 7, name: "Tote Bag First Team",          cat: "Accessoires",  price: 22, img: "/images/page-shop/bag.png",           hoverImg: null,                                  isNew: false, sizes: ["Unique"] },
  { id: 8, name: "Short Basket — Blanc",         cat: "Shorts",       price: 55, img: "/images/page-shop/short-a.png",      hoverImg: null,                                  isNew: true,  sizes: ["S","M","L","XL"] },
];

const CATS = ["Tout", "T-Shirts", "Accessoires", "Shorts"] as const;

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

function AnnouncementBar() {
  const items = [
    "LIVRAISON OFFERTE DÈS 100€",
    "★",
    "DROP DES 10 ANS DE FIRST TEAM",
    "★",
    "EN COLLABORATION AVEC CHAMPION",
    "★",
    "MADE IN FRANCE",
    "★",
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", padding: "10px 0" }}>
      <div style={{ display: "flex", gap: 48, animation: "marquee-design 50s linear infinite", whiteSpace: "nowrap" as const }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 2, color: t === "★" ? "#FE0000" : "rgba(255,255,255,0.8)" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const ref = useReveal();
  return (
    <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      {/* bg */}
      <img
        src="/images/page-shop/photo-accueil.png"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.82) 100%)", zIndex: 1 }} />

      {/* tricolor top strip */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, display: "flex", zIndex: 5 }}>
        <div style={{ flex: 1, background: "#FE0000" }} />
        <div style={{ flex: 1, background: "#FED000" }} />
        <div style={{ flex: 1, background: "#002EFE" }} />
      </div>

      {/* side rail */}
      <div style={{ position: "absolute", top: 56, left: 40, zIndex: 3, display: "flex", flexDirection: "column" as const, gap: 6 }}>
        <span style={{ ...ANTON, fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: 3, textTransform: "uppercase" as const }}>FT / SHOP</span>
        <span style={{ ...MANROPE(700), fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5 }}>CAPSULE · 10 ANS</span>
      </div>

      <div ref={ref} className="reveal" style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 44, height: 2, background: "#FE0000" }} />
          <span style={{ ...MANROPE(800), fontSize: 11, color: "rgba(255,255,255,0.75)", letterSpacing: 3, textTransform: "uppercase" as const }}>Capsule des 10 ans · Saison 2026</span>
        </div>
        <h1 style={{ ...ANTON, fontSize: "clamp(72px, 11vw, 160px)", lineHeight: 0.84, color: "#fff", textTransform: "uppercase" as const, letterSpacing: "-3px", marginBottom: 24 }}>
          Maison<br /><span style={{ color: "#FED000" }}>First Team.</span>
        </h1>
        <p style={{ ...MANROPE(400), fontSize: 18, color: "rgba(255,255,255,0.72)", marginBottom: 36, maxWidth: 520, lineHeight: 1.6 }}>
          Le basket se porte aussi.
        </p>
        <a href="#produits" className="pill-btn pill-btn-red">Découvrir la Maison First Team →</a>
      </div>
    </section>
  );
}

function EditoBand() {
  const items = [
    { tag: "01.", title: "Capsule des 10 ans",    desc: "Une édition anniversaire numérotée, fabriquée au Portugal.",          color: "#FE0000" },
    { tag: "02.", title: "Lifestyle & Sportswear", desc: "Des pièces pensées pour le court et pour la ville.",                   color: "#002EFE" },
    { tag: "03.", title: "Qualité Champion",        desc: "Conçu en partenariat avec Champion — matières premium, coupe parfaite.", color: "#FED000" },
  ];
  return (
    <section style={{ background: "#F2EEE6", padding: "36px 40px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingLeft: 20, borderLeft: `3px solid ${it.color}` }}>
            <span style={{ ...ANTON, fontSize: 13, color: it.color, letterSpacing: 1.5, marginTop: 2 }}>{it.tag}</span>
            <div>
              <h3 style={{ ...ANTON, fontSize: 20, textTransform: "uppercase" as const, color: "#0A0A0A", letterSpacing: 0.5, marginBottom: 5 }}>{it.title}</h3>
              <p style={{ ...MANROPE(400), fontSize: 13, color: "rgba(0,0,0,0.55)", lineHeight: 1.5 }}>{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PresentationSection() {
  const ref = useReveal();
  return (
    <section style={{ background: "#0A0A0A", overflow: "hidden" }}>
      <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", minHeight: 560 }}>
        {/* Photo lifestyle */}
        <div style={{ position: "relative" as const, minHeight: 560, overflow: "hidden" }}>
          <img
            src="/images/page-shop/lifestyle/lifestyle-dressed-1.jpg"
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
          <div style={{ position: "absolute", top: 28, left: 28 }}>
            <span style={{ ...ANTON, fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2.5, textTransform: "uppercase" as const }}>CAPSULE · EDIT. 10·26</span>
          </div>
        </div>

        {/* Texte */}
        <div style={{ padding: "72px 60px", display: "flex", flexDirection: "column" as const, justifyContent: "center", background: "#FE0000", position: "relative" as const }}>
          <div style={{ position: "absolute", top: 24, right: 24, ...ANTON, fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 2 }}>MAISON FIRST TEAM</div>
          <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.8)", marginBottom: 18 }}>Capsule anniversaire</span>
          <h2 style={{ ...ANTON, fontSize: "clamp(48px, 6vw, 96px)", lineHeight: 0.86, textTransform: "uppercase" as const, letterSpacing: -2, color: "#fff", marginBottom: 20 }}>
            10 pièces<br />pour 10 ans<br />de basket.
          </h2>
          <p style={{ ...MANROPE(400), fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.85)", maxWidth: 440, marginBottom: 32 }}>
            Du t-shirt brodé au short de basket, on a sorti la collection la plus dense de notre histoire. Chaque pièce porte un numéro, un nom, une histoire.
          </p>
          <a href="#produits" className="pill-btn pill-btn-black">Découvrir la capsule →</a>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, hovered, onHover, onLeave }: { p: typeof PRODUCTS[0]; hovered: boolean; onHover: () => void; onLeave: () => void }) {
  return (
    <a
      href="#"
      style={{ display: "block", textDecoration: "none", color: "#0A0A0A", cursor: "pointer" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image wrapper */}
      <div style={{ position: "relative" as const, aspectRatio: "4/5", background: "#ECE7DD", overflow: "hidden", borderRadius: 4 }}>
        <img
          src={p.img}
          alt={p.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.4s ease, transform 0.6s ease", opacity: hovered && p.hoverImg ? 0 : 1, transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
        {p.hoverImg && (
          <img
            src={p.hoverImg}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.4s ease, transform 0.6s ease", opacity: hovered ? 1 : 0, transform: hovered ? "scale(1.04)" : "scale(1)" }}
          />
        )}
        {p.isNew && (
          <span style={{ position: "absolute", top: 12, left: 12, background: "#FE0000", color: "#fff", ...ANTON, fontSize: 10, letterSpacing: 1.5, padding: "4px 10px", textTransform: "uppercase" as const }}>Nouveau</span>
        )}
        {/* Quick add */}
        <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)", padding: "11px 12px", textAlign: "center" as const, ...MANROPE(800), fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "#0A0A0A", transform: hovered ? "translateY(0)" : "translateY(calc(100% + 12px))", transition: "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)" }}>
          + Ajouter au panier
        </div>
      </div>
      {/* Info */}
      <div style={{ paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div>
          <h3 style={{ ...MANROPE(700), fontSize: 14, color: "#0A0A0A", marginBottom: 4, letterSpacing: 0.2 }}>{p.name}</h3>
          <p style={{ ...MANROPE(500), fontSize: 11, color: "rgba(0,0,0,0.4)", letterSpacing: 0.3 }}>{p.cat} · {p.sizes.join(" · ")}</p>
        </div>
        <span style={{ ...ANTON, fontSize: 20, color: "#0A0A0A", letterSpacing: 0.5, whiteSpace: "nowrap" as const }}>{p.price}€</span>
      </div>
    </a>
  );
}

function ProductsGrid() {
  const [activeCat, setActiveCat] = useState<typeof CATS[number]>("Tout");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const ref = useReveal();

  const filtered = activeCat === "Tout" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);

  return (
    <section id="produits" style={{ background: "#fff", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, gap: 20, flexWrap: "wrap" as const }}>
          <div>
            <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", display: "block", marginBottom: 10 }}>· Tout le shop</span>
            <h2 style={{ ...ANTON, fontSize: "clamp(36px, 4.5vw, 64px)", textTransform: "uppercase" as const, letterSpacing: -1, lineHeight: 0.92, color: "#0A0A0A" }}>
              La sélection<br />du moment.
            </h2>
          </div>
          <span style={{ ...MANROPE(600), fontSize: 13, color: "rgba(0,0,0,0.45)" }}>{filtered.length} produit{filtered.length > 1 ? "s" : ""}</span>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid rgba(0,0,0,0.1)", flexWrap: "wrap" as const }}>
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              style={{
                padding: "9px 18px",
                border: `1.5px solid ${activeCat === c ? "#0A0A0A" : "rgba(0,0,0,0.18)"}`,
                borderRadius: 999,
                background: activeCat === c ? "#0A0A0A" : "transparent",
                color: activeCat === c ? "#fff" : "#0A0A0A",
                ...MANROPE(700),
                fontSize: 12,
                cursor: "pointer",
                letterSpacing: 0.5,
                textTransform: "uppercase" as const,
                transition: "all 0.15s ease",
              }}
            >{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, rowGap: 48 }}>
          {filtered.map(p => (
            <ProductCard
              key={p.id}
              p={p}
              hovered={hoveredId === p.id}
              onHover={() => setHoveredId(p.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LifestyleSection() {
  return (
    <section style={{ background: "#0A0A0A", padding: "0 0 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 12 }}>
          <div style={{ position: "relative" as const, overflow: "hidden", borderRadius: 4, aspectRatio: "4/3" }}>
            <img src="/images/page-shop/lifestyle/lifestyle-shop-1.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
            />
          </div>
          <div style={{ position: "relative" as const, overflow: "hidden", borderRadius: 4, aspectRatio: "4/3" }}>
            <img src="/images/page-shop/lifestyle/lifestyle-shop-2.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
            />
          </div>
          <div style={{ position: "relative" as const, overflow: "hidden", borderRadius: 4, aspectRatio: "4/3" }}>
            <img src="/images/page-shop/lifestyle/lifestyle-shop-3.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBand() {
  const items = [
    { icon: "📦", label: "Livraison offerte à partir de 100€" },
    { icon: "🏀", label: "Drop des 10 ans de First Team" },
    { icon: "★",  label: "En collaboration avec Champion" },
    { icon: "🇫🇷", label: "Made in France" },
  ];
  return (
    <section style={{ background: "#FED000", borderTop: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        {items.map((it, i) => (
          <div key={i} style={{ padding: "28px 32px", display: "flex", alignItems: "center", gap: 14, borderRight: i < 3 ? "1px solid rgba(0,0,0,0.12)" : "none" }}>
            <span style={{ fontSize: 20 }}>{it.icon}</span>
            <span style={{ ...MANROPE(800), fontSize: 13, color: "#0A0A0A", letterSpacing: 0.3, lineHeight: 1.3 }}>{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const ref = useReveal();
  const featured = PRODUCTS.filter(p => p.cat === "Shorts" || p.id === 7);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section style={{ background: "#0A0A0A", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, gap: 20, flexWrap: "wrap" as const }}>
          <div>
            <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FED000", display: "block", marginBottom: 12 }}>· Sur le court</span>
            <h2 style={{ ...ANTON, fontSize: "clamp(36px, 4vw, 60px)", textTransform: "uppercase" as const, letterSpacing: -1, lineHeight: 0.92, color: "#fff" }}>
              Conçu pour jouer.<br /><span style={{ color: "#FED000" }}>Fait pour rester.</span>
            </h2>
          </div>
          <a href="#produits" style={{ ...MANROPE(700), fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.6)", textDecoration: "underline", textUnderlineOffset: 4 }}>Voir tous les produits →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {featured.map(p => (
            <a
              key={p.id}
              href="#"
              style={{ display: "block", textDecoration: "none", color: "#fff" }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div style={{ position: "relative" as const, aspectRatio: "4/5", background: "#ECE7DD", overflow: "hidden", borderRadius: 4 }}>
                <img
                  src={p.img}
                  alt={p.name}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", transform: hoveredId === p.id ? "scale(1.05)" : "scale(1)" }}
                />
                {p.isNew && (
                  <span style={{ position: "absolute", top: 12, left: 12, background: "#FE0000", color: "#fff", ...ANTON, fontSize: 10, letterSpacing: 1.5, padding: "4px 10px", textTransform: "uppercase" as const }}>Nouveau</span>
                )}
              </div>
              <div style={{ paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <div>
                  <h3 style={{ ...MANROPE(700), fontSize: 14, color: "#fff", marginBottom: 4 }}>{p.name}</h3>
                  <p style={{ ...MANROPE(500), fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{p.cat}</p>
                </div>
                <span style={{ ...ANTON, fontSize: 20, color: "#FED000" }}>{p.price}€</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioSection() {
  const ref = useReveal();
  return (
    <section style={{ background: "#F2EEE6", padding: "120px 40px" }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        {/* Texte */}
        <div>
          <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#FE0000", display: "block", marginBottom: 16 }}>· Le studio</span>
          <h2 style={{ ...AWESOME(400), fontStyle: "italic", fontSize: "clamp(40px, 5vw, 80px)", lineHeight: 0.95, letterSpacing: -1.5, color: "#0A0A0A", marginBottom: 28 }}>
            Du basket,<br />cousu main.
          </h2>
          <p style={{ ...MANROPE(400), fontSize: 16, lineHeight: 1.75, color: "rgba(0,0,0,0.65)", marginBottom: 18, maxWidth: 440 }}>
            Chaque pièce de la Maison First Team est dessinée à Paris et fabriquée en France, dans des ateliers que nous visitons chaque saison. Coton bio, encres à base d'eau, pas de production en sur-stock.
          </p>
          <p style={{ ...MANROPE(700), fontSize: 14, color: "#0A0A0A", marginBottom: 36, fontStyle: "italic" }}>
            "Le merch, c'est pas du goodies. C'est du vêtement qu'on a envie de porter dix ans."
          </p>
          <a href="#" className="pill-btn pill-btn-black">Notre fabrication →</a>
        </div>

        {/* Photos grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "260px 200px", gap: 14 }}>
          {/* Grande photo gauche */}
          <div style={{ gridColumn: "1 / 2", gridRow: "1 / 3", position: "relative" as const, background: "#FED000", overflow: "hidden" }}>
            <img
              src="/images/page-shop/lifestyle/lifestyle-urban-1.jpg"
              alt=""
              style={{ position: "absolute", inset: 14, width: "calc(100% - 28px)", height: "calc(100% - 28px)", objectFit: "cover" }}
            />
          </div>
          {/* Petite photo haut-droit */}
          <div style={{ position: "relative" as const, overflow: "hidden" }}>
            <img
              src="/images/page-shop/lifestyle/studio-1.jpg"
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Bloc stat bas-droit */}
          <div style={{ background: "#FE0000", padding: 18, display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
            <span style={{ ...ANTON, fontSize: 48, color: "#fff", letterSpacing: -1, lineHeight: 0.9 }}>100%</span>
            <span style={{ ...MANROPE(700), fontSize: 11, color: "rgba(255,255,255,0.8)", letterSpacing: 1.5, textTransform: "uppercase" as const, marginTop: 4 }}>Coton bio</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section style={{ background: "#FED000", padding: "80px 40px", position: "relative" as const, overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: "#0A0A0A", display: "block", marginBottom: 12, opacity: 0.55 }}>· Drop alert</span>
          <h2 style={{ ...ANTON, fontSize: "clamp(36px, 4.5vw, 68px)", textTransform: "uppercase" as const, letterSpacing: -1, lineHeight: 0.92, color: "#0A0A0A" }}>
            Sois prévenu<br />du prochain drop.
          </h2>
          <p style={{ ...MANROPE(400), fontSize: 14, color: "rgba(0,0,0,0.55)", marginTop: 16, maxWidth: 400 }}>Une fois par mois, pas plus. Promis.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
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

function BigMarquee() {
  const items = ["★ FIRST TEAM SHOP", "CAPSULE 10 ANS", "★ MADE IN FRANCE", "QUALITÉ CHAMPION", "★ MAISON FIRST TEAM", "DROP 2026"];
  const doubled = [...items, ...items];
  return (
    <section style={{ background: "#0A0A0A", padding: "22px 0", overflow: "hidden", borderTop: "1px solid #1a1a1a" }}>
      <div style={{ display: "flex", gap: 64, animation: "marquee-design 36s linear infinite", whiteSpace: "nowrap" as const }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ ...ANTON, fontSize: 36, color: t.startsWith("★") ? "#FED000" : "rgba(255,255,255,0.18)", letterSpacing: -0.5, textTransform: "uppercase" as const }}>{t}</span>
        ))}
      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <main style={{ background: "#0A0A0A" }}>
      <AnnouncementBar />
      <Hero />
      <EditoBand />
      <PresentationSection />
      <ProductsGrid />
      <LifestyleSection />
      <InfoBand />
      <FeaturedProducts />
      <BigMarquee />
      <StudioSection />
      <Newsletter />
    </main>
  );
}
