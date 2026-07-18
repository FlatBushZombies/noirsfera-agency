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
  const [isButtonHovered, setIsButtonHovered] = useState(false)

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
    setIsButtonHovered(true)
    gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3, ease: "power2.out" })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsButtonHovered(false)
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" })
  }

  const handleTelegramClick = () => {
    window.open("https://t.me/itsslucki", "_blank")
  }

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-surface"
    >
      {/* Premium Liquid Background Blobs */}
      <div className="absolute top-16 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] bg-gradient-to-tr from-primary/30 via-primary/15 to-transparent animate-liquid pointer-events-none" />
      <div
        className="absolute bottom-16 left-1/4 w-80 h-80 rounded-full opacity-25 blur-[100px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent animate-liquid pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      {/* Curly Liquid Shape — uses currentColor via CSS var so it respects the theme */}
      <div
        ref={curlyRef}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] pointer-events-none opacity-50 blur-[0.5px]"
        style={{ transform: "translate(20%, -10%)" }}
      >
        <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="curlyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary, #00D9FF)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="var(--color-primary, #00D9FF)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-primary, #00D9FF)" stopOpacity="0.2" />
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* ── Badge ── */}
          <div ref={badgeRef} className="flex justify-center mb-8">
            <div className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-[32px] hover:bg-white/15 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_64px_rgba(0,0,0,0.15)] cursor-default">
              {/* Top highlight */}
              <div className="absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 shadow-lg shadow-green-400/50" />
              </span>
              <span className="text-sm font-semibold text-green-500 tracking-wide">{t.hero.availableBadge}</span>
            </div>
          </div>

          {/* ── Heading ── */}
          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight text-balance font-display mb-8"
          >
            {t.hero.heading.modernising}
            <FlipWords words={t.hero.heading.words} duration={500} letterDelay={0.05} wordDelay={0.3} />
            {t.hero.heading.through}{" "}
            <span className="text-primary relative">
              {t.hero.heading.futuristic}
              {/* Subtle glow under the accent word */}
              <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </span>{" "}
            {t.hero.heading.software}
          </h1>

          {/* ── Description ── */}
          <p
            ref={descriptionRef}
            className="text-text-secondary md:text-lg lg:text-xl max-w-2xl mx-auto text-base font-medium leading-relaxed mb-12"
          >
            {t.hero.description}
          </p>

          {/* ── Avatars ── */}
          <div ref={avatarsRef} className="flex justify-center mb-12">
            <div className="flex -space-x-3">
              {[
                { src: "/avatar-1.png", alt: "Client avatar 1" },
                { src: "/avatar-2.jpg", alt: "Client avatar 2" },
                { src: "/avatar-3.jpg", alt: "Client avatar 3" },
              ].map((avatar, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-[2.5px] border-background overflow-hidden relative shadow-[0_4px_16px_rgba(0,0,0,0.2)] ring-1 ring-white/20"
                  style={{ zIndex: 3 - i }}
                >
                  <Image src={avatar.src || "/placeholder.svg"} alt={avatar.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA Buttons ── */}
          <div ref={buttonsRef} className="flex justify-center items-center gap-4">
            <Button
              size="default"
              aria-label="Connect on Telegram"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleTelegramClick}
              className="btn-cta-primary relative group cursor-pointer backdrop-blur-[32px] text-base px-8 py-4 h-auto rounded-full overflow-hidden"
            >
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 pointer-events-none" />

              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />

              {/* Top edge highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10">
                {/* Label — fades out on hover */}
                <span
                  className="transition-all duration-300 font-bold leading-none"
                  style={{
                    opacity: isButtonHovered ? 0 : 1,
                    transform: isButtonHovered ? "translateX(-6px)" : "translateX(0)",
                    maxWidth: isButtonHovered ? 0 : 200,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.hero.connectTelegram}
                </span>

                {/* Hover state — profile + text */}
                <div
                  className="flex items-center gap-2 transition-all duration-300 flex-nowrap"
                  style={{
                    opacity: isButtonHovered ? 1 : 0,
                    transform: isButtonHovered ? "translateX(0)" : "translateX(6px)",
                    maxWidth: isButtonHovered ? 200 : 0,
                    overflow: "hidden",
                  }}
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-white/30 flex-shrink-0 shadow-sm">
                    <Image
                      src="/profiles/lackson.jpg"
                      alt="Your profile"
                      width={28}
                      height={28}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-white/90 font-semibold whitespace-nowrap text-sm">{t.hero.youLetsChat}</span>
                </div>

                {/* Arrow icon */}
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors duration-300">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}