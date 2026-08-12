"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  Banknote,
  Building2,
  CalendarClock,
  ChevronLeft,
  ClipboardList,
  Download,
  DoorOpen,
  Gauge,
  Hammer,
  Home,
  Landmark,
  LineChart,
  MapPin,
  Percent,
  PiggyBank,
  Receipt,
  RotateCcw,
  Target,
  TrendingUp,
  TriangleAlert,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { InputField } from "../borrowing/input-field"
import { MetricCard } from "../borrowing/metric-card"
import { LineItemEditor } from "./line-item-editor"
import { RoomCategoryEditor } from "./room-category-editor"
import { StatusDot } from "./status-dot"
import { IncomeExpenseBarChart, CashFlowLineChart } from "./mini-charts"
import {
  DEFAULT_INPUTS,
  GST_CLASSIFICATION_LABELS,
  OWNERSHIP_ENTITY_LABELS,
  calculateFeasibility,
  formatCurrency,
  formatPercent,
  qldTransferDutyDisplay,
  type FeasibilityInputs,
  type GstClassification,
  type OwnershipEntity,
  type ValuationMethod,
} from "@/lib/feasibility-calculations"
import {
  CITIES,
  CONSTR_TYPES,
  DEFAULT_DEP_INPUTS,
  PROP_TYPES,
  computeDepreciation,
  depreciationNote,
  yearBuiltOptions,
  yearPurchasedOptions,
  type DepreciationInputs,
} from "@/lib/depreciation-estimator"

const SERIF = { fontFamily: "var(--font-playfair), Georgia, serif" } as const

const STEPS = [
  {
    id: "development",
    title: "Development",
    subtitle: "Land, build & project costs",
    icon: Home,
    heading: "Development",
    description: "Enter the land, acquisition, authority and construction costs for the project.",
  },
  {
    id: "finance",
    title: "Finance",
    subtitle: "Loan, deposit & terms",
    icon: Landmark,
    heading: "Finance",
    description: "Set the development finance and long-term stabilised loan terms.",
  },
  {
    id: "income",
    title: "Rooms & Income",
    subtitle: "Rental income & occupancy",
    icon: DoorOpen,
    heading: "Rooms & Income",
    description: "Configure room types, weekly rents and stabilised occupancy.",
  },
  {
    id: "expenses",
    title: "Expenses",
    subtitle: "Operating & fixed costs",
    icon: Receipt,
    heading: "Expenses",
    description: "Enter ongoing operating costs and annual fixed costs.",
  },
  {
    id: "tax",
    title: "GST & Tax",
    subtitle: "GST, entity & tax",
    icon: Percent,
    heading: "GST & Tax",
    description: "Set the GST treatment, ownership entity and tax settings.",
  },
  {
    id: "valuation",
    title: "Valuation & Targets",
    subtitle: "Valuation & investor targets",
    icon: Target,
    heading: "Valuation & Targets",
    description: "Choose the completion valuation basis and set your investor hurdle rates.",
  },
  {
    id: "depreciation",
    title: "Depreciation",
    subtitle: "Depreciation estimate",
    icon: LineChart,
    heading: "Depreciation",
    description: "Estimate the building and plant & equipment depreciation deductions.",
  },
] as const

type StepId = (typeof STEPS)[number]["id"]

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mt-1 flex items-center gap-2 border-b pb-2" style={{ borderColor: "var(--border)" }}>
      <span className="size-1.5 shrink-0 rounded-full" style={{ background: "#ab8742" }} />
      <h3 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#111c49" }}>
        {title}
      </h3>
    </div>
  )
}

