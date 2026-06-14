"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, ChevronRight, Plus } from "lucide-react"
import BottomNav from "@/components/mobile/bottom-nav"
import { getContacts, getInitials, type Contact } from "@/lib/contacts"

function AvatarGroup() {
  const avatars = [
    { bg: "#8B6F5E", initials: "AO" },
    { bg: "#C4714B", initials: "EA" },
    { bg: "#5C5C5C", initials: "FA" },
  ]
  return (
    <div className="flex items-center">
      {avatars.map((a, i) => (
        <div
          key={i}
          className="flex size-[48px] items-center justify-center rounded-full border-[2px] border-white text-[14px] font-semibold text-white"
          style={{ backgroundColor: a.bg, marginLeft: i === 0 ? 0 : -12, zIndex: avatars.length - i }}
        >
          {a.initials}
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center gap-[16px] pt-[80px]">
      <AvatarGroup />
      <div className="flex flex-col items-center gap-[4px]">
        <p className="text-[16px] font-semibold text-[#262626]">No emergency contacts</p>
        <p className="text-[14px] font-medium text-[#737373]">Add contacts now to your emergency list</p>
      </div>
      <button
        onClick={() => router.push("/contacts/add")}
        className="mt-[8px] flex h-[48px] items-center justify-center rounded-[51px] bg-[#262626] px-[32px] text-[14px] font-semibold text-white"
      >
        Add contact
      </button>
    </div>
  )
}

export default function Contacts() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    setContacts(getContacts())
  }, [])

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <div className="relative h-full w-full overflow-hidden bg-white md:h-[874px] md:w-[402px]">

        <div className="h-full overflow-y-auto pb-[100px]">
          <div className="px-[20px] pt-[52px]">

            <div className="mb-[32px] flex items-center justify-between">
              <button onClick={() => router.back()} aria-label="Back">
                <ArrowLeft size={24} className="text-[#262626]" />
              </button>
              <p className="text-[16px] font-medium leading-[24px] text-[#262626]">Emergency Contacts</p>
              <button
                onClick={() => router.push("/contacts/add")}
                className="flex size-[40px] items-center justify-center rounded-full bg-black"
              >
                <Plus size={20} className="text-white" />
              </button>
            </div>

            <div className="mb-[32px] flex h-[48px] items-center gap-[8px] rounded-[12px] border border-[#e5e5e5] bg-white px-[16px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
              <Search size={20} className="text-[#737373]" />
              <input
                type="text"
                placeholder="Search contacts"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-[14px] font-medium text-[#262626] placeholder:text-[#737373] outline-none"
              />
            </div>

            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="flex flex-col gap-[16px]">
                {filtered.map((c, i) => (
                  <div key={c.id}>
                    <button
                      onClick={() => router.push(`/contacts/${c.id}`)}
                      className="flex w-full items-center justify-between"
                    >
                      <div className="flex items-center gap-[16px]">
                        <div className="flex size-[48px] items-center justify-center rounded-[12px] bg-[#f5f5f5]">
                          <span className="text-[20px] font-medium text-[#737373]">{getInitials(c.name)}</span>
                        </div>
                        <div className="flex flex-col gap-[4px] text-left">
                          <p className="text-[16px] font-medium leading-[24px] text-[#262626]">{c.name}</p>
                          <p className="text-[14px] font-medium leading-[21px] text-[#737373]">{c.relationship}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-[#737373]" />
                    </button>
                    {i < filtered.length - 1 && (
                      <div className="ml-[64px] mt-[16px] h-px bg-[#e5e5e5]" />
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        <BottomNav active="contacts" />
      </div>
    </div>
  )
}
