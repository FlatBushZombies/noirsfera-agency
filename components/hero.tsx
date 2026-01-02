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

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden mt-8 bg-gradient-to-b from-background via-background to-surface pt-2"
    >
      {/* Premium Liquid Background Blobs */}
      <div className="absolute top-16 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] bg-gradient-to-tr from-primary/30 via-primary/15 to-transparent animate-liquid"></div>
      <div
        className="absolute bottom-16 left-1/4 w-80 h-80 rounded-full opacity-25 blur-[100px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent animate-liquid"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Curly Liquid Shape */}
      <div
        ref={curlyRef}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] pointer-events-none opacity-50 blur-[0.5px]"
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Premium Glass Badge */}
          <div ref={badgeRef} className="flex justify-center">
            <div className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-[32px] hover:bg-white/15 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_64px_rgba(0,0,0,0.15)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 shadow-lg shadow-green-400/50"></span>
              </span>
              <span className="text-sm font-semibold text-green-500 font-sans">{t.hero.availableBadge}</span>
            </div>
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-balance font-display drop-shadow-sm"
          >
            {t.hero.heading.modernising}
            <FlipWords words={t.hero.heading.words} duration={500} letterDelay={0.05} wordDelay={0.3} />
            {t.hero.heading.through} <span className="text-primary">{t.hero.heading.futuristic}</span>{" "}
            {t.hero.heading.software}
          </h1>

          {/* Avatars */}
          <div ref={avatarsRef} className="flex flex-col items-center gap-4">
            <div className="flex -space-x-4">
              {[
                { src: "/avatar-1.png", alt: "Client avatar 1" },
                { src: "/avatar-2.jpg", alt: "Client avatar 2" },
                { src: "/avatar-3.jpg", alt: "Client avatar 3" },
              ].map((avatar, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-full border-2 border-white/25 overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.1)] ring-4 ring-white/20 backdrop-blur-[28px]"
                >
                  <Image src={avatar.src || "/placeholder.svg"} alt={avatar.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
            <p
              ref={descriptionRef}
              className="text-text-secondary md:text-lg lg:text-xl max-w-2xl text-base font-medium leading-relaxed"
            >
              {t.hero.description}
            </p>
          </div>

          {/* Buttons */}
          <div ref={buttonsRef} className="flex justify-center items-center gap-4 font-sans">
            <Button
              size="default"
              aria-label="Connect on Telegram"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleTelegramClick}
              className="relative group bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400 backdrop-blur-[32px] transition-all text-lg font-bold px-8 py-3 h-auto rounded-full shadow-[0_0_40px_rgba(59,130,246,0.5),0_0_80px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7),0_0_100px_rgba(59,130,246,0.4)] text-white border-0 overflow-hidden"
            >
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

              <div className="flex items-center gap-3 relative z-10">
                <span
                  className={`transition-all duration-300 font-bold
                    ${isHovered ? "opacity-0 scale-95 max-w-0" : "opacity-100 scale-100 max-w-[200px]"}
                  `}
                >
                  {t.hero.connectTelegram}
                </span>

                <div
  className={`flex items-center gap-2 transition-all duration-300 flex-nowrap
    ${isHovered ? "opacity-100 scale-100 max-w-[200px]" : "opacity-0 scale-95 max-w-0"}
  `}
>
  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 flex-shrink-0">
    <Image
      src="/profiles/lackson.jpg"
      alt="Your profile"
      width={32}
      height={32}
      className="object-cover"
    />
  </div>
  <span className="text-white/90 font-semibold whitespace-nowrap">{t.hero.youLetsChat}</span>
</div>


                {/* Blue circular icon with enhanced styling */}
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 relative overflow-hidden group-hover:bg-white/30 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
