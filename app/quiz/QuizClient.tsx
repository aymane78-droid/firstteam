"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const ANTON: React.CSSProperties = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number): React.CSSProperties => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });
const RED = "#FE0000", YELLOW = "#FED000", BLUE = "#002EFE", BLACK = "#0A0A0A";

type Q = { q: string; options: string[] };
type Session = { token: string; questions: Q[]; endsAt: number; offset: number; answers: (number | null)[]; idx: number };
type Phase = "intro" | "quiz" | "sending" | "done";

interface Props { eventId: string; title: string; subtitle?: string; questionCount: number; durationSec: number }

const fmt = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

function Dots() {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[RED, YELLOW, BLUE].map((c) => <span key={c} style={{ width: 8, height: 8, borderRadius: 4, background: c }} />)}
    </div>
  );
}

export default function QuizClient({ eventId, title, subtitle, questionCount, durationSec }: Props) {
  const storeKey = `ftquiz:${eventId}`;
  const [phase, setPhase] = useState<Phase>("intro");
  const [session, setSession] = useState<Session | null>(null);
  const [form, setForm] = useState({ prenom: "", nom: "", age: "", email: "", scene: "", consent: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [result, setResult] = useState<{ score: number; total: number; timeMs: number; prenom?: string } | null>(null);
  const submitting = useRef(false);

  // Reprise après un rechargement de page
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storeKey) ?? "null");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reprise depuis localStorage (inaccessible au rendu serveur)
      if (saved?.result) { setResult(saved.result); setPhase("done"); }
      else if (saved?.session) { setSession(saved.session); setPhase("quiz"); }
    } catch {}
  }, [storeKey]);

  const persist = useCallback((data: object) => {
    try { localStorage.setItem(storeKey, JSON.stringify(data)); } catch {}
  }, [storeKey]);


  const remaining = session ? session.endsAt - (now + session.offset) : durationSec * 1000;

  const submit = useCallback(async (s: Session) => {
    if (submitting.current) return;
    submitting.current = true;
    setPhase("sending");
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        const res = await fetch("/api/quiz/submit", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: s.token, answers: s.answers }),
        });
        const data = await res.json();
        if (res.ok) {
          const r = data;
          setResult(r); setPhase("done"); persist({ result: r });
          return;
        }
        if (res.status < 500) {
          // participation invalide : on repart de zéro proprement
          try { localStorage.removeItem(storeKey); } catch {}
          setSession(null); setError(data.error ?? "Erreur."); setPhase("intro");
          submitting.current = false;
          return;
        }
      } catch {}
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
    setError((e) => e || "Connexion difficile… on réessaie.");
    submitting.current = false;
    setPhase("quiz");
  }, [persist, storeKey]);

  // Tic du chrono + envoi automatique à 0:00
  const latest = useRef({ session, submit });
  useEffect(() => { latest.current = { session, submit }; });
  useEffect(() => {
    if (phase !== "quiz") return;
    const t = setInterval(() => {
      const n = Date.now();
      setNow(n);
      const s = latest.current.session;
      if (s && s.endsAt - (n + s.offset) <= 0) latest.current.submit(s);
    }, 250);
    return () => clearInterval(t);
  }, [phase]);

  async function start(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/quiz/start", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erreur, réessaie."); return; }
      const s: Session = {
        token: data.token, questions: data.questions, endsAt: data.endsAt,
        offset: data.serverNow - Date.now(), answers: data.questions.map(() => null), idx: 0,
      };
      setSession(s); persist({ session: s }); setNow(Date.now()); setPhase("quiz");
      window.scrollTo(0, 0);
    } catch {
      setError("Connexion impossible, réessaie.");
    } finally { setLoading(false); }
  }

  function update(s: Session) { setSession(s); persist({ session: s }); }

  function choose(i: number) {
    if (!session || phase !== "quiz") return;
    const answers = [...session.answers]; answers[session.idx] = i;
    const isLast = session.idx === session.questions.length - 1;
    const next = { ...session, answers };
    update(next);
    if (!isLast) setTimeout(() => update({ ...next, idx: next.idx + 1 }), 220);
  }

  /* ── Écrans ───────────────────────────────────────────────────── */
  const wrap: React.CSSProperties = { minHeight: "100svh", background: BLACK, color: "#fff", display: "flex", flexDirection: "column" };
  const inner: React.CSSProperties = { width: "100%", maxWidth: 560, margin: "0 auto", padding: "28px 20px 40px", flex: 1, display: "flex", flexDirection: "column" };

  const Logo = (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
      {/* le PNG du logo a beaucoup de marge : on recadre sur la partie visible */}
      <div style={{ width: 113, height: 26, overflow: "hidden", position: "relative" }}>
        <img src="/media/logo/ft-monogramme-noir.png" alt="First Team" style={{ position: "absolute", width: 270, height: 152, left: -80, top: -63, maxWidth: "none", filter: "brightness(0) invert(1)" }} />
      </div>
      <Dots />
    </div>
  );

  if (phase === "done" && result) {
    const pct = result.score / result.total;
    return (
      <main style={wrap}>
        <div style={{ ...inner, justifyContent: "center" }}>
          {Logo}
          <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, color: RED, textTransform: "uppercase", marginBottom: 14 }}>· Quiz terminé</span>
          <h1 style={{ ...ANTON, fontSize: "clamp(44px, 13vw, 72px)", lineHeight: 0.9, textTransform: "uppercase", marginBottom: 28 }}>
            {result.prenom ? <>Bien joué<br />{result.prenom}.</> : <>Bien joué.</>}
          </h1>
          <div style={{ background: YELLOW, color: BLACK, borderRadius: 8, padding: "28px 24px", marginBottom: 20 }}>
            <div style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Ton score</div>
            <div style={{ ...ANTON, fontSize: 96, lineHeight: 0.95 }}>
              {result.score}<span style={{ fontSize: 44 }}>/{result.total}</span>
            </div>
            <div style={{ ...MANROPE(700), fontSize: 14, marginTop: 8 }}>en {fmt(result.timeMs)} min</div>
            <div style={{ height: 6, background: "rgba(0,0,0,0.15)", borderRadius: 3, marginTop: 16, overflow: "hidden" }}>
              <div style={{ width: `${pct * 100}%`, height: "100%", background: BLACK }} />
            </div>
          </div>
          <p style={{ ...MANROPE(500), fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>
            Les <strong style={{ color: "#fff" }}>3 meilleurs scores</strong>{" "}rejoignent la grande finale pour nous défier sur scène.
            À score égal, le plus rapide passe devant. Résultats annoncés pendant la soirée&nbsp;!
          </p>
        </div>
      </main>
    );
  }

  if ((phase === "quiz" || phase === "sending") && session) {
    const q = session.questions[session.idx];
    const chosen = session.answers[session.idx];
    const isLast = session.idx === session.questions.length - 1;
    const answered = session.answers.filter((a) => a !== null).length;
    const urgent = remaining <= 30_000;
    return (
      <main style={wrap}>
        {/* Barre chrono */}
        <div style={{ position: "sticky", top: 0, zIndex: 10, background: BLACK, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ maxWidth: 560, margin: "0 auto", padding: "14px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ ...MANROPE(800), fontSize: 10, letterSpacing: 2.5, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Question</div>
              <div style={{ ...ANTON, fontSize: 26, lineHeight: 1 }}>{session.idx + 1}<span style={{ color: "rgba(255,255,255,0.4)" }}>/{session.questions.length}</span></div>
            </div>
            <div className={urgent ? "ftq-pulse" : undefined} style={{ ...ANTON, fontSize: 44, lineHeight: 1, color: urgent ? RED : YELLOW, fontVariantNumeric: "tabular-nums" }}>
              {fmt(remaining)}
            </div>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)" }}>
            <div style={{ height: "100%", width: `${(Math.max(0, remaining) / (durationSec * 1000)) * 100}%`, background: urgent ? RED : YELLOW, transition: "width 0.25s linear" }} />
          </div>
        </div>

        <div style={inner}>
          <h2 style={{ ...MANROPE(800), fontSize: "clamp(21px, 5.6vw, 26px)", lineHeight: 1.3, marginBottom: 24 }}>{q.q}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map((opt, i) => {
              const sel = chosen === i;
              return (
                <button key={i} onClick={() => choose(i)} disabled={phase === "sending"}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, textAlign: "left", width: "100%",
                    padding: "16px 16px", borderRadius: 8, cursor: "pointer",
                    background: sel ? YELLOW : "rgba(255,255,255,0.04)", color: sel ? BLACK : "#fff",
                    border: `2px solid ${sel ? YELLOW : "rgba(255,255,255,0.14)"}`, transition: "all 0.15s",
                    ...MANROPE(700), fontSize: 16,
                  }}>
                  <span style={{ ...ANTON, fontSize: 18, width: 30, height: 30, flexShrink: 0, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                    background: sel ? BLACK : "rgba(255,255,255,0.08)", color: sel ? YELLOW : "rgba(255,255,255,0.7)" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, gap: 12 }}>
            <button onClick={() => update({ ...session, idx: Math.max(0, session.idx - 1) })} disabled={session.idx === 0}
              style={{ ...MANROPE(700), fontSize: 14, background: "none", border: "none", color: session.idx === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)", cursor: "pointer", padding: 8 }}>
              ← Précédente
            </button>
            {!isLast && (
              <button onClick={() => update({ ...session, idx: session.idx + 1 })}
                style={{ ...MANROPE(700), fontSize: 14, background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", padding: 8 }}>
                Passer →
              </button>
            )}
          </div>

          {(isLast || answered === session.questions.length) && (
            <button onClick={() => submit(session)} disabled={phase === "sending"} className="pill-btn pill-btn-red"
              style={{ marginTop: 20, width: "100%", justifyContent: "center", padding: "18px 24px", fontSize: 16, border: "none", cursor: "pointer" }}>
              {phase === "sending" ? "Envoi…" : `Valider mes réponses (${answered}/${session.questions.length}) →`}
            </button>
          )}
          {error && <p style={{ ...MANROPE(600), color: RED, fontSize: 14, marginTop: 14 }}>{error}</p>}
        </div>
        <style>{`@keyframes ftqPulse{0%,100%{opacity:1}50%{opacity:.45}}.ftq-pulse{animation:ftqPulse 1s infinite}`}</style>
      </main>
    );
  }

  /* Intro + inscription */
  const input: React.CSSProperties = {
    width: "100%", padding: "15px 16px", borderRadius: 8, background: "rgba(255,255,255,0.05)",
    border: "1.5px solid rgba(255,255,255,0.18)", color: "#fff", fontSize: 16, outline: "none", ...MANROPE(600),
  };
  const label: React.CSSProperties = { ...MANROPE(800), fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 7 };

  return (
    <main style={wrap}>
      <div style={inner}>
        {Logo}
        <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, color: RED, textTransform: "uppercase", marginBottom: 14 }}>· {subtitle || "Le quiz First Team"}</span>
        <h1 style={{ ...ANTON, fontSize: "clamp(48px, 15vw, 84px)", lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -1, marginBottom: 28 }}>
          {title}
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 32 }}>
          {[
            { big: String(questionCount), small: "questions", c: "#fff" },
            { big: fmt(durationSec * 1000), small: "chrono", c: YELLOW },
            { big: "TOP 3", small: "en finale", c: RED },
          ].map((b) => (
            <div key={b.small} style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 8, padding: "14px 10px" }}>
              <div style={{ ...ANTON, fontSize: 30, lineHeight: 1, color: b.c }}>{b.big}</div>
              <div style={{ ...MANROPE(700), fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 6, textTransform: "uppercase", letterSpacing: 1 }}>{b.small}</div>
            </div>
          ))}
        </div>

        <p style={{ ...MANROPE(500), fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.75)", marginBottom: 28 }}>
          QCM, une seule bonne réponse par question. Le chrono démarre dès que tu valides tes infos.
          Les <strong style={{ color: "#fff" }}>3 meilleurs</strong> nous défient sur scène pour la grande finale. À score égal, le plus rapide gagne.
        </p>

        <form onSubmit={start} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div><label style={label} htmlFor="prenom">Prénom</label>
              <input id="prenom" style={input} required autoComplete="given-name" value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} /></div>
            <div><label style={label} htmlFor="nom">Nom</label>
              <input id="nom" style={input} required autoComplete="family-name" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2.2fr", gap: 10 }}>
            <div><label style={label} htmlFor="age">Âge</label>
              <input id="age" style={input} required type="number" inputMode="numeric" min={5} max={110} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} /></div>
            <div><label style={label} htmlFor="email">Email</label>
              <input id="email" style={input} required type="email" autoComplete="email" inputMode="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          </div>
          <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
            <legend style={{ ...label, marginBottom: 9 }}>Tu es prêt à monter sur scène ?</legend>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {(["oui", "non"] as const).map((v) => {
                const on = form.scene === v;
                return (
                  <label key={v} style={{
                    position: "relative", ...ANTON, fontSize: 22, textTransform: "uppercase", textAlign: "center", padding: "13px 0", borderRadius: 8, cursor: "pointer",
                    background: on ? (v === "oui" ? YELLOW : "#fff") : "rgba(255,255,255,0.05)", color: on ? BLACK : "#fff",
                    border: `1.5px solid ${on ? "transparent" : "rgba(255,255,255,0.18)"}`, transition: "all 0.15s",
                  }}>
                    <input type="radio" name="scene" value={v} required checked={on} onChange={() => setForm({ ...form, scene: v })}
                      style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} />
                    {v}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", ...MANROPE(500), fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.65)" }}>
            <input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              style={{ width: 20, height: 20, marginTop: 1, accentColor: YELLOW, flexShrink: 0 }} />
            J&apos;accepte que First Team utilise ces informations pour organiser le quiz et me contacter si je suis qualifié·e.
          </label>
          {error && <p style={{ ...MANROPE(600), color: RED, fontSize: 14 }}>{error}</p>}
          <button type="submit" disabled={loading} className="pill-btn pill-btn-red"
            style={{ width: "100%", justifyContent: "center", padding: "18px 24px", fontSize: 16, border: "none", cursor: "pointer", marginTop: 4 }}>
            {loading ? "Chargement…" : "C'est parti →"}
          </button>
          <p style={{ ...MANROPE(500), fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Une seule participation par adresse email.</p>
        </form>
      </div>
    </main>
  );
}
