"use client"

import { useEffect, useRef } from "react"

const FAQ_ITEMS = [
  {
    question: "Who is behind Noirsfera?",
    answer:
      "A small, senior team of designers and engineers working directly with founders — no account managers between you and the people building your product.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A website is typically 2–4 weeks. A full product MVP — mobile app plus dashboard — runs 1 to 3 months, with weekly builds you can use along the way.",
  },
  {
    question: "Do you design both web and mobile applications?",
    answer:
      "Yes. Most engagements ship a web platform and a native mobile app from the same design system, plus the admin tooling to run them.",
  },
  {
    question: "How secure are the systems you build?",
    answer:
      "Authentication, encrypted data at rest and in transit, scoped access for admin roles, and dependency auditing before launch. Security review is part of delivery, not an add-on.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Every package includes one month of support after launch. Ongoing retainers are available if you'd rather not staff it internally yet.",
  },
  {
    question: "Can you integrate with our existing tools?",
    answer:
      "Yes — CRMs, payment providers, analytics, internal APIs. We map the integrations during scoping so nothing surfaces as a surprise mid-build.",
  },
  {
    question: "Can I customise the package?",
    answer: "Always. The tiers are starting points; tell us the scope and we'll quote it as a fixed price before any work begins.",
  },
]

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null)

  // One answer open at a time — the FAQ stays scannable
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = Array.from(container.querySelectorAll("details.q"))
    const onToggle = (e: Event) => {
      const target = e.currentTarget as HTMLDetailsElement
      if (target.open) {
        items.forEach((other) => {
          if (other !== target) (other as HTMLDetailsElement).open = false
        })
      }
    }

    items.forEach((item) => item.addEventListener("toggle", onToggle))
    return () => items.forEach((item) => item.removeEventListener("toggle", onToggle))
  }, [])

  return (
    <section id="faq">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Questions</p>
          <h2 className="section-heading">Before you write to us.</h2>
        </div>

        <div className="faq" ref={containerRef}>
          {FAQ_ITEMS.map((item, index) => (
            <details className="q" key={item.question} open={index === 0}>
              <summary>
                {item.question} <span className="chev">+</span>
              </summary>
              <p className="answer body-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
