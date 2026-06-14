"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import BottomNav from "@/components/mobile/bottom-nav"

type AlertType = "police" | "fire" | "medical"

const ALERTS = [
  {
    type: "police" as AlertType,
    title: "Police Alert",
    subtitle: "Crime, Theft, Violent suspicion",
    bg: "#c95c5c",
  },
  {
    type: "fire" as AlertType,
    title: "Fire Alert",
    subtitle: "Fire outbreak, gas leak, etc",
    bg: "#66863e",
  },
  {
    type: "medical" as AlertType,
    title: "Medical Alert",
    subtitle: "Accident, Injuries, etc",
    bg: "#4f6db8",
  },
]

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <div className="relative h-full w-full overflow-hidden bg-[#fafafa] md:h-[874px] md:w-[402px]">

        <div className="h-full overflow-y-auto pb-[100px]">
          <div className="px-[20px] pt-[52px]">

            <div className="mb-[32px] flex flex-col gap-[8px]">
              <h1 className="text-[20px] font-semibold leading-[26px] text-[#262626]">Hello Efua</h1>
              <p className="text-[16px] font-medium leading-[24px] text-[#737373]">
                Hold any button below to instantly alert the right service
              </p>
            </div>

            <div className="flex flex-col gap-[8px]">
              {ALERTS.map((alert) => (
                <button
                  key={alert.type}
                  onClick={() => router.push(`/emergency?type=${alert.type}`)}
                  className="flex w-full items-center justify-between rounded-[24px] px-[16px] py-[24px] text-left"
                  style={{ backgroundColor: alert.bg }}
                >
                  <div className="flex flex-col gap-[4px]">
                    <p className="text-[20px] font-semibold leading-[26px] text-white">{alert.title}</p>
                    <p className="text-[14px] font-medium leading-[21px] text-[rgba(255,255,255,0.6)]">{alert.subtitle}</p>
                    <div className="mt-[8px] flex items-center gap-[8px]">
                      <span className="text-[14px] font-medium text-white">Tap to begin</span>
                      <ArrowRight size={16} className="text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>

        <BottomNav active="home" />
      </div>
    </div>
  )
}
