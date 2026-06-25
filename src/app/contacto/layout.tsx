import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contacto",
  description: "¿Necesitas una tienda Shopify, web WordPress o automatizar procesos? Cuéntame tu proyecto. Respondo en menos de 24h.",
  alternates: { canonical: "/contacto" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
