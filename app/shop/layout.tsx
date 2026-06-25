import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop — Merch & Produits First Team',
  description: "Commandez les produits officiels First Team. T-shirts, accessoires et collections exclusives pour les fans du meilleur média basket français.",
  alternates: {
    canonical: 'https://firstteam-group.com/shop',
  },
  openGraph: {
    title: 'Shop First Team',
    description: "Les produits officiels du média basket de référence en France.",
    url: 'https://firstteam-group.com/shop',
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
