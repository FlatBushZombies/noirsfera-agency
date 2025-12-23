"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiLocationArrow } from "react-icons/ti"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"

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
    [t]
  )

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const current = navLinks
        .map(link => link.href.replace("#", ""))
        .find(id => {
          const el = document.getElementById(id)
          if (!el) return false
          const rect = el.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        })

      if (current) setActiveSection(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navLinks])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

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
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "px-4 sm:px-6 lg:px-8 pt-4" : "px-0 pt-0"
        }`}
      >
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            backdropFilter: isScrolled
              ? "blur(20px) saturate(180%)"
              : "blur(14px) saturate(140%)",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className={`relative overflow-hidden transition-all duration-300 liquid-glass ${
            isScrolled
              ? "rounded-2xl max-w-7xl mx-auto"
              : "rounded-none border-b border-white/10"
          }`}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`)
            e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`)
          }}
        >
          {/* Noise */}
          <span className="liquid-noise rounded-inherit" />

          {/* Hover refraction */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.08), transparent 40%)",
            }}
          />

          <div className="relative px-4 sm:px-6 lg:px-8">
            <div
              className={`flex items-center justify-between ${
                isScrolled ? "h-16" : "h-20"
              }`}
            >
              {/* LOGO */}
              <motion.div
                whileHover={{ rotate: -8, scale: 1.1 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <TiLocationArrow size={22} className="text-black" />
                <a className="text-black font-bold text-lg tracking-tight">
                  noirsfera
                </a>
              </motion.div>

              {/* DESKTOP NAV */}
              <div className="hidden md:flex flex-1 justify-center gap-2">
                {navLinks.map(link => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    aria-current={
                      activeSection === link.href.slice(1)
                        ? "page"
                        : undefined
                    }
                    whileHover={{ y: -2 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "text-primary bg-primary/10"
                        : "text-black hover:text-black"
                    }`}
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
                  <a
                    href="https://t.me/itsslucki"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-primary hover:bg-[#00C7E6] text-white rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg">
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
                    <X className="text-black" />
                  ) : (
                    <Menu className="text-black" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      <div className={isScrolled ? "h-24" : "h-20"} />

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/70 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-semibold text-black"
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
