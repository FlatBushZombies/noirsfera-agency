"use client"

import { useState } from "react"

// Ported 1:1 from the NoirsferaDesignSystem_3b9d9a bundle's
// components/booking/TimeSlot.jsx (compiled React.createElement source).

export function TimeSlot({
  time,
  selected,
  disabled,
  onClick,
  style,
}: {
  time: string
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}) {
  const [h, setH] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={
        {
          height: 40,
          width: "100%",
          border: "none",
          borderRadius: "var(--radius-md)",
          cursor: disabled ? "default" : "pointer",
          background: selected ? "var(--ink-950)" : "var(--white)",
          color: selected ? "var(--white)" : disabled ? "var(--ink-300)" : "var(--fg-1)",
          boxShadow: selected ? "none" : `inset 0 0 0 1px ${h && !disabled ? "var(--border-strong)" : "var(--border-default)"}`,
          font: "500 14px/1 var(--font-sans)",
          fontVariantNumeric: "tabular-nums",
          transition: "all var(--dur-fast) var(--ease-out)",
          ...style,
        } as React.CSSProperties
      }
    >
      {time}
    </button>
  )
}
