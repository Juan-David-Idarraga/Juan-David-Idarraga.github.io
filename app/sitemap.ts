import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Creo el mapa del sitio al compilar porque el portafolio no necesita datos por solicitud.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
