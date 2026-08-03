export type Classification = "commercial" | "residential"
export type IcrIncomeBasis = "modelled" | "shaded"
export type FundingMode = "project" | "income"
export type RepaymentType = "principal_and_interest" | "interest_only"

export interface CalculatorInputs {
  /** Whether the debt is sized against the project or the borrower's income */
  fundingMode: FundingMode

  // Development costs
  landCost: number
  buildCost: number
  /** Construction contingency as a % of build cost */
  contingencyPct: number
  /** QLD transfer duty. Auto-calculated unless the user overrides it. */
  transferDuty: number
  /** When true, transfer duty tracks the QLD general schedule automatically */
  autoTransferDuty: boolean

  // Rental income
  numberOfRooms: number
  weeklyRentPerRoom: number
  /** Occupancy across the year (0-100); vacancy = 100 - occupancy */
  occupancyRate: number
  /** Operating expenses as a % of collected income */
  expenseRate: number

  // Valuation & finance
  /** Capitalisation rate used to derive the as-if-complete valuation (%) */
  capRate: number
  /** Actual quoted interest rate (%) */
  interestRate: number
  /** Whether the actual repayment is principal & interest or interest only */
  repaymentType: RepaymentType
  /** Assessment buffer added to the actual rate for serviceability (%) */
  assessmentBuffer: number
  /** Loan term in years */
  loanTermYears: number
  /** Investor cash / equity available */
  deposit: number
  /** Assumed annual rent growth used in the long-term projection (%) */
  rentGrowthPct: number
  /** Assumed annual property capital growth used in the long-term projection (%) */
  capitalGrowthPct: number

  // Lender policy
  classification: Classification
  /** Maximum loan-to-cost ratio (% of total development cost) */
  maxLcr: number
  /** Maximum loan-to-value ratio (% of as-if-complete valuation) */
  maxLvr: number
  /** Required interest cover ratio (x) */
  icr: number
  /** Whether ICR uses modelled NOI or a blanket lender income shade */
  icrIncomeBasis: IcrIncomeBasis
  /** Blanket income shade applied to gross rent for ICR when shading (%) */
  incomeShadePct: number

  // Personal serviceability (income funding mode)
  /** Applicant gross annual income */
  grossIncome: number
  /** Partner / other applicant gross annual income */
  partnerIncome: number
  /** Household living expenses per month */
  livingExpensesMonthly: number
  /** Existing loan repayments per month */
  existingDebtMonthly: number
  /** Total credit card limits (assessed at 3.8%/mo) */
  cardLimits: number
  /** Share of gross rent counted toward serviceability (%) */
  rentShadePct: number

  // Timeline
  /** ISO date (yyyy-mm-dd) the project commences */
  startDate: string
  /** Approval lead time before construction begins (months) */
  approvalLeadMonths: number
  /** Construction duration (months) */
  buildMonths: number
}

export type CapName = "cost" | "value" | "icr" | "serviceability"

export interface CalculatorResults {
  isIncome: boolean

  // Development cost breakdown
  contingency: number
  costExHolding: number
  holdingInterest: number
  totalDevelopmentCost: number

  // Income
  grossAnnualIncome: number
  collectedIncome: number
  annualOpex: number
  noi: number
  weeklyCollected: number

  // Valuation
  endValue: number
  developmentMargin: number
  developmentMarginPct: number

  // Lending caps
  assessmentRate: number
  noiForIcr: number
  costCap: number
  valueCap: number
  icrCap: number
  icrApplies: boolean
  serviceabilityCap: number
  maxLoan: number
  bindingCap: CapName

  // Personal serviceability
  netMonthlyPersonal: number
  shadedRentMonthly: number
  monthlyCommitments: number
  monthlySurplus: number

  // Position
  loanRequired: number
  actualLoan: number
  equityRequired: number
  depositShortfall: number
  depositSurplus: number

