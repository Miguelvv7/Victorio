"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import Link from "next/link";

gsap.registerPlugin(SplitText, ScrollTrigger);

const FooterSection = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Watermark VICTORIO parallax
    gsap.to(".footer-watermark", {
      yPercent: -30, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
    });

    // Eyebrow clip-path
    gsap.fromTo(".footer-eyebrow",
      { clipPath: "inset(0 100% 0 0)", opacity: 1 },
      { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".footer-cta-block", start: "top 88%" } }
    );

    // Línea superior se dibuja
    gsap.from(".footer-top-line", {
      scaleX: 0, transformOrigin: "left", duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".footer-section", start: "top 90%" },
    });

    // Email — SplitText chars desde abajo
    const emailSplit = SplitText.create(".footer-email", { type: "chars" });
    gsap.from(emailSplit.chars, {
      yPercent: 100, stagger: 0.022, duration: 0.7, ease: "expo.out",
      scrollTrigger: { trigger: ".footer-email", start: "top 88%" },
    });

    // "Respondo en 24h"
    gsap.fromTo(".footer-note",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".footer-email", start: "top 88%" }, delay: 0.4 }
    );

    // Nav links stagger
    gsap.from(".footer-link", {
      opacity: 0, y: 10, stagger: 0.08, duration: 0.5, ease: "power2.out",
      scrollTrigger: { trigger: ".footer-nav", start: "top 92%" },
    });

    // Copyright
    gsap.from(".copyright-box", {
      opacity: 0, y: 8, duration: 0.5, ease: "power2.out",
      scrollTrigger: { trigger: ".copyright-box", start: "top 98%" },
    });
  }, { scope: ref });

  return (
    <footer ref={ref} className="footer-section">
      <div className="footer-top-line" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(96,165,250,0.25)", transformOrigin: "left" }} />

      <div style={{ padding: "18vh 1.5rem 0", position: "relative" }}>
        {/* Watermark */}
        <h1 className="footer-watermark general-title"
          style={{ textAlign: "center", padding: "1.25rem 0", color: "rgba(240,244,255,0.04)", userSelect: "none", position: "relative" }}>
          VICTORIO
        </h1>

        {/* CTA block */}
        <div className="footer-cta-block" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", position: "relative", zIndex: 10, marginTop: "2rem" }}>
          <p className="footer-eyebrow" style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.5)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", clipPath: "inset(0 100% 0 0)" }}>
            ¿Tu negocio necesita una web?
          </p>

          {/* Email gigante */}
          <div style={{ overflow: "hidden" }}>
            <a href="mailto:miguelvictorio72@gmail.com"
              className="footer-email"
              style={{ color: "#f0f4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", fontSize: "clamp(1.2rem, 3.2vw, 4.5rem)", textDecoration: "none", transition: "color 0.2s", textAlign: "center", display: "block" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
              onMouseLeave={e => (e.currentTarget.style.color = "#f0f4ff")}>
              miguelvictorio72@gmail.com →
            </a>
          </div>

          <p className="footer-note" style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.45)", fontSize: "0.8rem", opacity: 0 }}>
            Respondo en menos de 24h
          </p>
        </div>

        {/* Nav */}
        <div className="footer-nav" style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "5rem", flexWrap: "wrap" }}>
          {[{ href: "/proyectos", label: "Proyectos" }, { href: "/sobre-mi", label: "Sobre mí" }, { href: "/contacto", label: "Contacto" }].map(l => (
            <Link key={l.href} href={l.href} className="footer-link"
              style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.35)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.12em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,244,255,0.35)")}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="copyright-box" style={{ fontFamily: "ProximaNova, sans-serif", padding: "2rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "rgba(240,244,255,0.18)", fontSize: "0.75rem" }}>
          <p style={{ margin: 0 }}>Miguel Victorio — Sevilla, España</p>
          <p style={{ margin: 0 }}>© 2026 mvictorio.es</p>
        </div>
      </div>
    </footer>
  );
};
export default FooterSection;
