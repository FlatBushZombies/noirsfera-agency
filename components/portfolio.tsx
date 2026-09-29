"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { css } from "@/lib/css"
import { Cursor } from "@/components/cursor"

const RU: Record<string, string> = {
  "shipped": "запущено",
  "10+ products": "10+ продуктов",
  "for founders and ourselves": "для основателей и для себя",
  "We design, build and launch products for early-stage founders": "Мы проектируем, разрабатываем и запускаем продукты для основателей на ранней стадии",
  "— and run our own apps too": "— и развиваем собственные приложения",
  "Our products": "Наши продукты",
  "Client work": "Работа с клиентами",
  "Software for founders, shipped in weeks at noirsfera": "Продукты для основателей — за считанные недели в noirsfera",
  "Start the project": "Начать проект",
  "Our app": "Наше приложение",
  "On-demand services marketplace": "Маркетплейс услуг по запросу",
  "Mobile app, built and run in-house": "Мобильное приложение, созданное и развиваемое нами",
  "Sports": "Спорт",
  "Event ticketing and live streaming": "Продажа билетов и стриминг",
  "Education": "Образование",
  "Tutoring platform for students and tutors": "Платформа для репетиторов и учеников",
  "Marketplace": "Маркетплейс",
  "Discovery and booking for camps": "Поиск и бронирование лагерей",
  "Fintech": "Финтех",
  "Payments app, designed and built end to end": "Платёжное приложение, спроектированное и созданное с нуля",
  "Website and enrolment for a language school": "Сайт и запись в языковую школу",
}

const EASE = "cubic-bezier(.22,1,.36,1)"

type Frame = { src: string; alt: string }
type Project = {
  name: string
  type: string
  line: string
  href: string
  frames: Frame[]
}

const OWN: Project[] = [
  {
    name: "QuickHands",
    type: "Our app",
    line: "On-demand services marketplace",
    href: "#",
    frames: [
      { src: "/projects/quickhands-1.jpg", alt: "QuickHands — find specialists near you" },
      { src: "/projects/quickhands-2.jpg", alt: "QuickHands — hire available specialists" },
      { src: "/projects/quickhands-3.jpg", alt: "QuickHands — manage your tasks" },
    ],
  },
  {
    name: "Duo",
    type: "Our app",
    line: "Mobile app, built and run in-house",
    href: "#",
    frames: [
      { src: "/projects/duo-1.jpg", alt: "Duo — match movies together" },
      { src: "/projects/duo-2.jpg", alt: "Duo — swipe to match" },
      { src: "/projects/duo-3.jpg", alt: "Duo — enjoy movie nights" },
    ],
  },
]

const CLIENT_PROJECTS: Project[] = [
  {
    name: "Next Up Boxing League",
    type: "Sports",
    line: "Event ticketing and live streaming",
    href: "#",
    frames: [
      { src: "/projects/nextup-login.gif", alt: "Next Up Boxing League members login screen" },
      { src: "/projects/nextup-home.gif", alt: "Next Up Boxing League homepage — Where champions are forged" },
    ],
  },
  {
    name: "TutSchool",
    type: "Education",
    line: "Tutoring platform for students and tutors",
    href: "#",
    frames: [
      { src: "/projects/tutschool-1.png", alt: "TutSchool — website" },
      { src: "/projects/tutschool-2.png", alt: "TutSchool — mobile screens" },
    ],
  },
  {
    name: "Camp Guide",
    type: "Marketplace",
    line: "Discovery and booking for camps",
    href: "#",
    frames: [{ src: "/camp-guide.png", alt: "Camp Guide — product preview" }],
  },
  {
    name: "DMB Pay+",
    type: "Fintech",
    line: "Payments app, designed and built end to end",
    href: "#",
    frames: [{ src: "/dmbpay-bg.png", alt: "DMB Pay+ — product preview" }],
  },
  {
    name: "Oakwood ESL",
    type: "Education",
    line: "Website and enrolment for a language school",
    href: "#",
    frames: [
      { src: "/projects/oakwood-1.webp", alt: "Oakwood ESL — students in class" },
      { src: "/projects/oakwood-2.webp", alt: "Oakwood ESL — circle time" },
    ],
  },
]

function SectionRule() {
  return (
    <div style={css("position:relative;height:1px;background:var(--border-default);margin-bottom:40px")}>
      <span
        aria-hidden="true"
        style={css(
          "position:absolute;left:-6px;top:-6px;width:13px;height:13px;background:linear-gradient(var(--ink-400),var(--ink-400)) center/1px 100% no-repeat,linear-gradient(var(--ink-400),var(--ink-400)) center/100% 1px no-repeat",
        )}
      />
      <span
        aria-hidden="true"
        style={css(
          "position:absolute;right:-6px;top:-6px;width:13px;height:13px;background:linear-gradient(var(--ink-400),var(--ink-400)) center/1px 100% no-repeat,linear-gradient(var(--ink-400),var(--ink-400)) center/100% 1px no-repeat",
        )}
      />
    </div>
  )
}

