import ShopifyBuyButton from "@/components/ShopifyBuyButton";

export default function ShopifyTestPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", background: "#fff" }}>
      <h1 style={{ fontFamily: "var(--font-anton), Anton, Impact, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", letterSpacing: "-1px", color: "#0A0A0A", marginBottom: 48 }}>
        Test Shopify Buy Button
      </h1>
      <ShopifyBuyButton />
    </main>
  );
}
