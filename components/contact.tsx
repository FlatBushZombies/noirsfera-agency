"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Zap, Star } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { toast } from "sonner"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations } from "@/lib/translations"

gsap.registerPlugin(ScrollTrigger)

type FieldType = "name" | "email" | "message" | null

export default function Contact() {
  const [hoveredField, setHoveredField] = useState<FieldType>(null)
  const [focusedField, setFocusedField] = useState<FieldType>(null)
  const [loading, setLoading] = useState(false)

  const { language } = useLanguage()
  const t = getTranslations(language)

  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const fireworksContainerRef = useRef<HTMLDivElement>(null)
  const fireworksTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const ctaContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current)
        gsap.from(headingRef.current, {
          scrollTrigger: { trigger: headingRef.current, start: "top 90%", end: "top 50%" },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        })
      if (descriptionRef.current)
        gsap.from(descriptionRef.current, {
          scrollTrigger: { trigger: descriptionRef.current, start: "top 90%" },
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
        })

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              once: true,
            },
          },
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleButtonHover = () => {
    if (!fireworksContainerRef.current) return
    if (fireworksTimelineRef.current) fireworksTimelineRef.current.kill()
    const particles = fireworksContainerRef.current.querySelectorAll(".firework-particle")
    const tl = gsap.timeline()
    fireworksTimelineRef.current = tl
    particles.forEach((particle, i) => {
      const angle = (i / particles.length) * Math.PI * 2
      const distance = 70 + Math.random() * 50
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance
      tl.fromTo(
        particle,
        { x: 0, y: 0, scale: 0, opacity: 1 },
        { x, y, scale: 1, opacity: 0, duration: 0.5, ease: "power2.out" },
        i * 0.02,
      )
    })
  }

  const handleButtonLeave = () => {
    if (fireworksTimelineRef.current) fireworksTimelineRef.current.kill()
    if (!fireworksContainerRef.current) return
    const particles = fireworksContainerRef.current.querySelectorAll(".firework-particle")
    gsap.set(particles, { x: 0, y: 0, scale: 0, opacity: 0 })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        toast.success(t.contact.successToast)
        ;(e.target as HTMLFormElement).reset()
      } else {
        toast.error(t.contact.errorToast)
      }
    } catch (error) {
      toast.error(t.contact.errorOccurred)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-background via-background to-surface"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mt-48" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mb-48" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <h2
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground text-balance leading-tight tracking-tight font-display"
            >
              {t.contact.heading}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">{t.contact.touch}</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-1 blur-sm" />
              </span>
            </h2>
            <p ref={descriptionRef} className="text-lg md:text-xl leading-relaxed text-text-secondary font-medium">
              {t.contact.description}
            </p>

            <div ref={ctaContainerRef} className="space-y-6 pt-4">
              <a href="#portfolio">
                <button className="group text-primary hover:text-primary/80 font-bold inline-flex items-center gap-2 transition-all hover:gap-3 text-base">
                  <Sparkles className="w-5 h-5" />
                  {t.contact.viewRecentWork}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </a>
              <div className="flex flex-wrap gap-8">
                <button className="group text-foreground hover:text-primary font-semibold inline-flex items-center gap-3 transition-all text-base">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Zap className="w-5 h-5 text-primary transition-transform group-hover:rotate-12" />
                  </div>
                  <span>{t.contact.quickResponse}</span>
                </button>
                <button className="group text-foreground hover:text-primary font-semibold inline-flex items-center gap-3 transition-all text-base">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Star className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <span>{t.contact.fiveStarService}</span>
                </button>
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative liquid-glass-modal rounded-3xl p-8 md:p-10 space-y-6 overflow-hidden"
          >
            <span className="liquid-noise rounded-3xl" />

            <div className="relative z-10 space-y-6">
              <div ref={nameRef}>
                <Label htmlFor="name" className="text-foreground font-bold mb-3 block text-base">
                  {t.contact.fullNameLabel}
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t.contact.fullNamePlaceholder}
                  required
                  className="bg-white/60 border-2 border-border hover:border-primary/40 focus:border-primary transition-colors rounded-lg h-12 backdrop-blur-sm"
                />
              </div>

              <div ref={emailRef}>
                <Label htmlFor="email" className="text-foreground font-bold mb-3 block text-base">
                  {t.contact.emailLabel}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  required
                  className="bg-white/60 border-2 border-border hover:border-primary/40 focus:border-primary transition-colors rounded-lg h-12 backdrop-blur-sm"
                />
              </div>

              <div ref={messageRef}>
                <Label htmlFor="message" className="text-foreground font-bold mb-3 block text-base">
                  {t.contact.messageLabel}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t.contact.messagePlaceholder}
                  rows={6}
                  required
                  className="bg-white/60 border-2 border-border hover:border-primary/40 focus:border-primary transition-colors rounded-lg resize-none backdrop-blur-sm"
                />
              </div>

              <div className="relative inline-block pt-4 w-full">
                <Button
                  ref={buttonRef}
                  type="submit"
                  disabled={loading}
                  className="relative group w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400 text-white font-bold px-10 py-5 text-base rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.5),0_0_80px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7),0_0_100px_rgba(59,130,246,0.4)] border-0 h-auto overflow-hidden"
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  {/* Animated glow background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                  <span className="relative z-10">{loading ? t.contact.sending : t.contact.sendMessage}</span>
                </Button>

                {/* Fireworks particle container */}
                <div
                  ref={fireworksContainerRef}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ zIndex: 5 }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="firework-particle absolute top-0 left-0 w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: "#00D9FF",
                        boxShadow: "0 0 12px #00D9FF, 0 0 24px #00D9FF",
                        opacity: 0,
                        transform: "scale(0)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
