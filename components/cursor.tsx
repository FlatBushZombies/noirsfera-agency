"use client"

import { useEffect } from "react"

// noirsfera cursor — a spotlight disc that inverts the page (white → black)
// beneath it; grows over interactive elements. Desktop, fine-pointer only.
export function Cursor() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const styleEl = document.createElement("style")
    styleEl.textContent = "html,body,*{cursor:none!important}input,textarea{cursor:text!important}"
    document.head.appendChild(styleEl)

    const mk = (s: string) => {
      const d = document.createElement("div")
      d.setAttribute("aria-hidden", "true")
      d.style.cssText = s
      document.body.appendChild(d)
      return d
    }
    const base = "position:fixed;left:0;top:0;pointer-events:none;z-index:2147483646;border-radius:50%;will-change:transform;"
    const disc = mk(base + "width:120px;height:120px;margin:-60px 0 0 -60px;background:#fff;mix-blend-mode:difference;opacity:0;transition:opacity 240ms cubic-bezier(.22,1,.36,1)")
    const dot = mk(base + "width:6px;height:6px;margin:-3px 0 0 -3px;background:#fff;mix-blend-mode:difference;opacity:0;transition:opacity 240ms cubic-bezier(.22,1,.36,1)")

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let cx = x
    let cy = y
    let s = 0.32
    let ts = 0.32
    let down = false
    let shown = false
    const SEL = 'a,button,[role="button"],label,summary,select'

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!shown) {
        shown = true
        cx = x
        cy = y
        disc.style.opacity = "1"
        dot.style.opacity = "1"
      }
      const target = e.target as Element
      const t = target.closest && target.closest(SEL)
      const txt = !t && target.closest && target.closest("h1,h2")
      ts = t ? 0.75 : txt ? 1 : 0.32
    }
    const onDown = () => {
      down = true
    }
    const onUp = () => {
      down = false
    }
    const onLeave = () => {
      shown = false
      disc.style.opacity = "0"
      dot.style.opacity = "0"
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    document.documentElement.addEventListener("pointerleave", onLeave)

    const k = reduce ? 1 : 0.18
    let raf = 0
    const loop = () => {
      cx += (x - cx) * k
      cy += (y - cy) * k
      s += ((down ? ts * 0.8 : ts) - s) * (reduce ? 1 : 0.16)
      disc.style.transform = "translate3d(" + cx + "px," + cy + "px,0) scale(" + s.toFixed(3) + ")"
      dot.style.transform = "translate3d(" + x + "px," + y + "px,0)"
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      styleEl.remove()
      disc.remove()
      dot.remove()
    }
  }, [])

  return null
}
