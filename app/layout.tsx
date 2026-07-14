import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Juan David Idarraga Bolaños | Ingeniero de Software y Desarrollador Full-Stack";
const description = "Portafolio profesional de Juan David Idarraga, desarrollador de software especializado en sistemas POS, plataformas web, aplicaciones móviles, bases de datos, operaciones empresariales y análisis de datos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_CL",
    siteName: "Juan David Idarraga Bolaños",
    images: [
      {
        url: "/og.png",
        width: 1746,
        height: 910,
        alt: "Juan David Idarraga Bolaños — Tecnología aplicada a problemas reales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
