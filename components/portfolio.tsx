"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  duration: string
  industry: string
  image: string
  imageAlt: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "TechFlow",
    description: "SaaS Platform That Increased User Engagement by 240% in 2 Months",
    tags: ["Web Design", "Development"],
    duration: "6 weeks",
    industry: "SaaS",
    image: "/demo-2.jpg",
    imageAlt: "TechFlow SaaS Platform Dashboard",
  },
  {
    id: 2,
    title: "NexusAI",
    description: "AI-Powered Analytics Dashboard That Secured $2M in Seed Funding",
    tags: ["Product Design", "AI/ML"],
    duration: "8 weeks",
    industry: "Artificial Intelligence",
    image: "/demo-1.jpg",
    imageAlt: "NexusAI Analytics Dashboard",
  },
]

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.3,
    margin: "-100px",
  })

  return (
    <section id="section" ref={sectionRef} className="w-full bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/10">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-black" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-black" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-black" />
            </div>
            <span className="text-sm text-white/70">50+ clients trusted us</span>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">Case Studies</h2>
        </div>

        {/* Projects Grid - 3D Floating Cards with Scroll Animations */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                perspective: "1000px",
              }}
              initial={{
                opacity: 0,
                x: index === 0 ? 200 : 0, // First card from right
                scale: 0.8,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      rotate: index === 1 ? [0, -2, 2, -2, 2, 0] : 0,
                    }
                  : {
                      opacity: 0,
                      x: index === 0 ? 200 : 0,
                      scale: 0.8,
                    }
              }
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                rotate: {
                  duration: 0.6,
                  delay: 0.4,
                  ease: "easeInOut",
                },
              }}
            >
              {/* 3D Card Container */}
              <div
                className="relative transition-all duration-700 ease-out"
                style={{
                  transform:
                    hoveredProject === project.id
                      ? "rotateX(2deg) rotateY(-2deg) translateY(-10px)"
                      : "rotateX(0deg) rotateY(0deg) translateY(0px)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card with rounded corners and shadow */}
                <div className="relative rounded-[2.5rem] overflow-hidden bg-neutral-900 shadow-2xl border border-white/10">
                  {/* Project Image - Full card */}
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Project info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-xs font-medium border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>

                      {/* Description */}
                      <p className="text-sm text-white/80 leading-relaxed mb-4">{project.description}</p>

                      {/* View Case Study Link */}
                      <button
                        className={`inline-flex items-center gap-2 text-white font-semibold transition-all duration-300 ${
                          hoveredProject === project.id ? "gap-4" : "gap-2"
                        }`}
                      >
                        View Case Study
                        <svg
                          className="w-4 h-4 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enhanced shadow for 3D effect */}
                <div
                  className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent blur-2xl transition-opacity duration-700"
                  style={{
                    opacity: hoveredProject === project.id ? 0.6 : 0.3,
                    transform: "translateZ(-50px) scale(0.95)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
