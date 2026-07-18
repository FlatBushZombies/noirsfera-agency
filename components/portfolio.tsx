"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"
import Link from "next/link"

type Category = "Web Apps" | "Websites" | "Apps" | "Startups"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  duration: string
  industry: string
  image: string
  imageAlt: string
  link: string
  category: Category
}

const CATEGORIES: Category[] = ["Web Apps", "Websites", "Apps", "Startups"]

// ── Category SVG icons (no external icon lib) ────────────────────────────────

function IconWebApps({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="2.5" width="14" height="11" rx="1.8" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M1 6h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="3.8" cy="4.25" r="0.8" fill="currentColor"/>
      <circle cx="6.2" cy="4.25" r="0.8" fill="currentColor"/>
      <circle cx="8.6" cy="4.25" r="0.8" fill="currentColor"/>
      <path d="M4 9.5h3M4 11.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function IconWebsites({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 1.5C8 1.5 5.5 4.5 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4.5 10.5 8S8 14.5 8 14.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M1.5 8h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M2.5 5h11M2.5 11h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function IconApps({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="1" width="9" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M6.5 3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="8" cy="12.5" r="0.9" fill="currentColor"/>
    </svg>
  )
}

function IconStartups({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.5C8 1.5 3.5 5 3.5 9.5c0 1.5.5 2.5 1.5 3l1-2.5h4l1 2.5c1-.5 1.5-1.5 1.5-3C12.5 5 8 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M6 12l-.5 2.5h5L10 12" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="8" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

function CategoryIcon({ category, className }: { category: Category; className?: string }) {
  if (category === "Web Apps")   return <IconWebApps className={className} />
  if (category === "Websites")   return <IconWebsites className={className} />
  if (category === "Apps")       return <IconApps className={className} />
  return <IconStartups className={className} />
}

// Per-card rotation in degrees, cycles through projects
const ROTATIONS = [-3.2, 2.1, -1.6, 3.4, -2.8, 1.9, -0.8, 2.4]

// Attachment type cycling: pin | clip | tape
const ATTACHMENTS = ["pin", "clip", "tape", "pin", "clip", "tape", "pin", "clip"] as const
type AttachmentType = (typeof ATTACHMENTS)[number]

// ── Decorative attachment SVGs ────────────────────────────────────────────────

function PushPin() {
  return (
    <svg
      className="absolute -top-[18px] left-1/2 -translate-x-1/2 z-20"
      width="26" height="38" viewBox="0 0 26 38" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cast shadow on the card below */}
      <ellipse cx="13" cy="33" rx="6" ry="1.6" fill="rgba(0,0,0,0.35)" />
      {/* Shaft */}
      <rect x="11.5" y="16" width="3" height="16" rx="1.5" fill="rgba(255,255,255,0.3)" />
      {/* Pin head — gradient sphere */}
      <circle cx="13" cy="12" r="12" fill="url(#pinHeadGradient)" />
      <circle cx="13" cy="12" r="12" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      {/* Sheen */}
      <ellipse cx="9.5" cy="8" rx="4.2" ry="3.6" fill="rgba(255,255,255,0.45)" />
      {/* Dark centre dot */}
      <circle cx="13" cy="12" r="3.2" fill="rgba(0,0,0,0.22)" />
      <defs>
        <radialGradient id="pinHeadGradient" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--color-primary, #00d9ff)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--color-primary, #00d9ff)" stopOpacity="0.65" />
        </radialGradient>
      </defs>
    </svg>
  )
}

function PaperClip() {
  return (
    <svg
      className="absolute -top-4 right-7 z-20 rotate-[8deg]"
      width="22" height="46" viewBox="0 0 22 46" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 3 C6 3 4 8 4 12 L4 38 C4 41.5 6.5 43.5 9.5 43.5 C12.5 43.5 15 41.5 15 38 L15 12 C15 9.5 13.2 7.8 11.3 7.8 C9.4 7.8 7.6 9.5 7.6 12 L7.6 35"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13 3 C6 3 4 8 4 12 L4 38 C4 41.5 6.5 43.5 9.5 43.5 C12.5 43.5 15 41.5 15 38 L15 12 C15 9.5 13.2 7.8 11.3 7.8 C9.4 7.8 7.6 9.5 7.6 12 L7.6 35"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
        transform="translate(0.8, 0.8)"
      />
    </svg>
  )
}

function Tape() {
  return (
    <div
      className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20"
      style={{
        width: 68,
        height: 22,
        background: "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 100%)",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderTop: "1px solid rgba(255,255,255,0.22)",
        transform: "translateX(-50%) rotate(-2deg)",
        boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
      }}
    />
  )
}

function Attachment({ type }: { type: AttachmentType }) {
  if (type === "pin")  return <PushPin />
  if (type === "clip") return <PaperClip />
  return <Tape />
}

// ── Single project card ───────────────────────────────────────────────────────

interface CardProps {
  project: Project
  index: number
  t: ReturnType<typeof getTranslations>
}

function ProjectCard({ project, index, t }: CardProps) {
  const [hovered, setHovered] = useState(false)
  const rotation = ROTATIONS[index % ROTATIONS.length]
  const attachType = ATTACHMENTS[index % ATTACHMENTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotation * 0.5, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, rotate: rotation, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ rotate: 0, y: -6, scale: 1.02, zIndex: 20 }}
      style={{ transformOrigin: "center bottom", position: "relative", zIndex: hovered ? 20 : 1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
    >
      {/* Attachment decoration */}
      <Attachment type={attachType} />

      {/* ── Card frame ── */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: hovered
            ? "0 28px 72px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.14) inset, 0 1px 0 rgba(255,255,255,0.12) inset"
            : "0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06) inset",
          transition: "box-shadow 0.5s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* ── Top inset highlight line ── */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

        {/* ── Photo area ── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: project.category === "Apps" ? "3/2" : "16/10" }}>
          <Image
            src={project.image || "/placeholder.svg?height=600&width=800"}
            alt={project.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={index < 3}
          />

          {/* Category badge — top-right */}
          <span className="absolute top-3 right-3 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-primary">
            <CategoryIcon category={project.category} />
          </span>

          {/* Tags — bottom left */}
          <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[9px] font-bold tracking-wider text-primary bg-black/50 backdrop-blur-md rounded-full border border-primary/20"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider text-white/40 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* ── Hover overlay ── */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-black/50 backdrop-blur-[20px] flex flex-col items-center justify-center gap-4 z-20"
              >
                {/* Description */}
                <motion.p
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 14, opacity: 0 }}
                  transition={{ duration: 0.38, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="text-white/75 text-xs leading-relaxed text-center px-6 max-w-[240px] font-medium"
                >
                  {project.description}
                </motion.p>

                {/* CTA button */}
                <motion.div
                  initial={{ y: 18, opacity: 0, scale: 0.88 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 18, opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative flex items-center gap-2.5 px-6 py-3 bg-white/95 text-black text-sm font-bold rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.06] hover:bg-white"
                  >
                    <span className="tracking-wide">{t.portfolio.viewProject}</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom info strip ── */}
        <div
          className="px-4 pt-4 pb-5 flex flex-col gap-2"
          style={{
            background: "rgba(255,255,255,0.025)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-foreground text-lg font-bold font-display tracking-tight leading-tight">
            {project.title}
          </p>

          {/* Duration + Industry */}
          <div className="flex items-center gap-4 mt-0.5">
            <div className="space-y-0.5">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-foreground/30">Duration</p>
              <p className="text-xs font-bold text-foreground/65">{project.duration}</p>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="space-y-0.5">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-foreground/30">Industry</p>
              <p className="text-xs font-bold text-foreground/65">{project.industry}</p>
            </div>

            {/* Mobile CTA arrow */}
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center justify-center w-7 h-7 rounded-full border border-white/10 bg-white/5 text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 lg:hidden"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Soft contact shadow grounding the card */}
      <div
        className="absolute inset-x-4 -bottom-2 h-4 -z-10 rounded-full blur-md opacity-40 transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: "rgba(0,0,0,0.5)" }}
      />
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function Portfolio() {
  const { language } = useLanguage()
  const t = getTranslations(language)
  const [activeCategory, setActiveCategory] = useState<Category>("Web Apps")

  const projects = useMemo<Project[]>(() => [
    {
      id: 1,
      title: t.portfolio.projects.tutschool.title,
      description: t.portfolio.projects.tutschool.description,
      tags: t.portfolio.projects.tutschool.tags,
      duration: t.portfolio.projects.tutschool.duration,
      industry: t.portfolio.projects.tutschool.industry,
      image: "/tutschool-bg.png",
      imageAlt: t.portfolio.projects.tutschool.imageAlt,
      link: "https://tutschool.ru/",
      category: "Web Apps",
    },
    {
      id: 2,
      title: t.portfolio.projects.campGuide.title,
      description: t.portfolio.projects.campGuide.description,
      tags: t.portfolio.projects.campGuide.tags,
      duration: t.portfolio.projects.campGuide.duration,
      industry: t.portfolio.projects.campGuide.industry,
      image: "/camp-guide.png",
      imageAlt: t.portfolio.projects.campGuide.imageAlt,
      link: "https://resonant-sunflower-1bb1e7.netlify.app/",
      category: "Websites",
    },
    {
      id: 3,
      title: t.portfolio.projects.dmbPay.title,
      description: t.portfolio.projects.dmbPay.description,
      tags: t.portfolio.projects.dmbPay.tags,
      duration: t.portfolio.projects.dmbPay.duration,
      industry: t.portfolio.projects.dmbPay.industry,
      image: "/dmbpay-bg.png",
      imageAlt: t.portfolio.projects.dmbPay.imageAlt,
      link: "https://jocular-sfogliatella-55a4c9.netlify.app/",
      category: "Startups",
    },
    {
      id: 4,
      title: t.portfolio.projects.oakwood.title,
      description: t.portfolio.projects.oakwood.description,
      tags: t.portfolio.projects.oakwood.tags,
      duration: t.portfolio.projects.oakwood.duration,
      industry: t.portfolio.projects.oakwood.industry,
      image: "/oakwood.jpg",
      imageAlt: t.portfolio.projects.oakwood.imageAlt,
      link: "https://oakwoodesl.com/",
      category: "Websites",
    },
    // ── App-only projects (excluded from "All") ──
    {
      id: 5,
      title: t.portfolio.projects.duoApp?.title ?? "Duo",
      description: t.portfolio.projects.duoApp?.description ?? "A beautifully crafted mobile experience built for connection and productivity.",
      tags: t.portfolio.projects.duoApp?.tags ?? ["Mobile", "iOS", "UX"],
      duration: t.portfolio.projects.duoApp?.duration ?? "3 months",
      industry: t.portfolio.projects.duoApp?.industry ?? "Lifestyle",
      image: "/duo-app.png",
      imageAlt: t.portfolio.projects.duoApp?.imageAlt ?? "Duo app screenshot",
      link: t.portfolio.projects.duoApp?.link ?? "#",
      category: "Apps",
    },
    {
      id: 6,
      title: t.portfolio.projects.quickhands?.title ?? "QuickHands",
      description: t.portfolio.projects.quickhands?.description ?? "On-demand services at your fingertips — fast, reliable, beautifully simple.",
      tags: t.portfolio.projects.quickhands?.tags ?? ["Mobile", "Android", "On-demand"],
      duration: t.portfolio.projects.quickhands?.duration ?? "4 months",
      industry: t.portfolio.projects.quickhands?.industry ?? "Services",
      image: "/quickhands-app.png",
      imageAlt: t.portfolio.projects.quickhands?.imageAlt ?? "QuickHands app screenshot",
      link: t.portfolio.projects.quickhands?.link ?? "#",
      category: "Apps",
    },
  ], [t])

  const filtered = useMemo(
    () => projects.filter((p) => p.category === activeCategory),
    [projects, activeCategory]
  )

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    projects.forEach((p) => { map[p.category] = (map[p.category] ?? 0) + 1 })
    return map
  }, [projects])

  return (
    <section
      id="portfolio"
      className="w-full bg-surface py-20 md:py-28 lg:py-36 relative overflow-hidden"
    >
      {/* ── Floating ambient blobs ── */}
      <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-[120px] opacity-40 animate-liquid pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-primary/15 via-primary/10 to-transparent blur-[100px] opacity-30 animate-liquid pointer-events-none" />

      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* ── Header ── */}
        <div className="text-center mb-12 lg:mb-20">
          <p className="eyebrow-label mb-4">
            {t.portfolio.badge}
          </p>
          <div className="flex justify-center mb-6">
            <div className="flex -space-x-3">
              {["/avatar-1.png", "/avatar-2.jpg", "/avatar-3.jpg"].map((src, i) => (
                <div
                  key={i}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border-[3px] border-background overflow-hidden relative shadow-lg ring-2 ring-surface backdrop-blur-[16px] bg-white/5"
                >
                  <Image src={src} alt={t.portfolio.clientAvatarAlt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <h2 className="section-heading mb-4">
            {t.portfolio.heading}
          </h2>
          <p className="text-base md:text-lg text-text-secondary font-medium">
            {t.portfolio.subheading}
          </p>
        </div>

        {/* ── Filter Tab Bar ── */}
        <div className="mb-16 lg:mb-24">

          {/* Desktop */}
          <div className="hidden sm:flex justify-center">
            {/* Outer track */}
            <div
              className="relative flex items-center gap-0.5 p-1 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.2)",
              }}
            >
              {/* Top shimmer line */}
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

              <LayoutGroup>
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 overflow-hidden"
                    >
                      {/* Dark gradient fill */}
                      {isActive && (
                        <motion.div
                          layoutId="filter-pill-desktop"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: "linear-gradient(135deg, color-mix(in srgb, var(--color-primary, #00d9ff) 38%, #000) 0%, color-mix(in srgb, var(--color-primary, #00d9ff) 18%, #000) 100%)",
                          }}
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                      {/* Active border glow */}
                      {isActive && (
                        <motion.div
                          layoutId="filter-border-desktop"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            border: "1px solid",
                            borderColor: "color-mix(in srgb, var(--color-primary, #00d9ff) 55%, transparent)",
                            boxShadow: "0 0 20px -4px color-mix(in srgb, var(--color-primary, #00d9ff) 45%, transparent), inset 0 1px 0 rgba(255,255,255,0.10)",
                          }}
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}

                      {/* Icon */}
                      <CategoryIcon
                        category={cat}
                        className={`relative z-10 transition-all duration-300 ${isActive ? "text-white" : "text-foreground/30"}`}
                      />
                      {/* Label */}
                      <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-foreground/45 hover:text-foreground/70"}`}>
                        {cat}
                      </span>
                      {/* Count badge */}
                      <span
                        className="relative z-10 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-black tabular-nums transition-all duration-300"
                        style={isActive ? {
                          background: "rgba(255,255,255,0.18)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.28)",
                        } : {
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.25)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        {counts[cat] ?? 0}
                      </span>
                    </button>
                  )
                })}
              </LayoutGroup>
            </div>
          </div>

          {/* Mobile — horizontal scroll chips */}
          <div className="sm:hidden -mx-5 px-5">
            <div
              className="flex items-center gap-2 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <LayoutGroup>
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="relative flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 overflow-hidden"
                      style={{
                        border: "1px solid",
                        borderColor: isActive
                          ? "color-mix(in srgb, var(--color-primary, #00d9ff) 55%, transparent)"
                          : "rgba(255,255,255,0.07)",
                        boxShadow: isActive
                          ? "0 0 18px -6px color-mix(in srgb, var(--color-primary, #00d9ff) 55%, transparent), inset 0 1px 0 rgba(255,255,255,0.10)"
                          : "none",
                      }}
                    >
                      {/* Dark gradient fill for active */}
                      {isActive && (
                        <motion.div
                          layoutId="filter-pill-mobile"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: "linear-gradient(135deg, color-mix(in srgb, var(--color-primary, #00d9ff) 38%, #000) 0%, color-mix(in srgb, var(--color-primary, #00d9ff) 18%, #000) 100%)",
                          }}
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                      {/* Inactive fill */}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }} />
                      )}

                      <CategoryIcon
                        category={cat}
                        className={`relative z-10 transition-all duration-300 ${isActive ? "text-white" : "text-foreground/25"}`}
                      />
                      <span className={`relative z-10 whitespace-nowrap transition-colors duration-300 ${isActive ? "text-white" : "text-foreground/45"}`}>
                        {cat}
                      </span>
                      <span
                        className="relative z-10 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black tabular-nums transition-all duration-300"
                        style={isActive ? {
                          background: "rgba(255,255,255,0.18)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.28)",
                        } : {
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.22)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        {counts[cat] ?? 0}
                      </span>
                    </button>
                  )
                })}
              </LayoutGroup>
            </div>
          </div>
        </div>

        {/* ── Project Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-foreground/20">
                  ◎
                </div>
                <p className="text-text-secondary font-medium">No projects in this category yet.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pt-6">
                {filtered.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    t={t}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── See All link ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-16 lg:mt-20"
        >
          <Link
            href="/our-projects"
            className="group flex items-center gap-2.5 text-primary font-bold text-sm tracking-wide transition-all duration-300 hover:gap-3.5"
          >
            <span className="relative">
              See All Projects
              {/* Animated underline */}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full"
              />
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}