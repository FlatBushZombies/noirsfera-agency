"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef(null)

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 md:py-28 lg:py-36 bg-background font-sans">
      <div className="container w-screen px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <p className="text-sm md:text-base font-semibold text-primary uppercase tracking-widest mb-4">Social Proof</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground text-balance font-display leading-tight">
          </h2>
          <p className="text-lg text-text-secondary font-medium mt-6">
            People we've worked with have said some nice things…
          </p>
        </motion.div>

        {/* Infinite Scroll Section */}
        <div className="relative w-full overflow-hidden pt-4">
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 45,
                ease: "linear",
              },
            }}
          >
            {/* Double testimonials for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="group relative flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px]"
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  animate={{
                    y: hoveredCard === testimonial.id ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col border-2 border-border hover:border-primary/40 bg-white hover:shadow-xl transition-all duration-300 rounded-2xl">
                    <CardContent className="p-6 md:p-7 space-y-5 flex flex-col h-full">
                      {/* Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-sm md:text-base leading-relaxed text-text-secondary flex-1">
                        "{testimonial.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20"
                        />
                        <div>
                          <p className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-text-muted">{testimonial.company}</p>
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
