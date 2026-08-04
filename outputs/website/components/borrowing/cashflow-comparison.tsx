import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import type { CalculatorResults } from "@/lib/borrowing-calculations"
import { formatCurrency } from "@/lib/borrowing-calculations"
import { cn } from "@/lib/utils"

interface CashflowComparisonProps {
  results: CalculatorResults
}

export function CashflowComparison({ results }: CashflowComparisonProps) {
  const { weeklyCollected, weeklyRepayment, weeklyCashflow, isCashflowPositive } = results

  const maxValue = Math.max(weeklyCollected, weeklyRepayment, 1)
  const incomePct = (weeklyCollected / maxValue) * 100
  const repaymentPct = (weeklyRepayment / maxValue) * 100
  const expenseWeekly = results.annualOpex / 52

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <Bar
          label="Weekly Rental Income"
          value={formatCurrency(weeklyCollected)}
          pct={incomePct}
          barClass="bg-chart-1"
        />
        <Bar
          label="Weekly Loan Repayment"
          value={formatCurrency(weeklyRepayment)}
          pct={repaymentPct}
          barClass="bg-chart-2"
        />
      </div>

      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-lg border p-4",
          isCashflowPositive ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10",
        )}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-full",
              isCashflowPositive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
            )}
          >
            {isCashflowPositive ? <ArrowUpRight className="size-5" /> : <ArrowDownRight className="size-5" />}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {isCashflowPositive ? "Positively geared" : "Negatively geared"}
            </span>
            <span className="text-xs text-muted-foreground">Net weekly position after expenses &amp; repayments</span>
          </div>
        </div>
        <span
          className={cn(
            "text-xl font-bold tabular-nums",
            isCashflowPositive ? "text-success" : "text-destructive",
          )}
        >
          {isCashflowPositive ? "+" : "−"}
          {formatCurrency(Math.abs(weeklyCashflow))}
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Based on {formatCurrency(weeklyCollected)}/wk collected rent less {formatCurrency(expenseWeekly)}/wk operating
        expenses and {formatCurrency(weeklyRepayment)}/wk principal &amp; interest repayments on the assessed loan.
      </p>
    </div>
  )
}

function Bar({ label, value, pct, barClass }: { label: string; value: string; pct: number; barClass: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums text-foreground">{value}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all duration-500", barClass)}
          style={{ width: `${Math.max(2, pct)}%` }}
        />
      </div>
    </div>
  )
}
