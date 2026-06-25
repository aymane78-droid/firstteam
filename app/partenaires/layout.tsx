import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partenaires & Sponsors — First Team Group',
  description: "Vous souhaitez collaborer avec First Team ? Découvrez nos offres partenaires et rejoignez les marques qui font confiance au premier média basket français.",
  alternates: {
    canonical: 'https://firstteam-group.com/partenaires',
  },
  openGraph: {
    title: 'Partenaires — First Team Group',
    description: "Collaborez avec le média basket de référence en France.",
    url: 'https://firstteam-group.com/partenaires',
  },
}

export default function PartenairesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
