"use client";
import Link from "next/link";

const ANTON = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

const COLS = [
  { title: "Contenus",     links: [{ label: "YouTube", href: "https://youtube.com/@firstteam" }, { label: "Twitch", href: "https://twitch.tv" }, { label: "Instagram", href: "https://www.instagram.com/firstteam101/" }, { label: "TikTok", href: "https://tiktok.com" }, { label: "Podcasts", href: "#" }] },
  { title: "First Team",   links: [{ label: "À propos", href: "/qui-nous-sommes" }, { label: "L'équipe", href: "/qui-nous-sommes" }, { label: "Nos projets", href: "/qui-nous-sommes" }, { label: "Presse", href: "#" }] },
  { title: "Partenaires",  links: [{ label: "Devenir partenaire", href: "mailto:contact@firstteam.fr" }, { label: "Nos marques", href: "#" }, { label: "Contact", href: "mailto:contact@firstteam.fr" }] },
  { title: "Boutique",     links: [{ label: "Merch", href: "#" }, { label: "Voyages", href: "#" }, { label: "Éditions limitées", href: "#" }] },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0A0A0A", padding: "80px 40px 40px", color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 64, gap: 40, flexWrap: "wrap" }}>

          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, textDecoration: "none" }}>
              <div style={{ width: 36, height: 36, background: "#FE0000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2"/>
                  <path d="M4 8h8M8 4v8" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <span style={{ ...ANTON, fontSize: 22, letterSpacing: 1, color: "#fff" }}>FIRST TEAM</span>
            </Link>
            <p style={{ ...MANROPE(400), fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>
              Le premier média basket 100% numérique en France. On parle basket comme personne depuis 2014.
            </p>
            <a href="mailto:contact@firstteam.fr" className="pill-btn pill-btn-red" style={{ fontSize: 13, padding: "10px 20px" }}>
              Nous contacter
            </a>
          </div>

          {/* Nav columns */}
          <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
            {COLS.map((col) => (
              <div key={col.title}>
                <p style={{ ...MANROPE(800), fontSize: 12, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>{col.title}</p>
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={{ display: "block", ...MANROPE(500), fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FED000")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 12 }}>
          <p style={{ ...MANROPE(400), fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2026 First Team — Tous droits réservés</p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FE0000" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FED000" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#002EFE" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
