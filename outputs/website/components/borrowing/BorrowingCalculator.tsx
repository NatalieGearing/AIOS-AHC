"use client"

import type React from "react"
import { useMemo, useState } from "react"
import {
  Banknote,
  Building2,
  CalendarClock,
  ChevronDown,
  CreditCard,
  DoorOpen,
  Gauge,
  Hammer,
  Landmark,
  LineChart,
  Percent,
  PiggyBank,
  Receipt,
  RotateCcw,
  Scale,
  ShoppingCart,
  TrendingUp,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react"
import {
  buildProjection,
  calculate,
  DEFAULT_INPUTS,
  formatCurrency,
  formatDate,
  formatPercent,
  incomeTaxEstimate,
  qldTransferDuty,
  type CalculatorInputs,
  type FundingMode,
} from "@/lib/borrowing-calculations"
import { InputField } from "./input-field"
import { MetricCard, badgeStyles } from "./metric-card"
import { CashflowComparison } from "./cashflow-comparison"
import { LendingCaps } from "./lending-caps"
import { HelpPopover } from "./help-popover"
import { TimeSeriesChart, formatCurrencyCompact } from "./projection-chart"
import { cn } from "@/lib/utils"

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border pb-2">
      <span className="text-primary">{icon}</span>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">{title}</h3>
    </div>
  )
}

/** Clickable stage header — expands/collapses its section instead of everything scrolling as one long list. */
function StageHeader({
  icon,
  title,
  open,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  open: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className="flex w-full items-center justify-between gap-2 border-b border-border pb-2 text-left"
    >
      <span className="flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">{title}</h3>
      </span>
      <ChevronDown
        className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
      />
    </button>
  )
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex rounded-lg border border-input bg-background p-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              value === opt.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={value === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {hint ? <p className="text-xs text-muted-foreground leading-relaxed">{hint}</p> : null}
    </div>
  )
}

const capLabels: Record<string, string> = {
  cost: "loan-to-cost test",
  value: "loan-to-value test",
  icr: "interest-cover (ICR) test",
  serviceability: "personal serviceability test",
}

