import type { CSSProperties } from "react"

const cache = new Map<string, CSSProperties>()

// Turns a plain CSS declaration string into a React style object so the
// design's inline styles can be carried over verbatim.
export function css(s: string): CSSProperties {
  const hit = cache.get(s)
  if (hit) return hit
  const out: Record<string, string> = {}
  for (const decl of s.split(/;(?![^(]*\))/)) {
    const i = decl.indexOf(":")
    if (i < 0) continue
    const k = decl.slice(0, i).trim()
    const v = decl.slice(i + 1).trim()
    if (!k) continue
    out[k.startsWith("--") ? k : k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = v
  }
  const style = out as CSSProperties
  cache.set(s, style)
  return style
}
