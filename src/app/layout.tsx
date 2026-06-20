import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victorio — Desarrollo Web",
  description: "Desarrollo web que vende. Webs para negocios locales en Sevilla. WordPress, Shopify, WooCommerce.",
  keywords: "desarrollo web Sevilla, Shopify, WordPress, tienda online, SEO local",
  openGraph: {
    title: "Victorio — Desarrollo Web",
    description: "Desarrollo web que vende. Miguel Victorio — Sevilla, España.",
    url: "https://mvictorio.es",
    siteName: "Victorio",
    locale: "es_ES",
    type: "website",
  },
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
