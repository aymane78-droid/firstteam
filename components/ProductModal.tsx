"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import type { ShopifyProduct } from "@/lib/shopify-queries";

const ANTON: React.CSSProperties = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number): React.CSSProperties => ({
  fontFamily: "var(--font-manrope), Manrope, sans-serif",
  fontWeight: w,
});

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: currencyCode }).format(
    parseFloat(amount)
  );
}

interface Props {
  product: ShopifyProduct;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart, loading } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants.nodes[0]?.id ?? ""
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variants = product.variants.nodes;
  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const mainImage = product.images.nodes[0];

  // Sizes are selectedOptions where name is "Taille" or "Size"
  const sizeOptions = variants.map((v) => ({
    id: v.id,
    label: v.selectedOptions.find((o) => o.name === "Taille" || o.name === "Size")?.value ?? v.title,
    available: v.availableForSale,
  }));
  const hasMultipleSizes = sizeOptions.length > 1;

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  async function handleAddToCart() {
    if (!selectedVariant) return;
    await addToCart(selectedVariant.id, quantity);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 800);
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          zIndex: 500, animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
        style={{
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(900px, 95vw)", maxHeight: "90vh",
          background: "#fff", borderRadius: 8, zIndex: 501,
          display: "flex", overflow: "hidden",
          animation: "modalIn 0.25s cubic-bezier(0.2,0.8,0.2,1)",
        }}
      >
        {/* Left — image */}
        <div style={{ width: "45%", flexShrink: 0, background: "#ECE7DD", position: "relative" }}>
          {mainImage ? (
            <img
              src={mainImage.url}
              alt={mainImage.altText ?? product.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 64 }}>🏀</span>
            </div>
          )}
          {product.tags.includes("nouveau") && (
            <span style={{ position: "absolute", top: 16, left: 16, background: "#FE0000", color: "#fff", ...ANTON, fontSize: 10, letterSpacing: 1.5, padding: "4px 10px", textTransform: "uppercase" }}>
              Nouveau
            </span>
          )}
        </div>

        {/* Right — details */}
        <div style={{ flex: 1, overflowY: "auto", padding: "36px 32px", display: "flex", flexDirection: "column" }}>
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Fermer"
            style={{ alignSelf: "flex-end", background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "rgba(0,0,0,0.4)", marginBottom: 8 }}
          >
            ✕
          </button>

          <span style={{ ...MANROPE(700), fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#FE0000", marginBottom: 8 }}>
            First Team Shop
          </span>
          <h2 style={{ ...ANTON, fontSize: "clamp(24px, 3vw, 36px)", textTransform: "uppercase", letterSpacing: -0.5, color: "#0A0A0A", marginBottom: 12 }}>
            {product.title}
          </h2>

          <p style={{ ...ANTON, fontSize: 28, color: "#0A0A0A", marginBottom: 20 }}>
            {formatPrice(selectedVariant?.price.amount ?? "0", selectedVariant?.price.currencyCode ?? "EUR")}
          </p>

          {product.description && (
            <p style={{ ...MANROPE(400), fontSize: 14, lineHeight: 1.7, color: "rgba(0,0,0,0.6)", marginBottom: 24 }}>
              {product.description}
            </p>
          )}

          {/* Size selector */}
          {hasMultipleSizes && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ ...MANROPE(700), fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#0A0A0A", marginBottom: 10 }}>
                Taille
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {sizeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => opt.available && setSelectedVariantId(opt.id)}
                    aria-pressed={selectedVariantId === opt.id}
                    disabled={!opt.available}
                    style={{
                      padding: "9px 16px", borderRadius: 6,
                      border: `1.5px solid ${selectedVariantId === opt.id ? "#0A0A0A" : "rgba(0,0,0,0.18)"}`,
                      background: selectedVariantId === opt.id ? "#0A0A0A" : "transparent",
                      color: !opt.available ? "rgba(0,0,0,0.25)" : selectedVariantId === opt.id ? "#fff" : "#0A0A0A",
                      ...MANROPE(700), fontSize: 13, cursor: opt.available ? "pointer" : "not-allowed",
                      textDecoration: !opt.available ? "line-through" : "none",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ ...MANROPE(700), fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#0A0A0A", marginBottom: 10 }}>
              Quantité
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid rgba(0,0,0,0.18)", borderRadius: 6, overflow: "hidden" }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Diminuer"
                style={{ width: 40, height: 40, background: "none", border: "none", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0A" }}
              >−</button>
              <span style={{ width: 40, textAlign: "center", ...MANROPE(700), fontSize: 15, color: "#0A0A0A" }}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Augmenter"
                style={{ width: 40, height: 40, background: "none", border: "none", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0A" }}
              >+</button>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleAddToCart}
            disabled={loading || !selectedVariant?.availableForSale || added}
            style={{
              padding: "16px 24px", borderRadius: 6, border: "none", cursor: loading || added ? "default" : "pointer",
              background: added ? "#002EFE" : !selectedVariant?.availableForSale ? "rgba(0,0,0,0.15)" : "#FE0000",
              color: "#fff", ...ANTON, fontSize: 16, letterSpacing: 0.5, textTransform: "uppercase",
              transition: "background 0.2s ease",
            }}
          >
            {added ? "Ajouté ✓" : loading ? "Chargement…" : !selectedVariant?.availableForSale ? "Épuisé" : "Ajouter au panier"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>
    </>
  );
}
