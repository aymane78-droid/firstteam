"use client";
// Badge "NOUVEAU" : affiché si le produit a le tag "nouveau" dans Shopify.
// Pour ajouter un produit sans tag, ajoutez-le à la NOUVEAU_WHITELIST ci-dessous.
import { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import type { ShopifyProduct } from "@/lib/shopify-queries";

const NOUVEAU_WHITELIST: string[] = []; // handles Shopify supplémentaires

const ANTON: React.CSSProperties = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number): React.CSSProperties => ({
  fontFamily: "var(--font-manrope), Manrope, sans-serif",
  fontWeight: w,
});

const FILTERS = [
  { label: "Tout", gid: null },
  { label: "T-Shirts", gid: "gid://shopify/Collection/695894180215" },
  { label: "Shorts", gid: "gid://shopify/Collection/695894049143" },
  { label: "Accessoires", gid: "gid://shopify/Collection/695894081911" },
] as const;

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: currencyCode }).format(
    parseFloat(amount)
  );
}

function isNouveau(product: ShopifyProduct) {
  return product.tags.includes("nouveau") || NOUVEAU_WHITELIST.includes(product.handle);
}

function getSizes(product: ShopifyProduct): string[] {
  const seen = new Set<string>();
  const sizes: string[] = [];
  for (const v of product.variants.nodes) {
    const size = v.selectedOptions.find((o) => o.name === "Taille" || o.name === "Size")?.value;
    if (size && !seen.has(size)) { seen.add(size); sizes.push(size); }
  }
  return sizes;
}

function isSingleVariant(product: ShopifyProduct) {
  return product.variants.nodes.length === 1;
}

// ─── Image carousel inside each product card ─────────────────────────────────

interface ImageCarouselProps {
  product: ShopifyProduct;
  hovered: boolean;
}

function ImageCarousel({ product, hovered }: ImageCarouselProps) {
  const images = product.images.nodes;
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (images.length === 0) {
    return <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 48 }}>🏀</span></div>;
  }

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); };

  return (
    <>
      {images.map((img, i) => (
        <img
          key={i}
          src={img.url}
          alt={img.altText ?? product.title}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.35s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transitionProperty: "opacity, transform",
            transitionDuration: "0.35s, 0.6s",
          }}
        />
      ))}

      {/* Arrows — visible on hover, only if >1 image */}
      {images.length > 1 && hovered && (
        <>
          <button
            onClick={prev}
            aria-label="Image précédente"
            style={{
              position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
              zIndex: 4, background: "rgba(255,255,255,0.85)", border: "none",
              width: 30, height: 30, borderRadius: "50%", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: "#0A0A0A",
            }}
          >←</button>
          <button
            onClick={next}
            aria-label="Image suivante"
            style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              zIndex: 4, background: "rgba(255,255,255,0.85)", border: "none",
              width: 30, height: 30, borderRadius: "50%", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: "#0A0A0A",
            }}
          >→</button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div style={{
          position: "absolute", bottom: 10, left: 0, right: 0,
          display: "flex", justifyContent: "center", gap: 5, zIndex: 4,
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              aria-label={`Photo ${i + 1}`}
              style={{
                width: i === idx ? 16 : 6, height: 6, borderRadius: 999,
                padding: 0, border: "none", cursor: "pointer",
                background: i === idx ? "#fff" : "rgba(255,255,255,0.5)",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Touch swipe */}
      <div
        style={{ position: "absolute", inset: 0, zIndex: 3 }}
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchStartX.current === null) return;
          const dx = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(dx) > 40) setIdx(i => dx > 0 ? (i + 1) % images.length : (i - 1 + images.length) % images.length);
          touchStartX.current = null;
        }}
      />
    </>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: ShopifyProduct;
  onSelectSize: () => void;
}

