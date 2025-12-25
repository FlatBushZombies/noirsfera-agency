"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { FlipWords } from "./ui/shadcn-io/flip-words"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"
import Image from "next/image"

export function Hero() {
  const { language } = useLanguage()
  const t = getTranslations(language)

  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const avatarsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const curlyRef = useRef<HTMLDivElement>(null)

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
          "-=0.3"
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
    window.open("https://t.me/itsslucki", "_blank")
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-surface pt-2"
    >
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">

          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black"
          >
            {t.hero.heading.modernising}
            <FlipWords words={t.hero.heading.words} duration={500} />
            {t.hero.heading.through}{" "}
            <span className="text-primary">{t.hero.heading.futuristic}</span>{" "}
            {t.hero.heading.software}
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto"
          >
            {t.hero.description}
          </p>

          {/* CTA BUTTON — COLOR FIXED */}
          <div ref={buttonsRef} className="flex justify-center">
            <Button
              aria-label="Connect on Telegram"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleTelegramClick}
              className="
                relative flex items-center gap-4
                px-8 py-8
                rounded-full
                bg-[#00d9ff]
                hover:bg-[#00cbe8]
                shadow-[0_20px_40px_rgba(0,217,255,0.35)]
                text-white font-semibold text-lg
                transition-all duration-300
                overflow-hidden
              "
            >
              {/* PROFILE IMAGE */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                <Image
                  src="/profiles/lackson.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

              {/* TEXT SWAP */}
              <span
                className={`transition-all duration-300 whitespace-nowrap
                  ${isHovered ? "opacity-0 scale-95 max-w-0" : "opacity-100 scale-100 max-w-[220px]"}
                `}
              >
                {t.hero.connectTelegram}
              </span>

              <span
                className={`transition-all duration-300 whitespace-nowrap text-white/90
                  ${isHovered ? "opacity-100 scale-100 max-w-[220px]" : "opacity-0 scale-95 max-w-0"}
                `}
              >
                {t.hero.youLetsChat}
              </span>

              {/* ARROW */}
              <span
                className="
                  flex items-center justify-center
                  w-11 h-11 rounded-full
                  bg-white text-[#00d9ff]
                  shadow-md
                  flex-shrink-0
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
