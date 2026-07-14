import type { NextConfig } from "next";

// Mantengo el despliegue principal sin cambios y solo genero archivos estáticos
// cuando yo activo explícitamente el destino de GitHub Pages.
const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
