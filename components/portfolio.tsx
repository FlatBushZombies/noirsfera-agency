"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"
import Link from "next/link"

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
}

export default function Portfolio() {
  const { language } = useLanguage()
  const t = getTranslations(language)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const projects = useMemo<Project[]>(
    () => [
      {
        id: 1,
        title: t.portfolio.projects.tutschool.title,
        description: t.portfolio.projects.tutschool.description,
        tags: t.portfolio.projects.tutschool.tags,
        duration: t.portfolio.projects.tutschool.duration,
        industry: t.portfolio.projects.tutschool.industry,
        image: "/tutschool.png",
        imageAlt: t.portfolio.projects.tutschool.imageAlt,
        link: "https://tutschool.ru/",
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
      },
      {
        id: 3,
        title: t.portfolio.projects.dmbPay.title,
        description: t.portfolio.projects.dmbPay.description,
        tags: t.portfolio.projects.dmbPay.tags,
        duration: t.portfolio.projects.dmbPay.duration,
        industry: t.portfolio.projects.dmbPay.industry,
        image: "/crypto_pay.png",
        imageAlt: t.portfolio.projects.dmbPay.imageAlt,
        link: "https://jocular-sfogliatella-55a4c9.netlify.app/",
      },
      {
        id: 4,
        title: t.portfolio.projects.oakwood.title,
        description: t.portfolio.projects.oakwood.description,
        tags: t.portfolio.projects.oakwood.tags,
        duration: t.portfolio.projects.oakwood.duration,
        industry: t.portfolio.projects.oakwood.industry,
        image: "/oakwood.png",
        imageAlt: t.portfolio.projects.oakwood.imageAlt,
        link: "https://oakwoodesl.com/",
      },
    ],
    [t],
  )

  return (
    <section id="portfolio" className="w-full bg-surface py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-20 lg:mb-24">
          <p className="text-sm md:text-base font-semibold text-primary uppercase tracking-widest mb-4">
            {t.portfolio.badge}
          </p>
          <div className="flex justify-center mb-8">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full border-3 border-background overflow-hidden relative shadow-lg ring-2 ring-surface">
                <Image src="/avatar-1.png" alt={t.portfolio.clientAvatarAlt} fill className="object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-3 border-background overflow-hidden relative shadow-lg ring-2 ring-surface">
                <Image src="/avatar-2.jpg" alt={t.portfolio.clientAvatarAlt} fill className="object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-3 border-background overflow-hidden relative shadow-lg ring-2 ring-surface">
                <Image src="/avatar-3.jpg" alt={t.portfolio.clientAvatarAlt} fill className="object-cover" />
              </div>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-4 font-display leading-tight text-balance">
            {t.portfolio.heading}
          </h2>
          <p className="text-lg text-text-secondary font-medium">{t.portfolio.subheading}</p>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:gap-28">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.08)] transition-all duration-700 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.04]"
                >
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-foreground/[0.08] group-hover:ring-foreground/[0.12] transition-all duration-500" />

                  <Image
                    src={project.image || "/placeholder.svg?height=800&width=1280"}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-[1.05]"
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
                        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 backdrop-blur-[1px] flex items-center justify-center"
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

                            <div className="relative px-10 py-4 bg-white/95 backdrop-blur-sm text-black font-bold font-inter rounded-full transition-all duration-300 hover:scale-[1.08] hover:bg-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/20">
                              <span className="relative z-10 text-base tracking-wide flex items-center gap-2.5">
                                {t.portfolio.viewProject}
                                <svg
                                  className="w-5 h-5 transition-transform group-hover/button:translate-x-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
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

                <div className="space-y-6 lg:space-y-7 lg:pt-2">
                  <div className="flex flex-wrap gap-2.5">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-4 py-2 text-xs font-bold tracking-wider text-primary/90 bg-primary/[0.06] rounded-full border border-primary/15 hover:bg-primary/[0.12] hover:border-primary/25 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-display leading-[1.1] text-pretty tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-base md:text-lg text-text-secondary/90 leading-relaxed font-medium max-w-2xl">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <div className="space-y-2">
                      <p className="text-[11px] font-black text-foreground/35 uppercase tracking-[0.15em]">Duration</p>
                      <p className="text-xl font-bold text-foreground tracking-tight">{project.duration}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[11px] font-black text-foreground/35 uppercase tracking-[0.15em]">Industry</p>
                      <p className="text-xl font-bold text-foreground tracking-tight">{project.industry}</p>
                    </div>
                  </div>

                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all duration-300 group/link lg:hidden mt-4 text-base px-6 py-3.5 rounded-full bg-primary/[0.06] hover:bg-primary/[0.12] border border-primary/15 hover:border-primary/25"
                  >
                    <span>{t.portfolio.viewProject}</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover/link:translate-x-1"
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
          ))}
        </div>
      </div>
    </section>
  )
}
