# Guia de administracion de contenido

Esta guia explica como administrar el contenido del portafolio Tecnology of Jota sin tener que adivinar como funciona la estructura interna del proyecto.

Esta pensada para una persona que no programo originalmente el sitio, pero que necesita mantenerlo correctamente: agregar proyectos, editar textos, cambiar imagenes, sumar galerias, publicar videos y evitar errores comunes.

## 1. Como esta organizado el contenido

El portafolio usa Astro Content Collections para cargar proyectos desde archivos MDX.

En terminos practicos:

- cada proyecto vive en un archivo `.mdx`;
- esos archivos estan dentro de `src/content/projects/`;
- cada archivo tiene una zona superior llamada frontmatter;
- el frontmatter contiene datos estructurados del proyecto;
- el cuerpo MDX contiene la narracion larga del proyecto;
- Astro lee todos esos archivos automaticamente;
- la homepage muestra los proyectos con `featured: true`;
- la pagina `/proyectos/` lista todos los proyectos;
- cada proyecto genera su propia pagina en `/proyectos/slug-del-proyecto/`.

La coleccion esta definida en:

```txt
src/content.config.ts
```

La carpeta principal de proyectos es:

```txt
src/content/projects/
```

Ejemplos actuales:

```txt
src/content/projects/pos-gestion-gastronomica.mdx
src/content/projects/fundacion-reiki-web.mdx
src/content/projects/aplicaciones-moviles-android.mdx
```

Las imagenes y videos que se referencian desde el frontmatter viven normalmente en:

```txt
public/project-assets/
public/videos/
```

Cuando usas una ruta que empieza con `/`, por ejemplo:

```yaml
cover: "/project-assets/pos-cover.svg"
```

Astro la busca desde la carpeta `public/`. Es decir, esa ruta corresponde al archivo real:

```txt
public/project-assets/pos-cover.svg
```

## 2. Que se renderiza automaticamente

No tienes que editar componentes para agregar un proyecto.

Cuando creas un archivo nuevo dentro de `src/content/projects/`, el sistema hace esto automaticamente:

- lo valida contra el schema de `src/content.config.ts`;
- lo incluye en la pagina `/proyectos/`;
- genera una pagina individual usando el campo `slug`;
- si `featured` es `true`, lo muestra tambien en la homepage;
- usa `cover` como imagen principal;
- usa `gallery` para la galeria tecnica;
- usa `video` si existe;
- usa `seoTitle` y `seoDescription` para metadatos SEO.

Los componentes consumen los campos asi:

- tarjetas de proyecto: `cover`, `year`, `industry`, `title`, `summary`, `type`;
- pagina detalle: `title`, `summary`, `stack`, `role`, `problem`, `architecture`, `challenges`, `results`, `decisions`, `gallery`, `video`;
- SEO: `seoTitle`, `seoDescription`, `cover`.

## 3. Como agregar un nuevo proyecto

### Paso 1: crear el archivo MDX

Crea un archivo dentro de:

```txt
src/content/projects/
```

Usa nombres en minusculas, sin espacios, sin acentos y separados por guiones.

Ejemplo correcto:

```txt
src/content/projects/sistema-inventario-retail.mdx
```

Ejemplos que conviene evitar:

```txt
Sistema Inventario Retail.mdx
sistema_inventario_retail.mdx
sistema-inventario-retail-final-version.mdx
```

El nombre del archivo no define la URL publica. La URL la define el campo `slug`. Aun asi, lo mas ordenado es que archivo y slug sean parecidos.

Ejemplo:

```txt
Archivo: src/content/projects/sistema-inventario-retail.mdx
Slug: sistema-inventario-retail
URL: /proyectos/sistema-inventario-retail/
```

### Paso 2: agregar el frontmatter completo

Cada proyecto debe empezar con frontmatter entre `---`.

Ejemplo completo:

