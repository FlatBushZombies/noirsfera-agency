"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { FlipWords } from "./ui/shadcn-io/flip-words"
import Image from "next/image"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const avatarsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const curlyRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(badgeRef.current, { opacity: 0, y: 20, duration: 0.8, delay: 0.1 })
        .from(headingRef.current, { opacity: 0, y: 50, duration: 1 }, "-=0.5")
        .from(descriptionRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
        .from(avatarsRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .fromTo(
          Array.from(buttonsRef.current?.children || []),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 },
          "-=0.3",
        )

      tl.from(curlyRef.current, { opacity: 0, scale: 0.8, duration: 1.2, ease: "back.out(1.7)" }, "-=1")

      gsap.to(avatarsRef.current, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(curlyRef.current, {
        y: -15,
        x: 10,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true)
    gsap.to(e.currentTarget, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false)
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleTelegramClick = () => {
    window.open("https://t.me/itsslucki", "_blank")
  }

  const words = ["businesses", "startups", "brands"];

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background pt-2"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-40"></div>
      
      <div 
        ref={curlyRef}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] pointer-events-none opacity-70 blur-[0.5px]"
        style={{ transform: 'translate(20%, -10%)' }}
      >
        <svg
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="curlyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EC8F3" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0EC8F3" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7DDFF5" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="curlyGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7DDFF5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#B8EFFA" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main curly spring path - inspired by reference image */}
          <path
            d="M 450 50 Q 400 100 420 150 Q 440 200 380 230 Q 320 260 340 320 Q 360 380 280 400 Q 200 420 220 490"
            stroke="url(#curlyGradient1)"
            strokeWidth="85"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
            className="drop-shadow-[0_0_40px_rgba(14,200,243,0.6)]"
          />
          
          {/* Inner highlight for 3D effect */}
          <path
            d="M 450 50 Q 400 100 420 150 Q 440 200 380 230 Q 320 260 340 320 Q 360 380 280 400 Q 200 420 220 490"
            stroke="url(#curlyGradient2)"
            strokeWidth="45"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          
          {/* Secondary flowing element */}
          <path
            d="M 500 150 Q 480 190 490 230 Q 500 270 460 290 Q 420 310 430 360"
            stroke="url(#curlyGradient1)"
            strokeWidth="60"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
            opacity="0.6"
            className="drop-shadow-[0_0_30px_rgba(14,200,243,0.5)]"
          />
        </svg>
      </div>

      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#0EC8F3]/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-[#0EC8F3]/10 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-5">
            <div ref={badgeRef} className="flex justify-center">
              <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-500 font-guminert">Available for New projects</span>
              </div>
            </div>

            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance font-inter drop-shadow-sm"
            >
              Modernising <FlipWords words={words} duration={500} letterDelay={0.05} wordDelay={0.3} />through <span className="text-[#0EC8F3] font-space-boards drop-shadow-[0_0_30px_rgba(14,200,243,0.5)]">futuristic</span>{" "}
              software
            </h1>
          </div>

          <div ref={avatarsRef} className="flex flex-col items-center gap-3">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden relative shadow-lg">
                <Image src="/avatar-1.png" alt="Client avatar 1" fill className="object-cover" />
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden relative shadow-lg">
                <Image src="/avatar-2.jpg" alt="Client avatar 2" fill className="object-cover" />
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden relative shadow-lg">
                <Image src="/avatar-3.jpg" alt="Client avatar 3" fill className="object-cover" />
              </div>
            </div>
            <p
              ref={descriptionRef}
              className="text-muted-foreground md:text-lg lg:text-xl max-w-2xl text-base font-medium leading-relaxed"
            >
              Building Digital Experiences that moves Brands Forward
            </p>
          </div>
          <div ref={buttonsRef} className="flex justify-center items-center font-guminert">
            <Button
              size="default"
              aria-label="Connect on Telegram"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleTelegramClick}
              className="relative group bg-[#0EC8F3] text-black hover:bg-[#0EC8F3]/90 transition-all text-lg font-semibold px-8 py-4 h-auto rounded-lg shadow-[0_0_20px_rgba(14,200,243,0.5)] hover:shadow-[0_0_30px_rgba(14,200,243,0.7)]"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#0EC8F3] font-inter">
                  <Image src="/profiles/lackson.jpg" alt="Profile" fill className="object-cover" />
                </div>
                <span
                  className={`transition-all duration-300 
                    ${isHovered ? "opacity-0 scale-95 max-w-0" : "opacity-100 scale-100 max-w-[200px]"}
                  `}
                >
                  Connect to Telegram
                </span>
                <div
                  className={`flex items-center gap-2 transition-all duration-300 overflow-hidden
                    ${isHovered ? "opacity-100 scale-100 max-w-[200px]" : "opacity-0 scale-95 max-w-0"}
                  `}
                >
                  <span className="text-muted-foreground">+ You</span>
                  <span>Let's chat</span>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
