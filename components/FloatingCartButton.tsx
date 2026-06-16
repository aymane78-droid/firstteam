"use client";
import { useCart } from "@/context/CartContext";

const ANTON   = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

export default function FloatingCartButton() {
  const { cart, openCart } = useCart();
  const itemCount = cart?.lines.nodes.reduce((acc, l) => acc + l.quantity, 0) ?? 0;

  return (
    <button
      onClick={openCart}
      aria-label={`Ouvrir le panier${itemCount > 0 ? ` (${itemCount} article${itemCount > 1 ? "s" : ""})` : ""}`}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 99,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#0A0A0A",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 999,
        padding: "12px 20px",
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "#FED000";
        el.style.boxShadow = "0 4px 28px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.15)";
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.35)";
      }}
    >
      {/* Icône panier */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      <span style={{ ...MANROPE(700), fontSize: 13, color: "#fff", letterSpacing: 0.3 }}>Panier</span>

      {/* Badge compteur */}
      {itemCount > 0 && (
        <span style={{
          ...ANTON,
          fontSize: 11,
          lineHeight: 1,
          background: "#FED000",
          color: "#0A0A0A",
          borderRadius: 999,
          padding: "3px 7px",
          minWidth: 20,
          textAlign: "center",
        }}>
          {itemCount}
        </span>
      )}
    </button>
  );
}
