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
    <section id="testimonials" className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Ambient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-primary/[0.08] blur-[120px] pointer-events-none" />

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
          <h2 className="section-heading">
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
      className="relative flex-shrink-0 w-[82vw] sm:w-[360px] md:w-[400px] cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered ? -6 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`
          relative h-full flex flex-col p-6 md:p-7 rounded-2xl obsidian-card
          border transition-all duration-500
          ${hovered
            ? "border-white/[0.12]"
            : "border-white/[0.07]"}
        `}
        style={{
          backgroundColor: "#0d0d0d",
          backgroundImage: [
            "radial-gradient(280px circle at var(--cursor-x, 50%) var(--cursor-y, -10%), rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.007) 50%, transparent 72%)",
            "repeating-linear-gradient(45deg, transparent 0px, transparent 3px, rgba(255,255,255,0.009) 3px, rgba(255,255,255,0.009) 4px)",
            "repeating-linear-gradient(-45deg, transparent 0px, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)",
          ].join(","),
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty("--cursor-x", `${((e.clientX - rect.left) / rect.width) * 100}%`)
          e.currentTarget.style.setProperty("--cursor-y", `${((e.clientY - rect.top) / rect.height) * 100}%`)
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.setProperty("--cursor-x", "50%")
          e.currentTarget.style.setProperty("--cursor-y", "-10%")
        }}
      >
        {/* Subtle cyan glow on hover */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.04] to-transparent pointer-events-none transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
        />

        {/* ── Author row — top, social-proof style ── */}
        <div className="flex items-center gap-3.5 relative z-10 mb-5">
          <div className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 transition-colors duration-300 ${hovered ? "border-primary/30" : "border-white/[0.08]"}`}>
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[15px] text-foreground leading-tight truncate">
              {item.name}
            </p>
            <p className="text-sm text-text-secondary/65 font-medium mt-0.5 truncate">
              {item.company}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.07] mb-5 relative z-10" />

        {/* Stars */}
        <div className="flex gap-0.5 mb-3 relative z-10">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
          ))}
        </div>

        {/* Quote text */}
        <p className="text-sm md:text-[15px] leading-relaxed text-text-secondary relative z-10">
          {item.text}
        </p>
      </div>
    </motion.div>
  )
}