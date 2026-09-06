/* ──────────────────────────────────────────────────────────────
   PORTFOLIO — fuente única de datos
   Para publicar un proyecto nuevo: copia un bloque de `projects`,
   cambia los campos y añade la portada en /public/images.
   El orden del array es el orden en el que se muestra.
   ────────────────────────────────────────────────────────────── */

export type ProjectStatus = "live" | "wip" | "archived";

export interface Project {
  /** identificador en la URL: /proyectos/<slug> */
  slug: string;
  title: string;
  /** frase corta que acompaña al título */
  tagline: string;
  /** etiqueta de disciplina, se muestra en mayúsculas */
  category: string;
  year: number;
  /** qué hiciste tú en el proyecto */
  role: string;
  client?: string;
  location: string;
  status: ProjectStatus;
  /** aparece en la portada (slider + índice). El resto solo en /proyectos */
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  /** portada 4:3 o 16:9 en /public/images */
  cover: string;
  /** capturas adicionales para la ficha del proyecto */
  gallery?: string[];
  /** aviso bajo las capturas, p. ej. si los datos que se ven son inventados */
  galleryNote?: string;
  /** tecnologías, se pintan como chips */
  stack: string[];
  /** para qué existe la web: el objetivo del proyecto en una frase */
  goal: string;
  /** el punto de partida y por qué hacía falta */
  context: string;
  /** 1–2 párrafos para la ficha del proyecto */
  summary: string[];
  /** en qué se tradujo el trabajo */
  outcome: string;
  /** puntos concretos de lo que se construyó */
  highlights: string[];
  /** métricas o datos duros del proyecto (opcional) */
  facts?: { value: string; label: string }[];
  /** color de acento de la ficha */
  accent: string;
}