```mdx
---
title: "Sistema de Inventario Retail"
slug: "sistema-inventario-retail"
featured: true
year: 2026
type:
  - Inventario
  - Full-stack
  - Datos
industry: "Retail / Operaciones"
role: "Arquitectura, backend, frontend y modelado de datos"
summary: "Sistema para controlar productos, movimientos de stock, alertas y reportes operacionales."
problem: "La empresa necesita reducir errores manuales, mejorar trazabilidad y tener visibilidad diaria del inventario."
stack:
  - Astro
  - TypeScript
  - Node.js
  - SQL
architecture:
  - "Modelo de movimientos para auditar entradas y salidas de stock."
  - "Separacion entre productos, categorias, usuarios y reportes."
  - "Interfaz orientada a revision rapida de estados e indicadores."
challenges:
  - "Evitar inconsistencias entre stock fisico y registros digitales."
  - "Disenar flujos claros para usuarios administrativos."
  - "Preparar la base para futuras alertas y analitica."
decisions:
  - title: "Stock basado en movimientos"
    reason: "Permite reconstruir historial y detectar inconsistencias sin depender solo del numero actual."
  - title: "Reportes desde datos operacionales"
    reason: "Facilita decisiones sobre reposicion, productos criticos y comportamiento del inventario."
results:
  - "Mayor trazabilidad de productos."
  - "Menos dependencia de planillas manuales."
  - "Base preparada para reportes y analitica."
cover: "/project-assets/sistema-inventario-retail/cover.webp"
gallery:
  - "/project-assets/sistema-inventario-retail/dashboard.webp"
  - "/project-assets/sistema-inventario-retail/architecture.webp"
video: "/videos/sistema-inventario-retail-demo.mp4"
seoTitle: "Sistema de Inventario Retail | Tecnology of Jota"
seoDescription: "Caso de sistema de inventario retail con trazabilidad, arquitectura full-stack, reportes y control operacional."
---

## Contexto

Describe aqui el problema real del negocio, quienes usan el sistema y por que era necesario construirlo.

## Solucion

Explica la solucion de forma clara. Evita hablar solo de pantallas; explica tambien decisiones tecnicas, datos y operacion.

## Arquitectura

Resume como se organizo el sistema: modulos, datos, reglas de negocio, despliegue o integraciones.

## Resultado

Explica que mejoro, que quedo preparado para futuro y que aprendiste del caso.
```

### Paso 3: escribir el cuerpo MDX

Despues del frontmatter puedes escribir contenido normal en Markdown/MDX.

El cuerpo aparece en la pagina individual del proyecto, en la zona narrativa principal.

Puedes usar:

```mdx
## Contexto

Texto del contexto.

## Solucion tecnica

Texto de la solucion.

## Criterio de arquitectura

Texto de arquitectura.

## Evolucion posible

Texto sobre futuras mejoras.
```

Buenas recomendaciones:

- usa titulos `##` para secciones principales;
- usa `###` si necesitas subsecciones;
- no repitas exactamente lo mismo que ya esta en `summary`;
- escribe como caso profesional, no como lista de tecnologias;
- explica problema, decisiones, restricciones y resultado.

## 4. Explicacion completa del frontmatter

Esta seccion explica cada campo definido en `src/content.config.ts`.

### `title`

Tipo:

```ts
string
```

Representa el nombre publico del proyecto.

Ejemplo:

```yaml
title: "Sistema POS & Gestion Gastronomica"
```

Se usa en:

- tarjetas de proyecto;
- pagina individual;
- headings principales;
- enlaces internos.

Debe ser claro, comercial y especifico. Evita titulos vagos como `"App nueva"` o `"Proyecto final"`.

### `slug`

Tipo:

```ts
string
```

Define la URL del proyecto.

Ejemplo:

```yaml
slug: "sistema-pos-gestion-gastronomica"
```

Genera:

```txt
/proyectos/sistema-pos-gestion-gastronomica/
```

