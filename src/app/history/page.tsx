"use client"

import { useState, useEffect } from "react"
import { Search, PhoneCall } from "lucide-react"
import BottomNav from "@/components/mobile/bottom-nav"
import {
  getHistory,
  formatDate,
  formatTime,
  TYPE_LABELS,
  TYPE_COLORS,
  type CallRecord,
  type AlertType,
} from "@/lib/history"

// Lume Badge1 tokens: Error=police, Success=fire, Information=medical
const BADGE_BG: Record<AlertType, string> = {
  police: "#ffe2e2",   // Base/Destructive-accent-background
  fire:   "#dcfce7",   // Base/Success-accent-background
  medical:"#dbeafe",   // Base/Information-accent-background
}
const BADGE_TEXT: Record<AlertType, string> = {
  police: "#e7000b",   // Base/Destructive-accent-foreground
  fire:   "#008236",   // Base/Success-accent-foreground
  medical:"#2b7fff",   // Base/Information-accent-foreground
}

const TYPE_FILTERS: { value: AlertType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "police", label: "Police" },
  { value: "fire", label: "Fire" },
  { value: "medical", label: "Medical" },
]

export default function History() {
  const [records, setRecords] = useState<CallRecord[]>([])
  const [query, setQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<AlertType | "all">("all")

  useEffect(() => {
    setRecords(getHistory())
  }, [])

  const filtered = records.filter((r) => {
    if (r.status === "missed") return false
    const matchesQuery =
      r.stationName.toLowerCase().includes(query.toLowerCase()) ||
      TYPE_LABELS[r.type].toLowerCase().includes(query.toLowerCase())
    const matchesType = typeFilter === "all" || r.type === typeFilter
    return matchesQuery && matchesType
  })

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <div className="relative h-full w-full overflow-hidden bg-white md:h-[874px] md:w-[402px]">

        <div className="h-full overflow-y-auto pb-[100px]">
          <div className="px-[20px] pt-[52px]">

            {/* Header */}
            <div className="mb-[24px]">
              <h1 className="text-[20px] font-semibold leading-[26px] text-[#262626]">Call History</h1>
            </div>

            {/* Search */}
            <div className="mb-[16px] flex h-[40px] items-center gap-[8px] rounded-[12px] border border-[#e5e5e5] bg-white px-[16px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
              <Search size={18} className="shrink-0 text-[#737373]" />
              <input
                type="text"
                placeholder="Search calls"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-[14px] font-medium text-[#262626] placeholder:text-[#737373] outline-none"
              />
            </div>

            {/* Type filter — Lume Segmented Control / Default / Square */}
            <div className="mb-[24px] flex h-[36px] items-center rounded-[8px] border border-[#f5f5f5] bg-[#f5f5f5] p-[2px]">
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className="flex h-full flex-1 items-center justify-center rounded-[6px] px-[8px] text-[14px] font-medium transition-all whitespace-nowrap"
                  style={
                    typeFilter === f.value
                      ? { backgroundColor: "white", color: "#171717", boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" }
                      : { backgroundColor: "transparent", color: "#737373" }
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Call list */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-[8px] pt-[60px] text-center">
                <p className="text-[16px] font-semibold text-[#262626]">No calls found</p>
                <p className="text-[14px] text-[#737373]">Try a different search or filter</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {filtered.map((r, i) => (
                  <div key={r.id}>
                    <div className="flex items-center gap-[12px] py-[14px]">
                      {/* Icon — grey bg, black icon */}
                      <div className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#f5f5f5]">
                        <PhoneCall size={20} className="text-[#262626]" />
                      </div>

                      {/* Left: name + date + chip */}
                      <div className="flex flex-1 flex-col gap-[2px] min-w-0">
                        <p className="truncate text-[14px] font-semibold leading-[20px] text-[#262626]">{r.stationName}</p>
                        <p className="text-[12px] font-medium text-[#737373]">{formatDate(r.date)} · {formatTime(r.date)}</p>
                        <div
                          className="mt-[2px] flex w-fit items-center max-h-[22px] rounded-[32px] px-[8px] py-[2px]"
                          style={{ backgroundColor: BADGE_BG[r.type] }}
                        >
                          <span
                            className="text-[12px] font-semibold leading-[18px] whitespace-nowrap"
                            style={{ color: BADGE_TEXT[r.type] }}
                          >
                            {TYPE_LABELS[r.type]}
                          </span>
                        </div>
                      </div>

                      {/* Right: duration */}
                      <span className="shrink-0 text-[13px] font-semibold text-[#262626]">{r.duration}</span>
                    </div>
                    {i < filtered.length - 1 && (
                      <div className="ml-[56px] h-px bg-[#f5f5f5]" />
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        <BottomNav active="history" />
      </div>
    </div>
  )
}
