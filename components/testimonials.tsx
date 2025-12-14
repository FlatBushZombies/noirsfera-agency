"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
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

  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Measure scroll width (half of duplicated content)
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const children = containerRef.current.children
      let total = 0

      for (let i = 0; i < children.length / 2; i++) {
        total += (children[i] as HTMLElement).offsetWidth
      }

      setWidth(total)
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return (
    <section
      id="testimonials"
      className="pt-12 md:pt-16 pb-10 md:pb-20 bg-background font-sans"
    >
      <div className="container w-screen px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-[#0EC8F3] text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3">
            {t.testimonials.badge}
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-balance mb-2 max-w-2xl mx-auto">
            {t.testimonials.heading}
          </h2>
        </motion.div>

        {/* Infinite Scroll */}
        <div className="relative w-full overflow-hidden pt-2">
          {/* Edge gradients – desktop only */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-background via-background/60 to-transparent z-10 pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-background via-background/60 to-transparent z-10 pointer-events-none" />

          <motion.div
            ref={containerRef}
            className="flex gap-4 md:gap-6"
            animate={{ x: -width }}
            transition={{
              duration: 45,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                className="group relative flex-shrink-0 w-[80%] sm:w-[45%] md:w-[360px]"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className="h-full"
                  animate={{
                    y: hovered === index ? -6 : 0,
                    scale: hovered === index ? 1.02 : 1,
                    rotateY: hovered === index ? 5 : 0,
                    rotateX: hovered === index ? 2 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col border border-border hover:border-[#0EC8F3] transition-all duration-300">
                    <CardContent className="p-5 md:p-6 space-y-4 flex flex-col h-full">
                      {/* Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#0EC8F3] text-[#0EC8F3]"
                          />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                        “{item.text}”
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-3 border-t border-border mt-auto">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={`${item.name} avatar`}
                          width={44}
                          height={44}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-[#0EC8F3] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {item.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
