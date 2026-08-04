"use client"

import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { HelpPopover } from "./help-popover"

interface InputFieldProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  format?: (value: number) => string
  hint?: string
  icon?: ReactNode
  /** When false, render just the typed input box (no range slider). Defaults to true. */
  slider?: boolean
  /** If set, typing a value below `min` turns the box red and shows this message. */
  minWarning?: string
  /** Optional content for a clickable "?" shown next to the hint text. */
  hintHelp?: ReactNode
  /** Title/aria-label for the hint help popover. */
  hintHelpTitle?: string
}

export function InputField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  format,
  hint,
  icon,
  slider = true,
  minWarning,
  hintHelp,
  hintHelpTitle,
}: InputFieldProps) {
  // While the box is focused we keep the raw typed text so partial entries
  // (and values that momentarily fall under `min`) don't get snapped mid-typing.
  const [draft, setDraft] = useState<string | null>(null)
  const formatted = format ? format(value) : value.toLocaleString("en-AU")
  const displayValue = draft ?? formatted
  const pct = ((value - min) / (max - min)) * 100
  const clampedPct = Math.min(100, Math.max(0, pct))

  // Live sub-minimum check (only while the caller opts in via `minWarning`).
  const numericInput = draft !== null ? Number(draft.replace(/[^0-9.]/g, "")) : value
  const isBelowMin = !!minWarning && Number.isFinite(numericInput) && numericInput < min

  const handleInput = (raw: string) => {
    setDraft(raw)
    const parsed = Number(raw.replace(/[^0-9.]/g, ""))
    if (Number.isNaN(parsed)) return
    // Only apply the max ceiling while typing; the min floor is enforced on blur
    // so you can freely type through values below `min`.
    onChange(Math.min(max, parsed))
  }

  const handleBlur = () => {
    setDraft(null)
    onChange(Math.min(max, Math.max(min, value)))
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-end justify-between gap-3">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground leading-tight text-pretty">
          {icon ? <span className="text-muted-foreground">{icon}</span> : null}
          {label}
        </label>
        <div className="relative shrink-0">
          <div
            className={cn(
              "flex items-center rounded-md border bg-background px-2.5 py-1 text-sm font-semibold tabular-nums transition-colors",
              isBelowMin ? "border-destructive text-destructive" : "border-input",
            )}
          >
            {prefix ? (
              <span className={isBelowMin ? "text-destructive" : "text-muted-foreground"}>{prefix}</span>
            ) : null}
            <input
              aria-label={label}
              aria-invalid={isBelowMin}
              inputMode="decimal"
              value={displayValue}
              onChange={(e) => handleInput(e.target.value)}
              onBlur={handleBlur}
              className="w-[9ch] bg-transparent text-right outline-none"
            />
            {suffix ? (
              <span className={isBelowMin ? "text-destructive" : "text-muted-foreground"}>{suffix}</span>
            ) : null}
          </div>
          {isBelowMin && minWarning ? (
            <div
              role="tooltip"
              className="absolute right-0 top-full z-30 mt-1.5 w-64 rounded-lg border border-destructive/40 bg-popover p-2.5 text-xs leading-relaxed text-muted-foreground shadow-lg"
            >
              {minWarning}
            </div>
          ) : null}
        </div>
      </div>

      {slider ? (
        <input
          type="range"
          aria-label={`${label} slider`}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="range-slider"
          style={{
            background: `linear-gradient(to right, var(--primary) ${clampedPct}%, var(--secondary) ${clampedPct}%)`,
          }}
        />
      ) : null}

      {hint ? (
        <div className="text-xs text-muted-foreground leading-relaxed">
          {hint}
          {hintHelp ? (
            <>
              {" "}
              <HelpPopover label={label} title={hintHelpTitle} triggerClassName="text-muted-foreground align-middle">
                {hintHelp}
              </HelpPopover>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
