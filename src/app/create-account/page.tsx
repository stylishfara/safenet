"use client"

import Link from "next/link"
import { CornerDownLeft } from "lucide-react"
import { StatusBar } from "@/components/mobile/status-bar"

// Ghana flag — built entirely in CSS; colours from ISO 3166-1
function GhanaFlag() {
  return (
    /*
     * 24 × 24 dark rounded container — clips the 50 × 50 flag positioned at
     * (-13, -13) to show the centre 24 × 24 slice.  Exact match to Figma
     * FlagPack component (node I1052:35971;207:2928).
     */
    <div className="relative size-[24px] flex-shrink-0 overflow-hidden rounded-[8px] bg-[#262626]">
      <div className="absolute -left-[13px] -top-[13px] size-[50px]">
        {/* Red band — inset 17.24% 0 60.92% 0 in 50 px space */}
        <div
          className="absolute left-0 right-0 bg-[#C8102E]"
          style={{ top: "17.24%", bottom: "60.92%" }}
        />
        {/* Gold band — inset 39.08% 0 39.08% 0 */}
        <div
          className="absolute left-0 right-0 bg-[#FCD116]"
          style={{ top: "39.08%", bottom: "39.08%" }}
        />
        {/* Green band — inset 60.92% 0 17.24% 0 */}
        <div
          className="absolute left-0 right-0 bg-[#006B3F]"
          style={{ top: "60.92%", bottom: "17.24%" }}
        />
        {/* Black star — centred on gold band */}
        <div
          className="absolute flex items-center justify-center text-black"
          style={{
            top: "41.26%",
            bottom: "41.6%",
            left: "41.02%",
            right: "41.02%",
          }}
        >
          <span
            className="select-none leading-none"
            style={{ fontSize: 9, lineHeight: 1 }}
          >
            ★
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CreateAccount() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
      {/*
       * Frame 2087328225 — 402 × 844 px
       * Figma node: 1052:35957
       */}
      <div className="relative h-[844px] w-[402px] overflow-hidden bg-white">
        <StatusBar />

        {/*
         * Content block — Frame 2087328235
         * left=20 top=68 width=362 height=497
         */}
        <div className="absolute left-[20px] right-[20px] top-[68px]">

          {/* ── Title text block — 121 px tall ── */}
          <div className="flex flex-col gap-[16px]">
            {/* Nav row */}
            <div className="flex items-center justify-between">
              <button aria-label="Back">
                <CornerDownLeft size={24} className="text-[#262626]" />
              </button>
              {/* Empty right slot — matches Figma right spacer */}
              <div className="h-[21px] w-[29px]" />
            </div>

            {/* Title + subtitle */}
            <div className="flex flex-col gap-[8px]">
              <h1
                className="text-[20px] font-semibold leading-[26px] text-[#262626]"
                style={{ width: 274 }}
              >
                Create Account
              </h1>
              <p className="text-[16px] font-medium leading-[24px] text-[#737373]">
                These help us verify it&apos;s really you if you ever need to
                recover your account.
              </p>
            </div>
          </div>

          {/*
           * Form — Frame 2087328234 (Slot)
           * gap-24 between fields, starts 32 px below title block
           */}
          <div className="mt-[32px] flex flex-col gap-[24px]">

            {/* First name — Form 1 (h=65: label 21 + gap 4 + input 40) */}
            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] font-medium leading-[21px] text-[#262626]">
                First name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className="h-[40px] w-full rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
              />
            </div>

            {/* Last name — Form 1 */}
            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] font-medium leading-[21px] text-[#262626]">
                Last name
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                className="h-[40px] w-full rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
              />
            </div>

            {/* Phone number — Form input 3 (h=77: label 21 + gap 8 + inputs 48) */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-medium leading-[21px] text-[#262626]">
                Phone number
              </label>
              <div className="flex gap-[8px] items-center">
                {/* Country flag + dial code — 24 px flag box, 48 px row height */}
                <div className="flex h-[48px] flex-shrink-0 items-center gap-[8px] rounded-[10px] border border-[#e5e5e5] bg-white px-[12px]">
                  <GhanaFlag />
                  <span className="text-[14px] text-[#262626]">+233</span>
                </div>
                {/* Number input */}
                <input
                  type="tel"
                  placeholder="012345678"
                  className="h-[48px] flex-1 rounded-[10px] border border-[#e5e5e5] bg-white px-[16px] text-[14px] text-[#262626] placeholder:text-[#262626] outline-none"
                />
              </div>
            </div>

            {/* Password — Form input 4 (h=65) */}
            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] font-medium leading-[21px] text-[#262626]">
                Password
              </label>
              <input
                type="password"
                placeholder="Placeholder"
                className="h-[40px] w-full rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
              />
            </div>

          </div>
        </div>

        {/*
         * Continue button — Buttons instance
         * left=20 top=756 width=362 height=48
         * 844 - 756 - 48 = 40 px bottom margin
         */}
        <Link
          href="/verify-email"
          className="absolute left-[20px] right-[20px] top-[756px]"
        >
          <button className="flex h-[48px] w-full items-center justify-center rounded-[51px] bg-black text-[16px] font-semibold text-white">
            Continue
          </button>
        </Link>
      </div>
    </div>
  )
}
