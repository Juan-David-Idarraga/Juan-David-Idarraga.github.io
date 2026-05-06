const whatsappMessage =
  'Hola Juan, vi tu portafolio de Tecnology of Jota y me interesa conversar sobre una solucion para mi negocio. Quisiera conocer mas sobre tus sistemas y como podrias ayudarme.';

export const site = {
  brandName: 'Tecnology of Jota',
  personName: 'Juan David Idarraga',
  name: 'Juan David Idarraga',
  title: 'Tecnology of Jota | Juan David Idarraga',
  description:
    'Portafolio profesional de Juan David Idarraga: desarrollo full-stack, movil, sistemas POS, plataformas web, inventario, logistica, arquitectura de software y datos aplicados a negocio.',
  url: 'https://juan-david-idarraga.github.io',
  logo: '/brand/logo.png',
  ogImage: '/og/default.svg',
  whatsapp: {
    phone: '+56 9 7446 4827',
    message: whatsappMessage,
    url: `https://wa.me/56974464827?text=${encodeURIComponent(whatsappMessage)}`,
  },
  nav: [
    { label: 'Proyectos', href: '/proyectos/' },
    { label: 'Capacidades', href: '/#capacidades' },
    { label: 'Arquitectura', href: '/#arquitectura' },
    { label: 'Stack', href: '/#stack' },
    { label: 'Contacto', href: '/#contacto' },
  ],
  metrics: [
    {
      value: 'POS',
      label: 'Sistemas operacionales',
      detail: 'Ventas, caja, stock, usuarios y trazabilidad.',
    },
    {
      value: 'Full-stack',
      label: 'Entrega integral',
      detail: 'Frontend, backend, datos, despliegue y mantenimiento.',
    },
    {
      value: 'Mobile',
      label: 'Aplicaciones Android',
      detail: 'Experiencias moviles para procesos y usuarios finales.',
    },
    {
      value: 'Data',
      label: 'Analitica aplicada',
      detail: 'Indicadores, reportes y exploracion ML orientada a negocio.',
    },
  ],
  capabilities: [
    'Desarrollo full-stack',
    'Desarrollo movil Android',
    'Sistemas POS',
    'Gestion de inventarios',
    'Plataformas web',
    'Logistica operacional',
    'Arquitectura de software',
    'Despliegue optimizado',
    'Analisis de datos',
    'Machine learning aplicado',
  ],
  capabilityGroups: [
    {
      title: 'Operaciones y ventas',
      intent: 'Sistemas para ordenar venta, caja, stock, productos y trazabilidad diaria.',
      items: ['Sistemas POS', 'Control de inventarios', 'Gestion gastronomica'],
    },
    {
      title: 'Plataformas web',
      intent: 'Sitios y aplicaciones web rapidas, mantenibles y preparadas para crecer en contenido.',
      items: ['Full-stack', 'Portales corporativos', 'SEO tecnico'],
    },
    {
      title: 'Movilidad y terreno',
      intent: 'Apps Android para capturar datos, consultar estados y sostener procesos fuera del escritorio.',
      items: ['Android', 'Datos locales', 'Integracion API'],
    },
    {
      title: 'Arquitectura y datos',
      intent: 'Base tecnica para escalar, medir, reportar y tomar mejores decisiones de negocio.',
      items: ['Arquitectura modular', 'Reportes', 'Analitica aplicada'],
    },
  ],
  stackGroups: [
    {
      title: 'Frontend y experiencia',
      items: ['Astro', 'React', 'TypeScript', 'HTML semantico', 'CSS moderno'],
    },
    {
      title: 'Backend y arquitectura',
      items: ['Node.js', 'APIs REST', 'Autenticacion', 'Modularidad', 'Validacion'],
    },
    {
      title: 'Datos y operaciones',
      items: ['SQL', 'Modelado relacional', 'Reportes', 'Inventario', 'Dashboards'],
    },
    {
      title: 'Mobile y despliegue',
      items: ['Android', 'GitHub Pages', 'Docker', 'CI/CD', 'Performance'],
    },
  ],
};
