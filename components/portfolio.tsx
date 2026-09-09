export default function Portfolio() {
  return (
    <section id="work" className="band">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Selected work</p>
          <h2 className="display">TutSchool</h2>
          <p className="lede">
            A SaaS education platform for a Moscow language school — course catalogue, enrolment, scheduling and
            payments. Designed, built and launched in three weeks.
          </p>
        </div>

        <article className="case">
          <div className="case-body">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span className="tag">SaaS platform</span>
              <span className="tag">Education</span>
              <span className="tag">Web app</span>
              <span className="tag">Payments</span>
            </div>
            <div className="case-figures">
              <div>
                <b>3 weeks</b>
                <span>Concept to launch</span>
              </div>
              <div>
                <b>+80%</b>
                <span>Returning students</span>
              </div>
              <div>
                <b>+150%</b>
                <span>Enrolment conversion</span>
              </div>
            </div>
            <a className="btn btn-ghost" href="https://tutschool.ru" target="_blank" rel="noopener noreferrer">
              Visit tutschool.ru
            </a>
          </div>
          <div className="case-visual">
            <div className="frame" aria-hidden="true">
              <div className="frame-bar">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="frame-url">tutschool.ru</span>
              </div>
              <div className="frame-body">
                <div className="skel title" />
                <div className="skel w70" />
                <div className="skel w45" />
                <div className="skel-row">
                  <div className="skel-card" />
                  <div className="skel-card" />
                  <div className="skel-card" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
