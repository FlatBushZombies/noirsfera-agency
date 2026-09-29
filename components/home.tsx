"use client"

import { useEffect, useRef, useState } from "react"
import { css } from "@/lib/css"

const EASE = "cubic-bezier(.22,1,.36,1)"

const reveal = (dy: number, dur = 900) =>
  `opacity: 0; transform: translateY(${dy}px); transition: opacity ${dur}ms ${EASE}, transform ${dur}ms ${EASE};`
const MASK = `display: block; transform: translateY(105%); transition: transform 1100ms ${EASE};`
const GLASS =
  "border: 1px solid rgba(255,255,255,.13); border-radius: 14px; background: linear-gradient(150deg, rgba(255,255,255,.075), rgba(255,255,255,.018)); backdrop-filter: blur(26px) saturate(150%); -webkit-backdrop-filter: blur(26px) saturate(150%); box-shadow: inset 0 1px 0 rgba(255,255,255,.16), inset 0 -1px 0 rgba(0,0,0,.4), 0 30px 80px rgba(0,0,0,.45);"
const MONO = "font-family: 'JetBrains Mono', monospace;"
const SERIF = "font-family: 'Instrument Serif', Georgia, serif; font-style: italic;"
const EYEBROW = (color = "rgba(242,243,245,.58)") =>
  `${MONO} font-size: 11px; letter-spacing: .3em; text-transform: uppercase; color: ${color};`
const SWAP = "display: block; overflow: hidden; height: 1.5em; line-height: 1.5em;"
const PULSE =
  "position: relative; width: 7px; height: 7px; border-radius: 50%; background: rgb(60,145,230);"
const PULSE_RING = `position: absolute; inset: -4px; border-radius: 50%; border: 1.5px solid rgb(60,145,230); animation: nsPulse 2s ${EASE} infinite;`

const navDefs: [string, string][] = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["Labs", "#labs"],
  ["FAQ", "#faq"],
]

const faqSrc: [string, string][] = [
  ["Who is behind noirsfera?", "A small, senior team of designers and engineers working directly with founders. No account managers between you and the people writing the code."],
  ["How long does a project take?", "A website is 2–4 weeks. A full MVP — mobile app plus dashboard — runs 1 to 3 months, with weekly builds you can actually use along the way."],
  ["Do you build web and mobile?", "Both, usually from the same design system, plus the admin tooling to run them."],
  ["How secure is what you build?", "Authentication, encryption at rest and in transit, scoped admin roles, dependency auditing before launch. Security review is part of delivery, not an add-on."],
  ["What happens after launch?", "Every engagement includes a month of support. After that, a retainer if you'd rather not staff it internally yet."],
  ["Can you integrate our existing tools?", "CRMs, payment providers, analytics, internal APIs. We map integrations during scoping so nothing surfaces as a surprise mid-build."],
  ["What does it cost?", "Quoted per project, fixed before any work starts. Send us the scope and you'll have a number and a date back within a day."],
]

const stats = [
  { value: "10+", label: "Client products shipped" },
  { value: "+80%", label: "User retention, post-launch" },
  { value: "+150%", label: "Average conversion lift" },
  { value: "3 wks", label: "Fastest platform delivery" },
]

const services = [
  { num: "01", top: "96px", mb: "70vh", title: "Fullstack development", body: "Web and mobile applications built to survive their own growth — clean APIs, a schema that won't need rewriting, cloud deployment you own from day one.", tags: ["API development", "Database design", "Cloud deployment", "Source ownership"] },
  { num: "02", top: "124px", mb: "70vh", title: "AI engineering & data", body: "Machine learning and predictive analytics inside the product people already use — not a separate dashboard nobody opens.", tags: ["Model integration", "Predictive analytics", "Data pipelines", "Internal tooling"] },
  { num: "03", top: "152px", mb: "30vh", title: "UI/UX design", body: "Research, prototyping and a design system your team can extend after we leave. Two concepts, tested with real users, before a line of production code.", tags: ["User research", "Prototyping", "Design systems", "Usability testing"] },
]

const projects = [
  { name: "Next Up Boxing League", img: "/nextup-boxing.png", pos: "right center", kind: "Sports platform", body: "The digital home ring for an amateur league: ticketing, free livestream, fighter profiles, live rankings and a champions wall." },
  { name: "DMB Pay+", img: "/dmbpay-bg.png", pos: "center", kind: "Fintech", body: "Payments and reconciliation tooling with a dashboard finance teams stopped exporting to spreadsheets." },
  { name: "TutSchool", img: "/tutschool.png", pos: "center", kind: "Education", body: "A modern site and booking flow for a language school, rebuilt around how parents actually choose classes." },
  { name: "Camp Guide", img: "/camp-guide.png", pos: "left center", kind: "Mobile app", body: "Discovery and itinerary planning in one app, with offline-first content for places with no signal." },
  { name: "Oakwood ESL", img: "/oakwood.jpg", pos: "center", kind: "Web platform", body: "Programme pages, enrolment and a CMS the team runs without calling us." },
]

const products = [
  { name: "Quickhands Africa", img: "/quickhands-app.png", status: "Live", slot: "[ screenshot — Quickhands app ]", body: "On-demand skilled hands, matched to the job. Built for African cities first: mobile-first booking, verified workers, payments that work on the networks people actually use." },
  { name: "Duo", img: "/duo-app.png", status: "In build", slot: "[ screenshot — Duo app ]", body: "Movies, matched. Two people swipe, Duo finds the film you both actually want to watch — then plans the night around it." },
]

const engagements = [
  { title: "Marketing site", timeline: "2–4 weeks", body: "Positioning, layout and build for a site that earns its traffic. Two design concepts, responsive, full source ownership." },
  { title: "Product MVP", timeline: "1–3 months", body: "Mobile app plus admin dashboard, in the stores. Weekly builds, advanced UI/UX, store launch handled." },
  { title: "Embedded team", timeline: "Ongoing", body: "Design and engineering capacity alongside your team, on a monthly retainer with a standing roadmap." },
]

