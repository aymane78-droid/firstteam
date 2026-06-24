"use client";
import Link from "next/link";

const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

interface FooterLink {
  label: string;
  href?: string;
  disabled?: boolean;
}

const COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Nos plateformes",
    links: [
      { label: "First Team YouTube",  href: "https://youtube.com/@firstteam" },
      { label: "Offense YouTube",     href: "https://www.youtube.com/@OFFENSE_EMISSION" },
      { label: "Nos réseaux sociaux", href: "https://linktr.ee/FirstTeam101" },
    ],
  },
  {
    title: "First Team",
    links: [
      { label: "Contenus", href: "/contenus" },
      { label: "L'équipe", href: "/qui-nous-sommes" },
    ],
  },
  {
    title: "Partenaires",
    links: [
      { label: "Nos partenaires", href: "/partenaires" },
      { label: "Nous contacter",  href: "mailto:firstteam@influxcrew.com" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Le Vestiaire First Team", href: "/shop" },
      { label: "Voyages", disabled: true },
    ],
  },
];

export default function Footer() {
  const linkStyle = { display: "block", ...MANROPE(500), fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" };
  const hoverIn  = (e: React.MouseEvent) => ((e.target as HTMLElement).style.color = "#FED000");
  const hoverOut = (e: React.MouseEvent) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)");

  return (
    <footer style={{ background: "#0A0A0A", padding: "80px 40px 40px", color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 64, gap: 40, flexWrap: "wrap" }}>

          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <Link href="/" style={{ display: "block", marginBottom: 4, textDecoration: "none" }}>
              <img
                src="https://res.cloudinary.com/dg6xo2xwb/image/upload/v1781711343/FT-MONOGRAMME-ECRITURE-NOIR_1_zqgbi2.png"
                alt="First Team"
                style={{ height: 120, width: "auto", display: "block", filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p style={{ ...MANROPE(400), fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>
              Fondé par de vrais passionnés, depuis 2016, First Team propose des contenus basket uniques en toute indépendance.
            </p>
            <a href="mailto:contact@firstteam.fr" className="pill-btn pill-btn-red" style={{ fontSize: 13, padding: "10px 20px" }}>
              Nous contacter
            </a>
          </div>

          {/* Nav columns */}
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {COLS.map((col) => (
              <div key={col.title}>
                <p style={{ ...MANROPE(800), fontSize: 12, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>{col.title}</p>
                {col.links.map((l) => {
                  if (l.disabled) {
                    return (
                      <span key={l.label} style={{ display: "block", ...MANROPE(500), fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 10, opacity: 0.4, cursor: "not-allowed" }}>
                        {l.label}
                        <span style={{ ...MANROPE(700), fontSize: 9, color: "rgba(255,255,255,0.6)", letterSpacing: 1, textTransform: "uppercase" as const, marginLeft: 8, padding: "2px 6px", borderRadius: 3, border: "1px solid rgba(255,255,255,0.25)" }}>Bientôt</span>
                      </span>
                    );
                  }
                  const href = l.href!;
                  if (href.startsWith("http")) {
                    return (
                      <a key={l.label} href={href} target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                        {l.label}
                      </a>
                    );
                  }
                  if (href.startsWith("mailto")) {
                    return (
                      <a key={l.label} href={href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                        {l.label}
                      </a>
                    );
                  }
                  return (
                    <Link key={l.label} href={href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                      {l.label}
                    </Link>
                  );
                })}
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
