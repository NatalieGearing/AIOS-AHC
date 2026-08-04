"use client"

import { Plus, Trash2 } from "lucide-react"
import { type LineItem, formatCurrency, newId, sumLineItems } from "@/lib/feasibility-calculations"

interface LineItemEditorProps {
  items: LineItem[]
  onChange: (items: LineItem[]) => void
  addLabel?: string
  idPrefix?: string
}

export function LineItemEditor({ items, onChange, addLabel = "Add line item", idPrefix = "item" }: LineItemEditorProps) {
  const update = (id: string, patch: Partial<LineItem>) => onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id))
  const add = () => onChange([...items, { id: newId(idPrefix), label: "New item", amount: 0 }])

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            value={item.label}
            onChange={(e) => update(item.id, { label: e.target.value })}
            aria-label="Line item description"
            className="min-w-0 flex-1 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="flex shrink-0 items-center rounded-md border border-input bg-background px-2 py-1 text-sm">
            <span className="text-muted-foreground">$</span>
            <input
              inputMode="decimal"
              value={item.amount}
              onChange={(e) => update(item.id, { amount: Number(e.target.value.replace(/[^0-9.]/g, "")) || 0 })}
              aria-label="Line item amount"
              className="w-20 bg-transparent text-right outline-none tabular-nums"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(item.id)}
            aria-label={`Remove ${item.label}`}
            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-primary transition-colors hover:bg-accent"
        >
          <Plus className="size-3.5" />
          {addLabel}
        </button>
        <span className="text-sm font-semibold tabular-nums text-foreground">{formatCurrency(sumLineItems(items))}</span>
      </div>
    </div>
  )
}
