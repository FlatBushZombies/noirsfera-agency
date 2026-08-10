"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMotionValue, useSpring } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)
import { Button } from "@/components/ui/button"
import { FlipWords } from "./ui/shadcn-io/flip-words"
import { HeroVisual } from "./hero-visual"
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
  const ribbonRef = useRef<HTMLDivElement>(null)
  const artifactRef = useRef<HTMLDivElement>(null)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  // Spring-based mouse parallax — two independent springs off the same
  // pointer position so the ribbon and artifact drift out of sync (depth cue).
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const ribbonX = useSpring(mouseX, { stiffness: 40, damping: 15, mass: 1.5 })
  const ribbonY = useSpring(mouseY, { stiffness: 40, damping: 15, mass: 1.5 })
  const artifactX = useSpring(mouseX, { stiffness: 22, damping: 24, mass: 2.4 })
  const artifactY = useSpring(mouseY, { stiffness: 22, damping: 24, mass: 2.4 })

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

      tl.from(ribbonRef.current, { opacity: 0, scale: 0.9, duration: 1.4, ease: "power3.out" }, "-=1.2")
      tl.from(artifactRef.current, { opacity: 0, scale: 0.92, y: 30, duration: 1.6, ease: "power3.out" }, "-=1.3")

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (!reduceMotion) {
        gsap.to(avatarsRef.current, {
          y: -8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        // Ribbon — slow, heavy drift. No fast spins.
        gsap.to(ribbonRef.current, {
          y: -20,
          x: 14,
          rotation: 3,
          duration: 13,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }

      if (!reduceMotion && artifactRef.current) {
        const artifact = artifactRef.current

        gsap.to(artifact, {
          y: -20,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        gsap.to(artifact, {
          rotation: 2.2,
          duration: 17,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        gsap.to(artifact, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        })

        // Slow specular gleam traveling across the polished surface
        const glint = artifact.querySelector(".artifact-glint")
        if (glint) {
          gsap.set(glint, { x: -90 })
          gsap.to(glint, { x: 90, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut" })
        }

        // Internal glow seam — the "crack of light" breathes
        const seamCore = artifact.querySelector(".artifact-seam-core")
        if (seamCore) {
          gsap.to(seamCore, { opacity: 0.95, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" })
        }

        const corona = artifact.querySelector(".artifact-corona")
        if (corona) {
          gsap.to(corona, {
            scale: 1.12,
            opacity: 0.65,
            duration: 5.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1,
          })
        }

        // Orbital rings — very slow, heavy rotation; no fast spins
        const ring1 = artifact.querySelector(".orbital-ring-1")
        const ring2 = artifact.querySelector(".orbital-ring-2")
        if (ring1) {
          gsap.set(ring1, { rotateX: 74, rotateZ: -20 })
          gsap.to(ring1, { rotateZ: 340, duration: 32, repeat: -1, ease: "none" })
        }
        if (ring2) {
          gsap.set(ring2, { rotateX: 62, rotateZ: 35 })
          gsap.to(ring2, { rotateZ: -325, duration: 48, repeat: -1, ease: "none" })
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

      {/* ── Sculptural composition — faceted obsidian artifact + translucent ribbon ── */}
      <HeroVisual
        artifactRef={artifactRef}
        ribbonRef={ribbonRef}
        artifactX={artifactX}
        artifactY={artifactY}
        ribbonX={ribbonX}
        ribbonY={ribbonY}
      />

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
