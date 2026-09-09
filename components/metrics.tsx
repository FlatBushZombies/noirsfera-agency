export function Metrics() {
  const metrics = [
    { value: "10+", label: "Clients shipped with" },
    { value: "+80%", label: "User retention, post-launch" },
    { value: "+150%", label: "Conversion lift" },
    { value: "3 wks", label: "Fastest platform delivery" },
  ]

  return (
    <div className="strip">
      <div className="wrap" style={{ paddingInline: 0 }}>
        <div className="strip-inner">
          {metrics.map((m) => (
            <div className="metric" key={m.label}>
              <b>{m.value}</b>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
