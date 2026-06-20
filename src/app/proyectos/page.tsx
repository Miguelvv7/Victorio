"use client";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger, ScrollSmoother } from "gsap/all";
import { projects } from "@/data/projects";
import Image from "next/image";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);

export default function Proyectos() {
  useGSAP(() => {
    if (window.innerWidth >= 768) { ScrollSmoother.create({ smooth: 2, effects: true }); }

    // Título con chars stagger
    const titleSplit = SplitText.create(".projects-page-title", { type: "chars" });
    gsap.from(titleSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power2.out",
      duration: 0.9,
      delay: 0.3,
    });

    gsap.to(".projects-page-eyebrow", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
    });

    // Hero scrub tilt
    gsap.timeline({
      scrollTrigger: {
        trigger: ".projects-page-hero",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    }).to(".projects-page-hero", {
      rotate: 4,
      scale: 0.92,
      yPercent: 20,
      ease: "power1.inOut",
    });

    // Filas de proyectos: aparecen al entrar en el viewport — SIN scrub
    // El scrub con "top top" como end no funciona porque la sección está ya en pantalla
    gsap.from(".proj-row", {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      ease: "power2.out",
      duration: 0.7,
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 92%",
      },
    });

    // CTA final
    gsap.from(".proj-cta", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".proj-cta",
        start: "top 92%",
      },
    });
  });

  return (
    <main>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">

          {/* HERO */}
          <section className="projects-page-hero relative bg-black w-screen min-h-[60vh] flex flex-col justify-center px-6 md:px-10 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
            <p
              className="projects-page-eyebrow font-paragraph text-white/30 text-sm uppercase tracking-[0.2em] mb-6"
              style={{ opacity: 0, transform: "translateY(8px)" }}
            >
              Proyectos seleccionados
            </p>
            <div className="overflow-hidden">
              <h1
                className="projects-page-title text-white font-bold uppercase tracking-tighter leading-[0.9]"
                style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
              >
                Trabajo.
              </h1>
            </div>
          </section>

          {/* GRID */}
          <section className="projects-grid bg-black px-6 md:px-10 pb-32 pt-8">
            <div className="max-w-5xl mx-auto flex flex-col">
              {projects.map((project) => {
                const inner = (
                  <>
                    <div className="flex items-center gap-6 md:gap-10">
                      <span className="text-white/20 font-bold text-2xl md:text-4xl w-12 shrink-0 leading-none">
                        {project.num}
                      </span>
                      <div>
                        <h2
                          className="text-white font-bold uppercase tracking-tighter leading-none group-hover:text-blue-400 transition-colors"
                          style={{ fontSize: "clamp(1.5rem, 4vw, 4rem)" }}
                        >
                          {project.title}
                        </h2>
                        <p className="text-white/30 text-sm mt-2" style={{ fontFamily: "ProximaNova, sans-serif" }}>
                          {project.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p style={{ fontFamily:"ProximaNova,sans-serif", color:"#60a5fa", textTransform:"uppercase", letterSpacing:"0.1em", fontSize:"0.7rem" }}>
                        {project.category}
                      </p>
                      <p className="text-white/20 text-xs" style={{ fontFamily: "ProximaNova, sans-serif" }}>
                        {project.year}
                      </p>
                      <span className="text-xs uppercase tracking-widest mt-2 block transition-colors" style={{ fontFamily: "ProximaNova, sans-serif", color: project.wip ? "#60a5fa" : "rgba(255,255,255,0.3)" }}>
                        {project.wip ? "En desarrollo" : "Ver →"}
                      </span>
                    </div>
                  </>
                );

                return project.wip
                  ? (
                    <div key={project.slug} className="proj-row border-t border-white/10 py-8 flex items-center justify-between gap-6" style={{ cursor: "default" }}>
                      {inner}
                    </div>
                  )
                  : (
                    <a key={project.slug} href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="proj-row group border-t border-white/10 py-8 flex items-center justify-between gap-6 hover:border-white/30 transition-colors">
                      {inner}
                    </a>
                  );
              })}
              <div className="border-t border-blue-900/20" />
            </div>

            {/* CTA */}
            <div className="proj-cta max-w-5xl mx-auto mt-20 border border-blue-900/20 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p
                  className="text-white/30 text-xs uppercase tracking-widest mb-2"
                  style={{ fontFamily: "ProximaNova, sans-serif" }}
                >
                  ¿Tu proyecto aquí?
                </p>
                <h3 className="text-white font-bold uppercase tracking-tighter"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}>
                  Disponible para 2026
                </h3>
              </div>
              <a
                href="mailto:miguelvictorio72@gmail.com"
                className="border border-white text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all whitespace-nowrap"
                style={{ fontFamily: "ProximaNova, sans-serif" }}
              >
                Hablamos →
              </a>
            </div>
          </section>

          <FooterSection />
        </div>
      </div>
    </main>
  );
}
