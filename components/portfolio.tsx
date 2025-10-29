"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
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
    title: "TutSchool",
    description:
      "Comprehensive website for TUT School, a language and arts institution featuring course information, enrollment, and student resources.",
    tags: ["Web Design", "Development"],
    duration: "6 weeks",
    industry: "SaaS",
    image: "/tutschool.png",
    imageAlt: "TutSchool Website",
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
  },
]

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.3,
    margin: "-100px",
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return (prevIndex + 1) % projects.length
      }
      return prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    })
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <section id="portfolio" ref={sectionRef} className="w-full bg-black py-24 px-6 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/10">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden relative">
                <Image src="/avatar-1.png" alt="Client avatar" fill className="object-cover" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden relative">
                <Image src="/avatar-2.jpg" alt="Client avatar" fill className="object-cover" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden relative">
                <Image src="/avatar-3.jpg" alt="Client avatar" fill className="object-cover" />
              </div>
            </div>
            <span className="text-sm text-white/70 font-inter">10+ clients trusted us</span>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4 font-inter">Case Studies</h2>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x

                  if (swipe < -10000) {
                    paginate(1)
                  } else if (swipe > 10000) {
                    paginate(-1)
                  }
                }}
                className="w-full max-w-3xl mx-auto"
              >
                <div
                  className="group relative cursor-grab active:cursor-grabbing"
                  onMouseEnter={() => setHoveredProject(projects[currentIndex].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    perspective: "1000px",
                  }}
                >
                  <div
                    className="relative transition-all duration-700 ease-out"
                    style={{
                      transform:
                        hoveredProject === projects[currentIndex].id
                          ? "rotateX(2deg) rotateY(-2deg) translateY(-10px)"
                          : "rotateX(0deg) rotateY(0deg) translateY(0px)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-neutral-900 shadow-2xl border-2 border-white/30 shadow-white/20 ring-2 ring-white/10 ring-offset-4 ring-offset-black">
                      {/* Project Image - Full card */}
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={projects[currentIndex].image || "/placeholder.svg"}
                          alt={projects[currentIndex].imageAlt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          quality={100}
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Inner glow effect */}
                        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(255,255,255,0.1)] pointer-events-none" />

                        {/* Project info overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {projects[currentIndex].tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-xs font-medium border border-white/20 font-inter"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-inter">
                            {projects[currentIndex].title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-white/80 leading-relaxed mb-4 font-inter">
                            {projects[currentIndex].description}
                          </p>

                          {/* View Case Study Link */}
                          <button
                            className={`inline-flex items-center gap-2 text-white font-semibold transition-all duration-300 font-inter ${
                              hoveredProject === projects[currentIndex].id ? "gap-4" : "gap-2"
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
                        opacity: hoveredProject === projects[currentIndex].id ? 0.6 : 0.3,
                        transform: "translateZ(-50px) scale(0.95)",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(-1)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
            aria-label="Next project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
