"use client"

import { useState } from "react"
import { CornerDownLeft, Delete } from "lucide-react"

const NUMPAD_ROWS = [
  [{ n: "1", s: "" }, { n: "2", s: "ABC" }, { n: "3", s: "DEF" }],
  [{ n: "4", s: "GHI" }, { n: "5", s: "JKL" }, { n: "6", s: "MNO" }],
  [{ n: "7", s: "PQRS" }, { n: "8", s: "TUV" }, { n: "9", s: "WXYZ" }],
]

function OtpBox({ digit }: { digit: string }) {
  return (
    <div className="flex size-[48px] items-center justify-center rounded-[8px] border border-[#e5e5e5] bg-white">
      {digit && <span className="text-[20px] font-semibold text-[#262626]">{digit}</span>}
    </div>
  )
}

function NumKey({ n, s, height, onPress }: { n: string; s: string; height: number; onPress: (v: string) => void }) {
  return (
    <button
      onClick={() => onPress(n)}
      className="flex flex-1 flex-col items-center justify-center rounded-[5px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.3)]"
      style={{ height }}
    >
      <span className="text-[25px] font-normal leading-none tracking-[-0.5px] text-black">{n}</span>
      {s && <span className="mt-[1px] text-[10px] font-bold tracking-[1.7px] text-black">{s}</span>}
    </button>
  )
}

export default function VerifyEmail() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))

  const handlePress = (n: string) => {
    const idx = otp.findIndex((d) => d === "")
    if (idx === -1) return
    const next = [...otp]
    next[idx] = n
    setOtp(next)
  }

  const handleDelete = () => {
    const last = [...otp].reverse().findIndex((d) => d !== "")
    if (last === -1) return
    const next = [...otp]
    next[otp.length - 1 - last] = ""
    setOtp(next)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
      {/* iPhone 15 Pro — 393 × 852 pt */}
      <div className="relative h-[852px] w-[393px] overflow-hidden bg-white">

        {/* Content — 20 px side padding, 24 px top */}
        <div className="absolute left-[20px] top-[24px] w-[353px]">
          <div className="flex flex-col gap-[30px]">

            {/* Title block */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center justify-between">
                <button aria-label="Back">
                  <CornerDownLeft size={24} className="text-[#262626]" />
                </button>
                <div className="h-[21px] w-[29px]" />
              </div>
              <div className="flex flex-col gap-[8px]">
                <h1 className="text-[20px] font-semibold leading-[26px] text-[#262626]">
                  Verify your Email
                </h1>
                <p className="text-[16px] font-medium leading-[24px] text-[#737373]">
                  Enter the code sent to fra*****@gmail.com
                </p>
              </div>
            </div>

            {/* OTP boxes — 6 × 48 px, gap 8 px */}
            <div className="flex gap-[8px]">
              {otp.map((digit, i) => <OtpBox key={i} digit={digit} />)}
            </div>

          </div>

          {/* Resend */}
          <p className="mt-[16px] text-[14px] font-medium leading-[21px] text-[#262626]">
            Didn&apos;t get the code?{" "}
            <button className="underline decoration-solid">Resend</button>
          </p>
        </div>

        {/*
         * Continue bar — full width, sits directly above keyboard
         * 852 - 291 (keyboard) - 48 (bar) = 513
         */}
        <div className="absolute left-0 right-0 top-[513px] flex h-[48px] items-center justify-center bg-black">
          <span className="text-[16px] font-semibold text-white">Continue</span>
        </div>

        {/* iOS keyboard — 393 × 291, pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[291px] overflow-hidden bg-[rgba(206,210,217,0.7)] backdrop-blur-[35px]">
          <div className="flex flex-col gap-[7px] px-[6px] pt-[6px]">

            {NUMPAD_ROWS.map((row, ri) => (
              <div key={ri} className="flex gap-[6px]">
                {row.map(({ n, s }) => (
                  <NumKey key={n} n={n} s={s} height={ri === 0 ? 46 : 47} onPress={handlePress} />
                ))}
              </div>
            ))}

            {/* Row 4: +*# | 0 | delete */}
            <div className="flex gap-[6px]" style={{ height: 47 }}>
              <div className="flex flex-1 items-center justify-center rounded-[5px] bg-[rgba(180,186,193,0.5)]">
                <span className="text-[17px] text-black">+*#</span>
              </div>
              <button
                onClick={() => handlePress("0")}
                className="flex flex-1 items-center justify-center rounded-[5px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.35)]"
              >
                <span className="text-[25px] font-normal leading-none tracking-[-0.5px] text-black">0</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center rounded-[5px]"
              >
                <Delete size={22} className="text-black" />
              </button>
            </div>

          </div>

          {/* Home indicator */}
          <div className="absolute bottom-[8px] left-1/2 h-[5px] w-[135px] -translate-x-1/2 rounded-[5px] bg-black" />
        </div>

      </div>
    </div>
  )
}
