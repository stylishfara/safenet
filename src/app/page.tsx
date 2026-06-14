"use client"

import Link from "next/link"
import { StatusBar } from "@/components/mobile/status-bar"

// Figma asset — save to /public/logo.svg before deploying (expires 7 days)
const LOGO_URL =
  "https://www.figma.com/api/mcp/asset/421fa8c7-fa7c-4624-b549-285a9c32ec14"

export default function SplashScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
      {/*
       * Frame 2087328276 — 402 × 874 px
       * Figma node: 1052:36121
       */}
      <Link href="/create-account">
        <div className="relative h-[874px] w-[402px] cursor-pointer overflow-hidden bg-white">
          <StatusBar />

          {/*
           * Logo group — exactly centred in the frame:
           * group x=124 y=357 w=154 h=160
           * centre: (124+77, 357+80) = (201, 437) = (402/2, 874/2) ✓
           */}
          <div className="flex h-full flex-col items-center justify-center">
            {/* Shield logo — 84 × 98 px */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_URL}
              alt="Safenet shield logo"
              width={84}
              height={98}
              className="block"
            />
            {/* 10 px gap between logo bottom and wordmark */}
            <p
              className="mt-[10px] text-[40px] font-semibold leading-[52px] text-black"
            >
              Safenet
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
