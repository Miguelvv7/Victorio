"use client";

const ServiceTitle = ({ title, price, time, className }: { title: string; price: string; time: string; className: string }) => {
  return (
    <div className={`${className} w-full`} style={{ opacity: 0, transform: "translateY(24px)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "1.4rem 0", borderTop: "1px solid rgba(96,165,250,0.2)", gap: "1.5rem" }}>
        <h2 style={{ color: "#f0f4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1, fontSize: "clamp(1.6rem,3vw,4rem)", margin: 0 }}>
          {title}
        </h2>
        <div style={{ textAlign: "right", flexShrink: 0, minWidth: "130px" }}>
          <p style={{ fontFamily: "ProximaNova, sans-serif", color: "#60a5fa", fontWeight: 700, fontSize: "1.1rem", margin: 0, whiteSpace: "nowrap" }}>
            {price}
          </p>
          <p style={{ fontFamily: "ProximaNova, sans-serif", color: "rgba(240,244,255,0.3)", fontSize: "0.85rem", margin: 0, whiteSpace: "nowrap" }}>
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceTitle;
