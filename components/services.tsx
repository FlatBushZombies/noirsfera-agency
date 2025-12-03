"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"

gsap.registerPlugin(ScrollTrigger)

export function Services() {

  const { language } = useLanguage();
  const t = getTranslations(language);

  const services = useMemo(
    () => [
      {
        title: t.services.items.fullstack.title,
        subtitle: t.services.items.fullstack.subtitle,
        details: t.services.items.fullstack.details,
        highlight: t.services.items.fullstack.scalableGrowth,
      },
      {
        title: t.services.items.aiEngineering.title,
        subtitle: t.services.items.aiEngineering.subtitle,
        details: t.services.items.aiEngineering.details,
        highlight: t.services.items.aiEngineering.aiPowered,
      },
      {
        title: t.services.items.uiux.title,
        subtitle: t.services.items.uiux.subtitle,
        details: t.services.items.uiux.details,
        highlight: {
          retention: t.services.items.uiux.userRetention,
          conversions: t.services.items.uiux.conversions,
        },
      },
    ],
    [t],
  )

  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        )
      })

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => {
      const el = document.getElementById(`details-${index}`)
      if (!el) return prev

      if (prev === index) {
        gsap.to(el, { height: 0, duration: 0.35, ease: "power2.inOut" })
        return null
      }

      const scrollHeight = el.scrollHeight
      gsap.to(el, { height: scrollHeight, duration: 0.4, ease: "power2.out" })

      if (prev !== null) {
        const prevEl = document.getElementById(`details-${prev}`)
        if (prevEl) gsap.to(prevEl, { height: 0, duration: 0.25, ease: "power2.inOut" })
      }

      return index
    })
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-sm md:text-base font-semibold text-primary uppercase tracking-widest">{t.services.sectionBadge}</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight text-balance font-display">
            {t.services.heading}
          </h2>
          <p className="text-lg text-text-secondary font-medium leading-relaxed">
            {t.services.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[index] = el
              }}
              className="group relative rounded-2xl p-8 md:p-10 bg-white border-2 border-border hover:border-primary/30 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
              style={{ boxShadow: "inset 0 0 30px rgba(0, 217, 255, 0.05)" }}
            >
              {/* Premium background glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: "inset 0 0 30px rgba(0, 217, 255, 0.05)" }}
              />

              {/* Top Visual Section */}
              <div className="relative mb-8 h-40 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center overflow-hidden border border-primary/10">
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                {index === 0 && (
                  <div className="relative flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
                    <span className="text-sm font-bold text-foreground">{service.highlight}</span>
                    <div className="w-12 h-6 bg-gradient-to-r from-primary to-[#0db8d7] rounded-full flex items-center justify-end px-1 shadow-md">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                )}
                {index === 1 && (
                  <div className="relative text-center">
                    <div className="text-6xl font-black text-primary leading-none mb-1">200%</div>
                    <div className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {service.highlight}
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="relative space-y-2 w-full px-6">
                    <div className="bg-white rounded-full px-4 py-2 shadow-md border-2 border-primary/20">
                      <span className="text-xs font-bold text-foreground">{service.highlight.retention}</span>
                    </div>
                    <div className="bg-white rounded-full px-4 py-2 shadow-md border-2 border-primary/20">
                      <span className="text-xs font-bold text-foreground">{service.highlight.conversions}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="relative space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight font-display">
                    {service.title}
                  </h3>
                  <p className="text-base text-text-secondary leading-relaxed font-medium">{service.subtitle}</p>
                </div>

                {/* Accordion Toggle */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors duration-200 focus:outline-none group/toggle"
                  aria-expanded={openIndex === index}
                  aria-controls={`details-${index}`}
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-primary transition-transform" />
                  ) : (
                    <Plus className="w-5 h-5 group-hover/toggle:text-primary transition-colors" />
                  )}
                  <span>{openIndex === index ? t.services.showLess : t.services.showMore}</span>
                </button>

                {/* Accordion Content */}
                <div
                  id={`details-${index}`}
                  className="overflow-hidden transition-all duration-300"
                  style={{ height: 0 }}
                >
                  <ul className="space-y-3 pt-2">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-text-secondary font-medium leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          ref={ctaRef}
          className="bg-gradient-to-br from-foreground to-foreground/95 rounded-3xl p-12 md:p-16 lg:p-20 text-center space-y-8 mt-24 border border-foreground/10"
        >
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-sm md:text-base font-semibold text-primary uppercase tracking-widest">{t.services.cta.badge}</p>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight text-balance font-display">
              {t.services.cta.heading}
            </h3>
            <p className="text-lg text-white/80 font-medium leading-relaxed">
              {t.services.cta.description}
            </p>
          </div>
          <Button
            asChild
            className="bg-primary text-white hover:bg-[#00C7E6] rounded-full px-10 py-6 text-lg  transition-all duration-300 hover:scale-105 shadow-lg font-inter focus:outline-none"
          >
            <a href="https://t.me/itsslucki" target="_blank" rel="noopener noreferrer" aria-label="Start via Telegram">
              {t.services.cta.button}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
