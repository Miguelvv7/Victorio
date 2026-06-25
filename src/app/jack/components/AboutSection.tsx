'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import AnimatedText from './shared/AnimatedText';
import ContactButton from './shared/ContactButton';

const ABOUT_TEXT =
  'Lo que empezó como un hobby terminó siendo mi trabajo. Aprendí solo, probando, rompiendo cosas y arreglándolas. Una web que carga rápido, se encuentra en Google y convierte visitas en llamadas vale más que un diseño bonito que nadie ve.';

// Amber-tint filter so the 3D objects match our palette
const TINT = 'sepia(0.4) saturate(1.2) hue-rotate(10deg) brightness(1.05)';

const CORNER_OBJECTS = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    pos: { top: '4%', left: 'clamp(0.5rem,2vw,3rem)' },
    cls: 'jk-float',
    delay: 0,
    yRange: ['-50px', '0px'],
    xRange: ['-40px', '0px'],
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    pos: { top: '4%', right: 'clamp(0.5rem,2vw,3rem)' },
    cls: 'jk-float-slow',
    delay: 0.1,
    yRange: ['-40px', '0px'],
    xRange: ['40px', '0px'],
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    pos: { bottom: '6%', left: 'clamp(0.5rem,4vw,6rem)' },
    cls: 'jk-float-r',
    delay: 0.2,
    yRange: ['50px', '0px'],
    xRange: ['-30px', '0px'],
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    pos: { bottom: '6%', right: 'clamp(0.5rem,4vw,6rem)' },
    cls: 'jk-float',
    delay: 0.15,
    yRange: ['50px', '0px'],
    xRange: ['30px', '0px'],
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yParallaxUp   = useTransform(scrollYProgress, [0, 1], ['0px', '-70px']);
  const yParallaxDown = useTransform(scrollYProgress, [0, 1], ['0px',  '70px']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'var(--jk-bg)',
        minHeight: '100svh',
        padding: 'clamp(7rem,14vw,14rem) clamp(1rem,5vw,4rem) clamp(7rem,12vw,12rem)',
      }}
    >
      {/* ── Corner objects ── */}
      {CORNER_OBJECTS.map((obj, i) => {
        const yP = i < 2 ? yParallaxUp : yParallaxDown;
        return (
          <motion.div
            key={i}
            className={`absolute pointer-events-none ${obj.cls}`}
            style={{ ...obj.pos, y: yP }}
            initial={{ opacity: 0, x: obj.xRange[0], y: obj.yRange[0] }}
            whileInView={{ opacity: 1, x: '0px', y: '0px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: obj.delay, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src={obj.src}
              alt=""
              style={{
                width: 'clamp(50px, 9vw, 160px)',
                filter: TINT,
                display: 'block',
              }}
            />
          </motion.div>
        );
      })}

      {/* ── Content ── */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ gap: 'clamp(2rem, 4.5vw, 5rem)', maxWidth: '640px', width: '100%' }}
      >
        {/* Heading */}
        <motion.h2
          className="hero-heading font-black uppercase leading-none tracking-tight w-full"
          style={{ fontSize: 'clamp(3rem, 12vw, 140px)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Sobre mí
        </motion.h2>

        {/* Text — word-by-word reveal */}
        <div
          style={{
            color: 'var(--jk-cream)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)',
            opacity: 0.85,
            width: '100%',
          }}
        >
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium leading-relaxed"
          />
        </div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center"
          style={{ gap: 'clamp(1.5rem, 5vw, 5rem)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {[
            { num: '4+',  label: 'Proyectos lanzados' },
            { num: '1',   label: 'Cliente a la vez' },
            { num: '15d', label: 'Entrega media' },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center" style={{ gap: '0.25rem' }}>
              <span
                className="font-black"
                style={{ color: 'var(--jk-gold)', fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 1 }}
              >
                {s.num}
              </span>
              <span
                className="font-light uppercase"
                style={{ color: 'var(--jk-cream)', fontSize: 'clamp(0.55rem, 0.9vw, 0.8rem)', letterSpacing: '0.12em', opacity: 0.55 }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        <ContactButton />
      </div>
    </section>
  );
}
