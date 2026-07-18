"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"

interface Testimonial {
  id: number
  name: string
  company: string
  image: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Yulia",
    company: "tutschool.ru",
    image: "/Yulia.jpg",
    rating: 5,
    text: "I contacted the company noirsfera with a request to create a website for a language studio. The team asked many questions to take all my wishes into account. The result was a stylish and modern website — I'm very happy with the collaboration and grateful for the excellent result!",
  },
  {
    id: 2,
    name: "Andrey",
    company: "from profi.ru",
    image: "/profi.jpg",
    rating: 5,
    text: "The freelancer did an excellent job with our project. Communication was transparent, deadlines were met, and the final product exceeded expectations. Great performance and seamless integration with Firebase — highly recommend!",
  },
  {
    id: 3,
    name: "Anih",
    company: "from profi.ru",
    image: "/profi.jpg",
    rating: 5,
    text: "Excellent specialist! Quickly and efficiently developed new functionality, optimized the code, and suggested useful improvements. Everything was done on time, highly recommend!",
  },
  {
    id: 4,
    name: "Nathan",
    company: "from profi.ru",
    image: "/profi.jpg",
    rating: 5,
    text: "A pleasure to work with — professional, fast, and communicative. Delivered everything as promised and exceeded expectations!",
  },
]

export function Testimonials() {
  const { language } = useLanguage()
  const t = getTranslations(language)

  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const controls = useAnimationControls()

  // Measure the first half (one set of cards) to get the scroll distance
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      const children = Array.from(trackRef.current.children) as HTMLElement[]
      const half = Math.floor(children.length / 2)
      const total = children.slice(0, half).reduce((acc, el) => {
        const style = getComputedStyle(el)
        return acc + el.offsetWidth + parseInt(style.marginRight || "0")
      }, 0)
      setTrackWidth(total)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Drive the animation via controls so we can truly pause/resume
  useEffect(() => {
    if (trackWidth === 0) return
    if (isPaused) {
      controls.stop()
    } else {
      controls.start({
        x: -trackWidth,
        transition: { duration: 45, ease: "linear", repeat: Infinity, repeatType: "loop" },
      })
    }
  }, [trackWidth, isPaused, controls])

  return (
    <section id="testimonials" className="relative pt-12 md:pt-16 pb-10 md:pb-20 bg-background overflow-hidden">
      {/* Ambient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-18"
        >
          <p className="eyebrow-label mb-4">
            {t.testimonials.badge}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-display leading-tight tracking-tight text-balance">
            {t.testimonials.heading}
          </h2>
        </motion.div>
      </div>

      {/* ── Infinite scroll track ── */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade masks */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={trackRef}
          animate={controls}
          className="flex gap-5 md:gap-6 py-4 w-max"
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <TestimonialCard key={`${item.id}-${index}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative flex-shrink-0 w-[82vw] sm:w-[360px] md:w-[380px] cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: hovered ? -6 : 0,
        scale: hovered ? 1.02 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
    >
      {/* Glass card */}
      <div
        className={`
          relative h-full flex flex-col p-6 md:p-7 rounded-3xl overflow-hidden
          bg-white/[0.04] backdrop-blur-[24px]
          border transition-all duration-500
          ${hovered ? "border-primary/40 shadow-[0_12px_48px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,217,255,0.15)]" : "border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"}
        `}
      >
        {/* Top-edge glass highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Primary glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent transition-opacity duration-500 pointer-events-none rounded-3xl ${hovered ? "opacity-100" : "opacity-0"}`}
        />

        {/* Stars */}
        <div className="flex gap-1 mb-4 relative z-10">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
          ))}
        </div>

        {/* Opening quote glyph */}
        <div className="absolute top-5 right-6 text-5xl font-black text-white/[0.04] leading-none select-none pointer-events-none font-display">
          ❝
        </div>

        {/* Quote text */}
        <p className="text-sm md:text-base leading-relaxed text-text-secondary flex-1 relative z-10 mb-6">
          {item.text}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/[0.06] to-transparent mb-5 relative z-10" />

        {/* Author row */}
        <div className="flex items-center gap-3 relative z-10">
          {/* Avatar with ring */}
          <div className="relative flex-shrink-0">
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 ${hovered ? "border-primary/50" : "border-white/15"}`}>
              <Image
                src={item.image || "/placeholder.svg"}
                alt={`${item.name} avatar`}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online-style glow dot */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary/80 border-2 border-background shadow-[0_0_6px_rgba(0,217,255,0.6)]" />
          </div>

          <div>
            <p className={`font-bold text-sm transition-colors duration-300 ${hovered ? "text-primary" : "text-foreground"}`}>
              {item.name}
            </p>
            <p className="text-xs text-text-secondary/70 font-medium tracking-wide">
              {item.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}