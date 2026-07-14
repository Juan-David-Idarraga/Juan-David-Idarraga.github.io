export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type SocialLink = {
  label: string;
  href?: string;
};

export type PersonalInfo = {
  name: string;
  eyebrow: string;
  professions: string[];
  summary: string;
  about: string[];
  differentiator: string;
  logoPath: string;
};

export type ProjectCapture = {
  src: string;
  alt: string;
  title: string;
  description: string;
  module: string;
  order: number;
  format: "desktop" | "mobile";
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: "En desarrollo" | "Activo" | "Concepto";
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  focus: string;
  features: string[];
  stack: string[];
  captures: ProjectCapture[];
  coverSrc: string;
  demoUrl?: string;
  codeUrl?: string;
  date?: string;
  featured: boolean;
  private: boolean;
  visual: "pos" | "web" | "mobile";
};

export type Technology = {
  name: string;
  category: "Frontend y Web" | "Mobile" | "Backend y bases de datos" | "Infraestructura" | "Datos e inteligencia";
  level: "Uso principal" | "Experiencia práctica" | "En aprendizaje" | "Exploración actual";
  detail: string;
};

export type Language = {
  name: string;
  shortCode: string;
  proficiency: 1 | 2 | 3 | 4 | 5;
  label: string;
};

export type Service = {
  name: string;
  description: string;
  application: string;
  icon: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  location: string;
  instagramUrl: string;
  whatsappNumber: string;
  whatsappMessage: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date?: string;
  url?: string;
};
