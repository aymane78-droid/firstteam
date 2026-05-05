import type { Metadata } from "next";
import { Anton, Manrope, Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-roboto-next" });

export const metadata: Metadata = {
  title: "First Team — Le média basket de référence en France",
  description: "Débats, entretiens exclusifs, analyses NBA. Le premier média basket 100% numérique en France.",
  openGraph: { title: "First Team", description: "Le média basket de référence en France", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${anton.variable} ${manrope.variable} ${inter.variable} ${roboto.variable}`}>
      <body className="min-h-screen antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
