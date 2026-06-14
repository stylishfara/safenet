"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { getContact, deleteContact, RELATIONSHIPS, type Contact } from "@/lib/contacts"

function GhanaFlag() {
  return (
    <div className="relative size-[24px] flex-shrink-0 overflow-hidden rounded-[8px] bg-[#262626]">
      <div className="absolute -left-[13px] -top-[13px] size-[50px]">
        <div className="absolute left-0 right-0 bg-[#C8102E]" style={{ top: "17.24%", bottom: "60.92%" }} />
        <div className="absolute left-0 right-0 bg-[#FCD116]" style={{ top: "39.08%", bottom: "39.08%" }} />
        <div className="absolute left-0 right-0 bg-[#006B3F]" style={{ top: "60.92%", bottom: "17.24%" }} />
        <div className="absolute flex items-center justify-center" style={{ top: "41.26%", bottom: "41.6%", left: "41.02%", right: "41.02%" }}>
          <span className="select-none leading-none text-black" style={{ fontSize: 9, lineHeight: 1 }}>★</span>
        </div>
      </div>
    </div>
  )
}

export default function EditContact({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [contact, setContact] = useState<Contact | null>(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [relationship, setRelationship] = useState("")
  const [showDrop, setShowDrop] = useState(false)

  useEffect(() => {
    const c = getContact(id)
    if (c) {
      setContact(c)
      setName(c.name)
      setPhone(c.phone)
      setRelationship(c.relationship)
    }
  }, [id])

  const handleDelete = () => {
    deleteContact(id)
    router.push("/contacts")
  }

  if (!contact) return null

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden bg-[#f5f5f5] md:items-center">
      <div className="relative h-full w-full overflow-hidden bg-white md:h-[874px] md:w-[402px]">

        <div className="h-full overflow-y-auto pb-[40px]">
          <div className="px-[20px] pt-[52px]">

            {/* Header */}
            <div className="mb-[56px] flex items-center justify-between">
              <button onClick={() => router.back()}><ArrowLeft size={24} className="text-[#262626]" /></button>
              <p className="text-[16px] font-medium text-[#262626]">{contact.name}</p>
              <div className="w-[24px]" />
            </div>

            <div className="flex flex-col gap-[24px]">

              <div className="flex flex-col gap-[4px]">
                <label className="text-[14px] font-medium leading-[21px] text-[#262626]">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-[40px] w-full rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] font-medium leading-[21px] text-[#262626]">Phone number</label>
                <div className="flex gap-[8px]">
                  <div className="flex h-[40px] flex-shrink-0 items-center gap-[8px] rounded-[10px] border border-[#e5e5e5] bg-white px-[10px]">
                    <GhanaFlag />
                    <span className="text-[14px] text-[#737373]">+233</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-[40px] flex-1 rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] text-[14px] text-[#262626] placeholder:text-[#737373] outline-none"
                  />
                </div>
              </div>

              <div className="relative flex flex-col gap-[4px]">
                <label className="text-[14px] font-medium leading-[21px] text-[#262626]">Relationship</label>
                <button
                  onClick={() => setShowDrop(!showDrop)}
                  className="flex h-[40px] w-full items-center justify-between rounded-[10px] border border-[#e5e5e5] bg-white px-[10px] text-[14px]"
                >
                  <span className={relationship ? "text-[#262626]" : "text-[#737373]"}>
                    {relationship || "Select"}
                  </span>
                  <ChevronDown size={20} className="text-[#737373]" />
                </button>
                {showDrop && (
                  <div className="absolute left-0 right-0 top-[68px] z-10 rounded-[8px] border border-[#f5f5f5] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
                    {RELATIONSHIPS.map((r) => (
                      <button
                        key={r}
                        onClick={() => { setRelationship(r); setShowDrop(false) }}
                        className="flex w-full items-center px-[8px] py-[6px] text-left text-[14px] text-[#262626] hover:bg-[#f5f5f5]"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Delete */}
              <button
                onClick={handleDelete}
                className="flex h-[40px] w-full items-center justify-center rounded-[12px] bg-[#fb2c36] text-[14px] font-medium text-white"
              >
                Delete Contact
              </button>

            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
