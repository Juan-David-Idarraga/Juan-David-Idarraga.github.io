# Portafolio de Juan David Idarraga Bolaños

Portafolio profesional de una sola página construido con Next.js, TypeScript, Motion y Lucide. El contenido editable vive en `data/portfolio.ts`; los componentes consumen esos datos sin duplicarlos.

## Desarrollo

```bash
npm install
npm run dev
```

Para validar la entrega:

```bash
npm run lint
npm run build
```

## Recursos del portafolio

- Logo real: `public/brand/logo-juan-david.png`. Mientras no exista, el sitio muestra un monograma tipográfico accesible.
- CV: `public/documents/cv-juan-david-idarraga.pdf`. El modal detecta su ausencia y ofrece contacto por correo.
- Capturas: cada proyecto guarda sus imágenes públicas en `public/projects/<proyecto>/`.
- Recorridos y textos de cada captura: `data/project-captures.ts`.
- Casos de estudio y tecnologías verificadas: `data/portfolio.ts`.

## Configuración

Define `NEXT_PUBLIC_SITE_URL` a partir de `.env.example` cuando exista el dominio final. Esta URL alimenta canonical, sitemap, robots y datos estructurados.

El formulario no utiliza backend: valida los datos y prepara un borrador mediante `mailto:` para que el visitante lo revise antes de enviarlo.

## Documentación

- [Auditoría del código](AUDITORIA-CODIGO.md)
- [Guía para agregar proyectos y desplegar](GUIA-MANTENIMIENTO-Y-DESPLIEGUE.md)
