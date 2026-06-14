"use client"

import Link from "next/link"

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#f5f5f5]">
      <Link href="/create-account">
        <div className="relative h-[874px] w-[402px] cursor-pointer overflow-hidden bg-white">
          <div className="flex h-full flex-col items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Safenet" width={84} height={98} />
          </div>
        </div>
      </Link>
    </div>
  )
}
