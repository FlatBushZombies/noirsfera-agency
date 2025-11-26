"use client"

import type React from "react"

import { useState } from "react"
import { Twitter, Instagram, Send } from "lucide-react"

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <footer className="relative bg-foreground text-white overflow-hidden">
      <div className="relative z-10 px-6 py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with CTA */}
          <div className="text-center mb-24 relative" onMouseMove={handleMouseMove}>
            {/* Animated Gradient Background - Updated to exact primary color */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
                style={{
                  background: `radial-gradient(circle at center, #00D9FF 0%, transparent 70%)`,
                  animation: `spin 8s linear infinite`,
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter mb-8 leading-tight text-balance">
                If you scrolled this far,
                <br />
                we should queue up a time to chat
              </h2>

              {/* CTA Button with Hover Effect - Updated button colors */}
              <div className="relative inline-block group">
                 <div
                  className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
                    <path
                      d="M5 12h14m0 0l-7-7m7 7l-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <a href="https://t.me/itsslucki" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <button
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  className="relative px-8 py-4 bg-black border-2 border-white font-display rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer group-hover:shadow-[0_0_30px_rgba(14,200,243,0.5)]"
                >
                  {isButtonHovered ? "Let's Go" : "Get Started"}
                </button>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="border-t border-white/10 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
              {/* Logo */}
              <div className="text-2xl font-black font-display tracking-tight">noirsfera</div>

              {/* Social Icons */}
              <div className="flex gap-6">
                <a
                  href="https://x.com/from_noirsfera"
                  className="hover:text-primary transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>

                <a
                  href="https://www.instagram.com/noirsfera/"
                  className="hover:text-primary transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>

                <a
                  href="https://t.me/itsslucki"
                  className="hover:text-primary transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                  aria-label="Telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send size={20} />
                </a>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60 border-t border-white/10 pt-8">
              <p>© 2025 noirsfera. All Rights Reserved</p>
              <div className="flex gap-6">
                <a href="#privacy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#terms" className="hover:text-white transition-colors duration-200">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
