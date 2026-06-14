"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Emergency() {
  const router = useRouter()
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (count <= 0) return
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count])

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#ffe2e2] md:h-[874px] md:w-[402px]">

        {/* Countdown circle + message */}
        <div className="flex flex-col items-center gap-[64px]">

          {/* Dashed countdown circle */}
          <div
            className="flex items-center justify-center rounded-full bg-[#febaba]"
            style={{
              width: 180,
              height: 180,
              border: "7.5px dashed #fb2c36",
            }}
          >
            <span className="text-[60px] font-medium leading-none text-[#fb2c36]">
              {count}
            </span>
          </div>

          <p className="w-[330px] text-center text-[20px] font-medium leading-[26px] text-[#262626]">
            Contacting the police while sharing your location with emergency contacts.
          </p>

        </div>

        {/* Cancel button — pinned to bottom */}
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
