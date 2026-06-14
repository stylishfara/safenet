"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Video, Volume2, PhoneOff } from "lucide-react"

type Station = {
  name: string
  address: string
  eta: string
}

type AlertCallProps = {
  bgColor: string
  callingText: string
  callStatus: string
  activeStation: string
  listTitle: string
  stations: Station[]
}

export default function AlertCall({
  bgColor,
  callingText,
  callStatus,
  activeStation,
  listTitle,
  stations,
}: AlertCallProps) {
  const router = useRouter()

  // Auto-request location + camera/mic permissions on mount
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(() => {}, () => {})
    navigator.mediaDevices?.getUserMedia({ audio: true, video: false }).catch(() => {})
  }, [])

  return (
    <div
      className="fixed inset-0 flex items-start justify-center overflow-hidden md:items-center"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="relative flex h-full w-full flex-col overflow-hidden md:h-[874px] md:w-[402px]"
        style={{ backgroundColor: bgColor }}
      >
        {/* Back button */}
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="absolute left-[20px] top-[52px] z-10"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>

        {/* Coloured header section */}
        <div className="flex flex-col gap-[24px] px-[20px] pb-[32px] pt-[96px]">
          {/* Calling text */}
          <p className="text-[20px] font-medium leading-[30px] text-white">
            {callingText}
            <br />
            If no response, dial *911# via USSD.
          </p>

          {/* Call card */}
          <div className="flex items-center justify-between rounded-[24px] bg-black px-[16px] py-[24px]">
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] font-normal leading-[21px] text-[#737373]">{callStatus}</p>
              <p className="text-[14px] font-medium leading-[21px] text-white">{activeStation}</p>
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="flex size-[56px] items-center justify-center rounded-full bg-[#171717]">
                <Video size={24} className="text-white" />
              </div>
              <div className="flex size-[56px] items-center justify-center rounded-full bg-[#171717]">
                <Volume2 size={24} className="text-white" />
              </div>
              <div className="flex size-[52px] items-center justify-center rounded-full bg-[#fb2c36]">
                <PhoneOff size={22} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* White list panel — fills remaining space and scrolls */}
        <div className="flex-1 overflow-y-auto rounded-t-[20px] bg-white px-[20px] pb-[20px] pt-[16px]">
          <p className="mb-[16px] text-[16px] font-medium leading-[24px] text-[#262626]">{listTitle}</p>
          <div className="flex flex-col gap-[12px]">
            {stations.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-[16px] px-[16px] py-[12px]"
                style={{
                  border: i === 0 ? "1.5px solid #fb2c36" : "1px solid #e5e5e5",
                  backgroundColor: "white",
                }}
              >
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[16px] font-semibold leading-[24px] text-[#262626]">{s.name}</p>
                  <p className="text-[14px] font-medium leading-[21px] text-[#737373]">{s.address}</p>
                </div>
                <div className="flex h-[27px] items-center justify-center rounded-[15px] border border-[#e5e5e5] bg-[#f5f5f5] px-[12px]">
                  <span className="text-[12px] font-semibold text-[#262626]">{s.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
