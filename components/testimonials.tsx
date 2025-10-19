"use client"

import { motion, Variants, easeOut } from "framer-motion"
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
    image: "/professional-woman-diverse.png",
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut, // ✅ properly typed easing
    },
  },
}

export function Testimonials() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
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
            Real feedback from satisfied clients who trusted us with their digital transformation
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={cardVariants} whileHover={{ scale: 1.02 }}>
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
                      src={testimonial.image}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
