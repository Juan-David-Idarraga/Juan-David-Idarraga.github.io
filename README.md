# Tecnology of Jota Portfolio

Portafolio profesional premium de Juan David Idarraga, construido con Astro, TypeScript, MDX, Astro Content Collections y un sistema propio de tokens CSS.

La arquitectura esta pensada para rendimiento, SEO, mantenimiento de contenido y despliegue estatico en GitHub Pages. El sitio permite agregar proyectos nuevos desde archivos MDX sin editar manualmente los componentes de la homepage, listado o paginas dinamicas.

## Inicio rapido

Requiere Node.js 22.12 o superior.

```bash
npm install
npm run dev
```

Luego abre la URL que indique Astro, normalmente:

```txt
http://localhost:4321
```

## Scripts disponibles

```bash
npm run dev
```

Inicia el servidor local de desarrollo.

```bash
npm run build
```

Genera la version estatica de produccion dentro de `dist/`.

```bash
npm run preview
```

Previsualiza localmente el build de produccion.

```bash
npm run check
```

Sincroniza tipos y contenido de Astro.

## Estructura principal

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
docs/
  CONTENT_MANAGEMENT.md
```

## Administracion de contenido

La guia completa para administrar proyectos, imagenes, galerias, videos y assets esta en:

[docs/CONTENT_MANAGEMENT.md](docs/CONTENT_MANAGEMENT.md)

Esa guia explica:

- como crear un proyecto desde cero,
- como llenar cada campo del frontmatter,
- donde guardar imagenes y videos,
- como referenciar assets correctamente,
- como destacar proyectos en la homepage,
- como editar proyectos existentes,
- errores comunes y como evitarlos,
- buenas practicas para mantener el portafolio ordenado.

## Despliegue en GitHub Pages

Este repo incluye `.github/workflows/deploy.yml`.

En GitHub:

1. Entra a `Settings > Pages`.
2. Selecciona `GitHub Actions` como fuente.
3. Haz push a `main`.
4. Revisa la pestaña `Actions` y espera que el workflow termine en verde.

El sitio esta configurado para el repositorio especial `Juan-David-Idarraga.github.io`, por lo que no requiere `base` en `astro.config.mjs`.

La URL publica esperada es:

```txt
https://juan-david-idarraga.github.io/
```

