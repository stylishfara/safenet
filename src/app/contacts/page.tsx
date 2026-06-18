"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronRight, Plus } from "lucide-react"
import BottomNav from "@/components/mobile/bottom-nav"
import { getContacts, getInitials, type Contact } from "@/lib/contacts"

function PersonAvatar({ skin, hair, offset }: { skin: string; hair: string; offset: number }) {
  return (
    <div
      className="relative flex size-[52px] shrink-0 items-end justify-center overflow-hidden rounded-full border-[2px] border-white"
      style={{ backgroundColor: skin, marginLeft: offset }}
    >
      {/* Hair */}
      <div
        className="absolute top-[6px] size-[22px] rounded-full"
        style={{ backgroundColor: hair }}
      />
      {/* Head */}
      <div
        className="absolute top-[10px] size-[20px] rounded-full"
        style={{ backgroundColor: skin }}
      />
      {/* Shoulders */}
      <div
        className="absolute bottom-0 h-[22px] w-[44px] rounded-t-full"
        style={{ backgroundColor: hair }}
      />
    </div>
  )
}

function AvatarGroup() {
  return (
    <div className="flex items-end">
      <PersonAvatar skin="#C8956C" hair="#4A2E1A" offset={0} />
      <PersonAvatar skin="#8B5E3C" hair="#8B0000" offset={-14} />
      <PersonAvatar skin="#D4A574" hair="#2C1810" offset={-14} />
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

            {/* Page header */}
            <div className="mb-[24px] flex items-center justify-between">
              <h1 className="text-[20px] font-semibold leading-[26px] text-[#262626]">Emergency Contacts</h1>
              <button
                onClick={() => router.push("/contacts/add")}
                className="flex size-[40px] items-center justify-center rounded-full bg-black"
              >
                <Plus size={20} className="text-white" />
              </button>
            </div>

            {/* Search */}
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

            {/* List or empty state */}
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
