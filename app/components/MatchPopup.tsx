"use client";
// Pop-up « prochains matchs EuroLeague / EuroCup » : s'affiche à l'arrivée sur le site,
// une seule fois par visite, et disparaît d'elle-même après le dernier match.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ANTON: React.CSSProperties = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number): React.CSSProperties => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

const MATCHS = [
  { date: "9 déc.", jour: "Mercredi", affiche: "Tofaş – Bourg-en-Bresse", heure: "18h00", comp: "EuroCup" },
  { date: "11 déc.", jour: "Vendredi", affiche: "Panathinaïkos – Olympiakos", heure: "20h00", comp: "EuroLeague" },
];
const FIN = new Date("2026-12-11T22:30:00+01:00"); // après le dernier match, la pop-up ne s'affiche plus
const CLE = "ft-popup-matchs-dec26";
const PAGES_SANS_POPUP = ["/quiz", "/tombola"];

export default function MatchPopup() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (Date.now() > +FIN) return;
    if (PAGES_SANS_POPUP.some((p) => pathname?.startsWith(p))) return;
    try { if (sessionStorage.getItem(CLE)) return; } catch {}
    const t = setTimeout(() => setOuvert(true), 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") fermer(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ouvert]);

  function fermer() {
    setOuvert(false);
    try { sessionStorage.setItem(CLE, "1"); } catch {}
  }

  if (!ouvert) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="ft-popup-titre" onClick={fermer}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "ftPopFond .25s ease-out" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", width: "100%", maxWidth: 520, background: "#0A0A0A", color: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.5)", animation: "ftPopCarte .35s ease-out" }}>
        <div style={{ display: "flex", height: 5 }}>
          <div style={{ flex: 1, background: "#FE0000" }} /><div style={{ flex: 1, background: "#FED000" }} /><div style={{ flex: 1, background: "#002EFE" }} />
        </div>
        <button onClick={fermer} aria-label="Fermer"
          style={{ position: "absolute", top: 16, right: 14, width: 36, height: 36, borderRadius: 18, border: "none", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 20, lineHeight: 1, cursor: "pointer" }}>
          ×
        </button>
        <div style={{ padding: "30px 30px 28px" }}>
          <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#FE0000" }}>· En live sur First Team</span>
          <h2 id="ft-popup-titre" style={{ ...ANTON, fontSize: "clamp(30px, 7vw, 40px)", lineHeight: 0.95, textTransform: "uppercase", margin: "10px 40px 22px 0" }}>
            Les prochains matchs <span style={{ color: "#FED000" }}>EuroLeague / EuroCup</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
            {MATCHS.map((m) => (
              <div key={m.affiche} style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "14px 16px" }}>
                <div style={{ textAlign: "center", minWidth: 62 }}>
                  <div style={{ ...ANTON, fontSize: 24, lineHeight: 1, color: "#FED000" }}>{m.date}</div>
                  <div style={{ ...MANROPE(700), fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{m.jour}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ ...ANTON, fontSize: 20, lineHeight: 1.1, textTransform: "uppercase" }}>{m.affiche}</div>
                  <div style={{ ...MANROPE(600), fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{m.comp} · {m.heure}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ ...MANROPE(700), fontSize: 15, marginBottom: 16 }}>Gratuit et en live sur YouTube et Twitch.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://youtube.com/@firstteam" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-red" onClick={fermer}>YouTube ↗</a>
            <a href="https://www.twitch.tv/firstteam101" target="_blank" rel="noopener noreferrer" className="pill-btn" onClick={fermer} style={{ background: "#9146FF", color: "#fff" }}>Twitch ↗</a>
          </div>
        </div>
      </div>
      <style>{`@keyframes ftPopFond{from{opacity:0}to{opacity:1}}@keyframes ftPopCarte{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
