"use client"

import { useRouter } from "next/navigation"
import { Home, BookUser, Clock, User } from "lucide-react"

type Tab = "home" | "contacts" | "history" | "profile"

export default function BottomNav({ active }: { active: Tab }) {
  const router = useRouter()

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-[#f5f5f5] bg-white pb-[16px] pt-[8px]">
      <div className="flex items-center justify-between px-[20px]">
        <button
          onClick={() => router.push("/home")}
          className="flex flex-1 flex-col items-center justify-center py-[8px]"
        >
          <Home
            size={24}
            className={active === "home" ? "text-[#262626]" : "text-[#737373]"}
            fill={active === "home" ? "#262626" : "none"}
          />
        </button>
        <button
          onClick={() => router.push("/contacts")}
          className="flex flex-1 flex-col items-center justify-center py-[8px]"
        >
          <BookUser
            size={24}
            className={active === "contacts" ? "text-[#262626]" : "text-[#737373]"}
          />
        </button>
        <button
          onClick={() => router.push("/history")}
          className="flex flex-1 flex-col items-center justify-center py-[8px]"
        >
          <Clock
            size={24}
            className={active === "history" ? "text-[#262626]" : "text-[#737373]"}
            fill={active === "history" ? "#262626" : "none"}
          />
        </button>
        <button
          onClick={() => router.push("/settings")}
          className="flex flex-1 flex-col items-center justify-center py-[8px]"
        >
          <User
            size={24}
            className={active === "profile" ? "text-[#262626]" : "text-[#737373]"}
            fill={active === "profile" ? "#262626" : "none"}
          />
        </button>
      </div>
    </div>
  )
}
