"use client";
import { stack } from "@/data/projects";

const StackMarquee = () => {
  const doubled = [...stack, ...stack];
  return (
    <div style={{ width: "100%", overflow: "hidden", background: "#132035", padding: "1.1rem 0", borderTop: "1px solid rgba(96,165,250,0.2)", borderBottom: "1px solid rgba(96,165,250,0.2)" }}>
      {/* Fila 1 */}
      <div style={{ display: "flex", marginBottom: "0.4rem" }}>
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} style={{ fontWeight: 700, fontSize: "clamp(1rem,1.5vw,1.4rem)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "#f0f4ff", display: "inline-flex", alignItems: "center", gap: "2.5rem" }}>
              {item}
              <span style={{ color: "#60a5fa", fontSize: "1.2em", lineHeight: 1 }}>·</span>
            </span>
          ))}
        </div>
      </div>
      {/* Fila 2 inversa */}
      <div style={{ display: "flex" }}>
        <div className="marquee-track marquee-track-reverse">
          {doubled.map((item, i) => (
            <span key={i} style={{ fontWeight: 700, fontSize: "clamp(0.8rem,1.2vw,1.1rem)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "rgba(96,165,250,0.5)", display: "inline-flex", alignItems: "center", gap: "2.5rem" }}>
              {item}
              <span style={{ color: "rgba(96,165,250,0.3)" }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackMarquee;
