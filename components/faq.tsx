"use client"

import { useEffect, useState } from "react"
import { faq } from "@/constants"
import FaqItem from "./FaqItem"
import { motion, AnimatePresence } from "framer-motion"

const founders = [
  { src: "/profiles/lackson.jpg", alt: "Founder 1" },
  { src: "/profiles/lackson.jpg", alt: "Founder 2" },
]

const FAQ = () => {
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const halfLength = Math.floor(faq.length / 2)

  // Which founder to show when not hovered
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  // cycle images simply every 4 seconds (only when not hovered)
  useEffect(() => {
    if (hovered) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % founders.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [hovered])

  return (
    <section className="relative rounded-3xl overflow-hidden">
      <div className="mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4 relative z-2 py-28">
        <div className="max-w-[calc(50%-40px)] max-lg:max-w-full">
          <h3 className="text-[64px] font-black leading-[64px] max-md:h5 mb-7 text-p4">
            Frequently asked questions
          </h3>
          <p className="text-[22px] leading-[36px]">You've got questions we've got answers</p>
        </div>
        <div className="faq-line_after w-0.5 h-full absolute left-[calc(50%-1px)] top-0 -z-1 bg-[#0C1838] max-lg:hidden" />
      </div>

      <div
        className="
        faq-glow_before relative z-2 border-2 border-[#0C1838] bg-[#080D27]
        rounded-3xl max-lg:rounded-2xl
      "
      >
        <div className="mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4 flex gap-10 max-lg:block">
          
          {/* Hover-based Founder Display */}
          <div
            className="absolute -top-10 left-[calc(50%-40px)] z-4 max-lg:hidden flex"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="relative size-20 overflow-hidden rounded-full border-2 border-[#0C1838] bg-[#080D27] flex items-center justify-center">
              {hovered ? (
                <div className="flex items-center justify-center w-full h-full gap-[2px]">
                  <img
                    src={founders[0].src}
                    alt={founders[0].alt}
                    className="w-[45%] h-full object-cover rounded-full scale-90"
                  />
                  <span className="text-white font-bold">+</span>
                  <img
                    src={founders[1].src}
                    alt={founders[1].alt}
                    className="w-[45%] h-full object-cover rounded-full scale-90"
                  />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={founders[currentIndex].src}
                    alt={founders[currentIndex].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>
              )}
            </div>
          </div>

          <div className="relative flex-1 pt-24">
            {faq.slice(0, halfLength).map((item, index) => (
              <FaqItem
                key={item.id}
                item={item}
                index={index}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </div>

          <div className="relative flex-1 lg:pt-24">
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

        <div className="faq-line_after absolute left-[calc(50%-1px)] top-0 -z-1 h-full w-0.5 bg-[#0C1838] max-lg:hidden" />
      </div>
    </section>
  )
}

export default FAQ