export function BorrowingCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS)
  const [openStage, setOpenStage] = useState<string | null>("costs")
  const toggleStage = (key: string) => setOpenStage((prev) => (prev === key ? null : key))
  const results = useMemo(() => calculate(inputs), [inputs])
  const projection = useMemo(() => buildProjection(inputs, results), [inputs, results])

  const set =
    <K extends keyof CalculatorInputs>(key: K) =>
    (value: CalculatorInputs[K]) =>
      setInputs((prev) => ({ ...prev, [key]: value }))

  const setNum =
    <K extends keyof CalculatorInputs>(key: K) =>
    (value: number) =>
      setInputs((prev) => ({ ...prev, [key]: value }))

  const dutyValue = inputs.autoTransferDuty ? qldTransferDuty(inputs.landCost) : inputs.transferDuty
  const depositCovers = results.depositSurplus >= 0
  const marginHealthy = results.developmentMarginPct >= 15
  const isIncome = inputs.fundingMode === "income"
  const isProject = !isIncome
  const netYieldTier: { text: string; tone: "warning" | "positive" | "primary" } =
    results.netYield >= 10
      ? { text: "Very Strong", tone: "primary" }
      : results.netYield >= 6
        ? { text: "Solid", tone: "positive" }
        : { text: "Thin", tone: "warning" }

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-8 md:px-6 lg:py-12">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Building2 className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold leading-tight text-balance md:text-3xl">
              Rooming Accommodation Borrowing Calculator
            </h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        {/* Inputs */}
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 md:p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Scenario</h2>
            <button
              type="button"
              onClick={() => setInputs(DEFAULT_INPUTS)}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
          </div>

          {/* Funding mode */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              How is this funded?
            </span>
            <div className="flex rounded-xl border border-input bg-background p-1">
              {(
                [
                  { value: "project", label: "Against The Project" },
                  { value: "income", label: "Against My Income" },
                ] as { value: FundingMode; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    set("fundingMode")(opt.value)
                    if (opt.value === "income") setOpenStage("income")
                  }}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold leading-tight transition-colors",
                    inputs.fundingMode === opt.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={inputs.fundingMode === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isIncome
                ? "How much you can borrow depends on you — your own income, plus a conservative share of the rent, has to be enough to cover the repayments. The rental income still helps, but you're personally on the hook for the loan, not the property."
                : "The property carries the debt, not you personally. How much you can borrow comes down to whichever limit bites hardest: how much of the build cost the lender covers, how much of the property's value they'll lend against, or whether the rental income is enough to cover repayments."}
            </p>
          </div>

          {/* Your income & commitments (income mode only) */}
          {isIncome ? (
            <div className="flex flex-col gap-4">
              <StageHeader
                icon={<Wallet className="size-4" />}
                title="Your income & commitments"
                open={openStage === "income"}
                onClick={() => toggleStage("income")}
              />
              {openStage === "income" ? (
              <>
              <InputField
                label="Your Gross Income"
                icon={<Wallet className="size-4" />}
                value={inputs.grossIncome}
                onChange={setNum("grossIncome")}
                min={0}
                max={400000}
                step={5000}
                prefix="$"
                suffix="/yr"
                slider={false}
                hint={`After-tax equivalent: ${formatCurrency(
                  Math.max(0, inputs.grossIncome) - incomeTaxEstimate(inputs.grossIncome),
                )}/yr.`}
              />
              <InputField
                label="Partner / Other Gross Income"
                icon={<Users className="size-4" />}
                value={inputs.partnerIncome}
                onChange={setNum("partnerIncome")}
                min={0}
                max={400000}
                step={5000}
                prefix="$"
                suffix="/yr"
                slider={false}
              />
              <InputField
                label="Living Expenses"
                icon={<ShoppingCart className="size-4" />}
                value={inputs.livingExpensesMonthly}
                onChange={setNum("livingExpensesMonthly")}
                min={1000}
                max={12000}
                step={100}
                prefix="$"
                suffix="/mo"
                slider={false}
                minWarning="$1,000 is the HEM benchmark, so the calculator won't accept anything less — it will revert to $1,000 automatically."
                hint="Lenders floor this at a HEM benchmark — be realistic."
                hintHelpTitle="What is the HEM benchmark?"
                hintHelp={
                  <>
                    <p>
                      <strong>HEM</strong>{" "}(the Household Expenditure Measure) is a benchmark of typical minimum
                      household living costs that Australian lenders use to sanity-check the expenses you declare when
                      working out how much you can borrow.
                    </p>
                    <p>
                      It&apos;s derived from the Australian Bureau of Statistics&apos; Household Expenditure Survey. It
                      combines a modest &ldquo;basics&rdquo; level of essential spending (food, utilities, transport,
                      medical) with median spending on everyday discretionary items, then scales that to your household
                      — your income band, whether you&apos;re single or a couple, and how many dependants you have — and
                      updates it for inflation.
                    </p>
                    <p>
                      Crucially, lenders assess your serviceability on the <strong>higher</strong>{" "}of the expenses you
                      declare or the HEM figure — so entering a number below the benchmark won&apos;t increase your
                      borrowing capacity. This calculator applies a simplified $1,000/month floor as a stand-in for that
                      benchmark.
                    </p>
                  </>
                }
              />
              <InputField
                label="Existing Loan Repayments"
                icon={<CreditCard className="size-4" />}
                value={inputs.existingDebtMonthly}
                onChange={setNum("existingDebtMonthly")}
                min={0}
                max={15000}
                step={100}
                prefix="$"
                suffix="/mo"
                slider={false}
                hint="Mortgages, car & personal loans."
              />
              <InputField
                label="Credit Card Limits"
                icon={<CreditCard className="size-4" />}
                value={inputs.cardLimits}
                onChange={setNum("cardLimits")}
                min={0}
                max={100000}
                step={1000}
                prefix="$"
                slider={false}
                hint="Assessed at 3.8% of the limit per month, whatever the balance."
              />
              <InputField
                label="Rent Shading"
                icon={<Percent className="size-4" />}
                value={inputs.rentShadePct}
                onChange={setNum("rentShadePct")}
                min={50}
                max={90}
                step={1}
                suffix="%"
                format={(v) => v.toFixed(0)}
                hint="Lenders count only part of gross rent toward serviceability — 80% is typical."
              />
              </>
              ) : null}
            </div>
          ) : null}

          {/* Development costs */}
          <div className="flex flex-col gap-4">
            <StageHeader
              icon={<Hammer className="size-4" />}
              title="Development costs"
              open={openStage === "costs"}
              onClick={() => toggleStage("costs")}
            />
            {openStage === "costs" ? (
            <>
            <InputField
              label="Land / Purchase Cost"
              icon={<Landmark className="size-4" />}
              value={inputs.landCost}
              onChange={setNum("landCost")}
              min={0}
              max={2000000}
              step={10000}
              prefix="$"
            />
            <InputField
              label="Construction / Build Cost"
              icon={<Building2 className="size-4" />}
              value={inputs.buildCost}
              onChange={setNum("buildCost")}
              min={0}
              max={2000000}
              step={10000}
              prefix="$"
            />
            <InputField
              label="Contingency"
              icon={<Percent className="size-4" />}
              value={inputs.contingencyPct}
              onChange={setNum("contingencyPct")}
              min={0}
              max={20}
              step={0.5}
              suffix="%"
              format={(v) => v.toFixed(1)}
              hint="Applied to construction cost."
              hintHelpTitle="What is contingency?"
              hintHelp={
                <>
                  <p>
                    <strong>Contingency</strong>{" "}is a buffer set aside to cover the unexpected costs that almost every
                    build runs into — site conditions you couldn&apos;t see (rock, soft soil, drainage), material and
                    labour price rises, design tweaks, and council-driven variations.
                  </p>
                  <p>
                    It&apos;s calculated as a percentage of your <strong>construction / build cost</strong>{" "}(not the
                    land). At a typical 5%, a $650,000 build carries a $32,500 buffer. Most builders and lenders work on{" "}
                    <strong>5–10%</strong>{" "}— the earlier and less certain the design, the higher you&apos;d set it.
                  </p>
                  <p>
                    It&apos;s factored in because construction rarely lands exactly on the original quote. Without a
                    buffer, any overrun comes straight out of your equity or stalls the build — so lenders expect to see
                    one in the cost base before they&apos;ll size the loan.
                  </p>
                </>
              }
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground leading-tight text-pretty">
                  <span className="text-muted-foreground">
                    <Scale className="size-4" />
                  </span>
                  Transfer (Stamp) Duty
                </label>
                <div className="flex shrink-0 items-center rounded-md border border-input bg-muted px-2.5 py-1 text-sm font-semibold tabular-nums text-foreground">
                  {formatCurrency(qldTransferDuty(inputs.landCost))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                Auto-calculated from your land / purchase cost on the QLD transfer duty schedule.{" "}
                <HelpPopover
                  label="Transfer (stamp) duty"
                  title="What is transfer (stamp) duty?"
                  triggerClassName="text-muted-foreground align-middle"
                >
                  <p>
                    <strong>Transfer duty</strong>{" "}— commonly called stamp duty — is a state government tax you pay when
                    you buy land or property. It&apos;s one of the larger up-front costs of acquiring a site.
                  </p>
                  <p>
                    It&apos;s calculated on a sliding scale applied to the <strong>land / purchase price</strong>: the
                    higher the value, the higher the duty. This calculator applies the Queensland general/investor
                    transfer-duty schedule to your land cost automatically, so it updates whenever you change the land
                    figure and isn&apos;t edited by hand.
                  </p>
                  <p>
                    It&apos;s factored in because it&apos;s a real, unavoidable cost of settling on the land. It has to
                    be funded as part of the project, and lenders include it in the cost base when sizing the loan.
                  </p>
                </HelpPopover>
              </div>
            </div>
            </>
            ) : null}
          </div>

          {/* Rental income */}
          <div className="flex flex-col gap-4">
            <StageHeader
              icon={<DoorOpen className="size-4" />}
              title="Rental income"
              open={openStage === "rental"}
              onClick={() => toggleStage("rental")}
            />
            {openStage === "rental" ? (
            <>
            <InputField
              label="Number of Rooms"
              icon={<DoorOpen className="size-4" />}
              value={inputs.numberOfRooms}
              onChange={setNum("numberOfRooms")}
              min={1}
              max={20}
              step={1}
            />
            <InputField
              label="Weekly Rent Per Room"
              icon={<Banknote className="size-4" />}
              value={inputs.weeklyRentPerRoom}
              onChange={setNum("weeklyRentPerRoom")}
              min={100}
              max={600}
              step={5}
              prefix="$"
            />
            <InputField
              label="Occupancy Rate"
              icon={<Gauge className="size-4" />}
              value={inputs.occupancyRate}
              onChange={setNum("occupancyRate")}
              min={50}
              max={100}
              step={1}
              suffix="%"
              hint={`Modelling ${(100 - inputs.occupancyRate).toFixed(0)}% vacancy.`}
            />
            <InputField
              label="Operating Expenses"
              icon={<Receipt className="size-4" />}
              value={inputs.expenseRate}
              onChange={setNum("expenseRate")}
              min={0}
              max={60}
              step={1}
              suffix="%"
              hint="Share of collected rent. Rooming houses carry utilities, cleaning, higher management & insurance — under 30% is optimistic."
              hintHelpTitle="What are operating expenses?"
              hintHelp={
                <>
                  <p>
                    <strong>Operating expenses</strong>{" "}are the ongoing running costs once the property is tenanted,
                    entered here as a share of the rent you collect. For rooming accommodation they typically cover
                    utilities (usually landlord-paid), cleaning of common areas, property management, insurance, council
                    rates, repairs &amp; maintenance, and compliance costs like fire safety and certifications.
                  </p>
                  <p>
                    They matter for borrowing power because they drive your{" "}
                    <strong>net operating income (NOI = collected rent − expenses)</strong>{" "}— the figure lenders and
                    valuers actually lend against. Higher expenses mean a lower NOI, which reduces how much you can
                    borrow through two channels: the <strong>valuation</strong>{" "}(as-if-complete value = NOI ÷ cap rate)
                    and the <strong>interest-cover test</strong>{" "}(NOI ÷ the required cover at the assessed rate).
                  </p>
                  <p>
                    That&apos;s why under 30% is optimistic — understating expenses inflates your NOI and makes both the
                    valuation and your borrowing capacity look stronger than they really are.
                  </p>
                </>
              }
            />
            </>
            ) : null}
          </div>

          {/* Valuation & finance */}
          <div className="flex flex-col gap-4">
            <StageHeader
              icon={<LineChart className="size-4" />}
              title="Valuation & finance"
              open={openStage === "finance"}
              onClick={() => toggleStage("finance")}
            />
            {openStage === "finance" ? (
            <>
            <InputField
              label="Deposit / Equity Available"
              icon={<PiggyBank className="size-4" />}
              value={inputs.deposit}
              onChange={setNum("deposit")}
              min={0}
              max={1500000}
              step={5000}
              prefix="$"
            />
            <InputField
              label="Loan Term"
              icon={<CalendarClock className="size-4" />}
              value={inputs.loanTermYears}
              onChange={setNum("loanTermYears")}
              min={5}
              max={30}
              step={1}
              suffix=" yrs"
            />
            <InputField
              label="Interest Rate"
              icon={<Percent className="size-4" />}
              value={inputs.interestRate}
              onChange={setNum("interestRate")}
              min={3}
              max={12}
              step={0.05}
              suffix="%"
              format={(v) => v.toFixed(2)}
            />
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-medium text-foreground leading-tight text-pretty">Repayment Type</label>
              <div className="flex rounded-lg border border-input bg-background p-1">
                <button
                  type="button"
                  onClick={() => set("repaymentType")("interest_only")}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    inputs.repaymentType === "interest_only"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={inputs.repaymentType === "interest_only"}
                >
                  Interest Only
                </button>
                <button
                  type="button"
                  onClick={() => set("repaymentType")("principal_and_interest")}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    inputs.repaymentType === "principal_and_interest"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={inputs.repaymentType === "principal_and_interest"}
                >
                  Principal &amp; Interest
                </button>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {inputs.repaymentType === "interest_only"
                  ? `Repayments cover interest only, ${formatCurrency(results.weeklyRepayment)}/wk — the loan balance doesn't reduce.`
                  : `Repayments cover principal and interest — the loan pays down over the ${Math.round(inputs.loanTermYears)}-year term.`}{" "}
                <HelpPopover
                  label="Repayment Type"
                  title="Principal & Interest vs Interest Only"
                  triggerClassName="text-muted-foreground align-middle"
                >
                  <p>
                    <strong>Principal &amp; Interest (P&amp;I)</strong>{" "}repayments pay down the loan balance over
                    the loan term, so your equity grows as the debt shrinks — this is the standard, lender-default
                    repayment structure.
                  </p>
                  <p>
                    <strong>Interest Only (IO)</strong>{" "}repayments cover just the interest — the loan balance
                    doesn&apos;t reduce. Weekly repayments are lower, freeing up cashflow, but you build no equity
                    from paying down debt — only from capital growth. Real IO loans usually revert to P&amp;I after
                    a fixed period (commonly 1–5 years); this calculator models interest-only for the full loan
                    term as a simplification.
                  </p>
                  <p>
                    This choice flows through to your weekly repayment, cashflow, and the Long-Term Projection
                    charts below.
                  </p>
                </HelpPopover>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-end justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground leading-tight text-pretty">
                  <span className="text-muted-foreground">
                    <TrendingUp className="size-4" />
                  </span>
                  Assessment Buffer
                </label>
                <div className="flex shrink-0 items-center rounded-md border border-input bg-background px-2.5 py-1 text-sm font-semibold tabular-nums text-muted-foreground">
                  2.00%
                </div>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                Fixed at 2% and stress-tests the ICR at {results.assessmentRate.toFixed(2)}% (rate + buffer).{" "}
                <HelpPopover
                  label="Assessment Buffer"
                  title="Assessment Buffer"
                  triggerClassName="text-muted-foreground align-middle"
                >
                  <p>
                    <strong>Assessment buffer</strong>{" "}is added on top of the actual interest rate to get the{" "}
                    <strong>assessment rate</strong>{" "}— the rate lenders use to stress-test whether you can service
                    the loan, not what you&apos;ll actually pay.
                  </p>
                  <p>
                    It affects borrowing power because the assessment rate drives the{" "}
                    <strong>interest-cover test</strong>{" "}(NOI ÷ required cover at the assessed rate). A higher
                    buffer means a higher assessed rate, a higher assessed interest bill, and less headroom under
                    that test — which lowers the loan the ICR channel will support, even though your real
                    repayments at the actual rate are much lower.
                  </p>
                  <p>
                    We use a fixed 2 percentage points on top of the actual rate, in line with typical lender
                    practice.
                  </p>
                </HelpPopover>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-end justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground leading-tight text-pretty">
                  <span className="text-muted-foreground">
                    <Percent className="size-4" />
                  </span>
                  Capitalisation Rate
                </label>
                <div className="flex shrink-0 items-center rounded-md border border-input bg-background px-2.5 py-1 text-sm font-semibold tabular-nums text-muted-foreground">
                  7.0%
                </div>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                Fixed at 7% — drives the as-if-complete valuation (NOI ÷ cap rate).{" "}
                <HelpPopover
                  label="Capitalisation Rate"
                  title="Capitalisation Rate"
                  triggerClassName="text-muted-foreground align-middle"
                >
                  <p>
                    <strong>Capitalisation rate (cap rate)</strong>{" "}is the annual net operating income a property
                    generates, expressed as a percentage of its value: cap rate = NOI ÷ value. Rearranged, it&apos;s
                    how the as-if-complete valuation is calculated here: <strong>value = NOI ÷ cap rate</strong>.
                  </p>
                  <p>
                    It matters for borrowing power because it&apos;s a divisor on your income — a small change moves
                    the valuation a lot more than the interest rate does, which flows straight through to the
                    loan-to-value test.
                  </p>
                  <p>
                    Rooming accommodation is valued more like a specialist commercial asset than a standard house,
                    so it typically carries a higher cap rate (~6–9%) than mainstream residential (~3–6%) —
                    reflecting fewer buyers and a more management-intensive asset. 7% is a reasonable planning
                    assumption; confirm a current, location-specific rate with a valuer before relying on it.
                  </p>
                </HelpPopover>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-end justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground leading-tight text-pretty">
                  <span className="text-muted-foreground">
                    <TrendingUp className="size-4" />
                  </span>
                  Rent Growth
                </label>
                <div className="flex shrink-0 items-center rounded-md border border-input bg-background px-2.5 py-1 text-sm font-semibold tabular-nums text-muted-foreground">
                  3.0%
                </div>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                Fixed at 3% p.a. — used to project rent forward in the long-term charts below.{" "}
                <HelpPopover
                  label="Rent Growth"
                  title="Rent Growth"
                  triggerClassName="text-muted-foreground align-middle"
                >
                  <p>
                    <strong>Rent growth</strong>{" "}is the assumed annual increase in gross rent used to project the
                    Rental Income vs Loan Repayments chart forward over the loan term. It doesn&apos;t change any
                    of the borrowing power figures above — those are all based on today&apos;s rent.
                  </p>
                  <p>
                    3% p.a. is a broadly conservative, CPI-adjacent assumption. Actual rent growth varies by
                    location and market cycle and can run well above or below this — treat the projection as
                    indicative, not a forecast.
                  </p>
                </HelpPopover>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-end justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground leading-tight text-pretty">
                  <span className="text-muted-foreground">
                    <TrendingUp className="size-4" />
                  </span>
                  Capital Growth
                </label>
                <div className="flex shrink-0 items-center rounded-md border border-input bg-background px-2.5 py-1 text-sm font-semibold tabular-nums text-muted-foreground">
                  10.0%
                </div>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                Fixed at 10% p.a. — used to project property value and equity forward in the charts below.{" "}
                <HelpPopover
                  label="Capital Growth"
                  title="Capital Growth"
                  triggerClassName="text-muted-foreground align-middle"
                >
                  <p>
                    <strong>Capital growth</strong>{" "}is the assumed annual increase in the property&apos;s value,
                    starting from the as-if-complete valuation. It drives the Equity Growth Projection chart —
                    property value climbs while the loan balance amortises down, and the gap between the two is
                    your equity.
                  </p>
                  <p>
                    10% p.a. is an aggressive long-run assumption — actual capital growth for rooming
                    accommodation varies significantly by location and market cycle. Confirm a realistic rate for
                    your location with a valuer or buyer&apos;s agent —
                    this projection is illustrative, not a guarantee.
                  </p>
                </HelpPopover>
              </div>
            </div>
            </>
            ) : null}
          </div>

          {/* Lender policy */}
          <div className="flex flex-col gap-4">
            <StageHeader
              icon={<Landmark className="size-4" />}
              title="Lender policy"
              open={openStage === "lender"}
              onClick={() => toggleStage("lender")}
            />
            {openStage === "lender" ? (
            <>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-end justify-between gap-3">
                <label className="text-sm font-medium text-foreground leading-tight text-pretty">
                  Security Classification
                </label>
                <div className="flex shrink-0 items-center rounded-md border border-input bg-background px-2.5 py-1 text-sm font-semibold text-muted-foreground">
                  Commercial
                </div>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {isIncome ? (
                  "In income mode the loan is serviced by you, so the ICR test is off regardless of classification."
                ) : (
                  <>
                    Runs the ICR income test at 1.75x.{" "}
                    <HelpPopover
                      label="ICR income test"
                      title="ICR income test"
                      triggerClassName="text-muted-foreground align-middle"
                    >
                      <p>
                        The <strong>ICR (interest cover ratio) income test</strong>{" "}checks whether the
                        property&apos;s own net operating income (NOI) is enough to cover the loan&apos;s interest
                        repayments at the assessed rate, by a lender-set safety margin — fixed here at{" "}
                        <strong>1.75x</strong>.
                      </p>
                      <p>
                        <strong>ICR = NOI ÷ interest at the assessed rate.</strong>{" "}If the ratio falls short of
                        1.75x, the loan gets capped down to whatever amount the property&apos;s income can support
                        — even if the loan-to-value or loan-to-cost limits would otherwise allow more.
                      </p>
                      <p>
                        It only applies to commercial-classified security serviced by the property&apos;s own
                        income — not when the loan is serviced against your personal income, which is why
                        switching to &ldquo;Against My Income&rdquo; turns it off.
                      </p>
                    </HelpPopover>{" "}
                    Specialised security like rooming accommodation is often capped at 50–60% LVR.{" "}
                    <HelpPopover
                      label="Specialised security LVR cap"
                      title="Why 50–60% LVR?"
                      triggerClassName="text-muted-foreground align-middle"
                    >
                      <p>
                        Lenders hold <strong>specialised security</strong>{" "}like rooming accommodation to a lower
                        loan-to-value ratio than a standard house because it&apos;s a less liquid,
                        more management-intensive asset — fewer buyers would want it if the lender ever had to
                        repossess and sell it, so there&apos;s less certainty the security alone covers the debt.
                      </p>
                      <p>
                        A 50–60% LVR cap means the lender wants at least 40–50% of the property&apos;s value
                        covered by your equity, not their debt — a bigger buffer against a lower, slower sale if
                        things go wrong.
                      </p>
                      <p>
                        This caps borrowing power independently of the ICR test — even with strong rental income,
                        the loan is limited to whichever is lower: what the LVR cap allows, or what the ICR test
                        supports.
                      </p>
                    </HelpPopover>
                  </>
                )}
              </div>
            </div>
            <InputField
              label="Max Loan-to-Cost (LCR)"
              icon={<Gauge className="size-4" />}
              value={inputs.maxLcr}
              onChange={setNum("maxLcr")}
              min={40}
              max={isIncome ? 95 : 90}
              step={1}
              suffix="%"
            />
            <InputField
              label="Max Loan-to-Value (LVR)"
              icon={<Gauge className="size-4" />}
              value={inputs.maxLvr}
              onChange={setNum("maxLvr")}
              min={40}
              max={isIncome ? 95 : 90}
              step={1}
              suffix="%"
              hint={
                isIncome
                  ? "Owner-serviced residential security often reaches 80–90% (with LMI)."
                  : "Specialised accommodation security is commonly held to 50–60%."
              }
            />
            {isProject ? (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-end justify-between gap-3">
                  <label className="text-sm font-medium text-foreground leading-tight text-pretty">
                    ICR Income Basis
                  </label>
                  <div className="flex shrink-0 items-center rounded-md border border-input bg-background px-2.5 py-1 text-sm font-semibold text-muted-foreground">
                    Modelled NOI
                  </div>
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Uses your modelled net operating income.{" "}
                  <HelpPopover
                    label="Modelled NOI"
                    title="Modelled NOI"
                    triggerClassName="text-muted-foreground align-middle"
                  >
                    <p>
                      <strong>Modelled NOI</strong>{" "}is the net operating income you&apos;ve built up elsewhere in
                      this calculator — gross rent, less your entered occupancy rate and operating expense rate —
                      rather than a blanket, lender-set percentage of gross rent.
                    </p>
                    <p>
                      It&apos;s the income figure used in the ICR test (ICR = NOI ÷ interest at the assessed
                      rate), so it reflects your specific assumptions about vacancy and running costs rather than
                      a standardised lender haircut on gross rent.
                    </p>
                  </HelpPopover>
                </div>
              </div>
            ) : null}
            </>
            ) : null}
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-4">
            <StageHeader
              icon={<CalendarClock className="size-4" />}
              title="Timeline"
              open={openStage === "timeline"}
              onClick={() => toggleStage("timeline")}
            />
            {openStage === "timeline" ? (
            <>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="start-date" className="text-sm font-medium text-foreground">
                Project Start
              </label>
              <input
                id="start-date"
                type="date"
                value={inputs.startDate}
                onChange={(e) => setInputs((prev) => ({ ...prev, startDate: e.target.value }))}
                className="rounded-md border border-input bg-background px-2.5 py-1 text-sm tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <InputField
              label="Approval Lead Time"
              icon={<CalendarClock className="size-4" />}
              value={inputs.approvalLeadMonths}
              onChange={setNum("approvalLeadMonths")}
              min={0}
              max={24}
              step={1}
              suffix=" mo"
            />
            <InputField
              label="Construction Duration"
              icon={<Hammer className="size-4" />}
              value={inputs.buildMonths}
              onChange={setNum("buildMonths")}
              min={1}
              max={36}
              step={1}
              suffix=" mo"
              hint="Land facility is drawn for the full build; construction averaged at 50%."
              hintHelpTitle="Land vs. construction drawdown"
              hintHelp={
                <>
                  <p>
                    This is how interest during the build (holding costs) gets calculated. You&apos;re only
                    charged interest on however much of a loan has actually been drawn down, and land and
                    construction draw very differently.
                  </p>
                  <p>
                    <strong>Land</strong>{" "}is drawn in full on day one to settle the purchase, so interest accrues
                    on 100% of it for the whole build period. <strong>Construction</strong>{" "}is drawn progressively
                    as the builder completes stages (slab, frame, lock-up, fixing, completion), so at the start
                    almost none of it is drawn and by the end nearly all of it is — averaged out, roughly 50% of
                    the construction loan is outstanding at any given time.
                  </p>
                  <p>
                    The calculation reflects this: interest during build = rate × build years ×{" "}
                    (land loan + 0.5 × construction loan). It&apos;s the standard shorthand lenders and quantity
                    surveyors use to approximate real progressive-drawdown interest without overstating it.
                  </p>
                </>
              }
            />
            </>
            ) : null}
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-6">
          {/* Headline metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard
              tone="primary"
              label="Estimated Maximum Loan"
              value={formatCurrency(results.maxLoan)}
              sub={`Set by the ${capLabels[results.bindingCap]}`}
              icon={<TrendingUp className="size-4" />}
            />
            <MetricCard
              label="Deposit Required"
              value={formatCurrency(results.equityRequired)}
              sub={
                depositCovers
                  ? `Deposit covers it +${formatCurrency(results.depositSurplus)}`
                  : `${formatCurrency(results.depositShortfall)} short of your deposit`
              }
              icon={<PiggyBank className="size-4" />}
              tone={depositCovers ? "positive" : "negative"}
              helpTitle="What is equity required?"
              help={
                <>
                  <p>
                    It&apos;s the cash (or equity from another property) <strong>you</strong>{" "}must contribute, because the
                    lender won&apos;t fund the whole project:
                  </p>
                  <p className="font-medium text-foreground">Equity required = Total Development Cost − Maximum loan</p>
                  <p>
                    <strong>Total Development Cost</strong>{" "}is everything needed to finish the build — land,
                    construction, transfer duty and capitalised holding interest, not just land + build.
                  </p>
                  <p>
                    <strong>Maximum loan</strong>{" "}is the lowest of the three lending tests (loan-to-cost, loan-to-value
                    and interest-cover). Whichever test bites hardest sets how much the bank lends, and therefore how
                    much you must cover.
                  </p>
                  <p>
                    The <strong>shortfall/surplus</strong>{" "}line below compares this against the deposit you entered. A
                    shortfall means the deal isn&apos;t fundable as configured — you&apos;d need more cash, a cheaper
                    build, higher rents, or a lender with a higher LVR or lower ICR.
                  </p>
                </>
              }
            />
            <MetricCard
              label="Weekly repayment"
              value={formatCurrency(results.weeklyRepayment)}
              sub={`${formatCurrency(results.monthlyRepayment)}/mo · P&I`}
              icon={<Banknote className="size-4" />}
            />
          </div>

          {/* Rental income & yields */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <MetricCard
              label="Estimated Weekly Rental Income"
              value={formatCurrency(results.weeklyCollected)}
              sub={`Based on ${formatPercent(inputs.occupancyRate, 0)} occupancy`}
              icon={<Banknote className="size-4" />}
            />
            <MetricCard
              label="Estimated Annual Rental Income"
              value={formatCurrency(results.weeklyCollected * 52)}
              sub={`${formatCurrency(results.grossAnnualIncome)}/yr at full occupancy`}
              icon={<Banknote className="size-4" />}
            />
            <MetricCard
              label="Annual cashflow"
              value={`${results.isCashflowPositive ? "+" : "−"}${formatCurrency(Math.abs(results.annualCashflow))}`}
              sub="NOI less P&I repayments"
              tone={results.isCashflowPositive ? "positive" : "negative"}
            />
          </div>

          {/* Cashflow comparison */}
          <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Rental Income vs Loan Repayments</h2>
            </div>
            <CashflowComparison results={results} />
          </section>

          {/* Three lending tests */}
          <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex items-center gap-2">
              <Scale className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Three lending tests</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Lenders size a loan like this against three tests: how much of the <strong>build cost</strong>{" "}they&apos;ll
              cover (loan-to-cost), how much of the finished property&apos;s <strong>value</strong>{" "}they&apos;ll lend
              against (loan-to-value), and whether the <strong>rental income</strong>{" "}is enough to cover repayments
              (interest-cover). Whichever of the three is most restrictive sets your actual borrowing capacity.
            </p>
            <LendingCaps results={results} maxLcr={inputs.maxLcr} maxLvr={inputs.maxLvr} icr={inputs.icr} />
          </section>

          {/* Cost breakdown + valuation */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 md:p-6">
              <h3 className="font-semibold">Total Development Cost</h3>
              <Row label="Land / Purchase" value={formatCurrency(inputs.landCost)} />
              <Row label="Construction" value={formatCurrency(inputs.buildCost)} />
              <Row label="Contingency" value={formatCurrency(results.contingency)} />
              <Row label="Transfer Duty" value={formatCurrency(dutyValue)} />
              <Row label="Holding Interest (Capitalised)" value={formatCurrency(results.holdingInterest)} />
              <Row label="Total Development Cost" value={formatCurrency(results.totalDevelopmentCost)} strong />
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 md:p-6">
              <h3 className="font-semibold">Completed Valuation</h3>
              <Row label="Net Operating Income (NOI)" value={`${formatCurrency(results.noi)}/yr`} />
              <Row label="Cap Rate" value={formatPercent(inputs.capRate)} />
              <Row label="As-if-Complete Value" value={formatCurrency(results.endValue)} strong />
              <Row
                label="Development Margin"
                value={`${results.developmentMargin >= 0 ? "+" : "−"}${formatCurrency(Math.abs(results.developmentMargin))}`}
                tone={results.developmentMargin >= 0 ? "positive" : "negative"}
              />
              <Row
                label="Margin on Cost"
                value={formatPercent(results.developmentMarginPct)}
                tone={marginHealthy ? "positive" : results.developmentMarginPct >= 0 ? "default" : "negative"}
              />
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Developers typically target a margin on cost of 15–20% to justify the risk.
              </p>
            </div>
          </section>

          {/* Ratios at the actual loan */}
          <section className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-4 md:p-6">
            <Stat label="LVR (on value)" value={formatPercent(results.lvrActual)} />
            <Stat label="LCR (on cost)" value={formatPercent(results.lcrActual)} />
            {isIncome ? (
              <>
                <Stat
                  label="Net monthly surplus"
                  value={formatCurrency(results.monthlySurplus)}
                  tone={results.monthlySurplus >= 0 ? "positive" : "negative"}
                />
                <Stat
                  label="Repayment vs surplus"
                  value={
                    results.monthlySurplus > 0
                      ? formatPercent(Math.min(999, (results.monthlyRepayment / results.monthlySurplus) * 100), 0)
                      : "—"
                  }
                />
              </>
            ) : (
              <>
                <Stat label="ICR at your rate" value={`${results.icrActual.toFixed(2)}x`} />
                <Stat label="ICR when assessed" value={`${results.icrAtAssessment.toFixed(2)}x`} />
              </>
            )}
            <Stat
              label="Gross yield"
              value={formatPercent(results.grossYield)}
              helpTitle="What is gross yield?"
              help={
                <>
                  <p>
                    <strong>Gross yield</strong>{" "}is the full rental income the property generates each year, before
                    any expenses or debt costs, expressed as a percentage of the total development cost.
                  </p>
                  <p>
                    <strong>Gross yield = gross annual rent ÷ total development cost.</strong>{" "}It&apos;s calculated
                    here on <strong>cost</strong>, not market value — a common alternative definition uses the
                    completed/as-if-complete value as the denominator instead, so figures you compare against
                    elsewhere may use a different base.
                  </p>
                  <p>
                    It&apos;s the quickest headline number, but the least useful for judging real return — it
                    ignores operating expenses and finance costs entirely. Net yield and cash-on-cash tell you more
                    about what actually lands in your pocket.
                  </p>
                </>
              }
            />
            <Stat
              label="Net yield on cost"
              value={formatPercent(results.netYield)}
              tone={netYieldTier.tone === "primary" ? "positive" : netYieldTier.tone}
              badge={netYieldTier}
              helpTitle="What is net yield on cost?"
              help={
                <>
                  <p>
                    <strong>Net yield on cost</strong>{" "}is the property&apos;s net operating income (rent less
                    operating expenses) expressed as a percentage of the total development cost.
                  </p>
                  <p>
                    <strong>Net yield = NOI ÷ total development cost.</strong>{" "}Unlike gross yield, it accounts for
                    operating expenses (utilities, cleaning, management, insurance, rates) — but still excludes
                    finance costs, so it&apos;s a measure of how the asset performs before debt, not what you
                    personally end up with.
                  </p>
                  <p>
                    It&apos;s a better like-for-like comparison than gross yield when weighing up different
                    projects, since two properties with the same gross rent can have very different expense loads.
                  </p>
                  <p>
                    Rough guide for a rooming accommodation development: under 6% is a{" "}
                    <strong>thin</strong>{" "}margin — you&apos;re leaning on capital growth to make the deal work.
                    6–10% is a <strong>solid</strong>, healthy range. 10%+ is <strong>very strong</strong>{" "}— worth
                    double-checking your rent, occupancy and expense assumptions aren&apos;t overly optimistic when
                    it lands here.
                  </p>
                </>
              }
            />
            <Stat
              label="Cash-on-cash"
              value={formatPercent(results.cashOnCashReturn)}
              tone={results.cashOnCashReturn >= 0 ? "positive" : "negative"}
              helpTitle="What is cash-on-cash return?"
              help={
                <>
                  <p>
                    <strong>Cash-on-cash return</strong>{" "}measures the actual cash profit you receive each year as
                    a percentage of the cash you actually put in — your deposit — rather than the full property
                    value or total cost.
                  </p>
                  <p>
                    <strong>Cash-on-cash = annual cashflow ÷ deposit.</strong>{" "}Annual cashflow here is NOI less the
                    loan&apos;s principal &amp; interest repayments — so, unlike the two yields above, this figure
                    does account for debt costs.
                  </p>
                  <p>
                    It&apos;s the closest of these three to a real &ldquo;return on my money&rdquo; figure, because
                    leverage (borrowing most of the cost) means your cash return can be meaningfully higher or
                    lower than the property&apos;s own yield, depending on whether the deal is positively or
                    negatively geared.
                  </p>
                </>
              }
            />
          </section>

          {/* Insights */}
          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 md:p-6">
            <h3 className="font-semibold">Feasibility insights</h3>
            <div className="flex flex-col gap-2.5">
              <Insight
                ok={depositCovers}
                text={
                  depositCovers
                    ? `Your deposit meets the ${formatCurrency(results.equityRequired)} equity required with ${formatCurrency(results.depositSurplus)} to spare.`
                    : `You need a further ${formatCurrency(results.depositShortfall)} in equity — the lender caps the loan at ${formatCurrency(results.maxLoan)} against a ${formatCurrency(results.totalDevelopmentCost)} cost base.`
                }
              />
              <Insight
                ok
                text={`The ${capLabels[results.bindingCap]} is binding${
                  results.bindingCap === "icr"
                    ? " — as expected for a small rooming build, serviceability bites before asset value."
                    : results.bindingCap === "serviceability"
                      ? " — your income, not the asset, is what limits the loan."
                      : "."
                }`}
              />
              {isIncome ? (
                <Insight
                  ok={results.monthlySurplus > 0}
                  text={
                    results.monthlySurplus > 0
                      ? `After tax, living costs and commitments you have ${formatCurrency(results.monthlySurplus)}/mo to service new debt (incl. ${formatCurrency(results.shadedRentMonthly)}/mo of shaded rent).`
                      : `Your income doesn't cover the assessed repayment — surplus is ${formatCurrency(results.monthlySurplus)}/mo. Raise income, cut commitments, or lean on the project's own serviceability (commercial).`
                  }
                />
              ) : null}
              <Insight
                ok={results.isCashflowPositive}
                text={
                  results.isCashflowPositive
                    ? `Positively geared at ${formatCurrency(results.weeklyCashflow)}/wk on the assessed loan.`
                    : `Negatively geared by ${formatCurrency(Math.abs(results.weeklyCashflow))}/wk before tax.`
                }
              />
              <Insight
                ok={marginHealthy}
                text={`Development margin on cost is ${formatPercent(results.developmentMarginPct)}${
                  marginHealthy ? " — within the 15–20% target band." : ", below the 15% many lenders and developers look for."
                }`}
              />
              <div
                className={cn(
                  "flex items-start gap-2.5 rounded-lg border p-3",
                  results.sunsetRisk
                    ? "border-warning/40 bg-warning/10"
                    : "border-success/40 bg-success/10",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                    results.sunsetRisk ? "bg-warning/20 text-warning" : "bg-success/15 text-success",
                  )}
                >
                  {results.sunsetRisk ? <TriangleAlert className="size-3.5" /> : "✓"}
                </span>
                <p className="text-sm leading-relaxed text-foreground text-pretty">
                  Estimated completion {formatDate(results.completionDate)}.{" "}
                  {results.sunsetRisk
                    ? "This falls after the December 2026 sunset on the accepted-development pathway — the five-room shortcut may no longer apply, changing your approval and consultant costs. Put a date against this risk."
                    : "This lands before the December 2026 sunset on the accepted-development pathway."}
                </p>
              </div>
            </div>
          </section>

          {/* Long-term projection */}
          <section className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex items-center gap-2">
              <LineChart className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Long-Term Projection</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Projected across the full {Math.round(inputs.loanTermYears)}-year loan term using the fixed Rent
              Growth and Capital Growth assumptions above. Repayments are held constant in nominal terms (no
              refinancing or rate change modelled). Illustrative only, not a forecast — see the disclaimer below.
            </p>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-foreground">Loan Balance Over Time</h3>
                <TimeSeriesChart
                  data={projection}
                  series={[{ key: "loanBalance", label: "Loan balance", color: "chart-2" }]}
                  variant="area"
                  formatValue={(v) => formatCurrency(v)}
                  formatValueCompact={formatCurrencyCompact}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-foreground">Rental Income vs Loan Repayments</h3>
                <TimeSeriesChart
                  data={projection}
                  series={[
                    { key: "annualRent", label: "Rental income", color: "chart-1" },
                    { key: "annualRepayment", label: "Loan repayment", color: "chart-2" },
                  ]}
                  variant="lines"
                  formatValue={(v) => formatCurrency(v)}
                  formatValueCompact={formatCurrencyCompact}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-foreground">Equity Growth Projection</h3>
                <TimeSeriesChart
                  data={projection}
                  series={[
                    { key: "loanBalance", label: "Loan balance", color: "chart-2" },
                    { key: "equity", label: "Equity", color: "chart-1" },
                  ]}
                  variant="stacked-area"
                  formatValue={(v) => formatCurrency(v)}
                  formatValueCompact={formatCurrencyCompact}
                />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  By year {projection[projection.length - 1]?.year}, projected equity reaches{" "}
                  <strong className="text-foreground">
                    {formatCurrency(projection[projection.length - 1]?.equity ?? 0)}
                  </strong>{" "}
                  against a projected property value of{" "}
                  <strong className="text-foreground">
                    {formatCurrency(projection[projection.length - 1]?.propertyValue ?? 0)}
                  </strong>
                  .
                </p>
              </div>
            </div>
          </section>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Estimates only, not financial advice. The model sizes debt as the lowest of the applicable lender tests,
            capitalises holding interest (solved iteratively), auto-calculates QLD transfer duty on the general/investor
            schedule, and — in income mode — applies a simplified resident tax scale to derive after-tax serviceability.
            Confirm cap rate, classification and your borrowing capacity against a valuer and a licensed mortgage
            broker before relying on these figures.
          </p>
        </div>
      </div>
    </div>
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
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          "tabular-nums",
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

function Stat({
  label,
  value,
  tone = "default",
  help,
  helpTitle,
  badge,
}: {
  label: string
  value: string
  tone?: "default" | "positive" | "negative" | "warning"
  /** Optional explanation shown in a popover when the "?" icon is clicked. */
  help?: React.ReactNode
  /** Accessible label for the help button. Defaults to "What is <label>?". */
  helpTitle?: string
  /** Optional small pill next to the label, e.g. a tier indicator ("Thin" / "Solid" / "Very Strong"). */
  badge?: { text: string; tone: "warning" | "positive" | "primary" }
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
        {help ? (
          <HelpPopover label={label} title={helpTitle} triggerClassName="text-muted-foreground">
            {help}
          </HelpPopover>
        ) : null}
        {badge ? (
          <span
            className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", badgeStyles[badge.tone])}
          >
            {badge.text}
          </span>
        ) : null}
      </div>
      <span
        className={cn(
          "text-lg font-bold tabular-nums",
          tone === "positive" && "text-success",
          tone === "negative" && "text-destructive",
          (tone === "default" || tone === "warning") && "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  )
}

function Insight({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
          ok ? "bg-success/15 text-success" : "bg-warning/20 text-warning",
        )}
      >
        {ok ? "✓" : "!"}
      </span>
      <p className="text-sm leading-relaxed text-foreground text-pretty">{text}</p>
    </div>
  )
}
