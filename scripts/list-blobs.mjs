import { createRequire } from "module";
import { writeFileSync } from "fs";
import { join } from "path";

const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
dotenv.config({ path: new URL("../.env.local", import.meta.url).pathname });

const { list } = await import("@vercel/blob");

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("❌  BLOB_READ_WRITE_TOKEN manquant dans .env.local — arrêt.");
  process.exit(1);
}

// ─── Fetch all blobs (paginated) ─────────────────────────────────────────────

const blobs = [];
let cursor = undefined;

process.stdout.write("  Listing blobs ");
do {
  const res = await list({ token, cursor, limit: 1000 });
  blobs.push(...res.blobs);
  cursor = res.cursor;
  process.stdout.write(".");
} while (cursor);
console.log(` ${blobs.length} trouvés\n`);

// ─── Group by top-level folder ───────────────────────────────────────────────

const folders = {};
for (const b of blobs) {
  const parts = b.pathname.split("/");
  const folder = parts.length > 1 ? parts[0] : "(racine)";
  folders[folder] = (folders[folder] ?? 0) + 1;
}

// ─── Build output ─────────────────────────────────────────────────────────────

const output = {
  blobs: blobs.map(b => ({
    pathname: b.pathname,
    url:      b.url,
    size:     b.size,
    uploadedAt: b.uploadedAt,
  })),
  total: blobs.length,
};

const outPath = new URL("../blob-inventory.json", import.meta.url).pathname;
writeFileSync(outPath, JSON.stringify(output, null, 2));

// ─── Console summary ──────────────────────────────────────────────────────────

console.log(`✅  ${blobs.length} blobs trouvés\n`);
for (const [folder, count] of Object.entries(folders).sort()) {
  console.log(`   📁 ${folder} : ${count} fichier${count > 1 ? "s" : ""}`);
}
console.log(`\n💾 blob-inventory.json généré (${outPath})`);
