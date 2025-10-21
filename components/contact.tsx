"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Sparkles, Zap, Star } from "lucide-react"
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

  const planeRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const planeTextRef = useRef<HTMLDivElement>(null)
  const trailPathRef = useRef<SVGPathElement>(null)

  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const ctaContainerRef = useRef<HTMLDivElement>(null)
  const decorativeShape1Ref = useRef<HTMLDivElement>(null)
  const decorativeShape2Ref = useRef<HTMLDivElement>(null)
  const decorativeShape3Ref = useRef<HTMLDivElement>(null)
  const decorativeShape4Ref = useRef<HTMLDivElement>(null)
  const decorativeShape5Ref = useRef<HTMLDivElement>(null)

  const fireworksContainerRef = useRef<HTMLDivElement>(null)
  const fireworksTimelineRef = useRef<gsap.core.Timeline | null>(null)

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

        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power2.out",
        })

        gsap.to(cursorLabelRef.current, {
          x: e.clientX + 20,
          y: e.clientY - 10,
          duration: 0.8,
          ease: "power2.out",
        })
      } else {
        setCursorVisible(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const messages = {
      name: "Your name",
      email: "your.email@example.com",
      message: "Tell us about your project...",
    }

    if (hoveredField) {
      setCursorMessage(messages[hoveredField])
    } else {
      setCursorMessage("")
    }
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

  useEffect(() => {
    if (!planeRef.current || !buttonRef.current || !planeTextRef.current || !trailPathRef.current) return

    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(
      trailPathRef.current,
      {
        strokeDashoffset: 400,
      },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      },
    )

    tl.to(
      planeRef.current,
      {
        duration: 1.5,
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 50, y: -30 },
            { x: 120, y: -20 },
            { x: 180, y: 0 },
          ],
          curviness: 1.5,
        },
        rotation: 15,
        ease: "power2.inOut",
      },
      "-=1.5",
    )

    tl.to(
      planeRef.current,
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
      },
      "-=0.3",
    )

    tl.to(
      planeTextRef.current,
      {
        opacity: 0,
        x: 20,
        duration: 0.4,
      },
      "-=1.2",
    )

    tl.to(
      trailPathRef.current,
      {
        opacity: 0,
        duration: 0.3,
      },
      "-=0.3",
    )

    tl.to(
      buttonRef.current,
      {
        boxShadow: "0 0 30px rgba(0, 191, 166, 0.8), 0 0 60px rgba(0, 191, 166, 0.4)",
        scale: 1.05,
        duration: 0.4,
        ease: "back.out(1.7)",
      },
      "-=0.3",
    )

    tl.to(buttonRef.current, {
      boxShadow: "0 0 0px rgba(0, 191, 166, 0)",
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    })

    return () => {
      tl.kill()
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        })
      }

      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        })
      }

      if (nameRef.current && emailRef.current && messageRef.current) {
        gsap.from([nameRef.current, emailRef.current, messageRef.current], {
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: 50,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        })
      }

      if (ctaContainerRef.current) {
        gsap.from(ctaContainerRef.current.children, {
          scrollTrigger: {
            trigger: ctaContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        })
      }

      const shapes = [
        decorativeShape1Ref.current,
        decorativeShape2Ref.current,
        decorativeShape3Ref.current,
        decorativeShape4Ref.current,
        decorativeShape5Ref.current,
      ]

      shapes.forEach((shape, index) => {
        if (!shape) return

        gsap.from(shape, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          scale: 0,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
        })

        gsap.to(shape, {
          y: `${Math.random() * 30 - 15}`,
          x: `${Math.random() * 30 - 15}`,
          rotation: `${Math.random() * 360}`,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        })

        gsap.to(shape, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: `${(index + 1) * 50}`,
          ease: "none",
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleButtonHover = () => {
    if (!fireworksContainerRef.current) return

    if (fireworksTimelineRef.current) {
      fireworksTimelineRef.current.kill()
    }

    const particles = fireworksContainerRef.current.querySelectorAll(".firework-particle")

    const tl = gsap.timeline()
    fireworksTimelineRef.current = tl

    particles.forEach((particle, index) => {
      const angle = (index / particles.length) * Math.PI * 2
      const distance = 60 + Math.random() * 40
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance

      tl.fromTo(
        particle,
        {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 1,
        },
        {
          x,
          y,
          scale: 1,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        index * 0.02,
      )
    })
  }

  const handleButtonLeave = () => {
    if (fireworksTimelineRef.current) {
      fireworksTimelineRef.current.kill()
    }

    if (!fireworksContainerRef.current) return

    const particles = fireworksContainerRef.current.querySelectorAll(".firework-particle")
    gsap.set(particles, { x: 0, y: 0, scale: 0, opacity: 0 })
  }

  const activeField = hoveredField || focusedField

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen bg-white py-20 px-4 overflow-hidden">
      <div
        ref={decorativeShape1Ref}
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #00BFA6 0%, #00D3F3 100%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={decorativeShape2Ref}
        className="absolute top-40 right-20 w-24 h-24 opacity-30 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)",
          filter: "blur(30px)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />
      <div
        ref={decorativeShape3Ref}
        className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full opacity-15 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #FFA726 0%, #FB8C00 100%)",
          filter: "blur(50px)",
        }}
      />
      <div
        ref={decorativeShape4Ref}
        className="absolute top-1/3 right-10 w-20 h-20 opacity-25 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #7C4DFF 0%, #536DFE 100%)",
          filter: "blur(25px)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        }}
      />
      <div
        ref={decorativeShape5Ref}
        className="absolute bottom-20 right-1/3 w-28 h-28 opacity-20 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #00BFA6 0%, #00E676 100%)",
          filter: "blur(35px)",
          borderRadius: "40% 60% 60% 40% / 60% 40% 40% 60%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 ref={headingRef} className="text-5xl md:text-6xl font-bold text-gray-900 text-balance">
              Get in{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Touch</span>
                <span
                  className="absolute bottom-2 left-0 w-full h-3 bg-[#00BFA6] opacity-30 -rotate-1"
                  style={{ zIndex: -1 }}
                />
              </span>
            </h2>
            <p ref={descriptionRef} className="text-lg text-gray-600 text-pretty">
              Let's collaborate on your next project. Reach out and we'll respond as soon as possible.
            </p>

            <div ref={ctaContainerRef} className="space-y-4 pt-4">
              <button
                onClick={scrollToProjects}
                className="group text-[#00BFA6] hover:text-[#00A88E] font-medium inline-flex items-center gap-2 transition-all hover:gap-3"
              >
                <Sparkles className="w-5 h-5" />
                View our recent work
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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

            <div className="relative flex items-center gap-4">
              <svg
                className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
                width="200"
                height="60"
                viewBox="0 0 200 60"
                fill="none"
              >
                <path
                  ref={trailPathRef}
                  d="M 10 30 Q 60 0, 130 10 T 190 30"
                  stroke="#00BFA6"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  fill="none"
                  style={{ strokeDashoffset: 400 }}
                />
              </svg>

              <div ref={planeTextRef} className="flex items-center gap-2 text-gray-600 font-medium relative z-10">
                <div ref={planeRef} className="text-[#00BFA6]">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-sm">Ready to send?</span>
              </div>
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

      <AnimatePresence>
        {cursorVisible && cursorMessage && (
          <>
            <motion.div
              ref={cursorRef}
              className="fixed pointer-events-none z-50 -translate-x-1 -translate-y-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5.5 3.5L19.5 11.5L12.5 13.5L9.5 20.5L5.5 3.5Z"
                  fill="#1a1a1a"
                  stroke="#1a1a1a"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            <motion.div
              ref={cursorLabelRef}
              className="fixed pointer-events-none z-50"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg">
                {cursorMessage}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeField && (
          <motion.div
            className="absolute pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: fieldDimensions.x,
              y: fieldDimensions.y,
              width: fieldDimensions.width,
              height: fieldDimensions.height,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 150,
              damping: 20,
            }}
          >
            <motion.div
              className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00D3F3]"
              initial={{ x: 20, y: 20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />

            <motion.div
              className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#00D3F3]"
              initial={{ x: -20, y: 20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            />

            <motion.div
              className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#00D3F3]"
              initial={{ x: 20, y: -20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />

            <motion.div
              className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#00D3F3]"
              initial={{ x: -20, y: -20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
