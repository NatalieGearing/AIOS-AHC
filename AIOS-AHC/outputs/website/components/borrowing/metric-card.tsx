import type React from "react"
import { cn } from "@/lib/utils"
import { HelpPopover } from "./help-popover"

interface MetricCardProps {
  label: string
  value: string
  sub?: string
  icon?: React.ReactNode
  tone?: "default" | "positive" | "negative" | "warning" | "primary"
  className?: string
  /** Optional explanation shown in a popover when the "?" icon is clicked. */
  help?: React.ReactNode
  /** Accessible label for the help button. Defaults to "What is <label>?". */
  helpTitle?: string
  /** Optional small pill next to the label, e.g. a tier indicator ("Thin" / "Solid" / "Very Strong"). */
  badge?: { text: string; tone: "warning" | "positive" | "primary" }
}

export const badgeStyles: Record<NonNullable<MetricCardProps["badge"]>["tone"], string> = {
  warning: "bg-warning/15 text-warning",
  positive: "bg-success/15 text-success",
  primary: "bg-primary text-primary-foreground",
}

const toneStyles: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  default: "bg-card border-border",
  primary: "bg-primary text-primary-foreground border-transparent",
  positive: "bg-card border-success/40",
  negative: "bg-card border-destructive/40",
  warning: "bg-card border-warning/40",
}

const valueTone: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  default: "text-foreground",
  primary: "text-primary-foreground",
  positive: "text-success",
  negative: "text-destructive",
  warning: "text-foreground",
}

export function MetricCard({ label, value, sub, icon, tone = "default", className, help, helpTitle, badge }: MetricCardProps) {
  const mutedTone = tone === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"

  return (
    <div className={cn("flex flex-col gap-1.5 rounded-xl border p-4", toneStyles[tone], className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className={cn("text-xs font-medium uppercase tracking-wide", mutedTone)}>{label}</span>
          {help ? (
            <HelpPopover label={label} title={helpTitle} triggerClassName={mutedTone}>
              {help}
            </HelpPopover>
          ) : null}
          {badge ? (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                badgeStyles[badge.tone],
              )}
            >
              {badge.text}
            </span>
          ) : null}
        </div>
        {icon ? <span className={mutedTone}>{icon}</span> : null}
      </div>
      <span className={cn("text-2xl font-bold tabular-nums leading-tight", valueTone[tone])}>{value}</span>
      {sub ? (
        <span className={cn("text-xs leading-relaxed", tone === "primary" ? "text-primary-foreground/80" : "text-muted-foreground")}>
          {sub}
        </span>
      ) : null}
    </div>
  )
}