Reglas:

- debe ser unico;
- usa minusculas;
- usa guiones;
- no uses espacios;
- no uses acentos;
- no uses simbolos especiales.

Si repites un slug, puedes generar conflictos de rutas.

### `featured`

Tipo:

```ts
boolean
```

Indica si el proyecto aparece en la homepage.

Ejemplo:

```yaml
featured: true
```

Valores posibles:

```yaml
featured: true
featured: false
```

Si es `true`, el proyecto aparece en la seccion de proyectos destacados de la homepage.

Si es `false`, aparece solo en `/proyectos/` y en su pagina individual.

### `year`

Tipo:

```ts
number
```

Representa el ano del proyecto.

Ejemplo:

```yaml
year: 2026
```

Se usa visualmente en tarjetas y pagina detalle. Tambien ayuda a ordenar proyectos: los mas recientes aparecen primero.

No lo escribas entre comillas.

Correcto:

```yaml
year: 2026
```

Evitar:

```yaml
year: "2026"
```

### `type`

Tipo:

```ts
string[]
```

Lista de categorias del proyecto.

Ejemplo:

```yaml
type:
  - POS
  - Inventario
  - Full-stack
```

Se usa en:

- chips de tarjetas;
- filtros de la pagina `/proyectos/`;
- ficha tecnica del proyecto.

Buenas categorias:

- `Full-stack`
- `Mobile`
- `Android`
- `POS`
- `Inventario`
- `Plataforma web`
- `SEO`
- `Datos`
- `Arquitectura`

Mantener nombres consistentes ayuda a que los filtros funcionen de forma limpia.

### `industry`

Tipo:

```ts
string
```

Describe el contexto de negocio o industria.

Ejemplo:

```yaml
industry: "Gastronomia / Operaciones"
```

Se muestra en tarjetas y detalle del proyecto. Debe ayudar a un cliente a entender el contexto real del sistema.

### `role`

Tipo:

```ts
string
```

Explica tu participacion en el proyecto.

Ejemplo:

```yaml
role: "Arquitectura, frontend, backend y despliegue"
```

Se muestra en la ficha tecnica de la pagina detalle.

Debe responder: que hiciste tu en este proyecto.

### `summary`

Tipo:

```ts
string
```

Resumen ejecutivo breve del proyecto.

Ejemplo:

```yaml
summary: "Sistema operacional para ventas, caja, productos, stock y trazabilidad administrativa."
```

Se usa en:

- tarjetas;
- hero del detalle;
- primeras impresiones del visitante.

Debe ser breve, claro y orientado a negocio. Idealmente una frase de 18 a 28 palabras.

### `problem`

Tipo:

```ts
string
```

Describe el problema operacional que resuelve el proyecto.

Ejemplo:

```yaml
problem: "La operacion dependia de planillas manuales y no tenia trazabilidad clara de inventario."
```

Se muestra en la ficha tecnica. Ayuda a que el proyecto no parezca solo una interfaz, sino una solucion a un problema real.

### `stack`

Tipo:

```ts
string[]
```

Lista de tecnologias principales.

Ejemplo:

```yaml
stack:
  - Astro
  - TypeScript
  - Node.js
  - SQL
```

Se muestra en el detalle del proyecto, cerca del encabezado.

No incluyas demasiadas herramientas menores. Prioriza las que explican la arquitectura.

### `architecture`

Tipo:

```ts
string[]
```

Lista de decisiones o piezas de arquitectura.

Ejemplo:

```yaml
architecture:
  - "API modular por dominios: ventas, productos, stock y usuarios."
  - "Modelo de datos orientado a movimientos para auditar cambios."
```

Se muestra en una columna tecnica de la pagina detalle.

Debe explicar como esta pensado el sistema, no solo que tecnologia usa.

### `challenges`

Tipo:

```ts
string[]
```

