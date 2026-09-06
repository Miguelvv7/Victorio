"use client";

import { useEffect, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { createSmoother, refreshOnLoad, ScrollTrigger } from "@/lib/motion";

interface PageShellProps {
  children: ReactNode;
  /** Oculta la barra hasta que termine el preloader de la home. */
  navReady?: boolean;
}

/**
 * Envoltorio común: scroll suave (también táctil), cursor y navegación.
 * Todas las páginas lo usan para que las animaciones se comporten igual.
 */
export default function PageShell({ children, navReady = true }: PageShellProps) {
  useEffect(() => {
    const killSmoother = createSmoother();
    const offLoad = refreshOnLoad();
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", onResize);
    return () => {
      killSmoother();
      offLoad();
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      {navReady && <Navbar />}
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </>
  );
}
