"use client";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

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

export default function CartDrawer() {
  const { cart, isOpen, loading, closeCart, removeFromCart, updateQuantity } = useCart();

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeCart]);

  const lines = cart?.lines.nodes ?? [];
  const subtotal = cart?.cost.subtotalAmount;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          zIndex: 400, opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(420px, 100vw)",
          background: "#F2EEE6",
          zIndex: 401,
          display: "flex", flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.18)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid rgba(0,0,0,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ ...ANTON, fontSize: 22, textTransform: "uppercase", letterSpacing: 0.5, color: "#0A0A0A" }}>Panier</span>
            {lines.length > 0 && (
              <span style={{ background: "#FE0000", color: "#fff", borderRadius: 999, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", ...MANROPE(800), fontSize: 11 }}>
                {lines.reduce((acc, l) => acc + l.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Fermer le panier"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6, fontSize: 22, color: "#0A0A0A", lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
          {lines.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, padding: "60px 0" }}>
              <span style={{ fontSize: 48 }}>🏀</span>
              <p style={{ ...MANROPE(600), fontSize: 16, color: "rgba(0,0,0,0.55)", textAlign: "center" }}>
                Ton panier est vide.
              </p>
              <button
                onClick={closeCart}
                style={{ ...MANROPE(700), fontSize: 13, letterSpacing: 0.5, textTransform: "uppercase", padding: "11px 24px", borderRadius: 999, background: "#0A0A0A", color: "#fff", border: "none", cursor: "pointer" }}
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <div style={{ paddingTop: 16, paddingBottom: 16, display: "flex", flexDirection: "column", gap: 16 }}>
              {lines.map((line) => {
                const img = line.merchandise.product.images.nodes[0];
                const size = line.merchandise.selectedOptions.find(o => o.name === "Taille" || o.name === "Size")?.value;
                return (
                  <div key={line.id} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    {/* Image */}
                    {img && (
                      <div style={{ width: 80, height: 96, flexShrink: 0, background: "#ECE7DD", borderRadius: 4, overflow: "hidden" }}>
                        <img src={img.url} alt={img.altText ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ ...MANROPE(700), fontSize: 14, color: "#0A0A0A", marginBottom: 3, lineHeight: 1.3 }}>{line.merchandise.product.title}</p>
                      {size && <p style={{ ...MANROPE(500), fontSize: 12, color: "rgba(0,0,0,0.45)", marginBottom: 10 }}>Taille : {size}</p>}
                      {/* Qty + remove */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: 6, overflow: "hidden" }}>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            disabled={loading}
                            aria-label="Diminuer la quantité"
                            style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0A" }}
                          >−</button>
                          <span style={{ width: 28, textAlign: "center", ...MANROPE(700), fontSize: 14, color: "#0A0A0A" }}>{line.quantity}</span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            disabled={loading}
                            aria-label="Augmenter la quantité"
                            style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0A" }}
                          >+</button>
                        </div>
                        <button
                          onClick={() => removeFromCart(line.id)}
                          disabled={loading}
                          aria-label="Supprimer cet article"
                          style={{ background: "none", border: "none", cursor: "pointer", ...MANROPE(600), fontSize: 12, color: "rgba(0,0,0,0.4)", textDecoration: "underline" }}
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                    {/* Price */}
                    <div style={{ flexShrink: 0 }}>
                      <span style={{ ...ANTON, fontSize: 18, color: "#0A0A0A" }}>
                        {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && subtotal && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(0,0,0,0.12)", background: "#F2EEE6" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ ...MANROPE(600), fontSize: 14, color: "rgba(0,0,0,0.6)" }}>Sous-total</span>
              <span style={{ ...ANTON, fontSize: 22, color: "#0A0A0A" }}>
                {formatPrice(subtotal.amount, subtotal.currencyCode)}
              </span>
            </div>
            <p style={{ ...MANROPE(400), fontSize: 11, color: "rgba(0,0,0,0.4)", marginBottom: 14 }}>
              Frais de port calculés à la commande.
            </p>
            <a
              href={cart!.checkoutUrl}
              style={{
                display: "block", width: "100%", textAlign: "center",
                padding: "15px 24px", background: "#FE0000", color: "#fff",
                ...ANTON, fontSize: 16, letterSpacing: 0.5, textTransform: "uppercase",
                textDecoration: "none", borderRadius: 6,
              }}
            >
              Passer au paiement →
            </a>
          </div>
        )}

        {/* Loading overlay */}
        {loading && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(242,238,230,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
            <div style={{ width: 32, height: 32, border: "3px solid rgba(0,0,0,0.1)", borderTopColor: "#FE0000", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
