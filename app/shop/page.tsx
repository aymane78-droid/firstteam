import ShopGrid from "@/components/ShopGrid";
import {
  AnnouncementBar,
  Hero,
  PresentationSection,
  InfoBand,
  PhotoSlider,
  BigMarquee,
  StudioSection,
  Newsletter,
} from "@/components/shop/sections";
import { getAllProducts } from "@/lib/shopify-queries";

export default async function ShopPage() {
  let products: Awaited<ReturnType<typeof getAllProducts>> = [];
  try {
    products = await getAllProducts();
  } catch {
    // fallback: ShopGrid affiche le message d'erreur
  }

  return (
    <main style={{ background: "#0A0A0A" }}>
      <AnnouncementBar />
      <Hero />
      <PresentationSection />
      <ShopGrid products={products} />
      <InfoBand />
      <PhotoSlider />
      <BigMarquee />
      <StudioSection />
      <Newsletter />
    </main>
  );
}
