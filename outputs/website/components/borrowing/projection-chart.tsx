"use client"

import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import type { ProjectionPoint } from "@/lib/borrowing-calculations"

type ProjectionSeriesKey = keyof Omit<ProjectionPoint, "year">

export interface ProjectionSeries {
  key: ProjectionSeriesKey
  label: string
  /** Maps to the project's chart-1 (navy) / chart-2 (orange) tokens. */
  color: "chart-1" | "chart-2"
}

interface TimeSeriesChartProps {
  data: ProjectionPoint[]
  series: ProjectionSeries[]
  /** "area" = single series with a wash fill under the line. "lines" = multiple
   * series as plain comparison lines. "stacked-area" = series stacked bottom-to-top
   * (first series at the base) so the top edge reads as the combined total. */
  variant: "area" | "lines" | "stacked-area"
  formatValue: (value: number) => string
  formatValueCompact: (value: number) => string
}

const VIEWBOX_W = 600
const VIEWBOX_H = 260
// These charts render at ~1/3 column width (three side by side), so axis text is sized up
// (and margins widened to fit it) to stay legible once the SVG's viewBox scales down.
const AXIS_FONT_SIZE = 20
const MARGIN = { top: 16, right: 12, bottom: 34, left: 74 }
const PLOT_W = VIEWBOX_W - MARGIN.left - MARGIN.right
const PLOT_H = VIEWBOX_H - MARGIN.top - MARGIN.bottom

const colorVar = { "chart-1": "var(--chart-1)", "chart-2": "var(--chart-2)" } as const

function niceMax(value: number): number {
  if (value <= 0) return 1
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)))
  const normalized = value / magnitude
  const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10
  return step * magnitude
}

