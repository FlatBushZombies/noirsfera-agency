"use client"

import { useState, useRef, useEffect, useState as useReactState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

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
    text: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
  },
  {
    id: 2,
    name: "Alex Thompson",
    company: "techstartup.io",
    image: "/professional-man.jpg",
    rating: 5,
    text: "The attention to detail and modern approach transformed our digital presence completely. Highly recommended!",
  },
  {
    id: 3,
    name: "Sarah Chen",
    company: "designco.com",
    image: "/professional-woman-smiling.png",
    rating: 5,
    text: "Working with this team was seamless. They understood our vision and delivered beyond expectations.",
  },
]

export function Testimonials() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef(null)

  // ✅ Detect mobile safely
  const [isMobile, setIsMobile] = useReactState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

  // ✅ Fixed intersection observer for mobile
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1, // earlier trigger
  })

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#0EC8F3] text-sm font-semibold uppercase tracking-wider mb-4">
            Client Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4 max-w-2xl mx-auto">
            People we've worked with have said some nice things….
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                perspective: "1000px",
              }}
              initial={{
                opacity: 0,
                x: index === 0 ? 200 : index === 2 ? -200 : 0,
                y: index === 1 ? 100 : 0,
                scale: 0.8,
              }}
              animate={
                isInView || isMobile
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotate: index === 1 ? [0, -2, 2, -2, 2, 0] : 0,
                    }
                  : {
                      opacity: 0,
                      x: index === 0 ? 200 : index === 2 ? -200 : 0,
                      y: index === 1 ? 100 : 0,
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
              <div
                className="relative transition-all duration-700 ease-out"
                style={{
                  transform:
                    hoveredCard === testimonial.id
                      ? "rotateX(2deg) rotateY(-2deg) translateY(-10px)"
                      : "rotateX(0deg) rotateY(0deg) translateY(0px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <Card className="h-full border-2 border-border hover:border-[#0EC8F3] transition-all duration-300 group">
                  <CardContent className="p-6 md:p-8 space-y-6">
                    {/* Rating */}
                    <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#0EC8F3] text-[#0EC8F3]" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-foreground/90 leading-relaxed">"{testimonial.text}"</p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-[#0EC8F3] transition-colors">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div
                  className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-[#0EC8F3]/10 to-transparent blur-2xl transition-opacity duration-700"
                  style={{
                    opacity: hoveredCard === testimonial.id ? 0.6 : 0.3,
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
