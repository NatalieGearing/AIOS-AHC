"use client"

import type React from "react"
import { useMemo, useState } from "react"
import {
  Banknote,
  Building2,
  CalendarClock,
  ClipboardList,
  Download,
  DoorOpen,
  Gauge,
  Hammer,
  Landmark,
  LineChart,
  MapPin,
  Percent,
  PiggyBank,
  Receipt,
  RotateCcw,
  ShoppingCart,
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
import {
  DEFAULT_INPUTS,
  GST_CLASSIFICATION_LABELS,
  OWNERSHIP_ENTITY_LABELS,
  PLANNING_STATUS_LABELS,
  PROJECT_TYPE_LABELS,
  calculateFeasibility,
  formatCurrency,
  formatPercent,
  qldTransferDutyDisplay,
  type FeasibilityInputs,
  type GstClassification,
  type OwnershipEntity,
  type PlanningStatus,
  type ProjectType,
  type ValuationMethod,
} from "@/lib/feasibility-calculations"

const TABS = [
  { id: "site", label: "Project & Site", icon: MapPin },
  { id: "acquisition", label: "Acquisition", icon: ShoppingCart },
  { id: "development", label: "Development", icon: Hammer },
  { id: "finance", label: "Finance", icon: Landmark },
  { id: "income", label: "Rooms & Income", icon: DoorOpen },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "tax", label: "GST & Tax", icon: Percent },
  { id: "valuation", label: "Valuation & Targets", icon: Target },
] as const

type TabId = (typeof TABS)[number]["id"]

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border pb-2">
      <span className="text-primary">{icon}</span>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">{title}</h3>
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
      <label className="text-sm font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-md border border-input bg-background px-2.5 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint ? <p className="text-xs text-muted-foreground leading-relaxed">{hint}</p> : null}
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
    <label className="flex items-start gap-2.5 rounded-md border border-input bg-background px-3 py-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 accent-primary"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {hint ? <span className="text-xs leading-relaxed text-muted-foreground">{hint}</span> : null}
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
    <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          "shrink-0 tabular-nums",
          strong ? "text-base font-bold" : "text-sm font-semibold",
          tone === "positive" && "text-success",
          tone === "negative" && "text-destructive",
        )}
      >
        {value}
      </span>
    </div>
  )
}

const overallStatusTone: Record<string, string> = {
  "Meets investment targets": "border-success/50 bg-success/10 text-success",
  "Potentially feasible—further investigation required": "border-warning/50 bg-warning/10 text-warning",
  "Marginal feasibility": "border-warning/50 bg-warning/10 text-warning",
  "Does not meet current targets": "border-destructive/50 bg-destructive/10 text-destructive",
  "Unable to assess—critical information missing": "border-border bg-muted text-muted-foreground",
}

