"use client"
import { useEffect, useState } from "react"
import { faq } from "@/constants"
import FaqItem from "./FaqItem"
import { motion, AnimatePresence } from "framer-motion"

const founders = [
  { src: "/favicon-png.png", alt: "Founder 1" },
  { src: "/favicon-png.png", alt: "Founder 2" },
]

const FAQ = () => {
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const halfLength = Math.floor(faq.length / 2)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % founders.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="faq"
      className="relative w-full bg-gradient-to-b from-background via-background to-surface py-20 md:py-28 lg:py-36"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl -ml-48" />
      </div>

      {/* Section Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 pb-16 md:pb-20">
        <div className="max-w-3xl">
          <p className="text-sm md:text-base font-semibold text-primary uppercase tracking-widest mb-4">Support</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground tracking-tight font-display text-balance">
            Frequently Asked{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Questions</span>
              <span className="absolute bottom-1 left-0 w-full h-4 bg-primary/20 blur-sm -rotate-1" />
            </span>
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-text-secondary font-medium">
            Find answers to common questions about our services and process
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative">
          {/* Rotating Founder Image (Centered Above) */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
            <div className="relative size-20 overflow-hidden rounded-full border-2 border-primary/40 bg-[#080D27] shadow-lg shadow-primary/15">
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

          {/* FAQ Grid - Even Columns with Perfect Alignment */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 pt-8 auto-rows-fr">
            {/* Left Column */}
            {faq.slice(0, halfLength).map((item, index) => (
              <FaqItem key={item.id} item={item} index={index} activeId={activeId} setActiveId={setActiveId} />
            ))}

            {/* Right Column */}
            {faq.slice(halfLength).map((item, index) => (
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
