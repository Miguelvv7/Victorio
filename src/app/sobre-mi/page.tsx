"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import { porqueYo } from "@/data/projects";

/* ── Amber Noir palette ─────────────────────────────── */
const C = {
  bg:      "#0A0805",
  surface: "#120F08",
  cream:   "#E8D0A9",
  gold:    "#F2C46D",
  orange:  "#E8712B",
  border:  "rgba(232,208,169,0.15)",
};

const TINT = "sepia(0.4) saturate(1.2) hue-rotate(10deg) brightness(1.05)";

/* ── Magnetic wrapper ───────────────────────────────── */
function Magnet({ children, strength = 3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) / strength, y: (e.clientY - r.top - r.height / 2) / strength });
    setActive(true);
  }, [strength]);

  const onLeave = useCallback(() => { setPos({ x: 0, y: 0 }); setActive(false); }, []);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div style={{
        transform: `translate3d(${pos.x}px,${pos.y}px,0)`,
        transition: active ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── Word-by-word text reveal ───────────────────────── */
function AnimatedParagraph({ text, style }: { text: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.65", "end 0.6"] });
  const words = text.split(" ");

  if (isMobile) {
    return (
      <motion.p ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ margin: 0, ...style }}
      >
        {text}
      </motion.p>
    );
  }

  return (
    <p ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: "0 0.28em", margin: 0, ...style }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(start + 3.5 / words.length, 1);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.08, 1]);
        return (
          <motion.span key={i} style={{ opacity, display: "inline-block" }}>{word}</motion.span>
        );
      })}
    </p>
  );
}

const STACK = [
  "WordPress","Shopify","WooCommerce","WP-CLI","PHP",
  "React","Next.js","MySQL","Liquid","CSS","Git","SEO Local","SiteGround","Hostinger","Elementor",
];

const CORNER_IMGS = [
  { src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    pos: { top: "4%", left: "clamp(0.5rem,2vw,3rem)" }, anim: "sb-float" },
  { src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    pos: { top: "4%", right: "clamp(0.5rem,2vw,3rem)" }, anim: "sb-float-slow" },
  { src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    pos: { bottom: "6%", left: "clamp(0.5rem,4vw,6rem)" }, anim: "sb-float-r" },
  { src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    pos: { bottom: "6%", right: "clamp(0.5rem,4vw,6rem)" }, anim: "sb-float" },
];

