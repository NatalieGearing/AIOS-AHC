// Standalone depreciation ESTIMATOR — separate from the main feasibility engine in
// feasibility-calculations.ts. It only ever feeds two of that engine's existing inputs
// (annualPlantDepreciation, capitalWorksRatePct) via "Apply year 1 to model"; it never
// changes how totalDepreciation/taxableIncome are calculated there.

export const PROP_TYPES = [
  "Standard House",
  "Architecturally Designed House",
  "Townhouse",
  "Unit Development",
  "Office Development",
  "Industrial Metal Clad",
  "Industrial Concrete Clad",
] as const
export type DepPropertyType = (typeof PROP_TYPES)[number]

export const CONSTR_TYPES = ["Residential", "Commercial", "Manufacturing"] as const
export type DepConstructionType = (typeof CONSTR_TYPES)[number]

export const CITIES = ["Cairns", "Brisbane", "Sydney", "Canberra", "Melbourne", "Hobart", "Adelaide", "Perth", "Darwin"] as const
export type DepCity = (typeof CITIES)[number]

const DEP_RATE: Record<DepPropertyType, number> = {
  "Standard House": 1900,
  "Architecturally Designed House": 3400,
  Townhouse: 2100,
  "Unit Development": 2450,
  "Office Development": 2700,
  "Industrial Metal Clad": 1150,
  "Industrial Concrete Clad": 1600,
}
const DEP_CITY: Record<DepCity, number> = {
  Cairns: 1.05,
  Brisbane: 1.0,
  Sydney: 1.12,
  Canberra: 1.05,
  Melbourne: 1.04,
  Hobart: 1.02,
  Adelaide: 0.97,
  Perth: 1.0,
  Darwin: 1.08,
}
const DEP_CTYPE: Record<DepConstructionType, number> = { Residential: 1.0, Commercial: 1.06, Manufacturing: 0.95 }
const DEP_PE: Record<DepPropertyType, number> = {
  "Standard House": 0.14,
  "Architecturally Designed House": 0.16,
  Townhouse: 0.15,
  "Unit Development": 0.17,
  "Office Development": 0.12,
  "Industrial Metal Clad": 0.07,
  "Industrial Concrete Clad": 0.08,
}

export interface DepreciationInputs {
  propertyType: DepPropertyType
  constructionType: DepConstructionType
  units: number
  levels: number
  floorArea: number
  yearBuilt: string
  yearPurchased: string
  purchasedNew: boolean
  city: DepCity
  marginalRate: number
}

export const DEFAULT_DEP_INPUTS: DepreciationInputs = {
  propertyType: "Standard House",
  constructionType: "Residential",
  units: 1,
  levels: 1,
  floorArea: 220,
  yearBuilt: String(Math.max(2026, new Date().getFullYear())),
  yearPurchased: "2024",
  purchasedNew: true,
  city: "Brisbane",
  marginalRate: 39,
}

export function yearBuiltOptions(): string[] {
  const nowYear = new Date().getFullYear()
  const years: string[] = []
  for (let y = Math.max(2026, nowYear) + 5; y >= 2026; y--) years.push(String(y))
  return years
}

export function yearPurchasedOptions(): string[] {
  const years: string[] = []
  for (let y = 2027; y >= 2018; y--) years.push(String(y))
  years.push("2017 – after 9 May")
  years.push("2017 – before 9 May")
  for (let y = 2016; y >= 1986; y--) years.push(String(y))
  years.push("Pre 1985")
  return years
}

export interface DepreciationYearRow {
  year: number
  plantEquipment: number
  div43: number
  total: number
  taxSaving: number
}

export interface DepreciationEstimate {
  cost: number
  costMin: number
  costMax: number
  div43Eligible: boolean
  div43Rate: number
  peExcluded: boolean
  rows: DepreciationYearRow[]
  peTotal: number
  d43Total: number
  firstMin: number
  firstMax: number
  fiveMin: number
  fiveMax: number
  fiveTaxMin: number
  fiveTaxMax: number
  /** Year-1 plant & equipment deduction at the +12% cost-variance upper end — what "Apply to model" writes in. */
  year1PeMax: number
}

