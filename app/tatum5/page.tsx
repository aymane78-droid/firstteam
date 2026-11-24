import { redirect } from "next/navigation";
import { TATUM5_ENABLED } from "@/app/lib/flags";
import { REGLEMENT } from "./reglement";

const ANTON: React.CSSProperties = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number): React.CSSProperties => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

const PINK = "#D6338A";
const PINK_DARK = "#A8236A";
const GREY = "#D7DEDA"; // fond du bandeau
const BLACK = "#0A0A0A";

const NIKE_URL = "https://www.nike.com/fr/u/custom-tatum-5-by-you-10002444";
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdb2aEdiOC-PFqJKjv6z66nkQGWsgXl-2WP0Un75X0V_iedsA/viewform";

const ETAPES = [
  { date: "23 nov. → 4 janv.", texte: "Candidatures ouvertes (clôture le 4 janvier à 00h00)" },
  { date: "6 → 13 janv.", texte: "Sondage : la communauté vote pour ses paires préférées" },
  { date: "15 janv.", texte: "Annonce du grand vainqueur" },
  { date: "5 → 13 mars", texte: "Le voyage à San Antonio" },
];

const PRIX = [
  { num: "01", titre: "Un voyage à San Antonio pour 2", texte: "Du 5 au 13 mars 2027, pour toi et la personne de ton choix : vols depuis Paris, hôtel et trois matchs des Spurs, contre les Knicks, les Wizards et les 76ers. Trajet jusqu'à Paris non compris." },
  { num: "02", titre: "Une rencontre avec Bilal Coulibaly", texte: "Autour du match Spurs-Wizards, l'occasion de rencontrer l'international français." },
  { num: "03", titre: "Ta paire offerte", texte: "La Jordan Tatum 5 que tu as personnalisée, offerte." },
];

