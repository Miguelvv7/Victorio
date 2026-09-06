"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, MQ, splitChars } from "@/lib/motion";

const EMAIL = "miguelvictorio72@gmail.com";

const LINKS = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

const FooterSection = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.to(".footer-watermark", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });

        gsap.from(".footer-top-line", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        });

        gsap.fromTo(
          ".footer-eyebrow",
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".footer-cta-block", start: "top 90%", once: true },
          }
        );

        const split = splitChars(".footer-email");
        if (split) {
          gsap.from(split.chars, {
            yPercent: 110,
            opacity: 0,
            stagger: 0.018,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: { trigger: ".footer-email", start: "top 92%", once: true },
          });
        }

        gsap.fromTo(
          ".footer-note",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.35,
            ease: "power2.out",
            scrollTrigger: { trigger: ".footer-email", start: "top 92%", once: true },
          }
        );

        gsap.from(".footer-link", {
          opacity: 0,
          y: 12,
          stagger: 0.07,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".footer-nav", start: "top 95%", once: true },
        });

        gsap.from(".footer-legal", {
          opacity: 0,
          y: 8,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".footer-legal", start: "top 99%", once: true },
        });

        return () => split?.revert();
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <footer ref={ref} className="footer-section">
      <div className="footer-top-line" />

      <div className="footer-body">
        <h2 className="footer-watermark" aria-hidden>
          VICTORIO
        </h2>

        <div className="footer-cta-block">
          <p className="footer-eyebrow" style={{ clipPath: "inset(0 100% 0 0)" }}>
            ¿Tienes algo entre manos?
          </p>

          <div style={{ overflow: "hidden" }}>
            <a href={`mailto:${EMAIL}`} className="footer-email">
              {EMAIL} →
            </a>
          </div>

          <p className="footer-note" style={{ opacity: 0 }}>
            Escríbeme y te contesto, normalmente el mismo día
          </p>
        </div>

        <nav className="footer-nav">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="footer-link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="footer-legal">
          <p>Miguel Victorio — Écija, Sevilla</p>
          <p>© 2026 mvictorio.es</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
