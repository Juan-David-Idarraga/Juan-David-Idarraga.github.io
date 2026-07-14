import type {
  Certification,
  ContactInfo,
  Language,
  NavigationItem,
  PersonalInfo,
  Project,
  Service,
  SocialLink,
  Technology,
} from "@/types/portfolio";
import {
  busDelSaborCaptures,
  familyWafflesCaptures,
  fundacionReikiCaptures,
  interagroCaptures,
} from "@/data/project-captures";

// Mantengo todo el contenido editable en este archivo para no mezclar textos
// personales con la lógica visual y las animaciones del sitio.
export const personalInfo: PersonalInfo = {
  name: "Juan David Idarraga Bolaños",
  eyebrow: "Hola, soy",
  professions: [
    "Ingeniero de Software",
    "Desarrollador Full-Stack & Móvil",
    "Analista de Datos",
    "Consultor de Tecnología"
  ],
  summary:
    "Desarrollo soluciones tecnológicas orientadas a resolver problemas operativos reales, optimizar procesos y transformar necesidades empresariales en sistemas eficientes, escalables y fáciles de utilizar.",
  about: [
    "Soy un desarrollador apasionado por crear soluciones tecnológicas que resuelvan problemas operativos reales de las empresas. Actualmente curso Ingeniería en Ejecución en Informática en el Instituto Profesional AIEP.",
    "Mi enfoque combina una base sólida en arquitectura de software con experiencia práctica en logística, control de inventarios y operaciones comerciales.",
  ],
  differentiator:
    "No diseño sistemas desde una perspectiva solamente técnica. Comprendo la lógica del negocio, los procesos diarios, los puntos de fricción y las necesidades reales de los usuarios.",
  logoPath: "/brand/logo-juan-david.png",
};

export const navigation: NavigationItem[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Tecnologías", href: "#tecnologias" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" },
];

export const socialLinks: SocialLink[] = [
  { label: "Correo", href: "mailto:tecnologyofjota@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/emocionalj/" },
  { label: "GitHub" },
  { label: "LinkedIn" },
];

export const contactInfo: ContactInfo = {
  email: "tecnologyofjota@gmail.com",
  phone: "+56 9 7446 4827",
  location: "Santiago, Chile",
  instagramUrl: "https://www.instagram.com/emocionalj/",
  whatsappNumber: "56974464827",
  whatsappMessage:
    "Hola Juan David, vi tu portafolio y me gustaría conversar sobre un proyecto.",
};

