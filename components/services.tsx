const SERVICES = [
  {
    title: "Fullstack development",
    description:
      "Scalable web and mobile applications built to survive their own growth — clean APIs, a database schema that won't need rewriting, and cloud deployment you own from day one.",
    tags: ["API development", "Database design", "Cloud deployment", "Source code ownership"],
  },
  {
    title: "AI engineering & data",
    description:
      "Machine learning and predictive analytics integrated into the product people already use — not a separate dashboard nobody opens.",
    tags: ["Model integration", "Predictive analytics", "Data pipelines", "Internal tooling"],
  },
  {
    title: "UI/UX design",
    description:
      "Research, prototyping and a design system your team can extend after we leave. Two concepts, tested with real users, before a line of production code.",
    tags: ["User research", "Prototyping", "Design systems", "Usability testing"],
  },
]

export function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">What we do</p>
          <h2 className="section-heading">Three disciplines, one team.</h2>
          <p className="lede">
            No handoffs between agencies. Design, engineering and data sit in the same room and ship the same week.
          </p>
        </div>

        <div className="services">
          {SERVICES.map((service) => (
            <article className="service" key={service.title}>
              <h3 className="heading-3">{service.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p className="body-2">{service.description}</p>
                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
