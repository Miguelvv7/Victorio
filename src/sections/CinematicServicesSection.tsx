"use client";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion } from "framer-motion";
import { services } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setReady(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(
    () => {
      if (!ready || isMobile) return;

      const panels = gsap.utils.toArray<HTMLElement>(".sv-panel");

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
    { scope: sectionRef, dependencies: [isMobile, ready] }
  );

  return (
    <div ref={sectionRef}>
      {/* ── Mobile: simple animated cards ── */}
      {ready && isMobile && (
        <div style={{ background: "#0c1829", padding: "3rem 1.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Servicios</span>
            <span style={{ color: "rgba(240,244,255,0.4)", fontSize: "0.75rem" }}>/ {String(services.length).padStart(2, "0")}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {services.map((svc, i) => (
              <motion.div key={svc.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ borderTop: "1px solid rgba(240,244,255,0.08)", paddingTop: "2rem", paddingBottom: "2rem" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                  <h2 style={{ fontFamily: "Kanit, sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem,7vw,2rem)", textTransform: "uppercase", color: "#f0f4ff", lineHeight: 1, letterSpacing: "-0.02em", margin: 0 }}>{svc.title}</h2>
                  <span style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontSize: "0.72rem", fontWeight: 700, marginTop: "0.2rem" }}>{svc.num}</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontWeight: 700, fontSize: "0.8rem" }}>{svc.price}</span>
                  <span style={{ color: "rgba(240,244,255,0.3)" }}>·</span>
                  <span style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.5)", fontSize: "0.8rem" }}>{svc.time}</span>
                </div>
                <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.6)", fontSize: "0.9rem", lineHeight: 1.65, margin: "0 0 1rem" }}>{svc.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {svc.includes.map((item, j) => (
                    <motion.li key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.3, delay: j * 0.05 }}
                      style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.55)", fontSize: "0.82rem", display: "flex", gap: "0.5rem" }}
                    >
                      <span style={{ color: "#60a5fa", flexShrink: 0 }}>▸</span>{item}
                    </motion.li>
                  ))}
                </ul>
                {i === services.length - 1 && (
                  <a href="mailto:miguelvictorio72@gmail.com"
                    style={{ display: "inline-block", marginTop: "1.5rem", background: "#60a5fa", color: "#0c1829", padding: "0.7rem 2rem", borderRadius: "999px", fontFamily: "ProximaNova, sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}
                  >
                    Pedir presupuesto →
                  </a>
                )}
              </motion.div>
            ))}
            <div style={{ borderTop: "1px solid rgba(240,244,255,0.08)" }} />
          </div>
        </div>
      )}

      {/* ── Desktop: cinematic sticky panels ── */}
      {(!ready || !isMobile) && (
        <div className="cinematic-services-section">
          <div className="sv-header">
            <div className="sv-header-left">
              <span className="sv-label">Servicios</span>
              <div style={{ fontFamily: "ProximaNova, sans-serif", fontSize: "0.75rem", color: "rgba(240,244,255,0.5)", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ color: "#60a5fa", fontWeight: 700 }}>Servicios</span>
                <span>/ {String(services.length).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="sv-progress-track">
              <div className="sv-progress-bar" />
            </div>
          </div>

          {services.map((svc, i) => (
            <div key={svc.num} className="sv-panel"
              style={i > 0 ? { opacity: 0, visibility: "hidden", transform: "translateY(70px)" } : {}}
            >
              <div className="sv-panel-inner">
                <div className="sv-title-block">
                  <h2 className="sv-title">{svc.title}</h2>
                  <div className="sv-title-meta">
                    <span className="sv-price">{svc.price}</span>
                    <span className="sv-dot">·</span>
                    <span className="sv-time">{svc.time}</span>
                  </div>
                </div>
                <div className="sv-info-block">
                  <p className="sv-desc">{svc.desc}</p>
                  <ul className="sv-includes">
                    {svc.includes.map((item, j) => (
                      <li key={j} className="sv-include-item">
                        <span className="sv-arrow">▸</span>{item}
                      </li>
                    ))}
                  </ul>
                  {i === services.length - 1 && (
                    <a href="mailto:miguelvictorio72@gmail.com" className="sv-cta">
                      Pedir presupuesto →
                    </a>
                  )}
                </div>
              </div>
              <div className="sv-panel-line" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
