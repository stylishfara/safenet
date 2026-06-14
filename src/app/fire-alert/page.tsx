import AlertCall from "@/components/mobile/alert-call"

const STATIONS = [
  { name: "Tema Fire station", address: "#124 Adjinor St", eta: "~13 min ETA" },
  { name: "LA", address: "#124 Adjinor St", eta: "~15 min ETA" },
  { name: "East Legon", address: "#124 Adjinor St", eta: "~17 min ETA" },
  { name: "Madina", address: "#124 Adjinor St", eta: "~19 min ETA" },
  { name: "Osu", address: "#90 Oxford St", eta: "~20 min ETA" },
  { name: "Spintex", address: "#22 Spintex Rd", eta: "~22 min ETA" },
  { name: "Spintex", address: "#22 Spintex Rd", eta: "~25 min ETA" },
  { name: "Circle Junction", address: "#8 Circle St", eta: "~12 min ETA" },
]

export default function FireAlert() {
  return (
    <AlertCall
      bgColor="#66863e"
      callingText="Calling the nearest fire stations."
      callStatus="Calling..."
      activeStation="Tema Fire station"
      listTitle="Fire stations near you"
      stations={STATIONS}
    />
  )
}
