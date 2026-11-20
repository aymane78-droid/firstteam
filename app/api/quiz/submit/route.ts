import { NextResponse } from "next/server";
import { getConfig, verifyToken, saveResultOnce, scoreAnswers } from "@/lib/quiz/server";

const GRACE_MS = 20_000; // tolérance réseau après la fin du chrono

export async function POST(req: Request) {
  const config = await getConfig();
  if (!config) return NextResponse.json({ error: "Quiz indisponible." }, { status: 503 });

  const body = await req.json().catch(() => ({}));
  const t = verifyToken(body.token);
  if (!t || t.ev !== config.eventId) return NextResponse.json({ error: "Participation invalide." }, { status: 400 });

  const answers: unknown[] = Array.isArray(body.answers) ? body.answers : [];
  const { score, total, byCat } = scoreAnswers(config, answers);
  const now = Date.now();
  const limit = config.durationSec * 1000;
  const elapsed = now - t.s;

  // Premier envoi enregistré = définitif (un renvoi éventuel récupère le score déjà enregistré)
  const saved = await saveResultOnce(t.ev, t.h, {
    prenom: t.prenom, nom: t.nom, age: t.age, email: t.email, scene: t.scene,
    score, total, byCat,
    timeMs: Math.min(elapsed, limit),
    late: elapsed > limit + GRACE_MS,
    startedAt: t.s, submittedAt: now,
  });
  // Le joueur ne voit que son total
  return NextResponse.json({ score: saved.score, total: saved.total, timeMs: saved.timeMs, prenom: saved.prenom });
}
