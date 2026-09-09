export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="cta">
          <p className="eyebrow">Next step</p>
          <h2 className="section-heading" style={{ maxWidth: "16ch" }}>
            Tell us what you&apos;re building.
          </h2>
          <p className="lede" style={{ textAlign: "center" }}>
            Send a message and you&apos;ll get a scope, a timeline and a fixed price back — usually within a day.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://t.me/itsslucki" target="_blank" rel="noopener noreferrer">
              Message on Telegram
            </a>
            <a className="btn btn-ghost" href="https://t.me/itsslucki" target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
          </div>
          <div className="contact-lines">
            <a href="https://t.me/itsslucki" target="_blank" rel="noopener noreferrer">
              Telegram · @itsslucki
            </a>
            <a href="https://www.instagram.com/noirsfera/" target="_blank" rel="noopener noreferrer">
              Instagram · @noirsfera
            </a>
            <a href="https://x.com/from_noirsfera" target="_blank" rel="noopener noreferrer">
              X · @from_noirsfera
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
