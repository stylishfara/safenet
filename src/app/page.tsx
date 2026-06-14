"use client"

import Link from "next/link"

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <Link href="/create-account" className="h-full w-full md:h-[874px] md:w-[402px]">
        <div className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Safenet" width={84} height={98} />
        </div>
      </Link>
    </div>
  )
}
