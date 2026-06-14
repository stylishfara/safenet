export type AlertType = "police" | "fire" | "medical"
export type CallStatus = "connected" | "missed"

export type CallRecord = {
  id: string
  type: AlertType
  stationName: string
  date: string      // ISO string
  duration: string  // e.g. "2m 34s" or "—" for missed
  status: CallStatus
}

export const historyStore: CallRecord[] = [
  { id: "1", type: "police", stationName: "Tema Police Station", date: "2026-06-13T14:22:00", duration: "4m 12s", status: "connected" },
  { id: "2", type: "medical", stationName: "37 Military Hospital", date: "2026-06-12T08:05:00", duration: "1m 48s", status: "connected" },
  { id: "3", type: "fire", stationName: "Tema Fire Station", date: "2026-06-11T20:44:00", duration: "—", status: "missed" },
  { id: "4", type: "police", stationName: "Accra Central Police", date: "2026-06-10T11:30:00", duration: "6m 03s", status: "connected" },
  { id: "5", type: "medical", stationName: "Korle Bu Teaching Hospital", date: "2026-06-09T16:17:00", duration: "—", status: "missed" },
  { id: "6", type: "fire", stationName: "Osu Fire Station", date: "2026-06-08T09:55:00", duration: "2m 20s", status: "connected" },
  { id: "7", type: "police", stationName: "Labadi Police Station", date: "2026-06-07T22:10:00", duration: "3m 47s", status: "connected" },
  { id: "8", type: "medical", stationName: "Ridge Hospital", date: "2026-06-06T13:01:00", duration: "—", status: "missed" },
]

export function getHistory(): CallRecord[] {
  return [...historyStore].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function addHistory(r: Omit<CallRecord, "id">): CallRecord {
  const record = { ...r, id: Date.now().toString() }
  historyStore.unshift(record)
  return record
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
}

export const TYPE_LABELS: Record<AlertType, string> = {
  police: "Police",
  fire: "Fire",
  medical: "Medical",
}

export const TYPE_COLORS: Record<AlertType, string> = {
  police: "#c95c5c",
  fire: "#66863e",
  medical: "#4f6db8",
}
