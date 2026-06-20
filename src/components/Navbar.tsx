"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="mv-nav">
      <Link href="/" style={{ color: "#f0f4ff", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.03em", textTransform: "uppercase" }}>
        MV.
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        {[
          { href: "/proyectos", label: "Proyectos" },
          { href: "/sobre-mi", label: "Sobre mí" },
          { href: "/contacto", label: "Contacto" },
        ].map((l) => (
          <Link key={l.href} href={l.href}
            style={{ fontFamily: "ProximaNova, sans-serif", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,244,255,0.45)", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,244,255,0.45)")}>
            {l.label}
          </Link>
        ))}
        <a href="mailto:miguelvictorio72@gmail.com"
          style={{ fontFamily: "ProximaNova, sans-serif", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#f0f4ff", border: "1px solid #60a5fa", padding: "8px 20px", transition: "all 0.2s", background: "transparent" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#60a5fa"; e.currentTarget.style.color = "#f0f4ff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f0f4ff"; }}>
          Hablamos →
        </a>
      </div>

      {/* Mobile toggle */}
      <button className="md:hidden" onClick={() => setOpen(!open)}
        style={{ fontFamily: "ProximaNova, sans-serif", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#f0f4ff", background: "none", border: "none", cursor: "pointer" }}>
        {open ? "Cerrar" : "Menú"}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-10" style={{ background: "#0c1829" }}>
          <button className="absolute top-6 right-6" onClick={() => setOpen(false)}
            style={{ fontFamily: "ProximaNova, sans-serif", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,244,255,0.4)", background: "none", border: "none", cursor: "pointer" }}>
            Cerrar
          </button>
          {[
            { href: "/proyectos", label: "Proyectos" },
            { href: "/sobre-mi", label: "Sobre mí" },
            { href: "/contacto", label: "Contacto" },
          ].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ color: "#f0f4ff", fontSize: "clamp(2.5rem,10vw,5rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
              onMouseLeave={e => (e.currentTarget.style.color = "#f0f4ff")}>
              {l.label}
            </Link>
          ))}
          <a href="mailto:miguelvictorio72@gmail.com"
            style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.5)", fontSize: "0.85rem", marginTop: "1rem" }}>
            miguelvictorio72@gmail.com
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
