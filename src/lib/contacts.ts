export type Contact = {
  id: string
  name: string
  phone: string
  relationship: string
}

// Module-level store — persists across client navigations within a session
export const contactStore: Contact[] = []

export function getContacts(): Contact[] {
  return contactStore
}

export function getContact(id: string): Contact | undefined {
  return contactStore.find((c) => c.id === id)
}

export function addContact(c: Omit<Contact, "id">): Contact {
  const contact = { ...c, id: Date.now().toString() }
  contactStore.push(contact)
  return contact
}

export function updateContact(id: string, data: Partial<Omit<Contact, "id">>) {
  const i = contactStore.findIndex((c) => c.id === id)
  if (i !== -1) contactStore[i] = { ...contactStore[i], ...data }
}

export function deleteContact(id: string) {
  const i = contactStore.findIndex((c) => c.id === id)
  if (i !== -1) contactStore.splice(i, 1)
}

export function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
}

export const RELATIONSHIPS = ["Father", "Mother", "Sister", "Brother", "Uncle", "Aunty", "Friend", "Spouse"]