Lista de retos tecnicos o de producto.

Ejemplo:

```yaml
challenges:
  - "Evitar inconsistencias entre ventas y stock."
  - "Mantener flujos rapidos para usuarios operativos."
```

Se muestra en una columna de retos tecnicos.

Sirve para demostrar criterio: que dificultades habia y que habia que cuidar.

### `decisions`

Tipo:

```ts
Array<{ title: string; reason: string }>
```

Lista de decisiones arquitectonicas con justificacion.

Ejemplo:

```yaml
decisions:
  - title: "Inventario basado en movimientos"
    reason: "Permite reconstruir historial y detectar inconsistencias."
  - title: "Interfaz orientada a operacion"
    reason: "Reduce friccion en tareas repetitivas de caja y administracion."
```

Se muestra en tarjetas de decisiones dentro del detalle del proyecto.

Cada decision debe tener:

- `title`: nombre corto de la decision;
- `reason`: motivo de negocio o tecnico.

### `results`

Tipo:

```ts
string[]
```

Lista de resultados, mejoras o beneficios.

Ejemplo:

```yaml
results:
  - "Mayor trazabilidad de productos."
  - "Reduccion de tareas manuales."
  - "Base preparada para reportes y analitica."
```

Se muestra en una columna de resultados.

Si aun no tienes metricas numericas, puedes usar resultados cualitativos claros. Si tienes numeros reales, mejor.

### `cover`

Tipo:

```ts
string
```

Ruta de la imagen principal.

Ejemplo:

```yaml
cover: "/project-assets/sistema-pos/cover.webp"
```

Se usa en:

- tarjeta del proyecto;
- hero del detalle;
- metadatos Open Graph.

Actualmente se recomienda guardar covers en `public/project-assets/`.

### `gallery`

Tipo:

```ts
string[]
```

Lista de imagenes complementarias.

Ejemplo:

```yaml
gallery:
  - "/project-assets/sistema-pos/dashboard.webp"
  - "/project-assets/sistema-pos/architecture.webp"
```

Se muestra en la seccion de galeria tecnica del detalle.

Este campo puede omitirse. Si no lo incluyes, Astro usa una galeria vacia.

Ejemplo valido sin galeria:

```yaml
gallery: []
```

### `video`

Tipo:

```ts
string | undefined
```

Ruta opcional del video demo.

Ejemplo:

```yaml
video: "/videos/sistema-pos-demo.mp4"
```

Si existe, se renderiza un reproductor de video en la pagina del proyecto.

Si no tienes video, omite el campo.

### `seoTitle`

Tipo:

```ts
string
```

Titulo SEO especifico del proyecto.

Ejemplo:

```yaml
seoTitle: "Sistema POS Gastronomico | Tecnology of Jota"
```

Se usa en el `<title>` de la pagina y en metadatos sociales.

Debe ser claro y no demasiado largo. Idealmente menos de 60 caracteres.

### `seoDescription`

Tipo:

```ts
string
```

Descripcion SEO especifica del proyecto.

Ejemplo:

```yaml
seoDescription: "Caso de sistema POS gastronomico con inventario, trazabilidad y arquitectura full-stack."
```

Se usa en meta description y Open Graph.

Idealmente debe tener entre 120 y 160 caracteres.

## 5. Campos obligatorios y opcionales

Obligatorios:

- `title`
- `slug`
- `featured`
- `year`
- `type`
- `industry`
- `role`
- `summary`
- `problem`
- `stack`
- `architecture`
- `challenges`
- `decisions`
- `results`
- `cover`
- `seoTitle`
- `seoDescription`

Opcionales:

- `gallery` porque tiene valor por defecto `[]`;
- `video` porque esta definido como opcional.

Aunque `gallery` puede omitirse, es recomendable incluirlo como `gallery: []` para que sea evidente que el proyecto no tiene galeria.

## 6. Como agregar imagenes