  // Ratios on the actual loan
  lvrActual: number
  lcrActual: number
  icrActual: number
  icrAtAssessment: number

  // Repayments (on the actual loan)
  weeklyRepayment: number
  monthlyRepayment: number
  annualRepayment: number
  interestOnlyWeekly: number

  // Yields & returns
  grossYield: number
  netYield: number
  yieldOnEndValue: number
  weeklyCashflow: number
  annualCashflow: number
  isCashflowPositive: boolean
  cashOnCashReturn: number
  breakEvenOccupancy: number

  // Timeline
  completionDate: Date
  sunsetDate: Date
  sunsetRisk: boolean
}

export const SUNSET_DATE = new Date("2026-12-31T00:00:00")

export const DEFAULT_INPUTS: CalculatorInputs = {
  fundingMode: "project",

  landCost: 700000,
  buildCost: 650000,
  contingencyPct: 1,
  transferDuty: 0,
  autoTransferDuty: true,

  numberOfRooms: 5,
  weeklyRentPerRoom: 525,
  occupancyRate: 92,
  expenseRate: 20,

  capRate: 7,
  interestRate: 7.5,
  repaymentType: "interest_only",
  assessmentBuffer: 2,
  loanTermYears: 25,
  deposit: 350000,
  rentGrowthPct: 3,
  capitalGrowthPct: 10,

  classification: "commercial",
  maxLcr: 70,
  maxLvr: 60,
  icr: 1.75,
  icrIncomeBasis: "modelled",
  incomeShadePct: 65,

  grossIncome: 95000,
  partnerIncome: 95000,
  livingExpensesMonthly: 3500,
  existingDebtMonthly: 0,
  cardLimits: 0,
  rentShadePct: 80,

  startDate: "2026-08-01",
  approvalLeadMonths: 4,
  buildMonths: 9,
}

/** QLD transfer (stamp) duty on the general / investor schedule. */
export function qldTransferDuty(value: number): number {
  const v = Math.max(0, value)
  if (v <= 5000) return 0
  if (v <= 75000) return ((v - 5000) / 100) * 1.5
  if (v <= 540000) return 1050 + ((v - 75000) / 100) * 3.5
  if (v <= 1000000) return 17325 + ((v - 540000) / 100) * 4.5
  return 38025 + ((v - 1000000) / 100) * 5.75
}

/** Simplified Australian resident income tax, FY2026-27 rates (incl. 2% Medicare levy). Exposed for UI hints. */
export function incomeTaxEstimate(gross: number): number {
  return incomeTax(gross)
}

/**
 * Simplified Australian resident income tax (incl. 2% Medicare levy).
 * FY2026-27 rates: the bottom marginal rate drops from 16% to 15% from 1 July 2026
 * (legislated in the 2024-25 Budget's second round of tax cuts). Other brackets unchanged.
 */
function incomeTax(gross: number): number {
  const g = Math.max(0, gross)
  let t = 0
  if (g > 18200) t += (Math.min(g, 45000) - 18200) * 0.15
  if (g > 45000) t += (Math.min(g, 135000) - 45000) * 0.3
  if (g > 135000) t += (Math.min(g, 190000) - 135000) * 0.37
  if (g > 190000) t += (g - 190000) * 0.45
  if (g > 26000) t += g * 0.02
  return t
}

/** Principal & interest payment for a fully amortising loan. */
function monthlyPayment(principal: number, annualRatePct: number, termYears: number): number {
  if (principal <= 0) return 0
  const n = termYears * 12
  const r = annualRatePct / 100 / 12
  if (n <= 0) return 0
  if (r === 0) return principal / n
  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

/** Loan principal supportable by a given monthly payment (reverse amortisation). */
function loanFromPayment(pmt: number, annualRatePct: number, termYears: number): number {
  if (pmt <= 0) return 0
  const n = termYears * 12
  const r = annualRatePct / 100 / 12
  if (r === 0) return pmt * n
  return (pmt * (1 - Math.pow(1 + r, -n))) / r
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + Math.round(months))
  return d
}

