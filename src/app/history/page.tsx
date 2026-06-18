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
            <div className="mb-[16px] flex h-[48px] items-center gap-[8px] rounded-[12px] border border-[#e5e5e5] bg-white px-[16px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
              <Search size={18} className="shrink-0 text-[#737373]" />
              <input
                type="text"
                placeholder="Search calls"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-[14px] font-medium text-[#262626] placeholder:text-[#737373] outline-none"
              />
            </div>

            {/* Type filter chips */}
            <div className="mb-[24px] flex gap-[8px]">
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className="flex h-[32px] items-center rounded-[51px] px-[14px] text-[13px] font-semibold transition-colors"
                  style={
                    typeFilter === f.value
                      ? { backgroundColor: "#262626", color: "white" }
                      : { backgroundColor: "#f5f5f5", color: "#737373" }
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
                      {/* Color-coded icon */}
                      <div
                        className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px]"
                        style={{ backgroundColor: TYPE_COLORS[r.type] + "18" }}
                      >
                        <PhoneCall size={20} style={{ color: TYPE_COLORS[r.type] }} />
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col gap-[2px] min-w-0">
                        <span
                          className="text-[11px] font-semibold uppercase tracking-wide"
                          style={{ color: TYPE_COLORS[r.type] }}
                        >
                          {TYPE_LABELS[r.type]}
                        </span>
                        <p className="truncate text-[14px] font-semibold leading-[20px] text-[#262626]">{r.stationName}</p>
                        <p className="text-[12px] font-medium text-[#737373]">{formatDate(r.date)} · {formatTime(r.date)}</p>
                      </div>

                      {/* Duration */}
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
