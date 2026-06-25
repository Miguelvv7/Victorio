"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { steps } from "@/data/projects";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ProcessSection = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Título — chars con expo
    const titleSplit = SplitText.create(".process-title", { type: "chars" });
    gsap.from(titleSplit.chars, {
      yPercent: 110, stagger: 0.018, ease: "expo.out", duration: 0.75,
      scrollTrigger: { trigger: ".process-title", start: "top 90%" },
    });

    // Eyebrow clip-path
    gsap.fromTo(".process-eyebrow",
      { clipPath: "inset(0 100% 0 0)", opacity: 1 },
      { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".process-title", start: "top 90%" } }
    );

    // Línea decorativa
    gsap.from(".process-deco-line", {
      scaleX: 0, transformOrigin: "left", duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: ".process-title", start: "top 90%" },
    });

    // Badge
    gsap.to(".process-badge", {
      duration: 0.8, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "expo.out",
      scrollTrigger: { trigger: ".process-title", start: "top 88%" },
    });

    // Steps — entran desde abajo (no desde el lado, evita overflow en móvil)
    const stepOffset = window.innerWidth < 768 ? { y: 35, x: 0 } : { y: 0, x: 50 };
    gsap.utils.toArray<HTMLElement>(".step-item").forEach((step, i) => {
      gsap.from(step, {
        opacity: 0, ...stepOffset, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: step, start: "top 88%", toggleActions: "play none none none" },
        delay: i * 0.08,
      });
    });

    // Números grandes de cada step
    gsap.utils.toArray<HTMLElement>(".step-num").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)",
          scrollTrigger: { trigger: el, start: "top 92%" } }
      );
    });

    // Lines entre steps — se dibujan
    gsap.from(".step-divider", {
      scaleX: 0, transformOrigin: "left", stagger: 0.1, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".steps-container", start: "top 88%" },
    });

    // Frase final — chars
    const phraseSplit = SplitText.create(".process-phrase", { type: "chars" });
    gsap.from(phraseSplit.chars, {
      opacity: 0, yPercent: 70, stagger: 0.022, ease: "expo.out", duration: 0.65,
      scrollTrigger: { trigger: ".process-phrase", start: "top 90%" },
    });

    // Línea bajo la frase
    gsap.from(".process-phrase-line", {
      scaleX: 0, transformOrigin: "left", duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: ".process-phrase", start: "top 88%" }, delay: 0.3,
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="process-section px-6 md:px-10 py-24 md:py-36">
      <div style={{ maxWidth: "68rem", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "5rem" }}>
          <p className="process-eyebrow" style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.8rem", clipPath: "inset(0 100% 0 0)" }}>
            El proceso
          </p>
          <div className="process-deco-line" style={{ height: "1px", width: "3rem", background: "rgba(12,24,41,0.25)", marginBottom: "1rem" }} />
          <div style={{ overflow: "hidden" }}>
            <h1 className="process-title" style={{ color: "#0c1829", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 0.88, fontSize: "clamp(3rem,8vw,9rem)", margin: 0 }}>
              Sin rodeos.
            </h1>
          </div>
          <div className="process-badge" style={{ marginTop: "1.2rem", clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", display: "inline-block" }}>
            <div style={{ background: "#60a5fa", padding: "0.35rem 1.2rem", transform: "rotate(-2deg)", display: "inline-block" }}>
              <span style={{ color: "#f0f4ff", fontWeight: 700, fontSize: "clamp(0.9rem,2vw,2rem)", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
                Así trabajo
              </span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="steps-container" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, i) => (
            <div key={step.num}>
              <div className="step-divider" style={{ height: "1px", background: "rgba(12,24,41,0.1)" }} />
              <div className="step-item" style={{ padding: "2.5rem 0", display: "grid", gridTemplateColumns: "auto 1fr", gap: "3rem", alignItems: "start" }}>
                <span className="step-num" style={{ color: "#60a5fa", fontWeight: 700, fontSize: "clamp(2rem,5vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", minWidth: "2.5ch" }}>
                  {step.num}
                </span>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1.2rem,2.5vw,2.2rem)", textTransform: "uppercase", letterSpacing: "-0.03em", color: "#0c1829", lineHeight: 1, margin: "0 0 0.7rem" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(12,24,41,0.55)", fontSize: "1rem", lineHeight: 1.65, margin: 0, maxWidth: "36rem" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="step-divider" style={{ height: "1px", background: "rgba(12,24,41,0.1)" }} />
        </div>

        {/* Frase final */}
        <div style={{ marginTop: "5rem", paddingTop: "3rem" }}>
          <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(12,24,41,0.3)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            Filosofía
          </p>
          <div style={{ overflow: "hidden" }}>
            <h2 className="process-phrase" style={{ color: "#0c1829", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", fontSize: "clamp(1.5rem,4.5vw,5rem)", lineHeight: 1, margin: 0 }}>
              Tu web es tu comercial de 24 horas.
            </h2>
          </div>
          <div className="process-phrase-line" style={{ height: "1px", background: "rgba(12,24,41,0.15)", marginTop: "1.5rem" }} />
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
