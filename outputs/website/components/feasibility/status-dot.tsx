import { cn } from "@/lib/utils"
import type { TargetStatus } from "@/lib/feasibility-calculations"

const dotClass: Record<TargetStatus, string> = {
  green: "bg-success",
  amber: "bg-warning",
  red: "bg-destructive",
  grey: "bg-muted-foreground/40",
}

const statusLabel: Record<TargetStatus, string> = {
  green: "On track",
  amber: "Watch",
  red: "Off track",
  grey: "N/A",
}

export function StatusDot({ status, className }: { status: TargetStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("size-2.5 shrink-0 rounded-full", dotClass[status])} />
      <span className="text-xs text-muted-foreground">{statusLabel[status]}</span>
    </span>
  )
}
