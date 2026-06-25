'use client';
import { useEffect, useRef } from 'react';
import FadeIn from './shared/FadeIn';
import Magnet from './shared/Magnet';
import ContactButton from './shared/ContactButton';

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Glitch on load + hover
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const original = el.dataset.text || el.textContent || '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%&*?';

    const glitch = () => {
      let i = 0;
      const id = setInterval(() => {
        el.textContent = original
          .split('')
          .map((c, idx) => {
            if (c === ' ' || c === '.') return c;
            if (idx < i) return original[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        i += 0.6;
        if (i >= original.length) {
          clearInterval(id);
          el.textContent = original;
        }
      }, 28);
    };

    const t = setTimeout(glitch, 700);
    el.addEventListener('mouseenter', glitch);
    return () => { clearTimeout(t); el.removeEventListener('mouseenter', glitch); };
  }, []);

  return (
    <section
      className="jk-grain relative flex flex-col overflow-x-clip"
      style={{ background: 'var(--jk-bg)', height: '100svh', minHeight: '100svh' }}
    >
      {/* Warm radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 50% 65%, rgba(232,113,43,0.10) 0%, transparent 70%)',
          animation: 'jk-pulse 5s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes jk-pulse {
          0%,100% { opacity:.5; transform:scale(1); }
          50%      { opacity:1;  transform:scale(1.1); }
        }
        @keyframes jk-avatar-float {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-16px); }
        }
      `}</style>

      {/* ── Navbar ── */}
      <FadeIn delay={0} y={-20}>
        <nav
          className="relative z-30 flex justify-between items-center"
          style={{ padding: 'clamp(1.1rem,2.5vw,2rem) clamp(1.2rem,4vw,2.5rem) 0' }}
        >
          {['About', 'Precios', 'Proyectos', 'Contacto'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-medium uppercase transition-all duration-300 hover:opacity-60"
              style={{
                color: 'var(--jk-cream)',
                fontSize: 'clamp(0.62rem,1.2vw,1.3rem)',
                letterSpacing: '0.12em',
              }}
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* ── Big heading ── */}
      <div className="relative z-0 overflow-hidden" style={{ marginTop: 'clamp(0.5rem,1.5vw,1.5rem)' }}>
        <FadeIn delay={0.15} y={50}>
          <h1
            ref={headingRef}
            data-text="Soy Miguel."
            className="hero-heading font-black uppercase leading-none whitespace-nowrap w-full text-center select-none"
            style={{ fontSize: 'clamp(12vw,15vw,17vw)', cursor: 'default', letterSpacing: '-0.02em' }}
          >
            Soy Miguel.
          </h1>
        </FadeIn>
      </div>

      {/* ── Avatar — flex-1 fills space between heading and bottom bar ── */}
      <div className="flex-1 relative z-10 flex justify-center items-center">
        <FadeIn delay={0.55} y={30}>
          <Magnet padding={40} strength={3.5}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.7s ease-in-out"
          >
            <img
              src="/images/miguel-avatar.png"
              alt="Miguel Victorio"
              style={{
                display: 'block',
                width: 'clamp(155px, 26vw, 370px)',
                maxHeight: '48vh',
                objectFit: 'contain',
                animation: 'jk-avatar-float 5s ease-in-out infinite',
                filter: 'drop-shadow(0 0 70px rgba(232,113,43,0.45)) drop-shadow(0 20px 40px rgba(10,8,5,0.8))',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';
              }}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="relative z-20 flex justify-between items-end"
        style={{ padding: '0 clamp(1.2rem,4vw,2.5rem) clamp(1rem,2vw,2rem)' }}
      >
        <FadeIn delay={0.4} y={20}>
          <p
            className="font-light uppercase leading-snug"
            style={{
              color: 'var(--jk-cream)',
              fontSize: 'clamp(0.58rem,0.95vw,1.05rem)',
              maxWidth: 'clamp(130px,18vw,260px)',
              letterSpacing: '0.08em',
              opacity: 0.75,
            }}
          >
            Desarrollador web en Sevilla · webs que cargan, se encuentran y convierten
          </p>
        </FadeIn>
        <FadeIn delay={0.55} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
