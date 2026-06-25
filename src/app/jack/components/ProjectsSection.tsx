'use client';
import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';

const PROJECTS = [
  {
    num: '01',
    category: 'Shopify · Ecommerce',
    name: 'LookVintage',
    tagline: 'Muebles a medida · Écija, Sevilla',
    year: '2026',
    liveUrl: 'https://www.lookvintage.es/',
    col1img1: '/images/project-lookvintage.webp',
    col1img2: '/images/screen-lookvintage.jpg',
    col2img:  '/images/project-lookvintage.webp',
    accent: '#C8A96E',
  },
  {
    num: '02',
    category: 'Next.js · SaaS · PWA',
    name: 'GlucoTrack',
    tagline: 'Monitor de glucosa predictivo',
    year: '2026',
    liveUrl: 'https://glucotrackv2-l5ex.vercel.app/landing/index.html',
    col1img1: '/images/project-glucotrack.webp',
    col1img2: '/images/project-glucotrack.webp',
    col2img:  '/images/project-glucotrack.webp',
    accent: '#E8A060',
  },
  {
    num: '03',
    category: 'Shopify · Dropshipping',
    name: 'London Langford',
    tagline: 'Moda y accesorios · Online',
    year: '2026',
    liveUrl: 'https://londonlangford.com/',
    col1img1: '/images/langford.png',
    col1img2: '/images/project-londonlangford.jpg',
    col2img:  '/images/project-londonlangford.png',
    accent: '#D4B896',
  },
  {
    num: '04',
    category: 'Shopify · Interiorismo',
    name: 'Manuel Interiorismo',
    tagline: 'Diseño de interiores · Écija',
    year: '2026',
    liveUrl: 'https://manuelinteriorismo.com/',
    col1img1: '/images/project-manuel.webp',
    col1img2: '/images/screen-manuel.jpg',
    col2img:  '/images/project-manuel.webp',
    accent: '#B89070',
  },
];

/* ── Desktop sticky card ───────────────────────────── */
function StickyCard({ project, index, total }: { project: typeof PROJECTS[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const rawY     = useTransform(scrollYProgress, [0, 0.18], [80, 0]);
  const y        = useSpring(rawY, { stiffness: 120, damping: 25 });
  const isLast   = index === total - 1;
  const tScale   = isLast ? 1 : 1 - (total - 1 - index) * 0.045;
  const rawScale = useTransform(scrollYProgress, [0.35, 0.85], [1, tScale]);
  const scale    = useSpring(rawScale, { stiffness: 100, damping: 22 });
  const rawRot   = useTransform(scrollYProgress, [0.35, 0.85], [0, isLast ? 0 : -(index + 1) * 0.6]);
  const rotate   = useSpring(rawRot, { stiffness: 100, damping: 25 });
  const bright   = useTransform(scrollYProgress, [0.35, 0.85], [1, isLast ? 1 : 0.6]);
  const opacity  = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={ref} style={{ height: '100vh', display: 'flex', alignItems: 'flex-start' }}>
      <motion.div style={{
        scale, y, rotate, opacity,
        filter: useTransform(bright, b => `brightness(${b})`),
        position: 'sticky', top: 80 + index * 22, width: '100%',
        background: 'var(--jk-surface)',
        border: `1.5px solid ${project.accent}22`,
        borderRadius: 'clamp(20px,3.5vw,48px)',
        padding: 'clamp(0.8rem,1.5vw,1.8rem)',
        boxShadow: `0 30px 80px rgba(0,0,0,0.6),0 0 0 1px ${project.accent}11`,
        transformOrigin: 'top center',
        willChange: 'transform',
      }}>
        <CardContent project={project} />
      </motion.div>
    </div>
  );
}

/* ── Mobile simple card ────────────────────────────── */
function MobileCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--jk-surface)',
        border: `1.5px solid ${project.accent}33`,
        borderRadius: 24,
        padding: '1rem',
        marginBottom: '1rem',
        boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
      }}
    >
      <CardContent project={project} />
    </motion.div>
  );
}

