"use client";
import { useState } from "react";

const FT = { fontFamily: "JoyrideExt, Arial Black, sans-serif" };
const RB = (w: number) => ({ fontFamily: "var(--font-roboto-next), sans-serif", fontWeight: w });

/* ─── LEADERBOARD ───────────────────────────────────────────── */
const LEADERBOARD = [
  { rank: 1, name: "BasketKing94",  score: 9840, badge: "🏆" },
  { rank: 2, name: "NBAclopédie",   score: 9210, badge: "🥈" },
  { rank: 3, name: "WembyFan2024",  score: 8750, badge: "🥉" },
  { rank: 4, name: "LeBrick42",     score: 8120, badge: "" },
  { rank: 5, name: "AlleyOopKing",  score: 7890, badge: "" },
];

/* ─── GAME MODES ─────────────────────────────────────────────── */
const GAMES = [
  {
    id: "quiz",
    title: "QUI SUIS-JE ?",
    emoji: "🕵️",
    desc: "Identifie le joueur NBA d'après des indices progressifs. Moins tu utilises d'indices, plus tu marques.",
    color: "#FED420",
    available: true,
  },
  {
    id: "devine9",
    title: "DEVINE 9",
    emoji: "🔍",
    desc: "Reconnais 9 joueurs NBA à partir d'extraits vidéo et de stats anonymisées. Rapidité et précision.",
    color: "#E55A00",
    available: false,
  },
  {
    id: "enum",
    title: "ÉNUMÉRATION",
    emoji: "📋",
    desc: "Cite un maximum de joueurs selon un critère donné. Tu as 60 secondes — go !",
    color: "#E91E8C",
    available: false,
  },
  {
    id: "grid",
    title: "CATEGORY GRID",
    emoji: "🔲",
    desc: "Regroupe 16 joueurs en 4 catégories secrètes. Inspiré du NYT Connections, version NBA.",
    color: "#3B82F6",
    available: false,
  },
  {
    id: "jaideja",
    title: "J'AI DÉJÀ",
    emoji: "✋",
    desc: "Parmi les anecdotes basket, laquelle s'applique à toi ? Classe-toi parmi la communauté.",
    color: "#B8860B",
    available: true,
  },
  {
    id: "wordle",
    title: "WORDLE NBA",
    emoji: "🟨",
    desc: "Trouve le joueur NBA mystère en 6 tentatives. Inspiré de Poeltl — chaque essai te donne des indices.",
    color: "#22C55E",
    available: false,
  },
];

/* ─── QUI SUIS-JE QUESTIONS ──────────────────────────────────── */
const QUESTIONS = [
  { q: "Qui détient le record de points en un match NBA ?",    options: ["Kobe Bryant", "Wilt Chamberlain", "Michael Jordan", "LeBron James"],       answer: 1 },
  { q: "Combien de titres NBA ont les Boston Celtics ?",        options: ["15", "17", "18", "20"],                                                      answer: 2 },
  { q: "Quel joueur est surnommé 'The Greek Freak' ?",         options: ["Luka Dončić", "Giannis Antetokounmpo", "Nikola Jokić", "Joel Embiid"],       answer: 1 },
  { q: "En quelle année Michael Jordan a-t-il pris sa 1ère retraite ?", options: ["1991", "1993", "1995", "1998"],                                     answer: 1 },
  { q: "Quel joueur français a été drafté en 1er en 2023 ?",  options: ["Bilal Coulibaly", "Victor Wembanyama", "Ousmane Dieng", "Killian Hayes"],     answer: 1 },
  { q: "Quelle équipe a remporté le plus de titres consécutifs ?", options: ["Chicago Bulls", "Los Angeles Lakers", "Boston Celtics", "Golden State"], answer: 2 },
  { q: "Qui est le meilleur passeur de l'histoire NBA ?",       options: ["Magic Johnson", "John Stockton", "Chris Paul", "Steve Nash"],               answer: 1 },
  { q: "En quelle année la NBA a-t-elle été fondée ?",         options: ["1936", "1946", "1956", "1966"],                                              answer: 1 },
];

/* ─── J'AI DÉJÀ ITEMS ────────────────────────────────────────── */
const JAI_DEJA = [
  "regardé un match NBA en entier après 2h du matin",
  "défendu LeBron James dans un débat",
  "pleuré la défaite de l'équipe de France",
  "acheté un maillot NBA que tu ne portes plus",
  "expliqué le pick-and-roll à quelqu'un",
  "regardé les highlights avant de voir le score",
  "connu le nom du coach des Spurs",
  "stoppé une conversation pour voir un buzzer beater",
];

type GameState = "home" | "quiz" | "jaideja";

