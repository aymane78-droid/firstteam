import type { Metadata } from "next";
import { Anton, Manrope, Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { OrganizationJsonLd } from "./components/JsonLd";
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-roboto-next" });

export const metadata: Metadata = {
  title: "First Team — Le média basket de référence en France",
  description: "Débats, entretiens exclusifs, analyses NBA. Le premier média basket 100% numérique en France.",
  keywords: ["basket", "NBA", "média basket français", "first team", "analyse NBA", "débat basket"],
  openGraph: {
    title: "First Team — Le média basket de référence en France",
    description: "Débats, entretiens exclusifs, analyses NBA. Le premier média basket 100% numérique en France.",
    url: "https://firstteam-group.com",
    siteName: "First Team Group",
    type: "website",
    images: [
      {
        url: "https://firstteam-group.com/icon.png",
        width: 512,
        height: 512,
        alt: "First Team Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "First Team — Le média basket de référence en France",
    description: "Débats, entretiens exclusifs, analyses NBA.",
    images: ["https://firstteam-group.com/icon.png"],
  },
  alternates: {
    canonical: "https://firstteam-group.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${anton.variable} ${manrope.variable} ${inter.variable} ${roboto.variable}`}>
     <body className="min-h-screen antialiased">
        <OrganizationJsonLd />
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
