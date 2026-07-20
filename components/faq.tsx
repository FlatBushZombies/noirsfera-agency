"use client"
import { useEffect, useState, useMemo, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FaqItem from "./FaqItem"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"

gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
  const { language } = useLanguage()
  const t = getTranslations(language)

  const founders = useMemo(
    () => [
      { src: "/logo.png", alt: t.faq.founderAlt },
      { src: "/logo.png", alt: t.faq.founderAlt },
    ],
    [t],
  )

  const [activeId, setActiveId] = useState<string | number | null>(null)
  const faqItems = t.faq.items
  const halfLength = Math.floor(faqItems.length / 2)
  const [currentIndex, setCurrentIndex] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % founders.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [founders.length])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      // Section header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
          }
        )
      }

      // FAQ grid items stagger
      if (gridRef.current) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.07,
            scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full bg-gradient-to-b from-background via-background to-surface py-20 md:py-28 lg:py-36"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/[0.12] rounded-full blur-3xl -mr-48" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/[0.10] rounded-full blur-3xl -ml-48" />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow-label mb-4">
            {t.faq.badge}
          </p>

          <h2 className="section-heading mb-6">
            {t.faq.heading}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">
                {t.faq.questions}
              </span>
              <span className="absolute bottom-1 left-0 w-full h-4 bg-primary/20 blur-sm -rotate-1" />
            </span>
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-text-secondary font-medium">
            {t.faq.subheading}
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative">
          {/* Rotating Founder Image */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
            <div className="relative w-20 h-20 overflow-hidden rounded-full border-2 border-white/[0.12] bg-[#0d0d0d] shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={founders[currentIndex].src}
                  alt={founders[currentIndex].alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* FAQ Grid */}
          <div ref={gridRef} className="grid lg:grid-cols-2 gap-4 lg:gap-12 pt-8">
            {faqItems.slice(0, halfLength).map((item, index) => (
              <FaqItem
                key={item.id}
                item={item}
                index={index}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
            {faqItems.slice(halfLength).map((item, index) => (
              <FaqItem
                key={item.id}
                item={item}
                index={halfLength + index}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
