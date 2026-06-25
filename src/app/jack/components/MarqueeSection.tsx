'use client';
import { useEffect, useRef, useState } from 'react';

// Only Miguel's real project images
const IMGS = [
  { src: '/images/project-lookvintage.webp',    label: 'LookVintage' },
  { src: '/images/screen-lookvintage.jpg',       label: 'LookVintage' },
  { src: '/images/project-glucotrack.webp',      label: 'GlucoTrack' },
  { src: '/images/project-manuel.webp',          label: 'Manuel Interiorismo' },
  { src: '/images/screen-manuel.jpg',            label: 'Manuel Interiorismo' },
  { src: '/images/langford.png',                 label: 'London Langford' },
  { src: '/images/project-londonlangford.jpg',   label: 'London Langford' },
];

// Triple for seamless loop
const ROW1 = [...IMGS, ...IMGS, ...IMGS];
const ROW2 = [...[...IMGS].reverse(), ...[...IMGS].reverse(), ...[...IMGS].reverse()];

export default function MarqueeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(200);

  useEffect(() => {
    const tick = () => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - top + window.innerHeight) * 0.28);
    };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <section
      ref={ref}
      className="overflow-hidden"
      style={{
        background: 'var(--jk-bg)',
        paddingTop: 'clamp(5rem,10vw,10rem)',
        paddingBottom: '2.5rem',
      }}
    >
      {['row1', 'row2'].map((id, ri) => {
        const row = ri === 0 ? ROW1 : ROW2;
        const dir = ri === 0 ? 1 : -1;
        return (
          <div
            key={id}
            className="flex"
            style={{
              gap: '12px',
              marginBottom: ri === 0 ? '12px' : 0,
              transform: `translateX(${dir * (offset - 200)}px)`,
              willChange: 'transform',
            }}
          >
            {row.map((img, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 overflow-hidden group"
                style={{ width: 360, height: 230, borderRadius: 16 }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover label */}
                <div
                  className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(10,8,5,0.85) 0%, transparent 60%)' }}
                >
                  <span
                    className="font-medium uppercase"
                    style={{ color: 'var(--jk-cream)', fontSize: '0.7rem', letterSpacing: '0.12em' }}
                  >
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