function ProductCard({ product, onSelectSize }: ProductCardProps) {
  const { addToCart, loading } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const price = product.priceRange.minVariantPrice;
  const sizes = getSizes(product);
  const single = isSingleVariant(product);

  async function handleDirectAdd(e: React.MouseEvent) {
    e.stopPropagation();
    const variantId = product.variants.nodes[0].id;
    await addToCart(variantId, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Image carousel */}
      <div style={{ position: "relative", aspectRatio: "4/5", background: "#ECE7DD", overflow: "hidden", borderRadius: 4 }}>
        <ImageCarousel product={product} hovered={hovered} />

        {isNouveau(product) && (
          <span style={{ position: "absolute", top: 12, left: 12, background: "#FE0000", color: "#fff", ...ANTON, fontSize: 10, letterSpacing: 1.5, padding: "4px 10px", textTransform: "uppercase", zIndex: 5 }}>
            Nouveau
          </span>
        )}

        {/* Quick add or size selector */}
        {single ? (
          <button
            onClick={handleDirectAdd}
            disabled={loading || !product.variants.nodes[0].availableForSale}
            aria-label={`Ajouter ${product.title} au panier`}
            style={{
              position: "absolute", left: 12, right: 12, bottom: 12, zIndex: 5,
              background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)",
              padding: "11px 12px", textAlign: "center",
              ...MANROPE(800), fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#0A0A0A",
              border: "none", cursor: "pointer",
              transform: hovered ? "translateY(0)" : "translateY(calc(100% + 12px))",
              transition: "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)",
            }}
          >
            {added ? "Ajouté ✓" : product.variants.nodes[0].availableForSale ? "+ Ajouter au panier" : "Épuisé"}
          </button>
        ) : (
          <button
            onClick={onSelectSize}
            aria-label={`Choisir la taille pour ${product.title}`}
            style={{
              position: "absolute", left: 12, right: 12, bottom: 12, zIndex: 5,
              background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)",
              padding: "11px 12px", textAlign: "center",
              ...MANROPE(800), fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#0A0A0A",
              border: "none", cursor: "pointer",
              transform: hovered ? "translateY(0)" : "translateY(calc(100% + 12px))",
              transition: "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)",
            }}
          >
            + Choisir ma taille
          </button>
        )}
      </div>

      {/* Info */}
      <div style={{ paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div>
          {/* TODO: noms produits à mettre à jour avec FT_BriefShooting_v3 */}
          <h3 style={{ ...MANROPE(700), fontSize: 14, color: "#0A0A0A", marginBottom: 4, letterSpacing: 0.2 }}>{product.title}</h3>
          {sizes.length > 0 && (
            <p style={{ ...MANROPE(500), fontSize: 11, color: "rgba(0,0,0,0.4)", letterSpacing: 0.3 }}>
              {sizes.join(" · ")}
            </p>
          )}
        </div>
        {/* TODO: prix à mettre à jour avec les vrais prix avant lancement */}
        <span style={{ ...ANTON, fontSize: 20, color: "#0A0A0A", letterSpacing: 0.5, whiteSpace: "nowrap", flexShrink: 0 }}>
          {formatPrice(price.amount, price.currencyCode)}
        </span>
      </div>
    </div>
  );
}

// ─── Quick buy bottom sheet ───────────────────────────────────────────────────

interface QuickBuySheetProps {
  product: ShopifyProduct;
  onClose: () => void;
}

