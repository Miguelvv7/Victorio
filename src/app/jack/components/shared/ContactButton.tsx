'use client';

export default function ContactButton() {
  return (
    <button
      className="rounded-full font-medium uppercase tracking-wider text-white cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
      style={{
        padding: 'clamp(0.55rem,1.2vw,1rem) clamp(1.2rem,2.5vw,3rem)',
        fontSize: 'clamp(0.65rem,1vw,0.9rem)',
        background: 'linear-gradient(123deg, #2D1500 7%, #E8712B 40%, #B84E1A 72%, #F5A623 100%)',
        boxShadow: '0px 4px 20px rgba(232,113,43,0.3), inset 2px 2px 8px rgba(245,166,35,0.25)',
        outline: '1.5px solid rgba(232,208,169,0.35)',
        outlineOffset: '-1.5px',
        letterSpacing: '0.12em',
      }}
    >
      Hablemos
    </button>
  );
}
