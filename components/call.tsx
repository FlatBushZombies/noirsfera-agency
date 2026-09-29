"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { css } from "@/lib/css"
import { Calendar } from "@/components/booking/calendar"
import { TimeSlot } from "@/components/booking/time-slot"
import { DsInput } from "@/components/forms/ds-input"

const RU: Record<string, string> = {
  "Book a": "Запишитесь на",
  "20-minute": "20-минутный",
  "call": "звонок",
  "Tell us what you’re building": "Расскажите, что вы создаёте",
  "— we’ll tell you honestly if we’re a fit": "— мы честно скажем, подходим ли мы друг другу",
  "Intro call · 20 min · Google Meet": "Вводный звонок · 20 мин · Google Meet",
  "Continue": "Продолжить",
  "Change": "Изменить",
  "Confirm booking": "Подтвердить запись",
  "Sending…": "Отправка…",
  "Couldn’t send your booking. Please try again or message us on Telegram.": "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.",
  "Pick a day to see open times.": "Выберите день, чтобы увидеть свободное время.",
  "Select a day": "Выберите день",
  "Booked": "Забронировано",
  "See you": "До встречи",
  "soon": "скоро",
  "Back to noirsfera": "На главную noirsfera",
  "Or reach us directly": "Или свяжитесь напрямую",
  "Name": "Имя",
  "Email": "Email",
  "What are you building?": "Что вы создаёте?",
  "A sentence or two is plenty.": "Пары предложений достаточно.",
  "Local time": "Местное время",
}

const EASE = "cubic-bezier(.22,1,.36,1)"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const DOW_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

type Step = "pick" | "details" | "done"