function QuickBuySheet({ product, onClose }: QuickBuySheetProps) {
  const { addToCart, loading } = useCart();
  const variants = product.variants.nodes;
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? "");
  const [added, setAdded] = useState(false);

  const selected = variants.find(v => v.id === selectedId) ?? variants[0];
  const sizeOptions = variants.map(v => ({
    id: v.id,
    label: v.selectedOptions.find(o => o.name === "Taille" || o.name === "Size")?.value ?? v.title,
    available: v.availableForSale,
  }));

  async function handleAdd() {
    if (!selected) return;
    await addToCart(selected.id, 1);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 900);
  }

  return (
    <>
      {/* Overlay — semi-transparent, ne couvre que partiellement */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
          zIndex: 600, animation: "fadeInOverlay 0.2s ease",
        }}
      />

      {/* Bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Choisir une taille — ${product.title}`}
        style={{
          position: "fixed", left: 0, right: 0, bottom: 0,
          background: "#fff", zIndex: 601, borderRadius: "16px 16px 0 0",
          padding: "24px 24px 40px",
          animation: "slideUp 0.3s cubic-bezier(0.2,0.8,0.2,1)",
          maxHeight: "70vh", overflowY: "auto",
        }}
      >
        {/* Handle */}
        <div style={{ width: 40, height: 4, borderRadius: 999, background: "rgba(0,0,0,0.15)", margin: "0 auto 20px" }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <h2 style={{ ...ANTON, fontSize: 22, textTransform: "uppercase", letterSpacing: -0.5, color: "#0A0A0A" }}>{product.title}</h2>
            {product.description && (
              <p style={{ ...MANROPE(400), fontSize: 13, color: "rgba(0,0,0,0.55)", lineHeight: 1.6, marginTop: 6, maxWidth: 480 }}>
                {product.description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "rgba(0,0,0,0.4)", padding: "0 0 0 16px", flexShrink: 0 }}
          >✕</button>
        </div>

        <p style={{ ...ANTON, fontSize: 24, color: "#0A0A0A", marginBottom: 20 }}>
          {formatPrice(selected?.price.amount ?? "0", selected?.price.currencyCode ?? "EUR")}
        </p>

        {/* Size buttons */}
        <p style={{ ...MANROPE(700), fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#0A0A0A", marginBottom: 10 }}>Taille</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {sizeOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => opt.available && setSelectedId(opt.id)}
              aria-pressed={selectedId === opt.id}
              disabled={!opt.available}
              style={{
                padding: "10px 18px", borderRadius: 6,
                border: `1.5px solid ${selectedId === opt.id ? "#0A0A0A" : "rgba(0,0,0,0.18)"}`,
                background: selectedId === opt.id ? "#0A0A0A" : "transparent",
                color: !opt.available ? "rgba(0,0,0,0.25)" : selectedId === opt.id ? "#fff" : "#0A0A0A",
                ...MANROPE(700), fontSize: 14,
                cursor: opt.available ? "pointer" : "not-allowed",
                textDecoration: !opt.available ? "line-through" : "none",
                transition: "all 0.15s ease",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          disabled={loading || !selected?.availableForSale || added}
          style={{
            width: "100%", padding: "16px 24px", border: "none",
            cursor: loading || added ? "default" : "pointer",
            background: added ? "#002EFE" : !selected?.availableForSale ? "rgba(0,0,0,0.15)" : "#FE0000",
            color: "#fff", ...ANTON, fontSize: 16, letterSpacing: 0.5, textTransform: "uppercase",
            borderRadius: 6, transition: "background 0.2s ease",
          }}
        >
          {added ? "Ajouté ✓" : loading ? "Chargement…" : !selected?.availableForSale ? "Épuisé" : "Ajouter au panier"}
        </button>
      </div>

      <style>{`
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </>
  );
}

// ─── Shop grid ────────────────────────────────────────────────────────────────

interface Props {
  products: ShopifyProduct[];
}

export default function ShopGrid({ products }: Props) {
  const [activeGid, setActiveGid] = useState<string | null>(null);
  const [quickBuyProduct, setQuickBuyProduct] = useState<ShopifyProduct | null>(null);

  const filtered = activeGid
    ? products.filter((p) => p.collections.nodes.some((c) => c.id === activeGid))
    : products;

  if (products.length === 0) {
    return (
      <section id="produits" style={{ background: "#fff", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "80px 0" }}>
          <p style={{ ...MANROPE(600), fontSize: 18, color: "rgba(0,0,0,0.4)" }}>
            Catalogue indisponible, réessayez plus tard.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="produits" style={{ background: "#fff", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, gap: 20, flexWrap: "wrap" }}>
          <div>
            <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#FE0000", display: "block", marginBottom: 10 }}>· SUMMER EDITION 26</span>
            <h2 style={{ ...ANTON, fontSize: "clamp(36px, 4.5vw, 64px)", textTransform: "uppercase", letterSpacing: -1, lineHeight: 0.92, color: "#0A0A0A" }}>
              L&apos;intégralité<br />du vestiaire.
            </h2>
          </div>
          <span style={{ ...MANROPE(600), fontSize: 13, color: "rgba(0,0,0,0.45)" }}>
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid rgba(0,0,0,0.1)", flexWrap: "wrap" }}>
          {FILTERS.map((f) => {
            const isActive = activeGid === f.gid;
            return (
              <button
                key={f.label}
                onClick={() => setActiveGid(f.gid)}
                aria-pressed={isActive}
                style={{
                  padding: "9px 18px",
                  border: `1.5px solid ${isActive ? "#0A0A0A" : "rgba(0,0,0,0.18)"}`,
                  borderRadius: 999,
                  background: isActive ? "#0A0A0A" : "transparent",
                  color: isActive ? "#fff" : "#0A0A0A",
                  ...MANROPE(700), fontSize: 12, cursor: "pointer",
                  letterSpacing: 0.5, textTransform: "uppercase",
                  transition: "all 0.15s ease",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24, rowGap: 48 }}>
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectSize={() => setQuickBuyProduct(product)}
            />
          ))}
        </div>
      </div>

      {/* Quick buy sheet (no modal) */}
      {quickBuyProduct && (
        <QuickBuySheet product={quickBuyProduct} onClose={() => setQuickBuyProduct(null)} />
      )}
    </section>
  );
}
