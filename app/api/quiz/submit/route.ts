import { NextResponse } from "next/server";
import { getConfig, verifyToken, getResult, saveResult } from "@/lib/quiz/server";

const GRACE_MS = 20_000; // tolérance réseau après la fin du chrono

export async function POST(req: Request) {
  const config = await getConfig();
  if (!config) return NextResponse.json({ error: "Quiz indisponible." }, { status: 503 });

  const body = await req.json().catch(() => ({}));
  const t = verifyToken(body.token);
  if (!t || t.ev !== config.eventId) return NextResponse.json({ error: "Participation invalide." }, { status: 400 });

  const existing = await getResult(t.ev, t.h);
  if (existing) return NextResponse.json({ score: existing.score, total: existing.total, timeMs: existing.timeMs, prenom: existing.prenom });

  const answers: unknown[] = Array.isArray(body.answers) ? body.answers : [];
  const total = config.questions.length;
  const score = config.questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);

  const now = Date.now();
  const limit = config.durationSec * 1000;
  const elapsed = now - t.s;
  const result = {
    prenom: t.prenom, nom: t.nom, age: t.age, email: t.email, scene: t.scene,
    score, total,
    timeMs: Math.min(elapsed, limit),
    late: elapsed > limit + GRACE_MS,
    startedAt: t.s, submittedAt: now,
  };
  await saveResult(t.ev, t.h, result);
  return NextResponse.json({ score, total, timeMs: result.timeMs, prenom: t.prenom });
}
