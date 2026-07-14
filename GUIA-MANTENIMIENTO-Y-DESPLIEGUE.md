# Guía para mantener y publicar mi portafolio

## 1. Dónde cambio cada cosa

| Necesito cambiar | Archivo o carpeta |
| --- | --- |
| Nombre, presentación, tecnologías, servicios y contacto | `data/portfolio.ts` |
| Proyectos | Arreglo `projects` de `data/portfolio.ts` |
| Orden, título y descripción de cada captura | `data/project-captures.ts` |
| Capturas | `public/projects/<nombre-del-proyecto>/` |
| Logo | `public/brand/logo-juan-david.png` |
| Currículum | `public/documents/cv-juan-david-idarraga.pdf` |
| Colores, tamaños y responsive | `app/globals.css` |
| Textos para Google y redes sociales | `app/layout.tsx` |

La regla más importante es no escribir contenido personal directamente dentro del componente principal. Lo mantengo en `data/portfolio.ts` para poder editarlo sin tocar las animaciones.

## 2. Cómo agrego un proyecto propio

### Paso 1: preparo las capturas

1. Creo una carpeta con un nombre corto, por ejemplo `public/projects/mi-inventario/`.
2. Uso nombres descriptivos en kebab-case, por ejemplo `ventas-menu-principal.webp`.
3. Dejo como primera captura la función más representativa y reservo el inicio de sesión para el final.
4. Uso WebP, un ancho aproximado de 1600 px para escritorio y un peso ideal menor a 500 KB.
5. No incluyo contraseñas, tokens, datos de clientes, correos privados ni información real visible en las capturas.

Cuando la captura existe, el sitio la muestra dentro del recorrido. Si la ruta está equivocada o el archivo todavía no existe, la tarjeta conserva el mockup animado actual.

### Paso 2: agrego el contenido

Primero abro `data/project-captures.ts` y creo el recorrido del proyecto. Declaro el orden de forma explícita para no depender del nombre de los archivos:

```ts
export const inventarioCaptures = [
  {
    src: "/projects/mi-inventario/ventas-menu-principal.webp",
    alt: "Pantalla principal de ventas del sistema de inventario",
    title: "Ventas — Menú principal",
    description: "Selección de productos para preparar una nueva orden.",
    module: "Ventas",
    order: 1,
    format: "desktop",
  },
] satisfies ProjectCapture[];
```

Después importo esa lista en `data/portfolio.ts`, busco `export const projects` y agrego un objeto antes del cierre del arreglo:

```ts
{
  id: "project-inventario",
  slug: "sistema-control-inventario",
  title: "Sistema de Control de Inventario",
  category: "Operaciones · Inventario",
  status: "Activo",
  shortDescription: "Control de existencias, movimientos y alertas en tiempo real.",
  fullDescription: "Explico aquí el alcance completo del producto.",
  problem: "Describo el problema que tenía el negocio.",
  solution: "Describo cómo lo resolví y qué decisiones tomé.",
  focus: "Indico el resultado principal: tiempo, precisión, ventas o control.",
  features: [
    "Entradas y salidas",
    "Alertas de stock",
    "Historial de movimientos",
  ],
  stack: ["Next.js", "TypeScript", "Supabase"],
  captures: inventarioCaptures,
  demoUrl: "https://mi-demo.com",
  codeUrl: "https://github.com/mi-usuario/mi-repositorio",
  featured: true,
  private: false,
  visual: "web",
},
```

Opciones importantes:

- `status`: solo admite `En desarrollo`, `Activo` o `Concepto`.
- `visual`: puede ser `pos`, `web` o `mobile` y define el mockup de respaldo.
- `private: true`: muestra que el código es privado.
- `demoUrl`: si lo omito, aparece “En desarrollo”.
- `codeUrl`: si el código es privado, lo omito por completo.
- La captura con el menor valor de `order` se utiliza como portada de la tarjeta.
- `format` admite `desktop` o `mobile` y ajusta la proporción del visor.

### Paso 3: agrego textos, tecnologías o servicios

En `data/portfolio.ts` edito las listas `technologies`, `services`, `principles` o `processSteps`. Copio un elemento existente, cambio sus valores y respeto los nombres de las propiedades. TypeScript me avisará si escribo una opción no permitida.

### Paso 4: agrego código sin exponer información sensible

El código fuente de cada proyecto debe vivir en su propio repositorio de GitHub. En el portafolio solo agrego `codeUrl`. Antes de publicarlo reviso que no existan:

- archivos `.env`;
- claves API o tokens;
- contraseñas o cadenas de conexión;
- bases de datos o respaldos;
- datos personales de clientes;
- certificados `.pem`.

## 3. Cómo reviso los cambios antes de publicarlos

Desde una terminal abierta en la carpeta del proyecto ejecuto:

```bash
npm install
npm run dev
```

Abro la dirección local que muestra la terminal. Cuando termino, valido todo:

```bash
npm run lint
npm test
npm run build
```

Si uno de esos comandos falla, no publico hasta corregirlo.

## 4. Despliegue gratuito en GitHub Pages

GitHub Pages publica archivos estáticos. Este proyecto conserva su compilación principal para Cloudflare y agrega una compilación estática separada únicamente cuando el destino es GitHub Pages.

La configuración incluida está preparada para un repositorio personal llamado exactamente:

```text
TU_USUARIO.github.io
```

Este nombre evita problemas con rutas de imágenes, fuentes y documentos.

### Primera publicación

1. Entro a GitHub y creo un repositorio público llamado `TU_USUARIO.github.io`.
2. No agrego README, licencia ni `.gitignore` desde GitHub si ya voy a subir esta carpeta completa.
3. En la terminal del proyecto compruebo los cambios:

```bash
git status
git add .
git commit -m "Publicar portafolio"
```

4. Conecto el repositorio y subo la rama principal:

```bash
git remote add github https://github.com/TU_USUARIO/TU_USUARIO.github.io.git
git push -u github main
```

5. En GitHub entro a `Settings` → `Pages`.
6. En `Build and deployment`, selecciono `GitHub Actions` como fuente.
7. Entro a la pestaña `Actions` y espero que termine el flujo “Publicar en GitHub Pages”.
8. Abro `https://TU_USUARIO.github.io`.

El archivo `.github/workflows/deploy-pages.yml` instala las dependencias, crea la versión estática en `out` y la publica. No necesito subir la carpeta `out` manualmente.

### Publicaciones siguientes

Después de editar contenido o imágenes:

```bash
npm run lint
npm test
git add .
git commit -m "Actualizar proyectos del portafolio"
git push github main
```

Cada `push` a `main` ejecuta el despliegue automáticamente.

### Si ya existe un remoto llamado `origin`

No lo reemplazo. Uso el nombre `github`, como aparece en los comandos anteriores. Para consultar los remotos configurados:

```bash
git remote -v
```

### Si GitHub muestra un error

1. Entro a `Actions`.
2. Abro la ejecución con una cruz roja.
3. Reviso el primer paso que falló.
4. Corrijo el archivo indicado localmente.
5. Ejecuto nuevamente `npm run lint` y `npm test`.
6. Creo otro commit y vuelvo a hacer `git push github main`.

Referencias oficiales:

- GitHub Pages: https://docs.github.com/en/pages/quickstart
- Flujos personalizados de Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Exportación estática de Next.js: https://nextjs.org/docs/app/guides/static-exports
