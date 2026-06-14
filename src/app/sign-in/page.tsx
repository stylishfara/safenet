"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function SignIn() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <div className="relative h-full w-full overflow-hidden bg-white md:h-[874px] md:w-[402px]">

        {/* Logo + Welcome */}
        <div className="absolute left-[20px] right-[20px] top-[116px] flex flex-col items-center gap-[32px]">

          <div className="flex flex-col items-center gap-[24px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Safenet" width={51} height={59} />
            <p className="text-[20px] font-medium leading-[26px] text-[#262626]">Welcome back</p>
          </div>

          {/* Form */}
          <div className="flex w-full flex-col gap-[16px]">

            <div className="flex flex-col gap-[32px]">
              <div className="flex flex-col gap-[24px]">

                <div className="flex flex-col gap-[4px]">
                  <label className="text-[14px] font-medium leading-[21px] text-[#262626]">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="h-[40px] w-full rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
                  />
                </div>

                <div className="flex flex-col gap-[4px]">
                  <label className="text-[14px] font-medium leading-[21px] text-[#262626]">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
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

              <button
                onClick={() => router.push("/home")}
                className="flex h-[48px] w-full items-center justify-center rounded-[72px] bg-black text-[16px] font-medium text-white"
              >
                Login
              </button>
            </div>

            <p className="text-center text-[14px] font-medium leading-[21px] text-[#262626]">
              Forgot Password
            </p>

          </div>
        </div>

        {/* Create account link — pinned near bottom */}
        <div className="absolute bottom-[40px] left-0 right-0 flex justify-center">
          <button
            onClick={() => router.push("/create-account")}
            className="text-[14px] font-medium leading-[21px] text-[#262626] underline"
          >
            Create an Account now
          </button>
        </div>

      </div>
    </div>
  )
}
