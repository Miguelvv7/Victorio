'use client';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    num: '01',
    name: 'Tienda online',
    price: 'desde 800 € · ~15 días',
    desc: 'Shopify o WooCommerce. Pagos, envíos, catálogo y diseño a tu medida. Formación incluida para que lo gestiones tú solo desde el primer día.',
  },
  {
    num: '02',
    name: 'Web corporativa',
    price: 'desde 500 € · ~15 días',
    desc: 'WordPress con SEO local integrado. Diseñada para convertir visitas en llamadas. Precio cerrado desde el día uno, sin sorpresas.',
  },
  {
    num: '03',
    name: 'Mantenimiento',
    price: '50 – 150 € / mes',
    desc: 'Backups diarios automáticos, actualizaciones y soporte directo conmigo — no con un bot ni un gestor de cuentas.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="precios"
      style={{
        background: 'var(--jk-services)',
        borderRadius: 'clamp(30px,5vw,60px) clamp(30px,5vw,60px) 0 0',
        padding: 'clamp(4rem,8vw,8rem) clamp(1.2rem,5vw,4rem)',
      }}
    >
      {/* Heading */}
      <motion.h2
        className="font-black uppercase text-center leading-none tracking-tight"
        style={{
          fontSize: 'clamp(3rem,12vw,150px)',
          color: '#0A0805',
          marginBottom: 'clamp(3rem,6vw,7rem)',
          letterSpacing: '-0.02em',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Servicios
      </motion.h2>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.num}
            className="jk-service-row"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'clamp(1rem,3vw,3rem)',
              borderTop: i === 0 ? '1px solid rgba(10,8,5,0.12)' : undefined,
              borderBottom: '1px solid rgba(10,8,5,0.12)',
              padding: 'clamp(1.5rem,3vw,3rem) 0',
              cursor: 'default',
            }}
          >
            {/* Number */}
            <span
              className="jk-service-num font-black leading-none flex-shrink-0 transition-colors duration-300"
              style={{
                fontSize: 'clamp(2.2rem,7vw,100px)',
                color: '#0A0805',
                letterSpacing: '-0.03em',
              }}
            >
              {s.num}
            </span>

            {/* Text */}
            <div style={{ paddingTop: 'clamp(0.2rem,0.8vw,1rem)' }}>
              <div style={{ marginBottom: '0.4rem' }}>
                <span
                  className="font-medium uppercase"
                  style={{
                    fontSize: 'clamp(1rem,2vw,1.9rem)',
                    color: '#0A0805',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.name}
                </span>
                <span
                  className="font-black uppercase"
                  style={{
                    display: 'block',
                    fontSize: 'clamp(0.6rem,0.9vw,0.85rem)',
                    color: 'var(--jk-orange)',
                    letterSpacing: '0.08em',
                    marginTop: '0.15rem',
                  }}
                >
                  {s.price}
                </span>
              </div>
              <p
                className="font-light leading-relaxed"
                style={{
                  fontSize: 'clamp(0.8rem,1.3vw,1.1rem)',
                  color: 'rgba(10,8,5,0.55)',
                  maxWidth: '560px',
                }}
              >
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
