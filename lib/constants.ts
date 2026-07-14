import { contactInfo } from "@/data/portfolio";

// Reúno aquí las rutas y enlaces calculados para no repetirlos en los componentes.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const WHATSAPP_URL = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(
  contactInfo.whatsappMessage,
)}`;

export const CV_PATH = "/documents/cv-juan-david-idarraga.pdf";
