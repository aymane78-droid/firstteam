import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const BLOB = "https://jry6nc0w67kepqum.public.blob.vercel-storage.com";

// Exact Cloudinary URL → Blob URL mapping
// Only include URLs that have a confirmed equivalent on Vercel Blob.
const MAP = {
  // ── Partenaires logos ──────────────────────────────────────────────────────
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790595/NBA-logo_gi6lsj.png":
    `${BLOB}/PARTENAIRES/NBA.jpg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790595/LOGO_FIBA_mgovnj.png":
    `${BLOB}/PARTENAIRES/FIBA.jpg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790595/Winamax2022_logoCompact_RVB_gbfuy3.png":
    `${BLOB}/PARTENAIRES/WINAMAX.png`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782297115/nbaa_enmvoq.png":
    `${BLOB}/PARTENAIRES/NBA.jpg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782297317/fibaa_dnaxuu.png":
    `${BLOB}/PARTENAIRES/FIBA.jpg`,
  // Partenaires photos (full bleed)
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782291215/NBA_ihu1qw.jpg?v=2":
    `${BLOB}/PARTENAIRES/NBA.jpg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782291348/FIBA_fiozdi.jpg?v=2":
    `${BLOB}/PARTENAIRES/FIBA.jpg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1782291221/WINAMAX_g0kxzf.png?v=2":
    `${BLOB}/PARTENAIRES/WINAMAX.png`,

  // ── Roster co-fondateurs ───────────────────────────────────────────────────
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790074/Erwan_z9n7yr.jpg":
    `${BLOB}/L%27E%CC%81QUIPE/roster/Erwan.jpg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790070/Thomas_qdf4dp.jpg":
    `${BLOB}/L%27E%CC%81QUIPE/roster/Thomas.jpg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790066/Stephen_hcxjrg.jpg":
    `${BLOB}/L%27E%CC%81QUIPE/roster/Stephen.jpg`,

  // ── Catalogues HOME ────────────────────────────────────────────────────────
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790194/catalogue_contenus_csyn5h.jpg":
    `${BLOB}/HOME/catalogue_contenus.jpg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790270/catalogue_equipe_ybjqpg.jpg?v=3":
    `${BLOB}/L%27E%CC%81QUIPE/catalogue_equipe.jpg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790185/catalogue_merch_rs99bh.jpg":
    `${BLOB}/HOME/catalogue_merch.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790224/catalogue_partenaire_vggjmq.jpg":
    `${BLOB}/HOME/catalogue_partenaire.jpg`,

  // ── HOME sections ──────────────────────────────────────────────────────────
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790229/Section1_k1q9bv.png":
    `${BLOB}/HOME/Section1.png`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781790198/section_fin_shop_fs52xl.jpg?v=3":
    `${BLOB}/HOME/section_fin_shop.jpeg`,

  // ── Vidéo hero ─────────────────────────────────────────────────────────────
  "https://res.cloudinary.com/dg6xo2xwb/video/upload/v1781708412/vide%CC%81o_site_ht1vti.mp4?v=2":
    `${BLOB}/vide%CC%81o%20site%20V2.mp4`,

  // ── Contenus ───────────────────────────────────────────────────────────────
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781793063/herro_uieuiw.png":
    `${BLOB}/CONTENUS/herro.png`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781793063/podcast_iq5mic.jpg":
    `${BLOB}/CONTENUS/podcast.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/OFFENSE_-_PROGRAMME_gtbvhq.png":
    `${BLOB}/L%27E%CC%81QUIPE/projets-majeurs/offense.png`,

  // ── Shop sections ──────────────────────────────────────────────────────────
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/herro":
    `${BLOB}/SHOP/herro.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/Sous-le-herro_ic4oys":
    `${BLOB}/SHOP/Sous-le-herro.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant1":
    `${BLOB}/SHOP/deroulant1.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant2":
    `${BLOB}/SHOP/deroulant2.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant3":
    `${BLOB}/SHOP/deroulant3.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant4":
    `${BLOB}/SHOP/deroulant4.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant5":
    `${BLOB}/SHOP/deroulant5.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant6":
    `${BLOB}/SHOP/deroulant6.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/deroulant7":
    `${BLOB}/SHOP/deroulant7.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/Sectionfin1_t5orly":
    `${BLOB}/SHOP/Sectionfin1.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/Sectionfin3_hl2n2w":
    `${BLOB}/SHOP/Sectionfin3.jpeg`,
  "https://res.cloudinary.com/dg6xo2xwb/image/upload/f_auto,q_auto/Sectionfin2_ed6cy1":
    `${BLOB}/SHOP/Sectionfin2.jpeg`,
};

const FILES = [
  "app/page.tsx",
  "app/partenaires/page.tsx",
  "app/contenus/page.tsx",
  "app/components/Header.tsx",
  "app/components/Footer.tsx",
  "components/shop/sections.tsx",
];

let totalReplaced = 0;

for (const rel of FILES) {
  const path = join(ROOT, rel);
  let content;
  try { content = readFileSync(path, "utf8"); } catch { console.log(`⚠️  ${rel} : non trouvé`); continue; }

  let changed = 0;
  for (const [from, to] of Object.entries(MAP)) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed++;
    }
  }

  if (changed > 0) {
    writeFileSync(path, content);
    console.log(`✅ ${rel} — ${changed} URL${changed > 1 ? "s" : ""} remplacée${changed > 1 ? "s" : ""}`);
    totalReplaced += changed;
  } else {
    console.log(`   ${rel} — aucune URL à remplacer`);
  }
}

console.log(`\n🎉 Total : ${totalReplaced} remplacements effectués`);
console.log("\nURLs non remplacées (à uploader sur Blob) :");
console.log("  • FT-MONOGRAMME-ECRITURE-NOIR_1.png (logo Header/Footer)");
console.log("  • Invités Offense (sdm, domenec, edgar, riolo, christ, cazarre, jjs, margo, mehdi, nadeau, gillian, couvr)");
console.log("  • Logos émissions (LIBRE_ANTENNE, REPLAY, CLUTCH, FDS, ENTRETIEN)");
console.log("  • Logos partenaires secondaires (Nike, Adidas, Puma, 2K, FitnessPark, Trade Republic, Airbnb, Allianz, DAZN)");
console.log("  • LOGO_ACAST, LOGO_INFLUX");