export default function QuizPage() {
  const [gameState, setGameState] = useState<GameState>("home");
  const [quizStep, setQuizStep]   = useState(0);
  const [selected, setSelected]   = useState<number | null>(null);
  const [answered, setAnswered]   = useState(false);
  const [score, setScore]         = useState(0);
  const [done, setDone]           = useState(false);
  const [jaiChecked, setJaiChecked] = useState<Set<number>>(new Set());

  function startQuiz() { setGameState("quiz"); setQuizStep(0); setScore(0); setSelected(null); setAnswered(false); setDone(false); }
  function choose(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === QUESTIONS[quizStep].answer) setScore((s) => s + 1);
  }
  function nextQ() {
    if (quizStep + 1 >= QUESTIONS.length) { setDone(true); return; }
    setQuizStep((q) => q + 1);
    setSelected(null);
    setAnswered(false);
  }
  function toggleJai(i: number) {
    setJaiChecked((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  }

  const q = QUESTIONS[quizStep];

  return (
    <main className="pt-16 min-h-screen bg-black">
      {/* Header */}
      <div className="bg-ft-yellow">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
          <p className="text-black/50 text-[10px] tracking-[4px] uppercase mb-3" style={FT}>INTERACTIF</p>
          <h1 className="text-black uppercase leading-none" style={{ ...FT, fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            FT GAMES
          </h1>
        </div>
      </div>

      {gameState === "home" && (
        <>
          {/* Game mode grid */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
            <div className="flex items-center gap-3 mb-10">
              <span className="block w-10 h-[3px] bg-ft-yellow" />
              <p className="text-ft-yellow text-[10px] tracking-[4px] uppercase" style={FT}>CHOISISSEZ VOTRE JEU</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {GAMES.map((game) => (
                <div
                  key={game.id}
                  onClick={() => game.available ? setGameState(game.id as GameState) : null}
                  className={`group border border-ft-border p-6 transition-all ${game.available ? "hover:border-ft-yellow cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{game.emoji}</span>
                    {!game.available && (
                      <span className="text-ft-muted text-[9px] border border-ft-border px-2 py-0.5" style={FT}>BIENTÔT</span>
                    )}
                    {game.available && (
                      <span className="text-[9px] px-2 py-0.5" style={{ ...FT, color: game.color, border: `1px solid ${game.color}` }}>DISPONIBLE</span>
                    )}
                  </div>
                  <h3 className="text-white uppercase mb-2 group-hover:text-ft-yellow transition-colors" style={{ ...FT, fontSize: "1.1rem" }}>{game.title}</h3>
                  <p className="text-ft-muted text-sm leading-relaxed" style={RB(400)}>{game.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <section className="border-t border-ft-border">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="block w-10 h-[3px] bg-ft-yellow" />
                    <p className="text-ft-yellow text-[10px] tracking-[4px] uppercase" style={FT}>CLASSEMENT DE LA SAISON</p>
                  </div>
                  <div className="divide-y divide-ft-border">
                    {LEADERBOARD.map((player) => (
                      <div key={player.rank} className="flex items-center gap-4 py-4">
                        <span className="text-ft-yellow w-6 text-center text-lg" style={FT}>{player.badge || player.rank}</span>
                        <span className="flex-1 text-white text-sm" style={RB(700)}>{player.name}</span>
                        <span className="text-ft-yellow text-sm" style={FT}>{player.score.toLocaleString("fr-FR")} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-ft-yellow p-8">
                  <p className="text-ft-yellow text-[10px] tracking-[3px] uppercase mb-4" style={FT}>🎁 CADEAUX EN FIN DE SAISON</p>
                  <h3 className="text-white uppercase leading-tight mb-4" style={{ ...FT, fontSize: "1.5rem" }}>TOP 3 DE LA COMMUNAUTÉ</h3>
                  <p className="text-ft-muted text-sm leading-relaxed mb-6" style={RB(400)}>
                    À chaque fin de saison, les 3 meilleurs joueurs du classement reçoivent des cadeaux exclusifs First Team : merch, places pour des matchs, accès à des événements privés et surprises.
                  </p>
                  <p className="text-ft-muted text-xs" style={RB(400)}>Saison en cours jusqu'au 30 juin 2026.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* QUI SUIS-JE */}
      {gameState === "quiz" && !done && (
        <div className="max-w-2xl mx-auto px-6 py-16">
          <button onClick={() => setGameState("home")} className="text-ft-muted text-xs mb-8 hover:text-white transition-colors" style={FT}>← RETOUR</button>
          <div className="flex items-center justify-between mb-3">
            <span className="text-ft-muted text-[10px] tracking-[3px] uppercase" style={FT}>QUESTION {quizStep + 1}/{QUESTIONS.length}</span>
            <span className="text-ft-yellow text-[10px]" style={FT}>SCORE : {score}</span>
          </div>
          <div className="h-[3px] bg-ft-border mb-10">
            <div className="h-full bg-ft-yellow transition-all" style={{ width: `${((quizStep + 1) / QUESTIONS.length) * 100}%` }} />
          </div>
          <h2 className="text-white uppercase leading-tight mb-10" style={{ ...FT, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>{q.q}</h2>
          <div className="grid gap-3 mb-10">
            {q.options.map((opt, idx) => {
              let cls = "border-ft-border text-white/80 hover:border-ft-yellow cursor-pointer";
              if (answered) {
                if (idx === q.answer) cls = "border-ft-yellow bg-ft-yellow/10 text-ft-yellow";
                else if (idx === selected) cls = "border-red-500/50 bg-red-500/10 text-red-400";
                else cls = "border-ft-border text-ft-muted";
              }
              return (
                <button key={idx} onClick={() => choose(idx)} className={`w-full text-left border px-6 py-4 text-[11px] tracking-[2px] uppercase transition-all ${cls}`} style={FT}>
                  <span className="text-ft-yellow mr-4">{String.fromCharCode(65 + idx)}.</span>{opt}
                </button>
              );
            })}
          </div>
          {answered && (
            <div className="text-center">
              <button onClick={nextQ} className="bg-ft-yellow text-black text-[11px] tracking-[3px] uppercase px-10 py-4 hover:bg-ft-yellow-dark transition-colors" style={FT}>
                {quizStep + 1 < QUESTIONS.length ? "SUIVANTE →" : "RÉSULTAT →"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* RÉSULTAT */}
      {gameState === "quiz" && done && (
        <div className="max-w-xl mx-auto px-6 py-16 text-center">
          <div className="w-28 h-28 bg-ft-yellow flex items-center justify-center mx-auto mb-8">
            <span className="text-black leading-none" style={{ ...FT, fontSize: "3rem" }}>{score}/{QUESTIONS.length}</span>
          </div>
          <h2 className="text-white uppercase leading-tight mb-4" style={{ ...FT, fontSize: "2.5rem" }}>
            {score >= 7 ? "EXPERT NBA !" : score >= 5 ? "BON NIVEAU !" : "À REVOIR..."}
          </h2>
          <div className="flex gap-4 justify-center mt-8">
            <button onClick={startQuiz} className="bg-ft-yellow text-black text-[11px] tracking-[3px] uppercase px-8 py-4 hover:bg-ft-yellow-dark" style={FT}>REJOUER</button>
            <button onClick={() => setGameState("home")} className="border border-ft-border text-white text-[11px] tracking-[3px] uppercase px-8 py-4 hover:border-ft-yellow" style={FT}>AUTRES JEUX</button>
          </div>
        </div>
      )}

      {/* J'AI DÉJÀ */}
      {gameState === "jaideja" && (
        <div className="max-w-2xl mx-auto px-6 py-16">
          <button onClick={() => setGameState("home")} className="text-ft-muted text-xs mb-8 hover:text-white transition-colors" style={FT}>← RETOUR</button>
          <h2 className="text-white uppercase mb-2" style={{ ...FT, fontSize: "2rem" }}>J'AI DÉJÀ…</h2>
          <p className="text-ft-muted mb-10 text-sm" style={RB(400)}>Coche tout ce qui s'applique à toi. Vois combien tu es fan.</p>
          <div className="space-y-3 mb-10">
            {JAI_DEJA.map((item, i) => (
              <button key={i} onClick={() => toggleJai(i)} className={`w-full text-left flex items-center gap-4 border px-5 py-4 transition-all ${jaiChecked.has(i) ? "border-ft-yellow bg-ft-yellow/10" : "border-ft-border hover:border-white/30"}`}>
                <div className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 ${jaiChecked.has(i) ? "border-ft-yellow bg-ft-yellow" : "border-ft-border"}`}>
                  {jaiChecked.has(i) && <svg viewBox="0 0 24 24" stroke="black" strokeWidth="3" fill="none" className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <span className={`text-sm ${jaiChecked.has(i) ? "text-ft-yellow" : "text-white/70"}`} style={RB(400)}>…{item}</span>
              </button>
            ))}
          </div>
          <div className="border border-ft-yellow p-6 text-center">
            <p className="text-ft-muted text-xs mb-2" style={RB(400)}>Score</p>
            <p className="text-ft-yellow text-5xl mb-2" style={FT}>{jaiChecked.size}/{JAI_DEJA.length}</p>
            <p className="text-white text-sm" style={RB(400)}>
              {jaiChecked.size >= 6 ? "Vrai fan First Team 🏆" : jaiChecked.size >= 3 ? "Amateur éclairé 🎯" : "Tu as encore de la marge 😅"}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