export const projects: Project[] = [
  {
    slug: "lookvintage",
    title: "LookVintage",
    tagline: "Migración PrestaShop → Shopify con 350 productos",
    category: "Shopify · Ecommerce",
    year: 2026,
    role: "Diseño, desarrollo Liquid y migración de catálogo",
    client: "LookVintage",
    location: "Écija, Sevilla",
    status: "live",
    featured: true,
    liveUrl: "https://www.lookvintage.es/",
    cover: "/images/project-lookvintage.webp",
    gallery: ["/images/screen-lookvintage.jpg"],
    stack: ["Shopify", "Liquid", "GraphQL", "JavaScript", "SEO"],
    goal: "Vender ropa vintage online sin que gestionar la tienda sea un trabajo a jornada completa.",
    context:
      "La tienda vivía en PrestaShop desde hacía años. El catálogo era enorme, cada pieza es única, y el panel se había vuelto tan lento que actualizar stock era una tarea que nadie quería.",
    summary: [
      "Tienda de moda vintage que llevaba años en PrestaShop, con más de 350 referencias y un panel tan lento que actualizar el stock se había vuelto un castigo.",
      "La rehíce entera en Shopify: diseño nuevo, catálogo traído con la API y redirecciones desde las URLs viejas para no perder el sitio que ya tenían en Google.",
    ],
    highlights: [
      "Traje los 350+ productos con sus variantes e imágenes usando la API de Shopify",
      "Colecciones y fichas de producto adaptadas a cómo vende esta tienda",
      "Redirecciones desde todas las direcciones antiguas para no perder visitas",
      "Filtros y buscador pensados para ropa de segunda mano, donde cada pieza es única"
    ],
    outcome:
      "Una tienda que se gestiona desde el móvil, con el catálogo completo migrado y sin perder el tráfico que ya tenían en Google.",
    facts: [
      { value: "350+", label: "productos migrados" },
      { value: "0", label: "URLs perdidas" },
      { value: "2026", label: "año de lanzamiento" },
    ],
    accent: "#60a5fa",
  },
  {
    slug: "facturas",
    title: "Facturas",
    tagline: "App de facturación y control de gastos para una distribuidora de aceite",
    category: "Next.js · App · Supabase",
    year: 2026,
    role: "Producto, diseño, desarrollo y modelo fiscal",
    client: "Distribuidora de aceite · proyecto para un compañero",
    location: "Écija, Sevilla",
    status: "live",
    featured: true,
    cover: "/images/project-facturas.jpg",
    gallery: [
      "/images/screen-facturas-panel.jpg",
      "/images/screen-facturas-informes.jpg",
    ],
    galleryNote:
      "El proyecto y el cliente son reales; los datos de las capturas no. Están hechas con el juego de datos de ejemplo que trae la propia aplicación, así que el negocio, los clientes, los productos y todos los importes son inventados.",
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres", "Tailwind", "jsPDF", "Vitest"],
    goal:
      "Que un autónomo pueda facturar bien y saber qué gana sin entender de fiscalidad ni pelearse con un Excel.",
    context:
      "Un compañero con una empresa de venta de aceite llevaba las ventas y los gastos en hojas de cálculo. Sabía lo que vendía, pero no lo que le quedaba ni cuánto tenía que apartar para Hacienda — y eso solo se descubría al llegar el trimestre.",
    summary: [
      "Es una aplicación web privada, con cuentas, para llevar el negocio entero: clientes, productos, gastos, facturas y los informes que dicen qué producto deja dinero de verdad.",
      "La idea de fondo es que la complejidad la coma el código. La app calcula el IVA por tipo, el recargo de equivalencia y el adelanto del IRPF, pero en pantalla solo aparece una frase: «aparta 1.661 € antes del 20 de octubre». La palabra «modelo 303» no sale nunca.",
    ],
    highlights: [
      "Calcula el IVA por tipos (4 % el aceite, 10 % las semillas, 21 % los portes) y el recargo de equivalencia",
      "Las cuentas se llevan en céntimos enteros: una factura que no cuadra al céntimo es una factura que te pueden rechazar",
      "Una factura emitida no se puede tocar ni borrar; para corregir hay que hacer una rectificativa, como manda la ley",
      "Cada factura queda encadenada a la anterior con una huella, cumpliendo Verifactu antes de que sea obligatorio",
      "Genera el PDF con el logo y el color de la marca del cliente",
      "Avisa de qué producto deja más dinero, de qué clientes llevan tiempo sin comprar y de qué se está acabando",
      "Cada usuario ve solo sus datos, y la app también funciona en local sin cuenta para probarla"
    ],
    outcome:
      "Las hojas de cálculo desaparecieron. Ahora factura desde el móvil con numeración correlativa correcta y sabe en todo momento cuánto del dinero de la cuenta no es suyo.",
    facts: [
      { value: "65", label: "tests del motor fiscal" },
      { value: "0", label: "decimales flotantes" },
      { value: "Verifactu", label: "desde el día uno" },
    ],
    accent: "#7d9142",
  },
  {
    slug: "manuelinteriorismo",
    title: "Manuel Interiorismo",
    tagline: "Estudio de interiorismo con animaciones GSAP",
    category: "Shopify · Diseño",
    year: 2026,
    role: "Dirección visual, desarrollo y animación",
    client: "Manuel Interiorismo",
    location: "Écija, Sevilla",
    status: "wip",
    featured: true,
    liveUrl: "https://manuelinteriorismo.com/",
    cover: "/images/project-manuel.webp",
    gallery: ["/images/screen-manuel.jpg"],
    stack: ["Shopify", "Liquid", "GSAP", "ScrollTrigger", "CSS"],
    goal: "Enseñar proyectos de interiorismo como si fueran una revista, y vender después.",
    context:
      "El estudio no necesitaba un escaparate de productos: necesitaba que se vieran sus proyectos. Las plantillas de ecommerce estándar hacían justo lo contrario.",
    summary: [
      "Un estudio de interiorismo no necesitaba un escaparate de productos: necesitaba que se vieran sus proyectos. Las plantillas de tienda hacen justo lo contrario.",
      "Está montada sobre Shopify pero con estructura de portfolio: mandan los proyectos, el producto viene después, y todo se va descubriendo conforme bajas.",
    ],
    highlights: [
      "Galerías de proyecto que se recorren en horizontal",
      "Las imágenes entran y se mueven a distinta velocidad según bajas",
      "Todo editable desde el panel, para que puedan publicar sin llamarme",
      "Las fotos pesadas se cargan cuando hacen falta, no todas de golpe"
    ],
    outcome:
      "Una web con estructura de portfolio sobre Shopify: los proyectos mandan, el producto acompaña, y el estudio publica sin tocar código.",
    facts: [
      { value: "GSAP", label: "motor de animación" },
      { value: "100%", label: "editable por el cliente" },
    ],
    accent: "#c9a227",
  },
  {
    slug: "londonlangford",
    title: "London Langford",
    tagline: "Tienda de moda internacional montada de cero",
    category: "Shopify · Dropshipping",
    year: 2026,
    role: "Montaje de tienda, tema y automatizaciones",
    client: "London Langford",
    location: "Remoto",
    status: "live",
    featured: true,
    liveUrl: "https://londonlangford.com/",
    cover: "/images/langford.png",
    gallery: ["/images/project-londonlangford.jpg"],
    stack: ["Shopify", "Liquid", "n8n", "Python", "Playwright"],
    goal: "Montar una tienda internacional que se mantenga sola mientras el catálogo crece.",
    context:
      "Proyecto arrancado de cero, sin tienda previa. El cuello de botella evidente era el catálogo: subir y actualizar productos a mano no escalaba.",
    summary: [
      "Proyecto de moda internacional arrancado desde cero, sin tienda previa. Había que estar vendiendo pronto y sin depender de nadie para mover el catálogo.",
      "Monté la tienda entera y automaticé la parte pesada: subir productos, dejar los datos ordenados y mantener el stock al día sin tocar nada a mano.",
    ],
    highlights: [
      "Tienda con pago en varias divisas, lista para vender fuera de España",
      "Las fichas de producto se sacan y se ordenan solas con Python",
      "Flujos automáticos que mantienen stock y precios al día",
      "Colecciones montadas para que el catálogo pueda crecer sin rehacerlo"
    ],
    outcome:
      "Tienda operativa en multi-divisa con el catálogo entrando y actualizándose solo desde los flujos de n8n.",
    facts: [
      { value: "n8n", label: "catálogo automatizado" },
      { value: "Multi", label: "divisa e idioma" },
    ],
    accent: "#e8712b",
  },
];

