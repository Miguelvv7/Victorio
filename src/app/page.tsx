"use client";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import HeroSection from "@/sections/HeroSection";
import MessageSection from "@/sections/MessageSection";
import StackMarquee from "@/components/StackMarquee";
import ProjectsSection from "@/sections/ProjectsSection";
import CinematicServicesSection from "@/sections/CinematicServicesSection";
import ProcessSection from "@/sections/ProcessSection";
import WorkTitleSection from "@/sections/WorkTitleSection";
import FooterSection from "@/sections/FooterSection";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const t = setTimeout(() => setIsLoaded(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(() => {
    if (window.innerWidth >= 768) {
      ScrollSmoother.create({ smooth: 2, effects: true });
    }
  });

  return (
    <main>
      <Preloader isLoaded={isLoaded} onFinish={() => setIsPreloaderDone(true)} />
      <div className={!isPreloaderDone ? "h-screen overflow-hidden opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <Navbar />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <HeroSection triggerAnimation={isPreloaderDone} />
            <StackMarquee />
            <MessageSection />
            <ProjectsSection />
            <CinematicServicesSection />
            <ProcessSection />
            <WorkTitleSection />
            <FooterSection />
          </div>
        </div>
      </div>
    </main>
  );
}
