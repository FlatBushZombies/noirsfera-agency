"use client"
import type React from "react"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useScrollGlass, getScrollGlassClass } from "@/lib/use-scroll-glass"

interface FaqItemProps {
  item: {
    id: string | number
    question: string
    answer: string
  }
  index: number
  activeId: string | number | null
  setActiveId: React.Dispatch<React.SetStateAction<string | number | null>>
}

const FaqItem: React.FC<FaqItemProps> = ({ item, index, activeId, setActiveId }) => {
  const isActive = activeId === item.id
  const isScrolled = useScrollGlass(120)

  const toggleActive = () => {
    setActiveId(isActive ? null : item.id)
  }

  return (
    <div className="relative z-2 mb-3 group">
      <div
        className={clsx(
          "relative flex cursor-pointer items-start justify-between gap-6 px-6 py-5 rounded-xl transition-all duration-300 h-30 overflow-hidden",
          getScrollGlassClass(isScrolled),
          "backdrop-blur-xl border-2 border-white/30 hover:border-primary/50",
          isActive && "border-primary/50",
        )}
        onClick={toggleActive}
      >
        <span className="liquid-noise rounded-xl" />

        {/* Left Content */}
        <div className="flex-1 relative z-10">
          <div className="text-xs font-bold leading-5 tracking-widest mb-2 text-primary uppercase opacity-70 max-lg:hidden">
            {index < 10 ? `0${index}` : index}
          </div>
          <div
            className={clsx(
              "text-lg md:text-xl font-bold leading-relaxed text-foreground transition-all duration-500 line-clamp-2",
              isActive && "text-primary",
            )}
          >
            {item.question}
          </div>
        </div>

        {/* Toggle Icon */}
        <div
          className={clsx(
            "relative flex w-12 h-12 items-center justify-center rounded-full border-2 transition-all duration-300 flex-shrink-0 shadow-md backdrop-blur-xl z-10",
            isActive
              ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
              : "border-primary/20 hover:border-primary hover:shadow-md hover:shadow-primary/15 bg-white/20 group-hover:bg-primary/5",
          )}
        >
          {isActive ? (
            <Minus className="w-5 h-5 text-primary transition-all duration-300 font-bold" />
          ) : (
            <Plus className="w-5 h-5 text-primary/60 group-hover:text-primary transition-all duration-300" />
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="relative text-base leading-relaxed tracking-wide text-text-secondary px-6 py-5 border-l-4 border-primary/40 ml-0 mt-2 rounded-r-lg overflow-hidden bg-gradient-to-r from-primary/8 to-primary/4 backdrop-blur-xl">
              <span className="liquid-noise rounded-r-lg opacity-50" />
              <span className="relative z-10">{item.answer}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FaqItem
