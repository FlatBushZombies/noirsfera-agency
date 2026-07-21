"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Twitter, Instagram, Send } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const { language } = useLanguage()
  const t = getTranslations(language)

  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      // Heading dramatic reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 64, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true },
        }
      )

      // CTA button reveal
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ctaRef.current, start: "top 92%", once: true },
        }
      )

      // Social icons stagger
      if (socialsRef.current) {
        gsap.fromTo(
          Array.from(socialsRef.current.children),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: { trigger: socialsRef.current, start: "top 92%", once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleCTAMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    gsap.to(btn, { x: dx * 0.2, y: dy * 0.2, duration: 0.3, ease: "power2.out", overwrite: "auto" })
  }

  const handleCTALeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsButtonHovered(false)
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" })
  }

  return (
    <footer ref={sectionRef} className="relative bg-background text-white overflow-hidden">
      <div className="relative z-10 px-6 py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with CTA */}
          <div className="text-center mb-24 relative" onMouseMove={handleMouseMove}>
            {/* Animated Gradient Background - Updated to exact primary color */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
                style={{
                  background: `radial-gradient(circle at center, #00D9FF 0%, transparent 70%)`,
                  animation: `breathe 7s ease-in-out infinite`,
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-8 leading-[0.98] tracking-[-0.03em] text-balance">
                {t.footer.heading.line1},
                <br />
                {t.footer.heading.line2}
              </h2>

              {/* CTA Button with Hover Effect - Updated button colors */}
              <div ref={ctaRef} className="relative inline-block group">
                <div
                  className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
                    <path
                      d="M5 12h14m0 0l-7-7m7 7l-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <a href="https://t.me/itsslucki" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <button
                    onMouseMove={handleCTAMove}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={handleCTALeave}
                    className="relative px-8 py-4 bg-black border-2 border-white font-display rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer group-hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#040404]"
                  >
                    {isButtonHovered ? t.footer.letsGo : t.footer.getStarted}
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="border-t border-white/10 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
              {/* Logo */}
              <div className="text-2xl font-black font-display tracking-tight">{t.footer.logo}</div>

              {/* Social Icons */}
              <div ref={socialsRef} className="flex gap-6">
                <a
                  href="https://x.com/from_noirsfera"
                  className="hover:text-primary transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#040404]"
                  aria-label={t.footer.twitterAria}
                >
                  <Twitter size={20} />
                </a>

                <a
                  href="https://www.instagram.com/noirsfera/"
                  className="hover:text-primary transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#040404]"
                  aria-label={t.footer.instagramAria}
                >
                  <Instagram size={20} />
                </a>

                <a
                  href="https://t.me/itsslucki"
                  className="hover:text-primary transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#040404]"
                  aria-label={t.footer.telegramAria}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send size={20} />
                </a>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60 border-t border-white/10 pt-8">
              <p>{t.footer.copyright}</p>
              <div className="flex gap-6">
                <a href="#privacy" className="hover:text-white transition-colors duration-200">
                  {t.footer.privacyPolicy}
                </a>
                <a href="#terms" className="hover:text-white transition-colors duration-200">
                  {t.footer.termsConditions}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