### Opcion recomendada actualmente: `public/project-assets/`

Para proyectos del portafolio, la opcion mas simple y estable es guardar imagenes en:

```txt
public/project-assets/
```

Recomendacion: crea una carpeta por proyecto.

Ejemplo:

```txt
public/project-assets/sistema-inventario-retail/
  cover.webp
  dashboard.webp
  architecture.webp
  flow.webp
```

Luego referencias esas imagenes desde el MDX asi:

```yaml
cover: "/project-assets/sistema-inventario-retail/cover.webp"
gallery:
  - "/project-assets/sistema-inventario-retail/dashboard.webp"
  - "/project-assets/sistema-inventario-retail/architecture.webp"
```

Importante: cuando el archivo esta en `public/`, la ruta publica no incluye la palabra `public`.

Correcto:

```yaml
cover: "/project-assets/sistema-inventario-retail/cover.webp"
```

Incorrecto:

```yaml
cover: "/public/project-assets/sistema-inventario-retail/cover.webp"
```

### Cuando usar `public/`

Usa `public/` cuando:

- quieres referenciar una imagen con una ruta string desde el frontmatter;
- necesitas una ruta directa como `/project-assets/archivo.webp`;
- la imagen ya viene optimizada;
- quieres mantener la administracion simple.

Este proyecto actualmente usa strings en `cover` y `gallery`, por lo que `public/project-assets/` es la ruta recomendada para imagenes de proyectos.

### Cuando usar `src/assets/`

`src/assets/` sirve para imagenes que seran importadas por componentes Astro usando `astro:assets`.

Ejemplo conceptual:

```astro
---
import { Image } from 'astro:assets';
import cover from '../assets/cover.webp';
---

<Image src={cover} alt="Descripcion" />
```

Pero en el sistema actual de proyectos, `cover` y `gallery` son strings del frontmatter. Eso significa que no puedes poner simplemente:

```yaml
cover: "../../assets/proyecto/cover.webp"
```

y esperar que funcione automaticamente.

Para usar `src/assets/` en proyectos habria que refactorizar los componentes para importar imagenes con `astro:assets`. Mientras eso no se haga, usa `public/project-assets/` para contenido administrable.

### Formatos recomendados

Para imagenes reales:

- `webp`: recomendado para screenshots y covers optimizados;
- `jpg`: valido para fotografias;
- `png`: valido si necesitas transparencia o capturas sin perdida, pero suele pesar mas;
- `svg`: bueno para ilustraciones tecnicas, diagramas y assets vectoriales.

Para este sitio:

- covers: idealmente `webp` o `svg`;
- galerias: `webp`, `jpg` o `svg`;
- logos: `png` o `svg`.

### Pesos recomendados

Guia practica:

- cover: idealmente menos de 300 KB;
- imagen de galeria: idealmente menos de 400 KB;
- screenshots grandes: intenta no superar 600 KB;
- evita subir imagenes de varios MB si no es necesario.

Si una imagen pesa demasiado:

- exportala en WebP;
- reduce dimensiones;
- comprime con herramientas como Squoosh, TinyPNG, ImageOptim o similares.

### Nombres recomendados

Usa nombres descriptivos, cortos y sin espacios:

```txt
cover.webp
dashboard.webp
architecture.webp
mobile-flow.webp
inventory-report.webp
```

Evita:

```txt
Captura de pantalla 2026-05-06.png
imagen final final.png
Dashboard NUEVO.PNG
```

## 7. Como agregar galerias

La galeria se controla con el campo `gallery`.

Ejemplo:

```yaml
gallery:
  - "/project-assets/sistema-inventario-retail/dashboard.webp"
  - "/project-assets/sistema-inventario-retail/stock-flow.webp"
  - "/project-assets/sistema-inventario-retail/reporting.webp"
```

Cada elemento debe ser una ruta valida.

