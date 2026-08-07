"use client"

function fmtCompact(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? "-" : ""
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `${sign}$${Math.round(abs / 1_000)}K`
  return `${sign}$${Math.round(abs)}`
}

function fmtCurrency(value: number): string {
  return value.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 })
}

interface IncomeExpenseBarChartProps {
  totalIncome: number
  operatingExpenses: number
  loanRepayments: number
  netCashFlow: number
}

/** "Income vs Expenses (p.a.)" — three bars breaking effective gross income into opex / debt service / net cash flow. */
export function IncomeExpenseBarChart({ totalIncome, operatingExpenses, loanRepayments, netCashFlow }: IncomeExpenseBarChartProps) {
  const bars = [
    { label: "Operating Expenses", value: Math.max(0, operatingExpenses), color: "#183a32" },
    { label: "Loan repayments", value: Math.max(0, loanRepayments), color: "#68736e" },
    { label: "Net Cash Flow", value: Math.max(0, netCashFlow), color: "#cfc8b8" },
  ]
  const basis = totalIncome > 0 ? totalIncome : Math.max(1, bars.reduce((s, b) => s + b.value, 0))
  const max = Math.max(...bars.map((b) => b.value), 1)

  return (
    <div className="flex items-end gap-4">
      <div className="flex h-28 items-end gap-2">
        {bars.map((b) => (
          <div
            key={b.label}
            className="w-6 rounded-t-sm"
            style={{ height: `${Math.max(4, (b.value / max) * 100)}%`, background: b.color }}
            title={b.label}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 text-xs">
        {bars.map((b) => (
          <div key={b.label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: b.color }} />
            <span style={{ color: "#68736e" }}>{b.label}</span>
            <span className="ml-auto font-semibold" style={{ color: "#18241f" }}>
              {fmtCompact(b.value)}
            </span>
            <span className="w-10 text-right" style={{ color: "#68736e" }}>
              ({((b.value / basis) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface CashFlowLineChartProps {
  values: number[]
}

/** "10 Year Cash Flow (After Tax)" — simple line chart across the projection years. */
export function CashFlowLineChart({ values }: CashFlowLineChartProps) {
  const W = 520
  const H = 180
  const margin = { top: 12, right: 8, bottom: 22, left: 44 }
  const plotW = W - margin.left - margin.right
  const plotH = H - margin.top - margin.bottom
  const max = Math.max(...values, 1)
  const min = Math.min(0, ...values)
  const span = Math.max(1, max - min)

  const xAt = (i: number) => margin.left + (values.length <= 1 ? 0 : (i / (values.length - 1)) * plotW)
  const yAt = (v: number) => margin.top + plotH - ((v - min) / span) * plotH

  const path = values.map((v, i) => `${i === 0 ? "M" : "L"}${xAt(i)},${yAt(v)}`).join(" ")
  const areaPath = `${path} L${xAt(values.length - 1)},${yAt(min)} L${xAt(0)},${yAt(min)} Z`

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => min + span * f)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="10 year after-tax cash flow projection">
      {yTicks.map((t) => (
        <line key={t} x1={margin.left} x2={W - margin.right} y1={yAt(t)} y2={yAt(t)} stroke="#ded8ca" strokeWidth={1} />
      ))}
      {yTicks.map((t) => (
        <text key={t} x={margin.left - 6} y={yAt(t) + 3} textAnchor="end" fontSize={10} fill="#68736e">
          {fmtCompact(t)}
        </text>
      ))}
      {values.map((_, i) => (
        <text key={i} x={xAt(i)} y={H - 6} textAnchor="middle" fontSize={10} fill="#68736e">
          {i + 1}
        </text>
      ))}
      <path d={areaPath} fill="#183a32" fillOpacity={0.08} />
      <path d={path} fill="none" stroke="#183a32" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {values.map((v, i) => (
        <circle key={i} cx={xAt(i)} cy={yAt(v)} r={2.5} fill="#183a32" />
      ))}
    </svg>
  )
}

export { fmtCurrency, fmtCompact }
