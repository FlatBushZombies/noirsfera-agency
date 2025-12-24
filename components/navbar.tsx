"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiLocationArrow } from "react-icons/ti"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"

const interpolateColor = (progress: number, fromColor: string, toColor: string) => {
  const from = fromColor.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0, 0]
  const to = toColor.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0, 0]

  const r = Math.round(from[0] + (to[0] - from[0]) * progress)
  const g = Math.round(from[1] + (to[1] - from[1]) * progress)
  const b = Math.round(from[2] + (to[2] - from[2]) * progress)
  // CRITICAL: Clamp alpha between 0.72-0.96 to ensure visibility on all backgrounds
  const a = Math.max(0.72, Math.min(0.96, from[3] + (to[3] - from[3]) * progress))

  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
}

const interpolateValue = (progress: number, from: number, to: number, min?: number, max?: number) => {
  const value = from + (to - from) * progress
  if (min !== undefined && max !== undefined) {
    return Math.max(min, Math.min(max, value))
  }
  return value
}

export function NavBar() {
  const { language } = useLanguage()
  const t = getTranslations(language)

  const navLinks = useMemo(
    () => [
      { name: t.navbar.services, href: "#services" },
      { name: t.navbar.portfolio, href: "#portfolio" },
      { name: t.navbar.pricing, href: "#pricing" },
      { name: t.navbar.contact, href: "#contact" },
    ],
    [t],
  )

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const navRef = useRef<HTMLElement>(null)

  const [navbarColors, setNavbarColors] = useState({
    bgGradientStart: "rgba(4, 124, 255, 0.88)",
    bgGradientEnd: "rgba(4, 124, 255, 0.72)",
    borderColor: "rgba(255, 255, 255, 0.38)",
    textColor: "rgba(255, 255, 255, 1)",
    blur: 32,
    saturation: 240,
    vibrancy: 1,
    glassOpacity: 0.88,
    shadowIntensity: 0.45,
  })

  const sectionProfiles = useMemo(
    () => [
      {
        id: "hero",
        tone: "light",
        // Light sections: Add subtle blue tint to preserve contrast, maintain min 75% opacity
        bg: { start: "rgba(4, 124, 255, 0.78)", end: "rgba(4, 124, 255, 0.75)" },
        border: "rgba(255, 255, 255, 0.35)",
        text: "rgba(255, 255, 255, 1)",
        blur: 36,
        saturation: 200,
        vibrancy: 0.85,
        glassOpacity: 0.78,
        shadowIntensity: 0.38,
      },
      {
        id: "services",
        tone: "light",
        // Light white section: Stronger tint to ensure navbar remains distinct surface
        bg: { start: "rgba(4, 124, 255, 0.80)", end: "rgba(4, 124, 255, 0.76)" },
        border: "rgba(255, 255, 255, 0.36)",
        text: "rgba(255, 255, 255, 1)",
        blur: 34,
        saturation: 205,
        vibrancy: 0.88,
        glassOpacity: 0.8,
        shadowIntensity: 0.4,
      },
      {
        id: "portfolio",
        tone: "surface",
        // Surface/gray section: Increase vibrancy and saturation
        bg: { start: "rgba(4, 124, 255, 0.90)", end: "rgba(4, 124, 255, 0.84)" },
        border: "rgba(255, 255, 255, 0.42)",
        text: "rgba(255, 255, 255, 1)",
        blur: 30,
        saturation: 260,
        vibrancy: 1.05,
        glassOpacity: 0.9,
        shadowIntensity: 0.5,
      },
      {
        id: "pricing",
        tone: "light",
        bg: { start: "rgba(4, 124, 255, 0.76)", end: "rgba(4, 124, 255, 0.72)" },
        border: "rgba(255, 255, 255, 0.34)",
        text: "rgba(255, 255, 255, 1)",
        blur: 36,
        saturation: 195,
        vibrancy: 0.82,
        glassOpacity: 0.76,
        shadowIntensity: 0.36,
      },
      {
        id: "testimonials",
        tone: "light",
        bg: { start: "rgba(4, 124, 255, 0.75)", end: "rgba(4, 124, 255, 0.72)" },
        border: "rgba(255, 255, 255, 0.33)",
        text: "rgba(255, 255, 255, 1)",
        blur: 38,
        saturation: 190,
        vibrancy: 0.78,
        glassOpacity: 0.75,
        shadowIntensity: 0.34,
      },
      {
        id: "faq",
        tone: "light",
        bg: { start: "rgba(4, 124, 255, 0.79)", end: "rgba(4, 124, 255, 0.75)" },
        border: "rgba(255, 255, 255, 0.36)",
        text: "rgba(255, 255, 255, 1)",
        blur: 34,
        saturation: 200,
        vibrancy: 0.86,
        glassOpacity: 0.79,
        shadowIntensity: 0.39,
      },
      {
        id: "contact",
        tone: "light",
        bg: { start: "rgba(4, 124, 255, 0.81)", end: "rgba(4, 124, 255, 0.77)" },
        border: "rgba(255, 255, 255, 0.37)",
        text: "rgba(255, 255, 255, 1)",
        blur: 32,
        saturation: 210,
        vibrancy: 0.9,
        glassOpacity: 0.81,
        shadowIntensity: 0.42,
      },
      {
        id: "footer",
        tone: "dark",
        // Dark section: Increase vibrancy, but use lighter glass to maintain visibility
        bg: { start: "rgba(255, 255, 255, 0.14)", end: "rgba(255, 255, 255, 0.10)" },
        border: "rgba(255, 255, 255, 0.28)",
        text: "rgba(255, 255, 255, 1)",
        blur: 28,
        saturation: 180,
        vibrancy: 1.3,
        glassOpacity: 0.14,
        shadowIntensity: 0.65,
      },
    ],
    [],
  )

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -75% 0px",
      // More granular thresholds for ultra-smooth interpolation
      threshold: [
        0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0,
      ],
    }

    let currentProfile = sectionProfiles[0]
    let nextProfile = sectionProfiles[1]
    let transitionProgress = 0

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          const sectionId = entry.target.id
          const profileIndex = sectionProfiles.findIndex((p) => p.id === sectionId)

          if (profileIndex !== -1) {
            currentProfile = sectionProfiles[profileIndex]
            nextProfile = sectionProfiles[Math.min(profileIndex + 1, sectionProfiles.length - 1)]
            // Use cubic easing for more natural transitions
            transitionProgress = Math.pow(entry.intersectionRatio, 0.8)

            setNavbarColors({
              bgGradientStart: interpolateColor(transitionProgress, currentProfile.bg.start, nextProfile.bg.start),
              bgGradientEnd: interpolateColor(transitionProgress, currentProfile.bg.end, nextProfile.bg.end),
              borderColor: interpolateColor(transitionProgress, currentProfile.border, nextProfile.border),
              // Text color always white for maximum readability
              textColor: "rgba(255, 255, 255, 1)",
              blur: interpolateValue(transitionProgress, currentProfile.blur, nextProfile.blur, 24, 40),
              saturation: interpolateValue(
                transitionProgress,
                currentProfile.saturation,
                nextProfile.saturation,
                160,
                280,
              ),
              vibrancy: interpolateValue(transitionProgress, currentProfile.vibrancy, nextProfile.vibrancy, 0.7, 1.4),
              // CRITICAL: Glass opacity clamped between 0.72-0.96 for visibility
              glassOpacity: interpolateValue(
                transitionProgress,
                currentProfile.glassOpacity,
                nextProfile.glassOpacity,
                0.72,
                0.96,
              ),
              shadowIntensity: interpolateValue(
                transitionProgress,
                currentProfile.shadowIntensity,
                nextProfile.shadowIntensity,
                0.3,
                0.7,
              ),
            })
          }
        }
      })
    }, observerOptions)

    // Observe all sections for continuous sampling
    sectionProfiles.forEach((profile) => {
      const element = document.getElementById(profile.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sectionProfiles])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const current = navLinks
        .map((link) => link.href.replace("#", ""))
        .find((id) => {
          const el = document.getElementById(id)
          if (!el) return false
          const rect = el.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        })

      if (current) setActiveSection(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navLinks])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const id = href.replace("#", "")
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <>
      {/* NAV WRAPPER */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "px-4 sm:px-6 lg:px-8 pt-4" : "px-0 pt-0"
        }`}
      >
        <motion.nav
          ref={navRef}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className={`relative overflow-hidden transition-all duration-500 ${
            isScrolled ? "rounded-2xl max-w-7xl mx-auto" : "rounded-none"
          }`}
          style={{
            background: `linear-gradient(135deg, ${navbarColors.bgGradientStart}, ${navbarColors.bgGradientEnd})`,
            backdropFilter: `blur(${navbarColors.blur}px) saturate(${navbarColors.saturation}%)`,
            WebkitBackdropFilter: `blur(${navbarColors.blur}px) saturate(${navbarColors.saturation}%)`,
            border: `1px solid ${navbarColors.borderColor}`,
            boxShadow:
              `inset 0 1px 0 rgba(255, 255, 255, ${0.55 * navbarColors.vibrancy}), ` +
              `inset 0 -1px 0 rgba(255, 255, 255, ${0.25 * navbarColors.vibrancy}), ` +
              `0 ${Math.round(22 * navbarColors.vibrancy)}px ${Math.round(60 * navbarColors.vibrancy)}px rgba(0, 0, 0, ${navbarColors.shadowIntensity})`,
            // Smooth cubic-bezier transitions for all properties
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`)
            e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`)
          }}
        >
          <span className="liquid-noise rounded-inherit" />

          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: navbarColors.vibrancy * 0.85 }}
            transition={{ duration: 0.35 }}
            style={{
              background:
                "radial-gradient(700px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.22), transparent 38%)",
            }}
          />

          {/* CONTENT */}
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between ${isScrolled ? "h-16" : "h-20"}`}>
              {/* LOGO */}
              <motion.div whileHover={{ rotate: -8, scale: 1.1 }} className="flex items-center gap-2 cursor-pointer">
                <TiLocationArrow size={22} style={{ color: navbarColors.textColor }} />
                <span className="font-bold text-lg tracking-tight" style={{ color: navbarColors.textColor }}>
                  noirsfera
                </span>
              </motion.div>

              {/* DESKTOP NAV */}
              <div className="hidden md:flex flex-1 justify-center gap-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    whileHover={{ y: -2 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === link.href.slice(1) ? "bg-white/25" : "hover:bg-white/15"
                    }`}
                    style={{ color: navbarColors.textColor }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="hidden md:flex items-center gap-3">
                <LanguageSwitcher />
                <motion.div
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  animate={{ y: isButtonHovered ? -4 : 0 }}
                >
                  <a href="https://t.me/itsslucki" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-white text-[#047CFF] hover:bg-white/90 rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg">
                      {t.navbar.bookACall}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </motion.div>
              </div>

              {/* MOBILE */}
              <div className="md:hidden flex items-center gap-2">
                <LanguageSwitcher />
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? (
                    <X style={{ color: navbarColors.textColor }} />
                  ) : (
                    <Menu style={{ color: navbarColors.textColor }} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* SPACER */}
      <div className={isScrolled ? "h-24" : "h-20"} />

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#047CFF]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-semibold text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
