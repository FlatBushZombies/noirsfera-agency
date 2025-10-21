"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

// ✅ FIX: Import and register MotionPathPlugin for GSAP path animation
import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
gsap.registerPlugin(MotionPathPlugin) // ✅ Required for motionPath animations

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

  // ✅ Cursor follow animation
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

  // ✅ FIXED: GSAP plane + trail animation (register plugin + mount properly)
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
          autoRotate: true, // ✅ FIX: auto-rotation follows path
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

  const activeField = hoveredField || focusedField

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle submission here
  }

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen bg-white py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 text-balance">Get in Touch</h2>
            <p className="text-lg text-gray-600 text-pretty">
              Let's collaborate on your next project. Reach out and we'll respond as soon as possible.
            </p>
            <button
              onClick={scrollToProjects}
              className="text-[#00D3F3] hover:text-[#00B8D4] font-medium inline-flex items-center gap-2 transition-colors"
            >
              View our recent work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
                  <Send className="w-5 h-5" /> {/* ✅ Confirmed visible now */}
                </div>
                <span className="text-sm">Ready to send?</span>
              </div>
            </div>

            <Button
              ref={buttonRef}
              type="submit"
              className="w-full md:w-auto bg-[#00D3F3] hover:bg-[#00B8D4] text-white font-semibold px-8 py-6 text-lg transition-colors"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>

      {/* Cursor and field highlight animations remain unchanged */}
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
    </section>
  )
}
