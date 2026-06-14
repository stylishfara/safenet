"use client"

import { cn } from "@/lib/utils"
import { ChevronRight, Settings } from "lucide-react"
import React from "react"
import { BadgeNumber } from "./badge-number"

export interface SidebarItem {
  icon?: React.ReactNode
  label: string
  secondary?: string
  badge?: number
  href?: string
  active?: boolean
}

export interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

interface SidebarNavProps {
  workspaceName?: string
  workspaceRole?: string
  groups?: SidebarGroup[]
  footerLabel?: string
  footerSecondary?: string
  className?: string
}

function MenuButton({ item }: { item: SidebarItem }) {
  return (
    <a
      href={item.href ?? "#"}
      className={cn(
        "flex h-8 w-[240px] items-center gap-2 rounded-[8px] px-2 text-[14px] font-normal transition-colors",
        item.active
          ? "bg-[rgb(245,245,245)] text-[rgb(38,38,38)]"
          : "text-[rgb(38,38,38)] hover:bg-[rgb(245,245,245)]"
      )}
    >
      {item.icon && (
        <span className="text-[rgb(115,115,115)]">{item.icon}</span>
      )}
      <span className="flex-1 truncate">{item.label}</span>
      {item.secondary && (
        <span className="text-[12px] text-[rgb(115,115,115)]">{item.secondary}</span>
      )}
      {item.badge !== undefined && (
        <BadgeNumber count={item.badge} variant="light" />
      )}
    </a>
  )
}

export function SidebarNav({
  workspaceName = "Workspace",
  workspaceRole = "Admin",
  groups = [],
  footerLabel = "Admin Settings",
  footerSecondary,
  className,
}: SidebarNavProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col bg-[rgb(250,250,250)]",
        className
      )}
    >
      {/* header */}
      <div className="flex h-[66px] items-center p-2">
        <button className="flex h-[50px] w-[240px] items-center gap-2 rounded-[8px] px-2 hover:bg-[rgb(245,245,245)]">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(16,185,129)] text-[14px] font-medium text-white">
            {workspaceName.charAt(0)}
          </div>
          <div className="flex flex-1 flex-col items-start gap-0.5 min-w-0">
            <span className="truncate text-[14px] font-medium text-[rgb(38,38,38)]">
              {workspaceName}
            </span>
            <span className="text-[12px] text-[rgb(115,115,115)]">{workspaceRole}</span>
          </div>
          <ChevronRight size={16} className="flex-shrink-0 text-[rgb(115,115,115)]" />
        </button>
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {groups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-0 p-2">
            <div className="flex h-8 items-center justify-between px-2">
              <span className="text-[12px] text-[rgb(115,115,115)]">{group.label}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item, ii) => (
                <MenuButton key={ii} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="flex h-12 items-center p-2">
        <button className="flex h-8 w-[240px] items-center gap-2 rounded-[8px] px-2 text-[14px] font-normal hover:bg-[rgb(245,245,245)]">
          <Settings size={16} className="text-[rgb(115,115,115)]" />
          <span className="flex-1 truncate text-[rgb(38,38,38)]">{footerLabel}</span>
          {footerSecondary && (
            <span className="text-[12px] text-[rgb(115,115,115)]">{footerSecondary}</span>
          )}
        </button>
      </div>
    </aside>
  )
}
