export interface Project {
  slug: string;
  num: string;
  title: string;
  tagline: string;
  category: string;
  year: number;
  location: string;
  liveUrl: string;
  cover: string;
  rotation: string;
  wip?: boolean;
}

export const projects: Project[] = [
  {
    slug: "lookvintage",
    num: "01",
    title: "LookVintage",
    tagline: "Muebles a medida · Écija, Sevilla",
    category: "Shopify · Ecommerce",
    year: 2026,
    location: "Écija, Sevilla",
    liveUrl: "https://www.lookvintage.es/",
    cover: "/images/project-lookvintage.webp",
    rotation: "md:rotate-[-3deg]",
  },
  {
    slug: "glucotrack",
    num: "02",
    title: "GlucoTrack",
    tagline: "Monitor de glucosa predictivo · PWA",
    category: "Next.js · SaaS · PWA",
    year: 2026,
    location: "Remoto",
    liveUrl: "https://glucotrackv2-l5ex.vercel.app/landing/index.html",
    cover: "/images/project-glucotrack.webp",
    rotation: "md:rotate-[-2deg]",
  },
  {
    slug: "manuelinteriorismo",
    num: "03",
    title: "Manuel Interiorismo",
    tagline: "Diseño de interiores · Écija, Sevilla",
    category: "Shopify · Diseño",
    year: 2026,
    location: "Écija, Sevilla",
    liveUrl: "https://manuelinteriorismo.com/",
    cover: "/images/project-manuel.webp",
    rotation: "md:rotate-[3deg]",
    wip: true,
  },
  {
    slug: "londonlangford",
    num: "04",
    title: "London Langford",
    tagline: "Dropshipping · Moda y accesorios",
    category: "Shopify · Dropshipping",
    year: 2026,
    location: "Remoto",
    liveUrl: "https://londonlangford.com/",
    cover: "/images/project-londonlangford.png",
    rotation: "md:rotate-[-1deg]",
  },
];

export const services = [
  {
    num: "01",
    title: "Tienda online",
    price: "desde 800€",
    time: "~15 días",
    desc: "Shopify o WooCommerce. Pagos, envíos, catálogo y diseño a tu medida.",
    includes: [
      "Diseño personalizado",
      "Pasarela de pago configurada",
      "Catálogo y gestión de envíos",
      "Formación para que lo gestiones tú solo",
    ],
  },
  {
    num: "02",
    title: "Web corporativa",
    price: "desde 500€",
    time: "~15 días",
    desc: "WordPress con SEO local incluido. Pensada para convertir visitas en llamadas.",
    includes: [
      "Diseño adaptado a tu negocio",
      "SEO local configurado",
      "Formulario de contacto",
      "Velocidad y carga optimizadas",
    ],
  },
  {
    num: "03",
    title: "Mantenimiento",
    price: "50–150€/mes",
    time: "Mensual",
    desc: "Backups diarios, actualizaciones y soporte directo.",
    includes: [
      "Backups diarios automáticos",
      "Actualizaciones de plugins y core",
      "Soporte directo conmigo, no con un bot",
      "Monitorización de caídas",
    ],
  },
];

export const stack = [
  "WORDPRESS", "SHOPIFY", "WOOCOMMERCE", "WP-CLI", "PHP",
  "REACT", "MYSQL", "LIQUID", "CSS", "GIT", "SEO LOCAL",
  "SITEGROUND", "HOSTINGER", "ELEMENTOR",
];

export const steps = [
  {
    num: "1",
    title: "Hablamos",
    desc: "Me cuentas el negocio, qué te falta y qué quieres conseguir. Sin formularios raros ni reuniones de hora y media.",
  },
  {
    num: "2",
    title: "Te propongo la solución",
    desc: "Qué hago, cuánto cuesta y cuándo lo tienes. Sin tecnicismos ni letra pequeña.",
  },
  {
    num: "3",
    title: "Lo hacemos",
    desc: "Trabajo solo en tu proyecto hasta que está listo. Ves el avance, das feedback y lo lanzamos.",
  },
];

export const metrics = [
  { value: "Proyectos", label: "seleccionados" },
  { value: "1 cliente", label: "a la vez" },
  { value: "15 días", label: "entrega media" },
];

export const faqs = [
  {
    q: "¿Cuánto tarda?",
    a: "Entre 10 y 15 días para una web corporativa. Las tiendas online pueden necesitar algo más según el catálogo.",
  },
  {
    q: "¿Qué necesito tener listo?",
    a: "Textos, fotos y ganas. El resto lo resolvemos juntos.",
  },
  {
    q: "¿Qué pasa si no me gusta el resultado?",
    a: "Trabajamos con revisiones hasta que quede como quieres. No doy el proyecto por cerrado hasta que estés satisfecho.",
  },
];

export const noHago = [
  "No hago logos ni diseño gráfico.",
  "No gestiono redes sociales.",
  "No trabajo con más de un cliente a la vez — cuando empezamos, eres el único.",
];

export const sectors = [
  "Estudios de interiorismo",
  "Negocios de venta al público",
  "Ópticas",
];

export const porqueYo = [
  {
    num: "01",
    title: "Trato cercano, sin tecnicismos.",
    desc: "Hablas directamente conmigo, no con un gestor de cuentas que le pasa el trabajo a otro.",
  },
  {
    num: "02",
    title: "Un proyecto a la vez.",
    desc: "No soy una agencia con diez proyectos en paralelo. Cuando empezamos el tuyo, es el único.",
  },
  {
    num: "03",
    title: "Entrego lo que prometo.",
    desc: "Precio cerrado desde el primer día. Sin sorpresas al final.",
  },
  {
    num: "04",
    title: "Velocidad real.",
    desc: "15 días para una web corporativa. Las agencias tardan meses.",
  },
];