// Agrego cada proyecto como un objeto independiente; las tarjetas y los modales
// se construyen automáticamente a partir de esta lista.
export const projects: Project[] = [
  {
    id: "project-bus-del-sabor",
    slug: "pos-bus-del-sabor",
    title: "Bus del Sabor · Sistema POS",
    category: "Producto propio · Gastronomía",
    status: "En desarrollo",
    shortDescription:
      "Sistema integral de ventas para comida rápida que conecta caja, pedidos personalizados, cocina, administración y analíticas.",
    fullDescription:
      "Bus del Sabor es un producto propio creado para administrar la operación completa de un local de comida rápida: desde la selección de productos y el cobro hasta la preparación, el cierre de turno y el análisis de resultados.",
    problem:
      "Una operación de comida rápida debe gestionar variantes, extras, ingredientes, canales externos, cocina y caja sin perder velocidad ni trazabilidad.",
    solution:
      "Construí un flujo único con catálogo visual, carrito configurable, pedidos de WhatsApp, monitor de cocina, administración de carta, múltiples medios de pago, cuadratura a ciegas y paneles analíticos.",
    focus:
      "Reduje la fricción entre venta, preparación y cierre de caja al convertir procesos dispersos en una experiencia rápida, visual y controlable.",
    features: [
      "Catálogo por categorías y productos",
      "Tamaños, extras e ingredientes removibles",
      "Carrito y múltiples métodos de pago",
      "Pedidos recibidos desde WhatsApp",
      "Monitor de preparación para cocina",
      "Gestión de carta y creación de productos",
      "Canales como Uber Eats, Rappi y PedidosYa",
      "Cierre de turno y cuadratura a ciegas",
      "Analíticas por ventas, productos y medios de pago",
    ],
    stack: ["Next.js", "Supabase", "SQL", "Vercel"],
    captures: busDelSaborCaptures,
    coverSrc: "/projects/bus-del-sabor/menu-inicial.png",
    featured: true,
    private: true,
    visual: "pos",
  },
  {
    id: "project-reiki",
    slug: "plataforma-fundacion-reiki",
    title: "Plataforma Web Fundación Reiki",
    category: "Web institucional",
    status: "Activo",
    shortDescription:
      "Plataforma institucional y académica que reúne información pública, formación online y gestión administrativa en una experiencia responsive.",
    fullDescription:
      "El Centro de Reiki y bienestar integral combina un sitio público de presentación con un espacio formativo para estudiantes y un panel privado para administrar alumnos, clases, materiales y comunicados.",
    problem:
      "La academia necesitaba comunicar su oferta, entregar contenido formativo y controlar el acceso de estudiantes sin dispersar la operación entre herramientas separadas.",
    solution:
      "Construí una plataforma unificada con sitio institucional, formación Reiki Usui, portal de alumnos, clases online, biblioteca de materiales y administración del contenido.",
    focus:
      "Organicé la experiencia pública, académica y administrativa para que cada perfil encuentre sus tareas principales con claridad desde computador o teléfono.",
    features: [
      "Sitio institucional y oferta formativa",
      "Portal de sesiones y clases grabadas",
      "Biblioteca de materiales PDF",
      "Gestión de estudiantes y vigencia de acceso",
      "Publicación de avisos para alumnos",
      "Panel de administración de contenido",
      "Experiencia responsive para móvil",
    ],
    stack: ["Vercel"],
    captures: fundacionReikiCaptures,
    coverSrc: "/projects/fundacion-reiki/inicio-centro-reiki.webp",
    demoUrl: "https://fundacion-reiki.vercel.app",
    featured: true,
    private: true,
    visual: "web",
  },
  {
    id: "project-family-waffles",
    slug: "family-waffles-pos",
    title: "Family Waffles · Sistema POS",
    category: "Producto propio · Gastronomía",
    status: "En desarrollo",
    shortDescription:
      "Sistema POS para gastronomía que conecta venta, personalización de productos, cobro, pedidos móviles, cocina y cierre de turno.",
    fullDescription:
      "Family Waffles centraliza el recorrido operativo desde la selección del producto hasta su preparación, incorporando catálogo visual, pedidos configurables, medios de pago, monitor de cocina y control de caja.",
    problem:
      "Un local con productos dulces y salados debe registrar variantes, ingredientes, pedidos y pagos con rapidez, mientras cocina necesita recibir comandas completas y priorizadas.",
    solution:
      "Desarrollé un flujo conectado con catálogo por categorías, personalización, pedido móvil, cobro, comandas con alertas de tiempo y cierre ciego protegido por validaciones.",
    focus:
      "Convertí la venta y la preparación en una secuencia clara que reduce omisiones y mantiene sincronizados caja, atención y cocina.",
    features: [
      "Catálogo visual por categorías",
      "Cantidades, tamaños, ingredientes y extras",
      "Carrito y múltiples medios de pago",
      "Pedidos desde teléfono hacia cocina",
      "Monitor de comandas con alertas de tiempo",
      "Vista móvil para preparación",
      "Cierre ciego y validación de pedidos pendientes",
      "Resumen del turno y acceso protegido de dueño",
    ],
    stack: [],
    captures: familyWafflesCaptures,
    coverSrc: "/projects/family-waffles-pos/ventas-catalogo.webp",
    featured: true,
    private: true,
    visual: "pos",
  },
  {
    id: "project-interagro",
    slug: "interagro-catalogo-comercial",
    title: "Interagro · Catálogo comercial",
    category: "Plataforma web · Ventas B2B",
    status: "En desarrollo",
    shortDescription:
      "Catálogo digital para consultar productos, preparar solicitudes comerciales y coordinar pedidos por WhatsApp.",
    fullDescription:
      "Interagro organiza la oferta comercial en una experiencia web responsive: el cliente explora productos, filtra el catálogo, arma una solicitud y comparte el pedido por WhatsApp, mientras el equipo dispone de un panel privado para gestionar la operación.",
    problem:
      "La venta mayorista necesita mostrar precios, formatos y disponibilidad con claridad, pero también recoger los datos del negocio y coordinar la entrega sin convertir el catálogo en una tienda con pago en línea.",
    solution:
      "Diseñé un recorrido que conecta catálogo, búsqueda, categorías, solicitud de productos, datos comerciales, confirmación con número de pedido y envío por WhatsApp. El panel privado centraliza el seguimiento y la gestión del catálogo.",
    focus:
      "Convertí una conversación comercial dispersa en un flujo guiado, móvil y trazable, preparado para trabajar con datos en Supabase sin exponer información administrativa al público.",
    features: [
      "Catálogo con búsqueda, categorías y disponibilidad",
      "Precios, formatos y condiciones de conservación",
      "Solicitud de productos sin pago en línea",
      "Datos de negocio, contacto y fecha preferida",
      "Confirmación con número de pedido",
      "Mensaje de WhatsApp preparado automáticamente",
      "Acceso privado y panel de administración",
      "Gestión de productos y datos comerciales",
      "Experiencia responsive orientada a móviles",
    ],
    stack: ["Next.js", "TypeScript", "Zustand", "Supabase", "WhatsApp"],
    captures: interagroCaptures,
    coverSrc: "/projects/interagro/inicio-catalogo.webp",
    featured: true,
    private: true,
    visual: "web",
  },
];

