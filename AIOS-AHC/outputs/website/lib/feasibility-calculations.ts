import { qldTransferDuty } from "./borrowing-calculations"

/** Re-exported for UI display of the auto-calculated transfer duty figure. */
export const qldTransferDutyDisplay = qldTransferDuty

// ---------------------------------------------------------------------------
// Types — Rooming House Development Feasibility Calculator
// Mirrors the "Rooming House Development Feasibility Calculator" specification:
// acquisition, development cost, finance, operating model, GST, depreciation/tax,
// valuation, development & investment returns, long-term hold, exit, sensitivity
// and investor targets.
// ---------------------------------------------------------------------------

export type ProjectType =
  | "vacant-land-new-build"
  | "demolition-rebuild"
  | "conversion"
  | "extension-conversion"
  | "existing-acquisition"
  | "turnkey-purchase"

export type PlanningStatus =
  | "not-investigated"
  | "preliminary-advice"
  | "compliant-development"
  | "approval-required"
  | "da-lodged"
  | "approved-with-conditions"
  | "building-approval-obtained"
  | "operational-approval-obtained"

export type GstClassification =
  | "input-taxed"
  | "taxable-commercial"
  | "division-87-long-term"
  | "mixed-use"
  | "pending-advice"

export type OwnershipEntity = "individual" | "company" | "trust" | "smsf" | "joint"

export type ValuationMethod = "capitalisation" | "value-per-room" | "blended"

export interface LineItem {
  id: string
  label: string
  amount: number
}

export interface RoomCategory {
  id: string
  label: string
  rooms: number
  weeklyRent: number
}

export interface FeasibilityInputs {
  // Part A — project & site
  projectName: string
  projectType: ProjectType
  planningStatus: PlanningStatus
  landAlreadyOwned: boolean

  // Part B — acquisition
  purchasePrice: number
  existingPropertyValue: number
  autoTransferDuty: boolean
  transferDuty: number
  acquisitionCosts: LineItem[]
  gstCreditOnAcquisition: number

  // Part C — design & development costs
  demolitionSitePrep: LineItem[]
  consultants: LineItem[]
  authorityCharges: LineItem[]
  buildingCostBase: number
  buildingCostExtras: LineItem[]
  roomFitoutPerRoom: number
  commonAreaFitout: LineItem[]
  contingencyPct: number
  escalationPct: number
  monthsToConstruction: number

  // Part D/E — program & finance
  maxLoanToCostPct: number
  maxLoanToValuePct: number
  constructionInterestRatePct: number
  averageDrawnPct: number
  constructionMonths: number
  leaseUpMonths: number
  financeFees: LineItem[]
  investmentInterestRatePct: number
  interestOnly: boolean
  loanTermYears: number
  refinanceAtCompletion: boolean
  refinanceLvrPct: number

  // Part F/G — operating model & rental income
  roomCategories: RoomCategory[]
  stabilisedOccupancyPct: number
  vacancyCollectionLossPct: number
  otherIncomeAnnual: number
  rentGrowthPct: number

  // Part H — operating expenses
  managementFeePct: number
  variableExpensePct: number
  fixedExpenses: LineItem[]
  capitalReservePerRoomAnnual: number
  expenseInflationPct: number

  // Part I — GST
  gstRegistered: boolean
  gstClassification: GstClassification

  // Part J — depreciation & tax
  ownershipEntity: OwnershipEntity
  marginalTaxRatePct: number
  capitalWorksRatePct: number
  annualPlantDepreciation: number

  // Part K — valuation
  valuationMethod: ValuationMethod
  capRateLow: number
  capRateBase: number
  capRateHigh: number
  valuePerRoomBase: number

  // Part M/N — long-term hold & exit
  propertyValueGrowthPct: number
  exitCapRateMovementBps: number
  sellingCostsPct: number
  discountRatePct: number

  // Part P — investor targets
  minDevelopmentMarginPct: number
  minNetYieldPct: number
  minCashOnCashPct: number
  minDSCR: number
  maxCompletedLvrPct: number
  minIRRPct: number
  minEquityMultiple: number
  maxAvailableEquity: number

  // Part A/6 — gating confirmations
  planningConfirmed: boolean
  gstAdviceConfirmed: boolean
  financeConfirmed: boolean
  constructionEstimateConfirmed: boolean
  valuationIndependent: boolean
}

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "vacant-land-new-build": "Vacant-land new build",
  "demolition-rebuild": "Demolition & rebuild",
  conversion: "Existing dwelling conversion",
  "extension-conversion": "Extension & conversion",
  "existing-acquisition": "Existing rooming house acquisition",
  "turnkey-purchase": "Completed turnkey purchase",
}

export const PLANNING_STATUS_LABELS: Record<PlanningStatus, string> = {
  "not-investigated": "Not investigated",
  "preliminary-advice": "Preliminary advice received",
  "compliant-development": "Compliant development (no DA)",
  "approval-required": "Planning approval required",
  "da-lodged": "Development application lodged",
  "approved-with-conditions": "Approved with conditions",
  "building-approval-obtained": "Building approval obtained",
  "operational-approval-obtained": "Operational approval obtained",
}

export const GST_CLASSIFICATION_LABELS: Record<GstClassification, string> = {
  "input-taxed": "Input-taxed residential accommodation",
  "taxable-commercial": "Taxable commercial residential premises",
  "division-87-long-term": "Long-term commercial accommodation (Division 87)",
  "mixed-use": "Mixed taxable & input-taxed use",
  "pending-advice": "Classification pending professional advice",
}

export const OWNERSHIP_ENTITY_LABELS: Record<OwnershipEntity, string> = {
  individual: "Individual",
  company: "Company",
  trust: "Discretionary / unit trust",
  smsf: "Self-managed super fund",
  joint: "Joint ownership",
}

