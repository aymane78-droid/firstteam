import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join, relative, extname } from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const CLOUDINARY_PATTERN = /https:\/\/res\.cloudinary\.com\/dg6xo2xwb\/[^\s"'`)\]]+/g;

// Extensions to scan
const SCAN_EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js", ".mjs", ".json", ".css", ".md"]);

// Dirs to skip
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "scripts", ".vercel"]);

// ─── Extract clean filename from Cloudinary public_id ────────────────────────
// URL pattern: /upload/v{ts}/{public_id}_{suffix}.{ext}
// or:          /upload/{public_id}.{ext}
function extractName(url) {
  try {
    const u = new URL(url);
    // strip query string — take only pathname segment after /upload/
    const path = u.pathname; // e.g. /dg6xo2xwb/image/upload/v1781790595/NBA-logo_gi6lsj.png
    const uploadIdx = path.indexOf("/upload/");
    if (uploadIdx === -1) return url;

    let segment = path.slice(uploadIdx + 8); // after "/upload/"

    // Remove version prefix vNNNNNN/
    segment = segment.replace(/^v\d+\//, "");

    // segment might be "folder/filename_suffix.ext" or just "filename_suffix.ext"
    const parts = segment.split("/");
    const filename = parts[parts.length - 1]; // last part = filename

    // Remove Cloudinary auto-suffix: last underscore-separated chunk before extension
    // e.g. "NBA-logo_gi6lsj.png" → "NBA-logo.png"
    const dotIdx = filename.lastIndexOf(".");
    if (dotIdx === -1) return filename;
    const ext   = filename.slice(dotIdx);           // ".png"
    const base  = filename.slice(0, dotIdx);        // "NBA-logo_gi6lsj"

    // Strip the last _XXXXXXX chunk (6-8 alphanumeric chars) if present
    const cleaned = base.replace(/_[a-z0-9]{4,10}$/i, "");
    return cleaned + ext;
  } catch {
    return url;
  }
}

// ─── Recursive file walker ────────────────────────────────────────────────────

function* walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    let st;
    try { st = statSync(full); } catch { continue; }
    if (st.isDirectory()) { yield* walk(full); }
    else if (SCAN_EXTENSIONS.has(extname(name))) { yield full; }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const results = [];
const seenUrls = new Set();

for (const absPath of walk(ROOT)) {
  const rel = relative(ROOT, absPath);
  let content;
  try { content = readFileSync(absPath, "utf8"); } catch { continue; }

  const lines = content.split("\n");
  lines.forEach((line, idx) => {
    const matches = [...line.matchAll(CLOUDINARY_PATTERN)];
    for (const m of matches) {
      const cloudinaryUrl = m[0].replace(/['"`;,)>\]]+$/, ""); // strip trailing junk
      seenUrls.add(cloudinaryUrl);
      results.push({
        file:          rel,
        line:          idx + 1,
        cloudinaryUrl,
        extractedName: extractName(cloudinaryUrl),
      });
    }
  });
}

// Count unique files
const uniqueFiles = new Set(results.map(r => r.file)).size;

const output = {
  urls: results,
  total: results.length,
  uniqueUrls: seenUrls.size,
  uniqueFiles,
};

const outPath = new URL("../cloudinary-urls.json", import.meta.url).pathname;
writeFileSync(outPath, JSON.stringify(output, null, 2));

console.log(`\n✅  ${results.length} occurrences trouvées`);
console.log(`   🔗 URLs uniques   : ${seenUrls.size}`);
console.log(`   📄 Fichiers source : ${uniqueFiles}`);
console.log(`\n💾 cloudinary-urls.json généré (${outPath})\n`);

// Quick breakdown by source file
const byFile = {};
for (const r of results) byFile[r.file] = (byFile[r.file] ?? 0) + 1;
for (const [file, count] of Object.entries(byFile).sort()) {
  console.log(`   ${file} : ${count} URL${count > 1 ? "s" : ""}`);
}
