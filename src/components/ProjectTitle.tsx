"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ProjectTitle = () => {
  useGSAP(() => {
    const firstSplit  = SplitText.create(".proj-first-text h1",  { type: "chars" });
    const secondSplit = SplitText.create(".proj-second-text h1", { type: "chars" });

    gsap.from(firstSplit.chars, { yPercent: 200, stagger: 0.02, ease: "power1.inOut", scrollTrigger: { trigger: ".projects-section", start: "top 92%" } });
    gsap.to(".proj-text-scroll", { duration: 1, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scrollTrigger: { trigger: ".projects-section", start: "top 10%" } });
    gsap.from(secondSplit.chars, { yPercent: 200, stagger: 0.02, ease: "power1.inOut", scrollTrigger: { trigger: ".projects-section", start: "top 1%" } });
  });

  return (
    <div className="col-center h-full gap-12 md:gap-20" style={{ padding: "2rem 1.5rem" }}>
      <div style={{ overflow: "hidden" }} className="proj-first-text">
        <h1 style={{ color: "#f0f4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", fontSize: "clamp(3rem,7vw,8rem)", lineHeight: 1, margin: 0 }}>
          Proyectos
        </h1>
      </div>

      <div style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }} className="proj-text-scroll">
        <div style={{ background: "#60a5fa", padding: "0.4rem 1.25rem", display: "inline-block" }}>
          <h2 style={{ color: "#f0f4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", fontSize: "clamp(2rem,5vw,6rem)", lineHeight: 1, margin: 0 }}>
            seleccionados
          </h2>
        </div>
      </div>

      <div style={{ overflow: "hidden" }} className="proj-second-text">
        <h1 style={{ color: "rgba(240,244,255,0.2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", fontSize: "clamp(3rem,7vw,8rem)", lineHeight: 1, margin: 0 }}>
          — 2026
        </h1>
      </div>
    </div>
  );
};

export default ProjectTitle;
