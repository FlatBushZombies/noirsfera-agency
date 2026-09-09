"use client"

import { useEffect, useRef } from "react"

export function Hero() {
  const sphereRef = useRef<HTMLDivElement>(null)

  // Light source follows the pointer — the sphere reads as a real object
  useEffect(() => {
    const sphere = sphereRef.current
    if (!sphere) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return

    let raf: number | null = null
    let lx = 34
    let ly = 26

    const onPointerMove = (e: PointerEvent) => {
      const r = sphere.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.55)))
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.7)))
      lx = 34 + dx * 22
      ly = 26 + dy * 18
      if (raf === null) {
        raf = requestAnimationFrame(() => {
          raf = null
          sphere.style.setProperty("--lx", `${lx.toFixed(1)}%`)
          sphere.style.setProperty("--ly", `${ly.toFixed(1)}%`)
        })
      }
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", onPointerMove)
  }, [])

  return (
    <section className="hero" id="about">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow seq">Software studio · Est. for founders</p>
          <h1 className="hero-heading seq d1">
            Modernising business through <em>futuristic software</em>.
          </h1>
          <p className="lede seq d2">
            We design and build web platforms, mobile products and AI systems that move brands forward — shipped in
            weeks, not quarters.
          </p>
          <div className="hero-actions seq d3">
            <a className="btn btn-primary" href="#contact">
              Start a project
            </a>
            <a className="btn btn-ghost" href="#work">
              See the work
            </a>
          </div>
        </div>

        <div className="sphere-stage" aria-hidden="true">
          <div className="halo" />
          <div className="sphere" ref={sphereRef} id="sphere" />
        </div>
      </div>
    </section>
  )
}
