import { Metadata } from 'next'
import { SHOP_ENABLED } from '@/app/lib/flags'

export const metadata: Metadata = {
  title: 'Shop — Merch & Produits First Team',
  description: "Commandez les produits officiels First Team. T-shirts, accessoires et collections exclusives pour les fans du meilleur média basket français.",
  // tant que le Shop est masqué, l'aperçu privé n'est pas indexé par Google
  ...(SHOP_ENABLED ? {} : { robots: { index: false, follow: false } }),
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
