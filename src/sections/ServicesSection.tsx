"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ServiceTitle from "@/components/ServiceTitle";
import { services } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  useGSAP(() => {
    gsap.to([".svc-row-01", ".svc-row-02", ".svc-row-03"], {
      opacity: 1, y: 0, stagger: 0.18, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: ".services-section", start: "top 88%" },
    });

    // Includes list items aparecen con stagger
    gsap.from(".svc-include-item", {
      opacity: 0, x: -16, stagger: 0.06, duration: 0.5, ease: "power2.out",
      scrollTrigger: { trigger: ".services-section", start: "top 88%" },
    });
  });

  return (
    <section className="services-section py-24 md:py-32 px-6 md:px-10">
      <div style={{ maxWidth: "64rem", margin: "0 auto 4rem" }}>
        <p style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
          Lo que puedo hacer por ti
        </p>
        <h2 style={{ color: "#f0f4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1, fontSize: "clamp(3rem,8vw,8rem)", margin: 0 }}>
          Servicios
        </h2>
        <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.7)", fontSize: "1rem", marginTop: "0.75rem" }}>
          Precios claros desde el primer día.
        </p>
      </div>

      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        {services.map((svc, i) => (
          <div key={svc.num} style={{ marginBottom: "0.5rem" }}>
            <ServiceTitle title={svc.title} price={svc.price} time={svc.time} className={`svc-row-0${i + 1}`} />

            {/* Descripción + includes en grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", paddingBottom: "2rem", paddingTop: "0.75rem", borderBottom: "1px solid rgba(96,165,250,0.1)" }}
              className="flex-col md:grid">
              <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.55)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                {svc.desc}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {svc.includes.map((item, j) => (
                  <li key={j} className="svc-include-item"
                    style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.7)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#60a5fa", fontSize: "0.6rem" }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div style={{ marginTop: "3rem" }}>
          <a href="mailto:miguelvictorio72@gmail.com"
            style={{ fontFamily: "ProximaNova, sans-serif", color: "#f0f4ff", border: "1px solid #60a5fa", padding: "1rem 2rem", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block", textDecoration: "none", transition: "all 0.2s", background: "transparent" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#60a5fa"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            Pedir presupuesto →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
