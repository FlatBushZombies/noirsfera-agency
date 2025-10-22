"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const avatarsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(badgeRef.current, { opacity: 0, y: 20, duration: 0.8, delay: 0.1 })
        .from(headingRef.current, { opacity: 0, y: 50, duration: 1 }, "-=0.5")
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
    setIsHovered(true)
    gsap.to(e.currentTarget, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false)
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleTelegramClick = () => {
    window.open("https://t.me/yourusername", "_blank")
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
            <div ref={badgeRef} className="flex justify-center mb-6">
              <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-500">Available for New projects</span>
              </div>
            </div>

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
              size="default"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleTelegramClick}
              className="relative bg-white text-black hover:bg-white/95 transition-all text-lg font-semibold px-6 py-6 h-auto rounded-full border-2 border-[#0EC8F3] shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="flex items-center gap-3">
                {/* Profile image - only visible on hover */}
                <div
                  className={`relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#0EC8F3] transition-all duration-300 ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                >
                  <Image src="/lackson.jpg" alt="Profile" fill className="object-cover" />
                </div>

                {/* Text content */}
                <div className="flex items-center gap-2">
                  <span className="transition-all duration-300">{isHovered ? "Let's go" : "Connect to Telegram"}</span>
                  {isHovered && <span className="text-muted-foreground">• You</span>}
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