function CardGrid({ items, t }: { items: Project[]; t: (s: string) => string }) {
  return (
    <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:48px 24px")}>
      {items.map((p) => (
        <a key={p.name} href={p.href} style={css("display:flex;flex-direction:column;gap:14px;text-decoration:none;color:inherit")}>
          <div style={css("position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--ink-100)")}>
            <Sequence frames={p.frames} />
          </div>
          <div style={css("display:flex;justify-content:space-between;align-items:baseline;gap:16px")}>
            <span style={css("font:500 15px/1.3 var(--font-sans);letter-spacing:-0.015em")}>
              {p.name} <span style={css("color:var(--ink-600);font-weight:400")}>— {t(p.line)}</span>
            </span>
            <span style={css("flex:none;font:400 12px/1 var(--font-mono);color:var(--ink-600)")}>{t(p.type)}</span>
          </div>
        </a>
      ))}
    </div>
  )
}

// Crossfades through a project's real screenshots every 7s, exactly like the
// artifact's Next Up Boxing League treatment (Math.floor(Date.now()/7000) % n) —
// generalized here to any frame count so every project with more than one real
// shot on hand gets the same "sequencing" look. A single-frame project just
// renders statically.
function Sequence({ frames }: { frames: Frame[] }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (frames.length < 2) return
    const tick = () => setActive(Math.floor(Date.now() / 7000) % frames.length)
    tick()
    const iv = window.setInterval(tick, 1000)
    return () => window.clearInterval(iv)
  }, [frames.length])
  return (
    <>
      {frames.map((f, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={f.src}
          src={f.src}
          alt={f.alt}
          style={css(
            `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:${i === active ? 1 : 0};transition:opacity 700ms ${EASE}`,
          )}
        />
      ))}
    </>
  )
}

