"use client"

import Link from "next/link"

export default function SplashScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
      {/* iPhone 15 Pro — 393 × 852 pt */}
      <Link href="/create-account">
        <div className="relative h-[852px] w-[393px] cursor-pointer overflow-hidden bg-white">
          <div className="flex h-full flex-col items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Safenet" width={84} height={98} />
            <p className="mt-[10px] text-[40px] font-semibold leading-[52px] text-black">
              Safenet
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
