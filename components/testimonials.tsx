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
    text: "I contacted the company noirsfera with a request to create a website for a language studio. First, we discussed the technical requirements. The team asked many questions to take all my wishes into account. In the end, I really liked the result — a stylish and modern website with all the necessary information and the ability to post promotions on built-in banners. I’m very happy with the collaboration and grateful for the excellent result!",
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
  const [isMobile, setIsMobile] = useReactState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="pt-4 md:pt-6 pb-6 md:pb-16 bg-background font-inter"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-[#0EC8F3] text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3">
            Client Testimonials
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-balance mb-2 max-w-2xl mx-auto">
            People we've worked with have said some nice things…
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group relative h-full"
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ perspective: "1000px" }}
              initial={{
                opacity: 0,
                x: index === 0 ? 200 : index === 2 ? -200 : 0,
                y: index === 1 ? 100 : 0,
                scale: 0.9,
              }}
              animate={
                isInView || isMobile
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div
                className="relative transition-all duration-500 ease-out h-full"
                style={{
                  transform:
                    hoveredCard === testimonial.id
                      ? "translateY(-6px)"
                      : "translateY(0)",
                }}
              >
                <Card className="h-full flex flex-col border border-border hover:border-[#0EC8F3] transition-all duration-300">
                  <CardContent className="p-5 md:p-6 space-y-4 flex flex-col h-full">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#0EC8F3] text-[#0EC8F3]" />
                      ))}
                    </div>

                    <p className="text-sm md:text-base leading-relaxed text-[#0000007D]">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-border mt-auto">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={44}
                        height={44}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-[#0EC8F3] transition-colors">
                          {testimonial.name}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
