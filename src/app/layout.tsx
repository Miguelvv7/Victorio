import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Miguel Victorio — Desarrollo web en Écija y Sevilla",
    template: "%s · Miguel Victorio",
  },
  description: "Desarrollo web freelance en Écija (Sevilla). Shopify a medida, WordPress, automatizaciones con n8n y scraping. Trabajo solo, entrego en 15 días, precio cerrado.",
  keywords: "desarrollo web Écija, desarrollo web Sevilla, Shopify freelance, tienda online Sevilla, WordPress Écija, automatizaciones n8n, scraping Python",
  authors: [{ name: "Miguel Victorio" }],
  creator: "Miguel Victorio",
  metadataBase: new URL("https://mvictorio.es"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Miguel Victorio — Desarrollo web en Écija y Sevilla",
    description: "Shopify a medida, WordPress y automatizaciones. Trabajo solo, entrego en 15 días, precio cerrado.",
    url: "https://mvictorio.es",
    siteName: "Miguel Victorio · Desarrollo Web",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miguel Victorio — Desarrollo web en Écija y Sevilla",
    description: "Shopify a medida, WordPress y automatizaciones. Trabajo solo, entrego en 15 días.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
