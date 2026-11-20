// Envoie les questions du quiz (avec les bonnes réponses) dans Vercel Blob, hors de GitHub.
// Usage : node scripts/quiz-config.mjs [chemin/vers/quiz-config.local.json]
// Le site en ligne récupère automatiquement la dernière version envoyée (sous 30 secondes).
import { put } from "@vercel/blob";
import { readFileSync } from "fs";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
}
const file = process.argv[2] ?? "quiz-config.local.json";
const config = JSON.parse(readFileSync(file, "utf8"));

const problems = [];
if (!config.eventId || !config.title || !config.adminKey) problems.push("eventId, title et adminKey sont obligatoires");
config.questions?.forEach((q, i) => {
  if (!q.q || !Array.isArray(q.options) || q.options.length < 2) problems.push(`question ${i + 1} : texte ou choix manquants`);
  if (!(q.answer >= 0 && q.answer < q.options.length)) problems.push(`question ${i + 1} : "answer" doit être l'index (0 = 1er choix)`);
});
if (problems.length) { console.error("Config invalide :\n- " + problems.join("\n- ")); process.exit(1); }

const { url } = await put(`quiz-config/${config.eventId}.json`, JSON.stringify(config), {
  access: "public", addRandomSuffix: true, contentType: "application/json",
});
console.log(`OK : ${config.questions.length} questions envoyées pour "${config.title}" (${config.durationSec}s).`);
console.log(url.replace(/\/[^/]+$/, "/…"));
