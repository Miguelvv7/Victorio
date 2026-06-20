"use client";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger, ScrollSmoother } from "gsap/all";
import { faqs } from "@/data/projects";
import { useState } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", negocio: "", tipo: "", presupuesto: "", mensaje: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useGSAP(() => {
    if (window.innerWidth >= 768) { ScrollSmoother.create({ smooth: 2, effects: true }); }

    // Hero title chars
    const titleSplit = SplitText.create(".contact-title", { type: "chars" });
    gsap.from(titleSplit.chars, { yPercent: 200, stagger: 0.02, ease: "power2.out", duration: 0.9, delay: 0.3 });
    gsap.to(".contact-eyebrow", { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });

    // Hero scrub
    gsap.timeline({
      scrollTrigger: { trigger: ".contact-hero", start: "1% top", end: "bottom top", scrub: true },
    }).to(".contact-hero", { rotate: 4, scale: 0.92, yPercent: 20, ease: "power1.inOut" });

    // Badge
    gsap.to(".contact-badge", { duration: 1, opacity: 1, clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)", ease: "power1.inOut", delay: 0.8 });

    // Info cards — cascade clip-path igual que servicios
    gsap.to([".info-01", ".info-02", ".info-03"], {
      opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".contact-info", start: "top 88%" },
    });

    // Form labels — word stagger
    gsap.from(".form-label", {
      opacity: 0, y: 10, stagger: 0.08, duration: 0.5, ease: "power2.out",
      scrollTrigger: { trigger: ".contact-form", start: "top 88%" },
    });

    // FAQ items — slide desde la izquierda
    gsap.from(".faq-item", {
      opacity: 0, x: -24, stagger: 0.12, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: ".faq-section", start: "top 88%" },
    });

    // Proceso post-contacto
    gsap.from(".post-step", {
      opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: ".post-section", start: "top 88%" },
    });
  });

  return (
    <main>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">

          {/* HERO */}
          <section className="contact-hero relative w-screen min-h-dvh flex flex-col justify-center px-6 md:px-10 overflow-hidden" style={{ background: "#0c1829" }}>
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{ backgroundImage: "linear-gradient(rgba(240,244,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(240,244,255,0.08) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

            <p className="contact-eyebrow" style={{ opacity: 0, transform: "translateY(8px)", fontFamily: "ProximaNova,sans-serif", color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Contacto
            </p>
            <div className="overflow-hidden mb-6">
              <h1 className="contact-title font-bold uppercase tracking-tighter" style={{ color: "#f0f4ff", fontSize: "clamp(3rem,10vw,9rem)", lineHeight: 0.9 }}>
                Hablemos.
              </h1>
            </div>
            <div className="contact-badge inline-block" style={{ opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}>
              <div style={{ background: "#60a5fa", padding: "0.4rem 1.5rem", transform: "rotate(-2deg)", display: "inline-block" }}>
                <span style={{ color: "#f0f4ff", fontWeight: 700, fontSize: "clamp(1rem,2.5vw,2.5rem)", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
                  de tu web
                </span>
              </div>
            </div>
            <p style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(240,244,255,0.7)", fontSize: "1rem", lineHeight: 1.6, maxWidth: "28rem", marginTop: "2rem" }}>
              Cuéntame qué necesitas. Si puedo ayudarte, te digo cuánto y cuándo. Si no, te lo digo igual.
            </p>
            <div className="absolute bottom-8 right-8 md:right-10" style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(240,244,255,0.6)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Respondo en &lt;24h
            </div>
          </section>

          {/* INFO + FORM */}
          <section style={{ background: "#0d1f3c", color: "#f0f4ff", padding: "6rem 1.5rem" }}>
            <div style={{ maxWidth: "72rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "4rem" }}>

              {/* Info */}
              <div>
                <p style={{ fontFamily: "ProximaNova,sans-serif", color: "#60a5fa", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                  Datos de contacto
                </p>
                <div className="contact-info" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    { cls: "info-01", icon: "✉", label: "Email", value: "miguelvictorio72@gmail.com", href: "mailto:miguelvictorio72@gmail.com" },
                    { cls: "info-02", icon: "🌐", label: "Web", value: "mvictorio.es", href: "https://mvictorio.es" },
                    { cls: "info-03", icon: "📍", label: "Ubicación", value: "Sevilla, España", href: null },
                  ].map((item) => (
                    <div key={item.label} className={item.cls} style={{ border: "1px solid rgba(96,165,250,0.15)", padding: "1.25rem 1.5rem", opacity: 0, transform: "translateY(16px)" }}>
                      <p style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(240,244,255,0.5)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                        {item.icon} {item.label}
                      </p>
                      {item.href
                        ? <a href={item.href} style={{ fontWeight: 700, fontSize: "clamp(0.9rem,1.5vw,1.2rem)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "#f0f4ff", textDecoration: "none" }}>{item.value}</a>
                        : <p style={{ fontWeight: 700, fontSize: "clamp(0.9rem,1.5vw,1.2rem)", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>{item.value}</p>
                      }
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulario */}
              <div className="contact-form">
                <p style={{ fontFamily: "ProximaNova,sans-serif", color: "#60a5fa", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2rem" }}>
                  Cuéntame tu proyecto
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {[
                    { name: "nombre", label: "Nombre *", placeholder: "Tu nombre", type: "input" },
                    { name: "negocio", label: "Negocio", placeholder: "Nombre de tu negocio", type: "input" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="form-label" style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(240,244,255,0.5)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                        {field.label}
                      </label>
                      <input name={field.name} value={form[field.name as keyof typeof form]} onChange={handleChange} placeholder={field.placeholder}
                        style={{ width: "100%", borderBottom: "1px solid rgba(96,165,250,0.2)", paddingBottom: "0.75rem", fontWeight: 700, fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "-0.02em", background: "transparent", outline: "none", color: "#f0f4ff" }} />
                    </div>
                  ))}
                  {[
                    { name: "tipo", label: "Tipo de proyecto *", options: ["Web corporativa", "Tienda online", "Mantenimiento", "Otro"] },
                    { name: "presupuesto", label: "Presupuesto", options: ["Menos de 800€", "800€ – 1.500€", "1.500€ – 3.000€", "Más de 3.000€"] },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="form-label" style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(240,244,255,0.5)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                        {field.label}
                      </label>
                      <select name={field.name} value={form[field.name as keyof typeof form]} onChange={handleChange}
                        style={{ width: "100%", borderBottom: "1px solid rgba(96,165,250,0.2)", paddingBottom: "0.75rem", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "-0.02em", background: "transparent", outline: "none", color: "#f0f4ff" }}>
                        <option value="">Selecciona...</option>
                        {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label className="form-label" style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(240,244,255,0.5)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      Cuéntame más *
                    </label>
                    <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={4} placeholder="Qué necesitas, cuándo, qué te parece importante..."
                      style={{ width: "100%", borderBottom: "1px solid rgba(96,165,250,0.2)", paddingBottom: "0.75rem", fontFamily: "ProximaNova,sans-serif", fontSize: "1rem", background: "transparent", outline: "none", resize: "none", color: "#f0f4ff" }} />
                  </div>
                  <a href={`mailto:miguelvictorio72@gmail.com?subject=Proyecto web — ${form.nombre}&body=${encodeURIComponent(`Nombre: ${form.nombre}\nNegocio: ${form.negocio}\nTipo: ${form.tipo}\nPresupuesto: ${form.presupuesto}\n\n${form.mensaje}`)}`}
                    style={{ fontFamily: "ProximaNova,sans-serif", color: "#f0f4ff", background: "#60a5fa", padding: "1rem 2rem", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block", textDecoration: "none", textAlign: "center", transition: "background 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#3b82f6"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#60a5fa"; }}>
                    Enviar mensaje →
                  </a>
                  <p style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(240,244,255,0.4)", fontSize: "0.75rem" }}>
                    Respondo en menos de 24 horas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="faq-section px-6 md:px-10 py-24" style={{ background: "#0c1829" }}>
            <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
              <p style={{ fontFamily: "ProximaNova,sans-serif", color: "#60a5fa", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2rem" }}>
                Preguntas frecuentes
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {faqs.map((faq, i) => (
                  <div key={i} className="faq-item" style={{ borderTop: "1px solid rgba(96,165,250,0.15)", padding: "1.5rem 0" }}>
                    <h3 style={{ color: "#f0f4ff", fontWeight: 700, fontSize: "clamp(1rem,2vw,1.5rem)", textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                      {faq.q}
                    </h3>
                    <p style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(240,244,255,0.65)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(96,165,250,0.15)" }} />
              </div>
            </div>
          </section>

          {/* QUÉ PASA DESPUÉS */}
          <section className="post-section px-6 md:px-10 py-24" style={{ background: "#0d1f3c" }}>
            <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
              <p style={{ fontFamily: "ProximaNova,sans-serif", color: "#60a5fa", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2rem" }}>
                Qué pasa después de contactarme
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1px", background: "rgba(96,165,250,0.05)" }}>
                {[
                  { num: "01", text: "Te respondo en menos de 24h con preguntas concretas sobre tu negocio." },
                  { num: "02", text: "Mantenemos una conversación para entender bien qué necesitas y cómo puedo ayudarte." },
                  { num: "03", text: "Te envío una propuesta clara con precio, plazo y todo lo que incluye." },
                ].map((s) => (
                  <div key={s.num} className="post-step" style={{ background: "#0d1f3c", padding: "2rem" }}>
                    <span style={{ color: "#60a5fa", fontWeight: 700, fontSize: "2rem", lineHeight: 1, display: "block", marginBottom: "1rem" }}>
                      {s.num}
                    </span>
                    <p style={{ fontFamily: "ProximaNova,sans-serif", color: "rgba(240,244,255,0.6)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <FooterSection />
        </div>
      </div>
    </main>
  );
}
