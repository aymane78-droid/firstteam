"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TRAVEL_ENABLED } from "../lib/flags";

const ANTON = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number) => ({ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: w });

const NAV_LINKS = [
  { label: "Contenus",     href: "/contenus" },
  { label: "L'équipe",     href: "/qui-nous-sommes" },
  { label: "Sponsors",     href: "/partenaires" },
  { label: "Shop",         href: "/shop" },
  ...(TRAVEL_ENABLED ? [{ label: "Travel", href: "/travel" }] : []),
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pastVideo, setPastVideo] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      setPastVideo(window.scrollY > window.innerHeight - 80);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  if (isHome && !pastVideo) return null;

  return (
    <header className="header-wrap" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #eee",
      transition: "all 0.3s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo + Desktop nav — groupe gauche */}
      <div className="header-inner-left" style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <Link href="/" className="nav-logo-link">
          <Image src="https://res.cloudinary.com/dg6xo2xwb/image/upload/FT-MONOGRAMME-ECRITURE-NOIR_1_zqgbi2.png" alt="First Team" fill priority style={{ objectFit: "contain", objectPosition: "left" }} />
        </Link>

        <nav style={{ display: "flex", gap: 36, alignItems: "center" }} className="header-mobile-nav hidden lg:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-link"
              style={{
                ...MANROPE(600),
                fontSize: 14,
                color: pathname === item.href ? "#FE0000" : "#0A0A0A",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* CTA + burger */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <a href="mailto:firstteam@influxcrew.com?subject=Contact%20depuis%20le%20site%20First%20Team" className="pill-btn pill-btn-red hidden sm:inline-flex" style={{ fontSize: 13, padding: "10px 20px" }}>
          Nous contacter →
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="header-burger lg:hidden"
          style={{ color: "#0A0A0A", background: "none", border: "none", cursor: "pointer", padding: 4 }}
          aria-label="Menu"
        >
          {open ? (
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ width: 24, height: 24 }}>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ width: 24, height: 24 }}>
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="header-dropdown-top" style={{
          background: "white", borderBottom: "1px solid #eee",
          padding: "16px 40px 24px",
        }}>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                ...MANROPE(600), display: "block", fontSize: 15,
                color: "#0A0A0A", textDecoration: "none",
                padding: "14px 0", borderBottom: "1px solid #f0f0f0",
              }}
            >
              {item.label}
            </Link>
          ))}
          <a href="mailto:firstteam@influxcrew.com?subject=Contact%20depuis%20le%20site%20First%20Team" className="pill-btn pill-btn-red" style={{ marginTop: 20, fontSize: 13, display: "inline-flex" }}>
            Nous contacter →
          </a>
        </div>
      )}
    </header>
  );
}
