import { PortfolioSite } from "@/components/portfolio-site";
import { personalInfo } from "@/data/portfolio";
import { SITE_URL } from "@/lib/constants";

export default function Home() {
  // Publico estos datos estructurados para que los buscadores entiendan quién soy
  // y qué tipo de trabajo muestro en el portafolio.
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: ["Ingeniero de Software", "Desarrollador Full-Stack y Móvil", "Analista de Datos"],
      email: "mailto:tecnologyofjota@gmail.com",
      address: { "@type": "PostalAddress", addressLocality: "Santiago", addressCountry: "CL" },
      knowsAbout: ["Sistemas POS", "Desarrollo web", "Aplicaciones móviles", "Bases de datos", "Análisis de datos"],
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Portafolio de Juan David Idarraga Bolaños",
      url: SITE_URL,
      inLanguage: "es-CL",
    },
  ];
  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />
      <PortfolioSite />
    </>
  );
}
