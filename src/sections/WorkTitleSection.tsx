"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { projects } from "@/data/projects";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const WorkTitleSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(() => {
    if (window.innerWidth < 768) return;

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

  /* ── Mobile: simple grid of project cards ── */
  if (isMobile) {
    return (
      <section style={{ background: "#0c1829", padding: "4rem 1.2rem 5rem" }}>
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}
        >
          Proyectos
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: "rgba(240,244,255,0.07)", fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(3rem,14vw,5rem)", letterSpacing: "-0.04em", lineHeight: 1, margin: "0 0 2.5rem" }}
        >
          Seleccionados — 2026
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {projects.map((project, i) => {
            const card = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: "#132035", border: "1px solid rgba(96,165,250,0.25)", borderRadius: "0.8rem", overflow: "hidden" }}
              >
                <div style={{ position: "relative", height: "11rem" }}>
                  <Image src={project.cover} alt={project.title} fill style={{ objectFit: "cover" }} sizes="100vw" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(12,24,41,0.85) 100%)" }} />
                  {project.wip && (
                    <div style={{ position: "absolute", top: "0.6rem", right: "0.6rem", background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.4)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: "2px" }}>
                      <span style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>En desarrollo</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: "1rem 1.2rem 1.4rem" }}>
                  <p style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 0.25rem" }}>{project.category}</p>
                  <h3 style={{ color: "#f0f4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", fontSize: "1.2rem", lineHeight: 1, margin: "0 0 0.25rem" }}>{project.title}</h3>
                  <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.5)", fontSize: "0.75rem", margin: 0 }}>{project.tagline}</p>
                  {!project.wip && (
                    <p style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.7rem" }}>Ver proyecto →</p>
                  )}
                </div>
              </motion.div>
            );

            return project.wip
              ? <div key={project.slug}>{card}</div>
              : <a key={project.slug} href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{card}</a>;
          })}
        </div>
      </section>
    );
  }

  /* ── Desktop: original cinematic version ── */
  return (
    <section className="work-marquee-section">
      <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingTop: "5vw", overflow: "hidden" }}>
        <h1 className="wt-first"  style={{ color: "rgba(240,244,255,0.07)" }}>Proyectos</h1>
        <h1 className="wt-second" style={{ color: "rgba(96,165,250,0.12)" }}>Seleccionados</h1>
        <h1 className="wt-third"  style={{ color: "rgba(240,244,255,0.05)" }}>— 2026</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", paddingLeft: "13rem", position: "absolute", bottom: "50vh" }}>
        {projects.map((project, index) => {
          const card = (
            <div style={{ width: "18rem", background: "#132035", border: "1px solid rgba(96,165,250,0.25)", borderRadius: "1.2vw", overflow: "hidden" }}>
              <div style={{ position: "relative", height: "10rem", overflow: "hidden" }}>
                <Image src={project.cover} alt={project.title} fill style={{ objectFit: "cover" }} sizes="288px" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(12,24,41,0.8) 100%)" }} />
                {project.wip && (
                  <div style={{ position: "absolute", top: "0.6rem", right: "0.6rem", background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.4)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: "2px" }}>
                    <span style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>En desarrollo</span>
                  </div>
                )}
              </div>
              <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
                <p style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 0.3rem" }}>{project.category}</p>
                <h3 style={{ color: "#f0f4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", fontSize: "1.3rem", lineHeight: 1, margin: 0 }}>{project.title}</h3>
                <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.5)", fontSize: "0.75rem", margin: "0.3rem 0 0" }}>{project.tagline}</p>
              </div>
            </div>
          );

          return project.wip
            ? <div key={project.slug} className="work-card" style={{ marginLeft: "-11rem", transform: index % 2 === 0 ? "rotate(-4deg)" : "rotate(3deg)", flexShrink: 0, cursor: "default" }}>{card}</div>
            : <a key={project.slug} href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="work-card" style={{ textDecoration: "none", marginLeft: "-11rem", transform: index % 2 === 0 ? "rotate(-4deg)" : "rotate(3deg)", flexShrink: 0 }}>{card}</a>;
        })}
      </div>
    </section>
  );
};

export default WorkTitleSection;
