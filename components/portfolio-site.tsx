"use client";

import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bot,
  Box,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileText,
  Gauge,
  Globe2,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Network,
  PanelTop,
  Pause,
  Phone,
  Play,
  RefreshCw,
  Rocket,
  Send,
  Smartphone,
  Sparkles,
  Store,
  Star,
  Terminal,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  aiCapabilities,
  certifications,
  contactInfo,
  languages,
  navigation,
  personalInfo,
  principles,
  processSteps,
  projects,
  services,
  technologies,
} from "@/data/portfolio";
import { CV_PATH, WHATSAPP_URL } from "@/lib/constants";
import type { Project } from "@/types/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { SectionHeading } from "@/components/ui/section-heading";

const sectionIds = navigation.map((item) => item.href.slice(1));

const serviceIcons: Record<string, LucideIcon> = {
  receipt: Store,
  browser: PanelTop,
  mobile: Smartphone,
  panel: LayoutDashboard,
  database: Database,
  workflow: Workflow,
  chart: BarChart3,
  rocket: Rocket,
  refresh: RefreshCw,
  spark: Sparkles,
};

const contactTypes = [
  "Sistema POS",
  "Plataforma web",
  "Aplicación móvil",
  "Dashboard o datos",
  "Automatización",
  "Otro proyecto",
];

const technologySlides = Array.from(
  new Set(technologies.map((technology) => technology.category)),
).flatMap((category) => {
  const categoryTechnologies = technologies.filter(
    (technology) => technology.category === category,
  );
  return Array.from(
    { length: Math.ceil(categoryTechnologies.length / 3) },
    (_, index) => ({
      key: `${category}-${index}`,
      category,
      items: categoryTechnologies.slice(index * 3, index * 3 + 3),
    }),
  );
});

// Reutilizo esta entrada animada para que todas las secciones mantengan el mismo lenguaje visual.
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`reveal-shell ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 56, rotateX: -11, scale: 0.94, clipPath: "inset(16% 7% 16% 7% round 28px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 105, damping: 18, mass: 0.85 }}
    >
      {children}
    </motion.div>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark${compact ? " brand-mark--compact" : ""}`} aria-label="Juan David Idarraga">
      <span className="brand-mark__fallback" aria-hidden="true">JD</span>
      <span
        className="brand-mark__asset"
        style={{ backgroundImage: `url(${personalInfo.logoPath})` }}
        aria-hidden="true"
      />
      <span className="brand-mark__orbit" aria-hidden="true" />
    </span>
  );
}

