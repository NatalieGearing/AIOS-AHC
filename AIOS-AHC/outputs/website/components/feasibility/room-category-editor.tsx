"use client"

import { Plus, Trash2 } from "lucide-react"
import { type RoomCategory, newId } from "@/lib/feasibility-calculations"

interface RoomCategoryEditorProps {
  categories: RoomCategory[]
  onChange: (categories: RoomCategory[]) => void
}

export function RoomCategoryEditor({ categories, onChange }: RoomCategoryEditorProps) {
  const update = (id: string, patch: Partial<RoomCategory>) =>
    onChange(categories.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  const remove = (id: string) => onChange(categories.filter((c) => c.id !== id))
  const add = () => onChange([...categories, { id: newId("room"), label: "New room type", rooms: 1, weeklyRent: 250 }])

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_5rem_6rem_2rem] gap-2 px-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Room type</span>
        <span className="text-right">Rooms</span>
        <span className="text-right">Weekly rent</span>
        <span />
      </div>
      {categories.map((cat) => (
        <div key={cat.id} className="grid grid-cols-[1fr_5rem_6rem_2rem] items-center gap-2">
          <input
            value={cat.label}
            onChange={(e) => update(cat.id, { label: e.target.value })}
            aria-label="Room type label"
            className="min-w-0 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <input
            inputMode="numeric"
            value={cat.rooms}
            onChange={(e) => update(cat.id, { rooms: Number(e.target.value.replace(/[^0-9]/g, "")) || 0 })}
            aria-label="Number of rooms"
            className="rounded-md border border-input bg-background px-2 py-1.5 text-right text-sm tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="flex items-center rounded-md border border-input bg-background px-2 py-1.5 text-sm">
            <span className="text-muted-foreground">$</span>
            <input
              inputMode="decimal"
              value={cat.weeklyRent}
              onChange={(e) => update(cat.id, { weeklyRent: Number(e.target.value.replace(/[^0-9.]/g, "")) || 0 })}
              aria-label="Weekly rent"
              className="w-full min-w-0 bg-transparent text-right outline-none tabular-nums"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(cat.id)}
            aria-label={`Remove ${cat.label}`}
            className="justify-self-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 self-start rounded-md px-2 py-1 text-sm font-medium text-primary transition-colors hover:bg-accent"
      >
        <Plus className="size-3.5" />
        Add room type
      </button>
    </div>
  )
}
