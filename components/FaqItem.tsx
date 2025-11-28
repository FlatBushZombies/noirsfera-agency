"use client"

import type React from "react"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

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

  const toggleActive = () => {
    setActiveId(isActive ? null : item.id)
  }

  return (
    <div className="relative z-2 mb-3 group">
      <div
        className="relative flex cursor-pointer items-start justify-between gap-6 px-6 py-5 rounded-xl border-2 border-[#e5e5e5] hover:border-[#00D9FF]/40 transition-all duration-300 bg-white hover:bg-white/80 h-30"
        onClick={toggleActive}
      >
        {/* Left Content */}
        <div className="flex-1">
          <div className="text-xs font-bold leading-5 tracking-widest mb-2 text-[#00D9FF] uppercase opacity-70 max-lg:hidden">
            {index < 10 ? `0${index}` : index}
          </div>
          <div
            className={clsx(
              "text-lg md:text-xl font-bold leading-relaxed text-foreground transition-all duration-500 line-clamp-2",
              isActive && "text-[#00D9FF]",
            )}
          >
            {item.question}
          </div>
        </div>

        <div
          className={clsx(
            "relative flex size-12 items-center justify-center rounded-full border-2 transition-all duration-300 flex-shrink-0 shadow-sm",
            isActive
              ? "border-[#00D9FF] bg-[#00D9FF]/10 shadow-lg shadow-[#00D9FF]/20"
              : "border-[#00D9FF]/20 hover:border-[#00D9FF] hover:shadow-md hover:shadow-[#00D9FF]/15 bg-white group-hover:bg-[#00D9FF]/5",
          )}
        >
          {isActive ? (
            <Minus className="size-5 text-[#00D9FF] transition-all duration-300 font-bold" />
          ) : (
            <Plus className="size-5 text-[#00D9FF]/60 group-hover:text-[#00D9FF] transition-all duration-300" />
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
            <div className="text-base leading-relaxed tracking-wide text-text-secondary px-6 py-5 border-l-4 border-[#00D9FF]/40 ml-0 mt-2 bg-[#00D9FF]/5 rounded-r-lg">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FaqItem
