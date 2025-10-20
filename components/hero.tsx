"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye } from "lucide-react"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const avatarsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
      })
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          avatarsRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          buttonsRef.current?.children || [],
          {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.6,
          },
          "-=0.3",
        )

      gsap.to(avatarsRef.current, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background pt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Heading */}
          <div className="space-y-6">
            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance"
            >
              Modernising business through <span className="text-[#0EC8F3]">futuristic</span> software
            </h1>
          </div>

          {/* Description with avatars */}
          <div ref={avatarsRef} className="flex flex-col items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0EC8F3] to-[#0EA5C8] border-2 border-background"
                />
              ))}
            </div>
            <p ref={descriptionRef} className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl">
              Building Digital Experiences that moves Brands Forward
            </p>
          </div>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            <Button
              size="lg"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="bg-black text-white hover:bg-black/90 border-2 border-[#0EC8F3] hover:border-[#0EC8F3]/80 transition-all group text-xl font-semibold px-12 py-8 h-auto rounded-full shadow-lg shadow-[#0EC8F3]/20"
            >
              Get Feedback
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="border-2 border-foreground hover:bg-foreground hover:text-background transition-all group bg-transparent text-xl font-semibold px-12 py-8 h-auto rounded-full"
            >
              <Eye className="mr-3 h-6 w-6" />
              See our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