export const technologies: Technology[] = [
  { name: "React", category: "Frontend y Web", level: "Uso principal", detail: "Interfaces modulares y experiencias interactivas." },
  { name: "Next.js", category: "Frontend y Web", level: "Uso principal", detail: "Aplicaciones web rápidas, SEO y despliegues modernos." },
  { name: "HTML5", category: "Frontend y Web", level: "Experiencia práctica", detail: "Estructura semántica, accesible y mantenible." },
  { name: "CSS3", category: "Frontend y Web", level: "Uso principal", detail: "Sistemas visuales responsive y animaciones eficientes." },
  { name: "JavaScript", category: "Frontend y Web", level: "Uso principal", detail: "Lógica de producto e integración de interfaces." },
  { name: "TypeScript", category: "Frontend y Web", level: "Experiencia práctica", detail: "Código robusto con contratos de datos explícitos." },
  { name: "Flutter", category: "Mobile", level: "Experiencia práctica", detail: "Aplicaciones multiplataforma consistentes." },
  { name: "Kotlin", category: "Mobile", level: "Experiencia práctica", detail: "Desarrollo Android orientado a producto." },
  { name: "Android Studio", category: "Mobile", level: "Experiencia práctica", detail: "Construcción, depuración y entrega móvil." },
  { name: "Supabase", category: "Backend y bases de datos", level: "Uso principal", detail: "Datos, autenticación y servicios en tiempo real." },
  { name: "PHP", category: "Backend y bases de datos", level: "Experiencia práctica", detail: "Servicios y aplicaciones web empresariales." },
  { name: "MySQL", category: "Backend y bases de datos", level: "Experiencia práctica", detail: "Modelado y consulta de información operacional." },
  { name: "Firebase", category: "Backend y bases de datos", level: "Experiencia práctica", detail: "Datos móviles, autenticación y sincronización." },
  { name: "SQL Server", category: "Backend y bases de datos", level: "Experiencia práctica", detail: "Gestión de información relacional empresarial." },
  { name: "Git", category: "Infraestructura", level: "Uso principal", detail: "Versionado y colaboración controlada." },
  { name: "GitHub", category: "Infraestructura", level: "Uso principal", detail: "Flujos de entrega y evolución del código." },
  { name: "Vercel", category: "Infraestructura", level: "Uso principal", detail: "Despliegues web rápidos y observables." },
  { name: "APIs REST", category: "Infraestructura", level: "Experiencia práctica", detail: "Integraciones desacopladas entre servicios." },
  { name: "VS Code", category: "Infraestructura", level: "Uso principal", detail: "Entorno de desarrollo y diagnóstico." },
  { name: "Análisis de datos", category: "Datos e inteligencia", level: "Uso principal", detail: "Lectura de indicadores para apoyar decisiones." },
  { name: "Machine Learning", category: "Datos e inteligencia", level: "En aprendizaje", detail: "Modelos aplicados a escenarios empresariales." },
  { name: "Dashboards", category: "Datos e inteligencia", level: "Experiencia práctica", detail: "Información compleja convertida en decisiones claras." },
  { name: "Procesamiento de datos", category: "Datos e inteligencia", level: "Experiencia práctica", detail: "Limpieza, transformación y análisis de información." },
];

