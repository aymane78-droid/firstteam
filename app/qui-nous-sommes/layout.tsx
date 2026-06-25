import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "L'Équipe First Team — Thomas, Erwan & toute la bande",
  description: "Découvrez l'équipe derrière First Team, le média basket de référence en France. Thomas, Erwan, Stephen et tous les visages qui font First Team.",
  alternates: {
    canonical: 'https://firstteam-group.com/qui-nous-sommes',
  },
  openGraph: {
    title: "L'Équipe First Team",
    description: "Les visages derrière le média basket de référence en France.",
    url: 'https://firstteam-group.com/qui-nous-sommes',
  },
}

export default function QuiNousSommesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
