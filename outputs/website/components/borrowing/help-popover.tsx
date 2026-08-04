"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface HelpPopoverProps {
  label: string
  title?: string
  children: ReactNode
  triggerClassName?: string
}

/**
 * Dependency-free click-to-open help popover. Replaces the base-ui Popover
 * from the original export so the calculator drops that extra dependency.
 *
 * Renders via a portal into document.body with fixed, viewport-relative
 * positioning — several triggers sit inside the sticky input panel, which
 * scrolls its own content (overflow-y-auto) and would otherwise clip any
 * absolutely-positioned popover that overflows its bounds.
 */
const POPOVER_WIDTH_PX = 320 // matches w-80
const VIEWPORT_MARGIN_PX = 12

export function HelpPopover({ label, title, children, triggerClassName }: HelpPopoverProps) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    // A fixed-position popover doesn't track its trigger when an ancestor
    // (e.g. the sticky sidebar) scrolls internally, so close it instead of
    // letting it drift away from the button that opened it.
    const onScroll = () => setOpen(false)
    const onResize = () => setOpen(false)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onResize)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  useEffect(() => {
    if (!open || !wrapperRef.current) return
    const { left: triggerLeft, bottom: triggerBottom } = wrapperRef.current.getBoundingClientRect()
    const width = Math.min(POPOVER_WIDTH_PX, window.innerWidth - VIEWPORT_MARGIN_PX * 2)
    const maxLeft = window.innerWidth - VIEWPORT_MARGIN_PX - width
    const left = Math.min(Math.max(triggerLeft, VIEWPORT_MARGIN_PX), maxLeft)
    setPosition({ top: triggerBottom + 8, left })
  }, [open])

  return (
    <span className="relative inline-flex" ref={wrapperRef}>
      <button
        type="button"
        aria-label={title ?? `What is ${label}?`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex size-4 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          triggerClassName,
        )}
      >
        <HelpCircle className="size-3.5" />
      </button>
      {open && position
        ? createPortal(
            <div
              ref={popoverRef}
              style={{ top: position.top, left: position.left }}
              className="fixed z-50 w-80 max-w-[calc(100vw-1.5rem)] rounded-lg border border-border bg-popover p-3 text-sm leading-relaxed text-popover-foreground shadow-lg"
            >
              <p className="mb-1 font-semibold text-foreground">{title ?? label}</p>
              <div className="text-muted-foreground [&_p]:mb-2 [&_p:last-child]:mb-0">{children}</div>
            </div>,
            document.body,
          )
        : null}
    </span>
  )
}