// Estas colecciones alimentan las secciones interactivas sin duplicar contenido en JSX.
export const languages: Language[] = [
  { name: "Español", shortCode: "ES", proficiency: 5, label: "Dominio nativo" },
  { name: "Inglés", shortCode: "EN", proficiency: 3, label: "Nivel intermedio" },
];

export const services: Service[] = [
  { name: "Sistemas POS y gestión comercial", description: "Operaciones de venta conectadas con caja, inventario y control.", application: "Restaurantes, comercios y puntos de atención.", icon: "receipt" },
  { name: "Plataformas web empresariales", description: "Herramientas rápidas y escalables para procesos reales.", application: "Portales internos, operaciones y autoservicio.", icon: "browser" },
  { name: "Aplicaciones móviles", description: "Experiencias nativas y multiplataforma centradas en usabilidad.", application: "Equipos en terreno y clientes móviles.", icon: "mobile" },
  { name: "Paneles administrativos", description: "Control claro de usuarios, datos y procesos cotidianos.", application: "Backoffice, operaciones y supervisión.", icon: "panel" },
  { name: "Integraciones de datos", description: "Conexiones confiables entre aplicaciones y bases de datos.", application: "Sistemas heredados, servicios y canales externos.", icon: "database" },
  { name: "Automatización de procesos", description: "Menos tareas repetitivas y más trazabilidad operacional.", application: "Conciliación, inventarios y notificaciones.", icon: "workflow" },
  { name: "Dashboards y análisis", description: "Indicadores que convierten datos en decisiones accionables.", application: "Ventas, eficiencia y rendimiento operativo.", icon: "chart" },
  { name: "Optimización en Vercel", description: "Despliegues ágiles, rendimiento y evolución continua.", application: "Productos Next.js y plataformas web.", icon: "rocket" },
  { name: "Evolución de software", description: "Mantenimiento responsable sin detener la operación.", application: "Productos en crecimiento y sistemas críticos.", icon: "refresh" },
  { name: "IA aplicada, próxima etapa", description: "Exploración responsable de automatización e inteligencia.", application: "Clasificación, predicción y asistentes de proceso.", icon: "spark" },
];

export const principles = [
  { title: "Comprensión del negocio", detail: "Primero entiendo el flujo, las personas y el resultado esperado." },
  { title: "IA aplicada con propósito", detail: "Integro conocimiento de inteligencia artificial donde genera valor real." },
  { title: "Automatización inteligente", detail: "Reduzco tareas manuales y conecto procesos para recuperar tiempo operativo." },
  { title: "Mejora basada en datos", detail: "Mido, aprendo y priorizo decisiones con evidencia." },
];

export const processSteps = [
  { title: "Problema", detail: "Detectamos la fricción operativa y el impacto que produce en el negocio." },
  { title: "Análisis", detail: "Mapeamos datos, personas, reglas y oportunidades de automatización." },
  { title: "Diseño", detail: "Convertimos el conocimiento del proceso en una experiencia clara y medible." },
  { title: "Desarrollo", detail: "Construimos una solución modular, escalable y preparada para integrar IA." },
  { title: "Validación", detail: "Probamos con escenarios reales y ajustamos cada punto de decisión." },
  { title: "Despliegue", detail: "Llevamos el producto a producción con control, observabilidad y rendimiento." },
  { title: "Mejora continua", detail: "Usamos evidencia para optimizar tiempos, automatizar más y evolucionar el sistema." },
];

export const aiCapabilities = [
  { title: "Tiempo operativo", detail: "Automatización de tareas repetitivas y flujos de decisión." },
  { title: "Conocimiento aplicado", detail: "IA integrada al contexto real de cada empresa." },
  { title: "Procesos conectados", detail: "Datos, sistemas y equipos trabajando con mayor coordinación." },
];

export const certifications: Certification[] = [
  { name: "Título en Inteligencia Artificial", issuer: "Oracle" },
];
