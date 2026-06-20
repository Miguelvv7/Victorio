"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { metrics } from "@/data/projects";

gsap.registerPlugin(SplitText, ScrollTrigger);

const SCR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
function scramble(chars: Element[], originals: string[]) {
  chars.forEach((char, i) => {
    const orig = originals[i];
    if (!orig || orig === " ") return;
    let n = 0; const max = 5 + Math.floor(Math.random() * 5);
    const iv = setInterval(() => {
      (char as HTMLElement).textContent = SCR[Math.floor(Math.random() * SCR.length)];
      if (++n >= max) { clearInterval(iv); (char as HTMLElement).textContent = orig; }
    }, 45);
  });
}

interface HeroSectionProps { triggerAnimation: boolean; }

const HeroSection: React.FC<HeroSectionProps> = ({ triggerAnimation }) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!triggerAnimation) return;

    const split = SplitText.create(".hero-title", { type: "chars" });
    const orig  = split.chars.map(c => (c as HTMLElement).textContent || "");

    gsap.timeline({ delay: 0.2 })
      // Eyebrow clip-path izq → der
      .fromTo(".hero-eyebrow",
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" }
      )
      // Línea deco
      .from(".hero-deco-line",
        { scaleX: 0, transformOrigin: "left", duration: 0.55, ease: "power2.out" }, "-=0.5"
      )
      // Título chars con scramble
      .from(split.chars, {
        yPercent: 115, stagger: 0.014, ease: "expo.out", duration: 0.75,
        onComplete: () => scramble(split.chars, orig),
      }, "-=0.35")
      // Badge explota desde centro
      .fromTo(".hero-subtitle",
        { clipPath: "inset(0 50% 0 50%)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0%)", duration: 0.65, ease: "expo.out" }, "-=0.3"
      )
      // Descripción línea a línea
      .from(".hero-desc-line",
        { yPercent: 110, stagger: 0.1, duration: 0.65, ease: "power3.out" }, "-=0.4"
      )
      // Tags de izquierda
      .from(".hero-sector-tag",
        { opacity: 0, x: -14, stagger: 0.07, duration: 0.45, ease: "power2.out" }, "-=0.3"
      )
      // Línea métricas se dibuja
      .from(".hero-metrics-line",
        { scaleX: 0, transformOrigin: "left", duration: 0.5, ease: "power2.out" }, "-=0.25"
      )
      // Métricas
      .fromTo(".hero-metrics",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.3"
      )
      // CTAs con scale
      .from(".hero-cta-btn",
        { opacity: 0, y: 14, scale: 0.93, duration: 0.5, ease: "back.out(1.6)" }, "-=0.2"
      )
      .from(".hero-cta-email",
        { opacity: 0, x: 12, duration: 0.4, ease: "power2.out" }, "-=0.3"
      )
      // Elementos de fondo
      .from(".hero-bg-word",
        { opacity: 0, scale: 0.92, duration: 1.2, ease: "power2.out" }, "-=1.4"
      )
      .from(".hero-location",
        { opacity: 0, y: 8, duration: 0.5, ease: "power2.out" }, "-=0.8"
      );

    // Scroll tilt
    gsap.to(".hero-outer", {
      rotate: 3, scale: 0.9, yPercent: 18, ease: "power1.inOut",
      scrollTrigger: { trigger: ".hero-outer", start: "1% top", end: "bottom top", scrub: true },
    });

    // Parallax palabra de fondo
    gsap.to(".hero-bg-word", {
      yPercent: 25, ease: "none",
      scrollTrigger: { trigger: ".hero-outer", start: "top top", end: "bottom top", scrub: true },
    });
  }, { dependencies: [triggerAnimation], scope: ref });

  return (
    <section ref={ref} className="hero-outer">
      {/* Grid sutil */}
      <div className="hero-grid-bg" />

      {/* Palabra gigante de fondo */}
      <div className="hero-bg-word" aria-hidden>MV.</div>

      {/* Gradiente izquierda para legibilidad */}
      <div className="hero-gradient-mask" />

      {/* Contenido */}
      <div className="hero-content">
        <p className="hero-eyebrow" style={{ clipPath: "inset(0 100% 0 0)" }}>
          Disponible para nuevos proyectos — 2026
        </p>
        <div className="hero-deco-line" />

        <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
          <h1 className="hero-title">Desarrollo web<br />que vende.</h1>
        </div>

        <div className="hero-subtitle" style={{ clipPath: "inset(0 50% 0 50%)" }}>
          <span>Tu web, tu comercial</span>
        </div>

        <div style={{ marginTop: "1rem" }}>
          {["Trabajo con estudios de interiorismo,", "negocios de venta al público y ópticas", "que quieren dejar de perder clientes."].map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <p className="hero-desc-line hero-desc" style={{ margin: "0.15rem 0" }}>{line}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
          {["Interiorismo", "Comercio local", "Ópticas"].map(s => (
            <span key={s} className="hero-sector-tag">{s}</span>
          ))}
        </div>

        <div className="hero-metrics-line" />
        <div className="hero-metrics" style={{ opacity: 0 }}>
          {metrics.map(m => (
            <div key={m.label} className="hero-metric-item">
              <p className="hero-metric-value">{m.value}</p>
              <p className="hero-metric-label">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="hero-cta" style={{ marginTop: "1.4rem" }}>
          <a href="/proyectos" className="hero-cta-btn"
            onMouseEnter={e => { e.currentTarget.style.background = "#3b82f6"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#60a5fa"; e.currentTarget.style.transform = "scale(1)"; }}>
            Ver proyectos →
          </a>
          <a href="mailto:miguelvictorio72@gmail.com" className="hero-cta-email">
            miguelvictorio72@gmail.com
          </a>
        </div>
      </div>

      <p className="hero-location">Écija, Sevilla · España</p>
    </section>
  );
};

export default HeroSection;
