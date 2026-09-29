"use client"

// Ported 1:1 from the NoirsferaDesignSystem_3b9d9a bundle's
// components/booking/Calendar.jsx (compiled React.createElement source).

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function Calendar({
  year,
  month,
  selected,
  available = () => true,
  today,
  onSelect,
  onPrev,
  onNext,
  style,
}: {
  year: number
  month: number
  selected: number | null
  available?: (d: number) => boolean
  today: number | null
  onSelect?: (d: number) => void
  onPrev?: () => void
  onNext?: () => void
  style?: React.CSSProperties
}) {
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]

  const nav: React.CSSProperties = {
    width: 28,
    height: 28,
    border: "none",
    background: "transparent",
    borderRadius: 8,
    cursor: "pointer",
    color: "var(--fg-2)",
    font: "16px/1 var(--font-sans)",
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ font: "var(--text-h4)", fontSize: 16, letterSpacing: "var(--ls-tight)" } as React.CSSProperties}>
          {MONTHS[month]} <span style={{ color: "var(--fg-3)" }}>{year}</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button type="button" style={nav} onClick={onPrev} aria-label="Previous month">
            ‹
          </button>
          <button type="button" style={nav} onClick={onNext} aria-label="Next month">
            ›
          </button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
        {DOW.map((d) => (
          <div
            key={d}
            style={
              {
                textAlign: "center",
                font: "var(--text-micro)",
                letterSpacing: "var(--ls-mono)",
                textTransform: "uppercase",
                color: "var(--fg-3)",
                paddingBottom: 6,
              } as React.CSSProperties
            }
          >
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={i} />
          const av = available(d)
          const on = d === selected
          const t = d === today
          return (
            <button
              type="button"
              key={i}
              disabled={!av}
              onClick={() => onSelect && onSelect(d)}
              style={
                {
                  position: "relative",
                  aspectRatio: "1",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  cursor: av ? "pointer" : "default",
                  background: on ? "var(--ink-950)" : av ? "var(--ink-100)" : "transparent",
                  color: on ? "var(--white)" : av ? "var(--fg-1)" : "var(--ink-300)",
                  font: `${av ? 500 : 400} 14px/1 var(--font-sans)`,
                  transition: "background var(--dur-fast) var(--ease-out)",
                } as React.CSSProperties
              }
            >
              {d}
              {t && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 6,
                    left: "50%",
                    marginLeft: -2,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: on ? "var(--white)" : "var(--signal-500)",
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
