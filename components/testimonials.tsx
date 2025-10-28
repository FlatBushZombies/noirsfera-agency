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
    text: "I contacted the company noirsfera with a request to create a website for a language studio. The team asked many questions to take all my wishes into account. The result was a stylish and modern website — I’m very happy with the collaboration and grateful for the excellent result!",
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
    <section
      id="testimonials"
      ref={sectionRef}
      className="pt-6 md:pt-10 pb-10 md:pb-20 bg-background font-inter overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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
            People we’ve worked with have said some nice things…
          </h2>
        </motion.div>

        {/* Infinite Scroll Section */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 45, // ⬅️ slower scroll speed
                ease: "linear",
              },
            }}
          >
            {/* Double testimonials for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="group relative flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px]"
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  animate={{
                    y: hoveredCard === testimonial.id ? -6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col border border-border hover:border-[#0EC8F3] transition-all duration-300">
                    <CardContent className="p-5 md:p-6 space-y-4 flex flex-col h-full">
                      {/* Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#0EC8F3] text-[#0EC8F3]"
                          />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-sm md:text-base leading-relaxed text-[#0000007D]">
                        “{testimonial.text}”
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-3 border-t border-border mt-auto">
                        <Image
                          src={testimonial.image}
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
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
