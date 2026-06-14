"use client"

import { useRouter } from "next/navigation"
import { User, Moon, Trash2, LogOut, ChevronRight } from "lucide-react"
import BottomNav from "@/components/mobile/bottom-nav"

const ITEMS = [
  {
    icon: <User size={24} className="text-[#262626]" />,
    label: "Profile",
    sub: "Set your account details here",
    href: "/settings/profile",
  },
  {
    icon: <Moon size={24} className="text-[#262626]" />,
    label: "Appearance",
    sub: "Set theme and others here",
    href: "/settings/appearance",
  },
  {
    icon: <Trash2 size={24} className="text-[#262626]" />,
    label: "Close Account",
    sub: "Delete your account",
    href: "/settings/close-account",
  },
  {
    icon: <LogOut size={24} className="text-[#262626]" />,
    label: "Log out",
    sub: "Log out of app",
    href: "/sign-in",
  },
]

export default function Settings() {
  const router = useRouter()

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <div className="relative h-full w-full overflow-hidden bg-white md:h-[874px] md:w-[402px]">

        <div className="h-full overflow-y-auto pb-[100px]">
          <div className="px-[20px] pt-[52px]">
            <h1 className="mb-[32px] text-[24px] font-semibold leading-[38px] text-[#262626]">Profile</h1>

            <div className="flex flex-col gap-[24px]">
              {ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className="flex w-full items-center justify-between py-[8px]"
                >
                  <div className="flex items-center gap-[12px]">
                    <div className="flex size-[48px] items-center justify-center rounded-[16px] bg-[#f5f5f5]">
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-[4px] text-left">
                      <p className="text-[16px] font-medium leading-[24px] text-[#262626]">{item.label}</p>
                      <p className="text-[14px] font-medium leading-[21px] text-[#737373]">{item.sub}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[#737373]" />
                </button>
              ))}
            </div>

            <p className="mt-[40px] text-center text-[16px] text-[#b7b7b7]">Safenet v1.0</p>
          </div>
        </div>

        <BottomNav active="profile" />
      </div>
    </div>
  )
}
