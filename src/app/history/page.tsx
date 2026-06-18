"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, PhoneCall, PhoneMissed } from "lucide-react"
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

type SortKey = "date-desc" | "date-asc" | "type" | "status"

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "date-desc", label: "Newest first" },
  { value: "date-asc", label: "Oldest first" },
  { value: "type", label: "By type" },
  { value: "status", label: "By status" },
]

const TYPE_FILTERS: { value: AlertType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "police", label: "Police" },
  { value: "fire", label: "Fire" },
  { value: "medical", label: "Medical" },
]

function sortRecords(records: CallRecord[], sort: SortKey): CallRecord[] {
  return [...records].sort((a, b) => {
    switch (sort) {
      case "date-desc": return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "date-asc":  return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "type":      return a.type.localeCompare(b.type)
      case "status":    return a.status.localeCompare(b.status)
      default:          return 0
    }
  })
}

export default function History() {
  const [records, setRecords] = useState<CallRecord[]>([])
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("date-desc")
  const [typeFilter, setTypeFilter] = useState<AlertType | "all">("all")
  const [showSort, setShowSort] = useState(false)

  useEffect(() => {
    setRecords(getHistory())
  }, [])

  const filtered = sortRecords(
    records.filter((r) => {
      const matchesQuery =
        r.stationName.toLowerCase().includes(query.toLowerCase()) ||
        TYPE_LABELS[r.type].toLowerCase().includes(query.toLowerCase())
      const matchesType = typeFilter === "all" || r.type === typeFilter
      return matchesQuery && matchesType
    }),
    sort
  )

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort"

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <div className="relative h-full w-full overflow-hidden bg-white md:h-[874px] md:w-[402px]">

        <div className="h-full overflow-y-auto pb-[100px]">
          <div className="px-[20px] pt-[52px]">

            {/* Header */}
            <div className="mb-[24px]">
              <h1 className="text-[20px] font-semibold leading-[26px] text-[#262626]">Call History</h1>
            </div>

            {/* Search + Sort row */}
            <div className="mb-[16px] flex gap-[8px]">
              <div className="flex flex-1 h-[48px] items-center gap-[8px] rounded-[12px] border border-[#e5e5e5] bg-white px-[16px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                <Search size={18} className="shrink-0 text-[#737373]" />
                <input
                  type="text"
                  placeholder="Search calls"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-[14px] font-medium text-[#262626] placeholder:text-[#737373] outline-none"
                />
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSort((s) => !s)}
                  className="flex h-[48px] items-center gap-[6px] rounded-[12px] border border-[#e5e5e5] bg-white px-[12px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
                >
                  <span className="text-[13px] font-medium text-[#262626] whitespace-nowrap">{currentSortLabel}</span>
                  <ChevronDown size={16} className="text-[#737373]" />
                </button>
                {showSort && (
                  <div className="absolute right-0 top-[52px] z-20 w-[160px] rounded-[10px] border border-[#f5f5f5] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
                    {SORT_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => { setSort(o.value); setShowSort(false) }}
                        className={`flex w-full items-center px-[12px] py-[10px] text-left text-[13px] font-medium ${sort === o.value ? "text-[#262626]" : "text-[#737373]"}`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

            {/* Results count */}
            {query || typeFilter !== "all" ? (
              <p className="mb-[12px] text-[12px] font-medium text-[#737373]">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
            ) : null}

            {/* Call list */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-[8px] pt-[60px] text-center">
                <p className="text-[16px] font-semibold text-[#262626]">No calls found</p>
                <p className="text-[14px] text-[#737373]">Try a different search or filter</p>
              </div>
            ) : (
              <div className="flex flex-col gap-[1px] overflow-hidden rounded-[16px] border border-[#f5f5f5]">
                {filtered.map((r, i) => (
                  <div
                    key={r.id}
                    className={`flex items-center gap-[12px] bg-white px-[16px] py-[14px] ${i < filtered.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}
                  >
                    {/* Type dot + icon */}
                    <div
                      className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px]"
                      style={{ backgroundColor: TYPE_COLORS[r.type] + "18" }}
                    >
                      {r.status === "connected" ? (
                        <PhoneCall size={20} style={{ color: TYPE_COLORS[r.type] }} />
                      ) : (
                        <PhoneMissed size={20} style={{ color: "#fb2c36" }} />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col gap-[2px] min-w-0">
                      <div className="flex items-center gap-[6px]">
                        <span
                          className="text-[11px] font-semibold uppercase tracking-wide"
                          style={{ color: TYPE_COLORS[r.type] }}
                        >
                          {TYPE_LABELS[r.type]}
                        </span>
                        {r.status === "missed" && (
                          <span className="text-[11px] font-semibold text-[#fb2c36]">· Missed</span>
                        )}
                      </div>
                      <p className="truncate text-[14px] font-semibold leading-[20px] text-[#262626]">{r.stationName}</p>
                      <p className="text-[12px] font-medium text-[#737373]">{formatDate(r.date)} · {formatTime(r.date)}</p>
                    </div>

                    {/* Duration */}
                    <div className="shrink-0 text-right">
                      <span className="text-[13px] font-semibold text-[#262626]">{r.duration}</span>
                    </div>
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