export function calculate(input: CalculatorInputs): CalculatorResults {
  const land = Math.max(0, input.landCost)
  const build = Math.max(0, input.buildCost)
  const rooms = Math.max(0, input.numberOfRooms)
  const isIncome = input.fundingMode === "income"

  // --- Development cost (ex-holding) ---
  const transferDuty = input.autoTransferDuty ? qldTransferDuty(land) : Math.max(0, input.transferDuty)
  const contingency = build * (Math.max(0, input.contingencyPct) / 100)
  const costExHolding = land + build + transferDuty + contingency

  // --- Holding interest (solved circularly) ---
  const financeRate = input.interestRate / 100
  const buildYears = Math.max(0, input.buildMonths) / 12
  const deposit = Math.max(0, input.deposit)
  let holdingInterest = 0
  for (let i = 0; i < 25; i++) {
    const loanForLand = Math.max(0, land - deposit)
    const depositLeft = Math.max(0, deposit - land)
    const buildBucket = build + transferDuty + contingency + holdingInterest
    const loanForBuild = Math.max(0, buildBucket - depositLeft)
    const next = financeRate * buildYears * (loanForLand + 0.5 * loanForBuild)
    if (Math.abs(next - holdingInterest) < 1) {
      holdingInterest = next
      break
    }
    holdingInterest = next
  }

  const totalDevelopmentCost = costExHolding + holdingInterest

  // --- Income ---
  const grossAnnualIncome = rooms * Math.max(0, input.weeklyRentPerRoom) * 52
  const occupancy = Math.min(100, Math.max(0, input.occupancyRate)) / 100
  const collectedIncome = grossAnnualIncome * occupancy
  const expenseRate = Math.max(0, input.expenseRate) / 100
  const annualOpex = collectedIncome * expenseRate
  const noi = collectedIncome - annualOpex
  const weeklyCollected = collectedIncome / 52

  // --- Valuation (as-if-complete) ---
  const capRate = Math.max(0, input.capRate) / 100
  const endValue = capRate > 0 ? noi / capRate : 0
  const developmentMargin = endValue - totalDevelopmentCost
  const developmentMarginPct = totalDevelopmentCost > 0 ? (developmentMargin / totalDevelopmentCost) * 100 : 0

  // --- Lending caps ---
  const assessmentRate = input.interestRate + input.assessmentBuffer
  const noiForIcr =
    input.icrIncomeBasis === "shaded" ? grossAnnualIncome * (Math.max(0, input.incomeShadePct) / 100) : noi

  const costCap = (Math.max(0, input.maxLcr) / 100) * totalDevelopmentCost
  const valueCap = (Math.max(0, input.maxLvr) / 100) * endValue
  const icrDivisor = input.icr * (assessmentRate / 100)
  const icrCapRaw = icrDivisor > 0 ? noiForIcr / icrDivisor : 0
  // ICR applies only for a project-funded commercial-classified security.
  const icrApplies = !isIncome && input.classification === "commercial"
  const icrCap = icrApplies ? icrCapRaw : Number.POSITIVE_INFINITY

  // --- Personal serviceability (income mode) ---
  const netApplicant = Math.max(0, input.grossIncome) - incomeTax(input.grossIncome)
  const netPartner = Math.max(0, input.partnerIncome) - incomeTax(input.partnerIncome)
  const netMonthlyPersonal = (netApplicant + netPartner) / 12
  const shadedRentMonthly = (grossAnnualIncome * (Math.max(0, input.rentShadePct) / 100)) / 12
  const monthlyCommitments = Math.max(0, input.existingDebtMonthly) + Math.max(0, input.cardLimits) * 0.038
  const monthlySurplus = netMonthlyPersonal + shadedRentMonthly - Math.max(0, input.livingExpensesMonthly) - monthlyCommitments
  const serviceabilityCap = isIncome
    ? loanFromPayment(Math.max(0, monthlySurplus), assessmentRate, input.loanTermYears)
    : Number.POSITIVE_INFINITY

  // --- Lender lends the lowest of the applicable caps ---
  const applicableEntries: Array<[CapName, number]> = isIncome
    ? [["cost", costCap], ["value", valueCap], ["serviceability", serviceabilityCap]]
    : [["cost", costCap], ["value", valueCap], ["icr", icrCap]]
  let bindingCap: CapName = "cost"
  let minVal = Number.POSITIVE_INFINITY
  for (const [k, v] of applicableEntries) {
    if (v <= minVal) {
      minVal = v
      bindingCap = k
    }
  }
  const maxLoan = Math.max(0, Math.min(...applicableEntries.map(([, v]) => v)))

  // --- Position ---
  const loanRequired = Math.max(0, totalDevelopmentCost - deposit)
  const actualLoan = Math.min(maxLoan, loanRequired)
  const equityRequired = Math.max(0, totalDevelopmentCost - maxLoan)
  const depositShortfall = Math.max(0, equityRequired - deposit)
  const depositSurplus = deposit - equityRequired

  // --- Ratios ---
  const lvrActual = endValue > 0 ? (actualLoan / endValue) * 100 : 0
  const lcrActual = totalDevelopmentCost > 0 ? (actualLoan / totalDevelopmentCost) * 100 : 0
  const annualInterestActual = actualLoan * financeRate
  const annualInterestAssessed = actualLoan * (assessmentRate / 100)
  const icrActual = annualInterestActual > 0 ? noi / annualInterestActual : 0
  const icrAtAssessment = annualInterestAssessed > 0 ? noi / annualInterestAssessed : 0

  // --- Repayments on the actual loan ---
  const isInterestOnly = input.repaymentType === "interest_only"
  const monthlyRepayment = isInterestOnly
    ? annualInterestActual / 12
    : monthlyPayment(actualLoan, input.interestRate, input.loanTermYears)
  const annualRepayment = monthlyRepayment * 12
  const weeklyRepayment = annualRepayment / 52
  const interestOnlyWeekly = annualInterestActual / 52

  // --- Yields & returns (yield on cost) ---
  const grossYield = totalDevelopmentCost > 0 ? (grossAnnualIncome / totalDevelopmentCost) * 100 : 0
  const netYield = totalDevelopmentCost > 0 ? (noi / totalDevelopmentCost) * 100 : 0
  const yieldOnEndValue = endValue > 0 ? (noi / endValue) * 100 : 0

  const annualCashflow = noi - annualRepayment
  const weeklyCashflow = annualCashflow / 52
  const isCashflowPositive = annualCashflow >= 0
  const cashOnCashReturn = deposit > 0 ? (annualCashflow / deposit) * 100 : 0

  const weeklyGrossPerFullOccupancy = rooms * Math.max(0, input.weeklyRentPerRoom)
  const netFactor = 1 - expenseRate
  const breakEvenOccupancy =
    weeklyGrossPerFullOccupancy > 0 && netFactor > 0
      ? Math.min(999, (weeklyRepayment / (weeklyGrossPerFullOccupancy * netFactor)) * 100)
      : 0

  // --- Timeline ---
  const start = input.startDate ? new Date(`${input.startDate}T00:00:00`) : new Date()
  const completionDate = addMonths(start, Math.max(0, input.approvalLeadMonths) + Math.max(0, input.buildMonths))
  const sunsetRisk = completionDate.getTime() > SUNSET_DATE.getTime()

  return {
    isIncome,

    contingency,
    costExHolding,
    holdingInterest,
    totalDevelopmentCost,

    grossAnnualIncome,
    collectedIncome,
    annualOpex,
    noi,
    weeklyCollected,

    endValue,
    developmentMargin,
    developmentMarginPct,

    assessmentRate,
    noiForIcr,
    costCap,
    valueCap,
    icrCap,
    icrApplies,
    serviceabilityCap,
    maxLoan,
    bindingCap,

    netMonthlyPersonal,
    shadedRentMonthly,
    monthlyCommitments,
    monthlySurplus,

    loanRequired,
    actualLoan,
    equityRequired,
    depositShortfall,
    depositSurplus,

    lvrActual,
    lcrActual,
    icrActual,
    icrAtAssessment,

    weeklyRepayment,
    monthlyRepayment,
    annualRepayment,
    interestOnlyWeekly,

    grossYield,
    netYield,
    yieldOnEndValue,
    weeklyCashflow,
    annualCashflow,
    isCashflowPositive,
    cashOnCashReturn,
    breakEvenOccupancy,

    completionDate,
    sunsetDate: SUNSET_DATE,
    sunsetRisk,
  }
}

