import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Desarrollador web freelance en Écija, Sevilla. Especializado en Shopify, WordPress, automatizaciones n8n y web scraping. Aprendo construyendo, cuido el detalle.",
  alternates: { canonical: "/sobre-mi" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
