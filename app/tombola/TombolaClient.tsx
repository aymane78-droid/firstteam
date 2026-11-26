"use client";
import { useEffect, useRef, useState } from "react";

const ANTON: React.CSSProperties = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number): React.CSSProperties => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });
const RED = "#FE0000", YELLOW = "#FED000", BLUE = "#002EFE", BLACK = "#0A0A0A";

const MIN = 1, MAX = 100;
const STORE = "ft-tombola"; // les numéros déjà tirés sont gardés dans ce navigateur (survit à un rechargement)

/** Tirage équitable parmi les numéros restants (aléatoire cryptographique). */
function tirer(restants: number[]) {
  const buf = new Uint32Array(1);
  const limite = Math.floor(0x100000000 / restants.length) * restants.length;
  do { crypto.getRandomValues(buf); } while (buf[0] >= limite);
  return restants[buf[0] % restants.length];
}

export default function TombolaClient() {
  const [tires, setTires] = useState<number[]>([]); // dans l'ordre, le dernier = gagnant actuel
  const [affiche, setAffiche] = useState<number | null>(null);
  const [roule, setRoule] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const saved: number[] = JSON.parse(localStorage.getItem(STORE) ?? "[]");
      if (Array.isArray(saved) && saved.length) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- reprise depuis localStorage (inaccessible au rendu serveur)
        setTires(saved); setAffiche(saved[saved.length - 1]);
      }
    } catch {}
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  const tous = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);
  const restants = tous.filter((n) => !tires.includes(n));

  function lancer() {
    if (roule || restants.length === 0) return;
    setConfirmReset(false);
    setRoule(true);
    const gagnant = tirer(restants);
    const debut = Date.now();
    const duree = 2600;
    // défilement qui ralentit avant de s'arrêter sur le gagnant
    const tick = () => {
      const t = Date.now() - debut;
      if (t >= duree) {
        const next = [...tires, gagnant];
        setTires(next); setAffiche(gagnant); setRoule(false);
        try { localStorage.setItem(STORE, JSON.stringify(next)); } catch {}
        return;
      }
      setAffiche(restants[Math.floor(Math.random() * restants.length)]);
      timer.current = setTimeout(tick, 40 + (t / duree) ** 2 * 260);
    };
    tick();
  }

  function reset() {
    if (!confirmReset) { setConfirmReset(true); return; }
    setTires([]); setAffiche(null); setConfirmReset(false);
    try { localStorage.removeItem(STORE); } catch {}
  }

  const gagnantActuel = !roule && tires.length > 0 ? tires[tires.length - 1] : null;

  return (
    <main style={{ minHeight: "100svh", background: BLACK, color: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", height: 5 }}>
        <div style={{ flex: 1, background: RED }} /><div style={{ flex: 1, background: YELLOW }} /><div style={{ flex: 1, background: BLUE }} />
      </div>

      <div style={{ flex: 1, width: "100%", maxWidth: 1100, margin: "0 auto", padding: "36px 24px 40px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ width: 113, height: 26, overflow: "hidden", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/logo/ft-monogramme-noir.png" alt="First Team" style={{ position: "absolute", width: 270, height: 152, left: -80, top: -63, maxWidth: "none", filter: "brightness(0) invert(1)" }} />
          </div>
          <span style={{ ...MANROPE(700), fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
            {restants.length} numéro{restants.length > 1 ? "s" : ""} restant{restants.length > 1 ? "s" : ""} sur {MAX}
          </span>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 0" }}>
          <span style={{ ...MANROPE(800), fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: RED }}>· La tombola First Team</span>
          <h1 style={{ ...ANTON, fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.9, textTransform: "uppercase", margin: "12px 0 28px" }}>
            {gagnantActuel !== null ? "Le numéro gagnant" : roule ? "Tirage en cours…" : "Prêt pour le tirage ?"}
          </h1>

          <div className={gagnantActuel !== null ? "tb-pop" : undefined} style={{
            ...ANTON, fontVariantNumeric: "tabular-nums", lineHeight: 1,
            fontSize: "clamp(160px, 30vw, 340px)",
            color: affiche === null ? "rgba(255,255,255,0.12)" : roule ? "#fff" : YELLOW,
            textShadow: gagnantActuel !== null ? "0 0 60px rgba(254,208,0,0.35)" : "none",
            minWidth: "2ch",
          }}>
            {affiche ?? "?"}
          </div>

          <button onClick={lancer} disabled={roule || restants.length === 0} className="pill-btn pill-btn-red"
            style={{ marginTop: 36, padding: "22px 48px", fontSize: 20, border: "none", cursor: roule ? "wait" : "pointer", opacity: restants.length === 0 ? 0.4 : 1 }}>
            {restants.length === 0 ? "Tous les numéros sont sortis" : tires.length ? "Relancer le tirage →" : "Lancer le tirage →"}
          </button>
          {tires.length > 0 && !roule && (
            <p style={{ ...MANROPE(500), fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 14 }}>
              Le {tires[tires.length - 1]} sera retiré du prochain tirage.
            </p>
          )}
        </div>

        {tires.length > 0 && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
                Numéros déjà tirés, dans l&apos;ordre
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tires.map((n, i) => (
                  <span key={n} style={{ ...ANTON, fontSize: 18, padding: "6px 12px", borderRadius: 6, minWidth: 44, textAlign: "center",
                    background: i === tires.length - 1 && !roule ? YELLOW : "rgba(255,255,255,0.08)",
                    color: i === tires.length - 1 && !roule ? BLACK : "#fff" }}>
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={reset} disabled={roule}
              style={{ ...MANROPE(700), fontSize: 13, background: "none", cursor: "pointer", padding: "10px 16px", borderRadius: 999,
                color: confirmReset ? "#fff" : "rgba(255,255,255,0.6)", border: `1.5px solid ${confirmReset ? RED : "rgba(255,255,255,0.25)"}`,
                ...(confirmReset ? { background: RED } : {}) }}>
              {confirmReset ? "Confirmer : tout remettre à zéro" : "Remettre à zéro"}
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes tbPop{0%{transform:scale(.6);opacity:.2}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}.tb-pop{animation:tbPop .5s ease-out}`}</style>
    </main>
  );
}
