"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)
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

// ── Tag chip icon — cycles sparkle / circle / asterisk ───────────────────────

function TagChipIcon({ index }: { index: number }) {
  if (index % 3 === 0) return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="flex-shrink-0 opacity-50" aria-hidden>
      <path d="M7 0 L7.77 6.23 L14 7 L7.77 7.77 L7 14 L6.23 7.77 L0 7 L6.23 6.23 Z" />
    </svg>
  )
  if (index % 3 === 1) return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 opacity-50" aria-hidden>
      <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="flex-shrink-0 opacity-50" aria-hidden>
      <line x1="7" y1="1.5" x2="7" y2="12.5" />
      <line x1="1.5" y1="7" x2="12.5" y2="7" />
      <line x1="3.1" y1="3.1" x2="10.9" y2="10.9" />
      <line x1="10.9" y1="3.1" x2="3.1" y2="10.9" />
    </svg>
  )
}

// ── Single project card ───────────────────────────────────────────────────────

interface CardProps {
  project: Project
  index: number
  t: ReturnType<typeof getTranslations>
}

function ProjectCard({ project, index, t }: CardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative"
    >
      {/* ── Card frame ── */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: hovered
            ? "0 24px 60px -12px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.5)"
            : "0 4px 20px rgba(0,0,0,0.5)",
          transition: "box-shadow 0.5s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* ── Photo area ── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: project.category === "Apps" ? "3/2" : "16/10" }}>
          <Image
            src={project.image || "/placeholder.svg?height=600&width=800"}
            alt={project.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={index < 3}
          />

          {/* Category badge — top-right */}
          <span className="absolute top-3 right-3 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-primary">
            <CategoryIcon category={project.category} />
          </span>


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

        {/* ── Bottom info strip — studiomodular.be style ── */}
        <div className="px-5 pt-5 pb-6">
          {/* Title + mobile external link */}
          <div className="flex items-start justify-between gap-2 mb-4">
            <p className="text-foreground text-lg font-bold font-display tracking-tight leading-snug">
              {project.title}
            </p>
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-foreground/[0.12] bg-foreground/[0.03] text-foreground/35 hover:text-primary hover:border-primary/30 transition-all duration-300 lg:hidden mt-0.5"
              aria-label={`Open ${project.title}`}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>

          {/* Tag chips */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.03] text-sm font-medium text-foreground/65"
              >
                <TagChipIcon index={i} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
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

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="w-full bg-surface py-20 md:py-28 lg:py-36 relative overflow-hidden"
    >
      {/* ── Floating ambient blobs ── */}
      <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-[120px] opacity-40 animate-liquid pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-primary/15 via-primary/10 to-transparent blur-[100px] opacity-30 animate-liquid pointer-events-none" />

      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-20">
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
                      className="relative flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 overflow-hidden"
                    >
                      {/* Dark gradient fill */}
                      {isActive && (
                        <motion.div
                          layoutId="filter-pill-desktop"
                          className="absolute inset-0 rounded-full"
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
                          className="absolute inset-0 rounded-full"
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
                      className="relative flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 overflow-hidden"
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
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "linear-gradient(135deg, color-mix(in srgb, var(--color-primary, #00d9ff) 38%, #000) 0%, color-mix(in srgb, var(--color-primary, #00d9ff) 18%, #000) 100%)",
                          }}
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                      {/* Inactive fill */}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.02)" }} />
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