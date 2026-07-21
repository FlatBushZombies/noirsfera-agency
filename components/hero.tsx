"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useMotionValue, useSpring } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)
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
  const sphereRef = useRef<HTMLDivElement>(null)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  // Spring-based mouse parallax for the curly shape
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 15, mass: 1.5 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15, mass: 1.5 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(badgeRef.current, { opacity: 0, y: 24, duration: 0.8, delay: 0.15 })
        .from(headingRef.current, { opacity: 0, y: 56, duration: 1.1 }, "-=0.45")
        .from(descriptionRef.current, { opacity: 0, y: 32, duration: 0.85 }, "-=0.5")
        .fromTo(
          Array.from(buttonsRef.current?.children || []),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.14, duration: 0.65 },
          "-=0.4",
        )
        .from(avatarsRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.25")

      tl.from(curlyRef.current, { opacity: 0, scale: 0.82, duration: 1.4, ease: "back.out(1.7)" }, "-=1.2")

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

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && sphereRef.current) {
        const sphere = sphereRef.current

        gsap.to(sphere, {
          y: -22,
          duration: 6.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        gsap.to(sphere, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        })

        const ring1 = sphere.querySelector(".orbital-ring-1")
        const ring2 = sphere.querySelector(".orbital-ring-2")
        if (ring1) {
          gsap.set(ring1, { rotateX: 74, rotateZ: -20 })
          gsap.to(ring1, { rotateZ: 340, duration: 28, repeat: -1, ease: "none" })
        }
        if (ring2) {
          gsap.set(ring2, { rotateX: 62, rotateZ: 35 })
          gsap.to(ring2, { rotateZ: -325, duration: 44, repeat: -1, ease: "none" })
        }

        const corona = sphere.querySelector(":scope > div:first-child") as HTMLElement | null
        if (corona) {
          gsap.to(corona, {
            scale: 1.14,
            opacity: 0.6,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1,
          })
        }
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    gsap.to(btn, { x: dx * 0.22, y: dy * 0.22, duration: 0.3, ease: "power2.out", overwrite: "auto" })
  }

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsButtonHovered(true)
    gsap.to(e.currentTarget, { scale: 1.03, duration: 0.3, ease: "power2.out" })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsButtonHovered(false)
    gsap.to(e.currentTarget, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" })
  }

  const handleTelegramClick = () => {
    window.open("https://t.me/itsslucki", "_blank")
  }

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - (rect.left + rect.width / 2)) * 0.06)
    mouseY.set((e.clientY - (rect.top + rect.height / 2)) * 0.06)
  }

  return (
    <section
      id="about"
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      className="relative min-h-screen flex flex-col overflow-hidden bg-background"
    >
      {/* ── Cinematic background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary key light — top-center halo */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[70vh] opacity-30 blur-[160px] rounded-full"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,217,255,0.20) 0%, rgba(0,217,255,0.06) 55%, transparent 75%)" }}
        />
        {/* Secondary fill — bottom atmospheric */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] opacity-15 blur-[100px] rounded-full"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,217,255,0.10) 0%, transparent 70%)" }}
        />
        {/* Vignette — pulls edges dark, centers attention */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
        />
      </div>

      {/* ── Curly liquid shape — mouse-reactive background element ── */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-1/4 right-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          ref={curlyRef}
          className="w-[600px] h-[600px] pointer-events-none opacity-[0.26] blur-[0.5px]"
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
      </motion.div>

      {/* ── Noirsfera Sphere — centered background anchor ── */}
      <div
        ref={sphereRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <div className="relative w-[580px] h-[580px]">
          {/* Outer ambient corona */}
          <div className="absolute inset-0 rounded-full bg-primary/[0.05] blur-[90px]" />
          <div className="absolute inset-[40px] rounded-full bg-primary/[0.04] blur-[60px]" />
          {/* The sphere — polished obsidian shell */}
          <div
            className="absolute inset-[80px] rounded-full"
            style={{
              background: [
                "radial-gradient(circle at 36% 28%, rgba(255,255,255,0.09) 0%, transparent 11%)",
                "radial-gradient(circle at 33% 30%, rgba(0,217,255,0.18) 0%, rgba(0,217,255,0.08) 30%, rgba(8,8,8,0.97) 62%, #030303 100%)",
              ].join(","),
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,0.10)",
                "inset 0 -1px 0 rgba(0,0,0,0.8)",
                "inset 0 0 80px rgba(0,217,255,0.06)",
                "inset 0 0 160px rgba(0,0,0,0.7)",
                "0 0 120px rgba(0,217,255,0.05)",
                "0 40px 120px rgba(0,0,0,0.95)",
              ].join(","),
            }}
          />
          {/* Specular highlight — point light source top-left */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: "84px",
              left: "92px",
              right: "160px",
              bottom: "260px",
              background: "radial-gradient(ellipse at 38% 28%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 35%, transparent 68%)",
              borderRadius: "50%",
            }}
          />
          {/* Orbital ring 1 */}
          <div
            className="orbital-ring-1 absolute inset-[58px] rounded-full"
            style={{
              transform: "rotateX(74deg) rotateZ(-20deg)",
              border: "1px solid rgba(0,217,255,0.13)",
              boxShadow: "0 0 6px rgba(0,217,255,0.08), inset 0 0 6px rgba(0,217,255,0.04)",
            }}
          />
          {/* Orbital ring 2 */}
          <div
            className="orbital-ring-2 absolute inset-[92px] rounded-full border border-white/[0.06]"
            style={{ transform: "rotateX(62deg) rotateZ(35deg)" }}
          />
        </div>
      </div>

      {/* ── Centered hero content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 sm:px-10 lg:px-16 pt-28 md:pt-32 pb-24 text-center">

        {/* Content block — centered, max-width for readability */}
        <div className="w-full max-w-4xl mx-auto">

          {/* Level 1 — Status indicator */}
          <div ref={badgeRef} className="flex justify-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl hover:bg-white/[0.09] hover:border-primary/30 transition-all duration-300 cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 shadow-lg shadow-green-400/50" />
              </span>
              <span className="text-sm font-semibold text-green-500 tracking-[0.06em]">{t.hero.availableBadge}</span>
            </div>
          </div>

          {/* Level 2 — Massive editorial headline */}
          <h1 ref={headingRef} className="hero-heading mb-8 md:mb-10">
            {t.hero.heading.modernising}
            <FlipWords words={t.hero.heading.words} duration={500} letterDelay={0.05} wordDelay={0.3} />
            {t.hero.heading.through}{" "}
            <span className="text-primary relative">
              {t.hero.heading.futuristic}
              <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </span>{" "}
            {t.hero.heading.software}
          </h1>

          {/* Level 3 — Supporting description */}
          <p
            ref={descriptionRef}
            className="text-base md:text-lg leading-relaxed text-text-secondary max-w-[52ch] mx-auto mb-10 md:mb-12 font-medium"
          >
            {t.hero.description}
          </p>

          {/* Level 4 — Primary actions */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-14">
            {/* Primary CTA */}
            <Button
              size="default"
              aria-label="Connect on Telegram"
              onMouseMove={handleButtonMove}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleTelegramClick}
              className="btn-cta-primary relative group cursor-pointer backdrop-blur-[32px] text-base px-8 py-4 h-auto rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10">
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
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors duration-300">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Button>

            {/* Secondary CTA — text link */}
            <button
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors duration-200 text-base font-medium px-2 py-4"
            >
              <span>View work</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Level 5 — Trust indicators */}
          <div ref={avatarsRef} className="flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {[
                { src: "/avatar-1.png", alt: "Client avatar 1" },
                { src: "/avatar-2.jpg", alt: "Client avatar 2" },
                { src: "/avatar-3.jpg", alt: "Client avatar 3" },
              ].map((avatar, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-[2.5px] border-background overflow-hidden relative shadow-[0_4px_16px_rgba(0,0,0,0.2)] ring-1 ring-white/20"
                  style={{ zIndex: 3 - i }}
                >
                  <Image src={avatar.src || "/placeholder.svg"} alt={avatar.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm text-text-secondary font-medium">
              Trusted by 10+ clients
            </p>
          </div>

        </div>
      </div>

    </section>
  )
}
