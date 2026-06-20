"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { porqueYo } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function PorQueYoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Título con chars
    const split = SplitText.create(".pq-title", { type: "chars" });
    gsap.from(split.chars, {
      yPercent: 110, stagger: 0.018, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".pq-title", start: "top 90%" },
    });

    // Eyebrow
    gsap.to(".pq-eyebrow", {
      opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".pq-title", start: "top 90%" },
    });

    // Razones — stagger de entrada
    gsap.from(".pq-reason", {
      opacity: 0, y: 50, stagger: 0.12, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: ".pq-grid", start: "top 85%" },
    });

    // Números grandes — cuenta desde 00 al valor correcto
    gsap.utils.toArray<HTMLElement>(".pq-num").forEach((el) => {
      const target = parseInt(el.dataset.target || "0");
      gsap.from({ val: 0 }, {
        val: target,
        duration: 1.2,
        ease: "power2.out",
        snap: { val: 1 },
        onUpdate: function () {
          el.textContent = String(Math.round(this.targets()[0].val)).padStart(2, "0");
        },
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    // Líneas horizontales — se dibujan de izquierda a derecha
    gsap.from(".pq-line", {
      scaleX: 0, transformOrigin: "left", duration: 0.9, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: ".pq-grid", start: "top 85%" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pq-section">
      {/* Header */}
      <div className="pq-header">
        <p className="pq-eyebrow" style={{ opacity: 0, transform: "translateY(8px)" }}>
          La diferencia
        </p>
        <div style={{ overflow: "hidden" }}>
          <h2 className="pq-title">¿Por qué yo?</h2>
        </div>
      </div>

      {/* Grid de razones */}
      <div className="pq-grid">
        {porqueYo.map((r, i) => (
          <div key={r.num} className="pq-reason">
            <div className="pq-line" />
            <div className="pq-reason-inner">
              {/* Número grande animado */}
              <span
                className="pq-num"
                data-target={i + 1}
              >
                {r.num}
              </span>
              <div className="pq-reason-text">
                <h3 className="pq-reason-title">{r.title}</h3>
                <p className="pq-reason-desc">{r.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA final */}
      <div className="pq-cta-row">
        <a
          href="mailto:miguelvictorio72@gmail.com"
          className="pq-cta-btn"
          onMouseEnter={e => { e.currentTarget.style.background = "#60a5fa"; e.currentTarget.style.color = "#f0f4ff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f0f4ff"; }}
        >
          Hablamos →
        </a>
        <p className="pq-cta-note">Sin compromiso. Respondo en menos de 24h.</p>
      </div>
    </section>
  );
}
