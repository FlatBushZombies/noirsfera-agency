"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
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

const projects: Project[] = [
  {
    id: 1,
    title: "TutSchool",
    description:
      "Comprehensive website for TUT School, a language and arts institution featuring course information, enrollment, and student resources.",
    tags: ["Web Design", "Development"],
    duration: "6 weeks",
    industry: "SaaS",
    image: "/tutschool.png",
    imageAlt: "TutSchool Website",
    link: "https://tutschool.ru/",
  },
  {
    id: 2,
    title: "Camp Guide",
    description: "Interactive guide for camping enthusiasts with location recommendations and equipment lists.",
    tags: ["Product Design", "UI/UX"],
    duration: "8 weeks",
    industry: "Resort",
    image: "/camp-guide.png",
    imageAlt: "Camp Guide Landing Page",
    link: "https://resonant-sunflower-1bb1e7.netlify.app/",
  },
  {
    id: 3,
    title: "DMB Pay+",
    description: "Secure digital payment platform with intuitive user interface and real-time transaction tracking.",
    tags: ["Mobile App", "web3"],
    duration: "10 weeks",
    industry: "FinTech",
    image: "/crypto_pay.png",
    imageAlt: "Web3 Platform",
    link: "https://jocular-sfogliatella-55a4c9.netlify.app/",
  },
  {
    id: 4,
    title: "Oakwood ESL",
    description: "Profession Academics ESL Training school",
    tags: ["website", "web"],
    duration: "10 weeks",
    industry: "Education",
    image: "/oakwood.png",
    imageAlt: "Educational Platform",
    link: "https://oakwoodesl.com/",
  },
]

export default function Portfolio() {
  const [scrollX, setScrollX] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const animate = () => {
      setScrollX((prev) => {
        const newX = prev - 0.5
        const cardWidth = 520
        const totalWidth = cardWidth * projects.length
        if (Math.abs(newX) >= totalWidth) {
          return 0
        }
        return newX
      })
    }

    const animationFrame = setInterval(animate, 16)
    return () => clearInterval(animationFrame)
  }, [])

  const duplicatedProjects = [...projects, ...projects, ...projects]

  return (
    <section id="portfolio" ref={sectionRef} className="w-full bg-surface py-20 md:py-28 lg:py-36 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm md:text-base font-semibold text-primary uppercase tracking-widest mb-4">
            Featured Works
          </p>
          <div className="flex justify-center mb-8">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full border-3 border-background overflow-hidden relative shadow-lg ring-2 ring-surface">
                <Image src="/avatar-1.png" alt="Client avatar" fill className="object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-3 border-background overflow-hidden relative shadow-lg ring-2 ring-surface">
                <Image src="/avatar-2.jpg" alt="Client avatar" fill className="object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-3 border-background overflow-hidden relative shadow-lg ring-2 ring-surface">
                <Image src="/avatar-3.jpg" alt="Client avatar" fill className="object-cover" />
              </div>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-4 font-display leading-tight text-balance">
            Case Studies
          </h2>
          <p className="text-lg text-text-secondary font-medium">10+ successful projects that delivered real results</p>
        </div>

        <div className="relative overflow-hidden">
          {/* Left Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white via-white/30 to-transparent z-10 pointer-events-none backdrop-blur-[1px]" />

          {/* Right Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white via-white/30 to-transparent z-10 pointer-events-none backdrop-blur-[1px]" />

          <motion.div
            className="flex gap-6"
            style={{
              x: scrollX,
            }}
          >
            {duplicatedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="relative flex-shrink-0 w-[500px] h-[500px]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-[0_4px_15px_rgb(0,0,0,0.04)]">
                  <Image
                    src={project.image || "/placeholder.svg?height=1024&width=1024"}
                    alt={project.imageAlt}
                    fill
                    className="object-cover"
                    sizes="500px"
                  />

                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300">
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-8 py-4 bg-white text-black font-semibold font-inter rounded-full transition-all duration-300 hover:scale-105 group overflow-hidden"
                      >
                        {/* Glowing border */}
                        <span className="absolute inset-0 rounded-full p-[2px] bg-[#00d9ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="absolute inset-[2px] rounded-full bg-white" />
                        </span>

                        {/* Rotating glow */}
                        <span
                          className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-75 blur-md animate-[spin_3s_linear_infinite]"
                          style={{
                            background:
                              "conic-gradient(from_var(--angle), transparent 0%, #00d9ff 20%, transparent 40%)",
                            "--angle": "0deg",
                          } as React.CSSProperties}
                        />

                        <span className="relative z-10">View Project</span>
                      </Link>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