/** Ported 1:1 from the approved redesign prototype's computeDepreciation(). */
export function computeDepreciation(d: DepreciationInputs): DepreciationEstimate {
  const rate = DEP_RATE[d.propertyType] ?? 2000
  const city = DEP_CITY[d.city] ?? 1
  const ct = DEP_CTYPE[d.constructionType] ?? 1
  const isDev = d.propertyType.indexOf("Development") >= 0
  const common = isDev ? 1 + Math.min(0.15, Math.max(1, d.units) * 0.004 + Math.max(1, d.levels) * 0.008) : 1
  const cost = Math.max(0, d.floorArea) * rate * city * ct * common
  const peFrac = DEP_PE[d.propertyType] ?? 0.1
  const peBase = cost * peFrac
  const div43Base = cost * (1 - peFrac)

  const yb = d.yearBuilt === "Pre 1985" ? 1980 : Number.parseInt(d.yearBuilt, 10)
  const isRes = d.constructionType === "Residential"
  const div43Eligible = isRes ? yb >= 1987 : yb >= 1982
  const div43Annual = div43Eligible ? div43Base * 0.025 : 0

  let post: boolean
  if (d.yearPurchased === "2017 – after 9 May") post = true
  else if (d.yearPurchased === "2017 – before 9 May" || d.yearPurchased === "Pre 1985") post = false
  else post = Number.parseInt(d.yearPurchased, 10) >= 2018
  const peExcluded = isRes && !d.purchasedNew && post

  const dvr = 0.3
  const sched = (n: number) => (n === 1 ? dvr * 1.15 : dvr * Math.pow(1 - dvr, n - 1))
  const r = Math.max(0, d.marginalRate) / 100

  const rows: DepreciationYearRow[] = []
  let peMidSum = 0
  let d43Sum = 0
  for (let n = 1; n <= 5; n++) {
    const peMid = peExcluded ? 0 : peBase * sched(n)
    const d43 = div43Annual
    peMidSum += peMid
    d43Sum += d43
    const peMax = peMid * 1.12
    const d43Max = d43 * 1.12
    const totalMax = peMax + d43Max
    rows.push({ year: n, plantEquipment: peMax, div43: d43Max, total: totalMax, taxSaving: totalMax * r })
  }
  const total1Mid = (peExcluded ? 0 : peBase * sched(1)) + div43Annual
  const fiveMid = peMidSum + d43Sum

  return {
    cost,
    costMin: cost * 0.88,
    costMax: cost * 1.12,
    div43Eligible,
    div43Rate: div43Eligible ? 2.5 : 0,
    peExcluded,
    rows,
    peTotal: peMidSum * 1.12,
    d43Total: d43Sum * 1.12,
    firstMin: total1Mid * 0.88,
    firstMax: total1Mid * 1.12,
    fiveMin: fiveMid * 0.88,
    fiveMax: fiveMid * 1.12,
    fiveTaxMin: fiveMid * 0.88 * r,
    fiveTaxMax: fiveMid * 1.12 * r,
    year1PeMax: rows[0].plantEquipment,
  }
}

export function depreciationNote(est: DepreciationEstimate): string {
  const parts: string[] = []
  if (!est.div43Eligible) parts.push("The construction date falls outside the Division 43 capital-works window, so no building allowance is estimated.")
  if (est.peExcluded)
    parts.push(
      "Second-hand residential plant & equipment isn't deductible for a property contracted after 9 May 2017 (Div 40 rules) — only Division 43 capital works is shown.",
    )
  parts.push("Range reflects a ±12% construction-cost variance; the table shows the upper end. Indicative estimate only — not a depreciation schedule or taxation advice.")
  return parts.join(" ")
}