export function TimeSeriesChart({ data, series, variant, formatValue, formatValueCompact }: TimeSeriesChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const years = data.map((d) => d.year)
  const minYear = years[0] ?? 0
  const maxYear = years[years.length - 1] ?? 1
  const yearSpan = Math.max(1, maxYear - minYear)

  const maxValue = useMemo(() => {
    if (variant === "stacked-area") {
      const totals = data.map((d) => series.reduce((sum, s) => sum + Math.max(0, d[s.key] ?? 0), 0))
      return niceMax(Math.max(...totals, 1))
    }
    const values = data.flatMap((d) => series.map((s) => d[s.key] ?? 0))
    return niceMax(Math.max(...values, 1))
  }, [data, series, variant])

  const xAt = (year: number) => MARGIN.left + ((year - minYear) / yearSpan) * PLOT_W
  const yAt = (value: number) => MARGIN.top + PLOT_H - (Math.max(0, value) / maxValue) * PLOT_H

  const linePath = (key: ProjectionSeriesKey) =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${xAt(d.year)},${yAt(d[key] ?? 0)}`).join(" ")

  const areaPath = (key: ProjectionSeriesKey) => {
    const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${xAt(d.year)},${yAt(d[key] ?? 0)}`).join(" ")
    return `${line} L${xAt(maxYear)},${yAt(0)} L${xAt(minYear)},${yAt(0)} Z`
  }

  const stackedBands = useMemo(() => {
    if (variant !== "stacked-area") return []
    let runningBase = data.map(() => 0)
    return series.map((s) => {
      const top = data.map((d, i) => runningBase[i] + Math.max(0, d[s.key] ?? 0))
      const topLine = data.map((d, i) => `${i === 0 ? "M" : "L"}${xAt(d.year)},${yAt(top[i])}`).join(" ")
      const bottomLine = [...data]
        .map((d, i) => `L${xAt(d.year)},${yAt(runningBase[i])}`)
        .reverse()
        .join(" ")
      const path = `${topLine} ${bottomLine} Z`
      const base = runningBase
      runningBase = top
      return { key: s.key, color: s.color, path, base, top }
    })
  }, [data, series, variant, minYear, maxYear, yearSpan, maxValue])

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => maxValue * f)
  // Fewer ticks than a full-width chart would use — these render at ~1/3 column width now.
  const yearTickStep = yearSpan <= 5 ? 1 : yearSpan <= 12 ? 5 : 10
  const yearTicks = years.filter((y) => y === minYear || y === maxYear || (y - minYear) % yearTickStep === 0)

  const handlePointer = (e: ReactPointerEvent<SVGRectElement>) => {
    const svg = e.currentTarget.ownerSVGElement
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * VIEWBOX_W
    const year = minYear + ((relX - MARGIN.left) / PLOT_W) * yearSpan
    let closest = 0
    let closestDist = Infinity
    data.forEach((d, i) => {
      const dist = Math.abs(d.year - year)
      if (dist < closestDist) {
        closestDist = dist
        closest = i
      }
    })
    setHoverIndex(closest)
  }

  const hovered = hoverIndex !== null ? data[hoverIndex] : null
  const hoveredXPct = hovered ? ((xAt(hovered.year) / VIEWBOX_W) * 100).toFixed(2) : null
  const tooltipLeftPct = hoveredXPct
    ? Math.min(82, Math.max(10, Number(hoveredXPct))).toFixed(2)
    : null

  return (
    <div className="relative" ref={containerRef}>
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        className="w-full"
        role="img"
        aria-label={`${series.map((s) => s.label).join(" vs ")} over ${yearSpan} years`}
      >
        {/* Gridlines */}
        {yTicks.map((t) => (
          <line
            key={t}
            x1={MARGIN.left}
            x2={VIEWBOX_W - MARGIN.right}
            y1={yAt(t)}
            y2={yAt(t)}
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}

        {/* Y-axis labels */}
        {yTicks.map((t) => (
          <text key={t} x={MARGIN.left - 8} y={yAt(t) + 3} textAnchor="end" fontSize={AXIS_FONT_SIZE} fill="var(--muted-foreground)">
            {formatValueCompact(t)}
          </text>
        ))}

        {/* X-axis labels — first/last right-align to their tick instead of centering, so they
            don't overflow the plot's edges now that the chart renders at ~1/3 column width. */}
        {yearTicks.map((y) => (
          <text
            key={y}
            x={xAt(y)}
            y={VIEWBOX_H - MARGIN.bottom + 22}
            textAnchor={y === minYear ? "start" : y === maxYear ? "end" : "middle"}
            fontSize={AXIS_FONT_SIZE}
            fill="var(--muted-foreground)"
          >
            Yr {y}
          </text>
        ))}

        {/* Marks */}
        {variant === "stacked-area" &&
          stackedBands.map((band) => (
            <path key={band.key} d={band.path} fill={colorVar[band.color]} fillOpacity={0.22} />
          ))}

        {variant === "area" &&
          series.map((s) => <path key={s.key} d={areaPath(s.key)} fill={colorVar[s.color]} fillOpacity={0.1} />)}

        {(variant === "area" || variant === "lines") &&
          series.map((s) => (
            <path
              key={s.key}
              d={linePath(s.key)}
              fill="none"
              stroke={colorVar[s.color]}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

        {variant === "stacked-area" &&
          stackedBands.map((band) => (
            <path
              key={`${band.key}-line`}
              d={data.map((d, i) => `${i === 0 ? "M" : "L"}${xAt(d.year)},${yAt(band.top[i])}`).join(" ")}
              fill="none"
              stroke={colorVar[band.color]}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

        {/* End-of-line direct labels */}
        {(variant === "area" || variant === "lines") &&
          series.map((s) => {
            const last = data[data.length - 1]
            return (
              <g key={`${s.key}-end`}>
                <circle cx={xAt(last.year)} cy={yAt(last[s.key] ?? 0)} r={4} fill={colorVar[s.color]} stroke="var(--card)" strokeWidth={2} />
              </g>
            )
          })}

        {/* Crosshair */}
        {hovered ? (
          <>
            <line
              x1={xAt(hovered.year)}
              x2={xAt(hovered.year)}
              y1={MARGIN.top}
              y2={VIEWBOX_H - MARGIN.bottom}
              stroke="var(--border)"
              strokeWidth={1}
            />
            {variant === "stacked-area"
              ? stackedBands.map((band) => (
                  <circle
                    key={`${band.key}-hover`}
                    cx={xAt(hovered.year)}
                    cy={yAt(band.top[hoverIndex ?? 0])}
                    r={4}
                    fill={colorVar[band.color]}
                    stroke="var(--card)"
                    strokeWidth={2}
                  />
                ))
              : series.map((s) => (
                  <circle
                    key={`${s.key}-hover`}
                    cx={xAt(hovered.year)}
                    cy={yAt(hovered[s.key] ?? 0)}
                    r={4}
                    fill={colorVar[s.color]}
                    stroke="var(--card)"
                    strokeWidth={2}
                  />
                ))}
          </>
        ) : null}

        {/* Hover hit area — covers the whole plot */}
        <rect
          x={MARGIN.left}
          y={MARGIN.top}
          width={PLOT_W}
          height={PLOT_H}
          fill="transparent"
          onPointerMove={handlePointer}
          onPointerLeave={() => setHoverIndex(null)}
          className="cursor-crosshair"
        />
      </svg>

      {hovered && tooltipLeftPct ? (
        <div
          className="pointer-events-none absolute top-8 z-10 -translate-x-1/2 rounded-lg border border-border bg-popover p-2.5 text-xs shadow-lg"
          style={{ left: `${tooltipLeftPct}%` }}
        >
          <p className="mb-1 font-semibold text-foreground">Year {hovered.year}</p>
          <div className="flex flex-col gap-1">
            {variant === "stacked-area"
              ? [...series].reverse().map((s) => (
                  <div key={s.key} className="flex items-center gap-1.5">
                    <span className="h-0.5 w-3 shrink-0 rounded-full" style={{ backgroundColor: colorVar[s.color] }} />
                    <span className="text-muted-foreground">{s.label}:</span>
                    <span className="font-semibold text-foreground">{formatValue(hovered[s.key] ?? 0)}</span>
                  </div>
                ))
              : series.map((s) => (
                  <div key={s.key} className="flex items-center gap-1.5">
                    <span className="h-0.5 w-3 shrink-0 rounded-full" style={{ backgroundColor: colorVar[s.color] }} />
                    <span className="text-muted-foreground">{s.label}:</span>
                    <span className="font-semibold text-foreground">{formatValue(hovered[s.key] ?? 0)}</span>
                  </div>
                ))}
          </div>
        </div>
      ) : null}

      {series.length > 1 ? (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 shrink-0 rounded-full" style={{ backgroundColor: colorVar[s.color] }} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function formatCurrencyCompact(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? "-" : ""
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M`
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(0)}K`
  return `${sign}$${abs.toFixed(0)}`
}
