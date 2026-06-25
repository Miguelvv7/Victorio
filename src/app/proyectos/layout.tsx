import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos reales de desarrollo web: tiendas Shopify, webs corporativas con WordPress y aplicaciones Next.js. Trabajo desde Écija para clientes de toda España.",
  alternates: { canonical: "/proyectos" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
