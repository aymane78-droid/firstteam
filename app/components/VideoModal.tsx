"use client";
import { useEffect } from "react";

const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

export function VideoModal({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
      onClick={onClose}
    >
      <div style={{ width: "100%", maxWidth: 1000 }} onClick={e => e.stopPropagation()}>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 8, overflow: "hidden", background: "#000" }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
        <button
          onClick={onClose}
          style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "9px 18px", borderRadius: 999, cursor: "pointer", ...MANROPE(600), fontSize: 13 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 14, height: 14 }}><path d="M18 6 6 18M6 6l12 12" /></svg>
          Fermer (Echap)
        </button>
      </div>
    </div>
  );
}
