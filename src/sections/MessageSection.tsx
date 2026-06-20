"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedWords = ({ text, className, baseColor }: { text: string; className: string; baseColor: string }) => {
  const words = text.split(" ");
  return (
    <h1 className={className} style={{ lineHeight: 1 }}>
      {words.map((word, i) => (
        <span key={i} className={`word-${className}-${i}`} style={{ color: baseColor, display: "inline" }}>
          {word}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
};

const MessageSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const line1Words = document.querySelectorAll('[class*="word-msg-line1-"]');
    const line2Words = document.querySelectorAll('[class*="word-msg-line2-"]');

    // Palabras se iluminan al color negro al scrollear
    gsap.to(line1Words, {
      color: "#0c1829",
      ease: "power1.in",
      stagger: 0.8,
      scrollTrigger: { trigger: ".message-content", start: "top 92%", end: "40% center", scrub: true },
    });
    gsap.to(line2Words, {
      color: "#0c1829",
      ease: "power1.in",
      stagger: 0.8,
      scrollTrigger: { trigger: ".message-content", start: "30% center", end: "70% center", scrub: true },
    });

    // Badge naranja
    gsap.to(".msg-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.out",
      scrollTrigger: { trigger: ".message-content", start: "top 90%" },
    });
  }, { scope: sectionRef });

  return (
    <section className="message-content" ref={sectionRef}>
      <div style={{ width: "100%", padding: "8rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>

        {/* Badge naranja inclinado */}
        <div
          style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
          className="msg-text-scroll"
        >
          <div style={{ background: "#60a5fa", padding: "0.5rem 2rem", transform: "rotate(-2deg)", display: "inline-block" }}>
            <span style={{ color: "#f0f4ff", fontSize: "clamp(1.5rem,4vw,4rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em" }}>
              locales
            </span>
          </div>
        </div>

        <AnimatedWords text="Hago webs para negocios" className="msg-line1" baseColor="rgba(12,24,41,0.15)" />
        <AnimatedWords text="que quieren más clientes." className="msg-line2" baseColor="rgba(12,24,41,0.15)" />

        <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(12,24,41,0.5)", fontSize: "1rem", lineHeight: 1.6, textAlign: "center", marginTop: "1rem" }}>
          Trabajo solo, entrego rápido.<br />Sin agencias de por medio.
        </p>
      </div>
    </section>
  );
};

export default MessageSection;
