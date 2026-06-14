"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

function GhanaFlag() {
  return (
    <div className="relative size-[24px] flex-shrink-0 overflow-hidden rounded-[8px] bg-[#262626]">
      <div className="absolute -left-[13px] -top-[13px] size-[50px]">
        <div className="absolute left-0 right-0 bg-[#C8102E]" style={{ top: "17.24%", bottom: "60.92%" }} />
        <div className="absolute left-0 right-0 bg-[#FCD116]" style={{ top: "39.08%", bottom: "39.08%" }} />
        <div className="absolute left-0 right-0 bg-[#006B3F]" style={{ top: "60.92%", bottom: "17.24%" }} />
        <div className="absolute flex items-center justify-center" style={{ top: "41.26%", bottom: "41.6%", left: "41.02%", right: "41.02%" }}>
          <span className="select-none text-black leading-none" style={{ fontSize: 9, lineHeight: 1 }}>★</span>
        </div>
      </div>
    </div>
  )
}

export default function CreateAccount() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleContinue = () => {
    router.push("/verify-email?email=" + encodeURIComponent(email))
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#f5f5f5]">
      {/* 402 × 874 — locked to Figma frame */}
      <div className="relative h-[874px] w-[402px] overflow-hidden bg-white">

        {/* Content — 20 px side padding, 24 px top */}
        <div className="absolute left-[20px] right-[20px] top-[24px]">

          {/* Title block */}
          <div className="flex flex-col gap-[16px]">
            <button onClick={() => router.back()} aria-label="Back" className="flex w-fit items-center">
              <ArrowLeft size={24} className="text-[#262626]" />
            </button>
            <div className="flex flex-col gap-[8px]">
              <h1 className="text-[20px] font-semibold leading-[26px] text-[#262626]">
                Create Account
              </h1>
              <p className="text-[16px] font-medium leading-[24px] text-[#737373]">
                These help us verify it&apos;s really you if you ever need to recover your account.
              </p>
            </div>
          </div>

          {/* Form — 32 px gap from title, 24 px gap between fields */}
          <div className="mt-[32px] flex flex-col gap-[24px]">

            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] font-medium leading-[21px] text-[#262626]">First name</label>
              <input
                type="text"
                placeholder="John"
                className="h-[40px] w-full rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] font-medium leading-[21px] text-[#262626]">Last name</label>
              <input
                type="text"
                placeholder="Doe"
                className="h-[40px] w-full rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] font-medium leading-[21px] text-[#262626]">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[40px] w-full rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
              />
            </div>

            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-medium leading-[21px] text-[#262626]">Phone number</label>
              <div className="flex items-center gap-[8px]">
                <div className="flex h-[48px] flex-shrink-0 items-center gap-[8px] rounded-[10px] border border-[#e5e5e5] bg-white px-[12px]">
                  <GhanaFlag />
                  <span className="text-[14px] text-[#262626]">+233</span>
                </div>
                <input
                  type="tel"
                  placeholder="024 000 0000"
                  className="h-[48px] flex-1 rounded-[10px] border border-[#e5e5e5] bg-white px-[16px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] font-medium leading-[21px] text-[#262626]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="h-[40px] w-full rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] pr-[40px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#737373]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Continue — 40 px from bottom: 874 - 48 - 40 = 786 */}
        <button
          onClick={handleContinue}
          className="absolute left-[20px] right-[20px] top-[786px] flex h-[48px] items-center justify-center rounded-[51px] bg-black text-[16px] font-semibold text-white"
        >
          Continue
        </button>

      </div>
    </div>
  )
}
