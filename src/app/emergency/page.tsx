"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const ALERT_DESTINATIONS: Record<string, string> = {
  police: "/police-alert",
  fire: "/fire-alert",
  medical: "/medical-alert",
}

const ALERT_MESSAGES: Record<string, string> = {
  police: "Contacting the police while sharing your location with emergency contacts.",
  fire: "Contacting the fire service while sharing your location with emergency contacts.",
  medical: "Contacting medical services while sharing your location with emergency contacts.",
}

function EmergencyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "police"
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (count <= 0) {
      router.push(ALERT_DESTINATIONS[type] ?? "/police-alert")
      return
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count, router, type])

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#ffe2e2] md:h-[874px] md:w-[402px]">

        <div className="flex flex-col items-center gap-[64px]">
          <div
            className="flex items-center justify-center rounded-full bg-[#febaba]"
            style={{ width: 180, height: 180, border: "7.5px dashed #fb2c36" }}
          >
            <span className="text-[60px] font-medium leading-none text-[#fb2c36]">{count}</span>
          </div>

          <p className="w-[330px] text-center text-[20px] font-medium leading-[26px] text-[#262626]">
            {ALERT_MESSAGES[type]}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-[20px] pb-[40px]">
          <button
            onClick={() => router.push("/home")}
            className="flex h-[48px] w-full items-center justify-center rounded-[51px] border border-[#e5e5e5] bg-white text-[16px] font-semibold text-[#262626] shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
          >
            Cancel alert
          </button>
        </div>

      </div>
    </div>
  )
}

export default function Emergency() {
  return (
    <Suspense>
      <EmergencyContent />
    </Suspense>
  )
}