export const featuredProjects = projects.filter((p) => p.featured !== false);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const statusLabel: Record<ProjectStatus, string> = {
  live: "En producción",
  wip: "En desarrollo",
  archived: "Archivado",
};

/* ── Qué hago — sin precios, enfoque portfolio ── */
export const capabilities = [
  {
    num: "01",
    title: "Tiendas online",
    kicker: "Shopify · Liquid",
    desc: "Monto la tienda entera: el diseño, los productos y todo lo que hay que tocar para que alguien pueda comprar y a ti te llegue el dinero. Si ya tienes una en otro sitio, me traigo el catálogo sin que pierdas las visitas que ya tenías.",
    items: [
      "Tienda montada de cero",
      "Traer el catálogo desde otra plataforma",
      "Pagos y envíos configurados",
      "Sin perder posiciones en Google",
    ],
  },
  {
    num: "02",
    title: "Webs y apps",
    kicker: "Next.js · React · GSAP",
    desc: "Desde una web que solo tiene que estar bien y cargar rápido, hasta una aplicación para llevar el negocio por dentro: facturas, gastos, clientes y lo que haga falta.",
    items: [
      "Webs rápidas, hechas para el móvil",
      "Aplicaciones a medida",
      "Animaciones cuidadas, sin marearte",
      "Textos y estructura pensados para vender",
    ],
  },
  {
    num: "03",
    title: "Automatizaciones",
    kicker: "n8n · Python",
    desc: "Si hay algo que estás haciendo a mano dos veces por semana, seguramente se puede automatizar. Subir productos, sacar datos de otra web, conectar dos programas que no se hablan entre ellos.",
    items: [
      "Subir catálogos sin teclear nada",
      "Sacar datos de otras webs",
      "Conectar plataformas entre sí",
      "Avisos y tareas en automático",
    ],
  },
  {
    num: "04",
    title: "Y después",
    kicker: "No desaparezco",
    desc: "Cuando la web ya está publicada sigo estando ahí. Un cambio, un producto nuevo, algo que se ha roto: me escribes y lo miro. Sin contratos ni cuotas mensuales.",
    items: [
      "Cambios y arreglos puntuales",
      "Añadir productos o secciones nuevas",
      "Me escribes a mí, no a un soporte",
      "Sin contrato mensual",
    ],
  },
];

export const stack = [
  "SHOPIFY", "LIQUID", "GRAPHQL", "NEXT.JS", "REACT",
  "TYPESCRIPT", "GSAP", "SUPABASE", "POSTGRES", "TAILWIND",
  "PYTHON", "PLAYWRIGHT", "N8N", "GIT", "VERCEL",
];

export const metrics = [
  { value: "4", label: "webs en producción" },
  { value: "2026", label: "aprendiendo" },
  { value: "Écija", label: "base · remoto" },
];

