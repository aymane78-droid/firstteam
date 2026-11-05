import { createRequire } from "module";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);

// Load .env.local
const dotenv = require("dotenv");
dotenv.config({ path: new URL("../.env.local", import.meta.url).pathname });

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
});

const OUTPUT_DIR = join(process.env.HOME, "Desktop", "firstteam-cloudinary-backup");

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function bytesToMb(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

// Download a single URL to a local path. Returns bytes written or throws.
async function downloadFile(url, destPath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  ensureDir(dirname(destPath));
  writeFileSync(destPath, buf);
  return buf.length;
}

// Build local path from a Cloudinary resource record.
// public_id may look like "folder/subfolder/filename" (no extension).
function localPath(resource) {
  const ext = resource.format ? `.${resource.format}` : extname(resource.public_id) || "";
  const rel  = resource.public_id.endsWith(ext) ? resource.public_id : `${resource.public_id}${ext}`;
  return join(OUTPUT_DIR, rel);
}

// Generate a signed, time-limited download URL for private/restricted assets.
function signedUrl(resource) {
  return cloudinary.utils.private_download_url(
    resource.public_id,
    resource.format,
    { resource_type: resource.resource_type, expires_at: Math.floor(Date.now() / 1000) + 3600 }
  );
}

// ─── Fetch all resources of one type (handles pagination) ────────────────────

async function fetchAll(resourceType) {
  const items = [];
  let cursor = undefined;

  process.stdout.write(`  Listing ${resourceType}s `);
  do {
    const opts = { resource_type: resourceType, max_results: 500, type: "upload" };
    if (cursor) opts.next_cursor = cursor;

    const res = await cloudinary.api.resources(opts);
    items.push(...res.resources);
    cursor = res.next_cursor;
    process.stdout.write(".");
  } while (cursor);

  console.log(` ${items.length} found`);
  return items;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🔐 Cloudinary credentials check …");
  if (!process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET === "INSEREZ_VOTRE_API_SECRET_ICI") {
    console.error("❌  CLOUDINARY_API_SECRET manquant dans .env.local — arrêt.");
    process.exit(1);
  }
  console.log(`   Cloud: ${process.env.CLOUDINARY_CLOUD_NAME ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);
  console.log(`   Output: ${OUTPUT_DIR}\n`);
  ensureDir(OUTPUT_DIR);

  // List everything
  const images = await fetchAll("image");
  const videos = await fetchAll("video");
  const all = [...images, ...videos];

  if (all.length === 0) {
    console.log("⚠️  Aucun asset trouvé. Vérifie tes credentials.");
    return;
  }

  console.log(`\n📦 ${all.length} assets à télécharger …\n`);

  let okImg = 0, okVid = 0, fail = 0, totalBytes = 0;
  const errors = [];

  for (const resource of all) {
    const dest = localPath(resource);
    const label = resource.public_id;

    // Try secure_url first, then signed URL as fallback for restricted assets
    let bytes = 0;
    let downloaded = false;

    if (resource.secure_url) {
      try {
        bytes = await downloadFile(resource.secure_url, dest);
        downloaded = true;
      } catch (e) {
        // 401 / access denied → try signed URL
      }
    }

    if (!downloaded) {
      try {
        const url = signedUrl(resource);
        bytes = await downloadFile(url, dest);
        downloaded = true;
      } catch (e) {
        console.log(`❌ ${label} : ${e.message}`);
        errors.push({ label, error: e.message });
        fail++;
        continue;
      }
    }

    totalBytes += bytes;
    if (resource.resource_type === "video") { okVid++; } else { okImg++; }
    console.log(`✅ ${label} (${bytesToMb(bytes)} MB)`);
  }

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log("\n══════════════════════════════════════════");
  console.log("   RÉCAP");
  console.log("══════════════════════════════════════════");
  console.log(`   ✅ Images téléchargées  : ${okImg}`);
  console.log(`   ✅ Vidéos téléchargées  : ${okVid}`);
  console.log(`   ❌ Échecs               : ${fail}`);
  console.log(`   📦 Taille totale        : ${bytesToMb(totalBytes)} MB`);
  console.log(`   📁 Dossier local        : ${OUTPUT_DIR}`);

  if (errors.length > 0) {
    console.log("\n   Fichiers en échec :");
    errors.forEach(e => console.log(`   • ${e.label} → ${e.error}`));
  }

  console.log("══════════════════════════════════════════\n");
}

main().catch(err => {
  console.error("❌ Erreur fatale :", err.message);
  process.exit(1);
});
