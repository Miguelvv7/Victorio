'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', move);

    let raf: number;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const addHover = () => ringRef.current?.classList.add('cursor-hover');
    const removeHover = () => ringRef.current?.classList.remove('cursor-hover');

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        .cursor-dot {
          position: fixed; top: 0; left: 0; z-index: 9999;
          width: 8px; height: 8px; border-radius: 50%;
          background: #D7E2EA; pointer-events: none;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0; z-index: 9998;
          width: 40px; height: 40px; border-radius: 50%;
          border: 1.5px solid rgba(215,226,234,0.5);
          pointer-events: none; will-change: transform;
          transition: width 0.3s, height 0.3s, border-color 0.3s, background 0.2s;
        }
        .cursor-ring.cursor-hover {
          width: 60px; height: 60px;
          border-color: rgba(182,0,168,0.8);
          background: rgba(182,0,168,0.08);
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