La galeria se muestra en la pagina individual del proyecto, despues de las decisiones y bloques tecnicos.

Si no quieres galeria:

```yaml
gallery: []
```

O puedes omitir el campo:

```yaml
# sin gallery
```

Buenas practicas:

- usa 2 a 4 imagenes por proyecto;
- no repitas la misma imagen del cover si no aporta nada nuevo;
- muestra pantallas, flujos, arquitectura o resultados;
- mantiene una proporcion visual consistente entre imagenes.

## 8. Como agregar videos

Los videos ligeros pueden guardarse en:

```txt
public/videos/
```

Ejemplo:

```txt
public/videos/sistema-inventario-retail-demo.mp4
```

Y se referencian asi:

```yaml
video: "/videos/sistema-inventario-retail-demo.mp4"
```

El video aparece en la pagina individual del proyecto con controles nativos del navegador.

### Formatos recomendados

Recomendado:

- `.mp4` con codec H.264;
- audio desactivado si no aporta;
- duracion corta: 20 a 60 segundos;
- peso ideal: menos de 8 MB;
- peso maximo sugerido: 15 MB para demos simples.

### Cuando usar `public/videos/`

Usa `public/videos/` cuando:

- el video es corto;
- pesa poco;
- quieres mantener todo dentro del repositorio;
- no necesitas streaming avanzado.

### Cuando usar una solucion externa

Usa una solucion externa si:

- el video pesa mas de 15 MB;
- tienes varias demos pesadas;
- necesitas streaming adaptativo;
- quieres mejor rendimiento global;
- necesitas analitica de reproduccion.

Opciones:

- Mux;
- Cloudinary;
- Vimeo;
- YouTube no listado;
- un CDN propio.

En ese caso puedes guardar una URL remota en `video`, siempre que el componente de video pueda reproducirla correctamente. Para videos de YouTube o Vimeo embebidos, seria mejor crear un componente especifico antes de usar iframes en el contenido.

## 9. Flujo completo: agregar un proyecto desde cero

Ejemplo: agregar un proyecto llamado "Sistema de Inventario Retail".

### Paso 1: crear carpeta de assets

Crear:

```txt
public/project-assets/sistema-inventario-retail/
```

Agregar imagenes:

```txt
public/project-assets/sistema-inventario-retail/cover.webp
public/project-assets/sistema-inventario-retail/dashboard.webp
public/project-assets/sistema-inventario-retail/architecture.webp
```

### Paso 2: agregar video opcional

Si tienes demo:

```txt
public/videos/sistema-inventario-retail-demo.mp4
```

Si no tienes video, no agregues el campo `video`.

### Paso 3: crear archivo MDX

Crear:

```txt
src/content/projects/sistema-inventario-retail.mdx
```

### Paso 4: completar frontmatter

Usa el ejemplo completo de la seccion 3 y ajusta:

- `title`;
- `slug`;
- `type`;
- `industry`;
- `summary`;
- `problem`;
- `stack`;
- `architecture`;
- `challenges`;
- `decisions`;
- `results`;
- `cover`;
- `gallery`;
- `video`;
- `seoTitle`;
- `seoDescription`.

### Paso 5: redactar el contenido MDX

Agrega una narracion clara:

```mdx
## Contexto

Explica el negocio y problema.

## Solucion

Explica que construiste.

## Arquitectura

Explica decisiones tecnicas.

## Resultado

Explica impacto y evolucion.
```

### Paso 6: levantar entorno local

```bash
npm run dev
```

Abrir:

```txt
http://localhost:4321
```

### Paso 7: revisar que aparezca

Revisa:

```txt
http://localhost:4321/proyectos/
```

Y la URL individual:

```txt
http://localhost:4321/proyectos/sistema-inventario-retail/
```

Si `featured: true`, revisa tambien la homepage.

### Paso 8: validar build

Antes de publicar:

```bash
npm run build
```

