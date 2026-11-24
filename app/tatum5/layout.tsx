import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tatum 5 · Custom Challenge — First Team",
  description: "Personnalise ta paire de Jordan Tatum 5 et tente de gagner un voyage à San Antonio avec First Team.",
  alternates: { canonical: "https://firstteam-group.com/tatum5" },
  openGraph: {
    title: "Tatum 5 · Custom Challenge — First Team",
    description: "Personnalise ta paire de Tatum 5 et tente de gagner un voyage à San Antonio.",
    url: "https://firstteam-group.com/tatum5",
    images: [{ url: "https://firstteam-group.com/media/tatum5/bandeau.jpg", width: 2124, height: 587 }],
  },
};

export default function Tatum5Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