export interface ProjectionPoint {
  year: number
  loanBalance: number
  propertyValue: number
  equity: number
  annualRent: number
  annualRepayment: number
}

/** Outstanding balance of a fully amortising loan after a number of elapsed months. */
function loanBalanceAfterMonths(principal: number, annualRatePct: number, termYears: number, monthsElapsed: number): number {
  const n = termYears * 12
  const k = Math.min(Math.max(0, monthsElapsed), n)
  if (principal <= 0 || n <= 0) return 0
  const r = annualRatePct / 100 / 12
  if (r === 0) return Math.max(0, principal * (1 - k / n))
  const pmt = monthlyPayment(principal, annualRatePct, termYears)
  const balance = principal * Math.pow(1 + r, k) - pmt * ((Math.pow(1 + r, k) - 1) / r)
  return Math.max(0, balance)
}

/**
 * Year-by-year projection of loan balance, property value and equity across the
 * loan term, using the fixed rent-growth and capital-growth assumptions. Repayments
 * are held constant in nominal terms (the fixed-rate assumption already implicit
 * elsewhere in this calculator — it doesn't model refinancing or rate changes).
 */
export function buildProjection(input: CalculatorInputs, results: CalculatorResults): ProjectionPoint[] {
  const years = Math.max(1, Math.round(input.loanTermYears))
  const annualRentYear0 = results.weeklyCollected * 52
  const annualRepayment = results.weeklyRepayment * 52
  const points: ProjectionPoint[] = []
  const isInterestOnly = input.repaymentType === "interest_only"
  for (let year = 0; year <= years; year++) {
    // Interest-only repayments don't reduce principal, so the balance stays flat —
    // a simplification (real IO loans usually revert to P&I after a fixed period).
    const loanBalance = isInterestOnly
      ? results.actualLoan
      : loanBalanceAfterMonths(results.actualLoan, input.interestRate, input.loanTermYears, year * 12)
    const propertyValue = results.endValue * Math.pow(1 + input.capitalGrowthPct / 100, year)
    const annualRent = annualRentYear0 * Math.pow(1 + input.rentGrowthPct / 100, year)
    points.push({
      year,
      loanBalance,
      propertyValue,
      equity: Math.max(0, propertyValue - loanBalance),
      annualRent,
      annualRepayment,
    })
  }
  return points
}

export function formatCurrency(value: number, opts: { decimals?: boolean } = {}): string {
  if (!Number.isFinite(value)) return "—"
  const rounded = opts.decimals ? value : Math.round(value)
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: opts.decimals ? 2 : 0,
    maximumFractionDigits: opts.decimals ? 2 : 0,
  }).format(rounded)
}

export function formatPercent(value: number, decimals = 1): string {
  if (!Number.isFinite(value)) return "—"
  return `${value.toFixed(decimals)}%`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", { month: "short", year: "numeric" }).format(date)
}
