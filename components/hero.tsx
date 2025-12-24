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
          "-=0.3",
        )

      tl.from(curlyRef.current, { opacity: 0, scale: 0.8, duration: 1.2, ease: "back.out(1.7)" }, "-=1")

      gsap.to(avatarsRef.current, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(curlyRef.current, {
        y: -15,
        x: 10,
        rotation: 5,
        duration: 4,
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

  const words = ["businesses", "startups", "brands"]

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-surface pt-2"
    >
      <div
        ref={curlyRef}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] pointer-events-none opacity-60 blur-sm"
        style={{ transform: "translate(20%, -10%)" }}
      >
        <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="curlyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <path
            d="M 450 50 Q 400 100 420 150 Q 440 200 380 230 Q 320 260 340 320 Q 360 380 280 400 Q 200 420 220 490"
            stroke="url(#curlyGradient1)"
            strokeWidth="85"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-[0_0_40px_rgba(0,217,255,0.3)]"
          />
        </svg>
      </div>

      <div className="absolute top-24 right-1/4 w-[400px] h-[400px] bg-primary/12 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div
        className="absolute bottom-24 left-1/4 w-[350px] h-[350px] bg-primary/8 rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-8">
            <div ref={badgeRef} className="flex justify-center">
              <div className="relative inline-flex items-center gap-3 px-5 py-3 rounded-full liquid-glass-card overflow-hidden shadow-lg">
                <span className="liquid-noise rounded-full" />
                <span className="relative flex h-3 w-3 z-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 shadow-sm" />
                </span>
                <span className="text-sm font-bold text-foreground font-sans z-10 tracking-wide">
                  {t.hero.availableBadge}
                </span>
              </div>
            </div>

            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.08] text-balance font-display"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            >
              {t.hero.heading.modernising}
              <FlipWords words={t.hero.heading.words} duration={500} letterDelay={0.05} wordDelay={0.3} />
              {t.hero.heading.through} <span className="text-primary">{t.hero.heading.futuristic}</span>{" "}
              {t.hero.heading.software}
            </h1>
          </div>

          <div ref={avatarsRef} className="flex flex-col items-center gap-6">
            <div className="relative liquid-glass-card rounded-full p-4 overflow-hidden shadow-xl">
              <span className="liquid-noise rounded-full" />
              <div className="flex -space-x-5 relative z-10">
                <div className="w-16 h-16 rounded-full border-3 border-white overflow-hidden relative shadow-lg ring-4 ring-primary/15">
                  <Image src="/avatar-1.png" alt="Client avatar 1" fill className="object-cover" />
                </div>
                <div className="w-16 h-16 rounded-full border-3 border-white overflow-hidden relative shadow-lg ring-4 ring-primary/15">
                  <Image src="/avatar-2.jpg" alt="Client avatar 2" fill className="object-cover" />
                </div>
                <div className="w-16 h-16 rounded-full border-3 border-white overflow-hidden relative shadow-lg ring-4 ring-primary/15">
                  <Image src="/avatar-3.jpg" alt="Client avatar 3" fill className="object-cover" />
                </div>
              </div>
            </div>
            <p
              ref={descriptionRef}
              className="text-foreground/80 md:text-xl lg:text-2xl max-w-2xl text-lg font-medium leading-relaxed"
            >
              {t.hero.description}
            </p>
          </div>
          <div ref={buttonsRef} className="flex justify-center items-center font-sans">
            <Button
              size="default"
              aria-label="Connect on Telegram"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleTelegramClick}
              className="bg-primary hover:bg-[#00C7E6] transition-all text-lg font-bold px-8 py-4 h-auto rounded-full shadow-lg hover:shadow-2xl text-white border-0"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-light font-sans">
                  <Image src="/profiles/lackson.jpg" alt="Profile" fill className="object-cover" />
                </div>
                <span
                  className={`transition-all duration-300 
                    ${isHovered ? "opacity-0 scale-95 max-w-0" : "opacity-100 scale-100 max-w-[200px]"}
                  `}
                >
                  {t.hero.connectTelegram}
                </span>
                <div
                  className={`flex items-center gap-2 transition-all duration-300 overflow-hidden
                    ${isHovered ? "opacity-100 scale-100 max-w-[200px]" : "opacity-0 scale-95 max-w-0"}
                  `}
                >
                  <span className="text-primary-light">{t.hero.youLetsChat}</span>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
