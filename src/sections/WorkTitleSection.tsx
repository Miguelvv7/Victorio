"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { projects } from "@/data/projects";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const WorkTitleSection = () => {
  useGSAP(() => {
    gsap.set(".work-marquee-section", { marginTop: "-140vh" });

    gsap.timeline({
      scrollTrigger: { trigger: ".work-marquee-section", start: "top bottom", end: "200% top", scrub: true },
    })
      .to(".wt-first",  { xPercent: 60 })
      .to(".wt-second", { xPercent: 20 }, "<")
      .to(".wt-third",  { xPercent: -40 }, "<");

    gsap.timeline({
      scrollTrigger: { trigger: ".work-marquee-section", start: "10% top", end: "200% top", scrub: 1.5, pin: true },
    }).from(".work-card", { yPercent: 150, stagger: 0.2, ease: "power1.inOut" });
  });

  return (
    <section className="work-marquee-section">
      <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingTop: "5vw", overflow: "hidden" }}>
        <h1 className="wt-first"  style={{ color: "rgba(240,244,255,0.07)" }}>Proyectos</h1>
        <h1 className="wt-second" style={{ color: "rgba(96,165,250,0.12)" }}>Seleccionados</h1>
        <h1 className="wt-third"  style={{ color: "rgba(240,244,255,0.05)" }}>— 2026</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", paddingLeft: "13rem", position: "absolute", bottom: "50vh" }}>
        {projects.map((project, index) => (
          <a key={project.slug} href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="work-card"
            style={{ textDecoration: "none", marginLeft: "-11rem", transform: index % 2 === 0 ? "rotate(-4deg)" : "rotate(3deg)", flexShrink: 0 }}>
            <div style={{ width: "18rem", background: "#132035", border: "1px solid rgba(96,165,250,0.25)", borderRadius: "1.2vw", overflow: "hidden" }}>
              {/* Imagen real */}
              <div style={{ position: "relative", height: "10rem", overflow: "hidden" }}>
                <Image src={project.cover} alt={project.title} fill style={{ objectFit: "cover" }} sizes="288px" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(12,24,41,0.8) 100%)" }} />
              </div>
              <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
                <p style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 0.3rem" }}>
                  {project.category}
                </p>
                <h3 style={{ color: "#f0f4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", fontSize: "1.3rem", lineHeight: 1, margin: 0 }}>
                  {project.title}
                </h3>
                <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.5)", fontSize: "0.75rem", marginTop: "0.3rem", margin: "0.3rem 0 0" }}>
                  {project.tagline}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default WorkTitleSection;
