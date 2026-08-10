"use client"

import type { RefObject } from "react"
import { motion, type MotionValue } from "framer-motion"

/**
 * The hero's decorative composition: a polished obsidian sphere (primary,
 * centered, md+ only) with two orbital rings, and a translucent ribbon/
 * membrane (secondary, all breakpoints, framing it from the upper right).
 *
 * Both objects receive their transform-layer refs and mouse-parallax spring
 * MotionValues from `hero.tsx`, which also owns the continuous GSAP drift /
 * scroll-scrub timelines (targeted via these refs and the class hooks below:
 * `.artifact-corona`, `.artifact-glint`, `.artifact-seam-core`,
 * `.orbital-ring-1`, `.orbital-ring-2`).
 */

interface HeroVisualProps {
  artifactRef: RefObject<HTMLDivElement | null>
  ribbonRef: RefObject<HTMLDivElement | null>
  artifactX: MotionValue<number>
  artifactY: MotionValue<number>
  ribbonX: MotionValue<number>
  ribbonY: MotionValue<number>
}

export function HeroVisual({ artifactRef, ribbonRef, artifactX, artifactY, ribbonX, ribbonY }: HeroVisualProps) {
  return (
    <>
      {/* ── Ribbon — translucent folded membrane, frames the artifact from the upper right ── */}
      <motion.div
        style={{ x: ribbonX, y: ribbonY }}
        className="absolute top-[16%] right-[-6%] pointer-events-none"
        aria-hidden="true"
      >
        <div
          ref={ribbonRef}
          className="w-[340px] h-[400px] sm:w-[440px] sm:h-[500px] md:w-[600px] md:h-[700px] opacity-[0.85]"
          style={{ transform: "translate(12%, -6%)" }}
        >
          <svg viewBox="0 0 600 700" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="ribbonFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0a0f13" stopOpacity="0.30" />
                <stop offset="30%" stopColor="#00d9ff" stopOpacity="0.10" />
                <stop offset="48%" stopColor="#cdf7ff" stopOpacity="0.20" />
                <stop offset="62%" stopColor="#00d9ff" stopOpacity="0.09" />
                <stop offset="100%" stopColor="#00131a" stopOpacity="0.26" />
              </linearGradient>
              <linearGradient id="ribbonFillMid" x1="10%" y1="0%" x2="95%" y2="100%">
                <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.16" />
                <stop offset="50%" stopColor="#eafcff" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="ribbonEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="16%" stopColor="#eafcff" stopOpacity="0.7" />
                <stop offset="42%" stopColor="#00d9ff" stopOpacity="0.32" />
                <stop offset="72%" stopColor="#00d9ff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
              </linearGradient>
              <filter id="ribbonBlurSoft" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
              <filter id="ribbonBlurTight" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <filter id="ribbonBlurEdge" x="-15%" y="-15%" width="130%" height="130%">
                <feGaussianBlur stdDeviation="1.4" />
              </filter>
            </defs>

            {/* Back layer — widest blur, faintest, sells depth. Hidden on mobile (perf). */}
            <path
              className="hidden md:block"
              d="M480,20 C430,55 445,120 400,155 C350,193 290,175 255,225 C218,277 260,335 222,388 C190,432 135,418 122,485 C112,535 145,575 120,620 L188,565 C205,530 182,500 190,460 C200,405 242,415 270,375 C302,330 268,282 302,235 C335,188 388,200 435,165 C478,130 465,68 520,35 Z"
              fill="url(#ribbonFill)"
              opacity="0.55"
              filter="url(#ribbonBlurSoft)"
              transform="translate(8,-5)"
            />
            {/* Mid layer — tighter blur, catches the fold's internal light band */}
            <path
              className="hidden md:block"
              d="M480,20 C430,55 445,120 400,155 C350,193 290,175 255,225 C218,277 260,335 222,388 C190,432 135,418 122,485 C112,535 145,575 120,620 L188,565 C205,530 182,500 190,460 C200,405 242,415 270,375 C302,330 268,282 302,235 C335,188 388,200 435,165 C478,130 465,68 520,35 Z"
              fill="url(#ribbonFillMid)"
              opacity="0.6"
              filter="url(#ribbonBlurTight)"
            />
            {/* Base fill — always visible, no filter, cheap on mobile */}
            <path
              d="M480,20 C430,55 445,120 400,155 C350,193 290,175 255,225 C218,277 260,335 222,388 C190,432 135,418 122,485 C112,535 145,575 120,620 L188,565 C205,530 182,500 190,460 C200,405 242,415 270,375 C302,330 268,282 302,235 C335,188 388,200 435,165 C478,130 465,68 520,35 Z"
              fill="url(#ribbonFillMid)"
              opacity="0.3"
            />
            {/* Front contour — the illuminated edge of the fold */}
            <path
              d="M480,20 C430,55 445,120 400,155 C350,193 290,175 255,225 C218,277 260,335 222,388 C190,432 135,418 122,485 C112,535 145,575 120,620"
              fill="none"
              stroke="url(#ribbonEdge)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#ribbonBlurEdge)"
            />
            <path
              d="M480,20 C430,55 445,120 400,155 C350,193 290,175 255,225 C218,277 260,335 222,388 C190,432 135,418 122,485 C112,535 145,575 120,620"
              fill="none"
              stroke="url(#ribbonEdge)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* One sparse soft particle riding along the ribbon */}
            <circle className="hidden md:block" cx="150" cy="470" r="2.4" fill="#eafcff" opacity="0.4" filter="url(#ribbonBlurEdge)" />
          </svg>
        </div>
      </motion.div>

      {/* ── Artifact — polished obsidian sphere with orbital rings, centered anchor (md+ only) ── */}
      <motion.div
        style={{ x: artifactX, y: artifactY }}
        className="absolute top-1/2 left-1/2 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <div
          ref={artifactRef}
          className="relative w-[560px] h-[600px]"
          style={{ transform: "translate(-50%, -54%)" }}
        >
          {/* Ambient corona — soft atmospheric bloom behind the artifact */}
          <div className="artifact-corona absolute inset-0 rounded-full bg-primary/[0.05] blur-[100px]" />
          <div className="absolute inset-[70px] rounded-full bg-primary/[0.035] blur-[64px]" />

          <svg viewBox="0 0 560 600" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              {/* Base body — graphite-to-obsidian, radial falloff from the upper-left key light so it reads as a curved, lit ball rather than a flat panel */}
              <radialGradient id="artifactBase" cx="34%" cy="26%" r="80%">
                <stop offset="0%" stopColor="#1b1d24" />
                <stop offset="26%" stopColor="#101116" />
                <stop offset="58%" stopColor="#09090b" />
                <stop offset="100%" stopColor="#030304" />
              </radialGradient>
              {/* Cyan bleed — light interacting with the material, not a flat fill */}
              <radialGradient id="artifactCyanBleed" cx="32%" cy="70%" r="55%">
                <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.20" />
                <stop offset="35%" stopColor="#00d9ff" stopOpacity="0.07" />
                <stop offset="70%" stopColor="#00d9ff" stopOpacity="0" />
              </radialGradient>
              {/* Specular highlight — defined light source, controlled falloff */}
              <radialGradient id="artifactSpecular" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="42%" stopColor="#ffffff" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              {/* Rim light gradient — traces only the top-left edge catching key light */}
              <linearGradient id="artifactRim" x1="0%" y1="0%" x2="100%" y2="60%">
                <stop offset="0%" stopColor="#eafcff" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#00d9ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
              </linearGradient>
              {/* Bounce-rim — faint fill light on the shadow side, opposite the key light */}
              <linearGradient id="artifactBounce" x1="100%" y1="100%" x2="0%" y2="40%">
                <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
              </linearGradient>
              {/* Internal glow seam — a thin crack of light within the material */}
              <linearGradient id="artifactSeam" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00d9ff" stopOpacity="0" />
                <stop offset="30%" stopColor="#eafcff" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#00d9ff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
              </linearGradient>
              {/* Glint sweep — a slow specular gleam traveling across the polished surface */}
              <linearGradient id="artifactGlint" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              <clipPath id="artifactClip">
                <circle cx="280" cy="300" r="210" />
              </clipPath>

              {/* Fine surface grain — tight filter region, rendered once (not animated) */}
              <filter id="artifactGrain" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" stitchTiles="stitch" result="noise" />
                <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
              </filter>
              <filter id="artifactSpecBlur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <filter id="artifactSeamBlur" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
              <filter id="artifactRimBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
            </defs>

            <g clipPath="url(#artifactClip)">
              {/* Body */}
              <rect x="0" y="0" width="560" height="600" fill="url(#artifactBase)" />
              {/* Light interacting with the material */}
              <rect x="0" y="0" width="560" height="600" fill="url(#artifactCyanBleed)" />
              {/* Fine surface grain, blended as overlay at very low opacity */}
              <rect
                x="0"
                y="0"
                width="560"
                height="600"
                fill="#ffffff"
                filter="url(#artifactGrain)"
                opacity="0.06"
                style={{ mixBlendMode: "overlay" }}
              />
              {/* Specular highlight — sits in the upper-left quadrant of the sphere */}
              <ellipse cx="225" cy="195" rx="125" ry="98" fill="url(#artifactSpecular)" filter="url(#artifactSpecBlur)" />

              {/* Surface curvature cues — foreshortened "meridian"/"equator" arcs, like a globe's graticule, sell the sphere's roundness without reading as cut facets */}
              <ellipse cx="280" cy="300" rx="132" ry="210" stroke="rgba(255,255,255,0.032)" strokeWidth="1" fill="none" />
              <ellipse cx="280" cy="300" rx="58" ry="210" stroke="rgba(0,0,0,0.16)" strokeWidth="1" fill="none" />
              <ellipse cx="280" cy="300" rx="210" ry="46" stroke="rgba(255,255,255,0.022)" strokeWidth="1" fill="none" />

              {/* Internal glow seam — light escaping a crack in the material */}
              <path
                d="M304,150 Q276,210 300,260 Q326,310 284,360 Q256,400 278,430"
                stroke="url(#artifactSeam)"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
                filter="url(#artifactSeamBlur)"
              />
              <path
                className="artifact-seam-core"
                d="M304,150 Q276,210 300,260 Q326,310 284,360 Q256,400 278,430"
                stroke="url(#artifactSeam)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
              />

              {/* Glint sweep — GSAP translates this group slowly left-right */}
              <g className="artifact-glint">
                <rect x="-60" y="-700" width="70" height="1600" fill="url(#artifactGlint)" transform="rotate(24 280 300)" />
              </g>

              {/* Sparse highlight particles */}
              <circle cx="425" cy="175" r="2.6" fill="#eafcff" opacity="0.45" />
              <circle cx="146" cy="420" r="2" fill="#00d9ff" opacity="0.3" />
            </g>

            {/* Rim light — the arc catching the key light, top of the sphere biased left */}
            <path
              d="M82.66,228.18 A210,210 0 0,1 477.34,228.18"
              stroke="url(#artifactRim)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              filter="url(#artifactRimBlur)"
            />
            {/* Bounce rim — faint fill light on the opposite, shadowed arc */}
            <path
              d="M477.34,371.82 A210,210 0 0,1 82.66,371.82"
              stroke="url(#artifactBounce)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              filter="url(#artifactRimBlur)"
            />
            {/* Outer silhouette definition */}
            <circle cx="280" cy="300" r="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
          </svg>

          {/* Orbital rings — reinforce the "sphere" identity; outer ring reads in front of the surface, inner ring hugs it */}
          <div
            className="orbital-ring-1 absolute rounded-full"
            style={{
              left: 50, top: 70, width: 460, height: 460,
              border: "1px solid rgba(0,217,255,0.13)",
              boxShadow: "0 0 6px rgba(0,217,255,0.08), inset 0 0 6px rgba(0,217,255,0.04)",
            }}
          />
          <div
            className="orbital-ring-2 absolute rounded-full border border-white/[0.06]"
            style={{ left: 90, top: 110, width: 380, height: 380 }}
          />
        </div>
      </motion.div>
    </>
  )
}
