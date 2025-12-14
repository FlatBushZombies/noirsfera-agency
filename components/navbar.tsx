"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiLocationArrow } from "react-icons/ti"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"

export function NavBar() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  const navLinks = [
    { name: t.navbar.services, href: "#services" },
    { name: t.navbar.portfolio, href: "#portfolio" },
    { name: t.navbar.pricing, href: "#pricing" },
    { name: t.navbar.contact, href: "#contact" },
  ];
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = navLinks.map((link) => link.href.substring(1))
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
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
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`transition-all duration-300 ${
            isScrolled
              ? "rounded-2xl bg-black backdrop-blur-xl shadow-lg border border-white/20 max-w-7xl mx-auto"
              : "rounded-none bg-black backdrop-blur-md border-b border-white/10"
          }`}
        >
          <div
            className={`transition-all duration-300 ${
              isScrolled ? "container mx-auto px-4 sm:px-6 lg:px-8" : "px-4 sm:px-6 lg:px-8"
            }`}
          >
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                isScrolled ? "h-16 md:h-18" : "h-20 md:h-24"
              }`}
            >
              {/* Logo */}
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                 <TiLocationArrow color="white" size={24} />
                <a
                  href="#"
                  className="text-lg md:text-xl font-bold font-display tracking-tight flex-shrink-0 text-white"
                >
                  noirsfera
                </a>
              </motion.div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center font-sans text-sm justify-center flex-1 space-x-1 lg:space-x-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={`px-4 py-2 font-medium transition-colors rounded-lg ${
                      activeSection === link.href.substring(1)
                        ? "text-primary bg-primary/10"
                        : "text-white hover:text-white"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Desktop Button & Language Switcher */}
              <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                <LanguageSwitcher />
                <motion.div
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  animate={{
                    y: isButtonHovered ? -4 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  <a
                    href="https://t.me/itsslucki"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a call via Telegram"
                    className="inline-block"
                  >
                    <Button className="bg-[#0094B0] hover:bg-[#00C7E6] text-white font-semibold font-sans rounded-full px-6 py-2.5 text-sm relative overflow-hidden h-auto group transition-all duration-300 shadow-lg hover:shadow-xl border-0">
                      <motion.span
                        initial={false}
                        animate={{
                          y: isButtonHovered ? -30 : 0,
                          opacity: isButtonHovered ? 0 : 1,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: "easeInOut",
                        }}
                        className="inline-flex items-center gap-2 relative z-10"
                      >
                        {t.navbar.bookACall}
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>

                      <motion.span
                        initial={false}
                        animate={{
                          y: isButtonHovered ? 0 : 30,
                          opacity: isButtonHovered ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 flex items-center justify-center gap-2 z-10"
                      >
                        {t.navbar.letsGo}
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </Button>
                  </a>
                </motion.div>
              </div>

              {/* Mobile Language Switcher & Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <LanguageSwitcher />
                <button
                  className="p-2 text-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      <div className={`transition-all duration-300 ${isScrolled ? "h-24 md:h-28" : "h-20 md:h-24"}`} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-xl bg-black/30 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-2xl font-semibold font-display transition-colors ${
                    activeSection === link.href.substring(1) ? "text-primary" : "text-white hover:text-primary"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks?.length ?? 0) * 0.1 }}
              >
                <Button
                  asChild
                  className="bg-primary hover:bg-[#00C7E6] text-white font-semibold font-sans rounded-full px-8 py-3 text-base transition-all duration-300 shadow-lg hover:shadow-xl border-0"
                >
                  <a
                    href="https://t.me/itsslucki"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a call via Telegram"
                    className="flex items-center gap-2"
                  >
                    {t.navbar.bookACall}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
