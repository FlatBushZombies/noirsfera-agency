"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { css } from "@/lib/css"
import { AsciiSphere } from "@/components/ascii-sphere"
import { Cursor } from "@/components/cursor"

const RU: Record<string, string> = {
  "Software for founders, shipped in weeks at": "Продукты для основателей — за считанные недели в",
  "We design and build web, mobile and AI products": "Мы проектируем и создаём веб-, мобильные и AI-продукты",
  "for founders — and run our own apps too": "для основателей — и развиваем собственные приложения",
  "See portfolio": "Портфолио",
  "Book a call": "Записаться на звонок",
  "Our clients": "Наши клиенты",
}

const CLIENTS = ["Next Up Boxing League", "TutSchool", "Camp Guide", "DMB Pay+", "Oakwood ESL"]

const EASE = "cubic-bezier(.22,1,.36,1)"

function SlideLabel({ label, shifted }: { label: string; shifted: boolean }) {
  return (
    <span style={css("display:block;height:18px;overflow:hidden")}>
      <span
        style={css(
          `display:flex;flex-direction:column;line-height:18px;transform:translateY(${shifted ? "-18px" : "0px"});transition:transform 420ms ${EASE}`,
        )}
      >
        <span>{label}</span>
        <span aria-hidden="true">{label}</span>
      </span>
    </span>
  )
}

export function Home() {
  const [lang, setLang] = useState<"en" | "ru">("en")
  const [narrow, setNarrow] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const [bookHover, setBookHover] = useState(false)
  const [workHover, setWorkHover] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem("nf-lang") === "ru") setLang("ru")
    } catch {}
    const onResize = () => setNarrow(window.innerWidth < 900)
    onResize()
    window.addEventListener("resize", onResize)
    const iv = window.setInterval(() => setNow(Date.now()), 1000)
    return () => {
      window.removeEventListener("resize", onResize)
      window.clearInterval(iv)
    }
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

  return (
    <div
      data-screen-label="Home"
      style={css(
        "position:relative;min-height:100vh;min-height:100svh;background:var(--white);color:var(--ink-950);font-family:var(--font-sans);display:grid;grid-template-columns:minmax(0,1fr) min(100%,clamp(520px,50vw,950px)) minmax(0,1fr);overflow:hidden",
      )}
    >
      <Cursor />

      <div aria-hidden="true" style={css("position:relative;min-width:0")}>
        <AsciiSphere fg="10,10,11" cx={0.5} cy={0.46} size={0.38} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </div>

      <div
        style={css(
          "position:relative;display:flex;flex-direction:column;min-height:100vh;min-height:100svh;box-shadow:inset 1px 0 0 var(--border-default),inset -1px 0 0 var(--border-default);background:var(--white)",
        )}
      >
        <div style={css("height:108px;display:flex;align-items:center;justify-content:center")}>
          <Link
            href="/"
            style={css('display:flex;align-items:center;gap:10px;font:600 26px/1 var(--font-sans);letter-spacing:-0.05em;color:var(--ink-950);text-decoration:none')}
          >
            <span
              aria-hidden="true"
              style={css("width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#5A5A60 0%,#141416 42%,#0A0A0B 70%)")}
            />
            <span>noirsfera</span>
          </Link>
        </div>

        <main
          style={css(
            "flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(56px,9vh,88px);padding:0 24px 108px;text-align:center",
          )}
        >
          <div style={css("display:flex;flex-direction:column;align-items:center;gap:18px")}>
            {narrow && (
              <AsciiSphere fg="10,10,11" cx={0.5} cy={0.5} size={0.46} style={{ display: "block", width: 220, height: 220 }} />
            )}
            <h1
              style={css(
                'margin:0;max-width:15ch;font:500 clamp(2rem,3.4vw,2.75rem)/1.08 var(--font-sans);letter-spacing:-0.045em;text-wrap:balance',
              )}
            >
              {t("Software for founders, shipped in weeks at")}{" "}
              <em style={css("font-family:var(--font-serif);font-style:italic;font-weight:400;letter-spacing:-0.02em;color:#0000FF")}>noirsfera</em>
            </h1>
            <p style={css('margin:0;max-width:44ch;font:400 15px/1.5 var(--font-sans);color:var(--ink-950);text-wrap:balance')}>
              {t("We design and build web, mobile and AI products")}{" "}
              <span style={css("color:var(--ink-600)")}>{t("for founders — and run our own apps too")}</span>
            </p>
            <div style={css("display:flex;justify-content:center;gap:8px;flex-wrap:wrap;padding-top:6px")}>
              <Link
                href="/portfolio"
                onMouseEnter={() => setWorkHover(true)}
                onMouseLeave={() => setWorkHover(false)}
                onFocus={() => setWorkHover(true)}
                onBlur={() => setWorkHover(false)}
                style={css(
                  `display:inline-flex;align-items:center;height:40px;padding:0 20px;border-radius:4px;background:${workHover ? "var(--ink-950)" : "var(--ink-100)"};color:${workHover ? "var(--white)" : "var(--ink-950)"};text-decoration:none;font:500 15px/1 var(--font-sans);letter-spacing:-0.01em;box-sizing:border-box;transition:background 240ms ${EASE},color 240ms ${EASE}`,
                )}
              >
                <SlideLabel label={t("See portfolio")} shifted={workHover} />
              </Link>
              <Link
                href="/call"
                onMouseEnter={() => setBookHover(true)}
                onMouseLeave={() => setBookHover(false)}
                onFocus={() => setBookHover(true)}
                onBlur={() => setBookHover(false)}
                style={css(
                  `display:inline-flex;align-items:center;height:40px;padding:0 20px;border-radius:4px;background:${bookHover ? "#0000FF" : "var(--ink-950)"};color:var(--white);text-decoration:none;font:500 15px/1 var(--font-sans);letter-spacing:-0.01em;box-sizing:border-box;transition:background 240ms ${EASE}`,
                )}
              >
                <SlideLabel label={t("Book a call")} shifted={bookHover} />
              </Link>
            </div>
          </div>

          <div style={css("display:flex;flex-direction:column;align-items:center;gap:22px")}>
            <span style={css("font:400 12px/1 var(--font-sans);color:var(--ink-600)")}>{t("Our clients")}</span>
            <ul
              aria-label="Clients"
              style={css("list-style:none;margin:0;padding:0;max-width:640px;display:flex;flex-wrap:wrap;justify-content:center;column-gap:32px;row-gap:18px")}
            >
              {CLIENTS.map((c) => (
                <li
                  key={c}
                  style={css(
                    'font:600 19px/1 var(--font-sans);letter-spacing:-0.035em;color:var(--ink-500);white-space:nowrap;transition:color 140ms ' + EASE,
                  )}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-950)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-500)")}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>

      <div aria-hidden="true" style={css("position:relative;min-width:0")}>
        <AsciiSphere fg="10,10,11" cx={0.5} cy={0.46} size={0.38} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </div>

      <span style={css("position:absolute;top:54px;left:clamp(16px,2.6vw,50px);transform:translateY(-50%);font:400 12px/1 var(--font-mono);color:var(--ink-600)")}>
        noirsfera.com
      </span>
      <div style={css("position:absolute;top:54px;right:clamp(16px,2.6vw,50px);transform:translateY(-50%);display:flex;align-items:center;gap:14px")}>
        <button
          type="button"
          onClick={toggleLang}
          aria-label={lang === "ru" ? "Switch to English" : "Переключить на русский"}
          lang={lang === "ru" ? "en" : "ru"}
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
    </div>
  )
}