export function FeasibilityCalculator() {
  const [inputs, setInputs] = useState<FeasibilityInputs>(DEFAULT_INPUTS)
  const [activeTab, setActiveTab] = useState<TabId>("site")
  const [projectionYears, setProjectionYears] = useState<5 | 10>(10)
  const results = useMemo(() => calculateFeasibility(inputs), [inputs])

  const set =
    <K extends keyof FeasibilityInputs>(key: K) =>
    (value: FeasibilityInputs[K]) =>
      setInputs((prev) => ({ ...prev, [key]: value }))

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

  const projectionRows = results.projection10yr.slice(0, projectionYears)

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-8 md:px-6 lg:py-12">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="size-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold leading-tight text-balance md:text-3xl">
                Rooming House Development Feasibility Calculator
              </h1>
              <p className="text-sm text-muted-foreground">
                Screen the numbers on a new build, demolition &amp; rebuild, conversion or acquisition before you commit.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportPdf}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Download className="size-4" />
              Export summary
            </button>
            <button
              type="button"
              onClick={() => setInputs(DEFAULT_INPUTS)}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)]">
        {/* ---------------------------- INPUTS ---------------------------- */}
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 md:p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <div className="flex flex-wrap gap-1.5 rounded-xl border border-input bg-background p-1">
            {TABS.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold leading-tight transition-colors",
                    activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={activeTab === tab.id}
                >
                  <Icon className="size-3.5" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {activeTab === "site" ? (
            <div className="flex flex-col gap-4">
              <SectionTitle icon={<MapPin className="size-4" />} title="Project & site" />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Project name</label>
                <input
                  value={inputs.projectName}
                  onChange={(e) => set("projectName")(e.target.value)}
                  className="rounded-md border border-input bg-background px-2.5 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <SelectField
                label="Project type"
                value={inputs.projectType}
                onChange={set("projectType")}
                options={(Object.keys(PROJECT_TYPE_LABELS) as ProjectType[]).map((v) => ({ value: v, label: PROJECT_TYPE_LABELS[v] }))}
              />
              <SelectField
                label="Planning & approval status"
                value={inputs.planningStatus}
                onChange={set("planningStatus")}
                options={(Object.keys(PLANNING_STATUS_LABELS) as PlanningStatus[]).map((v) => ({ value: v, label: PLANNING_STATUS_LABELS[v] }))}
                hint="Rooming accommodation approval requirements depend on the site, design and council area — treat this as a project-specific input, not an assumption."
              />
              <ToggleField
                label="Land is already owned"
                checked={inputs.landAlreadyOwned}
                onChange={set("landAlreadyOwned")}
                hint="When ticked, no purchase cash outlay is modelled, but the existing property value still counts toward total development cost and valuation."
              />

              <SectionTitle icon={<ClipboardList className="size-4" />} title="Confirm before relying on results" />
              <ToggleField label="Planning status confirmed" checked={inputs.planningConfirmed} onChange={set("planningConfirmed")} />
              <ToggleField label="GST treatment confirmed by adviser" checked={inputs.gstAdviceConfirmed} onChange={set("gstAdviceConfirmed")} />
              <ToggleField label="Finance terms confirmed by lender" checked={inputs.financeConfirmed} onChange={set("financeConfirmed")} />
              <ToggleField
                label="Construction estimate confirmed (builder quote)"
                checked={inputs.constructionEstimateConfirmed}
                onChange={set("constructionEstimateConfirmed")}
              />
              <ToggleField
                label="Completion valuation confirmed by an independent valuer"
                checked={inputs.valuationIndependent}
                onChange={set("valuationIndependent")}
              />
            </div>
          ) : null}

          {activeTab === "acquisition" ? (
            <div className="flex flex-col gap-4">
              <SectionTitle icon={<ShoppingCart className="size-4" />} title="Acquisition" />
              {inputs.landAlreadyOwned ? (
                <InputField
                  label="Existing property value"
                  icon={<Landmark className="size-4" />}
                  value={inputs.existingPropertyValue}
                  onChange={set("existingPropertyValue")}
                  min={0}
                  max={5000000}
                  step={10000}
                  prefix="$"
                  slider={false}
                  hint="Used as the land value in total development cost, since no purchase price is paid."
                />
              ) : (
                <InputField
                  label="Land / purchase price"
                  icon={<Landmark className="size-4" />}
                  value={inputs.purchasePrice}
                  onChange={set("purchasePrice")}
                  min={0}
                  max={5000000}
                  step={10000}
                  prefix="$"
                  slider={false}
                />
              )}

              <ToggleField
                label="Auto-calculate QLD transfer duty"
                checked={inputs.autoTransferDuty}
                onChange={set("autoTransferDuty")}
                hint={`Currently ${formatCurrency(qldTransferDutyDisplay(inputs.purchasePrice))} on the QLD general/investor schedule.`}
              />
              {!inputs.autoTransferDuty ? (
                <InputField
                  label="Transfer duty (manual)"
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
                <span className="text-sm font-medium text-foreground">Legal, due diligence & other purchase costs</span>
                <LineItemEditor items={inputs.acquisitionCosts} onChange={set("acquisitionCosts")} addLabel="Add purchase cost" idPrefix="acq" />
              </div>

              <InputField
                label="Recoverable GST credit on acquisition"
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
            </div>
          ) : null}

          {activeTab === "development" ? (
            <div className="flex flex-col gap-4">
              <SectionTitle icon={<Hammer className="size-4" />} title="Demolition & site preparation" />
              <LineItemEditor items={inputs.demolitionSitePrep} onChange={set("demolitionSitePrep")} addLabel="Add site cost" idPrefix="dem" />

              <SectionTitle icon={<ClipboardList className="size-4" />} title="Consultants" />
              <LineItemEditor items={inputs.consultants} onChange={set("consultants")} addLabel="Add consultant" idPrefix="con" />

              <SectionTitle icon={<Landmark className="size-4" />} title="Authority & approval charges" />
              <LineItemEditor items={inputs.authorityCharges} onChange={set("authorityCharges")} addLabel="Add authority charge" idPrefix="auth" />

              <SectionTitle icon={<Building2 className="size-4" />} title="Building & fit-out" />
              <InputField
                label="Base building contract"
                value={inputs.buildingCostBase}
                onChange={set("buildingCostBase")}
                min={0}
                max={8000000}
                step={10000}
                prefix="$"
                slider={false}
              />
              <LineItemEditor items={inputs.buildingCostExtras} onChange={set("buildingCostExtras")} addLabel="Add building cost" idPrefix="bld" />
              <InputField
                label="Room fit-out cost per room"
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
                <span className="text-sm font-medium text-foreground">Common-area fit-out</span>
                <LineItemEditor items={inputs.commonAreaFitout} onChange={set("commonAreaFitout")} addLabel="Add common-area cost" idPrefix="caf" />
              </div>

              <SectionTitle icon={<Percent className="size-4" />} title="Contingency & escalation" />
              <InputField
                label="Contingency"
                value={inputs.contingencyPct}
                onChange={set("contingencyPct")}
                min={0}
                max={25}
                step={0.5}
                suffix="%"
                format={(v) => v.toFixed(1)}
                hint="Applied to demolition, consultants, authority charges, building and fit-out costs combined."
              />
              <InputField
                label="Cost escalation rate"
                value={inputs.escalationPct}
                onChange={set("escalationPct")}
                min={0}
                max={15}
                step={0.5}
                suffix="% p.a."
                format={(v) => v.toFixed(1)}
              />
              <InputField
                label="Months until construction commences"
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

          {activeTab === "finance" ? (
            <div className="flex flex-col gap-4">
              <SectionTitle icon={<Landmark className="size-4" />} title="Development finance" />
              <InputField
                label="Max loan-to-cost (LCR)"
                icon={<Gauge className="size-4" />}
                value={inputs.maxLoanToCostPct}
                onChange={set("maxLoanToCostPct")}
                min={0}
                max={90}
                step={1}
                suffix="%"
              />
              <InputField
                label="Max loan-to-value (LVR)"
                icon={<Gauge className="size-4" />}
                value={inputs.maxLoanToValuePct}
                onChange={set("maxLoanToValuePct")}
                min={0}
                max={90}
                step={1}
                suffix="%"
                hint="Specialised rooming-house security is often capped at 50–65% LVR by lenders."
              />
              <InputField
                label="Construction interest rate"
                value={inputs.constructionInterestRatePct}
                onChange={set("constructionInterestRatePct")}
                min={0}
                max={15}
                step={0.05}
                suffix="%"
                format={(v) => v.toFixed(2)}
              />
              <InputField
                label="Average drawn balance during construction"
                value={inputs.averageDrawnPct}
                onChange={set("averageDrawnPct")}
                min={0}
                max={100}
                step={5}
                suffix="%"
                hint="Standard shorthand for progressive drawdown interest — 50% is typical, adjust if your program differs."
              />
              <InputField
                label="Construction period"
                icon={<Hammer className="size-4" />}
                value={inputs.constructionMonths}
                onChange={set("constructionMonths")}
                min={1}
                max={36}
                step={1}
                suffix=" mo"
              />
              <InputField
                label="Lease-up period"
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
                <span className="text-sm font-medium text-foreground">Finance fees</span>
                <LineItemEditor items={inputs.financeFees} onChange={set("financeFees")} addLabel="Add finance fee" idPrefix="fin" />
              </div>

              <SectionTitle icon={<PiggyBank className="size-4" />} title="Stabilised investment loan" />
              <InputField
                label="Investment loan interest rate"
                value={inputs.investmentInterestRatePct}
                onChange={set("investmentInterestRatePct")}
                min={0}
                max={15}
                step={0.05}
                suffix="%"
                format={(v) => v.toFixed(2)}
              />
              <ToggleField
                label="Interest-only"
                checked={inputs.interestOnly}
                onChange={set("interestOnly")}
                hint="Unticked models principal & interest amortising over the loan term."
              />
              <InputField
                label="Loan term"
                value={inputs.loanTermYears}
                onChange={set("loanTermYears")}
                min={5}
                max={30}
                step={1}
                suffix=" yrs"
              />
              <ToggleField
                label="Refinance at completion"
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

          {activeTab === "income" ? (
            <div className="flex flex-col gap-4">
              <SectionTitle icon={<DoorOpen className="size-4" />} title="Room categories" />
              <RoomCategoryEditor categories={inputs.roomCategories} onChange={set("roomCategories")} />

              <SectionTitle icon={<Gauge className="size-4" />} title="Occupancy & other income" />
              <InputField
                label="Stabilised occupancy"
                value={inputs.stabilisedOccupancyPct}
                onChange={set("stabilisedOccupancyPct")}
                min={50}
                max={100}
                step={1}
                suffix="%"
              />
              <InputField
                label="Vacancy & collection loss (additional)"
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
                label="Other annual income"
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
                label="Annual rent growth"
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

          {activeTab === "expenses" ? (
            <div className="flex flex-col gap-4">
              <SectionTitle icon={<Receipt className="size-4" />} title="Operating expenses" />
              <InputField
                label="Management fee"
                value={inputs.managementFeePct}
                onChange={set("managementFeePct")}
                min={0}
                max={30}
                step={0.5}
                suffix="% of EGI"
                format={(v) => v.toFixed(1)}
              />
              <InputField
                label="Variable expenses (utilities, cleaning, maintenance)"
                value={inputs.variableExpensePct}
                onChange={set("variableExpensePct")}
                min={0}
                max={40}
                step={0.5}
                suffix="% of EGI"
                format={(v) => v.toFixed(1)}
              />
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">Fixed expenses (annual)</span>
                <LineItemEditor items={inputs.fixedExpenses} onChange={set("fixedExpenses")} addLabel="Add fixed expense" idPrefix="fix" />
              </div>
              <InputField
                label="Capital replacement reserve per room"
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
              <InputField
                label="Operating cost inflation"
                value={inputs.expenseInflationPct}
                onChange={set("expenseInflationPct")}
                min={0}
                max={10}
                step={0.5}
                suffix="%"
                format={(v) => v.toFixed(1)}
              />
            </div>
          ) : null}

          {activeTab === "tax" ? (
            <div className="flex flex-col gap-4">
              <SectionTitle icon={<Percent className="size-4" />} title="GST" />
              <ToggleField label="Registered for GST" checked={inputs.gstRegistered} onChange={set("gstRegistered")} />
              <SelectField
                label="GST classification"
                value={inputs.gstClassification}
                onChange={set("gstClassification")}
                options={(Object.keys(GST_CLASSIFICATION_LABELS) as GstClassification[]).map((v) => ({
                  value: v,
                  label: GST_CLASSIFICATION_LABELS[v],
                }))}
                hint="Whether a rooming house is commercial residential premises for GST depends on its physical & operational characteristics, not its name — confirm with a GST adviser."
              />

              <SectionTitle icon={<ClipboardList className="size-4" />} title="Ownership & tax" />
              <SelectField
                label="Ownership entity"
                value={inputs.ownershipEntity}
                onChange={set("ownershipEntity")}
                options={(Object.keys(OWNERSHIP_ENTITY_LABELS) as OwnershipEntity[]).map((v) => ({
                  value: v,
                  label: OWNERSHIP_ENTITY_LABELS[v],
                }))}
              />
              <InputField
                label="Marginal tax rate"
                value={inputs.marginalTaxRatePct}
                onChange={set("marginalTaxRatePct")}
                min={0}
                max={47}
                step={0.5}
                suffix="%"
                format={(v) => v.toFixed(1)}
              />
              <InputField
                label="Capital works deduction rate"
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
                label="Annual plant & equipment depreciation"
                value={inputs.annualPlantDepreciation}
                onChange={set("annualPlantDepreciation")}
                min={0}
                max={100000}
                step={500}
                prefix="$"
                slider={false}
                hint="Ideally sourced from a quantity surveyor's project-specific depreciation schedule."
              />
            </div>
          ) : null}

          {activeTab === "valuation" ? (
            <div className="flex flex-col gap-4">
              <SectionTitle icon={<LineChart className="size-4" />} title="Valuation method" />
              <SelectField
                label="Valuation method"
                value={inputs.valuationMethod}
                onChange={set("valuationMethod")}
                options={[
                  { value: "capitalisation" as ValuationMethod, label: "Capitalisation of net income" },
                  { value: "value-per-room" as ValuationMethod, label: "Value per room" },
                  { value: "blended" as ValuationMethod, label: "Blended (average of both)" },
                ]}
              />
              <InputField
                label="Capitalisation rate — low"
                value={inputs.capRateLow}
                onChange={set("capRateLow")}
                min={3}
                max={12}
                step={0.1}
                suffix="%"
                format={(v) => v.toFixed(1)}
              />
              <InputField
                label="Capitalisation rate — base"
                value={inputs.capRateBase}
                onChange={set("capRateBase")}
                min={3}
                max={12}
                step={0.1}
                suffix="%"
                format={(v) => v.toFixed(1)}
              />
              <InputField
                label="Capitalisation rate — high"
                value={inputs.capRateHigh}
                onChange={set("capRateHigh")}
                min={3}
                max={12}
                step={0.1}
                suffix="%"
                format={(v) => v.toFixed(1)}
              />
              <InputField
                label="Value per room"
                value={inputs.valuePerRoomBase}
                onChange={set("valuePerRoomBase")}
                min={0}
                max={400000}
                step={2500}
                prefix="$"
                slider={false}
              />

              <SectionTitle icon={<TrendingUp className="size-4" />} title="Long-term hold & exit" />
              <InputField
                label="Property value growth"
                value={inputs.propertyValueGrowthPct}
                onChange={set("propertyValueGrowthPct")}
                min={0}
                max={10}
                step={0.5}
                suffix="%"
                format={(v) => v.toFixed(1)}
              />
              <InputField
                label="Exit cap rate movement"
                value={inputs.exitCapRateMovementBps}
                onChange={set("exitCapRateMovementBps")}
                min={-200}
                max={200}
                step={10}
                suffix=" bps"
                hint="Positive = softer (higher) exit cap rate than today's base rate."
              />
              <InputField
                label="Selling costs"
                value={inputs.sellingCostsPct}
                onChange={set("sellingCostsPct")}
                min={0}
                max={8}
                step={0.25}
                suffix="%"
                format={(v) => v.toFixed(2)}
              />
              <InputField
                label="Investor discount rate (for NPV)"
                value={inputs.discountRatePct}
                onChange={set("discountRatePct")}
                min={0}
                max={20}
                step={0.5}
                suffix="%"
                format={(v) => v.toFixed(1)}
              />

              <SectionTitle icon={<Target className="size-4" />} title="Investor targets" />
              <InputField
                label="Minimum development margin"
                value={inputs.minDevelopmentMarginPct}
                onChange={set("minDevelopmentMarginPct")}
                min={0}
                max={40}
                step={1}
                suffix="%"
              />
              <InputField
                label="Minimum net yield on cost"
                value={inputs.minNetYieldPct}
                onChange={set("minNetYieldPct")}
                min={0}
                max={15}
                step={0.5}
                suffix="%"
                format={(v) => v.toFixed(1)}
              />
              <InputField
                label="Minimum cash-on-cash return"
                value={inputs.minCashOnCashPct}
                onChange={set("minCashOnCashPct")}
                min={0}
                max={20}
                step={0.5}
                suffix="%"
                format={(v) => v.toFixed(1)}
              />
              <InputField
                label="Minimum DSCR"
                value={inputs.minDSCR}
                onChange={set("minDSCR")}
                min={1}
                max={2}
                step={0.05}
                suffix="x"
                format={(v) => v.toFixed(2)}
              />
              <InputField
                label="Maximum completed LVR"
                value={inputs.maxCompletedLvrPct}
                onChange={set("maxCompletedLvrPct")}
                min={30}
                max={90}
                step={1}
                suffix="%"
              />
              <InputField
                label="Minimum 5-year IRR"
                value={inputs.minIRRPct}
                onChange={set("minIRRPct")}
                min={0}
                max={30}
                step={1}
                suffix="%"
              />
              <InputField
                label="Minimum 10-year equity multiple"
                value={inputs.minEquityMultiple}
                onChange={set("minEquityMultiple")}
                min={1}
                max={4}
                step={0.1}
                suffix="x"
                format={(v) => v.toFixed(1)}
              />
              <InputField
                label="Maximum equity available"
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
        </div>

        {/* ---------------------------- RESULTS ---------------------------- */}
        <div className="flex flex-col gap-6">
          <section
            className={cn(
              "flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-5",
              overallStatusTone[results.overallStatus] ?? "border-border bg-card",
            )}
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
            <section className="flex flex-col gap-2 rounded-2xl border border-warning/40 bg-warning/10 p-5">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <TriangleAlert className="size-4 text-warning" />
                Warnings
              </div>
              <ul className="flex flex-col gap-1.5">
                {results.warnings.map((w) => (
                  <li key={w} className="text-sm leading-relaxed text-foreground text-pretty">
                    • {w}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Headline dashboard */}
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
              help={
                <>
                  <p>Blends the capitalisation-of-income method (stabilised NOI ÷ base cap rate) with a value-per-room check.</p>
                  <p>Not a formal valuation — confirm with an independent registered valuer before relying on it.</p>
                </>
              }
              helpTitle="How is completion valuation calculated?"
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
              help={
                <p>
                  Annual pre-tax cash flow (NOI less debt service) divided by peak investor equity — the cash return on the money
                  you actually put in.
                </p>
              }
              helpTitle="What is cash-on-cash return?"
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
              help={
                <p>
                  Internal rate of return on the equity held over the long-term hold, using after-tax cash flows plus a modelled
                  sale at the exit capitalisation rate.
                </p>
              }
              helpTitle="What is the IRR here?"
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

          {/* Cost & income breakdown */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 md:p-6">
              <h3 className="font-semibold">Total development cost</h3>
              <Row label="Total acquisition cost" value={formatCurrency(results.totalAcquisitionCost)} />
              <Row label="Total development works" value={formatCurrency(results.totalDevelopmentWorks)} />
              <Row label="Finance & holding costs (incl. lease-up deficit)" value={formatCurrency(results.totalFinanceAndHoldingCosts)} />
              <Row label="— construction interest" value={formatCurrency(results.constructionInterest)} />
              <Row label="— finance fees" value={formatCurrency(results.financeFeesTotal)} />
              <Row label="— estimated lease-up deficit" value={formatCurrency(results.leaseUpDeficit)} />
              <Row label="Total development cost" value={formatCurrency(results.totalDevelopmentCost)} strong />
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 md:p-6">
              <h3 className="font-semibold">Stabilised operating result</h3>
              <Row label="Gross potential room income" value={`${formatCurrency(results.grossPotentialAnnualRoomIncome)}/yr`} />
              <Row label="Effective gross income" value={`${formatCurrency(results.effectiveGrossIncome)}/yr`} />
              <Row label="Total operating expenses" value={`${formatCurrency(results.totalOperatingExpenses)}/yr`} />
              <Row label="Net operating income" value={`${formatCurrency(results.netOperatingIncome)}/yr`} strong />
              <Row label="Annual debt service" value={`${formatCurrency(results.annualDebtService)}/yr`} />
              <Row
                label="Pre-tax cash flow"
                value={`${formatCurrency(results.preTaxCashFlow)}/yr`}
                tone={results.preTaxCashFlow >= 0 ? "positive" : "negative"}
              />
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
                <p className="pt-1 text-xs text-muted-foreground leading-relaxed">
                  A tax loss of {formatCurrency(results.taxLossCarriedForward)}/yr is estimated — this is not assumed to be an
                  immediate cash refund; usability depends on your entity and other income.
                </p>
              ) : null}
            </div>
          </section>

          {/* Break-even */}
          <section className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-4 md:p-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Operating break-even occupancy</span>
              <span className="text-lg font-bold tabular-nums">{formatPercent(results.breakEvenOccupancyPct)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Debt-service break-even occupancy</span>
              <span className="text-lg font-bold tabular-nums">{formatPercent(results.debtServiceBreakEvenOccupancyPct)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Operating break-even weekly rent</span>
              <span className="text-lg font-bold tabular-nums">{formatCurrency(results.breakEvenWeeklyRent)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Debt-service break-even weekly rent</span>
              <span className="text-lg font-bold tabular-nums">{formatCurrency(results.debtServiceBreakEvenWeeklyRent)}</span>
            </div>
          </section>

          {/* Investor targets traffic light */}
          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex items-center gap-2">
              <Target className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Investor targets</h2>
            </div>
            <div className="flex flex-col divide-y divide-border/60">
              {results.targets.map((t) => (
                <div key={t.key} className="flex flex-wrap items-center justify-between gap-2 py-2">
                  <span className="text-sm text-foreground">{t.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {t.actualLabel} <span className="opacity-60">(target {t.targetLabel})</span>
                    </span>
                    <StatusDot status={t.status} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Long-term projection */}
          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CalendarClock className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Long-term hold projection</h2>
              </div>
              <div className="flex rounded-lg border border-input bg-background p-1">
                {[5, 10].map((yrs) => (
                  <button
                    key={yrs}
                    type="button"
                    onClick={() => setProjectionYears(yrs as 5 | 10)}
                    className={cn(
                      "rounded-md px-3 py-1 text-xs font-semibold transition-colors",
                      projectionYears === yrs ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {yrs} years
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
                    <tr key={row.year} className="border-b border-border/50 last:border-0">
                      <td className="py-1.5 pr-3 font-medium">{row.year}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.effectiveGrossIncome)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.operatingExpenses)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums font-semibold">{formatCurrency(row.netOperatingIncome)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.debtService)}</td>
                      <td
                        className={cn(
                          "py-1.5 pr-3 text-right tabular-nums",
                          row.preTaxCashFlow >= 0 ? "text-success" : "text-destructive",
                        )}
                      >
                        {formatCurrency(row.preTaxCashFlow)}
                      </td>
                      <td
                        className={cn(
                          "py-1.5 pr-3 text-right tabular-nums",
                          row.afterTaxCashFlow >= 0 ? "text-success" : "text-destructive",
                        )}
                      >
                        {formatCurrency(row.afterTaxCashFlow)}
                      </td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.propertyValue)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{formatCurrency(row.debtBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Assumes rent grows {formatPercent(inputs.rentGrowthPct)} p.a., expenses inflate {formatPercent(inputs.expenseInflationPct)} p.a.,
              and property value grows {formatPercent(inputs.propertyValueGrowthPct)} p.a. Exit proceeds are modelled at the base
              capitalisation rate {inputs.exitCapRateMovementBps !== 0 ? "adjusted by the exit cap-rate movement" : ""} on the final year&apos;s NOI.
            </p>
          </section>

          {/* Stress testing */}
          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex items-center gap-2">
              <TriangleAlert className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Sensitivity & stress testing</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
                    <tr key={s.label} className={cn("border-b border-border/50 last:border-0", s.label === "Base case" && "bg-accent/40")}>
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

          <p className="text-xs text-muted-foreground leading-relaxed">
            This is an indicative investment-screening tool, not a formal property valuation, construction quote, finance
            approval, development approval, town-planning, building-certification, fire-engineering, legal, accounting, tax or
            GST advice, a depreciation schedule, or a guarantee of rental income, occupancy or investment performance. Figures
            are modelled annually rather than month-by-month, and construction interest, lease-up shortfalls, GST timing and
            depreciation are simplified estimates. Before relying on these results, obtain project-specific advice from a town
            planner, building designer or architect, building certifier, fire engineer, builder, quantity surveyor, property
            manager, registered valuer, finance broker or lender, accountant, tax adviser, solicitor and insurance broker.
          </p>
        </div>
      </div>
    </div>
  )
}