export function Call() {
  const [lang, setLang] = useState<"en" | "ru">("en")
  const [now, setNow] = useState(() => Date.now())

  const today = useRef<Date | null>(null)
  if (!today.current) {
    const n = new Date()
    today.current = new Date(n.getFullYear(), n.getMonth(), n.getDate())
  }
  const T = today.current

  const [year, setYear] = useState(() => T.getFullYear())
  const [month, setMonth] = useState(() => T.getMonth())
  const [day, setDay] = useState<number | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [step, setStep] = useState<Step>("pick")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [about, setAbout] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

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

  const available = (d: number) => {
    const dt = new Date(year, month, d)
    const w = dt.getDay()
    return dt > T && w !== 6 && dt.getTime() - T.getTime() < 1000 * 60 * 60 * 24 * 42
  }

  const times = useMemo(() => {
    const list: string[] = []
    for (let m = 600; m <= 1140; m += 30) {
      list.push(String(Math.floor(m / 60)).padStart(2, "0") + ":" + (m % 60 ? "30" : "00"))
    }
    return list
  }, [])

  const slots = day
    ? times.map((tm, i) => ({
        time: tm,
        selected: time === tm,
        disabled: (day * 7 + i * 3) % 5 === 0,
      }))
    : []

  const dt = day ? new Date(year, month, day) : null
  const dayLabel = dt ? `${DOW_FULL[dt.getDay()]}, ${MONTHS[month]} ${day}` : t("Select a day")
  const summary = dt ? `${dayLabel} · ${time}` : ""
  const isCur = year === T.getFullYear() && month === T.getMonth()

  const shift = (k: number) => {
    const d = new Date(year, month + k, 1)
    if (d < new Date(T.getFullYear(), T.getMonth(), 1)) return
    setYear(d.getFullYear())
    setMonth(d.getMonth())
    setDay(null)
    setTime(null)
  }

  const okEmail = /.+@.+\..+/.test(email)
  const cantConfirm = !(name.trim() && okEmail)
  let tz = "Local time"
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ")
  } catch {}

  const confirm = async () => {
    if (cantConfirm || sending) return
    setSending(true)
    setError(false)
    try {
      const r = await fetch("https://formsubmit.co/ajax/noirsfera@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New call booking — " + name + " · " + summary,
          _template: "table",
          _captcha: "false",
          _replyto: email,
          Name: name,
          Email: email,
          "Date & time": summary,
          "Time zone": tz,
          "What they are building": about || "—",
          Language: lang === "ru" ? "Russian" : "English",
        }),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || j.success === false || j.success === "false") throw new Error(j.message || "send failed")
      setSending(false)
      setStep("done")
    } catch {
      setSending(false)
      setError(true)
    }
  }

  const confirmOpacity = cantConfirm || sending ? 0.35 : 1
  const doneLine = `${summary}. A calendar invite with the Meet link is on its way to ${email}.`

  return (
    <div
      data-screen-label="Call"
      style={css("--radius-md:4px;background:var(--white);color:var(--ink-950);font-family:var(--font-sans);min-height:100vh;display:flex;flex-direction:column")}
    >
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

      <main
        style={css(
          "flex:1;padding:clamp(3rem,10vh,6rem) clamp(1rem,4vw,3rem) clamp(3rem,8vh,5rem);display:flex;flex-direction:column;align-items:center;gap:clamp(2.5rem,6vh,3.5rem)",
        )}
      >
        <div style={css("display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center")}>
          <h1 style={css('margin:0;font:500 clamp(2rem,3.4vw,2.75rem)/1.08 var(--font-sans);letter-spacing:-0.045em;text-wrap:balance')}>
            {t("Book a")}{" "}
            <em style={css("font-family:var(--font-serif);font-style:italic;font-weight:400;letter-spacing:-0.02em;color:#0000FF")}>{t("20-minute")}</em>{" "}
            {t("call")}
          </h1>
          <p style={css('margin:0;max-width:44ch;font:400 15px/1.5 var(--font-sans);color:var(--ink-950);text-wrap:balance')}>
            {t("Tell us what you’re building")} <span style={css("color:var(--ink-600)")}>{t("— we’ll tell you honestly if we’re a fit")}</span>
          </p>
        </div>

        <div
          style={css(
            "width:100%;max-width:880px;background:var(--white);border-radius:6px;box-shadow:inset 0 0 0 1px var(--border-default),var(--shadow-float);overflow:hidden",
          )}
        >
          {step === "pick" && (
            <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))")}>
              <div style={css("padding:28px;display:flex;flex-direction:column;gap:24px;box-shadow:inset -1px 0 0 var(--border-hairline)")}>
                <span style={css("font:400 11px/1 var(--font-mono);letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-600)")}>
                  {t("Intro call · 20 min · Google Meet")}
                </span>
                <Calendar
                  year={year}
                  month={month}
                  selected={day}
                  today={isCur ? T.getDate() : null}
                  available={available}
                  onSelect={(d) => {
                    setDay(d)
                    setTime(null)
                  }}
                  onPrev={() => shift(-1)}
                  onNext={() => shift(1)}
                />
              </div>
              <div style={css("padding:28px;display:flex;flex-direction:column;gap:20px;min-height:360px")}>
                <div style={css("display:flex;justify-content:space-between;align-items:baseline;gap:12px")}>
                  <span style={css("font:500 16px/1.3 var(--font-sans);letter-spacing:-0.015em")}>{dayLabel}</span>
                  <span style={css("font:400 11px/1 var(--font-mono);letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-600)")}>{t(tz)}</span>
                </div>
                {day ? (
                  <div style={css("display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px")}>
                    {slots.map((s) => (
                      <TimeSlot key={s.time} time={s.time} selected={s.selected} disabled={s.disabled} onClick={() => setTime(s.time)} />
                    ))}
                  </div>
                ) : (
                  <p style={css('margin:0;font:400 14px/1.5 var(--font-sans);color:var(--ink-600)')}>{t("Pick a day to see open times.")}</p>
                )}
                <div style={css("margin-top:auto;display:flex;justify-content:flex-end")}>
                  <button
                    type="button"
                    disabled={!time}
                    onClick={() => time && setStep("details")}
                    style={css(
                      `height:40px;padding:0 20px;border:none;border-radius:4px;background:var(--ink-950);color:var(--white);font:500 15px/1 var(--font-sans);letter-spacing:-0.01em;cursor:pointer;opacity:${time ? 1 : 0.35};transition:background 240ms ${EASE}`,
                    )}
                    onMouseEnter={(e) => {
                      if (time) e.currentTarget.style.background = "#0000FF"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--ink-950)"
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = "scale(0.98)"
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = "none"
                    }}
                  >
                    {t("Continue")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "details" && (
            <div style={css("padding:28px;display:flex;flex-direction:column;gap:24px")}>
              <div
                style={css(
                  "display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding-bottom:20px;box-shadow:inset 0 -1px 0 var(--border-hairline)",
                )}
              >
                <div style={css("display:flex;flex-direction:column;gap:6px")}>
                  <span style={css("font:400 11px/1 var(--font-mono);letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-600)")}>
                    {t("Intro call · 20 min · Google Meet").replace(" · Google Meet", "")}
                  </span>
                  <span style={css("font:500 16px/1.3 var(--font-sans);letter-spacing:-0.015em")}>{summary}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("pick")}
                  style={css(
                    `height:32px;padding:0 14px;border:none;border-radius:4px;background:var(--ink-100);color:var(--ink-950);font:500 14px/1 var(--font-sans);cursor:pointer;transition:background 240ms ${EASE},color 240ms ${EASE}`,
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
                  {t("Change")}
                </button>
              </div>
              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px")}>
                <DsInput label={t("Name")} value={name} onChange={setName} />
                <DsInput label={t("Email")} type="email" value={email} onChange={setEmail} />
              </div>
              <DsInput label={t("What are you building?")} multiline rows={4} value={about} onChange={setAbout} placeholder={t("A sentence or two is plenty.")} />
              <div style={css("display:flex;justify-content:flex-end")}>
                <button
                  type="button"
                  disabled={cantConfirm || sending}
                  onClick={confirm}
                  style={css(
                    `height:40px;padding:0 20px;border:none;border-radius:4px;background:var(--ink-950);color:var(--white);font:500 15px/1 var(--font-sans);letter-spacing:-0.01em;cursor:pointer;opacity:${confirmOpacity};transition:background 240ms ${EASE}`,
                  )}
                  onMouseEnter={(e) => {
                    if (!(cantConfirm || sending)) e.currentTarget.style.background = "#0000FF"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--ink-950)"
                  }}
                >
                  {sending ? t("Sending…") : t("Confirm booking")}
                </button>
              </div>
              {error && (
                <p role="alert" style={css('margin:0;text-align:right;font:400 14px/1.5 var(--font-sans);color:var(--danger-600)')}>
                  {t("Couldn’t send your booking. Please try again or message us on Telegram.")}
                </p>
              )}
            </div>
          )}

          {step === "done" && (
            <div style={css("padding:clamp(40px,8vw,64px) 28px;display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center")}>
              <span style={css("font:400 11px/1 var(--font-mono);letter-spacing:0.1em;text-transform:uppercase;color:var(--success-600)")}>
                {t("Booked")}
              </span>
              <h2 style={css('margin:0;font:500 clamp(1.5rem,2.6vw,2rem)/1.08 var(--font-sans);letter-spacing:-0.04em')}>
                {t("See you")}{" "}
                <em style={css("font-family:var(--font-serif);font-style:italic;font-weight:400;letter-spacing:-0.01em;color:#0000FF")}>{t("soon")}</em>
              </h2>
              <p style={css('margin:0;max-width:40ch;font:400 15px/1.5 var(--font-sans);color:var(--ink-600)')}>{doneLine}</p>
              <Link
                href="/"
                style={css(
                  `margin-top:8px;display:inline-flex;align-items:center;height:40px;padding:0 20px;border-radius:4px;background:var(--ink-100);color:var(--ink-950);text-decoration:none;font:500 15px/1 var(--font-sans);transition:background 240ms ${EASE},color 240ms ${EASE}`,
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
                {t("Back to noirsfera")}
              </Link>
            </div>
          )}
        </div>

        <div style={css("display:flex;flex-direction:column;align-items:center;gap:16px")}>
          <span style={css("font:400 12px/1 var(--font-sans);color:var(--ink-600)")}>{t("Or reach us directly")}</span>
          <div style={css("display:flex;flex-wrap:wrap;justify-content:center;gap:8px")}>
            <a
              href="https://t.me/itsslucki"
              target="_blank"
              rel="noopener"
              style={css(
                `display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border-radius:4px;background:var(--ink-100);color:var(--ink-950);text-decoration:none;font:500 14px/1 var(--font-sans);transition:background 240ms ${EASE},color 240ms ${EASE}`,
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
              Telegram <span style={css("font:400 12px/1 var(--font-mono);opacity:.6")}>@itsslucki</span>
            </a>
            <a
              href="https://instagram.com/noirsfera"
              target="_blank"
              rel="noopener"
              style={css(
                `display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border-radius:4px;background:var(--ink-100);color:var(--ink-950);text-decoration:none;font:500 14px/1 var(--font-sans);transition:background 240ms ${EASE},color 240ms ${EASE}`,
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
              Instagram <span style={css("font:400 12px/1 var(--font-mono);opacity:.6")}>@noirsfera</span>
            </a>
            <a
              href="https://x.com/from_noirsfera"
              target="_blank"
              rel="noopener"
              style={css(
                `display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border-radius:4px;background:var(--ink-100);color:var(--ink-950);text-decoration:none;font:500 14px/1 var(--font-sans);transition:background 240ms ${EASE},color 240ms ${EASE}`,
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
              X <span style={css("font:400 12px/1 var(--font-mono);opacity:.6")}>@from_noirsfera</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
