"use client"

import { useState } from "react"
import { CornerDownLeft, Delete } from "lucide-react"
import { StatusBar } from "@/components/mobile/status-bar"

// ── Keyboard data ──────────────────────────────────────────────────────────
const NUMPAD_ROWS = [
  [{ n: "1", s: "" }, { n: "2", s: "ABC" }, { n: "3", s: "DEF" }],
  [{ n: "4", s: "GHI" }, { n: "5", s: "JKL" }, { n: "6", s: "MNO" }],
  [{ n: "7", s: "PQRS" }, { n: "8", s: "TUV" }, { n: "9", s: "WXYZ" }],
]

// ── Sub-components ──────────────────────────────────────────────────────────
function OtpBox({ digit }: { digit: string }) {
  return (
    <div className="flex size-[48px] items-center justify-center rounded-[8px] border border-[#e5e5e5] bg-white">
      {digit && (
        <span className="text-[20px] font-semibold text-[#262626]">{digit}</span>
      )}
    </div>
  )
}

function NumKey({
  n,
  s,
  height,
  onPress,
}: {
  n: string
  s: string
  height: number
  onPress: (v: string) => void
}) {
  return (
    <button
      onClick={() => onPress(n)}
      className="flex flex-1 flex-col items-center justify-center rounded-[5px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.3)]"
      style={{ height }}
    >
      <span className="text-[25px] font-normal leading-none tracking-[-0.5px] text-black">
        {n}
      </span>
      {s && (
        <span className="mt-[1px] text-[10px] font-bold tracking-[1.7px] text-black">
          {s}
        </span>
      )}
    </button>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
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
    const realIdx = otp.length - 1 - last
    const next = [...otp]
    next[realIdx] = ""
    setOtp(next)
  }

  const allFilled = otp.every((d) => d !== "")

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
      {/*
       * Frame 2087328226 — 402 × 874 px
       * Figma node: 1052:36105
       */}
      <div className="relative h-[874px] w-[402px] overflow-hidden bg-white">
        <StatusBar />

        {/*
         * Content — left=20 top=68 width=362
         * Frame 2087328247 (height 213)
         */}
        <div className="absolute left-[20px] top-[68px] w-[362px]">

          {/* ── Title block + OTP (gap-30 between them) ── */}
          <div className="flex flex-col gap-[30px]">

            {/* Title text — gap-16 internally */}
            <div className="flex flex-col gap-[16px]">
              {/* Nav row */}
              <div className="flex items-center justify-between">
                <button aria-label="Back">
                  <CornerDownLeft size={24} className="text-[#262626]" />
                </button>
                <div className="h-[21px] w-[29px]" />
              </div>

              {/* Heading + subtitle — gap-8 */}
              <div className="flex flex-col gap-[8px]">
                <h1
                  className="text-[20px] font-semibold leading-[26px] text-[#262626]"
                  style={{ width: 274 }}
                >
                  Verify your Email
                </h1>
                <p className="text-[16px] font-medium leading-[24px] text-[#737373]">
                  Enter the code sent to fra*****@gmail.com
                </p>
              </div>
            </div>

            {/*
             * OTP row — Form input 2
             * 6 × 48 px boxes, gap-8, total width 6×48+5×8=328 px
             */}
            <div className="flex gap-[8px]">
              {otp.map((digit, i) => (
                <OtpBox key={i} digit={digit} />
              ))}
            </div>
          </div>

          {/* Resend — 16 px below OTP group (gap-16 in parent) */}
          <p className="mt-[16px] text-[14px] font-medium leading-[21px] text-[#262626]">
            Didn&apos;t get the code?{" "}
            <button className="underline decoration-solid underline-offset-0">
              Resend
            </button>
          </p>
        </div>

        {/*
         * Continue button (full width, above keyboard)
         * top=535 height=48  →  bottom = 535+48 = 583 = 874-291 ✓
         */}
        <div
          className={`absolute left-0 right-0 top-[535px] flex h-[48px] items-center justify-center transition-opacity ${
            allFilled ? "opacity-100" : "opacity-100"
          } bg-black`}
        >
          <span className="text-[16px] font-semibold text-white">Continue</span>
        </div>

        {/*
         * iOS numeric keyboard
         * top=583 height=291 (402 × 291)
         * Figma: Keyboard Numbers component (node 925:8292)
         */}
        <div className="absolute bottom-0 left-0 right-0 h-[291px] overflow-hidden bg-[rgba(206,210,217,0.7)] backdrop-blur-[35px]">

          {/* Number rows 1-3 — pt-6, gap-[7px] between rows */}
          <div className="flex flex-col gap-[7px] px-[6px] pt-[6px]">
            {NUMPAD_ROWS.map((row, ri) => (
              <div key={ri} className="flex gap-[6px]">
                {row.map(({ n, s }) => (
                  <NumKey
                    key={n}
                    n={n}
                    s={s}
                    height={ri === 0 ? 46 : 47}
                    onPress={handlePress}
                  />
                ))}
              </div>
            ))}

            {/* Row 4: +*# | 0 | delete */}
            <div className="flex gap-[6px]" style={{ height: 47 }}>
              {/* +*# — greyed, not interactive */}
              <div className="flex flex-1 items-center justify-center rounded-[5px] bg-[rgba(180,186,193,0.5)]">
                <span className="text-[17px] tracking-[-0.3px] text-black">
                  +*#
                </span>
              </div>

              {/* 0 */}
              <button
                onClick={() => handlePress("0")}
                className="flex flex-1 items-center justify-center rounded-[5px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.35)]"
              >
                <span className="text-[25px] font-normal leading-none tracking-[-0.5px] text-black">
                  0
                </span>
              </button>

              {/* Delete */}
              <button
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center rounded-[5px]"
              >
                <Delete size={22} className="text-black" />
              </button>
            </div>
          </div>

          {/* Home indicator — bottom-8, centred */}
          <div className="absolute bottom-[8px] left-1/2 h-[5px] w-[135px] -translate-x-1/2 rounded-[5px] bg-black" />
        </div>
      </div>
    </div>
  )
}
