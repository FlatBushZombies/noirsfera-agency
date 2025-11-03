"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { TiLocationArrow } from "react-icons/ti"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
]

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Determine active section
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

  // Prevent scrolling when mobile menu is open
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
              ? "rounded-full bg-black backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.15)] border border-white/10 max-w-7xl mx-auto"
              : "rounded-none bg-black backdrop-blur-md border-b border-white/5"
          }`}
        >
          <div
            className={`transition-all duration-300 ${
              isScrolled ? "container mx-auto px-4 sm:px-6 lg:px-8" : "px-4 sm:px-6 lg:px-8"
            }`}
          >
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
              }`}
            >
              {/* Logo */}
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-2"
              >
                <TiLocationArrow color="white" size={24} />
                <a
                  href="#"
                  className="text-lg md:text-xl font-bold font-inter tracking-tight flex-shrink-0 text-white"
                >
                  noirsfera
                </a>
              </motion.div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center font-inter text-[18px] font-normal leading-[27.18px] text-[rgba(0,0,0,0.525)] justify-center flex-1 space-x-6 lg:space-x-8">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={`text-sm font-medium transition-colors hover:text-[#0EC8F3] relative text-white ${
                      activeSection === link.href.substring(1)
                        ? "text-[#0EC8F3]"
                        : "text-foreground"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {link.name}
                    {activeSection === link.href.substring(1) && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0EC8F3] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Desktop Button */}
              <div className="hidden md:flex items-center flex-shrink-0">
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
  <Button className="bg-[#0EC8F3] text-black hover:bg-[#0EC8F3]/90 font-medium font-inter rounded-full px-6 py-3 text-sm relative overflow-hidden h-auto">
    <motion.span
      initial={false}
      animate={{
        y: isButtonHovered ? -30 : 0,
        opacity: isButtonHovered ? 0 : 1,
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="inline-block"
    >
      Book a Call
    </motion.span>

    <motion.span
      initial={false}
      animate={{
        y: isButtonHovered ? 0 : 30,
        opacity: isButtonHovered ? 1 : 0,
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      Let's Get Started
    </motion.span>
  </Button>
</a>

                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-foreground hover:text-[#0EC8F3] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} color="white" />
                ) : (
                  <Menu size={24} color="white" />
                )}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      <div
        className={`transition-all duration-300 ${
          isScrolled ? "h-20 md:h-24" : "h-16 md:h-20"
        }`}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-xl bg-black/70 md:hidden"
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
                  className={`text-2xl font-medium font-inter transition-colors hover:text-[#0EC8F3] ${
                    activeSection === link.href.substring(1)
                      ? "text-[#0EC8F3]"
                      : "text-white"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: (navLinks?.length || 0) * 0.1 }}
>
  <Button
    asChild
    size="sm"
    className="bg-[#0EC8F3] text-black hover:bg-[#0EC8F3]/90 font-inter font-bold rounded-full px-5 py-2 text-sm"
  >
    <a
      href="https://t.me/itsslucki"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a call via Telegram"
    >
      Book a Call
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
