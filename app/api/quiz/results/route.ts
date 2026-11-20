import { NextResponse } from "next/server";
import { getConfig, getAllResults } from "@/lib/quiz/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const config = await getConfig();
  if (!config || url.searchParams.get("key") !== config.adminKey) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 401 });
  }
  const results = await getAllResults(config.eventId);

  if (url.searchParams.get("format") === "csv") {
    const esc = (v: unknown) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = [
      ["Rang", "Prénom", "Nom", "Âge", "Email", "Prêt pour la scène", "Score", "Sur", "Temps (s)", "Hors délai", "Envoyé à"],
      ...results.map((r, i) => [i + 1, r.prenom, r.nom, r.age, r.email, r.scene ? "oui" : "non", r.score, r.total, (r.timeMs / 1000).toFixed(1),
        r.late ? "oui" : "non", new Date(r.submittedAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })]),
    ];
    return new NextResponse("﻿" + rows.map((r) => r.map(esc).join(";")).join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="resultats-${config.eventId}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }
  return NextResponse.json({ title: config.title, total: config.questions.length, results }, { headers: { "Cache-Control": "no-store" } });
}