function ModalShell({
  children,
  onClose,
  labelId,
  wide = false,
}: {
  children: ReactNode;
  onClose: () => void;
  labelId: string;
  wide?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Encierro el foco dentro del modal y lo devuelvo al elemento anterior al cerrarlo.
    previousFocus.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = panelRef.current?.querySelector<HTMLElement>(
      "button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    focusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          "button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((item) => !item.hasAttribute("disabled"));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        className={`modal-panel${wide ? " modal-panel--wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25 }}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar ventana">
          <X size={20} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const coverCapture = project.captures.reduce(
    (current, capture) => (!current || capture.order < current.order ? capture : current),
    project.captures[0],
  );
  const imageSource = coverCapture?.src;
  const [imageLoaded, setImageLoaded] = useState(false);

  // Mantengo el mockup como respaldo y muestro mi captura real únicamente cuando terminó de cargar.
  if (project.visual === "mobile") {
    return (
      <div className={`project-visual project-visual--mobile${compact ? " project-visual--compact" : ""}`} aria-label="Mockup conceptual de una aplicación móvil de datos">
        <div className="phone-frame phone-frame--back">
          <span className="phone-notch" />
          <div className="mobile-chart"><i /><i /><i /><i /><i /></div>
          <div className="mobile-lines"><span /><span /><span /></div>
        </div>
        <div className="phone-frame phone-frame--front">
          <span className="phone-notch" />
          <div className="mobile-header"><CircleDot size={13} /> operaciones</div>
          <strong>Resumen diario</strong>
          <div className="mobile-metric"><span>Registros</span><b>128</b></div>
          <div className="mobile-grid"><i /><i /><i /><i /></div>
        </div>
        {imageSource ? <Image unoptimized className={`project-capture${imageLoaded ? " loaded" : ""}`} src={imageSource} alt={coverCapture.alt} width={720} height={1440} onLoad={() => setImageLoaded(true)} /> : null}
      </div>
    );
  }

  return (
    <div className={`project-visual${compact ? " project-visual--compact" : ""}`} aria-label={`Mockup conceptual de ${project.title}`}>
      <div className="browser-frame">
        <div className="browser-bar"><i /><i /><i /><span>{project.visual === "pos" ? "operaciones.local" : "fundacion-reiki.local"}</span></div>
        {project.visual === "pos" ? (
          <div className="pos-ui">
            <aside><Box size={17} /><span /><span /><span /><span /></aside>
            <main>
              <div className="mockup-title"><span>Control de operación</span><b>Turno activo</b></div>
              <div className="metric-row"><i /><i /><i /></div>
              <div className="order-grid"><span /><span /><span /><span /></div>
            </main>
          </div>
        ) : (
          <div className="web-ui">
            <div className="web-nav"><span>Fundación</span><i /><i /><i /></div>
            <div className="web-hero-mini"><span>Bienestar que conecta</span><b>Una comunidad presente</b><i /></div>
            <div className="web-cards"><span /><span /><span /></div>
          </div>
        )}
      </div>
      {imageSource ? <Image unoptimized className={`project-capture${imageLoaded ? " loaded" : ""}`} src={imageSource} alt={coverCapture.alt} width={1600} height={900} onLoad={() => setImageLoaded(true)} /> : null}
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className="project-card"
      initial={reduceMotion ? false : { opacity: 0, y: 90, rotateY: project.visual === "mobile" ? -18 : 18, scale: 0.9, clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateY: 0, scale: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reduceMotion ? undefined : { y: -9, rotateX: 1.5, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 100, damping: 17, mass: 0.9 }}
    >
      <div className="project-card__visual">
        <ProjectVisual project={project} compact />
        <span className={`status-pill status-pill--${project.status === "Activo" ? "active" : "progress"}`}>
          <span aria-hidden="true" />{project.status}
        </span>
      </div>
      <div className="project-card__body">
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>
        {project.stack.length ? (
          <div className="stack-list" aria-label="Tecnologías verificadas">
            {project.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
        ) : null}
        <div className="project-card__actions">
          <button className="text-button" type="button" onClick={() => onOpen(project)}>
            Ver caso de estudio <ArrowRight size={16} />
          </button>
          <span className="project-availability">
            {project.private ? <><LockKeyhole size={14} /> Código privado</> : null}
            {!project.demoUrl ? <><Gauge size={14} /> En desarrollo</> : null}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  const captures = [...project.captures].sort((first, second) => first.order - second.order);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (captures.length <= 1) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % captures.length);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + captures.length) % captures.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [captures.length]);

  useEffect(() => {
    thumbnailRefs.current[activeIndex]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, reduceMotion]);

  if (captures.length <= 1) return null;

  const activeCapture = captures[activeIndex];
  const goToCapture = (index: number) => {
    setActiveIndex((index + captures.length) % captures.length);
  };

  return (
    <section className="project-gallery" aria-label={`Galería de ${project.title}`}>
      <div className="project-gallery__header">
        <div><span>Recorrido del producto</span><h3>Pantallas reales del sistema</h3></div>
        <strong>{String(activeIndex + 1).padStart(2, "0")} / {String(captures.length).padStart(2, "0")}</strong>
      </div>
      <div
        className={`project-gallery__stage project-gallery__stage--${activeCapture.format}`}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const difference = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(difference) < 48) return;
          goToCapture(activeIndex + (difference < 0 ? 1 : -1));
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div key={activeCapture.src} initial={{ opacity: 0, x: 28, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -28, scale: 0.98 }} transition={{ duration: 0.3 }}>
            <Image
              unoptimized
              src={activeCapture.src}
              alt={activeCapture.alt}
              width={1600}
              height={900}
              loading={activeIndex === 0 ? "eager" : "lazy"}
              sizes="(max-width: 760px) calc(100vw - 52px), 960px"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="project-gallery__details">
        <motion.div
          key={activeCapture.src}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          aria-live="polite"
        >
          <span>Pantalla actual · {activeCapture.module}</span>
          <h4>{activeCapture.title}</h4>
          <p>{activeCapture.description}</p>
        </motion.div>
        <div className="project-gallery__navigation" aria-label="Navegar entre capturas">
          <button type="button" onClick={() => goToCapture(activeIndex - 1)} aria-label="Ver captura anterior">
            <ChevronLeft size={19} />
          </button>
          <button type="button" onClick={() => goToCapture(activeIndex + 1)} aria-label="Ver captura siguiente">
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
      <div className="project-gallery__thumbs" aria-label="Seleccionar captura">
        {captures.map((capture, index) => (
          <button
            ref={(element) => { thumbnailRefs.current[index] = element; }}
            type="button"
            key={capture.src}
            className={index === activeIndex ? "active" : ""}
            onClick={() => goToCapture(index)}
            aria-label={`Ver ${capture.title}`}
            aria-pressed={index === activeIndex}
            aria-current={index === activeIndex ? "true" : undefined}
          >
            <Image unoptimized src={capture.src} alt="" width={180} height={100} loading="lazy" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} labelId="project-modal-title" wide>
      <div className="project-modal">
        <div className="project-modal__visual"><ProjectVisual project={project} /></div>
        <div className="project-modal__content">
          <span className="section-kicker"><span /> Caso de estudio</span>
          <h2 id="project-modal-title">{project.title}</h2>
          <p className="project-modal__lead">{project.fullDescription}</p>
          <div className="case-grid">
            <div><span>El problema</span><p>{project.problem}</p></div>
            <div><span>La solución</span><p>{project.solution}</p></div>
          </div>
          <blockquote>{project.focus}</blockquote>
          <div className="feature-list">
            {project.features.map((feature) => <span key={feature}><Check size={15} />{feature}</span>)}
          </div>
          <div className="modal-actions">
            {project.demoUrl ? <a className="button button--gold" href={project.demoUrl} target="_blank" rel="noreferrer">Abrir demo <ExternalLink size={16} /></a> : <span className="button button--disabled"><Gauge size={16} /> En desarrollo</span>}
            {project.codeUrl ? <a className="button button--ghost" href={project.codeUrl} target="_blank" rel="noreferrer">Ver código <Code2 size={16} /></a> : <span className="button button--disabled"><LockKeyhole size={16} /> Código privado</span>}
          </div>
        </div>
        <ProjectGallery project={project} />
      </div>
    </ModalShell>
  );
}

function CvModal({ onClose }: { onClose: () => void }) {
  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    let active = true;
    fetch(CV_PATH, { method: "HEAD" })
      .then((response) => { if (active) setAvailable(response.ok); })
      .catch(() => { if (active) setAvailable(false); });
    return () => { active = false; };
  }, []);

  return (
    <ModalShell onClose={onClose} labelId="cv-modal-title" wide>
      <div className="cv-modal">
        <div className="cv-modal__header">
          <BrandMark compact />
          <div>
            <span>Currículum profesional</span>
            <h2 id="cv-modal-title">Juan David Idarraga</h2>
          </div>
        </div>
        {available === null ? (
          <div className="cv-empty"><span className="loading-dot" /> Verificando documento…</div>
        ) : available ? (
          <iframe className="cv-preview" src={CV_PATH} title="Currículum de Juan David Idarraga" />
        ) : (
          <div className="cv-empty">
            <FileText size={34} />
            <h3>El documento todavía no está disponible</h3>
            <p>Agrega el PDF en <code>public/documents/cv-juan-david-idarraga.pdf</code>. Mientras tanto, puedes solicitarlo directamente por correo.</p>
            <a className="button button--gold" href={`mailto:${contactInfo.email}?subject=Solicitud%20de%20CV`}>Solicitar por correo <Mail size={16} /></a>
          </div>
        )}
        {available ? <div className="modal-actions"><a className="button button--gold" href={CV_PATH} download>Descargar CV <Download size={16} /></a></div> : null}
      </div>
    </ModalShell>
  );
}

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Valido en el navegador y preparo un correo; no almaceno datos del visitante.
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const nextErrors: Record<string, string> = {};
    const name = String(values.name || "").trim();
    const email = String(values.email || "").trim();
    const projectType = String(values.projectType || "").trim();
    const message = String(values.message || "").trim();
    if (name.length < 2) nextErrors.name = "Escribe tu nombre.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Ingresa un correo válido.";
    if (!projectType) nextErrors.projectType = "Selecciona un tipo de proyecto.";
    if (message.length < 15) nextErrors.message = "Cuéntame un poco más (mínimo 15 caracteres).";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const company = String(values.company || "").trim();
    const budget = String(values.budget || "").trim();
    const subject = encodeURIComponent(`Consulta de proyecto: ${projectType}`);
    const body = encodeURIComponent([
      `Hola Juan David, soy ${name}.`,
      company ? `Empresa: ${company}` : "",
      `Correo: ${email}`,
      `Tipo de proyecto: ${projectType}`,
      budget ? `Presupuesto aproximado: ${budget}` : "",
      "",
      message,
    ].filter(Boolean).join("\n"));
    window.setTimeout(() => {
      setStatus("success");
      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    }, 450);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label>Nombre *<input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name ? <small>{errors.name}</small> : null}</label>
        <label>Correo *<input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email ? <small>{errors.email}</small> : null}</label>
      </div>
      <div className="form-row">
        <label>Empresa <input name="company" autoComplete="organization" /></label>
        <label>Tipo de proyecto *<select name="projectType" defaultValue="" aria-invalid={Boolean(errors.projectType)}><option value="" disabled>Selecciona una opción</option>{contactTypes.map((type) => <option key={type}>{type}</option>)}</select>{errors.projectType ? <small>{errors.projectType}</small> : null}</label>
      </div>
      <label>Presupuesto aproximado <select name="budget" defaultValue=""><option value="">Prefiero conversarlo</option><option>Menos de $1.000 USD</option><option>$1.000 – $3.000 USD</option><option>$3.000 – $7.000 USD</option><option>Más de $7.000 USD</option></select></label>
      <label>Mensaje *<textarea name="message" rows={5} aria-invalid={Boolean(errors.message)} placeholder="Describe el problema que necesitas resolver…" />{errors.message ? <small>{errors.message}</small> : null}</label>
      <div className="form-submit">
        <button className="button button--gold" type="submit" disabled={status === "loading"}>{status === "loading" ? "Preparando…" : "Preparar correo"}<Send size={16} /></button>
        <p aria-live="polite">{status === "success" ? "Correo preparado en tu aplicación. Revísalo antes de enviarlo." : status === "error" ? "Revisa los campos marcados." : "El formulario prepara un correo; no almacena ni envía datos automáticamente."}</p>
      </div>
    </form>
  );
}

function useDocumentVisibility() {
  const [visible, setVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible",
  );

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return visible;
}

function useSectionVisibility(id: string) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById(id);
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "20% 0px 20%", threshold: 0.01 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [id]);

  return visible;
}

export function PortfolioSite() {
  // Mantengo aquí el estado de las experiencias que se coordinan entre secciones.
  const reduceMotion = useReducedMotion();
  const pageVisible = useDocumentVisibility();
  const heroInView = useSectionVisibility("inicio");
  const technologiesInView = useSectionVisibility("tecnologias");
  const servicesInView = useSectionVisibility("servicios");
  const methodInView = useSectionVisibility("metodologia");
  const activeSection = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [professionIndex, setProfessionIndex] = useState(0);
  const [techSlideIndex, setTechSlideIndex] = useState(0);
  const [techDirection, setTechDirection] = useState(1);
  const [techPaused, setTechPaused] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [serviceDirection, setServiceDirection] = useState(1);
  const [serviceUnlockedCount, setServiceUnlockedCount] = useState(1);
  const [serviceSequenceStarted, setServiceSequenceStarted] = useState(false);
  const [servicePaused, setServicePaused] = useState(false);
  const [processStepIndex, setProcessStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const heroParallax = useTransform(scrollY, [0, 800], [0, 120]);

  const activeTechnologySlide = technologySlides[techSlideIndex];
  const activeService = services[serviceIndex];
  const ActiveServiceIcon = serviceIcons[activeService.icon] || Layers3;

  useEffect(() => {
    // Detengo los temporizadores cuando la pestaña o su sección no están visibles.
    if (!pageVisible || !heroInView) return;
    const interval = window.setInterval(() => setProfessionIndex((value) => (value + 1) % personalInfo.professions.length), 3200);
    return () => window.clearInterval(interval);
  }, [heroInView, pageVisible]);

  useEffect(() => {
    if (reduceMotion || techPaused || !pageVisible || !technologiesInView) return;
    const interval = window.setInterval(() => {
      setTechDirection(1);
      setTechSlideIndex((value) => (value + 1) % technologySlides.length);
    }, 9000);
    return () => window.clearInterval(interval);
  }, [pageVisible, reduceMotion, techPaused, technologiesInView]);

  useEffect(() => {
    if (!serviceSequenceStarted || !servicesInView || !pageVisible || serviceUnlockedCount >= services.length) return;
    const timeout = window.setTimeout(() => {
      if (reduceMotion) {
        setServiceUnlockedCount(services.length);
        return;
      }
      setServiceDirection(1);
      setServiceUnlockedCount((value) => {
        const next = Math.min(value + 1, services.length);
        setServiceIndex(next - 1);
        return next;
      });
    }, reduceMotion ? 0 : 9000);
    return () => window.clearTimeout(timeout);
  }, [pageVisible, reduceMotion, serviceSequenceStarted, serviceUnlockedCount, servicesInView]);

  useEffect(() => {
    if (reduceMotion || servicePaused || !pageVisible || !servicesInView || serviceUnlockedCount < services.length) return;
    const interval = window.setInterval(() => {
      setServiceDirection(1);
      setServiceIndex((value) => (value + 1) % services.length);
    }, 10000);
    return () => window.clearInterval(interval);
  }, [pageVisible, reduceMotion, servicePaused, serviceUnlockedCount, servicesInView]);

  useEffect(() => {
    if (reduceMotion || !pageVisible || !methodInView) return;
    const interval = window.setInterval(() => {
      setProcessStepIndex((value) => (value + 1) % processSteps.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [methodInView, pageVisible, reduceMotion]);

  useEffect(() => {
    const update = () => {
      setShowTop(window.scrollY > 700);
      setScrolled(window.scrollY > 24);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!assistantOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setAssistantOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [assistantOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Si el navegador bloquea el portapapeles, abro el correo como alternativa segura.
      window.location.href = `mailto:${contactInfo.email}`;
    }
  };

  const changeTechnologySlide = (direction: number) => {
    setTechDirection(direction);
    setTechSlideIndex((value) =>
      (value + direction + technologySlides.length) % technologySlides.length,
    );
  };

  const changeService = (nextIndex: number) => {
    if (nextIndex >= serviceUnlockedCount) return;
    setServiceDirection(nextIndex >= serviceIndex ? 1 : -1);
    setServiceIndex(nextIndex);
  };

  const stepService = (direction: number) => {
    const available = Math.max(serviceUnlockedCount, 1);
    setServiceDirection(direction);
    setServiceIndex((value) => (value + direction + available) % available);
  };

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
        <a className="brand-link" href="#inicio" aria-label="Ir al inicio"><BrandMark compact /><span><b>Juan David</b><small>Software & datos</small></span></a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? "active" : ""}>{item.label}</a>)}
        </nav>
        <a className="button button--header" href="#contacto">Contáctame <ArrowRight size={15} /></a>
        <button className="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu /></button>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="mobile-menu__panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 260, damping: 28 }}>
              <div className="mobile-menu__top"><BrandMark compact /><button type="button" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X /></button></div>
              <nav aria-label="Navegación móvil">{navigation.map((item, index) => <motion.a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}><span>0{index + 1}</span>{item.label}<ChevronRight /></motion.a>)}</nav>
              <a className="button button--gold" href="#contacto" onClick={() => setMenuOpen(false)}>Hablemos <ArrowRight size={16} /></a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main>
        <section className="hero" id="inicio">
          <div className="circuit-field" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          <motion.div className="hero-glow" style={reduceMotion ? undefined : { y: heroParallax }} aria-hidden="true" />
          <div className="hero__content">
            <div className="hero__copy">
              <motion.span className="hero-eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>{personalInfo.eyebrow}<span /></motion.span>
              <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.2 }}>
                <span className="hero-name">Juan David</span>
                <span className="metallic-text">Idarraga</span>
                <span className="metallic-text hero-surname-last">Bolaños</span>
              </motion.h1>
              <div className="profession-line" aria-live="polite"><span>Especialidad</span><AnimatePresence mode="wait"><motion.strong key={professionIndex} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>{personalInfo.professions[professionIndex]}</motion.strong></AnimatePresence></div>
              <motion.p className="hero-summary" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.42 }}>{personalInfo.summary}</motion.p>
              <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}>
                <a className="button button--gold" href="#proyectos">Ver proyectos <ArrowDown size={16} /></a>
                <a className="button button--ghost" href="#contacto">Contáctame</a>
                <button className="button button--text" type="button" onClick={() => setCvOpen(true)}>Ver CV <FileText size={16} /></button>
              </motion.div>
              <motion.div className="hero-proof" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
                <span><Terminal size={16} /> Tecnología</span><i /><span><BriefcaseBusiness size={16} /> Operación</span><i /><span><BarChart3 size={16} /> Datos</span>
              </motion.div>
            </div>
            <motion.div className="hero__visual" initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.25 }}>
              <div className="orbital-system">
                <span className="orbit orbit--one" /><span className="orbit orbit--two" /><span className="orbit orbit--three" />
                <div className="hero-brand"><BrandMark /></div>
                <div className="orbit-tag orbit-tag--top"><Network size={15} /><span>Arquitectura<b>Escalable</b></span></div>
                <div className="orbit-tag orbit-tag--right"><Database size={15} /><span>Datos<b>Conectados</b></span></div>
                <div className="orbit-tag orbit-tag--bottom"><ClipboardCheck size={15} /><span>Operación<b>Controlada</b></span></div>
                <i className="node node--one" /><i className="node node--two" /><i className="node node--three" /><i className="node node--four" />
              </div>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#sobre-mi"><span>Explorar</span><i><ArrowDown size={15} /></i></a>
        </section>

        <section className="section section--about" id="sobre-mi">
          <div className="section-shell">
            <Reveal><SectionHeading eyebrow="01 · Perfil" title="Ingeniería que entiende la operación" description="No se trata solo de escribir código: se trata de comprender qué debe mejorar y construir la herramienta adecuada." /></Reveal>
            <div className="about-layout">
              <Reveal className="about-card profile-card">
                <div className="profile-card__top"><BrandMark /><div><span>Perfil profesional</span><strong>Software · Mobile · Datos</strong></div></div>
                <div className="profile-card__stats"><span><b>POS</b>Operaciones</span><span><b>WEB</b>Plataformas</span><span><b>DATA</b>Decisiones</span></div>
                <div className="profile-signal"><i /><span>Disponible para nuevos desafíos</span></div>
              </Reveal>
              <Reveal className="about-copy">
                {personalInfo.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <blockquote><Sparkles size={20} />{personalInfo.differentiator}</blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section section--projects" id="proyectos">
          <div className="section-shell">
            <Reveal><SectionHeading eyebrow="02 · Trabajo seleccionado" title="Proyectos destacados" description="Soluciones pensadas desde el problema operativo hasta la experiencia final." /></Reveal>
            <div className="projects-grid">{projects.filter((project) => project.featured).map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}</div>
            <Reveal className="project-note"><CircleDot size={17} /><p>Cada caso de estudio incluye capturas reales, ordenadas según el recorrido operativo de su sistema.</p></Reveal>
          </div>
        </section>

        <section className="section section--technologies" id="tecnologias">
          <div className="section-shell">
            <Reveal><SectionHeading eyebrow="03 · Capacidades" title="Stack tecnológico" description="Un ecosistema que se mueve conmigo: cada grupo reúne herramientas que utilizo para resolver una parte distinta del producto." /></Reveal>
            <Reveal className="technology-showcase">
              <div className="technology-showcase__ambient" aria-hidden="true"><i /><i /><i /></div>
              <div className="technology-showcase__header">
                <div className="technology-category" aria-live="polite">
                  <span><Layers3 size={17} /></span>
                  <div><small>Categoría activa</small><strong>{activeTechnologySlide.category}</strong></div>
                </div>
                <div className="technology-controls">
                  <button type="button" onClick={() => changeTechnologySlide(-1)} aria-label="Ver tecnologías anteriores"><ChevronLeft size={18} /></button>
                  <span>{String(techSlideIndex + 1).padStart(2, "0")} / {String(technologySlides.length).padStart(2, "0")}</span>
                  <button type="button" onClick={() => setTechPaused((value) => !value)} aria-label={techPaused ? "Reanudar carrusel de tecnologías" : "Pausar carrusel de tecnologías"}>{techPaused ? <Play size={16} /> : <Pause size={16} />}</button>
                  <button type="button" onClick={() => changeTechnologySlide(1)} aria-label="Ver tecnologías siguientes"><ChevronRight size={18} /></button>
                </div>
              </div>
              <div className="technology-stage">
                <AnimatePresence mode="wait" custom={techDirection}>
                  <motion.div
                    className="technology-stage__cards"
                    key={activeTechnologySlide.key}
                    custom={techDirection}
                    initial={reduceMotion ? false : { opacity: 0, x: techDirection * 150, rotateY: techDirection * 70, scale: 0.72, filter: "blur(12px)" }}
                    animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1, filter: "blur(0px)" }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: techDirection * -130, rotateY: techDirection * -65, scale: 0.78, filter: "blur(10px)" }}
                    transition={{ type: "spring", stiffness: 145, damping: 19, mass: 0.9 }}
                  >
                    {activeTechnologySlide.items.map((technology, index) => (
                      <motion.article
                        className="technology-card"
                        key={technology.name}
                        initial={reduceMotion ? false : { opacity: 0, y: 90, rotateX: -55, scale: 0.82 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 190, damping: 17, delay: index * 0.11 }}
                        whileHover={reduceMotion ? undefined : { y: -12, rotateX: 5, rotateY: index === 1 ? 0 : index === 0 ? -4 : 4, scale: 1.025 }}
                      >
                        <div className="technology-card__number">{String(index + 1).padStart(2, "0")}</div>
                        <div className="technology-card__icon"><Code2 size={19} /></div>
                        <div><h3>{technology.name}</h3><span>{technology.level}</span><p>{technology.detail}</p></div>
                        <div className="technology-card__signal" aria-hidden="true"><i /><i /><i /></div>
                      </motion.article>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="technology-showcase__footer">
                <span>{techPaused ? "Rotación pausada" : "Cambio automático cada 5 segundos"}</span>
                <div className="technology-progress" aria-hidden="true"><motion.i key={`${activeTechnologySlide.key}-${techPaused}`} initial={{ scaleX: 0 }} animate={{ scaleX: techPaused || reduceMotion ? 0 : 1 }} transition={{ duration: 9, ease: "linear" }} /></div>
              </div>
            </Reveal>
            <Reveal className="languages-panel">
              <div className="languages-panel__heading"><span><Globe2 size={21} /></span><div><small>Comunicación</small><h3>Idiomas de dominio</h3></div></div>
              <div className="languages-grid">
                {languages.map((language) => (
                  <motion.article className="language-card" key={language.name} whileHover={reduceMotion ? undefined : { y: -6, rotateZ: language.shortCode === "ES" ? -1 : 1 }}>
                    <span className="language-code">{language.shortCode}</span>
                    <div><h4>{language.name}</h4><p>{language.label}</p><div className="language-stars" aria-label={`${language.proficiency} de 5 estrellas`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={18} fill={index < language.proficiency ? "currentColor" : "none"} className={index < language.proficiency ? "filled" : ""} />)}</div></div>
                    <strong>{language.proficiency}/5</strong>
                  </motion.article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section--services" id="servicios">
          <div className="section-shell">
            <Reveal><SectionHeading eyebrow="04 · Servicios" title="Soluciones que puedo desarrollar" description="Cada capacidad se desbloquea como parte de un sistema: selecciona una para descubrir cómo puede transformar una operación real." /></Reveal>
            <motion.div
              className="service-experience"
              onViewportEnter={() => setServiceSequenceStarted(true)}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="service-experience__texture" aria-hidden="true"><span /><span /><span /><i /><i /><i /></div>
              <div className="service-vault">
                <div className="service-vault__header"><span>Archivo de capacidades</span><strong>{serviceUnlockedCount}/{services.length} desbloqueadas</strong></div>
                <div className="service-vault__rail" role="list" aria-label="Servicios disponibles">
                  {services.map((service, index) => {
                    const Icon = serviceIcons[service.icon] || Layers3;
                    const unlocked = index < serviceUnlockedCount;
                    const active = index === serviceIndex;
                    return (
                      <motion.button
                        type="button"
                        role="listitem"
                        key={service.name}
                        className={`${unlocked ? "unlocked" : "locked"}${active ? " active" : ""}`}
                        onClick={() => changeService(index)}
                        disabled={!unlocked}
                        aria-label={`${service.name}${unlocked ? "" : " — bloqueado"}`}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.55, rotateZ: -12 }}
                        animate={unlocked ? { opacity: 1, scale: 1, rotateZ: 0 } : { opacity: 0.34, scale: 0.86, rotateZ: 0 }}
                        transition={{ type: "spring", stiffness: 280, damping: 17, delay: reduceMotion ? 0 : index * 0.035 }}
                        whileHover={unlocked && !reduceMotion ? { scale: 1.06, rotateZ: index % 2 ? 1.5 : -1.5 } : undefined}
                      >
                        <span className="service-vault__number">{String(index + 1).padStart(2, "0")}</span>
                        <span className="service-vault__icon">{unlocked ? <Icon size={19} /> : <LockKeyhole size={16} />}</span>
                        <span className="service-vault__name">{service.name}</span>
                        <span className="service-vault__state">{unlocked ? <Check size={13} /> : <LockKeyhole size={12} />}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              <div className="service-stage">
                <AnimatePresence mode="wait" custom={serviceDirection}>
                  <motion.article
                    key={`${serviceIndex}-${activeService.name}`}
                    className={`service-spotlight service-spotlight--${serviceIndex % 5}`}
                    custom={serviceDirection}
                    initial={reduceMotion ? false : { opacity: 0, rotateX: 70, rotateY: serviceDirection * 48, z: -240, scale: 0.64, filter: "blur(18px) brightness(1.8)", clipPath: "polygon(48% 0, 52% 0, 62% 100%, 38% 100%)" }}
                    animate={{ opacity: 1, rotateX: 0, rotateY: 0, z: 0, scale: 1, filter: "blur(0px) brightness(1)", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    exit={reduceMotion ? undefined : { opacity: 0, rotateX: -50, rotateY: serviceDirection * -42, z: -180, scale: 0.72, filter: "blur(14px) brightness(1.5)", clipPath: "polygon(0 50%, 100% 42%, 100% 58%, 0 50%)" }}
                    transition={{ type: "spring", stiffness: 120, damping: 17, mass: 0.95 }}
                  >
                    <div className="service-spotlight__scan" aria-hidden="true" />
                    <div className="service-spotlight__top">
                      <motion.span className="service-spotlight__icon" initial={reduceMotion ? false : { rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 13, delay: 0.18 }}><ActiveServiceIcon size={34} /></motion.span>
                      <div><small>Capacidad {String(serviceIndex + 1).padStart(2, "0")}</small><span><Check size={13} /> Desbloqueada</span></div>
                    </div>
                    <motion.h3 initial={reduceMotion ? false : { opacity: 0, x: -45 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>{activeService.name}</motion.h3>
                    <motion.p className="service-spotlight__description" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>{activeService.description}</motion.p>
                    <div className="service-spotlight__application"><span>Aplicación real</span><p>{activeService.application}</p></div>
                    <div className="service-spotlight__actions">
                      <a className="button button--gold" href="#contacto">Iniciar proyecto <ArrowRight size={16} /></a>
                      <span>{servicePaused ? "Exploración pausada" : serviceUnlockedCount < services.length ? "Desbloqueando capacidades…" : "Exploración automática activa"}</span>
                    </div>
                  </motion.article>
                </AnimatePresence>
                <div className="service-stage__controls">
                  <button type="button" onClick={() => stepService(-1)} aria-label="Servicio anterior"><ChevronLeft size={18} /></button>
                  <div><span>{String(serviceIndex + 1).padStart(2, "0")}</span><i /><b>{String(services.length).padStart(2, "0")}</b></div>
                  <button type="button" onClick={() => setServicePaused((value) => !value)} aria-label={servicePaused ? "Reanudar servicios" : "Pausar servicios"}>{servicePaused ? <Play size={17} /> : <Pause size={17} />}</button>
                  <button type="button" onClick={() => stepService(1)} aria-label="Servicio siguiente"><ChevronRight size={18} /></button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section section--method" id="metodologia">
          <div className="section-shell">
            <Reveal><SectionHeading eyebrow="05 · Valor diferencial" title="Operaciones potenciadas con inteligencia" description="Combino comprensión del negocio, automatización e inteligencia artificial para acortar tiempos, reducir trabajo manual y transformar datos dispersos en decisiones útiles." /></Reveal>
            <Reveal className="ai-differentiator">
              <div className="ai-differentiator__content">
                <div className="oracle-badge"><Sparkles size={16} /><span>{certifications[0].issuer}</span><b>{certifications[0].name}</b></div>
                <h3>IA aplicada a problemas que sí importan</h3>
                <p>Los proyectos pueden incorporar automatización, análisis inteligente y flujos asistidos por IA. No se trata de agregar tecnología por moda, sino de utilizarla para simplificar operaciones, acelerar respuestas y liberar tiempo para decisiones de mayor valor.</p>
                <div className="ai-capability-grid">
                  {aiCapabilities.map((capability, index) => (
                    <motion.article key={capability.title} initial={reduceMotion ? false : { opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.13 }}>
                      <span>{String(index + 1).padStart(2, "0")}</span><div><h4>{capability.title}</h4><p>{capability.detail}</p></div>
                    </motion.article>
                  ))}
                </div>
              </div>
              <div className="ai-lab" aria-label="Visualización de núcleo de inteligencia artificial">
                <div className="ai-lab__rings" aria-hidden="true"><i /><i /><i /><i /></div>
                <motion.div className="ai-core" animate={reduceMotion ? undefined : { rotateY: [0, 12, -12, 0], scale: [1, 1.04, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}><Bot size={54} /><span>ORACLE</span><b>AI CORE</b></motion.div>
                <div className="ai-node ai-node--one"><Workflow size={17} /><span>Automatización</span></div>
                <div className="ai-node ai-node--two"><Database size={17} /><span>Datos</span></div>
                <div className="ai-node ai-node--three"><Sparkles size={17} /><span>Inteligencia</span></div>
                <div className="ai-terminal" aria-hidden="true"><span>system.ai.ready</span><i /><i /><i /><b>optimizing_workflow()</b></div>
              </div>
            </Reveal>
            <div className="principles-grid">{principles.map((principle, index) => <Reveal className={`principle-card principle-card--${index + 1}`} key={principle.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{principle.title}</h3><p>{principle.detail}</p><i aria-hidden="true" /></Reveal>)}</div>
            <Reveal className="process-command">
              <div className="process-command__header"><div><span>Secuencia de implementación</span><h3>Del problema a un sistema que evoluciona</h3></div><strong>{String(processStepIndex + 1).padStart(2, "0")} / {String(processSteps.length).padStart(2, "0")}</strong></div>
              <div className="process-timeline" aria-label="Proceso de trabajo interactivo">
                <div className="process-timeline__track" aria-hidden="true"><motion.i className="process-progress--horizontal" animate={{ scaleX: processStepIndex / (processSteps.length - 1) }} transition={{ type: "spring", stiffness: 75, damping: 18 }} /><motion.i className="process-progress--vertical" animate={{ scaleY: processStepIndex / (processSteps.length - 1) }} transition={{ type: "spring", stiffness: 75, damping: 18 }} /></div>
                {processSteps.map((step, index) => (
                  <button type="button" key={step.title} className={`${index === processStepIndex ? "active" : ""}${index < processStepIndex ? " complete" : ""}`} onClick={() => setProcessStepIndex(index)} aria-label={`${step.title}: ${step.detail}`}>
                    <motion.i animate={index === processStepIndex && !reduceMotion ? { scale: [1, 1.28, 1], rotate: [0, 8, -8, 0] } : undefined} transition={{ duration: 1.4, repeat: Infinity }}><span>{index + 1}</span></motion.i><b>{step.title}</b>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div className="process-output" key={processSteps[processStepIndex].title} initial={reduceMotion ? false : { opacity: 0, y: 24, rotateX: -25, clipPath: "inset(40% 8% 40% 8%)" }} animate={{ opacity: 1, y: 0, rotateX: 0, clipPath: "inset(0% 0% 0% 0%)" }} exit={reduceMotion ? undefined : { opacity: 0, y: -18, rotateX: 20, clipPath: "inset(45% 8% 45% 8%)" }} transition={{ type: "spring", stiffness: 110, damping: 18 }}><span>Fase activa</span><h4>{processSteps[processStepIndex].title}</h4><p>{processSteps[processStepIndex].detail}</p><i aria-hidden="true" /></motion.div>
              </AnimatePresence>
            </Reveal>
          </div>
        </section>

        <section className="section section--contact" id="contacto">
          <div className="section-shell">
            <Reveal><SectionHeading eyebrow="06 · Contacto" title="Hablemos de tu proyecto" description="Si tienes un proyecto en mente o buscas un desarrollador comprometido, analítico y resolutivo, conversemos." /></Reveal>
            <div className="contact-layout">
              <Reveal className="contact-cards">
                <a href={`mailto:${contactInfo.email}`} className="contact-card"><span><Mail size={20} /></span><div><small>Correo</small><b>{contactInfo.email}</b></div><ArrowRight size={17} /></a>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="contact-card"><span><Phone size={20} /></span><div><small>Teléfono</small><b>{contactInfo.phone}</b></div><ArrowRight size={17} /></a>
                <div className="contact-card"><span><MapPin size={20} /></span><div><small>Ubicación</small><b>{contactInfo.location}</b></div><CircleDot size={17} /></div>
                <a href={contactInfo.instagramUrl} target="_blank" rel="noreferrer" className="contact-card contact-card--instagram"><span><Camera size={20} /></span><div><small>Instagram</small><b>@emocionalj</b></div><ExternalLink size={17} /></a>
                <div className="contact-quick"><a className="button button--whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a><button className="button button--ghost" type="button" onClick={copyEmail}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? "Copiado" : "Copiar correo"}</button></div>
              </Reveal>
              <Reveal><ContactForm /></Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><BrandMark compact /><div><b>Juan David Idarraga Bolaños</b><span>Tecnología aplicada a problemas reales.</span></div></div>
        <nav aria-label="Navegación del pie">{navigation.slice(0, 5).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <div className="footer-meta"><span>© {new Date().getFullYear()} Juan David Idarraga</span><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></div>
      </footer>

      <AnimatePresence>
        {assistantOpen ? <motion.div className="assistant-panel" role="dialog" aria-label="Accesos rápidos" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }}><div className="assistant-panel__head"><span><Bot size={18} /></span><div><b>Accesos rápidos</b><small>¿Qué quieres revisar?</small></div><button type="button" onClick={() => setAssistantOpen(false)} aria-label="Cerrar accesos rápidos"><X size={18} /></button></div><div className="assistant-links"><a href="#proyectos" onClick={() => setAssistantOpen(false)}><MonitorSmartphone size={18} /><span>Ver proyectos<small>Casos y soluciones</small></span><ArrowRight size={15} /></a><a href="#servicios" onClick={() => setAssistantOpen(false)}><Layers3 size={18} /><span>Consultar servicios<small>Qué puedo desarrollar</small></span><ArrowRight size={15} /></a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>Enviar WhatsApp<small>Conversación directa</small></span><ExternalLink size={15} /></a><a href={`mailto:${contactInfo.email}`}><Mail size={18} /><span>Enviar correo<small>{contactInfo.email}</small></span><ExternalLink size={15} /></a><button type="button" onClick={() => { setAssistantOpen(false); setCvOpen(true); }}><FileText size={18} /><span>Ver CV<small>Perfil profesional</small></span><ArrowRight size={15} /></button></div><p>No es un chatbot: es un centro de accesos reales.</p></motion.div> : null}
      </AnimatePresence>
      <button className={`assistant-toggle${assistantOpen ? " active" : ""}`} type="button" onClick={() => setAssistantOpen((value) => !value)} aria-label={assistantOpen ? "Cerrar accesos rápidos" : "Abrir accesos rápidos"} aria-expanded={assistantOpen}><span>{assistantOpen ? <X /> : <MessageCircle />}</span><i aria-hidden="true" /></button>
      <AnimatePresence>{showTop ? <motion.button className="back-to-top" type="button" aria-label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><ArrowUp size={18} /></motion.button> : null}</AnimatePresence>

      <AnimatePresence>{selectedProject ? <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} /> : null}</AnimatePresence>
      <AnimatePresence>{cvOpen ? <CvModal onClose={() => setCvOpen(false)} /> : null}</AnimatePresence>
    </>
  );
}
