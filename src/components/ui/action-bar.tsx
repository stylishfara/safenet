"use client"

import { cn } from "@/lib/utils"
import { Ellipsis } from "lucide-react"
import React from "react"

interface ActionBarButton {
  label: string
  onClick?: () => void
  primary?: boolean
  icon?: React.ReactNode
}

interface ActionBarProps {
  resultCount?: string
  selectedCount?: number
  onClearSelection?: () => void
  buttons?: ActionBarButton[]
  className?: string
}

function BarButton({
  label,
  onClick,
  primary,
  icon,
}: ActionBarButton) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-8 items-center gap-2 rounded-[8px] px-3 text-[12px] font-medium transition-colors",
        primary
          ? "bg-[rgb(16,185,129)] text-[rgb(250,250,250)] hover:bg-[rgb(14,165,115)]"
          : "bg-white text-[rgb(38,38,38)] ring-1 ring-inset ring-[rgb(229,229,229)] hover:bg-[rgb(245,245,245)]"
      )}
    >
      {icon}
      {label}
    </button>
  )
}

export function ActionBar({
  resultCount = "0 results",
  selectedCount,
  onClearSelection,
  buttons = [],
  className,
}: ActionBarProps) {
  return (
    <div
      className={cn(
        "flex h-14 w-full items-center gap-4 bg-white px-4 py-3",
        className
      )}
    >
      <span className="text-[12px] text-[rgb(115,115,115)]">{resultCount}</span>

      <div className="h-5 w-px bg-[rgb(229,229,229)]" />

      {selectedCount !== undefined && (
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-medium text-[rgb(115,115,115)]">
            Clear {selectedCount} Selected
          </span>
        </div>
      )}

      <div className="ml-auto flex items-center gap-3">
        {buttons.map((btn, i) => (
          <BarButton key={i} {...btn} />
        ))}
        <button className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-white ring-1 ring-inset ring-[rgb(229,229,229)] hover:bg-[rgb(245,245,245)]">
          <Ellipsis size={16} className="text-[rgb(38,38,38)]" />
        </button>
      </div>
    </div>
  )
}
