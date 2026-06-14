"use client"

import { cn } from "@/lib/utils"
import { Ellipsis } from "lucide-react"

interface NotificationTileProps {
  avatar?: string
  name: string
  action: string
  time: string
  label?: string
  className?: string
}

export function NotificationTile({
  avatar,
  name,
  action,
  time,
  label,
  className,
}: NotificationTileProps) {
  return (
    <div
      className={cn(
        "group flex w-full items-center gap-3 rounded-[8px] bg-white p-2 transition-colors hover:bg-[rgb(245,245,245)]",
        className
      )}
    >
      {/* avatar */}
      <div className="relative flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(245,245,245)] text-[14px] font-medium text-[rgb(38,38,38)]">
          {avatar ?? name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {label && (
          <span className="w-fit rounded-[32px] bg-[rgb(16,185,129)] px-2 py-0.5 text-[12px] text-[rgb(250,250,250)]">
            {label}
          </span>
        )}
        <p className="text-[14px] font-normal text-[rgb(115,115,115)] leading-snug">
          <span className="font-medium text-[rgb(38,38,38)]">{name}</span>{" "}
          {action}
        </p>
      </div>

      {/* meta */}
      <div className="flex flex-shrink-0 flex-col items-end gap-3 self-start pt-0.5">
        <Ellipsis size={16} className="text-[rgb(115,115,115)]" />
        <span className="text-[12px] font-medium text-[rgb(115,115,115)]">{time}</span>
      </div>
    </div>
  )
}