export default function SobreMi() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef    = useRef<HTMLElement>(null);

  /* Glitch on heading */
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const original = el.textContent || "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%&*?";
    const glitch = () => {
      let i = 0;
      const id = setInterval(() => {
        el.textContent = original.split("").map((c, idx) => {
          if (c === " " || c === ".") return c;
          if (idx < i) return original[idx];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
        i += 0.6;
        if (i >= original.length) { clearInterval(id); el.textContent = original; }
      }, 28);
    };
    const t = setTimeout(glitch, 600);
    el.addEventListener("mouseenter", glitch);
    return () => { clearTimeout(t); el.removeEventListener("mouseenter", glitch); };
  }, []);

  /* Parallax corner objects */
  const { scrollYProgress: bodyP } = useScroll({ target: bodyRef, offset: ["start end","end start"] });
  const pUp   = useSpring(useTransform(bodyP,[0,1],["0px","-70px"]),{stiffness:55,damping:18});
  const pDown = useSpring(useTransform(bodyP,[0,1],["0px","70px"]),{stiffness:55,damping:18});
  const parallaxY = [pUp, pUp, pDown, pDown];

  return (
    <>
      <style>{`
        @keyframes sb-float      {0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-16px) rotate(3deg)}}
        @keyframes sb-float-r    {0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-11px) rotate(-4deg)}}
        @keyframes sb-float-slow {0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(2deg)}}
        .sb-float      { animation: sb-float       6s ease-in-out infinite; }
        .sb-float-r    { animation: sb-float-r     7.5s ease-in-out infinite; }
        .sb-float-slow { animation: sb-float-slow  9s ease-in-out infinite; }
        @keyframes sb-avatar-float {0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        .sb-heading-gold {
          background: linear-gradient(180deg,#7A6030 0%,#F2C46D 55%,#FDE8A8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        @keyframes sb-pulse-bg {0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        @keyframes sb-grain {
          0%,100%{transform:translate(0,0)} 20%{transform:translate(-1%,-2%)}
          40%{transform:translate(2%,-1%)} 60%{transform:translate(-1%,2%)} 80%{transform:translate(2%,1%)}
        }
        .sb-grain::after {
          content:''; position:absolute; inset:-50%; width:200%; height:200%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:0.025; animation:sb-grain 0.9s steps(1) infinite; pointer-events:none; z-index:1;
        }
      `}</style>

      <main style={{ background: C.bg, color: C.cream, overflowX: "hidden" }}>
        <Navbar />

        {/* ══════════════ HERO ══════════════ */}
        <section className="sb-grain relative flex flex-col overflow-x-clip"
          style={{ background: C.bg, height: "100svh", minHeight: "100svh" }}>

          {/* Warm radial glow */}
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 55% 45% at 50% 65%, rgba(232,113,43,0.10) 0%, transparent 70%)",
            animation: "sb-pulse-bg 5s ease-in-out infinite",
          }}/>

          {/* Big heading */}
          <div className="relative z-0 overflow-hidden" style={{ marginTop: "clamp(5rem,8vw,8rem)" }}>
            <motion.h1
              ref={headingRef}
              className="sb-heading-gold font-black uppercase leading-none whitespace-nowrap w-full text-center select-none"
              style={{ fontSize: "clamp(12vw,15vw,17vw)", letterSpacing: "-0.02em", cursor: "default" }}
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16,1,0.3,1] }}
            >
              Soy Miguel.
            </motion.h1>
          </div>

          {/* Avatar — flex-1 fills space naturally on all screen sizes */}
          <div className="flex-1 relative z-10 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16,1,0.3,1] }}
            >
              <Magnet strength={3.5}>
                <img
                  src="/images/miguel-avatar.png"
                  alt="Miguel Victorio"
                  style={{
                    display: "block",
                    width: "clamp(155px,26vw,370px)",
                    maxHeight: "48vh",
                    objectFit: "contain",
                    animation: "sb-avatar-float 5s ease-in-out infinite",
                    filter: "drop-shadow(0 0 70px rgba(232,113,43,0.45)) drop-shadow(0 20px 40px rgba(10,8,5,0.8))",
                  }}
                  onError={e => { (e.target as HTMLImageElement).src = "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"; }}
                />
              </Magnet>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 flex justify-between items-end"
            style={{ padding: "0 clamp(1.2rem,4vw,2.5rem) clamp(1rem,2vw,2rem)" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-light uppercase leading-snug"
              style={{ color: C.cream, fontSize: "clamp(0.58rem,0.95vw,1.05rem)",
                maxWidth: "clamp(130px,18vw,260px)", letterSpacing: "0.08em", opacity: 0.7 }}
            >
              Desarrollador web en Sevilla · webs que cargan, se encuentran y convierten
            </motion.p>
            <motion.a href="mailto:miguelvictorio72@gmail.com"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              whileHover={{ scale: 1.05 }}
              style={{
                background: "linear-gradient(123deg,#2D1500 7%,#E8712B 40%,#B84E1A 72%,#F5A623 100%)",
                boxShadow: "0 4px 20px rgba(232,113,43,0.3),inset 2px 2px 8px rgba(245,166,35,0.25)",
                outline: "1.5px solid rgba(232,208,169,0.35)", outlineOffset: "-1.5px",
                color: "white", borderRadius: "999px",
                padding: "clamp(0.55rem,1.2vw,1rem) clamp(1.2rem,2.5vw,3rem)",
                fontSize: "clamp(0.62rem,0.95vw,0.85rem)", letterSpacing: "0.12em",
                textTransform: "uppercase", textDecoration: "none", display: "inline-block",
                fontFamily: "ProximaNova,sans-serif", whiteSpace: "nowrap",
              }}
            >
              Hablemos
            </motion.a>
          </div>
        </section>

        {/* ══════════════ ABOUT BODY ══════════════ */}
        <section ref={bodyRef} className="relative flex flex-col items-center overflow-hidden"
          style={{ background: C.bg, minHeight: "100dvh",
            padding: "clamp(7rem,13vw,13rem) clamp(1rem,5vw,3rem)" }}>

          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(232,113,43,0.07) 0%, transparent 70%)",
          }}/>

          {CORNER_IMGS.map((obj, i) => (
            <motion.div key={i} className={`absolute pointer-events-none ${obj.anim}`}
              style={{ ...obj.pos, y: parallaxY[i] }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <img src={obj.src} alt="" style={{ width: "clamp(50px,9vw,155px)", filter: TINT, display: "block" }}/>
            </motion.div>
          ))}

          <div className="relative z-10 flex flex-col items-center text-center"
            style={{ maxWidth: "600px", width: "100%", gap: "clamp(2.5rem,5vw,5rem)" }}>

            <motion.h2
              className="sb-heading-gold general-title font-bold uppercase tracking-tighter w-full"
              style={{ fontSize: "clamp(3.5rem,13vw,140px)", lineHeight: 0.88 }}
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16,1,0.3,1] }}
            >
              Sobre mí
            </motion.h2>

            <AnimatedParagraph
              text="Lo que empezó como un hobby terminó siendo mi trabajo. Aprendí solo, probando, rompiendo cosas y arreglándolas. La práctica hace al maestro."
              style={{ color: C.cream, fontSize: "clamp(1rem,1.7vw,1.25rem)", lineHeight: 1.7,
                fontFamily: "ProximaNova,sans-serif" }}
            />
            <AnimatedParagraph
              text="Una web que carga rápido, se encuentra en Google y convierte visitas en llamadas vale más que un diseño bonito que nadie ve."
              style={{ color: "rgba(232,208,169,0.5)", fontSize: "clamp(0.9rem,1.4vw,1.05rem)", lineHeight: 1.7,
                fontFamily: "ProximaNova,sans-serif" }}
            />

            <motion.div className="flex flex-wrap justify-center" style={{ gap: "clamp(2rem,5vw,5rem)" }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {[{num:"4+",label:"Proyectos lanzados"},{num:"1",label:"Cliente a la vez"},{num:"15d",label:"Entrega media"}]
                .map(s => (
                  <div key={s.num} className="flex flex-col items-center" style={{ gap: "0.3rem" }}>
                    <span className="general-title font-bold"
                      style={{ color: C.gold, fontSize: "clamp(2rem,5vw,4rem)", lineHeight: 1 }}>{s.num}</span>
                    <span style={{ fontFamily:"ProximaNova,sans-serif", color: C.cream, opacity: 0.45,
                      fontSize:"clamp(0.55rem,0.85vw,0.72rem)", letterSpacing:"0.12em", textTransform:"uppercase" }}>
                      {s.label}
                    </span>
                  </div>
                ))}
            </motion.div>

            <motion.a href="mailto:miguelvictorio72@gmail.com"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }} whileHover={{ scale: 1.05 }}
              style={{
                background: "linear-gradient(123deg,#2D1500 7%,#E8712B 40%,#B84E1A 72%,#F5A623 100%)",
                boxShadow: "0 4px 20px rgba(232,113,43,0.3),inset 2px 2px 8px rgba(245,166,35,0.25)",
                outline: "1.5px solid rgba(232,208,169,0.35)", outlineOffset: "-1.5px",
                color: "white", borderRadius: "999px",
                padding: "clamp(0.55rem,1.2vw,1rem) clamp(1.5rem,3vw,3.5rem)",
                fontFamily:"ProximaNova,sans-serif", fontSize:"clamp(0.65rem,1vw,0.85rem)",
                letterSpacing:"0.12em", textTransform:"uppercase", textDecoration:"none", display:"inline-block",
              }}
            >
              Hablemos
            </motion.a>
          </div>
        </section>

        {/* ══════════════ STACK ══════════════ */}
        <section style={{ background: C.surface, padding:"clamp(4rem,9vw,9rem) clamp(1.2rem,5vw,4rem)" }}>
          <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            style={{fontFamily:"ProximaNova,sans-serif",color:C.orange,
              fontSize:"0.72rem",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"2.5rem"}}>
            Stack habitual
          </motion.p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"0.65rem"}}>
            {STACK.map((item,i)=>(
              <motion.div key={item}
                initial={{opacity:0,clipPath:"polygon(50% 0,50% 0,50% 100%,50% 100%)"}}
                whileInView={{opacity:1,clipPath:"polygon(0 0,100% 0,100% 100%,0 100%)"}}
                viewport={{once:true}} transition={{duration:0.4,delay:i*0.04,ease:"easeOut"}}
                style={{border:`1px solid ${C.border}`,padding:"0.5rem 1.1rem"}}
              >
                <span className="general-title"
                  style={{color:C.cream,fontWeight:700,fontSize:"clamp(0.8rem,1.3vw,1.1rem)",
                    textTransform:"uppercase",letterSpacing:"-0.02em"}}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════ POR QUÉ YO ══════════════ */}
        <section style={{background:C.bg,padding:"clamp(4rem,9vw,9rem) clamp(1.2rem,5vw,4rem)"}}>
          <div style={{maxWidth:"52rem",margin:"0 auto"}}>
            <motion.p initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
              style={{fontFamily:"ProximaNova,sans-serif",color:C.orange,
                fontSize:"0.72rem",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"2rem"}}>
              Por qué yo
            </motion.p>
            {porqueYo.map((item,i)=>(
              <motion.div key={item.num}
                initial={{opacity:0,x:-28}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
                transition={{duration:0.55,delay:i*0.09}}
                style={{borderTop:`1px solid ${C.border}`,padding:"1.6rem 0",
                  display:"grid",gridTemplateColumns:"3rem 1fr",gap:"1.5rem",alignItems:"start"}}
              >
                <span className="general-title"
                  style={{color:C.gold,fontWeight:700,fontSize:"1.4rem",lineHeight:1}}>
                  {item.num}
                </span>
                <div>
                  <p style={{fontFamily:"ProximaNova,sans-serif",color:C.cream,fontWeight:700,
                    fontSize:"clamp(0.9rem,1.4vw,1rem)",margin:"0 0 0.3rem",textTransform:"uppercase"}}>
                    {item.title}
                  </p>
                  <p style={{fontFamily:"ProximaNova,sans-serif",color:"rgba(232,208,169,0.42)",
                    fontSize:"clamp(0.82rem,1.2vw,0.9rem)",margin:0,lineHeight:1.6}}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
            <div style={{borderTop:`1px solid ${C.border}`}}/>
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
