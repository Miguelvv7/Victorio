"use client";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger, ScrollSmoother } from "gsap/all";
import { porqueYo } from "@/data/projects";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);

const stackFull = [
  "WordPress", "Shopify", "WooCommerce", "WP-CLI", "PHP",
  "MySQL", "React", "Liquid", "CSS", "Git", "SEO",
];

export default function SobreMi() {
  useGSAP(() => {
    if (window.innerWidth >= 768) { ScrollSmoother.create({ smooth: 2, effects: true }); }

    // Hero title — chars stagger
    const titleSplit = SplitText.create(".about-title", { type: "chars" });
    gsap.from(titleSplit.chars, { yPercent: 200, stagger: 0.02, ease: "power2.out", duration: 0.9, delay: 0.3 });
    gsap.to(".about-eyebrow", { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" });

    // Scroll tilt — igual que hero
    gsap.timeline({
      scrollTrigger: { trigger: ".about-hero", start: "1% top", end: "bottom top", scrub: true },
    }).to(".about-hero", { rotate: 4, scale: 0.92, yPercent: 20, ease: "power1.inOut" });

    // Historia — animación por bloque (evita corte de palabras con SplitText)
    gsap.from(".about-history", {
      opacity: 0, y: 40, duration: 1, ease: "power2.out",
      scrollTrigger: { trigger: ".about-history", start: "top 92%" },
    });

    // Filosofía — word reveal con color como MessageSection
    const filosofiaSplit = SplitText.create(".about-filosofia", { type: "words", wordDelimiter: " " });
    [...filosofiaSplit.words].forEach(w => { (w as HTMLElement).style.display = "inline"; (w as HTMLElement).style.marginRight = "0.25em"; });
    gsap.from(filosofiaSplit.words, {
      opacity: 0, yPercent: 60, stagger: 0.05, ease: "power2.out", duration: 0.6,
      scrollTrigger: { trigger: ".about-filosofia", start: "top 92%" },
    });

    // Stack badges — cascade clip-path igual que BenefitSection
    const revealTl = gsap.timeline({
      scrollTrigger: { trigger: ".stack-section", start: "top 88%", end: "center center", scrub: 1.5 },
    });
    document.querySelectorAll(".stack-badge").forEach((el, i) => {
      revealTl.to(el, { duration: 0.6, opacity: 1, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "circ.out" }, i * 0.05);
    });

    // No hago — items suben con stagger
    gsap.from(".nohago-item", {
      opacity: 0, y: 20, stagger: 0.12, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: ".nohago-section", start: "top 88%" },
    });

    // Meta cards
    gsap.from(".meta-card", {
      opacity: 0, y: 24, stagger: 0.12, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".meta-section", start: "top 88%" },
    });

    // Badge reveal
    gsap.to(".about-badge", {
      duration: 1, opacity: 1, clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      ease: "power1.inOut",
      scrollTrigger: { trigger: ".about-body-wrap", start: "top 88%" },
    });
  });

  return (
    <main>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">

          {/* HERO */}
          <section className="about-hero relative w-screen min-h-dvh flex flex-col justify-center px-6 md:px-10 overflow-hidden" style={{ background: "#0c1829" }}>
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{ backgroundImage: "linear-gradient(rgba(240,244,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(240,244,255,0.08) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
            <p className="about-eyebrow font-paragraph uppercase mb-6" style={{ opacity: 0, transform: "translateY(8px)", fontFamily: "ProximaNova,sans-serif", color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.2em" }}>
              Sobre mí
            </p>
            <div className="overflow-hidden">
              <h1 className="about-title font-bold uppercase tracking-tighter" style={{ color: "#f0f4ff", fontSize: "clamp(3rem,10vw,9rem)", lineHeight: 0.9 }}>
                Soy Miguel.
              </h1>
            </div>
            <div className="absolute bottom-8 right-8 md:right-10" style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(240,244,255,0.6)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Sevilla, España
            </div>
          </section>

          {/* CUERPO */}
          <section className="about-body-wrap px-6 md:px-10 py-24 md:py-32 relative overflow-hidden" style={{ background: "#0d1f3c", color: "#0c1829" }}>
            {/* Badge */}
            <div className="about-badge mb-12 inline-block" style={{ opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}>
              <div style={{ background: "#60a5fa", padding: "0.4rem 1.5rem", transform: "rotate(-2deg)", display: "inline-block" }}>
                <span style={{ color: "#f0f4ff", fontWeight: 700, fontSize: "clamp(1rem,2.5vw,2.5rem)", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
                  Desarrollador web
                </span>
              </div>
            </div>

            <div style={{ maxWidth: "48rem" }}>
              {/* Historia — chars animados */}
              <h2 className="about-history" style={{ color: "#0c1829", fontWeight: 700, fontSize: "clamp(1.8rem,4vw,4rem)", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "2rem" }}>
                Lo que empezó como un hobby terminó siendo mi trabajo. Aprendí solo, probando, rompiendo cosas y arreglándolas. La práctica hace al maestro.
              </h2>

              {/* Filosofía — word reveal */}
              <p className="about-filosofia" style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(12,24,41,0.55)", fontSize: "clamp(1rem,1.8vw,1.3rem)", lineHeight: 1.6, marginBottom: "2rem" }}>
                Una web que carga rápido, se encuentra en Google y convierte visitas en llamadas vale más que un diseño bonito que nadie ve.
              </p>
            </div>
          </section>

          {/* STACK */}
          <section className="stack-section px-6 md:px-10 py-24 overflow-hidden" style={{ background: "#0c1829" }}>
            <p style={{ fontFamily: "ProximaNova,sans-serif", color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2.5rem" }}>
              Stack habitual
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {stackFull.map((item) => (
                <div key={item} className="stack-badge" style={{ border: "1px solid rgba(96,165,250,0.3)", padding: "0.6rem 1.25rem", opacity: 0, clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}>
                  <span style={{ color: "#f0f4ff", fontWeight: 700, fontSize: "clamp(0.9rem,1.5vw,1.3rem)", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* POR QUÉ YO */}
          <section className="nohago-section px-6 md:px-10 py-24" style={{ background: "#0d1f3c" }}>
            <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
              <p style={{ fontFamily: "ProximaNova,sans-serif", color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Por qué yo
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {porqueYo.map((item) => (
                  <div key={item.num} className="nohago-item" style={{ borderTop: "1px solid rgba(12,24,41,0.1)", padding: "1.5rem 0", display: "grid", gridTemplateColumns: "3rem 1fr", gap: "1.5rem", alignItems: "start" }}>
                    <span style={{ color: "#60a5fa", fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>{item.num}</span>
                    <div>
                      <p style={{ fontFamily: "ProximaNova,sans-serif", color: "#0c1829", fontWeight: 700, fontSize: "1rem", margin: "0 0 0.3rem", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                        {item.title}
                      </p>
                      <p style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(12,24,41,0.55)", fontSize: "0.95rem", margin: 0, lineHeight: 1.5 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(12,24,41,0.1)" }} />
              </div>
            </div>
          </section>

          {/* META CARDS */}
          <section className="meta-section px-6 md:px-10 py-24" style={{ background: "#0c1829" }}>
            <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", border: "1px solid rgba(96,165,250,0.15)" }}>
                {[
                  { label: "Disponible", value: "Acepto proyectos para 2026", accent: true },
                  { label: "Ubicación", value: "Sevilla · Trabajo remoto con clientes de toda España" },
                  { label: "Entrega", value: "15 días para una web corporativa estándar" },
                ].map((item) => (
                  <div key={item.label} className="meta-card" style={{ padding: "2rem", background: "#0c1829", borderRight: "1px solid rgba(96,165,250,0.15)" }}>
                    <p style={{ fontFamily: "ProximaNova,sans-serif", color: "#60a5fa", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                      {item.label}
                    </p>
                    <p style={{ color: "#f0f4ff", fontWeight: 700, fontSize: "clamp(1rem,2vw,1.5rem)", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1.2, margin: 0 }}>
                      {item.value}
                    </p>
                    {item.accent && <div style={{ marginTop: "1rem", width: "6px", height: "6px", borderRadius: "50%", background: "#60a5fa" }} />}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "3rem" }}>
                <a href="mailto:miguelvictorio72@gmail.com"
                  style={{ fontFamily: "ProximaNova,sans-serif", color: "#f0f4ff", border: "1px solid #60a5fa", padding: "1rem 2rem", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block", textDecoration: "none", transition: "all 0.2s", background: "transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#60a5fa"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  Contactar →
                </a>
              </div>
            </div>
          </section>

          <FooterSection />
        </div>
      </div>
    </main>
  );
}