export const steps = [
  {
    num: "1",
    title: "Me cuentas",
    desc: "Qué tienes ahora, qué te falta y para qué lo quieres. Una conversación por WhatsApp suele bastar — no hace falta reunión de hora y media.",
  },
  {
    num: "2",
    title: "Te digo precio y fecha",
    desc: "Antes de tocar nada sabes lo que cuesta y cuándo lo tienes. Si algo se sale de lo que sé hacer, te lo digo en este punto.",
  },
  {
    num: "3",
    title: "Lo montamos",
    desc: "Vas viendo cómo avanza y me vas diciendo. Cuando está como lo quieres, lo publicamos.",
  },
];

export const faqs = [
  {
    q: "¿Es verdad que usas IA?",
    a: "Sí, y no lo escondo. Es mi herramienta principal y es lo que me permite sacar adelante proyectos que hace un año no habría podido tocar. Las webs que hay en esta página están funcionando y las puedes visitar: júzgalas por cómo van, no por cómo se hicieron.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "Depende del tamaño. Una web sencilla puede estar en un par de semanas; una tienda con catálogo grande lleva más. Te doy una fecha antes de empezar y si veo que no llego, te aviso — no te dejo esperando.",
  },
  {
    q: "¿Qué necesito tener listo?",
    a: "Textos, fotos y saber qué quieres conseguir. Si no tienes los textos, te ayudo a montarlos. El diseño lo propongo yo a partir de tu negocio y lo vamos ajustando.",
  },
  {
    q: "¿Trabajas fuera de Écija?",
    a: "Sí. La mayoría de la comunicación es por WhatsApp y videollamada, así que da igual dónde estés.",
  },
  {
    q: "¿Y si no me gusta el resultado?",
    a: "Lo cambiamos. No doy nada por cerrado hasta que lo veas y me digas que sí.",
  },
];

export const noHago = [
  "No hago logos ni identidad visual desde cero.",
  "No llevo redes sociales ni campañas de publicidad.",
  "No cojo dos proyectos a la vez.",
  "No te digo que sé hacer algo si no sé hacerlo.",
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
    title: "Hablas conmigo y ya está.",
    desc: "No hay comercial, ni gestor de cuentas, ni nadie que te pase con otro. Te contesto yo, lo monto yo y respondo yo si algo falla después.",
  },
  {
    num: "02",
    title: "Un proyecto cada vez.",
    desc: "Cuando empiezo el tuyo es el único que tengo entre manos. No lo voy alternando con otros cinco a medio hacer.",
  },
  {
    num: "03",
    title: "Uso la IA y no lo escondo.",
    desc: "Es la herramienta que me deja llegar donde hace un año no llegaba. Lo que tienes que juzgar es la web, no con qué la hice — entra en las que hay aquí y decide.",
  },
  {
    num: "04",
    title: "Te digo lo que sé y lo que no.",
    desc: "Si me pides algo que no sé hacer, te lo digo antes de empezar en vez de aprender a tu costa y entregarte un apaño.",
  },
];


/* ──────────────────────────────────────────────────────────────
   PLANTILLA — copia este bloque dentro de `projects` para publicar
   un proyecto nuevo. Borra los campos opcionales que no uses.

   {
     slug: "mi-proyecto",
     title: "Mi Proyecto",
     tagline: "Una frase de qué es",
     category: "Shopify · Ecommerce",
     year: 2026,
     role: "Qué hiciste tú",
     client: "Nombre del cliente",
     location: "Écija, Sevilla",
     status: "live",              // live | wip | archived
     featured: true,              // aparece en la portada
     liveUrl: "https://...",
     repoUrl: "https://github.com/...",
     cover: "/images/mi-proyecto.webp",
     gallery: ["/images/mi-proyecto-1.jpg"],
     galleryNote: "Aviso opcional bajo las capturas (datos de ejemplo, etc.).",
     stack: ["Shopify", "Liquid"],
     goal: "Para qué existe esta web, en una frase.",
     context: "Cómo estaba la cosa antes y por qué hacía falta.",
     summary: ["Párrafo 1.", "Párrafo 2."],
     highlights: ["Cosa concreta que construiste", "Otra"],
     outcome: "En qué se tradujo el trabajo.",
     facts: [{ value: "350+", label: "productos" }],
     accent: "#60a5fa",
   },
   ────────────────────────────────────────────────────────────── */
