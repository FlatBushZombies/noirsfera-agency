"use client"

import { useEffect, useState } from "react"

/**
 * Custom hook for scroll-reactive liquid glass effect
 * Monitors scroll position and provides class toggling for enhanced glassmorphism
 */
export function useScrollGlass(threshold = 100) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > threshold)
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return isScrolled
}

/**
 * Returns dynamic class for scroll-reactive glass components
 */
export function getScrollGlassClass(isScrolled: boolean, baseClass = "liquid-glass-card") {
  return isScrolled ? `${baseClass} liquid-glass-scroll-active` : baseClass
}
