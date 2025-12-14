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
    <section id="portfolio" className="w-full bg-surface py-20 md:py-28 lg:py-36 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
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

        <div className="grid grid-cols-1 gap-8 lg:gap-12">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                {/* Image Container */}
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative aspect-[4/3] lg:aspect-square w-full rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] transition-all duration-500"
                >
                  <Image
                    src={project.image || "/placeholder.svg?height=1024&width=1024"}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Overlay with View Project Button */}
                  <AnimatePresence>
                    {hoveredId === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="relative"
                        >
                          <div className="relative px-8 py-4 bg-white/95 backdrop-blur-md text-black font-semibold font-inter rounded-full transition-all duration-300 hover:scale-105 hover:bg-white group/button overflow-hidden shadow-xl">
                            {/* Glowing border effect */}
                            <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-primary via-[#00d9ff] to-primary opacity-0 group-hover/button:opacity-100 transition-opacity duration-300">
                              <span className="absolute inset-[2px] rounded-full bg-white/95 backdrop-blur-md" />
                            </span>

                            {/* Rotating glow */}
                            <span
                              className="absolute inset-[-3px] rounded-full opacity-0 group-hover/button:opacity-60 blur-lg animate-[spin_3s_linear_infinite]"
                              style={{
                                background:
                                  "conic-gradient(from 0deg, transparent 0%, #00d9ff 20%, transparent 40%, #00d9ff 60%, transparent 80%)",
                              }}
                            />

                            <span className="relative z-10 text-base">{t.portfolio.viewProject}</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>

                {/* Project Details */}
                <div className="space-y-5 lg:space-y-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-4 py-1.5 text-xs font-semibold tracking-wide text-primary bg-primary/5 rounded-full border border-primary/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-display leading-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed font-medium">
                    {project.description}
                  </p>

                  {/* Meta Information */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-1">Duration</p>
                      <p className="text-base font-semibold text-foreground">{project.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-1">Industry</p>
                      <p className="text-base font-semibold text-foreground">{project.industry}</p>
                    </div>
                  </div>

                  {/* View Project Link for Mobile */}
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/link lg:hidden mt-4"
                  >
                    <span>{t.portfolio.viewProject}</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
