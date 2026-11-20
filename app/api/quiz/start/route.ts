import { NextResponse } from "next/server";
import { QUIZ_ENABLED } from "@/app/lib/flags";
import { getConfig, emailHash, hasStarted, saveParticipant, signToken, publicQuestions } from "@/lib/quiz/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  if (!QUIZ_ENABLED) return NextResponse.json({ error: "Le quiz est terminé." }, { status: 403 });
  const config = await getConfig();
  if (!config) return NextResponse.json({ error: "Quiz pas encore prêt." }, { status: 503 });

  const body = await req.json().catch(() => ({}));
  if (config.accessCode && body.c !== config.accessCode) return NextResponse.json({ error: "Lien invalide : scanne le QR code de la soirée." }, { status: 403 });
  const prenom = String(body.prenom ?? "").trim().slice(0, 60);
  const nom = String(body.nom ?? "").trim().slice(0, 60);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 120);
  const age = Number.parseInt(String(body.age ?? ""), 10);

  if (!prenom || !nom) return NextResponse.json({ error: "Indique ton prénom et ton nom." }, { status: 400 });
  if (!Number.isFinite(age) || age < 5 || age > 110) return NextResponse.json({ error: "Indique un âge valide." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  if (body.scene !== "oui" && body.scene !== "non") return NextResponse.json({ error: "Dis-nous si tu es prêt à monter sur scène." }, { status: 400 });
  const scene = body.scene === "oui";
  if (!body.consent) return NextResponse.json({ error: "Coche la case pour participer." }, { status: 400 });

  const h = emailHash(email);
  if (await hasStarted(config.eventId, h)) {
    return NextResponse.json({ error: "Cet email a déjà été utilisé pour participer. Une seule participation par personne !" }, { status: 409 });
  }

  const startedAt = Date.now();
  const participant = { prenom, nom, age, email, scene };
  await saveParticipant(config.eventId, h, { ...participant, startedAt });

  return NextResponse.json({
    token: signToken({ ...participant, ev: config.eventId, h, s: startedAt }),
    questions: publicQuestions(config),
    endsAt: startedAt + config.durationSec * 1000,
    serverNow: Date.now(),
  });
}
