"use client"

import { cn } from "@/lib/utils"
import { Ellipsis } from "lucide-react"

interface BoardCardField {
  label: string
  value: string
}

interface BoardCardProps {
  title: string
  subtitle?: string
  open?: boolean
  status?: string
  fields?: BoardCardField[]
  activityUser?: string
  activityTime?: string
  className?: string
}

export function BoardCard({
  title,
  subtitle,
  open = true,
  status,
  fields = [],
  activityUser,
  activityTime = "5 Days ago",
  className,
}: BoardCardProps) {
  return (
    <div
      className={cn(
        "flex w-[300px] flex-col gap-3 rounded-[12px] bg-white p-3",
        className
      )}
    >
      {/* header */}
      <div className="flex items-center gap-[7px]">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(245,245,245)] text-[10px] font-medium text-[rgb(38,38,38)]">
          {title.charAt(0)}
        </div>
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <span className="truncate text-[14px] font-medium text-[rgb(38,38,38)]">{title}</span>
          {subtitle && (
            <span className="truncate text-[12px] text-[rgb(115,115,115)]">{subtitle}</span>
          )}
        </div>
        <button className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[8px] bg-[rgb(245,245,245)]">
          <Ellipsis size={14} className="text-[rgb(115,115,115)]" />
        </button>
      </div>

      <div className="h-px w-full bg-[rgb(245,245,245)]" />

      {/* body — only shown when open */}
      {open && (
        <div className="flex flex-col gap-3 px-1">
          {status && (
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-[32px] bg-[rgb(220,252,231)] px-2 py-0.5 text-[12px] text-[rgb(22,163,74)]">
                {status}
              </span>
            </div>
          )}
          {fields.map((f, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-[12px] text-[rgb(115,115,115)]">{f.label}</span>
              <span className="text-[14px] text-[rgb(38,38,38)]">{f.value}</span>
            </div>
          ))}
        </div>
      )}

      {open && <div className="h-px w-full bg-[rgb(245,245,245)]" />}

      {/* activity footer */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded-sm bg-[rgb(245,245,245)]" />
        {activityUser && (
          <span className="text-[12px] text-[rgb(38,38,38)]">{activityUser}</span>
        )}
        <span className="text-[12px] text-[rgb(115,115,115)]">· {activityTime}</span>
      </div>
    </div>
  )
}
