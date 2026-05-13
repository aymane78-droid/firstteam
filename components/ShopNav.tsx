"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COLLECTIONS_LIST } from "@/lib/shopify-collections";

const MANROPE = (w: number): React.CSSProperties => ({
  fontFamily: "var(--font-manrope), Manrope, sans-serif",
  fontWeight: w,
});

const links = [
  { href: "/shop", label: "Tout" },
  ...COLLECTIONS_LIST.map((col) => ({ href: `/shop/${col.slug}`, label: col.title })),
];

export default function ShopNav() {
  const pathname = usePathname();

  return (
    <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            style={{
              padding: "9px 20px",
              borderRadius: 999,
              border: `1.5px solid ${isActive ? "#0A0A0A" : "rgba(0,0,0,0.18)"}`,
              background: isActive ? "#0A0A0A" : "transparent",
              color: isActive ? "#fff" : "#0A0A0A",
              ...MANROPE(700),
              fontSize: 12,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.15s ease",
            }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
