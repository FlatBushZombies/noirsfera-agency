"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const avatarsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(headingRef.current, { opacity: 0, y: 50, duration: 1, delay: 0.3 })
        .from(descriptionRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
        .from(avatarsRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .fromTo(
          Array.from(buttonsRef.current?.children || []),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 },
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
      scale: 1.02,
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
          <div className="space-y-6">
            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance"
            >
              Modernising businesses through <span className="text-[#0EC8F3]">futuristic</span> software
            </h1>
          </div>

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

          <div ref={buttonsRef} className="flex justify-center items-center pt-6">
            <Button
              size="lg"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="relative bg-[#0EC8F3] text-black hover:bg-[#0EC8F3]/90 transition-all text-lg font-semibold px-10 py-6 h-auto rounded-lg shadow-[0_0_20px_rgba(14,200,243,0.5)] hover:shadow-[0_0_30px_rgba(14,200,243,0.7)]"
            >
              Connect on Telegram
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}