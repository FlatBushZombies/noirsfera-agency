"use client"

import { useState } from "react"
import { faq } from "@/constants"
import FaqItem from "./FaqItem"

const FAQ = () => {
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const halfLength = Math.floor(faq.length / 2)

  return (
    <section>
      <div className="mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4 relative z-2 py-28">
        <div className="max-w-[calc(50%-40px)] max-lg:max-w-full">
          <h3 className="text-[64px] font-black leading-[64px] max-md:h5 mb-7 text-p4">
            Frequently asked questions
          </h3>
          <p className="text-[22px] leading-[36px]">You've got questions we've got answers</p>
        </div>
        <div className="faq-line_after w-0.5 h-full absolute left-[calc(50%-1px)] top-0 -z-1 bg-[#0C1838] max-lg:hidden" />
      </div>

      <div className="faq-glow_before relative z-2 border-2 border-[#0C1838] bg-[#080D27]">
        <div className="mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4 flex gap-10 max-lg:block">
          <div className="rounded-full absolute -top-10 left-[calc(50%-40px)] z-4 flex size-20 items-center justify-center border-2 border-[#0C1838] bg-[#080D27] max-lg:hidden"></div>

          <div className="relative flex-1 pt-24">
            {faq.slice(0, halfLength).map((item, index) => (
              <FaqItem key={item.id} item={item} index={index} activeId={activeId} setActiveId={setActiveId} />
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