Si hay errores, lee el mensaje. Astro suele indicar si el problema es un campo faltante, tipo incorrecto o ruta invalida.

### Paso 9: commit y push

```bash
git status
git add src/content/projects/sistema-inventario-retail.mdx public/project-assets/sistema-inventario-retail public/videos/sistema-inventario-retail-demo.mp4
git commit -m "Add inventory retail project"
git push
```

Si no agregaste video, no incluyas la ruta de `public/videos/`.

## 10. Editar proyectos existentes

Para editar un proyecto existente, abre su archivo MDX dentro de:

```txt
src/content/projects/
```

Ejemplo:

```txt
src/content/projects/pos-gestion-gastronomica.mdx
```

### Cambiar textos

Puedes editar:

- `summary`;
- `problem`;
- el cuerpo MDX;
- secciones `## Contexto`, `## Solucion`, etc.

Despues revisa la pagina individual para asegurar que el texto no quede demasiado largo en tarjetas o encabezados.

### Cambiar stack

Edita:

```yaml
stack:
  - TypeScript
  - React
  - Node.js
```

Recuerda que `stack` aparece en el detalle del proyecto. Mantenerlo breve mejora legibilidad.

### Cambiar resultados

Edita:

```yaml
results:
  - "Resultado actualizado."
  - "Nuevo beneficio operativo."
```

Usa resultados concretos. Si tienes metricas reales, incluyelas.

Ejemplo:

```yaml
results:
  - "Reduccion de tiempo de registro de ventas."
  - "Mayor trazabilidad de stock por movimiento."
```

### Cambiar cover

1. Agrega la nueva imagen en la carpeta del proyecto.
2. Actualiza `cover`.

Ejemplo:

```yaml
cover: "/project-assets/sistema-pos/cover-v2.webp"
```

No borres la imagen antigua hasta confirmar que no se usa en otro proyecto.

### Cambiar galeria

Agrega o elimina rutas:

```yaml
gallery:
  - "/project-assets/sistema-pos/dashboard.webp"
  - "/project-assets/sistema-pos/reportes.webp"
```

Si una imagen no carga, revisa:

- que el archivo exista;
- que la ruta empiece con `/`;
- que no hayas escrito `public` en la ruta;
- que mayusculas/minusculas coincidan.

### Cambiar video

Para agregar video:

```yaml
video: "/videos/sistema-pos-demo.mp4"
```

Para quitar video, elimina la linea `video` completa.

No dejes:

```yaml
video:
```

porque puede generar datos ambiguos.

## 11. Errores comunes y como evitarlos

### Slug repetido

Problema:

```yaml
slug: "sistema-pos"
```

usado en dos proyectos.

Consecuencia: conflicto de rutas.

Solucion: cada proyecto debe tener un slug unico.

### Ruta de imagen con `public`

Incorrecto:

```yaml
cover: "/public/project-assets/cover.webp"
```

Correcto:

```yaml
cover: "/project-assets/cover.webp"
```

### Imagen no carga

Revisa:

- el archivo existe;
- la ruta empieza con `/`;
- la carpeta esta dentro de `public/`;
- el nombre coincide exactamente;
- la extension es correcta (`.webp`, `.png`, `.jpg`, `.svg`).

### Video no aparece

Revisa:

- que el campo `video` exista;
- que apunte a `/videos/archivo.mp4`;
- que el archivo este en `public/videos/`;
- que el navegador soporte el formato.

### Frontmatter mal cerrado

Correcto:

```mdx
---
title: "Proyecto"
---

Contenido
```

Incorrecto:

```mdx
---
title: "Proyecto"

Contenido
```

Siempre debe haber `---` al inicio y al final del frontmatter.

### Arrays mal escritos

Correcto:

```yaml
stack:
  - Astro
  - TypeScript
```

Tambien correcto:

```yaml
stack: ["Astro", "TypeScript"]
```

Incorrecto:

