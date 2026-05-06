# Juan David Idarraga Portfolio

Portafolio profesional premium construido con Astro, TypeScript, MDX, Content Collections y un sistema propio de tokens CSS. La arquitectura esta pensada para rendimiento, SEO, escalabilidad de contenido y despliegue estatico en GitHub Pages.

## Arquitectura

```txt
src/
  components/
    navigation/
    sections/
    ui/
    visual/
  content/
    projects/
  data/
  layouts/
  pages/
    proyectos/
  styles/
public/
  brand/
  og/
  project-assets/
  videos/
```

El contenido de proyectos vive en `src/content/projects`. Las paginas se generan automaticamente desde Astro Content Collections, por lo que no es necesario editar componentes para agregar nuevos casos.

## Instalar

Requiere Node.js 22.12 o superior.

```bash
npm install
```

## Correr en local

```bash
npm run dev
```

Luego abre la URL que indique Astro, normalmente `http://localhost:4321`.

## Build de produccion

```bash
npm run build
```

Para previsualizar:

```bash
npm run preview
```

## Agregar un nuevo proyecto

1. Crea un archivo en `src/content/projects/nombre-del-proyecto.mdx`.
2. Copia la estructura de uno de los proyectos existentes.
3. Cambia `slug`, `title`, `summary`, `stack`, `architecture`, `decisions`, `results` y SEO.
4. Si quieres que aparezca en homepage, usa `featured: true`.

Campos soportados:

```yaml
title: "Nombre del proyecto"
slug: "nombre-del-proyecto"
featured: true
year: 2026
type: ["Full-stack", "POS"]
industry: "Industria"
role: "Rol tecnico"
summary: "Resumen ejecutivo"
problem: "Problema operacional"
stack: ["Astro", "TypeScript"]
architecture: ["Decision de arquitectura"]
challenges: ["Reto tecnico"]
decisions:
  - title: "Decision"
    reason: "Justificacion"
results: ["Resultado"]
cover: "/project-assets/cover.svg"
gallery: ["/project-assets/gallery.svg"]
video: "/videos/demo.mp4"
seoTitle: "Titulo SEO"
seoDescription: "Descripcion SEO"
```

## Agregar imagenes

Para assets publicos simples, agrega archivos en `public/project-assets/` y referencialos desde MDX con `/project-assets/archivo.svg`.

Para imagenes que quieras optimizar con Astro en componentes futuros, guardalas dentro de `src/assets/` y usalas con `astro:assets`.

## Agregar videos

Para demos ligeras, agrega `.mp4` en `public/videos/` y usa:

```yaml
video: "/videos/demo-proyecto.mp4"
```

Para videos pesados o comerciales, es mejor usar Mux, Cloudinary o un CDN de video y guardar la URL remota.

## Desplegar en GitHub Pages

Este repo incluye `.github/workflows/deploy.yml`. En GitHub:

1. Entra a `Settings > Pages`.
2. Selecciona `GitHub Actions` como fuente.
3. Haz push a `main`.

El sitio esta configurado para el repositorio especial `Juan-David-Idarraga.github.io`, por lo que no requiere `base` en `astro.config.mjs`.
