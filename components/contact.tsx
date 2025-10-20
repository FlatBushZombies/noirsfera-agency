"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { gsap } from "gsap"

type FieldType = "name" | "email" | "message" | null

export default function ContactSection() {
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
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Content */}
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

          {/* Right Side - Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
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

            {/* Email Field */}
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

            {/* Message Field */}
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full md:w-auto bg-[#00D3F3] hover:bg-[#00B8D4] text-white font-semibold px-8 py-6 text-lg transition-colors"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {cursorVisible && cursorMessage && (
          <>
            {/* Cursor pointer */}
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

            {/* Cursor label */}
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
            {/* Top-left corner */}
            <motion.div
              className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00D3F3]"
              initial={{ x: 20, y: 20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />

            {/* Top-right corner */}
            <motion.div
              className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#00D3F3]"
              initial={{ x: -20, y: 20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            />

            {/* Bottom-left corner */}
            <motion.div
              className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#00D3F3]"
              initial={{ x: 20, y: -20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />

            {/* Bottom-right corner */}
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
