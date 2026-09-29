"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"

// Port of the design's <ascii-sphere> custom element: the noirsfera mark —
// letters pour in like hourglass sand, pile into a globe, hold, drain out, repeat.
const FILL = 4200
const HOLD = 2600
const DRAIN = 2600
const PAUSE = 500

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

interface Point {
  tx: number
  ty: number
  dx: number
  dy: number
  nz: number
  r: number
  sx: number
  key: number
  s: number
  d: number
  ds: number
  dd: number
}

interface AsciiSphereProps {
  cx?: number
  cy?: number
  size?: number
  fg?: string
  fg2?: string
  word?: string
  className?: string
  style?: CSSProperties
  "aria-hidden"?: boolean
}

export function AsciiSphere({
  cx = 0.5,
  cy = 0.5,
  size = 0.36,
  fg = "10,10,11",
  fg2 = "0,0,255",
  word = "noirsfera",
  className,
  style,
  ...rest
}: AsciiSphereProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const canvas = document.createElement("canvas")
    canvas.style.cssText = "display:block;width:100%;height:100%"
    canvas.setAttribute("aria-hidden", "true")
    host.appendChild(canvas)
    const ctx = canvas.getContext("2d")

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const t0 = performance.now()
    let mx = 0
    let my = 0
    let lx = -0.55
    let ly = -0.5
    let last = 0
    let raf = 0
    let visible = false
    let dpr = 1
    let w = 0
    let h = 0
    let fs = 10
    let pxCx = 0
    let pxCy = 0
    let R = 0
    let ps: Point[] = []
    let top = 0
    let bot = 0
    let cycle = 1
    let formed = 0

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      if (!r.width) return
      mx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2))
      my = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2))
    }
    window.addEventListener("pointermove", onMove, { passive: true })

    function draw(T: number) {
      if (!ctx || !ps.length) return
      const c1 = fg.split(",").map(Number)
      const c2 = (fg2 || "0,0,255").split(",").map(Number)
      const letters = word.split("")
      const W = letters.length
      const t = reduce ? formed + 1 : T % cycle
      const CL = 5
      const cols: string[] = []
      for (let c = 0; c < CL; c++) {
        const m = c / (CL - 1)
        cols.push(c1.map((v, i) => Math.round(v + (c2[i] - v) * m)).join(","))
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.font = fs + 'px "Geist Mono", ui-monospace, Menlo, monospace'
      ctx.textBaseline = "middle"
      ctx.textAlign = "center"
      lx += (-0.55 + mx * 0.7 - lx) * 0.06
      ly += (-0.5 + my * 0.6 - ly) * 0.06
      let Lx = lx
      let Ly = ly
      let Lz = 0.7
      const ll = Math.hypot(Lx, Ly, Lz)
      Lx /= ll
      Ly /= ll
      Lz /= ll
      const rot = T * 0.00018
      const cr = Math.cos(rot)
      const sr = Math.sin(rot)
      const B = 20
      const buckets: number[][] = []
      for (let k = 0; k < (B + 1) * CL; k++) buckets.push([])
      const tick = Math.floor(T / 420)
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]
        if (t < p.s || t > p.ds + p.dd) continue
        let x: number
        let y: number
        let settle: number
        if (t < p.s + p.d) {
          const u = (t - p.s) / p.d
          y = top + (p.ty - top) * u * u
          x = p.sx + (p.tx - p.sx) * smoothstep(0.72, 1, u)
          settle = 0
        } else if (t < p.ds) {
          x = p.tx
          y = p.ty
          settle = Math.min(1, (t - p.s - p.d) / 240)
        } else {
          const u = (t - p.ds) / p.dd
          y = p.ty + (bot - p.ty) * u * u
          x = p.tx + (p.sx - p.tx) * smoothstep(0, 0.28, u)
          settle = Math.max(0, 1 - u * 4)
        }
        const rx = p.dx * cr + p.nz * sr
        const rz = -p.dx * sr + p.nz * cr
        const lon = Math.atan2(rx, rz)
        const lat = Math.asin(p.dy)
        const tex = 0.5 + 0.5 * Math.sin(lon * 3 + Math.sin(lat * 4 + T * 0.0004) * 1.6) * Math.cos(lat * 2.2)
        const diff = Math.max(0, p.dx * Lx + p.dy * Ly + p.nz * Lz)
        const shade = 0.3 + 0.6 * (1 - Math.pow(diff, 1.6)) * (0.6 + 0.4 * tex)
        const a = 0.55 + (shade - 0.55) * settle
        const k = Math.min(B, Math.max(1, Math.round(a * B)))
        buckets[Math.round(settle * (CL - 1)) * (B + 1) + k].push(x, y, (i + tick + Math.floor(p.r * W)) % W)
      }
      for (let j = 0; j < buckets.length; j++) {
        const b = buckets[j]
        if (!b.length) continue
        const k = j % (B + 1)
        const c = Math.floor(j / (B + 1))
        ctx.fillStyle = "rgba(" + cols[c] + "," + (k / B).toFixed(3) + ")"
        for (let q = 0; q < b.length; q += 3) ctx.fillText(letters[b[q + 2]], b[q], b[q + 1])
      }
    }

    function resize() {
      const cw = host!.clientWidth
      const ch = host!.clientHeight
      if (!cw || !ch) return
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = cw
      h = ch
      canvas.width = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
      fs = cw < 300 ? 8 : 10
      const glyphW = fs * 0.72
      const glyphH = fs * 1.12
      pxCx = cx * cw
      pxCy = cy * ch
      R = Math.min(cw, ch) * size
      const pts: Point[] = []
      let seed = 1
      const rnd = () => {
        seed = (seed * 16807) % 2147483647
        return seed / 2147483647
      }
      for (let y = pxCy - R + glyphH / 2; y < pxCy + R; y += glyphH) {
        for (let x = pxCx - R + glyphW / 2; x < pxCx + R; x += glyphW) {
          const dx = (x - pxCx) / R
          const dy = (y - pxCy) / R
          if (dx * dx + dy * dy >= 1) continue
          pts.push({
            tx: x,
            ty: y,
            dx,
            dy,
            nz: Math.sqrt(1 - dx * dx - dy * dy),
            r: rnd(),
            sx: pxCx + (rnd() - 0.5) * glyphW * 1.6,
            key: -y + rnd() * glyphH * 3,
            s: 0,
            d: 0,
            ds: 0,
            dd: 0,
          })
        }
      }
      pts.sort((a, b) => a.key - b.key)
      const n = pts.length || 1
      const pTop = -glyphH * 2
      const pBot = ch + glyphH * 2
      let formedLocal = 0
      let end = 0
      pts.forEach((p, i) => {
        p.s = (i / n) * FILL
        p.d = 380 + 820 * Math.sqrt(Math.max(0, p.ty - pTop) / ch)
        formedLocal = Math.max(formedLocal, p.s + p.d)
      })
      const d0 = formedLocal + HOLD
      pts.forEach((p, i) => {
        p.ds = d0 + (i / n) * DRAIN
        p.dd = 380 + 820 * Math.sqrt(Math.max(0, pBot - p.ty) / ch)
        end = Math.max(end, p.ds + p.dd)
      })
      ps = pts
      top = pTop
      bot = pBot
      cycle = end + PAUSE
      formed = formedLocal
      draw(reduce ? formedLocal + 1 : performance.now() - t0)
    }

    function start() {
      if (raf) return
      const loop = (now: number) => {
        if (!visible) {
          raf = 0
          return
        }
        raf = requestAnimationFrame(loop)
        if (now - last < 30) return
        last = now
        draw(now - t0)
      }
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
      if (visible && !reduce) start()
    })
    io.observe(host)
    if (document.fonts) document.fonts.ready.then(resize)
    resize()

    return () => {
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
      host.innerHTML = ""
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cx, cy, size, fg, fg2, word])

  return <div ref={hostRef} className={className} style={{ display: "block", ...style }} {...rest} />
}
