"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import PageShell from "@/components/PageShell";
import StackMarquee from "@/components/StackMarquee";
import HeroSection from "@/sections/HeroSection";
import ManifestoSection from "@/sections/ManifestoSection";
import ShowcaseSection from "@/sections/ShowcaseSection";
import CapabilitiesSection from "@/sections/CapabilitiesSection";
import ProjectIndexSection from "@/sections/ProjectIndexSection";
import FooterSection from "@/sections/FooterSection";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    let cancelled = false;
    const finish = () => !cancelled && setIsLoaded(true);

    /* Espera a las fuentes (evita reventar los SplitText) con tope de 1,6 s */
    const timeout = setTimeout(finish, 1600);
    document.fonts?.ready.then(finish).catch(finish);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main>
      <Preloader isLoaded={isLoaded} onFinish={() => setIsPreloaderDone(true)} />

      <div className={isPreloaderDone ? "page-ready" : "page-hidden"}>
        <PageShell navReady={isPreloaderDone}>
          <HeroSection triggerAnimation={isPreloaderDone} />
          <StackMarquee />
          <ManifestoSection />
          <ShowcaseSection />
          <CapabilitiesSection />
          <ProjectIndexSection />
          <FooterSection />
        </PageShell>
      </div>
    </main>
  );
}