/* ── Shared card interior ──────────────────────────── */
function CardContent({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 'clamp(0.6rem,1.2vw,1.2rem)', gap: '0.6rem', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem,1.5vw,1.5rem)', minWidth: 0 }}>
          <span className="font-black leading-none flex-shrink-0"
            style={{ fontSize: 'clamp(1.8rem,5vw,65px)', color: project.accent, letterSpacing: '-0.04em' }}>
            {project.num}
          </span>
          <div style={{ minWidth: 0 }}>
            <span className="font-medium uppercase block"
              style={{ color: project.accent, fontSize: 'clamp(0.55rem,0.85vw,0.75rem)', letterSpacing: '0.14em', opacity: 0.75 }}>
              {project.category}
            </span>
            <span className="font-black uppercase block"
              style={{ color: 'var(--jk-cream)', fontSize: 'clamp(0.95rem,2.2vw,1.6rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              {project.name}
            </span>
            <span className="font-light block"
              style={{ color: 'var(--jk-cream)', fontSize: 'clamp(0.58rem,0.9vw,0.75rem)', opacity: 0.4, marginTop: '0.1rem' }}>
              {project.tagline} · {project.year}
            </span>
          </div>
        </div>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
          className="font-medium uppercase flex-shrink-0 transition-all duration-300 hover:scale-105"
          style={{
            color: 'var(--jk-bg)', background: project.accent, borderRadius: '999px',
            padding: 'clamp(0.3rem,0.7vw,0.6rem) clamp(0.8rem,2vw,1.8rem)',
            fontSize: 'clamp(0.55rem,0.85vw,0.75rem)', letterSpacing: '0.1em', whiteSpace: 'nowrap',
            boxShadow: `0 4px 16px ${project.accent}55`,
          }}>
          Ver →
        </a>
      </div>

      {/* Images */}
      <div style={{ display: 'flex', gap: 'clamp(0.35rem,0.8vw,0.7rem)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.35rem,0.8vw,0.7rem)', width: '40%' }}>
          {[project.col1img1, project.col1img2].map((src, ii) => (
            <div key={ii} className="overflow-hidden" style={{ borderRadius: 'clamp(8px,2vw,22px)' }}>
              <img src={src} alt="" loading="lazy"
                className="w-full object-cover block transition-transform duration-700 hover:scale-105"
                style={{ height: ii === 0 ? 'clamp(65px,11vw,165px)' : 'clamp(85px,14vw,220px)' }} />
            </div>
          ))}
        </div>
        <div className="overflow-hidden" style={{ flex: 1, borderRadius: 'clamp(8px,2vw,22px)' }}>
          <img src={project.col2img} alt="" loading="lazy"
            className="w-full h-full object-cover block transition-transform duration-700 hover:scale-105"
            style={{ minHeight: 'clamp(140px,24vw,390px)' }} />
        </div>
      </div>
    </>
  );
}

/* ── Main section ──────────────────────────────────── */
export default function ProjectsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="proyectos"
      style={{
        background: 'var(--jk-bg)',
        borderRadius: 'clamp(24px,4vw,56px) clamp(24px,4vw,56px) 0 0',
        marginTop: 'clamp(-2rem,-4vw,-3rem)',
        position: 'relative', zIndex: 10,
        padding: 'clamp(3rem,6vw,7rem) clamp(0.8rem,2vw,2.5rem) clamp(4rem,8vw,10rem)',
      }}
    >
      <motion.h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center"
        style={{ fontSize: 'clamp(2.8rem,11vw,150px)', marginBottom: 'clamp(0.5rem,1.5vw,2rem)', letterSpacing: '-0.02em' }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        Proyectos
      </motion.h2>

      <motion.p
        className="text-center font-light uppercase"
        style={{ color: 'var(--jk-cream)', fontSize: 'clamp(0.58rem,0.85vw,0.78rem)', letterSpacing: '0.18em', opacity: 0.35, marginBottom: 'clamp(1.5rem,3vw,3rem)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.35 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {PROJECTS.length} proyectos — scroll para explorar
      </motion.p>

      {/* Mobile: simple animated list / Desktop: sticky stacking */}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PROJECTS.map((p, i) => <MobileCard key={p.num} project={p} index={i} />)}
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          {PROJECTS.map((p, i) => <StickyCard key={p.num} project={p} index={i} total={PROJECTS.length} />)}
        </div>
      )}
    </section>
  );
}
