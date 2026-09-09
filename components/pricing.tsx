export default function Pricing() {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Pricing</p>
          <h2 className="section-heading">Fixed scope. Fixed price.</h2>
          <p className="lede">Two ways to work with us. Both quoted up front, both leaving you with the source code.</p>
        </div>

        <div className="plans">
          <div className="plan">
            <div className="plan-top">
              <p className="eyebrow">Web development</p>
              <div className="price">
                $2,200 <small>one-time</small>
              </div>
              <p className="body-2">A marketing site or landing platform that earns its traffic. 5 pages included.</p>
            </div>
            <ul>
              <li>
                <span className="check">✓</span>
                <span>2 design concepts</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Responsive across desktop, tablet and mobile</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Wireframes and custom layout</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Framer development</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Full source code ownership</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>1 month of free support</span>
              </li>
            </ul>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              <p className="plan-note">Additional pages +$200 each. Growth tier runs $2,200–$3,000.</p>
              <a className="btn btn-ghost" href="#contact">
                Get a quote
              </a>
            </div>
          </div>

          <div className="plan featured">
            <div className="plan-top">
              <span className="plan-badge">Most popular</span>
              <p className="eyebrow">Product design &amp; build</p>
              <div className="price">
                $5,000 <small>from, one-time</small>
              </div>
              <p className="body-2">A full startup MVP — mobile app plus admin dashboard, in the stores.</p>
            </div>
            <ul>
              <li>
                <span className="check">✓</span>
                <span>2 design concepts, advanced UI/UX</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Mobile app plus admin dashboard</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>1–3 month delivery</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>App Store and Play Store launch</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Weekly updates over Slack, Loom and calls</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>1 month of support after launch</span>
              </li>
            </ul>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              <p className="plan-note">Scale tier runs $5,000–$10,000 depending on surface area.</p>
              <a className="btn btn-primary" href="#contact">
                Book a call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
