"use client"

import type React from "react"

import { useState } from "react"
import { Twitter, Facebook, Instagram, Github } from "lucide-react"

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Main Content Section */}
      <div className="relative z-10 px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with CTA */}
          <div className="text-center mb-20 relative" onMouseMove={handleMouseMove}>
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl animate-spin-slow"
                style={{
                  background: `radial-gradient(circle at center, #0EC8F3 0%, transparent 70%)`,
                  animationDuration: "8s",
                }}
              />
              <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-2xl animate-spin-reverse"
                style={{
                  background: `radial-gradient(circle at center, #0EC8F3 0%, transparent 60%)`,
                  animationDuration: "6s",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-balance">
                Drop us a line or two, we are
                <br />
                open for creative minds and
                <br />
                collaborations!
              </h2>

              {/* CTA Button with Hover Effect */}
              <div className="relative inline-block group">
                {/* Pointer indicator */}
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

                <button className="relative px-8 py-4 bg-black border-2 border-white rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer group-hover:shadow-[0_0_30px_rgba(14,200,243,0.5)]">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="border-t border-white/10 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
              {/* Logo */}
              <div className="text-xl font-bold tracking-wider">/noirsfera</div>

              {/* Navigation Links */}
              <nav className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
                <a href="#about" className="hover:text-cyan-400 transition-colors duration-200">
                  About
                </a>
                <a href="#features" className="hover:text-cyan-400 transition-colors duration-200">
                  Features
                </a>
                <a href="#works" className="hover:text-cyan-400 transition-colors duration-200">
                  Works
                </a>
                <a href="#support" className="hover:text-cyan-400 transition-colors duration-200">
                  Contact
                </a>
              </nav>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="#" className="hover:text-cyan-400 transition-colors duration-200" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="hover:text-cyan-400 transition-colors duration-200" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-cyan-400 transition-colors duration-200" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
              <p>© Copyright 2025, All Rights Reserved</p>
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
