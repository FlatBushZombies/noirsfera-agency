"use client"

import { useEffect, useState } from "react"

export default function Banner() {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [progress, setProgress] = useState(0)
  const [letterIndex, setLetterIndex] = useState(0)

  const brandName = "noirsfera"
  const tagline = "Software Agency"

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
        return prev + 2
      })
    }, 40)

    // Letter reveal animation
    const letterInterval = setInterval(() => {
      setLetterIndex((prev) => {
        if (prev >= brandName.length) {
          clearInterval(letterInterval)
          return brandName.length
        }
        return prev + 1
      })
    }, 200)

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
      clearInterval(letterInterval)
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
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#00BFA6]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Rotating geometric shapes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-64 w-64">
          {/* Outer rotating square */}
          <div
            className="absolute inset-0 border-2 border-[#00BFA6]/30"
            style={{
              animation: "rotate 8s linear infinite",
            }}
          />
          {/* Middle rotating square */}
          <div
            className="absolute inset-8 border-2 border-[#00BFA6]/50"
            style={{
              animation: "rotate 6s linear infinite reverse",
            }}
          />
          {/* Inner rotating square */}
          <div
            className="absolute inset-16 border-2 border-[#00BFA6]/70"
            style={{
              animation: "rotate 4s linear infinite",
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Brand name with letter reveal */}
        <div className="flex items-center justify-center">
          <h1 className="text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            {brandName.split("").map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ${
                  index < letterIndex ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${index < 4 ? "text-white" : "text-[#00BFA6]"}`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Circular progress indicator */}
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90 transform">
            {/* Background circle */}
            <circle cx="64" cy="64" r="56" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="4" fill="none" />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#00BFA6"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          {/* Progress percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Tagline with fade in */}
        <p
          className={`text-lg text-gray-400 transition-all duration-1000 md:text-xl ${
            progress > 50 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {tagline}
        </p>

        {/* Animated line */}
        <div className="h-0.5 w-64 overflow-hidden bg-white/10">
          <div className="h-full bg-[#00BFA6] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
