import type { CalculatorResults, CapName } from "@/lib/borrowing-calculations"
import { formatCurrency } from "@/lib/borrowing-calculations"
import { cn } from "@/lib/utils"

interface LendingCapsProps {
  results: CalculatorResults
  maxLcr: number
  maxLvr: number
  icr: number
}

interface CapRow {
  key: CapName
  label: string
  detail: string
  value: number
  disabled?: boolean
}

export function LendingCaps({ results, maxLcr, maxLvr, icr }: LendingCapsProps) {
  const baseRows: CapRow[] = [
    {
      key: "cost",
      label: "Loan-to-cost",
      detail: `${maxLcr.toFixed(0)}% of total development cost`,
      value: results.costCap,
    },
    {
      key: "value",
      label: "Loan-to-value",
      detail: `${maxLvr.toFixed(0)}% of as-if-complete value`,
      value: results.valueCap,
    },
  ]

  const thirdRow: CapRow = results.isIncome
    ? {
        key: "serviceability",
        label: "Personal serviceability",
        detail: `Net surplus ${formatCurrency(results.monthlySurplus)}/mo at ${results.assessmentRate.toFixed(1)}% assessed`,
        value: results.serviceabilityCap,
        disabled: results.monthlySurplus <= 0,
      }
    : {
        key: "icr",
        label: "Interest cover",
        detail: results.icrApplies
          ? `NOI ÷ (${icr.toFixed(2)}x × ${results.assessmentRate.toFixed(1)}% assessed)`
          : "Not applied — residential serviceability",
        value: results.icrCap,
        disabled: !results.icrApplies,
      }

  const rows = [...baseRows, thirdRow]

  const finiteValues = rows.filter((r) => Number.isFinite(r.value) && !r.disabled).map((r) => r.value)
  const scaleMax = Math.max(...finiteValues, 1)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3.5">
        {rows.map((row) => {
          const isBinding = row.key === results.bindingCap
          const pct = row.disabled || !Number.isFinite(row.value) ? 0 : (row.value / scaleMax) * 100
          return (
            <div key={row.key} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{row.label}</span>
                  {isBinding ? (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                      Binding
                    </span>
                  ) : null}
                </div>
                <span
                  className={cn(
                    "text-sm font-bold tabular-nums",
                    row.disabled ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  {row.disabled ? "n/a" : formatCurrency(row.value)}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", isBinding ? "bg-primary" : "bg-chart-5")}
                  style={{ width: `${Math.max(row.disabled ? 0 : 2, pct)}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{row.detail}</span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-accent/50 p-4">
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Maximum loan (lowest cap)
          </span>
          <span className="text-xs text-muted-foreground">The lender advances the smallest of the three tests.</span>
        </div>
        <span className="text-2xl font-bold tabular-nums text-primary">{formatCurrency(results.maxLoan)}</span>
      </div>
    </div>
  )
}
