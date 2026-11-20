// Envoie les questions du quiz (avec les bonnes réponses) dans Vercel Blob, hors de GitHub.
//   node scripts/quiz-config.mjs                  → envoie quiz-config.local.json (le site le prend sous ~1 min)
//   node scripts/quiz-config.mjs --reset-results  → efface toutes les participations de l'événement (ex. après les tests)
import { put, list, del } from "@vercel/blob";
import { createHmac } from "crypto";
import { readFileSync } from "fs";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
}
const config = JSON.parse(readFileSync("quiz-config.local.json", "utf8"));

if (process.argv.includes("--reset-results")) {
  let n = 0, cursor;
  do {
    const res = await list({ prefix: `quiz/${config.eventId}/`, cursor, limit: 1000 });
    if (res.blobs.length) { await del(res.blobs.map((b) => b.url)); n += res.blobs.length; }
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  console.log(`OK : ${n} fichier(s) de participation effacé(s) pour ${config.eventId}. Le classement est vide.`);
  process.exit(0);
}

const problems = [];
if (!config.eventId || !config.title || !config.adminKey) problems.push("eventId, title et adminKey sont obligatoires");
const catIds = new Set((config.categories ?? []).map((c) => c.id));
config.questions?.forEach((q, i) => {
  if (!q.q || !Array.isArray(q.options) || q.options.length < 2) problems.push(`question ${i + 1} : texte ou choix manquants`);
  if (!(q.answer >= 0 && q.answer < q.options.length)) problems.push(`question ${i + 1} : "answer" doit être l'index (0 = 1er choix)`);
  if (config.categories && !catIds.has(q.cat ?? "base")) problems.push(`question ${i + 1} : catégorie "${q.cat ?? "base"}" inconnue`);
});
if (problems.length) { console.error("Config invalide :\n- " + problems.join("\n- ")); process.exit(1); }

// même chemin secret que lib/quiz/server.ts → configPathname()
const h = createHmac("sha256", `ft-quiz:${process.env.BLOB_READ_WRITE_TOKEN}`).update("config").digest("hex").slice(0, 32);
await put(`quiz-config/${h}.json`, JSON.stringify(config), {
  access: "public", addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60, contentType: "application/json",
});
// nettoyage des anciennes versions (ancien format)
const old = (await list({ prefix: "quiz-config/", limit: 1000 })).blobs.filter((b) => b.pathname !== `quiz-config/${h}.json`);
if (old.length) await del(old.map((b) => b.url));

const cats = {};
for (const q of config.questions) cats[q.cat ?? "base"] = (cats[q.cat ?? "base"] ?? 0) + 1;
console.log(`OK : ${config.questions.length} questions (${Object.entries(cats).map(([k, v]) => `${k} ${v}`).join(", ")}) envoyées pour "${config.title}" (${config.durationSec}s).`);
