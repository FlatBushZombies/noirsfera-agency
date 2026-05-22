"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"
import Link from "next/link"
import { useScrollGlass } from "@/lib/use-scroll-glass"

// ─── Add to your globals.css ──────────────────────────────────────────────────
// @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
// ─────────────────────────────────────────────────────────────────────────────

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

// Per-card rotation in degrees, cycles through projects
const ROTATIONS = [-3.2, 2.1, -1.6, 3.4, -2.8, 1.9, -0.8, 2.4]

// Attachment type cycling: pin | clip | tape
const ATTACHMENTS = ["pin", "clip", "tape", "pin", "clip", "tape", "pin", "clip"] as const
type AttachmentType = (typeof ATTACHMENTS)[number]

// ── Decorative attachment SVGs ────────────────────────────────────────────────

function PushPin() {
  return (
    <svg
      className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 drop-shadow-md"
      width="22" height="34" viewBox="0 0 22 34" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer pin head */}
      <circle cx="11" cy="11" r="10" className="fill-primary" />
      {/* Sheen */}
      <ellipse cx="8.5" cy="8" rx="4" ry="3.5" fill="rgba(255,255,255,0.28)" />
      {/* Dark centre dot */}
      <circle cx="11" cy="11" r="3" fill="rgba(0,0,0,0.25)" />
      {/* Shaft */}
      <rect x="10" y="20" width="2" height="13" rx="1" fill="rgba(255,255,255,0.25)" />
    </svg>
  )
}

function PaperClip() {
  return (
    <svg
      className="absolute -top-3 right-6 z-20 drop-shadow-sm"
      width="24" height="52" viewBox="0 0 24 52" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 4 C6 4 4 10 4 14 L4 44 C4 48 7 50 10 50 C13 50 16 48 16 44 L16 14 C16 11 14 9 12 9 C10 9 8 11 8 14 L8 40"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function Tape() {
  return (
    <div
      className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
      style={{
        width: 64,
        height: 20,
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(4px)",
        borderLeft: "1px solid rgba(255,255,255,0.1)",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        transform: "translateX(-50%) rotate(-1.5deg)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    />
  )
}

function Attachment({ type }: { type: AttachmentType }) {
  if (type === "pin")  return <PushPin />
  if (type === "clip") return <PaperClip />
  return <Tape />
}

// ── Single polaroid project card ──────────────────────────────────────────────

interface CardProps {
  project: Project
  index: number
  t: ReturnType<typeof getTranslations>
}

function PolaroidCard({ project, index, t }: CardProps) {
  const [hovered, setHovered] = useState(false)
  const rotation = ROTATIONS[index % ROTATIONS.length]
  const attachType = ATTACHMENTS[index % ATTACHMENTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, rotate: rotation * 0.5, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotate: rotation, scale: 1 }}
      transition={{
        duration: 0.65,
        delay: index * 0.09,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
      style={{ transformOrigin: "center bottom", position: "relative", zIndex: hovered ? 20 : 1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
    >
      {/* Attachment decoration */}
      <Attachment type={attachType} />

      {/* ── Polaroid frame ── */}
      <div
        className="relative rounded-sm overflow-visible"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: hovered
            ? "0 28px 72px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.14) inset, 0 1px 0 rgba(255,255,255,0.12) inset"
            : "0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06) inset",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* ── Top inset highlight line ── */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

        {/* ── Photo area ── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: project.category === "Apps" ? "3/2" : "4/3" }}>
          <Image
            src={project.image || "/placeholder.svg?height=600&width=800"}
            alt={project.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={index < 3}
          />

          {/* Category chip — top-left */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <span className="text-primary text-[9px]">{CATEGORY_META[project.category].emoji}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/70">
              {project.category}
            </span>
          </div>

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

        {/* ── Polaroid bottom strip ── */}
        <div
          className="px-4 pt-4 pb-5 flex flex-col gap-2"
          style={{
            background: "rgba(255,255,255,0.025)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Handwritten title */}
          <p
            className="text-foreground/90 text-xl leading-tight"
            style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
          >
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

      {/* Drop shadow pseudo-element effect via extra div */}
      <div
        className="absolute inset-x-3 -bottom-2 h-4 -z-10 rounded-sm blur-md opacity-40 transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: "rgba(0,0,0,0.5)" }}
      />
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function Portfolio() {
  const { language } = useLanguage()
  const t = getTranslations(language)
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
    () =>
      activeCategory === "All"
        ? projects.filter((p) => p.category !== "Apps")   // Apps are hidden from "All"
        : projects.filter((p) => p.category === activeCategory),
    [projects, activeCategory]
  )

  // counts["All"] reflects only the non-Apps projects shown in that view
  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    projects.forEach((p) => { map[p.category] = (map[p.category] ?? 0) + 1 })
    map["All"] = projects.filter((p) => p.category !== "Apps").length
    return map
  }, [projects])

  return (
    <section
      id="portfolio"
      className="w-full bg-surface py-16 md:py-28 lg:py-40 relative overflow-hidden"
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
          <p className="text-base md:text-lg text-text-secondary font-medium">
            {t.portfolio.subheading}
          </p>
        </div>

        {/* ── Filter Tab Bar ── */}
        <div className="mb-16 lg:mb-24">

          {/* Desktop */}
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

          {/* Mobile */}
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

        {/* ── Polaroid Grid ── */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pt-8">
                {filtered.map((project, index) => (
                  <PolaroidCard
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