let idCounter = 0
export function newId(prefix: string): string {
  idCounter += 1
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`
}

export function sumLineItems(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + (Number.isFinite(item.amount) ? item.amount : 0), 0)
}

export const DEFAULT_ROOM_CATEGORIES: RoomCategory[] = [
  { id: newId("room"), label: "Ensuite rooms", rooms: 6, weeklyRent: 260 },
  { id: newId("room"), label: "Shared-bathroom rooms", rooms: 4, weeklyRent: 220 },
]

export const DEFAULT_INPUTS: FeasibilityInputs = {
  projectName: "New Rooming House Project",
  projectType: "vacant-land-new-build",
  planningStatus: "not-investigated",
  landAlreadyOwned: false,

  purchasePrice: 420000,
  existingPropertyValue: 0,
  autoTransferDuty: true,
  transferDuty: 0,
  acquisitionCosts: [
    { id: newId("acq"), label: "Legal & conveyancing", amount: 3500 },
    { id: newId("acq"), label: "Due diligence (survey, soil, planning)", amount: 6000 },
  ],
  gstCreditOnAcquisition: 0,

  demolitionSitePrep: [{ id: newId("dem"), label: "Site clearing & preparation", amount: 8000 }],
  consultants: [
    { id: newId("con"), label: "Architect / building designer", amount: 28000 },
    { id: newId("con"), label: "Town planner", amount: 9000 },
    { id: newId("con"), label: "Engineering (structural, civil, hydraulic)", amount: 18000 },
    { id: newId("con"), label: "Fire, acoustic & accessibility consultants", amount: 10000 },
    { id: newId("con"), label: "Certifier & project management", amount: 14000 },
  ],
  authorityCharges: [
    { id: newId("auth"), label: "Council application & infrastructure charges", amount: 32000 },
  ],
  buildingCostBase: 1150000,
  buildingCostExtras: [{ id: newId("bld"), label: "Fire safety, security & compliance systems", amount: 35000 }],
  roomFitoutPerRoom: 6500,
  commonAreaFitout: [{ id: newId("caf"), label: "Common kitchen, laundry & living areas", amount: 45000 }],
  contingencyPct: 7.5,
  escalationPct: 3,
  monthsToConstruction: 4,

  maxLoanToCostPct: 70,
  maxLoanToValuePct: 60,
  constructionInterestRatePct: 8.5,
  averageDrawnPct: 50,
  constructionMonths: 10,
  leaseUpMonths: 4,
  financeFees: [{ id: newId("fin"), label: "Establishment, valuation & legal fees", amount: 12000 }],
  investmentInterestRatePct: 7.25,
  interestOnly: true,
  loanTermYears: 25,
  refinanceAtCompletion: true,
  refinanceLvrPct: 65,

  roomCategories: DEFAULT_ROOM_CATEGORIES,
  stabilisedOccupancyPct: 92,
  vacancyCollectionLossPct: 3,
  otherIncomeAnnual: 6000,
  rentGrowthPct: 3,

  managementFeePct: 12,
  variableExpensePct: 14,
  fixedExpenses: [
    { id: newId("fix"), label: "Council rates & water", amount: 9000 },
    { id: newId("fix"), label: "Insurance", amount: 7500 },
    { id: newId("fix"), label: "Compliance, registration & accounting", amount: 6500 },
  ],
  capitalReservePerRoomAnnual: 650,
  expenseInflationPct: 3,

  gstRegistered: true,
  gstClassification: "pending-advice",

  ownershipEntity: "trust",
  marginalTaxRatePct: 39,
  capitalWorksRatePct: 2.5,
  annualPlantDepreciation: 18000,

  valuationMethod: "blended",
  capRateLow: 6.5,
  capRateBase: 7.5,
  capRateHigh: 8.5,
  valuePerRoomBase: 145000,

  propertyValueGrowthPct: 3,
  exitCapRateMovementBps: 0,
  sellingCostsPct: 3,
  discountRatePct: 8,

  minDevelopmentMarginPct: 15,
  minNetYieldPct: 6,
  minCashOnCashPct: 5,
  minDSCR: 1.25,
  maxCompletedLvrPct: 70,
  minIRRPct: 12,
  minEquityMultiple: 1.5,
  maxAvailableEquity: 700000,

  planningConfirmed: false,
  gstAdviceConfirmed: false,
  financeConfirmed: false,
  constructionEstimateConfirmed: false,
  valuationIndependent: false,
}

// ---------------------------------------------------------------------------
// Finance helpers
// ---------------------------------------------------------------------------

function monthlyPayment(principal: number, annualRatePct: number, termYears: number): number {
  if (principal <= 0) return 0
  const n = termYears * 12
  const r = annualRatePct / 100 / 12
  if (n <= 0) return 0
  if (r === 0) return principal / n
  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

function loanBalanceAfterMonths(principal: number, annualRatePct: number, termYears: number, monthsElapsed: number): number {
  if (principal <= 0) return 0
  const r = annualRatePct / 100 / 12
  const pmt = monthlyPayment(principal, annualRatePct, termYears)
  if (r === 0) return Math.max(0, principal - pmt * monthsElapsed)
  const bal = principal * Math.pow(1 + r, monthsElapsed) - pmt * ((Math.pow(1 + r, monthsElapsed) - 1) / r)
  return Math.max(0, bal)
}

/** Bisection-based IRR solver over periodic (annual) cash flows, cf[0] = time 0. */
export function irr(cashFlows: number[]): number {
  const npv = (rate: number) => cashFlows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0)
  let lo = -0.99
  let hi = 10
  let npvLo = npv(lo)
  const npvHi = npv(hi)
  if (!Number.isFinite(npvLo) || !Number.isFinite(npvHi)) return NaN
  if (npvLo * npvHi > 0) {
    // No sign change across the search range (e.g. always-positive or always-negative project).
    return NaN
  }
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2
    const npvMid = npv(mid)
    if (Math.abs(npvMid) < 1) return mid
    if (npvLo * npvMid < 0) {
      hi = mid
    } else {
      lo = mid
      npvLo = npvMid
    }
  }
  return (lo + hi) / 2
}

export function npv(rate: number, cashFlows: number[]): number {
  return cashFlows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate / 100, t), 0)
}

// ---------------------------------------------------------------------------
// Core results
// ---------------------------------------------------------------------------

export interface ProjectionRow {
  year: number
  weeklyRentAvg: number
  effectiveGrossIncome: number
  operatingExpenses: number
  netOperatingIncome: number
  interestPaid: number
  principalPaid: number
  debtService: number
  debtBalance: number
  preTaxCashFlow: number
  depreciation: number
  taxableIncome: number
  tax: number
  afterTaxCashFlow: number
  propertyValue: number
}

export type TargetStatus = "green" | "amber" | "red" | "grey"

export interface TargetResult {
  key: string
  label: string
  actualLabel: string
  targetLabel: string
  status: TargetStatus
}

export interface StressCase {
  label: string
  netYieldOnCostPct: number
  cashOnCashReturnPct: number
  developmentMarginPct: number
  dscr: number
  completionValuation: number
}

export interface FeasibilityResults {
  rentableRooms: number

  // 1-4: costs
  totalAcquisitionCost: number
  totalDevelopmentWorks: number
  totalFinanceAndHoldingCosts: number
  totalDevelopmentCost: number
  leaseUpDeficit: number

  // breakdown detail
  transferDuty: number
  acquisitionCostsTotal: number
  demolitionTotal: number
  consultantsTotal: number
  authorityTotal: number
  buildingTotal: number
  roomFitoutTotal: number
  commonAreaTotal: number
  contingencyAmount: number
  escalationAmount: number
  financeFeesTotal: number
  constructionInterest: number
  fixedExpensesTotal: number

  // 5-13
  costPerRentableRoom: number
  debtFacility: number
  peakInvestorEquity: number
  grossPotentialAnnualRoomIncome: number
  effectiveGrossIncome: number
  totalOperatingExpenses: number
  netOperatingIncome: number
  annualDebtService: number
  preTaxCashFlow: number

  // 14-16 tax
  capitalWorksDeduction: number
  totalDepreciation: number
  interestComponentAnnual: number
  taxableIncomeBeforeDep: number
  taxableIncomeAfterDep: number
  estimatedTax: number
  afterTaxCashFlow: number
  taxLossCarriedForward: number

  // 17-22 yields & break-even
  grossYieldOnCostPct: number
  netYieldOnCostPct: number
  cashOnCashReturnPct: number
  dscr: number
  interestCoverRatio: number
  breakEvenOccupancyPct: number
  debtServiceBreakEvenOccupancyPct: number
  breakEvenWeeklyRent: number
  debtServiceBreakEvenWeeklyRent: number

  // 23-31 valuation / returns
  capValueLow: number
  capValueBase: number
  capValueHigh: number
  valuePerRoomValue: number
  completionValuation: number
  developmentProfit: number
  developmentMarginPct: number
  completedLvrPct: number
  equityCreated: number
  refinanceLoanAmount: number
  equityReleasedAtRefinance: number
  initialEquityForHold: number
  fiveYearIRRPct: number
  tenYearIRRPct: number
  equityMultiple5yr: number
  equityMultiple10yr: number
  npv: number

  // projections
  projection10yr: ProjectionRow[]

  // targets / status
  targets: TargetResult[]
  overallStatus: string
  warnings: string[]
  stressTests: StressCase[]
}

function clampPct(v: number): number {
  return Math.min(100, Math.max(0, v))
}

export function calculateFeasibility(input: FeasibilityInputs): FeasibilityResults {
  const rentableRooms = input.roomCategories.reduce((s, r) => s + Math.max(0, r.rooms), 0)

  // --- Acquisition -----------------------------------------------------
  const transferDuty = input.autoTransferDuty ? qldTransferDuty(input.purchasePrice) : Math.max(0, input.transferDuty)
  const acquisitionCostsTotal = sumLineItems(input.acquisitionCosts)
  const landValueForCostBase = input.landAlreadyOwned ? Math.max(0, input.existingPropertyValue) : Math.max(0, input.purchasePrice)
  const totalAcquisitionCost = landValueForCostBase + transferDuty + acquisitionCostsTotal - Math.max(0, input.gstCreditOnAcquisition)

  // --- Development works -------------------------------------------------
  const demolitionTotal = sumLineItems(input.demolitionSitePrep)
  const consultantsTotal = sumLineItems(input.consultants)
  const authorityTotal = sumLineItems(input.authorityCharges)
  const buildingTotal = Math.max(0, input.buildingCostBase) + sumLineItems(input.buildingCostExtras)
  const roomFitoutTotal = Math.max(0, input.roomFitoutPerRoom) * rentableRooms
  const commonAreaTotal = sumLineItems(input.commonAreaFitout)
  const costsSubtotalForContingency =
    demolitionTotal + consultantsTotal + authorityTotal + buildingTotal + roomFitoutTotal + commonAreaTotal
  const contingencyAmount = costsSubtotalForContingency * (Math.max(0, input.contingencyPct) / 100)
  const escalationAmount =
    costsSubtotalForContingency * (Math.max(0, input.escalationPct) / 100) * (Math.max(0, input.monthsToConstruction) / 12)
  const totalDevelopmentWorks = costsSubtotalForContingency + contingencyAmount + escalationAmount

  // --- Finance & holding costs --------------------------------------------
  const financeFeesTotal = sumLineItems(input.financeFees)
  const interestBase = totalAcquisitionCost + totalDevelopmentWorks + financeFeesTotal
  const constructionInterest =
    interestBase *
    (clampPct(input.averageDrawnPct) / 100) *
    (Math.max(0, input.constructionInterestRatePct) / 100) *
    (Math.max(0, input.constructionMonths) / 12)

  // --- Rooms & income (stabilised) ----------------------------------------
  const grossPotentialAnnualRoomIncome = input.roomCategories.reduce(
    (s, r) => s + Math.max(0, r.rooms) * Math.max(0, r.weeklyRent) * 52,
    0,
  )
  const collectionRate = 1 - clampPct(input.vacancyCollectionLossPct) / 100
  const occupancyFactor = clampPct(input.stabilisedOccupancyPct) / 100
  const effectiveGrossIncome = grossPotentialAnnualRoomIncome * occupancyFactor * collectionRate + Math.max(0, input.otherIncomeAnnual)

  // --- Lease-up deficit (estimated income shortfall while ramping to stabilised occupancy) ---
  const leaseUpDeficit =
    (grossPotentialAnnualRoomIncome / 12) * occupancyFactor * collectionRate * 0.5 * Math.max(0, input.leaseUpMonths)

  const totalFinanceAndHoldingCosts = financeFeesTotal + constructionInterest + leaseUpDeficit
  const totalDevelopmentCostFinal = totalAcquisitionCost + totalDevelopmentWorks + totalFinanceAndHoldingCosts
  const costPerRentableRoom = rentableRooms > 0 ? totalDevelopmentCostFinal / rentableRooms : 0

  // --- Operating expenses (stabilised) -------------------------------------
  const fixedExpensesTotal = sumLineItems(input.fixedExpenses)
  const capitalReserveTotal = Math.max(0, input.capitalReservePerRoomAnnual) * rentableRooms
  const variablePctCombined = (Math.max(0, input.managementFeePct) + Math.max(0, input.variableExpensePct)) / 100
  const totalOperatingExpenses = effectiveGrossIncome * variablePctCombined + fixedExpensesTotal + capitalReserveTotal
  const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses

  // --- Valuation -----------------------------------------------------------
  const capRateLow = Math.max(0.1, input.capRateLow) / 100
  const capRateBase = Math.max(0.1, input.capRateBase) / 100
  const capRateHigh = Math.max(0.1, input.capRateHigh) / 100
  const capValueLow = netOperatingIncome / capRateHigh // higher rate -> lower value bound
  const capValueBase = netOperatingIncome / capRateBase
  const capValueHigh = netOperatingIncome / capRateLow
  const valuePerRoomValue = rentableRooms * Math.max(0, input.valuePerRoomBase)
  const completionValuation =
    input.valuationMethod === "capitalisation"
      ? capValueBase
      : input.valuationMethod === "value-per-room"
        ? valuePerRoomValue
        : (capValueBase + valuePerRoomValue) / 2

  // --- Debt sizing -----------------------------------------------------------
  const loanFromCost = totalDevelopmentCostFinal * (clampPct(input.maxLoanToCostPct) / 100)
  const loanFromValue = completionValuation * (clampPct(input.maxLoanToValuePct) / 100)
  const debtFacility = Math.max(0, Math.min(loanFromCost, loanFromValue))
  const peakInvestorEquity = Math.max(0, totalDevelopmentCostFinal - debtFacility)

  // --- Annual debt service & interest component -------------------------------
  const annualDebtService = input.interestOnly
    ? debtFacility * (Math.max(0, input.investmentInterestRatePct) / 100)
    : monthlyPayment(debtFacility, input.investmentInterestRatePct, input.loanTermYears) * 12
  const interestComponentAnnual = input.interestOnly
    ? annualDebtService
    : debtFacility * (Math.max(0, input.investmentInterestRatePct) / 100)

  const preTaxCashFlow = netOperatingIncome - annualDebtService

  // --- Depreciation & tax ------------------------------------------------------
  const capitalWorksDeduction = buildingTotal * (Math.max(0, input.capitalWorksRatePct) / 100)
  const totalDepreciation = capitalWorksDeduction + Math.max(0, input.annualPlantDepreciation)
  const taxableIncomeBeforeDep = netOperatingIncome - interestComponentAnnual
  const taxableIncomeAfterDep = taxableIncomeBeforeDep - totalDepreciation
  const estimatedTax = taxableIncomeAfterDep > 0 ? taxableIncomeAfterDep * (Math.max(0, input.marginalTaxRatePct) / 100) : 0
  const taxLossCarriedForward = taxableIncomeAfterDep < 0 ? -taxableIncomeAfterDep : 0
  const afterTaxCashFlow = preTaxCashFlow - estimatedTax

  // --- Yields, DSCR, break-even -----------------------------------------------
  const grossYieldOnCostPct = totalDevelopmentCostFinal > 0 ? (grossPotentialAnnualRoomIncome / totalDevelopmentCostFinal) * 100 : 0
  const netYieldOnCostPct = totalDevelopmentCostFinal > 0 ? (netOperatingIncome / totalDevelopmentCostFinal) * 100 : 0
  const cashOnCashReturnPct = peakInvestorEquity > 0 ? (preTaxCashFlow / peakInvestorEquity) * 100 : 0
  const dscr = annualDebtService > 0 ? netOperatingIncome / annualDebtService : Number.POSITIVE_INFINITY
  const interestCoverRatio = interestComponentAnnual > 0 ? netOperatingIncome / interestComponentAnnual : Number.POSITIVE_INFINITY

  // NOI(o) = A*o + B, linear in occupancy (holding rent & expense rates constant)
  const A = grossPotentialAnnualRoomIncome * collectionRate * (1 - variablePctCombined)
  const B = Math.max(0, input.otherIncomeAnnual) * (1 - variablePctCombined) - fixedExpensesTotal - capitalReserveTotal
  const breakEvenOccupancyPct = A > 0 ? Math.max(0, Math.min(999, (-B / A) * 100)) : 0
  const debtServiceBreakEvenOccupancyPct = A > 0 ? Math.max(0, Math.min(999, ((annualDebtService - B) / A) * 100)) : 0

  // NOI(r) = C*r + B where C = rentableRooms*52*occupancy*collectionRate*(1-variablePctCombined)
  const C = rentableRooms * 52 * occupancyFactor * collectionRate * (1 - variablePctCombined)
  const breakEvenWeeklyRent = C > 0 ? Math.max(0, -B / C) : 0
  const debtServiceBreakEvenWeeklyRent = C > 0 ? Math.max(0, (annualDebtService - B) / C) : 0

  // --- Development profit & margin --------------------------------------------
  const developmentProfit = completionValuation - totalDevelopmentCostFinal
  const developmentMarginPct = totalDevelopmentCostFinal > 0 ? (developmentProfit / totalDevelopmentCostFinal) * 100 : 0
  const completedLvrPct = completionValuation > 0 ? (debtFacility / completionValuation) * 100 : 0
  const equityCreated = developmentProfit

  const refinanceLoanAmount = completionValuation * (clampPct(input.refinanceLvrPct) / 100)
  const equityReleasedAtRefinance = Math.max(0, refinanceLoanAmount - debtFacility)
  const investmentLoanAmount = input.refinanceAtCompletion ? refinanceLoanAmount : debtFacility
  const initialEquityForHold = totalDevelopmentCostFinal - investmentLoanAmount

  // --- 10-year annual projection ------------------------------------------------
  const projection10yr: ProjectionRow[] = []
  let debtBalanceForYear = investmentLoanAmount
  for (let year = 1; year <= 10; year++) {
    const rentFactor = Math.pow(1 + Math.max(-99, input.rentGrowthPct) / 100, year - 1)
    const expenseFactor = Math.pow(1 + Math.max(-99, input.expenseInflationPct) / 100, year - 1)
    const yearGrossPotential = grossPotentialAnnualRoomIncome * rentFactor
    const yearEGI = yearGrossPotential * occupancyFactor * collectionRate + Math.max(0, input.otherIncomeAnnual) * expenseFactor
    const yearVariable = yearEGI * variablePctCombined
    const yearFixed = (fixedExpensesTotal + capitalReserveTotal) * expenseFactor
    const yearOpex = yearVariable + yearFixed
    const yearNOI = yearEGI - yearOpex

    let yearInterest: number
    let yearPrincipal: number
    let yearDebtService: number
    if (input.interestOnly) {
      yearInterest = debtBalanceForYear * (Math.max(0, input.investmentInterestRatePct) / 100)
      yearPrincipal = 0
      yearDebtService = yearInterest
    } else {
      const balanceStart = loanBalanceAfterMonths(investmentLoanAmount, input.investmentInterestRatePct, input.loanTermYears, (year - 1) * 12)
      const balanceEnd = loanBalanceAfterMonths(investmentLoanAmount, input.investmentInterestRatePct, input.loanTermYears, year * 12)
      yearDebtService = monthlyPayment(investmentLoanAmount, input.investmentInterestRatePct, input.loanTermYears) * 12
      yearPrincipal = Math.max(0, balanceStart - balanceEnd)
      yearInterest = yearDebtService - yearPrincipal
      debtBalanceForYear = balanceEnd
    }
    if (input.interestOnly) {
      // balance stays flat under interest-only
      debtBalanceForYear = investmentLoanAmount
    }

    const yearPreTaxCF = yearNOI - yearDebtService
    const yearDepreciation = totalDepreciation // assumed roughly flat across the projection
    const yearTaxableBeforeDep = yearNOI - yearInterest
    const yearTaxableAfterDep = yearTaxableBeforeDep - yearDepreciation
    const yearTax = yearTaxableAfterDep > 0 ? yearTaxableAfterDep * (Math.max(0, input.marginalTaxRatePct) / 100) : 0
    const yearAfterTaxCF = yearPreTaxCF - yearTax
    const yearPropertyValue = completionValuation * Math.pow(1 + Math.max(-99, input.propertyValueGrowthPct) / 100, year)

    projection10yr.push({
      year,
      weeklyRentAvg: rentableRooms > 0 ? yearGrossPotential / 52 / rentableRooms : 0,
      effectiveGrossIncome: yearEGI,
      operatingExpenses: yearOpex,
      netOperatingIncome: yearNOI,
      interestPaid: yearInterest,
      principalPaid: yearPrincipal,
      debtService: yearDebtService,
      debtBalance: debtBalanceForYear,
      preTaxCashFlow: yearPreTaxCF,
      depreciation: yearDepreciation,
      taxableIncome: yearTaxableAfterDep,
      tax: yearTax,
      afterTaxCashFlow: yearAfterTaxCF,
      propertyValue: yearPropertyValue,
    })
  }

  function irrAndMultipleForYears(years: number): { irrPct: number; multiple: number } {
    const rows = projection10yr.slice(0, years)
    const exitRow = rows[rows.length - 1]
    const exitCapRate = Math.max(0.1, input.capRateBase + input.exitCapRateMovementBps / 100) / 100
    const exitValue = exitRow ? exitRow.netOperatingIncome / exitCapRate : completionValuation
    const netSaleProceeds = exitValue * (1 - Math.max(0, input.sellingCostsPct) / 100) - (exitRow ? exitRow.debtBalance : investmentLoanAmount)
    const cashFlows = [-initialEquityForHold, ...rows.map((r, i) => (i === rows.length - 1 ? r.afterTaxCashFlow + netSaleProceeds : r.afterTaxCashFlow))]
    const rate = irr(cashFlows)
    const totalReturned = rows.reduce((s, r, i) => s + (i === rows.length - 1 ? r.afterTaxCashFlow + netSaleProceeds : r.afterTaxCashFlow), 0)
    const multiple = initialEquityForHold > 0 ? totalReturned / initialEquityForHold : 0
    return { irrPct: Number.isFinite(rate) ? rate * 100 : NaN, multiple }
  }

  const five = irrAndMultipleForYears(5)
  const ten = irrAndMultipleForYears(10)

  const npvCashFlows = [-initialEquityForHold, ...projection10yr.map((r) => r.afterTaxCashFlow)]
  const npvValue = npv(input.discountRatePct, npvCashFlows)

  // --- Investor targets (traffic light) -----------------------------------------
  function statusFor(actual: number, target: number, direction: "min" | "max", tolerancePct = 10): TargetStatus {
    if (!Number.isFinite(actual)) return "grey"
    if (direction === "min") {
      if (actual >= target) return "green"
      if (actual >= target * (1 - tolerancePct / 100)) return "amber"
      return "red"
    }
    if (actual <= target) return "green"
    if (actual <= target * (1 + tolerancePct / 100)) return "amber"
    return "red"
  }

  const targets: TargetResult[] = [
    {
      key: "margin",
      label: "Development margin on cost",
      actualLabel: `${developmentMarginPct.toFixed(1)}%`,
      targetLabel: `≥ ${input.minDevelopmentMarginPct}%`,
      status: statusFor(developmentMarginPct, input.minDevelopmentMarginPct, "min"),
    },
    {
      key: "netYield",
      label: "Net yield on cost",
      actualLabel: `${netYieldOnCostPct.toFixed(1)}%`,
      targetLabel: `≥ ${input.minNetYieldPct}%`,
      status: statusFor(netYieldOnCostPct, input.minNetYieldPct, "min"),
    },
    {
      key: "cashOnCash",
      label: "Cash-on-cash return",
      actualLabel: `${cashOnCashReturnPct.toFixed(1)}%`,
      targetLabel: `≥ ${input.minCashOnCashPct}%`,
      status: statusFor(cashOnCashReturnPct, input.minCashOnCashPct, "min"),
    },
    {
      key: "dscr",
      label: "DSCR",
      actualLabel: Number.isFinite(dscr) ? `${dscr.toFixed(2)}x` : "—",
      targetLabel: `≥ ${input.minDSCR.toFixed(2)}x`,
      status: statusFor(dscr, input.minDSCR, "min"),
    },
    {
      key: "lvr",
      label: "Completed LVR",
      actualLabel: `${completedLvrPct.toFixed(1)}%`,
      targetLabel: `≤ ${input.maxCompletedLvrPct}%`,
      status: statusFor(completedLvrPct, input.maxCompletedLvrPct, "max"),
    },
    {
      key: "irr5",
      label: "Five-year IRR",
      actualLabel: Number.isFinite(five.irrPct) ? `${five.irrPct.toFixed(1)}%` : "—",
      targetLabel: `≥ ${input.minIRRPct}%`,
      status: statusFor(five.irrPct, input.minIRRPct, "min"),
    },
    {
      key: "equityMultiple",
      label: "10-year equity multiple",
      actualLabel: `${ten.multiple.toFixed(2)}x`,
      targetLabel: `≥ ${input.minEquityMultiple.toFixed(2)}x`,
      status: statusFor(ten.multiple, input.minEquityMultiple, "min"),
    },
    {
      key: "equity",
      label: "Peak equity vs. available",
      actualLabel: `$${Math.round(peakInvestorEquity).toLocaleString("en-AU")}`,
      targetLabel: `≤ $${Math.round(input.maxAvailableEquity).toLocaleString("en-AU")}`,
      status: statusFor(peakInvestorEquity, input.maxAvailableEquity, "max"),
    },
  ]

  const gatingConfirmed =
    input.planningConfirmed && input.gstAdviceConfirmed && input.financeConfirmed && input.constructionEstimateConfirmed
  const reds = targets.filter((t) => t.status === "red").length
  const ambers = targets.filter((t) => t.status === "amber").length

  let overallStatus: string
  if (rentableRooms <= 0 || totalDevelopmentCostFinal <= 0) {
    overallStatus = "Unable to assess—critical information missing"
  } else if (reds >= 2) {
    overallStatus = "Does not meet current targets"
  } else if (reds === 1) {
    overallStatus = "Marginal feasibility"
  } else if (!gatingConfirmed) {
    overallStatus = "Potentially feasible—further investigation required"
  } else if (ambers > 0) {
    overallStatus = "Marginal feasibility"
  } else {
    overallStatus = "Meets investment targets"
  }

  // --- Warnings -----------------------------------------------------------------
  const warnings: string[] = []
  if (!input.planningConfirmed) warnings.push("Planning/approval status has not been confirmed.")
  if (input.gstClassification === "pending-advice" || !input.gstAdviceConfirmed)
    warnings.push("GST classification is unconfirmed — treat GST figures as indicative only.")
  if (!input.constructionEstimateConfirmed) warnings.push("Construction cost is an estimate, not a confirmed builder quote.")
  if (!input.financeConfirmed) warnings.push("Finance terms are indicative and have not been confirmed by a lender.")
  if (!input.valuationIndependent) warnings.push("Completion valuation has not been confirmed by an independent registered valuer.")
  if (input.contingencyPct < 5) warnings.push("Contingency is below the commonly recommended 5% minimum.")
  if (Number.isFinite(dscr) && dscr < input.minDSCR) warnings.push("DSCR is below the investor's target.")
  if (completedLvrPct > input.maxCompletedLvrPct) warnings.push("Completed LVR is above the investor's target.")
  if (preTaxCashFlow < 0) warnings.push("Pre-tax cash flow is negative at stabilised operations.")
  if (peakInvestorEquity > input.maxAvailableEquity) warnings.push("Peak investor equity required exceeds the equity available.")
  if (input.leaseUpMonths <= 0) warnings.push("Lease-up period is not modelled — occupancy is assumed from day one.")

  // --- Stress tests ---------------------------------------------------------------
  function runScenario(label: string, overrides: Partial<FeasibilityInputs>): StressCase {
    const scenarioInput: FeasibilityInputs = { ...input, ...overrides }
    const r = calculateFeasibilityCore(scenarioInput)
    return {
      label,
      netYieldOnCostPct: r.netYieldOnCostPct,
      cashOnCashReturnPct: r.cashOnCashReturnPct,
      developmentMarginPct: r.developmentMarginPct,
      dscr: r.dscr,
      completionValuation: r.completionValuation,
    }
  }

  const stressTests: StressCase[] = [
    runScenario("Base case", {}),
    runScenario("Construction cost +10%", { buildingCostBase: input.buildingCostBase * 1.1 }),
    runScenario("Construction cost +20%", { buildingCostBase: input.buildingCostBase * 1.2 }),
    runScenario("Three-month delay", { constructionMonths: input.constructionMonths + 3 }),
    runScenario("Rent 5% below estimate", {
      roomCategories: input.roomCategories.map((r) => ({ ...r, weeklyRent: r.weeklyRent * 0.95 })),
    }),
    runScenario("Rent 10% below estimate", {
      roomCategories: input.roomCategories.map((r) => ({ ...r, weeklyRent: r.weeklyRent * 0.9 })),
    }),
    runScenario("Occupancy reduced to 90%", { stabilisedOccupancyPct: 90 }),
    runScenario("Occupancy reduced to 85%", { stabilisedOccupancyPct: 85 }),
    runScenario("Interest rate +1%", {
      constructionInterestRatePct: input.constructionInterestRatePct + 1,
      investmentInterestRatePct: input.investmentInterestRatePct + 1,
    }),
    runScenario("Interest rate +2%", {
      constructionInterestRatePct: input.constructionInterestRatePct + 2,
      investmentInterestRatePct: input.investmentInterestRatePct + 2,
    }),
    runScenario("Operating expenses +10%", { managementFeePct: input.managementFeePct * 1.1, variableExpensePct: input.variableExpensePct * 1.1 }),
    runScenario("Cap rate +1%", { capRateBase: input.capRateBase + 1, capRateLow: input.capRateLow + 1, capRateHigh: input.capRateHigh + 1 }),
    runScenario("Combined downside", {
      buildingCostBase: input.buildingCostBase * 1.1,
      constructionMonths: input.constructionMonths + 3,
      roomCategories: input.roomCategories.map((r) => ({ ...r, weeklyRent: r.weeklyRent * 0.95 })),
      stabilisedOccupancyPct: Math.max(0, input.stabilisedOccupancyPct - 7),
      constructionInterestRatePct: input.constructionInterestRatePct + 1,
      investmentInterestRatePct: input.investmentInterestRatePct + 1,
      capRateBase: input.capRateBase + 0.5,
      capRateLow: input.capRateLow + 0.5,
      capRateHigh: input.capRateHigh + 0.5,
    }),
  ]

  return {
    rentableRooms,
    totalAcquisitionCost,
    totalDevelopmentWorks,
    totalFinanceAndHoldingCosts,
    totalDevelopmentCost: totalDevelopmentCostFinal,
    leaseUpDeficit,
    transferDuty,
    acquisitionCostsTotal,
    demolitionTotal,
    consultantsTotal,
    authorityTotal,
    buildingTotal,
    roomFitoutTotal,
    commonAreaTotal,
    contingencyAmount,
    escalationAmount,
    financeFeesTotal,
    constructionInterest,
    fixedExpensesTotal,
    costPerRentableRoom,
    debtFacility,
    peakInvestorEquity,
    grossPotentialAnnualRoomIncome,
    effectiveGrossIncome,
    totalOperatingExpenses,
    netOperatingIncome,
    annualDebtService,
    preTaxCashFlow,
    capitalWorksDeduction,
    totalDepreciation,
    interestComponentAnnual,
    taxableIncomeBeforeDep,
    taxableIncomeAfterDep,
    estimatedTax,
    afterTaxCashFlow,
    taxLossCarriedForward,
    grossYieldOnCostPct,
    netYieldOnCostPct,
    cashOnCashReturnPct,
    dscr,
    interestCoverRatio,
    breakEvenOccupancyPct,
    debtServiceBreakEvenOccupancyPct,
    breakEvenWeeklyRent,
    debtServiceBreakEvenWeeklyRent,
    capValueLow,
    capValueBase,
    capValueHigh,
    valuePerRoomValue,
    completionValuation,
    developmentProfit,
    developmentMarginPct,
    completedLvrPct,
    equityCreated,
    refinanceLoanAmount,
    equityReleasedAtRefinance,
    initialEquityForHold,
    fiveYearIRRPct: five.irrPct,
    tenYearIRRPct: ten.irrPct,
    equityMultiple5yr: five.multiple,
    equityMultiple10yr: ten.multiple,
    npv: npvValue,
    projection10yr,
    targets,
    overallStatus,
    warnings,
    stressTests,
  }
}

// Internal lightweight core used by stress-test scenarios (avoids recursive stress-test generation).
function calculateFeasibilityCore(input: FeasibilityInputs): Pick<FeasibilityResults, "netYieldOnCostPct" | "cashOnCashReturnPct" | "developmentMarginPct" | "dscr" | "completionValuation"> {
  const rentableRooms = input.roomCategories.reduce((s, r) => s + Math.max(0, r.rooms), 0)
  const transferDuty = input.autoTransferDuty ? qldTransferDuty(input.purchasePrice) : Math.max(0, input.transferDuty)
  const acquisitionCostsTotal = sumLineItems(input.acquisitionCosts)
  const landValueForCostBase = input.landAlreadyOwned ? Math.max(0, input.existingPropertyValue) : Math.max(0, input.purchasePrice)
  const totalAcquisitionCost = landValueForCostBase + transferDuty + acquisitionCostsTotal - Math.max(0, input.gstCreditOnAcquisition)

  const demolitionTotal = sumLineItems(input.demolitionSitePrep)
  const consultantsTotal = sumLineItems(input.consultants)
  const authorityTotal = sumLineItems(input.authorityCharges)
  const buildingTotal = Math.max(0, input.buildingCostBase) + sumLineItems(input.buildingCostExtras)
  const roomFitoutTotal = Math.max(0, input.roomFitoutPerRoom) * rentableRooms
  const commonAreaTotal = sumLineItems(input.commonAreaFitout)
  const costsSubtotalForContingency =
    demolitionTotal + consultantsTotal + authorityTotal + buildingTotal + roomFitoutTotal + commonAreaTotal
  const contingencyAmount = costsSubtotalForContingency * (Math.max(0, input.contingencyPct) / 100)
  const escalationAmount =
    costsSubtotalForContingency * (Math.max(0, input.escalationPct) / 100) * (Math.max(0, input.monthsToConstruction) / 12)
  const totalDevelopmentWorks = costsSubtotalForContingency + contingencyAmount + escalationAmount

  const financeFeesTotal = sumLineItems(input.financeFees)
  const interestBase = totalAcquisitionCost + totalDevelopmentWorks + financeFeesTotal
  const constructionInterest =
    interestBase *
    (clampPct(input.averageDrawnPct) / 100) *
    (Math.max(0, input.constructionInterestRatePct) / 100) *
    (Math.max(0, input.constructionMonths) / 12)

  const grossPotentialAnnualRoomIncome = input.roomCategories.reduce(
    (s, r) => s + Math.max(0, r.rooms) * Math.max(0, r.weeklyRent) * 52,
    0,
  )
  const collectionRate = 1 - clampPct(input.vacancyCollectionLossPct) / 100
  const occupancyFactor = clampPct(input.stabilisedOccupancyPct) / 100
  const effectiveGrossIncome = grossPotentialAnnualRoomIncome * occupancyFactor * collectionRate + Math.max(0, input.otherIncomeAnnual)
  const leaseUpDeficit =
    (grossPotentialAnnualRoomIncome / 12) * occupancyFactor * collectionRate * 0.5 * Math.max(0, input.leaseUpMonths)
  const totalFinanceAndHoldingCosts = financeFeesTotal + constructionInterest + leaseUpDeficit
  const totalDevelopmentCostFinal = totalAcquisitionCost + totalDevelopmentWorks + totalFinanceAndHoldingCosts

  const fixedExpensesTotal = sumLineItems(input.fixedExpenses)
  const capitalReserveTotal = Math.max(0, input.capitalReservePerRoomAnnual) * rentableRooms
  const variablePctCombined = (Math.max(0, input.managementFeePct) + Math.max(0, input.variableExpensePct)) / 100
  const totalOperatingExpenses = effectiveGrossIncome * variablePctCombined + fixedExpensesTotal + capitalReserveTotal
  const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses

  const capRateBase = Math.max(0.1, input.capRateBase) / 100
  const capValueBase = netOperatingIncome / capRateBase
  const valuePerRoomValue = rentableRooms * Math.max(0, input.valuePerRoomBase)
  const completionValuation =
    input.valuationMethod === "capitalisation"
      ? capValueBase
      : input.valuationMethod === "value-per-room"
        ? valuePerRoomValue
        : (capValueBase + valuePerRoomValue) / 2

  const loanFromCost = totalDevelopmentCostFinal * (clampPct(input.maxLoanToCostPct) / 100)
  const loanFromValue = completionValuation * (clampPct(input.maxLoanToValuePct) / 100)
  const debtFacility = Math.max(0, Math.min(loanFromCost, loanFromValue))
  const peakInvestorEquity = Math.max(0, totalDevelopmentCostFinal - debtFacility)

  const annualDebtService = input.interestOnly
    ? debtFacility * (Math.max(0, input.investmentInterestRatePct) / 100)
    : monthlyPayment(debtFacility, input.investmentInterestRatePct, input.loanTermYears) * 12

  const preTaxCashFlow = netOperatingIncome - annualDebtService
  const netYieldOnCostPct = totalDevelopmentCostFinal > 0 ? (netOperatingIncome / totalDevelopmentCostFinal) * 100 : 0
  const cashOnCashReturnPct = peakInvestorEquity > 0 ? (preTaxCashFlow / peakInvestorEquity) * 100 : 0
  const dscr = annualDebtService > 0 ? netOperatingIncome / annualDebtService : Number.POSITIVE_INFINITY
  const developmentProfit = completionValuation - totalDevelopmentCostFinal
  const developmentMarginPct = totalDevelopmentCostFinal > 0 ? (developmentProfit / totalDevelopmentCostFinal) * 100 : 0

  return { netYieldOnCostPct, cashOnCashReturnPct, developmentMarginPct, dscr, completionValuation }
}

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return "—"
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(
    Math.round(value),
  )
}

export function formatPercent(value: number, decimals = 1): string {
  if (!Number.isFinite(value)) return "—"
  return `${value.toFixed(decimals)}%`
}