const quotes = [
  { text: "The result was stylish and modern, and communication was transparent the whole way.", initial: "Y", name: "Yulia", org: "tutschool.ru" },
  { text: "Delivered on time, and the code was optimised properly rather than just made to work.", initial: "A", name: "Andrey", org: "profi.ru" },
  { text: "Clear updates every week. I always knew what was being built and why.", initial: "A", name: "Anih", org: "profi.ru" },
  { text: "They pushed back where it made the product better. Would work with them again.", initial: "N", name: "Nathan", org: "profi.ru" },
]

type Key = { el: HTMLElement; x: number; y: number; s: number; o: number; b: number }
type Pt = { lat: number; lon: number; la: number; lo: number; land: boolean }
type Orb = { x: number; y: number; s: number; o: number; b: number }
type NavState = {
  navIn: boolean
  navHidden: boolean
  navCompact: boolean
  hov: number
  pill: { x: number; w: number } | null
  active: number
}

export function Home() {
  const [open, setOpen] = useState(0)
  const [faqHov, setFaqHov] = useState(-1)
  const [nav, setNav] = useState<NavState>({ navIn: false, navHidden: false, navCompact: false, hov: -1, pill: null, active: -1 })
  const [ctaH, setCtaH] = useState(false)
  const [callH, setCallH] = useState(false)
  const [pfH, setPfH] = useState(false)
  const [heroH, setHeroH] = useState(-1)

  const navRef = useRef(nav)
  navRef.current = nav

  const orbRef = useRef<HTMLCanvasElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const railSectionRef = useRef<HTMLElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cv = orbRef.current
    const S = {
      keys: [] as Key[],
      orbP: null as Orb | null,
      pts: null as Pt[] | null,
      ctx: null as CanvasRenderingContext2D | null,
      raf: 0,
      queued: false,
      lastY: 0,
      reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    }
    const reduce = S.reduce

    const curtain = curtainRef.current
    const curtainTimer = window.setTimeout(() => {
      if (curtain) {
        curtain.style.opacity = "0"
        curtain.style.visibility = "hidden"
      }
    }, 420)

    const show = (el: HTMLElement) => {
      const d = parseInt(el.dataset.delay || "0", 10)
      window.setTimeout(() => {
        if (el.hasAttribute("data-mask")) el.style.transform = "translateY(0)"
        else {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }
      }, reduce ? 0 : d)
    }
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal],[data-mask]"))
    let io: IntersectionObserver | null = null
    let fallback = 0
    if (reduce) targets.forEach(show)
    else {
      // A masked line sits translated outside its overflow:hidden wrapper, so it is
      // fully clipped and never intersects; watch the wrapper and reveal the line.
      const byWatched = new Map<Element, HTMLElement>()
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              show(byWatched.get(e.target) as HTMLElement)
              io?.unobserve(e.target)
            }
          })
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
      )
      targets.forEach((t) => {
        const watched = t.hasAttribute("data-mask") && t.parentElement ? t.parentElement : t
        byWatched.set(watched, t)
        io?.observe(watched)
      })
      fallback = window.setTimeout(() => targets.forEach(show), 4000)
    }

    S.keys = Array.from(document.querySelectorAll<HTMLElement>("[data-orb]")).map((el) => {
      const [x, y, s, o, b] = (el.dataset.orb || "").split(",").map(Number)
      return { el, x, y, s, o, b }
    })

    const navDefsSel = navDefs.map(([, id]) => id)
    const navScroll = () => {
      const y = window.scrollY
      const dy = y - (S.lastY || 0)
      S.lastY = y
      const compact = y > 40
      let hidden = navRef.current.navHidden
      if (y < 200) hidden = false
      else if (dy > 6) hidden = true
      else if (dy < -6) hidden = false
      const mid = window.innerHeight * 0.4
      let active = -1
      navDefsSel.forEach((id, i) => {
        const el = document.querySelector(id)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= mid && r.bottom > mid) active = i
        }
      })
      const cur = navRef.current
      if (compact !== cur.navCompact || hidden !== cur.navHidden || active !== cur.active) {
        setNav((p) => ({ ...p, navCompact: compact, navHidden: hidden, active }))
      }
    }

    const paintOrb = () => {
      if (!cv || !S.keys.length) return
      const vh = window.innerHeight
      const center = window.scrollY + vh / 2
      const pts = S.keys.map((k) => {
        const r = k.el.getBoundingClientRect()
        return { pos: window.scrollY + r.top + r.height / 2, ...k }
      })
      let a = pts[0]
      let b = pts[0]
      let t = 0
      if (center <= pts[0].pos) {
        a = b = pts[0]
      } else if (center >= pts[pts.length - 1].pos) {
        a = b = pts[pts.length - 1]
      } else {
        for (let i = 0; i < pts.length - 1; i++) {
          if (center >= pts[i].pos && center <= pts[i + 1].pos) {
            a = pts[i]
            b = pts[i + 1]
            t = (center - a.pos) / Math.max(1, b.pos - a.pos)
            break
          }
        }
      }
      const e = t * t * (3 - 2 * t)
      const L = (k: "x" | "y" | "s" | "o" | "b") => a[k] + (b[k] - a[k]) * e
      const amp = 1
      S.orbP = { x: L("x") * amp, y: L("y") * amp, s: L("s"), o: L("o"), b: L("b") }
      if (S.reduce) drawAscii(0)
    }

    const paintRail = () => {
      const sec = railSectionRef.current
      const rail = railRef.current
      if (!sec || !rail) return
      const r = sec.getBoundingClientRect()
      const span = Math.max(1, sec.offsetHeight - window.innerHeight)
      const p = Math.min(1, Math.max(0, -r.top / span))
      const dist = Math.max(0, rail.scrollWidth - window.innerWidth + 48)
      rail.style.transform = "translate3d(" + (-p * dist).toFixed(1) + "px,0,0)"
    }

    const buildGlobe = () => {
      const pts: Pt[] = []
      const step = 1.55
      for (let lat = -88; lat <= 88; lat += step) {
        const cl = Math.cos((lat * Math.PI) / 180)
        const n = Math.max(1, Math.round((360 * cl) / step))
        for (let i = 0; i < n; i++) {
          const lon = -180 + (i + (Math.round(lat / step) % 2 ? 0.5 : 0)) * (360 / n)
          pts.push({ lat, lon, la: (lat * Math.PI) / 180, lo: (lon * Math.PI) / 180, land: false })
        }
      }
      S.pts = pts
      fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json")
        .then((r) => r.json())
        .then((topo) => {
          const { scale, translate } = topo.transform
          const arcs = topo.arcs.map((arc: number[][]) => {
            let x = 0
            let y = 0
            return arc.map(([dx, dy]) => {
              x += dx
              y += dy
              return [x * scale[0] + translate[0], y * scale[1] + translate[1]]
            })
          })
          const MW = 1440
          const MH = 720
          const c = document.createElement("canvas")
          c.width = MW
          c.height = MH
          const g = c.getContext("2d")
          if (!g) return
          g.fillStyle = "#fff"
          const ring = (idx: number[]) => {
            const out: number[][] = []
            idx.forEach((i) => {
              const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i]
              a.forEach((p: number[]) => out.push(p))
            })
            return out
          }
          const geoms = topo.objects.land.type === "GeometryCollection" ? topo.objects.land.geometries : [topo.objects.land]
          g.beginPath()
          geoms.forEach((geo: { type: string; arcs: number[][][] | number[][][][] }) => {
            const polys: number[][][][] =
              geo.type === "Polygon" ? [geo.arcs as number[][][]] : geo.type === "MultiPolygon" ? (geo.arcs as number[][][][]) : []
            polys.forEach((poly) =>
              poly.forEach((r) => {
                ring(r as unknown as number[]).forEach(([lon, lat], k) => {
                  const x = ((lon + 180) / 360) * MW
                  const y = ((90 - lat) / 180) * MH
                  if (k) g.lineTo(x, y)
                  else g.moveTo(x, y)
                })
                g.closePath()
              }),
            )
          })
          g.fill("evenodd")
          const d = g.getImageData(0, 0, MW, MH).data
          S.pts?.forEach((p) => {
            const x = Math.min(MW - 1, Math.floor(((p.lon + 180) / 360) * MW))
            const y = Math.min(MH - 1, Math.floor(((90 - p.lat) / 180) * MH))
            p.land = d[(y * MW + x) * 4] > 128
          })
          if (S.reduce) drawAscii(0)
        })
        .catch(() => {})
    }

    function drawAscii(t: number) {
      const ctx = S.ctx
      if (!ctx) return
      if (!S.pts) buildGlobe()
      const pts = S.pts
      if (!pts) return
      const W = window.innerWidth
      const H = window.innerHeight
      const p = S.orbP || { x: 0, y: 0, s: 1, o: 1, b: 0 }
      const R = Math.min(W, H) * 0.33 * p.s
      const cx = W / 2 + (p.x / 100) * W
      const cy = H / 2 + (p.y / 100) * H
      const fade = Math.max(0, p.o * (1 - p.b * 0.05))
      ctx.clearRect(0, 0, W, H)
      if (fade <= 0.01) return
      const rot = 1.9 + t * 0.12
      const tilt = 0.38
      const ct = Math.cos(tilt)
      const st = Math.sin(tilt)
      const lx = -0.45
      const ly = -0.55
      const lz = 0.7
      const dot = Math.max(1, R / 190)
      const B = 12
      const sea: number[][] = Array.from({ length: B }, () => [])
      const land: number[][] = Array.from({ length: B }, () => [])
      for (const q of pts) {
        const cl = Math.cos(q.la)
        const lo = q.lo + rot
        const x = cl * Math.sin(lo)
        const y0 = -Math.sin(q.la)
        const z0 = cl * Math.cos(lo)
        const y = y0 * ct - z0 * st
        const z = y0 * st + z0 * ct
        if (z <= 0.02) continue
        const sh = 0.4 + 0.6 * Math.max(0, x * lx + y * ly + z * lz)
        const rim = Math.min(1, z * 3.2)
        const a = (q.land ? 0.1 : 1) * sh * rim * fade
        if (a < 0.012) continue
        const k = Math.min(B - 1, Math.floor((q.land ? a * 4 : a) * B))
        ;(q.land ? land : sea)[k].push(cx + x * R, cy + y * R)
      }
      for (let i = 0; i < B; i++) {
        const al = ((i + 0.5) / B).toFixed(3)
        const Ld = land[i]
        if (Ld.length) {
          ctx.fillStyle = "rgba(150,154,162," + (((i + 0.5) / B) * 0.25).toFixed(3) + ")"
          const s = dot
          for (let j = 0; j < Ld.length; j += 2) ctx.fillRect(Ld[j] - s / 2, Ld[j + 1] - s / 2, s, s)
        }
        const Sd = sea[i]
        if (Sd.length) {
          ctx.fillStyle = "rgba(245,247,250," + al + ")"
          for (let j = 0; j < Sd.length; j += 2) ctx.fillRect(Sd[j] - dot / 2, Sd[j + 1] - dot / 2, dot, dot)
        }
      }
    }

    const tick = () => {
      S.queued = false
      paintOrb()
      paintRail()
      navScroll()
    }
    const onScroll = () => {
      if (!S.queued) {
        S.queued = true
        requestAnimationFrame(tick)
      }
    }

    const sizeAscii = () => {
      if (!cv || !S.ctx) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      cv.width = Math.round(window.innerWidth * dpr)
      cv.height = Math.round(window.innerHeight * dpr)
      S.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const navTimer = window.setTimeout(() => setNav((p) => ({ ...p, navIn: true })), 650)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    if (cv) {
      S.ctx = cv.getContext("2d")
      sizeAscii()
      window.addEventListener("resize", sizeAscii)
      const t0 = performance.now()
      let last = 0
      const loop = (now: number) => {
        S.raf = requestAnimationFrame(loop)
        if (now - last < 33) return
        last = now
        drawAscii((now - t0) / 1000)
      }
      if (S.reduce) drawAscii(0)
      else S.raf = requestAnimationFrame(loop)
    }
    tick()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      window.removeEventListener("resize", sizeAscii)
      io?.disconnect()
      cancelAnimationFrame(S.raf)
      clearTimeout(fallback)
      clearTimeout(curtainTimer)
      clearTimeout(navTimer)
    }
  }, [])

  const shown = nav.navIn && !nav.navHidden
  const pill = nav.pill

  const navStyle =
    "pointer-events:auto;display:flex;align-items:center;gap:6px;margin-top:" + (nav.navCompact ? 12 : 20) +
    "px;padding:" + (nav.navCompact ? 5 : 7) + "px;border-radius:999px;background:" +
    (nav.navCompact ? "rgba(22,24,32,.72)" : "rgba(38,42,54,.55)") +
    ";backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);border:1px solid rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 18px 50px rgba(0,0,0,.45);max-width:100%;overflow-x:auto;scrollbar-width:none;transform:translateY(" +
    (shown ? "0" : "-140%") + ") scale(" + (nav.navCompact ? 0.97 : 1) + ");opacity:" + (shown ? 1 : 0) +
    ";transition:transform 700ms " + EASE + ",opacity 500ms ease,margin 500ms " + EASE + ",padding 500ms " + EASE + ",background 500ms ease"
  const pillStyle =
    "position:absolute;top:0;height:100%;border-radius:999px;background:rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.08);pointer-events:none;left:" +
    (pill ? pill.x : 0) + "px;width:" + (pill ? pill.w : 0) + "px;opacity:" + (pill ? 1 : 0) +
    ";transition:left 450ms " + EASE + ",width 450ms " + EASE + ",opacity 300ms ease"

  const cardBase = (dy: number) =>
    `${reveal(dy)} transition: opacity 900ms ${EASE}, transform 900ms ${EASE}, border-color 300ms, background 300ms; display: block; padding: clamp(22px, 2.6vw, 34px); border-radius: 16px; backdrop-filter: blur(24px) saturate(150%); -webkit-backdrop-filter: blur(24px) saturate(150%); box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 30px 70px rgba(0,0,0,.4);`

  return (
    <div style={css("position: relative; width: 100%; overflow-x: clip; background: #06070A;")}>
      <div
        ref={curtainRef}
        style={css(`position: fixed; inset: 0; z-index: 200; background: #06070A; display: flex; align-items: center; justify-content: center; transition: opacity 900ms ${EASE}, visibility 900ms;`)}
      >
        <div style={css(`${MONO} font-size: 11px; letter-spacing: .34em; text-transform: uppercase; color: rgba(242,243,245,.5); animation: nsBlink 1.4s ease-in-out infinite;`)}>noirsfera</div>
      </div>

      <canvas ref={orbRef} aria-hidden="true" style={css("position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; display: block;")} />

      <div aria-hidden="true" style={css("position: fixed; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(6,7,10,.55) 100%);")} />

      <div style={css("position: fixed; top: 0; left: 0; right: 0; z-index: 90; display: flex; justify-content: center; padding: 0 16px; pointer-events: none;")}>
        <nav style={css(navStyle)}>
          <a href="#top" style={css("display: flex; align-items: center; gap: 9px; padding: 0 18px 0 14px; font-size: 16px; font-weight: 600; letter-spacing: -.01em; text-transform: lowercase; color: #FFFFFF;")}>
            <span style={css("width: 12px; height: 12px; border-radius: 50%; background: radial-gradient(circle at 32% 30%, #8fa3e0, #0a0b11 72%); box-shadow: 0 0 12px rgba(120,150,255,.6);")} />
            Noirsfera
          </a>
          <div onMouseLeave={() => setNav((p) => ({ ...p, hov: -1, pill: null }))} style={css("position: relative; display: flex; align-items: center; gap: 2px;")}>
            <span aria-hidden="true" style={css(pillStyle)} />
            {navDefs.map(([label, href], i) => {
              const on = nav.hov === i || nav.active === i
              return (
                <a
                  key={href}
                  href={href}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    setNav((p) => ({ ...p, hov: i, pill: { x: el.offsetLeft, w: el.offsetWidth } }))
                  }}
                  style={css(`position: relative; display: flex; align-items: center; gap: 7px; padding: 10px 18px; border-radius: 999px; font-size: 14.5px; font-weight: 500; color: ${on ? "#FFFFFF" : "rgba(242,243,245,.72)"}; transition: color 300ms ease;`)}
                >
                  <span style={css(`width: 4px; height: 4px; border-radius: 50%; background: rgb(110,170,240); transition: opacity 300ms ease, transform 400ms ${EASE}; opacity: ${nav.active === i ? 1 : 0}; transform: scale(${nav.active === i ? 1 : 0});`)} />
                  {label}
                </a>
              )
            })}
          </div>
          <a
            href="#contact"
            onMouseEnter={() => setCtaH(true)}
            onMouseLeave={() => setCtaH(false)}
            style={css(`display: flex; align-items: center; gap: 10px; margin-left: 10px; padding: 11px 20px 11px 18px; border-radius: 999px; background: ${ctaH ? "#FFFFFF" : "#F2F3F5"}; color: #06070A; font-size: 14.5px; font-weight: 600; transition: background 300ms ease, transform 300ms ${EASE}; transform: ${ctaH ? "scale(1.03)" : "none"};`)}
          >
            <span style={css(PULSE)}><span style={css(PULSE_RING)} /></span>
            <span style={css(SWAP)}>
              <span style={css(`display: block; transition: transform 500ms ${EASE}; transform: ${ctaH ? "translateY(-1.5em)" : "translateY(0)"};`)}>
                <span style={css("display: block; white-space: nowrap;")}>Start a project</span>
                <span style={css("display: block; white-space: nowrap;")}>Let&apos;s talk</span>
              </span>
            </span>
          </a>
        </nav>
      </div>

      <section id="top" data-screen-label="Hero" data-orb="22,4,1,.62,0" style={css("position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 140px clamp(20px, 5vw, 64px) 48px;")}>
        <div data-reveal="" style={css(`${reveal(18)} ${MONO} font-size: 11px; letter-spacing: .3em; text-transform: uppercase; color: rgba(242,243,245,.6); margin-bottom: clamp(20px, 4vh, 40px);`)}>Software studio · two sides, one team</div>

        <h1 style={css("margin: 0; font-weight: 300; font-size: clamp(38px, 7.2vw, 108px); line-height: .98; letter-spacing: -.035em; max-width: 17ch; text-wrap: pretty;")}>
          <span style={css("display: block; overflow: hidden;")}><span data-mask="" style={css(MASK)}>We build software</span></span>
          <span style={css("display: block; overflow: hidden;")}>
            <span data-mask="" data-delay="90" style={css(MASK)}>
              that earns <em style={css("font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400;")}>its place</em>.
            </span>
          </span>
        </h1>

        <p data-reveal="" data-delay="260" style={css(`${reveal(18)} margin: clamp(20px, 3.4vh, 34px) 0 0; max-width: 54ch; font-size: clamp(15px, 1.35vw, 19px); line-height: 1.6; font-weight: 300; color: rgba(242,243,245,.66);`)}>
          Web platforms, mobile products and AI systems — for founders who hired us, and for the products we run ourselves. Shipped in weeks, owned by you.
        </p>

        <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 14px; margin-top: clamp(40px, 7vh, 82px);")}>
          <a
            href="#work"
            data-reveal=""
            data-delay="380"
            onMouseEnter={() => setHeroH(0)}
            onMouseLeave={() => setHeroH(-1)}
            style={css(
              `${cardBase(24)} border: 1px solid ${heroH === 0 ? "rgba(255,255,255,.3)" : "rgba(255,255,255,.12)"}; background: ${heroH === 0 ? "linear-gradient(165deg, rgba(255,255,255,.12), rgba(255,255,255,.03))" : "linear-gradient(165deg, rgba(255,255,255,.07), rgba(255,255,255,.016))"};`,
            )}
          >
            <div style={css("display: flex; align-items: baseline; justify-content: space-between; gap: 16px;")}>
              <span style={css(`${MONO} font-size: 10px; letter-spacing: .26em; text-transform: uppercase; color: rgba(242,243,245,.58);`)}>01 / for clients</span>
              <span style={css("font-size: 18px; color: rgba(242,243,245,.58);")}>↗</span>
            </div>
            <div style={css("margin-top: 26px; font-size: clamp(24px, 2.6vw, 34px); font-weight: 300; letter-spacing: -.02em;")}>Client work</div>
            <p style={css("margin: 10px 0 0; font-size: 14px; line-height: 1.6; font-weight: 300; color: rgba(242,243,245,.6); max-width: 38ch;")}>Fixed scope, fixed price, source code yours. Design, engineering and data in the same room.</p>
          </a>
          <a
            href="#labs"
            data-reveal=""
            data-delay="470"
            onMouseEnter={() => setHeroH(1)}
            onMouseLeave={() => setHeroH(-1)}
            style={css(
              `${cardBase(24)} border: 1px solid ${heroH === 1 ? "rgba(150,180,255,.5)" : "rgba(150,180,255,.2)"}; background: ${heroH === 1 ? "linear-gradient(165deg, rgba(60,145,230,.22), rgba(255,255,255,.03))" : "linear-gradient(165deg, rgba(60,145,230,.14), rgba(255,255,255,.016))"};`,
            )}
          >
            <div style={css("display: flex; align-items: baseline; justify-content: space-between; gap: 16px;")}>
              <span style={css(`${MONO} font-size: 10px; letter-spacing: .26em; text-transform: uppercase; color: rgba(150,180,255,.78);`)}>02 / in-house</span>
              <span style={css("font-size: 18px; color: rgba(242,243,245,.58);")}>↗</span>
            </div>
            <div style={css("margin-top: 26px; font-size: clamp(24px, 2.6vw, 34px); font-weight: 300; letter-spacing: -.02em;")}>Noirsfera Labs</div>
            <p style={css("margin: 10px 0 0; font-size: 14px; line-height: 1.6; font-weight: 300; color: rgba(242,243,245,.6); max-width: 38ch;")}>Our own products — Quickhands Africa and Duo. We carry the same risk we ask clients to.</p>
          </a>
        </div>
      </section>

      <section data-screen-label="Proof" data-orb="26,-14,.52,.8,2" style={css("position: relative; z-index: 2; padding: clamp(60px, 10vh, 120px) clamp(20px, 5vw, 64px); border-top: 1px solid rgba(242,243,245,.07); background: linear-gradient(180deg, rgba(6,7,10,.2), rgba(6,7,10,.75));")}>
        <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: clamp(28px, 4vw, 56px);")}>
          {stats.map((s) => (
            <div key={s.label} data-reveal="" style={css(reveal(20))}>
              <div style={css("font-size: clamp(34px, 4.4vw, 62px); font-weight: 200; letter-spacing: -.04em; line-height: 1;")}>{s.value}</div>
              <div style={css("margin-top: 12px; font-size: 13px; line-height: 1.5; font-weight: 300; color: rgba(242,243,245,.52); max-width: 22ch;")}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" data-screen-label="Services" data-orb="-30,8,.66,.7,3" style={css("position: relative; z-index: 2; padding: clamp(70px, 12vh, 150px) clamp(20px, 5vw, 64px) clamp(90px, 14vh, 170px);")}>
        <div style={css("display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: clamp(40px, 7vh, 80px);")}>
          <div>
            <div data-reveal="" style={css(`${reveal(16)} ${EYEBROW()}`)}>What we do</div>
            <h2 style={css("margin: 18px 0 0; font-size: clamp(30px, 4.6vw, 62px); font-weight: 300; letter-spacing: -.035em; line-height: 1.02; max-width: 20ch;")}>
              <span style={css("display: block; overflow: hidden;")}><span data-mask="" style={css(MASK)}>Three disciplines,</span></span>
              <span style={css("display: block; overflow: hidden;")}>
                <span data-mask="" data-delay="90" style={css(MASK)}>
                  no <em style={css(SERIF)}>handoffs</em>.
                </span>
              </span>
            </h2>
          </div>
          <p data-reveal="" data-delay="200" style={css(`${reveal(16)} margin: 0; max-width: 40ch; font-size: 15px; line-height: 1.65; font-weight: 300; color: rgba(242,243,245,.6);`)}>One team, one thread, one invoice. The people who scope your build are the people who ship it.</p>
        </div>

        <div style={css("display: flex; flex-direction: column; gap: 0;")}>
          {services.map((svc) => (
            <article
              key={svc.num}
              style={css(`position: sticky; top: ${svc.top}; margin-bottom: ${svc.mb}; border: 1px solid rgba(255,255,255,.13); border-radius: 14px; background: linear-gradient(150deg, rgba(255,255,255,.075), rgba(255,255,255,.018)); backdrop-filter: blur(26px) saturate(150%); -webkit-backdrop-filter: blur(26px) saturate(150%); padding: clamp(26px, 3.4vw, 52px); box-shadow: 0 -1px 0 rgba(255,255,255,.05) inset, 0 40px 90px rgba(0,0,0,.5);`)}
            >
              <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: clamp(22px, 4vw, 60px); align-items: start;")}>
                <div>
                  <div style={css(`${MONO} font-size: 10px; letter-spacing: .26em; color: rgba(150,180,255,.78);`)}>{svc.num}</div>
                  <h3 style={css("margin: 16px 0 0; font-size: clamp(24px, 2.8vw, 38px); font-weight: 300; letter-spacing: -.025em; line-height: 1.08;")}>{svc.title}</h3>
                </div>
                <div>
                  <p style={css("margin: 0; font-size: clamp(15px, 1.3vw, 18px); line-height: 1.6; font-weight: 300; color: rgba(242,243,245,.72); max-width: 46ch;")}>{svc.body}</p>
                  <div style={css("display: flex; flex-wrap: wrap; gap: 8px; margin-top: 26px;")}>
                    {svc.tags.map((t) => (
                      <span key={t} style={css("padding: 7px 13px; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; background: rgba(255,255,255,.05); font-size: 11.5px; letter-spacing: .04em; color: rgba(242,243,245,.6);")}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" data-screen-label="Work" data-orb="0,34,1.35,.55,10" ref={railSectionRef} style={css("position: relative; z-index: 2; height: 360vh; border-top: 1px solid rgba(242,243,245,.07);")}>
        <div style={css("position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column; justify-content: center;")}>
          <div style={css("display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 18px; padding: 0 clamp(20px, 5vw, 64px); margin-bottom: clamp(24px, 4vh, 44px);")}>
            <div>
              <div style={css(EYEBROW())}>Selected work</div>
              <h2 style={css("margin: 14px 0 0; font-size: clamp(28px, 4vw, 52px); font-weight: 300; letter-spacing: -.035em;")}>Shipped, <em style={css(SERIF)}>live</em>, in use.</h2>
            </div>
            <div style={css(`${MONO} font-size: 10.5px; letter-spacing: .2em; text-transform: uppercase; color: rgba(242,243,245,.6);`)}>scroll →</div>
          </div>
          <div ref={railRef} style={css("display: flex; gap: clamp(16px, 2vw, 28px); padding: 0 clamp(20px, 5vw, 64px); will-change: transform;")}>
            {projects.map((p) => (
              <article key={p.name} style={css(`flex: 0 0 auto; width: clamp(280px, 40vw, 560px); overflow: hidden; ${GLASS}`)}>
                <div style={css("aspect-ratio: 16 / 10; background: #0c0d13; overflow: hidden;")}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.name} loading="lazy" style={css(`display: block; width: 100%; height: 100%; object-fit: cover; object-position: ${p.pos};`)} />
                </div>
                <div style={css("padding: clamp(18px, 2vw, 28px);")}>
                  <div style={css("display: flex; align-items: baseline; justify-content: space-between; gap: 14px;")}>
                    <h3 style={css("margin: 0; font-size: clamp(19px, 1.8vw, 26px); font-weight: 400; letter-spacing: -.02em;")}>{p.name}</h3>
                    <span style={css(`${MONO} font-size: 10px; letter-spacing: .18em; color: rgba(242,243,245,.6); white-space: nowrap;`)}>{p.kind}</span>
                  </div>
                  <p style={css("margin: 12px 0 0; font-size: 14px; line-height: 1.6; font-weight: 300; color: rgba(242,243,245,.6);")}>{p.body}</p>
                </div>
              </article>
            ))}
            <article style={css("flex: 0 0 auto; width: clamp(240px, 26vw, 360px); display: flex; align-items: center;")}>
              <a href="#contact" style={css("font-size: clamp(20px, 2vw, 28px); font-weight: 300; letter-spacing: -.02em; border-bottom: 1px solid rgba(242,243,245,.2); padding-bottom: 6px;")}>Your project here →</a>
            </article>
          </div>
        </div>
      </section>

      <section id="labs" data-screen-label="Labs" data-orb="34,0,.78,.9,0" style={css("position: relative; z-index: 2; padding: clamp(80px, 13vh, 160px) clamp(20px, 5vw, 64px); border-top: 1px solid rgba(242,243,245,.07); background: linear-gradient(180deg, rgba(90,125,255,.05), rgba(6,7,10,0) 60%);")}>
        <div data-reveal="" style={css(`${reveal(16)} ${EYEBROW("rgba(150,180,255,.78)")}`)}>Noirsfera Labs</div>
        <h2 style={css("margin: 18px 0 0; font-size: clamp(30px, 4.6vw, 62px); font-weight: 300; letter-spacing: -.035em; line-height: 1.02; max-width: 22ch;")}>
          <span style={css("display: block; overflow: hidden;")}><span data-mask="" style={css(MASK)}>We ship our own</span></span>
          <span style={css("display: block; overflow: hidden;")}>
            <span data-mask="" data-delay="90" style={css(MASK)}>
              products <em style={css(SERIF)}>too</em>.
            </span>
          </span>
        </h2>
        <p data-reveal="" data-delay="200" style={css(`${reveal(16)} margin: 22px 0 0; max-width: 52ch; font-size: clamp(15px, 1.35vw, 18px); line-height: 1.65; font-weight: 300; color: rgba(242,243,245,.62);`)}>Client work funds it, in-house products sharpen it. Everything we learn running our own software goes straight into yours.</p>

        <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 18px; margin-top: clamp(40px, 7vh, 76px);")}>
          {products.map((pr) => (
            <article key={pr.name} data-reveal="" style={css(`${reveal(26, 950)} overflow: hidden; ${GLASS}`)}>
              <div style={css("position: relative; aspect-ratio: 16 / 9; background-color: #0b0c12; background-image: repeating-linear-gradient(135deg, rgba(150,180,255,.06) 0 10px, transparent 10px 20px); display: flex; align-items: flex-end; padding: 16px; overflow: hidden;")}>
                <span style={css(`${MONO} font-size: 10px; letter-spacing: .12em; color: rgba(242,243,245,.58);`)}>{pr.slot}</span>
                {pr.img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pr.img} alt={pr.name} loading="lazy" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center;")} />
                )}
              </div>
              <div style={css("padding: clamp(20px, 2.4vw, 34px);")}>
                <div style={css("display: flex; align-items: center; gap: 12px;")}>
                  <h3 style={css("margin: 0; font-size: clamp(21px, 2.1vw, 30px); font-weight: 400; letter-spacing: -.02em;")}>{pr.name}</h3>
                  <span style={css(`padding: 5px 11px; border: 1px solid rgba(150,180,255,.3); border-radius: 999px; ${MONO} font-size: 9.5px; letter-spacing: .16em; text-transform: uppercase; color: rgba(180,200,255,.8);`)}>{pr.status}</span>
                </div>
                <p style={css("margin: 14px 0 0; font-size: 14.5px; line-height: 1.65; font-weight: 300; color: rgba(242,243,245,.62); max-width: 42ch;")}>{pr.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" data-screen-label="How we work" data-orb="-24,-10,.58,.75,4" style={css("position: relative; z-index: 2; padding: clamp(80px, 13vh, 160px) clamp(20px, 5vw, 64px); border-top: 1px solid rgba(242,243,245,.07);")}>
        <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: clamp(30px, 5vw, 70px); align-items: start;")}>
          <div>
            <div data-reveal="" style={css(`${reveal(16)} ${EYEBROW()}`)}>How we work</div>
            <h2 style={css("margin: 18px 0 0; font-size: clamp(30px, 4.4vw, 58px); font-weight: 300; letter-spacing: -.035em; line-height: 1.02; max-width: 16ch;")}>
              <span style={css("display: block; overflow: hidden;")}><span data-mask="" style={css(MASK)}>Fixed scope.</span></span>
              <span style={css("display: block; overflow: hidden;")}>
                <span data-mask="" data-delay="90" style={css(MASK)}>
                  Quoted <em style={css(SERIF)}>up front</em>.
                </span>
              </span>
            </h2>
            <p data-reveal="" data-delay="180" style={css(`${reveal(16)} margin: 22px 0 0; max-width: 44ch; font-size: 15px; line-height: 1.65; font-weight: 300; color: rgba(242,243,245,.6);`)}>No hourly drift and no surprise change orders. Tell us the scope, get a price and a date — then we hold both.</p>
          </div>
          <div style={css("display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.13); border-radius: 14px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,.45);")}>
            {engagements.map((e) => (
              <div key={e.title} data-reveal="" style={css(`${reveal(20)} background: linear-gradient(150deg, rgba(255,255,255,.06), rgba(255,255,255,.015)); backdrop-filter: blur(22px) saturate(150%); -webkit-backdrop-filter: blur(22px) saturate(150%); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); padding: clamp(22px, 2.6vw, 34px); display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap: 16px; align-items: baseline;`)}>
                <div>
                  <div style={css("font-size: clamp(18px, 1.8vw, 23px); font-weight: 400; letter-spacing: -.02em;")}>{e.title}</div>
                  <div style={css(`margin-top: 8px; ${MONO} font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase; color: rgba(150,180,255,.78);`)}>{e.timeline}</div>
                </div>
                <p style={css("margin: 0; font-size: 14px; line-height: 1.6; font-weight: 300; color: rgba(242,243,245,.6);")}>{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="Clients" data-orb="0,-26,.46,.6,6" style={css("position: relative; z-index: 2; padding: clamp(70px, 11vh, 140px) clamp(20px, 5vw, 64px); border-top: 1px solid rgba(242,243,245,.07); background: linear-gradient(180deg, rgba(6,7,10,.7), rgba(6,7,10,.2));")}>
        <div data-reveal="" style={css(`${reveal(16)} ${EYEBROW()} margin-bottom: clamp(30px, 5vh, 56px);`)}>Clients, afterwards</div>
        <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr)); gap: 18px;")}>
          {quotes.map((q) => (
            <blockquote key={q.name} data-reveal="" style={css(`${reveal(22)} margin: 0; padding: clamp(22px, 2.4vw, 32px); ${GLASS} display: flex; flex-direction: column; justify-content: space-between; gap: 26px;`)}>
              <p style={css("margin: 0; font-size: clamp(15px, 1.4vw, 18px); line-height: 1.55; font-weight: 300; color: rgba(242,243,245,.82); text-wrap: pretty;")}>{q.text}</p>
              <footer style={css("display: flex; align-items: center; gap: 12px;")}>
                <span style={css("width: 30px; height: 30px; border-radius: 50%; background: radial-gradient(circle at 32% 30%, #3a3f52, #0a0b11 72%); display: flex; align-items: center; justify-content: center; font-size: 11px; color: rgba(242,243,245,.7);")}>{q.initial}</span>
                <span style={css("font-size: 13px; color: rgba(242,243,245,.72);")}>{q.name}</span>
                <span style={css(`${MONO} font-size: 10px; letter-spacing: .12em; color: rgba(242,243,245,.6);`)}>{q.org}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="faq" data-screen-label="FAQ" data-orb="30,14,.62,.7,3" style={css("position: relative; z-index: 2; padding: clamp(80px, 13vh, 150px) clamp(20px, 5vw, 64px); border-top: 1px solid rgba(242,243,245,.07);")}>
        <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: clamp(30px, 5vw, 70px); align-items: start;")}>
          <h2 style={css("margin: 0; font-size: clamp(28px, 4.2vw, 54px); font-weight: 300; letter-spacing: -.035em; line-height: 1.04; position: sticky; top: 120px;")}>
            <span style={css("display: block; overflow: hidden;")}><span data-mask="" style={css(MASK)}>Before you</span></span>
            <span style={css("display: block; overflow: hidden;")}>
              <span data-mask="" data-delay="90" style={css(MASK)}>
                <em style={css(SERIF)}>write</em> to us.
              </span>
            </span>
          </h2>
          <div style={css("display: flex; flex-direction: column;")}>
            {faqSrc.map(([q, a], i) => (
              <div key={q} data-reveal="" style={css(`opacity: 0; transform: translateY(14px); transition: opacity 800ms ${EASE}, transform 800ms ${EASE}; border-bottom: 1px solid rgba(242,243,245,.1);`)}>
                <button
                  onClick={() => setOpen((o) => (o === i ? -1 : i))}
                  onMouseEnter={() => setFaqHov(i)}
                  onMouseLeave={() => setFaqHov(-1)}
                  style={css(`width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 0; background: none; border: 0; color: ${faqHov === i ? "oklch(0.85 0.07 250)" : "#F2F3F5"}; font-family: inherit; font-size: clamp(15px, 1.45vw, 19px); font-weight: 300; letter-spacing: -.01em; text-align: left; cursor: pointer;`)}
                >
                  <span>{q}</span>
                  <span style={css(`font-size: 20px; font-weight: 200; color: rgba(242,243,245,.5); transition: transform 400ms ${EASE}; transform: rotate(${open === i ? 135 : 0}deg)`)}>+</span>
                </button>
                <div style={css(`overflow: hidden; transition: max-height 500ms ${EASE}, opacity 400ms; max-height: ${open === i ? "240px" : "0px"}; opacity: ${open === i ? 1 : 0}`)}>
                  <p style={css("margin: 0 0 24px; max-width: 54ch; font-size: 14.5px; line-height: 1.7; font-weight: 300; color: rgba(242,243,245,.62);")}>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" data-screen-label="Contact" data-orb="0,0,1.7,1,0" style={css("position: relative; z-index: 2; min-height: 92vh; display: flex; flex-direction: column; justify-content: center; padding: clamp(80px, 12vh, 150px) clamp(20px, 5vw, 64px); border-top: 1px solid rgba(242,243,245,.07); text-align: center;")}>
        <div data-reveal="" style={css(`${reveal(16)} ${EYEBROW("rgba(242,243,245,.6)")}`)}>Next step</div>
        <h2 style={css("margin: clamp(22px, 4vh, 38px) auto 0; font-size: clamp(34px, 6.4vw, 92px); font-weight: 300; letter-spacing: -.04em; line-height: 1; max-width: 18ch;")}>
          <span style={css("display: block; overflow: hidden;")}><span data-mask="" style={css(MASK)}>Tell us what</span></span>
          <span style={css("display: block; overflow: hidden;")}>
            <span data-mask="" data-delay="90" style={css(MASK)}>
              you&apos;re <em style={css(SERIF)}>building</em>.
            </span>
          </span>
        </h2>
        <p data-reveal="" data-delay="220" style={css(`${reveal(16)} margin: 26px auto 0; max-width: 46ch; font-size: clamp(15px, 1.35vw, 18px); line-height: 1.65; font-weight: 300; color: rgba(242,243,245,.64);`)}>Send a message and you&apos;ll get scope, timeline and a fixed price back — usually within a day.</p>
        <div style={css("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: clamp(32px, 5vh, 52px);")}>
          <a
            href="https://t.me/itsslucki"
            onMouseEnter={() => setCallH(true)}
            onMouseLeave={() => setCallH(false)}
            style={css(`display: flex; align-items: center; gap: 10px; padding: 14px 26px; border-radius: 999px; background: #F2F3F5; color: #06070A; font-size: 15px; font-weight: 600; transition: transform 300ms ${EASE}; transform: ${callH ? "scale(1.03)" : "none"};`)}
          >
            <span style={css(PULSE)}><span style={css(PULSE_RING)} /></span>
            <span style={css(SWAP)}>
              <span style={css(`display: block; transition: transform 500ms ${EASE}; transform: ${callH ? "translateY(-1.5em)" : "translateY(0)"};`)}>
                <span style={css("display: block; white-space: nowrap;")}>Book a call</span>
                <span style={css("display: block; white-space: nowrap;")}>Let&apos;s talk</span>
              </span>
            </span>
          </a>
          <a
            href="#work"
            onMouseEnter={() => setPfH(true)}
            onMouseLeave={() => setPfH(false)}
            style={css(`display: flex; align-items: center; gap: 10px; padding: 14px 26px; border-radius: 999px; font-size: 15px; font-weight: 600; background: ${pfH ? "rgb(60,145,230)" : "rgba(255,255,255,.06)"}; color: #FFFFFF; border: 1px solid ${pfH ? "rgb(60,145,230)" : "rgba(255,255,255,.2)"}; transition: background 400ms ease, color 400ms ease, border-color 400ms ease;`)}
          >
            <span style={css(SWAP)}>
              <span style={css(`display: block; transition: transform 500ms ${EASE}; transform: ${pfH ? "translateY(-1.5em)" : "translateY(0)"};`)}>
                <span style={css("display: block; white-space: nowrap;")}>See portfolio</span>
                <span style={css("display: block; white-space: nowrap;")}>See portfolio</span>
              </span>
            </span>
            <span style={css(`transition: transform 400ms ${EASE}; transform: ${pfH ? "translateX(3px)" : "translateX(0)"};`)}>→</span>
          </a>
        </div>
      </section>

      <footer style={css("position: relative; z-index: 2; padding: clamp(40px, 6vh, 64px) clamp(20px, 5vw, 64px); border-top: 1px solid rgba(242,243,245,.08); background: rgba(6,7,10,.86); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px;")}>
        <div style={css("display: flex; align-items: center; gap: 10px; font-size: 13px; letter-spacing: .16em; text-transform: lowercase; color: rgba(242,243,245,.7)")}>
          <span style={css("width: 9px; height: 9px; border-radius: 50%; background: radial-gradient(circle at 32% 30%, #6e7fb5, #0a0b11 70%);")} />
          Noirsfera
        </div>
        <div style={css("display: flex; flex-wrap: wrap; gap: 22px; font-size: 12.5px; color: rgba(242,243,245,.5);")}>
          <a href="https://t.me/itsslucki" style={css("color: inherit;")}>Telegram</a>
          <a href="https://www.instagram.com/noirsfera/" style={css("color: inherit;")}>Instagram</a>
          <a href="https://x.com/from_noirsfera" style={css("color: inherit;")}>X</a>
        </div>
        <div style={css(`${MONO} font-size: 10.5px; letter-spacing: .14em; color: rgba(242,243,245,.6);`)}>© 2026 noirsfera</div>
      </footer>
    </div>
  )
}