export function Portfolio() {
  const [lang, setLang] = useState<"en" | "ru">("en")
  const [now, setNow] = useState(() => Date.now())
  const [ctaHover, setCtaHover] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem("nf-lang") === "ru") setLang("ru")
    } catch {}
    const iv = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(iv)
  }, [])

  const t = (s: string) => (lang === "ru" ? RU[s] ?? s : s)
  const toggleLang = () => {
    const next = lang === "ru" ? "en" : "ru"
    setLang(next)
    try {
      localStorage.setItem("nf-lang", next)
    } catch {}
  }
  const clock = new Date(now).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })

  const ctaY = ctaHover ? "-1.5em" : "0em"
  const arrowX = ctaHover ? "100%" : "0%"
  const arrowY = ctaHover ? "-100%" : "0%"

  return (
    <div data-screen-label="Portfolio" style={css("background:var(--white);color:var(--ink-950);font-family:var(--font-sans);min-height:100vh")}>
      <Cursor />
      <header style={css("position:relative;height:108px;display:flex;align-items:center;justify-content:center")}>
        <span style={css("position:absolute;left:clamp(16px,2.6vw,50px);top:54px;transform:translateY(-50%);font:400 12px/1 var(--font-mono);color:var(--ink-600)")}>
          noirsfera.com
        </span>
        <Link
          href="/"
          style={css("display:flex;align-items:center;gap:10px;font:600 26px/1 var(--font-sans);letter-spacing:-0.05em;color:var(--ink-950);text-decoration:none")}
        >
          <span
            aria-hidden="true"
            style={css("width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#5A5A60 0%,#141416 42%,#0A0A0B 70%)")}
          />
          <span>noirsfera</span>
        </Link>
        <div style={css("position:absolute;top:54px;right:clamp(16px,2.6vw,50px);transform:translateY(-50%);display:flex;align-items:center;gap:14px")}>
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === "ru" ? "Switch to English" : "Переключить на русский"}
            style={css(
              `height:28px;padding:0 10px;border:none;border-radius:4px;background:var(--ink-100);color:var(--ink-950);font:500 12px/1 var(--font-mono);letter-spacing:0.04em;cursor:pointer;transition:background 240ms ${EASE},color 240ms ${EASE}`,
            )}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--ink-950)"
              e.currentTarget.style.color = "var(--white)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--ink-100)"
              e.currentTarget.style.color = "var(--ink-950)"
            }}
          >
            {lang === "ru" ? "EN" : "РУ"}
          </button>
          <time style={css("font:400 12px/1 var(--font-mono);color:var(--ink-600);font-variant-numeric:tabular-nums")}>{clock}</time>
        </div>
      </header>

      <div style={css("padding:0 clamp(16px,2.6vw,50px)")}>
        <Link
          href="/"
          aria-label="Back to home"
          style={css(
            `display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:6px;box-shadow:inset 0 0 0 1px var(--border-default);color:var(--ink-950);text-decoration:none;font:400 18px/1 var(--font-sans);transition:background 240ms ${EASE},color 240ms ${EASE}`,
          )}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--ink-950)"
            e.currentTarget.style.color = "var(--white)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.color = "var(--ink-950)"
          }}
        >
          ←
        </Link>
      </div>

      <main>
        <section
          style={css(
            "padding:clamp(4rem,12vh,7rem) 24px clamp(4rem,10vh,6rem);display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center",
          )}
        >
          <h1 style={css('margin:0;max-width:16ch;font:500 clamp(2rem,3.4vw,2.75rem)/1.08 var(--font-sans);letter-spacing:-0.045em;text-wrap:balance')}>
            {t("10+ products")}{" "}
            <em style={css("font-family:var(--font-serif);font-style:italic;font-weight:400;letter-spacing:-0.02em;color:#0000FF")}>{t("shipped")}</em>{" "}
            {t("for founders and ourselves")}
          </h1>
          <p style={css('margin:0;max-width:44ch;font:400 15px/1.5 var(--font-sans);color:var(--ink-950);text-wrap:balance')}>
            {t("We design, build and launch products for early-stage founders")}{" "}
            <span style={css("color:var(--ink-600)")}>{t("— and run our own apps too")}</span>
          </p>
        </section>

        <section aria-label="Our products" style={css("padding:0 clamp(16px,1.8vw,36px) clamp(4rem,10vh,6rem)")}>
          <div style={css("position:relative;display:flex;justify-content:space-between;align-items:center;padding-bottom:32px")}>
            <span style={css("font:400 12px/1 var(--font-mono);color:var(--ink-600)")}>{t("Our products")} · 02</span>
          </div>
          <SectionRule />
          <CardGrid items={OWN} t={t} />
        </section>

        <section aria-label="Client work" style={css("padding:0 clamp(16px,1.8vw,36px) clamp(5rem,14vh,8rem)")}>
          <div style={css("display:flex;justify-content:space-between;align-items:center;padding-bottom:32px")}>
            <span style={css("font:400 12px/1 var(--font-mono);color:var(--ink-600)")}>{t("Client work")} · 05</span>
          </div>
          <SectionRule />
          <CardGrid items={CLIENT_PROJECTS} t={t} />
        </section>
      </main>

      <footer>
        <Link
          href="/call"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          onFocus={() => setCtaHover(true)}
          onBlur={() => setCtaHover(false)}
          style={css(
            "position:relative;display:flex;flex-direction:column;justify-content:space-between;min-height:100vh;min-height:100svh;padding:clamp(20px,2.4vw,48px) clamp(20px,2.4vw,48px) clamp(16px,2vw,36px);box-sizing:border-box;background:#0000FF;color:var(--white);text-decoration:none",
          )}
        >
          <div style={css("display:flex;justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap")}>
            <span style={css("font:400 15px/1.4 var(--font-sans);color:var(--white)")}>{t("Software for founders, shipped in weeks at noirsfera")}</span>
            <span style={css("font:400 12px/1 var(--font-mono);color:var(--white)")}>© 2026 noirsfera</span>
          </div>
          <div style={css("display:flex;justify-content:space-between;align-items:flex-end;gap:24px")}>
            <span
              style={css(
                "display:block;overflow:hidden;height:1.2em;margin-bottom:-0.12em;font:500 clamp(3.5rem,11.5vw,13rem)/1.2 var(--font-sans);letter-spacing:-0.05em;white-space:nowrap",
              )}
            >
              <span
                style={css(`display:flex;flex-direction:column;gap:0.3em;transform:translateY(${ctaY});transition:transform 560ms ${EASE}`)}
              >
                <span style={css("height:1.2em")}>{t("Start the project")}</span>
                <span aria-hidden="true" style={css("height:1.2em")}>
                  {t("Start the project")}
                </span>
              </span>
            </span>
            <span
              aria-hidden="true"
              style={css("flex:none;display:block;overflow:hidden;width:clamp(2.5rem,7vw,7.5rem);height:clamp(2.5rem,7vw,7.5rem);margin-bottom:0.08em")}
            >
              <span
                style={css(`position:relative;display:block;width:100%;height:100%;transform:translate(${arrowX},${arrowY});transition:transform 560ms ${EASE}`)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={css("position:absolute;inset:0;width:100%;height:100%")}>
                  <path d="M6 18L18 6M8 6h10v10" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  style={css("position:absolute;left:-100%;top:100%;width:100%;height:100%")}
                >
                  <path d="M6 18L18 6M8 6h10v10" />
                </svg>
              </span>
            </span>
          </div>
        </Link>
      </footer>
    </div>
  )
}
