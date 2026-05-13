import { notFound } from "next/navigation";
import ShopifyBuyButtonCollection from "@/components/ShopifyBuyButtonCollection";
import ShopNav from "@/components/ShopNav";
import { COLLECTIONS_LIST } from "@/lib/shopify-collections";

const ANTON = { fontFamily: "var(--font-anton), Anton, Impact, sans-serif" };
const MANROPE = (w: number): React.CSSProperties => ({
  fontFamily: "var(--font-manrope), Manrope, sans-serif",
  fontWeight: w,
});

export function generateStaticParams() {
  return COLLECTIONS_LIST.map((col) => ({ slug: col.slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = COLLECTIONS_LIST.find((col) => col.slug === slug);
  if (!collection) notFound();

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <ShopNav />
        <div style={{ marginBottom: 48 }}>
          <span
            style={{
              ...MANROPE(800),
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#FE0000",
              display: "block",
              marginBottom: 10,
            }}
          >
            · First Team Shop
          </span>
          <h1
            style={{
              ...ANTON,
              fontSize: "clamp(48px, 6vw, 96px)",
              textTransform: "uppercase",
              letterSpacing: -2,
              lineHeight: 0.9,
              color: "#0A0A0A",
            }}
          >
            {collection.title}
          </h1>
        </div>
        <ShopifyBuyButtonCollection collectionId={collection.id} />
      </div>
    </main>
  );
}