```yaml
stack:
Astro
TypeScript
```

### Boolean como texto

Correcto:

```yaml
featured: true
```

Incorrecto:

```yaml
featured: "true"
```

### Year como texto

Correcto:

```yaml
year: 2026
```

Incorrecto:

```yaml
year: "2026"
```

### Campo obligatorio faltante

Si falta un campo obligatorio, `npm run build` puede fallar.

Ejemplo:

```txt
Expected type string, received undefined
```

Solucion: revisa el schema en `src/content.config.ts` y completa el campo faltante.

### Indentacion incorrecta en `decisions`

Correcto:

```yaml
decisions:
  - title: "Decision"
    reason: "Motivo"
```

Incorrecto:

```yaml
decisions:
- title: "Decision"
reason: "Motivo"
```

YAML depende de la indentacion. Usa dos espacios.

## 12. Buenas practicas de contenido

### Escribe para clientes, no solo para desarrolladores

Un buen proyecto debe responder:

- que problema existia;
- por que importaba;
- que solucion se construyo;
- que decisiones tecnicas fueron importantes;
- que beneficio produjo o podria producir.

### Mantener consistencia en categorias

Evita crear demasiadas variaciones para lo mismo.

Mejor:

```yaml
type:
  - Inventario
```

Evitar tener al mismo tiempo:

```yaml
type:
  - inventario
  - Inventory
  - Gestion de inventario
```

### Mantener summaries breves

El `summary` aparece en tarjetas. Si es demasiado largo, afecta el ritmo visual.

Buena longitud:

```txt
18 a 28 palabras aproximadamente.
```

### Usar resultados claros

Mejor:

```yaml
results:
  - "Mayor trazabilidad de stock por movimiento."
```

Menos claro:

```yaml
results:
  - "Se hizo un sistema bueno."
```

### Organizar assets por proyecto

Recomendado:

```txt
public/project-assets/sistema-pos/
public/project-assets/fundacion-reiki/
public/project-assets/android-apps/
```

Evita tirar todas las imagenes sueltas en `public/project-assets/` cuando el sitio crezca.

### No borrar assets sin buscar referencias

Antes de borrar una imagen, busca si se usa:

```bash
rg "nombre-de-la-imagen" src public
```

Si `rg` no esta disponible, usa la busqueda de tu editor.

### Validar antes de publicar

Antes de hacer push:

```bash
npm run build
```

Esto detecta errores de schema, rutas de contenido y problemas de compilacion.

## 13. Checklist antes de publicar un proyecto

Antes de hacer commit, confirma:

- el archivo `.mdx` esta en `src/content/projects/`;
- el slug es unico;
- `featured` esta en `true` o `false`;
- `year` es numero;
- `type`, `stack`, `architecture`, `challenges`, `results` son arrays;
- `decisions` tiene `title` y `reason`;
- `cover` carga correctamente;
- las imagenes de `gallery` cargan correctamente;
- el video carga si existe;
- `seoTitle` y `seoDescription` estan completos;
- `npm run build` termina sin errores;
- revisaste `/proyectos/`;
- revisaste la pagina individual del proyecto;
- si `featured: true`, revisaste la homepage.

## 14. Comandos utiles

Instalar dependencias:

```bash
npm install
```

Desarrollo local:

```bash
npm run dev
```

Build de produccion:

```bash
npm run build
```

Ver estado Git:

```bash
git status
```

Agregar cambios:

```bash
git add .
```

Crear commit:

```bash
git commit -m "Add new project"
```

Subir cambios:

```bash
git push
```

## 15. Regla practica final

Para agregar o editar contenido, normalmente solo deberias tocar:

```txt
src/content/projects/
public/project-assets/
public/videos/
```

No deberias necesitar editar:

```txt
src/components/
src/layouts/
src/pages/
```

salvo que quieras cambiar el diseno, estructura visual o comportamiento del sitio.

