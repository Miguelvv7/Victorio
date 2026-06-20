"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { services } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".sv-panel");

      // Estado inicial: todos ocultos menos el primero
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 70 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${panels.length * 110}%`,
          pin: true,
          pinType: "transform",
          scrub: 0.9,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i < panels.length - 1) {
          tl.to(panel, { autoAlpha: 0, y: -55, duration: 0.5, ease: "power2.in" }, `+=${0.4}`)
            .to(panels[i + 1], { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.1");
        }
      });

      // Línea de progreso horizontal
      gsap.to(".sv-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${panels.length * 110}%`,
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="cinematic-services-section">
      {/* Header fijo dentro de la sección */}
      <div className="sv-header">
        <div className="sv-header-left">
          <span className="sv-label">Servicios</span>
          {/* Contador animado */}
          <div style={{ fontFamily: "ProximaNova, sans-serif", fontSize: "0.75rem", color: "rgba(240,244,255,0.5)", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ color: "#60a5fa", fontWeight: 700 }}>Servicios</span>
            <span>/ 03</span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="sv-progress-track">
          <div className="sv-progress-bar" />
        </div>
      </div>

      {/* Paneles */}
      {services.map((svc, i) => (
        <div
          key={svc.num}
          className="sv-panel"
          style={i > 0 ? { opacity: 0, visibility: "hidden", transform: "translateY(70px)" } : {}}
        >

          <div className="sv-panel-inner">
            {/* Título masivo */}
            <div className="sv-title-block">
              <h2 className="sv-title">{svc.title}</h2>
              <div className="sv-title-meta">
                <span className="sv-price">{svc.price}</span>
                <span className="sv-dot">·</span>
                <span className="sv-time">{svc.time}</span>
              </div>
            </div>

            {/* Info derecha */}
            <div className="sv-info-block">
              <p className="sv-desc">{svc.desc}</p>
              <ul className="sv-includes">
                {svc.includes.map((item, j) => (
                  <li key={j} className="sv-include-item">
                    <span className="sv-arrow">▸</span>
                    {item}
                  </li>
                ))}
              </ul>

              {i === services.length - 1 && (
                <a
                  href="mailto:miguelvictorio72@gmail.com"
                  className="sv-cta"
                >
                  Pedir presupuesto →
                </a>
              )}
            </div>
          </div>

          {/* Línea inferior */}
          <div className="sv-panel-line" />
        </div>
      ))}
    </div>
  );
}
