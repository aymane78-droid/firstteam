"use client";
import { useState } from "react";

const FT_FONT = { fontFamily: "JoyrideExt, Arial Black, sans-serif" };

const PRODUCTS = [
  { id: 1, name: "Hoodie FIRST TEAM Classic", price: 59.99, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop", tag: "BEST SELLER", cat: "TOPS" },
  { id: 2, name: "T-shirt FIRST TEAM Logo", price: 34.99, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop", tag: "NEW", cat: "TOPS" },
  { id: 3, name: "Casquette FT Snapback", price: 29.99, img: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=600&fit=crop", tag: null, cat: "ACCESSOIRES" },
  { id: 4, name: "Mug OFFENSE Edition", price: 14.99, img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop", tag: "OFFENSE", cat: "ACCESSOIRES" },
  { id: 5, name: "Short Basket FT", price: 39.99, img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop", tag: null, cat: "BAS" },
  { id: 6, name: "Sweat OFFENSE Premium", price: 69.99, img: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&h=600&fit=crop", tag: "OFFENSE", cat: "TOPS" },
];

const CATS = ["TOUS", "TOPS", "BAS", "ACCESSOIRES"];

export default function MerchPage() {
  const [cat, setCat] = useState("TOUS");

  const filtered = cat === "TOUS" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);

  return (
    <main className="pt-16 min-h-screen bg-black">
      {/* Header */}
      <div className="bg-ft-yellow">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
          <p className="text-black/50 text-[10px] tracking-[4px] uppercase mb-3" style={FT_FONT}>BOUTIQUE</p>
          <h1 className="text-black uppercase leading-none mb-3" style={{ ...FT_FONT, fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            MAISON<br />FIRST TEAM
          </h1>
          <p className="text-black/60 text-sm" style={{ fontFamily: "var(--font-roboto-next), sans-serif", fontWeight: 400 }}>
            En collaboration avec <strong style={{ fontWeight: 900 }}>Champion</strong>
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-ft-border sticky top-16 bg-black z-10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-0">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-4 text-[10px] tracking-[2.5px] uppercase border-b-2 transition-all ${
                  cat === c ? "border-ft-yellow text-ft-yellow" : "border-transparent text-ft-muted hover:text-white"
                }`}
                style={FT_FONT}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="group">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-ft-card mb-4">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.tag && (
                  <span
                    className={`absolute top-3 left-3 text-[9px] tracking-[2px] uppercase px-2.5 py-1 ${
                      product.tag === "OFFENSE" ? "bg-white text-black" : "bg-ft-yellow text-black"
                    }`}
                    style={FT_FONT}
                  >
                    {product.tag}
                  </span>
                )}
                {/* CTA overlay */}
                <div className="absolute inset-0 flex items-end justify-stretch p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="w-full bg-ft-yellow text-black text-[10px] tracking-[2px] uppercase py-3 hover:bg-ft-yellow-dark transition-colors"
                    style={FT_FONT}
                  >
                    AJOUTER AU PANIER
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white text-[11px] tracking-[1.5px] uppercase leading-tight mb-1" style={FT_FONT}>
                    {product.name}
                  </h3>
                  <span className="text-ft-muted text-[9px] tracking-[2px] uppercase" style={FT_FONT}>{product.cat}</span>
                </div>
                <span className="text-ft-yellow font-bold text-sm shrink-0 ml-4" style={FT_FONT}>
                  {product.price.toFixed(2)}€
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA band */}
      <section className="bg-ft-dark border-t border-ft-border mt-8">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-white uppercase leading-tight mb-2" style={{ ...FT_FONT, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              LIVRAISON OFFERTE<br />DÈS 60€
            </h2>
            <p className="text-ft-muted text-sm">Sur toute la France métropolitaine.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 bg-ft-yellow flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="black" className="w-5 h-5">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-white text-[11px] tracking-[2px] uppercase" style={FT_FONT}>Panier sécurisé</p>
              <p className="text-ft-muted text-[10px]">Retours sous 30 jours</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
