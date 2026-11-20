"use client";
import { useEffect, useState } from "react";

const ANTON: React.CSSProperties = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number): React.CSSProperties => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });
const RED = "#FE0000", YELLOW = "#FED000", BLUE = "#002EFE", BLACK = "#0A0A0A";

type Cat = { id: string; label: string };
type Row = { byCat?: Record<string, { score: number; total: number }>; prenom: string; nom: string; age: number; email: string; scene: boolean; score: number; total: number; timeMs: number; late: boolean; submittedAt: number };

const fmt = (ms: number) => { const s = Math.round(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

export default function Leaderboard({ adminKey, title }: { adminKey: string; title: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [cats, setCats] = useState<Cat[]>([]);
  const [updated, setUpdated] = useState<Date | null>(null);
  const [showEmails, setShowEmails] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`/api/quiz/results?key=${encodeURIComponent(adminKey)}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!alive) return;
        setRows(data.results); setTotal(data.total); setCats(data.categories ?? []); setUpdated(new Date());
      } catch {}
    };
    load();
    // 30 s : le serveur ne recalcule de toute façon pas plus souvent (quota Vercel Blob)
    const t = setInterval(() => { if (document.visibilityState === "visible") load(); }, 30_000);
    const onVis = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { alive = false; clearInterval(t); document.removeEventListener("visibilitychange", onVis); };
  }, [adminKey]);

  // podium : les 3 meilleurs parmi ceux qui ont répondu « oui » à la scène
  const catLine = (r: Row) => cats.map((c) => r.byCat?.[c.id] ? `${c.label} ${r.byCat[c.id].score}/${r.byCat[c.id].total}` : null).filter(Boolean).join(" · ");
  const podium = rows.filter((r) => !r.late && r.scene).slice(0, 3);
  const colors = [YELLOW, RED, BLUE];

  return (
    <main style={{ minHeight: "100svh", background: BLACK, color: "#fff", padding: "40px 24px 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div>
            <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, color: RED, textTransform: "uppercase" }}>· Classement en direct</span>
            <h1 style={{ ...ANTON, fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.9, textTransform: "uppercase", marginTop: 10 }}>{title}</h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ ...ANTON, fontSize: 44, lineHeight: 1 }}>{rows.length}</div>
            <div style={{ ...MANROPE(700), fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>participants</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 40 }}>
          {[0, 1, 2].map((i) => {
            const r = podium[i];
            return (
              <div key={i} style={{ background: colors[i], color: i === 0 ? BLACK : "#fff", borderRadius: 8, padding: "24px 22px", minHeight: 170, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ ...ANTON, fontSize: 22 }}>#{i + 1} · FINALE</div>
                {r ? (
                  <div>
                    <div style={{ ...ANTON, fontSize: 38, lineHeight: 0.95, textTransform: "uppercase" }}>{r.prenom}<br />{r.nom}</div>
                    <div style={{ ...MANROPE(800), fontSize: 15, marginTop: 10 }}>{r.score}/{r.total} · {fmt(r.timeMs)}</div>
                    {cats.length > 1 && <div style={{ ...MANROPE(600), fontSize: 12, marginTop: 4, opacity: 0.75 }}>{catLine(r)}</div>}
                  </div>
                ) : <div style={{ ...MANROPE(700), opacity: 0.6 }}>En attente…</div>}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 12 }}>
          <span style={{ ...MANROPE(600), fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
            Mise à jour auto toutes les 30 s{updated ? ` · ${updated.toLocaleTimeString("fr-FR")}` : ""}
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setShowEmails((v) => !v)} className="pill-btn pill-btn-outline-white" style={{ cursor: "pointer", fontSize: 13 }}>
              {showEmails ? "Masquer les emails" : "Afficher les emails"}
            </button>
            <a href={`/api/quiz/results?key=${encodeURIComponent(adminKey)}&format=csv`} className="pill-btn pill-btn-yellow" style={{ fontSize: 13 }}>Télécharger (Excel/CSV)</a>
          </div>
        </div>

        <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, overflow: "hidden" }}>
          {rows.length === 0 && <p style={{ ...MANROPE(600), padding: 24, color: "rgba(255,255,255,0.5)" }}>Aucune participation pour l&apos;instant.</p>}
          {rows.map((r, i) => (
            <div key={r.email} style={{ display: "grid", gridTemplateColumns: "50px 1fr 90px 80px", gap: 12, alignItems: "center", padding: "12px 18px",
              borderTop: i ? "1px solid rgba(255,255,255,0.08)" : "none", background: podium.includes(r) ? "rgba(254,208,0,0.06)" : "transparent", opacity: r.late ? 0.45 : 1 }}>
              <span style={{ ...ANTON, fontSize: 20, color: podium.includes(r) ? YELLOW : "rgba(255,255,255,0.5)" }}>{i + 1}</span>
              <span style={{ ...MANROPE(700), fontSize: 15 }}>
                {r.prenom} {r.nom} <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>· {r.age} ans{showEmails ? ` · ${r.email}` : ""}{r.late ? " · hors délai" : ""}{!r.scene ? " · pas pour la scène" : ""}
                {cats.length > 1 && <span style={{ display: "block", color: "rgba(255,255,255,0.45)", fontWeight: 600, fontSize: 12, marginTop: 2 }}>{catLine(r)}</span>}</span>
              </span>
              <span style={{ ...ANTON, fontSize: 22, textAlign: "right" }}>{r.score}<span style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>/{total}</span></span>
              <span style={{ ...MANROPE(700), fontSize: 14, textAlign: "right", color: "rgba(255,255,255,0.7)", fontVariantNumeric: "tabular-nums" }}>{fmt(r.timeMs)}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
