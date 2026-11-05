import { readFileSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";

const ROOT = new URL("..", import.meta.url).pathname;

// ─── Load inventories ─────────────────────────────────────────────────────────

let blobInventory, cloudinaryUrls;
try {
  blobInventory   = JSON.parse(readFileSync(join(ROOT, "blob-inventory.json"),   "utf8"));
  cloudinaryUrls  = JSON.parse(readFileSync(join(ROOT, "cloudinary-urls.json"), "utf8"));
} catch (e) {
  console.error("❌  Fichier manquant :", e.message);
  console.error("    Lance d'abord list-blobs.mjs puis find-cloudinary-urls.mjs");
  process.exit(1);
}

// ─── Page → Blob folder heuristic ────────────────────────────────────────────

const PAGE_FOLDER_MAP = [
  { pattern: /^app\/page\.tsx/,              folder: "HOME"        },
  { pattern: /contenus/,                     folder: "CONTENUS"    },
  { pattern: /qui-nous-sommes|equipe/,       folder: "L'ÉQUIPE"    },
  { pattern: /partenaires/,                  folder: "PARTENAIRES" },
  { pattern: /shop/,                         folder: "SHOP"        },
];

function preferredFolder(sourceFile) {
  for (const { pattern, folder } of PAGE_FOLDER_MAP) {
    if (pattern.test(sourceFile)) return folder;
  }
  return null;
}

// ─── Normalize a name for fuzzy comparison ────────────────────────────────────
// lowercase, remove extension, replace separators with spaces, strip common words

function normalize(name) {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")           // remove extension
    .replace(/[-_]/g, " ")             // separators → spaces
    .replace(/\s+/g, " ")
    .trim();
}

// Score match between a cloudinary extractedName and a blob pathname.
// Returns 0 (no match) to 3 (exact).
function matchScore(extractedName, blobPathname) {
  const blobFilename = basename(blobPathname);

  // 1. Exact filename match (case-insensitive)
  if (blobFilename.toLowerCase() === extractedName.toLowerCase()) return 3;

  // 2. Same base name ignoring extension
  const blobBase = blobFilename.replace(/\.[^.]+$/, "").toLowerCase();
  const extBase  = extractedName.replace(/\.[^.]+$/, "").toLowerCase();
  if (blobBase === extBase) return 2;

  // 3. Fuzzy: one normalized name is contained in the other
  const nb = normalize(blobFilename);
  const ne = normalize(extractedName);
  if (nb && ne && (nb.includes(ne) || ne.includes(nb))) return 1;

  return 0;
}

// ─── Match each Cloudinary URL → blob ────────────────────────────────────────

const blobs    = blobInventory.blobs;
const urlItems = cloudinaryUrls.urls;

const matched  = [];  // { item, blob }
const missing  = [];  // { item }
const usedBlobPathnames = new Set();

for (const item of urlItems) {
  const folder = preferredFolder(item.file);

  // Score all blobs against this item
  const candidates = blobs
    .map(b => ({ blob: b, score: matchScore(item.extractedName, b.pathname) }))
    .filter(c => c.score > 0)
    .sort((a, b) => {
      // prefer blobs in the right folder, then higher score
      const aFolder = folder && a.blob.pathname.startsWith(folder) ? 1 : 0;
      const bFolder = folder && b.blob.pathname.startsWith(folder) ? 1 : 0;
      if (bFolder !== aFolder) return bFolder - aFolder;
      return b.score - a.score;
    });

  if (candidates.length > 0) {
    const best = candidates[0].blob;
    matched.push({ item, blob: best });
    usedBlobPathnames.add(best.pathname);
  } else {
    missing.push({ item });
  }
}

// Blobs uploaded but never referenced
const unusedBlobs = blobs.filter(b => !usedBlobPathnames.has(b.pathname));

// ─── Build migration-plan.md ──────────────────────────────────────────────────

const lines = [];

lines.push("# Plan de migration Cloudinary → Vercel Blob\n");
lines.push(`_Généré le ${new Date().toLocaleDateString("fr-FR", { dateStyle: "long" })}_\n`);

// ── Matched ──
lines.push(`## ✅ Images matchées (${matched.length}/${urlItems.length})\n`);
if (matched.length === 0) {
  lines.push("_Aucune correspondance trouvée._\n");
} else {
  for (const { item, blob } of matched) {
    lines.push(`- \`${item.file}\` L${item.line} : \`${item.extractedName}\` → \`${blob.pathname}\``);
    lines.push(`  → \`${blob.url}\``);
  }
  lines.push("");
}

// ── Missing ──
lines.push(`## ❌ Images manquantes sur Blob (${missing.length})\n`);
if (missing.length === 0) {
  lines.push("_Toutes les images Cloudinary ont un équivalent sur Blob._ 🎉\n");
} else {
  lines.push("Ces URLs Cloudinary n'ont pas d'équivalent trouvé sur Blob.");
  lines.push("Il faudra soit uploader la version manquante, utiliser une image alternative, ou remplacer par un placeholder.\n");
  for (const { item } of missing) {
    lines.push(`- \`${item.file}\` L${item.line} : \`${item.extractedName}\``);
    lines.push(`  Cloudinary : \`${item.cloudinaryUrl}\``);
  }
  lines.push("");
}

// ── Unused blobs ──
lines.push(`## ⚠️ Blobs uploadés mais non utilisés (${unusedBlobs.length})\n`);
if (unusedBlobs.length === 0) {
  lines.push("_Tous les blobs sont référencés dans le code._\n");
} else {
  lines.push("Ces blobs sont sur Vercel mais pas référencés dans le code (doublons, archives, ou images futures).\n");
  for (const b of unusedBlobs) {
    lines.push(`- \`${b.pathname}\``);
    lines.push(`  → \`${b.url}\``);
  }
  lines.push("");
}

// ── Stats ──
lines.push("## Statistiques\n");
lines.push(`| Métrique | Valeur |`);
lines.push(`|---|---|`);
lines.push(`| URLs Cloudinary trouvées | ${urlItems.length} |`);
lines.push(`| URLs uniques | ${cloudinaryUrls.uniqueUrls} |`);
lines.push(`| Blobs sur Vercel | ${blobs.length} |`);
lines.push(`| Correspondances OK | ${matched.length} |`);
lines.push(`| Manquants | ${missing.length} |`);
lines.push(`| Blobs non utilisés | ${unusedBlobs.length} |`);
lines.push("");

const mdPath = join(ROOT, "migration-plan.md");
writeFileSync(mdPath, lines.join("\n"));

// ─── Console output ───────────────────────────────────────────────────────────

console.log("\n══════════════════════════════════════════");
console.log("   RÉSULTAT DU CROISEMENT");
console.log("══════════════════════════════════════════");
console.log(`   URLs Cloudinary  : ${urlItems.length}`);
console.log(`   Blobs sur Vercel : ${blobs.length}`);
console.log(`   ✅ Matchées      : ${matched.length}`);
console.log(`   ❌ Manquantes    : ${missing.length}`);
console.log(`   ⚠️  Non utilisés  : ${unusedBlobs.length}`);
console.log(`\n💾 migration-plan.md généré (${mdPath})\n`);

if (missing.length > 0) {
  console.log("❌ Images sans correspondance :");
  for (const { item } of missing) {
    console.log(`   • ${item.file} L${item.line} → ${item.extractedName}`);
  }
  console.log("");
}
