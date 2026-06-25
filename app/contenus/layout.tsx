import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Contenus — Émissions, Podcast & Vidéos | First Team',
  description: 'Retrouvez toutes les émissions First Team : Libre Antenne NBA, First Day Show, Double Team, Offense et notre podcast basket. Le meilleur du basket français.',
  alternates: {
    canonical: 'https://firstteam-group.com/contenus',
  },
  openGraph: {
    title: 'Nos Contenus — First Team',
    description: 'Émissions, podcast et vidéos basket. First Team, le média basket de référence en France.',
    url: 'https://firstteam-group.com/contenus',
  },
}

export default function ContenusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
