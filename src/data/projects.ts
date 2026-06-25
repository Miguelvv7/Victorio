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
    tagline: "Migración PrestaShop → Shopify · 350 productos · Écija",
    category: "Shopify · Ecommerce · Liquid",
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
    tagline: "PWA predictiva de glucosa · Next.js + Vercel",
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
    tagline: "Estudio de interiorismo · Shopify + GSAP · Écija",
    category: "Shopify · Diseño · Animaciones",
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
    tagline: "Tienda dropshipping · Moda internacional · Shopify",
    category: "Shopify · Dropshipping",
    year: 2026,
    location: "Remoto",
    liveUrl: "https://londonlangford.com/",
    cover: "/images/langford.png",
    rotation: "md:rotate-[-1deg]",
  },
];

export const services = [
  {
    num: "01",
    title: "Shopify a medida",
    price: "desde 800€",
    time: "~15 días",
    desc: "Tiendas nuevas, migraciones desde PrestaShop o WooCommerce, y secciones Liquid personalizadas. GraphQL para operaciones en masa.",
    includes: [
      "Diseño adaptado a tu marca",
      "Liquid sections y snippets a medida",
      "Migración de catálogo y SEO",
      "Pasarela de pago y envíos configurados",
    ],
  },
  {
    num: "02",
    title: "Web corporativa",
    price: "desde 500€",
    time: "~15 días",
    desc: "WordPress con plugins a medida y SEO local integrado. Pensada para posicionarte en tu zona y convertir visitas en llamadas.",
    includes: [
      "Diseño propio, sin plantillas genéricas",
      "SEO local y Google Business",
      "Formularios y llamadas a la acción",
      "Velocidad y Core Web Vitals cuidados",
    ],
  },
  {
    num: "03",
    title: "Automatizaciones",
    price: "presupuesto cerrado",
    time: "según alcance",
    desc: "n8n y Make para eliminar tareas repetitivas. Scraping de datos con Python/Playwright, integraciones entre plataformas y procesamiento de catálogos.",
    includes: [
      "Flujos n8n o Make a medida",
      "Scraping y normalización de datos",
      "Integración con Shopify, WooCommerce, CRMs",
      "Formación para que lo gestiones tú",
    ],
  },
  {
    num: "04",
    title: "Mantenimiento",
    price: "desde 80€/mes",
    time: "contrato mensual",
    desc: "Tu web en manos de quien la ha construido. Actualizaciones, backups, velocidad, seguridad y cambios de contenido sin esperas ni complicaciones.",
    includes: [
      "Backups semanales y seguridad activa",
      "Actualizaciones de plugins y CMS",
      "Cambios de contenido y productos",
      "Soporte directo por WhatsApp",
    ],
  },
];

export const stack = [
  "SHOPIFY", "LIQUID", "GRAPHQL", "WORDPRESS", "PHP",
  "REACT", "NEXT.JS", "GSAP", "PYTHON", "N8N",
  "PLAYWRIGHT", "MYSQL", "GIT", "VERCEL", "SEO LOCAL",
];

export const steps = [
  {
    num: "1",
    title: "Hablamos",
    desc: "Me cuentas el negocio, qué te falta y qué quieres conseguir. Sin formularios raros ni reuniones de hora y media.",
  },
  {
    num: "2",
    title: "Propuesta clara",
    desc: "Qué hago, cuánto cuesta y cuándo lo tienes. Precio cerrado desde el primer día — sin sorpresas al final.",
  },
  {
    num: "3",
    title: "Lo hacemos",
    desc: "Trabajo solo en tu proyecto hasta que está listo. Ves el avance en tiempo real y lo lanzamos juntos.",
  },
];

export const metrics = [
  { value: "4+",    label: "proyectos lanzados" },
  { value: "1 cliente", label: "a la vez" },
  { value: "15 días", label: "entrega media" },
];

export const faqs = [
  {
    q: "¿Cuánto tarda?",
    a: "Entre 10 y 15 días para una web corporativa o tienda estándar. Proyectos con catálogos grandes o lógica compleja pueden necesitar algo más — te lo digo antes de empezar.",
  },
  {
    q: "¿Qué necesito tener listo?",
    a: "Textos, fotos y ganas. Si no tienes textos, te ayudo a estructurarlos. El diseño lo defino yo a partir de tu negocio.",
  },
  {
    q: "¿Trabajas fuera de Écija?",
    a: "Sí. Trabajo en remoto para clientes de toda España. La mayoría de la comunicación es por WhatsApp y videollamada.",
  },
  {
    q: "¿Qué pasa si no me gusta el resultado?",
    a: "Revisamos hasta que quede como quieres. No doy el proyecto por cerrado hasta que estés satisfecho con lo que ves.",
  },
];

export const noHago = [
  "No hago logos ni identidad visual desde cero.",
  "No gestiono redes sociales ni publicidad pagada.",
  "No trabajo con más de un cliente a la vez — cuando empezamos, eres el único.",
];

export const sectors = [
  "Tiendas y ecommerce",
  "Estudios de interiorismo",
  "Ópticas y centros de salud",
  "Negocios locales con catálogo",
];

export const porqueYo = [
  {
    num: "01",
    title: "Hablas conmigo, no con un gestor.",
    desc: "Sin intermediarios. Soy quien diseña, programa y entrega — y quien responde si algo falla después.",
  },
  {
    num: "02",
    title: "Un proyecto a la vez.",
    desc: "Cuando empezamos el tuyo, es el único en mi agenda. No lo comparto con diez clientes más.",
  },
  {
    num: "03",
    title: "Precio cerrado desde el día uno.",
    desc: "Lo que acordamos es lo que pagas. Sin horas extra, sin costes ocultos, sin presupuestos que se disparan.",
  },
  {
    num: "04",
    title: "15 días, no 3 meses.",
    desc: "Las agencias tardan. Yo entrego rápido porque trabajo solo y sin burocracia. Tu negocio no puede esperar.",
  },
];
