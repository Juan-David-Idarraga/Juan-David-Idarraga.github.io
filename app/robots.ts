import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Genero este archivo durante la compilación para que también funcione en hosting estático.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
