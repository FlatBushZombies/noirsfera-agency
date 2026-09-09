"use client"

import { useState } from "react"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  duration: string
  industry: string
  link: string | null
  frameLabel: string
  image: string
  figures?: { value: string; label: string }[]
}

const PROJECTS: Project[] = [
  {
    id: "tutschool",
    title: "TutSchool",
    description:
      "A SaaS education platform for a Moscow language school — course catalogue, enrolment, scheduling and payments. Designed, built and launched in three weeks.",
    tags: ["SaaS platform", "Education", "Web app", "Payments"],
    duration: "3 weeks",
    industry: "SaaS",
    link: "https://tutschool.ru/",
    frameLabel: "tutschool.ru",
    image: "/tutschool-bg.png",
    figures: [
      { value: "3 weeks", label: "Concept to launch" },
      { value: "+80%", label: "Returning students" },
      { value: "+150%", label: "Enrolment conversion" },
    ],
  },
  {
    id: "campGuide",
    title: "Camp Guide",
    description: "Interactive guide for camping enthusiasts with location recommendations and equipment lists.",
    tags: ["Product design", "UI/UX", "Resort"],
    duration: "4 weeks",
    industry: "Resort",
    link: "https://resonant-sunflower-1bb1e7.netlify.app/",
    frameLabel: "resonant-sunflower-1bb1e7.netlify.app",
    image: "/camp-guide.png",
  },
  {
    id: "dmbPay",
    title: "DMB Pay+",
    description: "Secure digital payment platform with an intuitive interface and real-time transaction tracking.",
    tags: ["Mobile app", "web3", "FinTech"],
    duration: "4 weeks",
    industry: "FinTech",
    link: "https://jocular-sfogliatella-55a4c9.netlify.app/",
    frameLabel: "jocular-sfogliatella-55a4c9.netlify.app",
    image: "/dmbpay-bg.png",
  },
  {
    id: "oakwood",
    title: "Oakwood ESL",
    description: "Professional academics ESL training school — course pages, staff profiles and enrolment.",
    tags: ["Website", "Education"],
    duration: "2 weeks",
    industry: "Education",
    link: "https://oakwoodesl.com/",
    frameLabel: "oakwoodesl.com",
    image: "/oakwood.jpg",
  },
  {
    id: "duoApp",
    title: "Duo",
    description:
      "A sleek social companion app designed for seamless connection — intuitive flows, expressive UI, and a product experience that keeps users coming back.",
    tags: ["Mobile", "iOS", "Social"],
    duration: "3 months",
    industry: "Lifestyle",
    link: null,
    frameLabel: "duo · iOS app",
    image: "/duo-app.png",
  },
  {
    id: "quickhands",
    title: "QuickHands",
    description:
      "On-demand service marketplace connecting users with skilled professionals in seconds — fast booking, real-time tracking, and a beautifully simple interface.",
    tags: ["Mobile", "Android", "On-demand"],
    duration: "4 months",
    industry: "Services",
    link: null,
    frameLabel: "quickhands · Android app",
    image: "/quickhands-app.png",
  },
]

export default function Portfolio() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  const project = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0]

  return (
    <section id="work" className="band">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Selected work</p>
          <h2 className="section-heading">{project.title}</h2>
          <p className="lede">{project.description}</p>
        </div>

        <div className="case-tabs" role="tablist" aria-label="Selected work">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={p.id === activeId}
              className="case-tab"
              data-active={p.id === activeId}
              onClick={() => setActiveId(p.id)}
            >
              {p.title}
            </button>
          ))}
        </div>

        <article className="case">
          <div className="case-body">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            {project.figures ? (
              <div className="case-figures">
                {project.figures.map((f) => (
                  <div key={f.label}>
                    <b>{f.value}</b>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="case-meta">
                <span>{project.industry}</span>
                <span className="sep" />
                <span>{project.duration}</span>
              </div>
            )}

            {project.link && (
              <a className="btn btn-ghost" href={project.link} target="_blank" rel="noopener noreferrer">
                Visit {project.frameLabel}
              </a>
            )}
          </div>
          <div className="case-visual">
            <div className="frame">
              <div className="frame-bar">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="frame-url">{project.frameLabel}</span>
              </div>
              <div className="frame-shot-wrap">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="frame-shot"
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