function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: "#5b5d62" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-lg border bg-background px-2.5 py-1.5 text-sm outline-none focus-visible:ring-2"
        style={{ borderColor: "var(--input)" }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint ? (
        <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}

function ToggleField({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  hint?: string
}) {
  return (
    <label
      className="flex items-start gap-2.5 rounded-lg border px-3 py-2.5"
      style={{ borderColor: "var(--input)", background: "var(--background)" }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4"
        style={{ accentColor: "#ab8742" }}
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium" style={{ color: "#5b5d62" }}>
          {label}
        </span>
        {hint ? (
          <span className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  )
}

function Row({
  label,
  value,
  strong,
  tone = "default",
}: {
  label: string
  value: string
  strong?: boolean
  tone?: "default" | "positive" | "negative"
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b pb-2 last:border-0 last:pb-0" style={{ borderColor: "var(--border)" }}>
      <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        {label}
      </span>
      <span
        className={cn("shrink-0 tabular-nums", strong ? "text-base font-bold" : "text-sm font-semibold")}
        style={{ color: tone === "positive" ? "#16a34a" : tone === "negative" ? "#dc2626" : "#111c49" }}
      >
        {value}
      </span>
    </div>
  )
}

const overallStatusTone: Record<string, { bg: string; fg: string }> = {
  "Meets investment targets": { bg: "rgba(22,163,74,.12)", fg: "#16a34a" },
  "Potentially feasible—further investigation required": { bg: "rgba(171,135,66,.14)", fg: "#ab8742" },
  "Marginal feasibility": { bg: "rgba(171,135,66,.14)", fg: "#ab8742" },
  "Does not meet current targets": { bg: "rgba(220,38,38,.12)", fg: "#dc2626" },
  "Unable to assess—critical information missing": { bg: "var(--accent)", fg: "#111c49" },
}

function StepNavButton({
  step,
  index,
  active,
  onClick,
}: {
  step: (typeof STEPS)[number]
  index: number
  active: boolean
  onClick: () => void
}) {
  const Icon = step.icon
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-transform hover:translate-x-0.5"
      style={active ? { background: "#111c49", boxShadow: "0 12px 25px rgba(17,28,73,.2)" } : { background: "transparent" }}
    >
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-lg"
        style={active ? { background: "#ab8742", color: "#111c49" } : { background: "var(--muted)", color: "var(--muted-foreground)" }}
      >
        <Icon className="size-4" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-semibold leading-tight" style={{ color: active ? "#fff" : "#111c49" }}>
          {index + 1}. {step.title}
        </span>
        <span className="text-xs leading-tight" style={{ color: active ? "rgba(255,255,255,.65)" : "var(--muted-foreground)" }}>
          {step.subtitle}
        </span>
      </span>
    </button>
  )
}

export function FeasibilityCalculator() {
  const [inputs, setInputs] = useState<FeasibilityInputs>(DEFAULT_INPUTS)
  const [depInputs, setDepInputs] = useState<DepreciationInputs>(DEFAULT_DEP_INPUTS)
  const [buildRooms, setBuildRooms] = useState(5)
  const [activeStep, setActiveStep] = useState<StepId>("development")
  const [detailedView, setDetailedView] = useState(false)
  const [projectionYears, setProjectionYears] = useState<5 | 10>(10)

  const results = useMemo(() => calculateFeasibility(inputs), [inputs])
  const depEstimate = useMemo(() => computeDepreciation(depInputs), [depInputs])

  const set =
    <K extends keyof FeasibilityInputs>(key: K) =>
    (value: FeasibilityInputs[K]) =>
      setInputs((prev) => ({ ...prev, [key]: value }))

  const setDep =
    <K extends keyof DepreciationInputs>(key: K) =>
    (value: DepreciationInputs[K]) =>
      setDepInputs((prev) => ({ ...prev, [key]: value }))

  const handleBuildRoomsChange = (rooms: number) => {
    setBuildRooms(rooms)
    setInputs((prev) => ({ ...prev, buildingCostBase: rooms * 130000 }))
  }

  const applyDepreciationToModel = () => {
    setInputs((prev) => ({
      ...prev,
      annualPlantDepreciation: Math.round(depEstimate.year1PeMax),
      capitalWorksRatePct: depEstimate.div43Rate,
    }))
  }

  const handleExportPdf = async () => {
    const { default: jsPDF } = await import("jspdf")
    const doc = new jsPDF()
    let y = 16

    const ensureSpace = (needed = 8) => {
      if (y + needed > 285) {
        doc.addPage()
        y = 16
      }
    }
    const line = (text: string, size = 10, bold = false) => {
      ensureSpace(size * 0.5 + 4)
      doc.setFontSize(size)
      doc.setFont("helvetica", bold ? "bold" : "normal")
      doc.text(text, 14, y)
      y += size * 0.5 + 4
    }

    line(inputs.projectName || "Rooming House Feasibility Summary", 16, true)
    line(`Prepared ${new Date().toLocaleDateString("en-AU")} — indicative investment screening only`, 9)
    y += 2
    line("Headline results", 12, true)
    line(`Overall feasibility status: ${results.overallStatus}`)
    line(`Total development cost: ${formatCurrency(results.totalDevelopmentCost)}`)
    line(`Cost per rentable room: ${formatCurrency(results.costPerRentableRoom)}`)
    line(`Debt facility required: ${formatCurrency(results.debtFacility)}`)
    line(`Peak investor equity required: ${formatCurrency(results.peakInvestorEquity)}`)
    line(`Completion valuation: ${formatCurrency(results.completionValuation)}`)
    line(`Development profit: ${formatCurrency(results.developmentProfit)}`)
    line(`Development margin on cost: ${formatPercent(results.developmentMarginPct)}`)
    y += 2
    line("Income & cash flow (stabilised)", 12, true)
    line(`Gross potential room income: ${formatCurrency(results.grossPotentialAnnualRoomIncome)}/yr`)
    line(`Effective gross income: ${formatCurrency(results.effectiveGrossIncome)}/yr`)
    line(`Net operating income: ${formatCurrency(results.netOperatingIncome)}/yr`)
    line(`Annual debt service: ${formatCurrency(results.annualDebtService)}/yr`)
    line(`Pre-tax cash flow: ${formatCurrency(results.preTaxCashFlow)}/yr`)
    line(`Indicative after-tax cash flow: ${formatCurrency(results.afterTaxCashFlow)}/yr`)
    y += 2
    line("Yields & returns", 12, true)
    line(`Gross yield on cost: ${formatPercent(results.grossYieldOnCostPct)}`)
    line(`Net yield on cost: ${formatPercent(results.netYieldOnCostPct)}`)
    line(`Cash-on-cash return: ${formatPercent(results.cashOnCashReturnPct)}`)
    line(`DSCR: ${Number.isFinite(results.dscr) ? results.dscr.toFixed(2) + "x" : "—"}`)
    line(`Completed LVR: ${formatPercent(results.completedLvrPct)}`)
    line(`Five-year IRR: ${formatPercent(results.fiveYearIRRPct)}`)
    line(`Ten-year IRR: ${formatPercent(results.tenYearIRRPct)}`)
    line(`Ten-year equity multiple: ${results.equityMultiple10yr.toFixed(2)}x`)
    y += 2
    line("Warnings", 12, true)
    if (results.warnings.length === 0) {
      line("No warnings flagged against current inputs.")
    } else {
      results.warnings.forEach((w) => line(`• ${w}`))
    }
    y += 2
    line("Important", 11, true)
    ;[
      "This is an indicative investment-screening tool, not a formal valuation, construction quote, finance",
      "approval, development approval, or town-planning, legal, accounting or tax advice. Confirm all figures",
      "with a town planner, builder, quantity surveyor, valuer, finance broker, accountant and solicitor before",
      "relying on them.",
    ].forEach((t) => line(t, 8.5))

    doc.save(`${(inputs.projectName || "feasibility-summary").trim().replace(/\s+/g, "-").toLowerCase()}.pdf`)
  }

  const stepIndex = STEPS.findIndex((s) => s.id === activeStep)
  const currentStep = STEPS[stepIndex]
  const prevStep = STEPS[stepIndex - 1] ?? null
  const nextStep = STEPS[stepIndex + 1] ?? null
  const projectionRows = results.projection10yr.slice(0, projectionYears)
  const statusTone = overallStatusTone[results.overallStatus] ?? { bg: "var(--accent)", fg: "#111c49" }

  const goToDetailedReport = () => setDetailedView(true)

  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-8 md:px-6 lg:py-12">
        {/* ---------------------------- HEADER ---------------------------- */}
        <header
          className="relative overflow-hidden rounded-3xl p-6 sm:p-7"
          style={{ boxShadow: "0 24px 60px rgba(17,28,73,.12)" }}
        >
          <Image src="/images/feasibility-header-bg.png" alt="" fill priority className="object-cover" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(128deg,rgba(17,28,73,.90),rgba(36,52,110,.82) 72%,rgba(17,28,73,.85))" }}
          />
          <div className="pointer-events-none absolute -right-32 -top-52 size-[420px] rounded-full border border-white/10" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="flex size-[46px] shrink-0 items-center justify-center rounded-2xl bg-white text-[#111c49] shadow-lg">
                <Building2 className="size-6" />
              </span>
              <div>
                <h1 className="text-2xl font-bold leading-tight text-white sm:text-[26px]" style={SERIF}>
                  Rooming House Development Feasibility Calculator
                </h1>
                <p className="mt-1 text-sm text-white/70">
                  Screen the numbers on a new build, demolition &amp; rebuild, conversion or acquisition before you commit.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportPdf}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2.5 text-sm font-semibold text-[#111c49] shadow-md transition-transform hover:-translate-y-0.5"
              >
                <Download className="size-4" />
                Export summary
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputs(DEFAULT_INPUTS)
                  setDepInputs(DEFAULT_DEP_INPUTS)
                  setBuildRooms(5)
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/15"
              >
                <RotateCcw className="size-3.5" />
                Reset
              </button>
            </div>
          </div>
        </header>

        {/* ---------------------------- WORKSPACE ---------------------------- */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          {/* Calculator panel */}
          <div className="rounded-3xl border p-4 sm:p-5" style={{ borderColor: "var(--border)", background: "var(--card)", boxShadow: "0 10px 28px rgba(17,28,73,.055)" }}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[200px_minmax(0,1fr)]">
              <nav
                className="flex flex-col gap-2 rounded-2xl border p-2.5 sm:sticky sm:top-6"
                style={{ borderColor: "var(--border)", background: "linear-gradient(180deg,#ffffff,#ece6e1)" }}
              >
                {STEPS.map((step, i) => (
                  <StepNavButton key={step.id} step={step} index={i} active={step.id === activeStep} onClick={() => setActiveStep(step.id)} />
                ))}
              </nav>

              <div className="flex min-w-0 flex-col gap-5">
                <div className="flex flex-col gap-1 border-b pb-4" style={{ borderColor: "var(--border)" }}>
                  <h2 className="text-2xl font-bold" style={{ ...SERIF, color: "#111c49" }}>
                    {currentStep.heading}
                  </h2>
                  <p className="text-[13.5px]" style={{ color: "var(--muted-foreground)" }}>
                    {currentStep.description}
                  </p>
                </div>

                {activeStep === "development" ? (
                  <div className="flex flex-col gap-4">
                    <SectionTitle title="Acquisition" />
                    <InputField
                      label="Land / Purchase Price"
                      icon={<Landmark className="size-4" />}
                      value={inputs.purchasePrice}
                      onChange={set("purchasePrice")}
                      min={0}
                      max={5000000}
                      step={10000}
                      prefix="$"
                      slider={false}
                    />
                    <ToggleField
                      label="Auto-Calculate QLD Transfer Duty"
                      checked={inputs.autoTransferDuty}
                      onChange={set("autoTransferDuty")}
                      hint={`Currently ${formatCurrency(qldTransferDutyDisplay(inputs.purchasePrice))} on the QLD general/investor schedule.`}
                    />
                    {!inputs.autoTransferDuty ? (
                      <InputField
                        label="Transfer Duty (Manual)"
                        value={inputs.transferDuty}
                        onChange={set("transferDuty")}
                        min={0}
                        max={200000}
                        step={500}
                        prefix="$"
                        slider={false}
                      />
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium" style={{ color: "#5b5d62" }}>
                        Legal, Due Diligence &amp; Other Purchase Costs
                      </span>
                      <LineItemEditor items={inputs.acquisitionCosts} onChange={set("acquisitionCosts")} addLabel="Add purchase cost" idPrefix="acq" />
                    </div>
                    <InputField
                      label="Recoverable GST Credit On Acquisition"
                      icon={<Percent className="size-4" />}
                      value={inputs.gstCreditOnAcquisition}
                      onChange={set("gstCreditOnAcquisition")}
                      min={0}
                      max={200000}
                      step={500}
                      prefix="$"
                      slider={false}
                      hint="Reduces total acquisition cost where GST is recoverable — confirm with your GST adviser."
                    />

                    <SectionTitle title="Authority & Approval Charges" />
                    <LineItemEditor items={inputs.authorityCharges} onChange={set("authorityCharges")} addLabel="Add authority charge" idPrefix="auth" />

                    <SectionTitle title="Building & Fit-Out" />
                    <InputField
                      label="Number Of Rentable Rooms"
                      value={buildRooms}
                      onChange={handleBuildRoomsChange}
                      min={0}
                      max={15}
                      step={1}
                    />
                    <InputField
                      label="Base Building Contract"
                      value={inputs.buildingCostBase}
                      onChange={set("buildingCostBase")}
                      min={0}
                      max={8000000}
                      step={10000}
                      prefix="$"
                      slider={false}
                      hint="Auto-calculated at $130,000 per rentable room — edit to override. Changing the room count above resets it."
                    />
                    <LineItemEditor items={inputs.buildingCostExtras} onChange={set("buildingCostExtras")} addLabel="Add building cost" idPrefix="bld" />
                    <InputField
                      label="Room Fit-Out Cost Per Room"
                      icon={<DoorOpen className="size-4" />}
                      value={inputs.roomFitoutPerRoom}
                      onChange={set("roomFitoutPerRoom")}
                      min={0}
                      max={20000}
                      step={100}
                      prefix="$"
                      slider={false}
                      hint="Bed, furniture, appliances, linen and access system per room; multiplied by rentable rooms."
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium" style={{ color: "#5b5d62" }}>
                        Common-Area Fit-Out
                      </span>
                      <LineItemEditor items={inputs.commonAreaFitout} onChange={set("commonAreaFitout")} addLabel="Add common-area cost" idPrefix="caf" />
                    </div>

                    <SectionTitle title="Contingency & Escalation" />
                    <InputField
                      label="Contingency"
                      value={inputs.contingencyPct}
                      onChange={set("contingencyPct")}
                      min={0}
                      max={25}
                      step={0.5}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                      hint="Applied to authority charges, building and fit-out costs combined."
                    />
                    <InputField
                      label="Cost Escalation Rate"
                      value={inputs.escalationPct}
                      onChange={set("escalationPct")}
                      min={0}
                      max={15}
                      step={0.5}
                      suffix="% p.a."
                      format={(v) => v.toFixed(1)}
                    />
                    <InputField
                      label="Months Until Construction Commences"
                      icon={<CalendarClock className="size-4" />}
                      value={inputs.monthsToConstruction}
                      onChange={set("monthsToConstruction")}
                      min={0}
                      max={36}
                      step={1}
                      suffix=" mo"
                    />
                  </div>
                ) : null}

                {activeStep === "finance" ? (
                  <div className="flex flex-col gap-4">
                    <SectionTitle title="Development Finance" />
                    <InputField
                      label="Max Loan-To-Cost (LCR)"
                      icon={<Gauge className="size-4" />}
                      value={inputs.maxLoanToCostPct}
                      onChange={set("maxLoanToCostPct")}
                      min={0}
                      max={90}
                      step={1}
                      suffix="%"
                    />
                    <InputField
                      label="Max Loan-To-Value (LVR)"
                      icon={<Gauge className="size-4" />}
                      value={inputs.maxLoanToValuePct}
                      onChange={set("maxLoanToValuePct")}
                      min={0}
                      max={90}
                      step={1}
                      suffix="%"
                      hint="Specialised rooming-house security is often capped at 70-80% LVR by lenders."
                    />
                    <InputField
                      label="Construction Interest Rate"
                      value={inputs.constructionInterestRatePct}
                      onChange={set("constructionInterestRatePct")}
                      min={0}
                      max={15}
                      step={0.05}
                      suffix="%"
                      format={(v) => v.toFixed(2)}
                    />
                    <InputField
                      label="Average Drawn Balance During Construction"
                      value={inputs.averageDrawnPct}
                      onChange={set("averageDrawnPct")}
                      min={0}
                      max={100}
                      step={5}
                      suffix="%"
                      hint="Standard shorthand for progressive drawdown interest — 50% is typical, adjust if your program differs."
                    />
                    <InputField
                      label="Construction Period"
                      icon={<Hammer className="size-4" />}
                      value={inputs.constructionMonths}
                      onChange={set("constructionMonths")}
                      min={1}
                      max={36}
                      step={1}
                      suffix=" mo"
                    />
                    <InputField
                      label="Lease-Up Period"
                      icon={<CalendarClock className="size-4" />}
                      value={inputs.leaseUpMonths}
                      onChange={set("leaseUpMonths")}
                      min={0}
                      max={18}
                      step={1}
                      suffix=" mo"
                      hint="Time to ramp from first occupancy to stabilised occupancy — funds an estimated lease-up income shortfall."
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium" style={{ color: "#5b5d62" }}>
                        Finance Fees
                      </span>
                      <LineItemEditor items={inputs.financeFees} onChange={set("financeFees")} addLabel="Add finance fee" idPrefix="fin" />
                    </div>

                    <SectionTitle title="Stabilised Investment Loan" />
                    <InputField
                      label="Investment Loan Interest Rate"
                      value={inputs.investmentInterestRatePct}
                      onChange={set("investmentInterestRatePct")}
                      min={0}
                      max={15}
                      step={0.05}
                      suffix="%"
                      format={(v) => v.toFixed(2)}
                    />
                    <ToggleField
                      label="Interest-Only"
                      checked={inputs.interestOnly}
                      onChange={set("interestOnly")}
                      hint="Unticked models principal & interest amortising over the loan term."
                    />
                    <InputField label="Loan Term" value={inputs.loanTermYears} onChange={set("loanTermYears")} min={5} max={30} step={1} suffix=" yrs" />
                    <ToggleField
                      label="Refinance At Completion"
                      checked={inputs.refinanceAtCompletion}
                      onChange={set("refinanceAtCompletion")}
                      hint="If ticked, the long-term hold and IRR use the refinanced loan amount below, releasing (or requiring) equity at day one of the hold."
                    />
                    <InputField
                      label="Refinance LVR"
                      value={inputs.refinanceLvrPct}
                      onChange={set("refinanceLvrPct")}
                      min={0}
                      max={90}
                      step={1}
                      suffix="%"
                    />
                  </div>
                ) : null}

                {activeStep === "income" ? (
                  <div className="flex flex-col gap-4">
                    <SectionTitle title="Room Categories" />
                    <RoomCategoryEditor categories={inputs.roomCategories} onChange={set("roomCategories")} />

                    <SectionTitle title="Occupancy & Other Income" />
                    <InputField
                      label="Stabilised Occupancy"
                      value={inputs.stabilisedOccupancyPct}
                      onChange={set("stabilisedOccupancyPct")}
                      min={50}
                      max={100}
                      step={1}
                      suffix="%"
                    />
                    <InputField
                      label="Vacancy & Collection Loss (Additional)"
                      value={inputs.vacancyCollectionLossPct}
                      onChange={set("vacancyCollectionLossPct")}
                      min={0}
                      max={20}
                      step={0.5}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                      hint="Room-changeover downtime, bad debts and discounts, on top of the occupancy rate above."
                    />
                    <InputField
                      label="Other Annual Income"
                      icon={<Banknote className="size-4" />}
                      value={inputs.otherIncomeAnnual}
                      onChange={set("otherIncomeAnnual")}
                      min={0}
                      max={100000}
                      step={500}
                      prefix="$"
                      slider={false}
                      hint="Parking, laundry, internet upgrades, meals and other lawful charges."
                    />
                    <InputField
                      label="Annual Rent Growth"
                      value={inputs.rentGrowthPct}
                      onChange={set("rentGrowthPct")}
                      min={0}
                      max={10}
                      step={0.5}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />
                  </div>
                ) : null}

                {activeStep === "expenses" ? (
                  <div className="flex flex-col gap-4">
                    <SectionTitle title="Operating Expenses" />
                    <InputField
                      label="Property Management Fee"
                      value={inputs.managementFeePct}
                      onChange={set("managementFeePct")}
                      min={0}
                      max={30}
                      step={0.5}
                      suffix="% of EGI"
                      format={(v) => v.toFixed(1)}
                    />
                    <InputField
                      label="Annual Operating Expenses"
                      value={inputs.variableExpensePct}
                      onChange={set("variableExpensePct")}
                      min={0}
                      max={40}
                      step={0.5}
                      suffix="% of EGI"
                      format={(v) => v.toFixed(1)}
                      hint="Utilities, cleaning, maintenance and other variable running costs."
                    />
                    <InputField
                      label="Operating Cost Inflation"
                      value={inputs.expenseInflationPct}
                      onChange={set("expenseInflationPct")}
                      min={0}
                      max={10}
                      step={0.5}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium" style={{ color: "#5b5d62" }}>
                        Fixed Costs (Annual)
                      </span>
                      <LineItemEditor items={inputs.fixedExpenses} onChange={set("fixedExpenses")} addLabel="Add fixed cost" idPrefix="fix" />
                    </div>
                    <InputField
                      label="Capital Replacement Reserve Per Room"
                      value={inputs.capitalReservePerRoomAnnual}
                      onChange={set("capitalReservePerRoomAnnual")}
                      min={0}
                      max={3000}
                      step={50}
                      prefix="$"
                      suffix="/yr"
                      slider={false}
                      hint="Cash reserve for furniture, appliances and major repaints — distinct from tax depreciation."
                    />
                  </div>
                ) : null}

                {activeStep === "tax" ? (
                  <div className="flex flex-col gap-4">
                    <SectionTitle title="GST" />
                    <ToggleField label="Registered For GST" checked={inputs.gstRegistered} onChange={set("gstRegistered")} />
                    <SelectField
                      label="GST Classification"
                      value={inputs.gstClassification}
                      onChange={set("gstClassification")}
                      options={(Object.keys(GST_CLASSIFICATION_LABELS) as GstClassification[]).map((v) => ({
                        value: v,
                        label: GST_CLASSIFICATION_LABELS[v],
                      }))}
                      hint="Whether a rooming house is commercial residential premises for GST depends on its physical & operational characteristics, not its name — confirm with a GST adviser."
                    />

                    <SectionTitle title="Ownership & Tax" />
                    <SelectField
                      label="Ownership Entity"
                      value={inputs.ownershipEntity}
                      onChange={set("ownershipEntity")}
                      options={(Object.keys(OWNERSHIP_ENTITY_LABELS) as OwnershipEntity[]).map((v) => ({
                        value: v,
                        label: OWNERSHIP_ENTITY_LABELS[v],
                      }))}
                    />
                    <InputField
                      label="Marginal Tax Rate"
                      value={inputs.marginalTaxRatePct}
                      onChange={set("marginalTaxRatePct")}
                      min={0}
                      max={47}
                      step={0.5}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />
                    <InputField
                      label="Capital Works Deduction Rate"
                      value={inputs.capitalWorksRatePct}
                      onChange={set("capitalWorksRatePct")}
                      min={0}
                      max={4}
                      step={0.1}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                      hint="Applied to the building contract only — land, fit-out and finance costs are excluded."
                    />
                    <InputField
                      label="Annual Plant & Equipment Depreciation"
                      value={inputs.annualPlantDepreciation}
                      onChange={set("annualPlantDepreciation")}
                      min={0}
                      max={100000}
                      step={500}
                      prefix="$"
                      slider={false}
                      hint="Ideally sourced from a quantity surveyor's project-specific depreciation schedule, or the Depreciation step."
                    />
                  </div>
                ) : null}

                {activeStep === "valuation" ? (
                  <div className="flex flex-col gap-4">
                    <SectionTitle title="Valuation Method" />
                    <SelectField
                      label="Completion Valuation Basis"
                      value={inputs.valuationMethod}
                      onChange={set("valuationMethod")}
                      options={[
                        { value: "capitalisation" as ValuationMethod, label: "Capitalisation of net income" },
                        { value: "value-per-room" as ValuationMethod, label: "Market value per room" },
                        { value: "blended" as ValuationMethod, label: "Blended (average of both)" },
                      ]}
                    />
                    <InputField
                      label="Capitalisation Rate — Low"
                      value={inputs.capRateLow}
                      onChange={set("capRateLow")}
                      min={3}
                      max={12}
                      step={0.1}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />
                    <InputField
                      label="Capitalisation Rate — Base"
                      value={inputs.capRateBase}
                      onChange={set("capRateBase")}
                      min={3}
                      max={12}
                      step={0.1}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />
                    <InputField
                      label="Capitalisation Rate — High"
                      value={inputs.capRateHigh}
                      onChange={set("capRateHigh")}
                      min={3}
                      max={12}
                      step={0.1}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />
                    <InputField
                      label="Value Per Room"
                      value={inputs.valuePerRoomBase}
                      onChange={set("valuePerRoomBase")}
                      min={0}
                      max={400000}
                      step={2500}
                      prefix="$"
                      slider={false}
                    />

                    <SectionTitle title="Long-Term Hold & Exit" />
                    <InputField
                      label="Property Value Growth"
                      value={inputs.propertyValueGrowthPct}
                      onChange={set("propertyValueGrowthPct")}
                      min={0}
                      max={10}
                      step={0.5}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />
                    <InputField
                      label="Exit Cap Rate Movement"
                      value={inputs.exitCapRateMovementBps}
                      onChange={set("exitCapRateMovementBps")}
                      min={-200}
                      max={200}
                      step={10}
                      suffix=" bps"
                      hint="Positive = softer (higher) exit cap rate than today's base rate."
                    />
                    <InputField
                      label="Selling Costs"
                      value={inputs.sellingCostsPct}
                      onChange={set("sellingCostsPct")}
                      min={0}
                      max={8}
                      step={0.25}
                      suffix="%"
                      format={(v) => v.toFixed(2)}
                    />
                    <InputField
                      label="Investor Discount Rate (For NPV)"
                      value={inputs.discountRatePct}
                      onChange={set("discountRatePct")}
                      min={0}
                      max={20}
                      step={0.5}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />

                    <SectionTitle title="Investor Targets" />
                    <InputField
                      label="Minimum Development Margin"
                      value={inputs.minDevelopmentMarginPct}
                      onChange={set("minDevelopmentMarginPct")}
                      min={0}
                      max={40}
                      step={1}
                      suffix="%"
                    />
                    <InputField
                      label="Minimum Net Yield On Cost"
                      value={inputs.minNetYieldPct}
                      onChange={set("minNetYieldPct")}
                      min={0}
                      max={15}
                      step={0.5}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />
                    <InputField
                      label="Cash-On-Cash Return"
                      value={inputs.minCashOnCashPct}
                      onChange={set("minCashOnCashPct")}
                      min={0}
                      max={20}
                      step={0.5}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />
                    <InputField label="Minimum DSCR" value={inputs.minDSCR} onChange={set("minDSCR")} min={1} max={2} step={0.05} suffix="x" format={(v) => v.toFixed(2)} />
                    <InputField
                      label="LVR After Completion"
                      value={inputs.maxCompletedLvrPct}
                      onChange={set("maxCompletedLvrPct")}
                      min={30}
                      max={90}
                      step={1}
                      suffix="%"
                    />
                    <InputField label="Minimum 5-Year IRR" value={inputs.minIRRPct} onChange={set("minIRRPct")} min={0} max={30} step={1} suffix="%" />
                    <InputField
                      label="Minimum 10-Year Equity Multiple"
                      value={inputs.minEquityMultiple}
                      onChange={set("minEquityMultiple")}
                      min={1}
                      max={4}
                      step={0.1}
                      suffix="x"
                      format={(v) => v.toFixed(1)}
                    />
                    <InputField
                      label="Maximum Equity Available"
                      value={inputs.maxAvailableEquity}
                      onChange={set("maxAvailableEquity")}
                      min={0}
                      max={3000000}
                      step={10000}
                      prefix="$"
                      slider={false}
                    />
                  </div>
                ) : null}

                {activeStep === "depreciation" ? (
                  <div className="flex flex-col gap-4">
                    <SectionTitle title="Property" />
                    <SelectField
                      label="Property Type"
                      value={depInputs.propertyType}
                      onChange={setDep("propertyType")}
                      options={PROP_TYPES.map((v) => ({ value: v, label: v }))}
                    />
                    <SelectField
                      label="Construction Type"
                      value={depInputs.constructionType}
                      onChange={setDep("constructionType")}
                      options={CONSTR_TYPES.map((v) => ({ value: v, label: v }))}
                    />
                    {depInputs.propertyType.indexOf("Development") >= 0 ? (
                      <>
                        <InputField label="Total Units In Development" value={depInputs.units} onChange={setDep("units")} min={1} max={200} step={1} />
                        <InputField label="Levels In Development" value={depInputs.levels} onChange={setDep("levels")} min={1} max={100} step={1} />
                      </>
                    ) : null}
                    <InputField
                      label="Floor Area"
                      value={depInputs.floorArea}
                      onChange={setDep("floorArea")}
                      min={20}
                      max={20000}
                      step={5}
                      suffix=" m²"
                      slider={false}
                      hint="Approximate internal area including garages."
                    />

                    <SectionTitle title="Timing & Location" />
                    <SelectField
                      label="Estimated Year Of Construction"
                      value={depInputs.yearBuilt}
                      onChange={setDep("yearBuilt")}
                      options={yearBuiltOptions().map((v) => ({ value: v, label: v }))}
                    />
                    <SelectField
                      label="Estimated Year Of Purchase"
                      value={depInputs.yearPurchased}
                      onChange={setDep("yearPurchased")}
                      options={yearPurchasedOptions().map((v) => ({ value: v, label: v }))}
                      hint="Post 9 May 2017 exchange dates apply the amended Div 40 rules for second-hand residential plant & equipment."
                    />
                    <ToggleField label="Property Purchased New" checked={depInputs.purchasedNew} onChange={setDep("purchasedNew")} />
                    <SelectField
                      label="Nearest Major City"
                      value={depInputs.city}
                      onChange={setDep("city")}
                      options={CITIES.map((v) => ({ value: v, label: v }))}
                    />
                    <InputField
                      label="Marginal Tax Rate"
                      value={depInputs.marginalRate}
                      onChange={setDep("marginalRate")}
                      min={0}
                      max={47}
                      step={0.5}
                      suffix="%"
                      format={(v) => v.toFixed(1)}
                    />

                    <div
                      className="mt-1 flex flex-col gap-2 rounded-xl border p-4"
                      style={{ borderColor: "var(--border)", background: "var(--muted)" }}
                    >
                      <p className="text-sm" style={{ color: "#5b5d62" }}>
                        Estimated first-year plant &amp; equipment deduction:{" "}
                        <strong>{formatCurrency(depEstimate.year1PeMax)}</strong>
                      </p>
                      <button
                        type="button"
                        onClick={applyDepreciationToModel}
                        className="inline-flex w-fit items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-white"
                        style={{ background: "#111c49" }}
                      >
                        Apply year 1 to model
                      </button>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                        Writes this estimate into the &ldquo;Annual plant &amp; equipment depreciation&rdquo; and &ldquo;Capital works deduction
                        rate&rdquo; fields on the GST &amp; Tax step. See the full 5-year schedule in the detailed report.
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--border)" }}>
                  <button
                    type="button"
                    disabled={!prevStep}
                    onClick={() => prevStep && setActiveStep(prevStep.id)}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-40"
                    style={{ borderColor: "var(--input)", background: "var(--card)", color: "#111c49" }}
                  >
                    ← Back
                  </button>
                  {nextStep ? (
                    <button
                      type="button"
                      onClick={() => setActiveStep(nextStep.id)}
                      className="inline-flex items-center gap-2 rounded-lg px-4.5 py-2.5 text-sm font-semibold text-white"
                      style={{ background: "#111c49" }}
                    >
                      Next: {nextStep.title}
                      <ArrowRight className="size-4" />
                    </button>
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------- RESULTS RAIL ---------------------------- */}
          <div className="flex flex-col gap-4 xl:sticky xl:top-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-bold" style={{ ...SERIF, color: "#111c49" }}>
                Indicative Results Summary
              </h2>
              <button
                type="button"
                onClick={() => setDetailedView(false)}
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold"
                style={{ borderColor: "var(--input)", background: "var(--card)", color: "#111c49" }}
              >
                Edit Inputs
              </button>
            </div>

            <div className="relative overflow-hidden rounded-2xl border p-4.5" style={{ borderColor: "rgba(17,28,73,.18)", background: "var(--accent)" }}>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#111c49", opacity: 0.7 }}>
                Overall Feasibility Status
              </span>
              <p className="mt-1 text-lg font-bold leading-tight" style={{ color: "#111c49" }}>
                {results.overallStatus}
              </p>
              <p className="mt-1 text-sm" style={{ color: "#111c49" }}>
                <strong>{results.rentableRooms}</strong> rentable rooms
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <MetricCard
                tone="primary"
                label="Annual Cash Flow"
                value={formatCurrency(results.preTaxCashFlow)}
                sub="After all expenses"
                className="bg-[url('/images/feasibility-metric-bg.png')] bg-cover bg-center"
              />
              <MetricCard
                tone="primary"
                label="Cash on Cash Return"
                value={formatPercent(results.cashOnCashReturnPct)}
                sub="On cash invested"
                className="bg-[url('/images/feasibility-metric-bg.png')] bg-cover bg-center"
              />
              <MetricCard
                tone="primary"
                label="Net Yield"
                value={formatPercent(results.netYieldOnCostPct)}
                sub="On completion value"
                className="bg-[url('/images/feasibility-metric-bg.png')] bg-cover bg-center"
              />
              <MetricCard
                tone="primary"
                label="Project IRR"
                value={formatPercent(results.tenYearIRRPct)}
                sub="Over 10 years"
                className="bg-[url('/images/feasibility-metric-bg.png')] bg-cover bg-center"
              />
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(17,28,73,.1)", background: "rgba(255,253,248,.96)" }}>
                <h3 className="mb-3 text-[15px] font-medium" style={{ ...SERIF, color: "#111c49" }}>
                  Income vs Expenses (p.a.)
                </h3>
                <IncomeExpenseBarChart
                  totalIncome={results.effectiveGrossIncome}
                  operatingExpenses={results.totalOperatingExpenses}
                  loanRepayments={results.annualDebtService}
                  netCashFlow={results.preTaxCashFlow}
                />
                <p className="mt-3 text-lg font-bold" style={{ color: "#111c49" }}>
                  {formatCurrency(results.effectiveGrossIncome)}
                </p>
                <p className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
                  Total income
                </p>
                <button type="button" onClick={goToDetailedReport} className="mt-2 text-xs font-semibold" style={{ color: "#111c49" }}>
                  View full breakdown →
                </button>
              </div>
              <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(17,28,73,.1)", background: "rgba(255,253,248,.96)" }}>
                <h3 className="mb-3 text-[15px] font-medium" style={{ ...SERIF, color: "#111c49" }}>
                  10 Year Cash Flow (After Tax)
                </h3>
                <CashFlowLineChart values={results.projection10yr.map((r) => r.afterTaxCashFlow)} />
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "rgba(17,28,73,.05)" }}>
              <p className="text-sm leading-relaxed" style={{ color: "#5b5d62" }}>
                <strong>Important information.</strong> Results are estimates only, based on the information provided. Please seek
                project-specific professional advice before relying on them.
              </p>
              <button type="button" onClick={goToDetailedReport} className="w-fit text-sm font-semibold" style={{ color: "#111c49" }}>
                View detailed report →
              </button>
            </div>
          </div>
        </div>

        {/* ---------------------------- DETAILED REPORT ---------------------------- */}
        {detailedView ? (
          <div className="flex flex-col gap-6">
            <button
              type="button"
              onClick={() => setDetailedView(false)}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold"
              style={{ color: "#111c49" }}
            >
              <ChevronLeft className="size-4" />
              Back to summary
            </button>

            <section
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-5"
              style={{ borderColor: "var(--border)", background: statusTone.bg, color: statusTone.fg }}
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide opacity-80">Overall feasibility status</span>
                <p className="text-lg font-bold leading-tight">{results.overallStatus}</p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <span>
                  <strong>{results.rentableRooms}</strong> rentable rooms
                </span>
                <span>
                  <strong>{formatCurrency(results.costPerRentableRoom)}</strong> per room
                </span>
              </div>
            </section>

            {results.warnings.length > 0 ? (
              <section className="flex flex-col gap-2 rounded-2xl border p-5" style={{ borderColor: "rgba(171,135,66,.4)", background: "rgba(171,135,66,.1)" }}>
                <div className="flex items-center gap-2 font-semibold" style={{ color: "#111c49" }}>
                  <TriangleAlert className="size-4" style={{ color: "#ab8742" }} />
                  Warnings
                </div>
                <ul className="flex flex-col gap-1.5">
                  {results.warnings.map((w) => (
                    <li key={w} className="text-sm leading-relaxed" style={{ color: "#111c49" }}>
                      • {w}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                tone="primary"
                label="Total development cost"
                value={formatCurrency(results.totalDevelopmentCost)}
                sub={`${formatCurrency(results.costPerRentableRoom)} per room`}
                icon={<Hammer className="size-4" />}
              />
              <MetricCard
                label="Debt facility required"
                value={formatCurrency(results.debtFacility)}
                sub={`${formatPercent(results.completedLvrPct)} of completion value`}
                icon={<Landmark className="size-4" />}
              />
              <MetricCard
                label="Peak investor equity"
                value={formatCurrency(results.peakInvestorEquity)}
                sub={
                  results.peakInvestorEquity > inputs.maxAvailableEquity
                    ? `${formatCurrency(results.peakInvestorEquity - inputs.maxAvailableEquity)} over your available equity`
                    : "Within your available equity"
                }
                tone={results.peakInvestorEquity > inputs.maxAvailableEquity ? "negative" : "positive"}
                icon={<PiggyBank className="size-4" />}
              />
              <MetricCard
                label="Completion valuation"
                value={formatCurrency(results.completionValuation)}
                sub={`Cap rate ${formatCurrency(results.capValueBase)} · Per-room ${formatCurrency(results.valuePerRoomValue)}`}
                icon={<LineChart className="size-4" />}
              />
              <MetricCard
                label="Development profit"
                value={formatCurrency(results.developmentProfit)}
                tone={results.developmentProfit >= 0 ? "positive" : "negative"}
                sub="Completion valuation less total development cost"
                icon={<TrendingUp className="size-4" />}
              />
              <MetricCard
                label="Development margin"
                value={formatPercent(results.developmentMarginPct)}
                tone={results.developmentMarginPct >= inputs.minDevelopmentMarginPct ? "positive" : "warning"}
                sub={`Target ≥ ${inputs.minDevelopmentMarginPct}%`}
                icon={<Percent className="size-4" />}
              />
              <MetricCard
                label="Net yield on cost"
                value={formatPercent(results.netYieldOnCostPct)}
                sub={`Gross yield ${formatPercent(results.grossYieldOnCostPct)}`}
                icon={<Gauge className="size-4" />}
              />
              <MetricCard
                label="Cash-on-cash return"
                value={formatPercent(results.cashOnCashReturnPct)}
                tone={results.cashOnCashReturnPct >= 0 ? "positive" : "negative"}
                sub={`Pre-tax cash flow ${formatCurrency(results.preTaxCashFlow)}/yr`}
                icon={<Banknote className="size-4" />}
              />
              <MetricCard
                label="DSCR"
                value={Number.isFinite(results.dscr) ? `${results.dscr.toFixed(2)}x` : "—"}
                tone={results.dscr >= inputs.minDSCR ? "positive" : "negative"}
                sub={`Target ≥ ${inputs.minDSCR.toFixed(2)}x`}
                icon={<Gauge className="size-4" />}
              />
              <MetricCard
                label="Five-year IRR"
                value={formatPercent(results.fiveYearIRRPct)}
                sub={`Ten-year IRR ${formatPercent(results.tenYearIRRPct)}`}
                icon={<TrendingUp className="size-4" />}
              />
              <MetricCard
                label="Equity multiple (10 yr)"
                value={`${results.equityMultiple10yr.toFixed(2)}x`}
                sub={`5-yr: ${results.equityMultiple5yr.toFixed(2)}x`}
                icon={<PiggyBank className="size-4" />}
              />
              <MetricCard
                label="Equity released at refinance"
                value={formatCurrency(results.equityReleasedAtRefinance)}
                sub={`Refinance loan ${formatCurrency(results.refinanceLoanAmount)}`}
                icon={<RotateCcw className="size-4" />}
              />
            </div>

            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-3 rounded-2xl border p-5 md:p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                <h3 className="font-semibold" style={{ color: "#111c49" }}>
                  Total development cost
                </h3>
                <Row label="Total acquisition cost" value={formatCurrency(results.totalAcquisitionCost)} />
                <Row label="Total development works" value={formatCurrency(results.totalDevelopmentWorks)} />
                <Row label="Finance & holding costs (incl. lease-up deficit)" value={formatCurrency(results.totalFinanceAndHoldingCosts)} />
                <Row label="— construction interest" value={formatCurrency(results.constructionInterest)} />
                <Row label="— finance fees" value={formatCurrency(results.financeFeesTotal)} />
                <Row label="— estimated lease-up deficit" value={formatCurrency(results.leaseUpDeficit)} />
                <Row label="Total development cost" value={formatCurrency(results.totalDevelopmentCost)} strong />
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border p-5 md:p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                <h3 className="font-semibold" style={{ color: "#111c49" }}>
                  Stabilised operating result
                </h3>
                <Row label="Gross potential room income" value={`${formatCurrency(results.grossPotentialAnnualRoomIncome)}/yr`} />
                <Row label="Effective gross income" value={`${formatCurrency(results.effectiveGrossIncome)}/yr`} />
                <Row label="Total operating expenses" value={`${formatCurrency(results.totalOperatingExpenses)}/yr`} />
                <Row label="Net operating income" value={`${formatCurrency(results.netOperatingIncome)}/yr`} strong />
                <Row label="Annual debt service" value={`${formatCurrency(results.annualDebtService)}/yr`} />
                <Row label="Pre-tax cash flow" value={`${formatCurrency(results.preTaxCashFlow)}/yr`} tone={results.preTaxCashFlow >= 0 ? "positive" : "negative"} />
                <Row label="Estimated depreciation" value={`${formatCurrency(results.totalDepreciation)}/yr`} />
                <Row
                  label="Estimated taxable income"
                  value={`${formatCurrency(results.taxableIncomeAfterDep)}/yr`}
                  tone={results.taxableIncomeAfterDep >= 0 ? "default" : "negative"}
                />
                <Row
                  label="Indicative after-tax cash flow"
                  value={`${formatCurrency(results.afterTaxCashFlow)}/yr`}
                  tone={results.afterTaxCashFlow >= 0 ? "positive" : "negative"}
                  strong
                />
                {results.taxLossCarriedForward > 0 ? (
                  <p className="pt-1 text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    A tax loss of {formatCurrency(results.taxLossCarriedForward)}/yr is estimated — this is not assumed to be an immediate
                    cash refund; usability depends on your entity and other income.
                  </p>
                ) : null}
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4 rounded-2xl border p-5 md:grid-cols-4 md:p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              {[
                ["Operating break-even occupancy", formatPercent(results.breakEvenOccupancyPct)],
                ["Debt-service break-even occupancy", formatPercent(results.debtServiceBreakEvenOccupancyPct)],
                ["Operating break-even weekly rent", formatCurrency(results.breakEvenWeeklyRent)],
                ["Debt-service break-even weekly rent", formatCurrency(results.debtServiceBreakEvenWeeklyRent)],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
                    {label}
                  </span>
                  <span className="text-lg font-bold tabular-nums" style={{ color: "#111c49" }}>
                    {value}
                  </span>
                </div>
              ))}
            </section>

            <section className="flex flex-col gap-3 rounded-2xl border p-5 md:p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <div className="flex items-center gap-2">
                <Target className="size-5" style={{ color: "#111c49" }} />
                <h2 className="text-lg font-semibold" style={{ color: "#111c49" }}>
                  Investor targets
                </h2>
              </div>
              <div className="flex flex-col divide-y" style={{ borderColor: "var(--border)" }}>
                {results.targets.map((t) => (
                  <div key={t.key} className="flex flex-wrap items-center justify-between gap-2 py-2" style={{ borderColor: "var(--border)" }}>
                    <span className="text-sm" style={{ color: "#111c49" }}>
                      {t.label}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm tabular-nums" style={{ color: "var(--muted-foreground)" }}>
                        {t.actualLabel} <span className="opacity-60">(target {t.targetLabel})</span>
                      </span>
                      <StatusDot status={t.status} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-3 rounded-2xl border p-5 md:p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CalendarClock className="size-5" style={{ color: "#111c49" }} />
                  <h2 className="text-lg font-semibold" style={{ color: "#111c49" }}>
                    Long-term hold projection
                  </h2>
                </div>
                <div className="flex rounded-lg border p-1" style={{ borderColor: "var(--input)" }}>
                  {[5, 10].map((yrs) => (
                    <button
                      key={yrs}
                      type="button"
                      onClick={() => setProjectionYears(yrs as 5 | 10)}
                      className="rounded-md px-3 py-1 text-xs font-semibold transition-colors"
                      style={projectionYears === yrs ? { background: "#111c49", color: "#fff" } : { color: "var(--muted-foreground)" }}
                    >
                      {yrs} years
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs font-semibold uppercase tracking-wide" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                      <th className="py-2 pr-3">Year</th>
                      <th className="py-2 pr-3 text-right">EGI</th>
                      <th className="py-2 pr-3 text-right">Opex</th>
                      <th className="py-2 pr-3 text-right">NOI</th>
                      <th className="py-2 pr-3 text-right">Debt service</th>
                      <th className="py-2 pr-3 text-right">Pre-tax CF</th>
                      <th className="py-2 pr-3 text-right">After-tax CF</th>
                      <th className="py-2 pr-3 text-right">Property value</th>
                      <th className="py-2 pr-3 text-right">Debt balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectionRows.map((row) => (
                      <tr key={row.year} className="border-b last:border-0" style={{ borderColor: "rgba(17,28,73,.12)" }}>
                        <td className="py-1.5 pr-3 font-medium">{row.year}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.effectiveGrossIncome)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.operatingExpenses)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums font-semibold">{formatCurrency(row.netOperatingIncome)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.debtService)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums" style={{ color: row.preTaxCashFlow >= 0 ? "#16a34a" : "#dc2626" }}>
                          {formatCurrency(row.preTaxCashFlow)}
                        </td>
                        <td className="py-1.5 pr-3 text-right tabular-nums" style={{ color: row.afterTaxCashFlow >= 0 ? "#16a34a" : "#dc2626" }}>
                          {formatCurrency(row.afterTaxCashFlow)}
                        </td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.propertyValue)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.debtBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                Assumes rent grows {formatPercent(inputs.rentGrowthPct)} p.a., expenses inflate {formatPercent(inputs.expenseInflationPct)} p.a., and
                property value grows {formatPercent(inputs.propertyValueGrowthPct)} p.a. Exit proceeds are modelled at the base capitalisation rate
                {inputs.exitCapRateMovementBps !== 0 ? " adjusted by the exit cap-rate movement" : ""} on the final year&apos;s NOI.
              </p>
            </section>

            <section className="flex flex-col gap-3 rounded-2xl border p-5 md:p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <div className="flex items-center gap-2">
                <TriangleAlert className="size-5" style={{ color: "#111c49" }} />
                <h2 className="text-lg font-semibold" style={{ color: "#111c49" }}>
                  Sensitivity &amp; stress testing
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs font-semibold uppercase tracking-wide" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                      <th className="py-2 pr-3">Scenario</th>
                      <th className="py-2 pr-3 text-right">Net yield</th>
                      <th className="py-2 pr-3 text-right">Cash-on-cash</th>
                      <th className="py-2 pr-3 text-right">Dev. margin</th>
                      <th className="py-2 pr-3 text-right">DSCR</th>
                      <th className="py-2 pr-3 text-right">Completion value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.stressTests.map((s) => (
                      <tr
                        key={s.label}
                        className="border-b last:border-0"
                        style={{ borderColor: "rgba(17,28,73,.12)", background: s.label === "Base case" ? "var(--muted)" : undefined }}
                      >
                        <td className="py-1.5 pr-3 font-medium">{s.label}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatPercent(s.netYieldOnCostPct)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatPercent(s.cashOnCashReturnPct)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatPercent(s.developmentMarginPct)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{Number.isFinite(s.dscr) ? `${s.dscr.toFixed(2)}x` : "—"}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(s.completionValuation)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="flex flex-col gap-4 rounded-2xl border p-5 md:p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <LineChart className="size-5" style={{ color: "#111c49" }} />
                  <h2 className="text-lg font-semibold" style={{ color: "#111c49" }}>
                    Depreciation estimate
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={applyDepreciationToModel}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-white"
                  style={{ background: "#111c49" }}
                >
                  Apply year 1 to model
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-1 rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
                  <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
                    Estimated construction cost
                  </span>
                  <span className="text-base font-bold tabular-nums" style={{ color: "#111c49" }}>
                    {formatCurrency(depEstimate.costMin)} – {formatCurrency(depEstimate.costMax)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
                  <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
                    First full-year deductions
                  </span>
                  <span className="text-base font-bold tabular-nums" style={{ color: "#111c49" }}>
                    {formatCurrency(depEstimate.firstMin)} – {formatCurrency(depEstimate.firstMax)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
                  <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
                    5-year deductions
                  </span>
                  <span className="text-base font-bold tabular-nums" style={{ color: "#111c49" }}>
                    {formatCurrency(depEstimate.fiveMin)} – {formatCurrency(depEstimate.fiveMax)}
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs font-semibold uppercase tracking-wide" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                      <th className="py-2 pr-3">Period</th>
                      <th className="py-2 pr-3 text-right">Plant &amp; equipment</th>
                      <th className="py-2 pr-3 text-right">Division 43</th>
                      <th className="py-2 pr-3 text-right">Total deduction</th>
                      <th className="py-2 pr-3 text-right">Est. tax saving</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depEstimate.rows.map((row) => (
                      <tr key={row.year} className="border-b last:border-0" style={{ borderColor: "rgba(17,28,73,.12)" }}>
                        <td className="py-1.5 pr-3 font-medium">Year {row.year}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.plantEquipment)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.div43)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums font-semibold">{formatCurrency(row.total)}</td>
                        <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.taxSaving)}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 font-semibold" style={{ borderColor: "var(--border)" }}>
                      <td className="py-1.5 pr-3">5-year total</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(depEstimate.peTotal)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(depEstimate.d43Total)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(depEstimate.fiveMax)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(depEstimate.fiveTaxMax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {depreciationNote(depEstimate)}
              </p>
            </section>

            <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              This is an indicative investment-screening tool, not a formal property valuation, construction quote, finance approval,
              development approval, town-planning, building-certification, fire-engineering, legal, accounting, tax or GST advice, a
              depreciation schedule, or a guarantee of rental income, occupancy or investment performance. Figures are modelled annually
              rather than month-by-month, and construction interest, lease-up shortfalls, GST timing and depreciation are simplified
              estimates. Before relying on these results, obtain project-specific advice from a town planner, building designer or
              architect, building certifier, fire engineer, builder, quantity surveyor, property manager, registered valuer, finance
              broker or lender, accountant, tax adviser, solicitor and insurance broker.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
