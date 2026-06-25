"use client";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ProjectSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    const scrollAmount = (sliderRef?.current?.scrollWidth as number) - window.innerWidth;
    if (!isTablet) {
      gsap.timeline({
        scrollTrigger: { trigger: ".projects-section", start: "2% top", end: `+=${scrollAmount + 1500}px`, scrub: true, pin: true, snap: 1 / (projects.length - 1) },
      }).to(".projects-section", { x: `-${scrollAmount + 1500}px`, ease: "power1.inOut" });
    }

    if (!isTablet) {
      gsap.timeline({
        scrollTrigger: { trigger: ".projects-section", start: "top top", end: "bottom 80%", scrub: true },
      })
        .to(".proj-first-text",  { xPercent: -30, ease: "power1.inOut" })
        .to(".proj-text-scroll", { xPercent: -22, ease: "power1.inOut" }, "<")
        .to(".proj-second-text", { xPercent: -10, ease: "power1.inOut" }, "<");
    }

    /* ── Móvil: cards entran con fade + slide ── */
    if (isTablet) {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });
    }
  });

  return (
    <div ref={sliderRef} className="projects-slider-wrapper">
      <div className="projects-row">
        {projects.map((project) => (
          project.wip
            ? <div key={project.slug} className={`project-card group ${project.rotation}`} style={{ cursor: "default" }}>

            {/* Imagen real del proyecto */}
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="card-img object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 320px, 45vw"
            />

            <div className="card-overlay" />

            {/* Badge en desarrollo */}
            {project.wip && (
              <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 20, background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.4)", backdropFilter: "blur(8px)", padding: "4px 12px" }}>
                <span style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>
                  En desarrollo
                </span>
              </div>
            )}

            <div className="card-info">
              <p style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                {project.category} · {project.year}
              </p>
              <h2 style={{ color: "#f0f4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1, fontSize: "clamp(1.8rem,3vw,3rem)", margin: "0 0 0.3rem" }}>
                {project.title}
              </h2>
              <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.6)", fontSize: "0.85rem", margin: 0 }}>
                {project.tagline}
              </p>
              {!project.wip && (
                <div style={{ marginTop: "1rem", fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Ver proyecto →
                </div>
              )}
            </div>
            </div>
            : <Link key={project.slug} href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className={`project-card group ${project.rotation}`} style={{ textDecoration: "none" }}>
              <Image src={project.cover} alt={project.title} fill
                className="card-img object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 320px, 45vw" />
              <div className="card-overlay" />
              <div className="card-info">
                <p style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  {project.category} · {project.year}
                </p>
                <h2 style={{ color: "#f0f4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1, fontSize: "clamp(1.8rem,3vw,3rem)", margin: "0 0 0.3rem" }}>
                  {project.title}
                </h2>
                <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.6)", fontSize: "0.85rem", margin: 0 }}>
                  {project.tagline}
                </p>
                <div style={{ marginTop: "1rem", fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Ver proyecto →
                </div>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectSlider;
