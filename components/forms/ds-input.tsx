"use client"

import { useState } from "react"

// Ported 1:1 from the NoirsferaDesignSystem_3b9d9a bundle's
// components/forms/Input.jsx (compiled React.createElement source).
// Named DsInput to avoid colliding with any native/UI-kit Input.

export function DsInput({
  label,
  hint,
  error,
  multiline,
  rows = 4,
  value,
  onChange,
  placeholder,
  type = "text",
  style,
}: {
  label?: string
  hint?: string
  error?: string
  multiline?: boolean
  rows?: number
  value: string
  onChange?: (v: string) => void
  placeholder?: string
  type?: string
  style?: React.CSSProperties
}) {
  const [f, setF] = useState(false)
  const ring = error ? "var(--danger-600)" : f ? "var(--ink-950)" : "var(--border-default)"
  const fieldStyle: React.CSSProperties = {
    height: multiline ? "auto" : 44,
    padding: multiline ? "12px 14px" : "0 14px",
    borderRadius: "var(--radius-md)",
    border: "none",
    outline: "none",
    boxShadow: `inset 0 0 0 1px ${ring}${f && !error ? ", 0 0 0 4px var(--ink-100)" : ""}`,
    background: "var(--white)",
    font: "var(--text-body-md)" as React.CSSProperties["font"],
    color: "var(--fg-1)",
    resize: "vertical",
    transition: "box-shadow var(--dur-fast) var(--ease-out)",
    boxSizing: "border-box",
    width: "100%",
  }

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      {label && (
        <span style={{ font: "var(--text-small)" as React.CSSProperties["font"], fontWeight: 500, color: "var(--fg-1)" }}>
          {label}
        </span>
      )}
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={() => setF(true)}
          onBlur={() => setF(false)}
          style={fieldStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={() => setF(true)}
          onBlur={() => setF(false)}
          style={fieldStyle}
        />
      )}
      {(error || hint) && (
        <span style={{ font: "var(--text-small)" as React.CSSProperties["font"], color: error ? "var(--danger-600)" : "var(--fg-3)" }}>
          {error || hint}
        </span>
      )}
    </label>
  )
}
