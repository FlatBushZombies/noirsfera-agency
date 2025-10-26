"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: "Fullstack Development",
    subtitle: "End-to-end scalable web & mobile apps",
    details: ["API Development", "Database Design", "Cloud Deployment", "Real-time Features"],
    icon: "code",
  },
  {
    title: "AI Engineering & Data Analytics",
    subtitle: "Intelligent systems & predictive insights",
    details: ["Machine Learning", "Predictive Analytics", "Data Visualization", "AI Integration"],
    icon: "brain",
  },
  {
    title: "UI/UX Design",
    subtitle: "User-centered, intuitive digital experiences",
    details: ["User Research", "Prototyping", "Design Systems", "Usability Testing"],
    icon: "palette",
  },
]

export function Services() {
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
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1, // Stagger effect for visual appeal
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%", // Trigger earlier (was 80%)
              toggleActions: "play none none none", // Play once and stay visible
            },
          },
        )
      })

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%", // Trigger earlier (was 80%)
              toggleActions: "play none none none", // Play once and stay visible
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => {
      const el = document.querySelector(`#details-${index}`) as HTMLElement

      if (!el) return prev

      // Close if already open
      if (prev === index) {
        gsap.to(el, { height: 0, duration: 0.3, ease: "power2.out" })
        return null
      }

      // Open new panel
      requestAnimationFrame(() => {
        gsap.fromTo(el, { height: 0 }, { height: el.scrollHeight, duration: 0.35, ease: "power2.out" })
      })

      // Close previous panel, if any
      if (prev !== null) {
        const prevEl = document.querySelector(`#details-${prev}`) as HTMLElement
        prevEl && gsap.to(prevEl, { height: 0, duration: 0.25, ease: "power2.inOut" })
      }

      return index
    })
  }

  return (
    <section ref={sectionRef} id="services" className="pt-0 md:pt-4 pb-14 md:pb-24 px-6 md:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight text-balance font-inter">
            How Simple It Can Be To Get Your Projects Done
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="group relative rounded-3xl p-8 bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: "0 0 30px rgba(0, 211, 243, 0.6), inset 0 0 30px rgba(0, 211, 243, 0.1)",
                }}
              />

              <div className="relative mb-6 h-32 rounded-2xl bg-gradient-to-br from-[#00D3F3]/10 to-[#00D3F3]/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent" />
                {index === 0 && (
                  <div className="relative flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md">
                    <span className="text-sm font-semibold text-gray-700">Turn on</span>
                    <span className="text-sm font-bold text-black">Growth</span>
                    <div className="w-12 h-6 bg-gradient-to-r from-[#00D3F3] to-[#00A8C5] rounded-full flex items-center justify-end px-1 shadow-inner">
                      <div className="w-5 h-5 bg-white rounded-full shadow-md" />
                    </div>
                  </div>
                )}
                {index === 1 && (
                  <div className="relative text-center">
                    <div className="text-7xl font-black text-[#00D3F3] leading-none mb-2">200%</div>
                    <div className="bg-[#00D3F3] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Conversions
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="relative space-y-3 w-full px-6">
                    <div className="bg-white rounded-full px-6 py-3 shadow-md border-4 border-[#00D3F3]/30">
                      <span className="text-sm font-semibold text-gray-700">User Retention +80%</span>
                    </div>
                    <div className="bg-white rounded-full px-6 py-3 shadow-md border-4 border-[#00D3F3]/30">
                      <span className="text-sm font-semibold text-gray-700">Leads +150%</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-black leading-tight font-inter">
                    {service.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">{service.subtitle}</p>
                </div>

                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex items-center gap-2 text-sm font-semibold text-black hover:text-[#00D3F3] transition-colors duration-200"
                  aria-expanded={openIndex === index}
                >
                  {openIndex === index ? <Minus className="w-5 h-5 text-[#00D3F3]" /> : <Plus className="w-5 h-5" />}
                  <span>{openIndex === index ? "Show Less" : "Show More"}</span>
                </button>

                <div
                  id={`details-${index}`}
                  className="overflow-hidden"
                  style={{ height: openIndex === index ? "auto" : 0 }}
                >
                  <ul className="space-y-3 pt-2">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D3F3] mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700 leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="bg-black rounded-2xl p-12 md:p-16 text-center space-y-6 mt-20">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance font-inter">
            Ready to transform your digital presence?
          </h3>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 rounded-full px-10 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg font-inter"
          >
            Let's Get Started
          </Button>
        </div>
      </div>
    </section>
  )
}
