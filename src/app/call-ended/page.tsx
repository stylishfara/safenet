"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Phone } from "lucide-react"

const SUBTITLES: Record<string, string> = {
  police: "Stay safe as police authorities arrive at your location",
  fire: "Help is on the way. Evacuate safely and wait for fire services",
  medical: "Medical assistance is on its way. Stay calm and remain still",
}

function CallEndedContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "police"
  const subtitle = SUBTITLES[type] ?? SUBTITLES.police

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white md:h-[874px] md:w-[402px]">

        {/* Centered content */}
        <div className="flex flex-1 flex-col items-center justify-center gap-[20px] px-[53px]">
          <div className="flex size-[64px] items-center justify-center rounded-[10px] bg-[#f5f5f5]">
            <Phone size={32} className="text-[#262626]" />
          </div>
          <div className="flex flex-col items-center gap-[8px] text-center">
            <p className="text-[16px] font-semibold leading-[24px] text-[#262626]">Call has ended</p>
            <p className="text-[14px] font-normal leading-[21px] text-[#737373]">{subtitle}</p>
          </div>
        </div>

        {/* Go home button */}
        <div className="px-[16px] pb-[40px]">
          <button
            onClick={() => router.push("/home")}
            className="flex h-[48px] w-full items-center justify-center rounded-[49px] bg-[#171717] text-[16px] font-semibold text-white"
          >
            Go home
          </button>
        </div>

      </div>
    </div>
  )
}

export default function CallEnded() {
  return (
    <Suspense>
      <CallEndedContent />
    </Suspense>
  )
}
