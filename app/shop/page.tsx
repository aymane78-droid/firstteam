import { redirect } from "next/navigation";
import { SHOP_ENABLED } from "@/app/lib/flags";
import { isPrivateKey } from "@/lib/private-link";
import ShopGrid from "@/components/ShopGrid";
import {
  TeaserVideo,
  AnnouncementBar,
  Hero,
  PresentationSection,
  InfoBand,
  PhotoSlider,
  BigMarquee,
  StudioSection,
} from "@/components/shop/sections";
import FloatingCartButton from "@/components/FloatingCartButton";
import { getAllProducts } from "@/lib/shopify-queries";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  // Shop masqué : visible seulement avec le lien privé /shop?k=… (aperçu avant le lancement)
  if (!SHOP_ENABLED) {
    const { k } = await searchParams;
    if (!isPrivateKey("shop", k)) redirect("/");
  }
  let products: Awaited<ReturnType<typeof getAllProducts>> = [];
  try {
    products = await getAllProducts();
  } catch {
    // fallback: ShopGrid affiche le message d'erreur
  }

  return (
    <main style={{ background: "#0A0A0A" }}>
      <TeaserVideo />
      <AnnouncementBar />
      <Hero />
      <PresentationSection />
      <ShopGrid products={products} />
      <InfoBand />
      <PhotoSlider />
      <BigMarquee />
      <StudioSection />
      {/* Anciennes capsules (sold out). La grille du haut accueillera le nouveau merch. */}
      <ShopGrid
        products={products}
        id="capsules-passees"
        eyebrow="· ARCHIVE"
        title={<>Les capsules<br />passées.</>}
      />
      <FloatingCartButton />
    </main>
  );
}
