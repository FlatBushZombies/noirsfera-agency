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
    <section id="portfolio" ref={sectionRef} className="w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full px-6 py-3 mb-8 border border-gray-200">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                <Image src="/avatar-1.png" alt="Client avatar" fill className="object-cover" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                <Image src="/avatar-2.jpg" alt="Client avatar" fill className="object-cover" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                <Image src="/avatar-3.jpg" alt="Client avatar" fill className="object-cover" />
              </div>
            </div>
            <span className="text-sm text-black font-inter font-medium">10+ clients trusted us</span>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold text-black mb-4 font-inter">Case Studies</h2>
        </div>

        <div className="relative overflow-hidden">
          {/* Left Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none backdrop-blur-[2px]" />

          {/* Right Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white via-white/60 to-transparent z-10 pointer-events-none backdrop-blur-[2px]" />

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
                <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl">
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
                        className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-black font-medium font-inter rounded-full transition-colors duration-200"
                      >
                        View Project
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
