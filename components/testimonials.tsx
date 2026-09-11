const QUOTES = [
  {
    text: "The result was a stylish and modern website. Communication was transparent the whole way — very happy with the collaboration.",
    initial: "Y",
    name: "Yulia",
    company: "tutschool.ru",
  },
  {
    text: "Delivered on time, and the code was optimised properly rather than just made to work.",
    initial: "A",
    name: "Andrey",
    company: "profi.ru",
  },
  {
    text: "Clear updates every week. I always knew what was being built and why.",
    initial: "A",
    name: "Anih",
    company: "profi.ru",
  },
  {
    text: "Modern design, and they pushed back where it made the product better. Would work with them again.",
    initial: "N",
    name: "Nathan",
    company: "profi.ru",
  },
]

export function Testimonials() {
  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Clients</p>
          <h2 className="display">What they said afterwards.</h2>
        </div>
        <div className="quotes">
          {QUOTES.map((q) => (
            <figure className="quote" style={{ margin: 0 }} key={q.name}>
              <p>&ldquo;{q.text}&rdquo;</p>
              <figcaption className="who">
                <span className="avatar">{q.initial}</span>
                <span>
                  <b>{q.name}</b>
                  <span>{q.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
