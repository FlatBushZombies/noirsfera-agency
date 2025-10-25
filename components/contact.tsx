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

gsap.registerPlugin(ScrollTrigger)

type FieldType = "name" | "email" | "message" | null

export default function Contact() {
  const [hoveredField, setHoveredField] = useState<FieldType>(null)
  const [focusedField, setFocusedField] = useState<FieldType>(null)
  const [fieldDimensions, setFieldDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [cursorMessage, setCursorMessage] = useState("")

  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorLabelRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const ctaContainerRef = useRef<HTMLDivElement>(null)
  const decorativeShape1Ref = useRef<HTMLDivElement>(null)
  const decorativeShape2Ref = useRef<HTMLDivElement>(null)
  const decorativeShape3Ref = useRef<HTMLDivElement>(null)
  const decorativeShape4Ref = useRef<HTMLDivElement>(null)
  const decorativeShape5Ref = useRef<HTMLDivElement>(null)

  const fireworksContainerRef = useRef<HTMLDivElement>(null)
  const fireworksTimelineRef = useRef<gsap.core.Timeline | null>(null)

  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  // Mouse cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!formRef.current || !cursorRef.current || !cursorLabelRef.current) return
      const formRect = formRef.current.getBoundingClientRect()
      const isOverForm =
        e.clientX >= formRect.left &&
        e.clientX <= formRect.right &&
        e.clientY >= formRect.top &&
        e.clientY <= formRect.bottom

      if (isOverForm) {
        setCursorVisible(true)
        gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power2.out" })
        gsap.to(cursorLabelRef.current, { x: e.clientX + 25, y: e.clientY - 10, duration: 0.4, ease: "power2.out" })
      } else {
        setCursorVisible(false)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const messages = { name: "Your name", email: "your.email@example.com", message: "Tell us about your project..." }
    setCursorMessage(hoveredField ? messages[hoveredField] : "")
  }, [hoveredField])

  useEffect(() => {
    const activeField = hoveredField || focusedField
    if (activeField) {
      const refs = { name: nameRef, email: emailRef, message: messageRef }
      const ref = refs[activeField]
      if (ref.current && sectionRef.current) {
        const fieldRect = ref.current.getBoundingClientRect()
        const sectionRect = sectionRef.current.getBoundingClientRect()
        setFieldDimensions({
          width: fieldRect.width,
          height: fieldRect.height,
          x: fieldRect.left - sectionRect.left,
          y: fieldRect.top - sectionRect.top,
        })
      }
    }
  }, [hoveredField, focusedField])

  // Scroll-triggered animations
  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      if (headingRef.current)
        gsap.from(headingRef.current, {
          scrollTrigger: { trigger: headingRef.current, start: "top 90%", end: "top 50%", toggleActions: "play none none reverse" },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        })
      if (descriptionRef.current)
        gsap.from(descriptionRef.current, {
          scrollTrigger: { trigger: descriptionRef.current, start: "top 90%", toggleActions: "play none none reverse" },
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
        })

      if (nameRef.current && emailRef.current && messageRef.current) {
        gsap.from([nameRef.current, emailRef.current, messageRef.current], {
          scrollTrigger: { trigger: formRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          opacity: 0,
          x: 60,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        })
      }

      if (ctaContainerRef.current) {
        gsap.from(ctaContainerRef.current.children, {
          scrollTrigger: { trigger: ctaContainerRef.current, start: "top 90%", toggleActions: "play none none reverse" },
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.5)",
        })
      }

      const shapes = [
        decorativeShape1Ref.current,
        decorativeShape2Ref.current,
        decorativeShape3Ref.current,
        decorativeShape4Ref.current,
        decorativeShape5Ref.current,
      ]
      shapes.forEach((shape, i) => {
        if (!shape) return
        gsap.from(shape, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%", toggleActions: "play none none reverse" },
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: "back.out(1.7)",
        })
        gsap.to(shape, {
          y: `${Math.random() * 40 - 20}`,
          x: `${Math.random() * 40 - 20}`,
          rotation: `${Math.random() * 360}`,
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
        })
      })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen bg-white py-24 px-4 overflow-hidden font-inter"
    >
      {/* Decorative Shapes - unchanged */}

      {/* Form + CTA content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left side content */}
          <div className="space-y-6">
            <h2 ref={headingRef} className="text-5xl md:text-6xl font-bold text-gray-900 text-balance">
              Get in{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Touch</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#00BFA6] opacity-30 -rotate-1" />
              </span>
            </h2>
            <p ref={descriptionRef} className="text-lg text-gray-600 font-normal">
              Ready to start a project with us? Let’s create something amazing together.
            </p>

            <div ref={ctaContainerRef} className="space-y-4 pt-4">
              <button className="group text-[#00BFA6] hover:text-[#00A88E] font-medium inline-flex items-center gap-2 transition-all hover:gap-3">
                <Sparkles className="w-5 h-5" />
                View our recent work
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="flex flex-wrap gap-4">
                <button className="group text-gray-700 hover:text-[#00BFA6] font-medium inline-flex items-center gap-2 transition-all">
                  <Zap className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  Quick response time
                </button>
                <button className="group text-gray-700 hover:text-[#00BFA6] font-medium inline-flex items-center gap-2 transition-all">
                  <Star className="w-5 h-5 transition-transform group-hover:scale-110" />
                  5-star rated service
                </button>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div
              ref={nameRef}
              className="relative"
              onMouseEnter={() => setHoveredField("name")}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Label htmlFor="name" className="text-gray-700 font-medium mb-2 block">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full border-[#D3D3D3] focus:border-[#00D3F3] focus:ring-[#00D3F3]"
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div
              ref={emailRef}
              className="relative"
              onMouseEnter={() => setHoveredField("email")}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="w-full border-[#D3D3D3] focus:border-[#00D3F3] focus:ring-[#00D3F3]"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div
              ref={messageRef}
              className="relative"
              onMouseEnter={() => setHoveredField("message")}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Label htmlFor="message" className="text-gray-700 font-medium mb-2 block">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                rows={6}
                className="w-full border-[#D3D3D3] focus:border-[#00D3F3] focus:ring-[#00D3F3] resize-none"
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="relative inline-block">
              <Button
                ref={buttonRef}
                type="submit"
                className="w-full md:w-auto bg-[#00D3F3] hover:bg-[#00B8D4] text-white font-semibold px-8 py-6 text-lg transition-colors relative z-10"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
              >
                Send Message
              </Button>

              <div
                ref={fireworksContainerRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ zIndex: 5 }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="firework-particle absolute top-0 left-0 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: "#00BFA6",
                      boxShadow: "0 0 8px #00BFA6, 0 0 12px #00BFA6",
                      opacity: 0,
                      transform: "scale(0)",
                    }}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
