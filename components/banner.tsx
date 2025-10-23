"use client"

import { useEffect, useState } from "react"

export default function Banner() {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [progress, setProgress] = useState(0)

  const brandName = "noirsfera"

  useEffect(() => {
    const hasShownLoading = sessionStorage.getItem("hasShownLoading")

    if (hasShownLoading) {
      setShouldRender(false)
      return
    }

    // Show loading animation
    setShouldRender(true)
    setIsVisible(true)
    document.body.style.overflow = "hidden"

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2.5
      })
    }, 40)

    // Fade out after 3.5 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false)
    }, 3500)

    // Remove component after 4 seconds
    const removeTimer = setTimeout(() => {
      setShouldRender(false)
      document.body.style.overflow = "auto"
      sessionStorage.setItem("hasShownLoading", "true")
    }, 4000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(fadeOutTimer)
      clearTimeout(removeTimer)
      document.body.style.overflow = "auto"
    }
  }, [])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Brand name */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            <span className="text-white">noir</span>
            <span className="text-[#00BFA6]">sfera</span>
          </h1>
        </div>

        {/* Loading section */}
        <div className="flex w-full max-w-md flex-col items-center gap-4">
          {/* Loading text and percentage */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium tracking-widest text-white/60">LOADING</span>
            <span className="text-2xl font-bold text-[#00BFA6]">{Math.round(progress)}%</span>
          </div>

          {/* Loading bar */}
          <div className="h-1 w-full overflow-hidden bg-white/10">
            <div
              className="h-full bg-[#00BFA6] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
