import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

// Compruebo la versión compilada para detectar errores que no aparecen al revisar archivos aislados.
async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("publica el portafolio real con sus secciones principales", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Juan David/);
  assert.match(html, /Idarraga/);
  assert.match(html, /Bolaños/);
  assert.match(html, /id="inicio"/);
  assert.match(html, /id="proyectos"/);
  assert.match(html, /id="tecnologias"/);
  assert.match(html, /id="servicios"/);
  assert.match(html, /id="contacto"/);
  assert.match(html, /instagram\.com\/emocionalj/);
  assert.match(html, /src="\/projects\/bus-del-sabor\/menu-inicial\.png"/);
  assert.match(html, /src="\/projects\/fundacion-reiki\/inicio-centro-reiki\.webp"/);
  assert.match(html, /src="\/projects\/family-waffles-pos\/ventas-catalogo\.webp"/);
  assert.doesNotMatch(html, /_vinext\/image[^"']*bus-del-sabor/);
  assert.doesNotMatch(html, /Codex is working|Your site is taking shape|codex-preview/i);
});

test("mantiene protegidas las salidas externas y los datos estructurados", async () => {
  const [component, page, gitignore, portfolio, captures] = await Promise.all([
    readFile(new URL("../components/portfolio-site.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../data/portfolio.ts", import.meta.url), "utf8"),
    readFile(new URL("../data/project-captures.ts", import.meta.url), "utf8"),
  ]);

  const externalLinks = component.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? [];
  assert.ok(externalLinks.length > 0);
  externalLinks.forEach((link) => assert.match(link, /rel="noreferrer"/));
  assert.match(page, /JSON\.stringify\(structuredData\)\.replace\(\/<\/g/);
  assert.match(gitignore, /^\.env\*$/m);
  assert.doesNotMatch(component, /\beval\s*\(|new Function\s*\(/);
  assert.match(portfolio, /Bus del Sabor · Sistema POS/);
  assert.match(portfolio, /Family Waffles · Sistema POS/);
  assert.match(captures, /\/projects\/bus-del-sabor\/menu-inicial\.png/);
  assert.match(captures, /\/projects\/fundacion-reiki\/inicio-sesion\.webp/);
  assert.match(captures, /\/projects\/family-waffles-pos\/inicio-sesion\.webp/);
  assert.doesNotMatch(captures, /imagen-\d|captura-\d|screenshot/i);
  assert.equal((component.match(/<Image\s+unoptimized/g) ?? []).length, 4);
});

test("mantiene disponibles todas las capturas declaradas", async () => {
  const captures = await readFile(
    new URL("../data/project-captures.ts", import.meta.url),
    "utf8",
  );
  const sources = [...captures.matchAll(/src: "([^"]+)"/g)].map((match) => match[1]);

  assert.equal(sources.length, 54);
  await Promise.all(
    sources.map((source) => access(new URL(`../public${source}`, import.meta.url))),
  );
});