/** Affiche les passages [[...]] du règlement surlignés « à compléter ». */
function Texte({ t }: { t: string }) {
  return (
    <>
      {t.split(/(\[\[[^\]]+\]\])/g).map((part, i) =>
        part.startsWith("[[") ? (
          <mark key={i} style={{ background: "#FED000", color: BLACK, padding: "0 4px", borderRadius: 3 }}>{part.slice(2, -2)}</mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function Carte({ num, titre, texte, bouton, href, couleur, image, imageAlt }: { num: string; titre: React.ReactNode; texte: string; bouton: string; href: string; couleur: string; image: string; imageAlt: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 10px 30px rgba(0,0,0,0.06)", borderTop: `6px solid ${couleur}` }}>
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", aspectRatio: "4 / 3", overflow: "hidden" }}>
        <img src={image} alt={imageAlt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </a>
      <div className="t5-card" style={{ padding: "30px 32px 34px", display: "flex", flexDirection: "column", flex: 1 }}>
      <span style={{ ...ANTON, fontSize: 56, lineHeight: 1, color: couleur, marginBottom: 14 }}>{num}</span>
      <h2 style={{ ...ANTON, fontSize: "clamp(30px, 3.2vw, 42px)", lineHeight: 0.95, textTransform: "uppercase", color: BLACK, marginBottom: 16 }}>{titre}</h2>
      <p style={{ ...MANROPE(500), fontSize: 15, lineHeight: 1.65, color: "rgba(0,0,0,0.68)", marginBottom: 28, flex: 1 }}>{texte}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="pill-btn"
        style={{ background: couleur, color: "#fff", justifyContent: "center", padding: "17px 24px", fontSize: 15, textAlign: "center" }}>
        {bouton} ↗
      </a>
      </div>
    </div>
  );
}

export default function Tatum5Page() {
  if (!TATUM5_ENABLED) redirect("/");

  return (
    <main style={{ background: GREY, color: BLACK, paddingTop: 72 }}>
      {/* Bandeau : complet sur ordinateur, version recadrée + titre en texte sur mobile */}
      <section className="t5-banner-desktop" style={{ background: GREY }}>
        <img src="/media/tatum5/bandeau.jpg" alt="Personnalise ta paire de Tatum 5 et tente de gagner un voyage à San Antonio"
          style={{ display: "block", width: "100%", maxWidth: 1600, height: "auto", margin: "0 auto" }} />
      </section>
      <section className="t5-banner-mobile" style={{ background: GREY, padding: "28px 20px 0" }}>
        <p style={{ ...ANTON, fontSize: 18, textTransform: "uppercase", lineHeight: 1.1 }}>Personnalise ta paire de</p>
        <p style={{ ...ANTON, fontSize: 62, textTransform: "uppercase", lineHeight: 0.95, color: PINK }}>Tatum 5</p>
        <div style={{ height: 2, background: PINK, margin: "12px 0" }} />
        <p style={{ ...ANTON, fontSize: 18, textTransform: "uppercase", lineHeight: 1.1 }}>Et tente de gagner un voyage à</p>
        <p style={{ ...ANTON, fontSize: 46, textTransform: "uppercase", lineHeight: 0.95, color: PINK }}>San Antonio</p>
        <img src="/media/tatum5/bandeau-mobile.jpg" alt="" style={{ display: "block", width: "100%", height: "auto", marginTop: 20, borderRadius: 8 }} />
      </section>

      {/* Intro */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 8px" }}>
        <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: PINK_DARK }}>· Concours First Team</span>
        <h1 style={{ ...ANTON, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 0.95, textTransform: "uppercase", margin: "12px 0 18px" }}>
          Tatum 5 · <span style={{ color: PINK }}>Custom Challenge</span>
        </h1>
        <p style={{ ...MANROPE(500), fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.72)", maxWidth: 720 }}>
          Designe ta Jordan Tatum 5, donne-lui un nom et raconte-nous l&apos;histoire derrière ton design.
          La communauté et notre jury choisiront la meilleure paire, et son créateur s&apos;envolera pour San Antonio.
        </p>
      </section>

      {/* Les 2 étapes, côte à côte */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 0" }}>
        <div className="t5-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Carte num="01" couleur={PINK} href={NIKE_URL} image="/media/tatum5/chaussure.jpg" imageAlt="Jordan Tatum 5 fuchsia"
            titre={<>Personnalise<br />ta paire ici</>}
            texte="Crée ta Jordan Tatum 5 sur Nike By You : couleurs, matières, détails. Une fois ton design terminé, copie le lien de ta paire, tu en auras besoin pour l'étape 2."
            bouton="Créer ma paire sur Nike By You" />
          <Carte num="02" couleur={BLACK} href={FORM_URL} image="/media/tatum5/san-antonio.jpg" imageAlt="Le River Walk de San Antonio au coucher du soleil"
            titre={<>Remplis ta<br />candidature</>}
            texte="Colle le lien de ta paire, donne-lui un nom et raconte-nous en hommage à quoi tu l'as créée. Ça prend deux minutes."
            bouton="Envoyer ma candidature" />
        </div>
      </section>

      {/* Le prix à gagner */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 24px 0" }}>
        <div className="t5-prize" style={{ background: BLACK, color: "#fff", borderRadius: 10, padding: "40px 40px 36px", position: "relative", overflow: "hidden" }}>
          <span style={{ ...MANROPE(800), fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: PINK }}>· À gagner</span>
          <h2 style={{ ...ANTON, fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 0.95, textTransform: "uppercase", margin: "10px 0 28px" }}>
            Le grand prix
          </h2>
          <div className="t5-prize-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 14 }}>
            {PRIX.map((p) => (
              <div key={p.titre} style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 8, padding: "22px 22px 24px" }}>
                <div style={{ ...ANTON, fontSize: 28, lineHeight: 1, color: PINK, marginBottom: 12 }}>{p.num}</div>
                <div style={{ ...ANTON, fontSize: 24, lineHeight: 1.05, textTransform: "uppercase", marginBottom: 10 }}>{p.titre}</div>
                <div style={{ ...MANROPE(500), fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>{p.texte}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendrier */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 0" }}>
        <h2 style={{ ...ANTON, fontSize: 30, textTransform: "uppercase", marginBottom: 18 }}>Le programme</h2>
        <div className="t5-steps" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {ETAPES.map((e) => (
            <div key={e.date} style={{ background: BLACK, color: "#fff", borderRadius: 8, padding: "20px 22px" }}>
              <div style={{ ...ANTON, fontSize: 26, color: PINK, lineHeight: 1.05 }}>{e.date}</div>
              <div style={{ ...MANROPE(600), fontSize: 14, lineHeight: 1.5, marginTop: 8, color: "rgba(255,255,255,0.85)" }}>{e.texte}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Règlement */}
      <section id="reglement" style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 96px" }}>
        <h2 style={{ ...ANTON, fontSize: 30, textTransform: "uppercase", marginBottom: 18 }}>Règlement du concours</h2>
        <div style={{ background: "#fff", borderRadius: 10, padding: "32px 32px 12px" }} className="t5-reglement">
          {REGLEMENT.map((a) => (
            <div key={a.titre} style={{ marginBottom: 22 }}>
              <h3 style={{ ...MANROPE(800), fontSize: 14, letterSpacing: 0.3, textTransform: "uppercase", color: PINK_DARK, marginBottom: 8 }}>{a.titre}</h3>
              {a.paragraphes.map((p, i) => (
                <p key={i} style={{ ...MANROPE(500), fontSize: 14, lineHeight: 1.7, color: "rgba(0,0,0,0.75)", marginBottom: 6 }}><Texte t={p} /></p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .t5-banner-mobile { display: none; }
        @media (max-width: 1024px) { .t5-steps { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 768px) {
          .t5-banner-desktop { display: none; }
          .t5-banner-mobile { display: block; }
          .t5-cards, .t5-steps { grid-template-columns: 1fr !important; }
          .t5-card { padding: 28px 22px !important; }
          .t5-prize { padding: 30px 22px 26px !important; }
          .t5-prize-grid { grid-template-columns: 1fr !important; }
          .t5-reglement { padding: 24px 20px 6px !important; }
        }
      `}</style>
    </main>
  );
}
