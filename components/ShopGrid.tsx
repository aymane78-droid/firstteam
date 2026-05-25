"use client";
// Badge "NOUVEAU" : affiché si le produit a le tag "nouveau" dans Shopify.
// Pour ajouter un produit sans tag, ajoutez-le à la NOUVEAU_WHITELIST ci-dessous.
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import ProductModal from "./ProductModal";
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

interface ProductCardProps {
  product: ShopifyProduct;
  onOpenModal: () => void;
}

function ProductCard({ product, onOpenModal }: ProductCardProps) {
  const { addToCart, loading } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const img = product.images.nodes[0];
  const hoverImg = product.images.nodes[1];
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
      onClick={onOpenModal}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "4/5", background: "#ECE7DD", overflow: "hidden", borderRadius: 4 }}>
        {img && (
          <img
            src={img.url}
            alt={img.altText ?? product.title}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
              transition: "opacity 0.4s ease, transform 0.6s ease",
              opacity: hovered && hoverImg ? 0 : 1,
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        )}
        {hoverImg && (
          <img
            src={hoverImg.url}
            alt=""
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
              transition: "opacity 0.4s ease, transform 0.6s ease",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        )}
        {isNouveau(product) && (
          <span style={{ position: "absolute", top: 12, left: 12, background: "#FE0000", color: "#fff", ...ANTON, fontSize: 10, letterSpacing: 1.5, padding: "4px 10px", textTransform: "uppercase" }}>
            Nouveau
          </span>
        )}

        {/* Quick add or open modal */}
        {single ? (
          <button
            onClick={handleDirectAdd}
            disabled={loading || !product.variants.nodes[0].availableForSale}
            aria-label={`Ajouter ${product.title} au panier`}
            style={{
              position: "absolute", left: 12, right: 12, bottom: 12,
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
          <div
            style={{
              position: "absolute", left: 12, right: 12, bottom: 12,
              background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)",
              padding: "11px 12px", textAlign: "center",
              ...MANROPE(800), fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#0A0A0A",
              transform: hovered ? "translateY(0)" : "translateY(calc(100% + 12px))",
              transition: "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)",
            }}
          >
            + Choisir une taille
          </div>
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

interface Props {
  products: ShopifyProduct[];
}

export default function ShopGrid({ products }: Props) {
  const [activeGid, setActiveGid] = useState<string | null>(null);
  const [modalProduct, setModalProduct] = useState<ShopifyProduct | null>(null);

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
              onOpenModal={() => setModalProduct(product)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalProduct && (
        <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
      )}
    </section>
  );
}
