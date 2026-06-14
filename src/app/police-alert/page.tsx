import AlertCall from "@/components/mobile/alert-call"

const STATIONS = [
  { name: "Tema Police", address: "#124 Adjinor St", eta: "~13 min ETA" },
  { name: "LA Police", address: "#124 Adjinor St", eta: "~15 min ETA" },
  { name: "East Legon", address: "#124 Adjinor St", eta: "~17 min ETA" },
  { name: "Madina", address: "#124 Adjinor St", eta: "~19 min ETA" },
  { name: "Osu", address: "#90 Oxford St", eta: "~20 min ETA" },
  { name: "Spintex", address: "#22 Spintex Rd", eta: "~22 min ETA" },
  { name: "Spintex", address: "#22 Spintex Rd", eta: "~25 min ETA" },
  { name: "Circle Junction", address: "#8 Circle St", eta: "~12 min ETA" },
]

export default function PoliceAlert() {
  return (
    <AlertCall
      bgColor="#c95c5c"
      callingText="Calling the nearest police stations."
      callStatus="00:59"
      activeStation="Tema Station"
      listTitle="Police stations near you"
      stations={STATIONS}
    />
  )
}
