"use client"

import { useEffect, useState } from "react"

export function Banner() {
  const [isVisible, setIsVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    const removeTimer = setTimeout(() => {
      setShouldRender(false)
    }, 4000)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "radial-gradient(ellipse at center, rgb(22, 78, 99) 0%, rgb(0, 0, 0) 70%)",
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Main logo text */}
        <div className="flex items-center justify-center">
          <h1 className="text-[120px] font-bold leading-none tracking-tight md:text-[160px] lg:text-[200px]">
            <span className="text-white">noir</span>
            <span className="text-cyan-400">sfera</span>
          </h1>
        </div>

        {/* Decorative line */}
        <div className="h-1 w-80 bg-cyan-500" />

        {/* Subtitle */}
        <p className="text-xl text-gray-400 md:text-2xl">Software Agency</p>
      </div>
    </div>
  )
}
