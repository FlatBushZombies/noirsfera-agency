"use client"

import { useState, useMemo, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"
import Link from "next/link"
import { useScrollGlass } from "@/lib/use-scroll-glass"

type Category = "All" | "Web Apps" | "Websites" | "Apps" | "Startups"

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

const CATEGORIES: Category[] = ["All", "Web Apps", "Websites", "Apps", "Startups"]

const CATEGORY_META: Record<Category, { emoji: string }> = {
  All:        { emoji: "✦" },
  "Web Apps": { emoji: "⬡" },
  Websites:   { emoji: "◈" },
  Apps:       { emoji: "⬟" },
  Startups:   { emoji: "◎" },
}

export default function Portfolio() {
  const { language } = useLanguage()
  const t = getTranslations(language)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const isScrolled = useScrollGlass(180)

  const projects = useMemo<Project[]>(() => [
    {
      id: 1,
      title: t.portfolio.projects.tutschool.title,
      description: t.portfolio.projects.tutschool.description,
      tags: t.portfolio.projects.tutschool.tags,
      duration: t.portfolio.projects.tutschool.duration,
      industry: t.portfolio.projects.tutschool.industry,
      image: "/tutschool-flag.jpg",
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
      image: "/robot.png",
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
  ], [t])

  const filtered = useMemo(
    () => activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory),
    [projects, activeCategory]
  )

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length }
    projects.forEach(p => { map[p.category] = (map[p.category] ?? 0) + 1 })
    return map
  }, [projects])

  return (
    <section id="portfolio" className="w-full bg-surface py-16 md:py-28 lg:py-40 relative overflow-hidden">
      {/* Floating liquid glass blobs */}
      <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-[120px] opacity-40 animate-liquid" />
      <div className="absolute bottom-16 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-primary/15 via-primary/10 to-transparent blur-[100px] opacity-30 animate-liquid" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* ── Header ── */}
        <div className="text-center mb-12 lg:mb-20">
          <p className="text-sm md:text-base font-semibold text-primary uppercase tracking-widest mb-4">
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-4 font-display leading-tight text-balance">
            {t.portfolio.heading}
          </h2>
          <p className="text-base md:text-lg text-text-secondary font-medium">{t.portfolio.subheading}</p>
        </div>

        {/* ── Filter Tab Bar ── */}
        {/*
          Mobile: horizontal scroll strip — no wrapping, no squishing.
          The negative mx + px trick keeps the pill flush with screen edges
          while letting it scroll past them.
        */}
        <div className="mb-14 lg:mb-24">
          {/* Desktop: centred frosted pill */}
          <div className="hidden sm:flex justify-center">
            <div className="relative flex items-center gap-1 p-1.5 rounded-full bg-white/[0.04] backdrop-blur-[32px] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <LayoutGroup>
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat
                  const meta = CATEGORY_META[cat]
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="filter-pill-desktop"
                          className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[16px] border border-white/20 shadow-[0_2px_16px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]"
                          transition={{ type: "spring", stiffness: 400, damping: 38 }}
                        />
                      )}
                      <span className={`relative z-10 text-xs transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground/30"}`}>
                        {meta.emoji}
                      </span>
                      <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground/50 hover:text-foreground/75"}`}>
                        {cat}
                      </span>
                      <span className={`relative z-10 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-black tabular-nums transition-all duration-300 ${
                        isActive
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-white/5 text-foreground/30 border border-white/[0.08]"
                      }`}>
                        {counts[cat] ?? 0}
                      </span>
                    </button>
                  )
                })}
              </LayoutGroup>
            </div>
          </div>

          {/* Mobile: horizontally scrollable row of pills */}
          <div className="sm:hidden -mx-5 px-5">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              <LayoutGroup>
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat
                  const meta = CATEGORY_META[cat]
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="relative flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 border"
                      style={{
                        background: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                        borderColor: isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)",
                      }}
                    >
                      <span className={`text-[10px] transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground/30"}`}>
                        {meta.emoji}
                      </span>
                      <span className={`transition-colors duration-300 whitespace-nowrap ${isActive ? "text-foreground" : "text-foreground/50"}`}>
                        {cat}
                      </span>
                      <span className={`flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black tabular-nums transition-all duration-300 ${
                        isActive
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-white/5 text-foreground/30 border border-white/[0.07]"
                      }`}>
                        {counts[cat] ?? 0}
                      </span>
                    </button>
                  )
                })}
              </LayoutGroup>
            </div>
          </div>
        </div>

        {/* ── Project List ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-14 md:gap-20 lg:gap-28"
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
              filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="group relative"
                >
                  {/* Category chip */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-primary text-xs">{CATEGORY_META[project.category].emoji}</span>
                    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-foreground/35">
                      {project.category}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 sm:gap-10 lg:gap-16 items-start">

                    {/* ── Image ── */}
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 bg-white/5 backdrop-blur-[24px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:bg-white/10"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/20 group-hover:ring-white/30 transition-all duration-500 z-10" />

                      <Image
                        src={project.image || "/placeholder.svg?height=800&width=1280"}
                        alt={project.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority={index === 0}
                      />

                      <AnimatePresence>
                        {hoveredId === project.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 bg-white/10 backdrop-blur-[32px] flex items-center justify-center rounded-2xl sm:rounded-3xl z-20"
                          >
                            <motion.div
                              initial={{ y: 30, opacity: 0, scale: 0.85 }}
                              animate={{ y: 0, opacity: 1, scale: 1 }}
                              exit={{ y: 30, opacity: 0, scale: 0.85 }}
                              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                              className="relative"
                            >
                              <div className="group/button relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 rounded-full opacity-0 group-hover/button:opacity-70 blur-xl transition-all duration-500" />
                                <div className="relative px-8 py-3.5 bg-white/95 backdrop-blur-[32px] text-black font-bold rounded-full transition-all duration-300 hover:scale-[1.08] hover:bg-white shadow-[0_12px_48px_rgba(0,0,0,0.25)] border border-white/20">
                                  <span className="relative z-10 text-sm tracking-wide flex items-center gap-2.5">
                                    {t.portfolio.viewProject}
                                    <svg className="w-4 h-4 transition-transform group-hover/button:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>

                    {/* ── Text content ── */}
                    <div className="space-y-4 lg:space-y-6 lg:pt-2">

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1.5 text-xs font-bold tracking-wider text-primary bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-display leading-[1.1] text-pretty tracking-tight">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed font-medium max-w-2xl">
                        {project.description}
                      </p>

                      {/* Duration + Industry — card on mobile */}
                      <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-1 sm:pt-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] p-4 sm:p-0 sm:bg-transparent sm:border-transparent">
                        <div className="space-y-1.5 sm:space-y-2">
                          <p className="text-[11px] font-black text-foreground/35 uppercase tracking-[0.15em]">
                            Duration
                          </p>
                          <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{project.duration}</p>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <p className="text-[11px] font-black text-foreground/35 uppercase tracking-[0.15em]">
                            Industry
                          </p>
                          <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{project.industry}</p>
                        </div>
                      </div>

                      {/* CTA — always visible on mobile, hidden on lg (hover overlay handles it) */}
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 w-full sm:w-auto text-primary font-bold transition-all duration-300 group/link lg:hidden text-sm sm:text-base px-6 py-3.5 rounded-full bg-white/5 backdrop-blur-[24px] border border-white/10 hover:bg-white/10 hover:border-white/20 hover:gap-4"
                      >
                        <span>{t.portfolio.viewProject}</span>
                        <svg
                          className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>

                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}