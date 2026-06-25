"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const LINE1 = "Webs que posicionan".split(" ");
const LINE2 = "y convierten visitas en clientes.".split(" ");

const MessageSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mobile = window.innerWidth < 768;

    const line1Words = document.querySelectorAll('[class*="word-msg-line1-"]');
    const line2Words = document.querySelectorAll('[class*="word-msg-line2-"]');

    if (mobile) {
      /* ── Móvil: palabras aparecen palabra a palabra con pop-in ── */
      gsap.set([line1Words, line2Words], { opacity: 0, y: 20 });
      gsap.to(line1Words, {
        opacity: 1, y: 0, color: "#0c1829",
        stagger: 0.09, duration: 0.42, ease: "power3.out",
        scrollTrigger: { trigger: ".message-content", start: "top 82%", toggleActions: "play none none none" },
      });
      gsap.to(line2Words, {
        opacity: 1, y: 0, color: "#0c1829",
        stagger: 0.09, duration: 0.42, ease: "power3.out",
        delay: 0.38,
        scrollTrigger: { trigger: ".message-content", start: "top 82%", toggleActions: "play none none none" },
      });

      /* Badge explota */
      gsap.fromTo(".msg-text-scroll",
        { clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)" },
        {
          clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
          duration: 0.8, ease: "circ.out",
          scrollTrigger: { trigger: ".message-content", start: "top 85%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(".msg-support-text",
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          delay: 0.9,
          scrollTrigger: { trigger: ".message-content", start: "top 82%", toggleActions: "play none none none" },
        }
      );
    } else {
      /* ── Desktop: scrub por scroll ── */
      gsap.to(line1Words, {
        color: "#0c1829", ease: "power1.in", stagger: 0.8,
        scrollTrigger: { trigger: ".message-content", start: "top 92%", end: "40% center", scrub: true },
      });
      gsap.to(line2Words, {
        color: "#0c1829", ease: "power1.in", stagger: 0.8,
        scrollTrigger: { trigger: ".message-content", start: "30% center", end: "70% center", scrub: true },
      });
      gsap.fromTo(".msg-text-scroll",
        { clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)" },
        {
          clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
          duration: 0.9, ease: "circ.out",
          scrollTrigger: { trigger: ".message-content", start: "top 90%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(".msg-support-text",
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".message-content", start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }
  }, { scope: sectionRef });

  const wordStyle = { color: "rgba(12,24,41,0.12)", display: "inline" } as const;

  return (
    <section className="message-content" ref={sectionRef}>
      <div style={{
        width: "100%",
        padding: "clamp(5rem,10vw,10rem) clamp(1rem,5vw,4rem)",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "clamp(1rem,2.5vw,2rem)",
      }}>
        <div className="msg-text-scroll" style={{ clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)" }}>
          <div style={{
            background: "#60a5fa", padding: "0.45rem 1.8rem",
            transform: "rotate(-2deg)", display: "inline-block",
          }}>
            <span style={{
              color: "#f0f4ff", fontSize: "clamp(1.3rem,4vw,4rem)",
              fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em",
            }}>negocios locales</span>
          </div>
        </div>

        <h2 className="msg-line1" style={{
          fontSize: "clamp(1.8rem,6vw,5.5rem)", lineHeight: 1,
          fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", textAlign: "center",
        }}>
          {LINE1.map((word, i) => (
            <span key={i} className={`word-msg-line1-${i}`} style={wordStyle}>
              {word}{i < LINE1.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        <h2 className="msg-line2" style={{
          fontSize: "clamp(1.8rem,6vw,5.5rem)", lineHeight: 1,
          fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", textAlign: "center",
        }}>
          {LINE2.map((word, i) => (
            <span key={i} className={`word-msg-line2-${i}`} style={wordStyle}>
              {word}{i < LINE2.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        <p className="msg-support-text" style={{
          fontFamily: "ProximaNova, sans-serif",
          color: "rgba(12,24,41,0.5)", fontSize: "clamp(0.85rem,1.4vw,1.1rem)",
          lineHeight: 1.6, textAlign: "center", marginTop: "0.5rem", opacity: 0,
          padding: "0 clamp(0.5rem,4vw,2rem)",
        }}>
          Trabajo solo, entrego rápido, precio cerrado.<br />
          Sin agencias de por medio — hablas directamente conmigo.
        </p>
      </div>
    </section>
  );
};

export default MessageSection;
